"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Volume2, Pause, Play, Square } from "lucide-react";
import { speechChunks } from "@/lib/lesson-speech";

type Status = "idle" | "reading" | "paused" | "finished";

export function LessonAudio({ text }: { text: string }) {
  const id = useId();
  const [supported, setSupported] = useState<boolean | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState("");
  const [rate, setRate] = useState("1");
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
    const voice =
      voices.find((v) => v.voiceURI === voiceURI) ??
      voices.find((v) => v.lang === "es-ES") ??
      voices[0];
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
      item.rate = Number(rate);
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

  return (
    <section className="lesson-audio" aria-labelledby={`${id}-heading`}>
      <h3 id={`${id}-heading`}>
        <Volume2 size={18} aria-hidden="true" /> Lectura en voz alta
      </h3>
      <p className="muted">
        Escucha la explicación, el ejemplo y la práctica de esta lección.
      </p>
      <div className="lesson-options">
        <label htmlFor={`${id}-voice`}>
          Voz en español
          <select
            id={`${id}-voice`}
            value={voiceURI}
            disabled={running || !supported}
            onChange={(e) => setVoiceURI(e.target.value)}
          >
            <option value="">Automática (español)</option>
            {voices.map((v) => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
        </label>
        <label htmlFor={`${id}-rate`}>
          Velocidad
          <select
            id={`${id}-rate`}
            value={rate}
            disabled={running || !supported}
            onChange={(e) => setRate(e.target.value)}
          >
            {["0.75", "1", "1.25", "1.5", "2"].map((r) => (
              <option key={r} value={r}>
                {r.replace(".", ",")}×
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="detail-actions">
        {!running ? (
          <button
            className="button"
            disabled={!supported || !text.trim()}
            onClick={read}
          >
            <Volume2 size={16} aria-hidden="true" />
            {status === "finished" ? "Volver a escuchar" : "Escuchar lección"}
          </button>
        ) : (
          <>
            <button
              className="button"
              onClick={() => {
                if (status === "paused") {
                  window.speechSynthesis.resume();
                  setStatus("reading");
                } else {
                  window.speechSynthesis.pause();
                  setStatus("paused");
                }
              }}
            >
              {status === "paused" ? (
                <Play size={16} aria-hidden="true" />
              ) : (
                <Pause size={16} aria-hidden="true" />
              )}
              {status === "paused" ? "Reanudar lectura" : "Pausar lectura"}
            </button>
            <button className="button secondary" onClick={stop}>
              <Square size={16} aria-hidden="true" />
              Detener lectura
            </button>
          </>
        )}
      </div>
      <p role="status" className="muted">
        {supported === false
          ? "Este navegador no permite leer en voz alta. Prueba con una versión reciente de Chrome, Edge o Safari."
          : status === "finished"
            ? "Lectura finalizada."
            : running
              ? `${status === "paused" ? "En pausa" : "Leyendo"} · Fragmento ${part} de ${total}`
              : "La lectura comienza cuando pulses Escuchar lección."}
      </p>
      {error && <p role="alert">{error}</p>}
      <p className="footnote">
        Las voces dependen del navegador y del dispositivo. Algunas necesitan
        conexión a Internet.
      </p>
    </section>
  );
}
