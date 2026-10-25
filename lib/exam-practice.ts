import { lessonsFor, type Question } from "./learning";

export type PracticeQuestion = Question & {
  id: string;
  topic: string;
  sources: string[];
};
export function examPracticeFor(code: string) {
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
        "20 preguntas con tres alternativas y 60 minutos. Acierto: +0,5; error: −0,1; en blanco: 0. Preguntas originales de práctica sobre los 14 temas. Reglas de los modelos aportados de 2023–2026; los de 2022 no penalizaban los errores.",
      source: "E660210210A26F1.pdf · página PDF 1",
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
        "Práctica tipo test con las preguntas originales de los bloques disponibles. Es un banco inicial: no equivale a un examen completo. Se muestran aciertos, errores y blancos; no se aplica una penalización ni una nota oficial sin verificar la guía vigente.",
      source: "Fuentes didácticas indicadas en cada corrección.",
    };
  const description =
    code === "021015"
      ? "Modelo de Historia: dos desarrollos a elegir entre tres y un comentario de texto obligatorio. La práctica escrita se presenta en el apartado de Historia."
      : code === "021044"
        ? "El modelo y los criterios de evaluación de Procesal están pendientes de verificar con la guía vigente. Las preguntas de comprobación de las lecciones no se presentan como un examen de la asignatura."
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
