import { test, expect } from "@playwright/test";
test("tasks can be created, completed, persisted and deleted", async ({
  page,
}) => {
  await page.goto("/calendario");
  await expect(page.getByText("Preparando tu espacio…")).toHaveCount(0);
  await page.getByRole("button", { name: "Nueva tarea", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByLabel("¿Qué vas a estudiar?").fill("Repaso E2E de Derecho");
  await dialog
    .getByRole("button", { name: "Añadir tarea", exact: true })
    .click();
  await expect(dialog).toHaveCount(0);
  const task = page.getByRole("button", {
    name: "Completar: Repaso E2E de Derecho",
    exact: true,
  });
  await task.click();
  await page.reload();
  await expect(
    page.getByRole("button", {
      name: "Marcar pendiente: Repaso E2E de Derecho",
      exact: true,
    }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("button", {
      name: "Eliminar: Repaso E2E de Derecho",
      exact: true,
    })
    .click();
  await expect(
    page.getByText("Repaso E2E de Derecho", { exact: true }),
  ).toHaveCount(0);
});
test("exam dates require explicit confirmation and persist", async ({
  page,
}) => {
  await page.goto("/calendario");
  await page
    .getByRole("button", { name: "Añadir examen", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await dialog.getByLabel("Nombre del examen").fill("Examen confirmado E2E");
  await dialog
    .getByRole("combobox", { name: "Asignatura", exact: true })
    .selectOption({ label: "Teoría del Derecho" });
  await dialog
    .getByRole("button", { name: "Guardar fecha confirmada" })
    .click();
  await expect(dialog).toBeVisible();
  await dialog.getByLabel("He comprobado esta fecha").check();
  await dialog
    .getByRole("button", { name: "Guardar fecha confirmada" })
    .click();
  await expect(dialog).toHaveCount(0);
  await page.reload();
  await expect(
    page.getByRole("button", {
      name: "Eliminar examen: Examen confirmado E2E",
    }),
  ).toBeVisible();
});
test("manual study updates progress and data can be exported", async ({
  page,
}) => {
  await page.goto("/progreso");
  await page.getByRole("button", { name: "Registrar estudio" }).click();
  const dialog = page.getByRole("dialog");
  await dialog
    .getByRole("combobox", { name: "Asignatura", exact: true })
    .selectOption({ label: "Derecho Civil I.1" });
  await dialog.getByLabel("Minutos estudiados").fill("15");
  await dialog.getByRole("button", { name: "Guardar sesión" }).click();
  await expect(dialog).toHaveCount(0);
  await page.reload();
  await expect(
    page.getByRole("cell", { name: "15 minutos", exact: true }),
  ).toBeVisible();
  await page.goto("/ajustes");
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Exportar datos de estudio" }).click();
  expect((await download).suggestedFilename()).toMatch(/uned-estudio-.*\.json/);
});
test("preferences persist and make clear that notifications are inactive", async ({
  page,
}) => {
  await page.goto("/ajustes");
  await expect(
    page.getByRole("button", { name: "Guardar preferencias" }),
  ).toBeEnabled();
  await page.getByLabel("Objetivo diario (minutos)").fill("90");
  await page.getByLabel("Hora preferida").fill("10:30");
  await page.getByRole("switch", { name: /Email/ }).check();
  await page.getByRole("button", { name: "Guardar preferencias" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Preferencias guardadas",
  );
  await page.reload();
  await expect(page.getByLabel("Objetivo diario (minutos)")).toHaveValue("90");
  await expect(page.getByLabel("Hora preferida")).toHaveValue("10:30");
  await expect(page.getByText("SIN ENVÍOS ACTIVOS")).toBeVisible();
});
test("subject search and keyboard modal navigation", async ({ page }) => {
  await page.goto("/asignaturas");
  await page
    .getByRole("textbox", { name: "Buscar asignaturas" })
    .fill("Teoría del Derecho");
  const card = page.getByRole("button", {
    name: /Teoría del Derecho Fundamentos/,
  });
  await expect(card).toHaveCount(1);
  await card.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
test("demo login and document integrations are honestly labeled", async ({
  page,
}) => {
  await page.goto("/login");
  await expect(
    page.getByRole("button", { name: "Continuar con Google" }),
  ).toBeDisabled();
  await expect(
    page.getByText("El acceso personal requiere conectar Supabase.", {
      exact: false,
    }),
  ).toBeVisible();
  await page.goto("/fuentes");
  await expect(
    page.getByRole("heading", { name: "Mis fuentes" }),
  ).toBeVisible();
});
test("layout stays within the viewport and timer can pause and finish", async ({
  page,
}) => {
  await page.goto("/asignaturas");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: /Derecho Civil I.1/ }).click();
  await page
    .getByRole("button", { name: "Estudio libre (cronómetro)", exact: true })
    .click();
  await page.getByRole("button", { name: "Pausar sesión" }).click();
  await expect(page.getByText("Sesión en pausa")).toBeVisible();
  await page.getByRole("button", { name: "Reanudar sesión" }).click();
  await page.getByRole("button", { name: "Terminar", exact: true }).click();
  await expect(page.getByText("Tiempo para concentrarte")).toHaveCount(0);
});
test("confirmed deletion preserves subjects and clears study data", async ({
  page,
}) => {
  await page.goto("/ajustes");
  await page
    .getByRole("button", { name: "Borrar datos de estudio", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  const remove = dialog.getByRole("button", {
    name: "Borrar datos de estudio",
    exact: true,
  });
  await expect(remove).toBeDisabled();
  await dialog.getByLabel("Escribe BORRAR para confirmar").fill("BORRAR");
  await remove.click();
  await expect(dialog).toHaveCount(0);
  await page.goto("/dashboard");
  await expect(page.locator(".subject-home-row")).toHaveCount(11);
  await page.goto("/asignaturas");
  await expect(page.locator(".subject-card")).toHaveCount(11);
});
