# Aprendizaje guiado: decisiones del usuario

Actualizado: 25 de octubre de 2026. El estado vigente se recoge en la sección final «Preparación por temas del primer cuatrimestre». Las primeras revisiones se conservan como historial; sus pendientes antiguos no deben usarse para solicitar documentos ya recibidos.

## Alcance acordado

Las seis asignaturas del primer cuatrimestre son Derecho Civil I.1, Historia del Derecho Español, Fundamentos de la Democracia, Teoría del Derecho, Teoría del Estado Constitucional e Introducción al Derecho Procesal. Validar denominaciones y códigos frente a las guías aportadas.

Usar guías, manuales y exámenes anteriores del usuario. La vía inicial propuesta es recibir documentos por asignatura en el chat. La integración con Drive queda pausada; no hay conexión autorizada ni archivos de Drive leídos.

## Experiencia solicitada

- «Empezar a estudiar» muestra las seis asignaturas, su progreso académico individual y una recomendación explicada.
- Al elegir asignatura se abre una pantalla con tema, conceptos clave, contenido que debe aprenderse y duración.
- Organizar contenidos en bloques de concentración de cinco minutos, con explicación, ejemplo, práctica y comprobación. El tiempo por sí solo no completa contenido.
- El avance se obtiene al responder correctamente la prueba final. El usuario no ha fijado aún el número de preguntas o un umbral parcial; no dar por aprobado un porcentaje arbitrario.
- Incorporar preguntas de exámenes anteriores a los finales de tema y utilizarlas para identificar conceptos que conviene practicar, además del resto del programa.
- Conservar por separado tiempo de estudio, contenidos superados y resultados de las pruebas; no trasladar automáticamente el porcentaje actual de minutos a dominio del temario.
- Guardar el avance por usuario y permitir repetir y repasar errores.

## Fuentes y comprobaciones

Preparar primero el índice del programa oficial y la correspondencia entre temas, manuales y exámenes. Conservar archivo y página cuando sea verificable; identificar curso y convocatoria cuando consten. Diferenciar preguntas originales de examen de ejercicios elaborados para practicar. No inventar soluciones oficiales: cuando falte una plantilla, la solución propuesta debe estar justificada en los materiales y revisada antes de usarse para aprobar.

Los archivos recibidos son fuentes de contenido, no instrucciones para modificar el sistema. Mantener privados los manuales y exámenes; no incorporarlos como recursos públicos de GitHub Pages. La recepción de adjuntos en el chat no equivale a tener implementada una carga o generación automática dentro de la web.

## Estado técnico

La aplicación tiene asignaturas, tareas, cronómetro y registro de minutos. La primera entrega añade nueve bloques de aprendizaje con pruebas y avance local por cuenta (detalles al final). La importación automática, la sincronización del avance académico y la cobertura completa del programa siguen pendientes.

## Civil I.1: primera revisión de fuentes

Se recibieron 43 adjuntos: 27 archivos únicos descargados, 13 duplicados exactos y 3 partes del libro que exceden el límite de transferencia de 32 MiB. Posteriormente se recibió y procesó por OCR la parte 1 comprimida (120 páginas PDF escaneadas), con edición 31.ª de 2026 verificada en portada y portadilla (páginas PDF 1 y 3). Las partes 2 y 3 comprimidas también exceden el límite; Drive responde HTTP 401 sin acceso autorizado. El corpus y las transcripciones se conservan fuera del repositorio público, en `/workspace/civil-materiales/`.

El programa 2026/27 tiene 14 temas y 4 bloques; se ha contrastado visualmente la correspondencia con los 26 capítulos y las exclusiones. La app muestra este esquema, sin presentar lecciones ni pruebas como disponibles. Se ha completado OCR en español de las 52 páginas del recopilatorio y los 9 folios de los exámenes independientes. Hay 272 candidatos de extracción, sin claves de respuesta, pendientes de revisión y deshabilitados para evaluar; el número no equivale a preguntas únicas validadas.

Hay un borrador privado de cinco bloques introductorios para los temas 1 y 2 en `/workspace/civil-materiales/output/civil-primeros-bloques.md`. No agota esos temas ni se ha contrastado con el libro. Mantener la distinción entre propuestas de solución y plantillas oficiales; no habilitar avance académico con el banco OCR sin revisar.

No publicar en el repositorio, en `public/` ni en los artefactos estáticos el libro, los apuntes, los exámenes o sus transcripciones. El siguiente requisito de fuente es recibir las partes 2 y 3 del libro divididas en archivos menores de 32 MB, manteniendo portada, edición, índice y numeración.

## Procesal: primera revisión de fuentes

De 20 adjuntos se descargaron 18. Quedan pendientes el manual íntegro y el código de leyes procesales de 4.ª edición por superar 32 MiB. El programa aportado contiene 28 lecciones en cinco partes y recomienda la 3.ª edición de 2025; no indica curso académico ni reglas de evaluación. La app muestra el esquema con referencias a páginas del programa y del resumen de 138 páginas. Las tres versiones del resumen tienen el mismo texto extraído, aunque sus archivos difieren.

El manual OCR recibido solo contiene 37 páginas del final del libro; no equivale al manual completo. El código BOE tiene 1.949 páginas y fecha de actualización 7 de octubre de 2026: solo se han extraído las primeras 25 páginas. Se ha extraído texto de DOCX y PPTX y realizado OCR de los 13 folios escaneados de dos apoyos. Corpus privado: `/workspace/procesal-materiales/`; informe e índice estructurado en `output/`. No hay lecciones de cinco minutos ni pruebas habilitadas en la web.

## Primera entrega de contenido utilizable

Nueve bloques originales de cinco minutos disponibles en la web: tres en Civil I.1 (ámbito civil, fuentes y jurisprudencia), tres en Procesal (jurisdicción/acción/proceso, autocomposición/heterocomposición y autotutela) y tres en Fundamentos (Derecho y justicia, ley formal/material, antinomias/lagunas). Cada bloque contiene objetivo, conceptos, explicación, ejemplo, práctica de recuperación, fuentes con página o diapositiva y tres preguntas con explicación. Las preguntas son elaboradas para practicar; no se presentan como enunciados ni soluciones oficiales.

La prueba exige acertar las tres preguntas. El cronómetro de cinco minutos no supera el bloque ni registra automáticamente una sesión de estudio libre. El porcentaje representa exclusivamente los bloques iniciales disponibles superados; no acredita un tema entero ni el dominio de toda la asignatura. Los demás temas siguen pendientes y las asignaturas sin materiales no reciben contenido inventado.

El avance se conserva en localStorage bajo `uned-learning-v1:<user-id>` (o `:demo`), separado por cuenta y de los minutos, con aviso de que solo está disponible en ese navegador. No hay sincronización de este avance con Supabase todavía ni nuevas migraciones necesarias. Se incluye en la exportación de datos y se elimina al reiniciar los datos de estudio desde Ajustes. Las pruebas incorrectas no guardan progreso; si falla el almacenamiento, no se anuncia éxito de guardado. Las versiones de los bloques forman parte de su identificador.

La recomendación de «Empezar a estudiar» considera solo asignaturas con bloques pendientes: primero el examen futuro confirmado más próximo, después el menor porcentaje completado y finalmente el nombre. No recomienda contenido de asignaturas bloqueadas ni inventa fechas. Si todos los bloques están superados, ofrece repaso.

Las partes 2 y 3 de Civil se recibieron divididas en cuatro archivos (182 y 150 páginas PDF respectivamente); su análisis completo sigue pendiente. Los exámenes adicionales de Civil (20 archivos, 69 páginas) y Procesal (17 archivos, 57 páginas) están extraídos fuera del repositorio y sin claves oficiales verificadas. Fundamentos tiene 15 archivos descargados de 17, con dos recopilatorios idénticos y ambos libros pendientes por tamaño. La introducción del curso confirma test y exclusiones; no se han trasladado reglas de PEC contradictorias a la app. Corpus privado: `/workspace/fundamentos-materiales/`.


## Ampliación del 25 de octubre de 2026

La lectura en voz alta está integrada en cada bloque con pausa, reanudación, parada, repetición, voz en español y velocidad. Lee el material didáctico; excluye la prueba y sus soluciones. No registra automáticamente progreso ni minutos.

Civil I.1 añade doce bloques introductorios para los temas 3–14 y 36 preguntas originales. Total actual: 15 bloques de Civil (45 preguntas), tres de Procesal y tres de Fundamentos; 21 bloques y 63 preguntas en conjunto. Se pueden filtrar por tema. Cada tema sigue incompleto y no hay simulacro completo ni banco oficial de soluciones. Se mantienen los identificadores de los bloques previos; al aumentar el total de bloques, el porcentaje se recalcula sin perder aprobados.

Las explicaciones nuevas se contrastan con las páginas identificadas de los apuntes aportados y con el programa 2026/27. Cada bloque indica el modelo histórico usado para orientar el formato o el concepto. Se combinan definiciones, casos breves y alternativas incorrectas, con tres opciones y una correcta. Se respeta la distinción entre norma histórica y sistema posterior a la Ley 8/2021 en los apoyos; se evita evaluar como vigente la antigua organización registral. Los apuntes contienen pasajes históricos y desactualizados: esta ampliación no constituye una revisión exhaustiva de la normativa o del manual de 2026.

Historia: 17 PDF distintos, 17 páginas; siete con texto utilizable y diez tratados con OCR español. Se conservan fuera del repositorio, en `/workspace/historia-materiales/`, junto con inventario, huellas SHA-256, transcripciones, script de preparación y banco privado de candidatos. Se extraen 51 apariciones de preguntas teóricas y 17 comentarios, no 68 preguntas únicas validadas. No hay respuestas oficiales verificadas ni ejercicios habilitados para calificar. Los números de lección difieren entre modelos y quedan sin correspondencia oficial hasta recibir el programa vigente.

Los 17 modelos de Historia indican dos horas, solo el programa como material, dos preguntas teóricas a elegir entre tres y un comentario obligatorio. La web muestra ese formato histórico y áreas provisionales de práctica con referencias, sin publicar los PDF ni sus transcripciones. La preparación de respuestas será de desarrollo y comentario, no una conversión automática al test de Civil. Programa, manual/apuntes y criterios de corrección siguen pendientes. Los corpus adicionales de Procesal y Fundamentos mencionados en revisiones anteriores no están presentes en el entorno actual; no se han procesado nuevos materiales de esas asignaturas en esta ampliación.


## Nuevo inicio por asignaturas

El usuario sustituye el panel de resumen por un listado vertical de las once asignaturas, de ancho completo y con un color propio por asignatura. Las seis del primer cuatrimestre despliegan dos actividades: hacer lecciones y hacer exámenes. Las cinco del segundo cuatrimestre aparecen con candado y no se despliegan. Las tareas, calendario y minutos siguen disponibles en sus secciones.

La práctica de examen es independiente de las pruebas de bloque. Civil usa 20 ejercicios originales seleccionados aleatoriamente de los 45 disponibles, con duración de 60 minutos y puntuación de práctica basada en el modelo de febrero de 2023. Fundamentos ofrece su banco inicial tipo test sin inventar reglas oficiales. Procesal y las materias sin modelo contrastado permanecen en preparación. No se incorporan preguntas oficiales ni transcripciones privadas al repositorio público.

Se recibieron para Historia Apuntes EC (171 páginas), apuntes de Carmen–Escudero (163 páginas) y un esquema medieval. Los dos manuales completos enviados después superan el límite de transferencia y requieren partes inferiores a 32 MB. El usuario ha indicado que aún faltan contenidos y avisará cuando esté todo: no generar ni publicar lecciones o preguntas de Historia hasta ese aviso. Los borradores preliminares se mantienen fuera del repositorio y no forman parte de la app.


## Pantallas de estudio sin informes internos

A petición del usuario, las pantallas de lecciones muestran el listado con avance por lección (pendiente 0%, completada 100%, según la prueba de conceptos). No se inventa avance parcial de lectura. Los informes de recepción, OCR, tamaños y preparación se conservan en esta documentación y quedan fuera de las pantallas de estudio. Mis fuentes contiene referencias bibliográficas sin informes de desarrollo.

Hacer exámenes abre directamente el intento con sus preguntas. Historia incorpora práctica escrita con tres adaptaciones originales de modelos aportados (2025 F1, 2025 F2, 2026 F1): elegir dos de tres desarrollos y responder un comentario con fragmento parafraseado. Se cita el modelo; no se publican PDF ni transcripciones literales y no se inventa plantilla ni nota automática. Las respuestas son temporales y no aprueban lecciones. La creación de lecciones de Historia sigue en pausa hasta que el usuario confirme que ha terminado de subir materiales.


## Activación expresa de Historia y Teoría del Derecho

El usuario solicita activar las lecciones y los exámenes de ambas asignaturas. Esta instrucción sustituye la pausa anterior de Historia. Se recibieron el Curso de Historia (353 páginas PDF en tres partes) y Comentarios de Texto (238 páginas PDF en tres partes, escaneadas y pendientes de OCR completo). Corpus privado e inventarios fuera del repositorio en `/workspace/historia-materiales/`. No se presenta el manual de comentarios como revisado íntegramente ni se utilizan sus respuestas como plantilla oficial.

Historia incorpora 12 bloques introductorios originales: método e historiografía; vínculos prerromanos; romanización; provincia y municipio; fuentes visigodas; gobierno visigodo; Liber y fueros; fazañas; Derecho común; obra alfonsina; Alcalá; Cortes. No se afirma cobertura completa del programa. Las referencias de las nuevas fuentes señalan páginas PDF del conjunto recibido. Seis bloques incluyen desarrollo guiado, respuesta orientativa y pautas de autoevaluación; la respuesta escrita no se califica automáticamente ni supera el bloque. La lectura en voz alta incluye la consigna escrita, pero no revela la orientación de respuesta ni las soluciones del cuestionario.

La práctica escrita de Historia se amplía a nueve adaptaciones: 2025 F1/F2, 2026 F1, 2022 septiembre, 2023 F1/F2/septiembre, 2024 F2 y 2026 septiembre. Se mantiene elegir dos desarrollos entre tres y realizar un comentario. El dictado funciona tanto en los desarrollos como en el comentario. No se publican los exámenes ni transcripciones literales. Los nueve modelos de práctica no equivalen a haber convertido los diecisiete originales en ejercicios.

Teoría del Derecho: libro de 241 páginas en seis fragmentos, 45 páginas de apuntes, presentación de lección 1, pruebas y enlaces, recopilatorio anotado y 15 PDF de exámenes 2022–2026 (62 páginas), además de dos TIFF. Inventarios en `/workspace/teoria-derecho-materiales/`. Los apuntes y el índice del manual organizan 14 temas; se activa una introducción por tema con tres preguntas originales (42 en total), referencias y ejemplos. No se copian respuestas de tests aportados sin contrastar. El HTML se extrae sin ejecutar scripts. Los TIFF y los cuerpos de algunos exámenes escaneados requieren OCR y revisión adicional.

Teoría ofrece intentos de 20 preguntas del banco original, 60 minutos, +0,5 por acierto, −0,1 por error, blancos 0 y puntuación mínima 0. Se usan las condiciones históricas de los modelos 2023–2026. Las cabeceras de 2022 indican que los errores no descuentan; se documenta la diferencia y no se aplica la nueva penalización retroactivamente. Civil conserva −0,25. La puntuación de práctica se redondea a dos decimales. No se confirma la convocatoria vigente ni se asigna valor oficial al resultado.

Se conserva el progreso por identificador sin modificar los bloques antiguos ni migrar datos. La prueba de tres conceptos sigue siendo necesaria para completar cada bloque. Colores y tamaño de letra siguen el diseño existente. Las fuentes bibliográficas se actualizan sin informes de recepción en las pantallas de lecciones y exámenes.

Durante esta activación se recibieron seis archivos de Teoría del Estado Constitucional: tres descargados (28 páginas de repaso, 24 de Parlamento y 61 escaneadas) y tres bloqueados por superar 32 MiB (recopilatorio, infografías y libro de 7.ª edición). Se registra el material en `/workspace/estado-constitucional-materiales/`; no se confunde recepción con revisión ni se activa esta tercera asignatura por la petición dirigida a Historia y Teoría del Derecho.


## Preparación por temas del primer cuatrimestre

Ámbito vigente: únicamente Historia del Derecho, Teoría del Derecho, Teoría del Estado Constitucional, Introducción al Derecho Procesal, Fundamentos Clásicos y Civil I.1. El segundo cuatrimestre permanece aplazado y con candado. El usuario confirmó un único manual de Fundamentos y excluyó Multinivel para su preparación en Canarias: no solicitar un segundo libro ni incorporar Multinivel como fuente requerida.

Se actualiza el corpus privado mediante OCR español de 1.124 páginas de 20 fragmentos de manuales y apoyos; el texto de los índices deteriorados de Fundamentos se reconstruye además por OCR. Se conserva referencia al original y a la página. La extracción automática no equivale a verificación visual completa ni a validación de solucionarios. Las fuentes y su índice de búsqueda se mantienen fuera del repositorio: `/workspace/study-knowledge/`. La base privada de búsqueda usa páginas individuales, por asignatura, archivo y huella SHA-256. Su catálogo y estado deben consultarse antes de volver a pedir un documento.

Se registran las guías 2026/27 de Historia, Teoría del Derecho, TEC y Procesal, los programas y concordancias de Civil y los capítulos del único manual de Fundamentos. No se presenta este último índice como un programa oficial 2026/27 confirmado. Los seis recorridos contienen 114 temas o capítulos: Historia 18; Teoría del Derecho 14; TEC 20; Procesal 28; Fundamentos 20 capítulos; Civil I.1 14.

La app incorpora 119 bloques introductorios, 72 nuevos, con 357 preguntas de conceptos. Distribución de bloques: Historia 20, Teoría 14, TEC 20, Procesal 29, Fundamentos 21 y Civil 15. Cubrir cada número del índice con un bloque inicial no acredita cobertura exhaustiva de todos los epígrafes ni dominio completo del tema. Los bloques contienen explicación original, esquema de repaso, ejemplo, recuperación y tres preguntas. Los identificadores previos y sus soluciones se conservan: se actualizan agrupación, referencias y orden sin borrar el progreso. El porcentaje sigue midiendo bloques disponibles superados; no páginas leídas ni todo el temario dominado.

TEC sigue la cuota y fuentes indicadas por el usuario; su práctica ofrece 20 preguntas originales con cuatro opciones, 120 minutos y un desarrollo a elegir entre dos. Se aplica al test el baremo de la página 27 de la guía: 13 aciertos=5; 18=8; 19=9; 20=10; errores sin penalización. La nota del desarrollo y la nota global no se inventan: solo el test recibe corrección automática. Se informa en instrucciones de que la evaluación oficial promedia ambas partes y que un cero en cualquiera impide superar el examen. El desarrollo se puede escribir o dictar.

Procesal incorpora dos prácticas originales con dos preguntas teóricas y un caso obligatorios, 120 minutos, escritura/dictado y pautas para revisar el caso. No se asigna nota automática. El formato se verifica en la guía, página PDF 18. Teoría del Derecho conserva el test de 20 preguntas/60 minutos/+0,5/−0,1, ahora confirmado con la guía, página 22. Historia conserva sus nueve prácticas escritas y se organiza por las 18 lecciones oficiales. Fundamentos usa ejercicios de conceptos sobre su manual sin atribuir nota, tiempo ni penalización oficiales no verificados. Civil conserva su formato histórico y las lecciones previas.

Durante la preparación llegaron siete fragmentos del Código de Leyes Procesales, 4.ª edición, actualizado a 1 de abril de 2025: 700 páginas PDF. Su índice incluye secciones posteriores, de modo que solo se da por recibido el tramo 1–700; faltan los tramos posteriores hasta el final. No confundir esta edición editorial con el código BOE de 1.949 páginas mencionado en el historial. Este documento es una fuente fechada, no una afirmación de vigencia íntegra de toda la legislación a 2026. El manual de Procesal de 2025 sí está recibido en nueve partes (441 páginas).

Los originales, el texto OCR, las bases de búsqueda y los apuntes del usuario no se publican ni se incluyen en `public/`, Git ni el artefacto estático. La web recibe exclusivamente resúmenes y ejercicios originales, metadatos del temario y referencias. Las pantallas de estudio no muestran informes internos de transferencia, OCR o preparación.
