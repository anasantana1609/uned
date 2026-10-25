// Original practice cases, aligned to the format in the 2026/27 guide, page 18.
export const proceduralPracticeModels = [
  {
    title: "Tutela y garantías",
    questions: [
      "Explica jurisdicción, acción y proceso y distingue acceso a tutela y estimación de la pretensión.",
      "Compara independencia e imparcialidad y explica las funciones de abstención y recusación.",
    ],
    scenario:
      "En una reclamación se aporta un informe decisivo después de la última oportunidad de alegaciones. El tribunal lo utiliza para resolver sin comunicarlo a la otra parte, que afirma haber perdido la posibilidad de discutirlo.",
    task: "Identifica las garantías afectadas, explica qué hechos necesitas comprobar y distingue la discrepancia con el resultado de una posible privación de defensa. No presupongas nulidad automática sin analizar la incidencia del defecto.",
    review: [
      "Identificar contradicción, audiencia e igualdad de oportunidades.",
      "Explicar la oportunidad real de conocer y discutir el informe.",
      "Distinguir infracción formal, indefensión relevante y remedio procesal aplicable.",
    ],
    sources:
      "Manual de Introducción al Derecho Procesal, 3.ª edición · lecciones 6, 17, 19 y 21",
  },
  {
    title: "Competencia y comunicaciones",
    questions: [
      "Distingue jurisdicción, competencia objetiva, funcional y territorial y reparto.",
      "Compara notificación, citación y emplazamiento e indica por qué importan sus requisitos para la defensa.",
    ],
    scenario:
      "Una persona recibe una comunicación que le exige comparecer un día concreto, pero no identifica claramente el procedimiento. Alega que no pudo preparar su defensa. La otra parte sostiene que cualquier comunicación basta y que todos los órganos judiciales pueden conocer del asunto.",
    task: "Clasifica el acto de comunicación, identifica qué datos faltan y explica cómo comprobarías órgano competente, regularidad de la comunicación y posible perjuicio para la defensa.",
    review: [
      "Separar jurisdicción, competencia y reparto.",
      "Distinguir comparecencia en día señalado y actuación dentro de plazo.",
      "Analizar comunicación y efectos sobre la defensa sin inventar plazos o recursos.",
    ],
    sources:
      "Manual de Introducción al Derecho Procesal, 3.ª edición · lecciones 4, 7, 24 y 26",
  },
] as const;
