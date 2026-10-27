"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

export function ExamPages({
  children,
  answered,
  actions,
}: {
  children: ReactNode[];
  answered: boolean[];
  actions: ReactNode;
}) {
  const [current, setCurrent] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const count = children.length;
  const completed = answered.filter(Boolean).length;
  useEffect(() => {
    root.current?.scrollIntoView({ block: "start" });
  }, []);
  function go(index: number) {
    window.dispatchEvent(new Event("uned-exam-page-change"));
    setCurrent(index);
    root.current?.querySelector("details")?.removeAttribute("open");
    if (content.current) content.current.scrollTop = 0;
    content.current?.focus({ preventScroll: true });
  }
  return (
    <div className="exam-pages" ref={root}>
      <div className="exam-page-heading">
        <strong>
          Pregunta {current + 1} de {count}
        </strong>
        <details className="exam-answer-summary">
          <summary>
            Resumen · {completed} respondidas · {count - completed} sin
            responder
          </summary>
          <nav
            aria-label="Resumen de respuestas"
            className="exam-question-grid"
          >
            {children.map((_, index) => (
              <button
                type="button"
                key={index}
                aria-label={`Pregunta ${index + 1}: ${answered[index] ? "respondida" : "sin responder"}`}
                aria-current={index === current ? "step" : undefined}
                className={answered[index] ? "answered" : ""}
                onClick={() => go(index)}
              >
                <span>{index + 1}</span>
                {answered[index] && <Check size={16} aria-hidden="true" />}
              </button>
            ))}
          </nav>
        </details>
      </div>
      <div
        className="exam-page-content"
        ref={content}
        tabIndex={0}
        aria-label={`Pregunta ${current + 1}`}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="exam-single-page"
            hidden={index !== current}
          >
            {child}
          </div>
        ))}
      </div>
      <div className="exam-page-footer">
        <nav aria-label="Navegar por el examen" className="exam-page-arrows">
          <button
            type="button"
            className="button secondary"
            aria-label="Pregunta anterior"
            disabled={current === 0}
            onClick={() => go(current - 1)}
          >
            <ArrowLeft size={24} aria-hidden="true" />
            Anterior
          </button>
          <button
            type="button"
            className="button secondary"
            aria-label="Pregunta siguiente"
            disabled={current === count - 1}
            onClick={() => go(current + 1)}
          >
            Siguiente
            <ArrowRight size={24} aria-hidden="true" />
          </button>
        </nav>
        {actions}
      </div>
    </div>
  );
}
