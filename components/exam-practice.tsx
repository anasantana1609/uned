"use client";
import { HistoryExamPractice } from "./history-exam-practice";
import { subjectTheme } from "@/lib/subject-theme";
import { useEffect, useState } from "react";
import {
  examPracticeFor,
  examResult,
  shuffledQuestions,
  type PracticeQuestion,
} from "@/lib/exam-practice";

export function ExamPractice({ code }: { code: string }) {
  return code === "021015" ? (
    <HistoryExamPractice />
  ) : (
    <TestExamPractice code={code} />
  );
}
function TestExamPractice({ code }: { code: string }) {
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
  useEffect(() => {
    if (spec.available) start();
    // Starting an activity creates one attempt; later renders keep its questions.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);
  const result = examResult(questions, answers, spec.penalized);
  function start() {
    setQuestions(shuffledQuestions(spec.bank, spec.count));
    setAnswers({});
    setSubmitted(false);
    setRemaining((spec.minutes ?? 0) * 60);
    setDeadline(spec.minutes ? Date.now() + spec.minutes * 60_000 : null);
  }
  return (
    <section
      className="exam-practice subject-theme"
      style={subjectTheme(code)}
      aria-label="Práctica de examen"
    >
      <h2>Hacer exámenes</h2>
      {!spec.available ? (
        <p>Todavía no hay preguntas disponibles.</p>
      ) : !questions.length ? (
        <p>Cargando preguntas…</p>
      ) : (
        <>
          <p className="exam-label">Preguntas de práctica</p>
          <details className="exam-instructions">
            <summary>Instrucciones</summary>
            <p>
              {spec.penalized
                ? "Marca una respuesta por pregunta. Cada acierto suma 0,5 puntos; cada error resta 0,25. Puedes dejar preguntas en blanco."
                : "Marca una respuesta por pregunta y pulsa Terminar y corregir para revisar el resultado."}
            </p>
          </details>
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
