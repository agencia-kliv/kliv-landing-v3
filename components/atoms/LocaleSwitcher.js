import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BLOG_SLUGS_EN } from "@/data/blogSlugs.en";
import { CASE_STUDIES_PATHS, CASE_STUDY_SLUGS_EN } from "@/data/caseStudySlugs";
import { LEGAL_PATHS } from "@/data/legalSlugs";

// El blog tiene un slug por idioma: al cambiar de idioma se va al mismo
// artículo traducido. El mapa es chico, así que no arrastra los artículos.
const SPANISH_SLUGS = Object.fromEntries(Object.entries(BLOG_SLUGS_EN).map(([es, en]) => [en, es]));

function translatedBlogPath(pathname, currentLocale, newLocale) {
  const match = pathname.match(new RegExp(`^/${currentLocale}/blog(?:/([^/]+))?/?$`));
  if (!match) return null;
  if (!match[1]) return `/${newLocale}/blog/`;
  const slug = newLocale === "en" ? BLOG_SLUGS_EN[match[1]] : SPANISH_SLUGS[match[1]];
  return slug ? `/${newLocale}/blog/${slug}/` : `/${newLocale}/blog/`;
}

// Los casos de éxito también: el índice y cada caso tienen slug propio por idioma.
const SPANISH_CASE_SLUGS = Object.fromEntries(Object.entries(CASE_STUDY_SLUGS_EN).map(([es, en]) => [en, es]));

function translatedCaseStudiesPath(pathname, currentLocale, newLocale) {
  const match = pathname.match(new RegExp(`^/${currentLocale}/${CASE_STUDIES_PATHS[currentLocale]}(?:/([^/]+))?/?$`));
  if (!match) return null;
  const index = `/${newLocale}/${CASE_STUDIES_PATHS[newLocale]}/`;
  if (!match[1]) return index;
  const slug = newLocale === "en" ? CASE_STUDY_SLUGS_EN[match[1]] : SPANISH_CASE_SLUGS[match[1]];
  return slug ? `${index}${slug}/` : index;
}

// El documento legal tiene un slug por idioma.
function translatedLegalPath(pathname, currentLocale, newLocale) {
  return new RegExp(`^/${currentLocale}/${LEGAL_PATHS[currentLocale]}/?$`).test(pathname)
    ? `/${newLocale}/${LEGAL_PATHS[newLocale]}/`
    : null;
}

// Misma página en el otro idioma. El resto de las rutas comparte slug.
function translatedPath(pathname, currentLocale, newLocale) {
  return (
    translatedBlogPath(pathname, currentLocale, newLocale) ||
    translatedCaseStudiesPath(pathname, currentLocale, newLocale) ||
    translatedLegalPath(pathname, currentLocale, newLocale) ||
    pathname.replace(new RegExp(`^/${currentLocale}(?=/|$)`), `/${newLocale}`).replace(/\/?$/, "/")
  );
}

// El idioma activo va subrayado y el otro es un enlace real (no un div con
// onClick): se puede abrir en otra pestaña, alcanzar con el teclado, lo anuncian
// los lectores de pantalla y los crawlers lo siguen. Sin prefetch: el header
// está en todas las páginas y precargaría la versión traducida en cada visita.
const LocaleSwitcher = () => {
  const pathname = usePathname();
  const currentLanguage = useLocale();

  const item = (locale, label) =>
    locale === currentLanguage ? (
      <u aria-current="true" className="px-[4px]">{label}</u>
    ) : (
      <Link
        href={translatedPath(pathname, currentLanguage, locale)}
        hrefLang={locale}
        lang={locale}
        prefetch={false}
        className="inline-flex items-center min-h-[44px] px-[4px] hover:underline"
      >
        {label}
      </Link>
    );

  return (
    <div className="flex items-center text-kliv-secondary underline-offset-[2px] [&_*]:font-[500]">
      {item("en", "EN")}
      <span aria-hidden="true">/</span>
      {item("es", "ES")}
    </div>
  );
};

export default LocaleSwitcher;
