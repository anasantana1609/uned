import type { Lesson, Question } from "./learning";

const q = (
  prompt: string,
  options: string[],
  answer: number,
  explanation: string,
  difficulty: Question["difficulty"] = "media",
): Question => ({ prompt, options, answer, explanation, difficulty });
const notes = "Apuntes actualizados 2025-6 Derecho Civil I.1.pdf";
const exam = "examen 2023 CIVIL I.pdf";
function block(
  topic: number,
  content: Omit<Lesson, "code" | "topic" | "minutes">,
): Lesson {
  return { ...content, code: "021096", topic: `Tema ${topic}`, minutes: 5 };
}
// Original summaries and exercises. Private documents and exam transcripts stay outside Git.
// The exam reference identifies a verified format or concept, never an official answer key.
export const civilTopicLessons: Lesson[] = [
  block(3, {
    id: "civil-aplicacion-v1",
    title: "Calificar, interpretar e integrar",
    objective:
      "Distinguir las operaciones para aplicar una norma y el significado de iura novit curia.",
    concepts: ["Calificación", "Interpretación", "Analogía"],
    explanation: [
      "Aplicar Derecho comienza por ordenar los hechos: una entrega de dinero puede ser un préstamo o una donación. Calificar consiste en situar el caso en la institución jurídica adecuada; interpretar, en averiguar el sentido y alcance de la norma que lo regula. El nombre que las partes dan a su acuerdo no sustituye ese análisis.",
      "Si falta una regulación específica, la analogía permite acudir a la prevista para un supuesto semejante cuando existe identidad de razón. No basta cualquier parecido y hay límites: las leyes penales, excepcionales y temporales no se extienden a supuestos o momentos distintos de los comprendidos expresamente en ellas.",
      "Iura novit curia expresa el deber judicial de conocer el ordenamiento. No significa que los jueces puedan dejar sin resolver los asuntos porque las partes no citen una norma. La costumbre y el Derecho extranjero tienen reglas particulares de alegación y prueba. En un test, separa este principio de la regla que impide excusar el incumplimiento por ignorar la ley.",
    ],
    example:
      "Dos personas discuten si el dinero recibido debía devolverse. Primero se califica la relación; después se interpreta la norma pertinente. Solo si hay una laguna se estudia la integración, sin inventar libremente una solución.",
    practice:
      "Explica sin mirar qué pregunta responde cada operación: calificación, interpretación y analogía. Añade una frase que distinga iura novit curia de la ignorancia de la ley.",
    sources: [
      `${notes} · páginas PDF 12–14`,
      "Programa_Derecho_Civil_I-1_26-27.pdf · página PDF 2",
    ],
    examModel: `${exam} · página PDF 2, pregunta 10; Modelos_examen_test_Derecho_Civil_I-1.pdf · página PDF 1. Práctica de definición y distinción de conceptos.`,
    questions: [
      q(
        "Decidir si una entrega de dinero es préstamo o donación es una operación de…",
        ["Calificación", "Derogación", "Publicación"],
        0,
        "Calificar es encuadrar los hechos en la institución jurídica correspondiente.",
        "fácil",
      ),
      q(
        "Para aplicar una norma por analogía hace falta…",
        [
          "Solo que el caso resulte interesante",
          "Una laguna y semejanza con identidad de razón, respetando sus límites",
          "Que ninguna de las partes conozca la ley",
        ],
        1,
        "La analogía exige ausencia de regulación específica e identidad de razón; no es una solución libre.",
      ),
      q(
        "Señala la afirmación INCORRECTA sobre iura novit curia.",
        [
          "Se refiere al conocimiento judicial del ordenamiento",
          "No elimina las reglas particulares sobre prueba de la costumbre",
          "Obliga a los litigantes a enseñar al juez todo el Derecho interno aplicable",
        ],
        2,
        "El principio atribuye a los tribunales el conocimiento del ordenamiento, con las particularidades de prueba indicadas.",
        "difícil",
      ),
    ],
  }),
  block(4, {
    id: "civil-buena-fe-v1",
    title: "Buena fe y coherencia al ejercer derechos",
    objective:
      "Reconocer límites al ejercicio de un derecho y un supuesto de contradicción con los propios actos.",
    concepts: ["Derecho subjetivo", "Buena fe", "Propios actos"],
    explanation: [
      "Un derecho subjetivo permite satisfacer un interés protegido, pero su ejercicio no es ilimitado. La coincidencia con derechos ajenos puede imponer límites externos. También existen límites que atienden a cómo se usa el propio derecho: la buena fe y la prohibición del abuso.",
      "La buena fe exige una conducta honesta y leal, atendiendo a la relación concreta. No basta afirmar que se tiene un derecho: también importa cómo se ejercita y qué confianza legítima se ha generado. La doctrina de los propios actos impide una contradicción jurídicamente relevante con una conducta anterior que haya creado una confianza protegible.",
      "No todo cambio de opinión es contrario a los propios actos, ni toda molestia constituye abuso. Deben examinarse la conducta previa, su significado y las circunstancias. En el test, evita convertir estos límites en una prohibición absoluta de cambiar de criterio o en la idea de que el titular siempre puede hacer cualquier cosa.",
    ],
    example:
      "Una parte mantiene una conducta inequívoca que hace confiar razonablemente a la otra en una determinada situación y después pretende ejercer el mismo derecho de manera incompatible. El problema exige analizar la buena fe y los propios actos; no basta responder que el derecho le pertenece.",
    practice:
      "Inventa una conducta contradictoria relevante y un simple cambio de opinión que no haya generado confianza. Explica por qué no son equivalentes.",
    sources: [
      `${notes} · páginas PDF 24–26`,
      "Programa_Derecho_Civil_I-1_26-27.pdf · página PDF 3",
    ],
    examModel: `${exam} · página PDF 2, preguntas 7 y 8. Práctica de conceptos y conducta incompatible.`,
    questions: [
      q(
        "¿Qué principio orienta el ejercicio leal de los derechos?",
        ["La buena fe", "La derogación tácita", "La publicación registral"],
        0,
        "La buena fe limita y orienta cómo deben ejercitarse los derechos.",
        "fácil",
      ),
      q(
        "Una contradicción con una conducta anterior que generó confianza legítima plantea principalmente…",
        [
          "Un problema de frutos civiles",
          "Un problema de propios actos",
          "La extinción automática de toda personalidad",
        ],
        1,
        "La doctrina de los propios actos trata la incompatibilidad relevante con la conducta previa.",
      ),
      q(
        "Señala la afirmación INCORRECTA.",
        [
          "Los derechos tienen límites",
          "Las circunstancias importan al valorar la buena fe",
          "Todo cambio de opinión vulnera necesariamente los propios actos",
        ],
        2,
        "No basta un cambio de opinión: se necesita una conducta previa y una contradicción jurídicamente relevante.",
        "difícil",
      ),
    ],
  }),
  block(5, {
    id: "civil-prescripcion-v1",
    title: "Prescripción y caducidad sin confundirlas",
    objective:
      "Diferenciar la alegación y la interrupción en el régimen general de prescripción y caducidad.",
    concepts: ["Inactividad", "Interrupción", "Caducidad"],
    explanation: [
      "El transcurso del tiempo puede limitar la posibilidad de ejercitar un derecho. En la prescripción extintiva importan la inactividad, el transcurso del plazo aplicable y su invocación por quien puede beneficiarse de ella. En el régimen civil general, no debe confundirse con una apreciación judicial automática de oficio.",
      "La prescripción puede interrumpirse por actos jurídicamente aptos, como una reclamación extrajudicial del acreedor o el reconocimiento de la deuda. Interrumpir reinicia el cómputo; suspender detiene temporalmente su curso conservando el tiempo ya transcurrido. No cualquier mensaje irrelevante tiene efecto interruptivo.",
      "La caducidad fija un límite para el ejercicio de la facultad y, en su régimen general, no admite interrupción y puede apreciarse de oficio. Estas diferencias son orientativas: siempre hay que comprobar la regulación del plazo concreto y sus posibles especialidades. Este bloque no es una tabla completa de plazos ni aplica automáticamente reglas civiles a plazos procesales.",
    ],
    example:
      "Un acreedor realiza una reclamación apta antes de agotarse un plazo de prescripción. Puede reiniciarse el cómputo. No debes atribuir ese mismo efecto a un plazo de caducidad solo porque ambos se midan en días o años.",
    practice:
      "Haz dos columnas, prescripción y caducidad, y explica alegación e interrupción en su régimen general. Diferencia después interrupción y suspensión.",
    sources: [
      `${notes} · páginas PDF 28–32, especialmente 30–31`,
      "Programa_Derecho_Civil_I-1_26-27.pdf · página PDF 3",
    ],
    examModel: `${exam} · página PDF 4, pregunta 20; Modelos_examen_test_Derecho_Civil_I-1.pdf · página PDF 1. Práctica de diferencias y afirmación incorrecta.`,
    questions: [
      q(
        "En el régimen civil general, la prescripción extintiva…",
        [
          "Se aplica siempre de oficio",
          "Debe ser alegada por quien puede beneficiarse de ella",
          "No depende del tiempo",
        ],
        1,
        "La alegación por el sujeto beneficiado distingue la prescripción de la caducidad en su régimen general.",
        "fácil",
      ),
      q(
        "Un reconocimiento de deuda apto para interrumpir la prescripción…",
        [
          "Reinicia el cómputo del plazo",
          "Equivale siempre a una suspensión",
          "Elimina todos los plazos futuros",
        ],
        0,
        "La interrupción hace comenzar un nuevo cómputo; la suspensión conserva el tiempo transcurrido.",
      ),
      q(
        "¿Qué afirmación sobre la caducidad es INCORRECTA en su régimen general?",
        [
          "Puede apreciarse de oficio",
          "Fija un límite al ejercicio de la facultad",
          "Toda reclamación extrajudicial reinicia su plazo",
        ],
        2,
        "La caducidad no se interrumpe como la prescripción; deben comprobarse las especialidades legales.",
        "difícil",
      ),
    ],
  }),
  block(6, {
    id: "civil-personalidad-v1",
    title: "Nacimiento, personalidad y conmoriencia",
    objective:
      "Relacionar el nacimiento con la personalidad y resolver un caso básico de orden incierto de fallecimientos.",
    concepts: ["Personalidad", "Concebido", "Conmoriencia"],
    explanation: [
      "La personalidad de la persona física se adquiere al nacer con vida, producido el entero desprendimiento del seno materno. No se exige que transcurran veinticuatro horas: ese requisito pertenece a una regulación anterior. En un test, comprueba si una alternativa mezcla la regla vigente explicada en los materiales con una fórmula histórica.",
      "El concebido no nacido recibe protección para los efectos que le sean favorables, condicionada al nacimiento en los términos legales. Esto no equivale a adelantar sin condiciones la adquisición de personalidad al momento de la concepción. Distingue la protección del concebido del inicio de la personalidad.",
      "La muerte extingue la personalidad. Si varias personas llamadas a sucederse fallecen y no puede probarse quién murió primero, la regla de conmoriencia presume el fallecimiento simultáneo y no se transmiten derechos sucesorios de una a otra. La edad o el parentesco no permiten inventar un orden de muerte.",
    ],
    example:
      "Dos familiares llamados a heredarse fallecen y no hay prueba del orden de sus muertes. No se presume que sobrevivió el más joven: se aplica la regla de simultaneidad, sin transmisión entre ellos.",
    practice:
      "Explica por qué proteger al concebido no es lo mismo que atribuirle personalidad desde la concepción. Resuelve después un caso de orden de fallecimientos incierto.",
    sources: [
      `${notes} · páginas PDF 34–35`,
      "Programa_Derecho_Civil_I-1_26-27.pdf · página PDF 3",
    ],
    examModel:
      "Modelos_examen_test_Derecho_Civil_I-1.pdf · página PDF 1, caso de fallecimientos; examen 2023 CIVIL I.pdf · página PDF 2, pregunta 5. Casos y contraste con reglas históricas.",
    questions: [
      q(
        "La personalidad de la persona física se adquiere…",
        [
          "Solo al inscribirse en el padrón",
          "Al cumplir veinticuatro horas",
          "Al nacer con vida, tras el entero desprendimiento del seno materno",
        ],
        2,
        "El nacimiento con vida en las condiciones legales determina la personalidad, sin exigir veinticuatro horas.",
        "fácil",
      ),
      q(
        "La protección favorable del concebido no nacido…",
        [
          "Está condicionada al nacimiento en los términos legales",
          "Lo convierte sin condiciones en persona desde la concepción",
          "Elimina la necesidad de nacer con vida",
        ],
        0,
        "Se protege al concebido para efectos favorables condicionados al nacimiento legalmente exigido.",
      ),
      q(
        "Sin prueba del orden de muerte entre dos personas llamadas a sucederse…",
        [
          "Se presume que sobrevivió la más joven",
          "Se presume simultaneidad y no hay transmisión sucesoria entre ellas",
          "Se elige el orden que produzca mayor herencia",
        ],
        1,
        "La conmoriencia impide presumir supervivencias basadas en edad o parentesco.",
        "difícil",
      ),
    ],
  }),
  block(7, {
    id: "civil-apoyos-v1",
    title: "Discapacidad: apoyar el ejercicio de la capacidad",
    objective:
      "Distinguir apoyo, curatela y tutela de menores sin trasladar automáticamente el sistema anterior a 2021.",
    concepts: ["Apoyos", "Curatela", "Autonomía"],
    explanation: [
      "La reforma explicada en los materiales desplaza el enfoque de incapacitar a la persona adulta hacia los apoyos para ejercer su capacidad jurídica. Tener una discapacidad no equivale a perder la personalidad ni a quedar automáticamente sustituido en toda decisión. Deben atenderse la voluntad, los deseos y las preferencias de la persona.",
      "Entre las medidas figuran las voluntarias, la guarda de hecho, la curatela y el defensor judicial. La curatela es una medida formal para quienes necesitan apoyo continuado; la representación tiene carácter excepcional y debe concretarse. No todo apoyo requiere sustituir la decisión de la persona.",
      "La tutela se reserva a menores en los supuestos legalmente previstos. Por eso no debe elegirse automáticamente un tutor para cualquier adulto con discapacidad. Los apuntes describen también instituciones históricas: este bloque se centra en el sistema de apoyos posterior a la Ley 8/2021 y no evalúa como actuales las categorías antiguas.",
    ],
    example:
      "Una adulta necesita ayuda para comprender y expresar una decisión económica. El punto de partida es facilitar su decisión con el apoyo adecuado, sin concluir que carece de derechos ni imponer una sustitución general por el diagnóstico.",
    practice:
      "Describe un apoyo que facilite decidir sin sustituir. Explica por qué tutela de menores y curatela de una persona adulta no son sinónimos.",
    sources: [
      `${notes} · páginas PDF 46–51, especialmente 47–49`,
      "Programa_Derecho_Civil_I-1_26-27.pdf · páginas PDF 3–4",
    ],
    examModel: `${exam} · página PDF 1, formato de tres opciones. Ejercicios propios de distinción de instituciones; no se atribuye este contenido a una pregunta concreta del modelo.`,
    questions: [
      q(
        "Una discapacidad determina automáticamente…",
        [
          "La pérdida de personalidad",
          "La tutela de toda persona adulta",
          "Ninguna de esas consecuencias",
        ],
        2,
        "La discapacidad no elimina la personalidad ni produce automáticamente tutela de adultos.",
        "fácil",
      ),
      q(
        "La finalidad de los apoyos es…",
        [
          "Facilitar el ejercicio de la capacidad atendiendo a la voluntad de la persona",
          "Sustituir siempre toda decisión",
          "Impedir cualquier participación de la persona",
        ],
        0,
        "El sistema se orienta a facilitar el ejercicio de derechos y la autonomía.",
      ),
      q(
        "¿Qué afirmación es INCORRECTA en el sistema posterior a la Ley 8/2021?",
        [
          "Existen medidas de apoyo voluntarias",
          "La representación es la respuesta automática para toda persona con discapacidad",
          "La tutela se reserva a menores en los supuestos legales",
        ],
        1,
        "La representación es excepcional; no se impone automáticamente por tener discapacidad.",
        "difícil",
      ),
    ],
  }),
  block(8, {
    id: "civil-ausencia-v1",
    title: "Desaparición, ausencia y fallecimiento declarado",
    objective:
      "Distinguir la protección de asuntos urgentes de la ausencia y de la declaración de fallecimiento.",
    concepts: ["Desaparición", "Ausencia legal", "Fallecimiento declarado"],
    explanation: [
      "La desaparición sin noticias plantea cómo proteger a la persona y sus relaciones jurídicas. Para asuntos que no admiten demora puede adoptarse una medida provisional, como el defensor del desaparecido. La finalidad inicial es atender necesidades urgentes; no afirmar que la persona ha muerto.",
      "La declaración de ausencia legal permite organizar la representación y la administración de los intereses del ausente, con los presupuestos legales. No abre por sí sola la sucesión como si se hubiera acreditado la muerte. El representante gestiona intereses ajenos, sin convertirse por ello en propietario de los bienes.",
      "La declaración de fallecimiento produce los efectos legalmente establecidos sobre la base de sus propios requisitos y puede existir sin una declaración previa de ausencia. Las tres instituciones no son pasos obligatorios de una escalera. Este bloque distingue funciones; los plazos y efectos especiales requieren estudiar cada supuesto por separado.",
    ],
    example:
      "Una persona desaparece dejando un asunto urgente pendiente. Atenderlo mediante una medida provisional no equivale a repartir su herencia. Tampoco debe rechazarse una declaración de fallecimiento solo porque no hubo antes ausencia legal.",
    practice:
      "Asocia cada institución con su finalidad. Explica por qué la ausencia no convierte al representante en heredero ni es un requisito previo universal del fallecimiento declarado.",
    sources: [
      `${notes} · páginas PDF 53–55`,
      "Programa_Derecho_Civil_I-1_26-27.pdf · página PDF 4",
    ],
    examModel: `${exam} · página PDF 4, pregunta 19. Práctica de distinción entre instituciones.`,
    questions: [
      q(
        "La protección provisional ante una desaparición persigue…",
        [
          "Repartir automáticamente la herencia",
          "Atender asuntos urgentes del desaparecido",
          "Dar por probada su muerte",
        ],
        1,
        "La protección provisional atiende urgencias sin declarar por sí misma el fallecimiento.",
        "fácil",
      ),
      q(
        "¿Es siempre necesaria una declaración previa de ausencia para declarar el fallecimiento?",
        [
          "No, son instituciones con presupuestos propios",
          "Sí, sin excepción",
          "Sí, porque todo ausente está muerto",
        ],
        0,
        "La declaración de fallecimiento no exige universalmente una previa declaración de ausencia.",
      ),
      q(
        "Señala la afirmación INCORRECTA.",
        [
          "La ausencia puede requerir administrar intereses del ausente",
          "La desaparición no prueba por sí sola la muerte",
          "El representante del ausente se convierte por ese nombramiento en dueño de sus bienes",
        ],
        2,
        "Representar y administrar bienes ajenos no atribuye su propiedad.",
        "difícil",
      ),
    ],
  }),
  block(9, {
    id: "civil-vecindad-v1",
    title: "Vecindad civil y lugar de residencia",
    objective:
      "Separar vecindad civil, nacionalidad y padrón en casos básicos de atribución.",
    concepts: ["Vecindad civil", "Padrón", "Derecho común y foral"],
    explanation: [
      "La vecindad civil determina la sujeción al Derecho civil común o a un Derecho civil foral o especial. No es la nacionalidad ni la mera inscripción en el padrón municipal. Una persona española puede cambiar de municipio sin que eso signifique un cambio automático e inmediato de vecindad civil.",
      "Si ambos progenitores tienen la misma vecindad civil, esa coincidencia sirve para atribuirla al hijo conforme a la regla legal. No debe elegirse sin más el lugar del hospital donde nació. Cuando las vecindades son distintas hay otras reglas que requieren un análisis separado.",
      "El matrimonio no altera por sí solo la vecindad civil. La posibilidad legal de optar por la del cónyuge es distinta de un cambio automático al casarse. En los casos prácticos, separa el hecho descrito, la regla de atribución y la eventual opción: vivir, nacer y casarse en un lugar no son criterios intercambiables.",
    ],
    example:
      "Dos progenitores con la misma vecindad civil tienen un hijo en un hospital de otro territorio. El dato decisivo en este caso es la vecindad coincidente de los progenitores; el lugar del hospital no la sustituye automáticamente.",
    practice:
      "Explica a otra persona por qué empadronarse y cambiar de vecindad civil no son lo mismo. Resuelve un caso de padres con vecindad coincidente y otro de matrimonio.",
    sources: [
      `${notes} · páginas PDF 61–63`,
      "Programa_Derecho_Civil_I-1_26-27.pdf · página PDF 4",
    ],
    examModel:
      "Modelos_examen_test_Derecho_Civil_I-1.pdf · página PDF 1; examen 2023 CIVIL I.pdf · página PDF 4, pregunta de reserva 22. Casos de progenitores y matrimonio.",
    questions: [
      q(
        "La vecindad civil sirve principalmente para determinar…",
        [
          "El colegio electoral",
          "El hospital de nacimiento",
          "La sujeción al Derecho civil común o foral",
        ],
        2,
        "La vecindad civil conecta a la persona con el régimen civil común o foral aplicable.",
        "fácil",
      ),
      q(
        "Si ambos progenitores tienen la misma vecindad civil, el nacimiento del hijo en otro territorio…",
        [
          "No sustituye por sí solo la regla de atribución por vecindad coincidente",
          "Obliga siempre a tomar la del hospital",
          "Impide atribuir cualquier vecindad",
        ],
        0,
        "La coincidencia de vecindad de los progenitores es el criterio en el supuesto planteado.",
      ),
      q(
        "¿Qué afirmación es INCORRECTA?",
        [
          "La vecindad civil no equivale al padrón",
          "Casarse cambia automáticamente la vecindad civil a la del cónyuge",
          "Una opción legal no es un cambio automático",
        ],
        1,
        "El matrimonio no altera por sí solo la vecindad civil.",
        "difícil",
      ),
    ],
  }),
  block(10, {
    id: "civil-registro-v1",
    title: "Registro Civil: acreditar y proteger datos",
    objective:
      "Distinguir inscripción, certificación y publicidad restringida sin confundir el Registro con el padrón.",
    concepts: ["Inscripción", "Certificación", "Publicidad restringida"],
    explanation: [
      "El Registro Civil permite dejar constancia y acreditar hechos y actos relativos a la identidad y al estado civil. Nacimiento, filiación, matrimonio o defunción son ejemplos. Su finalidad no se reduce a decir si alguien está casado y no coincide con la función del padrón municipal.",
      "Una inscripción incorpora un hecho o acto al Registro; una certificación permite acreditar el contenido registral. No son la misma operación. Tampoco toda anotación informativa produce la misma eficacia probatoria que una inscripción. Para responder un test conviene separar el asiento del documento que acredita su contenido.",
      "La publicidad registral convive con la protección de la intimidad: hay datos especialmente protegidos con acceso restringido. No puede deducirse que cualquiera accede sin límite a cualquier dato. Los apuntes mezclan referencias históricas y al sistema de la Ley 20/2011; aquí se trabajan las funciones básicas, sin evaluar como vigente la antigua organización por secciones.",
    ],
    example:
      "Necesitar acreditar un nacimiento conduce a obtener una certificación del contenido registral. Esa solicitud no es un nuevo nacimiento ni implica que cualquier tercero pueda obtener sin restricciones todos los datos familiares del inscrito.",
    practice:
      "Distingue con tus palabras inscripción y certificación. Explica por qué la publicidad del Registro no elimina la protección de datos especialmente sensibles.",
    sources: [
      `${notes} · páginas PDF 64–66`,
      "Programa_Derecho_Civil_I-1_26-27.pdf · página PDF 4",
    ],
    examModel: `${exam} · página PDF 3, pregunta 13. Práctica sobre publicidad y datos protegidos.`,
    questions: [
      q(
        "¿Qué describe mejor la función del Registro Civil?",
        [
          "Hechos y actos relativos a la identidad y estado civil, no solo del matrimonio",
          "La compraventa de viviendas",
          "El padrón de habitantes",
        ],
        0,
        "Su ámbito incluye nacimiento, filiación y defunción, entre otros hechos; no se limita al matrimonio.",
        "fácil",
      ),
      q(
        "¿Qué permite acreditar el contenido registral mediante un documento público?",
        [
          "Una conversación informal",
          "Una certificación",
          "Un cambio de domicilio sin registrar",
        ],
        1,
        "La certificación es un medio de acreditación del contenido del Registro.",
      ),
      q(
        "Señala la afirmación INCORRECTA.",
        [
          "Hay datos con publicidad restringida",
          "Inscribir y certificar son operaciones distintas",
          "El carácter público permite acceso ilimitado de cualquiera a todos los datos",
        ],
        2,
        "La publicidad está limitada por la protección de los datos especialmente protegidos.",
        "difícil",
      ),
    ],
  }),
  block(11, {
    id: "civil-entidades-v1",
    title: "Asociación y fundación: personas o patrimonio",
    objective:
      "Reconocer el sustrato de asociaciones y fundaciones y evitar confundir a la entidad con sus miembros.",
    concepts: ["Persona jurídica", "Asociación", "Fundación"],
    explanation: [
      "El ordenamiento reconoce personalidad a determinadas entidades, que pueden ser titulares de derechos y obligaciones. No deben confundirse la persona jurídica y las personas físicas que la integran o gestionan. La capacidad de actuación de la entidad se encauza mediante las reglas y órganos correspondientes.",
      "La asociación tiene como base una agrupación de personas para un fin común. La fundación se construye sobre un patrimonio destinado de manera estable a fines de interés general. Ambas pueden desarrollar actividades útiles para la sociedad; ese hecho no borra la diferencia entre su base personal y patrimonial.",
      "Para constituir una fundación no basta expresar un deseo altruista: importan la dotación, las formalidades y la inscripción exigidas. La inscripción de su constitución tiene relevancia para adquirir personalidad. No traslades automáticamente esta regla constitutiva a cualquier asiento de cualquier persona jurídica.",
    ],
    example:
      "Un grupo se organiza para una actividad cultural común: el sustrato es asociativo. Si se afecta un patrimonio estable a financiar becas de interés general con la forma legal adecuada, el esquema es fundacional.",
    practice:
      "Compara asociación y fundación mediante sujeto de base, fin y organización. Explica por qué administrar bienes de una entidad no convierte al administrador en propietario de ellos.",
    sources: [
      `${notes} · páginas PDF 67–69 y 73–74`,
      "Programa_Derecho_Civil_I-1_26-27.pdf · página PDF 4",
    ],
    examModel: `${exam} · páginas PDF 1–3, preguntas 3, 4 y 16. Práctica de reconocimiento y distinción de entidades, sin reproducir sus enunciados.`,
    questions: [
      q(
        "El sustrato característico de una asociación es…",
        [
          "Un inmueble público",
          "Una agrupación de personas",
          "Un plazo de prescripción",
        ],
        1,
        "La asociación se basa en personas que se agrupan para un fin común.",
        "fácil",
      ),
      q(
        "Destinar establemente un patrimonio a fines de interés general describe la base de…",
        ["La conmoriencia", "La vecindad administrativa", "Una fundación"],
        2,
        "La fundación tiene una base patrimonial afectada a un fin de interés general.",
      ),
      q(
        "Señala la afirmación INCORRECTA.",
        [
          "Para constituir una fundación basta una intención generosa sin cumplir formalidades",
          "Una persona jurídica puede ser titular de obligaciones",
          "La entidad y su administrador no son la misma persona",
        ],
        0,
        "La voluntad fundacional debe materializarse conforme a las exigencias legales de constitución.",
        "difícil",
      ),
    ],
  }),
  block(12, {
    id: "civil-bienes-v1",
    title: "Bienes, dominio público y frutos",
    objective:
      "Clasificar bienes sencillos y distinguir el rendimiento civil del bien que lo produce.",
    concepts: ["Mueble e inmueble", "Dominio público", "Frutos civiles"],
    explanation: [
      "La clasificación de un bien ayuda a identificar su régimen jurídico. Como aproximación, un terreno es inmueble y un objeto transportable sin menoscabo del inmueble al que esté unido es mueble. Pero el Código contiene categorías específicas: no se debe resolver todo caso únicamente preguntando si algo puede moverse físicamente.",
      "Los bienes de dominio público están afectos al uso o servicio público y tienen un régimen protector. No todo bien de una Administración es demanial: también existen bienes patrimoniales. La desafectación, cuando legalmente procede, es distinta de vender directamente el bien mientras conserva su condición de dominio público.",
      "Los frutos son rendimientos o productos del bien, diferenciados de la cosa que los genera. Los civiles nacen de una relación jurídica, como la renta de un arrendamiento. El dinero que se obtiene al vender la cosa no se identifica sin más con un fruto civil: hay que distinguir rendimiento y sustitución de la cosa por su precio.",
    ],
    example:
      "Un local genera una renta al arrendarse. El local es el bien productor y la renta, un fruto civil. Si el local se vende, su precio no es por ese solo hecho una renta de arrendamiento.",
    practice:
      "Clasifica una finca y una silla; después separa cosa, renta y precio de venta. Explica por qué un bien de una Administración no siempre es de dominio público.",
    sources: [
      `${notes} · páginas PDF 77–80`,
      "Programa_Derecho_Civil_I-1_26-27.pdf · página PDF 5",
    ],
    examModel: `${exam} · página PDF 3, pregunta 17. Práctica de categorías y casos breves; se amplía con ejercicios propios sobre frutos.`,
    questions: [
      q(
        "La renta periódica por arrendar un local es…",
        ["Un fruto civil", "El propio inmueble", "Una nacionalidad"],
        0,
        "La renta deriva de una relación jurídica y constituye un fruto civil.",
        "fácil",
      ),
      q(
        "¿Todo bien perteneciente a una Administración es de dominio público?",
        [
          "Sí, sin excepción",
          "No, también existen bienes patrimoniales",
          "Solo si puede transportarse",
        ],
        1,
        "La titularidad pública no equivale por sí sola a la condición demanial.",
      ),
      q(
        "Señala la afirmación INCORRECTA.",
        [
          "La clasificación del bien influye en su régimen",
          "Una desafectación no equivale a una venta mientras el bien sigue siendo demanial",
          "El precio de venta de un local es siempre un fruto civil del arrendamiento",
        ],
        2,
        "El precio de enajenación no se confunde con la renta que produce el arrendamiento.",
        "difícil",
      ),
    ],
  }),
  block(13, {
    id: "civil-patrimonio-v1",
    title: "Patrimonio: activo, pasivo y derechos personales",
    objective:
      "Separar elementos económicos del patrimonio y atributos personales sin contenido patrimonial directo.",
    concepts: ["Activo", "Pasivo", "Patrimonio neto"],
    explanation: [
      "El patrimonio reúne posiciones jurídicas de contenido económico. No es solo el dinero disponible ni se reduce a los objetos materiales: también incluye derechos de crédito. Para describir la situación patrimonial importa identificar tanto los elementos activos como las obligaciones que componen el pasivo.",
      "El patrimonio neto se obtiene considerando el activo y descontando el pasivo. Tener bienes valiosos no equivale a carecer de deudas. Distingue también el crédito, que es una posición activa para el acreedor, de la deuda correlativa que forma parte del pasivo del deudor.",
      "No todo derecho de una persona tiene contenido patrimonial directo. La nacionalidad, la vecindad civil y los derechos de la personalidad no se incorporan al patrimonio como bienes económicamente evaluables por el solo hecho de pertenecerle. Una lesión de un derecho personal puede originar una pretensión indemnizatoria; eso no convierte el propio atributo personal en un bien negociable.",
    ],
    example:
      "Una persona tiene bienes y créditos valorados en 12.000 euros y deudas por 4.000. En este ejemplo simplificado, el activo es 12.000, el pasivo 4.000 y el patrimonio neto 8.000. Su nacionalidad no se suma como otra partida económica.",
    practice:
      "Construye un ejemplo con bienes, un crédito y una deuda. Calcula activo, pasivo y neto, y explica por qué la vecindad civil no es una partida más.",
    sources: [
      `${notes} · páginas PDF 81–82`,
      "Programa_Derecho_Civil_I-1_26-27.pdf · página PDF 5",
    ],
    examModel: `${exam} · página PDF 3, pregunta 18. Práctica de inclusión y exclusión de elementos patrimoniales.`,
    questions: [
      q(
        "Para su titular, un derecho de crédito económicamente evaluable forma parte del…",
        ["Pasivo por definición", "Padrón municipal", "Activo patrimonial"],
        2,
        "El crédito es una posición activa del acreedor; la deuda correlativa es pasivo del deudor.",
        "fácil",
      ),
      q(
        "En un ejemplo con activo de 9.000 euros y pasivo de 2.000, el neto es…",
        ["11.000 euros", "7.000 euros", "2.000 euros"],
        1,
        "El neto se calcula descontando el pasivo del activo: 9.000 menos 2.000.",
      ),
      q(
        "Señala la afirmación INCORRECTA.",
        [
          "La nacionalidad es por sí sola un activo económico negociable",
          "El patrimonio puede incluir créditos",
          "Las deudas deben considerarse al calcular el neto",
        ],
        0,
        "La nacionalidad es un atributo personal, no una partida patrimonial económicamente negociable.",
        "difícil",
      ),
    ],
  }),
  block(14, {
    id: "civil-representacion-v1",
    title: "Actuar en nombre propio o en nombre ajeno",
    objective:
      "Distinguir representación directa e indirecta y reconocer el problema de actuar sin poder.",
    concepts: ["Nombre ajeno", "Cuenta ajena", "Poder y ratificación"],
    explanation: [
      "La autonomía privada permite organizar relaciones e intereses dentro de los límites legales. Una persona puede intervenir por sí misma o utilizar la actuación de otra. Para analizar la representación, formula dos preguntas distintas: en nombre de quién se actúa y por cuenta de quién se gestiona el interés.",
      "En la representación directa se actúa en nombre y por cuenta del representado con la legitimación necesaria. En la indirecta, quien interviene lo hace en nombre propio, aunque gestiona un interés ajeno. Decir solo que alguien compra para otra persona no basta para distinguirlas: hay que saber cómo se presenta ante el tercero.",
      "Actuar sin poder o exceder sus límites plantea el problema del falso representante. No puede darse por vinculado automáticamente al supuesto representado. La ratificación puede asumir la actuación en los términos legales. Este bloque se centra en esa distinción y no agota las formas de ineficacia del negocio jurídico.",
    ],
    example:
      "Una persona encarga a su amiga comprar una lámpara. Si la amiga contrata en nombre propio para cumplir el encargo, actúa por cuenta ajena pero no en nombre ajeno. Si se presenta con poder como representante de quien encarga, cambia el análisis.",
    practice:
      "Resuelve dos variantes del mismo encargo: comprar en nombre propio y comprar en nombre del representado con poder. Añade qué comprobarías si faltase ese poder.",
    sources: [
      `${notes} · páginas PDF 84 y 101–104`,
      "Programa_Derecho_Civil_I-1_26-27.pdf · página PDF 5",
    ],
    examModel: `${exam} · página PDF 3, pregunta 15. Práctica de casos que distingue nombre propio y cuenta ajena.`,
    questions: [
      q(
        "La representación directa exige actuar…",
        [
          "Siempre en nombre propio",
          "En nombre y por cuenta ajena con legitimación suficiente",
          "Sin identificar jamás al representado",
        ],
        1,
        "En la representación directa se exterioriza la actuación en nombre del representado y debe existir legitimación.",
        "fácil",
      ),
      q(
        "Una persona contrata en nombre propio, pero gestiona el interés de otra. Describe…",
        [
          "Representación indirecta",
          "Conmoriencia",
          "Una certificación registral",
        ],
        0,
        "Actuar en nombre propio y por cuenta ajena caracteriza la representación indirecta.",
      ),
      q(
        "Señala la afirmación INCORRECTA sobre quien actúa sin poder.",
        [
          "Debe comprobarse si existe ratificación",
          "No puede vincular automáticamente al supuesto representado",
          "Vincula siempre al supuesto representado aunque este no haya autorizado ni ratificado",
        ],
        2,
        "La falta de poder no permite imponer sin más los efectos al supuesto representado.",
        "difícil",
      ),
    ],
  }),
];
