import type { NextConfig } from "next";
import path from "node:path";

// GitHub Pages hosts this explicit demo only. The full server app is unchanged.
const config: NextConfig = {
  output: "export",
  basePath: "/uned",
  trailingSlash: true,
  poweredByHeader: false,
  turbopack: { root: path.resolve(__dirname, "..") },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: "",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "",
  },
};
export default config;
