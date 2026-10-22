"use client";

import { useState } from "react";
import { CalendarDays, CheckCircle2, ExternalLink } from "lucide-react";
import { useStudy } from "./study-provider";
import { Modal } from "./ui";
import { localDate } from "@/lib/model";
import {
  examCalendar,
  semesterExams,
  savedExamOption,
  type SemesterExam,
  type ExamOption,
} from "@/lib/exam-calendar";

export function examDateLabel(date: string) {
  return localDate(date).toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ExamOptions({
  onChoose,
}: {
  onChoose: (date: string) => void;
}) {
  const { data, ready, busy, chooseExamOption, deleteExam } = useStudy();
  const [pending, setPending] = useState<{
    subject: SemesterExam;
    option: ExamOption;
    subjectId: string;
  } | null>(null);
  const [acknowledged, setAcknowledged] = useState(false);
  const subjects = semesterExams.filter((exam) =>
    data.subjects.some((s) => s.name === exam.subjectName),
  );
  return (
    <section className="card exam-options" aria-labelledby="exam-options-title">
      <div className="card-heading">
        <div>
          <p className="eyebrow">PRIMER CUATRIMESTRE · 2026/2027</p>
          <h2 id="exam-options-title">Tus opciones de examen</h2>
        </div>
        <CalendarDays size={23} aria-hidden="true" />
      </div>
      <p>
        Asignaturas resaltadas en tu PDF. Elige una de las dos semanas por
        asignatura; puedes cambiar tu elección después.
      </p>
      <p className="exam-draft-notice">
        <strong>Borrador · Las Palmas · hora de Canarias.</strong> Estas
        opciones son provisionales. Comprueba la versión definitiva y tu centro
        antes de presentarte. Las horas ya están indicadas para Canarias: no se
        resta otra hora.
      </p>
      <a
        className="exam-source"
        href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${examCalendar.source}#page=2`}
        target="_blank"
        rel="noreferrer"
      >
        Consultar el PDF original <ExternalLink size={14} aria-hidden="true" />
      </a>
      <div className="exam-options-grid">
        {subjects.map((subject) => {
          const own = data.subjects.find(
            (s) => s.name === subject.subjectName,
          )!;
          const saved = data.exams.find(
            (e) =>
              e.subjectId === own.id &&
              savedExamOption(e)?.subject.code === subject.code,
          );
          return (
            <article
              className="exam-option-card"
              key={subject.code}
              aria-label={subject.subjectName}
            >
              <h3>{subject.subjectName}</h3>
              <p className="exam-official-name">
                {subject.officialName} · {subject.code}
              </p>
              <p className="exam-source-page">
                Grado en Derecho · PDF, páginas 2–3
              </p>
              {subject.subjectName === "Derecho Procesal" && (
                <p className="exam-mapping-note">
                  Se corresponde aquí con Introducción al Derecho Procesal, no
                  con Procesal I.1 o II. Comprueba tu matrícula al elegir.
                </p>
              )}
              <div className="exam-week-options">
                {subject.options.map((option, i) => {
                  const chosen = saved?.date === option.date;
                  return (
                    <button
                      key={option.date}
                      className={`exam-week-option ${chosen ? "chosen" : ""}`}
                      aria-pressed={chosen}
                      disabled={!ready || busy}
                      onClick={() => {
                        setAcknowledged(false);
                        setPending({ subject, option, subjectId: own.id });
                      }}
                    >
                      <span>
                        {i + 1}ª semana{" "}
                        {chosen && (
                          <CheckCircle2 size={15} aria-hidden="true" />
                        )}
                      </span>
                      <strong>{examDateLabel(option.date)}</strong>
                      <span>{option.time} · Canarias</span>
                      <small>
                        {chosen
                          ? "Tu elección provisional · cambiar"
                          : "Elegir esta opción"}
                      </small>
                    </button>
                  );
                })}
              </div>
              {saved && (
                <div className="exam-choice-actions">
                  <button
                    className="button secondary small"
                    onClick={() => onChoose(saved.date)}
                  >
                    Ver en el calendario
                  </button>
                  <button
                    className="add-task-link"
                    disabled={busy}
                    onClick={() => void deleteExam(saved.id)}
                  >
                    Quitar elección
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>
      <p className="footnote">
        Civil I.2 Familia no aparece en esta convocatoria. Derecho
        Constitucional y Derecho Administrativo necesitan concretar el nombre o
        código de la asignatura antes de asignarles fechas.
      </p>
      {pending && (
        <Modal title="Elegir opción de examen" onClose={() => setPending(null)}>
          <form
            className="form-stack"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!acknowledged) return;
              if (
                await chooseExamOption(
                  pending.subjectId,
                  pending.subject.code,
                  pending.option.date,
                )
              ) {
                onChoose(pending.option.date);
                setPending(null);
              }
            }}
          >
            <p>
              <strong>{pending.subject.officialName}</strong>
              <br />
              {pending.subject.code}
            </p>
            <p>
              {examDateLabel(pending.option.date)}
              <br />
              <strong>{pending.option.time} · hora de Canarias</strong>
            </p>
            <p>
              Esta elección sustituye tu otra opción de esta convocatoria para
              la misma asignatura. No realiza una inscripción en la UNED.
            </p>
            <label className="checkbox-label">
              <input
                type="checkbox"
                required
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
              />
              He revisado la asignatura y el centro, y entiendo que el PDF es un
              borrador.
            </label>
            <button className="button" disabled={!acknowledged || busy}>
              Guardar mi elección provisional
            </button>
          </form>
        </Modal>
      )}
    </section>
  );
}
