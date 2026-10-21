"use client";
import { useState } from "react";
import { Clock3, Flame, CheckCircle2, Plus, TrendingUp } from "lucide-react";
import { useStudy } from "@/components/study-provider";
import { PageHeading, SubjectIcon, Modal, Empty } from "@/components/ui";
import { weeklyMinutes, streak, localDate, dateKey } from "@/lib/model";
export default function Progress() {
  const { data, recordSession, ready, busy } = useStudy();
  const [adding, setAdding] = useState(false);
  const [subjectId, setSubjectId] = useState("");
  const [minutes, setMinutes] = useState(25);
  const days = weeklyMinutes(data.sessions);
  const max = Math.max(
    data.preferences.dailyGoal,
    ...days.map((d) => d.minutes),
  );
  const total = data.sessions.reduce((a, s) => a + s.minutes, 0);
  return (
    <>
      <PageHeading
        eyebrow="LO QUE CONSTRUYES CADA DÍA"
        title="Mira todo lo que avanzas."
        description="El progreso empieza con la constancia. Cada sesión cuenta."
        action={
          <button
            className="button secondary"
            disabled={!ready}
            onClick={() => setAdding(true)}
          >
            <Plus size={16} />
            Registrar estudio
          </button>
        }
      />
      <div className="stats-grid progress-stats">
        <div className="stat-card">
          <span className="stat-icon mint">
            <Clock3 size={21} />
          </span>
          <div>
            <span>Tiempo total registrado</span>
            <strong>
              {Math.floor(total / 60)}
              <small> h </small>
              {total % 60}
              <small> min</small>
            </strong>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon peach">
            <Flame size={21} />
          </span>
          <div>
            <span>Racha actual</span>
            <strong>
              {streak(data.sessions)}
              <small> días</small>
            </strong>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon lavender">
            <CheckCircle2 size={21} />
          </span>
          <div>
            <span>Tareas completadas</span>
            <strong>
              {data.tasks.filter((t) => t.done).length}
              <small> / {data.tasks.length}</small>
            </strong>
          </div>
        </div>
      </div>
      <div className="progress-layout">
        <section className="card weekly-chart">
          <div className="card-heading">
            <div>
              <h2>Tu semana de estudio</h2>
              <p>Tiempo registrado en los últimos 7 días</p>
            </div>
            <TrendingUp size={20} />
          </div>
          <div className="chart-bars">
            {days.map((d) => (
              <div className="chart-column" key={d.date}>
                <strong>
                  {d.minutes}
                  <small> min</small>
                </strong>
                <div className="bar-space">
                  <div
                    className={`chart-bar ${d.date === dateKey() ? "current" : ""}`}
                    style={{
                      height: `${Math.max(2, (d.minutes / max) * 100)}%`,
                    }}
                  />
                </div>
                <span>
                  {localDate(d.date).toLocaleDateString("es-ES", {
                    weekday: "short",
                  })}
                </span>
                <small>{localDate(d.date).getDate()}</small>
              </div>
            ))}
          </div>
          <p className="footnote">
            {days.reduce((a, d) => a + d.minutes, 0)} minutos en esta semana ·
            Objetivo diario: {data.preferences.dailyGoal} min
          </p>
        </section>
        <section className="card subject-time">
          <div className="card-heading">
            <h2>Tiempo por asignatura</h2>
          </div>
          {data.subjects.map((s) => {
            const minutes = data.sessions
              .filter((x) => x.subjectId === s.id)
              .reduce((a, x) => a + x.minutes, 0);
            return (
              <div className="time-row" key={s.id}>
                <SubjectIcon subject={s} size={17} />
                <div>
                  <strong>{s.name}</strong>
                  <div className={`progress-track ${s.color}`}>
                    <span
                      style={{
                        width: `${Math.min(100, (minutes / s.goal) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
                <span>{minutes} min</span>
              </div>
            );
          })}
        </section>
      </div>
      <section className="card session-history">
        <div className="card-heading">
          <h2>Últimas sesiones</h2>
          <span className="muted">Registro de estudio</span>
        </div>
        {data.sessions.length ? (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Asignatura</th>
                  <th>Fecha</th>
                  <th>Tiempo</th>
                </tr>
              </thead>
              <tbody>
                {[...data.sessions]
                  .sort((a, b) => b.date.localeCompare(a.date))
                  .slice(0, 15)
                  .map((s) => (
                    <tr key={s.id}>
                      <td>
                        {data.subjects.find((x) => x.id === s.subjectId)?.name}
                      </td>
                      <td>{localDate(s.date).toLocaleDateString("es-ES")}</td>
                      <td>{s.minutes} minutos</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty
            title="Tu primera sesión te espera"
            description="Inicia el temporizador o registra el tiempo que ya has estudiado."
          />
        )}
      </section>
      <p className="footnote">
        Completar una tarea no añade minutos automáticamente. El tiempo procede
        del temporizador o de tus registros manuales. No representa una
        calificación académica.
      </p>
      {adding && (
        <Modal
          title="Registrar tiempo de estudio"
          onClose={() => setAdding(false)}
        >
          <form
            className="form-stack"
            onSubmit={async (e) => {
              e.preventDefault();
              if (await recordSession(subjectId, minutes)) setAdding(false);
            }}
          >
            <p className="muted">
              Añade el tiempo que has estudiado hoy fuera del temporizador.
            </p>
            <label>
              Asignatura
              <select
                required
                value={subjectId}
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
              Minutos estudiados
              <input
                type="number"
                required
                min={1}
                max={480}
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
              />
            </label>
            <button className="button" disabled={busy}>
              Guardar sesión
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
