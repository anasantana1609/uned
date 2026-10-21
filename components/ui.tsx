"use client";
import { useEffect, useRef, useState } from "react";
import {
  X,
  BookOpen,
  Landmark,
  Scale,
  ScrollText,
  Plus,
  Clock3,
  Check,
  Trash2,
  Play,
  ChevronRight,
  CalendarDays,
} from "lucide-react";
import { useStudy } from "./study-provider";
import { dateKey, localDate, type Subject, type Task } from "@/lib/model";
export function SubjectIcon({
  subject,
  size = 21,
}: {
  subject: Subject;
  size?: number;
}) {
  const Icon =
    subject.color === "lavender"
      ? Scale
      : subject.color === "mint"
        ? BookOpen
        : subject.color === "peach"
          ? Landmark
          : ScrollText;
  return (
    <span className={`subject-icon ${subject.color}`}>
      <Icon size={size} />
    </span>
  );
}
export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}
export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const el = ref.current;
    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    el?.querySelector<HTMLElement>("input,select,button,textarea")?.focus();
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") closeRef.current();
      if (e.key === "Tab") {
        const list = Array.from(
          el?.querySelectorAll<HTMLElement>(
            "button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),a[href]",
          ) ?? [],
        );
        const first = list[0],
          last = list.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      document.body.style.overflow = bodyOverflow;
      previous?.focus();
    };
  }, []);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <h2 id="dialog-title">{title}</h2>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Cerrar ventana"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
export function TaskForm({
  onClose,
  initialSubject,
  initialDate,
}: {
  onClose: () => void;
  initialSubject?: string;
  initialDate?: string;
}) {
  const { data, addTask, busy, ready } = useStudy();
  const [subjectId, setSubjectId] = useState(
    initialSubject ?? data.subjects[0]?.id ?? "",
  );
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(initialDate ?? dateKey());
  const [minutes, setMinutes] = useState(25);
  const [kind, setKind] = useState("Repaso");
  return (
    <Modal title="Una nueva meta para tu plan" onClose={onClose}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (await addTask({ subjectId, title, date, minutes, kind }))
            onClose();
        }}
        className="form-stack"
      >
        <label>
          ¿Qué vas a estudiar?
          <input
            required
            maxLength={160}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Por ejemplo: repasar el tema 3"
          />
        </label>
        <label>
          Asignatura
          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            required
          >
            <option value="" disabled>
              Selecciona una asignatura
            </option>
            {data.subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <div className="form-grid">
          <label>
            Fecha
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label>
            Duración (min)
            <input
              type="number"
              min={5}
              max={480}
              required
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
            />
          </label>
        </div>
        <label>
          Tipo de actividad
          <select value={kind} onChange={(e) => setKind(e.target.value)}>
            {["Repaso", "Lectura", "Esquema", "Práctica", "Memorización"].map(
              (k) => (
                <option key={k}>{k}</option>
              ),
            )}
          </select>
        </label>
        <button disabled={busy || !ready} className="button">
          {busy ? "Guardando…" : "Añadir tarea"}
          <Plus size={17} />
        </button>
      </form>
    </Modal>
  );
}
export function TaskRow({
  task,
  showDate = false,
}: {
  task: Task;
  showDate?: boolean;
}) {
  const { data, toggleTask, deleteTask, startSession, busy, ready } =
    useStudy();
  const subject = data.subjects.find((s) => s.id === task.subjectId);
  return (
    <div className={`task-row ${task.done ? "completed" : ""}`}>
      <button
        className="task-check"
        aria-label={`${task.done ? "Marcar pendiente" : "Completar"}: ${task.title}`}
        disabled={busy || !ready}
        onClick={() => void toggleTask(task.id)}
        aria-pressed={task.done}
      >
        {task.done && <Check size={13} />}
      </button>
      <div className="task-info">
        <strong>{task.title}</strong>
        <span>
          <i className={`subject-dot ${subject?.color ?? "mint"}`} />
          {subject?.name}
          <span className="inline-divider">·</span>
          {showDate
            ? localDate(task.date).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "short",
              })
            : task.kind}
        </span>
      </div>
      <span className="task-duration">
        <Clock3 size={13} />
        {task.minutes} min
      </span>
      <button
        className="icon-button task-play"
        title="Iniciar sesión"
        aria-label={`Estudiar: ${task.title}`}
        disabled={!ready}
        onClick={() => startSession(task.subjectId)}
      >
        <Play size={15} />
      </button>
      <button
        className="icon-button task-delete"
        aria-label={`Eliminar: ${task.title}`}
        disabled={busy}
        onClick={() => void deleteTask(task.id)}
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
export function Empty({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="empty-state">
      <span className="empty-icon">
        <BookOpen size={26} />
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  );
}
export function SubjectCard({
  subject,
  onOpen,
}: {
  subject: Subject;
  onOpen: () => void;
}) {
  const { data } = useStudy();
  const minutes = data.sessions
    .filter((s) => s.subjectId === subject.id)
    .reduce((a, s) => a + s.minutes, 0);
  const percent = Math.min(100, Math.round((minutes / subject.goal) * 100));
  const tasks = data.tasks.filter(
    (t) => t.subjectId === subject.id && !t.done,
  ).length;
  return (
    <button className="subject-card" onClick={onOpen}>
      <div className="subject-card-top">
        <SubjectIcon subject={subject} />
        <span className="subject-open">
          <ChevronRight size={17} />
        </span>
      </div>
      <h3>{subject.name}</h3>
      <p>{subject.category}</p>
      <div className="subject-progress-label">
        <span>Objetivo de estudio</span>
        <strong>{percent}%</strong>
      </div>
      <div className={`progress-track ${subject.color}`}>
        <span style={{ width: `${percent}%` }} />
      </div>
      <div className="subject-card-bottom">
        <span>
          <Clock3 size={12} />
          {minutes} / {subject.goal} min
        </span>
        <span>
          {tasks} {tasks === 1 ? "tarea" : "tareas"}
        </span>
      </div>
    </button>
  );
}
export function SubjectDetail({
  subject,
  onClose,
}: {
  subject: Subject;
  onClose: () => void;
}) {
  const { data, startSession, ready } = useStudy();
  const [add, setAdd] = useState(false);
  const tasks = data.tasks.filter((t) => t.subjectId === subject.id);
  const minutes = data.sessions
    .filter((s) => s.subjectId === subject.id)
    .reduce((a, s) => a + s.minutes, 0);
  if (add)
    return (
      <TaskForm initialSubject={subject.id} onClose={() => setAdd(false)} />
    );
  return (
    <Modal title={subject.name} onClose={onClose}>
      <div className="detail-summary">
        <SubjectIcon subject={subject} />
        <div>
          <strong>{minutes} minutos estudiados</strong>
          <p>
            {subject.category} · Objetivo: {subject.goal} min
          </p>
        </div>
      </div>
      <p className="muted">
        Asignatura pendiente de validación académica. El progreso mide tiempo de
        estudio, no dominio del temario.
      </p>
      <div className="detail-actions">
        <button
          className="button"
          disabled={!ready}
          onClick={() => {
            startSession(subject.id);
            onClose();
          }}
        >
          <Play size={16} />
          Iniciar sesión
        </button>
        <button className="button secondary" onClick={() => setAdd(true)}>
          <Plus size={16} />
          Añadir tarea
        </button>
      </div>
      <h3 className="section-subtitle">Tu plan de la asignatura</h3>
      {tasks.length ? (
        tasks.map((t) => <TaskRow key={t.id} task={t} showDate />)
      ) : (
        <Empty
          title="Todo por aprender"
          description="Añade tu primera tarea para esta asignatura."
        />
      )}
      <div className="inline-note">
        <CalendarDays size={17} />
        <span>
          Las fechas de examen se añaden y confirman en el plan de estudio.
        </span>
      </div>
    </Modal>
  );
}
