import { prepareBlocks, type PreparedBlock } from "./prepared-lesson";

const blocks: PreparedBlock[] = [
  {
    number: 5,
    title: "Asentamiento y sociedad visigoda",
    concepts: ["Asentamiento", "Reparto de tierras", "Grupos sociales"],
    paragraphs: [
      "Los visigodos se asentaron en territorios del Imperio mediante relaciones políticas y militares que fueron cambiando. El establecimiento en la península y la formación del reino no pueden explicarse como una sustitución instantánea de toda la población y de sus instituciones.",
      "El reparto de tierras y la relación entre godos e hispanorromanos plantean debates sobre las fuentes y las fórmulas de asentamiento. La sociedad incluía diferencias de poder, riqueza y dependencia. Hay que distinguir identidad de grupo, condición jurídica y posición económica, sin suponer igualdad interna de todos los godos o de todos los romanos.",
    ],
    example:
      "Una fuente alude a reparto de bienes: identificar beneficiarios no prueba que toda la población perdiera sus tierras del mismo modo.",
    task: "Relaciona asentamiento, reparto y estructura social; señala qué afirmaciones necesitan apoyo documental.",
    checks: [
      [
        "El asentamiento visigodo supuso una sustitución instantánea de toda la población…",
        "No",
        "Sí, sin pervivencias",
        "Solo por existir un rey",
        "El asentamiento coexistió con poblaciones e instituciones anteriores.",
      ],
      [
        "Godos y romanos deben estudiarse distinguiendo…",
        "Identidad, condición jurídica y posición social",
        "Solo el nombre personal",
        "Una igualdad social absoluta",
        "La pertenencia a un grupo no elimina diferencias jurídicas y económicas.",
      ],
      [
        "El reparto de tierras exige…",
        "Examinar fuentes e interpretaciones",
        "Generalizar un testimonio a todos los casos",
        "Omitir el contexto",
        "Las fórmulas de asentamiento son objeto de investigación y debate.",
      ],
    ],
  },
  {
    number: 8,
    title: "Al-Ándalus, repoblación y señoríos",
    concepts: ["Fuentes islámicas", "Repoblación", "Dependencia señorial"],
    paragraphs: [
      "Al-Ándalus y los reinos cristianos presentan organizaciones políticas y jurídicas diferentes y cambiantes. Corán y tradición profética son referencias de las fuentes islámicas; las categorías de sunna, hadiz e consenso requieren distinguir su función y su elaboración jurídica.",
      "La repoblación adopta formas diversas según territorios y etapas. En el régimen señorial deben separarse dominio de la tierra, prestaciones y poderes sobre habitantes. Un privilegio o una carta de población no demuestra libertad general de toda carga ni una organización idéntica en todos los lugares.",
    ],
    example:
      "Una carta concede exenciones a pobladores pero conserva obligaciones: hay que identificar exactamente qué se concede y qué se reserva.",
    task: "Compara fuentes islámicas y repoblación cristiana sin tratarlas como un sistema único; clasifica prestaciones señoriales.",
    checks: [
      [
        "La repoblación medieval tuvo…",
        "Modalidades diferentes según lugar y etapa",
        "Una única forma invariable",
        "Siempre sufragio universal",
        "Las modalidades dependen del contexto político, territorial y social.",
      ],
      [
        "En un señorío conviene distinguir…",
        "Tierra, prestaciones y poderes sobre habitantes",
        "Solo el apellido del señor",
        "Una libertad absoluta de toda carga",
        "Propiedad y facultades jurisdiccionales no son conceptos idénticos.",
      ],
      [
        "Una carta con exenciones implica…",
        "Analizar el alcance y las obligaciones reservadas",
        "Ausencia de toda obligación",
        "Igualdad con ciudadanía actual",
        "Los privilegios tienen un contenido concreto que no puede ampliarse sin prueba.",
      ],
    ],
  },
  {
    number: 9,
    title: "Economía, estamentos y vínculos feudales",
    concepts: ["Economía agraria", "Estamentos", "Vasallaje y beneficio"],
    paragraphs: [
      "La economía medieval combina actividad agraria y ganadera con redes urbanas, mercados y crédito. La Mesta se relaciona con la organización e intereses de la ganadería, mientras las ferias y sociedades mercantiles muestran formas de intercambio que no se reducen al ámbito rural.",
      "La sociedad estamental organiza posiciones y privilegios de manera desigual. Vasallaje y beneficio permiten analizar vínculos personales y concesiones en las instituciones feudales. Dependencia señorial, esclavitud y vasallaje no son automáticamente lo mismo; conviene identificar sujeto, vínculo y prestación en cada caso.",
    ],
    example:
      "Una concesión territorial ligada a fidelidad y servicio plantea una relación distinta de un contrato agrario de explotación.",
    task: "Haz un esquema con economía, estructura social y vínculos personales; evita usar feudal para cualquier dependencia.",
    checks: [
      [
        "La Mesta se relaciona principalmente con…",
        "Intereses ganaderos",
        "La reforma constitucional",
        "El tribunal del jurado",
        "La organización ganadera es parte de la estructura económica medieval.",
      ],
      [
        "Vasallaje y beneficio permiten estudiar…",
        "Vínculos personales y concesiones feudales",
        "Sufragio universal",
        "Solo impuestos modernos",
        "Las instituciones feudales articulan relaciones de fidelidad y prestaciones.",
      ],
      [
        "La sociedad estamental se caracteriza por…",
        "Diferencias jurídicas de posición y privilegio",
        "Igualdad de ciudadanía contemporánea",
        "Ausencia de grupos",
        "El estamento no equivale a una clase homogénea de ciudadanos iguales.",
      ],
    ],
  },
  {
    number: 13,
    title: "Derechos medievales de los territorios orientales",
    concepts: ["Fueros", "Derecho propio", "Recepción"],
    paragraphs: [
      "Aragón, Navarra, Cataluña, Mallorca y Valencia desarrollan fuentes e instituciones propias. El Fuero de Jaca, el Fuero General de Navarra, los usos y costumbres catalanes y los textos valencianos pertenecen a trayectorias diferentes; no deben ordenarse como si fueran versiones de una misma ley castellana.",
      "La recepción del Derecho común convive con derechos locales y territoriales y se articula mediante reglas propias de aplicación. Las cartas de población y los fueros expresan privilegios y ordenaciones concretas. La prelación de Alcalá no debe trasladarse automáticamente a todos estos territorios.",
    ],
    example:
      "Ante un texto valenciano, identificar la fecha y su sistema de fuentes es más útil que aplicar de memoria el orden castellano de Alcalá.",
    task: "Prepara una fila por territorio con texto destacado, ámbito y relación con el Derecho común.",
    checks: [
      [
        "La prelación de Alcalá se aplica automáticamente a todos los territorios medievales…",
        "No",
        "Sí",
        "Solo por estar en la península",
        "Los derechos territoriales tienen trayectorias y reglas propias.",
      ],
      [
        "El Fuero General de Navarra se sitúa en…",
        "La formación del Derecho navarro",
        "El Código Civil de 1889",
        "La democracia ateniense",
        "El texto pertenece a una tradición territorial concreta.",
      ],
      [
        "Para comparar estos derechos conviene…",
        "Identificar territorio, fuente y etapa",
        "Reducirlos a una única ley castellana",
        "Prescindir de fechas",
        "La comparación exige respetar diversidad y contexto.",
      ],
    ],
  },
  {
    number: 14,
    title: "Monarquía medieval y límites del poder",
    concepts: ["Sucesión", "Ordenación regia", "Límites"],
    paragraphs: [
      "La monarquía medieval se estudia atendiendo a sucesión, acceso al trono, ceremonias y fundamentos del poder. La transmisión hereditaria y la ordenación del rey no eliminan conflictos ni convierten todas las monarquías en instituciones idénticas.",
      "Las relaciones con nobles, ciudades, Cortes y cuerpos del reino condicionan el poder. Doctrinas sobre deberes y límites deben distinguirse de su cumplimiento efectivo. Juntas, uniones y hermandades expresan formas de acción política que necesitan contexto, sin equipararlas a partidos o parlamentos actuales.",
    ],
    example:
      "Un juramento regio formula obligaciones: su existencia permite estudiar un ideal y una relación política, pero no demuestra cumplimiento perfecto.",
    task: "Explica acceso, legitimación, facultades y límites del rey distinguiendo doctrina y práctica.",
    checks: [
      [
        "Un juramento del rey permite estudiar…",
        "Obligaciones e ideales de legitimación",
        "Cumplimiento perfecto demostrado siempre",
        "Una elección democrática actual",
        "La formulación de deberes no prueba por sí sola su cumplimiento.",
      ],
      [
        "Las monarquías medievales…",
        "Presentan diferencias territoriales e históricas",
        "Son siempre idénticas",
        "Carecen de conflictos sucesorios",
        "Las reglas y relaciones de poder cambian según reino y etapa.",
      ],
      [
        "Doctrina sobre límites y práctica política…",
        "Deben contrastarse",
        "Son necesariamente lo mismo",
        "No admiten fuentes",
        "La investigación distingue formulaciones normativas y funcionamiento.",
      ],
    ],
  },
  {
    number: 16,
    title: "Oficios, consejos y cancillerías",
    concepts: ["Oficio público", "Consejos", "Control de gestión"],
    paragraphs: [
      "La administración central medieval se organiza en torno a la corte, oficiales, consejos, cancillerías y secretarios. Cada órgano atiende funciones de asesoramiento, documentación y gobierno, con diferencias entre reinos y etapas.",
      "El acceso al oficio y el control de su ejercicio forman parte de la organización del poder. Pesquisas, visitas, residencia y purga de taula son mecanismos históricos con ámbitos propios. No equivalen sin más a un procedimiento administrativo sancionador contemporáneo ni se aplican idénticamente en todos los territorios.",
    ],
    example:
      "Un control al terminar un oficio debe analizarse por su régimen concreto y no solo etiquetarse como juicio moderno.",
    task: "Relaciona órgano, función y control; compara dos mecanismos sin borrar su contexto territorial.",
    checks: [
      [
        "La cancillería se relaciona con…",
        "La documentación y expedición de actos regios",
        "El sufragio universal",
        "Solo la ganadería",
        "La documentación regia es una función esencial de las cancillerías.",
      ],
      [
        "Residencia, visita y otros controles…",
        "Exigen distinguir ámbito y régimen histórico",
        "Son siempre idénticos",
        "Son leyes actuales sin cambios",
        "Los controles del oficio varían territorial e históricamente.",
      ],
      [
        "Consejos, secretarios y oficiales…",
        "Desarrollan funciones diferenciadas",
        "Son nombres intercambiables de todo órgano",
        "Carecen de relación con el rey",
        "La administración central distribuye asesoramiento, gobierno y documentación.",
      ],
    ],
  },
  {
    number: 17,
    title: "Administración territorial y municipio medieval",
    concepts: ["Delegación regia", "Concejo", "Corregidor"],
    paragraphs: [
      "La administración territorial articula la presencia del poder regio fuera de la corte. Sus demarcaciones y agentes cambian por reinos y periodos; no deben proyectarse sobre ella las provincias y comunidades autónomas actuales.",
      "Los municipios desarrollan formas de gobierno y participación local, con diferencias entre concejos, cargos y grupos dominantes. La intervención del corregidor se vincula al poder regio y a su relación con el gobierno urbano. La autonomía local histórica no equivale a democracia universal ni a independencia soberana.",
    ],
    example:
      "Un concejo con participación restringida puede tener competencias propias sin representar por igual a todos sus habitantes.",
    task: "Compara administración territorial y local e identifica qué cambia con la intervención regia.",
    checks: [
      [
        "El concejo medieval equivale siempre a democracia universal…",
        "No",
        "Sí",
        "Solo si tiene mercado",
        "Las formas de participación local pueden ser restringidas.",
      ],
      [
        "El corregidor permite estudiar…",
        "La intervención regia en el ámbito local",
        "La ciudadanía romana de Caracalla",
        "Una institución europea actual",
        "Su actuación se relaciona con gobierno local y poder del rey.",
      ],
      [
        "Para estudiar la administración territorial conviene…",
        "Distinguir reinos y etapas",
        "Usar el mapa autonómico actual como equivalencia exacta",
        "Eliminar toda cronología",
        "Las demarcaciones históricas no se identifican automáticamente con las actuales.",
      ],
    ],
  },
  {
    number: 18,
    title: "Justicia, Hacienda y organización militar medieval",
    concepts: ["Jurisdicciones", "Ingresos", "Servicio militar"],
    paragraphs: [
      "La administración de justicia medieval combina órganos regios y jurisdicciones con ámbitos especiales, como las eclesiásticas, señoriales o mercantiles. Su organización varía por territorios; no debe describirse como la unidad jurisdiccional contemporánea.",
      "La Hacienda se estudia por sus órganos, ingresos y recaudación, distinguiendo prestaciones de diversa naturaleza. Fonsado, milicias señoriales y concejiles y órdenes militares expresan formas de organización militar. Identifica quién exige, quién presta y con qué fundamento, sin confundir todo ingreso con un impuesto moderno.",
    ],
    example:
      "Una obligación de acudir a una campaña tiene naturaleza distinta de un tributo monetario, aunque ambas afecten a la relación con el poder.",
    task: "Haz tres columnas: justicia, Hacienda y ejército; añade autoridad, recurso y obligación en cada una.",
    checks: [
      [
        "La justicia medieval presenta…",
        "Pluralidad de órganos y jurisdicciones",
        "La organización exacta del Poder Judicial actual",
        "Ausencia absoluta de reglas",
        "La pluralidad debe explicarse por territorio y ámbito.",
      ],
      [
        "El fonsado se relaciona con…",
        "Servicio militar",
        "Un recurso de amparo",
        "Un colegio electoral",
        "Las obligaciones militares tienen modalidades históricas propias.",
      ],
      [
        "Para clasificar un ingreso histórico hay que…",
        "Examinar su fundamento y naturaleza",
        "Llamarlo siempre impuesto actual",
        "Omitir al sujeto obligado",
        "La Hacienda reúne prestaciones que deben diferenciarse.",
      ],
    ],
  },
];

export const historyTopicLessons = prepareBlocks(
  "021015",
  "historia-leccion",
  blocks,
  (n) => [
    `Programa oficial de Historia del Derecho Español.pdf · lección ${n}`,
    `Curso de Historia del Derecho Español · lección ${n}`,
    "66021015_2027.pdf · contenidos en páginas PDF 9–11 y evaluación en páginas 12–15",
  ],
);
