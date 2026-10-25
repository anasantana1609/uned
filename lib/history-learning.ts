import type { Lesson, Question } from "./learning";
const carmen = "Apuntes Historia Carmen - ESCUDERO_261014_194319.pdf";
const ec = "Apuntes EC.pdf";
const q = (
  prompt: string,
  options: string[],
  answer: number,
  explanation: string,
  difficulty: Question["difficulty"] = "media",
): Question => ({ prompt, options, answer, explanation, difficulty });
function block(content: Omit<Lesson, "code" | "minutes">): Lesson {
  return { ...content, code: "021015", minutes: 5 };
}
// Original teaching material; page references use PDF pages, not printed book pagination.
const medievalLessons: Lesson[] = [
  block({
    id: "historia-fueros-v1",
    topic: "Fuentes medievales",
    title: "Liber y fueros: continuidad y diversidad",
    objective:
      "Explicar cómo conviven la tradición del Liber y los derechos locales sin reducirlos a un único sistema.",
    concepts: ["Liber Iudiciorum", "Fuero local", "Repoblación"],
    explanation: [
      "El Derecho medieval no surge de una desaparición completa del orden jurídico anterior. Los apuntes describen la continuidad y adaptación del Liber Iudiciorum en distintos territorios, junto a prácticas y necesidades nuevas. Su presencia documental obliga a matizar una explicación basada únicamente en la supervivencia de costumbres germánicas al margen del texto escrito.",
      "Los fueros recogen derechos de un lugar y pueden incorporar costumbres, privilegios y decisiones anteriores. Las cartas de población facilitan asentamientos mediante condiciones favorables. El derecho especial de una comunidad puede convivir con una tradición más general; una carta breve no tiene por qué contener toda la regulación de sus habitantes.",
      "Los textos se clasifican por criterios diferentes: breves o extensos por contenido, locales o territoriales por ámbito, y según quién los otorga. Un texto puede servir de modelo para otros y formar una familia de fueros. No confundas una clasificación con otra ni presentes todos los territorios como si hubieran seguido idéntica evolución.",
    ],
    example:
      "Una carta concede exenciones a quienes se asientan en una villa, pero no regula todos los conflictos posibles. Ese silencio no prueba que no exista otro derecho aplicable: hay que estudiar la relación entre el privilegio local y las fuentes utilizadas en su contexto.",
    practice:
      "Compara continuidad del Liber y pluralidad de fueros con un esquema de dos columnas: función, alcance y límites de lo que permite afirmar la documentación.",
    sources: [`${ec} · páginas PDF 87–91`, `${carmen} · páginas PDF 106–108`],
    examModel:
      "E660210150-22SO.pdf · página PDF 1, cuestión de fueros; E660210150-23F2.pdf · página PDF 1, comentario de un fuero. Entrenamiento de desarrollo y contextualización, no test de examen.",
    writtenPractice: {
      kind: "Desarrollo guiado",
      prompt:
        "Explica cómo puede coexistir un derecho general de tradición visigoda con un fuero local. Incluye dos criterios distintos de clasificación de fueros y evita presentar la diversidad medieval como una ausencia de Derecho.",
      modelAnswer: [
        "El Liber constituye una referencia de continuidad jurídica, pero su aplicación y adaptación varían según el territorio y la documentación disponible. Los derechos locales atienden a necesidades concretas y no necesariamente sustituyen toda la tradición anterior.",
        "Los fueros pueden fijar costumbres y privilegios y servir a la repoblación. Es posible distinguir breves y extensos por su contenido, o locales y territoriales por su ámbito. Estos criterios no significan lo mismo. La coexistencia de textos exige estudiar relaciones y contextos, no deducir que un documento breve contiene todo el Derecho de una localidad.",
      ],
      checklist: [
        "Diferencias continuidad jurídica y aplicación uniforme.",
        "Explicas la función de los privilegios o de la repoblación.",
        "Usas dos criterios de clasificación sin mezclarlos.",
      ],
    },
    questions: [
      q(
        "¿Qué conclusión es más prudente ante una carta de población breve?",
        [
          "Contiene necesariamente todo el Derecho aplicable",
          "Puede coexistir con otras fuentes y prácticas",
          "Demuestra que no existían normas anteriores",
        ],
        1,
        "La brevedad de la carta no excluye otras fuentes o prácticas del contexto.",
        "fácil",
      ),
      q(
        "Breve/extenso y local/territorial distinguen, respectivamente…",
        [
          "Contenido y ámbito de aplicación",
          "La misma característica con dos nombres",
          "Siempre autoría regia y privada",
        ],
        0,
        "El contenido y el ámbito son criterios distintos que pueden combinarse.",
      ),
      q(
        "Señala la afirmación INCORRECTA.",
        [
          "Hubo adaptación de tradiciones anteriores",
          "Un fuero puede ser modelo de otros",
          "Toda la diversidad medieval responde a un único origen y aplicación idéntica",
        ],
        2,
        "Los materiales muestran pluralidad de fuentes y trayectorias territoriales.",
        "difícil",
      ),
    ],
  }),
  block({
    id: "historia-fazanas-v1",
    topic: "Fuentes medievales",
    title: "Fazañas: del caso a la regla",
    objective:
      "Distinguir una decisión concreta, su uso como precedente y su posterior fijación como norma.",
    concepts: ["Fazaña", "Albedrío", "Precedente"],
    explanation: [
      "Una fazaña se relaciona con una decisión judicial que puede servir de referencia para casos semejantes. Los apuntes advierten que no toda sentencia medieval se convierte automáticamente en fazaña. Importa la función que alcanza la decisión y cómo se invoca o recoge después.",
      "Juzgar por albedrío no equivale a decidir por capricho: puede implicar interpretar costumbres, adaptar una tradición jurídica o resolver con criterios de justicia ante una laguna. La creación judicial se estudia en su contexto, sin identificar sin más el albedrío medieval con el arbitraje actual o con un sistema moderno de precedente vinculante.",
      "Cuando las decisiones se reúnen en colecciones, puede separarse el caso concreto de la regla general que se extrae de él. La intervención del rey como juez o confirmante modifica su autoridad. En un comentario, observa quién decide, qué valor se atribuye a esa decisión y para qué otros casos se pretende utilizar.",
    ],
    example:
      "Una decisión sobre un litigio se cita después para resolver otro semejante. El análisis debe explicar el paso del hecho particular a una regla orientadora y comprobar la autoridad de quien dictó o confirmó la decisión.",
    practice:
      "Explica en tres frases por qué albedrío no significa capricho, por qué no toda sentencia es fazaña y cómo una colección puede favorecer la abstracción de reglas.",
    sources: [`${ec} · página PDF 90`, `${carmen} · páginas PDF 107–108`],
    examModel:
      "E660210150-23SO.pdf · página PDF 1, desarrollo sobre fazañas; E660210150-24F1.pdf y E660210150-22F2.pdf · página PDF 1, comentarios vinculados a decisiones judiciales. La práctica siguiente es una paráfrasis didáctica original.",
    writtenPractice: {
      kind: "Comentario guiado",
      prompt:
        "Comenta esta paráfrasis didáctica, que no es una cita documental: «Una resolución del rey sobre un pleito se toma como pauta para otros casos semejantes». Identifica institución, autoridad y paso del caso a la regla, sin atribuir al enunciado una fecha o un documento que no se indican.",
      modelAnswer: [
        "La paráfrasis permite trabajar el uso de una decisión como precedente y su relación con las fazañas. El dato de que intervenga el rey es relevante para analizar la autoridad de la resolución, pero no permite identificar por sí solo una fuente concreta.",
        "La generalización consiste en tomar la pauta jurídica del litigio y usarla en supuestos semejantes. No significa que toda sentencia se convierta en ley ni que el juez actúe caprichosamente. Para un comentario documental real habría que examinar el texto, la fecha, la procedencia y el régimen jurídico concreto.",
      ],
      checklist: [
        "Distingues paráfrasis y documento histórico.",
        "Explicas la función de la autoridad regia.",
        "Evitas equiparar automáticamente fazaña y ley moderna.",
      ],
    },
    questions: [
      q(
        "Una fazaña puede utilizarse como…",
        [
          "Referencia para casos semejantes",
          "Registro civil de nacimientos",
          "Prueba de que toda sentencia es una ley",
        ],
        0,
        "La función de precedente ayuda a comprender la fazaña sin equiparar toda sentencia a una ley.",
        "fácil",
      ),
      q(
        "Juzgar por albedrío debe entenderse…",
        [
          "Como actuar siempre por capricho",
          "Según el contexto y los criterios jurídicos empleados",
          "Como aplicar necesariamente el Código Civil actual",
        ],
        1,
        "El albedrío medieval debe contextualizarse y puede operar sobre costumbres o lagunas.",
      ),
      q(
        "¿Qué afirmación es INCORRECTA?",
        [
          "Pueden abstraerse reglas de decisiones concretas",
          "La confirmación regia puede importar",
          "Toda sentencia altomedieval fue necesariamente una fazaña",
        ],
        2,
        "Los apuntes advierten que no toda sentencia llegó a tener esa función.",
        "difícil",
      ),
    ],
  }),
  block({
    id: "historia-ius-commune-v1",
    topic: "Derecho común",
    title: "Bolonia, glosadores y difusión del Derecho común",
    objective:
      "Relacionar fuentes del ius commune, método de la glosa y difusión universitaria.",
    concepts: ["Ius commune", "Glosa", "Universidades"],
    explanation: [
      "El ius commune se construye principalmente sobre el Derecho romano justinianeo y el canónico, con una aportación del Derecho feudal. Es una elaboración jurídica culta que pretende ofrecer un lenguaje y unas soluciones compartidos. No significa que desaparezcan de inmediato los derechos locales ni que toda Europa adopte de forma uniforme un único texto.",
      "En Bolonia, los glosadores estudian y aclaran los textos justinianeos. La glosa precisa términos, relaciona pasajes y busca una interpretación concordante; no es solo copiar el texto. Los comentaristas desarrollan después una interpretación más vinculada a la práctica y a la relación entre Derecho común y derechos particulares.",
      "La enseñanza universitaria favorece la circulación de juristas, métodos y categorías. La recepción es un proceso de penetración y adaptación, con distintos ritmos territoriales y posibles resistencias. Para un desarrollo de examen conviene enlazar fuentes, método y vías de difusión, en vez de limitarse a una lista de nombres.",
    ],
    example:
      "Un jurista formado en una universidad emplea categorías romano-canónicas para interpretar un problema de derecho local. El ejemplo muestra circulación de métodos y adaptación, no la desaparición automática del ordenamiento de la localidad.",
    practice:
      "Construye una cadena de tres pasos: textos estudiados, método de trabajo y difusión. Distingue después glosadores y comentaristas sin reducirlos a una oposición absoluta entre teoría y práctica.",
    sources: [`${ec} · páginas PDF 92–95`, `${carmen} · páginas PDF 109–111`],
    examModel:
      "E660210150-26SO.pdf · página PDF 1, desarrollo sobre Bolonia y glosadores. Se propone un ejercicio propio de estructura y explicación.",
    writtenPractice: {
      kind: "Desarrollo guiado",
      prompt:
        "Explica el papel de Bolonia en la formación del Derecho común. Relaciona las fuentes estudiadas con el método de la glosa y la difusión universitaria, y añade una cautela sobre la pervivencia de los derechos locales.",
      modelAnswer: [
        "La recuperación y el estudio de los textos justinianeos alimentan una cultura jurídica que se relaciona con el Derecho canónico y feudal. En Bolonia, la glosa aclara términos y pasajes y trata de ofrecer una comprensión coherente de los textos.",
        "Las universidades y los juristas formados en ellas difunden métodos y categorías. Los comentaristas acentúan la conexión con los problemas prácticos y los derechos particulares. La recepción no equivale a sustituir de una vez todos los derechos locales: hay adaptación, diversidad y resistencias.",
      ],
      checklist: [
        "Identificas los componentes romano y canónico.",
        "Explicas qué hace una glosa, no solo quién la escribe.",
        "Relacionas universidad y difusión sin suponer uniformidad inmediata.",
      ],
    },
    questions: [
      q(
        "Dos componentes principales del ius commune son…",
        [
          "Solo las ordenanzas de una villa",
          "Derecho romano justinianeo y Derecho canónico",
          "Únicamente los códigos del siglo XIX",
        ],
        1,
        "La elaboración del Derecho común combina los componentes romano y canónico, además de otras aportaciones.",
        "fácil",
      ),
      q(
        "Glosar un texto implica…",
        [
          "Aclarar términos y relacionar pasajes para interpretarlo",
          "Sustituirlo siempre por una sentencia moderna",
          "Copiarlo sin estudiarlo",
        ],
        0,
        "La glosa es un trabajo de explicación e interpretación de los textos.",
      ),
      q(
        "¿Qué afirmación sobre la recepción es INCORRECTA?",
        [
          "Las universidades contribuyen a difundir métodos",
          "Puede haber adaptación y resistencia",
          "Suprime de inmediato y de forma idéntica todos los derechos locales",
        ],
        2,
        "La recepción es un proceso desigual, compatible con la pervivencia de derechos propios.",
        "difícil",
      ),
    ],
  }),
  block({
    id: "historia-alfonso-x-v1",
    topic: "Legislación castellana",
    title: "Fuero Real, Espéculo y Partidas",
    objective:
      "Comparar las obras vinculadas a Alfonso X y distinguir elaboración, finalidad y eficacia jurídica.",
    concepts: ["Fuero Real", "Espéculo", "Partidas"],
    explanation: [
      "La política jurídica vinculada a Alfonso X combina tradición del reino e influencia del Derecho común. El Fuero Real ofrece un texto concedido a determinadas localidades como parte de un proyecto de ordenación jurídica. No debe describirse como si hubiese eliminado inmediatamente todos los fueros anteriores.",
      "El Espéculo es una obra de la que se conservan cinco libros y cuyo proyecto se presenta como inacabado. Las Partidas contienen una exposición extensa y sistemática en siete partes, con gran presencia de materiales romano-canónicos. No son tres nombres equivalentes de una misma obra.",
      "Los apuntes recogen debates sobre la autoría, la cronología y las relaciones entre los textos. Conviene separar la elaboración de una obra de su promulgación o aplicación efectiva. El lugar atribuido después a las Partidas en la prelación de Alcalá no demuestra que se aplicaran desde el principio como única ley de todo el reino.",
    ],
    example:
      "Una respuesta enumera correctamente las tres obras, pero afirma que todas rigieron al mismo tiempo y con idéntico alcance. Falta distinguir su estructura, finalidad, debate de elaboración y trayectoria de aplicación.",
    practice:
      "Haz una tabla comparativa con tres filas y tres columnas: estructura, finalidad y cautelas sobre eficacia. Evita memorizar una única fecha como explicación de todo el proceso.",
    sources: [`${ec} · páginas PDF 102–106`, `${carmen} · páginas PDF 114–118`],
    examModel:
      "E660210150-25F1.pdf · página PDF 1, desarrollo sobre la obra alfonsina. La comparación propuesta es de elaboración propia.",
    writtenPractice: {
      kind: "Desarrollo guiado",
      prompt:
        "Compara Fuero Real, Espéculo y Partidas. Distingue su estructura y finalidad y explica por qué redactar un texto no equivale necesariamente a que tenga aplicación general inmediata.",
      modelAnswer: [
        "El Fuero Real se vincula a la concesión de un texto a localidades y al proyecto de ordenación regia. Del Espéculo se conservan cinco libros, dentro de una obra considerada inacabada. Las Partidas ofrecen una ordenación amplia en siete partes e incorporan de forma destacada el Derecho romano-canónico.",
        "La comparación debe separar elaboración, promulgación y aplicación. Las relaciones y la cronología de las obras son objeto de discusión historiográfica; no basta una secuencia de fechas para probar su eficacia. El reconocimiento posterior de las Partidas en Alcalá pertenece a otra fase de su trayectoria.",
      ],
      checklist: [
        "Diferencias las tres obras.",
        "No confundes redacción con aplicación efectiva.",
        "Reconoces el debate historiográfico sin presentar una hipótesis como indiscutida.",
      ],
    },
    questions: [
      q(
        "¿Qué obra se organiza en siete partes?",
        ["El Espéculo conservado", "El Fuero Real", "Las Partidas"],
        2,
        "Las Partidas se estructuran en siete partes y tienen un alcance sistemático amplio.",
        "fácil",
      ),
      q(
        "¿Qué distinción evita errores al estudiar estas obras?",
        [
          "Elaboración de un texto y eficacia jurídica",
          "Nombre de la ciudad y color del manuscrito",
          "Todas las obras y todos los fueros son lo mismo",
        ],
        0,
        "Redactar o elaborar un texto no prueba su aplicación general inmediata.",
      ),
      q(
        "Señala la afirmación INCORRECTA.",
        [
          "Existe influencia del Derecho común",
          "La cronología y relaciones entre las obras no admiten ningún debate",
          "El Espéculo conservado contiene cinco libros",
        ],
        1,
        "Los apuntes exponen distintas interpretaciones sobre la formación y relación de estas obras.",
        "difícil",
      ),
    ],
  }),
  block({
    id: "historia-alcala-v1",
    topic: "Legislación castellana",
    title: "Alcalá de 1348: ordenar las fuentes",
    objective:
      "Explicar la prelación de fuentes y las condiciones de uso de los fueros y de las Partidas.",
    concepts: ["Alfonso XI", "Prelación", "Supletoriedad"],
    explanation: [
      "El Ordenamiento de Alcalá de 1348 se sitúa en el reinado de Alfonso XI. Responde a problemas de aplicación del Derecho en un escenario de leyes, fueros y penetración del Derecho común. No debe confundirse a este monarca con Alfonso X, asociado a las obras estudiadas en el bloque anterior.",
      "La regla de prelación da prioridad al propio Ordenamiento; después se atiende a los fueros aplicables, sujetos a las condiciones y límites previstos; y, en defecto de respuesta en esas fuentes, se acude a las Partidas. La posición subsidiaria de las Partidas no equivale a irrelevancia: su amplitud y la formación de los juristas favorecen su importancia práctica.",
      "El esquema de tres escalones es una ayuda, pero necesita explicación. Los fueros no se mantienen sin condiciones y el monarca conserva funciones de interpretación y enmienda. En un comentario conviene identificar el problema de pluralidad jurídica y el papel del poder regio, sin proyectar sobre 1348 la jerarquía constitucional actual.",
    ],
    example:
      "Un litigio carece de solución en la legislación prioritaria y en el fuero aplicable. En el esquema estudiado se examina la respuesta de las Partidas. Esto no autoriza a ignorar desde el principio las fuentes que tienen preferencia.",
    practice:
      "Recita el orden y explica después, sin mirar, la condición de cada paso. Añade una frase que diferencie importancia práctica y posición formal en la prelación.",
    sources: [`${ec} · página PDF 106`, `${carmen} · página PDF 118`],
    examModel:
      "E660210150-25SO.pdf · página PDF 1, desarrollo sobre prelación; E660210150-24F2.pdf · página PDF 1, comentario del Ordenamiento. La práctica usa una paráfrasis propia y no reproduce el examen.",
    writtenPractice: {
      kind: "Comentario guiado",
      prompt:
        "Comenta esta paráfrasis didáctica, no una cita: «Los pleitos se resuelven primero conforme a estas leyes; después por los fueros admitidos y, si falta respuesta, por las Partidas». Identifica el sistema estudiado, explica los tres niveles y señala una simplificación que deba matizarse.",
      modelAnswer: [
        "La paráfrasis resume el sistema de prelación asociado al Ordenamiento de Alcalá de 1348, bajo Alfonso XI. La secuencia sitúa primero las leyes del Ordenamiento, después los fueros en las condiciones admitidas y finalmente las Partidas cuando falta solución en las fuentes anteriores.",
        "Debe matizarse que no todo fuero opera sin condiciones: existen límites y facultades regias de interpretación y enmienda. También hay que distinguir el lugar subsidiario de las Partidas de su relevancia práctica. El comentario no debe convertir este orden histórico en una descripción de la jerarquía normativa actual.",
      ],
      checklist: [
        "Nombras a Alfonso XI y sitúas 1348.",
        "Explicas los niveles y las condiciones, no solo su lista.",
        "Distingues el orden histórico de la jerarquía normativa actual.",
      ],
    },
    questions: [
      q(
        "El Ordenamiento de Alcalá de 1348 se vincula al reinado de…",
        ["Alfonso XI", "Alfonso X como único monarca posible", "Carlos III"],
        0,
        "El Ordenamiento de 1348 corresponde al reinado de Alfonso XI.",
        "fácil",
      ),
      q(
        "En el esquema estudiado, las Partidas se aplican…",
        [
          "Siempre antes de toda ley y fuero",
          "Cuando falta solución en las fuentes preferentes",
          "Solo como un texto sin relevancia jurídica posible",
        ],
        1,
        "La prelación sitúa las Partidas en posición subsidiaria respecto de las fuentes anteriores.",
      ),
      q(
        "Señala la afirmación INCORRECTA.",
        [
          "La prelación ordena la aplicación de fuentes",
          "Las Partidas pueden ser muy importantes pese a su posición subsidiaria",
          "Todos los fueros se aplican sin condición ni posibilidad de enmienda regia",
        ],
        2,
        "La admisión de los fueros tiene condiciones y se mantiene la intervención regia.",
        "difícil",
      ),
    ],
  }),
  block({
    id: "historia-cortes-v1",
    topic: "Instituciones medievales",
    title: "Cortes y Diputación: representación y continuidad",
    objective:
      "Distinguir la asamblea medieval de su órgano de continuidad y evitar equipararla al parlamento actual.",
    concepts: ["Curia", "Estamentos", "Diputación"],
    explanation: [
      "Las Cortes medievales se relacionan con la evolución de la curia regia y la incorporación de representantes ciudadanos a reuniones antes protagonizadas por nobles y eclesiásticos. Su representación es estamental y varía entre reinos; no responde al sufragio universal ni a la igualdad de representación propia de una democracia actual.",
      "La petición de recursos, la atención a agravios y la negociación con el rey forman parte de su actividad, con diferencias territoriales y debates sobre el alcance de sus competencias. No debe afirmarse que todas las Cortes tuvieron idéntica potestad legislativa o que limitaron de la misma manera el poder regio.",
      "La Diputación surge como comisión para atender la gestión de subsidios y el cumplimiento de acuerdos entre reuniones de Cortes. Esa continuidad ayuda a entender su evolución institucional. No equivale a la asamblea reunida de forma permanente ni a una diputación provincial contemporánea; hay que distinguir cada trayectoria territorial y cronológica.",
    ],
    example:
      "Terminada una reunión de Cortes, una comisión sigue supervisando lo acordado hasta la siguiente. El ejemplo ayuda a diferenciar el momento de la asamblea de una función de continuidad, sin equipararlos a órganos actuales.",
    practice:
      "Relaciona curia, representación estamental y Cortes. Explica luego para qué sirve una Diputación entre reuniones y por qué sería anacrónico describirla como una diputación provincial moderna.",
    sources: [`${ec} · páginas PDF 133–137`, `${carmen} · páginas PDF 139–143`],
    examModel:
      "E660210150-23F1.pdf y E660210150-26F1.pdf · página PDF 1, desarrollo sobre la Diputación de Cortes. Pregunta de práctica original.",
    writtenPractice: {
      kind: "Desarrollo guiado",
      prompt:
        "Explica la relación entre Cortes y Diputación: origen, función de continuidad y diferencias entre reinos. Incluye dos precauciones para no describirlas como instituciones democráticas contemporáneas.",
      modelAnswer: [
        "Las Cortes se vinculan a la ampliación de las reuniones de la curia y a la participación de representantes de los estamentos. Sus funciones y relaciones con el rey varían territorialmente, por lo que no deben reducirse a un modelo único.",
        "La Diputación atiende determinados acuerdos y subsidios entre reuniones y desarrolla una función de continuidad. No es lo mismo que la asamblea reunida permanentemente. Deben evitarse tanto la identificación de la representación estamental con el sufragio universal como la confusión con las diputaciones provinciales actuales.",
      ],
      checklist: [
        "Distingues asamblea y comisión de continuidad.",
        "Mencionas acuerdos o subsidios y la diversidad territorial.",
        "Señalas al menos dos anacronismos que evitar.",
      ],
    },
    questions: [
      q(
        "La representación de las Cortes medievales se caracteriza como…",
        [
          "Sufragio universal contemporáneo",
          "Estamental, con diferencias entre reinos",
          "Una reproducción de las diputaciones provinciales actuales",
        ],
        1,
        "La representación se organiza en el marco estamental y debe contextualizarse por reinos.",
        "fácil",
      ),
      q(
        "La Diputación permite entender principalmente…",
        [
          "La gestión de determinados acuerdos entre reuniones de Cortes",
          "La desaparición de todo subsidio",
          "La conversión de toda reunión en sufragio universal",
        ],
        0,
        "Su función de continuidad se relaciona con acuerdos y subsidios entre reuniones.",
      ),
      q(
        "¿Qué afirmación es INCORRECTA?",
        [
          "Las competencias variaron territorialmente",
          "Hay que evitar anacronismos",
          "Todas las Cortes medievales fueron idénticas a un parlamento democrático actual",
        ],
        2,
        "La equiparación borra las diferencias de representación, contexto y competencias.",
        "difícil",
      ),
    ],
  }),
];

const manual =
  "Curso de Historia del Derecho Español · páginas PDF del conjunto de 353 páginas";
const foundations: Lesson[] = [
  block({
    id: "historia-historiografia-v1",
    topic: "Historia e historiografía",
    title: "Investigar las fuentes y explicar el cambio jurídico",
    objective:
      "Distinguir hechos, investigación e historiografía y situar la aportación de Hinojosa.",
    concepts: ["Fuente", "Contexto", "Historiografía"],
    explanation: [
      "La Historia del Derecho estudia las transformaciones jurídicas en su contexto. No consiste solo en ordenar fechas: relaciona fuentes, instituciones y condiciones sociales. Conviene distinguir los acontecimientos estudiados, la investigación sobre ellos y la historiografía como resultado de esa investigación.",
      "Una fuente normativa informa de una regulación, pero no demuestra por sí sola cómo se cumplía en cada lugar. Documentos de práctica, decisiones y testimonios permiten contrastar la norma con su aplicación. Autoría, fecha, finalidad y transmisión condicionan lo que puede afirmarse a partir de un texto.",
      "Eduardo de Hinojosa impulsó el estudio histórico de las instituciones mediante trabajo con fuentes y métodos de investigación. Su escuela contribuyó a renovar la historiografía jurídica española. Valorar esa aportación no convierte todas sus interpretaciones en conclusiones definitivas: las hipótesis se revisan con nuevas evidencias.",
    ],
    example:
      "Un fuero concede un privilegio. Para explicar su alcance real hay que estudiar quién lo otorgó, sus destinatarios y los documentos de aplicación, además de leer la concesión.",
    practice:
      "Resume una institución en cuatro pasos: fuente, contexto, regulación y evidencia de aplicación. Señala qué información te falta.",
    sources: [`${manual} 8–25 · lección 1`],
    questions: [
      q(
        "La historiografía designa principalmente…",
        [
          "El resultado de la investigación histórica",
          "Solo las fechas de los reyes",
          "Una norma vigente",
        ],
        0,
        "Es la elaboración de conocimiento histórico, distinguible de los hechos investigados.",
        "fácil",
      ),
      q(
        "Un texto normativo demuestra por sí solo…",
        [
          "Que todos lo cumplieron siempre",
          "Qué regulación formula, pero no toda su aplicación real",
          "Que no necesita contexto",
        ],
        1,
        "La práctica exige contrastar otros testimonios.",
      ),
      q(
        "La aportación de Hinojosa se vincula a…",
        [
          "Prescindir de las fuentes",
          "Sustituir historia por opiniones",
          "Renovar la investigación histórica de las instituciones",
        ],
        2,
        "Su trabajo y su escuela impulsaron métodos y estudio de fuentes.",
      ),
    ],
  }),
  block({
    id: "historia-prerromana-v1",
    topic: "España prerromana",
    title: "Hospitalidad, clientela y devotio",
    objective:
      "Diferenciar vínculos comunitarios y personales a partir de testimonios de los pueblos prerromanos.",
    concepts: ["Hospitalidad", "Clientela", "Devotio"],
    explanation: [
      "La península prerromana reúne pueblos y formas de organización diferentes. Las fuentes literarias proceden con frecuencia de observadores externos; sus categorías y valoraciones deben analizarse críticamente. No conviene atribuir una práctica descrita para un grupo a toda la península.",
      "Los pactos de hospitalidad permiten acogida y protección fuera del grupo de origen y pueden articular relaciones entre comunidades. La clientela vincula protección y fidelidad entre personas en una relación desigual. Identifica en cada testimonio quién se vincula, qué recibe y a qué se compromete.",
      "La devotio presenta una vinculación especialmente intensa al jefe con una dimensión religiosa. Los relatos sobre entrega personal o destino ligado al caudillo deben contextualizarse. No son una descripción de ciudadanía moderna ni una prueba de que todas las relaciones políticas funcionaran igual.",
    ],
    example:
      "Un pacto entre comunidades para recibir a sus miembros ayuda a explicar hospitalidad. La fidelidad personal de un seguidor a un jefe plantea otra clase de vínculo.",
    practice:
      "Compara hospitalidad, clientela y devotio: participantes, reciprocidad, desigualdad y dimensión religiosa.",
    sources: [
      `${manual} 26–48 · lección 2`,
      "E660210150-25F2.pdf · página PDF 1, testimonios para comentario",
    ],
    questions: [
      q(
        "La hospitalidad puede facilitar…",
        [
          "Solo el cobro de impuestos romanos",
          "Acogida y protección entre grupos",
          "La desaparición de toda comunidad",
        ],
        1,
        "Los pactos permiten articular protección y relaciones entre grupos.",
        "fácil",
      ),
      q(
        "La devotio se distingue por…",
        [
          "Ser sufragio universal",
          "Ser una ley de municipio romano",
          "La intensa vinculación al jefe y su dimensión religiosa",
        ],
        2,
        "Los testimonios describen una entrega personal ligada al destino del caudillo.",
      ),
      q(
        "Ante un relato antiguo sobre un pueblo hay que…",
        [
          "Analizar autor, contexto y límites de la generalización",
          "Aplicarlo a todos los pueblos sin contraste",
          "Asumir que usa categorías actuales",
        ],
        0,
        "La crítica de fuentes evita generalizaciones y anacronismos.",
      ),
    ],
  }),
  block({
    id: "historia-romanizacion-v1",
    topic: "Hispania romana",
    title: "Romanización, ciudadanía y Derecho romano vulgar",
    objective:
      "Relacionar conquista, estatutos personales y transformación del Derecho sin suponer uniformidad inmediata.",
    concepts: ["Ciudadanía", "Latinidad", "Derecho romano vulgar"],
    explanation: [
      "La romanización fue un proceso desigual de incorporación política, cultural y jurídica. Los pactos y las rendiciones influyeron en la posición de las comunidades. La conquista no implicó que toda persona pasara inmediatamente a tener el mismo estatuto jurídico.",
      "Ciudadanos, latinos y peregrinos tuvieron posiciones diferenciadas. La concesión de latinidad de Vespasiano favoreció la organización municipal y vías de acceso a la ciudadanía. La constitución de Caracalla de 212 extendió ampliamente la ciudadanía, sin convertir todas las prácticas en un Derecho uniforme de manera instantánea.",
      "El Derecho romano vulgar refleja transformaciones y simplificaciones en la vida jurídica tardorromana, con protagonismo de las necesidades prácticas. No debe confundirse con el Derecho clásico ni identificarse sin más con una supervivencia exclusivamente germánica. Para explicarlo relaciona contexto, práctica y evolución de las categorías jurídicas.",
    ],
    example:
      "Una comunidad incorporada al poder romano conserva inicialmente un estatuto diferenciado. La evolución posterior de sus habitantes exige estudiar concesiones y organización municipal.",
    practice:
      "Traza una secuencia: incorporación → estatutos → concesiones → transformaciones jurídicas. Distingue latinidad y ciudadanía.",
    sources: [
      `${manual} 49–65 · lección 3`,
      "E660210150-25F1.pdf · página PDF 1, Derecho romano vulgar",
    ],
    questions: [
      q(
        "La romanización jurídica fue…",
        [
          "Instantánea e idéntica en todas partes",
          "Ajena a los estatutos personales",
          "Un proceso desigual y progresivo",
        ],
        2,
        "La incorporación produjo situaciones y ritmos distintos.",
        "fácil",
      ),
      q(
        "La extensión de ciudadanía de Caracalla corresponde a…",
        ["212", "1348", "1978"],
        0,
        "La Constitutio Antoniniana se sitúa en 212.",
      ),
      q(
        "El Derecho romano vulgar debe estudiarse como…",
        [
          "Un sinónimo de los fueros de Alfonso X",
          "Una transformación tardorromana vinculada a la práctica",
          "Un código constitucional contemporáneo",
        ],
        1,
        "Expresa cambios de las categorías y de la práctica jurídica romana.",
      ),
    ],
  }),
  block({
    id: "historia-provincia-v1",
    topic: "Hispania romana",
    title: "Provincia, lex provinciae y municipio",
    objective:
      "Distinguir gobierno provincial y organización municipal en Hispania.",
    concepts: ["Provincia", "Lex provinciae", "Curia municipal"],
    explanation: [
      "El término provincia designó inicialmente un ámbito de atribuciones de un magistrado y pasó a expresar una circunscripción territorial. La lex provinciae ordenaba aspectos del territorio sometido, las facultades del gobernador y la situación de las ciudades. No equivale a una constitución española contemporánea.",
      "Las divisiones territoriales cambiaron con las necesidades de gobierno. La distinción entre provincias senatoriales e imperiales se relaciona con la organización del poder romano. Para responder en un examen, identifica la etapa antes de enumerar provincias o autoridades.",
      "El municipio y la colonia constituyen formas de organización local con trayectorias y estatutos propios. Magistrados locales y curia municipal desempeñaban funciones de gobierno. La administración provincial y la municipal son niveles relacionados, pero un gobernador provincial no se identifica con un magistrado de la ciudad.",
    ],
    example:
      "Una pregunta sobre facultades del gobernador se sitúa en el nivel provincial. Otra sobre magistrados y curia de una ciudad corresponde al ámbito municipal.",
    practice:
      "Dibuja dos niveles, provincia y ciudad, y añade función, autoridad y fuente de organización.",
    sources: [
      `${manual} 66–82 · lección 4`,
      "RESUMEN_DE_LEX_PROVINCIAL_Y_DIVISIÓN_TERRITORIAL_y_261014_194758.pdf · páginas PDF 1–3",
    ],
    questions: [
      q(
        "El significado inicial de provincia se relaciona con…",
        [
          "Las atribuciones de un magistrado",
          "Una comunidad autónoma actual",
          "Una diputación provincial contemporánea",
        ],
        0,
        "La acepción territorial se desarrolló históricamente a partir de un ámbito de atribuciones.",
        "fácil",
      ),
      q(
        "La curia municipal pertenece al ámbito…",
        [
          "Exclusivamente de las Cortes medievales",
          "Del gobierno local romano",
          "Del Consejo de Ministros actual",
        ],
        1,
        "Se integra en la organización de las ciudades.",
      ),
      q(
        "Para explicar la división provincial es necesario…",
        [
          "Usar siempre un único mapa para todos los siglos",
          "Ignorar el contexto político",
          "Precisar la etapa histórica estudiada",
        ],
        2,
        "La división y las autoridades cambian a lo largo de la época romana.",
      ),
    ],
  }),
  block({
    id: "historia-visigodo-fuentes-v1",
    topic: "España visigoda",
    title: "Del código al Liber: aplicación y fuentes canónicas",
    objective:
      "Diferenciar las principales fuentes visigodas y el debate sobre su ámbito de aplicación.",
    concepts: ["Liber Iudiciorum", "Personalidad", "Territorialidad"],
    explanation: [
      "La legislación visigoda se estudia en relación con la tradición romana, las prácticas germánicas y la acción de la monarquía. Código de Eurico, Breviario de Alarico y Liber Iudiciorum no son nombres intercambiables de un único texto. Deben situarse en su evolución y contexto.",
      "El principio de personalidad vincula la aplicación del Derecho a la pertenencia del sujeto a un grupo. El de territorialidad atiende al espacio donde rige la norma. Las interpretaciones sobre el alcance personal o territorial de los textos visigodos son objeto de debate: una etiqueta aislada no sustituye el análisis de fuentes e hipótesis.",
      "El Liber Iudiciorum se asocia a la labor legislativa de Recesvinto y a posteriores revisiones. Las fuentes canónicas forman un ámbito relacionado pero distinto; la Hispana reúne materiales conciliares y pontificios. Una colección canónica no se confunde con un código regio de leyes seculares.",
    ],
    example:
      "Una respuesta compara ámbito personal y territorial. Debe explicar el criterio de cada principio y distinguir la hipótesis historiográfica del dato documental.",
    practice:
      "Haz una línea temporal de los principales textos y una tabla que separe legislación regia y colección canónica.",
    sources: [
      `${manual} 97–120 · lección 6`,
      "E660210150-26F1.pdf y E660210150-25F2.pdf · página PDF 1",
    ],
    questions: [
      q(
        "La personalidad del Derecho atiende principalmente a…",
        [
          "El tamaño del territorio",
          "La pertenencia del sujeto a un grupo",
          "La fecha del manuscrito",
        ],
        1,
        "El criterio personal vincula aplicación y condición del sujeto.",
        "fácil",
      ),
      q(
        "La Hispana es una colección de fuentes…",
        ["Municipales contemporáneas", "Solo fiscales romanas", "Canónicas"],
        2,
        "Reúne materiales del ámbito eclesiástico, entre ellos conciliares y pontificios.",
      ),
      q(
        "Ante el debate sobre territorialidad visigoda conviene…",
        [
          "Explicar las hipótesis y sus apoyos documentales",
          "Presentar toda interpretación como indiscutida",
          "Confundir todos los códigos",
        ],
        0,
        "El debate exige distinguir fuentes, criterios y reconstrucciones historiográficas.",
      ),
    ],
  }),
  block({
    id: "historia-visigodo-gobierno-v1",
    topic: "España visigoda",
    title: "Rey, Concilios de Toledo y Aula Regia",
    objective:
      "Relacionar monarquía, asambleas y administración central sin confundir sus funciones.",
    concepts: ["Monarquía", "Concilios", "Oficio Palatino"],
    explanation: [
      "La monarquía visigoda combina poder regio, selección del monarca y participación de grupos dirigentes. El ideal electivo y la práctica política no deben confundirse con una democracia moderna. Las relaciones entre rey, nobleza e Iglesia condicionan el funcionamiento de las instituciones.",
      "Los Concilios de Toledo fueron asambleas eclesiásticas con intervención en cuestiones religiosas y también políticas. Su relación con el monarca permite estudiar la articulación entre poder regio y organización eclesiástica. No son parlamentos contemporáneos ni órganos puramente ajenos a la vida política.",
      "El Oficio Palatino agrupa oficiales vinculados al servicio del rey y al gobierno de palacio. El Aula Regia cumple funciones de asesoramiento y participa en asuntos de gobierno y justicia. Sus integrantes y funciones se relacionan, pero no deben tratarse como dos nombres necesariamente idénticos de cualquier institución palatina.",
    ],
    example:
      "Un texto conciliar confirmado por el rey permite analizar cooperación entre Iglesia y monarquía. Una lista de condes palatinos plantea, en cambio, la organización de los servicios regios.",
    practice:
      "Explica en una frase cada institución: monarca, Concilios, Oficio Palatino y Aula Regia. Añade una relación entre ellas.",
    sources: [
      `${manual} 121–143 · lección 7`,
      "resolución_de_los_textos_de_historia,_26,_33,_40,__261014_194848.pdf · texto 26",
      "E660210150-25F1.pdf · página PDF 1",
    ],
    questions: [
      q(
        "Los Concilios de Toledo se estudian como asambleas…",
        [
          "De sufragio universal",
          "Solo mercantiles",
          "Eclesiásticas con relevancia también política",
        ],
        2,
        "Su actividad se relaciona con Iglesia, monarquía y asuntos políticos.",
        "fácil",
      ),
      q(
        "El Oficio Palatino se relaciona con…",
        [
          "Los oficiales y servicios del rey",
          "El sistema parlamentario actual",
          "Las provincias romanas exclusivamente",
        ],
        0,
        "Agrupa oficios palatinos y tareas al servicio del monarca.",
      ),
      q(
        "Para comparar Aula Regia y Oficio Palatino hay que…",
        [
          "Suponer que no tuvieron relación",
          "Distinguir funciones y composición dentro del gobierno regio",
          "Identificarlos con cualquier órgano moderno",
        ],
        1,
        "La comparación requiere explicar sus relaciones sin borrar sus diferencias.",
      ),
    ],
  }),
];

export const historyLessons: Lesson[] = [...foundations, ...medievalLessons];
