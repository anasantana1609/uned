"use client";
import { useId, useState } from "react";
import { historyPracticeModels } from "@/lib/history-practice";
import { DictatedAnswer } from "./dictated-answer";
import { subjectTheme } from "@/lib/subject-theme";

export function HistoryExamPractice() {
  const id = useId();
  const [modelIndex, setModelIndex] = useState(0);
  const [chosen, setChosen] = useState<number[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [comment, setComment] = useState("");
  const [finished, setFinished] = useState(false);
  const model = historyPracticeModels[modelIndex];
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
        onChange={(e) => {
          setModelIndex(Number(e.target.value));
          setChosen([]);
          setAnswers({});
          setComment("");
          setFinished(false);
        }}
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setFinished(true);
        }}
      >
        <h3>Preguntas de desarrollo</h3>
        {model.questions.map((prompt, index) => (
          <fieldset key={`${model.id}-${index}`} className="lesson-question">
            <legend>Pregunta {index + 1}</legend>
            <p>{prompt}</p>
            <label>
              <input
                type="checkbox"
                checked={chosen.includes(index)}
                disabled={
                  finished || (!chosen.includes(index) && chosen.length === 2)
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
        ))}
        <fieldset className="lesson-question">
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
        </fieldset>
        <p className="muted">
          Respuestas escritas sin calificación automática. El borrador se
          conserva solo mientras permanezcas en este intento.
        </p>
        {finished ? (
          <>
            <p role="status">
              Práctica finalizada. Puedes revisar tus respuestas.
            </p>
            <button
              type="button"
              className="button secondary"
              onClick={() => setFinished(false)}
            >
              Seguir escribiendo
            </button>
          </>
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
        )}
      </form>
    </section>
  );
}
