import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {
  examStorageKey,
  newExamAttempt,
  examModelsFor,
  type ExamAttempt,
} from "../../lib/exam-attempts";
import { goToExamQuestion, startExam } from "./exam-navigation";

async function openExams(
  page: import("@playwright/test").Page,
  title = "Teoría del Derecho",
) {
  await page.goto("/uned/dashboard/");
  await page.getByRole("button", { name: new RegExp(`^${title}`) }).click();
  await page.getByRole("button", { name: /Hacer exámenes/ }).click();
}
async function saved(
  page: import("@playwright/test").Page,
): Promise<ExamAttempt[]> {
  return page.evaluate(
    (key) => JSON.parse(localStorage.getItem(key) ?? "[]"),
    examStorageKey("demo"),
  );
}

test("tests resume the same questions and position after reload, pause time while away and retain completed attempts", async ({
  page,
}) => {
  await page.clock.install();
  await openExams(page);
  const catalog = page.getByRole("region", {
    name: "Mis exámenes",
    exact: true,
  });
  await expect(
    catalog.getByRole("button", { name: /^Pendientes/ }),
  ).toContainText("(3)");
  await startExam(page);
  const fields = page.locator(".exam-practice fieldset");
  const ids = await fields.evaluateAll((items) =>
    items.map((item) => item.querySelector("input")?.getAttribute("name")),
  );
  await fields.nth(0).getByRole("radio").nth(1).check();
  await page
    .getByRole("button", { name: "Pregunta siguiente", exact: true })
    .click();
  await fields.nth(1).getByRole("radio").nth(2).check();
  await page
    .getByRole("button", { name: "Pregunta siguiente", exact: true })
    .click();
  await page.clock.fastForward(60_000);
  await page
    .getByRole("button", { name: "Volver a mis exámenes", exact: true })
    .click();
  await expect(
    catalog.getByRole("button", { name: /^En curso/ }),
  ).toContainText("(1)");
  const before = (await saved(page))[0];
  expect(before.page).toBe(2);
  expect(before.remainingMs!).toBeLessThanOrEqual(59 * 60_000);
  expect(before.remainingMs!).toBeGreaterThan(58 * 60_000);
  await page.clock.fastForward(86_400_000);
  await openExams(page);
  await catalog.getByRole("button", { name: /^Continuar:/ }).click();
  await expect(page.locator(".exam-page-heading > strong")).toHaveText(
    "Pregunta 3 de 20",
  );
  await expect(page.locator(".exam-answer-summary summary")).toHaveText("2/20");
  expect(
    await fields.evaluateAll((items) =>
      items.map((item) => item.querySelector("input")?.getAttribute("name")),
    ),
  ).toEqual(ids);
  await expect(fields.nth(0).locator("input").nth(1)).toBeChecked();
  await expect(fields.nth(1).locator("input").nth(2)).toBeChecked();
  expect((await saved(page))[0].remainingMs).toBe(before.remainingMs);
  await page
    .getByRole("button", { name: "Terminar y corregir", exact: true })
    .click();
  await expect(page.locator(".exam-result")).toContainText("18 en blanco");
  await page
    .getByRole("button", { name: "Volver a mis exámenes", exact: true })
    .click();
  await expect(
    catalog.getByRole("button", { name: /^Realizados/ }),
  ).toContainText("(1)");
  await catalog.getByRole("button", { name: /^Revisar:/ }).click();
  await expect(fields.nth(2).getByRole("radio").first()).toBeDisabled();
  await page
    .getByRole("button", { name: "Nueva práctica", exact: true })
    .click();
  await expect(page.locator(".exam-answer-summary summary")).toHaveText("0/20");
  const all = await saved(page);
  expect(all).toHaveLength(2);
  expect(all.find((item) => item.id === before.id)?.status).toBe("completed");
  expect(all.find((item) => item.id === before.id)?.data).toEqual(before.data);
  expect(all.filter((item) => item.status === "in-progress")).toHaveLength(1);
});

for (const [subject, lastPage, firstLabel, lastLabel] of [
  [
    "Historia del Derecho Español",
    4,
    "Tu respuesta a la pregunta 1",
    "Tu comentario",
  ],
  [
    "Introducción al Derecho Procesal",
    3,
    "Tu respuesta a la pregunta 1",
    "Tu respuesta al caso práctico",
  ],
] as const) {
  test(`${subject} retains written answers and the last page when returning`, async ({
    page,
  }) => {
    await openExams(page, subject);
    await startExam(page);
    if (lastPage === 4) await page.getByRole("checkbox").first().check();
    await page
      .getByLabel(firstLabel, { exact: true })
      .fill("Primera respuesta escrita y revisada.");
    await goToExamQuestion(page, lastPage);
    await page
      .getByLabel(lastLabel, { exact: true })
      .fill("Comentario o caso que quiero continuar.");
    await page
      .getByRole("button", { name: "Volver a mis exámenes", exact: true })
      .click();
    await openExams(page, subject);
    await page.getByRole("button", { name: /^Continuar:/ }).click();
    await expect(page.locator(".exam-page-heading > strong")).toHaveText(
      `Pregunta ${lastPage} de ${lastPage}`,
    );
    await expect(page.getByLabel(lastLabel, { exact: true })).toHaveValue(
      "Comentario o caso que quiero continuar.",
    );
    await goToExamQuestion(page, 1);
    await expect(page.getByLabel(firstLabel, { exact: true })).toHaveValue(
      "Primera respuesta escrita y revisada.",
    );
    if (lastPage === 4)
      await expect(page.getByRole("checkbox").first()).toBeChecked();
  });
}

test("TEC restores the chosen development and both alternative drafts", async ({
  page,
}) => {
  await openExams(page, "Teoría del Estado Constitucional");
  await startExam(page);
  await goToExamQuestion(page, 21);
  await page
    .getByLabel("Tu respuesta de desarrollo", { exact: true })
    .fill("Borrador sobre los modelos territoriales.");
  const choices = page
    .getByRole("radiogroup", { name: "Pregunta de desarrollo elegida" })
    .getByRole("radio");
  await choices.nth(1).check();
  await page
    .getByLabel("Tu respuesta de desarrollo", { exact: true })
    .fill("Borrador sobre la responsabilidad política.");
  await openExams(page, "Teoría del Estado Constitucional");
  await page.getByRole("button", { name: /^Continuar:/ }).click();
  await expect(page.locator(".exam-page-heading > strong")).toHaveText(
    "Pregunta 21 de 21",
  );
  await expect(choices.nth(1)).toBeChecked();
  await expect(
    page.getByLabel("Tu respuesta de desarrollo", { exact: true }),
  ).toHaveValue("Borrador sobre la responsabilidad política.");
  await choices.nth(0).check();
  await expect(
    page.getByLabel("Tu respuesta de desarrollo", { exact: true }),
  ).toHaveValue("Borrador sobre los modelos territoriales.");
});

test("a save failure is visible, preserves the response and can be retried", async ({
  page,
}) => {
  await openExams(page);
  await startExam(page);
  await page.evaluate(() => {
    const original = Storage.prototype.setItem;
    Object.assign(window, {
      restoreExamStorage: () => {
        Storage.prototype.setItem = original;
      },
    });
    Storage.prototype.setItem = function (key, value) {
      if (key.startsWith("uned-exam-attempts-v1:"))
        throw new DOMException("blocked", "QuotaExceededError");
      return original.call(this, key, value);
    };
  });
  await page.locator("fieldset:visible").getByRole("radio").nth(1).check();
  await expect(page.locator(".exam-save-error")).toContainText(
    "No se han podido guardar",
  );
  await expect(
    page.locator("fieldset:visible").getByRole("radio").nth(1),
  ).toBeChecked();
  await page.evaluate(() =>
    (
      window as unknown as { restoreExamStorage: () => void }
    ).restoreExamStorage(),
  );
  await page
    .getByRole("button", { name: "Reintentar guardado", exact: true })
    .click();
  await expect(page.locator(".exam-save-error")).toHaveCount(0);
  const record = (await saved(page))[0];
  expect(record.data.kind).toBe("test");
  if (record.data.kind === "test")
    expect(Object.values(record.data.answers)).toEqual([1]);
});

test("other users' attempts stay separate and a damaged record is not overwritten", async ({
  page,
}) => {
  await page.goto("/uned/dashboard/");
  const other = newExamAttempt(
    "021021",
    examModelsFor("021021")[0],
    "other-user-attempt",
  );
  await page.evaluate(({ key, value }) => localStorage.setItem(key, value), {
    key: examStorageKey("other-account"),
    value: JSON.stringify([other]),
  });
  await openExams(page);
  await expect(page.getByRole("button", { name: /^Pendientes/ })).toContainText(
    "(3)",
  );
  await expect(page.getByRole("button", { name: /^En curso/ })).toContainText(
    "(0)",
  );
  expect(await saved(page)).toHaveLength(0);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.evaluate(
    (key) => localStorage.setItem(key, "damaged record"),
    examStorageKey("demo"),
  );
  await openExams(page);
  await expect(page.locator(".exam-save-error")).toContainText(
    "No se pudieron recuperar",
  );
  await expect(
    page.getByRole("button", { name: /^Empezar:/ }).first(),
  ).toBeDisabled();
  expect(
    await page.evaluate(
      (key) => localStorage.getItem(key),
      examStorageKey("demo"),
    ),
  ).toBe("damaged record");
});

test("saving another attempt in a second tab does not erase the first", async ({
  page,
  context,
}) => {
  await openExams(page);
  await startExam(page);
  await page.locator("fieldset:visible").getByRole("radio").nth(1).check();
  const firstId = (await saved(page))[0].id;
  const otherPage = await context.newPage();
  await openExams(otherPage);
  await otherPage.getByRole("button", { name: /^Pendientes/ }).click();
  await startExam(otherPage);
  await otherPage.locator("fieldset:visible").getByRole("radio").nth(0).check();
  await page
    .getByRole("button", { name: "Pregunta siguiente", exact: true })
    .click();
  await page.locator("fieldset:visible").getByRole("radio").nth(2).check();
  await otherPage
    .getByRole("button", { name: "Pregunta siguiente", exact: true })
    .click();
  await otherPage.locator("fieldset:visible").getByRole("radio").nth(1).check();
  const all = await saved(page);
  expect(all).toHaveLength(2);
  for (const item of all) {
    expect(item.data.kind).toBe("test");
    if (item.data.kind === "test")
      expect(Object.keys(item.data.answers)).toHaveLength(2);
  }
  expect(all.some((item) => item.id === firstId)).toBe(true);
  await otherPage.close();
});
