import { prepareBlocks, type PreparedBlock } from "./prepared-lesson";

const blocks: PreparedBlock[] = [
  {
    number: 3,
    title: "Jurisdicción: potestad y funciones",
    concepts: ["Juzgar", "Ejecutar", "Garantías"],
    paragraphs: [
      "La jurisdicción es una potestad del Estado ejercida por jueces y tribunales independientes, sometidos al Derecho. Comprende juzgar y hacer ejecutar lo juzgado: obtener una declaración no siempre basta para que la tutela se haga efectiva.",
      "La protección de derechos, el control jurídico y la resolución de conflictos requieren órganos y procedimientos con garantías. La función jurisdiccional no se identifica con cualquier decisión pública: legislar, administrar y juzgar tienen fundamentos, competencias y controles diferentes.",
    ],
    example:
      "Una sentencia reconoce una deuda; si el obligado no paga, puede ser necesario acudir a ejecución.",
    task: "Separa en el ejemplo declaración, ejecución y garantías de las partes.",
    checks: [
      [
        "La potestad jurisdiccional comprende…",
        "Juzgar y hacer ejecutar lo juzgado",
        "Solo legislar",
        "Solo asesorar",
        "La declaración y la ejecución integran la función jurisdiccional.",
      ],
      [
        "La independencia judicial exige…",
        "Decidir conforme al Derecho sin instrucciones sobre el fallo",
        "Decidir al margen de la ley",
        "Obedecer a la parte más poderosa",
        "Independencia y sometimiento al Derecho son compatibles y necesarios.",
      ],
      [
        "Reconocer judicialmente una deuda asegura siempre cobro inmediato…",
        "No: puede necesitar ejecución",
        "Sí, sin actuaciones posteriores",
        "Solo si lo decide el acreedor",
        "La tutela puede requerir actuaciones ejecutivas tras la declaración.",
      ],
    ],
  },
  {
    number: 4,
    title: "Jurisdicción y competencia",
    concepts: ["Orden jurisdiccional", "Competencia", "Reparto"],
    paragraphs: [
      "La jurisdicción delimita la potestad y los órdenes que conocen de materias civiles, penales, contencioso-administrativas o sociales. La competencia distribuye los asuntos entre órganos concretos mediante criterios objetivos, funcionales y territoriales.",
      "El reparto asigna asuntos entre órganos o secciones del mismo ámbito conforme a reglas previas. No es sinónimo de competencia ni permite alterar libremente el juez legal. Para resolver un caso identifica materia, función procesal y territorio antes de buscar el órgano concreto.",
    ],
    example:
      "Una reclamación laboral requiere determinar primero el orden social y después qué órgano es competente.",
    task: "Aplica la secuencia orden → competencia objetiva → función → territorio → reparto.",
    checks: [
      [
        "La competencia distribuye asuntos entre…",
        "Órganos jurisdiccionales concretos",
        "Solo partidos políticos",
        "Solo mediadores",
        "La competencia concreta qué órgano puede conocer del asunto.",
      ],
      [
        "El reparto y la competencia…",
        "Son conceptos diferentes",
        "Son siempre lo mismo",
        "Eliminan al juez legal",
        "El reparto opera dentro de un ámbito de órganos competentes.",
      ],
      [
        "Antes de elegir el órgano de una reclamación laboral conviene…",
        "Identificar el orden jurisdiccional",
        "Elegir al juez que prefiera la parte",
        "Sortear entre cualquier autoridad",
        "La materia orienta la identificación del orden competente.",
      ],
    ],
  },
  {
    number: 5,
    title: "Exclusividad y unidad jurisdiccional",
    concepts: ["Reserva jurisdiccional", "Unidad", "Límites"],
    paragraphs: [
      "La exclusividad en sentido positivo reserva juzgar y ejecutar lo juzgado a los órganos jurisdiccionales previstos. En sentido negativo limita que estos asuman otras funciones, salvo las atribuidas legalmente en garantía de derechos.",
      "La unidad jurisdiccional es base de la organización y funcionamiento de los tribunales. No elimina especialización ni órdenes distintos. La existencia de jurisdicciones u órganos con régimen constitucional específico exige estudiar su fundamento, sin convertir cualquier organismo administrativo en tribunal.",
    ],
    example:
      "Una sección especializada no rompe por ese solo hecho la unidad jurisdiccional.",
    task: "Compara reserva de la función, límites funcionales del juez y especialización.",
    checks: [
      [
        "La exclusividad positiva se relaciona con…",
        "La reserva de juzgar a órganos jurisdiccionales",
        "Prohibir toda especialización",
        "La facultad de juzgar de cualquier administración",
        "La reserva protege quién puede ejercer la potestad jurisdiccional.",
      ],
      [
        "Unidad jurisdiccional significa ausencia de especialización…",
        "No",
        "Sí, siempre",
        "Solo si hay órganos colegiados",
        "La unidad es compatible con distribución por órdenes y materias.",
      ],
      [
        "La exclusividad negativa limita…",
        "La atribución indiscriminada de funciones ajenas a juzgar",
        "El derecho de defensa",
        "La aplicación de la ley",
        "Las funciones distintas de juzgar requieren un fundamento jurídico específico.",
      ],
    ],
  },
  {
    number: 6,
    title: "Independencia, abstención y recusación",
    concepts: ["Imparcialidad", "Abstención", "Recusación"],
    paragraphs: [
      "La independencia protege al juez frente a presiones e instrucciones sobre cómo resolver. La imparcialidad atiende a su posición respecto de las partes y del objeto del litigio. Son garantías relacionadas, pero distintas.",
      "La abstención permite al propio juez apartarse cuando concurre causa legal; la recusación permite promover su apartamiento por el cauce previsto. No basta una discrepancia con una resolución para recusar: se necesitan causa, legitimación y procedimiento. La inamovilidad protege frente a separaciones arbitrarias.",
    ],
    example:
      "Un vínculo relevante con una parte exige examinar las causas legales de abstención o recusación.",
    task: "Distingue independencia e imparcialidad y señala quién inicia abstención y recusación.",
    checks: [
      [
        "La abstención la promueve…",
        "El propio juez al apreciar causa legal",
        "Solo un periódico",
        "Siempre el Gobierno",
        "La abstención parte del titular afectado por la causa.",
      ],
      [
        "La recusación se basa en…",
        "Causas legales y un procedimiento",
        "Cualquier desacuerdo sin causa",
        "La popularidad del litigante",
        "El apartamiento no se decide por mera disconformidad con el fallo.",
      ],
      [
        "La inamovilidad protege frente a…",
        "Separaciones o traslados arbitrarios",
        "Toda responsabilidad legal",
        "Cualquier recurso",
        "La garantía no elimina los procedimientos legales de responsabilidad.",
      ],
    ],
  },
  {
    number: 7,
    title: "El juez ordinario predeterminado por la ley",
    concepts: ["Predeterminación", "Competencia legal", "Igualdad"],
    paragraphs: [
      "El derecho al juez ordinario predeterminado por la ley impide seleccionar un tribunal a conveniencia después de surgir el conflicto. Su organización y competencia deben responder a normas previas y generales.",
      "La garantía alcanza la identificación del órgano y las reglas relevantes de su composición y actuación. No concede derecho a un juez favorable ni convierte toda irregularidad procesal en lesión constitucional. Hay que explicar qué regla se vulnera y cómo afecta a la garantía.",
    ],
    example:
      "Crear un órgano excepcional para resolver un caso ya conocido plantea un problema distinto de aplicar reglas generales de reparto.",
    task: "Explica qué significa que el juez esté predeterminado y qué no garantiza ese derecho.",
    checks: [
      [
        "Predeterminación legal significa…",
        "Órgano y competencia fijados por reglas previas",
        "Elección libre del juez por la parte",
        "Creación de un tribunal para cada resultado deseado",
        "Las reglas previas protegen frente a tribunales de conveniencia.",
      ],
      [
        "El juez legal garantiza un fallo favorable…",
        "No",
        "Sí, necesariamente",
        "Solo al demandante",
        "La garantía se refiere al órgano y al procedimiento, no al éxito de la pretensión.",
      ],
      [
        "Al alegar una lesión debe identificarse…",
        "La regla vulnerada y su relevancia para la garantía",
        "Solo la decepción por el resultado",
        "La opinión de la otra parte",
        "No toda discrepancia o irregularidad equivale a lesión constitucional.",
      ],
    ],
  },
  {
    number: 8,
    title: "Organización jurisdiccional y gobierno judicial",
    concepts: ["Potestad jurisdiccional", "Gobierno judicial", "CGPJ"],
    paragraphs: [
      "La organización jurisdiccional distribuye la función de juzgar; el gobierno judicial atiende a aspectos organizativos y estatutarios. Un órgano de gobierno de la judicatura no decide por ese título cómo debe resolverse un litigio.",
      "El Consejo General del Poder Judicial ejerce las competencias de gobierno atribuidas por el ordenamiento. Deben distinguirse tribunales integrados en el Poder Judicial y otros órganos jurisdiccionales de fundamento constitucional específico. La independencia no autoriza a confundir gobierno de jueces y revisión de sentencias.",
    ],
    example:
      "Una decisión sobre organización judicial no equivale a una sentencia que resuelva el fondo de una demanda.",
    task: "Clasifica juzgar, nombrar conforme a reglas y organizar servicios en funciones diferentes.",
    checks: [
      [
        "El gobierno judicial y la jurisdicción…",
        "Deben distinguirse",
        "Son siempre la misma actividad",
        "Excluyen toda organización",
        "Gobierno y potestad jurisdiccional tienen objetos y competencias distintos.",
      ],
      [
        "El CGPJ resuelve todos los recursos judiciales por ser órgano de gobierno…",
        "No",
        "Sí",
        "Solo en días hábiles",
        "El gobierno judicial no convierte al Consejo en tribunal de apelación.",
      ],
      [
        "La independencia exige que un órgano de gobierno…",
        "No imponga el contenido del fallo",
        "Ordene el resultado de cada pleito",
        "Sustituya a todas las partes",
        "El fallo debe resultar del ejercicio jurisdiccional conforme a Derecho.",
      ],
    ],
  },
  {
    number: 9,
    title: "Tribunales de Instancia y oficina judicial",
    concepts: ["Tribunal de Instancia", "Secciones", "Servicios comunes"],
    paragraphs: [
      "El manual de 2025 incorpora la reorganización de los Tribunales de Instancia y sus secciones. La organización colegiada no significa que todos los asuntos se decidan siempre por todos los jueces reunidos: deben distinguirse estructura organizativa y ejercicio de la función jurisdiccional.",
      "La oficina judicial presta apoyo mediante servicios comunes y personal con funciones específicas. Las oficinas de justicia en los municipios facilitan la prestación territorial de servicios según su regulación. No deben estudiarse estas reformas usando únicamente organigramas anteriores como si siguieran intactos.",
    ],
    example:
      "Un servicio común tramita actuaciones de apoyo, mientras el juez competente conserva la decisión jurisdiccional que le corresponde.",
    task: "Dibuja órgano jurisdiccional, sección y servicios de apoyo; asigna una función a cada nivel.",
    checks: [
      [
        "La estructura de un Tribunal de Instancia implica que todo pleito lo falla el pleno…",
        "No necesariamente",
        "Sí, siempre",
        "Solo si lo pide un funcionario",
        "Organización colegiada y forma de resolver cada asunto no son equivalentes.",
      ],
      [
        "La oficina judicial presta…",
        "Apoyo a la actividad jurisdiccional",
        "Soberanía legislativa",
        "Dirección política del Gobierno",
        "Sus servicios y personal colaboran con la actividad judicial.",
      ],
      [
        "Para estudiar la organización actual debe atenderse…",
        "A las reformas incorporadas por el manual y la guía",
        "Solo a un esquema antiguo sin revisión",
        "A la preferencia de cada parte",
        "Los cambios de organización requieren actualizar el marco de estudio.",
      ],
    ],
  },
  {
    number: 10,
    title: "Extensión y límites de la jurisdicción",
    concepts: ["Ámbito internacional", "Límites", "Inmunidades"],
    paragraphs: [
      "La extensión de la jurisdicción plantea cuándo pueden conocer los tribunales españoles de un asunto. No es la misma pregunta que distribuir territorialmente un litigio entre órganos internos: primero debe examinarse si existe jurisdicción internacional.",
      "Los criterios de conexión, las normas europeas y los tratados pueden intervenir según la materia. Las inmunidades tienen fundamento y alcance propios; no equivalen a afirmar que cualquier autoridad extranjera carece de toda responsabilidad. El análisis debe identificar sujeto, actuación y regla aplicable.",
    ],
    example:
      "Un litigio con partes de distintos países exige comprobar el régimen internacional antes de elegir una sede judicial española.",
    task: "Separa jurisdicción internacional, orden competente y competencia territorial interna.",
    checks: [
      [
        "La jurisdicción internacional se pregunta…",
        "Si pueden conocer los tribunales del Estado",
        "Solo qué sala tiene mejor ubicación",
        "Quién gana el pleito",
        "La extensión internacional precede a la distribución interna del asunto.",
      ],
      [
        "Un elemento extranjero hace irrelevantes los tratados…",
        "No",
        "Sí",
        "Solo si el demandante lo prefiere",
        "Las reglas internacionales o europeas pueden determinar el conocimiento del litigio.",
      ],
      [
        "Las inmunidades deben analizarse por…",
        "Sujeto, actuación y fundamento jurídico",
        "Una exención universal sin límites",
        "El nombre del país solamente",
        "La inmunidad tiene un ámbito específico que debe justificarse.",
      ],
    ],
  },
  {
    number: 11,
    title: "Jueces y magistrados: estatuto y responsabilidad",
    concepts: ["Carrera judicial", "Inamovilidad", "Responsabilidad"],
    paragraphs: [
      "Jueces y magistrados ejercen la potestad jurisdiccional con sujeción a garantías y deberes. La carrera judicial, el acceso y las distintas posiciones profesionales tienen un régimen legal; no deben confundirse categorías profesionales y funciones concretas en un proceso.",
      "Independencia e inamovilidad no eliminan la responsabilidad. La responsabilidad disciplinaria y otras responsabilidades tienen presupuestos y procedimientos distintos. Un recurso contra una resolución busca su revisión conforme al sistema procesal y no equivale automáticamente a una denuncia disciplinaria.",
    ],
    example:
      "Una parte que discrepa de una sentencia debe estudiar los recursos; la discrepancia por sí sola no prueba infracción disciplinaria.",
    task: "Compara garantía de independencia, deber profesional y cauce de revisión de resoluciones.",
    checks: [
      [
        "Independencia judicial significa ausencia de responsabilidad…",
        "No",
        "Sí, siempre",
        "Solo para magistrados",
        "Las garantías coexisten con responsabilidades legalmente reguladas.",
      ],
      [
        "El recurso contra una sentencia sirve principalmente para…",
        "Obtener su revisión por el cauce previsto",
        "Sancionar siempre al juez",
        "Modificar libremente la ley",
        "La impugnación de resoluciones tiene objeto diferente del procedimiento disciplinario.",
      ],
      [
        "Categoría profesional y función en el proceso…",
        "Deben distinguirse",
        "Son necesariamente idénticas",
        "No tienen regulación",
        "El estatuto y la función procesal son planos relacionados pero distintos.",
      ],
    ],
  },
  {
    number: 12,
    title: "LAJ, Policía Judicial y personal de apoyo",
    concepts: ["Fe pública judicial", "Policía Judicial", "Tramitación"],
    paragraphs: [
      "Los letrados de la Administración de Justicia desarrollan funciones como fe pública judicial, ordenación y otras competencias atribuidas legalmente. No se identifica su actuación con la potestad del juez ni se reduce a una tarea material sin relevancia jurídica.",
      "La Policía Judicial colabora en la investigación y averiguación de delitos bajo la dependencia funcional prevista. Los cuerpos de personal al servicio de la Administración de Justicia desempeñan tareas diferenciadas de gestión, tramitación y auxilio. Hay que asignar cada actuación al profesional y a la competencia adecuados.",
    ],
    example:
      "Documentar una actuación, investigar hechos y resolver una cuestión jurisdiccional requieren distinguir funciones y responsables.",
    task: "Haz una tabla de función, profesional y dependencia para cada grupo.",
    checks: [
      [
        "La fe pública judicial se vincula al…",
        "Letrado de la Administración de Justicia",
        "Portavoz de un partido",
        "Mediador por cualquier acuerdo",
        "El LAJ tiene funciones jurídicas específicas, entre ellas fe pública judicial.",
      ],
      [
        "La Policía Judicial colabora en…",
        "La investigación conforme a su régimen funcional",
        "La aprobación de leyes",
        "La sustitución de todos los jueces",
        "Su colaboración investigadora no la convierte en órgano sentenciador.",
      ],
      [
        "Los profesionales de apoyo tienen…",
        "Funciones diferenciadas por su regulación",
        "Todas las mismas competencias",
        "Potestad ilimitada para fallar",
        "La identificación de funciones evita atribuir una actuación al órgano equivocado.",
      ],
    ],
  },
  {
    number: 13,
    title: "Defensa y representación procesal",
    concepts: ["Abogacía", "Procura", "Graduados sociales"],
    paragraphs: [
      "La defensa técnica y la representación procesal son funciones distintas. El abogado asesora y dirige jurídicamente la defensa; el procurador representa a la parte en los supuestos previstos. La intervención exigible depende del procedimiento y de sus excepciones.",
      "Los graduados sociales intervienen en el ámbito social conforme a las competencias reconocidas. No debe trasladarse automáticamente una regla de un orden o procedimiento a todos los demás. Separa capacidad para ser parte, capacidad procesal y postulación al analizar quién puede actuar y cómo.",
    ],
    example:
      "Una persona puede ser titular de la pretensión y necesitar profesionales para actuar válidamente en un procedimiento concreto.",
    task: "Distingue titular de la pretensión, defensor técnico y representante procesal.",
    checks: [
      [
        "Defensa técnica y representación procesal…",
        "Son funciones distintas",
        "Son siempre idénticas",
        "No están reguladas",
        "Distinguirlas permite identificar la intervención profesional exigida.",
      ],
      [
        "La necesidad de profesionales se determina por…",
        "Las reglas del procedimiento y sus excepciones",
        "La preferencia del contrario",
        "Una exigencia idéntica en cualquier asunto",
        "La postulación depende de cada régimen procesal.",
      ],
      [
        "Los graduados sociales se estudian especialmente en el ámbito…",
        "Social",
        "De la sucesión al trono",
        "De la legislación municipal romana",
        "Su intervención profesional tiene competencias específicas en el orden social.",
      ],
    ],
  },
  {
    number: 14,
    title: "Ministerio Fiscal: misión y principios",
    concepts: ["Legalidad", "Imparcialidad", "Unidad y dependencia"],
    paragraphs: [
      "El Ministerio Fiscal promueve la acción de la justicia en defensa de la legalidad, los derechos y el interés público conforme a su función constitucional. No es el abogado personal de cualquier víctima ni un juez encargado de dictar sentencia.",
      "Su actuación se articula mediante unidad de actuación y dependencia jerárquica, con sujeción a legalidad e imparcialidad. No debe confundirse este régimen con la independencia orgánica de los jueces. Sus funciones concretas dependen del procedimiento y de la regulación aplicable.",
    ],
    example:
      "El fiscal puede intervenir para proteger intereses legalmente encomendados aunque no actúe como defensor particular de una persona.",
    task: "Explica misión y principios del fiscal y compáralos con la posición del juez.",
    checks: [
      [
        "El Ministerio Fiscal actúa en defensa de…",
        "Legalidad, derechos e interés público",
        "Solo intereses privados propios",
        "Cualquier resultado impuesto por una parte",
        "Su misión constitucional excede la defensa particular de un litigante.",
      ],
      [
        "Unidad y dependencia jerárquica son principios…",
        "De organización fiscal",
        "Que convierten al fiscal en juez",
        "Que eliminan la legalidad",
        "Se relacionan con una organización distinta de la judicial.",
      ],
      [
        "La imparcialidad fiscal implica…",
        "Actuar conforme a su función y a la legalidad",
        "Dictar cualquier sentencia",
        "Representar siempre a toda víctima",
        "La función fiscal no se identifica con la defensa privada ni con el fallo judicial.",
      ],
    ],
  },
  {
    number: 15,
    title: "Tribunal Constitucional y tutela constitucional",
    concepts: ["Constitucionalidad", "Amparo", "Jurisdicción ordinaria"],
    paragraphs: [
      "El Tribunal Constitucional es intérprete supremo de la Constitución en su ámbito. Sus competencias incluyen procesos de constitucionalidad y otros previstos por su regulación. No forma parte de la estructura de la jurisdicción ordinaria ni es una instancia universal de apelación.",
      "El amparo protege determinados derechos bajo requisitos de legitimación, agotamiento de vías y admisibilidad. No cualquier infracción legal permite acudir directamente al Tribunal. Debe identificarse el derecho y explicar la relevancia constitucional de la lesión alegada.",
    ],
    example:
      "Una discrepancia sobre valoración de una factura no se convierte, por sí sola, en un recurso de amparo admisible.",
    task: "Distingue recurso ordinario, control de constitucionalidad y protección por amparo.",
    checks: [
      [
        "El Tribunal Constitucional es…",
        "Órgano de jurisdicción constitucional con competencias propias",
        "Una apelación general de todo litigio",
        "Un servicio administrativo municipal",
        "Sus funciones constitucionales son específicas.",
      ],
      [
        "El amparo permite revisar cualquier desacuerdo legal directamente…",
        "No",
        "Sí, sin requisitos",
        "Solo si se pide por escrito",
        "La protección exige lesión de derechos amparables y requisitos de admisibilidad.",
      ],
      [
        "Para plantear tutela constitucional hay que…",
        "Identificar derecho, lesión y cauce aplicable",
        "Omitir las vías previas siempre",
        "Limitarse a expresar disgusto",
        "La relevancia constitucional debe argumentarse.",
      ],
    ],
  },
  {
    number: 16,
    title: "Tribunal del Jurado y participación ciudadana",
    concepts: ["Jurados", "Veredicto", "Magistrado-presidente"],
    paragraphs: [
      "El jurado permite participación ciudadana en la justicia para los delitos y supuestos legalmente atribuidos. No conoce de todos los procesos penales. Su composición y las condiciones de los participantes están reguladas.",
      "Los jurados emiten el veredicto conforme a las cuestiones sometidas; el magistrado-presidente desempeña funciones de dirección y dicta la sentencia en los términos legales. Veredicto y sentencia no son equivalentes. La motivación y las garantías procesales siguen siendo necesarias.",
    ],
    example:
      "Que un delito sea grave no permite concluir sin más que corresponda al jurado: debe comprobarse su competencia legal.",
    task: "Separa competencia, composición, veredicto y sentencia.",
    checks: [
      [
        "El jurado conoce de…",
        "Los delitos y supuestos atribuidos legalmente",
        "Todos los litigios sin excepción",
        "Cualquier contrato civil",
        "La competencia del jurado es legalmente delimitada.",
      ],
      [
        "Veredicto y sentencia…",
        "Son actos diferentes",
        "Son necesariamente el mismo documento",
        "No necesitan garantías",
        "El veredicto se relaciona con la decisión de los jurados; la sentencia tiene su cauce propio.",
      ],
      [
        "La participación ciudadana elimina la exigencia de motivación…",
        "No",
        "Sí",
        "Solo si hay unanimidad",
        "La justicia participativa debe respetar garantías y motivación.",
      ],
    ],
  },
  {
    number: 17,
    title: "Tutela judicial efectiva",
    concepts: ["Acceso", "Resolución motivada", "Ejecución"],
    paragraphs: [
      "La tutela judicial efectiva protege el acceso a la jurisdicción y la obtención de una respuesta fundada, junto con las demás dimensiones reconocidas. No garantiza que toda demanda prospere: una resolución desestimatoria puede respetar el derecho si responde conforme a las garantías.",
      "La inadmisión exige causa legal aplicada de modo compatible con el derecho de acceso. La motivación, la prohibición de indefensión y la ejecución de lo resuelto permiten comprender la tutela más allá de la apertura del proceso. Los recursos tienen la configuración legal correspondiente.",
    ],
    example:
      "Perder un pleito tras una resolución motivada no prueba por sí solo lesión de tutela judicial.",
    task: "Explica acceso, respuesta y ejecución y añade un ejemplo de cada dimensión.",
    checks: [
      [
        "La tutela judicial garantiza ganar cualquier demanda…",
        "No",
        "Sí",
        "Solo si hay abogado",
        "Acceso a justicia y éxito de la pretensión son cuestiones distintas.",
      ],
      [
        "La motivación permite…",
        "Comprender y controlar las razones de la resolución",
        "Sustituir toda prueba por una opinión",
        "Omitir la ley",
        "Una decisión fundada permite defensa y control jurídico.",
      ],
      [
        "La ejecución de lo resuelto…",
        "Forma parte de la efectividad de la tutela",
        "Es siempre ajena a la jurisdicción",
        "Depende solo de la voluntad del condenado",
        "La tutela no se agota necesariamente en declarar un derecho.",
      ],
    ],
  },
  {
    number: 18,
    title: "Asistencia jurídica gratuita",
    concepts: ["Acceso a justicia", "Requisitos", "Prestaciones"],
    paragraphs: [
      "La asistencia jurídica gratuita evita que la insuficiencia de medios impida el acceso a la justicia en los supuestos previstos. El reconocimiento exige examinar requisitos, beneficiarios y procedimiento, incluidas las situaciones que cuentan con un régimen específico.",
      "No significa que todo servicio jurídico sea gratuito para cualquier persona ni que se gane el litigio. Comprende prestaciones concretas definidas legalmente. La solicitud, el reconocimiento y los posibles efectos sobre actuaciones y profesionales deben estudiarse por separado.",
    ],
    example:
      "Una persona solicita el beneficio: aún hay que comprobar el régimen de reconocimiento y qué prestaciones cubre.",
    task: "Ordena solicitud, comprobación de requisitos, reconocimiento y contenido del derecho.",
    checks: [
      [
        "La finalidad de la asistencia gratuita es…",
        "Evitar barreras económicas al acceso en los supuestos legales",
        "Garantizar toda demanda favorable",
        "Eliminar todos los requisitos procesales",
        "La garantía económica facilita acceso, sin sustituir la decisión del litigio.",
      ],
      [
        "Su reconocimiento requiere…",
        "Aplicar los requisitos y el procedimiento",
        "Solo desearla",
        "La aprobación del adversario",
        "El beneficio tiene presupuestos legalmente definidos.",
      ],
      [
        "La gratuidad comprende…",
        "Prestaciones delimitadas por la ley",
        "Cualquier servicio sin límite",
        "Toda actuación privada del solicitante",
        "El contenido del beneficio debe concretarse.",
      ],
    ],
  },
  {
    number: 19,
    title: "Garantías del artículo 24.2",
    concepts: ["Defensa", "Prueba", "Presunción de inocencia"],
    paragraphs: [
      "Las garantías del artículo 24.2 incluyen defensa y asistencia letrada, información de la acusación, proceso con garantías y otros derechos según su ámbito. Su análisis exige concretar qué actuación impide ejercer una facultad de defensa.",
      "El derecho a la prueba no obliga a admitir cualquier medio: debe ser pertinente y cumplir las reglas. La presunción de inocencia exige prueba de cargo válida y suficiente para una condena penal. No puede sustituirse por sospechas ni por la exigencia de que el acusado pruebe su inocencia.",
    ],
    example:
      "Una condena fundada solo en sospechas exige examinar la presunción de inocencia y la validez de la prueba.",
    task: "Relaciona una actuación con defensa, prueba y presunción de inocencia, sin confundirlas.",
    checks: [
      [
        "La presunción de inocencia exige para condenar…",
        "Prueba de cargo válida y suficiente",
        "Solo sospechas",
        "Que el acusado pruebe siempre su inocencia",
        "La carga de acreditar la acusación no se invierte por mera sospecha.",
      ],
      [
        "El derecho a la prueba comprende cualquier medio sin límites…",
        "No",
        "Sí",
        "Solo cuando es costoso",
        "La pertinencia y las reglas de práctica delimitan el derecho.",
      ],
      [
        "La indefensión debe explicarse mediante…",
        "La privación relevante de una posibilidad de defensa",
        "Solo el desacuerdo con el fallo",
        "El tamaño del expediente",
        "Una lesión exige analizar su efecto real sobre la defensa.",
      ],
    ],
  },
  {
    number: 20,
    title: "Proceso, cargas y presupuestos",
    concepts: ["Pretensión", "Carga procesal", "Presupuestos"],
    paragraphs: [
      "El proceso es un instrumento de tutela en el que intervienen sujetos, pretensiones y actuaciones reguladas. Los presupuestos procesales condicionan la válida tramitación y decisión, mientras el fondo pregunta por la procedencia de lo solicitado.",
      "Una carga procesal es una conducta que la parte realiza para evitar una desventaja o alcanzar un efecto favorable; no se identifica sin más con una obligación frente a otra persona. Alegar, probar o impugnar puede tener consecuencias específicas si no se actúa en tiempo y forma.",
    ],
    example:
      "No proponer oportunamente una prueba puede perjudicar a quien soporta la carga, aunque no exista una deuda frente al juez por no hacerlo.",
    task: "Distingue presupuesto procesal, pretensión, obligación y carga con cuatro ejemplos.",
    checks: [
      [
        "La carga procesal se relaciona con…",
        "Una conducta para evitar una desventaja procesal",
        "Una deuda tributaria siempre",
        "Una pena automática",
        "La carga vincula actuación y consecuencias para el interés de la propia parte.",
      ],
      [
        "Los presupuestos procesales y el fondo…",
        "Son planos diferentes",
        "Son siempre la misma cuestión",
        "No tienen relevancia",
        "Tramitación válida y estimación de la pretensión deben distinguirse.",
      ],
      [
        "Omitir una actuación en plazo puede…",
        "Producir una consecuencia desfavorable prevista",
        "No tener nunca efectos",
        "Crear siempre un delito",
        "Las reglas procesales conectan la omisión con efectos específicos.",
      ],
    ],
  },
  {
    number: 21,
    title: "Contradicción, igualdad y principios del proceso",
    concepts: ["Audiencia", "Igualdad de armas", "Principio dispositivo"],
    paragraphs: [
      "La contradicción exige oportunidad de conocer y discutir lo alegado o aportado por la otra parte. La igualdad de armas reclama equilibrio de posibilidades de defensa; no significa que las posiciones o cargas sean idénticas en todos los procesos.",
      "Los principios dispositivo y de aportación de parte se refieren al papel de los litigantes en el objeto y los materiales del proceso. Oralidad, inmediación y publicidad describen otras dimensiones del procedimiento. No deben usarse como sinónimos ni atribuir idéntica intensidad a cualquier proceso.",
    ],
    example:
      "Una prueba utilizada sin dar ocasión de contradicción puede afectar a la defensa, aunque la audiencia haya sido pública.",
    task: "Clasifica contradicción, dispositivo, oralidad e inmediación según la cuestión que regulan.",
    checks: [
      [
        "La contradicción permite…",
        "Conocer y discutir las alegaciones y pruebas relevantes",
        "Excluir siempre al contrario",
        "Obtener necesariamente razón",
        "La audiencia de la otra parte protege la defensa.",
      ],
      [
        "Igualdad de armas exige…",
        "Equilibrio de oportunidades de actuación",
        "Igual resultado para las partes",
        "Eliminar toda carga",
        "El equilibrio procesal no garantiza idénticas pretensiones ni resultados.",
      ],
      [
        "Oralidad e inmediación…",
        "Son principios distintos",
        "Son siempre el mismo concepto",
        "Se refieren a la soberanía nacional",
        "Forma de las actuaciones y contacto del juzgador con ellas son cuestiones diferenciadas.",
      ],
    ],
  },
  {
    number: 22,
    title: "Estructura del proceso y fases",
    concepts: ["Alegaciones", "Prueba", "Decisión"],
    paragraphs: [
      "La estructura procesal ordena actividades para identificar el objeto, permitir defensa, fijar hechos y decidir. Alegaciones, prueba y resolución cumplen funciones diferentes, aunque su secuencia y concentración varíen según el procedimiento.",
      "La impugnación permite revisión en los términos legales; la ejecución busca hacer efectivo el título correspondiente. No todo proceso incluye todas las fases de la misma forma. Para analizar un caso identifica en qué momento se encuentra y qué actuación es admisible en ese momento.",
    ],
    example:
      "Una alegación tardía exige estudiar la fase procesal y la regla de preclusión, no solo la relevancia material del dato.",
    task: "Dibuja un proceso declarativo y añade posibles recursos y ejecución sin tratarlos como pasos siempre obligatorios.",
    checks: [
      [
        "La fase de alegaciones sirve principalmente para…",
        "Delimitar posiciones y objeto del debate",
        "Ejecutar siempre bienes",
        "Dictar automáticamente sentencia",
        "Las alegaciones presentan los fundamentos de la pretensión y de la defensa.",
      ],
      [
        "Todos los procesos tienen idénticas fases…",
        "No",
        "Sí, sin excepción",
        "Solo si hay dos partes",
        "La estructura depende del procedimiento y de sus finalidades.",
      ],
      [
        "Identificar el momento procesal permite…",
        "Determinar actuaciones y límites temporales",
        "Omitir toda regla",
        "Escoger libremente cualquier recurso",
        "La fase condiciona la admisibilidad de las actuaciones.",
      ],
    ],
  },
  {
    number: 23,
    title: "Clases de procesos y tutela",
    concepts: ["Declaración", "Ejecución", "Cautela"],
    paragraphs: [
      "La tutela declarativa resuelve sobre una pretensión; la ejecutiva realiza lo que establece un título; la cautelar protege la eficacia de una eventual resolución. La clasificación por finalidad es distinta de la clasificación por orden jurisdiccional.",
      "Procesos ordinarios y especiales responden a criterios de ámbito y regulación. Un proceso especial no carece por ello de garantías. Las medidas cautelares tienen presupuestos y límites: no deben utilizarse como una condena anticipada sin justificación.",
    ],
    example:
      "Asegurar provisionalmente un bien para evitar que una futura sentencia sea inútil plantea tutela cautelar.",
    task: "Clasifica tres peticiones según busquen declaración, ejecución o aseguramiento provisional.",
    checks: [
      [
        "La tutela cautelar busca…",
        "Proteger la eficacia de una futura resolución",
        "Resolver siempre definitivamente el fondo",
        "Eliminar la defensa",
        "La cautela evita riesgos para la efectividad del proceso.",
      ],
      [
        "Civil y declarativo…",
        "Responden a criterios de clasificación distintos",
        "Son siempre sinónimos",
        "Se excluyen necesariamente",
        "Orden jurisdiccional y finalidad procesal no son la misma clasificación.",
      ],
      [
        "Un proceso especial…",
        "Debe respetar las garantías aplicables",
        "Carece siempre de contradicción",
        "No necesita regulación",
        "La especialidad no suprime las garantías procesales.",
      ],
    ],
  },
  {
    number: 24,
    title: "Actos procesales y plazos",
    concepts: ["Forma", "Tiempo", "Preclusión"],
    paragraphs: [
      "Los actos procesales producen efectos dentro del proceso y están sujetos a requisitos de sujeto, forma, lugar y tiempo. No basta con querer presentar un escrito: hay que atender al canal y a los requisitos aplicables.",
      "Los plazos y términos ordenan oportunidades de actuación. La preclusión puede cerrar una posibilidad procesal al transcurrir su momento. El cómputo requiere identificar inicio, días hábiles o inhábiles y regla específica; no debe resolverse mediante una suma intuitiva de fechas.",
    ],
    example:
      "Recibir una comunicación en una fecha no permite calcular sin más el vencimiento: debe examinarse el régimen de notificación y cómputo.",
    task: "Enumera los datos necesarios antes de calcular un plazo y distingue plazo de término.",
    checks: [
      [
        "La preclusión puede significar…",
        "Pérdida de una oportunidad procesal por cierre de su momento",
        "Modificación del fondo de toda ley",
        "La desaparición de todos los derechos",
        "El proceso ordena oportunidades sujetas a tiempo y secuencia.",
      ],
      [
        "Para contar un plazo es necesario…",
        "Conocer la regla de inicio y el calendario aplicable",
        "Sumar siempre días naturales",
        "Elegir la fecha más cómoda",
        "El cómputo depende del régimen procesal y de los días computables.",
      ],
      [
        "La validez de un acto puede depender de…",
        "Sujeto, forma, lugar y tiempo",
        "Solo su extensión",
        "La simpatía del receptor",
        "Los requisitos procesales inciden en sus efectos.",
      ],
    ],
  },
  {
    number: 25,
    title: "Clases de actuaciones y resoluciones",
    concepts: [
      "Actos de parte",
      "Resoluciones judiciales",
      "Resoluciones del LAJ",
    ],
    paragraphs: [
      "Los actos pueden clasificarse por sujeto y función: alegaciones de parte, actividad probatoria, comunicaciones y resoluciones no cumplen el mismo papel. La autoría y la competencia ayudan a determinar forma, efectos y posibles impugnaciones.",
      "Providencias, autos y sentencias responden a finalidades y requisitos diferentes. Las diligencias y los decretos del LAJ tienen su régimen propio. La denominación de una resolución importa, pero debe contrastarse con la actuación realmente realizada y con la regla que determina su forma.",
    ],
    example:
      "Una decisión procesal no se clasifica como sentencia solo porque sea importante: hay que atender a su objeto y régimen.",
    task: "Distingue actos de parte, resoluciones del juez y resoluciones del LAJ y añade un ejemplo de cada grupo.",
    checks: [
      [
        "Providencia, auto y sentencia son…",
        "Clases de resoluciones judiciales",
        "Siempre actos privados de parte",
        "Formas de organización territorial",
        "La función y el objeto determinan la forma de resolución.",
      ],
      [
        "Las resoluciones del LAJ…",
        "Tienen formas y régimen propios",
        "Son siempre sentencias",
        "Carecen de efecto procesal",
        "Su identificación exige atender a la competencia y a la regulación.",
      ],
      [
        "Para identificar una resolución debe examinarse…",
        "Autor, objeto y regla aplicable",
        "Solo la longitud",
        "La opinión de un testigo",
        "La clasificación condiciona requisitos y posibles impugnaciones.",
      ],
    ],
  },
  {
    number: 26,
    title: "Comunicaciones procesales y defensa",
    concepts: ["Notificación", "Citación", "Emplazamiento"],
    paragraphs: [
      "Las comunicaciones permiten conocer actuaciones y ejercer facultades de defensa. Notificar transmite una resolución o actuación; citar llama para una comparecencia determinada; emplazar concede una oportunidad de actuación dentro de un plazo.",
      "La forma y constancia de la comunicación son relevantes para sus efectos. Los medios electrónicos tienen requisitos de destinatario, acceso y cómputo que deben verificarse. Una comunicación defectuosa exige estudiar su incidencia en la defensa y el remedio previsto, sin declarar automáticamente nulo todo el proceso.",
    ],
    example:
      "Un llamamiento para comparecer un día y hora concretos debe distinguirse de un plazo para contestar una demanda.",
    task: "Compara notificación, citación y emplazamiento por finalidad y referencia temporal.",
    checks: [
      [
        "El llamamiento a comparecer un día y hora concretos es típicamente…",
        "Una citación",
        "Una sentencia",
        "Una ley",
        "La citación señala una comparecencia determinada.",
      ],
      [
        "El emplazamiento suele conceder…",
        "Un plazo para realizar una actuación",
        "Una condena definitiva",
        "Un derecho a ganar el pleito",
        "La oportunidad de actuación dentro de plazo caracteriza el emplazamiento.",
      ],
      [
        "Ante un defecto de comunicación conviene analizar…",
        "Su relevancia para la defensa y el remedio aplicable",
        "La nulidad automática de cualquier proceso",
        "Solo el tamaño del documento",
        "El defecto requiere examinar efectos e incidencia, no presumir un resultado universal.",
      ],
    ],
  },
  {
    number: 27,
    title: "Sentencia, motivación y congruencia",
    concepts: ["Motivación", "Congruencia", "Cosa juzgada"],
    paragraphs: [
      "La sentencia resuelve el objeto sometido al tribunal con los requisitos de forma y contenido previstos. La motivación explica las razones; la congruencia conecta lo decidido con las pretensiones y el debate procesal. Son exigencias relacionadas, pero distintas.",
      "La firmeza y la cosa juzgada se refieren a efectos de la resolución bajo sus presupuestos. No toda decisión tiene iguales efectos ni toda discrepancia abre un recurso ilimitado. Deben distinguirse terminación del proceso, revisión y vinculación de decisiones posteriores.",
    ],
    example:
      "Una resolución puede explicar extensamente sus razones y, aun así, omitir una pretensión relevante: motivación y congruencia no son idénticas.",
    task: "Analiza una sentencia mediante objeto, razones, correspondencia con lo pedido y efectos.",
    checks: [
      [
        "La congruencia relaciona…",
        "Lo decidido y las pretensiones debatidas",
        "Solo el estilo literario",
        "El órgano y su presupuesto anual",
        "La decisión debe responder al objeto procesal en los términos exigidos.",
      ],
      [
        "La motivación explica…",
        "Las razones de la resolución",
        "Solo quién gana",
        "La preferencia privada del juez",
        "La fundamentación permite comprender y controlar la decisión.",
      ],
      [
        "Firmeza y cosa juzgada…",
        "Exigen distinguir presupuestos y efectos",
        "Son palabras sin consecuencias",
        "Abren siempre recursos ilimitados",
        "Los efectos de la resolución deben analizarse según su régimen.",
      ],
    ],
  },
  {
    number: 28,
    title: "Mediación y arbitraje",
    concepts: ["Acuerdo", "Laudo", "Disponibilidad"],
    paragraphs: [
      "La mediación facilita que las partes construyan una solución; el mediador no impone el acuerdo. El arbitraje encomienda a un tercero la decisión mediante un laudo sobre materias y bajo condiciones legalmente admisibles.",
      "La presencia de un tercero no basta para distinguir autocomposición y heterocomposición. Hay que identificar quién decide, sobre qué objeto y con qué efectos. Un acuerdo o laudo puede tener vías específicas de eficacia y control, que no equivalen a repetir libremente todo el litigio ante cualquier órgano.",
    ],
    example:
      "Si las partes aceptan una propuesta negociada deciden ellas; si un árbitro resuelve conforme al convenio, decide el tercero.",
    task: "Compara mediación y arbitraje mediante decisión, objeto, resultado y control.",
    checks: [
      [
        "En mediación, la solución la adoptan…",
        "Las partes mediante acuerdo",
        "Siempre el mediador por imposición",
        "Los testigos por mayoría",
        "La decisión de las partes caracteriza la autocomposición.",
      ],
      [
        "El resultado decisorio del arbitraje se denomina…",
        "Laudo",
        "Proyecto de ley",
        "Dictamen parlamentario",
        "El árbitro decide mediante laudo conforme al régimen arbitral.",
      ],
      [
        "Todo conflicto puede someterse a cualquier mecanismo…",
        "No: existen presupuestos y límites",
        "Sí, sin condiciones",
        "Solo por pagar una tasa",
        "La disponibilidad del objeto y las reglas del mecanismo condicionan su uso.",
      ],
    ],
  },
];

export const proceduralLessons = prepareBlocks(
  "021044",
  "procesal-leccion",
  blocks,
  (n) => [
    `Introducción al Derecho Procesal · 3.ª edición, 2025 · lección ${n} (manual recibido en nueve partes)`,
    "66021044_2027.pdf · contenidos; evaluación en página PDF 18",
  ],
);
