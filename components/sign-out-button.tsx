"use client";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { browserClient } from "@/lib/supabase/client";
import { appPath } from "@/lib/paths";
export function SignOutButton({ iconOnly = false }: { iconOnly?: boolean }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function logout() {
    setBusy(true);
    setError("");
    try {
      const client = browserClient();
      if (!client) throw new Error("No hay conexión con Supabase.");
      const { error } = await client.auth.signOut({ scope: "local" });
      if (error) throw error;
      window.location.assign(appPath("/login"));
    } catch {
      setError("No se pudo cerrar la sesión. Inténtalo de nuevo.");
      setBusy(false);
    }
  }
  return (
    <span>
      <button
        className={iconOnly ? "icon-button" : "button secondary"}
        disabled={busy}
        aria-label="Cerrar sesión"
        onClick={() => void logout()}
      >
        {iconOnly ? <LogOut size={17} /> : busy ? "Cerrando…" : "Cerrar sesión"}
      </button>
      {error && (
        <small className="form-error" role="alert">
          {error}
        </small>
      )}
    </span>
  );
}
