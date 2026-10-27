import type { Page } from "@playwright/test";
export async function goToExamQuestion(page: Page, number: number) {
  const summary = page.locator(".exam-answer-summary");
  if (!(await summary.evaluate((element) => element.hasAttribute("open"))))
    await summary.locator("summary").click();
  await summary
    .getByRole("button", { name: new RegExp(`^Pregunta ${number}:`) })
    .click();
}
