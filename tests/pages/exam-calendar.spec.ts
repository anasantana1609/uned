import { test, expect } from "@playwright/test";

test("PDF calendar allows one provisional choice per subject and retains its Canary time", async ({
  page,
  request,
}) => {
  await page.goto("/uned/calendario/");
  await expect(
    page.getByRole("heading", { name: "Tus opciones de examen" }),
  ).toBeVisible();
  const civil = page.getByRole("article", {
    name: "Derecho Civil I.1",
    exact: true,
  });
  await expect(civil.getByRole("button", { name: /1ª semana/ })).toContainText(
    "10:30 · Canarias",
  );
  const source = page.getByRole("link", { name: "Consultar el PDF original" });
  expect(await source.getAttribute("href")).toBe(
    "/uned/calendarios/examenes-febrero-2027-las-palmas.pdf#page=2",
  );
  const pdf = await request.get(
    "/uned/calendarios/examenes-febrero-2027-las-palmas.pdf",
  );
  expect(pdf.ok()).toBe(true);
  expect((await pdf.body()).subarray(0, 4).toString()).toBe("%PDF");
  await civil.getByRole("button", { name: /1ª semana/ }).click();
  const modal = page.getByRole("dialog");
  const save = modal.getByRole("button", {
    name: "Guardar mi elección provisional",
  });
  await expect(save).toBeDisabled();
  await modal.getByRole("checkbox").check();
  await save.click();
  await expect(modal).toHaveCount(0);
  await expect(
    civil.getByRole("button", { name: /1ª semana/ }),
  ).toHaveAttribute("aria-pressed", "true");
  await civil.getByRole("button", { name: /2ª semana/ }).click();
  await modal.getByRole("checkbox").check();
  await save.click();
  await expect(modal).toHaveCount(0);
  await page.reload();
  await expect(
    civil.getByRole("button", { name: /2ª semana/ }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    civil.getByRole("button", { name: /1ª semana/ }),
  ).toHaveAttribute("aria-pressed", "false");
  const exams = await page.evaluate(
    () => JSON.parse(localStorage.getItem("uned-study-demo-v1")!).exams,
  );
  expect(exams).toHaveLength(1);
  expect(exams[0].date).toBe("2027-02-08");
  expect(exams[0].title).toContain("17:30 Canarias · BORRADOR");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await civil.getByRole("button", { name: "Quitar elección" }).click();
  await expect(
    civil.getByRole("button", { name: /2ª semana/ }),
  ).toHaveAttribute("aria-pressed", "false");
});
