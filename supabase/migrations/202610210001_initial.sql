-- Phase 1 only. No document ingestion, AI requests, or notification sending.
begin;
create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null default '',
 created_at timestamptz not null default now()
);
create table public.subjects (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 name text not null check (length(name) between 1 and 160),
 category text not null,
 color text not null check(color in ('mint','lavender','peach','blue','pink','yellow')),
 goal_minutes integer not null default 600 check(goal_minutes between 5 and 100000),
 created_at timestamptz not null default now(),
 unique(id,user_id), unique(user_id,name)
);
create table public.study_tasks (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 subject_id uuid not null,
 title text not null check(length(trim(title)) between 1 and 160),
 scheduled_date date not null,
 minutes integer not null check(minutes between 5 and 480),
 done boolean not null default false,
 kind text not null check(kind in ('Repaso','Lectura','Esquema','Práctica','Memorización')),
 created_at timestamptz not null default now(),
 foreign key(subject_id,user_id) references public.subjects(id,user_id) on delete cascade
);
create table public.study_sessions (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 subject_id uuid not null,
 study_date date not null,
 minutes integer not null check(minutes between 1 and 480),
 created_at timestamptz not null default now(),
 foreign key(subject_id,user_id) references public.subjects(id,user_id) on delete cascade
);
create table public.exam_dates (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 subject_id uuid not null,
 title text not null check(length(trim(title)) between 1 and 160),
 exam_date date not null,
 confirmed boolean not null check(confirmed=true),
 created_at timestamptz not null default now(),
 foreign key(subject_id,user_id) references public.subjects(id,user_id) on delete cascade
);
create table public.notification_preferences (
 user_id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
 daily_goal integer not null default 60 check(daily_goal between 5 and 480),
 reminder_time time not null default '09:00',
 timezone text not null default 'Atlantic/Canary' check(timezone in ('Atlantic/Canary','Europe/Madrid')),
 email_requested boolean not null default false,
 push_requested boolean not null default false
);
create index study_tasks_user_date_idx on public.study_tasks(user_id,scheduled_date);
create index study_sessions_user_date_idx on public.study_sessions(user_id,study_date);
create index exam_dates_user_date_idx on public.exam_dates(user_id,exam_date);
alter table public.profiles enable row level security;
alter table public.subjects enable row level security;
alter table public.study_tasks enable row level security;
alter table public.study_sessions enable row level security;
alter table public.exam_dates enable row level security;
alter table public.notification_preferences enable row level security;
create policy profiles_own on public.profiles for all to authenticated using(id=(select auth.uid())) with check(id=(select auth.uid()));
create policy subjects_own on public.subjects for all to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
create policy tasks_own on public.study_tasks for all to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
create policy sessions_own on public.study_sessions for all to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
create policy exams_own on public.exam_dates for all to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
create policy preferences_own on public.notification_preferences for all to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
revoke all on public.profiles, public.subjects, public.study_tasks, public.study_sessions, public.exam_dates, public.notification_preferences from anon;
grant select,insert,update,delete on public.profiles, public.subjects, public.study_tasks, public.study_sessions, public.exam_dates, public.notification_preferences to authenticated;
-- The trigger creates a personal starting catalogue, without academic content or sample progress.
create function public.initialize_study_user() returns trigger language plpgsql security definer set search_path='' as $$
begin
 insert into public.profiles(id,display_name) values(new.id,coalesce(new.raw_user_meta_data->>'full_name','')) on conflict do nothing;
 insert into public.subjects(user_id,name,category,color) values
 (new.id,'Derecho Civil I.1','Derecho privado','lavender'),
 (new.id,'Teoría del Derecho','Fundamentos jurídicos','mint'),
 (new.id,'Derecho Constitucional','Derecho público','peach'),
 (new.id,'Historia del Derecho Español','Historia jurídica','blue'),
 (new.id,'Derecho Procesal','Derecho público','pink'),
 (new.id,'Teoría del Estado Constitucional','Derecho público','yellow'),
 (new.id,'Fundamentos de la Democracia','Ciencias políticas','mint'),
 (new.id,'Derecho Civil I.2 Familia','Derecho privado','lavender'),
 (new.id,'Derecho Administrativo','Derecho público','blue') on conflict do nothing;
 insert into public.notification_preferences(user_id) values(new.id) on conflict do nothing;
 return new;
end;
$$;
revoke all on function public.initialize_study_user() from public;
create trigger initialize_study_user after insert on auth.users for each row execute function public.initialize_study_user();
-- Backfill accounts created before this migration.
insert into public.profiles(id,display_name) select id,coalesce(raw_user_meta_data->>'full_name','') from auth.users on conflict do nothing;
insert into public.subjects(user_id,name,category,color)
select u.id,v.name,v.category,v.color from auth.users u cross join (values
 ('Derecho Civil I.1','Derecho privado','lavender'),('Teoría del Derecho','Fundamentos jurídicos','mint'),
 ('Derecho Constitucional','Derecho público','peach'),('Historia del Derecho Español','Historia jurídica','blue'),
 ('Derecho Procesal','Derecho público','pink'),('Teoría del Estado Constitucional','Derecho público','yellow'),
 ('Fundamentos de la Democracia','Ciencias políticas','mint'),('Derecho Civil I.2 Familia','Derecho privado','lavender'),
 ('Derecho Administrativo','Derecho público','blue')
) as v(name,category,color) on conflict do nothing;
insert into public.notification_preferences(user_id) select id from auth.users on conflict do nothing;
create function public.delete_study_data() returns void language plpgsql security invoker set search_path='' as $$
begin
 if auth.uid() is null then raise exception 'Authentication required'; end if;
 delete from public.study_tasks where user_id=auth.uid();
 delete from public.study_sessions where user_id=auth.uid();
 delete from public.exam_dates where user_id=auth.uid();
 delete from public.notification_preferences where user_id=auth.uid();
 insert into public.notification_preferences(user_id) values(auth.uid());
end;
$$;
revoke all on function public.delete_study_data() from public;
grant execute on function public.delete_study_data() to authenticated;
commit;
