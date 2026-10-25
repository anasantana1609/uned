import type { Lesson, Question } from "./learning";

type Check = [string, string[], number, string];
type Topic = {
  title: string;
  pages: string;
  concepts: string[];
  explanation: string[];
  example: string;
  practice: string;
  checks: Check[];
};
// Original summaries and exercises. References identify the private source corpus.
const topics: Topic[] = [
  {
    title: "Normas jurídicas, moral y usos sociales",
    pages: "1–4",
    concepts: ["Deber ser", "Autonomía moral", "Coercibilidad"],
    explanation: [
      "Una ley física describe una regularidad; una norma de conducta prescribe cómo actuar y puede incumplirse. Que alguien infrinja una prohibición no demuestra por sí solo que la norma haya dejado de existir. El Derecho convive con la moral y con las reglas de trato social.",
      "La moral atiende especialmente a la conciencia y a la valoración personal. Los usos sociales regulan la convivencia y su incumplimiento puede provocar rechazo del grupo. Las normas jurídicas cuentan con mecanismos institucionales para exigir su cumplimiento. Coercibilidad significa posibilidad de imposición, no uso constante de la fuerza.",
      "Para distinguir estos órdenes pregunta de dónde procede la exigencia, qué conducta regula y quién puede reaccionar ante su incumplimiento. Una conducta puede estar regulada por los tres órdenes: compartir contenido no hace idénticos su fundamento y su sanción.",
    ],
    example:
      "No devolver un préstamo puede suscitar reproche moral y social, además de una reclamación jurídica. Cada reacción tiene un fundamento distinto.",
    practice:
      "Haz tres columnas: moral, usos sociales y Derecho. Compara origen, sanción y posibilidad de imposición institucional.",
    checks: [
      [
        "Una norma de conducta pertenece principalmente al plano…",
        ["Del deber ser", "De la gravedad física", "De lo inevitable"],
        0,
        "Prescribe una conducta que puede cumplirse o incumplirse.",
      ],
      [
        "La coercibilidad jurídica implica…",
        [
          "Que siempre se usa la fuerza",
          "Posibilidad de imponer institucionalmente el cumplimiento",
          "Ausencia de sanciones",
        ],
        1,
        "Se refiere a una posibilidad institucional, no a la coacción constante.",
      ],
      [
        "Una misma conducta puede…",
        [
          "Estar regulada solo por la moral",
          "Carecer siempre de dimensión social",
          "Ser objeto de normas morales, sociales y jurídicas",
        ],
        2,
        "Los órdenes pueden coincidir en el contenido sin ser idénticos.",
      ],
    ],
  },
  {
    title: "Validez, eficacia y justicia del Derecho",
    pages: "4–6",
    concepts: ["Validez", "Eficacia", "Justicia"],
    explanation: [
      "El término Derecho puede designar un orden de normas, una facultad de una persona, una disciplina de estudio o una aspiración de justicia. El contexto permite reconocer el significado empleado. La teoría tridimensional relaciona norma, hecho social y valor.",
      "La validez pregunta por la pertenencia de una norma al sistema conforme a sus criterios de producción. La eficacia atiende a su cumplimiento y aplicación social. La justicia valora su contenido. Una norma puede ser válida y poco cumplida, o eficaz y moralmente criticable: las dimensiones están relacionadas, pero no son equivalentes.",
      "El iusnaturalismo afirma, con distintas formulaciones, principios de justicia que no dependen solo de la voluntad del legislador. El positivismo jurídico distingue la identificación del Derecho positivo de su valoración moral. Distinguirlas no obliga a aprobar moralmente toda norma existente.",
    ],
    example:
      "Una prohibición aprobada por el órgano competente apenas se cumple. Hay que separar su validez de su eficacia y argumentar aparte si es justa.",
    practice:
      "Explica una norma mediante tres preguntas: ¿pertenece al sistema?, ¿se cumple?, ¿es justa?",
    checks: [
      [
        "La dimensión fáctica estudia principalmente…",
        ["La justicia ideal", "La eficacia social", "El nombre de la norma"],
        1,
        "La dimensión fáctica atiende a cumplimiento y aplicación.",
      ],
      [
        "Una norma eficaz es necesariamente…",
        ["Justa", "La única norma válida", "Ninguna de las anteriores"],
        2,
        "Cumplimiento, validez y justicia no se identifican.",
      ],
      [
        "Distinguir Derecho positivo y valoración moral permite…",
        [
          "Identificar una norma y después criticar su contenido",
          "Justificar toda norma por existir",
          "Eliminar toda reflexión ética",
        ],
        0,
        "La identificación jurídica no equivale a aprobación moral.",
      ],
    ],
  },
  {
    title: "Persona, hechos y relaciones jurídicas",
    pages: "6–10",
    concepts: ["Personalidad", "Hecho jurídico", "Relación jurídica"],
    explanation: [
      "Ser sujeto de Derecho significa poder ocupar posiciones jurídicas, como titular de derechos y obligaciones. El ordenamiento reconoce personas físicas y personas jurídicas colectivas. Una asociación reconocida no se confunde con cada uno de sus miembros.",
      "Un hecho es jurídico cuando el ordenamiento le atribuye consecuencias. Puede tratarse de un acontecimiento natural o de una actuación humana. Los actos jurídicos incorporan conducta humana jurídicamente relevante. La relación jurídica vincula sujetos respecto de un objeto bajo una regulación que atribuye facultades y deberes.",
      "La sanción es una posible respuesta jurídica al incumplimiento, pero no toda norma se reduce a castigar: también existen reglas que atribuyen potestades y permiten organizar actos. Al analizar un caso identifica primero los sujetos, el vínculo, el objeto y las consecuencias previstas.",
    ],
    example:
      "Una asociación firma un contrato de alquiler. Distingue a la asociación de sus socios y al contrato de la obligación de pagar que genera.",
    practice:
      "Dibuja dos sujetos unidos por un vínculo. Añade objeto, facultad de exigir y deber correlativo.",
    checks: [
      [
        "Un acontecimiento es un hecho jurídico cuando…",
        [
          "Siempre interviene un juez",
          "Carece de consecuencias",
          "El ordenamiento le atribuye efectos jurídicos",
        ],
        2,
        "La relevancia jurídica proviene de los efectos atribuidos por el Derecho.",
      ],
      [
        "Una asociación reconocida puede…",
        [
          "Ser una persona jurídica distinta de sus miembros",
          "Ser únicamente un objeto material",
          "Carecer necesariamente de derechos",
        ],
        0,
        "La personalidad colectiva permite atribuirle posiciones jurídicas propias.",
      ],
      [
        "Una relación jurídica se comprende atendiendo a…",
        [
          "Solo el nombre del contrato",
          "Sujetos, objeto y vínculo regulado",
          "Solo la sanción penal",
        ],
        1,
        "La relación integra esos elementos bajo una regulación jurídica.",
      ],
    ],
  },
  {
    title: "Derecho objetivo, derecho subjetivo y deber",
    pages: "9–13",
    concepts: ["Norma", "Facultad", "Deber jurídico"],
    explanation: [
      "El Derecho objetivo es el conjunto de normas que regula las relaciones. El derecho subjetivo es una facultad o poder reconocido a un sujeto. No son dos ordenamientos distintos: las normas permiten atribuir posiciones a las personas.",
      "El deber jurídico es una conducta exigida por una norma. En una obligación contractual, la facultad del acreedor de reclamar una prestación se corresponde con el deber del deudor. Algunos derechos se ejercen frente a sujetos determinados; otros tienen una protección oponible de manera general.",
      "La distinción entre Derecho público y privado considera la estructura de las relaciones y los intereses regulados. La mera presencia de una administración no resuelve por sí sola cualquier clasificación. Tampoco debe confundirse la palabra subjetivo con una opinión personal sin reconocimiento jurídico.",
    ],
    example:
      "La norma sobre obligaciones pertenece al Derecho objetivo. La facultad de Ana de reclamar el precio pactado es un derecho subjetivo.",
    practice:
      "Explica una compraventa con tres etiquetas: norma, facultad de exigir y deber de realizar una prestación.",
    checks: [
      [
        "El Derecho objetivo designa…",
        [
          "Un conjunto de normas",
          "Solo una opinión",
          "Una facultad individual aislada",
        ],
        0,
        "Objetivo alude al orden normativo.",
      ],
      [
        "El derecho subjetivo es…",
        [
          "Una regla física",
          "Una facultad reconocida a un sujeto",
          "Toda preferencia personal",
        ],
        1,
        "La facultad cuenta con reconocimiento jurídico.",
      ],
      [
        "En una deuda, la facultad de reclamar se relaciona con…",
        [
          "La desaparición de toda obligación",
          "Una sanción siempre penal",
          "El deber de realizar la prestación",
        ],
        2,
        "La relación obligatoria conecta la posición del acreedor con el deber del deudor.",
      ],
    ],
  },
  {
    title: "Estructura y clases de normas jurídicas",
    pages: "12–16",
    concepts: ["Supuesto", "Consecuencia", "Norma dispositiva"],
    explanation: [
      "Una norma puede analizarse mediante un supuesto jurídico y una consecuencia vinculados por un deber ser. No describe simplemente lo que sucede siempre: establece qué debe ocurrir jurídicamente si se realiza una situación prevista.",
      "Las normas imperativas no dejan a sus destinatarios sustituir libremente su regulación mediante pacto. Las dispositivas permiten, dentro de los límites establecidos, una regulación diferente por los interesados. Esta clasificación no equivale a decir que unas sean jurídicas y otras consejos sin fuerza.",
      "Las normas no se agotan en mandatos y prohibiciones. También atribuyen competencias y regulan cómo producir otras normas o celebrar actos. Una disposición escrita puede contener varias normas, y una norma puede reconstruirse relacionando diversas disposiciones.",
    ],
    example:
      "Si no hay pacto válido sobre una cuestión, una regla dispositiva puede proporcionar la solución. Su aplicación subsidiaria no la convierte en una recomendación.",
    practice:
      "Inventa una regla con la forma «si ocurre H, debe producirse C» y distingue después imperatividad y carácter dispositivo.",
    checks: [
      [
        "El esquema supuesto–consecuencia expresa…",
        [
          "Una predicción física infalible",
          "Una vinculación normativa",
          "Un dato sin regulación",
        ],
        1,
        "El enlace es de deber ser y atribuye consecuencias jurídicas.",
      ],
      [
        "Una norma dispositiva…",
        [
          "Nunca se aplica",
          "No es jurídica",
          "Permite una regulación diferente por pacto en los términos admitidos",
        ],
        2,
        "El carácter dispositivo permite cierta autonomía, sin perder naturaleza jurídica.",
      ],
      [
        "Las reglas que atribuyen competencias…",
        [
          "También pueden ser normas jurídicas",
          "Son siempre morales",
          "Carecen de relación con el ordenamiento",
        ],
        0,
        "El Derecho también organiza poderes y procedimientos.",
      ],
    ],
  },
  {
    title: "Unidad, lagunas y antinomias",
    pages: "16–19",
    concepts: ["Unidad", "Plenitud", "Coherencia"],
    explanation: [
      "Un ordenamiento es un conjunto organizado de normas y principios relacionados. La unidad plantea qué criterios permiten reconocer sus elementos. La plenitud se refiere a la respuesta ante casos que requieren solución; la coherencia, a la compatibilidad de las respuestas normativas.",
      "Una laguna es una falta de regulación para el caso que exige respuesta jurídica. Una antinomia aparece cuando normas aplicables ofrecen consecuencias incompatibles. Integrar una laguna y resolver una contradicción son problemas distintos.",
      "Jerarquía, cronología y especialidad ayudan a resolver antinomias. Hay que comprobar competencia y ámbito de aplicación antes de usarlos. Una norma posterior de rango inferior no desplaza por ese solo motivo a una superior; la especialidad tampoco autoriza cualquier infracción de las reglas del sistema.",
    ],
    example:
      "Dos normas aplicables ordenan soluciones incompatibles: estudias una antinomia. Si falta regulación para el caso, el problema es de integración.",
    practice:
      "Haz un esquema: pertenencia → unidad; falta de respuesta → laguna; respuestas incompatibles → antinomia.",
    checks: [
      [
        "Dos consecuencias normativas incompatibles plantean…",
        ["Una costumbre necesariamente", "Una laguna siempre", "Una antinomia"],
        2,
        "La antinomia es un conflicto entre normas aplicables.",
      ],
      [
        "Una falta de regulación puede plantear…",
        [
          "Una laguna jurídica",
          "Una contradicción necesaria",
          "La invalidez de todo el sistema",
        ],
        0,
        "La integración trata de proporcionar respuesta al caso no regulado.",
      ],
      [
        "Una norma posterior inferior desplaza siempre a una superior…",
        [
          "Sí, por cronología",
          "No: debe respetarse la jerarquía",
          "Sí, por ser más breve",
        ],
        1,
        "La posterioridad no borra las exigencias jerárquicas.",
      ],
    ],
  },
  {
    title: "Interpretar, aplicar e integrar el Derecho",
    pages: "18–21",
    concepts: ["Interpretación", "Subsunción", "Analogía"],
    explanation: [
      "Interpretar es determinar el sentido de una norma. Aplicar requiere además identificar y valorar los hechos relevantes, seleccionar las normas y justificar la decisión. La subsunción relaciona un caso con el supuesto normativo; no elimina la necesidad de argumentar.",
      "La interpretación puede atender al texto, al contexto del sistema, a los antecedentes y a la finalidad. Estos elementos se relacionan: una palabra aislada no resuelve necesariamente el problema. La interpretación auténtica procede del órgano que produce la norma; la judicial se desarrolla en la decisión de casos.",
      "La analogía extiende una solución a un supuesto no previsto que comparte una razón relevante con el regulado. No se basa en cualquier parecido y tiene límites de admisibilidad. No debe usarse automáticamente para crear sanciones o restricciones fuera de los presupuestos jurídicos aplicables.",
    ],
    example:
      "Antes de decidir si una regla cubre un supuesto nuevo, fija el sentido de la regla y los hechos probados. Solo después analiza si hay un problema de integración.",
    practice:
      "Ordena los pasos: hechos, norma, interpretación, relación con el caso y justificación de la consecuencia.",
    checks: [
      [
        "Interpretar una norma consiste en…",
        [
          "Determinar su sentido",
          "Inventar cualquier resultado",
          "Omitir el contexto",
        ],
        0,
        "La interpretación reconstruye el significado jurídico de la norma.",
      ],
      [
        "La analogía exige…",
        [
          "Solo que dos palabras se parezcan",
          "Una razón relevante común y que su uso sea admisible",
          "Aplicación ilimitada",
        ],
        1,
        "La semejanza ha de justificar la extensión y respetar sus límites.",
      ],
      [
        "Aplicar Derecho requiere…",
        [
          "Solo copiar un artículo",
          "Prescindir de los hechos",
          "Relacionar hechos y normas y justificar la decisión",
        ],
        2,
        "La aplicación implica selección, interpretación y motivación.",
      ],
    ],
  },
  {
    title: "Derecho, sociedad y cambio social",
    pages: "21–24",
    concepts: ["Control social", "Cambio", "Organización"],
    explanation: [
      "El Derecho se forma en una sociedad y actúa sobre ella. La organización económica, las relaciones de poder y los cambios culturales ayudan a explicar sus transformaciones. A la vez, las instituciones jurídicas pueden modificar incentivos y conductas.",
      "El control social comprende formas de orientar comportamientos. El Derecho es una de ellas, junto con la moral y los usos sociales, y se distingue por su organización institucional. Cumple funciones de ordenación, resolución de conflictos y estabilización de expectativas.",
      "Las explicaciones del cambio jurídico pueden destacar conflicto, consenso o estructura económica. Cada enfoque selecciona factores de análisis. Conviene distinguir una explicación sociológica de por qué aparece una norma de una justificación moral de su contenido.",
    ],
    example:
      "Una nueva forma de contratación digital genera conflictos y reformas. La tecnología influye en el Derecho y la regulación condiciona después su uso.",
    practice:
      "Describe un cambio social, una respuesta jurídica y un efecto de esa respuesta sobre la sociedad.",
    checks: [
      [
        "La relación entre Derecho y sociedad puede ser…",
        ["Solo de aislamiento", "De influencia recíproca", "Inexistente"],
        1,
        "El Derecho recibe influencias sociales y puede producir cambios.",
      ],
      [
        "El control social jurídico se distingue por…",
        [
          "Excluir toda institución",
          "Ser solo una opinión",
          "Sus mecanismos normativos e institucionales",
        ],
        2,
        "La organización institucional diferencia la regulación jurídica.",
      ],
      [
        "Explicar el origen social de una norma equivale a justificarla moralmente…",
        ["No, son preguntas distintas", "Sí, siempre", "Solo por ser antigua"],
        0,
        "Origen y valoración no deben confundirse.",
      ],
    ],
  },
  {
    title: "Eficacia y funciones sociales del Derecho",
    pages: "23–26",
    concepts: ["Cumplimiento", "Función promocional", "Límite al poder"],
    explanation: [
      "La eficacia social considera si las normas se cumplen y se aplican. La efectividad de una medida exige además examinar si logra los fines perseguidos. Una prohibición formal puede tener poco impacto si no se conoce o no dispone de medios de aplicación.",
      "El Derecho orienta conductas, organiza instituciones y ofrece procedimientos para resolver conflictos. También puede legitimar y limitar el poder al someter su ejercicio a reglas. Estas funciones pueden coexistir y entrar en tensión.",
      "La función promocional favorece determinados comportamientos mediante incentivos y medidas positivas. El Derecho no actúa solo a través del castigo: una ayuda condicionada a una finalidad social también orienta conductas. Analiza los resultados y no únicamente la existencia de una norma escrita.",
    ],
    example:
      "Una subvención para mejorar accesibilidad incentiva una conducta. Una sanción por incumplir una obligación actúa de otra forma; ambas pueden orientar comportamientos.",
    practice:
      "Relaciona tres medidas con sus funciones: sanción, incentivo y procedimiento de reclamación.",
    checks: [
      [
        "La función promocional utiliza, entre otros medios…",
        [
          "Solo prisión",
          "Únicamente declaraciones",
          "Incentivos para favorecer conductas",
        ],
        2,
        "El Derecho puede promover fines mediante medidas positivas.",
      ],
      [
        "La eficacia atiende principalmente a…",
        [
          "Cumplimiento y aplicación social",
          "Solo el título de la norma",
          "La justicia necesariamente alcanzada",
        ],
        0,
        "La eficacia pertenece al análisis del funcionamiento social.",
      ],
      [
        "Regular el ejercicio del poder puede…",
        [
          "Impedir cualquier límite",
          "Organizarlo y limitar la arbitrariedad",
          "Eliminar todo procedimiento",
        ],
        1,
        "Las reglas de competencia y procedimiento también limitan el poder.",
      ],
    ],
  },
  {
    title: "Justicia, igualdad y seguridad jurídica",
    pages: "25–30",
    concepts: ["Justicia", "Igualdad", "Seguridad jurídica"],
    explanation: [
      "Los valores jurídicos permiten evaluar el Derecho y orientar su elaboración. La justicia no se identifica sin más con que exista una norma. La igualdad exige justificar el trato igual o diferente atendiendo a circunstancias relevantes.",
      "La seguridad jurídica se relaciona con la previsibilidad, la claridad y la estabilidad razonable de las reglas. No significa inmovilidad absoluta: el Derecho puede cambiar mediante procedimientos reconocibles. Una decisión sorpresiva y arbitraria debilita la confianza en el sistema.",
      "Libertad, igualdad y seguridad pueden exigir ponderar objetivos y efectos. La igualdad formal atiende al trato jurídico; la igualdad material considera condiciones que hacen posible el ejercicio efectivo de los derechos. Argumentar una solución exige precisar qué valor se protege y por qué la medida es adecuada.",
    ],
    example:
      "Una adaptación para que una persona acceda a un servicio puede promover igualdad efectiva. Tratar de manera idéntica situaciones relevantes distintas no garantiza siempre justicia.",
    practice:
      "Explica una medida desde la libertad, la igualdad y la previsibilidad. Identifica un posible conflicto entre esos valores.",
    checks: [
      [
        "La seguridad jurídica favorece…",
        [
          "Previsibilidad y claridad de las reglas",
          "Decisiones arbitrarias",
          "Cambios secretos",
        ],
        0,
        "Permite orientar conductas y prever consecuencias jurídicas.",
      ],
      [
        "La igualdad material considera…",
        [
          "Solo la extensión del texto",
          "Las condiciones efectivas para ejercer derechos",
          "Que toda diferencia es injusta",
        ],
        1,
        "Atiende a obstáculos y condiciones reales, además del reconocimiento formal.",
      ],
      [
        "Una norma es justa solo por haber sido aprobada…",
        [
          "Siempre",
          "Si tiene muchas páginas",
          "No: su contenido admite valoración crítica",
        ],
        2,
        "Validez y justicia son dimensiones distintas.",
      ],
    ],
  },
  {
    title: "Dignidad y fundamentación de los derechos humanos",
    pages: "29–32",
    concepts: ["Dignidad", "Universalidad", "Garantías"],
    explanation: [
      "Los derechos humanos se vinculan a exigencias básicas de dignidad de toda persona. La pretensión de universalidad los diferencia de privilegios concedidos solo a un estamento. Su reconocimiento jurídico y sus garantías determinan cómo pueden exigirse en un sistema concreto.",
      "Las fundamentaciones iusnaturalistas apelan a exigencias de la naturaleza humana o principios superiores al Derecho positivo. Las positivistas subrayan el reconocimiento por normas jurídicas. Las fundamentaciones éticas destacan valores y razones morales que justifican su protección.",
      "Fundamentar un derecho, reconocerlo en una norma y garantizarlo son operaciones relacionadas pero diferentes. Un listado de derechos sin procedimientos, recursos ni instituciones de protección puede tener una eficacia limitada. No basta memorizar una declaración para explicar su garantía.",
    ],
    example:
      "Reclamar protección de la dignidad formula una razón de fondo. Identificar la norma y el procedimiento de tutela explica cómo hacer valer jurídicamente esa protección.",
    practice:
      "Haz una cadena: fundamento → reconocimiento → garantía. Añade una pregunta para cada paso.",
    checks: [
      [
        "La universalidad se opone a entender los derechos como…",
        [
          "Exigencias de dignidad",
          "Privilegios exclusivos de un estamento",
          "Protección de toda persona",
        ],
        1,
        "El privilegio estamental limita sus beneficiarios; la pretensión universal no.",
      ],
      [
        "Reconocer un derecho y garantizarlo…",
        [
          "Son siempre suficientes por sí solos",
          "Son operaciones idénticas",
          "Son operaciones distintas y relacionadas",
        ],
        2,
        "La garantía exige mecanismos para su protección efectiva.",
      ],
      [
        "Una fundamentación ética se apoya principalmente en…",
        [
          "Razones y valores morales",
          "El número de artículos",
          "La mera antigüedad",
        ],
        0,
        "Justifica por qué debe reconocerse y protegerse el derecho.",
      ],
    ],
  },
  {
    title: "Generaciones y evolución de los derechos",
    pages: "31–35",
    concepts: ["Libertad", "Derechos sociales", "Solidaridad"],
    explanation: [
      "El esquema de generaciones organiza históricamente reivindicaciones de derechos. La primera se asocia a libertades civiles y participación política. La segunda destaca derechos económicos, sociales y culturales y las condiciones de una vida digna.",
      "La tercera agrupa reivindicaciones de solidaridad, como paz, desarrollo y protección del medio ambiente. Es una clasificación didáctica con debates sobre su contenido y articulación jurídica; no significa que cada generación anule la anterior.",
      "Los derechos son interdependientes. La participación política puede resultar poco efectiva sin educación o condiciones materiales básicas. Su evolución combina declaraciones, reconocimiento constitucional e instrumentos internacionales, con garantías diferentes según el sistema y el derecho concreto.",
    ],
    example:
      "Poder votar y acceder a educación pertenecen a categorías distintas del esquema, pero pueden reforzarse mutuamente en su ejercicio efectivo.",
    practice:
      "Clasifica libertad de expresión, educación y paz. Explica por qué la clasificación no implica sustitución de unos derechos por otros.",
    checks: [
      [
        "Los derechos civiles y políticos se asocian a la…",
        [
          "Tercera generación exclusivamente",
          "Desaparición de la libertad",
          "Primera generación",
        ],
        2,
        "La primera generación destaca libertad y participación.",
      ],
      [
        "Los derechos económicos, sociales y culturales se vinculan a la…",
        [
          "Segunda generación",
          "Eliminación de garantías",
          "Primera exclusivamente",
        ],
        0,
        "La segunda generación incorpora exigencias sociales y materiales.",
      ],
      [
        "La aparición de nuevas generaciones…",
        [
          "Anula todos los derechos anteriores",
          "No implica sustituir los derechos anteriores",
          "Elimina su interdependencia",
        ],
        1,
        "El esquema es acumulativo y los derechos se relacionan.",
      ],
    ],
  },
  {
    title: "Ética y deontología de las profesiones jurídicas",
    pages: "35–39",
    concepts: ["Ética aplicada", "Deontología", "Conflicto de intereses"],
    explanation: [
      "La ética reflexiona críticamente sobre la moral y las razones de la conducta. La ética profesional es ética aplicada a responsabilidades de una actividad. La deontología concreta deberes vinculados al ejercicio de una profesión.",
      "Independencia, integridad, competencia y confidencialidad ayudan a comprender la responsabilidad de quienes ejercen profesiones jurídicas. Su contenido concreto depende de la profesión y de su regulación. No puede trasladarse sin matices el deber propio de un juez a la posición de un abogado.",
      "Los códigos pueden contener orientaciones éticas y reglas con consecuencias disciplinarias. Debe comprobarse la fuente antes de afirmar qué sanción procede. Un conflicto de intereses requiere identificar las lealtades y los deberes implicados, no resolverlo solo por conveniencia personal.",
    ],
    example:
      "Un profesional recibe un asunto incompatible con una obligación previa de confidencialidad. Debe identificar las reglas de su profesión y el posible conflicto antes de aceptarlo.",
    practice:
      "Distingue razón ética, deber profesional y posible consecuencia disciplinaria en un caso de conflicto de intereses.",
    checks: [
      [
        "La ética profesional es una forma de…",
        ["Ética aplicada", "Ley física", "Opinión sin razones"],
        0,
        "Aplica la reflexión ética a responsabilidades profesionales.",
      ],
      [
        "Los deberes concretos de cada profesión…",
        [
          "Son siempre idénticos",
          "Exigen atender a su función y regulación",
          "Se deducen solo de preferencias",
        ],
        1,
        "Las funciones y las normas profesionales determinan deberes específicos.",
      ],
      [
        "Antes de atribuir una sanción disciplinaria hay que…",
        [
          "Presuponer que todo reproche moral la produce",
          "Ignorar la fuente",
          "Comprobar las reglas aplicables",
        ],
        2,
        "No todo principio ético tiene automáticamente la misma consecuencia jurídica.",
      ],
    ],
  },
  {
    title: "Ciencia, filosofía y sociología del Derecho",
    pages: "38–45",
    concepts: ["Dogmática", "Sociología jurídica", "Filosofía jurídica"],
    explanation: [
      "El Derecho puede estudiarse desde perspectivas diferentes. La dogmática jurídica interpreta y sistematiza el Derecho positivo de un ámbito. La sociología jurídica analiza sus relaciones con los hechos sociales, su cumplimiento y sus efectos.",
      "La filosofía del Derecho examina problemas generales de concepto, fundamento y justicia. La Historia del Derecho estudia la transformación de instituciones y fuentes en su contexto temporal. Cada perspectiva plantea preguntas y utiliza métodos que no se reducen a memorizar artículos.",
      "Una investigación puede combinar enfoques si distingue sus afirmaciones. Decir qué exige una norma vigente, medir cuántas personas la cumplen y valorar si es justa requiere evidencias y argumentos diferentes. Identificar la pregunta evita confundir una descripción empírica con una conclusión normativa.",
    ],
    example:
      "Ante una nueva ley, el jurista interpreta sus requisitos, el sociólogo estudia sus efectos y el filósofo analiza su justificación. Son preguntas complementarias.",
    practice:
      "Formula tres preguntas sobre una ley: una dogmática, una sociológica y una filosófica.",
    checks: [
      [
        "Interpretar y sistematizar normas positivas corresponde principalmente a…",
        ["La física", "La dogmática jurídica", "Solo la estadística"],
        1,
        "La dogmática trabaja con el sentido y la organización del Derecho positivo.",
      ],
      [
        "Medir el cumplimiento social de una norma es una pregunta…",
        [
          "Exclusivamente gramatical",
          "Sin relación con el Derecho",
          "Sociológica",
        ],
        2,
        "La sociología jurídica estudia funcionamiento y efectos sociales.",
      ],
      [
        "Preguntar por la justicia de una regulación es propio de…",
        [
          "La filosofía del Derecho",
          "La mera transcripción",
          "Solo el recuento de artículos",
        ],
        0,
        "La filosofía jurídica incluye la reflexión sobre fundamentos y valores.",
      ],
    ],
  },
];

export const theoryLessons: Lesson[] = topics.map((topic, index) => ({
  id: `teoria-tema-${index + 1}-v1`,
  code: "021021",
  topic: `Tema ${index + 1}`,
  title: topic.title,
  minutes: 5,
  objective: `Explicar y aplicar estos conceptos: ${topic.concepts.join(", ")}.`,
  concepts: topic.concepts,
  explanation: topic.explanation,
  example: topic.example,
  practice: topic.practice,
  sources: [
    `Apuntes Teoria del Derecho 2024-25.pdf · páginas PDF ${topic.pages}`,
    `Libro Teoría del Derecho 2024 editable_261014_141006.pdf · tema ${index + 1} (recibido en seis fragmentos)`,
  ],
  questions: topic.checks.map(
    ([prompt, options, answer, explanation], i): Question => ({
      prompt,
      options,
      answer,
      explanation,
      difficulty: i === 0 ? "fácil" : "media",
    }),
  ),
}));
