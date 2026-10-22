import type { Exam } from "./model";

// Transcribed from the user's highlighted Grado en Derecho tables.
// PDF pages 2–3 (printed pages 1–2). The source is explicitly a draft.
export const examCalendar = {
  id: "febrero-2027-las-palmas",
  name: "Convocatoria ordinaria · febrero 2027",
  centre: "Las Palmas",
  timezone: "Atlantic/Canary",
  source: "/calendarios/examenes-febrero-2027-las-palmas.pdf",
  draft: true,
} as const;

export const semesterExams = [
  {
    subjectName: "Derecho Civil I.1",
    officialName: "Derecho Civil I.1: Parte general y persona",
    code: "66021096",
    page: 3,
    options: [
      { date: "2027-01-25", time: "10:30" },
      { date: "2027-02-08", time: "17:30" },
    ],
  },
  {
    subjectName: "Historia del Derecho Español",
    officialName: "Historia del Derecho Español",
    code: "66021015",
    page: 3,
    options: [
      { date: "2027-01-25", time: "17:30" },
      { date: "2027-02-08", time: "10:30" },
    ],
  },
  {
    subjectName: "Fundamentos de la Democracia",
    officialName:
      "Fundamentos clásicos de la democracia y de la administración",
    code: "66901012",
    page: 2,
    options: [
      { date: "2027-01-26", time: "08:00" },
      { date: "2027-02-09", time: "15:00" },
    ],
  },
  {
    subjectName: "Teoría del Derecho",
    officialName: "Teoría del Derecho",
    code: "66021021",
    page: 3,
    options: [
      { date: "2027-01-27", time: "15:00" },
      { date: "2027-02-10", time: "08:00" },
    ],
  },
  {
    subjectName: "Teoría del Estado Constitucional",
    officialName: "Teoría del Estado Constitucional",
    code: "66021038",
    page: 2,
    options: [
      { date: "2027-01-28", time: "08:00" },
      { date: "2027-02-11", time: "15:00" },
    ],
  },
  {
    subjectName: "Derecho Procesal",
    officialName: "Introducción al Derecho Procesal (Derecho)",
    code: "66021044",
    page: 3,
    options: [
      { date: "2027-01-29", time: "17:30" },
      { date: "2027-02-12", time: "10:30" },
    ],
  },
] as const;

export type SemesterExam = (typeof semesterExams)[number];
export type ExamOption = SemesterExam["options"][number];

// Keep the existing exam_dates contract: the saved title carries the time,
// location and source status in exports and across devices, without a migration.
export function scheduledExamTitle(subject: SemesterExam, option: ExamOption) {
  return `Febrero 2027 · ${subject.code} · ${option.time} Canarias · BORRADOR`;
}

export function savedExamOption(exam: Exam) {
  for (const subject of semesterExams) {
    const option = subject.options.find(
      (o) =>
        o.date === exam.date && exam.title === scheduledExamTitle(subject, o),
    );
    if (option) return { subject, option };
  }
  return null;
}
