"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowLeft,
  BookOpen,
  ClipboardList,
  ChevronDown,
  LockKeyhole,
} from "lucide-react";
import { useStudy } from "./study-provider";
import {
  firstYearCatalog,
  catalogEntry,
  subjectTitle,
} from "@/lib/subject-catalog";
import { GuidedLearning } from "./guided-learning";
import { ExamPractice } from "./exam-practice";
import { CivilSyllabus } from "./civil-syllabus";
import { ProceduralSyllabus } from "./procedural-syllabus";
import { HistoryPreparation } from "./history-preparation";
import { lessonsFor } from "@/lib/learning";

const colors = [
  "#dfe9ff",
  "#d9f0e3",
  "#ffe9d1",
  "#eee2ff",
  "#f9dce7",
  "#d7f1f2",
  "#f5edc8",
  "#e2e8f4",
  "#eadfcf",
  "#e4edce",
  "#f3dfe0",
];
const accents = [
  "#3861a0",
  "#35714e",
  "#98602e",
  "#79529f",
  "#a0446b",
  "#2c7880",
  "#8a741e",
  "#526b93",
  "#806044",
  "#607b2c",
  "#954e53",
];
export function Dashboard() {
  const { data, ready } = useStudy();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selection, setSelection] = useState<{
    code: string;
    mode: "lessons" | "exams";
  } | null>(null);
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
        className="subject-workspace"
        aria-label={`${subject.title}: ${selection.mode === "lessons" ? "lecciones" : "exámenes"}`}
      >
        <button className="text-link" onClick={() => setSelection(null)}>
          <ArrowLeft size={17} />
          Volver a mis asignaturas
        </button>
        <h1>{subject.title}</h1>
        <div className="course-tabs" aria-label="Actividad de la asignatura">
          <button
            className={`button ${selection.mode === "lessons" ? "" : "secondary"}`}
            aria-pressed={selection.mode === "lessons"}
            onClick={() => setSelection({ ...selection, mode: "lessons" })}
          >
            Hacer lecciones
          </button>
          <button
            className={`button ${selection.mode === "exams" ? "" : "secondary"}`}
            aria-pressed={selection.mode === "exams"}
            onClick={() => setSelection({ ...selection, mode: "exams" })}
          >
            Hacer exámenes
          </button>
        </div>
        {selection.mode === "exams" ? (
          <ExamPractice key={subject.code} code={subject.code} />
        ) : (
          <>
            {!!available.length && <GuidedLearning code={subject.code} />}
            {!available.length && (
              <div className="card lesson-empty">
                <h2>Lecciones en preparación</h2>
                <p>
                  {subject.code === "021015"
                    ? "Hemos recibido apuntes y exámenes. Esperamos tu aviso de que has terminado de subir los materiales para crear las lecciones de Historia."
                    : "Los contenidos, esquemas y conceptos aparecerán aquí cuando se incorporen los materiales de la asignatura."}
                </p>
              </div>
            )}
            {subject.code === "021096" && <CivilSyllabus />}
            {subject.code === "021044" && <ProceduralSyllabus />}
            {subject.code === "021015" && <HistoryPreparation />}
          </>
        )}
      </section>
    );
  }
  return (
    <>
      <h1 className="subject-home-heading">Mis asignaturas</h1>
      <section className="subject-home-list" aria-label="Asignaturas del curso">
        {subjects.map((entry) => {
          const index = firstYearCatalog.findIndex(
            (s) => s.code === entry.code,
          );
          const open = expanded === entry.code;
          return (
            <article
              key={entry.code}
              className={`subject-home-row ${!entry.firstSemester ? "semester-locked" : ""}`}
              style={
                {
                  "--subject-bg": colors[index],
                  "--subject-accent": accents[index],
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
                  setExpanded(open ? null : entry.code);
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
