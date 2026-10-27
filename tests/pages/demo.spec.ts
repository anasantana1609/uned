import { test, expect } from "@playwright/test";

test("exported demo loads its scripts and supports task persistence under /uned", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const broken: string[] = [];
  page.on("response", (r) => {
    if (r.status() >= 400) broken.push(r.url());
  });
  await page.goto("/uned/calendario/");
  await expect(
    page.getByRole("button", { name: "Nueva tarea", exact: true }),
  ).toBeEnabled();
  await page.getByRole("button", { name: "Nueva tarea", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await dialog
    .getByLabel("¿Qué vas a estudiar?")
    .fill("Tarea de demo publicada");
  await dialog
    .getByRole("button", { name: "Añadir tarea", exact: true })
    .click();
  await expect(dialog).toHaveCount(0);
  await page.reload();
  await expect(
    page.getByRole("button", {
      name: "Completar: Tarea de demo publicada",
      exact: true,
    }),
  ).toBeVisible();
  expect(errors).toEqual([]);
  expect(broken).toEqual([]);
});
test("all exported deep links load directly and navigation retains the Pages prefix", async ({
  page,
}) => {
  for (const route of [
    "dashboard",
    "asignaturas",
    "calendario",
    "progreso",
    "fuentes",
    "ajustes",
    "login",
  ]) {
    const response = await page.goto(`/uned/${route}/`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.goto("/uned/dashboard/");
  await expect(
    page.getByRole("button", { name: /^Derecho Civil I.1/ }),
  ).toBeEnabled();
  await page.getByRole("link", { name: "Asignaturas", exact: true }).click();
  await expect(page).toHaveURL(/\/uned\/asignaturas\/?$/);
  await expect(
    page.getByRole("textbox", { name: "Buscar asignaturas" }),
  ).toBeVisible();
});
test("static build remains demo-only without external service requests", async ({
  page,
}) => {
  const external: string[] = [];
  page.on("request", (r) => {
    if (new URL(r.url()).origin !== "http://127.0.0.1:4173")
      external.push(r.url());
  });
  await page.goto("/uned/login/");
  await expect(
    page.getByRole("button", { name: "Continuar con Google" }),
  ).toBeDisabled();
  await expect(
    page.getByRole("button", { name: "Entrar en mi espacio" }),
  ).toBeDisabled();
  await page.getByRole("link", { name: "Explorar la demo" }).click();
  await expect(page).toHaveURL(/\/uned\/dashboard\/?$/);
  await expect(
    page.getByRole("button", { name: /^Derecho Civil I.1/ }),
  ).toBeEnabled();
  expect(external).toEqual([]);
});
test("static artifact hydrates on a future date without retaining build-day sample data", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.clock.install({ time: new Date("2030-01-02T12:00:00Z") });
  await page.goto("/uned/calendario/");
  await expect(
    page.getByRole("button", {
      name: "Completar: Repasar la persona y la personalidad",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "2 de enero", exact: true }),
  ).toHaveText("2 de enero");
  expect(errors).toEqual([]);
});
