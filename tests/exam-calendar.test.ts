import { test } from "node:test";
import assert from "node:assert/strict";
import {
  semesterExams,
  savedExamOption,
  scheduledExamTitle,
} from "../lib/exam-calendar";
import { validDate, subjectDefinitions } from "../lib/model";

test("highlighted first-semester subjects have both Las Palmas options in 2027", () => {
  assert.equal(semesterExams.length, 6);
  assert.equal(new Set(semesterExams.map((s) => s.code)).size, 6);
  for (const subject of semesterExams) {
    assert(subjectDefinitions.some((s) => s.name === subject.subjectName));
    assert.equal(subject.options.length, 2);
    for (const option of subject.options) {
      assert(validDate(option.date));
      assert.match(option.time, /^(08:00|10:30|15:00|17:30)$/);
      const title = scheduledExamTitle(subject, option);
      assert(title.length <= 160);
      assert.equal(
        savedExamOption({
          id: "test",
          subjectId: "test",
          date: option.date,
          title,
          confirmed: true,
        })?.option,
        option,
      );
    }
  }
  const civil = semesterExams.find((s) => s.code === "66021096")!;
  assert.deepEqual(civil.options, [
    { date: "2027-01-25", time: "10:30" },
    { date: "2027-02-08", time: "17:30" },
  ]);
  assert.equal(
    savedExamOption({
      id: "manual",
      subjectId: "test",
      date: "2027-01-25",
      title: "Examen manual",
      confirmed: true,
    }),
    null,
  );
});
