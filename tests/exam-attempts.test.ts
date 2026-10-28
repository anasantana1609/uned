import { test } from "node:test";
import assert from "node:assert/strict";
import {
  answeredCount,
  examModelsFor,
  examPageCount,
  examStorageKey,
  newExamAttempt,
  readExamAttempts,
} from "../lib/exam-attempts";

test("saved exams retain the complete question order, grading rules and written drafts", () => {
  for (const code of [
    "021021",
    "021096",
    "021038",
    "901012",
    "021015",
    "021044",
  ]) {
    const model = examModelsFor(code)[0];
    const attempt = newExamAttempt(
      code,
      model,
      `fixture-${code}`,
      "2026-10-28T10:00:00Z",
    );
    attempt.page = 1;
    attempt.remainingMs = 314_321;
    if (attempt.data.kind === "test") {
      attempt.data.answers[attempt.data.questions[0].id] = 0;
      if (attempt.data.spec.developmentPrompts)
        attempt.data.developmentAnswers[0] = "Texto dictado y revisado";
    } else if (attempt.data.kind === "history") {
      attempt.data.chosen = [0, 1];
      attempt.data.answers[0] = "Desarrollo conservado";
      attempt.data.comment = "Comentario conservado";
    } else attempt.data.answers[2] = "Respuesta al caso";
    assert.deepEqual(readExamAttempts(JSON.stringify([attempt])), [attempt]);
    assert.ok(answeredCount(attempt) >= 1);
    assert.ok(examPageCount(attempt) > attempt.page);
  }
  assert.notEqual(examStorageKey("alice"), examStorageKey("bob"));
  assert.notEqual(examStorageKey("alice"), examStorageKey("demo"));
});

test("exam catalogue identifies supplied written models and only labels generated tests as practice", () => {
  assert.equal(examModelsFor("021015").length, 9);
  assert.equal(examModelsFor("021044").length, 2);
  assert.equal(examModelsFor("021021").length, 3);
  assert.deepEqual(examModelsFor("021073"), []);
  const first = newExamAttempt("021021", examModelsFor("021021")[0], "first");
  const repeated = newExamAttempt(
    "021021",
    examModelsFor("021021")[0],
    "repeated",
  );
  first.status = "completed";
  assert.equal(repeated.status, "in-progress");
  assert.equal(first.status, "completed");
  assert.notEqual(first.id, repeated.id);
});

test("damaged saved attempts are rejected rather than silently erasing the history", () => {
  for (const raw of ["bad JSON", "{}", "null", '[{"version":99}]'])
    assert.throws(() => readExamAttempts(raw));
  const attempt = newExamAttempt(
    "021021",
    examModelsFor("021021")[0],
    "fixture",
  );
  assert.throws(() =>
    readExamAttempts(JSON.stringify([{ ...attempt, page: 900 }])),
  );
  assert.throws(() =>
    readExamAttempts(JSON.stringify([{ ...attempt, remainingMs: -1 }])),
  );
  assert.throws(() => readExamAttempts(JSON.stringify([attempt, attempt])));
  if (attempt.data.kind === "test") {
    attempt.data.answers[attempt.data.questions[0].id] = 999;
    assert.throws(() => readExamAttempts(JSON.stringify([attempt])));
  }
});
