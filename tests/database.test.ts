import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
const alice = "11111111-1111-4111-8111-111111111111";
const bob = "22222222-2222-4222-8222-222222222222";
test("migration initializes users, enforces RLS and rejects cross-user links and unconfirmed exams", async () => {
  const db = new PGlite();
  try {
    await db.exec(
      `create role authenticated; create role anon; create schema auth; create table auth.users (id uuid primary key, raw_user_meta_data jsonb default '{}'); create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$; grant usage on schema public,auth to authenticated,anon; grant execute on function auth.uid() to authenticated,anon;`,
    );
    await db.exec(
      await readFile(
        new URL(
          "../supabase/migrations/202610210001_initial.sql",
          import.meta.url,
        ),
        "utf8",
      ),
    );
    await db.query("insert into auth.users (id) values ($1),($2)", [
      alice,
      bob,
    ]);
    assert.equal(
      (
        await db.query<{ count: number }>(
          "select count(*)::int as count from public.subjects",
        )
      ).rows[0].count,
      18,
    );
    await db.exec(
      `set role authenticated; set request.jwt.claim.sub='${alice}';`,
    );
    const own = await db.query<{ id: string; user_id: string }>(
      "select id,user_id from public.subjects",
    );
    assert.equal(own.rows.length, 9);
    assert(own.rows.every((s) => s.user_id === alice));
    const subjectA = own.rows[0].id;
    await db.query(
      "insert into public.study_tasks(subject_id,title,scheduled_date,minutes,kind) values($1,'Alice task','2026-10-21',25,'Repaso')",
      [subjectA],
    );
    await db.exec(`set request.jwt.claim.sub='${bob}';`);
    assert.equal(
      (await db.query("select * from public.study_tasks")).rows.length,
      0,
    );
    const subjectB = (
      await db.query<{ id: string }>("select id from public.subjects limit 1")
    ).rows[0].id;
    await assert.rejects(
      () =>
        db.query(
          "insert into public.study_tasks(user_id,subject_id,title,scheduled_date,minutes,kind) values($1,$2,'forged','2026-10-21',25,'Repaso')",
          [alice, subjectA],
        ),
      /row-level security/,
    );
    await assert.rejects(
      () =>
        db.query(
          "insert into public.study_tasks(subject_id,title,scheduled_date,minutes,kind) values($1,'cross-link','2026-10-21',25,'Repaso')",
          [subjectA],
        ),
      /foreign key/,
    );
    await assert.rejects(
      () =>
        db.query(
          "insert into public.exam_dates(subject_id,title,exam_date,confirmed) values($1,'unconfirmed','2026-12-01',false)",
          [subjectB],
        ),
      /check constraint/,
    );
    await db.query(
      "insert into public.study_tasks(subject_id,title,scheduled_date,minutes,kind) values($1,'Bob task','2026-10-21',25,'Repaso')",
      [subjectB],
    );
    await db.query("select public.delete_study_data()");
    assert.equal(
      (await db.query("select * from public.study_tasks")).rows.length,
      0,
    );
    assert.equal(
      (await db.query("select * from public.subjects")).rows.length,
      9,
    );
    await db.exec(`set request.jwt.claim.sub='${alice}';`);
    assert.equal(
      (await db.query("select * from public.study_tasks")).rows.length,
      1,
    );
    await db.exec("set role anon");
    await assert.rejects(
      () => db.query("select * from public.study_tasks"),
      /permission denied/,
    );
  } finally {
    await db.close();
  }
});
