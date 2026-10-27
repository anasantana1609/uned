import { test, expect } from "@playwright/test";
import { lessonsFor } from "../../lib/learning";

test("lesson time starts on interaction, pauses in background and persists exact time across visits", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/uned/asignaturas/");
  const lessons = lessonsFor("021096");
  const key = `uned-lesson-time-v1:demo:${lessons[0].id}`;
  await page.getByRole("button", { name: /Derecho Civil I.1/ }).click();
  await page
    .getByRole("button", { name: /Qué estudia el Derecho civil/ })
    .click();
  const reader = page.locator(".lesson-reader");
  await page.clock.fastForward(120_000);
  expect(
    await page.evaluate((key) => localStorage.getItem(key), key),
  ).toBeNull();
  await expect(reader.locator(".lesson-study-time")).toContainText("0 min");
  await expect(reader.getByRole("timer")).toHaveCount(0);
  await reader.getByRole("heading", { name: "Comprende", exact: true }).click();
  await page.clock.fastForward(45_000);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  const beforeBackground = Number(
    await page.evaluate((key) => localStorage.getItem(key), key),
  );
  expect(beforeBackground).toBeGreaterThanOrEqual(45_000);
  expect(beforeBackground).toBeLessThan(46_000);
  await page.clock.fastForward(180_000);
  expect(
    Number(await page.evaluate((key) => localStorage.getItem(key), key)),
  ).toBe(beforeBackground);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.clock.fastForward(20_000);
  await reader.getByRole("button", { name: "Volver al recorrido" }).click();
  expect(
    Number(await page.evaluate((key) => localStorage.getItem(key), key)),
  ).toBeGreaterThanOrEqual(65_000);
  expect(
    Number(await page.evaluate((key) => localStorage.getItem(key), key)),
  ).toBeLessThan(66_000);
  await page.clock.fastForward(60_000);
  expect(
    Number(await page.evaluate((key) => localStorage.getItem(key), key)),
  ).toBeGreaterThanOrEqual(65_000);
  expect(
    Number(await page.evaluate((key) => localStorage.getItem(key), key)),
  ).toBeLessThan(66_000);
  await page
    .getByRole("button", { name: /Qué estudia el Derecho civil/ })
    .click();
  await expect(reader.locator(".lesson-study-time")).toContainText("1 min");
  await page.clock.fastForward(60_000);
  expect(
    Number(await page.evaluate((key) => localStorage.getItem(key), key)),
  ).toBeGreaterThanOrEqual(65_000);
  expect(
    Number(await page.evaluate((key) => localStorage.getItem(key), key)),
  ).toBeLessThan(66_000);
  await reader.getByRole("heading", { name: "Comprende", exact: true }).click();
  await page.clock.fastForward(55_000);
  await reader.getByRole("button", { name: "Volver al recorrido" }).click();
  expect(
    Number(await page.evaluate((key) => localStorage.getItem(key), key)),
  ).toBeGreaterThanOrEqual(120_000);
  await page.goto("/uned/asignaturas/");
  await page.getByRole("button", { name: /Fundamentos Clásicos/ }).click();
  await page.locator(".path-node").first().click();
  await expect(reader.locator(".lesson-study-time")).toContainText("0 min");
  await page.goto("/uned/asignaturas/");
  await page.getByRole("button", { name: /Derecho Civil I.1/ }).click();
  await page
    .getByRole("button", { name: /Qué estudia el Derecho civil/ })
    .click();
  await expect(reader.locator(".lesson-study-time")).toContainText("2 min");
  expect(
    await page.evaluate(() => localStorage.getItem("uned-learning-v1:demo")),
  ).toBeNull();
});
