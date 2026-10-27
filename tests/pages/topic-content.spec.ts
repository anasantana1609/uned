import { test, expect } from "@playwright/test";

test("Civil lists lessons without filters and grades a sourced representation block", async ({
  page,
}) => {
  await page.goto("/uned/asignaturas/");
  await page.getByRole("button", { name: /Derecho Civil I.1/ }).click();
  const course = page.getByRole("region", {
    name: "Contenido de estudio disponible",
  });
  await expect(course.locator(".lesson-choice")).toHaveCount(15);
  await expect(course.getByLabel("Filtrar por tema")).toHaveCount(0);
  await expect(course.getByText("Ver temario de la asignatura")).toHaveCount(0);
  await course
    .getByRole("button", { name: /Actuar en nombre propio o en nombre ajeno/ })
    .click();
  const reader = page.getByRole("region", {
    name: "Bloque: Actuar en nombre propio o en nombre ajeno",
  });
  await expect(
    reader.getByText("Práctica según el modelo de examen"),
  ).toHaveCount(0);
  await expect(
    reader.getByRole("button", { name: "Escuchar lección", exact: true }),
  ).toBeEnabled();
  await expect(reader.locator("fieldset")).toHaveCount(3);
  for (const [i, answer] of [1, 0, 2].entries()) {
    await expect(
      reader.locator("fieldset").nth(i).getByRole("radio"),
    ).toHaveCount(3);
    await reader
      .locator("fieldset")
      .nth(i)
      .getByRole("radio")
      .nth(answer)
      .check();
  }
  await reader.getByRole("button", { name: "Comprobar prueba" }).click();
  await expect(reader.locator("form").getByRole("status")).toContainText(
    "Bloque superado",
  );
  await reader.getByRole("button", { name: "Volver al recorrido" }).click();
  await expect(course).toContainText("1 de 15 lecciones completadas");
});

test("History shows a clean lesson state and its sources remain available", async ({
  page,
}) => {
  await page.goto("/uned/dashboard/");
  await page
    .getByRole("button", { name: /^Historia del Derecho Español/ })
    .click();
  await page.getByRole("button", { name: /Hacer lecciones/ }).click();
  await expect(
    page.getByRole("region", { name: "Contenido de estudio disponible" }),
  ).toBeVisible();
  await expect(page.locator(".lesson-choice")).toHaveCount(20);
  await expect(page.getByText(/Identificadas 51/)).toHaveCount(0);
  await page.goto("/uned/fuentes/");
  await expect(
    page.getByRole("region", {
      name: "Fuentes de Historia del Derecho Español",
    }),
  ).toContainText("Apuntes EC.pdf");
});
