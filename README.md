# UNED Study AI

Aplicación de estudio en español, responsive, construida con Next.js App Router, TypeScript y Tailwind. Implementa la **fase 1** del paquete de especificaciones adjunto. Proyecto independiente, sin afiliación con la UNED.

## Arranque rápido

Requiere Node.js 22 o 24 y npm. La versión instalada se fija mediante `package-lock.json`.

```bash
npm ci
npm run dev
```

Sin credenciales, la aplicación abre una **demo explícita** con nueve asignaturas y actividad de ejemplo. Los cambios se guardan en `localStorage` de este navegador. No introduzcas información sensible en la demo ni en un navegador compartido. Las sesiones de temporizador viven en memoria: al recargar se pierde el temporizador activo; termina la sesión para guardar los minutos. No se transfieren datos de la demo al iniciar sesión.

Rutas: `/dashboard`, `/asignaturas`, `/calendario`, `/progreso`, `/fuentes`, `/ajustes`, `/login`.

## Funciones disponibles

- Panel con objetivo diario, racha y tareas del día.
- Búsqueda de asignaturas, detalle y progreso según minutos registrados (no evaluación académica).
- Crear, completar y eliminar tareas; calendario navegable.
- Fechas de examen introducidas manualmente con confirmación obligatoria. No se presupone una convocatoria.
- Temporizador con pausa, reanudación y registro al terminar; registro manual del estudio de hoy.
- Historial, gráfico semanal y estadísticas calculadas a partir de los datos.
- Objetivo, hora y zona de recordatorio configurables; intereses de email/push guardados **sin envío real**.
- Exportación JSON y borrado confirmado de tareas, sesiones, fechas y preferencias. El borrado conserva la cuenta y las asignaturas. La eliminación completa de la cuenta se gestiona desde Supabase por el administrador en esta entrega.
- Email/contraseña y Google OAuth con Supabase cuando se configura. Sin credenciales, los controles de acceso explican el requisito y están deshabilitados.

## Supabase: pasar de la demo a una cuenta real

1. Crea un proyecto Supabase y ejecuta `supabase/migrations/202610210001_initial.sql` en su editor SQL (una sola vez, o mediante tu flujo de migraciones). Inicializa perfiles, nueve asignaturas por usuario y preferencias. Incluye usuarios existentes; no copia datos de ejemplo a cuentas reales.
2. Copia `.env.example` a `.env.local` y configura **solo** `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` con la URL y la clave pública/anon del proyecto. No uses una clave `service_role` en ninguna variable pública. Reinicia el servidor; las variables públicas se incorporan durante el build.
3. En Authentication > URL Configuration, configura Site URL y la URL de retorno `https://tu-dominio/auth/callback` (en local, el mismo origen del servidor, con la ruta `/auth/callback`). Habilita confirmación de email y configura SMTP para uso real. La app envía registro y acceso directamente al servicio Auth.
4. Para Google, activa el proveedor en Supabase y configura su OAuth Client ID/Secret **en Supabase**, con la URL de callback que Supabase indica. No son necesarios en el navegador ni en este proyecto. Este acceso solicita identidad, no permisos de Google Drive.
5. Para una cuenta privada inicial, crea/invita la cuenta desde Supabase y desactiva los registros públicos en Authentication. Las opciones de Google deben respetar la política de alta elegida en el proveedor. La UI de registro no permite saltarse esa configuración de Supabase.
6. Prueba registro, confirmación de email, Google, cierre de sesión y aislamiento entre dos cuentas en tu proyecto. No han podido validarse contra un servicio real sin credenciales.

Todas las tablas de aplicación tienen RLS por usuario; las relaciones con asignaturas también incluyen el propietario en la clave externa. El navegador usa la clave pública y la sesión del usuario. Las cookies se renuevan con `proxy.ts`; el callback intercambia el código OAuth en el servidor. Ningún `service_role` se necesita para las funciones de esta fase. No desactives RLS.

## Comprobaciones

```bash
npm test
npm run build
npm run typecheck
# Si no hay navegador instalado:
npx playwright install chromium
npm run test:e2e
```

Si hay Chromium del sistema, puedes usar `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e`. Playwright inicia un servidor automáticamente. Las pruebas del navegador requieren **no** configurar las variables de Supabase para ejercitar la demo. Las pruebas SQL ejecutan la migración en PostgreSQL embebido (PGlite), crean dos usuarios y prueban RLS, pertenencia de asignaturas, confirmación de exámenes y borrado aislado. No sustituyen una prueba del servicio Supabase y de sus proveedores OAuth reales.

## Demo en GitHub Pages

La demo se exporta como archivos estáticos bajo `/uned/`. Comparte la interfaz con la aplicación completa, pero **no activa Supabase ni servicios externos**, incluso si existen variables de Supabase en el proceso de build. Los datos se mantienen en el navegador de cada visitante. El código del servidor, los callbacks OAuth y los secretos no forman parte del sitio estático.

```bash
npm run build:demo
npm run serve:demo
# Prueba el artefacto exportado:
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:pages
```

El resultado está en `demo/out/` (ignorado por Git). `demo/next.config.ts` fija el prefijo `/uned`; si cambias el nombre del repositorio, actualízalo antes de compilar. El servidor de `scripts/serve-demo.mjs` es solo para validación local.

El workflow `.github/workflows/pages.yml` instala las dependencias, ejecuta las pruebas de datos, compila la demo, comprueba el artefacto en escritorio y móvil y lo publica en GitHub Pages cuando cambia `main`. El repositorio debe tener **Settings > Pages > Source: GitHub Actions** habilitado. El despliegue usa los permisos efímeros de GitHub Actions; no requiere introducir tokens en archivos ni configurar secretos personales.

Las rutas exportadas permiten abrir y recargar directamente el calendario, las asignaturas, el progreso y los ajustes. Los datos y las fechas del ejemplo se inicializan al cargar la app en el navegador, evitando que se queden fijados al día de compilación.

## Producción

```bash
npm ci
npm run build
npm start
```

Configura las dos variables públicas de Supabase en la plataforma de despliegue antes del build. Usa HTTPS y registra el dominio de producción en los retornos de Supabase. El hosting de Next.js puede ser Vercel o un servidor Node compatible. No se ha desplegado esta app ni se han activado envíos externos.

## Próximas entregas

`ESPECIFICACIONES.md` describe el producto completo y `CODEX_PROMPT.md` conserva el planteamiento del paquete original. No implican funcionalidades ya entregadas. Pendientes: Google Drive y su sincronización diaria, aprobación y extracción de documentos, tutor con recuperación de fuentes y citas, simulacros y rúbricas, flashcards, repetición espaciada, práctica oral, cron y notificaciones push/email con idempotencia y horario de verano. La biblioteca muestra este estado con claridad. No se han leído documentos de Drive ni generado contenido jurídico atribuido a fuentes.

Las asignaturas iniciales requieren validación académica. Los títulos de tareas y minutos de la demo son ejemplos de interfaz, no información extraída de manuales o documentos reales.
