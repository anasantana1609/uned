"use client";
import { ExamPages } from "./exam-pages";
import { useId, useState } from "react";
import { historyPracticeModels } from "@/lib/history-practice";
import { DictatedAnswer } from "./dictated-answer";
import { subjectTheme } from "@/lib/subject-theme";
import type { ExamSessionProps, HistoryDraft } from "@/lib/exam-attempts";
import { useExamClock, useSaveExamPayload } from "./use-exam-attempts";

export function HistoryExamPractice({
  attempt,
  onUpdate,
  onNew,
  onExit,
  onModelChange,
}: ExamSessionProps) {
  const id = useId();
  const initial = attempt.data as HistoryDraft;
  const modelIndex = initial.modelIndex;
  const [chosen, setChosen] = useState<number[]>(initial.chosen);
  const [answers, setAnswers] = useState<Record<number, string>>(
    initial.answers,
  );
  const [comment, setComment] = useState(initial.comment);
  const [finished, setFinished] = useState(attempt.status === "completed");
  const model = initial.model;
  const remaining = useExamClock(attempt, finished, onUpdate, () =>
    setFinished(true),
  );
  useSaveExamPayload(
    attempt.id,
    {
      data: { ...initial, chosen, answers, comment },
      status: finished ? "completed" : "in-progress",
    },
    onUpdate,
  );
  return (
    <section
      className="exam-practice subject-theme"
      style={subjectTheme("021015")}
      aria-label="Práctica de examen"
    >
      <h2>Preguntas de Historia</h2>
      <label htmlFor={`${id}-model`}>Elegir modelo</label>
      <select
        id={`${id}-model`}
        value={modelIndex}
        onChange={(e) => onModelChange(Number(e.target.value))}
      >
        {historyPracticeModels.map((m, index) => (
          <option key={m.id} value={index}>
            {m.title}
          </option>
        ))}
      </select>
      <p>
        Elige dos preguntas de desarrollo y responde al comentario de texto.
      </p>
      <small>Preguntas adaptadas para practicar · {model.source}</small>
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
          answered={[
            ...model.questions.map(
              (_, index) =>
                chosen.includes(index) && Boolean(answers[index]?.trim()),
            ),
            Boolean(comment.trim()),
          ]}
          actions={
            finished ? (
              <button
                type="button"
                className="button secondary"
                onClick={onNew}
              >
                Nuevo intento
              </button>
            ) : (
              <button
                className="button"
                type="submit"
                disabled={
                  chosen.length !== 2 ||
                  chosen.some((n) => !answers[n]?.trim()) ||
                  !comment.trim()
                }
              >
                Finalizar práctica
              </button>
            )
          }
        >
          {[
            ...model.questions.map((prompt, index) => (
              <fieldset
                key={`${model.id}-${index}`}
                className="lesson-question"
              >
                <legend>Pregunta {index + 1}</legend>
                <p>{prompt}</p>
                <label>
                  <input
                    type="checkbox"
                    checked={chosen.includes(index)}
                    disabled={
                      finished ||
                      (!chosen.includes(index) && chosen.length === 2)
                    }
                    onChange={(e) =>
                      setChosen((old) =>
                        e.target.checked
                          ? [...old, index]
                          : old.filter((n) => n !== index),
                      )
                    }
                  />
                  Responder esta pregunta
                </label>
                {chosen.includes(index) && (
                  <>
                    <DictatedAnswer
                      id={`${id}-answer-${index}`}
                      label={`Tu respuesta a la pregunta ${index + 1}`}
                      value={answers[index] ?? ""}
                      disabled={finished}
                      onChange={(text) =>
                        setAnswers((old) => ({ ...old, [index]: text }))
                      }
                    />
                  </>
                )}
              </fieldset>
            )),
            <fieldset key="commentary" className="lesson-question">
              <legend>Comentario de texto</legend>
              <blockquote>{model.excerpt}</blockquote>
              <small>{model.attribution}</small>
              <p>{model.commentary}</p>
              <DictatedAnswer
                key={model.id}
                id={`${id}-comment`}
                label="Tu comentario"
                value={comment}
                disabled={finished}
                onChange={setComment}
                rows={9}
              />
            </fieldset>,
          ]}
        </ExamPages>
        <p className="muted">
          Respuestas escritas sin calificación automática. Guardado automático
          en este navegador.
        </p>
        {finished && (
          <p role="status">
            Práctica finalizada. Puedes revisar tus respuestas.
          </p>
        )}
      </form>
    </section>
  );
}
