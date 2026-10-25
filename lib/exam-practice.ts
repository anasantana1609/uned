import { lessonsFor, type Question } from "./learning";

export type PracticeQuestion = Question & {
  id: string;
  topic: string;
  sources: string[];
};
export type PracticeSpec = {
  available: boolean;
  bank: PracticeQuestion[];
  count: number;
  minutes: number | null;
  penalized: boolean;
  incorrectPenalty: number;
  description: string;
  source: string;
  scoreScale?: readonly number[];
  developmentPrompts?: readonly string[];
};
export const constitutionalScale = [
  0, 0.5, 0.5, 1, 1, 1.5, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 8, 9,
  10,
] as const;
export function constitutionalTestGrade(correct: number) {
  if (!Number.isInteger(correct) || correct < 0 || correct > 20)
    throw new RangeError("El número de aciertos debe estar entre 0 y 20.");
  return constitutionalScale[correct];
}
export function examPracticeFor(code: string): PracticeSpec {
  const bank: PracticeQuestion[] = lessonsFor(code).flatMap((lesson) =>
    lesson.questions.map((question, index) => ({
      ...question,
      id: `${lesson.id}:${index}`,
      topic: lesson.topic,
      sources: lesson.sources,
    })),
  );
  if (code === "021096")
    return {
      available: true,
      bank,
      count: 20,
      minutes: 60,
      penalized: true,
      incorrectPenalty: 0.25,
      description:
        "Modelo de Civil de febrero de 2023: 20 preguntas, tres alternativas, 60 minutos. Acierto: +0,5; error: −0,25; en blanco: 0. Ejercicios originales basados en tus materiales, no enunciados oficiales. No confirma las reglas de la convocatoria vigente.",
      source: "examen 2023 CIVIL I.pdf · página PDF 1",
    };
  if (code === "021021")
    return {
      available: true,
      bank,
      count: 20,
      minutes: 60,
      penalized: true,
      incorrectPenalty: 0.1,
      description:
        "Guía 2026/27: 20 preguntas con tres alternativas y 60 minutos. Acierto: +0,5; error: −0,1; en blanco: 0. Preguntas originales de práctica sobre los 14 temas.",
      source: "66021021_2027.pdf · página PDF 22",
    };
  if (code === "021038")
    return {
      available: true,
      bank,
      count: 20,
      minutes: 120,
      penalized: false,
      incorrectPenalty: 0,
      scoreScale: constitutionalScale,
      developmentPrompts: [
        "Compara Estado federal, confederación y Estado regional. Explica fundamento jurídico, organización y distribución de competencias.",
        "Compara moción de censura y cuestión de confianza en España: iniciativa, finalidad, mayorías y consecuencias.",
      ],
      description:
        "Guía 2026/27: 20 preguntas con cuatro opciones y un desarrollo a elegir entre dos, en 120 minutos. Los errores no penalizan. El test usa un baremo propio: 13 aciertos son 5 puntos. La nota oficial combina test y desarrollo; un cero en cualquiera de las partes impide superar el examen. Aquí solo se corrige automáticamente el test.",
      source: "66021038_2027.pdf · páginas PDF 26–29",
    };
  if (code === "901012")
    return {
      available: true,
      bank,
      count: Math.min(20, bank.length),
      minutes: null,
      penalized: false,
      incorrectPenalty: 0,
      description:
        "Práctica tipo test con preguntas originales sobre los capítulos del manual aportado. Se muestran aciertos, errores y blancos. No se aplica una nota oficial: esta actividad permite repasar los conceptos del libro.",
      source: "Fuentes didácticas indicadas en cada corrección.",
    };
  const description =
    code === "021015"
      ? "Modelo de Historia: dos desarrollos a elegir entre tres y un comentario de texto obligatorio. La práctica escrita se presenta en el apartado de Historia."
      : code === "021044"
        ? "Guía 2026/27: dos preguntas teóricas y un caso práctico obligatorios, 120 minutos. La práctica escrita se presenta en el apartado de Procesal."
        : "El banco de preguntas y el modelo de examen se habilitarán al incorporar y revisar los materiales de esta asignatura.";
  return {
    available: false,
    bank: [],
    count: 0,
    minutes: null,
    penalized: false,
    incorrectPenalty: 0,
    description,
    source: "",
  };
}
export function shuffledQuestions(
  bank: PracticeQuestion[],
  count: number,
): PracticeQuestion[] {
  const copy = [...bank];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}
export function examResult(
  questions: PracticeQuestion[],
  answers: Record<string, number>,
  penalized: boolean,
  incorrectPenalty = 0.25,
) {
  let correct = 0,
    incorrect = 0,
    blank = 0;
  for (const q of questions) {
    if (answers[q.id] === undefined) blank++;
    else if (answers[q.id] === q.answer) correct++;
    else incorrect++;
  }
  return {
    correct,
    incorrect,
    blank,
    score: penalized
      ? Math.round(
          Math.max(0, correct * 0.5 - incorrect * incorrectPenalty) * 100,
        ) / 100
      : null,
  };
}
