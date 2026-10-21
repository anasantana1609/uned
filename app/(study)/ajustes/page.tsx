"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bell,
  Clock3,
  Download,
  ShieldCheck,
  Trash2,
  UserRound,
  Save,
  ArrowUpRight,
  Mail,
  Globe2,
} from "lucide-react";
import { useStudy } from "@/components/study-provider";
import { PageHeading, Modal } from "@/components/ui";
export default function Settings() {
  const { data, user, savePreferences, busy, ready, resetData, exportData } =
    useStudy();
  const [p, setP] = useState(data.preferences);
  const [deleting, setDeleting] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  useEffect(() => setP(data.preferences), [data.preferences]);
  return (
    <>
      <PageHeading
        eyebrow="UN ESPACIO A TU MEDIDA"
        title="Tu estudio. Tus preferencias."
        description="Ajusta tus objetivos y decide cómo quieres organizarte."
      />
      <div className="settings-layout">
        <div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await savePreferences(p);
            }}
          >
            <section className="card settings-card">
              <div className="settings-heading">
                <span className="stat-icon mint">
                  <Clock3 size={20} />
                </span>
                <div>
                  <h2>Tu ritmo de estudio</h2>
                  <p>Un objetivo realista es un buen comienzo.</p>
                </div>
              </div>
              <label className="form-label">
                Objetivo diario (minutos)
                <input
                  type="number"
                  required
                  min={5}
                  max={480}
                  value={p.dailyGoal}
                  onChange={(e) =>
                    setP({ ...p, dailyGoal: Number(e.target.value) })
                  }
                />
              </label>
              <p className="field-help">
                Entre 5 y 480 minutos. Puedes cambiarlo cuando lo necesites.
              </p>
            </section>
            <section className="card settings-card">
              <div className="settings-heading">
                <span className="stat-icon lavender">
                  <Bell size={20} />
                </span>
                <div>
                  <h2>Un pequeño recordatorio</h2>
                  <p>Todos los días, a la hora que tú elijas.</p>
                </div>
                <span className="pill">SIN ENVÍOS ACTIVOS</span>
              </div>
              <div className="form-grid">
                <label className="form-label">
                  Hora preferida
                  <input
                    type="time"
                    required
                    value={p.reminderTime}
                    onChange={(e) =>
                      setP({ ...p, reminderTime: e.target.value })
                    }
                  />
                </label>
                <label className="form-label">
                  Zona horaria
                  <select
                    value={p.timezone}
                    onChange={(e) => setP({ ...p, timezone: e.target.value })}
                  >
                    <option value="Atlantic/Canary">Islas Canarias</option>
                    <option value="Europe/Madrid">Madrid</option>
                  </select>
                </label>
              </div>
              <p className="field-help">
                <Globe2 size={13} />
                La zona elegida define la hora local, incluido el cambio de
                horario.
              </p>
              <label className="toggle-row">
                <span>
                  <Mail size={18} />
                  <span>
                    <strong>Email</strong>
                    <small>Guardar interés en recibir recordatorios</small>
                  </span>
                </span>
                <input
                  type="checkbox"
                  role="switch"
                  checked={p.email}
                  onChange={(e) => setP({ ...p, email: e.target.checked })}
                />
              </label>
              <label className="toggle-row">
                <span>
                  <Bell size={18} />
                  <span>
                    <strong>Notificaciones del navegador</strong>
                    <small>Guardar interés en notificaciones push</small>
                  </span>
                </span>
                <input
                  type="checkbox"
                  role="switch"
                  checked={p.push}
                  onChange={(e) => setP({ ...p, push: e.target.checked })}
                />
              </label>
              <div className="inline-note">
                <Bell size={17} />
                <span>
                  Solo se guardan tus preferencias. No se envían correos ni
                  notificaciones. Se necesitarán permisos y la configuración del
                  servicio antes de activarlos.
                </span>
              </div>
            </section>
            <button className="button save-settings" disabled={busy || !ready}>
              <Save size={17} />
              {busy ? "Guardando…" : "Guardar preferencias"}
            </button>
          </form>
        </div>
        <aside>
          <section className="card settings-card">
            <div className="settings-heading">
              <span className="stat-icon peach">
                <UserRound size={20} />
              </span>
              <div>
                <h2>Tu cuenta</h2>
                <p>{user ? "Espacio personal" : "Modo demostración"}</p>
              </div>
            </div>
            {user ? (
              <>
                <strong className="account-email">{user.email}</strong>
                <p className="muted">
                  Tus datos se guardan en tu cuenta con acceso restringido por
                  usuario.
                </p>
                <form action="/auth/signout" method="post">
                  <button className="button secondary">Cerrar sesión</button>
                </form>
              </>
            ) : (
              <>
                <p className="muted">
                  La demo guarda datos de ejemplo en este navegador. Accede para
                  tener un espacio personal; los datos de la demo no se
                  transfieren a tu cuenta.
                </p>
                <Link href="/login" className="button secondary">
                  Acceder a mi cuenta
                  <ArrowUpRight size={16} />
                </Link>
              </>
            )}
          </section>
          <section className="card settings-card">
            <div className="settings-heading">
              <span className="stat-icon blue">
                <ShieldCheck size={20} />
              </span>
              <div>
                <h2>Tú controlas tus datos</h2>
                <p>Tu espacio, tus decisiones.</p>
              </div>
            </div>
            <button
              className="settings-action"
              disabled={!ready}
              onClick={exportData}
            >
              <Download size={17} />
              Exportar datos de estudio
              <ArrowUpRight size={15} />
            </button>
            <button
              className="settings-action danger"
              disabled={!ready}
              onClick={() => {
                setDeleting(true);
                setConfirmation("");
              }}
            >
              <Trash2 size={17} />
              Borrar datos de estudio
            </button>
            <p className="field-help">
              La exportación incluye tareas, sesiones, fechas, asignaturas y
              preferencias. El borrado conserva tu cuenta y las asignaturas.
            </p>
          </section>
        </aside>
      </div>
      {deleting && (
        <Modal
          title="¿Borrar tus datos de estudio?"
          onClose={() => setDeleting(false)}
        >
          <p className="muted">
            Se borrarán tus tareas, sesiones, fechas y preferencias. Esta acción
            no se puede deshacer. Puedes exportar tus datos antes de continuar.
          </p>
          <form
            className="form-stack"
            onSubmit={async (e) => {
              e.preventDefault();
              if (confirmation === "BORRAR") {
                await resetData();
                setDeleting(false);
              }
            }}
          >
            <label>
              Escribe BORRAR para confirmar
              <input
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                autoComplete="off"
                required
                pattern="BORRAR"
              />
            </label>
            <button
              className="button danger-button"
              disabled={busy || confirmation !== "BORRAR"}
            >
              Borrar datos de estudio
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
