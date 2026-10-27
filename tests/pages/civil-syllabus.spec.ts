import { test, expect } from "@playwright/test";

test("Civil lessons show progress without development receipts", async ({
  page,
}) => {
  await page.goto("/uned/dashboard/");
  await page.getByRole("button", { name: /^Derecho Civil I.1/ }).click();
  await page.getByRole("button", { name: /Hacer lecciones/ }).click();
  const course = page.getByRole("region", {
    name: "Contenido de estudio disponible",
  });
  await expect(course.locator(".path-node")).toHaveCount(15);
  await expect(
    course.getByRole("progressbar", {
      name: "Avance de lecciones completadas",
      exact: true,
    }),
  ).toHaveAttribute("max", "15");
  await expect(page.getByText(/documentos distintos descargados/)).toHaveCount(
    0,
  );
  await page.goto("/uned/fuentes/");
  await expect(
    page.getByRole("region", {
      name: "Fuentes de Derecho Civil I.1: Parte General y Persona",
    }),
  ).toContainText("Apuntes actualizados");
});
test("Procesal opens its lessons without material preparation reports", async ({
  page,
}) => {
  await page.goto("/uned/dashboard/");
  await page
    .getByRole("button", { name: /^Introducción al Derecho Procesal/ })
    .click();
  await page.getByRole("button", { name: /Hacer lecciones/ }).click();
  await expect(page.locator(".path-node")).toHaveCount(29);
  await expect(page.getByText(/fragmento de 37 páginas/)).toHaveCount(0);
});
