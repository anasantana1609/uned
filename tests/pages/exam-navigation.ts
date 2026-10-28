import type { Page } from "@playwright/test";
export async function goToExamQuestion(page: Page, number: number) {
  const summary = page.locator(".exam-answer-summary");
  if (!(await summary.evaluate((element) => element.hasAttribute("open"))))
    await summary.locator("summary").click();
  await summary
    .getByRole("button", { name: new RegExp(`^Pregunta ${number}:`) })
    .click();
}

export async function startExam(page: Page, index = 0) {
  const catalog = page.getByRole("region", {
    name: "Mis exámenes",
    exact: true,
  });
  await catalog
    .getByRole("button", { name: /^Empezar:/ })
    .nth(index)
    .click();
}
