import { existsSync } from "node:fs";
import { validatePublicSupabaseConfig } from "../lib/supabase/public-config";
if (existsSync(".env.local")) process.loadEnvFile(".env.local");
async function main() {
  try {
    const config = validatePublicSupabaseConfig(
      process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.SUPABASE_PUBLISHABLE_KEY ??
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
        "",
    );
    const headers = { apikey: config.key };
    const settings = await fetch(config.url + "/auth/v1/settings", {
      headers,
      signal: AbortSignal.timeout(20000),
    });
    if (!settings.ok)
      throw new Error(
        `Supabase Auth no está accesible con la clave pública (HTTP ${settings.status}).`,
      );
    const auth = await settings.json();
    if (!auth.external?.email)
      throw new Error("Habilita el acceso por email en Supabase Auth.");
    for (const table of [
      "subjects",
      "study_tasks",
      "study_sessions",
      "exam_dates",
      "notification_preferences",
    ]) {
      const response = await fetch(
        `${config.url}/rest/v1/${table}?select=*&limit=0`,
        { headers, signal: AbortSignal.timeout(20000) },
      );
      const body = await response.json();
      if (![401, 403].includes(response.status) || body.code !== "42501")
        throw new Error(
          `Revisa las migraciones y los permisos de ${table}: se esperaba denegar lectura anónima (HTTP ${response.status}).`,
        );
    }
    console.log(
      "Supabase Auth responde y el acceso por email está habilitado. Las cinco tablas deniegan acceso anónimo.",
    );
    console.log(
      "Falta probar el acceso y el aislamiento con dos cuentas reales; este diagnóstico no lo sustituye.",
    );
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "No se pudo validar Supabase.";
    console.error(message);
    if (process.env.GITHUB_ACTIONS === "true") {
      const escaped = message
        .replace(/%/g, "%25")
        .replace(/\r/g, "%0D")
        .replace(/\n/g, "%0A");
      console.error(`::error title=Conexión Supabase::${escaped}`);
    }
    process.exitCode = 1;
  }
}
void main();
