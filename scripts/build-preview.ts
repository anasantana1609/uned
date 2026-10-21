import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { validatePublicSupabaseConfig } from "../lib/supabase/public-config";
if (existsSync(".env.local")) process.loadEnvFile(".env.local");
try {
  const config = validatePublicSupabaseConfig(
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.SUPABASE_PUBLISHABLE_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      "",
  );
  execFileSync(
    process.execPath,
    [resolve("node_modules/next/dist/bin/next"), "build", "demo"],
    {
      stdio: "inherit",
      env: {
        ...process.env,
        UNED_PREVIEW: "true",
        UNED_PUBLIC_SUPABASE_URL: config.url,
        UNED_PUBLIC_SUPABASE_KEY: config.key,
      },
    },
  );
} catch (e) {
  console.error(
    e instanceof Error ? e.message : "No se pudo compilar la preliminar.",
  );
  process.exit(1);
}
