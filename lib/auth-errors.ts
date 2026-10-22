type AuthFailure = { code?: string; status?: number };

export function authErrorMessage(error: AuthFailure, signup = false) {
  switch (error.code) {
    case "email_not_confirmed":
      return "Tu correo todavía no está confirmado. Abre el mensaje de Supabase y pulsa el enlace de confirmación; después vuelve a iniciar sesión.";
    case "invalid_credentials":
      return "El correo o la contraseña no coinciden. Usa tu correo completo y la contraseña que elegiste al crear la cuenta.";
    case "signup_disabled":
      return "La creación de cuentas está desactivada en este momento. Contacta con quien administra la app.";
    case "over_email_send_rate_limit":
      return "Se ha alcanzado el límite de envío de correos. Espera unos minutos antes de solicitar otro mensaje.";
    case "over_request_rate_limit":
      return "Hay demasiados intentos seguidos. Espera unos minutos y vuelve a intentarlo.";
    case "weak_password":
      return "La contraseña no cumple los requisitos. Usa una más larga que combine mayúsculas, minúsculas, números y símbolos.";
    default:
      if (error.status && error.status >= 500)
        return "El servicio de acceso no ha podido completar la operación. Inténtalo más tarde; si continúa, contacta con quien administra la app.";
      return signup
        ? "No se pudo crear la cuenta. Revisa los datos o prueba a iniciar sesión."
        : "No se pudo acceder. Comprueba tu conexión y vuelve a intentarlo.";
  }
}
