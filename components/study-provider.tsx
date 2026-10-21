"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { browserClient } from "@/lib/supabase/client";
import {
  demoData,
  defaultPreferences,
  dateKey,
  validateTask,
  validDate,
  type StudyData,
  type Task,
  type Exam,
  type Preferences,
} from "@/lib/model";
type User = { id: string; email: string; name: string };
type StudyContext = {
  data: StudyData;
  user: User | null;
  ready: boolean;
  busy: boolean;
  error: string;
  notice: string;
  dismiss: () => void;
  retryLoad: () => void;
  addTask: (t: Omit<Task, "id" | "done">) => Promise<boolean>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  addExam: (e: Omit<Exam, "id">) => Promise<boolean>;
  deleteExam: (id: string) => Promise<void>;
  savePreferences: (p: Preferences) => Promise<boolean>;
  recordSession: (subjectId: string, minutes: number) => Promise<boolean>;
  resetData: () => Promise<void>;
  exportData: () => void;
  activeSession: {
    subjectId: string;
    startedAt: number;
    pausedAt: number | null;
    pausedMs: number;
  } | null;
  startSession: (subjectId: string) => void;
  pauseSession: () => void;
  finishSession: () => Promise<void>;
};
const Context = createContext<StudyContext | null>(null);
const storageKey = "uned-study-demo-v1";
const emptyData = (): StudyData => ({
  subjects: [],
  tasks: [],
  sessions: [],
  exams: [],
  preferences: defaultPreferences,
});
function readDemo(raw: string): StudyData {
  const d = JSON.parse(raw) as StudyData;
  if (
    !d ||
    !Array.isArray(d.subjects) ||
    !Array.isArray(d.tasks) ||
    !Array.isArray(d.sessions) ||
    !Array.isArray(d.exams) ||
    !d.preferences
  )
    throw new Error("Formato no válido");
  if (
    d.subjects.some(
      (s) =>
        !s ||
        typeof s.id !== "string" ||
        typeof s.name !== "string" ||
        !Number.isFinite(s.goal) ||
        s.goal <= 0,
    )
  )
    throw new Error("Asignaturas no válidas");
  d.tasks.forEach((t) => {
    validateTask(t, d.subjects);
    if (typeof t.done !== "boolean" || typeof t.id !== "string")
      throw new Error("Tarea no válida");
  });
  if (
    d.sessions.some(
      (s) =>
        !s ||
        !validDate(s.date) ||
        !Number.isInteger(s.minutes) ||
        s.minutes < 1 ||
        !d.subjects.some((x) => x.id === s.subjectId),
    )
  )
    throw new Error("Sesión no válida");
  if (
    d.exams.some(
      (e) =>
        !e ||
        !validDate(e.date) ||
        typeof e.title !== "string" ||
        typeof e.confirmed !== "boolean" ||
        !d.subjects.some((s) => s.id === e.subjectId),
    )
  )
    throw new Error("Fecha no válida");
  if (
    !Number.isInteger(d.preferences.dailyGoal) ||
    d.preferences.dailyGoal < 5 ||
    d.preferences.dailyGoal > 480 ||
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(d.preferences.reminderTime) ||
    !["Atlantic/Canary", "Europe/Madrid"].includes(d.preferences.timezone)
  )
    throw new Error("Preferencias no válidas");
  return d;
}
export function StudyProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  const [data, setData] = useState<StudyData>(() =>
    user ? emptyData() : demoData(),
  );
  const [ready, setReady] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [activeSession, setActiveSession] =
    useState<StudyContext["activeSession"]>(null);
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setReady(false);
      setError("");
      try {
        if (!user) {
          const raw = localStorage.getItem(storageKey);
          if (raw) setData(readDemo(raw));
        } else {
          const client = browserClient()!;
          const results = await Promise.all([
            client.from("subjects").select("*"),
            client.from("study_tasks").select("*"),
            client.from("study_sessions").select("*"),
            client.from("exam_dates").select("*"),
            client.from("notification_preferences").select("*").maybeSingle(),
          ]);
          const failed = results.find((r) => r.error);
          if (failed?.error)
            throw new Error(
              "No se pudieron cargar tus datos. Comprueba la conexión y las migraciones de Supabase.",
            );
          if (cancelled) return;
          const [s, t, se, e, p] = results;
          setData({
            subjects: (s.data ?? []).map((x) => ({
              id: x.id,
              name: x.name,
              category: x.category,
              color: x.color,
              goal: x.goal_minutes,
            })),
            tasks: (t.data ?? []).map((x) => ({
              id: x.id,
              subjectId: x.subject_id,
              title: x.title,
              date: x.scheduled_date,
              minutes: x.minutes,
              done: x.done,
              kind: x.kind,
            })),
            sessions: (se.data ?? []).map((x) => ({
              id: x.id,
              subjectId: x.subject_id,
              date: x.study_date,
              minutes: x.minutes,
            })),
            exams: (e.data ?? []).map((x) => ({
              id: x.id,
              subjectId: x.subject_id,
              date: x.exam_date,
              title: x.title,
              confirmed: x.confirmed,
            })),
            preferences: p.data
              ? {
                  dailyGoal: p.data.daily_goal,
                  reminderTime: p.data.reminder_time.slice(0, 5),
                  timezone: p.data.timezone,
                  email: p.data.email_requested,
                  push: p.data.push_requested,
                }
              : defaultPreferences,
          });
        }
        if (!cancelled) setReady(true);
      } catch (e) {
        if (!cancelled)
          setError(
            e instanceof Error ? e.message : "No se pudieron cargar los datos.",
          );
        if (!user && !cancelled) setReady(true);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [user, loadAttempt]);
  useEffect(() => {
    if (ready && !user) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(data));
      } catch {
        setError(
          "El navegador no permite guardar la demo. Exporta tus datos antes de salir.",
        );
      }
    }
  }, [data, ready, user]);
  const run = useCallback(
    async (fn: () => Promise<void>) => {
      if (!ready || lock.current) return false;
      lock.current = true;
      setBusy(true);
      setError("");
      try {
        await fn();
        return true;
      } catch (e) {
        setError(
          e instanceof Error
            ? e.message
            : "No se pudo guardar. Inténtalo de nuevo.",
        );
        return false;
      } finally {
        lock.current = false;
        setBusy(false);
      }
    },
    [ready],
  );
  async function addTask(input: Omit<Task, "id" | "done">) {
    return run(async () => {
      validateTask(input, data.subjects);
      const task = {
        ...input,
        title: input.title.trim(),
        id: crypto.randomUUID(),
        done: false,
      };
      if (user) {
        const { error } = await browserClient()!.from("study_tasks").insert({
          id: task.id,
          user_id: user.id,
          subject_id: task.subjectId,
          title: task.title,
          scheduled_date: task.date,
          minutes: task.minutes,
          done: false,
          kind: task.kind,
        });
        if (error) throw new Error("No se pudo guardar la tarea.");
      }
      setData((d) => ({ ...d, tasks: [...d.tasks, task] }));
      setNotice("Tarea añadida a tu plan.");
    });
  }
  async function toggleTask(id: string) {
    await run(async () => {
      const task = data.tasks.find((t) => t.id === id);
      if (!task) return;
      const done = !task.done;
      if (user) {
        const { error } = await browserClient()!
          .from("study_tasks")
          .update({ done })
          .eq("id", id)
          .eq("user_id", user.id);
        if (error) throw new Error("No se pudo actualizar la tarea.");
      }
      setData((d) => ({
        ...d,
        tasks: d.tasks.map((t) => (t.id === id ? { ...t, done } : t)),
      }));
    });
  }
  async function deleteTask(id: string) {
    await run(async () => {
      if (user) {
        const { error } = await browserClient()!
          .from("study_tasks")
          .delete()
          .eq("id", id)
          .eq("user_id", user.id);
        if (error) throw new Error("No se pudo borrar.");
      }
      setData((d) => ({ ...d, tasks: d.tasks.filter((t) => t.id !== id) }));
    });
  }
  async function addExam(input: Omit<Exam, "id">) {
    return run(async () => {
      if (
        !validDate(input.date) ||
        !input.title.trim() ||
        input.title.length > 160 ||
        !input.confirmed ||
        !data.subjects.some((s) => s.id === input.subjectId)
      )
        throw new Error(
          "Indica la asignatura, un título y una fecha confirmada por ti.",
        );
      const exam = {
        ...input,
        title: input.title.trim(),
        id: crypto.randomUUID(),
      };
      if (user) {
        const { error } = await browserClient()!.from("exam_dates").insert({
          id: exam.id,
          user_id: user.id,
          subject_id: exam.subjectId,
          title: exam.title,
          exam_date: exam.date,
          confirmed: true,
        });
        if (error) throw new Error("No se pudo guardar la fecha.");
      }
      setData((d) => ({ ...d, exams: [...d.exams, exam] }));
      setNotice("Fecha confirmada y guardada.");
    });
  }
  async function deleteExam(id: string) {
    await run(async () => {
      if (user) {
        const { error } = await browserClient()!
          .from("exam_dates")
          .delete()
          .eq("id", id)
          .eq("user_id", user.id);
        if (error) throw new Error("No se pudo borrar la fecha.");
      }
      setData((d) => ({ ...d, exams: d.exams.filter((e) => e.id !== id) }));
    });
  }
  async function savePreferences(p: Preferences) {
    return run(async () => {
      if (
        !Number.isInteger(p.dailyGoal) ||
        p.dailyGoal < 5 ||
        p.dailyGoal > 480 ||
        !/^([01]\d|2[0-3]):[0-5]\d$/.test(p.reminderTime) ||
        !["Atlantic/Canary", "Europe/Madrid"].includes(p.timezone)
      )
        throw new Error("Revisa el objetivo, la hora y la zona horaria.");
      if (user) {
        const { error } = await browserClient()!
          .from("notification_preferences")
          .upsert({
            user_id: user.id,
            daily_goal: p.dailyGoal,
            reminder_time: p.reminderTime,
            timezone: p.timezone,
            email_requested: p.email,
            push_requested: p.push,
          });
        if (error) throw new Error("No se pudieron guardar las preferencias.");
      }
      setData((d) => ({ ...d, preferences: p }));
      setNotice("Preferencias guardadas. Los envíos aún no están habilitados.");
    });
  }
  async function recordSession(subjectId: string, minutes: number) {
    return run(async () => {
      if (
        !data.subjects.some((s) => s.id === subjectId) ||
        !Number.isInteger(minutes) ||
        minutes < 1 ||
        minutes > 480
      )
        throw new Error("Registra entre 1 y 480 minutos en una asignatura.");
      const session = {
        id: crypto.randomUUID(),
        subjectId,
        minutes,
        date: dateKey(),
      };
      if (user) {
        const { error } = await browserClient()!.from("study_sessions").insert({
          id: session.id,
          user_id: user.id,
          subject_id: subjectId,
          minutes,
          study_date: session.date,
        });
        if (error) throw new Error("No se pudo guardar la sesión.");
      }
      setData((d) => ({ ...d, sessions: [...d.sessions, session] }));
      setNotice(`${minutes} minutos de estudio registrados.`);
    });
  }
  async function resetData() {
    await run(async () => {
      if (user) {
        const { error } = await browserClient()!.rpc("delete_study_data");
        if (error) throw new Error("No se pudieron borrar los datos.");
        setData((d) => ({
          ...d,
          tasks: [],
          sessions: [],
          exams: [],
          preferences: defaultPreferences,
        }));
      } else {
        setData({ ...demoData(), tasks: [], sessions: [], exams: [] });
      }
      setActiveSession(null);
      setNotice(
        "Datos de estudio borrados. Se mantienen las asignaturas y la cuenta.",
      );
    });
  }
  function exportData() {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            exportedAt: new Date().toISOString(),
            mode: user ? "account" : "demo",
            ...data,
          },
          null,
          2,
        ),
      ],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `uned-estudio-${dateKey()}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function startSession(subjectId: string) {
    if (activeSession) {
      setNotice(
        "Ya tienes una sesión en marcha. Termínala antes de iniciar otra.",
      );
      return;
    }
    setActiveSession({
      subjectId,
      startedAt: Date.now(),
      pausedAt: null,
      pausedMs: 0,
    });
  }
  function pauseSession() {
    setActiveSession((s) =>
      s
        ? s.pausedAt
          ? {
              ...s,
              pausedAt: null,
              pausedMs: s.pausedMs + Date.now() - s.pausedAt,
            }
          : { ...s, pausedAt: Date.now() }
        : null,
    );
  }
  async function finishSession() {
    if (!activeSession) return;
    const minutes = Math.floor(
      ((activeSession.pausedAt ?? Date.now()) -
        activeSession.startedAt -
        activeSession.pausedMs) /
        60000,
    );
    if (minutes < 1) {
      setActiveSession(null);
      setNotice(
        "Sesión finalizada. Estudia al menos un minuto para registrar tiempo.",
      );
      return;
    }
    const ok = await recordSession(
      activeSession.subjectId,
      Math.min(minutes, 480),
    );
    if (ok) setActiveSession(null);
  }
  const dismiss = useCallback(() => {
    setError("");
    setNotice("");
  }, []);
  return (
    <Context.Provider
      value={{
        data,
        user,
        ready,
        busy,
        error,
        notice,
        dismiss,
        retryLoad: () => setLoadAttempt((n) => n + 1),
        addTask,
        toggleTask,
        deleteTask,
        addExam,
        deleteExam,
        savePreferences,
        recordSession,
        resetData,
        exportData,
        activeSession,
        startSession,
        pauseSession,
        finishSession,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useStudy() {
  const c = useContext(Context);
  if (!c) throw new Error("StudyProvider missing");
  return c;
}
