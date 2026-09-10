import { absoluteUrl, localePath, SITE_URL } from "./seo";

// Reuse published copy: do not infer founding dates, ratings, prices or locations.
export function homeStructuredData(locale, messages) {
  const url = absoluteUrl(localePath(locale));
  const organization = `${SITE_URL}/#organization`;
  const website = `${SITE_URL}/#website`;
  const service = `${url}#performance-marketing`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organization,
        name: "Agencia KLIV",
        url: `${SITE_URL}/`,
        logo: absoluteUrl("/kliv-isotipo-green.png"),
      },
      {
        "@type": "WebSite",
        "@id": website,
        name: "Agencia KLIV",
        url: `${SITE_URL}/`,
        inLanguage: ["es", "en"],
        publisher: { "@id": organization },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: messages.metadata.title,
        description: messages.metadata.description,
        inLanguage: locale,
        isPartOf: { "@id": website },
        about: { "@id": organization },
        mainEntity: { "@id": service },
      },
      {
        "@type": "Service",
        "@id": service,
        url: `${url}#servicios`,
        name: messages.services.title,
        description: messages.services.subtitle,
        serviceType: "Performance marketing",
        provider: { "@id": organization },
      },
    ],
  };
}

// Prevent strings containing </script> from escaping the JSON-LD script.
export const serializeStructuredData = (data) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
