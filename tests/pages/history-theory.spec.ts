import { goToExamQuestion } from "./exam-navigation";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { lessonsFor } from "../../lib/learning";
import { examPracticeFor } from "../../lib/exam-practice";

for (const [code, name] of [
  ["021015", "Historia del Derecho Español"],
  ["021021", "Teoría del Derecho"],
]) {
  test(`${name}: lessons are accessible, completion persists and the exam opens`, async ({
    page,
  }) => {
    const lesson = lessonsFor(code)[0];
    await page.goto("/uned/dashboard/");
    await page.getByRole("button", { name: new RegExp(`^${name}`) }).click();
    await page.getByRole("button", { name: /Hacer lecciones/ }).click();
    const list = page.getByRole("region", {
      name: "Contenido de estudio disponible",
    });
    await expect(list.locator(".lesson-choice")).toHaveCount(
      lessonsFor(code).length,
    );
    await list.getByRole("button", { name: new RegExp(lesson.title) }).click();
    const reader = page.locator(".lesson-reader");
    await expect(
      reader.getByRole("button", { name: /Escuchar lección/ }),
    ).toBeVisible();
    for (const [index, question] of lesson.questions.entries()) {
      await reader
        .locator("fieldset")
        .nth(index)
        .getByRole("radio")
        .nth(question.answer)
        .check();
    }
    await reader.getByRole("button", { name: "Comprobar prueba" }).click();
    await expect(reader.locator("form").getByRole("status")).toContainText(
      "Bloque superado",
    );
    await page.reload();
    await page.getByRole("button", { name: new RegExp(`^${name}`) }).click();
    await page.getByRole("button", { name: /Hacer lecciones/ }).click();
    await list.locator(".completed-lessons summary").click();
    await expect(
      list.getByRole("progressbar", {
        name: `Progreso de la lección: ${lesson.title}`,
        exact: true,
      }),
    ).toHaveAttribute("value", "100");
    if (code === "021015") {
      await list
        .getByRole("button", {
          name: /Liber y fueros: continuidad y diversidad/,
        })
        .click();
      const written = page.getByRole("region", { name: "Desarrollo guiado" });
      await written
        .getByLabel("Tu respuesta de desarrollo", { exact: true })
        .fill(
          "El Liber y los fueros pudieron coexistir con variaciones territoriales.",
        );
      await written
        .getByText("Ver orientación y revisar mi respuesta", { exact: true })
        .click();
      await expect(written).toContainText("No se asigna una nota automática");
    }
    await page.getByLabel("Cambiar actividad", { exact: true }).click();
    await page
      .getByLabel("Actividad de la asignatura", { exact: true })
      .selectOption("exams");
    const practice = page.getByRole("region", { name: "Práctica de examen" });
    await expect(
      practice.getByText("Todavía no hay preguntas disponibles."),
    ).toHaveCount(0);
    if (code === "021021")
      await expect(practice.locator("fieldset")).toHaveCount(20);
    else
      await expect(
        practice.getByLabel("Elegir modelo").locator("option"),
      ).toHaveCount(9);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
  });
}

test("Theory practice grades with -0.1 per error and a new attempt resets responses", async ({
  page,
}) => {
  await page.goto("/uned/dashboard/");
  await page.getByRole("button", { name: /^Teoría del Derecho/ }).click();
  await page.getByRole("button", { name: /Hacer exámenes/ }).click();
  const practice = page.getByRole("region", { name: "Práctica de examen" });
  const groups = practice.locator("fieldset");
  await expect(groups).toHaveCount(20);
  const bank = examPracticeFor("021021").bank;
  for (let i = 0; i < 2; i++) {
    await goToExamQuestion(page, i + 1);
    const id = await groups
      .nth(i)
      .locator("input")
      .first()
      .getAttribute("name");
    const rendered = bank.find((q) => q.id === id)!;
    await groups
      .nth(i)
      .getByRole("radio")
      .nth(i === 0 ? rendered.answer : (rendered.answer + 1) % 3)
      .check();
  }
  await practice.getByRole("button", { name: "Terminar y corregir" }).click();
  await expect(practice.getByRole("status")).toContainText("0,4 / 10");
  await expect(practice.locator(".exam-correction")).toHaveCount(20);
  await practice.getByRole("button", { name: "Nueva práctica" }).click();
  await expect(practice.locator("input:checked")).toHaveCount(0);
  await expect(practice.getByRole("timer")).toBeVisible();
});
