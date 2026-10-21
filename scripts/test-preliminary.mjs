// Tests the static account client against mocked Supabase HTTP responses, never a live project.
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
const node = process.execPath;
const run = (args, env = process.env) =>
  execFileSync(node, args, { stdio: "inherit", env });
try {
  run([resolve("node_modules/tsx/dist/cli.mjs"), "scripts/build-preview.ts"], {
    ...process.env,
    SUPABASE_URL: "https://preliminary-test.supabase.co",
    SUPABASE_PUBLISHABLE_KEY: "sb_publishable_fixture_not_for_real_service",
  });
  run([
    resolve("node_modules/@playwright/test/cli.js"),
    "test",
    "--config",
    "playwright.preliminary.config.ts",
  ]);
} catch {
  process.exitCode = 1;
} finally {
  // Never leave the fixture-configured artifact as the site's default export.
  try {
    run([resolve("node_modules/next/dist/bin/next"), "build", "demo"], {
      ...process.env,
      UNED_PREVIEW: "false",
    });
  } catch {
    process.exitCode = 1;
  }
}
