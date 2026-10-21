"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  BookOpen,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  LoaderCircle,
} from "lucide-react";
import { browserClient, isConfigured } from "@/lib/supabase/client";
import { appPath, authReturnUrl, isStaticAuth } from "@/lib/paths";
export default function Login() {
  const [signup, setSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const configured = isConfigured();
  const googleEnabled =
    !isStaticAuth() || process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true";
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("error"))
      setError(
        "No se pudo confirmar el acceso. Vuelve a intentarlo desde aquí.",
      );
  }, []);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const client = browserClient();
    if (!client) return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const result = signup
        ? await client.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: authReturnUrl(window.location.origin),
            },
          })
        : await client.auth.signInWithPassword({ email, password });
      if (result.error) {
        setError(
          signup
            ? "No se pudo crear la cuenta. Revisa los datos o prueba a iniciar sesión."
            : "No se pudo acceder. Comprueba tu email y contraseña.",
        );
        return;
      }
      if (result.data.session) {
        window.location.assign(appPath("/dashboard"));
      } else
        setMessage(
          "Revisa tu correo para confirmar la cuenta antes de acceder.",
        );
    } catch {
      setError("No se pudo conectar. Inténtalo de nuevo.");
    } finally {
      setBusy(false);
    }
  }
  async function google() {
    const client = browserClient();
    if (!client) return;
    setBusy(true);
    setError("");
    try {
      const { error } = await client.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: authReturnUrl(window.location.origin) },
      });
      if (error)
        setError(
          "No se pudo iniciar el acceso con Google. Comprueba que esté habilitado en Supabase.",
        );
    } catch {
      setError("No se pudo conectar con Google.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="login-page">
      <section className="login-story">
        <Link href="/dashboard" className="brand">
          <span className="brand-mark">
            <BookOpen size={25} />
          </span>
          <span>
            uned<span className="brand-dot">.</span>
            <small>STUDY AI</small>
          </span>
        </Link>
        <div className="login-story-content">
          <span className="eyebrow">
            <Sparkles size={15} />
            UN ESPACIO PARA TI
          </span>
          <h1>
            Grandes metas.
            <br />
            Pequeños pasos.
            <br />
            <em>Tu propio ritmo.</em>
          </h1>
          <p>
            Todo lo que necesitas para organizar tu estudio y avanzar con
            confianza.
          </p>
          <div className="login-quote">
            “La constancia transforma
            <br />
            el esfuerzo en aprendizaje.”
          </div>
        </div>
        <p className="login-disclaimer">
          Proyecto independiente · No afiliado a la UNED
        </p>
      </section>
      <section className="login-form-section">
        <Link href="/dashboard" className="back-link">
          <ArrowLeft size={16} />
          {configured && isStaticAuth()
            ? "Volver al inicio"
            : "Explorar la demo"}
        </Link>
        <div className="login-form-inner">
          <span className="pill">TU PRÓXIMO PASO</span>
          <h2>{signup ? "Empieza tu camino." : "Qué bueno verte por aquí."}</h2>
          <p>
            {signup
              ? "Crea tu cuenta y haz espacio para aprender."
              : "Accede a tu espacio y sigue donde lo dejaste."}
          </p>
          {!configured && (
            <div className="login-config-note">
              <ShieldCheck size={20} />
              <div>
                <strong>La demo ya está disponible.</strong>
                <p>
                  El acceso personal requiere conectar Supabase. Todavía no se
                  pueden crear cuentas ni iniciar sesión.
                </p>
              </div>
            </div>
          )}
          <button
            className="button google-button"
            disabled={!configured || busy || !googleEnabled}
            onClick={() => void google()}
          >
            <GoogleMark />
            Continuar con Google
          </button>
          {configured && !googleEnabled && (
            <p className="field-help">
              En esta preliminar puedes entrar con email. Google aún no está
              habilitado.
            </p>
          )}
          <div className="login-divider">
            <span />o con tu email
            <span />
          </div>
          <form className="form-stack" onSubmit={submit}>
            <label>
              Email
              <input
                disabled={!configured}
                required
                autoComplete="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Contraseña
              <input
                disabled={!configured}
                required
                minLength={8}
                autoComplete={signup ? "new-password" : "current-password"}
                type="password"
                placeholder="Al menos 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {error && (
              <p role="alert" className="form-error">
                {error}
              </p>
            )}
            {message && (
              <p role="status" className="form-success">
                {message}
              </p>
            )}
            <button className="button" disabled={!configured || busy}>
              {busy ? (
                <LoaderCircle className="spin" size={18} />
              ) : (
                <>
                  {signup ? "Crear mi cuenta" : "Entrar en mi espacio"}
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>
          <p className="signup-toggle">
            {signup ? "¿Ya tienes cuenta?" : "¿Es tu primera vez?"}{" "}
            <button
              onClick={() => {
                setSignup(!signup);
                setError("");
                setMessage("");
              }}
            >
              {signup ? "Inicia sesión" : "Crea tu cuenta"}
            </button>
          </p>
          <div className="login-privacy">
            <ShieldCheck size={16} />
            <span>Tus datos son privados. Tú decides qué compartir.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
function GoogleMark() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 48 48">
      <path
        fill="#4285F4"
        d="M43.6 24.5c0-1.4-.1-2.8-.4-4.2H24v8h11c-.5 2.6-2 4.8-4.3 6.3v5.2h7c4.1-3.8 6-9.3 6-15.3Z"
      />
      <path
        fill="#34A853"
        d="M24 44c5.5 0 10.1-1.8 13.5-5l-7-5.4c-1.8 1.2-4 1.9-6.5 1.9-5.3 0-9.8-3.6-11.4-8.4H5.4v5.5A20 20 0 0 0 24 44Z"
      />
      <path
        fill="#FBBC05"
        d="M12.6 27.1a12 12 0 0 1 0-6.2v-5.5H5.4a20 20 0 0 0 0 17.2l7.2-5.5Z"
      />
      <path
        fill="#EA4335"
        d="M24 12.5c3 0 5.6 1 7.7 3L37.5 10A19.7 19.7 0 0 0 24 4 20 20 0 0 0 5.4 15.4l7.2 5.5c1.6-4.8 6.1-8.4 11.4-8.4Z"
      />
    </svg>
  );
}
