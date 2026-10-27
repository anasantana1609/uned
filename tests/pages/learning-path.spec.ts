import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { lessonsFor } from "../../lib/learning";

async function openPath(page: import("@playwright/test").Page) {
  await page.goto("/uned/asignaturas/");
  await page.getByRole("button", { name: /Derecho Civil I.1/ }).click();
  return page.getByRole("list", { name: "Recorrido de lecciones" });
}

test("journey unlocks the next lesson only after a pass and preserves progress on reload", async ({
  page,
}) => {
  const lessons = lessonsFor("021096");
  let path = await openPath(page);
  await expect(path.getByRole("button").nth(0)).toBeEnabled();
  await expect(path.getByRole("button").nth(1)).toBeDisabled();
  await path.getByRole("button").nth(0).click();
  const reader = page.locator(".lesson-reader");
  await reader.getByRole("button", { name: "Volver al recorrido" }).click();
  await expect(
    page.getByRole("tablist", { name: "Vista de las lecciones" }),
  ).toHaveCount(0);
  await expect(
    page.getByText("Tu próxima lección", { exact: true }),
  ).toHaveCount(0);
  await expect(path.getByRole("button").nth(1)).toBeDisabled();
  await path.getByRole("button").nth(0).click();
  for (const [i, question] of lessons[0].questions.entries()) {
    await reader
      .locator("fieldset")
      .nth(i)
      .getByRole("radio")
      .nth(question.answer)
      .check();
  }
  await reader.getByRole("button", { name: "Comprobar prueba" }).click();
  await expect(reader.getByRole("status").last()).toContainText(
    "Bloque superado",
  );
  await reader.getByRole("button", { name: "Volver al recorrido" }).click();
  await expect(path.getByRole("button").first()).toHaveAccessibleName(
    new RegExp(lessons[1].title),
  );
  await expect(path.getByRole("button").first()).toBeEnabled();
  await expect(path.getByRole("button").nth(1)).toBeDisabled();
  const archive = page.locator(".completed-lessons");
  await expect(archive).not.toHaveAttribute("open", "");
  await expect(
    archive.getByRole("button", { includeHidden: true }),
  ).toHaveCount(1);
  await archive.locator("summary").click();
  await expect(archive.getByRole("button")).toHaveAccessibleName(/Completada/);
  await archive.getByRole("button").click();
  await reader.getByRole("button", { name: "Volver al recorrido" }).click();
  await expect(archive).not.toHaveAttribute("open", "");
  path = await openPath(page);
  await expect(path.getByRole("button").first()).toHaveAttribute(
    "aria-current",
    "step",
  );
  await expect(path.getByRole("button").first()).toBeInViewport();
  await expect(
    path.getByRole("heading", { name: "Tema 1", exact: true }),
  ).toHaveCount(0);
  await expect(path.getByRole("heading").first()).toHaveText("Tema 2");
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("journey preserves previously completed later lessons and celebrates completion", async ({
  page,
}) => {
  const lessons = lessonsFor("021096");
  await page.goto("/uned/asignaturas/");
  await page.evaluate(
    (id) =>
      localStorage.setItem(
        "uned-learning-v1:demo",
        JSON.stringify({ [id]: new Date().toISOString() }),
      ),
    lessons[2].id,
  );
  let path = await openPath(page);
  await expect(path.getByRole("button").nth(0)).toBeEnabled();
  await expect(path.getByRole("button").nth(1)).toBeDisabled();
  await expect(path.getByRole("button")).toHaveCount(lessons.length - 1);
  await expect(page.locator(".completed-lessons")).not.toHaveAttribute(
    "open",
    "",
  );
  await page.evaluate(
    (ids) =>
      localStorage.setItem(
        "uned-learning-v1:demo",
        JSON.stringify(
          Object.fromEntries(ids.map((id) => [id, new Date().toISOString()])),
        ),
      ),
    lessons.map((lesson) => lesson.id),
  );
  path = await openPath(page);
  await expect(page.getByRole("status")).toBeVisible();
  await expect(path.locator("button:disabled")).toHaveCount(0);
  await expect(path.getByRole("button")).toHaveCount(0);
  await expect(page.locator(".lesson-choice:visible")).toHaveCount(0);
  await page.locator(".completed-lessons summary").click();
  await expect(page.locator(".lesson-choice:visible")).toHaveCount(
    lessons.length,
  );
});

test("Theory opens directly at topic two when topic one was already completed", async ({
  page,
}) => {
  const lessons = lessonsFor("021021");
  await page.goto("/uned/dashboard/");
  await page.evaluate(
    (id) =>
      localStorage.setItem(
        "uned-learning-v1:demo",
        JSON.stringify({ [id]: new Date().toISOString() }),
      ),
    lessons[0].id,
  );
  await page.reload();
  await page.getByRole("button", { name: /^Teoría del Derecho/ }).click();
  await page.getByRole("button", { name: /Hacer lecciones/ }).click();
  const path = page.getByRole("list", { name: "Recorrido de lecciones" });
  await expect(path.getByRole("heading").first()).toHaveText("Tema 2");
  await expect(
    path.getByRole("heading", { name: "Tema 1", exact: true }),
  ).toHaveCount(0);
  await expect(path.getByRole("button").first()).toBeEnabled();
  await expect(path.getByRole("button").first()).toBeInViewport();
  await expect(page.locator(".lesson-total-progress")).toHaveText("7% (1/14)");
  await expect(page.locator(".learning-view-tabs, .path-banner")).toHaveCount(
    0,
  );
  await expect(page.locator(".completed-lessons")).not.toHaveAttribute(
    "open",
    "",
  );
});
