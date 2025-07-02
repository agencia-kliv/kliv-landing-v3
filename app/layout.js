// app/layout.tsx

import Script from "next/script";

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Fragmento GTM en <head> */}
        <Script
          id="google-tag-manager"
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
      </head>
      <body>
        {/* Fragmento <noscript> tras abrir <body> */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NKCXG6R"
                      height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
