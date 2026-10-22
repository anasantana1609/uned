import { test } from "node:test";
import assert from "node:assert/strict";
import {
  firstYearCatalog,
  catalogEntry,
  isSubjectLocked,
} from "../lib/subject-catalog";
import { subjectDefinitions } from "../lib/model";

test("first-year catalogue has the eleven supplied subjects and preserves the six confirmed first-semester subjects", () => {
  assert.equal(firstYearCatalog.length, 11);
  assert.equal(
    firstYearCatalog.reduce((total, s) => total + s.credits, 0),
    60,
  );
  assert.equal(firstYearCatalog.filter((s) => s.firstSemester).length, 6);
  assert.equal(firstYearCatalog.filter((s) => isSubjectLocked(s)).length, 5);
  assert.equal(new Set(firstYearCatalog.map((s) => s.code)).size, 11);
  for (const definition of subjectDefinitions) assert(catalogEntry(definition));
  assert.equal(catalogEntry({ name: "Derecho Procesal" })?.code, "021044");
  assert.equal(
    catalogEntry({ name: "Introducción al Derecho Procesal (Derecho)" })?.code,
    "021044",
  );
  assert.equal(isSubjectLocked({ name: "Derecho Romano" }), true);
  assert.equal(isSubjectLocked({ name: "Derecho Civil I.1" }), false);
});
