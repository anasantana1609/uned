import type { Subject, Exam } from "./model";
import { catalogEntry } from "./subject-catalog";

export type Question = {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  difficulty: "fácil" | "media" | "difícil";
};
export type Lesson = {
  id: string;
  code: string;
  topic: string;
  title: string;
  minutes: 5;
  objective: string;
  concepts: string[];
  explanation: string[];
  example: string;
  practice: string;
  sources: string[];
  questions: Question[];
};
export type LearningProgress = Record<string, string>;
const q = (
  prompt: string,
  options: string[],
  answer: number,
  explanation: string,
  difficulty: Question["difficulty"] = "media",
): Question => ({ prompt, options, answer, explanation, difficulty });
// Original teaching summaries and exercises. Source documents and transcripts are never bundled.
export const lessons: Lesson[] = [
  {
    id: "civil-ambito-v1",
    code: "021096",
    topic: "Tema 1",
    title: "Qué estudia el Derecho civil",
    minutes: 5,
    objective:
      "Reconocer las relaciones de persona, familia y patrimonio y distinguirlas de otros ámbitos jurídicos.",
    concepts: ["Persona", "Familia", "Patrimonio"],
    explanation: [
      "El Derecho civil se ocupa de la persona y de muchas relaciones de su vida cotidiana: su situación jurídica, sus relaciones familiares y sus intereses patrimoniales. Una compra, una herencia o la protección de la personalidad permiten reconocer esa dimensión civil.",
      "El patrimonio no se limita al dinero: comprende posiciones jurídicas de contenido económico, como bienes, créditos y deudas. La familia y la persona tampoco se reducen a cuestiones económicas. Por eso identificar Derecho civil con dinero o contratos deja fuera partes esenciales de su contenido.",
      "Para clasificar un caso, pregunta qué relación se está regulando. Una pena por un delito pertenece al ámbito penal; la compraventa entre particulares plantea una relación civil. Que dos asuntos tengan consecuencias económicas no los convierte en la misma materia. Un hecho puede dar lugar a cuestiones de distintas ramas: distingue la pregunta concreta que debes resolver.",
    ],
    example:
      "Lucía compra una bicicleta a Marcos. El pago y la entrega son cuestiones de la relación civil. Si aparece además una posible estafa, su eventual sanción exige distinguir la cuestión penal de las obligaciones entre comprador y vendedor.",
    practice:
      "Sin mirar arriba, escribe tres palabras que definan el núcleo civil. Después inventa una relación civil que no sea una compraventa y explica por qué pertenece a este ámbito.",
    sources: [
      "TEMA 1 CIVIL RH.pdf · páginas PDF 3–5",
      "Apuntes actualizados 2025-6 Derecho Civil I.1.pdf · páginas PDF 1–3, epígrafe 3",
      "Programa 2026/27 · página PDF 2; concordancias · página PDF 1",
    ],
    questions: [
      q(
        "¿Qué conjunto describe el núcleo del Derecho civil?",
        [
          "Delitos, penas y prisiones",
          "Persona, familia y patrimonio",
          "Elecciones y cámaras legislativas",
        ],
        1,
        "El núcleo civil combina persona, familia y patrimonio.",
        "fácil",
      ),
      q(
        "¿Por qué es insuficiente identificar el Derecho civil solo con contratos?",
        [
          "Porque los contratos carecen de efectos jurídicos",
          "Porque todo contrato es un delito",
          "Porque también regula aspectos de la persona y de la familia",
        ],
        2,
        "Los contratos son una parte, pero no agotan la materia civil.",
      ),
      q(
        "Una misma conducta genera una deuda y una posible sanción penal. ¿Cómo la analizas?",
        [
          "Distinguiendo la relación civil de la eventual responsabilidad penal",
          "Clasificando todo como civil porque hay dinero",
          "Descartando la obligación civil por existir una cuestión penal",
        ],
        0,
        "Un hecho puede plantear cuestiones de distintas ramas; identifica la relación y la consecuencia que se analizan.",
        "difícil",
      ),
    ],
  },
  {
    id: "civil-fuentes-v1",
    code: "021096",
    topic: "Tema 2",
    title: "Ley, costumbre y principios generales",
    minutes: 5,
    objective:
      "Recordar las fuentes del artículo 1.1 del Código Civil y su aplicación subsidiaria en el régimen común.",
    concepts: ["Ley", "Costumbre", "Principios generales"],
    explanation: [
      "El artículo 1.1 del Código Civil enumera la ley, la costumbre y los principios generales del Derecho. Aprender la lista es el primer paso; el segundo es comprender que no se eligen libremente según la solución que más nos guste.",
      "En el régimen común, la costumbre rige en defecto de ley aplicable, siempre que no sea contraria a la moral o al orden público y resulte probada. Un hábito repetido no se convierte automáticamente en una costumbre jurídicamente aplicable. Hay que comprobar sus condiciones.",
      "Los principios generales se aplican en defecto de ley o costumbre y tienen además carácter informador del ordenamiento. No equivalen a la opinión personal de lo que sería justo. Esta explicación se refiere al régimen común del Código Civil: no borra las particularidades de los Derechos civiles forales o especiales.",
    ],
    example:
      "En una controversia se invoca una práctica local. Antes de aplicarla, comprueba si hay una ley aplicable y si la práctica reúne los requisitos de una costumbre jurídica. Su popularidad, por sí sola, no basta.",
    practice:
      "Explica en voz alta qué significa «en defecto de». Ordena las tres fuentes y añade una condición necesaria para aplicar la costumbre.",
    sources: [
      "Apuntes actualizados 2025-6 Derecho Civil I.1.pdf · páginas PDF 9–10",
      "preguntas tipo temas 1 y 2.pdf · página PDF 1",
    ],
    questions: [
      q(
        "¿Qué enumera el artículo 1.1 del Código Civil?",
        [
          "Ley, costumbre y principios generales del Derecho",
          "Ley, opiniones y cualquier hábito",
          "Solo sentencias",
        ],
        0,
        "La enumeración es ley, costumbre y principios generales.",
        "fácil",
      ),
      q(
        "En el régimen común, una costumbre puede regir…",
        [
          "Aunque contradiga siempre la ley aplicable",
          "Solo por ser muy frecuente",
          "En defecto de ley aplicable, cumpliendo sus requisitos",
        ],
        2,
        "La costumbre es subsidiaria y debe reunir los requisitos jurídicos.",
      ),
      q(
        "No hay ley ni costumbre aplicable. ¿Qué afirmación es correcta?",
        [
          "Se elige cualquier solución personal",
          "Pueden aplicarse los principios generales, que además informan el ordenamiento",
          "El ordenamiento prohíbe buscar otra fuente",
        ],
        1,
        "Los principios generales cumplen una función subsidiaria e informadora.",
        "difícil",
      ),
    ],
  },
  {
    id: "civil-jurisprudencia-v1",
    code: "021096",
    topic: "Tema 2",
    title: "La función de la jurisprudencia",
    minutes: 5,
    objective:
      "Distinguir la enumeración de fuentes de la función complementaria de la jurisprudencia.",
    concepts: ["Artículo 1.1 CC", "Artículo 1.6 CC", "Doctrina reiterada"],
    explanation: [
      "Las decisiones judiciales permiten comprender cómo se interpreta y aplica el Derecho. Pero una pregunta que pide enumerar las fuentes del artículo 1.1 no pide exactamente lo mismo que otra sobre la función de la jurisprudencia del artículo 1.6.",
      "El artículo 1.6 atribuye a la jurisprudencia una función complementaria del ordenamiento: la doctrina que establece de modo reiterado el Tribunal Supremo al interpretar y aplicar la ley, la costumbre y los principios generales. Retén conjuntamente el tribunal, la reiteración y la tarea de interpretación y aplicación.",
      "No añadas sin más una cuarta fuente a la enumeración del artículo 1.1. Tampoco conviertas cualquier sentencia aislada de cualquier órgano judicial en la doctrina reiterada a la que se refiere el artículo 1.6. Esta precisión no significa que otras resoluciones sean irrelevantes: significa que debes responder a la categoría jurídica exacta que pregunta el enunciado.",
    ],
    example:
      "Una noticia cita una sentencia de una Audiencia Provincial. Puede resultar relevante, pero esa única resolución no constituye por sí sola la doctrina reiterada del Tribunal Supremo descrita en el artículo 1.6.",
    practice:
      "Completa sin mirar: las fuentes se enumeran en el artículo…; la jurisprudencia complementa el ordenamiento según el artículo… Explica después por qué una sentencia aislada no basta para la definición estudiada.",
    sources: [
      "Apuntes actualizados 2025-6 Derecho Civil I.1.pdf · páginas PDF 10–11",
      "preguntas tipo temas 1 y 2.pdf · página PDF 1, preguntas 3 y 4 (material de práctica)",
    ],
    questions: [
      q(
        "Según el artículo 1.6, la jurisprudencia…",
        [
          "Sustituye toda ley",
          "Complementa el ordenamiento jurídico",
          "Es cualquier opinión docente",
        ],
        1,
        "Su función es complementar el ordenamiento.",
        "fácil",
      ),
      q(
        "¿Qué elemento pertenece a la definición estudiada?",
        [
          "Una única noticia jurídica",
          "Una sentencia de cualquier órgano",
          "Doctrina reiterada del Tribunal Supremo",
        ],
        2,
        "La definición reúne reiteración y doctrina del Tribunal Supremo.",
      ),
      q(
        "Te piden las fuentes del artículo 1.1. ¿Cómo respondes?",
        [
          "Ley, costumbre y principios generales, distinguiendo la función complementaria de la jurisprudencia",
          "Solo jurisprudencia",
          "Añadiendo toda sentencia como una cuarta fuente equivalente",
        ],
        0,
        "No confundas la enumeración del artículo 1.1 con la función del artículo 1.6.",
        "difícil",
      ),
    ],
  },
  {
    id: "procesal-tres-ejes-v1",
    code: "021044",
    topic: "Lección 1",
    title: "Jurisdicción, acción y proceso",
    minutes: 5,
    objective:
      "Distinguir quién ejerce la potestad, cómo se solicita tutela y mediante qué instrumento se tramita.",
    concepts: ["Jurisdicción", "Acción", "Proceso"],
    explanation: [
      "El Derecho procesal estudia la jurisdicción, la acción y el proceso. Son tres perspectivas relacionadas, pero distintas. Si las separas, comprenderás mejor por qué una persona acude a un tribunal y cómo se tramita su petición.",
      "La jurisdicción comprende la potestad de juzgar y hacer ejecutar lo juzgado, atribuida a jueces y tribunales. La acción se relaciona con el derecho a solicitar tutela judicial: permite acudir a la jurisdicción. El proceso es el instrumento jurídicamente regulado mediante el que se encauza esa petición y se resuelve el conflicto con las garantías correspondientes.",
      "Pedir tutela no asegura que la pretensión sea estimada. La resolución depende de los presupuestos procesales y del examen jurídico del caso. Por eso no debes confundir tener acceso a la justicia con tener razón en el fondo. En cada supuesto, identifica el órgano, la petición y el cauce: así evitarás usar jurisdicción, acción y proceso como sinónimos.",
    ],
    example:
      "Una persona reclama judicialmente una deuda. Acude al tribunal solicitando tutela; el tribunal ejerce la potestad jurisdiccional y el procedimiento organiza las actuaciones. La mera presentación de la demanda no garantiza el cobro.",
    practice:
      "Explica el ejemplo con tres frases: una sobre el órgano, otra sobre el derecho de quien reclama y otra sobre el instrumento de tramitación.",
    sources: [
      "Lección I ProcesalConcepto, fuentes y regulación_261014_193542.pdf · página PDF 1",
      "Programa Introducción Derecho Procesal.pdf · página PDF 1",
    ],
    questions: [
      q(
        "¿Cuál es el instrumento regulado para encauzar la tutela ante los tribunales?",
        ["El proceso", "La preferencia privada del juez", "La autotutela"],
        0,
        "El proceso organiza la actuación jurisdiccional.",
        "fácil",
      ),
      q(
        "La potestad de juzgar y hacer ejecutar lo juzgado corresponde a…",
        [
          "Cualquier parte del conflicto",
          "Jueces y tribunales",
          "El mediador por el solo hecho de mediar",
        ],
        1,
        "Es una potestad jurisdiccional atribuida a jueces y tribunales.",
      ),
      q(
        "¿Solicitar tutela garantiza ganar la reclamación?",
        [
          "Sí, presentar la demanda prueba la deuda",
          "Sí, si se reclama una cantidad pequeña",
          "No; acceso a tutela y estimación de la pretensión son distintos",
        ],
        2,
        "El derecho a solicitar tutela no garantiza una resolución favorable sobre el fondo.",
        "difícil",
      ),
    ],
  },
  {
    id: "procesal-autocomposicion-v1",
    code: "021044",
    topic: "Lección 2",
    title: "Acuerdo frente a imposición",
    minutes: 5,
    objective:
      "Distinguir autocomposición y heterocomposición por quién decide la solución.",
    concepts: ["Autocomposición", "Heterocomposición", "Mediación"],
    explanation: [
      "Un conflicto puede resolverse de distintos modos. La pregunta que organiza este bloque es quién decide la solución. Si las partes alcanzan una solución por acuerdo, hablamos de autocomposición. Si un tercero resuelve con una decisión que se impone a las partes en el marco correspondiente, hablamos de heterocomposición.",
      "La presencia de una tercera persona no basta para distinguirlas. En la mediación, el mediador puede facilitar la comunicación y la búsqueda de un acuerdo, pero no impone la solución. Si el acuerdo lo adoptan las partes, la solución sigue siendo autocompositiva. El arbitraje, en cambio, encomienda la decisión al árbitro y es una forma de heterocomposición.",
      "Estos mecanismos tienen presupuestos y límites: no todo objeto es disponible ni cualquier conflicto puede resolverse por cualquier vía. Aquí aprendemos a clasificar el mecanismo, sin suponer que toda disputa puede someterse a mediación o arbitraje. La validez y los efectos de cada solución deben examinarse en su regulación.",
    ],
    example:
      "Dos personas negocian con ayuda de una mediadora y aceptan un acuerdo. Decide el acuerdo de las partes, no la mediadora. Si en otro supuesto admisible encargan a un árbitro que decida, cambia quién determina la solución.",
    practice:
      "Clasifica negociación, mediación, arbitraje y proceso judicial según quién decide. Evita usar como único criterio que intervenga o no una tercera persona.",
    sources: [
      "Lección IIC El fundamento de la Jurisdicción _261014_193535.pdf · páginas PDF 1–2",
    ],
    questions: [
      q(
        "Un acuerdo alcanzado por las partes es una solución…",
        ["Siempre judicial", "Autocompositiva", "Siempre impuesta"],
        1,
        "Las partes deciden el contenido del acuerdo.",
        "fácil",
      ),
      q(
        "¿La participación de una mediadora convierte necesariamente la solución en heterocomposición?",
        [
          "Sí, cualquier tercero impone",
          "Sí, porque desaparece la voluntad de las partes",
          "No, si la decisión sigue correspondiendo a las partes",
        ],
        2,
        "El criterio es quién decide, no la mera presencia de un tercero.",
      ),
      q(
        "¿Cuál es la diferencia clave entre mediación y arbitraje?",
        [
          "El mediador facilita el acuerdo; el árbitro decide dentro del marco arbitral",
          "En ambos el tercero solo observa",
          "El mediador siempre dicta un laudo",
        ],
        0,
        "La mediación mantiene la decisión en las partes; el arbitraje la encomienda al árbitro.",
        "difícil",
      ),
    ],
  },
  {
    id: "procesal-autotutela-v1",
    code: "021044",
    topic: "Lección 2",
    title: "Por qué tener razón no permite imponerse",
    minutes: 5,
    objective:
      "Reconocer la autotutela y distinguirla de una reclamación por cauces jurídicos.",
    concepts: ["Autotutela", "Coacción", "Cauces jurídicos"],
    explanation: [
      "La autotutela consiste en imponer unilateralmente una solución al conflicto desde una posición de fuerza. Su rasgo decisivo no es que alguien crea que tiene razón, sino que haga prevalecer su propia solución coactivamente frente a la otra parte.",
      "El ordenamiento tiende a prohibir que cada persona se tome la justicia por su mano. La protección judicial y los mecanismos de solución de controversias permiten reclamar sin convertir la fuerza en el criterio de decisión. Que exista un crédito no significa que su titular pueda emplear cualquier medio para cobrarlo.",
      "Los materiales también señalan manifestaciones de autodefensa admitidas por la ley. No conviene formular una prohibición absoluta sin excepciones, ni convertir esas excepciones en autorización general para imponerse. Primero identifica la conducta y después comprueba si existe una habilitación legal concreta. Esta distinción evita dos errores: llamar autotutela a cualquier petición firme y justificar la coacción porque el reclamante cree que tiene derecho.",
    ],
    example:
      "El acreedor exige el pago e invita a negociar: reclamar no es, por sí solo, imponer coactivamente. Si amenaza o fuerza al deudor para obtener la solución que él decide, aparece una cuestión distinta que no se legitima automáticamente por la existencia de la deuda.",
    practice:
      "Formula una reclamación de deuda por un cauce jurídico y compárala con la imposición por fuerza. Explica qué elemento cambia, sin afirmar que cualquier conducta concreta constituye necesariamente un delito.",
    sources: [
      "Lección IIC El fundamento de la Jurisdicción _261014_193535.pdf · página PDF 1",
    ],
    questions: [
      q(
        "¿Qué caracteriza a la autotutela?",
        [
          "Imponer coactivamente la propia solución",
          "Pedir voluntariamente una mediación",
          "Presentar una demanda",
        ],
        0,
        "La imposición unilateral y coactiva distingue la autotutela.",
        "fácil",
      ),
      q(
        "Creer que se tiene un crédito permite…",
        [
          "Usar cualquier forma de fuerza",
          "Prescindir de toda norma",
          "Reclamar por los cauces jurídicos correspondientes",
        ],
        2,
        "Tener un derecho no habilita cualquier medio para hacerlo efectivo.",
      ),
      q(
        "¿Qué formulación refleja mejor los límites estudiados?",
        [
          "Toda autodefensa es siempre lícita",
          "La autotutela tiende a prohibirse, sin negar habilitaciones legales concretas",
          "No existen excepciones legales posibles",
        ],
        1,
        "Los materiales describen la prohibición general y manifestaciones lícitas concretas; no autorizan una imposición general.",
        "difícil",
      ),
    ],
  },
  {
    id: "fundamentos-justicia-v1",
    code: "901012",
    topic: "Tema 1 · 1.3",
    title: "Derecho y justicia",
    minutes: 5,
    objective:
      "Distinguir las formulaciones de Celso y Ulpiano y comprender su relación con la tarea del jurista.",
    concepts: ["Celso", "Ulpiano", "Dar a cada uno su derecho"],
    explanation: [
      "Derecho y justicia están relacionados, pero no son palabras intercambiables. Estudiar su relación exige distinguir las normas, su aplicación y el fin de justicia que se persigue. Las formulaciones clásicas ofrecen puntos de referencia para pensar esa relación.",
      "Celso caracteriza el Derecho como el arte de lo bueno y de lo justo. Ulpiano presenta la justicia como la constante y perpetua voluntad de dar a cada uno su derecho. No basta con aprender dos nombres: observa que una formulación se refiere al Derecho como arte y la otra a una voluntad orientada a atribuir lo que corresponde a cada uno.",
      "La tarea del jurista exige discernir lo justo de lo injusto al conocer e interpretar el Derecho. Esto no equivale a resolver de acuerdo con el gusto personal. Al practicar un test, lee si te preguntan por el autor, por la definición de Derecho o por la de justicia: una respuesta puede contener una frase correcta y ser incorrecta para la pregunta planteada.",
    ],
    example:
      "Si la pregunta pide la definición de justicia atribuida a Ulpiano, responder con la expresión de Celso sobre el Derecho confunde objeto y autor, aunque ambas formulaciones se hayan estudiado juntas.",
    practice:
      "Tapa el texto y escribe una línea para Celso y otra para Ulpiano. Después explica con tus palabras por qué no basta con intercambiar las dos definiciones.",
    sources: [
      "temas 1 y 2 FBDR.pptx · diapositiva 4; epígrafe 1.3",
      "Introducción a la asignatura Fundamentos_261014_195051.pdf · páginas PDF 4–5 (alcance y exclusiones)",
    ],
    questions: [
      q(
        "¿A quién se atribuye la definición de justicia como constante y perpetua voluntad de dar a cada uno su derecho?",
        ["Celso", "Ulpiano", "Kelsen"],
        1,
        "La formulación de justicia estudiada es de Ulpiano.",
        "fácil",
      ),
      q(
        "¿Qué formulación se asocia a Celso?",
        [
          "El Derecho como arte de lo bueno y de lo justo",
          "La jerarquía normativa como definición de justicia",
          "La justicia como cualquier decisión personal",
        ],
        0,
        "Celso caracteriza así el Derecho.",
      ),
      q(
        "Un test pide la definición de justicia de Ulpiano y ofrece la frase de Celso sobre el Derecho. ¿Qué debes advertir?",
        [
          "Que las dos expresiones son intercambiables",
          "Que el autor carece siempre de relevancia",
          "Que se confunden la definición solicitada y la formulación de otro autor",
        ],
        2,
        "Distingue tanto el autor como el objeto de la definición.",
        "difícil",
      ),
    ],
  },
  {
    id: "fundamentos-ley-v1",
    code: "901012",
    topic: "Tema 2 · 2.2–2.3",
    title: "Ley formal y ley material",
    minutes: 5,
    objective:
      "Separar el criterio de órgano y procedimiento del uso amplio de ley como norma positiva.",
    concepts: ["Ley formal", "Ley material", "Rango normativo"],
    explanation: [
      "La expresión ley puede utilizarse con distintos alcances. En sentido formal, se atiende al órgano legislativo y al procedimiento de elaboración y aprobación previsto. No basta con que una regla sea obligatoria para que tenga forma de ley.",
      "En el sentido material amplio empleado en las diapositivas, la expresión incluye normas jurídicas positivas de distintas fuentes, como decretos u órdenes ministeriales. Esta amplitud terminológica no borra las diferencias de rango, competencia o procedimiento entre esas normas.",
      "En un test, identifica primero el sentido utilizado. Decir que una orden ministerial encaja en ese uso material amplio no significa que sea una ley parlamentaria ni que tenga su mismo rango. Del mismo modo, que una norma sea coactiva u obligatoria no permite deducir por sí solo qué órgano la aprobó. Separa tres preguntas: qué regula, quién la produce y qué posición ocupa en el ordenamiento.",
    ],
    example:
      "Un enunciado llama ley, en sentido material amplio, a una orden ministerial. Puedes aceptar ese uso explicado en el material sin afirmar que un ministro ejerce por ello la función legislativa de las Cortes.",
    practice:
      "Compara ley formal y sentido material amplio en dos frases. Añade una tercera que explique por qué hablar de norma positiva no iguala todos los rangos.",
    sources: ["temas 1 y 2 FBDR.pptx · diapositiva 8"],
    questions: [
      q(
        "La ley formal se identifica atendiendo principalmente a…",
        [
          "Su número de páginas",
          "Su popularidad",
          "El órgano y procedimiento previstos para su aprobación",
        ],
        2,
        "El criterio formal se refiere al órgano y al procedimiento.",
        "fácil",
      ),
      q(
        "En el uso material amplio de las diapositivas, ¿puede incluirse una orden ministerial?",
        [
          "Sí, sin convertirla en ley parlamentaria ni alterar su rango",
          "Sí, por lo que prevalece sobre la Constitución",
          "No, porque ninguna orden es una norma",
        ],
        0,
        "La amplitud del término no iguala la forma ni el rango de las normas.",
      ),
      q(
        "«Toda norma obligatoria es una ley formal». ¿Qué error contiene?",
        [
          "Distingue correctamente todas las categorías",
          "Deduce órgano y procedimiento a partir de la obligatoriedad",
          "Demuestra que no existe ley material",
        ],
        1,
        "La obligatoriedad no basta para determinar que la norma sea una ley formal.",
        "difícil",
      ),
    ],
  },
  {
    id: "fundamentos-ordenamiento-v1",
    code: "901012",
    topic: "Tema 2 · 2.4",
    title: "Antinomias y lagunas",
    minutes: 5,
    objective:
      "Distinguir contradicción normativa y falta de regulación, relacionándolas con coherencia y plenitud.",
    concepts: ["Antinomia", "Laguna", "Coherencia y plenitud"],
    explanation: [
      "Una antinomia aparece cuando varias normas ofrecen para el mismo supuesto resultados incompatibles. Una laguna se plantea cuando falta regulación para el caso. El primer problema es la contradicción; el segundo, la ausencia de una respuesta normativa específica.",
      "La coherencia del ordenamiento se relaciona con los criterios para resolver contradicciones. La presentación destaca la jerarquía normativa: las normas no están aisladas ni ocupan todas la misma posición. No debes concluir que el ordenamiento es coherente solo si jamás surge una contradicción; importa que disponga de mecanismos para tratarla.",
      "La plenitud se relaciona con la respuesta ante lagunas. La analogía puede permitir aplicar a un supuesto no regulado la solución de otro semejante cuando sea jurídicamente admisible. No es una autorización para extender cualquier norma sin límites. Antes de seleccionar una técnica, diagnostica el problema: ¿sobran respuestas incompatibles o falta una regulación?",
    ],
    example:
      "Dos normas incompatibles pretenden regir una misma situación: investiga los criterios de solución de conflictos. Un supuesto sin regulación específica exige estudiar técnicas de integración, sin suponer automáticamente que cualquier analogía sea admisible.",
    practice:
      "Inventa un ejemplo abstracto de contradicción y otro de ausencia de regulación. Usa después las palabras coherencia y plenitud en dos frases diferentes.",
    sources: ["temas 1 y 2 FBDR.pptx · diapositivas 9–10"],
    questions: [
      q(
        "Dos normas dan respuestas incompatibles al mismo supuesto. Hay…",
        [
          "Una antinomia",
          "Necesariamente una laguna",
          "Una simple preferencia",
        ],
        0,
        "La antinomia es una contradicción entre normas.",
        "fácil",
      ),
      q(
        "¿Con qué problema se relaciona principalmente la plenitud?",
        [
          "Con el número de jueces",
          "Con la integración de lagunas",
          "Con que todas las normas tengan idéntico rango",
        ],
        1,
        "La plenitud alude a la respuesta del ordenamiento ante la falta de regulación.",
      ),
      q(
        "Un supuesto no está regulado y se estudia aplicar una norma de un caso semejante. ¿Qué diagnóstico es correcto?",
        [
          "Antinomia resuelta siempre por jerarquía",
          "Una nueva ley formal creada por el estudiante",
          "Laguna cuya integración por analogía debe comprobarse como admisible",
        ],
        2,
        "La analogía es una técnica de integración con presupuestos y límites.",
        "difícil",
      ),
    ],
  },
];
export function lessonsFor(code: string | undefined) {
  return lessons.filter((l) => l.code === code);
}
export function passedLesson(lesson: Lesson, answers: number[]) {
  return (
    answers.length === lesson.questions.length &&
    lesson.questions.every(
      (q, i) => Number.isInteger(answers[i]) && answers[i] === q.answer,
    )
  );
}
export function readLearningProgress(raw: string): LearningProgress {
  const value: unknown = JSON.parse(raw);
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("Progreso no válido");
  return Object.fromEntries(
    Object.entries(value).filter(
      ([id, date]) =>
        lessons.some((l) => l.id === id) &&
        typeof date === "string" &&
        !Number.isNaN(Date.parse(date)),
    ),
  );
}
export function learningSummary(
  code: string | undefined,
  progress: LearningProgress,
) {
  const available = lessonsFor(code);
  const passed = available.filter((l) => Boolean(progress[l.id])).length;
  return {
    total: available.length,
    passed,
    percent: available.length
      ? Math.round((passed / available.length) * 100)
      : 0,
  };
}
export function recommendSubject(
  subjects: Subject[],
  progress: LearningProgress,
  exams: Exam[],
  today: string,
) {
  return subjects
    .filter((s) => {
      const summary = learningSummary(catalogEntry(s)?.code, progress);
      return summary.total > summary.passed;
    })
    .sort((a, b) => {
      const nearest = (s: Subject) =>
        exams
          .filter((e) => e.subjectId === s.id && e.confirmed && e.date >= today)
          .map((e) => e.date)
          .sort()[0] ?? "9999-12-31";
      return (
        nearest(a).localeCompare(nearest(b)) ||
        learningSummary(catalogEntry(a)?.code, progress).percent -
          learningSummary(catalogEntry(b)?.code, progress).percent ||
        a.name.localeCompare(b.name, "es")
      );
    })[0];
}
