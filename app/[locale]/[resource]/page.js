import ResourceArticle from "@/components/templates/resources/ResourceArticle";
import { RESOURCE_SLUGS } from "@/data/resources";
import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

const TITLES = {
  "claves-alto-performance": "Claves para el alto performance",
  "marcas-con-alma": "Marcas con alma",
  "claves-web": "Claves para una web que convierte",
  "claves-whatsapp": "Claves para vender por WhatsApp",
};

export function generateMetadata({ params: { locale, resource } }) {
  if (!RESOURCE_SLUGS.includes(resource)) return {};
  const ready = locale === "es" && resource === "claves-alto-performance";
  return pageMetadata({
    locale,
    path: resource,
    title: TITLES[resource],
    description: "Ideas y aprendizajes de KLIV para mejorar el rendimiento de tu publicidad.",
    noIndex: !ready,
  });
}

export default function ResourcePage({ params: { locale, resource } }) {
  if (!RESOURCE_SLUGS.includes(resource)) notFound();
  return <ResourceArticle locale={locale} resource={resource} />;
}
