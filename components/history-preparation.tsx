import { BookOpen } from "lucide-react";
import { historyExamPreparation as preparation } from "@/lib/history-exams";

export function HistoryPreparation({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className="civil-syllabus"
      aria-label="Preparación de Historia del Derecho"
    >
      <h3>
        <BookOpen size={18} /> Historia del Derecho · exámenes recibidos
      </h3>
      <p>
        Identificadas 51 preguntas teóricas y 17 comentarios de texto. Son
        apariciones en los modelos, no un banco de preguntas únicas con
        soluciones verificadas.
      </p>
      <p>
        {preparation.files.length} modelos aportados de 2020 y 2022–2026.
        Formato de desarrollo: dos preguntas teóricas a elegir entre tres y un
        comentario de texto obligatorio.
      </p>
      <p>
        Los modelos indican dos horas y permiten únicamente el programa de la
        asignatura. Estas son instrucciones históricas: hay que confirmar las
        condiciones en la guía vigente.
      </p>
      <p className="muted">
        Pendientes el programa vigente y el manual o apuntes para desarrollar
        las lecciones y fundamentar las respuestas. La numeración de las
        lecciones cambia entre modelos; las agrupaciones siguientes no
        sustituyen el índice oficial. No hay plantilla oficial de corrección
        verificada ni evaluación automática de estas respuestas.
      </p>
      {!compact && (
        <>
          <details className="syllabus-block">
            <summary>Áreas de práctica identificadas</summary>
            <ul>
              {preparation.clusters.map((cluster) => (
                <li key={cluster.title}>
                  <strong>{cluster.title}</strong>
                  <p>{cluster.focus}</p>
                  <small>Referencia: {cluster.source}</small>
                </li>
              ))}
            </ul>
          </details>
          <details className="syllabus-block">
            <summary>Cómo preparar el desarrollo y el comentario</summary>
            <p>
              Para el desarrollo, practica un esquema con definición, contexto,
              rasgos y relaciones entre instituciones. Para el comentario,
              distingue lo que afirma el texto, su contexto y la institución
              jurídica que permite analizar. Es una pauta de estudio propuesta,
              sin rúbrica ni solución oficial.
            </p>
            <p>
              El siguiente paso es contrastar cada ejercicio con el programa y
              las páginas del material de estudio. Los documentos originales se
              conservan fuera de la web pública.
            </p>
          </details>
          <details className="syllabus-block">
            <summary>Modelos recibidos y referencias</summary>
            <ul>
              {preparation.files.map((file) => (
                <li key={file}>{file} · página PDF 1</li>
              ))}
            </ul>
          </details>
        </>
      )}
    </section>
  );
}
