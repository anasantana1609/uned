import { BookOpen, FileCheck2 } from "lucide-react";
import { civilSyllabus } from "@/lib/civil-syllabus";
import { lessonsFor } from "@/lib/learning";

export function CivilSyllabus({ compact = false }: { compact?: boolean }) {
  const available = lessonsFor("021096");
  return (
    <section className="civil-syllabus" aria-label="Preparación de Civil I.1">
      <h3>
        <BookOpen size={18} /> Civil I.1 · programa 2026/27
      </h3>
      <p>
        <strong>Contenido inicial disponible · resto en preparación.</strong> El
        programa tiene 14 temas en cuatro bloques. El esquema y las exclusiones
        de examen están verificados. Ya puedes estudiar {available.length}{" "}
        bloques introductorios con sus pruebas, repartidos por los 14 temas.
        Cada tema sigue incompleto: estos bloques no sustituyen el estudio del
        programa.
      </p>
      <p className="muted">
        Lote inicial: 27 documentos distintos descargados y 13 copias idénticas.
        También se ha procesado la parte 1 del manual: 120 páginas PDF
        escaneadas, 31.ª edición de 2026, verificada en portada y portadilla.
        Las partes 2 y 3 también se han descargado, divididas en cuatro
        archivos; su revisión sigue pendiente. Los documentos recibidos aún no
        están incorporados a tu biblioteca privada en la web.
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
                      <span>
                        {available.some(
                          (l) => l.topic === `Tema ${topic.number}`,
                        )
                          ? "Bloques introductorios disponibles; tema aún incompleto"
                          : "Lecciones y prueba de este tema en preparación"}
                      </span>
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
