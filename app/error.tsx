"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="not-found">
      <h1>No pudimos cargar este espacio.</h1>
      <p>Comprueba tu conexión y vuelve a intentarlo.</p>
      <button className="button" onClick={reset}>
        Volver a intentar
      </button>
    </main>
  );
}
