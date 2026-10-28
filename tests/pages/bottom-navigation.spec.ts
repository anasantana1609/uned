import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("four bottom destinations remain visible and lessons and exams open the chosen subject", async ({
  page,
}) => {
  await page.goto("/uned/dashboard/");
  const navigation = page.getByRole("navigation", {
    name: "Navegación principal",
    exact: true,
  });
  await expect(navigation.getByRole("link")).toHaveCount(4);
  for (const name of ["Asignaturas", "Lecciones", "Examen", "Perfil"])
    await expect(
      navigation.getByRole("link", { name, exact: true }),
    ).toBeInViewport();
  await expect(
    navigation.getByRole("link", { name: "Panel", exact: true }),
  ).toHaveCount(0);
  await expect(
    navigation.getByRole("link", { name: "Asignaturas", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await expect(page.locator(".sidebar")).toHaveCount(0);
  await navigation
    .getByRole("link", { name: "Lecciones", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Elige una asignatura", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: /^Teoría del Derecho/ }).click();
  await expect(page.locator(".subject-workspace h1")).toHaveText(
    "Teoría del Derecho",
  );
  await expect(
    page.getByRole("region", { name: "Contenido de estudio disponible" }),
  ).toBeVisible();
  await expect(
    navigation.getByRole("link", { name: "Lecciones", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await navigation.getByRole("link", { name: "Examen", exact: true }).click();
  await expect(page.locator(".subject-workspace h1")).toHaveText(
    "Teoría del Derecho",
  );
  await expect(page.locator(".exam-practice fieldset:visible")).toHaveCount(1);
  await expect(
    navigation.getByRole("link", { name: "Examen", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  const next = page.getByRole("button", {
    name: "Pregunta siguiente",
    exact: true,
  });
  await expect(next).toBeInViewport();
  const nextBox = await next.boundingBox();
  const navBox = await navigation.boundingBox();
  expect(nextBox!.y + nextBox!.height).toBeLessThanOrEqual(navBox!.y);
  await navigation.getByRole("link", { name: "Perfil", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Mi perfil");
  await expect(
    page
      .getByRole("navigation", { name: "Organizar mi estudio" })
      .getByRole("link"),
  ).toHaveCount(3);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page
    .getByRole("link", { name: "UNED Study AI · Panel", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Mis asignaturas", exact: true }),
  ).toBeVisible();
  await navigation
    .getByRole("link", { name: "Asignaturas", exact: true })
    .click();
  await expect(
    page.getByRole("textbox", { name: "Buscar asignaturas" }),
  ).toBeVisible();
});
