import {
  examPracticeFor,
  shuffledQuestions,
  type PracticeQuestion,
  type PracticeSpec,
} from "./exam-practice";
import { historyPracticeModels } from "./history-practice";
import { proceduralPracticeModels } from "./procedural-practice";

export type ExamModel = {
  id: string;
  title: string;
  description: string;
  index: number;
  kind: "test" | "history" | "procedural";
};
export type TestDraft = {
  kind: "test";
  questions: PracticeQuestion[];
  spec: Omit<PracticeSpec, "bank">;
  answers: Record<string, number>;
  developmentIndex: number;
  developmentAnswers: Record<number, string>;
};
export type HistoryDraft = {
  kind: "history";
  modelIndex: number;
  model: (typeof historyPracticeModels)[number];
  chosen: number[];
  answers: Record<number, string>;
  comment: string;
};
export type ProceduralDraft = {
  kind: "procedural";
  modelIndex: number;
  model: (typeof proceduralPracticeModels)[number];
  answers: Record<number, string>;
};
export type ExamAttempt = {
  version: 1;
  id: string;
  code: string;
  modelId: string;
  title: string;
  status: "in-progress" | "completed";
  startedAt: string;
  updatedAt: string;
  completedAt: string | null;
  page: number;
  remainingMs: number | null;
  data: TestDraft | HistoryDraft | ProceduralDraft;
};
export type AttemptPatch = Partial<
  Pick<ExamAttempt, "status" | "completedAt" | "page" | "remainingMs" | "data">
>;
export type ExamSessionProps = {
  attempt: ExamAttempt;
  onUpdate: (patch: AttemptPatch) => void;
  onNew: () => void;
  onExit: () => void;
  onModelChange: (index: number) => void;
};
export const examStorageKey = (account: string) =>
  `uned-exam-attempts-v1:${account}`;
export function examModelsFor(code: string): ExamModel[] {
  if (code === "021015")
    return historyPracticeModels.map((model, index) => ({
      id: model.id,
      title: model.title,
      index,
      kind: "history",
      description:
        "Dos desarrollos a elegir entre tres y un comentario de texto. Adaptación para practicar.",
    }));
  if (code === "021044")
    return proceduralPracticeModels.map((model, index) => ({
      id: `procesal-${index + 1}`,
      title: model.title,
      index,
      kind: "procedural",
      description:
        "Dos desarrollos y un caso práctico. Preguntas originales de práctica.",
    }));
  const spec = examPracticeFor(code);
  return spec.available
    ? Array.from({ length: 3 }, (_, index) => ({
        id: `simulacro-${index + 1}`,
        title: `Simulacro ${index + 1}`,
        index,
        kind: "test" as const,
        description: `${spec.count} preguntas${spec.developmentPrompts ? " y un desarrollo" : ""}${spec.minutes ? ` · ${spec.minutes} minutos` : ""}. Selección de preguntas originales de práctica.`,
      }))
    : [];
}
export function newExamAttempt(
  code: string,
  model: ExamModel,
  id: string,
  now = new Date().toISOString(),
): ExamAttempt {
  let data: ExamAttempt["data"];
  let minutes: number | null = 120;
  if (model.kind === "history")
    data = {
      kind: "history",
      modelIndex: model.index,
      model: structuredClone(historyPracticeModels[model.index]),
      chosen: [],
      answers: {},
      comment: "",
    };
  else if (model.kind === "procedural")
    data = {
      kind: "procedural",
      modelIndex: model.index,
      model: structuredClone(proceduralPracticeModels[model.index]),
      answers: {},
    };
  else {
    const { bank, ...spec } = examPracticeFor(code);
    minutes = spec.minutes;
    data = {
      kind: "test",
      questions: shuffledQuestions(bank, spec.count),
      spec,
      answers: {},
      developmentIndex: 0,
      developmentAnswers: {},
    };
  }
  return {
    version: 1,
    id,
    code,
    modelId: model.id,
    title: model.title,
    status: "in-progress",
    startedAt: now,
    updatedAt: now,
    completedAt: null,
    page: 0,
    remainingMs: minutes === null ? null : minutes * 60_000,
    data,
  };
}
export function examPageCount(attempt: ExamAttempt) {
  const data = attempt.data;
  return data.kind === "test"
    ? data.questions.length + (data.spec.developmentPrompts ? 1 : 0)
    : data.kind === "history"
      ? data.model.questions.length + 1
      : 3;
}
export function answeredCount(attempt: ExamAttempt) {
  const data = attempt.data;
  if (data.kind === "test")
    return (
      data.questions.filter((q) => data.answers[q.id] !== undefined).length +
      (data.spec.developmentPrompts &&
      data.developmentAnswers[data.developmentIndex]?.trim()
        ? 1
        : 0)
    );
  if (data.kind === "history")
    return (
      data.chosen.filter((index) => data.answers[index]?.trim()).length +
      (data.comment.trim() ? 1 : 0)
    );
  return Object.values(data.answers).filter((value) => value.trim()).length;
}
const record = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && !Array.isArray(value);
const strings = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");
const textMap = (value: unknown) =>
  record(value) &&
  Object.values(value).every((item) => typeof item === "string");
const date = (value: unknown) =>
  typeof value === "string" && Number.isFinite(Date.parse(value));
function validData(value: unknown): boolean {
  if (!record(value)) return false;
  if (value.kind === "test") {
    if (
      !Array.isArray(value.questions) ||
      !value.questions.length ||
      !record(value.spec) ||
      !record(value.answers) ||
      !textMap(value.developmentAnswers) ||
      !Number.isInteger(value.developmentIndex)
    )
      return false;
    const spec = value.spec;
    if (
      typeof spec.available !== "boolean" ||
      typeof spec.penalized !== "boolean" ||
      typeof spec.description !== "string" ||
      typeof spec.source !== "string" ||
      typeof spec.incorrectPenalty !== "number" ||
      !Number.isFinite(spec.incorrectPenalty) ||
      spec.incorrectPenalty < 0
    )
      return false;
    if (
      spec.developmentPrompts !== undefined &&
      !strings(spec.developmentPrompts)
    )
      return false;
    if (
      spec.scoreScale !== undefined &&
      (!Array.isArray(spec.scoreScale) ||
        spec.scoreScale.length !== value.questions.length + 1 ||
        !spec.scoreScale.every(
          (n) => typeof n === "number" && Number.isFinite(n),
        ))
    )
      return false;
    const questions = value.questions;
    if (
      !questions.every(
        (q) =>
          record(q) &&
          typeof q.id === "string" &&
          typeof q.prompt === "string" &&
          strings(q.options) &&
          Number.isInteger(q.answer) &&
          Number(q.answer) >= 0 &&
          Number(q.answer) < q.options.length &&
          typeof q.explanation === "string" &&
          typeof q.topic === "string" &&
          strings(q.sources),
      )
    )
      return false;
    if (new Set(questions.map((q) => q.id)).size !== questions.length)
      return false;
    if (
      !Object.entries(value.answers).every(([id, choice]) =>
        questions.some(
          (q) =>
            q.id === id &&
            Number.isInteger(choice) &&
            Number(choice) >= 0 &&
            Number(choice) < q.options.length,
        ),
      )
    )
      return false;
    return (
      Number(value.developmentIndex) >= 0 &&
      Number(value.developmentIndex) < (spec.developmentPrompts?.length || 1)
    );
  }
  if (
    (value.kind !== "history" && value.kind !== "procedural") ||
    !record(value.model) ||
    typeof value.model.title !== "string" ||
    !strings(value.model.questions) ||
    !Number.isInteger(value.modelIndex) ||
    !textMap(value.answers)
  )
    return false;
  const model = value.model;
  if (value.kind === "history")
    return (
      typeof value.model.id === "string" &&
      value.model.questions.length === 3 &&
      ["source", "excerpt", "attribution", "commentary"].every(
        (key) => typeof model[key] === "string",
      ) &&
      Array.isArray(value.chosen) &&
      value.chosen.length <= 2 &&
      new Set(value.chosen).size === value.chosen.length &&
      value.chosen.every((n) => Number.isInteger(n) && n >= 0 && n < 3) &&
      typeof value.comment === "string"
    );
  return (
    value.model.questions.length === 2 &&
    ["scenario", "task", "sources"].every(
      (key) => typeof model[key] === "string",
    ) &&
    strings(value.model.review)
  );
}
export function readExamAttempts(raw: string): ExamAttempt[] {
  const value: unknown = JSON.parse(raw);
  if (
    !Array.isArray(value) ||
    !value.every(
      (item) =>
        record(item) &&
        item.version === 1 &&
        ["id", "code", "modelId", "title"].every(
          (key) => typeof item[key] === "string" && item[key],
        ) &&
        ["in-progress", "completed"].includes(String(item.status)) &&
        date(item.startedAt) &&
        date(item.updatedAt) &&
        (item.completedAt === null || date(item.completedAt)) &&
        Number.isInteger(item.page) &&
        Number(item.page) >= 0 &&
        (item.remainingMs === null ||
          (typeof item.remainingMs === "number" &&
            Number.isFinite(item.remainingMs) &&
            item.remainingMs >= 0)) &&
        validData(item.data),
    )
  )
    throw new Error("No se pudieron recuperar los exámenes guardados.");
  const attempts = value as ExamAttempt[];
  if (
    new Set(attempts.map((item) => item.id)).size !== attempts.length ||
    attempts.some((item) => item.page >= examPageCount(item))
  )
    throw new Error("No se pudieron recuperar los exámenes guardados.");
  return attempts;
}
