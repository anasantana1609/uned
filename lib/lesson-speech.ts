import type { Lesson } from "./learning";

// Read the teaching material, leaving the self-assessment answers hidden.
export function lessonSpeechText(lesson: Lesson): string {
  return [
    lesson.title,
    `Al terminar: ${lesson.objective}`,
    `Conceptos: ${lesson.concepts.join(", ")}.`,
    "Comprende.",
    ...lesson.explanation,
    "Un ejemplo.",
    lesson.example,
    "Practica sin mirar.",
    lesson.practice,
    ...(lesson.writtenPractice
      ? [lesson.writtenPractice.kind, lesson.writtenPractice.prompt]
      : []),
  ].join("\n\n");
}

// Short utterances avoid browser limits when reading long lessons.
export function speechChunks(text: string): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const chunks: string[] = [];
  let chunk = "";
  for (const word of words) {
    if (chunk && chunk.length + 1 + word.length > 220) {
      chunks.push(chunk);
      chunk = "";
    }
    // Also handle long strings without whitespace.
    if (word.length > 220) {
      if (chunk) chunks.push(chunk);
      chunk = "";
      for (let i = 0; i < word.length; i += 220)
        chunks.push(word.slice(i, i + 220));
    } else chunk += `${chunk ? " " : ""}${word}`;
  }
  if (chunk) chunks.push(chunk);
  return chunks;
}
