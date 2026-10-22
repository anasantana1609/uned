import { test } from "node:test";
import assert from "node:assert/strict";
import {
  lessons,
  passedLesson,
  learningSummary,
  readLearningProgress,
  recommendSubject,
} from "../lib/learning";
import { demoData } from "../lib/model";

test("learning requires all answers, rejects sparse or invalid answers, and separates available-block progress from minutes", () => {
  for (const l of lessons) {
    const correct = l.questions.map((q) => q.answer);
    assert.equal(passedLesson(l, correct), true);
    assert.equal(passedLesson(l, correct.slice(1)), false);
    assert.equal(passedLesson(l, new Array(l.questions.length)), false);
    assert.equal(
      passedLesson(
        l,
        correct.map((x, i) => (i === 0 ? -1 : x)),
      ),
      false,
    );
    assert.equal(passedLesson(l, [...correct, 0]), false);
  }
  assert.equal(learningSummary("021096", {}).percent, 0);
  assert.equal(
    learningSummary("021096", { [lessons[0].id]: "2026-10-22T12:00:00Z" })
      .percent,
    33,
  );
  assert.equal(learningSummary("021067", {}).total, 0);
  assert.deepEqual(
    readLearningProgress(
      JSON.stringify({
        [lessons[0].id]: "2026-10-22",
        unknown: "2026-10-22",
        [lessons[1].id]: 99,
      }),
    ),
    { [lessons[0].id]: "2026-10-22" },
  );
});

test("recommendation prioritizes confirmed upcoming exams, ignores past exams and completed content", () => {
  const data = demoData("2026-10-22");
  const civil = data.subjects.find((s) => s.name === "Derecho Civil I.1")!;
  const procesal = data.subjects.find((s) => s.name === "Derecho Procesal")!;
  const exams = [
    {
      id: "next",
      subjectId: procesal.id,
      date: "2027-01-10",
      title: "Examen",
      confirmed: true,
    },
    {
      id: "past",
      subjectId: civil.id,
      date: "2026-01-10",
      title: "Pasado",
      confirmed: true,
    },
  ];
  assert.equal(
    recommendSubject(data.subjects, {}, exams, "2026-10-22")?.id,
    procesal.id,
  );
  const complete = Object.fromEntries(lessons.map((l) => [l.id, "2026-10-22"]));
  assert.equal(
    recommendSubject(data.subjects, complete, exams, "2026-10-22"),
    undefined,
  );
  assert.notEqual(
    recommendSubject(
      data.subjects,
      { ...complete, [lessons[0].id]: "" },
      exams,
      "2026-10-22",
    )?.id,
    procesal.id,
  );
});
