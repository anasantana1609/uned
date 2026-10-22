import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const cwd = fileURLToPath(new URL("..", import.meta.url));
function run(mode?: string) {
  const env = {
    ...process.env,
    GITHUB_ACTIONS: "true",
    SUPABASE_URL: mode ? "https://fixture.supabase.co" : "",
    SUPABASE_PUBLISHABLE_KEY: mode
      ? "sb_publishable_fixture_not_for_real_service"
      : "",
    NEXT_PUBLIC_SUPABASE_URL: "",
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "",
    UNED_CHECK_FIXTURE: mode ?? "",
  };
  return spawnSync(
    process.execPath,
    [
      "--import",
      "tsx",
      "--import",
      fileURLToPath(
        new URL("./helpers/supabase-check-fixture.mjs", import.meta.url),
      ),
      "scripts/check-supabase.ts",
    ],
    { cwd, env, encoding: "utf8", timeout: 15000 },
  );
}
test("Supabase CLI starts in the actual package module format and reports missing configuration", () => {
  const result = run();
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Indica una URL válida/);
  assert.match(
    result.stderr,
    /::error title=Conexión Supabase::Indica una URL válida/,
  );
  assert.doesNotMatch(result.stderr, /Transform failed|Top-level await/);
});
test("Supabase CLI validates email and all private-table denials through its real entry point", () => {
  const result = run("healthy");
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /cinco tablas deniegan acceso anónimo/);
});
test("Supabase CLI blocks publication when email is disabled or anonymous data is readable", () => {
  const disabled = run("email-disabled");
  assert.equal(disabled.status, 1);
  assert.match(disabled.stderr, /Habilita el acceso por email/);
  const open = run("anonymous-readable");
  assert.equal(open.status, 1);
  assert.match(open.stderr, /se esperaba denegar lectura anónima/);
});
