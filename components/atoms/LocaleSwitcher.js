import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { BLOG_SLUGS_EN } from "@/data/blogSlugs.en";
import { CASE_STUDIES_PATHS, CASE_STUDY_SLUGS_EN } from "@/data/caseStudySlugs";

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

const LocaleSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage = useLocale();

  const changeLanguage = (newLocale) => {
    // change the locale

    const translatedPath =
      translatedBlogPath(pathname, currentLanguage, newLocale) ||
      translatedCaseStudiesPath(pathname, currentLanguage, newLocale);
    if (translatedPath) {
      router.push(translatedPath);
      return;
    }

    router.push(
      `/${newLocale}/${pathname.replace(`/${currentLanguage}`, "") || ""}`
    );
  };

  return (
    <div
      className="flex items-center gap-[0px] text-kliv-secondary underline-offset-[2px] [&_*]:font-[500] cursor-pointer hover:underline"
      onClick={() => {
        if (currentLanguage === "en") changeLanguage("es");
        else changeLanguage("en");
      }}
    >
      {currentLanguage === "en" ? (
        <span className="w-[60px]">
          <u>EN</u>
          {" / ES "}
        </span>
      ) : (
        <span className="w-[60px]">
          {" EN / "}
          <u>ES</u>
        </span>
      )}
    </div>
  );
};

export default LocaleSwitcher;
