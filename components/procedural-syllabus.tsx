import { BookOpen, FileCheck2 } from "lucide-react";
import { proceduralSyllabus } from "@/lib/procedural-syllabus";

export function ProceduralSyllabus({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className="civil-syllabus"
      aria-label="Preparación de Introducción al Derecho Procesal"
    >
      <h3>
        <BookOpen size={18} /> Introducción al Derecho Procesal
      </h3>
      <p>
        <strong>Materiales recibidos · contenido en preparación.</strong> El
        programa aportado tiene 28 lecciones en cinco partes y recomienda la 3.ª
        edición de 2025. Las lecciones de cinco minutos y las pruebas aún no
        están habilitadas.
      </p>
      <p className="muted">
        18 de los 20 archivos se han descargado. Las tres versiones del resumen
        contienen el mismo texto. El manual OCR es un fragmento de 37 páginas;
        el manual íntegro y el código impreso de 4.ª edición siguen pendientes
        por superar el límite de transferencia.
      </p>
      <p className="muted">
        También se ha identificado el código BOE actualizado a 7 de octubre de
        2026. Los originales y los textos extraídos aún no están incorporados a
        tu biblioteca privada en la web.
      </p>
      {!compact && (
        <>
          {proceduralSyllabus.blocks.map((block, index) => (
            <details className="syllabus-block" key={block}>
              <summary>
                Parte {index + 1} · {block}
              </summary>
              <ol>
                {proceduralSyllabus.topics
                  .filter((t) => t.block === index + 1)
                  .map((topic) => (
                    <li key={topic.number}>
                      <strong>
                        Lección {topic.number}. {topic.title}
                      </strong>
                      <small>
                        Programa, página PDF {topic.programmePage} · Resumen de
                        apoyo, páginas PDF {topic.summaryStartPage}–
                        {topic.summaryEndPage}
                      </small>
                      <span>Pendiente de lecciones y prueba final</span>
                    </li>
                  ))}
              </ol>
            </details>
          ))}
        </>
      )}
      <p className="syllabus-source">
        <FileCheck2 size={15} /> Fuentes: programa aportado, páginas PDF 1–8;
        resumen de apoyo de 138 páginas. El programa no especifica el año
        académico ni las reglas de evaluación.
      </p>
    </section>
  );
}
