"use client";
import { useEffect, useRef, useState } from "react";
import { BookOpen, Check, Play, Pause, ArrowLeft } from "lucide-react";
import { lessonsFor, learningSummary, type Lesson } from "@/lib/learning";
import { useStudy } from "./study-provider";
import { subjectTheme } from "@/lib/subject-theme";
import { LessonAudio } from "./lesson-audio";
import { lessonSpeechText } from "@/lib/lesson-speech";
import { DictatedAnswer } from "./dictated-answer";

export function GuidedLearning({ code }: { code: string }) {
  const { learningProgress, learningReady } = useStudy();
  const available = lessonsFor(code);
  const [selected, setSelected] = useState<Lesson | null>(null);
  const [topic, setTopic] = useState("");
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
      <div className="lesson-list">
        <label className="lesson-topic-filter">
          Filtrar por tema
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="">Todos los temas</option>
            {[...new Set(available.map((l) => l.topic))].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        {available
          .filter((l) => !topic || l.topic === topic)
          .map((lesson) => (
            <button
              type="button"
              className="lesson-choice"
              key={lesson.id}
              onClick={() => setSelected(lesson)}
              disabled={!learningReady}
            >
              <span className="lesson-item-main">
                <small>{lesson.topic} · 5 min</small>
                <strong>{lesson.title}</strong>
                <span className="lesson-item-progress">
                  <progress
                    aria-label={`Progreso de la lección: ${lesson.title}`}
                    value={learningProgress[lesson.id] ? 100 : 0}
                    max={100}
                  />
                  <small>{learningProgress[lesson.id] ? "100%" : "0%"}</small>
                </span>
              </span>
              <span>
                {learningProgress[lesson.id] ? (
                  <>
                    <Check size={16} /> Superado · repasar
                  </>
                ) : (
                  <>
                    <Play size={16} /> Estudiar
                  </>
                )}
              </span>
            </button>
          ))}
      </div>
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
  const { completeLesson, learningReady, learningProgress } = useStudy();
  const readerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    readerRef.current?.focus({ preventScroll: true });
    readerRef.current?.scrollIntoView({ block: "start" });
  }, []);
  const [remaining, setRemaining] = useState(300);
  const [running, setRunning] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [writtenAnswer, setWrittenAnswer] = useState("");
  useEffect(() => {
    if (!running || remaining === 0) return;
    const end = Date.now() + remaining * 1000;
    const timer = setInterval(
      () => setRemaining(Math.max(0, Math.ceil((end - Date.now()) / 1000))),
      250,
    );
    return () => clearInterval(timer);
    // Recompute the deadline only when starting or pausing, not on each tick.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);
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
      <button className="text-link" onClick={onBack}>
        <ArrowLeft size={16} /> Volver al recorrido
      </button>
      <p className="eyebrow">{lesson.topic} · BLOQUE DE 5 MINUTOS</p>
      <h3>{lesson.title}</h3>
      <p>
        <strong>Al terminar:</strong> {lesson.objective}
      </p>
      <LessonAudio text={lessonSpeechText(lesson)} />
      <div className="lesson-timer">
        <output
          role="timer"
          aria-live="off"
          aria-label="Tiempo de concentración restante"
        >
          {String(Math.floor(remaining / 60)).padStart(2, "0")}:
          {String(remaining % 60).padStart(2, "0")}
        </output>
        <button
          className="button secondary"
          disabled={remaining === 0}
          onClick={() => setRunning((r) => !r)}
        >
          {running && remaining > 0 ? <Pause size={16} /> : <Play size={16} />}{" "}
          {running && remaining > 0 ? "Pausar" : "Iniciar concentración"}
        </button>
        <button
          className="text-link"
          onClick={() => {
            setRunning(false);
            setRemaining(300);
          }}
        >
          Reiniciar tiempo
        </button>
      </div>
      {remaining === 0 && (
        <p role="status">
          Has terminado los cinco minutos. Completa la prueba para superar el
          bloque.
        </p>
      )}
      <p className="muted">
        Ritmo sugerido: 2 min para comprender, 1 para el ejemplo, 1 para
        practicar y 1 para comprobar. El tiempo no aprueba el bloque ni añade
        minutos al registro de estudio libre.
      </p>
      <div className="concept-chips">
        {lesson.concepts.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
      <h4>Comprende</h4>
      {lesson.explanation.map((p) => (
        <p key={p}>{p}</p>
      ))}
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
            if (ok) setRunning(false);
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
      {(saved || learningProgress[lesson.id]) && (
        <button className="button secondary" onClick={onNext}>
          Continuar recorrido
        </button>
      )}
    </section>
  );
}
