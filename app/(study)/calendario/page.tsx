"use client";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  CalendarDays,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { useStudy } from "@/components/study-provider";
import { PageHeading, TaskForm, TaskRow, Modal, Empty } from "@/components/ui";
import { dateKey, localDate } from "@/lib/model";
export default function Calendar() {
  const { data, addExam, deleteExam, busy, ready } = useStudy();
  const today = dateKey();
  const [month, setMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  const [selected, setSelected] = useState(today);
  const [task, setTask] = useState(false);
  const [exam, setExam] = useState(false);
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [examDate, setExamDate] = useState(today);
  const [confirmed, setConfirmed] = useState(false);
  const start = new Date(month);
  start.setDate(1 - ((month.getDay() + 6) % 7));
  const cells = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d;
  });
  const tasks = data.tasks.filter((t) => t.date === selected);
  const exams = data.exams.filter((e) => e.date === selected);
  function changeMonth(n: number) {
    setMonth((d) => new Date(d.getFullYear(), d.getMonth() + n, 1));
  }
  return (
    <>
      <PageHeading
        eyebrow="DALE ESPACIO A TUS METAS"
        title="Tu plan, a tu ritmo."
        description="Organiza tu semana y convierte los pequeños pasos en grandes avances."
        action={
          <button
            className="button"
            disabled={!ready}
            onClick={() => setTask(true)}
          >
            <Plus size={17} />
            Nueva tarea
          </button>
        }
      />
      <div className="calendar-layout">
        <section className="card calendar-card">
          <div className="calendar-heading">
            <h2>
              {month.toLocaleDateString("es-ES", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <div>
              <button
                className="button secondary small"
                onClick={() => {
                  setMonth(
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      1,
                    ),
                  );
                  setSelected(today);
                }}
              >
                Hoy
              </button>
              <button
                className="icon-button"
                aria-label="Mes anterior"
                onClick={() => changeMonth(-1)}
              >
                <ChevronLeft size={19} />
              </button>
              <button
                className="icon-button"
                aria-label="Mes siguiente"
                onClick={() => changeMonth(1)}
              >
                <ChevronRight size={19} />
              </button>
            </div>
          </div>
          <div className="calendar-grid">
            {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => (
              <span className="weekday" key={d}>
                {d}
              </span>
            ))}
            {cells.map((d) => {
              const key = dateKey(d);
              const dayTasks = data.tasks.filter((t) => t.date === key);
              const dayExams = data.exams.filter((e) => e.date === key);
              return (
                <button
                  key={key}
                  onClick={() => setSelected(key)}
                  aria-pressed={key === selected}
                  aria-label={`${d.toLocaleDateString("es-ES", { day: "numeric", month: "long" })}, ${dayTasks.length} tareas, ${dayExams.length} exámenes`}
                  className={`calendar-day ${d.getMonth() !== month.getMonth() ? "other-month" : ""} ${key === today ? "is-today" : ""} ${key === selected ? "selected" : ""}`}
                >
                  <span>{d.getDate()}</span>
                  <div className="calendar-events">
                    {dayExams.slice(0, 1).map((e) => (
                      <small className="exam-chip" key={e.id}>
                        {e.title}
                      </small>
                    ))}
                    {dayTasks.slice(0, 2).map((t) => (
                      <small
                        key={t.id}
                        className={`task-chip ${t.done ? "done" : ""}`}
                      >
                        {t.title}
                      </small>
                    ))}
                    {dayTasks.length + dayExams.length > 3 && (
                      <small>
                        +{dayTasks.length + dayExams.length - 3} más
                      </small>
                    )}
                  </div>
                  <div className="mobile-day-dots">
                    {dayTasks.length > 0 && <i />}
                    {dayExams.length > 0 && <i className="exam-dot" />}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="calendar-legend">
            <span>
              <i />
              Tareas de estudio
            </span>
            <span>
              <i className="exam-dot" />
              Exámenes confirmados
            </span>
          </div>
        </section>
        <aside className="calendar-agenda card">
          <div className="card-heading">
            <h2>
              {localDate(selected).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
              })}
            </h2>
            <CalendarDays size={19} />
          </div>
          <h3 className="section-subtitle">Tu agenda del día</h3>
          {tasks.map((t) => (
            <TaskRow key={t.id} task={t} />
          ))}
          {exams.map((e) => (
            <div className="exam-item" key={e.id}>
              <span className="subject-icon peach">
                <CalendarDays size={19} />
              </span>
              <div>
                <strong>{e.title}</strong>
                <p>{data.subjects.find((s) => s.id === e.subjectId)?.name}</p>
                <small>
                  <CheckCircle2 size={12} />
                  Confirmado por ti
                </small>
              </div>
              <button
                disabled={busy}
                className="icon-button"
                aria-label={`Eliminar examen: ${e.title}`}
                onClick={() => void deleteExam(e.id)}
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
          {!tasks.length && !exams.length && (
            <Empty
              title="Un espacio para avanzar"
              description="No tienes actividades para este día."
            />
          )}
          <button
            className="add-task-link"
            disabled={!ready}
            onClick={() => setTask(true)}
          >
            <Plus size={16} />
            Añadir tarea
          </button>
          <div className="agenda-exam">
            <h3>¿Ya tienes fecha de examen?</h3>
            <p>Añádela solo después de comprobarla en una fuente oficial.</p>
            <button
              className="button secondary small"
              disabled={!ready}
              onClick={() => {
                setExamDate(selected);
                setExam(true);
              }}
            >
              <CalendarDays size={14} />
              Añadir examen
            </button>
          </div>
        </aside>
      </div>
      <p className="footnote">
        No se asume ninguna convocatoria. Las fechas de examen son introducidas
        y confirmadas por ti.
      </p>
      {task && (
        <TaskForm initialDate={selected} onClose={() => setTask(false)} />
      )}{" "}
      {exam && (
        <Modal title="Añadir fecha de examen" onClose={() => setExam(false)}>
          <form
            className="form-stack"
            onSubmit={async (e) => {
              e.preventDefault();
              if (
                await addExam({ title, subjectId, date: examDate, confirmed })
              ) {
                setExam(false);
                setTitle("");
                setConfirmed(false);
              }
            }}
          >
            <label>
              Nombre del examen
              <input
                required
                maxLength={160}
                placeholder="Por ejemplo: prueba presencial"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              Asignatura
              <select
                value={subjectId}
                required
                onChange={(e) => setSubjectId(e.target.value)}
              >
                <option value="">Selecciona una asignatura</option>
                {data.subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Fecha
              <input
                required
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
              />
            </label>
            <label className="checkbox-label">
              <input
                required
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
              He comprobado esta fecha en una fuente oficial.
            </label>
            <button className="button" disabled={busy}>
              Guardar fecha confirmada
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
