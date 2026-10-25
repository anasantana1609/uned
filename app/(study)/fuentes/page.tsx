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
            ...historyExamPreparation.files,
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
