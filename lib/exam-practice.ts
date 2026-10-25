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
      description:
        "Modelo de Civil de febrero de 2023: 20 preguntas, tres alternativas, 60 minutos. Acierto: +0,5; error: −0,25; en blanco: 0. Ejercicios originales basados en tus materiales, no enunciados oficiales. No confirma las reglas de la convocatoria vigente.",
      source: "examen 2023 CIVIL I.pdf · página PDF 1",
    };
  if (code === "901012")
    return {
      available: true,
      bank,
      count: Math.min(20, bank.length),
      minutes: null,
      penalized: false,
      description:
        "Práctica tipo test con las preguntas originales de los bloques disponibles. Es un banco inicial: no equivale a un examen completo. Se muestran aciertos, errores y blancos; no se aplica una penalización ni una nota oficial sin verificar la guía vigente.",
      source: "Fuentes didácticas indicadas en cada corrección.",
    };
  const description =
    code === "021015"
      ? "Modelo de Historia: dos desarrollos a elegir entre tres y un comentario de texto obligatorio, según los exámenes recibidos. La preparación de preguntas y respuestas está en pausa hasta que termines de subir los materiales y nos avises."
      : code === "021044"
        ? "El modelo y los criterios de evaluación de Procesal están pendientes de verificar con la guía vigente. Las preguntas de comprobación de las lecciones no se presentan como un examen de la asignatura."
        : "El banco de preguntas y el modelo de examen se habilitarán al incorporar y revisar los materiales de esta asignatura.";
  return {
    available: false,
    bank: [],
    count: 0,
    minutes: null,
    penalized: false,
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
    score: penalized ? Math.max(0, correct * 0.5 - incorrect * 0.25) : null,
  };
}
