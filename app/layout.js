// Root layout mínimo, a propósito.
//
// El <html> y el <body> reales viven en app/[locale]/layout.js, que es el
// único punto del árbol que conoce el idioma y por lo tanto el único que
// puede escribir lang correctamente. Antes esto estaba acá con lang="es"
// hardcodeado, así que /en/ se anunciaba como español.
//
// Las rutas de este nivel (/ y /quiz) solo hacen redirect y nunca llegan
// a renderizar HTML.
export default function RootLayout({ children }) {
  return children;
}
