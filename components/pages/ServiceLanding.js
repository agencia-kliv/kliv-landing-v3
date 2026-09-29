import HomeContent from "@/components/pages/HomeContent";
import { getLandingMessages, LANDINGS } from "@/lib/landings";
import { pageMetadata } from "@/lib/metadata";

export async function landingMetadata(slug, locale) {
  const { metadata } = await getLandingMessages(slug, locale);
  return pageMetadata({
    locale,
    path: slug,
    title: metadata.title,
    description: metadata.description,
  });
}

// Misma home, con el copy y las plataformas de la landing.
export default async function ServiceLanding({ slug, locale }) {
  const messages = await getLandingMessages(slug, locale);
  return (
    <HomeContent
      locale={locale}
      messages={messages}
      path={slug}
      platforms={LANDINGS[slug].platforms}
      overrideMessages
    />
  );
}
