"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { browserClient, isConfigured } from "@/lib/supabase/client";
import { StudyProvider } from "./study-provider";
import { Shell } from "./shell";
import { BookOpen, ShieldCheck } from "lucide-react";

type State = {
  status: "loading" | "signedout" | "error" | "authenticated";
  user: User | null;
};
export function StaticStudyGate({ children }: { children: React.ReactNode }) {
  const configured = isConfigured();
  const [state, setState] = useState<State>({ status: "loading", user: null });
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!configured) return;
    const client = browserClient()!;
    let cancelled = false;
    setState({ status: "loading", user: null });
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((event, session) => {
      if (cancelled || event === "INITIAL_SESSION") return;
      if (event === "SIGNED_OUT") setState({ status: "signedout", user: null });
      else if (session?.user)
        setState((previous) =>
          previous.user?.id === session.user.id &&
          previous.status === "authenticated"
            ? previous
            : { status: "authenticated", user: session.user },
        );
    });
    void (async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await client.auth.getSession();
        if (cancelled) return;
        if (sessionError) throw sessionError;
        if (!session) {
          setState({ status: "signedout", user: null });
          return;
        }
        const {
          data: { user },
          error,
        } = await client.auth.getUser();
        if (cancelled) return;
        if (error) throw error;
        setState(
          user
            ? { status: "authenticated", user }
            : { status: "signedout", user: null },
        );
      } catch {
        if (!cancelled) setState({ status: "error", user: null });
      }
    })();
    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [configured, retry]);
  if (!configured)
    return (
      <StudyProvider user={null}>
        <Shell>{children}</Shell>
      </StudyProvider>
    );
  if (state.status === "loading")
    return (
      <main className="not-found" role="status">
        <BookOpen size={34} />
        <h1>Preparando tu espacio privado…</h1>
        <p>Comprobando tu sesión de forma segura.</p>
      </main>
    );
  if (state.status === "error")
    return (
      <main className="not-found">
        <h1>No pudimos comprobar tu sesión.</h1>
        <p>
          Revisa tu conexión y vuelve a intentarlo. Tus datos de cuenta no se
          sustituyen por datos de demo.
        </p>
        <button className="button" onClick={() => setRetry((n) => n + 1)}>
          Volver a intentar
        </button>
        <Link href="/login" className="text-link">
          Ir al acceso
        </Link>
      </main>
    );
  if (!state.user)
    return (
      <main className="not-found">
        <ShieldCheck size={38} />
        <span className="eyebrow">VERSIÓN PRELIMINAR</span>
        <h1>Tu estudio tiene su propio espacio.</h1>
        <p>Inicia sesión para consultar tus asignaturas, tareas y progreso.</p>
        <Link href="/login" className="button">
          Acceder a mi cuenta
        </Link>
        <small className="muted">
          Los datos de cada cuenta están separados. No se importan datos de la
          demo.
        </small>
      </main>
    );
  const user = {
    id: state.user.id,
    email: state.user.email ?? "",
    name:
      typeof state.user.user_metadata?.full_name === "string"
        ? state.user.user_metadata.full_name
        : "",
  };
  return (
    <StudyProvider key={user.id} user={user}>
      <Shell>{children}</Shell>
    </StudyProvider>
  );
}
