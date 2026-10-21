import { test } from "node:test";
import assert from "node:assert/strict";
import {
  addDays,
  validDate,
  demoData,
  validateTask,
  streak,
  weeklyMinutes,
  safeRedirect,
} from "../lib/model";
test("calendar dates respect leap days and year boundaries", () => {
  assert.equal(addDays("2024-02-28", 1), "2024-02-29");
  assert.equal(addDays("2026-12-31", 1), "2027-01-01");
  assert.equal(validDate("2026-02-30"), false);
  assert.equal(validDate("2024-02-29"), true);
  assert.equal(validDate("2026-13-01"), false);
});
test("task validation rejects missing subjects, blank titles and impossible duration", () => {
  const d = demoData("2026-10-21");
  const t = d.tasks[0];
  assert.doesNotThrow(() => validateTask(t, d.subjects));
  for (const invalid of [
    { ...t, title: "  " },
    { ...t, minutes: 0 },
    { ...t, minutes: 4.5 },
    { ...t, date: "2026-02-30" },
    { ...t, subjectId: "foreign-user" },
  ])
    assert.throws(() => validateTask(invalid, d.subjects));
});
test("streak counts unique days, allows today to be unfinished, and breaks at gaps", () => {
  const s = demoData("2026-10-21").sessions;
  assert.equal(streak(s, "2026-10-21"), 4);
  assert.equal(streak([...s, ...s], "2026-10-21"), 4);
  assert.equal(streak(s, "2026-10-22"), 4);
  assert.equal(streak(s, "2026-10-23"), 0);
});
test("weekly totals exclude older and future sessions", () => {
  const s = demoData("2026-10-21").sessions;
  const week = weeklyMinutes(
    [
      ...s,
      { id: "outside", subjectId: "demo-0", minutes: 1000, date: "2026-01-01" },
    ],
    "2026-10-21",
  );
  assert.equal(week.length, 7);
  assert.equal(
    week.reduce((a, d) => a + d.minutes, 0),
    195,
  );
  assert.equal(week.at(-1)?.minutes, 20);
});
test("OAuth redirects stay on the application origin", () => {
  for (const url of [
    "https://evil.test",
    "//evil.test",
    "/\\evil.test",
    "/\n/evil.test",
    "/\t/evil.test",
    null,
  ])
    assert.equal(safeRedirect(url), "/dashboard");
  assert.equal(safeRedirect("/calendario"), "/calendario");
});
