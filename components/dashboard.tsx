"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Plus,
  Flame,
  Clock3,
  CircleCheck,
  Target,
  ChevronRight,
  Sparkles,
  BookOpen,
  Play,
  CalendarDays,
  Leaf,
} from "lucide-react";
import { useStudy } from "./study-provider";
import { savedExamOption } from "@/lib/exam-calendar";
import {
  PageHeading,
  SubjectCard,
  SubjectDetail,
  TaskForm,
  TaskRow,
  Empty,
} from "./ui";
import {
  dateKey,
  streak,
  weeklyMinutes,
  localDate,
  type Subject,
} from "@/lib/model";
export function Dashboard() {
  const { data, user, startSession, ready } = useStudy();
  const [adding, setAdding] = useState(false);
  const [selected, setSelected] = useState<Subject | null>(null);
  const today = dateKey();
  const tasks = data.tasks.filter((t) => t.date === today);
  const complete = tasks.filter((t) => t.done).length;
  const minutes = data.sessions
    .filter((s) => s.date === today)
    .reduce((a, s) => a + s.minutes, 0);
  const days = weeklyMinutes(data.sessions);
  const totalWeek = days.reduce((a, d) => a + d.minutes, 0);
  const goal = data.preferences.dailyGoal;
  const progress = Math.min(100, Math.round((minutes / goal) * 100));
  const upcoming = data.exams
    .filter((e) => e.date >= today && e.confirmed)
    .sort((a, b) => a.date.localeCompare(b.date))[0];
  const nextTask = tasks.find((t) => !t.done);
  return (
    <>
      <PageHeading
        eyebrow="CADA DÍA CUENTA"
        title={`Tu próximo logro empieza hoy${user?.name ? ", " + user.name.split(" ")[0] : ""}.`}
        description="Un plan claro, un poco de constancia y todo lo que eres capaz de aprender."
        action={
          <button
            className="button secondary"
            disabled={!ready}
            onClick={() => setAdding(true)}
          >
            <Plus size={17} />
            Nueva tarea
          </button>
        }
      />
      <div className="dashboard-top">
        <section className="hero-card">
          <div className="hero-content">
            <div className="hero-kicker">
              <span className="status-dot" />
              TU MOMENTO DE CONCENTRACIÓN
            </div>
            <h2>
              Paso a paso.
              <br />
              Tema a tema.
              <br />
              <em>Más cerca de tu meta.</em>
            </h2>
            <p>
              Hoy es un buen día para avanzar.
              <br />
              Vamos a hacerlo a tu ritmo.
            </p>
            <button
              className="button dark"
              disabled={!ready || !data.subjects.length}
              onClick={() =>
                startSession(nextTask?.subjectId ?? data.subjects[0].id)
              }
            >
              <Play size={15} fill="currentColor" />
              Empezar a estudiar
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-tiny-star star-one">✦</div>
            <div className="art-tiny-star star-two">✦</div>
            <div className="art-plant">
              <span />
              <span />
              <span />
              <i />
            </div>
            <div className="book book-back">
              <span>EL SABER</span>
              <i />
            </div>
            <div className="book book-front">
              <div className="book-line" />
              <ScaleDrawing />
              <b>DERECHO</b>
              <span>UN TEMA A LA VEZ</span>
            </div>
            <div className="book-horizontal lavender-book" />
            <div className="book-horizontal cream-book" />
            <div className="art-seal">
              <CircleCheck size={20} />
            </div>
          </div>
        </section>
        <section className="daily-goal card">
          <div className="card-heading">
            <h2>Tu objetivo de hoy</h2>
            <Target size={18} />
          </div>
          <div
            className="goal-ring"
            style={{
              background: `conic-gradient(var(--green) ${progress * 3.6}deg, #eaf0eb 0deg)`,
            }}
          >
            <div>
              <span>
                {minutes}
                <small> / {goal}</small>
              </span>
              <p>minutos de estudio</p>
            </div>
            <span className="ring-spark">
              <Sparkles size={16} />
            </span>
          </div>
          <h3>
            {progress >= 100 ? "¡Objetivo conseguido!" : "Cada minuto suma"}
          </h3>
          <p>
            {progress >= 100
              ? "Date un respiro. Te lo has ganado."
              : `Te quedan ${Math.max(0, goal - minutes)} minutos para tu meta diaria.`}
          </p>
          <Link href="/ajustes">
            Ajustar mi objetivo <ChevronRight size={14} />
          </Link>
        </section>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon peach">
            <Flame size={19} />
          </span>
          <div>
            <span>Racha de estudio</span>
            <strong>
              {streak(data.sessions)} <small>días</small>
            </strong>
          </div>
          <span className="stat-detail">Sigue así</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon mint">
            <Clock3 size={19} />
          </span>
          <div>
            <span>Esta semana</span>
            <strong>
              {Math.floor(totalWeek / 60)}
              <small> h </small>
              {totalWeek % 60}
              <small> min</small>
            </strong>
          </div>
          <span className="stat-detail">Últimos 7 días</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon lavender">
            <CircleCheck size={19} />
          </span>
          <div>
            <span>Tareas de hoy</span>
            <strong>
              {complete}
              <small> / {tasks.length}</small>
            </strong>
          </div>
          <span className="stat-detail">Completadas</span>
        </div>
      </div>
      <section className="subjects-section">
        <div className="section-heading">
          <div>
            <h2>
              Tus asignaturas{" "}
              <span className="count-badge">{data.subjects.length}</span>
            </h2>
            <p>Cada asignatura, un nuevo camino por descubrir.</p>
          </div>
          <Link href="/asignaturas" className="text-link">
            Ver todas <ArrowRight size={16} />
          </Link>
        </div>
        <div className="subject-grid">
          {data.subjects.slice(0, 4).map((s) => (
            <SubjectCard key={s.id} subject={s} onOpen={() => setSelected(s)} />
          ))}
        </div>
        {!data.subjects.length && ready && (
          <Empty
            title="Aún no hay asignaturas"
            description="Comprueba que las migraciones y la inicialización de tu cuenta se han ejecutado."
          />
        )}
      </section>
      <div className="dashboard-bottom">
        <section className="card today-card">
          <div className="card-heading">
            <h2>
              Tu plan para hoy{" "}
              <span className="count-badge">{tasks.length}</span>
            </h2>
            <span className="date-label">
              {localDate(today).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
              })}
            </span>
          </div>
          <div className="tasks-list">
            {tasks.length ? (
              tasks.map((t) => <TaskRow key={t.id} task={t} />)
            ) : (
              <Empty
                title="Un día por escribir"
                description="Añade una tarea y da el primer paso."
              />
            )}
          </div>
          <button
            className="add-task-link"
            disabled={!ready}
            onClick={() => setAdding(true)}
          >
            <Plus size={16} />
            Añadir una tarea
          </button>
        </section>
        <section className="card next-card">
          <div className="card-heading">
            <h2>A la vista</h2>
            <CalendarDays size={18} />
          </div>
          {upcoming ? (
            <>
              <span className="next-date">
                {localDate(upcoming.date).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
              <h3>{upcoming.title}</h3>
              <p>
                {data.subjects.find((s) => s.id === upcoming.subjectId)?.name}
              </p>
              <span className="confirmed-badge">
                <CircleCheck size={13} />
                {savedExamOption(upcoming)
                  ? "Tu elección · borrador"
                  : "Confirmada por ti"}
              </span>
            </>
          ) : (
            <>
              <div className="next-illustration">
                <CalendarDays size={28} />
                <span>
                  <Leaf size={15} />
                </span>
              </div>
              <h3>Sin prisa. Con un plan.</h3>
              <p>Añade tus fechas de examen cuando las hayas confirmado.</p>
            </>
          )}
          <Link href="/calendario" className="text-link">
            Ir a mi calendario <ArrowUpRight size={15} />
          </Link>
        </section>
      </div>
      <div className="gentle-note">
        <BookOpen size={17} />
        <p>Aprender no es una carrera. Es encontrar tu propio ritmo.</p>
        <Sparkles size={15} />
      </div>
      {adding && <TaskForm onClose={() => setAdding(false)} />}{" "}
      {selected && (
        <SubjectDetail subject={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
function ScaleDrawing() {
  return (
    <svg width="65" height="65" viewBox="0 0 80 80" fill="none">
      <path
        d="M40 15v49M22 65h36M17 28h46M40 18l-4 6h8l-4-6ZM22 29 10 48h24L22 29ZM58 29 46 48h24L58 29Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 48c0 12 24 12 24 0M46 48c0 12 24 12 24 0"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
