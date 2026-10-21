import type { NextConfig } from "next";
import path from "node:path";
const preliminary = process.env.UNED_PREVIEW === "true";
if (
  preliminary &&
  (!process.env.UNED_PUBLIC_SUPABASE_URL ||
    !process.env.UNED_PUBLIC_SUPABASE_KEY)
)
  throw new Error(
    "Usa npm run build:preview con la configuración pública del proyecto.",
  );
const config: NextConfig = {
  output: "export",
  basePath: "/uned",
  trailingSlash: true,
  poweredByHeader: false,
  turbopack: { root: path.resolve(__dirname, "..") },
  env: {
    NEXT_PUBLIC_AUTH_MODE: "static",
    NEXT_PUBLIC_BASE_PATH: "/uned",
    NEXT_PUBLIC_SUPABASE_URL: preliminary
      ? process.env.UNED_PUBLIC_SUPABASE_URL!
      : "",
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: preliminary
      ? process.env.UNED_PUBLIC_SUPABASE_KEY!
      : "",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "",
    NEXT_PUBLIC_GOOGLE_AUTH_ENABLED:
      preliminary && process.env.GOOGLE_AUTH_ENABLED === "true"
        ? "true"
        : "false",
  },
};
export default config;
