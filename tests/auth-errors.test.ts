import { test } from "node:test";
import assert from "node:assert/strict";
import { authErrorMessage } from "../lib/auth-errors";

test("sign-in distinguishes unconfirmed email, invalid credentials and service failures without exposing server messages", () => {
  assert.match(
    authErrorMessage({ code: "email_not_confirmed" }),
    /todavía no está confirmado/,
  );
  assert.match(
    authErrorMessage({ code: "invalid_credentials" }),
    /contraseña que elegiste/,
  );
  assert.match(authErrorMessage({ status: 503 }), /servicio de acceso/);
  assert.match(
    authErrorMessage({ code: "over_email_send_rate_limit" }),
    /límite de envío/,
  );
  assert.match(
    authErrorMessage({ code: "signup_disabled" }, true),
    /desactivada/,
  );
  assert.doesNotMatch(
    authErrorMessage({ code: "internal_database_secret" }),
    /internal_database_secret/,
  );
});
