import { test, expect } from "@playwright/test";
import { lessonsFor } from "../../lib/learning";
import AxeBuilder from "@axe-core/playwright";

test("guided block grades answers, persists only a pass, and countdown cannot complete it", async ({
  page,
}) => {
  await page.goto("/uned/asignaturas/");
  await page.getByRole("button", { name: /Derecho Civil I.1/ }).click();
  const course = page.getByRole("region", {
    name: "Contenido de estudio disponible",
  });
  await expect(course).toContainText("0% de lecciones completadas");
  await course
    .getByRole("button", { name: /Qué estudia el Derecho civil/ })
    .click();
  const reader = page.getByRole("region", {
    name: "Bloque: Qué estudia el Derecho civil",
  });
  await expect(
    reader.getByRole("button", { name: "Comprobar prueba" }),
  ).toBeDisabled();
  await page.clock.install();
  await reader.getByRole("button", { name: "Iniciar concentración" }).click();
  await page.clock.fastForward(300_000);
  await expect(
    reader.getByLabel("Tiempo de concentración restante"),
  ).toHaveText("00:00");
  expect(
    await page.evaluate(() => localStorage.getItem("uned-learning-v1:demo")),
  ).toBeNull();
  const groups = reader.locator("fieldset");
  await groups.nth(0).getByRole("radio").nth(0).check();
  await groups.nth(1).getByRole("radio").nth(0).check();
  await groups.nth(2).getByRole("radio").nth(0).check();
  await reader.getByRole("button", { name: "Comprobar prueba" }).click();
  await expect(reader.getByRole("status").last()).toContainText(
    "vuelve a intentarlo",
  );
  expect(
    await page.evaluate(() => localStorage.getItem("uned-learning-v1:demo")),
  ).toBeNull();
  await groups.nth(0).getByRole("radio").nth(1).check();
  await groups.nth(1).getByRole("radio").nth(2).check();
  await reader.getByRole("button", { name: "Comprobar prueba" }).click();
  await expect(reader.getByRole("status").last()).toContainText(
    "Bloque superado",
  );
  await page.reload();
  await page.getByRole("button", { name: /Derecho Civil I.1/ }).click();
  await expect(course).toContainText(
    `${Math.round(100 / lessonsFor("021096").length)}% de lecciones completadas`,
  );
  await expect(course).toContainText(
    `1 de ${lessonsFor("021096").length} lecciones completadas`,
  );
  await expect(
    course.getByRole("progressbar", {
      name: "Progreso de la lección: Qué estudia el Derecho civil",
      exact: true,
    }),
  ).toHaveAttribute("value", "100");
});

test("home opens lessons and each prepared subject exposes its sources", async ({
  page,
}) => {
  await page.goto("/uned/dashboard/");
  await page.getByRole("button", { name: /^Derecho Civil I.1/ }).click();
  await page.getByRole("button", { name: /Hacer lecciones/ }).click();
  await expect(
    page.getByRole("region", { name: "Contenido de estudio disponible" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await page.goto("/uned/asignaturas/");
  for (const title of [
    /Introducción al Derecho Procesal/,
    /Fundamentos Clásicos/i,
  ]) {
    await page.getByRole("button", { name: title }).click();
    const course = page.getByRole("region", {
      name: "Contenido de estudio disponible",
    });
    await course.locator(".lesson-choice").first().click();
    const reader = page.locator(".lesson-reader");
    await reader.getByText("Fuentes de este bloque", { exact: true }).click();
    expect(await reader.locator("details li").count()).toBeGreaterThan(0);
    await expect(reader.locator("fieldset")).toHaveCount(3);
    await page.keyboard.press("Escape");
  }
});

test("a correct quiz does not claim saved progress when browser storage fails", async ({
  page,
}) => {
  await page.goto("/uned/asignaturas/");
  await page.getByRole("button", { name: /Derecho Civil I.1/ }).click();
  await page
    .getByRole("button", { name: /Qué estudia el Derecho civil/ })
    .click();
  const reader = page.locator(".lesson-reader");
  for (const [i, answer] of [1, 2, 0].entries())
    await reader
      .locator("fieldset")
      .nth(i)
      .getByRole("radio")
      .nth(answer)
      .check();
  await page.evaluate(() => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key.startsWith("uned-learning-"))
        throw new DOMException("blocked", "QuotaExceededError");
      return original.call(this, key, value);
    };
  });
  await reader.getByRole("button", { name: "Comprobar prueba" }).click();
  await expect(reader.locator("form").getByRole("status")).toContainText(
    "No se pudo guardar el avance",
  );
  expect(
    await page.evaluate(() => localStorage.getItem("uned-learning-v1:demo")),
  ).toBeNull();
});

test("guided reader has accessible controls and fits the viewport", async ({
  page,
}, testInfo) => {
  await page.goto("/uned/asignaturas/");
  await page.getByRole("button", { name: /Derecho Civil I.1/ }).click();
  await page
    .getByRole("button", { name: /Qué estudia el Derecho civil/ })
    .click();
  const reader = page.locator(".lesson-reader");
  await expect(reader).toBeVisible();
  await expect(
    reader.getByRole("button", { name: "Volver al recorrido" }),
  ).toBeInViewport();
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("reader.png") });
});
