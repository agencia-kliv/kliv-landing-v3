import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";
import { alternatesFor, LOCALES, SITE_URL } from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import { DM_Sans, Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

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
  return LOCALES.map((locale) => ({ locale }));
}

// El copy de metadata ya vivía traducido en messages/*.json bajo "metadata"
// y "openGraphImage", pero nadie lo leía: las dos versiones del sitio salían
// con el mismo título y la misma descripción en español.
export async function generateMetadata({ params: { locale } }) {
  const messages = await getMessages(locale);
  const { metadata, openGraphImage } = messages;
  const og = metadata.openGraph;
  const alternates = alternatesFor(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: metadata.title,
    description: metadata.description,
    alternates,
    openGraph: {
      title: og.title,
      description: og.description,
      type: og.type,
      locale: og.locale,
      url: alternates.canonical,
      // Next espera siteName; el JSON traía site_name, que se descartaba
      // en silencio y dejaba las tarjetas sin nombre de sitio.
      siteName: og.site_name,
      images: [
        {
          url: new URL(openGraphImage.image_url, SITE_URL).href,
          width: 1241,
          height: 1241,
          alt: openGraphImage.image_alt,
        },
      ],
    },
  };
}

export default async function RootLayout({ children, params: { locale } }) {
  if (!LOCALES.includes(locale)) notFound();

  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <head>
        {/* Fragmento GTM en <head> */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NKCXG6R');
            `,
          }}
        />

        {/* 2. GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WWFCHX750Q"
          strategy="afterInteractive"
        />
        <Script id="ga4-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-WWFCHX750Q');
          `}
        </Script>

        {/* 3. Facebook Pixel */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){
              if(f.fbq) return;
              n=f.fbq=function(){ n.callMethod?
                n.callMethod.apply(n,arguments) : n.queue.push(arguments)
              };
              if(!f._fbq) f._fbq=n;
              n.push = n; n.loaded = !0; n.version = '2.0';
              n.queue = []; t=b.createElement(e); t.async=!0;
              t.src=v; s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s);
            }(window, document, 'script',
              'https://connect.facebook.net/${locale === "en" ? "en_US" : "es_LA"}/fbevents.js');
            fbq('init', '217536290010049');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Microsoft Clarity */}
        {CLARITY_PROJECT_ID && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
            `}
          </Script>
        )}
      </head>
      <body className={`${poppins.className} ${dmSans.variable}`}>
        {/* Fragmento <noscript> tras abrir <body> */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NKCXG6R"
                      height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Analytics />
          <SpeedInsights />
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
