"use client";
import { useEffect, useId, useState } from "react";
import { proceduralPracticeModels } from "@/lib/procedural-practice";
import { subjectTheme } from "@/lib/subject-theme";
import { DictatedAnswer } from "./dictated-answer";

export function ProceduralExamPractice() {
  const id = useId();
  const [modelIndex, setModelIndex] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [finished, setFinished] = useState(false);
  const [remaining, setRemaining] = useState(7200);
  const model = proceduralPracticeModels[modelIndex];
  useEffect(() => {
    if (finished) return;
    const end = Date.now() + 120 * 60_000;
    const timer = window.setInterval(() => {
      const seconds = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      setRemaining(seconds);
      if (!seconds) setFinished(true);
    }, 1000);
    return () => clearInterval(timer);
  }, [modelIndex, attempt, finished]);
  function reset(index = modelIndex) {
    setModelIndex(index);
    setAnswers({});
    setFinished(false);
    setRemaining(7200);
    setAttempt((n) => n + 1);
  }
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
        onChange={(e) => reset(Number(e.target.value))}
      >
        {proceduralPracticeModels.map((m, index) => (
          <option key={m.title} value={index}>
            {m.title}
          </option>
        ))}
      </select>
      {!finished && (
        <p role="timer" aria-label="Tiempo de examen restante">
          {String(Math.floor(remaining / 60)).padStart(2, "0")}:
          {String(remaining % 60).padStart(2, "0")}
        </p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setFinished(true);
        }}
      >
        {model.questions.map((prompt, index) => (
          <fieldset
            className="lesson-question"
            key={`${attempt}-${modelIndex}-${index}`}
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
        ))}
        <fieldset className="lesson-question">
          <legend>Caso práctico</legend>
          <p>{model.scenario}</p>
          <p>{model.task}</p>
          <DictatedAnswer
            key={`${attempt}-${modelIndex}`}
            id={`${id}-case`}
            label="Tu respuesta al caso práctico"
            value={answers[2] ?? ""}
            onChange={(text) => setAnswers((old) => ({ ...old, 2: text }))}
            disabled={finished}
          />
        </fieldset>
        {!finished && (
          <button className="button" type="submit">
            Finalizar práctica
          </button>
        )}
      </form>
      <small>
        El borrador se conserva solo durante este intento. {model.sources}
      </small>
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
          <button className="button secondary" onClick={() => reset()}>
            Nuevo intento
          </button>
        </>
      )}
    </section>
  );
}
