export type Subject = {
  id: string;
  name: string;
  category: string;
  color: string;
  goal: number;
};
export type Task = {
  id: string;
  subjectId: string;
  title: string;
  date: string;
  minutes: number;
  done: boolean;
  kind: string;
};
export type Session = {
  id: string;
  subjectId: string;
  date: string;
  minutes: number;
};
export type Exam = {
  id: string;
  subjectId: string;
  date: string;
  title: string;
  confirmed: boolean;
};
export type Preferences = {
  dailyGoal: number;
  reminderTime: string;
  timezone: string;
  email: boolean;
  push: boolean;
};
export type StudyData = {
  subjects: Subject[];
  tasks: Task[];
  sessions: Session[];
  exams: Exam[];
  preferences: Preferences;
};
export const subjectDefinitions = [
  { name: "Derecho Civil I.1", category: "Derecho privado", color: "lavender" },
  {
    name: "Teoría del Derecho",
    category: "Fundamentos jurídicos",
    color: "mint",
  },
  {
    name: "Derecho Constitucional",
    category: "Derecho público",
    color: "peach",
  },
  {
    name: "Historia del Derecho Español",
    category: "Historia jurídica",
    color: "blue",
  },
  { name: "Derecho Procesal", category: "Derecho público", color: "pink" },
  {
    name: "Teoría del Estado Constitucional",
    category: "Derecho público",
    color: "yellow",
  },
  {
    name: "Fundamentos de la Democracia",
    category: "Ciencias políticas",
    color: "mint",
  },
  {
    name: "Derecho Civil I.2 Familia",
    category: "Derecho privado",
    color: "lavender",
  },
  {
    name: "Derecho Administrativo",
    category: "Derecho público",
    color: "blue",
  },
];
export const defaultPreferences: Preferences = {
  dailyGoal: 60,
  reminderTime: "09:00",
  timezone: "Atlantic/Canary",
  email: false,
  push: false,
};
export function dateKey(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function localDate(value: string): Date {
  return new Date(value + "T12:00:00");
}
export function addDays(value: string, days: number) {
  const d = localDate(value);
  d.setDate(d.getDate() + days);
  return dateKey(d);
}
export function validDate(value: string) {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(localDate(value).getTime()) &&
    dateKey(localDate(value)) === value
  );
}
export function validateTask(
  task: Pick<Task, "title" | "date" | "minutes" | "subjectId">,
  subjects: Subject[],
) {
  if (!task.title.trim() || task.title.trim().length > 160)
    throw new Error("Escribe un título de entre 1 y 160 caracteres.");
  if (!validDate(task.date)) throw new Error("Selecciona una fecha válida.");
  if (!Number.isInteger(task.minutes) || task.minutes < 5 || task.minutes > 480)
    throw new Error("La duración debe estar entre 5 y 480 minutos.");
  if (!subjects.some((s) => s.id === task.subjectId))
    throw new Error("Selecciona una asignatura.");
}
export function streak(sessions: Session[], today = dateKey()) {
  const days = new Set(
    sessions.filter((s) => s.minutes > 0).map((s) => s.date),
  );
  let day = days.has(today) ? today : addDays(today, -1);
  let count = 0;
  while (days.has(day)) {
    count++;
    day = addDays(day, -1);
  }
  return count;
}
export function weeklyMinutes(sessions: Session[], today = dateKey()) {
  return Array.from({ length: 7 }, (_, i) => {
    const date = addDays(today, i - 6);
    return {
      date,
      minutes: sessions
        .filter((s) => s.date === date)
        .reduce((a, s) => a + s.minutes, 0),
    };
  });
}
export function demoData(today = dateKey()): StudyData {
  const subjects = subjectDefinitions.map((s, i) => ({
    ...s,
    id: `demo-${i}`,
    goal: 600,
  }));
  return {
    subjects,
    tasks: [
      {
        id: "t1",
        subjectId: "demo-0",
        title: "Repasar la persona y la personalidad",
        date: today,
        minutes: 25,
        done: false,
        kind: "Repaso",
      },
      {
        id: "t2",
        subjectId: "demo-1",
        title: "Esquema: las fuentes del Derecho",
        date: today,
        minutes: 30,
        done: false,
        kind: "Esquema",
      },
      {
        id: "t3",
        subjectId: "demo-2",
        title: "Lectura del tema 2",
        date: today,
        minutes: 20,
        done: true,
        kind: "Lectura",
      },
      {
        id: "t4",
        subjectId: "demo-3",
        title: "Organizar apuntes de la semana",
        date: addDays(today, 1),
        minutes: 20,
        done: false,
        kind: "Lectura",
      },
    ],
    sessions: [
      { id: "s1", subjectId: "demo-0", date: addDays(today, -1), minutes: 45 },
      { id: "s2", subjectId: "demo-1", date: addDays(today, -2), minutes: 60 },
      { id: "s3", subjectId: "demo-2", date: addDays(today, -3), minutes: 30 },
      { id: "s4", subjectId: "demo-3", date: addDays(today, -5), minutes: 40 },
      { id: "s5", subjectId: "demo-2", date: today, minutes: 20 },
    ],
    exams: [],
    preferences: defaultPreferences,
  };
}
export function safeRedirect(value: string | null) {
  return value?.startsWith("/") &&
    !value.startsWith("//") &&
    !/[\u0000-\u0020\u007f\\]/.test(value)
    ? value
    : "/dashboard";
}
