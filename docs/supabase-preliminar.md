# Activar la preliminar con Supabase

Esta entrega mantiene la web en GitHub Pages y utiliza Supabase Auth y Postgres desde el navegador. No necesita un servidor Next.js para cuentas, tareas o progreso. Drive, el tutor y los envíos seguirán requiriendo su desarrollo y componentes de servidor específicos.

## 1. Proyecto y configuración pública

Crea un proyecto en https://supabase.com/dashboard si aún no tienes uno. Guarda la contraseña de la base de datos en tu gestor de contraseñas; no la compartas en el chat ni la pongas en la aplicación.

En los ajustes del proyecto busca:

- **Project URL**: `https://…supabase.co`.
- **Publishable key**: empieza por `sb_publishable_`. También se admite la clave `anon` heredada.

Estas dos propiedades se publican en el navegador por diseño. Nunca utilices una clave `sb_secret_…`, `service_role`, una contraseña de Postgres ni un token de administración. El build de la preliminar rechaza claves con formato de servidor; la protección de los datos la aporta RLS, no ocultar la clave pública.

## 2. Base de datos

En el editor SQL de Supabase ejecuta una sola vez el archivo [`202610210001_initial.sql`](../supabase/migrations/202610210001_initial.sql). Crea las tablas, las políticas por usuario, el catálogo inicial y el borrado de datos de estudio. Si ya lo ejecutaste, no lo vuelvas a aplicar: primero comprueba el estado de las migraciones.

La función de inicialización crea las nueve asignaturas del catálogo original para cada cuenta, sin tareas ni minutos de ejemplo. Al cargar una cuenta, la app añade las materias que falten del catálogo actual de once mediante una operación idempotente y bajo RLS; conserva las asignaturas existentes y sus identificadores. Los datos de demo no se importan a las cuentas. No desactives RLS ni concedas acceso de lectura a `anon`.

## 3. Acceso y confirmación de email

En **Authentication → URL Configuration**:

- **Site URL**: `https://anasantana1609.github.io/uned/`.
- **Redirect URLs**: añade exactamente `https://anasantana1609.github.io/uned/auth/callback/`.

Habilita Email y la confirmación del correo. La app utiliza PKCE: abre el enlace de confirmación en el mismo navegador en el que solicitaste el alta. Si lo abres en otro, tras confirmar el correo vuelve al formulario y accede con tu contraseña. Los códigos caducados y los retornos inválidos muestran un error, no abren datos de demo.

Para tu cuenta privada inicial, puedes crear y confirmar tu propia cuenta y después desactivar nuevos registros en Supabase. Configura el correo transaccional del servicio antes de ampliar el uso; la disponibilidad y los límites del envío los determina Supabase.

Google queda desactivado en la preliminar. Para añadirlo, configura el proveedor Google en Supabase con sus credenciales OAuth y su callback indicado allí; después habilita la variable `GOOGLE_AUTH_ENABLED=true`. El acceso Google no solicita permisos de Drive.

## 4. Publicación en la dirección actual

En el repositorio GitHub abre **Settings → Secrets and variables → Actions → Variables** y añade estas variables de repositorio:

| Nombre                                 | Contenido           |
| -------------------------------------- | ------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`             | La URL del proyecto |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | La clave publicable |

Después ejecuta el workflow **Publicar UNED Study AI en GitHub Pages** desde Actions. No hacen falta secretos administrativos para el despliegue.

El workflow prueba la demo y la interfaz de cuentas contra respuestas de prueba. Cuando existen las dos variables, comprueba el servicio real (Auth, email habilitado y denegación de lectura anónima en las tablas) y compila la preliminar. Si falla la comprobación, no reemplaza la web que estaba publicada. Si faltan ambas variables, continúa publicando la demo explícita.

La preliminar publicada exige iniciar sesión. Los tokens se mantienen en el almacenamiento de Supabase Auth del navegador; la base de datos aplica los permisos por usuario. El cierre de sesión desmonta el espacio de cuenta. Una sesión no válida, un error de red o un fallo en las consultas nunca cambia silenciosamente a datos de ejemplo.

## 5. Validación

Para desarrollar con cuentas reales, configura las propiedades públicas en `.env.local`, sin subir el archivo a Git. La app completa en Node también admite las claves publicables nuevas y las `anon` antiguas.

```bash
npm run check:supabase
npm run build:preview
npm run serve:demo
```

La comprobación de conexión es de solo lectura. No sustituye una prueba real con dos cuentas distintas: verifica que cada una ve solo sus propias tareas, fechas, preferencias y sesiones. Comprueba también la confirmación de correo, la recarga y el cierre de sesión en el dominio público.

Pruebas sin proyecto externo:

```bash
npm test
npm run test:preliminary
npm run test:pages
```

`test:preliminary` compila una configuración ficticia, intercepta las llamadas HTTP de Supabase en Playwright y prueba acceso, persistencia, errores, cierre de sesión y PKCE. Al terminar vuelve a compilar la demo para no dejar un artefacto con el proyecto ficticio. Esas pruebas no prueban que un proyecto real esté conectado.
