import type { Page } from "@playwright/test";
import { lessonsFor } from "../../lib/learning";
// Simulate a returning learner who has already passed the prerequisite blocks.
export async function completePrerequisites(
  page: Page,
  code: string,
  targetId: string,
) {
  const lessons = lessonsFor(code);
  const index = lessons.findIndex((lesson) => lesson.id === targetId);
  if (index < 0) throw new Error("Unknown fixture lesson");
  await page.goto("/uned/asignaturas/");
  await page.evaluate(
    (ids) => {
      const existing = JSON.parse(
        localStorage.getItem("uned-learning-v1:demo") ?? "{}",
      );
      localStorage.setItem(
        "uned-learning-v1:demo",
        JSON.stringify({
          ...existing,
          ...Object.fromEntries(
            ids.map((id) => [id, new Date().toISOString()]),
          ),
        }),
      );
    },
    lessons.slice(0, index).map((lesson) => lesson.id),
  );
}
