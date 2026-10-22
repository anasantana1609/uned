import { test } from "node:test";
import assert from "node:assert/strict";
import { civilSyllabus } from "../lib/civil-syllabus";

test("Civil outline follows the fourteen-topic programme and all twenty-six chapters without claiming the unread book", () => {
  assert.equal(civilSyllabus.topics.length, 14);
  assert.deepEqual(
    civilSyllabus.topics.map((t) => t.number),
    Array.from({ length: 14 }, (_, i) => i + 1),
  );
  assert.deepEqual(
    civilSyllabus.topics.flatMap((t) => [...t.chapters]),
    Array.from({ length: 26 }, (_, i) => i + 1),
  );
  assert.equal(civilSyllabus.status, "preparing");
  assert.equal(civilSyllabus.pendingBookParts, 3);
  assert.equal(
    civilSyllabus.uniqueReadableFiles +
      civilSyllabus.duplicateFiles +
      civilSyllabus.pendingBookParts,
    civilSyllabus.receivedFiles,
  );
  assert.deepEqual(
    civilSyllabus.exclusions.find((e) => e.chapter === 3)?.sections,
    [3, 4, 8, 9, 10, 11],
  );
  assert.equal(civilSyllabus.exclusions.length, 8);
});
