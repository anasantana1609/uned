import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("lesson presents interactive idea cards and questions stay inside their cards on a narrow screen", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/uned/dashboard/");
  await page
    .getByRole("button", { name: /^Historia del Derecho Español/ })
    .click();
  await page.getByRole("button", { name: /Hacer lecciones/ }).click();
  await page.locator(".path-node").first().click();
  const reader = page.locator(".lesson-reader");
  await expect(reader.getByText("Al terminar:", { exact: true })).toHaveCount(
    0,
  );
  await expect(reader.locator(".lesson-audio-icon")).toHaveCount(1);
  await expect(reader.locator(".lesson-audio-icon")).toHaveText("");
  const ideas = reader.locator(".lesson-idea-card");
  expect(await ideas.count()).toBeGreaterThan(1);
  await expect(ideas.first()).toHaveAttribute("open", "");
  await expect(ideas.nth(1)).not.toHaveAttribute("open", "");
  await ideas.nth(1).locator("summary").click();
  await expect(ideas.nth(1)).toHaveAttribute("open", "");
  await expect(
    reader.getByRole("heading", { name: "Un ejemplo", exact: true }),
  ).toBeVisible();
  await expect(
    reader.getByRole("heading", { name: "Practica sin mirar", exact: true }),
  ).toBeVisible();
  const fits = await reader.locator(".lesson-question").evaluateAll((cards) =>
    cards.every((card) => {
      const outer = card.getBoundingClientRect();
      return Array.from(
        card.querySelectorAll("legend, label, label > span"),
      ).every((item) => {
        const rect = item.getBoundingClientRect();
        return (
          rect.left >= outer.left &&
          rect.right <= outer.right + 1 &&
          rect.top >= outer.top &&
          rect.bottom <= outer.bottom + 1
        );
      });
    }),
  );
  expect(fits).toBe(true);
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
