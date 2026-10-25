import { test } from "node:test";
import assert from "node:assert/strict";
import { courseCurricula } from "../lib/course-curricula";
import { lessons, lessonsFor, readLearningProgress } from "../lib/learning";
import { constitutionalTestGrade, examPracticeFor } from "../lib/exam-practice";

test("the six first-semester curricula each have a study block for every topic, without unlocking next semester", () => {
  assert.equal(courseCurricula.length, 6);
  assert.equal(
    courseCurricula.reduce((n, c) => n + c.topics.length, 0),
    114,
  );
  assert.equal(new Set(lessons.map((l) => l.id)).size, lessons.length);
  for (const course of courseCurricula) {
    const available = lessonsFor(course.code);
    const numbers = [
      ...new Set(available.map((l) => Number(l.topic.match(/\d+/)?.[0]))),
    ].sort((a, b) => a - b);
    assert.deepEqual(
      numbers,
      course.topics.map((t) => t.number),
      course.title,
    );
    for (const lesson of available) {
      assert.equal(lesson.questions.length, 3);
      assert.ok(lesson.outline?.length);
      for (const q of lesson.questions) {
        assert.equal(new Set(q.options).size, q.options.length);
        assert.ok(q.answer >= 0 && q.answer < q.options.length);
      }
    }
  }
  for (const code of ["021050", "021067", "021073", "021104", "901029"])
    assert.equal(lessonsFor(code).length, 0);
  assert.ok(
    !JSON.stringify(courseCurricula.find((c) => c.code === "021038")).includes(
      "Multinivel",
    ),
  );
});

test("source updates preserve the previously completed identifiers", () => {
  const old = {
    "historia-ius-commune-v1": "2026-10-24",
    "procesal-tres-ejes-v1": "2026-10-24",
    "fundamentos-justicia-v1": "2026-10-24",
    "teoria-tema-1-v1": "2026-10-24",
  };
  assert.deepEqual(readLearningProgress(JSON.stringify(old)), old);
});

test("TEC uses four alternatives and the official nonlinear scale, with no wrong-answer penalty", () => {
  const spec = examPracticeFor("021038");
  assert.equal(spec.available, true);
  assert.equal(spec.minutes, 120);
  assert.equal(spec.count, 20);
  assert.equal(spec.developmentPrompts?.length, 2);
  assert.ok(spec.bank.every((q) => q.options.length === 4));
  assert.equal(spec.incorrectPenalty, 0);
  for (const [correct, grade] of [
    [0, 0],
    [2, 0.5],
    [6, 1.5],
    [12, 4.5],
    [13, 5],
    [17, 7],
    [18, 8],
    [19, 9],
    [20, 10],
  ])
    assert.equal(constitutionalTestGrade(correct), grade);
  for (const bad of [-1, 21, 2.5, NaN])
    assert.throws(() => constitutionalTestGrade(bad), RangeError);
});
