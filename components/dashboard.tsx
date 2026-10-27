"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowLeft,
  BookOpen,
  ClipboardList,
  ChevronDown,
  LockKeyhole,
  MoreHorizontal,
} from "lucide-react";
import { useStudy } from "./study-provider";
import {
  firstYearCatalog,
  catalogEntry,
  subjectTitle,
} from "@/lib/subject-catalog";
import { GuidedLearning } from "./guided-learning";
import { ExamPractice } from "./exam-practice";
import { subjectColors, subjectTheme } from "@/lib/subject-theme";
import { lessonsFor } from "@/lib/learning";

export function Dashboard() {
  const {
    data,
    ready,
    studySelection: selection,
    setStudySelection: setSelection,
    studyMode,
  } = useStudy();
  const [expanded, setExpanded] = useState<string | null>(null);
  const focusRef = useRef<HTMLElement>(null);
  const backRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (selection) {
      focusRef.current?.focus();
      window.scrollTo({ top: 0 });
    } else backRef.current?.focus();
  }, [selection]);
  const subjects = [...firstYearCatalog]
    .sort((a, b) => Number(b.firstSemester) - Number(a.firstSemester))
    .filter((entry) =>
      data.subjects.some((s) => catalogEntry(s)?.code === entry.code),
    );
  if (selection) {
    const subject = subjects.find((s) => s.code === selection.code)!;
    const available = lessonsFor(subject.code);
    return (
      <section
        ref={focusRef}
        tabIndex={-1}
        className="subject-workspace subject-theme"
        style={subjectTheme(subject.code)}
        aria-label={`${subject.title}: ${selection.mode === "lessons" ? "lecciones" : "exámenes"}`}
      >
        <header className="subject-study-header">
          <button
            type="button"
            className="study-back"
            aria-label="Volver a mis asignaturas"
            title="Volver a mis asignaturas"
            onClick={() => setSelection(null)}
          >
            <ArrowLeft size={24} aria-hidden="true" />
          </button>
          <div className="study-subject-name">
            <h1 title={subject.title}>{subject.title}</h1>
            <span>
              {selection.mode === "lessons" ? "Lecciones" : "Exámenes"}
            </span>
          </div>
          <details className="study-activity-menu">
            <summary aria-label="Cambiar actividad" title="Cambiar actividad">
              <MoreHorizontal size={26} aria-hidden="true" />
            </summary>
            <div>
              <label htmlFor="study-activity">Actividad de la asignatura</label>
              <select
                id="study-activity"
                value={selection.mode}
                onChange={(event) => {
                  setSelection({
                    ...selection,
                    mode: event.target.value as "lessons" | "exams",
                  });
                  event.target.closest("details")?.removeAttribute("open");
                }}
              >
                <option value="lessons">Lecciones</option>
                <option value="exams">Exámenes</option>
              </select>
            </div>
          </details>
        </header>
        {selection.mode === "exams" ? (
          <ExamPractice key={subject.code} code={subject.code} />
        ) : (
          <>
            {!!available.length && <GuidedLearning code={subject.code} />}
            {!available.length && (
              <div className="card lesson-empty">
                <h2>Todavía no hay lecciones disponibles</h2>
              </div>
            )}
          </>
        )}
      </section>
    );
  }
  return (
    <>
      <h1 className="subject-home-heading">
        {studyMode ? "Elige una asignatura" : "Mis asignaturas"}
      </h1>
      {studyMode && (
        <p className="study-chooser-label">
          {studyMode === "lessons"
            ? "Lecciones · Aprende a tu ritmo"
            : "Examen · Practica lo aprendido"}
        </p>
      )}
      <section className="subject-home-list" aria-label="Asignaturas del curso">
        {subjects.map((entry) => {
          const open = expanded === entry.code;
          return (
            <article
              key={entry.code}
              className={`subject-home-row ${!entry.firstSemester ? "semester-locked" : ""}`}
              style={
                {
                  "--subject-bg": subjectColors[entry.code],
                  "--subject-accent": subjectColors[entry.code],
                } as CSSProperties
              }
            >
              <button
                className="subject-home-toggle"
                ref={(node) => {
                  if (node && open) backRef.current = node;
                }}
                disabled={!ready || !entry.firstSemester}
                aria-expanded={entry.firstSemester ? open : undefined}
                aria-controls={
                  entry.firstSemester ? `options-${entry.code}` : undefined
                }
                onClick={(e) => {
                  backRef.current = e.currentTarget;
                  if (studyMode)
                    setSelection({ code: entry.code, mode: studyMode });
                  else setExpanded(open ? null : entry.code);
                }}
              >
                <span className="subject-home-icon">
                  <BookOpen size={23} aria-hidden="true" />
                </span>
                <span className="subject-home-name">
                  <strong>{subjectTitle(entry)}</strong>
                  <small>
                    {entry.firstSemester
                      ? "Primer cuatrimestre"
                      : "Segundo cuatrimestre · Próximamente"}
                  </small>
                </span>
                {entry.firstSemester ? (
                  <ChevronDown
                    size={20}
                    className={open ? "rotate-chevron" : ""}
                    aria-hidden="true"
                  />
                ) : (
                  <LockKeyhole size={21} aria-label="Asignatura bloqueada" />
                )}
              </button>
              {open && entry.firstSemester && (
                <div
                  id={`options-${entry.code}`}
                  className="subject-home-options"
                  role="region"
                  aria-label={`Opciones de ${entry.title}`}
                >
                  <button
                    onClick={() =>
                      setSelection({ code: entry.code, mode: "lessons" })
                    }
                  >
                    <BookOpen size={20} />
                    <span>
                      <strong>Hacer lecciones</strong>
                      <small>Contenidos, esquemas y conceptos</small>
                    </span>
                  </button>
                  <button
                    onClick={() =>
                      setSelection({ code: entry.code, mode: "exams" })
                    }
                  >
                    <ClipboardList size={20} />
                    <span>
                      <strong>Hacer exámenes</strong>
                      <small>Práctica según el modelo de la asignatura</small>
                    </span>
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </section>
    </>
  );
}
