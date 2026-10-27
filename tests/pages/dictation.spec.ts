import { goToExamQuestion } from "./exam-navigation";
import { test, expect, type Page } from "@playwright/test";

type Engine = {
  lang: string;
  onresult:
    | ((event: {
        results: Array<Array<{ transcript: string }> & { isFinal: boolean }>;
      }) => void)
    | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  calls: string[];
};
type SpeechTest = { engines: Engine[] };
async function mockRecognition(page: Page) {
  await page.addInitScript(() => {
    const engines: unknown[] = [];
    class Recognition {
      lang = "";
      continuous = false;
      interimResults = false;
      onresult = null;
      onerror = null;
      onend: (() => void) | null = null;
      calls: string[] = [];
      constructor() {
        engines.push(this);
      }
      start() {
        this.calls.push("start");
      }
      stop() {
        this.calls.push("stop");
        this.onend?.();
      }
      abort() {
        this.calls.push("abort");
        this.onend?.();
      }
    }
    Object.defineProperty(window, "SpeechRecognition", {
      value: Recognition,
      configurable: true,
    });
    Object.assign(window, { speechTest: { engines } });
  });
}
async function history(page: Page) {
  await page.goto("/uned/dashboard/");
  await page
    .getByRole("button", { name: /^Historia del Derecho Español/ })
    .click();
  await page.getByRole("button", { name: /Hacer exámenes/ }).click();
  await page.getByRole("checkbox").nth(0).check();
}
async function transcript(page: Page, engineIndex: number, texts: string[]) {
  await page.evaluate(
    ({ engineIndex, texts }) => {
      const speech = (window as unknown as { speechTest: SpeechTest })
        .speechTest;
      speech.engines[engineIndex].onresult?.({
        results: texts.map((text, index) =>
          Object.assign([{ transcript: text }], {
            isFinal: index < texts.length - 1,
          }),
        ),
      });
    },
    { engineIndex, texts },
  );
}

test("dictation appends editable Spanish text and repeated interim results do not duplicate words", async ({
  page,
}) => {
  await mockRecognition(page);
  await history(page);
  const answer = page.getByLabel("Tu respuesta a la pregunta 1", {
    exact: true,
  });
  await answer.fill("Idea escrita.");
  await goToExamQuestion(page, 1);
  await page
    .getByRole("button", {
      name: "Responder por audio: Tu respuesta a la pregunta 1",
      exact: true,
    })
    .click();
  expect(
    await page.evaluate(
      () =>
        (window as unknown as { speechTest: SpeechTest }).speechTest.engines[0]
          .lang,
    ),
  ).toBe("es-ES");
  await transcript(page, 0, ["El fuero"]);
  await expect(answer).toHaveValue("Idea escrita. El fuero");
  await transcript(page, 0, ["El fuero regula.", "La costumbre"]);
  await transcript(page, 0, ["El fuero regula.", "La costumbre"]);
  await expect(answer).toHaveValue(
    "Idea escrita. El fuero regula. La costumbre",
  );
  await page
    .getByRole("button", {
      name: "Detener dictado: Tu respuesta a la pregunta 1",
      exact: true,
    })
    .click();
  await expect(answer).toBeEditable();
  await answer.fill("Respuesta revisada.");
  await expect(answer).toHaveValue("Respuesta revisada.");
});

test("only one answer dictates at a time and changing model stops audio and ignores late results", async ({
  page,
}) => {
  await mockRecognition(page);
  await history(page);
  await goToExamQuestion(page, 1);
  await page
    .getByRole("button", {
      name: "Responder por audio: Tu respuesta a la pregunta 1",
      exact: true,
    })
    .click();
  await transcript(page, 0, ["Primera respuesta"]);
  await goToExamQuestion(page, 4);
  await page
    .getByRole("button", {
      name: "Responder por audio: Tu comentario",
      exact: true,
    })
    .click();
  expect(
    await page.evaluate(
      () =>
        (window as unknown as { speechTest: SpeechTest }).speechTest.engines[0]
          .calls,
    ),
  ).toContain("abort");
  await transcript(page, 0, ["Texto tardío que no debe entrar"]);
  await expect(
    page.getByLabel("Tu respuesta a la pregunta 1", { exact: true }),
  ).toHaveValue("Primera respuesta");
  await transcript(page, 1, ["Comentario dictado"]);
  await expect(page.getByLabel("Tu comentario", { exact: true })).toHaveValue(
    "Comentario dictado",
  );
  await page.getByLabel("Elegir modelo").selectOption("1");
  expect(
    await page.evaluate(
      () =>
        (window as unknown as { speechTest: SpeechTest }).speechTest.engines[1]
          .calls,
    ),
  ).toContain("abort");
  await transcript(page, 1, ["Texto del modelo anterior"]);
  await expect(page.getByLabel("Tu comentario", { exact: true })).toHaveValue(
    "",
  );
});

test("denying microphone permission preserves the written answer and allows retry", async ({
  page,
}) => {
  await mockRecognition(page);
  await history(page);
  const answer = page.getByLabel("Tu respuesta a la pregunta 1", {
    exact: true,
  });
  await answer.fill("Mi respuesta previa");
  const mic = page.getByRole("button", {
    name: "Responder por audio: Tu respuesta a la pregunta 1",
    exact: true,
  });
  await mic.click();
  await page.evaluate(() =>
    (
      window as unknown as { speechTest: SpeechTest }
    ).speechTest.engines[0].onerror?.({ error: "not-allowed" }),
  );
  await expect(
    page.getByRole("region", { name: "Práctica de examen" }).getByRole("alert"),
  ).toContainText("Permite el acceso al micrófono");
  await expect(answer).toHaveValue("Mi respuesta previa");
  await expect(answer).toBeEditable();
  await mic.click();
  await transcript(page, 1, ["y mi explicación oral"]);
  await expect(answer).toHaveValue("Mi respuesta previa y mi explicación oral");
});

test("unsupported browsers keep manual answers available", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "SpeechRecognition", {
      value: undefined,
      configurable: true,
    });
    Object.defineProperty(window, "webkitSpeechRecognition", {
      value: undefined,
      configurable: true,
    });
  });
  await history(page);
  await expect(
    page.getByRole("button", {
      name: "Responder por audio: Tu respuesta a la pregunta 1",
      exact: true,
    }),
  ).toBeDisabled();
  const answer = page.getByLabel("Tu respuesta a la pregunta 1", {
    exact: true,
  });
  await answer.fill("Respuesta escrita sin micrófono.");
  await expect(answer).toHaveValue("Respuesta escrita sin micrófono.");
});

test("finishing an attempt closes the microphone and late results cannot modify the submitted answer", async ({
  page,
}) => {
  await mockRecognition(page);
  await history(page);
  await goToExamQuestion(page, 2);
  await page.getByRole("checkbox").check();
  await goToExamQuestion(page, 1);
  await page
    .getByLabel("Tu respuesta a la pregunta 1", { exact: true })
    .fill("Primera respuesta.");
  await goToExamQuestion(page, 2);
  await page
    .getByLabel("Tu respuesta a la pregunta 2", { exact: true })
    .fill("Segunda respuesta.");
  await goToExamQuestion(page, 4);
  await page
    .getByLabel("Tu comentario", { exact: true })
    .fill("Comentario terminado.");
  await goToExamQuestion(page, 1);
  await page
    .getByRole("button", {
      name: "Responder por audio: Tu respuesta a la pregunta 1",
      exact: true,
    })
    .click();
  await transcript(page, 0, ["Una explicación adicional."]);
  await page
    .getByRole("button", { name: "Finalizar práctica", exact: true })
    .click();
  expect(
    await page.evaluate(
      () =>
        (window as unknown as { speechTest: SpeechTest }).speechTest.engines[0]
          .calls,
    ),
  ).toContain("abort");
  await transcript(page, 0, ["Texto posterior al envío"]);
  await expect(
    page.getByLabel("Tu respuesta a la pregunta 1", { exact: true }),
  ).toHaveValue("Primera respuesta. Una explicación adicional.");
});
