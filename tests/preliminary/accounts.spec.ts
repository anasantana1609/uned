import { test, expect, type Page } from "@playwright/test";
const host = "https://preliminary-test.supabase.co";
const userId = "11111111-1111-4111-8111-111111111111";
const subjectId = "33333333-3333-4333-8333-333333333333";
const user = {
  id: userId,
  email: "student@example.test",
  aud: "authenticated",
  role: "authenticated",
  app_metadata: { provider: "email", providers: ["email"] },
  user_metadata: { full_name: "Estudiante preliminar" },
  created_at: "2026-10-21T00:00:00Z",
};
function token() {
  const b = (v: unknown) =>
    Buffer.from(JSON.stringify(v)).toString("base64url");
  return `${b({ alg: "HS256", typ: "JWT" })}.${b({ sub: userId, role: "authenticated", exp: Math.floor(Date.now() / 1000) + 3600 })}.fixture-signature`;
}
async function mockSupabase(
  page: Page,
  subjectName = "Mi asignatura personal",
) {
  const exams: Record<string, unknown>[] = [];
  const examWrites: { method: string; userFilter: string | null }[] = [];
  let failExams = false;
  const rows: Record<string, unknown>[] = [];
  let failTasks = false;
  const session = {
    access_token: token(),
    token_type: "bearer",
    expires_in: 3600,
    refresh_token: "fixture-refresh-token",
    user,
  };
  await page.route(host + "/**", async (route) => {
    const r = route.request(),
      u = new URL(r.url());
    const headers = {
      "access-control-allow-origin": "*",
      "access-control-allow-headers":
        "authorization,apikey,x-client-info,content-type,x-supabase-api-version,x-retry-count",
      "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS",
    };
    const reply = (data: unknown, status = 200) =>
      route.fulfill({
        status,
        headers,
        contentType: "application/json",
        body: JSON.stringify(data),
      });
    if (r.method() === "OPTIONS")
      return route.fulfill({ status: 204, headers });
    if (u.pathname === "/auth/v1/token") return reply(session);
    if (u.pathname === "/auth/v1/user") return reply(user);
    if (u.pathname === "/auth/v1/signup")
      return reply({ ...user, identities: [] });
    if (u.pathname === "/auth/v1/logout")
      return route.fulfill({ status: 204, headers });
    if (
      u.pathname.startsWith("/rest/v1/") &&
      r.headers().authorization !== `Bearer ${session.access_token}`
    )
      return reply({ message: "Authentication required" }, 401);
    if (u.pathname === "/rest/v1/subjects")
      return reply([
        {
          id: subjectId,
          user_id: userId,
          name: subjectName,
          category: "Derecho privado",
          color: "mint",
          goal_minutes: 600,
        },
      ]);
    if (u.pathname === "/rest/v1/study_tasks") {
      if (failTasks) return reply({ message: "Temporarily unavailable" }, 503);
      if (r.method() === "POST") {
        rows.push(r.postDataJSON());
        return route.fulfill({ status: 201, headers });
      }
      return reply(rows);
    }
    if (u.pathname === "/rest/v1/exam_dates") {
      if (r.method() === "GET") return reply(exams);
      if (failExams) return reply({ message: "Rejected fixture write" }, 403);
      examWrites.push({
        method: r.method(),
        userFilter: u.searchParams.get("user_id"),
      });
      if (r.method() === "POST") {
        exams.push(r.postDataJSON());
        return reply({ id: exams.at(-1)!.id }, 201);
      }
      if (r.method() === "PATCH") {
        Object.assign(exams[0], r.postDataJSON());
        return reply({ id: exams[0].id });
      }
    }
    if (u.pathname === "/rest/v1/study_sessions") return reply([]);
    if (u.pathname === "/rest/v1/notification_preferences")
      return reply({
        user_id: userId,
        daily_goal: 60,
        reminder_time: "09:00",
        timezone: "Atlantic/Canary",
        email_requested: false,
        push_requested: false,
      });
    return reply({ message: "Unhandled fixture request" }, 404);
  });
  return {
    rows,
    exams,
    examWrites,
    failExams: (v: boolean) => {
      failExams = v;
    },
    failTasks: (v: boolean) => {
      failTasks = v;
    },
  };
}
async function login(page: Page) {
  await page.goto("/uned/login/");
  await page.getByLabel("Email", { exact: true }).fill(user.email);
  await page
    .getByLabel("Contraseña", { exact: true })
    .fill("Fixture-password-123");
  await page.getByRole("button", { name: "Entrar en mi espacio" }).click();
  await page.waitForURL("**/uned/dashboard/");
}

test("private routes require login and do not expose demo data", async ({
  page,
}) => {
  await mockSupabase(page);
  await page.goto("/uned/dashboard/");
  await expect(
    page.getByRole("link", { name: "Acceder a mi cuenta", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Repasar la persona y la personalidad"),
  ).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Nueva tarea", exact: true }),
  ).toHaveCount(0);
});
test("email session loads personal data, persists tasks, and clears the view on logout", async ({
  page,
}) => {
  const mock = await mockSupabase(page);
  await login(page);
  await expect(
    page.getByText("Mi asignatura personal", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Estás explorando la demo.")).toHaveCount(0);
  await page.getByRole("button", { name: "Nueva tarea", exact: true }).click();
  const d = page.getByRole("dialog");
  await d.getByLabel("¿Qué vas a estudiar?").fill("Mi tarea de cuenta");
  await d.getByRole("button", { name: "Añadir tarea", exact: true }).click();
  await expect(d).toHaveCount(0);
  expect(mock.rows[0]).toMatchObject({
    user_id: userId,
    subject_id: subjectId,
    title: "Mi tarea de cuenta",
  });
  await page.reload();
  await expect(
    page.getByRole("button", {
      name: "Completar: Mi tarea de cuenta",
      exact: true,
    }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => localStorage.getItem("uned-study-demo-v1")),
  ).toBeNull();
  await page.goto("/uned/ajustes/");
  await page
    .locator("main")
    .getByRole("button", { name: "Cerrar sesión", exact: true })
    .click();
  await page.waitForURL("**/uned/login/");
  await page.goto("/uned/dashboard/");
  await expect(
    page.getByRole("link", { name: "Acceder a mi cuenta", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Mi tarea de cuenta")).toHaveCount(0);
});
test("account query failure never falls back to demo and can be retried", async ({
  page,
}) => {
  const mock = await mockSupabase(page);
  mock.failTasks(true);
  await login(page);
  await expect(
    page.getByRole("button", { name: "Reintentar carga" }),
  ).toBeVisible({ timeout: 15000 });
  await expect(
    page.getByText("Repasar la persona y la personalidad"),
  ).toHaveCount(0);
  mock.failTasks(false);
  await page.getByRole("button", { name: "Reintentar carga" }).click();
  await expect(
    page.getByRole("button", { name: "Nueva tarea", exact: true }),
  ).toBeEnabled();
  await expect(
    page.getByText("Mi asignatura personal", { exact: true }),
  ).toBeVisible();
});
test("registration uses the Pages callback and Google stays disabled until configured", async ({
  page,
}) => {
  await mockSupabase(page);
  await page.goto("/uned/login/");
  await expect(
    page.getByRole("button", { name: "Continuar con Google" }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Crea tu cuenta", exact: true })
    .click();
  await page.getByLabel("Email", { exact: true }).fill(user.email);
  await page
    .getByLabel("Contraseña", { exact: true })
    .fill("Fixture-password-123");
  const request = page.waitForRequest((r) =>
    r.url().startsWith(host + "/auth/v1/signup"),
  );
  await page
    .getByRole("button", { name: "Crear mi cuenta", exact: true })
    .click();
  expect(new URL((await request).url()).searchParams.get("redirect_to")).toBe(
    "http://127.0.0.1:4174/uned/auth/callback/",
  );
  await expect(page.getByRole("status")).toContainText("Revisa tu correo");
});
test("PKCE return exchanges the code and rejects external redirects", async ({
  page,
}) => {
  await mockSupabase(page);
  await page.goto("/uned/login/");
  await page.evaluate(() =>
    localStorage.setItem(
      "sb-preliminary-test-auth-token-code-verifier",
      JSON.stringify("fixture-code-verifier"),
    ),
  );
  await page.goto(
    "/uned/auth/callback/?code=fixture-code&next=https://evil.example",
  );
  await page.waitForURL("**/uned/dashboard/");
  await expect(
    page.getByText("Mi asignatura personal", { exact: true }),
  ).toBeVisible();
});

test("account exam choices replace the previous week and failed writes preserve the saved choice", async ({
  page,
}) => {
  const mock = await mockSupabase(page, "Derecho Civil I.1");
  await login(page);
  await page.goto("/uned/calendario/");
  const civil = page.getByRole("article", {
    name: "Derecho Civil I.1",
    exact: true,
  });
  const dialog = page.getByRole("dialog");
  const choose = async (week: number) => {
    await civil
      .getByRole("button", { name: new RegExp(`${week}ª semana`) })
      .click();
    await dialog.getByRole("checkbox").check();
    await dialog
      .getByRole("button", { name: "Guardar mi elección provisional" })
      .click();
  };
  await choose(1);
  await expect(dialog).toHaveCount(0);
  expect(mock.exams[0]).toMatchObject({
    user_id: userId,
    subject_id: subjectId,
    exam_date: "2027-01-25",
  });
  mock.failExams(true);
  await choose(2);
  await expect(
    page.getByRole("alert").filter({ hasText: "No se pudo guardar la opción" }),
  ).toContainText("No se pudo guardar la opción");
  expect(mock.exams[0].exam_date).toBe("2027-01-25");
  mock.failExams(false);
  await dialog
    .getByRole("button", { name: "Guardar mi elección provisional" })
    .click();
  await expect(dialog).toHaveCount(0);
  expect(mock.exams).toHaveLength(1);
  expect(mock.exams[0].exam_date).toBe("2027-02-08");
  expect(mock.examWrites).toEqual([
    { method: "POST", userFilter: null },
    { method: "PATCH", userFilter: `eq.${userId}` },
  ]);
  await page.reload();
  await expect(
    civil.getByRole("button", { name: /2ª semana/ }),
  ).toHaveAttribute("aria-pressed", "true");
  expect(
    await page.evaluate(() => localStorage.getItem("uned-study-demo-v1")),
  ).toBeNull();
});
