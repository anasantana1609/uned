import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("choosing an activity opens a compact subject workspace and restores home on exit", async ({
  page,
}) => {
  await page.goto("/uned/dashboard/");
  await page.getByRole("button", { name: /^Teoría del Derecho/ }).click();
  await page.getByRole("button", { name: /Hacer exámenes/ }).click();
  const workspace = page.locator(".subject-workspace");
  await expect(workspace.getByRole("heading", { level: 1 })).toHaveText(
    "Teoría del Derecho",
  );
  await expect(page.locator(".topbar")).toBeHidden();
  await expect(page.locator(".sidebar")).toBeHidden();
  await expect(page.locator(".app-footer")).toBeHidden();
  await expect(
    page.getByRole("button", { name: "Hacer lecciones", exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Hacer exámenes", exact: true }),
  ).toHaveCount(0);
  await expect(
    workspace.getByRole("button", { name: "Pregunta siguiente", exact: true }),
  ).toBeInViewport();
  const headerHeight = await page
    .locator(".subject-study-header")
    .evaluate((element) => element.getBoundingClientRect().height);
  expect(headerHeight).toBeLessThan(100);
  await page.getByLabel("Cambiar actividad", { exact: true }).click();
  await page
    .getByLabel("Actividad de la asignatura", { exact: true })
    .selectOption("lessons");
  await expect(
    workspace.getByRole("region", { name: "Contenido de estudio disponible" }),
  ).toBeVisible();
  await expect(page.locator(".study-activity-menu")).not.toHaveAttribute(
    "open",
    "",
  );
  await expect(page.locator(".topbar")).toBeHidden();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.getByRole("button", { name: "Volver a mis asignaturas" }).click();
  await expect(page.locator(".topbar")).toBeVisible();
  await expect(
    page.getByRole("button", { name: /^Teoría del Derecho/ }),
  ).toBeFocused();
});
