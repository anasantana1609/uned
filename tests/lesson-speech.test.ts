import { test } from "node:test";
import assert from "node:assert/strict";
import { speechChunks, lessonSpeechText } from "../lib/lesson-speech";
import { lessons } from "../lib/learning";

test("every available lesson reads its teaching content without revealing its quiz", () => {
  for (const lesson of lessons) {
    const text = lessonSpeechText(lesson);
    for (const part of [
      lesson.title,
      lesson.objective,
      ...lesson.explanation,
      lesson.example,
      lesson.practice,
    ])
      assert.ok(text.includes(part));
    for (const question of lesson.questions) {
      assert.ok(!text.includes(question.prompt));
    }
    assert.equal(lessonSpeechText({ ...lesson, questions: [] }), text);
  }
});

test("empty lessons do not produce utterances", () => {
  assert.deepEqual(speechChunks(" \n\t "), []);
});
test("long lessons preserve every word in order with bounded utterances", () => {
  const text = "La persona tiene capacidad jurídica.\n".repeat(400);
  const chunks = speechChunks(text);
  assert.ok(chunks.length > 1);
  assert.ok(chunks.every((c) => c.length <= 220));
  assert.equal(chunks.join(" "), text.trim().replace(/\s+/g, " "));
});
test("long unbroken strings are bounded without losing characters", () => {
  const text = "a".repeat(1000);
  assert.equal(speechChunks(text).join(""), text);
  assert.ok(speechChunks(text).every((c) => c.length <= 220));
});
