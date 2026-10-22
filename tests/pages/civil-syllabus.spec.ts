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
    "Ya puedes estudiar tres bloques iniciales",
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
  ).toContainText("Las partes 2 y 3 también se han descargado");
});

test("Procesal exposes the programme and source limitations", async ({
  page,
}) => {
  await page.goto("/uned/asignaturas/");
  await page
    .getByRole("button", { name: /Introducción al Derecho Procesal/ })
    .click();
  const syllabus = page.getByRole("region", {
    name: "Preparación de Introducción al Derecho Procesal",
  });
  await expect(syllabus).toContainText("28 lecciones en cinco partes");
  await expect(syllabus).toContainText("fragmento de 37 páginas");
  await syllabus
    .getByText("Parte 5 · Derecho paraprocesal", { exact: true })
    .click();
  await expect(syllabus.getByText(/Lección 28\./)).toBeVisible();
  await expect(
    syllabus.getByText("Lecciones y prueba de este tema en preparación").last(),
  ).toBeVisible();
});
