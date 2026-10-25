import type { Lesson, Question } from "./learning";

// Author-written teaching blocks. Original documents and OCR stay outside the app.
export type PreparedBlock = {
  number: number;
  title: string;
  concepts: string[];
  paragraphs: [string, string];
  example: string;
  task: string;
  checks: [string, string, string, string, string, string?][];
};

export function prepareBlocks(
  code: string,
  prefix: string,
  blocks: PreparedBlock[],
  sources: (number: number) => string[],
): Lesson[] {
  return blocks.map((block) => ({
    id: `${prefix}-${block.number}-v1`,
    code,
    topic: `${code === "021044" || code === "021015" ? "Lección" : code === "901012" ? "Capítulo" : "Tema"} ${block.number}`,
    title: block.title,
    minutes: 5,
    objective: `Explicar ${block.concepts.join(", ").toLocaleLowerCase("es")}, y aplicarlos a un caso.`,
    concepts: block.concepts,
    explanation: block.paragraphs,
    outline: block.checks.map((check) => check[4]),
    example: block.example,
    practice: block.task,
    sources: sources(block.number),
    questions: block.checks.map(
      (
        [prompt, correct, wrong1, wrong2, explanation, wrong3],
        index,
      ): Question => {
        const options = [correct, wrong1, wrong2, ...(wrong3 ? [wrong3] : [])];
        const answer = (block.number + index) % options.length;
        options.splice(0, 1);
        options.splice(answer, 0, correct);
        return {
          prompt,
          options,
          answer,
          explanation,
          difficulty: index === 0 ? "fácil" : "media",
        };
      },
    ),
  }));
}
