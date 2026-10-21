export function validatePublicSupabaseConfig(url: string, key: string) {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error("Indica una URL válida del proyecto Supabase.");
  }
  if (
    parsed.protocol !== "https:" ||
    parsed.username ||
    parsed.password ||
    parsed.pathname !== "/" ||
    parsed.search ||
    parsed.hash ||
    !parsed.hostname.endsWith(".supabase.co")
  ) {
    throw new Error(
      "Usa la URL HTTPS de tu proyecto (https://…supabase.co), sin rutas ni credenciales.",
    );
  }
  let publicKey = /^sb_publishable_[A-Za-z0-9_-]{16,}$/.test(key);
  if (!publicKey && key.split(".").length === 3) {
    try {
      const payload = JSON.parse(
        atob(key.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
      );
      publicKey = payload.role === "anon";
    } catch {
      /* Not a legacy anon JWT. */
    }
  }
  if (!publicKey)
    throw new Error(
      "Usa únicamente una clave publicable (sb_publishable_…) o anon. Las claves secretas y service_role no se pueden publicar.",
    );
  return { url: parsed.origin, key };
}
