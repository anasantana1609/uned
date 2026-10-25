import { prepareBlocks, type PreparedBlock } from "./prepared-lesson";

const blocks: PreparedBlock[] = [
  {
    number: 3,
    title: "Mundo clásico y democracia: comparación crítica",
    concepts: ["Grecia", "Roma", "Democracia"],
    paragraphs: [
      "El estudio de los fundamentos clásicos relaciona instituciones antiguas y problemas actuales sin convertirlos en equivalentes. La tradición griega aporta experiencias de participación y reflexión política; Roma, una elaboración jurídica e institucional de gran influencia.",
      "La democracia antigua excluía a grupos amplios de la población y se desarrollaba en comunidades diferentes del Estado contemporáneo. Comparar permite reconocer continuidades y diferencias, no afirmar que un parlamento actual reproduce una asamblea antigua. Los derechos universales y el pluralismo necesitan un análisis propio.",
    ],
    example:
      "Una asamblea puede reunir directamente a sus ciudadanos y excluir a buena parte de quienes viven en la ciudad.",
    task: "Compara participación, ciudadanía y exclusiones en un modelo antiguo y uno constitucional actual.",
    checks: [
      [
        "Comparar democracia antigua y actual exige…",
        "Distinguir contexto y límites de ciudadanía",
        "Suponer identidad completa",
        "Ignorar exclusiones",
        "La comparación útil reconoce diferencias de sujetos e instituciones.",
      ],
      [
        "Participación directa significa necesariamente sufragio universal…",
        "No",
        "Sí",
        "Solo si hay asamblea",
        "El modo de participación y la extensión de ciudadanía son criterios distintos.",
      ],
      [
        "La influencia clásica implica…",
        "Recepción y transformación de ideas e instituciones",
        "Reproducción idéntica de todo el pasado",
        "Ausencia de cambios",
        "Las instituciones cambian al recibirse en otros contextos.",
      ],
    ],
  },
  {
    number: 4,
    title: "Atenas y la Ekklesía",
    concepts: ["Ciudadanos", "Asamblea", "Competencias"],
    paragraphs: [
      "La Ekklesía fue una asamblea de ciudadanos de Atenas con funciones políticas relevantes. Su participación se encuadra en un concepto restringido de ciudadanía: mujeres, esclavos y residentes extranjeros no disfrutaban de iguales derechos políticos.",
      "El funcionamiento de la asamblea, los cargos y otros órganos debe situarse en su evolución histórica. Democracia directa no significa ausencia de reglas, preparación de decisiones o controles. Para comparar con hoy hay que examinar composición, convocatoria y competencias, además de la forma de votar.",
    ],
    example:
      "Llamar universal a la participación ateniense omite a quienes quedaban excluidos del cuerpo ciudadano.",
    task: "Explica quién participa, qué decide y qué límites tiene la comparación con el presente.",
    checks: [
      [
        "La Ekklesía se identifica como…",
        "Asamblea ciudadana ateniense",
        "Senado romano",
        "Tribunal constitucional moderno",
        "La asamblea se integra en la organización política de Atenas.",
      ],
      [
        "La ciudadanía política ateniense incluía a todos los habitantes…",
        "No",
        "Sí",
        "Solo por residir allí",
        "La residencia no confería igualdad de derechos políticos.",
      ],
      [
        "La democracia directa ateniense…",
        "Tenía organización y reglas propias",
        "Carecía de toda institución",
        "Era idéntica al sufragio actual",
        "Participación directa y organización institucional son compatibles.",
      ],
    ],
  },
  {
    number: 5,
    title: "República romana y distribución de funciones",
    concepts: ["Magistraturas", "Senado", "Comicios"],
    paragraphs: [
      "La República romana articula magistraturas, Senado y asambleas populares. Sus relaciones y competencias cambian con el tiempo. No existe una separación de poderes idéntica al constitucionalismo actual, aunque la comparación permita estudiar límites y equilibrios.",
      "Las magistraturas ejercen poderes específicos, el Senado aporta autoridad y funciones de gran influencia y los comicios participan según sus competencias. La distribución formal no describe por sí sola el peso político de cada órgano. Conviene relacionar norma, práctica y evolución social.",
    ],
    example:
      "Que una asamblea vote una propuesta no significa que controle todos los momentos de su preparación y ejecución.",
    task: "Dibuja tres órganos y sus relaciones; añade una diferencia con los poderes actuales.",
    checks: [
      [
        "La organización republicana combina…",
        "Magistraturas, Senado y comicios",
        "Solo un parlamento actual",
        "Solo tribunales",
        "El esquema romano distribuye funciones entre instituciones diferentes.",
      ],
      [
        "La República romana tenía exactamente la separación contemporánea de poderes…",
        "No",
        "Sí",
        "Solo por tener elecciones",
        "Las categorías actuales no deben trasladarse sin matices.",
      ],
      [
        "Para valorar el peso de un órgano hay que estudiar…",
        "Competencias y práctica política",
        "Solo su nombre",
        "El número de letras",
        "La influencia real puede exceder una descripción formal aislada.",
      ],
    ],
  },
  {
    number: 6,
    title: "Hispania y la administración romana",
    concepts: ["Romanización", "Provincia", "Ciudad"],
    paragraphs: [
      "La incorporación de Hispania al mundo romano supuso transformaciones políticas, jurídicas, económicas y urbanas. Fue un proceso desigual, con estatutos distintos para comunidades y personas, no una homogeneización inmediata.",
      "Provincias y ciudades organizaron niveles diferentes de gobierno. La documentación epigráfica permite estudiar magistraturas, normas y vida municipal. Relacionar Hispania con España no autoriza a proyectar hacia atrás el Estado o la nacionalidad contemporáneos.",
    ],
    example:
      "Una inscripción municipal informa de cargos y reglas locales, pero necesita contexto para explicar el conjunto del territorio.",
    task: "Distingue incorporación política, estatuto jurídico y organización administrativa.",
    checks: [
      [
        "La romanización fue…",
        "Un proceso desigual de transformación",
        "Un cambio instantáneo idéntico en todo lugar",
        "La creación del Estado actual",
        "La incorporación presenta diferencias territoriales y temporales.",
      ],
      [
        "Una inscripción municipal es…",
        "Una fuente para estudiar instituciones locales",
        "Una prueba universal de toda Hispania",
        "Una constitución contemporánea",
        "La epigrafía aporta evidencia que debe contextualizarse.",
      ],
      [
        "Provincia y ciudad representan…",
        "Ámbitos organizativos diferentes",
        "Siempre el mismo órgano",
        "Dos nombres del Senado",
        "La organización territorial y la municipal se relacionan sin confundirse.",
      ],
    ],
  },
  {
    number: 7,
    title: "Comicios y formas de participación romana",
    concepts: ["Curias", "Centurias", "Tribus"],
    paragraphs: [
      "Los comicios se organizan conforme a unidades distintas: curias, centurias o tribus. La manera de agrupar a los ciudadanos condiciona la votación y el peso relativo de los grupos. El modelo censitario no equivale a igualdad contemporánea del voto individual.",
      "La asamblea plebeya debe distinguirse de otras reuniones populares por composición y trayectoria. Para comparar con un parlamento actual separa cuerpo participante, unidad de voto, iniciativa y funciones. La palabra pueblo no asegura que toda persona residente pueda participar.",
    ],
    example:
      "Una votación por unidades agrupadas puede producir un resultado diferente de sumar individualmente todos los votos.",
    task: "Compara comicios por organización, participación y procedimiento de votación.",
    checks: [
      [
        "Curias, centurias y tribus se relacionan con…",
        "Formas de organización de asambleas romanas",
        "Ministerios actuales",
        "Órdenes judiciales modernos",
        "Las unidades de organización influyen en el funcionamiento de los comicios.",
      ],
      [
        "Un sistema censitario supone necesariamente igualdad del voto moderno…",
        "No",
        "Sí",
        "Solo por ser antiguo",
        "El censo y las unidades de voto pueden atribuir pesos diferentes.",
      ],
      [
        "La asamblea plebeya debe analizarse por…",
        "Su composición y evolución propias",
        "Una identidad absoluta con todas las asambleas",
        "La supresión de todo voto",
        "Distinguir asambleas evita confundir competencias y participantes.",
      ],
    ],
  },
  {
    number: 8,
    title: "Ley comicial y procedimiento legislativo",
    concepts: ["Iniciativa", "Votación", "Vigencia"],
    paragraphs: [
      "La elaboración de una ley exige distinguir iniciativa, preparación, decisión y entrada en vigor. En el mundo romano, la intervención de magistrados, asambleas y Senado se sitúa en un régimen diferente del procedimiento parlamentario actual.",
      "La comparación debe atender a quién presenta el texto, cómo se delibera y qué puede decidir el órgano convocado. El nombre ley no prueba una legitimación o contenido idénticos en todas las épocas. Las funciones judiciales de algunas asambleas tampoco las convierten en tribunales contemporáneos.",
    ],
    example:
      "Una asamblea que acepta o rechaza una propuesta tiene un papel distinto de una cámara con procedimientos de enmienda y elaboración propios.",
    task: "Dibuja dos itinerarios legislativos, romano y actual, y explica dos diferencias justificadas.",
    checks: [
      [
        "Iniciativa y aprobación legislativa…",
        "Son momentos distintos",
        "Son siempre idénticas",
        "No necesitan órganos",
        "Presentar una propuesta no equivale a aprobarla.",
      ],
      [
        "Comparar leyes antiguas y actuales requiere…",
        "Examinar procedimiento y legitimación",
        "Igualarlas por su nombre",
        "Omitir sus efectos",
        "La misma denominación puede expresar instituciones diferentes.",
      ],
      [
        "La participación del Senado en Roma debe…",
        "Situarse en su contexto histórico",
        "Identificarse con la cámara española actual",
        "Ignorarse siempre",
        "La comparación exige diferenciar autoridad y competencias de cada época.",
      ],
    ],
  },
  {
    number: 9,
    title: "Magistraturas y función consultiva",
    concepts: ["Imperium", "Colegialidad", "Senado"],
    paragraphs: [
      "Las magistraturas republicanas presentan rasgos como elección, duración limitada y colegialidad, con excepciones según el cargo. Imperium y potestas ayudan a distinguir facultades; no todos los magistrados disponen de poderes idénticos.",
      "El Senado romano desempeña funciones de autoridad y consejo con gran influencia política. Compararlo con órganos consultivos actuales exige distinguir composición, funciones y fuerza de sus decisiones. Un dictamen consultivo moderno no tiene automáticamente los mismos efectos que una actuación senatorial romana.",
    ],
    example:
      "La existencia de dos titulares de un cargo plantea límites y relaciones de poder que no equivalen a una mera duplicación administrativa.",
    task: "Explica elección, temporalidad y colegialidad y añade una cautela sobre sus excepciones.",
    checks: [
      [
        "Todos los magistrados romanos tenían idénticos poderes…",
        "No",
        "Sí",
        "Solo si eran elegidos",
        "Las competencias y el alcance de imperium o potestas varían según cargo.",
      ],
      [
        "La colegialidad se relaciona con…",
        "Pluralidad de titulares en el ejercicio del cargo",
        "Duración indefinida",
        "Herencia necesaria del puesto",
        "La coexistencia de titulares articula relaciones y límites propios.",
      ],
      [
        "Un órgano consultivo actual y el Senado romano…",
        "Requieren comparación contextual",
        "Son la misma institución",
        "Tienen siempre idéntica fuerza",
        "Consejo, composición e influencia deben estudiarse por separado.",
      ],
    ],
  },
  {
    number: 10,
    title: "Persona, capacidad y ciudadanía",
    concepts: ["Personalidad", "Capacidad", "Ciudadanía"],
    paragraphs: [
      "La condición de persona y los estatutos de libertad, ciudadanía y familia tuvieron consecuencias específicas en Roma. No deben confundirse con el reconocimiento contemporáneo de la dignidad y de la personalidad jurídica de toda persona.",
      "La ciudadanía romana, la nacionalidad española y la ciudadanía de la Unión tienen fundamentos y efectos diferentes. La protección del concebido no se identifica sin más con atribuirle todas las posiciones de una persona nacida. Al comparar capacidad, evita aplicar categorías históricas como si fueran automáticamente Derecho vigente.",
    ],
    example:
      "Un estatuto antiguo restringía derechos según condición personal; su descripción no legitima trasladar esas restricciones al presente.",
    task: "Compara personalidad, capacidad y ciudadanía en planos separados y distingue descripción histórica y norma actual.",
    checks: [
      [
        "Ciudadanía romana y ciudadanía de la Unión…",
        "Son instituciones distintas",
        "Son idénticas",
        "Dependen de la misma ley",
        "Sus fundamentos y derechos pertenecen a sistemas diferentes.",
      ],
      [
        "Una categoría histórica de capacidad puede aplicarse hoy sin revisión…",
        "No",
        "Sí",
        "Siempre que aparezca en un manual",
        "La comparación exige comprobar el régimen vigente.",
      ],
      [
        "Describir una desigualdad jurídica antigua…",
        "No equivale a justificarla actualmente",
        "Obliga a reproducirla",
        "Elimina la dignidad humana",
        "La explicación histórica y la justificación normativa son operaciones distintas.",
      ],
    ],
  },
  {
    number: 11,
    title: "Personas jurídicas, asociaciones y fundaciones",
    concepts: ["Personalidad colectiva", "Asociación", "Patrimonio y fin"],
    paragraphs: [
      "La persona jurídica permite atribuir posiciones jurídicas a una organización distinta de cada uno de sus integrantes. Los antecedentes romanos deben estudiarse sin identificar automáticamente todo colegio o corporación con una asociación moderna.",
      "Asociaciones y fundaciones se distinguen por su estructura y fundamento: organización personal y patrimonio afectado a un fin son ejes relevantes. La adquisición de personalidad, los órganos y la responsabilidad requieren atender a su regulación. El reconocimiento de una organización no borra todas las relaciones con sus miembros.",
    ],
    example:
      "Una organización puede contratar como sujeto propio; la deuda no se atribuye automáticamente del mismo modo a cada integrante.",
    task: "Distingue organización, personalidad, órganos y miembros en un caso de asociación.",
    checks: [
      [
        "La personalidad jurídica colectiva permite…",
        "Atribuir derechos y obligaciones a la organización",
        "Confundir siempre organización y miembros",
        "Eliminar toda responsabilidad",
        "La organización reconocida puede ocupar posiciones propias.",
      ],
      [
        "La fundación se relaciona especialmente con…",
        "Un patrimonio afectado a un fin",
        "Una asamblea electoral universal",
        "Una magistratura romana",
        "El patrimonio y el fin ayudan a distinguir su estructura.",
      ],
      [
        "Los antecedentes romanos de asociaciones actuales…",
        "Deben compararse sin suponer identidad",
        "Son necesariamente idénticos",
        "No requieren contexto",
        "Las formas de organización y reconocimiento cambian históricamente.",
      ],
    ],
  },
  {
    number: 12,
    title: "Fuentes romanas y ordenamiento actual",
    concepts: ["Ley y plebiscito", "Edicto", "Constituciones imperiales"],
    paragraphs: [
      "Las fuentes del Derecho romano cambian a lo largo de su historia. Ley, plebiscito, edicto, senadoconsulto y constituciones imperiales expresan formas de producción jurídica relacionadas con órganos y etapas diferentes.",
      "Una constitución imperial es una actuación normativa del emperador, no una Constitución democrática moderna. El edicto del pretor se entiende por su función en la tutela y en la evolución jurídica. Comparar con hoy exige identificar productor, procedimiento, contenido y eficacia de cada fuente.",
    ],
    example:
      "Leer constitución en una fuente romana no permite atribuirle soberanía popular o rigidez constitucional contemporánea.",
    task: "Haz una tabla de fuente, órgano y etapa; añade una diferencia con el sistema actual.",
    checks: [
      [
        "Las constituciones imperiales se vinculan al…",
        "Emperador",
        "Parlamento español actual",
        "Municipio contemporáneo",
        "La denominación romana se refiere a producción normativa imperial.",
      ],
      [
        "Las fuentes romanas permanecieron idénticas en todas las etapas…",
        "No",
        "Sí",
        "Solo si eran escritas",
        "Los cambios políticos modifican las formas de producción jurídica.",
      ],
      [
        "Para comparar una fuente antigua con una actual debe analizarse…",
        "Órgano, procedimiento y eficacia",
        "Solo su nombre",
        "La tipografía",
        "La identidad de palabras no garantiza identidad de instituciones.",
      ],
    ],
  },
  {
    number: 13,
    title: "Jurisprudencia romana y jurisprudencia actual",
    concepts: ["Juristas", "Auctoritas", "Doctrina judicial"],
    paragraphs: [
      "En Roma, jurisprudencia designa especialmente el saber y la actividad de los juristas. Sus respuestas, métodos y autoridad contribuyeron a desarrollar soluciones jurídicas. No se identifica sin más con una colección de sentencias de tribunales modernos.",
      "En el sistema civil español, la jurisprudencia del Tribunal Supremo complementa el ordenamiento en los términos del Código Civil. Distinguirla de la enumeración de ley, costumbre y principios generales evita convertir toda resolución en una fuente formal equivalente. La fuerza de cada pronunciamiento requiere atender al régimen correspondiente.",
    ],
    example:
      "Un fragmento de jurista romano y una sentencia actual pueden contener razonamiento jurídico, pero su autoridad y función son distintas.",
    task: "Explica dos sentidos de jurisprudencia y distingue fuente formal y función complementaria.",
    checks: [
      [
        "La jurisprudencia romana se relaciona con…",
        "El saber y actividad de los juristas",
        "Solo sentencias del Tribunal Supremo español",
        "El presupuesto municipal",
        "Los juristas elaboran e interpretan soluciones con autoridad propia.",
      ],
      [
        "En el Código Civil español, la jurisprudencia…",
        "Complementa el ordenamiento en los términos previstos",
        "Sustituye siempre a la ley",
        "Es cualquier opinión privada",
        "La función complementaria debe distinguirse de la enumeración formal de fuentes.",
      ],
      [
        "Toda sentencia tiene idéntico valor vinculante…",
        "No",
        "Sí",
        "Solo por publicarse",
        "La eficacia depende del órgano, procedimiento y régimen de cada resolución.",
      ],
    ],
  },
  {
    number: 14,
    title: "La compilación de Justiniano",
    concepts: ["Código", "Digesto", "Instituciones y Novelas"],
    paragraphs: [
      "La compilación justinianea reúne materiales jurídicos de naturaleza diferente. El Código recopila constituciones imperiales; el Digesto, fragmentos de la jurisprudencia; las Instituciones tienen función didáctica y valor jurídico dentro de la obra.",
      "Las Novelas recogen legislación posterior de Justiniano. La compilación implica selección, organización y adaptación de materiales, no una simple reproducción sin cambios. Su recepción posterior tuvo gran importancia para la cultura jurídica europea, pero no se aplicó de manera idéntica en todos los lugares y épocas.",
    ],
    example:
      "Identificar un texto como fragmento de jurista orienta hacia el Digesto, no hacia una constitución imperial recopilada en el Código.",
    task: "Relaciona cada parte de la compilación con su material y finalidad.",
    checks: [
      [
        "El Digesto reúne principalmente…",
        "Fragmentos de juristas",
        "Solo constituciones españolas",
        "Solo tratados europeos",
        "El material jurisprudencial distingue el Digesto de otras partes.",
      ],
      [
        "El Código justinianeo recopila…",
        "Constituciones imperiales",
        "Actas del Parlamento actual",
        "Solo costumbres municipales medievales",
        "Su contenido normativo imperial lo diferencia del Digesto.",
      ],
      [
        "La compilación debe entenderse como…",
        "Selección y ordenación jurídica de materiales",
        "Copia sin adaptación necesaria",
        "Una ley española de 1889",
        "El trabajo compilatorio organiza y adapta materiales jurídicos.",
      ],
    ],
  },
  {
    number: 15,
    title: "Civil law, common law y fuentes",
    concepts: ["Tradiciones jurídicas", "Costumbre", "Principios generales"],
    paragraphs: [
      "Civil law y common law permiten comparar tradiciones jurídicas sin suponer sistemas puros e inmóviles. La influencia romana, la legislación y las decisiones judiciales tienen funciones y pesos diferentes, pero no están ausentes de manera absoluta de una u otra tradición.",
      "En el régimen común español, ley, costumbre y principios generales se aplican conforme a sus condiciones y relaciones. La costumbre requiere requisitos y opera en defecto de ley aplicable; los principios también informan el ordenamiento. No debe confundirse el ius commune medieval con el common law inglés.",
    ],
    example:
      "Invocar una práctica repetida exige comprobar si reúne condiciones de costumbre jurídica; su frecuencia no basta.",
    task: "Compara tradiciones y después explica la función subsidiaria de costumbre y principios en el régimen común.",
    checks: [
      [
        "Ius commune y common law son…",
        "Conceptos distintos",
        "Sinónimos exactos",
        "Dos nombres de la Constitución española",
        "El Derecho común medieval no se identifica con la tradición inglesa.",
      ],
      [
        "La costumbre jurídica se aplica por ser cualquier hábito frecuente…",
        "No",
        "Sí",
        "Solo si es antiguo",
        "Debe reunir sus requisitos y respetar el régimen de fuentes.",
      ],
      [
        "Los principios generales…",
        "Pueden informar el ordenamiento y operar subsidiariamente",
        "Son cualquier preferencia personal",
        "Eliminan toda ley",
        "Su función jurídica no se reduce a una opinión subjetiva.",
      ],
    ],
  },
  {
    number: 16,
    title: "Codificación civil y recepción jurídica",
    concepts: ["Código", "Sistema", "Codificación española"],
    paragraphs: [
      "La codificación persigue ordenar sistemáticamente una materia mediante un texto normativo. Se distingue de recopilar disposiciones sin el mismo proyecto de unidad. El Código francés y el alemán expresan trayectorias diferentes, con influencias posteriores en otros ordenamientos.",
      "La codificación española culmina en el Código Civil de 1889 tras un proceso histórico que no elimina la diversidad civil territorial. Estudiar un código exige relacionar estructura, fundamentos y ámbito de aplicación. El texto original y su versión vigente no son necesariamente iguales.",
    ],
    example:
      "Citar un artículo de 1889 para un caso actual requiere comprobar sus modificaciones y el Derecho aplicable.",
    task: "Distingue codificación, recopilación y actualización; sitúa la codificación civil española.",
    checks: [
      [
        "El Código Civil español se promulgó en…",
        "1889",
        "1931",
        "1978",
        "La codificación civil española pertenece al siglo XIX.",
      ],
      [
        "Un código se caracteriza por…",
        "Una ordenación sistemática de una materia",
        "Ser cualquier conjunto casual de documentos",
        "No poder modificarse",
        "La sistematización distingue el proyecto codificador de la mera acumulación.",
      ],
      [
        "El Código Civil eliminó toda diversidad civil territorial…",
        "No",
        "Sí",
        "Solo por ser estatal",
        "La codificación española convive con Derechos civiles territoriales.",
      ],
    ],
  },
  {
    number: 17,
    title: "Unificación e integración jurídica europea",
    concepts: ["Integración", "Primacía", "Efecto directo"],
    paragraphs: [
      "Los proyectos históricos de unidad política y la integración europea actual no constituyen un proceso continuo e idéntico. La Unión se funda en tratados, instituciones y competencias atribuidas, con un ordenamiento que debe analizarse por sus reglas propias.",
      "La primacía atiende a la aplicación preferente del Derecho de la Unión en su ámbito; el efecto directo, a la posibilidad de invocar disposiciones bajo requisitos. Los principios generales también intervienen en la interpretación y protección jurídica. Comparar con Roma sirve para formular preguntas, no para identificar ambas organizaciones.",
    ],
    example:
      "La presencia de un espacio político amplio en Roma y en Europa no permite atribuir a ambas el mismo fundamento jurídico.",
    task: "Explica atribución, primacía y efecto directo y añade una diferencia con la unidad imperial romana.",
    checks: [
      [
        "Primacía y efecto directo…",
        "Son conceptos diferentes",
        "Son siempre idénticos",
        "Solo regulan elecciones",
        "Aplicación preferente e invocabilidad responden a preguntas distintas.",
      ],
      [
        "La Unión Europea se basa en…",
        "Tratados y competencias atribuidas",
        "Una continuidad institucional idéntica al Imperio romano",
        "Solo costumbre local",
        "La integración actual tiene fundamento jurídico propio.",
      ],
      [
        "Comparar Roma y Unión Europea exige…",
        "Reconocer diferencias de estructura y legitimación",
        "Afirmar identidad absoluta",
        "Ignorar el Derecho vigente",
        "La comparación histórica no sustituye el análisis del ordenamiento actual.",
      ],
    ],
  },
  {
    number: 18,
    title: "Organización provincial romana",
    concepts: ["Provincia", "Gobernador", "Reformas"],
    paragraphs: [
      "La provincia romana pasa de expresar un ámbito de atribuciones a designar una circunscripción territorial. La organización provincial cambia a lo largo de la República y del Imperio, de modo que no existe un mapa único válido para todos los periodos.",
      "El gobernador y los órganos provinciales deben estudiarse junto con el estatuto de las comunidades y la aplicación del Derecho. Las reformas del Principado y del Bajo Imperio modifican estructuras y relaciones de poder. La provincia contemporánea española tiene un fundamento distinto, aunque conserve una denominación histórica.",
    ],
    example:
      "Dos documentos de épocas diferentes pueden mostrar divisiones provinciales distintas sin que uno sea necesariamente erróneo.",
    task: "Organiza la explicación por etapa, territorio, autoridad y estatuto de comunidades.",
    checks: [
      [
        "La división provincial romana…",
        "Cambió históricamente",
        "Fue siempre idéntica",
        "Equivale al mapa autonómico actual",
        "La organización territorial responde a etapas y reformas.",
      ],
      [
        "El significado inicial de provincia se relaciona con…",
        "Atribuciones de un magistrado",
        "Una comunidad autónoma",
        "Una diputación actual",
        "La acepción territorial tiene un desarrollo histórico.",
      ],
      [
        "Una provincia romana y una actual…",
        "Deben distinguirse por fundamento y régimen",
        "Son necesariamente idénticas",
        "Carecen de organización",
        "La continuidad del nombre no prueba identidad institucional.",
      ],
    ],
  },
  {
    number: 19,
    title: "Colonias y municipios romanos",
    concepts: ["Estatutos locales", "Curia", "Magistraturas municipales"],
    paragraphs: [
      "Colonias y municipios son formas de organización de comunidades locales con trayectorias y estatutos que deben diferenciarse. La incorporación al ámbito romano puede producirse mediante procesos distintos y no equivale a una igualdad instantánea de toda ciudad y habitante.",
      "La curia u ordo decurionum y los magistrados municipales participan en el gobierno local. Las leyes municipales permiten estudiar competencias, cargos y procedimientos. La autonomía de una comunidad no debe confundirse con soberanía estatal ni identificarse automáticamente con el ayuntamiento contemporáneo.",
    ],
    example:
      "Una ley municipal organiza cargos locales; para comprender sus efectos hay que atender a la comunidad y a su estatuto.",
    task: "Compara colonia y municipio por origen, estatuto y órganos, evitando una equivalencia rígida para toda época.",
    checks: [
      [
        "El ordo decurionum se vincula al…",
        "Gobierno municipal romano",
        "Tribunal Constitucional español",
        "Gobierno europeo",
        "La organización local integra órganos y magistraturas propios.",
      ],
      [
        "Toda ciudad incorporada a Roma adquiere de inmediato idéntico estatuto…",
        "No",
        "Sí",
        "Solo por tener mercado",
        "Los estatutos y procesos de incorporación fueron diversos.",
      ],
      [
        "Las leyes municipales ayudan a estudiar…",
        "Cargos, competencias y procedimientos locales",
        "Solo normas de la Constitución de 1978",
        "Una soberanía estatal de cada ciudad",
        "La documentación local permite conocer su organización jurídica.",
      ],
    ],
  },
  {
    number: 20,
    title: "Organización territorial actual",
    concepts: ["Comunidades autónomas", "Provincias", "Municipios"],
    paragraphs: [
      "La Constitución española organiza territorialmente el Estado en municipios, provincias y comunidades autónomas, con autonomía para gestionar sus intereses conforme a su régimen. La autonomía política de las comunidades no se identifica con la autonomía local ni con soberanía independiente.",
      "Los estatutos de autonomía y las normas estatales y territoriales articulan instituciones y competencias. La provincia y el municipio tienen garantías y funciones propias. Comparar con Roma exige atender a legitimación, fuentes y organización actual, sin presentar una genealogía como identidad jurídica completa.",
    ],
    example:
      "Una competencia municipal y una autonómica pueden relacionarse sin pertenecer al mismo nivel ni tener la misma fuente de atribución.",
    task: "Haz tres filas con institución territorial, fundamento y tipo de autonomía; añade una diferencia respecto de Roma.",
    checks: [
      [
        "La autonomía territorial equivale siempre a soberanía independiente…",
        "No",
        "Sí",
        "Solo por existir una asamblea",
        "La autonomía se ejerce dentro del marco constitucional.",
      ],
      [
        "Los estatutos de autonomía se relacionan con…",
        "La organización institucional y competencial autonómica",
        "El reparto de ciudadanía romana",
        "La desaparición de municipios",
        "Los estatutos forman parte del marco jurídico de cada comunidad.",
      ],
      [
        "Comparar municipio romano y actual requiere…",
        "Distinguir fuentes, legitimación y competencias",
        "Suponer identidad por el nombre",
        "Omitir la Constitución",
        "El análisis histórico debe respetar el fundamento del régimen vigente.",
      ],
    ],
  },
];

export const foundationsLessons = prepareBlocks(
  "901012",
  "fundamentos-capitulo",
  blocks,
  (n) => [
    `Fundamentos Clásicos de la Democracia y la Administración · capítulo ${n} · único manual recibido en cuatro fragmentos`,
    "Índice del manual · páginas PDF 3–10 de la parte 1–80",
  ],
);
