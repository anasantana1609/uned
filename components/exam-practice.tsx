"use client";
import { useEffect, useState } from "react";
import {
  examPracticeFor,
  examResult,
  shuffledQuestions,
  type PracticeQuestion,
} from "@/lib/exam-practice";

export function ExamPractice({ code }: { code: string }) {
  const spec = examPracticeFor(code);
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(0);
  useEffect(() => {
    if (!deadline || submitted) return;
    const tick = () => {
      const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemaining(seconds);
      if (seconds === 0) setSubmitted(true);
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [deadline, submitted]);
  const result = examResult(questions, answers, spec.penalized);
  function start() {
    setQuestions(shuffledQuestions(spec.bank, spec.count));
    setAnswers({});
    setSubmitted(false);
    setRemaining((spec.minutes ?? 0) * 60);
    setDeadline(spec.minutes ? Date.now() + spec.minutes * 60_000 : null);
  }
  return (
    <section className="exam-practice" aria-label="Práctica de examen">
      <h2>Hacer exámenes</h2>
      <p>{spec.description}</p>
      {spec.source && <p className="muted">Referencia: {spec.source}</p>}
      {!spec.available ? (
        <p className="inline-note">Exámenes en preparación.</p>
      ) : !questions.length ? (
        <>
          <p>
            {spec.count} preguntas disponibles por intento. La corrección
            incluye explicaciones y referencias.
          </p>
          <button className="button" onClick={start}>
            Comenzar práctica
          </button>
        </>
      ) : (
        <>
          <p className="muted">
            Este intento no modifica los bloques superados ni se guarda al salir
            o recargar.
          </p>
          {deadline && !submitted && (
            <p
              role="timer"
              aria-live="off"
              aria-label="Tiempo de examen restante"
            >
              {String(Math.floor(remaining / 60)).padStart(2, "0")}:
              {String(remaining % 60).padStart(2, "0")}
            </p>
          )}
          {submitted && (
            <div role="status" className="exam-result">
              <strong>Resultado de la práctica</strong>
              <p>
                {result.correct} aciertos · {result.incorrect} errores ·{" "}
                {result.blank} en blanco
              </p>
              {result.score !== null && (
                <p>
                  Puntuación de práctica: {result.score.toLocaleString("es-ES")}{" "}
                  / 10
                </p>
              )}
              <p>No es una calificación oficial.</p>
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            {questions.map((q, i) => (
              <fieldset
                key={q.id}
                className="lesson-question"
                disabled={submitted}
              >
                <legend>
                  {i + 1}. {q.prompt}
                </legend>
                {q.options.map((option, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      name={q.id}
                      checked={answers[q.id] === index}
                      onChange={() =>
                        setAnswers((old) => ({ ...old, [q.id]: index }))
                      }
                    />
                    {option}
                  </label>
                ))}
                {!submitted && answers[q.id] !== undefined && (
                  <button
                    className="text-link"
                    type="button"
                    onClick={() =>
                      setAnswers((old) => {
                        const next = { ...old };
                        delete next[q.id];
                        return next;
                      })
                    }
                  >
                    Dejar en blanco
                  </button>
                )}
                {submitted && (
                  <div className="exam-correction">
                    <p>
                      <strong>
                        {answers[q.id] === undefined
                          ? "En blanco"
                          : answers[q.id] === q.answer
                            ? "Correcta"
                            : "Incorrecta"}
                        .
                      </strong>{" "}
                      Respuesta: {q.options[q.answer]}
                    </p>
                    <p>{q.explanation}</p>
                    <small>
                      {q.topic} · {q.sources.join("; ")}
                    </small>
                  </div>
                )}
              </fieldset>
            ))}
            {!submitted && (
              <button className="button" type="submit">
                Terminar y corregir
              </button>
            )}
          </form>
          {submitted && (
            <button className="button secondary" onClick={start}>
              Nueva práctica
            </button>
          )}
        </>
      )}
    </section>
  );
}
