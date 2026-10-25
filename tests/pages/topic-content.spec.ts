import { test, expect } from "@playwright/test";

test("Civil filters the new topics and grades a sourced representation block", async ({
  page,
}) => {
  await page.goto("/uned/asignaturas/");
  await page.getByRole("button", { name: /Derecho Civil I.1/ }).click();
  const course = page.getByRole("region", {
    name: "Contenido de estudio disponible",
  });
  await expect(course.locator(".lesson-choice")).toHaveCount(15);
  await course.getByLabel("Filtrar por tema").selectOption("Tema 14");
  await expect(course.locator(".lesson-choice")).toHaveCount(1);
  await course
    .getByRole("button", { name: /Actuar en nombre propio o en nombre ajeno/ })
    .click();
  const reader = page.getByRole("region", {
    name: "Bloque: Actuar en nombre propio o en nombre ajeno",
  });
  await expect(reader).toContainText("no son una plantilla oficial");
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
  await expect(course).toContainText("1 de 15 bloques superados");
});

test("History shows the supplied development format without inventing graded lessons", async ({
  page,
}) => {
  await page.goto("/uned/asignaturas/");
  await page
    .getByRole("button", { name: /Historia del Derecho Español/ })
    .click();
  const preparation = page.getByRole("region", {
    name: "Preparación de Historia del Derecho",
  });
  await expect(preparation).toContainText("17 modelos aportados");
  await expect(preparation).toContainText(
    "dos preguntas teóricas a elegir entre tres",
  );
  await expect(preparation).toContainText("comentario de texto obligatorio");
  await expect(preparation).toContainText("Pendientes el programa vigente");
  await expect(
    page.getByRole("region", { name: "Contenido de estudio disponible" }),
  ).toHaveCount(0);
  await preparation
    .getByText("Modelos recibidos y referencias", { exact: true })
    .click();
  await expect(
    preparation.getByText("E660210150-26SO.pdf · página PDF 1", {
      exact: true,
    }),
  ).toBeVisible();
  await page.goto("/uned/fuentes/");
  await expect(
    page.getByRole("region", { name: "Preparación de Historia del Derecho" }),
  ).toContainText("17 modelos aportados");
});
