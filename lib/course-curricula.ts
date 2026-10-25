export type CourseCurriculum = {
  code: string;
  title: string;
  basis: string;
  topics: { number: number; title: string }[];
  sources: string[];
};

// Programme metadata and bibliography only; private documents are not bundled.
export const courseCurricula: CourseCurriculum[] = [
  {
    code: "021015",
    title: "Historia del Derecho Español",
    basis: "Programa oficial y guía 2026/27",
    topics: [
      {
        number: 1,
        title: "La historia del derecho: concepto, objeto e historiografia.",
      },
      {
        number: 2,
        title: "La españa prerromana.",
      },
      {
        number: 3,
        title: "El proceso jurídico de la romanización de hispania",
      },
      {
        number: 4,
        title: "Organización provincial y municipal de hispania",
      },
      {
        number: 5,
        title:
          "Los pueblos germanos. estructura económica y social de los visigodos.",
      },
      {
        number: 6,
        title: "Fuentes del derecho visigodo",
      },
      {
        number: 7,
        title: "Monarquía, asambleas políticas y administración visigodas.",
      },
      {
        number: 8,
        title: "Repoblación, régimen señorial",
      },
      {
        number: 9,
        title: "Estructura económica y social en la españa medieval",
      },
      {
        number: 10,
        title: "El derecho medieval.",
      },
      {
        number: 11,
        title: "La recepción del derecho común.",
      },
      {
        number: 12,
        title: "El derecho medieval en león y castilla",
      },
      {
        number: 13,
        title:
          "El derecho medieval en aragón, navarra, cataluña, mallorca y valencia",
      },
      {
        number: 14,
        title: "La monarquía medieval.",
      },
      {
        number: 15,
        title: "Las cortes medievales",
      },
      {
        number: 16,
        title: "Administración central en la españa medieval",
      },
      {
        number: 17,
        title: "La administración territorial y local.",
      },
      {
        number: 18,
        title: "La administración de justicia, hacienda y ejercito.",
      },
    ],
    sources: [
      "Programa oficial de Historia del Derecho Español.pdf",
      "66021015_2027.pdf",
      "Curso de Historia del Derecho Español",
      "Comentarios de Texto de Historia del Derecho Español",
      "Apuntes EC.pdf",
      "Apuntes Historia Carmen - ESCUDERO_261014_194319.pdf",
    ],
  },
  {
    code: "021021",
    title: "Teoría del Derecho",
    basis: "Guía 2026/27",
    topics: [
      {
        number: 1,
        title: "Normas reguladoras de la conducta humana",
      },
      {
        number: 2,
        title: "Carácter pluridimensional del derecho",
      },
      {
        number: 3,
        title: "Conceptos jurídicos fundamentales",
      },
      {
        number: 4,
        title: "Derecho objetivo, derecho subjetivo y deber jurídico",
      },
      {
        number: 5,
        title: "La norma jurídica",
      },
      {
        number: 6,
        title: "El Derecho como sistema: El ordenamiento jurídico",
      },
      {
        number: 7,
        title: "La interpretación y aplicación del Derecho",
      },
      {
        number: 8,
        title: "Derecho y Sociedad",
      },
      {
        number: 9,
        title: "La eficacia social del Derecho",
      },
      {
        number: 10,
        title: "Los valores jurídicos. Justicia y Derecho",
      },
      {
        number: 11,
        title: "Los Derechos Humanos: concepto y fundamentación",
      },
      {
        number: 12,
        title: "Derechos Humanos: génesis, evolución y actualidad",
      },
      {
        number: 13,
        title: "Deontología de las profesiones jurídicas",
      },
      {
        number: 14,
        title: "El conocimiento jurídico",
      },
    ],
    sources: [
      "66021021_2027.pdf",
      "Teoría del Derecho · Marcos del Cano (coord.), Universitas, 2.ª edición, 2024",
      "Apuntes Teoria del Derecho 2024-25.pdf",
    ],
  },
  {
    code: "021038",
    title: "Teoría del Estado Constitucional",
    basis: "Guía 2026/27 · cuota docente indicada para Canarias",
    topics: [
      {
        number: 1,
        title: "Formación y elementos del Estado",
      },
      {
        number: 2,
        title: "Del Estado liberal al Estado social y democrático",
      },
      {
        number: 3,
        title: "Constitución, contenido y tipologías",
      },
      {
        number: 4,
        title: "Poder constituyente, reforma y mutación",
      },
      {
        number: 5,
        title: "Justicia constitucional y controles",
      },
      {
        number: 6,
        title: "Declaraciones de derechos y garantías",
      },
      {
        number: 7,
        title: "Monarquía, república y jefatura del Estado",
      },
      {
        number: 8,
        title: "Estado unitario, federal, regional y confederación",
      },
      {
        number: 9,
        title: "Soberanía, representación y sistema electoral",
      },
      {
        number: 10,
        title: "Partidos, participación directa y límites democráticos",
      },
      {
        number: 11,
        title: "Organización y autonomía parlamentaria",
      },
      {
        number: 12,
        title: "Funciones legislativa, presupuestaria y de control",
      },
      {
        number: 13,
        title: "Sistemas parlamentario y presidencialista",
      },
      {
        number: 14,
        title: "Investidura, censura y cuestión de confianza",
      },
      {
        number: 15,
        title: "Integración europea y ejercicio de competencias",
      },
      {
        number: 16,
        title: "Bayona y Constitución de Cádiz de 1812",
      },
      {
        number: 17,
        title: "Estatuto Real y constituciones del siglo XIX",
      },
      {
        number: 18,
        title: "Restauración, Constitución de 1876 y crisis",
      },
      {
        number: 19,
        title: "Segunda República y Constitución de 1931",
      },
      {
        number: 20,
        title: "Naturaleza y evolución del régimen franquista",
      },
    ],
    sources: [
      "66021038_2027.pdf",
      "Estado de Derecho y democracia de partidos · Torres del Moral, 7.ª edición",
      "CONST HISTORICO",
      "Infografías TEC",
      "EXÁMENES CON RESPUESTA HASTA 2025",
    ],
  },
  {
    code: "021044",
    title: "Introducción al Derecho Procesal",
    basis: "Guía 2026/27 y programa recibido",
    topics: [
      {
        number: 1,
        title: "Derecho procesal: concepto, fuentes y regulación",
      },
      {
        number: 2,
        title: "El fundamento de la jurisdicción",
      },
      {
        number: 3,
        title: "La jurisdicción: concepto y funciones",
      },
      {
        number: 4,
        title:
          "Jurisdicción y competencia: concepto, fundamento, criterios de atribución y tratamiento procesal",
      },
      {
        number: 5,
        title:
          "El monopolio estatal de la jurisdicción, principio de exclusividad y unidad jurisdiccional",
      },
      {
        number: 6,
        title: "La independencia de los jueces y magistrados",
      },
      {
        number: 7,
        title: "El derecho al juez legal",
      },
      {
        number: 8,
        title: "La organización del Poder Judicial",
      },
      {
        number: 9,
        title:
          "Los tribunales, la oficina judicial y las oficinas de justicia en los municipios",
      },
      {
        number: 10,
        title: "Extensión y límites de la jurisdicción",
      },
      {
        number: 11,
        title: "Profesionales de la jurisdicción: jueces y magistrados",
      },
      {
        number: 12,
        title:
          "Profesionales colaboradores de la jurisdicción I: Letrados de la Administración de Justicia, Policía Judicial y Funcionarios al servicio de la Administración de Justicia",
      },
      {
        number: 13,
        title:
          "Profesionales colaboradores de la jurisdicción II: Abogados, Procuradores y Graduados sociales",
      },
      {
        number: 14,
        title: "El Ministerio Fiscal",
      },
      {
        number: 15,
        title: "El Tribunal Constitucional",
      },
      {
        number: 16,
        title: "El Tribunal del Jurado",
      },
      {
        number: 17,
        title: "El derecho a la tutela judicial efectiva",
      },
      {
        number: 18,
        title: "La asistencia jurídica gratuita",
      },
      {
        number: 19,
        title:
          "Los derechos fundamentales del artículo 24.2 de la Constitución",
      },
      {
        number: 20,
        title: "El proceso",
      },
      {
        number: 21,
        title: "Principios del proceso",
      },
      {
        number: 22,
        title: "La estructura del proceso",
      },
      {
        number: 23,
        title: "Clases de procesos",
      },
      {
        number: 24,
        title: "Los actos procesales",
      },
      {
        number: 25,
        title: "Clases de actos procesales",
      },
      {
        number: 26,
        title: "Los actos de comunicación",
      },
      {
        number: 27,
        title: "Resolución final del Órgano Judicial: la Sentencia",
      },
      {
        number: 28,
        title: "Derecho paraprocesal: mediación y arbitraje",
      },
    ],
    sources: [
      "66021044_2027.pdf",
      "Programa Introducción Derecho Procesal.pdf",
      "Introducción al Derecho Procesal · 3.ª edición, 2025",
      "Código de Leyes Procesales · 4.ª edición, actualizado a 1 de abril de 2025 · tramo recibido 1–700",
    ],
  },
  {
    code: "901012",
    title: "Fundamentos Clásicos de la Democracia y de la Administración",
    basis: "Capítulos del único manual aportado",
    topics: [
      {
        number: 1,
        title: "Conceptos fundamentales: justicia y Derecho",
      },
      {
        number: 2,
        title: "Ley y ordenamiento jurídico",
      },
      {
        number: 3,
        title: "Mundo clásico y democracia: comparación crítica",
      },
      {
        number: 4,
        title: "Atenas y la Ekklesía",
      },
      {
        number: 5,
        title: "República romana y distribución de funciones",
      },
      {
        number: 6,
        title: "Hispania y la administración romana",
      },
      {
        number: 7,
        title: "Comicios y formas de participación romana",
      },
      {
        number: 8,
        title: "Ley comicial y procedimiento legislativo",
      },
      {
        number: 9,
        title: "Magistraturas y función consultiva",
      },
      {
        number: 10,
        title: "Persona, capacidad y ciudadanía",
      },
      {
        number: 11,
        title: "Personas jurídicas, asociaciones y fundaciones",
      },
      {
        number: 12,
        title: "Fuentes romanas y ordenamiento actual",
      },
      {
        number: 13,
        title: "Jurisprudencia romana y jurisprudencia actual",
      },
      {
        number: 14,
        title: "La compilación de Justiniano",
      },
      {
        number: 15,
        title: "Civil law, common law y fuentes",
      },
      {
        number: 16,
        title: "Codificación civil y recepción jurídica",
      },
      {
        number: 17,
        title: "Unificación e integración jurídica europea",
      },
      {
        number: 18,
        title: "Organización provincial romana",
      },
      {
        number: 19,
        title: "Colonias y municipios romanos",
      },
      {
        number: 20,
        title: "Organización territorial actual",
      },
    ],
    sources: [
      "Fundamentos Clásicos de la Democracia y la Administración · único manual aportado",
      "temas 1 y 2 FBDR.pptx",
    ],
  },
  {
    code: "021096",
    title: "Derecho Civil I.1",
    basis: "Programa y concordancias 2026/27",
    topics: [
      {
        number: 1,
        title: "Derecho civil, codificación y derechos forales",
      },
      {
        number: 2,
        title: "Ordenamiento, norma jurídica y fuentes del Derecho",
      },
      {
        number: 3,
        title: "Vigencia y aplicación de las normas jurídicas",
      },
      {
        number: 4,
        title: "Relación jurídica, derechos subjetivos y su ejercicio",
      },
      {
        number: 5,
        title: "Prescripción y caducidad",
      },
      {
        number: 6,
        title: "La persona y los derechos de la personalidad",
      },
      {
        number: 7,
        title: "Capacidad, discapacidad y cargos tuitivos",
      },
      {
        number: 8,
        title: "Ausencia y declaración de fallecimiento",
      },
      {
        number: 9,
        title: "Nacionalidad, vecindad civil y domicilio",
      },
      {
        number: 10,
        title: "El Registro Civil",
      },
      {
        number: 11,
        title: "Personas jurídicas, asociaciones y fundaciones",
      },
      {
        number: 12,
        title: "Cosas y bienes",
      },
      {
        number: 13,
        title: "El patrimonio",
      },
      {
        number: 14,
        title: "Autonomía privada, negocio jurídico y representación",
      },
    ],
    sources: [
      "Programa_Derecho_Civil_I-1_26-27.pdf",
      "Concordancias_programa-manual_2026-27.pdf",
      "Derecho Civil I · 31.ª edición, 2026",
      "Apuntes actualizados 2025-6 Derecho Civil I.1.pdf",
    ],
  },
];

export function curriculumFor(code: string) {
  return courseCurricula.find((course) => course.code === code);
}
