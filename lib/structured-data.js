import { absoluteUrl, localePath, SITE_URL } from "./seo";
import { BUSINESS } from "@/data/business";
import { faqId } from "./faq";
import videoMetadata from "@/data/videoMetadata.json";
import { pageDate } from "./contentDates";
import { TESTIMONIAL_ITEMS } from "@/data/testimonials";

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
        // La home en inglés se presenta como "KLIV Agency" en title y Open Graph;
        // se declara como nombre alternativo de la misma entidad.
        alternateName: "KLIV Agency",
        legalName: BUSINESS.legalName,
        url: `${SITE_URL}/`,
        logo: absoluteUrl("/kliv-isotipo-green.png"),
        sameAs: [
          "https://www.instagram.com/agenciakliv/",
          "https://www.linkedin.com/company/agencia-kliv/",
        ],
        telephone: BUSINESS.telephone,
        email: BUSINESS.email,
        address: BUSINESS.address,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: BUSINESS.telephone,
          email: BUSINESS.email,
          availableLanguage: ["es", "en"],
        },
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
        // Fecha de la última edición de contenido real, no la del build.
        dateModified: pageDate("", locale),
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
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#office`,
        name: BUSINESS.name,
        url: `${SITE_URL}/`,
        parentOrganization: { "@id": organization },
        address: BUSINESS.address,
        geo: BUSINESS.geo,
        telephone: BUSINESS.telephone,
        image: absoluteUrl("/kliv-isotipo-green.png"),
      },
      ...["Meta Ads", "Google Ads", "TikTok Ads"].map((platform) => ({
        "@type": "Service",
        "@id": `${url}#${platform.toLowerCase().replace(/ /g, "-")}`,
        name: platform,
        serviceType: platform,
        url: `${url}#servicios`,
        provider: { "@id": organization },
        isRelatedTo: { "@id": service },
      })),
      // Testimonios escritos, con el mismo texto y autor que se ven en la home.
      // Sin reviewRating ni AggregateRating: no hay puntuaciones verificadas y
      // Google no muestra estrellas por reseñas sobre la propia organización.
      ...TESTIMONIAL_ITEMS.filter((item) => item.text).map((item) => ({
        "@type": "Review",
        "@id": `${url}#review-${item.text.toLowerCase()}`,
        inLanguage: locale,
        itemReviewed: { "@id": organization },
        author: { "@type": "Person", name: item.name, worksFor: { "@type": "Organization", name: item.company } },
        reviewBody: messages.testimonials[item.text],
        publisher: { "@id": organization },
      })),
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: locale,
        mainEntity: Object.values(messages.faq.questions).map((question) => ({
          "@type": "Question",
          "@id": `${url}#${faqId(question.title)}`,
          name: question.title,
          acceptedAnswer: {
            "@type": "Answer",
            text: question.content.replace(/<[^>]*>/g, ""),
          },
        })),
      },
      ...Object.entries(videoMetadata).map(([path, video]) => ({
        "@type": "VideoObject",
        "@id": `${url}#video-${path.split("/").pop().split(".")[0]}`,
        name: video.name[locale],
        description: video.description[locale],
        uploadDate: video.uploadDate,
        duration: video.duration,
        thumbnailUrl: absoluteUrl(video.thumbnailUrl),
        contentUrl: absoluteUrl(locale === "en" && path.endsWith(".mp4") ? path.replace(".mp4", "-eng.mp4") : path),
        inLanguage: locale,
        publisher: { "@id": organization },
        isPartOf: { "@id": `${url}#webpage` },
      })),
    ],
  };
}

// Prevent strings containing </script> from escaping the JSON-LD script.
export const serializeStructuredData = (data) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
