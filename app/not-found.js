import NotFoundContent from "@/components/organisms/NotFoundContent";

export default function NotFound() {
  // Unknown top-level paths never enter the locale layout, which normally
  // supplies the document shell. Keep this fallback self-contained.
  return (
    <html lang="es">
      <head>
        <title>Página no encontrada | KLIV</title>
        <meta name="robots" content="noindex" />
      </head>
      <body style={{ margin: 0 }}>
        <NotFoundContent />
      </body>
    </html>
  );
}
