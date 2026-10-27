import { test, expect } from "@playwright/test";

test("lesson reader speaks content and supports pause, resume, stop and cleanup", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const calls: string[] = [];
    Object.assign(window, { speechCalls: calls });
    class Utterance {
      text: string;
      constructor(text: string) {
        this.text = text;
      }
    }
    Object.defineProperty(window, "SpeechSynthesisUtterance", {
      value: Utterance,
    });
    Object.defineProperty(window, "speechSynthesis", {
      value: {
        getVoices: () => [],
        addEventListener() {},
        removeEventListener() {},
        cancel: () => calls.push("cancel"),
        pause: () => calls.push("pause"),
        resume: () => calls.push("resume"),
        speak: (item: {
          text: string;
          rate: number;
          lang: string;
          onend: () => void;
          onerror: () => void;
        }) => {
          calls.push(`${item.lang}:${item.rate}:${item.text}`);
          Object.assign(window, {
            finishSpeech: item.onend,
            failSpeech: item.onerror,
          });
        },
      },
    });
  });
  await page.goto("/uned/asignaturas/");
  await page.getByRole("button", { name: /Derecho Civil I.1/ }).click();
  await page
    .getByRole("button", { name: /Qué estudia el Derecho civil/ })
    .click();
  const dialog = page.getByRole("region", { name: "Lectura en voz alta" });
  await expect(dialog.locator("select")).toHaveCount(0);
  await expect(page.getByText("Al terminar:", { exact: true })).toHaveCount(0);
  await expect(dialog.getByRole("button")).toHaveCount(1);
  await expect(dialog.getByRole("button").first()).toHaveText("");
  await dialog
    .getByRole("button", { name: "Escuchar lección", exact: true })
    .click();
  await expect
    .poll(() =>
      page.evaluate(
        () => (window as unknown as { speechCalls: string[] }).speechCalls,
      ),
    )
    .toEqual(
      expect.arrayContaining([
        expect.stringMatching(/^es-ES:1:Qué estudia el Derecho civil/),
      ]),
    );
  await dialog.getByRole("button", { name: "Pausar lectura" }).click();
  await expect(dialog.getByRole("status")).toContainText("En pausa");
  await dialog.getByRole("button", { name: "Reanudar lectura" }).click();
  await dialog.getByRole("button", { name: "Detener lectura" }).click();
  await dialog
    .getByRole("button", { name: "Escuchar lección", exact: true })
    .click();
  for (
    let i = 0;
    i < 30 &&
    !(await dialog.getByRole("status").textContent())?.includes("finalizada");
    i++
  ) {
    await page.evaluate(() =>
      (window as unknown as { finishSpeech: () => void }).finishSpeech(),
    );
  }
  await expect(dialog.getByRole("status")).toHaveText("Lectura finalizada.");
  await dialog.getByRole("button", { name: "Volver a escuchar" }).click();
  await page.evaluate(() =>
    (window as unknown as { failSpeech: () => void }).failSpeech(),
  );
  await expect(dialog.getByRole("alert")).toContainText(
    "No se pudo reproducir",
  );
  await dialog
    .getByRole("button", { name: "Escuchar lección", exact: true })
    .click();
  const before = await page.evaluate(
    () => (window as unknown as { speechCalls: string[] }).speechCalls.length,
  );
  await page.getByRole("button", { name: "Volver al recorrido" }).click();
  expect(
    await page.evaluate(() =>
      (window as unknown as { speechCalls: string[] }).speechCalls.slice(-1),
    ),
  ).toEqual(["cancel"]);
  await page.evaluate(() =>
    (window as unknown as { finishSpeech: () => void }).finishSpeech(),
  );
  expect(
    await page.evaluate(
      () => (window as unknown as { speechCalls: string[] }).speechCalls.length,
    ),
  ).toBe(before + 1);
});

test("unsupported browsers explain unavailable audio", async ({ page }) => {
  await page.addInitScript(() => {
    delete (window as unknown as Record<string, unknown>).speechSynthesis;
    delete (window as unknown as Record<string, unknown>)
      .SpeechSynthesisUtterance;
  });
  await page.goto("/uned/asignaturas/");
  await page.getByRole("button", { name: /Derecho Civil I.1/ }).click();
  await page
    .getByRole("button", { name: /Qué estudia el Derecho civil/ })
    .click();
  await expect(
    page
      .getByRole("region", { name: "Lectura en voz alta" })
      .getByRole("status"),
  ).toContainText("Este navegador no permite");
});
