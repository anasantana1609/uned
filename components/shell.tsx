"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BookOpen,
  LayoutDashboard,
  LibraryBig,
  ClipboardCheck,
  UserRound,
  GraduationCap,
  ArrowUpRight,
  Pause,
  Play,
  Square,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useStudy, type StudyMode } from "./study-provider";

const titles: Record<string, string> = {
  "/dashboard": "Panel",
  "/asignaturas": "Asignaturas",
  "/calendario": "Plan de estudio",
  "/progreso": "Mi progreso",
  "/fuentes": "Mis documentos",
  "/ajustes": "Perfil",
};
export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname().replace(/\/$/, "") || "/dashboard";
  const {
    data,
    user,
    ready,
    error,
    notice,
    dismiss,
    retryLoad,
    activeSession,
    pauseSession,
    finishSession,
    busy,
    studySelection,
    setStudySelection,
    studyMode,
    setStudyMode,
  } = useStudy();
  const [now, setNow] = useState(0);
  useEffect(() => {
    if (!activeSession) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [activeSession]);
  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(dismiss, 6000);
    return () => clearTimeout(id);
  }, [notice, dismiss]);
  function panel() {
    setStudySelection(null);
    setStudyMode(null);
  }
  function activity(mode: StudyMode) {
    setStudyMode(mode);
    setStudySelection((previous) => (previous ? { ...previous, mode } : null));
  }
  const activeMode =
    path === "/dashboard" ? (studySelection?.mode ?? studyMode) : null;
  const elapsed = activeSession
    ? Math.max(
        0,
        Math.floor(
          ((activeSession.pausedAt ?? (now || activeSession.startedAt)) -
            activeSession.startedAt -
            activeSession.pausedMs) /
            1000,
        ),
      )
    : 0;
  const items = [
    {
      label: "Panel",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: path === "/dashboard" && !activeMode,
      onClick: panel,
    },
    {
      label: "Asignaturas",
      href: "/asignaturas",
      icon: LibraryBig,
      active: path === "/asignaturas",
    },
    {
      label: "Lecciones",
      href: "/dashboard",
      icon: BookOpen,
      active: activeMode === "lessons",
      onClick: () => activity("lessons"),
    },
    {
      label: "Examen",
      href: "/dashboard",
      icon: ClipboardCheck,
      active: activeMode === "exams",
      onClick: () => activity("exams"),
      cta: true,
    },
    {
      label: "Perfil",
      href: "/ajustes",
      icon: UserRound,
      active: path === "/ajustes",
    },
  ];
  return (
    <div className="app-shell uned-app">
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <div className="app-body">
        <header className="topbar institutional-header">
          <Link
            href="/dashboard"
            className="institutional-brand"
            onClick={panel}
            aria-label="UNED Study AI · Panel"
          >
            <span className="institutional-mark">
              <BookOpen size={25} aria-hidden="true" />
            </span>
            <span>
              <strong>UNED</strong>
              <small>STUDY AI</small>
            </span>
          </Link>
          <div className="institutional-page">
            <span>{titles[path] ?? "Mi estudio"}</span>
            <GraduationCap size={23} aria-hidden="true" />
          </div>
        </header>
        {!user && (
          <div className="demo-banner institutional-demo">
            <span>Espacio de demostración</span>
            <Link href="/login">
              Acceder a mi cuenta <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        )}
        <main
          id="main"
          className={`main-content ${path === "/dashboard" ? "home-content" : ""}`}
        >
          {!ready && (
            <p className="loading-state" role="status">
              Preparando tu espacio…
            </p>
          )}
          {!ready && error && (
            <div className="inline-note">
              <p>No se pudo cargar tu espacio.</p>
              <button className="button secondary small" onClick={retryLoad}>
                Reintentar carga
              </button>
            </div>
          )}
          {ready ? children : null}
        </main>
        <footer className="app-footer">
          <span>UNED Study AI</span>
          <span>Proyecto independiente, no oficial</span>
        </footer>
      </div>
      <nav className="bottom-navigation" aria-label="Navegación principal">
        {items.map(({ label, href, icon: Icon, active, onClick, cta }) => (
          <Link
            key={label}
            href={href}
            onClick={onClick}
            aria-current={active ? "page" : undefined}
            className={`bottom-nav-item ${active ? "active" : ""} ${cta ? "exam-cta" : ""}`}
          >
            <span className="bottom-nav-icon">
              <Icon size={25} aria-hidden="true" />
            </span>
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      {(error || notice) && (
        <div
          className={`toast ${error ? "error" : ""}`}
          role={error ? "alert" : "status"}
        >
          {error ? <AlertCircle size={19} /> : <CheckCircle2 size={19} />}
          <span>{error || notice}</span>
          <button
            className="icon-button"
            onClick={dismiss}
            aria-label="Cerrar aviso"
          >
            <X size={16} />
          </button>
        </div>
      )}
      {activeSession && (
        <div className="session-bar">
          <span className="session-pulse" />
          <div>
            <strong>
              {
                data.subjects.find((s) => s.id === activeSession.subjectId)
                  ?.name
              }
            </strong>
            <small>
              {activeSession.pausedAt
                ? "Sesión en pausa"
                : "Tiempo para concentrarte"}
            </small>
          </div>
          <b className="session-clock">
            {String(Math.floor(elapsed / 60)).padStart(2, "0")}:
            {String(elapsed % 60).padStart(2, "0")}
          </b>
          <button
            className="icon-button"
            onClick={pauseSession}
            aria-label={
              activeSession.pausedAt ? "Reanudar sesión" : "Pausar sesión"
            }
          >
            {activeSession.pausedAt ? <Play size={19} /> : <Pause size={19} />}
          </button>
          <button
            className="button small"
            disabled={busy}
            onClick={() => void finishSession()}
          >
            <Square size={13} />
            Terminar
          </button>
        </div>
      )}
    </div>
  );
}
