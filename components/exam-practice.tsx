"use client";
import { HistoryExamPractice } from "./history-exam-practice";
import { ProceduralExamPractice } from "./procedural-exam-practice";
import { DictatedAnswer } from "./dictated-answer";
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
  ) : code === "021044" ? (
    <ProceduralExamPractice />
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
  const [developmentIndex, setDevelopmentIndex] = useState(0);
  const [developmentAnswers, setDevelopmentAnswers] = useState<
    Record<number, string>
  >({});
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
  const result = examResult(
    questions,
    answers,
    spec.penalized,
    spec.incorrectPenalty,
  );
  const score = spec.scoreScale
    ? spec.scoreScale[result.correct]
    : result.score;
  function start() {
    setQuestions(shuffledQuestions(spec.bank, spec.count));
    setAnswers({});
    setSubmitted(false);
    setDevelopmentIndex(0);
    setDevelopmentAnswers({});
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
          <p className="exam-label">
            {spec.developmentPrompts
              ? "Test y desarrollo de práctica"
              : "Preguntas de práctica"}
          </p>
          <details className="exam-instructions">
            <summary>Instrucciones</summary>
            <p>
              {spec.penalized
                ? `Marca una respuesta por pregunta. Cada acierto suma 0,5 puntos; cada error resta ${spec.incorrectPenalty.toLocaleString("es-ES")}. Puedes dejar preguntas en blanco.`
                : "Marca una respuesta por pregunta y pulsa Terminar y corregir para revisar el resultado."}
            </p>
            <p>{spec.description}</p>
            <small>{spec.source}</small>
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
              {score !== null && score !== undefined && (
                <p>
                  {spec.scoreScale
                    ? "Puntuación del test"
                    : "Puntuación de práctica"}
                  : {score.toLocaleString("es-ES")} / 10
                </p>
              )}
              <p>No es una calificación oficial.</p>
              {spec.developmentPrompts && (
                <p>
                  Revisa el desarrollo por separado. No se calcula una nota
                  global automática.
                </p>
              )}
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
            {spec.developmentPrompts && (
              <section aria-label="Desarrollo de TEC">
                <h3>Desarrollo: elige una pregunta</h3>
                <div
                  role="radiogroup"
                  aria-label="Pregunta de desarrollo elegida"
                >
                  {spec.developmentPrompts.map((prompt, index) => (
                    <label key={prompt} className="lesson-question">
                      <input
                        type="radio"
                        name={`development-${code}`}
                        checked={developmentIndex === index}
                        disabled={submitted}
                        onChange={() => setDevelopmentIndex(index)}
                      />
                      {prompt}
                    </label>
                  ))}
                </div>
                <DictatedAnswer
                  key={developmentIndex}
                  id={`development-${code}-${developmentIndex}`}
                  label="Tu respuesta de desarrollo"
                  value={developmentAnswers[developmentIndex] ?? ""}
                  disabled={submitted}
                  onChange={(text) =>
                    setDevelopmentAnswers((old) => ({
                      ...old,
                      [developmentIndex]: text,
                    }))
                  }
                />
                {submitted && (
                  <p>
                    Comprueba que defines las instituciones, distingues sus
                    elementos y respondes a todos los apartados. La respuesta
                    escrita no recibe nota automática.
                  </p>
                )}
              </section>
            )}
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
