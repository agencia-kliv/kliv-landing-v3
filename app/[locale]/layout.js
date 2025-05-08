// app/[locale]/layout.tsx
import { FacebookPixelEvents } from "@/components/FacebookPixel";
import GTM from "@/components/GTM";
import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";
import { NextIntlClientProvider } from "next-intl";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });

export async function generateMetadata({ params }) {
  return {
    title: "AGENCIA KLIV - Performance Marketing",
    description:
      "Aumenta tus ventas con estrategias 100% orientadas a resultados. Publicidad digital, email marketing, gestión de redes, diseño web y diseño multimedia.",
    openGraph: {
      title: "AGENCIA KLIV",
      description:
        "Ayudamos a empresas a aumentar sus ventas de manera rentable con performance marketing.",
      type: "website",
      locale: "es_ES",
      url: "https://www.agenciakliv.com/",
      site_name: "AGENCIA KLIV",
      images: [
        {
          url: "https://www.agenciakliv.com/kliv-isotipo-green.png",
          width: 1241,
          height: 1241,
          alt: "AGENCIA KLIV - Ayudamos a empresas a aumentar sus ventas de manera rentable con performance marketing.",
        },
      ],
    },
  };
}

// export async function generateMetadata({ params }) {
//   const { locale } = await params;
//   const t = await getTranslations({ locale, namespace: "metadata" });

//   return {
//     title: t.title,
//     description: t.description,
//     openGraph: {
//       ...t.openGraph,
//       locale,
//     },
//   };
// }

//function to get the translations
async function getMessages(locale) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

//function to generate the routes for all the locales
export async function generateStaticParams() {
  return ["en", "es"].map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params: { locale } }) {
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      {/* <AOSInit /> */}
      <body className={poppins.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          {children}
          <Footer />
          <GTM />
          <Suspense fallback={<></>}>
            <FacebookPixelEvents />
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
