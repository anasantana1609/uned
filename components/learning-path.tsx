"use client";

import { BookOpen, LockKeyhole, Star, Trophy } from "lucide-react";
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
  const finished = nextIndex === -1;
  return (
    <div className="learning-path">
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
      {finished && (
        <p role="status">
          ¡Recorrido completado! Puedes abrir las lecciones completadas para
          repasar.
        </p>
      )}
      <div className="path-finish">
        <Trophy size={36} aria-hidden="true" />
        <strong>
          {finished ? "¡Lo has conseguido!" : "Meta del recorrido"}
        </strong>
      </div>
    </div>
  );
}
