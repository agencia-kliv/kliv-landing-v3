import PortalFooter from "@/components/organisms/PortalFooter";
import PortalHeader from "@/components/organisms/PortalHeader";
import PortalLogin from "@/components/portals/PortalLogin";
import PortalView from "@/components/portals/PortalView";
import {
  CLIENT_PORTAL_COOKIE,
  verifyPortalSession,
} from "@/lib/clientPortalAuth";
import { getPortalData, getPortalSlugs } from "@/lib/portals";
import { NO_INDEX, SITE_URL } from "@/lib/seo";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

// Los portales son páginas reales y privadas. La lectura de cookies exige
// renderizado dinámico; generateStaticParams mantiene documentados los slugs.
export async function generateStaticParams() {
  return getPortalSlugs().map((slug) => ({ slug }));
}
export const dynamicParams = true;
export const dynamic = "force-dynamic";

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

export default async function ClientPortalPage({ params, searchParams }) {
  const data = await getPortalData(params.slug);
  if (!data) notFound();

  const token = cookies().get(CLIENT_PORTAL_COOKIE)?.value;
  const isAuthenticated = verifyPortalSession(token, params.slug);

  if (!isAuthenticated) {
    return <PortalLogin client={data.name} hasError={searchParams.error === "password"} />;
  }

  return (
    <>
      <PortalHeader showLogout client={params.slug} />
      <PortalView data={data} />
      <PortalFooter />
    </>
  );
}
