import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { goToExamQuestion } from "./exam-navigation";

test("exam shows one question, retains answers and exposes a numbered answer summary", async ({
  page,
}) => {
  await page.goto("/uned/dashboard/");
  await page.getByRole("button", { name: /^Teoría del Derecho/ }).click();
  await page.getByRole("button", { name: /Hacer exámenes/ }).click();
  const practice = page.locator(".exam-practice");
  await expect(practice.locator("fieldset:visible")).toHaveCount(1);
  const previous = practice.getByRole("button", {
    name: "Pregunta anterior",
    exact: true,
  });
  const next = practice.getByRole("button", {
    name: "Pregunta siguiente",
    exact: true,
  });
  await expect(previous).toBeDisabled();
  await expect(next).toBeInViewport();
  await practice.locator("fieldset:visible").getByRole("radio").nth(1).check();
  await next.click();
  await expect(practice.locator(".exam-page-heading > strong")).toHaveText(
    "Pregunta 2 de 20",
  );
  await expect(practice.locator("fieldset:visible input:checked")).toHaveCount(
    0,
  );
  await previous.click();
  await expect(
    practice.locator("fieldset:visible").getByRole("radio").nth(1),
  ).toBeChecked();
  await practice.locator(".exam-answer-summary summary").click();
  const answered = practice.getByRole("button", {
    name: "Pregunta 1: respondida",
    exact: true,
  });
  await expect(answered.locator("svg")).toHaveCount(1);
  await expect(
    practice
      .getByRole("button", { name: "Pregunta 2: sin responder", exact: true })
      .locator("svg"),
  ).toHaveCount(0);
  await answered.click();
  await practice
    .getByRole("button", { name: "Dejar en blanco", exact: true })
    .click();
  await expect(practice.locator(".exam-answer-summary summary")).toContainText(
    "0 respondidas",
  );
  await goToExamQuestion(page, 20);
  await expect(next).toBeDisabled();
  await expect(previous).toBeInViewport();
  await expect(practice.locator("fieldset:visible")).toHaveCount(1);
  await practice
    .getByRole("button", { name: "Terminar y corregir", exact: true })
    .click();
  await expect(practice.getByRole("status")).toContainText("20 en blanco");
  await goToExamQuestion(page, 1);
  await expect(
    practice.locator("fieldset:visible .exam-correction"),
  ).toBeVisible();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
