"use client";
import { ExamPages } from "./exam-pages";
import { useId, useState } from "react";
import { proceduralPracticeModels } from "@/lib/procedural-practice";
import { subjectTheme } from "@/lib/subject-theme";
import { DictatedAnswer } from "./dictated-answer";
import type { ExamSessionProps, ProceduralDraft } from "@/lib/exam-attempts";
import { useExamClock, useSaveExamPayload } from "./use-exam-attempts";

export function ProceduralExamPractice({
  attempt,
  onUpdate,
  onNew,
  onExit,
  onModelChange,
}: ExamSessionProps) {
  const id = useId();
  const initial = attempt.data as ProceduralDraft;
  const modelIndex = initial.modelIndex;
  const [answers, setAnswers] = useState<Record<number, string>>(
    initial.answers,
  );
  const [finished, setFinished] = useState(attempt.status === "completed");
  const model = initial.model;
  const remaining = useExamClock(attempt, finished, onUpdate, () =>
    setFinished(true),
  );
  useSaveExamPayload(
    attempt.id,
    {
      data: { ...initial, answers },
      status: finished ? "completed" : "in-progress",
    },
    onUpdate,
  );
  return (
    <section
      className="exam-practice subject-theme"
      style={subjectTheme("021044")}
      aria-label="Práctica de examen"
    >
      <h2>Preguntas de Procesal</h2>
      <details>
        <summary>Instrucciones</summary>
        <p>
          Dos preguntas teóricas y un caso práctico, todos obligatorios.
          Duración: 120 minutos. La guía permite solo el programa y exige
          conocimientos suficientes en cada respuesta.
        </p>
        <small>
          66021044_2027.pdf · página PDF 18. Casos originales de práctica, sin
          nota automática.
        </small>
      </details>
      <label htmlFor={`${id}-model`}>Elegir práctica</label>
      <select
        id={`${id}-model`}
        value={modelIndex}
        onChange={(e) => onModelChange(Number(e.target.value))}
      >
        {proceduralPracticeModels.map((m, index) => (
          <option key={m.title} value={index}>
            {m.title}
          </option>
        ))}
      </select>
      {remaining !== null && !finished && (
        <p role="timer" aria-label="Tiempo de examen restante">
          {String(Math.floor(remaining / 60)).padStart(2, "0")}:
          {String(remaining % 60).padStart(2, "0")}
        </p>
      )}
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          setFinished(true);
        }}
      >
        <ExamPages
          key={attempt.id}
          initialPage={attempt.page}
          onPageChange={(page) => onUpdate({ page })}
          onExit={onExit}
          answered={[0, 1, 2].map((index) => Boolean(answers[index]?.trim()))}
          actions={
            !finished ? (
              <button className="button" type="submit">
                Finalizar práctica
              </button>
            ) : (
              <button
                type="button"
                className="button secondary"
                onClick={onNew}
              >
                Nuevo intento
              </button>
            )
          }
        >
          {[
            ...model.questions.map((prompt, index) => (
              <fieldset
                className="lesson-question"
                key={`${attempt.id}-${modelIndex}-${index}`}
              >
                <legend>Pregunta teórica {index + 1}</legend>
                <p>{prompt}</p>
                <DictatedAnswer
                  id={`${id}-${index}`}
                  label={`Tu respuesta a la pregunta ${index + 1}`}
                  value={answers[index] ?? ""}
                  onChange={(text) =>
                    setAnswers((old) => ({ ...old, [index]: text }))
                  }
                  disabled={finished}
                />
              </fieldset>
            )),
            <fieldset key="case" className="lesson-question">
              <legend>Caso práctico</legend>
              <p>{model.scenario}</p>
              <p>{model.task}</p>
              <DictatedAnswer
                key={`${attempt.id}-${modelIndex}`}
                id={`${id}-case`}
                label="Tu respuesta al caso práctico"
                value={answers[2] ?? ""}
                onChange={(text) => setAnswers((old) => ({ ...old, 2: text }))}
                disabled={finished}
              />
            </fieldset>,
          ]}
        </ExamPages>
      </form>
      <small>Guardado automático en este navegador. {model.sources}</small>
      {finished && (
        <>
          <p role="status">
            Práctica finalizada. Revisa las dos respuestas teóricas y el caso
            práctico; no se asigna nota automática.
          </p>
          <details>
            <summary>Pautas de revisión del caso</summary>
            <ul>
              {model.review.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </details>
        </>
      )}
    </section>
  );
}
