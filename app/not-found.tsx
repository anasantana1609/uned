import Link from "next/link";
export default function NotFound() {
  return (
    <main className="not-found">
      <span className="eyebrow">UN PEQUEÑO DESVÍO</span>
      <h1>Esta página no está en tu plan.</h1>
      <p>Vuelve a tu espacio y sigue aprendiendo.</p>
      <Link className="button" href="/dashboard">
        Volver a mi resumen
      </Link>
    </main>
  );
}
