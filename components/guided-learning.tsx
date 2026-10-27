"use client";
import { useEffect, useId, useRef, useState } from "react";
import { BookOpen, Check, Play, ArrowLeft } from "lucide-react";
import { lessonsFor, learningSummary, type Lesson } from "@/lib/learning";
import { useStudy } from "./study-provider";
import { subjectTheme } from "@/lib/subject-theme";
import { LessonAudio } from "./lesson-audio";
import { lessonSpeechText } from "@/lib/lesson-speech";
import { DictatedAnswer } from "./dictated-answer";
import { LearningPath } from "./learning-path";
import { useLessonStudyTime } from "./use-lesson-study-time";

export function GuidedLearning({ code }: { code: string }) {
  const { learningProgress, learningReady } = useStudy();
  const available = lessonsFor(code);
  const [selected, setSelected] = useState<Lesson | null>(null);
  const [view, setView] = useState<"list" | "path">("list");
  const viewId = useId();
  const summary = learningSummary(code, learningProgress);
  if (!available.length) return null;
  if (selected)
    return (
      <LessonReader
        key={selected.id}
        lesson={selected}
        onBack={() => setSelected(null)}
        onNext={() => {
          const next = available.find(
            (l) => l.id !== selected.id && !learningProgress[l.id],
          );
          setSelected(next ?? null);
        }}
      />
    );
  return (
    <section
      className="guided-learning subject-theme"
      style={subjectTheme(code)}
      aria-label="Contenido de estudio disponible"
    >
      <h3>
        <BookOpen size={20} /> Lecciones
      </h3>
      <div className="learning-summary">
        <strong>{summary.percent}% de lecciones completadas</strong>
        <span>
          {summary.passed} de {summary.total} lecciones completadas
        </span>
      </div>
      <progress
        aria-label="Avance de lecciones completadas"
        value={summary.passed}
        max={summary.total}
      />
      <div
        className="learning-view-tabs"
        role="tablist"
        aria-label="Vista de las lecciones"
      >
        {(
          [
            ["list", "Listado"],
            ["path", "Recorrido"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            id={`${viewId}-${value}`}
            aria-selected={view === value}
            aria-controls={`${viewId}-panel`}
            tabIndex={view === value ? 0 : -1}
            onClick={() => setView(value)}
            onKeyDown={(event) => {
              if (
                !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
              )
                return;
              event.preventDefault();
              const next =
                event.key === "Home"
                  ? "list"
                  : event.key === "End"
                    ? "path"
                    : view === "list"
                      ? "path"
                      : "list";
              setView(next);
              document.getElementById(`${viewId}-${next}`)?.focus();
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`${viewId}-panel`}
        aria-labelledby={`${viewId}-${view}`}
      >
        {view === "path" ? (
          <LearningPath
            lessons={available}
            progress={learningProgress}
            ready={learningReady}
            onSelect={setSelected}
          />
        ) : (
          <div className="lesson-list">
            {available
              .filter((l) => !learningProgress[l.id])
              .map((lesson) => (
                <button
                  type="button"
                  className="lesson-choice"
                  key={lesson.id}
                  onClick={() => setSelected(lesson)}
                  disabled={!learningReady}
                >
                  <span className="lesson-item-main">
                    <small>{lesson.topic}</small>
                    <strong>{lesson.title}</strong>
                    <span className="lesson-item-progress">
                      <progress
                        aria-label={`Progreso de la lección: ${lesson.title}`}
                        value={0}
                        max={100}
                      />
                      <small>0%</small>
                    </span>
                  </span>
                  <span>
                    <Play size={16} /> Estudiar
                  </span>
                </button>
              ))}
          </div>
        )}
      </div>
      {summary.passed > 0 && (
        <details className="completed-lessons">
          <summary>Lecciones completadas ({summary.passed}) · Repasar</summary>
          <div className="lesson-list">
            {available
              .filter((lesson) => learningProgress[lesson.id])
              .map((lesson) => (
                <button
                  type="button"
                  className="lesson-choice"
                  key={lesson.id}
                  disabled={!learningReady}
                  onClick={() => setSelected(lesson)}
                >
                  <span className="lesson-item-main">
                    <small>{lesson.topic}</small>
                    <strong>{lesson.title}</strong>
                    <progress
                      aria-label={`Progreso de la lección: ${lesson.title}`}
                      value={100}
                      max={100}
                    />
                  </span>
                  <span>
                    <Check size={16} /> Completada · repasar
                  </span>
                </button>
              ))}
          </div>
        </details>
      )}
      {view === "list" && summary.passed === summary.total && (
        <p role="status">
          ¡Todas las lecciones completadas! Puedes abrir el archivo para
          repasar.
        </p>
      )}
    </section>
  );
}
function LessonReader({
  lesson,
  onBack,
  onNext,
}: {
  lesson: Lesson;
  onBack: () => void;
  onNext: () => void;
}) {
  const { completeLesson, learningReady, learningProgress, user } = useStudy();
  const readerRef = useRef<HTMLElement>(null);
  const studyTime = useLessonStudyTime(
    readerRef,
    lesson.id,
    user?.id ?? "demo",
  );
  useEffect(() => {
    readerRef.current?.focus({ preventScroll: true });
    readerRef.current?.scrollIntoView({ block: "start" });
  }, []);
  const [answers, setAnswers] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [writtenAnswer, setWrittenAnswer] = useState("");
  const correct = lesson.questions.filter(
    (q, i) => answers[i] === q.answer,
  ).length;
  const allAnswered = lesson.questions.every((_, i) =>
    Number.isInteger(answers[i]),
  );
  return (
    <section
      ref={readerRef}
      tabIndex={-1}
      className="guided-learning lesson-reader subject-theme"
      style={subjectTheme(lesson.code)}
      aria-label={`Bloque: ${lesson.title}`}
    >
      <button className="text-link" data-study-time-ignore onClick={onBack}>
        <ArrowLeft size={16} /> Volver al recorrido
      </button>
      <p className="eyebrow">{lesson.topic}</p>
      <h3>{lesson.title}</h3>
      <p>
        <strong>Al terminar:</strong> {lesson.objective}
      </p>
      <LessonAudio text={lessonSpeechText(lesson)} />
      <div className="concept-chips">
        {lesson.concepts.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
      <h4>Comprende</h4>
      {lesson.explanation.map((p) => (
        <p key={p}>{p}</p>
      ))}
      {!!lesson.outline?.length && (
        <div className="lesson-example">
          <h4>Esquema para repasar</h4>
          <ol>
            {lesson.outline.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ol>
        </div>
      )}
      <div className="lesson-example">
        <h4>Un ejemplo</h4>
        <p>{lesson.example}</p>
      </div>
      <h4>Practica sin mirar</h4>
      <p>{lesson.practice}</p>
      {lesson.writtenPractice && (
        <section aria-label="Desarrollo guiado">
          <h4>{lesson.writtenPractice.kind}</h4>
          <p>{lesson.writtenPractice.prompt}</p>
          <DictatedAnswer
            id={`${lesson.id}-written`}
            label="Tu respuesta de desarrollo"
            value={writtenAnswer}
            onChange={setWrittenAnswer}
          />
          <details>
            <summary>Ver orientación y revisar mi respuesta</summary>
            {lesson.writtenPractice.modelAnswer.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul>
              {lesson.writtenPractice.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Utiliza estas pautas para revisar tu desarrollo. No se asigna una
              nota automática.
            </p>
          </details>
        </section>
      )}
      <details>
        <summary>Fuentes de este bloque</summary>
        <ul>
          {lesson.sources.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </details>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!allAnswered) return;
          setChecked(true);
          setSaved(false);
          setSaveError(false);
          if (correct === lesson.questions.length) {
            const ok = completeLesson(lesson.id, answers);
            setSaved(ok);
            setSaveError(!ok);
          }
        }}
      >
        <h4>Comprueba lo aprendido</h4>
        <p>
          Necesitas las tres respuestas correctas. Si fallas, revisa la
          explicación y vuelve a intentarlo.
        </p>
        {lesson.questions.map((q, i) => (
          <fieldset key={q.prompt} className="lesson-question">
            <legend>
              {i + 1}. {q.prompt} <small>({q.difficulty})</small>
            </legend>
            {q.options.map((o, j) => (
              <label key={o}>
                <input
                  type="radio"
                  name={`question-${i}`}
                  value={j}
                  checked={answers[i] === j}
                  onChange={() => {
                    setAnswers((old) => {
                      const next = [...old];
                      next[i] = j;
                      return next;
                    });
                    setChecked(false);
                    setSaved(false);
                    setSaveError(false);
                  }}
                />
                {o}
              </label>
            ))}
            {checked && (
              <p
                className={
                  answers[i] === q.answer ? "answer-correct" : "answer-review"
                }
              >
                {answers[i] === q.answer
                  ? "Correcta. "
                  : `Revisa: respuesta correcta «${q.options[q.answer]}». `}
                {q.explanation}
              </p>
            )}
          </fieldset>
        ))}
        <button
          className="button"
          disabled={!learningReady || !allAnswered}
          type="submit"
        >
          Comprobar prueba
        </button>
        {checked && (
          <p role="status">
            {correct} de {lesson.questions.length} respuestas correctas.{" "}
            {saved
              ? "Bloque superado. Avance guardado en este navegador."
              : saveError
                ? "No se pudo guardar el avance. Comprueba el almacenamiento del navegador y vuelve a intentarlo."
                : "Revisa las explicaciones y vuelve a intentarlo."}
          </p>
        )}
      </form>
      <p className="lesson-study-time muted">
        Tiempo dedicado a esta lección: {studyTime.minutes} min.
      </p>
      {studyTime.saveError && (
        <p role="status">
          No se pudo guardar el tiempo de estudio en este navegador.
        </p>
      )}
      {(saved || learningProgress[lesson.id]) && (
        <button className="button secondary" onClick={onNext}>
          Continuar recorrido
        </button>
      )}
    </section>
  );
}
