// Se renderiza dentro de app/cliente/layout.js (que ya pone <html>/<body>),
// así que acá va solo contenido, sin volver a envolver el documento.
export default function ClientePortalNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col items-center gap-[12px] px-[20px] py-[96px] text-center">
      <div className="text-[15px] font-[650] text-kliv-text-1">Portal no encontrado</div>
      <p className="text-[13.5px] leading-[1.55] text-kliv-text-4">
        No encontramos un portal de cliente con ese nombre. Si el link te lo pasó Agencia KLIV, contactanos para
        confirmarlo.
      </p>
    </div>
  );
}
