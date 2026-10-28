import { completePrerequisites } from "./lesson-progress-fixture";
import { goToExamQuestion, startExam } from "./exam-navigation";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { lessonsFor } from "../../lib/learning";
import { examPracticeFor } from "../../lib/exam-practice";

for (const [code, title] of [
  ["021038", "Teoría del Estado Constitucional"],
  ["021044", "Introducción al Derecho Procesal"],
  ["901012", "Fundamentos Clásicos"],
]) {
  test(`${title}: last topic can be studied, heard and completed`, async ({
    page,
  }) => {
    const lessons = lessonsFor(code);
    const lesson = lessons[lessons.length - 1];
    await completePrerequisites(page, code, lesson.id);
    await page.goto("/uned/dashboard/");
    await page.getByRole("button", { name: new RegExp(`^${title}`) }).click();
    await page.getByRole("button", { name: /Hacer lecciones/ }).click();
    const course = page.getByRole("region", {
      name: "Contenido de estudio disponible",
    });
    await expect(course.locator(".path-node")).toHaveCount(1);
    await course
      .getByRole("button", {
        name: new RegExp(lesson.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      })
      .click();
    const reader = page.locator(".lesson-reader");
    await expect(
      reader.getByRole("button", { name: "Escuchar lección", exact: true }),
    ).toBeVisible();
    await expect(
      reader.getByRole("heading", { name: "Esquema para repasar" }),
    ).toBeVisible();
    for (const [index, q] of lesson.questions.entries())
      await reader
        .locator("fieldset")
        .nth(index)
        .getByRole("radio")
        .nth(q.answer)
        .check();
    await reader.getByRole("button", { name: "Comprobar prueba" }).click();
    await expect(reader.locator("form").getByRole("status")).toContainText(
      "Bloque superado",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}

test("TEC combines twenty tests with a dictated or typed development and grades only the test", async ({
  page,
}) => {
  await page.goto("/uned/dashboard/");
  await page
    .getByRole("button", { name: /^Teoría del Estado Constitucional/ })
    .click();
  await page.getByRole("button", { name: /Hacer exámenes/ }).click();
  await startExam(page);
  const practice = page.getByRole("region", { name: "Práctica de examen" });
  const groups = practice.locator("fieldset");
  await expect(groups).toHaveCount(20);
  const bank = examPracticeFor("021038").bank;
  for (let n = 0; n < 20; n++) {
    await goToExamQuestion(page, n + 1);
    const id = await groups
      .nth(n)
      .locator("input")
      .first()
      .getAttribute("name");
    const q = bank.find((q) => q.id === id)!;
    await expect(groups.nth(n).getByRole("radio")).toHaveCount(4);
    await groups
      .nth(n)
      .getByRole("radio")
      .nth(n < 13 ? q.answer : (q.answer + 1) % 4)
      .check();
  }
  await goToExamQuestion(page, 21);
  await practice
    .getByLabel("Tu respuesta de desarrollo", { exact: true })
    .fill(
      "La federación tiene un marco constitucional común y la confederación se basa en un tratado.",
    );
  await practice.getByRole("button", { name: "Terminar y corregir" }).click();
  await expect(practice.getByRole("status")).toContainText(
    "Puntuación del test: 5 / 10",
  );
  await expect(practice.getByRole("status")).toContainText(
    "No se calcula una nota global automática",
  );
  await expect(
    practice.getByLabel("Tu respuesta de desarrollo", { exact: true }),
  ).toHaveValue(/federación/);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});

test("Procesal offers two developments and a practical case, with review and a fresh attempt", async ({
  page,
}) => {
  await page.goto("/uned/dashboard/");
  await page
    .getByRole("button", { name: /^Introducción al Derecho Procesal/ })
    .click();
  await page.getByRole("button", { name: /Hacer exámenes/ }).click();
  await startExam(page);
  const practice = page.getByRole("region", { name: "Práctica de examen" });
  await expect(practice.locator("fieldset")).toHaveCount(3);
  await practice
    .getByLabel("Tu respuesta a la pregunta 1", { exact: true })
    .fill(
      "La jurisdicción ejerce la potestad y el proceso organiza la tutela.",
    );
  await goToExamQuestion(page, 2);
  await practice
    .getByLabel("Tu respuesta a la pregunta 2", { exact: true })
    .fill(
      "La imparcialidad atiende a la posición del juez frente al objeto y las partes.",
    );
  await goToExamQuestion(page, 3);
  await practice
    .getByLabel("Tu respuesta al caso práctico", { exact: true })
    .fill(
      "Hay que comprobar la oportunidad de contradicción y el efecto sobre la defensa.",
    );
  await practice.getByRole("button", { name: "Finalizar práctica" }).click();
  await expect(practice.getByRole("status")).toContainText(
    "no se asigna nota automática",
  );
  await practice
    .getByText("Pautas de revisión del caso", { exact: true })
    .click();
  await expect(practice).toContainText("indefensión relevante");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await practice.getByRole("button", { name: "Nuevo intento" }).click();
  await expect(
    practice.getByLabel("Tu respuesta al caso práctico", { exact: true }),
  ).toHaveValue("");
});
