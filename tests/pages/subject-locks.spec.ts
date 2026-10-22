import { test, expect } from "@playwright/test";
import { demoData } from "../../lib/model";

test("legacy catalogue gains two subjects without losing activity and shows the five locked subjects", async ({
  page,
}) => {
  const previous = demoData();
  previous.subjects = previous.subjects.slice(0, 9);
  previous.tasks[0].done = true;
  await page.addInitScript((data) => {
    if (!localStorage.getItem("uned-study-demo-v1"))
      localStorage.setItem("uned-study-demo-v1", JSON.stringify(data));
  }, previous);
  await page.goto("/uned/asignaturas/");
  await expect(page.locator(".subject-card")).toHaveCount(11);
  await expect(page.locator(".subject-card-locked")).toHaveCount(5);
  await page
    .getByRole("textbox", { name: "Buscar asignaturas" })
    .fill("021067");
  const roman = page.getByRole("button", { name: /Derecho Romano/ });
  await expect(roman).toHaveCount(1);
  await roman.click();
  await expect(
    page
      .getByRole("dialog")
      .getByRole("button", { name: "Contenido bloqueado", exact: true }),
  ).toBeDisabled();
  await expect(
    page
      .getByRole("dialog")
      .getByRole("button", { name: "Añadir tarea", exact: true }),
  ).toBeEnabled();
  await page.keyboard.press("Escape");
  await page.reload();
  const saved = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("uned-study-demo-v1")!),
  );
  expect(saved.subjects).toHaveLength(11);
  expect(saved.tasks[0]).toEqual(previous.tasks[0]);
  expect(saved.sessions).toEqual(previous.sessions);
  await page.goto("/uned/dashboard/");
  await page
    .getByRole("button", { name: "Empezar a estudiar", exact: true })
    .click();
  await expect(
    page.getByRole("dialog", { name: "Elige tu asignatura" }),
  ).toBeVisible();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: /Derecho Civil I.1/ })
    .click();
  await expect(
    page
      .getByRole("dialog")
      .getByRole("button", { name: "Estudio libre (cronómetro)", exact: true }),
  ).toBeEnabled();
  await expect(
    page
      .getByRole("dialog")
      .getByText(
        "Contenido inicial disponible. Aprende y supera las pruebas de cada bloque; el resto del programa sigue en preparación.",
        { exact: true },
      ),
  ).toBeVisible();
});
