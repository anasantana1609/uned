import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("dashboard has no serious accessibility violations", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(
    page.getByRole("button", { name: /^Derecho Civil I.1/ }),
  ).toBeEnabled();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
