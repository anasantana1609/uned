"use client";
import { useState } from "react";
import { ExamPages } from "./exam-pages";
import { DictatedAnswer } from "./dictated-answer";
import { subjectTheme } from "@/lib/subject-theme";
import { examResult, type PracticeQuestion } from "@/lib/exam-practice";
import type { ExamSessionProps, TestDraft } from "@/lib/exam-attempts";
import { useSaveExamPayload, useExamClock } from "./use-exam-attempts";

export function TestExamPractice({
  attempt,
  onUpdate,
  onNew,
  onExit,
}: ExamSessionProps) {
  const initial = attempt.data as TestDraft;
  const spec = initial.spec;
  const code = attempt.code;
  const [questions] = useState<PracticeQuestion[]>(initial.questions);
  const [answers, setAnswers] = useState<Record<string, number>>(
    initial.answers,
  );
  const [submitted, setSubmitted] = useState(attempt.status === "completed");
  const [developmentIndex, setDevelopmentIndex] = useState(
    initial.developmentIndex,
  );
  const [developmentAnswers, setDevelopmentAnswers] = useState<
    Record<number, string>
  >(initial.developmentAnswers);
  const remaining = useExamClock(attempt, submitted, onUpdate, () =>
    setSubmitted(true),
  );
  useSaveExamPayload(
    attempt.id,
    {
      data: {
        ...initial,
        questions,
        answers,
        developmentIndex,
        developmentAnswers,
      },
      status: submitted ? "completed" : "in-progress",
    },
    onUpdate,
  );
  const result = examResult(
    questions,
    answers,
    spec.penalized,
    spec.incorrectPenalty,
  );
  const score = spec.scoreScale
    ? spec.scoreScale[result.correct]
    : result.score;
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
          {remaining !== null && !submitted && (
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
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <ExamPages
              key={attempt.id}
              initialPage={attempt.page}
              onPageChange={(page) => onUpdate({ page })}
              onExit={onExit}
              answered={[
                ...questions.map((q) => answers[q.id] !== undefined),
                ...(spec.developmentPrompts
                  ? [Boolean(developmentAnswers[developmentIndex]?.trim())]
                  : []),
              ]}
              actions={
                !submitted ? (
                  <button className="button" type="submit">
                    Terminar y corregir
                  </button>
                ) : (
                  <button
                    className="button secondary"
                    type="button"
                    onClick={onNew}
                  >
                    Nueva práctica
                  </button>
                )
              }
            >
              {[
                ...questions.map((q, i) => (
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
                        <span>{option}</span>
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
                )),
                ...(spec.developmentPrompts
                  ? [
                      <section key="development" aria-label="Desarrollo de TEC">
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
                            Comprueba que defines las instituciones, distingues
                            sus elementos y respondes a todos los apartados. La
                            respuesta escrita no recibe nota automática.
                          </p>
                        )}
                      </section>,
                    ]
                  : []),
              ]}
            </ExamPages>
          </form>
        </>
      )}
    </section>
  );
}
