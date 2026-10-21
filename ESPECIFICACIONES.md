# UNED Study AI — Especificación funcional v1.0
Fecha: 2026-10-21. Estado: aprobado para iniciar desarrollo, no desplegado.

## Decisiones aprobadas
- Acceso: Google OAuth y email/contraseña; cuenta privada inicial, arquitectura multiusuario.
- Fuentes: carpeta Google Drive `11 UNED` y subcarpetas (ID `1E3qTbw3gC9DcAmWzI8rzyylnB6CF6TKF`), sincronización diaria. Los nuevos documentos requieren aprobación antes de usarse. El usuario podrá marcar manualmente manuales y guías como fuentes prioritarias.
- Tutor: explicar primero en lenguaje sencillo y luego en lenguaje jurídico, con ejemplos. Resúmenes breves y completos por tema y epígrafe; preguntas, respuestas modelo (estudio/examen), tarjetas de memoria.
- Exámenes: proponer formato basándose en guías y exámenes históricos; exigir confirmación del usuario. Evaluación estricta según rúbrica disponible; sin rúbrica, calificación estimada y etiquetada como tal.
- Errores: mostrar por qué es incorrecto, cuál es la respuesta correcta, cita verificable (archivo y página cuando exista). Reintento inmediato y repetición espaciada.
- Oral: grabación/transcripción y evaluación, y conversación con repreguntas; permisos explícitos de micrófono.
- Referencias: siempre documento, tema y página cuando conste; nunca inventar citas. Si la evidencia es insuficiente, decirlo.
- Progreso: automático; estudio libre y planificación guiada.
- Calendario: extraer propuestas de fechas del calendario en Drive y pedir confirmación; nunca asumir convocatoria concreta.
- Notificaciones: diariamente a las 09:00 zona `Atlantic/Canary`, todos los días. Preferencia por web push + email. Permisos, suscripción push y correo transaccional necesarios antes de habilitar envío real.
- Web: responsive escritorio/móvil; web privada; minimizar coste inicial.

## Asignaturas detectadas (pendientes de validación académica)
Derecho Procesal, Teoría del Derecho, Teoría del Estado Constitucional, Fundamentos de la Democracia, Derecho Constitucional, Derecho Civil I.1, Derecho Civil I.2 Familia, Historia del Derecho Español, Derecho Administrativo.

## Arquitectura propuesta
Next.js (App Router, TypeScript), Supabase (Auth/Postgres/RLS/Storage opcional), Google Drive API (OAuth offline con alcance mínimo viable), OpenAI API (respuestas basadas en recuperación de fragmentos), cron diario, proveedor email transaccional y Web Push/VAPID.

## Entidades de datos
profiles; subjects; documents (drive_file_id, revision, mime_type, approval_status, priority, source_kind); document_chunks (texto, páginas, referencias); syllabi; topics; exam_templates; questions; attempts; corrections; flashcards; review_schedule; study_tasks; exam_dates; notification_preferences; push_subscriptions; sync_runs.

## Requisitos de seguridad
OAuth Google por usuario; no exponer refresh tokens en navegador; cifrado de secretos en servidor; RLS por usuario en todas las tablas; verificación de permisos y pertenencia de archivos a carpeta permitida; consentimiento para micro/audio; límites de coste de IA; trazabilidad de citas; exportación y borrado de datos.

## Plan de entregas
1. Autenticación + panel + asignaturas + tareas diarias y calendario.
2. Drive: conexión, inventario, sync diaria, cola de aprobación, extracción de texto y referencias.
3. Tutor RAG, resúmenes, preguntas y correcciones verificables.
4. Exámenes, rúbricas, estadísticas, repetición espaciada.
5. Audio, web push y email diario a las 09:00 Atlantic/Canary, pruebas de extremo a extremo.

## Criterios de aceptación
- Ningún documento nuevo influye en respuestas sin aprobación.
- Respuesta con evidencia muestra referencia y página si existe; no se generan páginas falsas.
- Cada error conserva respuesta del alumno, motivo, respuesta correcta y tareas de repaso.
- Las notificaciones no se duplican en cambios de horario de verano.
- Ningún usuario accede a los documentos, exámenes o progreso de otro.
