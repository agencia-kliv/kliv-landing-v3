import { getMessages, pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params: { locale } }) {
  const { footer } = await getMessages(locale);
  return { ...pageMetadata({
    locale,
    path: "politicas-de-privacidad",
    title: footer.termsAndConditions,
    description:
      locale === "en"
        ? "Terms and conditions governing the use of KLIV Agency's services and website."
        : "Términos y condiciones que rigen el uso de los servicios y el sitio web de Agencia KLIV.",
  }), alternates: { canonical: "/es/politicas-de-privacidad/" } };
}

export default function TermsAndConditionsLayout({ children }) {
  return (
    <main className="max-w-[650px] m-auto py-[40px] lg:py-[120px]">
      {children}
    </main>
  );
}
