import { test } from "node:test";
import assert from "node:assert/strict";
import {
  lessonsFor,
  passedLesson,
  readLearningProgress,
} from "../lib/learning";
import { civilTopicLessons } from "../lib/civil-learning";

test("Civil adds introductory material for each missing programme topic with traceable practice", () => {
  const civil = lessonsFor("021096");
  assert.equal(new Set(civil.map((l) => l.id)).size, civil.length);
  assert.deepEqual(
    [...new Set(civil.map((l) => Number(l.topic.split(" ")[1])))].sort(
      (a, b) => a - b,
    ),
    Array.from({ length: 14 }, (_, i) => i + 1),
  );
  for (const lesson of civilTopicLessons) {
    assert.ok(lesson.sources.some((s) => s.includes("páginas PDF")));
    assert.ok(lesson.examModel?.includes(".pdf"));
    assert.equal(lesson.questions.length, 3);
    for (const question of lesson.questions) {
      assert.equal(question.options.length, 3);
      assert.equal(new Set(question.options).size, 3);
      assert.ok(
        Number.isInteger(question.answer) &&
          question.answer >= 0 &&
          question.answer < 3,
      );
      assert.ok(question.explanation.trim().length > 30);
    }
    assert.equal(
      passedLesson(
        lesson,
        lesson.questions.map((q) => q.answer),
      ),
      true,
    );
    assert.equal(passedLesson(lesson, []), false);
  }
});
test("extending the programme preserves existing completed lesson IDs", () => {
  const old = {
    "civil-ambito-v1": "2026-10-22T12:00:00Z",
    "civil-fuentes-v1": "2026-10-22T12:00:00Z",
  };
  const progress = readLearningProgress(JSON.stringify(old));
  assert.equal(progress["civil-ambito-v1"], old["civil-ambito-v1"]);
});
