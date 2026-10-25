import { PageHeading } from "@/components/ui";
import { lessonsFor } from "@/lib/learning";
import { firstYearCatalog } from "@/lib/subject-catalog";
import { historyExamPreparation } from "@/lib/history-exams";

export default function Sources() {
  return (
    <>
      <PageHeading
        title="Mis fuentes"
        description="Referencias de tus materiales de estudio, organizadas por asignatura."
      />
      {firstYearCatalog.map((subject) => {
        const references = [
          ...new Set(
            lessonsFor(subject.code).flatMap((lesson) => lesson.sources),
          ),
        ];
        if (subject.code === "021015")
          references.push(
            "Apuntes EC.pdf",
            "Apuntes Historia Carmen - ESCUDERO_261014_194319.pdf",
            "Comentarios de Texto de Historia del Derecho Español · manual de 238 páginas, recibido en tres fragmentos",
            "resolución_de_los_textos_de_historia,_26,_33,_40,__261014_194848.pdf",
            "Pirámide_HistoriaDerecho_Comentarios_Jagpino_Rev20_261014_194539.pdf",
            "Nos_encontramos_ante_un_texto_de_naturaleza_jurídica_que_refleja.docx",
            "Esquemas aportados: Derecho medieval, fuentes medievales e ius commune",
            ...historyExamPreparation.files,
          );
        if (subject.code === "021021")
          references.push(
            "LECCIÓN 1 TEORIA DEL DERECHO GRADO DERECHO.pdf",
            "Tipo test, tema 1 (1).pdf",
            "Test TEORIA DEL DERECHO.html",
            "TD test Curso 2025-2026_261014_140934.pdf",
            "todos contestados modificado V2 (1)_261014_140941.pdf",
            "Modelos de examen de Teoría del Derecho · febrero y septiembre de 2022–2026",
            "1 semana nacional TD 2024.TIF",
            "01 modelo A TEORÍA DEL DERECHO ORIGINAL NACIONAL SEPT 2024.TIF",
          );
        if (subject.code === "021038")
          references.push(
            "ejemplo examen_2025.pdf",
            "Tema 12_13 el parlamento II_2017_red.pdf",
            "img20251014_18272174_261019_121940.pdf",
          );
        if (!references.length) return null;
        return (
          <section
            key={subject.code}
            className="card study-references"
            aria-label={`Fuentes de ${subject.title}`}
          >
            <h2>{subject.title}</h2>
            <ul>
              {references.map((reference) => (
                <li key={reference}>{reference}</li>
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}
