"use client";
import { useState } from "react";
import { Search, BookOpen } from "lucide-react";
import { useStudy } from "@/components/study-provider";
import {
  PageHeading,
  SubjectCard,
  SubjectDetail,
  Empty,
} from "@/components/ui";
import type { Subject } from "@/lib/model";
import { catalogEntry, subjectTitle } from "@/lib/subject-catalog";
export default function Subjects() {
  const { data } = useStudy();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Subject | null>(null);
  const subjects = data.subjects
    .filter((s) =>
      `${subjectTitle(s)} ${catalogEntry(s)?.code ?? ""}`
        .toLocaleLowerCase("es")
        .includes(query.toLocaleLowerCase("es")),
    )
    .sort(
      (a, b) =>
        Number(Boolean(catalogEntry(b)?.firstSemester)) -
        Number(Boolean(catalogEntry(a)?.firstSemester)),
    );
  return (
    <>
      <PageHeading
        eyebrow="TU MAPA DE APRENDIZAJE"
        title="Un mundo por descubrir."
        description="Primer curso de Derecho. Prepararemos primero las seis asignaturas del primer cuatrimestre; las demás se habilitarán al incorporar sus materiales."
      />
      <div className="list-toolbar">
        <span>
          <BookOpen size={18} />
          {data.subjects.length} asignaturas
        </span>
        <label className="search-input">
          <Search size={17} />
          <input
            aria-label="Buscar asignaturas"
            placeholder="Buscar asignatura…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <div className="subject-grid full-grid">
        {subjects.map((s) => (
          <SubjectCard key={s.id} subject={s} onOpen={() => setSelected(s)} />
        ))}
      </div>
      {!subjects.length && (
        <Empty
          title="No hay coincidencias"
          description="Prueba con otro nombre de asignatura."
        />
      )}
      <p className="footnote">
        Catálogo del primer curso según la relación que has facilitado. Civil,
        Procesal y Fundamentos tienen contenido inicial de cinco minutos. El
        avance del contenido cuenta bloques superados; el objetivo de minutos
        mide tiempo registrado. Ninguno equivale al dominio de todo el temario.
      </p>
      {selected && (
        <SubjectDetail subject={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
