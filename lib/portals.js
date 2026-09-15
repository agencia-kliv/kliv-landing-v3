// Registro de portales de cliente que viven como página real (no redirect).
// Para sumar uno nuevo: crear data/portals/<slug>.json con la misma forma
// que isada.json, agregar la entrada acá, y sumar el slug en
// generateStaticParams de app/cliente/[slug]/page.js.
const PORTAL_LOADERS = {
  isada: () => import("@/data/portals/isada.json"),
};

export async function getPortalData(slug) {
  const loader = PORTAL_LOADERS[slug?.toLowerCase()];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}

export function getPortalSlugs() {
  return Object.keys(PORTAL_LOADERS);
}
