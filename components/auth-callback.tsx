"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { browserClient } from "@/lib/supabase/client";
import { appPath } from "@/lib/paths";
import { safeRedirect } from "@/lib/model";
export function AuthCallback() {
  const [error, setError] = useState("");
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    void (async () => {
      try {
        const query = new URLSearchParams(window.location.search);
        const code = query.get("code");
        const client = browserClient();
        if (!client)
          throw new Error("El acceso personal todavía no está configurado.");
        if (query.has("error"))
          throw new Error(
            "El acceso no se pudo completar. Vuelve a intentarlo desde el formulario.",
          );
        if (!code)
          throw new Error(
            "El enlace no contiene un código de acceso válido. Inicia sesión de nuevo.",
          );
        const { error } = await client.auth.exchangeCodeForSession(code);
        if (error)
          throw new Error(
            "El enlace ha caducado o se abrió en otro navegador. Si ya confirmaste tu correo, inicia sesión con tu contraseña.",
          );
        const {
          data: { user },
          error: userError,
        } = await client.auth.getUser();
        if (userError || !user)
          throw new Error(
            "No se pudo comprobar la cuenta. Vuelve a iniciar sesión.",
          );
        window.history.replaceState({}, "", appPath("/auth/callback"));
        window.location.replace(appPath(safeRedirect(query.get("next"))));
      } catch (e) {
        window.history.replaceState({}, "", appPath("/auth/callback"));
        setError(
          e instanceof Error ? e.message : "No se pudo completar el acceso.",
        );
      }
    })();
  }, []);
  return (
    <main className="not-found">
      <span className="eyebrow">UNED STUDY AI</span>
      <h1>{error ? "Revisa tu acceso" : "Confirmando tu cuenta…"}</h1>
      <p role={error ? "alert" : "status"}>
        {error || "Estamos terminando la conexión con tu espacio personal."}
      </p>
      {error && (
        <Link href="/login" className="button">
          Volver al acceso
        </Link>
      )}
    </main>
  );
}
