"use client";

import { useEffect, useState, type RefObject } from "react";

// Keep exact milliseconds across visits; round only when presenting minutes.
export function useLessonStudyTime(
  reader: RefObject<HTMLElement | null>,
  lessonId: string,
  accountId: string,
) {
  const [minutes, setMinutes] = useState(0);
  const [saveError, setSaveError] = useState(false);
  useEffect(() => {
    const element = reader.current;
    if (!element) return;
    const key = `uned-lesson-time-v1:${accountId}:${lessonId}`;
    let total = 0;
    let started = false;
    let activeSince: number | null = null;
    let focused = true;
    try {
      const value = Number(localStorage.getItem(key) ?? 0);
      if (Number.isFinite(value) && value >= 0) total = value;
      setMinutes(Math.floor(total / 60_000));
    } catch {
      setSaveError(true);
    }
    function checkpoint(update = true) {
      const now = Date.now();
      if (activeSince !== null) {
        total += Math.max(0, now - activeSince);
        activeSince = now;
      }
      if (started) {
        try {
          localStorage.setItem(key, String(total));
        } catch {
          if (update) setSaveError(true);
        }
      }
      if (update) setMinutes(Math.floor(total / 60_000));
    }
    function activity(event: Event) {
      if ((event.target as Element)?.closest?.("[data-study-time-ignore]"))
        return;
      started = true;
      if (!document.hidden && focused && activeSince === null)
        activeSince = Date.now();
    }
    function visibility() {
      checkpoint();
      activeSince = started && !document.hidden && focused ? Date.now() : null;
    }
    function blur() {
      focused = false;
      visibility();
    }
    function focus() {
      focused = true;
      visibility();
    }
    function pagehide() {
      checkpoint();
      activeSince = null;
    }
    const events = ["pointerdown", "keydown", "input", "wheel", "touchstart"];
    events.forEach((event) =>
      element.addEventListener(event, activity, {
        capture: true,
        passive: true,
      }),
    );
    const timer = window.setInterval(() => checkpoint(), 10_000);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("blur", blur);
    window.addEventListener("focus", focus);
    window.addEventListener("pagehide", pagehide);
    window.addEventListener("pageshow", visibility);
    return () => {
      checkpoint(false);
      window.clearInterval(timer);
      events.forEach((event) =>
        element.removeEventListener(event, activity, true),
      );
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("blur", blur);
      window.removeEventListener("focus", focus);
      window.removeEventListener("pagehide", pagehide);
      window.removeEventListener("pageshow", visibility);
    };
  }, [reader, lessonId, accountId]);
  return { minutes, saveError };
}
