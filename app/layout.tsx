import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "UNED Study AI · Tu espacio de estudio",
  description:
    "Organiza tus asignaturas, construye tu hábito y estudia a tu ritmo.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
