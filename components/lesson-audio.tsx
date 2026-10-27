"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, Pause, Play, Square } from "lucide-react";
import { speechChunks } from "@/lib/lesson-speech";

type Status = "idle" | "reading" | "paused" | "finished";

export function LessonAudio({ text }: { text: string }) {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [part, setPart] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const generation = useRef(0);
  // Retain the utterance until its callbacks finish (required by some browsers).
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  const running = status === "reading" || status === "paused";

  useEffect(() => {
    const available =
      "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
    setSupported(available);
    if (!available) return;
    const synth = window.speechSynthesis;
    const update = () =>
      setVoices(synth.getVoices().filter((v) => /^es(?:-|$)/i.test(v.lang)));
    const cancel = () => {
      generation.current++;
      synth.cancel();
      utterance.current = null;
      setStatus("idle");
    };
    update();
    synth.addEventListener("voiceschanged", update);
    window.addEventListener("pagehide", cancel);
    return () => {
      cancel();
      synth.removeEventListener("voiceschanged", update);
      window.removeEventListener("pagehide", cancel);
    };
  }, []);

  function stop() {
    generation.current++;
    window.speechSynthesis.cancel();
    utterance.current = null;
    setStatus("idle");
    setPart(0);
    setError("");
  }

  function read() {
    if (!supported || !text.trim()) return;
    const synth = window.speechSynthesis;
    const chunks = speechChunks(text);
    const token = ++generation.current;
    synth.cancel();
    setError("");
    setTotal(chunks.length);
    setStatus("reading");
    const voice = voices.find((v) => v.lang === "es-ES") ?? voices[0];
    function speak(index: number) {
      if (token !== generation.current) return;
      if (index === chunks.length) {
        utterance.current = null;
        setStatus("finished");
        return;
      }
      const item = new SpeechSynthesisUtterance(chunks[index]);
      utterance.current = item;
      item.lang = voice?.lang ?? "es-ES";
      if (voice) item.voice = voice;
      item.rate = 1;
      item.onend = () => speak(index + 1);
      item.onerror = () => {
        if (token !== generation.current) return;
        generation.current++;
        utterance.current = null;
        synth.cancel();
        setStatus("idle");
        setError(
          "No se pudo reproducir la voz. Comprueba el sonido y las voces en español de tu dispositivo e inténtalo de nuevo.",
        );
      };
      setPart(index + 1);
      try {
        synth.speak(item);
      } catch {
        item.onerror?.(new Event("error") as SpeechSynthesisErrorEvent);
      }
    }
    speak(0);
  }

  const label =
    status === "reading"
      ? "Pausar lectura"
      : status === "paused"
        ? "Reanudar lectura"
        : status === "finished"
          ? "Volver a escuchar"
          : "Escuchar lección";
  return (
    <section className="lesson-audio-compact" aria-label="Lectura en voz alta">
      <button
        type="button"
        className="lesson-audio-icon"
        aria-label={label}
        title={
          supported === false
            ? "Lectura en voz alta no disponible en este navegador"
            : label
        }
        disabled={!supported || !text.trim()}
        onClick={() => {
          if (status === "reading") {
            window.speechSynthesis.pause();
            setStatus("paused");
          } else if (status === "paused") {
            window.speechSynthesis.resume();
            setStatus("reading");
          } else read();
        }}
      >
        {status === "reading" ? (
          <Pause size={24} aria-hidden="true" />
        ) : status === "paused" ? (
          <Play size={24} aria-hidden="true" />
        ) : (
          <Volume2 size={26} aria-hidden="true" />
        )}
      </button>
      {running && (
        <button
          type="button"
          className="lesson-audio-icon"
          aria-label="Detener lectura"
          title="Detener lectura"
          onClick={stop}
        >
          <Square size={20} aria-hidden="true" />
        </button>
      )}
      <span role="status" className="visually-hidden">
        {supported === false
          ? "Este navegador no permite leer en voz alta. Prueba con una versión reciente de Chrome, Edge o Safari."
          : status === "finished"
            ? "Lectura finalizada."
            : running
              ? `${status === "paused" ? "En pausa" : "Leyendo"} · Fragmento ${part} de ${total}`
              : "Lectura en voz alta disponible."}
      </span>
      {error && (
        <span className="audio-inline-error" role="alert">
          {error}
        </span>
      )}
    </section>
  );
}
