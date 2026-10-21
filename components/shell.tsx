"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
  BookOpen,
  LayoutDashboard,
  CalendarDays,
  ChartNoAxesCombined,
  FolderOpen,
  Settings2,
  ArrowUpRight,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Pause,
  Play,
  Square,
  GraduationCap,
  CircleHelp,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useStudy } from "./study-provider";
import { Modal } from "./ui";
import { SignOutButton } from "./sign-out-button";
const links = [
  { href: "/dashboard", label: "Mi resumen", icon: LayoutDashboard },
  { href: "/asignaturas", label: "Asignaturas", icon: BookOpen },
  { href: "/calendario", label: "Plan de estudio", icon: CalendarDays },
  { href: "/progreso", label: "Mi progreso", icon: ChartNoAxesCombined },
];
const titles: Record<string, string> = {
  "/dashboard": "Mi resumen",
  "/asignaturas": "Asignaturas",
  "/calendario": "Plan de estudio",
  "/progreso": "Mi progreso",
  "/fuentes": "Mis documentos",
  "/ajustes": "Ajustes",
};
export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const path = pathname.replace(/\/$/, "") || "/dashboard";
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const [help, setHelp] = useState(false);
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
  } = useStudy();
  const [now, setNow] = useState(0);
  useEffect(() => {
    const m = window.matchMedia("(max-width:700px)");
    const change = () => setMobile(m.matches);
    change();
    m.addEventListener("change", change);
    return () => m.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    if (!mobile || !open) return;
    const previous = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const el = sidebarRef.current;
    el?.querySelector<HTMLElement>(".mobile-close")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab") {
        const items = Array.from(
          el?.querySelectorAll<HTMLElement>("a[href],button") ?? [],
        ).filter((x) => x.offsetParent !== null);
        const first = items[0],
          last = items.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, [open, mobile]);
  useEffect(() => {
    if (!activeSession) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [activeSession]);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(dismiss, 6000);
    return () => clearTimeout(id);
  }, [notice, dismiss]);
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
  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      {open && (
        <button
          className="sidebar-backdrop"
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        ref={sidebarRef}
        id="navigation-sidebar"
        inert={mobile && !open}
        aria-hidden={mobile && !open}
        className={`sidebar ${open ? "open" : ""}`}
      >
        <Link href="/dashboard" className="brand">
          <span className="brand-mark">
            <BookOpen size={23} />
          </span>
          <span>
            uned<span className="brand-dot">.</span>
            <small>STUDY AI</small>
          </span>
        </Link>
        <button
          className="icon-button mobile-close"
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
        >
          <X />
        </button>
        <div className="workspace-label">TU ESPACIO DE ESTUDIO</div>
        <nav aria-label="Navegación principal">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`nav-item ${path === href ? "active" : ""}`}
            >
              <Icon size={19} />
              {label}
              {path === href && <span className="nav-dot" />}
            </Link>
          ))}
        </nav>
        <div className="workspace-label library-label">TU BIBLIOTECA</div>
        <nav aria-label="Biblioteca">
          <Link
            className={`nav-item ${path === "/fuentes" ? "active" : ""}`}
            href="/fuentes"
          >
            <FolderOpen size={19} />
            Mis documentos<span className="small-soon">PRONTO</span>
          </Link>
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-note">
            <span className="little-spark">
              <Sparkles size={18} />
            </span>
            <h3>
              Un poco cada día.
              <br />
              Un gran paso para ti.
            </h3>
            <p>
              Tu constancia construye
              <br />
              tu próximo logro.
            </p>
            <Link href="/calendario">
              Organizar mi semana <ArrowUpRight size={15} />
            </Link>
            <span className="note-orbit" />
          </div>
          <Link
            className={`nav-item ${path === "/ajustes" ? "active" : ""}`}
            href="/ajustes"
          >
            <Settings2 size={19} />
            Ajustes
          </Link>
          <button
            className="nav-item help-button"
            onClick={() => setHelp(true)}
          >
            <CircleHelp size={19} />
            Cómo funciona
          </button>
          <div className="sidebar-profile">
            <span className="avatar">
              {user ? (user.name || user.email).slice(0, 1).toUpperCase() : "E"}
            </span>
            <div>
              <strong>
                {user ? user.name || "Mi cuenta" : "Estudiante UNED"}
              </strong>
              <small>
                {user ? "Cuenta personal" : "Espacio de demostración"}
              </small>
            </div>
            {user ? (
              <SignOutButton iconOnly />
            ) : (
              <Link href="/login" aria-label="Acceder a mi cuenta">
                <ChevronRight size={18} />
              </Link>
            )}
          </div>
        </div>
      </aside>
      <div className="app-body">
        <header className="topbar">
          <div className="breadcrumb">
            <button
              className="icon-button mobile-menu"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={open}
              aria-controls="navigation-sidebar"
            >
              <Menu size={22} />
            </button>
            <span>Mi espacio</span>
            <ChevronRight size={14} />
            <strong>{titles[path] ?? "UNED Study AI"}</strong>
          </div>
          <div className="topbar-right">
            <span className="private-label">
              <span className="status-dot" />
              {user ? "Espacio privado" : "Modo demo"}
            </span>
            <span className="topbar-divider" />
            <span className="topbar-avatar">
              <GraduationCap size={19} />
            </span>
          </div>
        </header>
        {!user && (
          <div className="demo-banner">
            <span>
              <Sparkles size={14} />
              <strong>Estás explorando la demo.</strong>
              <span>
                {" "}
                Los datos de ejemplo se guardan solo en este navegador.
              </span>
            </span>
            <Link href="/login">
              Conectar mi cuenta <ArrowUpRight size={14} />
            </Link>
          </div>
        )}
        <main id="main" className="main-content">
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
          <span>Hecho para aprender, a tu ritmo.</span>
          <span>
            UNED Study AI <span className="footer-dot">·</span> Proyecto
            independiente, no oficial
          </span>
        </footer>
      </div>
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
      {help && (
        <Modal title="Tu estudio, paso a paso" onClose={() => setHelp(false)}>
          <ol className="help-list">
            <li>Organiza tus tareas por asignatura y fecha.</li>
            <li>Inicia una sesión para registrar tiempo real de estudio.</li>
            <li>Consulta tus avances y confirma tus fechas de examen.</li>
          </ol>
          <p className="muted">
            Las asignaturas y contenidos de la demo son ejemplos pendientes de
            validación académica. Drive, el tutor IA y las notificaciones reales
            estarán disponibles en próximas entregas.
          </p>
          <button className="button" onClick={() => setHelp(false)}>
            Entendido
          </button>
        </Modal>
      )}
    </div>
  );
}
