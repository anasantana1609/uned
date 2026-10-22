import { test, expect } from "@playwright/test";

test("Civil shows the sourced syllabus and exclusions while lessons remain in preparation", async ({
  page,
}) => {
  await page.goto("/uned/asignaturas/");
  await page.getByRole("button", { name: /Derecho Civil I.1/ }).click();
  const syllabus = page.getByRole("region", {
    name: "Preparación de Civil I.1",
  });
  await expect(syllabus).toContainText(
    "las lecciones y pruebas todavía no están disponibles",
  );
  await syllabus
    .getByText("Bloque 1 · El ordenamiento jurídico", { exact: true })
    .click();
  await expect(
    syllabus.getByText(/Tema 5. Prescripción y caducidad/),
  ).toBeVisible();
  await syllabus
    .getByText("Exclusiones del examen 2026/27", { exact: true })
    .click();
  await expect(
    syllabus.getByText("Capítulo 3: epígrafes 3, 4, 8, 9, 10, 11.", {
      exact: true,
    }),
  ).toBeVisible();
  await page.goto("/uned/fuentes/");
  await expect(
    page.getByRole("region", { name: "Preparación de Civil I.1" }),
  ).toContainText("tres partes del libro pendientes");
});
