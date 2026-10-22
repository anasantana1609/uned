import { test } from "node:test";
import assert from "node:assert/strict";
import { proceduralSyllabus as syllabus } from "../lib/procedural-syllabus";

test("Procesal maps all programme lessons to the supporting summary without claiming a full manual", () => {
  assert.deepEqual(
    syllabus.topics.map((t) => t.number),
    Array.from({ length: 28 }, (_, i) => i + 1),
  );
  assert.deepEqual(
    [...new Set(syllabus.topics.map((t) => t.block))],
    [1, 2, 3, 4, 5],
  );
  assert.equal(syllabus.blocks.length, 5);
  const covered = syllabus.topics.flatMap((t) =>
    Array.from(
      { length: t.summaryEndPage - t.summaryStartPage + 1 },
      (_, i) => t.summaryStartPage + i,
    ),
  );
  assert.deepEqual(
    covered,
    Array.from({ length: 138 }, (_, i) => i + 1),
  );
  assert.equal(
    syllabus.downloadedFiles + syllabus.oversizedFiles,
    syllabus.receivedFiles,
  );
  assert.equal(syllabus.manualExcerptPdfPages, 37);
  assert.equal(syllabus.status, "preparing");
});
