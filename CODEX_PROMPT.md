# Prompt maestro para Codex

Construye UNED Study AI usando `ESPECIFICACIONES.md` como contrato de producto. Crea una aplicación Next.js App Router + TypeScript + Tailwind, con Supabase para autenticación, Postgres y RLS. Mantén los secretos en variables de entorno y no simules integraciones como si fueran reales.

Implementa por fases con commits separados:
1. Shell responsive en español, login Google/email, dashboard por asignatura, calendario, tareas diarias, progreso y ajustes de recordatorios. Crea migraciones SQL con políticas RLS y tests básicos. Debe funcionar en modo demo sin credenciales, claramente etiquetado.
2. OAuth Drive y sincronización incremental diaria limitada al árbol de la carpeta ID `1E3qTbw3gC9DcAmWzI8rzyylnB6CF6TKF`. Lista archivos, detecta cambios, registra errores y presenta cola de aprobación. No extraigas contenido para el tutor hasta aprobación. Asegura que los tokens queden solo en backend.
3. Extracción de PDFs y DOCX, almacenamiento de fragmentos con página y fuente, búsqueda por asignatura/tema y generación IA grounded con citas. Si faltan fuentes, no inventes respuesta.
4. Simulacros configurables, evaluación explicada, respuestas correctas, rúbricas, flashcards y repetición espaciada.
5. Práctica oral y notificaciones: web push + email transaccional a las 09:00 `Atlantic/Canary` todos los días; manejo de horario de verano, preferencias, permisos, opt-out e idempotencia.

Crea `.env.example`, README con instrucciones locales/despliegue, migraciones, tests y validación de build. Solicita al usuario credenciales únicamente cuando sea necesario. No publiques ni actives envío real sin confirmación y pruebas.

Primero implementa la fase 1 con una experiencia visual cuidada, limpia, accesible y apta para móvil. No atribuyas datos académicos de ejemplo a documentos reales.
