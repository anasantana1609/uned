"use client";

import { useRef } from "react";
import { BookOpen, Flag, LockKeyhole, Star, Trophy } from "lucide-react";
import type { Lesson, LearningProgress } from "@/lib/learning";

export function LearningPath({
  lessons,
  progress,
  ready,
  onSelect,
}: {
  lessons: Lesson[];
  progress: LearningProgress;
  ready: boolean;
  onSelect: (lesson: Lesson) => void;
}) {
  const nextIndex = lessons.findIndex((lesson) => !progress[lesson.id]);
  const nextRef = useRef<HTMLButtonElement>(null);
  const finished = nextIndex === -1;
  return (
    <div className="learning-path">
      <div className="path-banner">
        {finished ? (
          <Trophy size={32} aria-hidden="true" />
        ) : (
          <Flag size={32} aria-hidden="true" />
        )}
        <div>
          <strong>
            {finished ? "¡Recorrido completado!" : "Tu próxima lección"}
          </strong>
          <p>
            {finished
              ? "Puedes volver a cualquier lección para repasar."
              : lessons[nextIndex].title}
          </p>
        </div>
        {!finished && (
          <button
            className="button"
            disabled={!ready}
            onClick={() => {
              nextRef.current?.scrollIntoView({
                block: "center",
                behavior: "smooth",
              });
              nextRef.current?.focus({ preventScroll: true });
            }}
          >
            Ir a mi lección
          </button>
        )}
      </div>
      <p>
        Completa las tres preguntas de cada lección para abrir la siguiente.
      </p>
      <ol className="path-stops" aria-label="Recorrido de lecciones">
        {lessons
          .map((lesson, index) => ({ lesson, index }))
          .filter(({ lesson }) => !progress[lesson.id])
          .map(({ lesson, index }, pendingIndex, pending) => {
            const current = index === nextIndex;
            const locked = !current;
            const state = current ? "Disponible · empezar" : "Bloqueada";
            const Icon = locked ? LockKeyhole : Star;
            const newTopic =
              pendingIndex === 0 ||
              pending[pendingIndex - 1].lesson.topic !== lesson.topic;
            return (
              <li
                key={lesson.id}
                className={`path-stop ${current ? "current" : "locked"}`}
              >
                {newTopic && (
                  <h4 className="path-topic">
                    <BookOpen size={22} aria-hidden="true" />
                    {lesson.topic}
                  </h4>
                )}
                <div
                  className="path-node-wrap"
                  data-position={pendingIndex % 4}
                >
                  <button
                    type="button"
                    className="path-node"
                    ref={current ? nextRef : undefined}
                    disabled={!ready || locked}
                    aria-current={current ? "step" : undefined}
                    aria-label={`Lección ${index + 1}: ${lesson.title}. ${state}`}
                    onClick={() => onSelect(lesson)}
                  >
                    <Icon size={34} aria-hidden="true" />
                  </button>
                  <span className="path-caption">
                    <strong>
                      {index + 1}. {lesson.title}
                    </strong>
                    <small>{state}</small>
                  </span>
                </div>
              </li>
            );
          })}
      </ol>
      <div className="path-finish">
        <Trophy size={36} aria-hidden="true" />
        <strong>
          {finished ? "¡Lo has conseguido!" : "Meta del recorrido"}
        </strong>
      </div>
    </div>
  );
}
