import { test } from "node:test";
import assert from "node:assert/strict";
import { validatePublicSupabaseConfig } from "../lib/supabase/public-config";
import { appPath, authReturnUrl } from "../lib/paths";
const key = "sb_publishable_fixture_not_for_real_service";
test("public connection validates project URL and rejects server credentials", () => {
  assert.equal(
    validatePublicSupabaseConfig("https://test.supabase.co", key).url,
    "https://test.supabase.co",
  );
  for (const url of [
    "http://test.supabase.co",
    "https://evil.example",
    "https://user:pass@test.supabase.co",
    "https://test.supabase.co/secret",
  ])
    assert.throws(() => validatePublicSupabaseConfig(url, key));
  for (const k of ["sb_secret_do_not_publish", "service_role", ""])
    assert.throws(() =>
      validatePublicSupabaseConfig("https://test.supabase.co", k),
    );
  const payload = (role: string) =>
    `header.${Buffer.from(JSON.stringify({ role })).toString("base64url")}.signature`;
  assert.throws(() =>
    validatePublicSupabaseConfig(
      "https://test.supabase.co",
      payload("service_role"),
    ),
  );
  assert.doesNotThrow(() =>
    validatePublicSupabaseConfig("https://test.supabase.co", payload("anon")),
  );
});
test("static authentication redirects include the Pages path and remain on-origin", () => {
  const oldMode = process.env.NEXT_PUBLIC_AUTH_MODE,
    oldPath = process.env.NEXT_PUBLIC_BASE_PATH;
  try {
    process.env.NEXT_PUBLIC_AUTH_MODE = "static";
    process.env.NEXT_PUBLIC_BASE_PATH = "/uned";
    assert.equal(appPath("/dashboard"), "/uned/dashboard/");
    assert.equal(
      authReturnUrl("https://anasantana1609.github.io"),
      "https://anasantana1609.github.io/uned/auth/callback/",
    );
    assert.equal(appPath("//evil.example"), "/uned/dashboard/");
  } finally {
    if (oldMode === undefined) delete process.env.NEXT_PUBLIC_AUTH_MODE;
    else process.env.NEXT_PUBLIC_AUTH_MODE = oldMode;
    if (oldPath === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
    else process.env.NEXT_PUBLIC_BASE_PATH = oldPath;
  }
});
