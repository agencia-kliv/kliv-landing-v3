import PortalView from "@/components/portals/PortalView";
import { getPortalData, getPortalSlugs } from "@/lib/portals";
import { NO_INDEX, SITE_URL } from "@/lib/seo";
import { notFound } from "next/navigation";

// Páginas reales de portal (no redirect a un artefacto externo). Fuera de
// noindex explícito, no se listan en sitemap.js ni requieren login: son
// públicas para quien tenga el link, pero no se promocionan a buscadores.
export async function generateStaticParams() {
  return getPortalSlugs().map((slug) => ({ slug }));
}
export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const data = await getPortalData(params.slug);
  if (!data) return {};

  const title = `Portal ${data.name} · Agencia KLIV`;
  const description = `Panel de seguimiento de campañas de ${data.name}, gestionado por Agencia KLIV: KPIs, campañas activas, registro de cambios y reuniones.`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    ...NO_INDEX,
  };
}

export default async function ClientPortalPage({ params }) {
  const data = await getPortalData(params.slug);
  if (!data) notFound();

  return <PortalView data={data} />;
}
