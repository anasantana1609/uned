"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Play, RotateCcw, ClipboardCheck, Clock3 } from "lucide-react";
import { useStudy } from "./study-provider";
import { subjectTheme } from "@/lib/subject-theme";
import { examResult } from "@/lib/exam-practice";
import {
  answeredCount,
  examModelsFor,
  examPageCount,
  newExamAttempt,
  type AttemptPatch,
  type ExamAttempt,
  type ExamModel,
} from "@/lib/exam-attempts";
import { useExamAttempts } from "./use-exam-attempts";
import { TestExamPractice } from "./test-exam-practice";
import { HistoryExamPractice } from "./history-exam-practice";
import { ProceduralExamPractice } from "./procedural-exam-practice";

type Filter = "pending" | "in-progress" | "completed";
export function ExamHub({ code }: { code: string }) {
  const { user } = useStudy();
  return (
    <AccountExamHub
      key={`${user?.id ?? "demo"}:${code}`}
      code={code}
      account={user?.id ?? "demo"}
    />
  );
}
function AccountExamHub({ code, account }: { code: string; account: string }) {
  const store = useExamAttempts(account);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("pending");
  const heading = useRef<HTMLHeadingElement>(null);
  const models = examModelsFor(code);
  const attempts = store.attempts.filter((item) => item.code === code);
  const pending = models.filter(
    (model) => !attempts.some((item) => item.modelId === model.id),
  );
  const inProgress = attempts.filter((item) => item.status === "in-progress");
  const completed = attempts.filter((item) => item.status === "completed");
  const active = attempts.find((item) => item.id === activeId);
  const update = useCallback(
    (patch: AttemptPatch) => {
      if (activeId) store.update(activeId, patch);
    },
    [activeId, store.update],
  );
  useEffect(() => {
    if (store.ready)
      setFilter(
        inProgress.length
          ? "in-progress"
          : pending.length
            ? "pending"
            : "completed",
      );
    // Pick the useful initial section once the saved collection has loaded.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.ready]);
  useEffect(() => {
    if (!activeId) {
      heading.current?.focus({ preventScroll: true });
      heading.current?.scrollIntoView({ block: "start" });
    }
  }, [activeId]);
  function start(model: ExamModel) {
    const next = newExamAttempt(code, model, crypto.randomUUID());
    if (store.add(next)) setActiveId(next.id);
  }
  function exit() {
    setActiveId(null);
    setFilter(active?.status === "completed" ? "completed" : "in-progress");
  }
  function repeat() {
    const model = models.find((item) => item.id === active?.modelId);
    if (model) start(model);
  }
  function switchModel(index: number) {
    const model = models.find((item) => item.index === index);
    if (!model) return;
    const saved = inProgress.findLast((item) => item.modelId === model.id);
    if (saved) setActiveId(saved.id);
    else start(model);
  }
  const sessionProps = active
    ? {
        attempt: active,
        onUpdate: update,
        onNew: repeat,
        onExit: exit,
        onModelChange: switchModel,
      }
    : null;
  const notice = store.error && (
    <div className="exam-save-error" role="alert">
      <p>{store.error}</p>
      {!store.blocked && (
        <button className="button secondary" onClick={store.retry}>
          Reintentar guardado
        </button>
      )}
    </div>
  );
  if (active && sessionProps)
    return (
      <div className="exam-session">
        {notice}
        <p className="exam-save-note">
          {active.title} ·{" "}
          {store.error
            ? "Cambios sin guardar"
            : "Guardado automático en este navegador"}
        </p>
        {active.data.kind === "test" ? (
          <TestExamPractice key={active.id} {...sessionProps} />
        ) : active.data.kind === "history" ? (
          <HistoryExamPractice key={active.id} {...sessionProps} />
        ) : (
          <ProceduralExamPractice key={active.id} {...sessionProps} />
        )}
      </div>
    );
  return (
    <section
      className="exam-catalog subject-theme"
      style={subjectTheme(code)}
      aria-label="Mis exámenes"
    >
      <h2 ref={heading} tabIndex={-1}>
        Mis exámenes
      </h2>
      <p>Elige un modelo o continúa donde lo dejaste.</p>
      <nav className="exam-catalog-filters" aria-label="Estado de los exámenes">
        {(
          [
            ["pending", "Pendientes", pending.length],
            ["in-progress", "En curso", inProgress.length],
            ["completed", "Realizados", completed.length],
          ] as const
        ).map(([value, label, count]) => (
          <button
            type="button"
            key={value}
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {label} <span>({count})</span>
          </button>
        ))}
      </nav>
      {notice}
      {!store.ready ? (
        <p role="status">Recuperando tus exámenes…</p>
      ) : !models.length ? (
        <p>Todavía no hay exámenes disponibles.</p>
      ) : (
        <div className="exam-catalog-list">
          {filter === "pending"
            ? pending.map((model) => (
                <article
                  key={model.id}
                  className="exam-catalog-card"
                  data-model-id={model.id}
                >
                  <ClipboardCheck size={26} aria-hidden="true" />
                  <div>
                    <h3>{model.title}</h3>
                    <p>{model.description}</p>
                  </div>
                  <button
                    className="button"
                    disabled={store.blocked}
                    onClick={() => start(model)}
                    aria-label={`Empezar: ${model.title}`}
                  >
                    <Play size={18} aria-hidden="true" />
                    Empezar
                  </button>
                </article>
              ))
            : (filter === "in-progress" ? inProgress : completed)
                .slice()
                .reverse()
                .map((item) => (
                  <article
                    key={item.id}
                    className="exam-catalog-card"
                    data-attempt-id={item.id}
                  >
                    <Clock3 size={26} aria-hidden="true" />
                    <div>
                      <h3>{item.title}</h3>
                      <p>
                        {answeredCount(item)}/{examPageCount(item)} respondidas
                        · Pregunta {item.page + 1}
                      </p>
                      <small>
                        {item.status === "completed"
                          ? "Finalizado"
                          : "Última actividad"}
                        :{" "}
                        {new Intl.DateTimeFormat("es-ES", {
                          dateStyle: "short",
                          timeStyle: "short",
                        }).format(
                          new Date(
                            item.status === "completed"
                              ? (item.completedAt ?? item.updatedAt)
                              : item.updatedAt,
                          ),
                        )}
                      </small>
                      {item.status === "completed" && <p>{resultText(item)}</p>}
                    </div>
                    <div className="exam-catalog-actions">
                      <button
                        className="button"
                        onClick={() => setActiveId(item.id)}
                        aria-label={`${item.status === "in-progress" ? "Continuar" : "Revisar"}: ${item.title}`}
                      >
                        {item.status === "in-progress"
                          ? "Continuar"
                          : "Revisar"}
                      </button>
                      {item.status === "completed" && (
                        <button
                          className="button secondary"
                          onClick={() => {
                            const model = models.find(
                              (model) => model.id === item.modelId,
                            );
                            if (model) start(model);
                          }}
                          aria-label={`Repetir: ${item.title}`}
                        >
                          <RotateCcw size={18} aria-hidden="true" />
                          Repetir
                        </button>
                      )}
                    </div>
                  </article>
                ))}
          {(filter === "pending"
            ? pending
            : filter === "in-progress"
              ? inProgress
              : completed
          ).length === 0 && (
            <p className="exam-catalog-empty">
              {filter === "pending"
                ? "No quedan modelos sin empezar. Puedes continuar un examen o repetir uno realizado."
                : filter === "in-progress"
                  ? "No tienes exámenes a medias."
                  : "Aquí aparecerán los exámenes que termines."}
            </p>
          )}
        </div>
      )}
      <p className="exam-storage-help">
        Las respuestas se guardan por usuario en este navegador. El tiempo de
        práctica se pausa al salir. No se sincronizan todavía entre
        dispositivos.
      </p>
    </section>
  );
}
function resultText(attempt: ExamAttempt) {
  if (attempt.data.kind !== "test")
    return "Respuestas conservadas · Sin nota automática";
  const { questions, answers, spec } = attempt.data;
  const result = examResult(
    questions,
    answers,
    spec.penalized,
    spec.incorrectPenalty,
  );
  const score = spec.scoreScale
    ? spec.scoreScale[result.correct]
    : result.score;
  return `${result.correct} aciertos · ${result.incorrect} errores · ${result.blank} en blanco${score === null ? "" : ` · ${score.toLocaleString("es-ES")} / 10${spec.developmentPrompts ? " (solo test)" : ""}`}`;
}
