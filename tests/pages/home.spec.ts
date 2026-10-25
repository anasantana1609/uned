import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { examPracticeFor } from "../../lib/exam-practice";

test("home is a full-width list of eleven uniquely coloured subjects with five locks", async ({
  page,
}) => {
  await page.goto("/uned/dashboard/");
  const list = page.getByRole("region", { name: "Asignaturas del curso" });
  await expect(list.locator("article")).toHaveCount(11);
  await expect(list.locator("button:disabled")).toHaveCount(5);
  await expect(
    page.getByRole("button", { name: "Nueva tarea", exact: true }),
  ).toHaveCount(0);
  expect(
    await list
      .locator("article")
      .evaluateAll(
        (rows) =>
          new Set(rows.map((r) => getComputedStyle(r).backgroundColor)).size,
      ),
  ).toBe(11);
  await list.getByRole("button", { name: /^Derecho Civil I.1/ }).click();
  const options = page.getByRole("region", {
    name: "Opciones de Derecho Civil I.1: Parte General y Persona",
  });
  await expect(options.getByRole("button")).toHaveCount(2);
  await options.getByRole("button", { name: /Hacer lecciones/ }).click();
  await expect(
    page.getByRole("region", { name: "Contenido de estudio disponible" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Volver a mis asignaturas" }).click();
  await expect(
    list.getByRole("button", { name: /^Derecho Civil I.1/ }),
  ).toBeFocused();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const violations = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(violations.violations).toEqual([]);
});

test("Civil exam practice scores an attempt with blanks, explains corrections and keeps lesson progress separate", async ({
  page,
}) => {
  await page.goto("/uned/dashboard/");
  await page.getByRole("button", { name: /^Derecho Civil I.1/ }).click();
  await page.getByRole("button", { name: /Hacer exámenes/ }).click();
  const practice = page.getByRole("region", { name: "Práctica de examen" });
  const groups = practice.locator("fieldset");
  await expect(groups).toHaveCount(20);
  const bank = examPracticeFor("021096").bank;
  for (let i = 0; i < 2; i++) {
    const questionId = await groups
      .nth(i)
      .locator("input")
      .first()
      .getAttribute("name");
    const question = bank.find((q) => q.id === questionId)!;
    await groups
      .nth(i)
      .getByRole("radio")
      .nth(i === 0 ? question.answer : (question.answer + 1) % 3)
      .check();
  }
  await practice.getByRole("button", { name: "Terminar y corregir" }).click();
  await expect(practice.getByRole("status")).toContainText(
    "1 aciertos · 1 errores · 18 en blanco",
  );
  await expect(practice.getByRole("status")).toContainText("0,25 / 10");
  await expect(practice.locator(".exam-correction")).toHaveCount(20);
  expect(
    await page.evaluate(() => localStorage.getItem("uned-learning-v1:demo")),
  ).toBeNull();
  await practice.getByRole("button", { name: "Nueva práctica" }).click();
  await expect(practice.getByRole("status")).toHaveCount(0);
  await expect(practice.locator("input:checked")).toHaveCount(0);
});

test("Civil practice ends at the time limit and History offers written questions", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/uned/dashboard/");
  await page.getByRole("button", { name: /^Derecho Civil I.1/ }).click();
  await page.getByRole("button", { name: /Hacer exámenes/ }).click();
  await expect(page.locator(".exam-practice fieldset")).toHaveCount(20);
  await page.clock.fastForward(60 * 60_000);
  await expect(
    page
      .getByRole("region", { name: "Práctica de examen" })
      .getByRole("status"),
  ).toContainText("20 en blanco");
  await page.getByRole("button", { name: "Volver a mis asignaturas" }).click();
  await page
    .getByRole("button", { name: /^Historia del Derecho Español/ })
    .click();
  await page.getByRole("button", { name: /Hacer exámenes/ }).click();
  await expect(
    page.getByRole("region", { name: "Práctica de examen" }),
  ).toContainText("Comentario de texto");
  await expect(
    page.getByRole("textbox", { name: "Tu comentario" }),
  ).toBeVisible();
});

test("History shows written questions directly and accepts two developments plus a commentary without inventing a grade", async ({
  page,
}) => {
  await page.goto("/uned/dashboard/");
  await page
    .getByRole("button", { name: /^Historia del Derecho Español/ })
    .click();
  await page.getByRole("button", { name: /Hacer exámenes/ }).click();
  const practice = page.getByRole("region", { name: "Práctica de examen" });
  await expect(practice.getByRole("group")).toHaveCount(4);
  await expect(
    practice.getByRole("button", { name: "Finalizar práctica" }),
  ).toBeDisabled();
  await practice.getByRole("checkbox").nth(0).check();
  await practice.getByRole("checkbox").nth(1).check();
  await expect(practice.getByRole("checkbox").nth(2)).toBeDisabled();
  await practice
    .getByLabel("Tu respuesta a la pregunta 1")
    .fill("Respuesta personal a la primera pregunta.");
  await practice
    .getByLabel("Tu respuesta a la pregunta 2")
    .fill("Respuesta personal a la segunda pregunta.");
  await practice
    .getByLabel("Tu comentario", { exact: true })
    .fill("Comentario personal del fragmento adaptado.");
  await practice.getByRole("button", { name: "Finalizar práctica" }).click();
  await expect(practice.getByRole("status")).toContainText(
    "Práctica finalizada",
  );
  await expect(practice.getByText(/Puntuación/)).toHaveCount(0);
  expect(
    await page.evaluate(() => localStorage.getItem("uned-learning-v1:demo")),
  ).toBeNull();
  await practice.getByLabel("Elegir modelo").selectOption("1");
  await expect(
    practice.getByLabel("Tu comentario", { exact: true }),
  ).toHaveValue("");
});
