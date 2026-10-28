"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  examStorageKey,
  readExamAttempts,
  type ExamAttempt,
  type AttemptPatch,
} from "@/lib/exam-attempts";

export function useExamAttempts(account: string) {
  const key = examStorageKey(account);
  const cache = useRef<ExamAttempt[]>([]);
  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const blocked = useRef(true);
  const dirty = useRef(new Set<string>());
  useEffect(() => {
    try {
      cache.current = readExamAttempts(localStorage.getItem(key) ?? "[]");
      setAttempts(cache.current);
      blocked.current = false;
    } catch {
      setError(
        "No se pudieron recuperar tus exámenes guardados. Recarga o comprueba el almacenamiento del navegador; no se sobrescribirán los datos existentes.",
      );
    }
    setReady(true);
  }, [key]);
  const commit = useCallback(
    (next: ExamAttempt[], changedIds: string[] = []) => {
      if (blocked.current) return false;
      changedIds.forEach((id) => dirty.current.add(id));
      cache.current = next;
      setAttempts(next);
      try {
        // Preserve attempts edited in another tab or another subject.
        const stored = readExamAttempts(localStorage.getItem(key) ?? "[]");
        const merged = new Map(stored.map((item) => [item.id, item]));
        next
          .filter((item) => dirty.current.has(item.id))
          .forEach((item) => merged.set(item.id, item));
        const saved = [...merged.values()];
        localStorage.setItem(key, JSON.stringify(saved));
        cache.current = saved;
        setAttempts(saved);
        dirty.current.clear();
        setError("");
        return true;
      } catch {
        setError(
          "No se han podido guardar los últimos cambios. No cierres este examen; habilita el almacenamiento o libera espacio y pulsa Reintentar guardado.",
        );
        return false;
      }
    },
    [key],
  );
  const add = useCallback(
    (attempt: ExamAttempt) => commit([...cache.current, attempt], [attempt.id]),
    [commit],
  );
  const update = useCallback(
    (id: string, patch: AttemptPatch) => {
      let changed = false;
      const next = cache.current.map((item) => {
        if (
          item.id !== id ||
          Object.entries(patch).every(
            ([field, value]) =>
              JSON.stringify(item[field as keyof ExamAttempt]) ===
              JSON.stringify(value),
          )
        )
          return item;
        changed = true;
        return {
          ...item,
          ...patch,
          completedAt:
            patch.status === "completed"
              ? (item.completedAt ?? new Date().toISOString())
              : item.completedAt,
          updatedAt: new Date().toISOString(),
        };
      });
      if (changed) commit(next, [id]);
    },
    [commit],
  );
  const retry = useCallback(() => commit(cache.current), [commit]);
  return {
    attempts,
    ready,
    error,
    add,
    update,
    retry,
    blocked: blocked.current,
  };
}

// Payload changes are saved immediately after the render, plus on page exit.
export function useSaveExamPayload(
  attemptId: string,
  patch: AttemptPatch,
  onUpdate: (patch: AttemptPatch) => void,
) {
  const latest = useRef(patch);
  latest.current = patch;
  const serialized = JSON.stringify(patch);
  useEffect(() => {
    onUpdate(latest.current);
  }, [attemptId, serialized, onUpdate]);
  useEffect(() => {
    const save = () => onUpdate(latest.current);
    window.addEventListener("pagehide", save);
    return () => {
      save();
      window.removeEventListener("pagehide", save);
    };
  }, [attemptId, onUpdate]);
}

// Training time pauses when leaving the activity or hiding the tab. Save exact ms.
export function useExamClock(
  attempt: ExamAttempt,
  finished: boolean,
  onUpdate: (patch: AttemptPatch) => void,
  onExpire: () => void,
) {
  const [remaining, setRemaining] = useState(
    attempt.remainingMs === null ? null : Math.ceil(attempt.remainingMs / 1000),
  );
  const callbacks = useRef({ onUpdate, onExpire });
  callbacks.current = { onUpdate, onExpire };
  const clock = useRef({
    left: attempt.remainingMs,
    activeSince: null as number | null,
  });
  useEffect(() => {
    if (finished || clock.current.left === null) return;
    clock.current.activeSince = document.hidden ? null : Date.now();
    let ticks = 0;
    function checkpoint(save: boolean, render = true) {
      const now = Date.now();
      if (clock.current.activeSince !== null) {
        clock.current.left = Math.max(
          0,
          clock.current.left! - Math.max(0, now - clock.current.activeSince),
        );
        clock.current.activeSince = now;
      }
      if (render) setRemaining(Math.ceil(clock.current.left! / 1000));
      if (save) callbacks.current.onUpdate({ remainingMs: clock.current.left });
      if (render && clock.current.left === 0) callbacks.current.onExpire();
    }
    function visibility() {
      checkpoint(true);
      clock.current.activeSince = document.hidden ? null : Date.now();
    }
    function pagehide() {
      checkpoint(true);
      clock.current.activeSince = null;
    }
    checkpoint(false);
    const interval = window.setInterval(
      () => checkpoint(++ticks % 5 === 0),
      1000,
    );
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("pagehide", pagehide);
    window.addEventListener("pageshow", visibility);
    return () => {
      checkpoint(true, false);
      clock.current.activeSince = null;
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("pagehide", pagehide);
      window.removeEventListener("pageshow", visibility);
    };
  }, [attempt.id, finished]);
  return remaining;
}
