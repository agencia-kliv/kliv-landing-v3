import { LEGAL_PATHS } from "@/data/legalSlugs";
import { getMessages, pageMetadata } from "@/lib/metadata";
import { localizedAlternates } from "@/lib/seo";

// Traducción al inglés de /es/politicas-de-privacidad/. Solo existe en inglés;
// /es/privacy-policy/ redirige a la versión española.
export function generateStaticParams() {
  return [{ locale: "en" }];
}

export const dynamicParams = false;

export async function generateMetadata() {
  const { footer } = await getMessages("en");
  return {
    ...pageMetadata({
      locale: "en",
      path: LEGAL_PATHS.en,
      title: footer.termsAndConditions,
      description: "Terms and conditions governing the use of KLIV Agency's services and website.",
    }),
    alternates: localizedAlternates("en", LEGAL_PATHS),
  };
}

export default function TermsAndConditionsLayout({ children }) {
  return (
    <main className="max-w-[650px] m-auto py-[40px] lg:py-[120px]">
      {children}
    </main>
  );
}
