import { DM_Sans, Poppins } from "next/font/google";
import "../globals.css";

// Layout propio para /cliente/*: estas páginas no viven bajo [locale] (la URL
// no lleva prefijo de idioma), así que acá va el único <html>/<body> real de
// esta rama del árbol de rutas.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

export default function ClientePortalLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${poppins.className} ${dmSans.variable} min-h-screen bg-kliv-sand`}>{children}</body>
    </html>
  );
}
