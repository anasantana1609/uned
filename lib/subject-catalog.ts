import type { Subject } from "./model";

// Names, short codes and credits transcribed from the user's first-year list.
// Semester membership follows the six subjects previously confirmed by the user.
export const firstYearCatalog = [
  {
    name: "Historia del Derecho Español",
    title: "Historia del Derecho Español",
    code: "021015",
    credits: 6,
    firstSemester: true,
  },
  {
    name: "Teoría del Derecho",
    title: "Teoría del Derecho",
    code: "021021",
    credits: 6,
    firstSemester: true,
  },
  {
    name: "Teoría del Estado Constitucional",
    title: "Teoría del Estado Constitucional",
    code: "021038",
    credits: 6,
    firstSemester: true,
  },
  {
    name: "Derecho Procesal",
    title: "Introducción al Derecho Procesal (Derecho)",
    code: "021044",
    credits: 4,
    firstSemester: true,
  },
  {
    name: "Cultura Europea en España",
    title: "Cultura Europea en España",
    code: "021050",
    credits: 6,
    firstSemester: false,
  },
  {
    name: "Derecho Romano",
    title: "Derecho Romano",
    code: "021067",
    credits: 6,
    firstSemester: false,
  },
  {
    name: "Derecho Constitucional",
    title: "Derecho Constitucional I (Derecho)",
    code: "021073",
    credits: 5,
    firstSemester: false,
  },
  {
    name: "Derecho Civil I.1",
    title: "Derecho Civil I.1: Parte General y Persona",
    code: "021096",
    credits: 4.5,
    firstSemester: true,
  },
  {
    name: "Derecho Civil I.2 Familia",
    title: "Derecho Civil I.2: Familia",
    code: "021104",
    credits: 4.5,
    firstSemester: false,
  },
  {
    name: "Fundamentos de la Democracia",
    title: "Fundamentos Clásicos de la Democracia y de la Administración",
    code: "901012",
    credits: 6,
    firstSemester: true,
  },
  {
    name: "Derecho Administrativo",
    title: "Derecho Administrativo I",
    code: "901029",
    credits: 6,
    firstSemester: false,
  },
] as const;

export function catalogEntry(subject: Pick<Subject, "name">) {
  return firstYearCatalog.find(
    (s) => s.name === subject.name || s.title === subject.name,
  );
}
export function subjectTitle(subject: Pick<Subject, "name">) {
  return catalogEntry(subject)?.title ?? subject.name;
}
export function isSubjectLocked(subject: Pick<Subject, "name">) {
  // There are no published lessons for the remaining subjects yet.
  return catalogEntry(subject)?.firstSemester === false;
}
