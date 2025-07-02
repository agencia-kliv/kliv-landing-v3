// app/[locale]/layout.tsx
import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });

export async function generateMetadata() {
  return {
    title: "Agencia KLIV",
    description:
      "Ayudamos a empresas a aumentar sus ventas con performance marketing.",
    openGraph: {
      title: "Agencia KLIV",
      description:
        "Ayudamos a empresas a aumentar sus ventas con performance marketing.",
      type: "website",
      locale: "es_ES",
      url: "https://www.agenciakliv.com/",
      site_name: "Agencia KLIV",
      images: [
        {
          url: "https://www.agenciakliv.com/kliv-isotipo-green.png",
          width: 1241,
          height: 1241,
          alt: "AGENCIA KLIV - Ayudamos a empresas a aumentar sus ventas con performance marketing.",
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
      <SpeedInsights />
      {/* <AOSInit /> */}
      <body className={poppins.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
