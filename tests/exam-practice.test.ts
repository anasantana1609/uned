import { test } from "node:test";
import assert from "node:assert/strict";
import {
  examPracticeFor,
  examResult,
  shuffledQuestions,
} from "../lib/exam-practice";

test("Civil practice scores correct, wrong and blank responses separately and never mutates its bank", () => {
  const spec = examPracticeFor("021096");
  const selected = shuffledQuestions(spec.bank, spec.count);
  assert.equal(selected.length, 20);
  assert.equal(new Set(selected.map((q) => q.id)).size, 20);
  assert.equal(spec.bank.length, 45);
  const first = selected[0],
    second = selected[1];
  const result = examResult(
    selected,
    { [first.id]: first.answer, [second.id]: (second.answer + 1) % 3 },
    true,
  );
  assert.deepEqual(result, {
    correct: 1,
    incorrect: 1,
    blank: 18,
    score: 0.25,
  });
});
test("unverified models stay unavailable and initial Fundamentos practice has no invented official score", () => {
  for (const code of ["021015", "021044"])
    assert.equal(examPracticeFor(code).available, false);
  const spec = examPracticeFor("901012");
  assert.equal(spec.available, true);
  assert.equal(spec.penalized, false);
  assert.equal(examResult(spec.bank, {}, false).score, null);
});

test("Theory uses its own error penalty, preserves blanks and reaches ten for a perfect attempt", () => {
  const spec = examPracticeFor("021021");
  assert.equal(spec.available, true);
  const questions = shuffledQuestions(spec.bank, spec.count);
  assert.equal(questions.length, 20);
  const [first, second] = questions;
  assert.deepEqual(
    examResult(
      questions,
      {
        [first.id]: first.answer,
        [second.id]: (second.answer + 1) % second.options.length,
      },
      spec.penalized,
      spec.incorrectPenalty,
    ),
    { correct: 1, incorrect: 1, blank: 18, score: 0.4 },
  );
  assert.equal(
    examResult(
      questions,
      Object.fromEntries(questions.map((q) => [q.id, q.answer])),
      true,
      spec.incorrectPenalty,
    ).score,
    10,
  );
  assert.equal(
    examResult(
      questions,
      Object.fromEntries(
        questions.map((q) => [q.id, (q.answer + 1) % q.options.length]),
      ),
      true,
      spec.incorrectPenalty,
    ).score,
    0,
  );
});
