"use client";
import { useEffect, useId, useRef, useState } from "react";
import { Mic, Square } from "lucide-react";

type RecognitionResult = {
  isFinal: boolean;
  [index: number]: { transcript: string };
};
type RecognitionEvent = { results: ArrayLike<RecognitionResult> };
type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
};
type RecognitionConstructor = new () => Recognition;
function recognitionConstructor(): RecognitionConstructor | undefined {
  const browser = window as typeof window & {
    SpeechRecognition?: RecognitionConstructor;
    webkitSpeechRecognition?: RecognitionConstructor;
  };
  return browser.SpeechRecognition ?? browser.webkitSpeechRecognition;
}
const dictationStarted = "uned-dictation-started";

export function DictatedAnswer({
  id,
  label,
  value,
  onChange,
  disabled = false,
  rows = 7,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (text: string) => void;
  disabled?: boolean;
  rows?: number;
}) {
  const owner = useId();
  const [supported, setSupported] = useState<boolean | null>(null);
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const recognition = useRef<Recognition | null>(null);
  const generation = useRef(0);
  const latest = useRef({ value, onChange, disabled });
  latest.current = { value, onChange, disabled };

  function release() {
    generation.current++;
    const previous = recognition.current;
    recognition.current = null;
    try {
      previous?.abort();
    } catch {
      /* Already stopped by the browser. */
    }
  }
  useEffect(() => {
    setSupported(
      typeof recognitionConstructor() === "function" &&
        window.isSecureContext !== false,
    );
    const stop = () => {
      release();
      setListening(false);
      setMessage("Dictado detenido. Puedes revisar el texto.");
    };
    const pageChanged = () => {
      if (recognition.current) stop();
    };
    const otherStarted = (event: Event) => {
      if (
        (event as CustomEvent<string>).detail !== owner &&
        recognition.current
      )
        stop();
    };
    window.addEventListener(dictationStarted, otherStarted);
    window.addEventListener("pagehide", stop);
    window.addEventListener("uned-exam-page-change", pageChanged);
    return () => {
      window.removeEventListener(dictationStarted, otherStarted);
      window.removeEventListener("pagehide", stop);
      window.removeEventListener("uned-exam-page-change", pageChanged);
      release();
    };
  }, [owner]);
  useEffect(() => {
    if (disabled) {
      release();
      setListening(false);
      setMessage("");
    }
  }, [disabled]);

  function toggle() {
    if (recognition.current) {
      setMessage("Terminando el dictado…");
      try {
        recognition.current.stop();
      } catch {
        release();
        setListening(false);
        setMessage("Dictado detenido. Puedes revisar el texto.");
      }
      return;
    }
    const Constructor = recognitionConstructor();
    if (!Constructor || disabled || !supported) return;
    window.dispatchEvent(new CustomEvent(dictationStarted, { detail: owner }));
    const token = ++generation.current;
    const baseline = latest.current.value;
    setError("");
    setMessage("Escuchando… Habla en español.");
    setListening(true);
    try {
      const engine = new Constructor();
      recognition.current = engine;
      engine.lang = "es-ES";
      engine.continuous = true;
      engine.interimResults = true;
      engine.onresult = (event) => {
        if (generation.current !== token || latest.current.disabled) return;
        // Results contain the whole session, including changing interim results.
        // Rebuild from the initial text so repeated results never duplicate words.
        const spoken = Array.from(
          event.results,
          (result) => result[0]?.transcript ?? "",
        )
          .join(" ")
          .trim();
        if (spoken)
          latest.current.onChange(
            `${baseline.trimEnd()}${baseline.trim() ? " " : ""}${spoken}`,
          );
      };
      engine.onerror = (event) => {
        if (generation.current !== token) return;
        release();
        setListening(false);
        setMessage("");
        const errors: Record<string, string> = {
          "not-allowed":
            "Permite el acceso al micrófono en el navegador para responder por audio.",
          "service-not-allowed":
            "El navegador no permite usar el servicio de dictado. Puedes escribir tu respuesta.",
          "audio-capture":
            "No se detecta un micrófono disponible. Comprueba que está conectado y permitido.",
          "no-speech":
            "No se ha detectado voz. Pulsa Responder por audio para intentarlo de nuevo.",
          network:
            "No se pudo conectar con el servicio de dictado. Comprueba la conexión o escribe tu respuesta.",
          "language-not-supported":
            "El dictado en español no está disponible en este navegador. Puedes escribir tu respuesta.",
        };
        setError(
          errors[event.error] ??
            "El dictado se ha interrumpido. Puedes continuar escribiendo o intentarlo de nuevo.",
        );
      };
      engine.onend = () => {
        if (generation.current !== token) return;
        recognition.current = null;
        generation.current++;
        setListening(false);
        setMessage("Dictado terminado. Revisa y edita tu respuesta.");
      };
      engine.start();
    } catch {
      release();
      setListening(false);
      setMessage("");
      setError(
        "No se pudo iniciar el micrófono. Comprueba sus permisos o escribe tu respuesta.",
      );
    }
  }

  return (
    <div className="dictated-answer">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        rows={rows}
        required
        readOnly={disabled || listening}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby={`${id}-voice-help`}
      />
      {!disabled && (
        <>
          <button
            type="button"
            className="button secondary"
            disabled={!supported}
            aria-pressed={listening}
            aria-label={`${listening ? "Detener dictado" : "Responder por audio"}: ${label}`}
            onClick={toggle}
          >
            {listening ? (
              <Square size={20} aria-hidden="true" />
            ) : (
              <Mic size={20} aria-hidden="true" />
            )}
            {listening ? "Detener dictado" : "Responder por audio"}
          </button>
          {message && <p role="status">{message}</p>}
          {error && <p role="alert">{error}</p>}
        </>
      )}
      <p id={`${id}-voice-help`} className="muted">
        {disabled
          ? "Respuesta lista para revisar."
          : supported === false
            ? "El dictado no está disponible en este navegador. Puedes escribir o usar el micrófono del teclado de tu dispositivo."
            : listening
              ? "Detén el dictado para corregir el texto."
              : "Dicta en español y revisa el texto. El navegador puede enviar la voz a su servicio de reconocimiento."}
      </p>
    </div>
  );
}
