import { BookOpen, FileCheck2 } from "lucide-react";
import { civilSyllabus } from "@/lib/civil-syllabus";

export function CivilSyllabus({ compact = false }: { compact?: boolean }) {
  return (
    <section className="civil-syllabus" aria-label="Preparación de Civil I.1">
      <h3>
        <BookOpen size={18} /> Civil I.1 · programa 2026/27
      </h3>
      <p>
        <strong>Materiales recibidos · contenido en preparación.</strong> El
        programa tiene 14 temas en cuatro bloques. El esquema y las exclusiones
        de examen están verificados; las lecciones y pruebas todavía no están
        disponibles.
      </p>
      <p className="muted">
        27 documentos distintos descargados, 13 copias idénticas y las tres
        partes del libro pendientes. Los documentos recibidos aún no están
        incorporados a tu biblioteca privada en la web.
      </p>
      {!compact && (
        <>
          {civilSyllabus.blocks.map((block, index) => (
            <details key={block} className="syllabus-block">
              <summary>
                Bloque {index + 1} · {block}
              </summary>
              <ol>
                {civilSyllabus.topics
                  .filter((t) => t.block === index + 1)
                  .map((topic) => (
                    <li key={topic.number}>
                      <strong>
                        Tema {topic.number}. {topic.title}
                      </strong>
                      <small>
                        Manual: capítulo{topic.chapters.length > 1 ? "s" : ""}{" "}
                        {topic.chapters.join(", ")} · Programa, página PDF{" "}
                        {topic.programmePage}
                      </small>
                      <span>Pendiente de lecciones y prueba final</span>
                    </li>
                  ))}
              </ol>
            </details>
          ))}
          <details className="syllabus-block">
            <summary>Exclusiones del examen 2026/27</summary>
            <p>
              Según las concordancias aportadas, página PDF 1. Las preguntas
              antiguas se contrastarán con estas exclusiones antes de usarse
              para evaluar.
            </p>
            <ul>
              {civilSyllabus.exclusions.map((e) => (
                <li key={e.chapter}>
                  Capítulo {e.chapter}: epígrafes {e.sections.join(", ")}.
                </li>
              ))}
            </ul>
          </details>
        </>
      )}
      <p className="syllabus-source">
        <FileCheck2 size={15} /> Fuentes: programa oficial, páginas PDF 2–5, y
        concordancias programa-manual, página PDF 1.
      </p>
    </section>
  );
}
