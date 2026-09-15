import { absoluteUrl, localePath, LOCALES } from "@/lib/seo";

// Rutas públicas, sin el prefijo de locale. Se excluyen panel y thank-you.
const ROUTES = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "quiz", changeFrequency: "monthly", priority: 0.8 },
  { path: "book-a-call", changeFrequency: "monthly", priority: 0.8 },
  { path: "politicas-de-privacidad", changeFrequency: "yearly", priority: 0.3 },
  { path: "claves-alto-performance", changeFrequency: "monthly", priority: 0.7, locale: "es" },
];

export default function sitemap() {
  return LOCALES.flatMap((locale) =>
    ROUTES.filter(({ path, locale: routeLocale }) =>
      (!routeLocale || routeLocale === locale) && (locale === "es" || path !== "politicas-de-privacidad")
    ).map(({ path, changeFrequency, priority }) => ({
      url: absoluteUrl(localePath(locale, path)),
      changeFrequency,
      priority,
    }))
  );
}
