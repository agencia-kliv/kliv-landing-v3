"use client";

import { useLocale } from "next-intl";
import Script from "next/script";
import { useEffect } from "react";

export default function TallyEmbed() {
  const locale = useLocale();

  useEffect(() => {
    // Si el script ya cargó antes de montar el componente
    if (typeof Tally !== "undefined") {
      Tally.loadEmbeds();
    }
  }, []);

  return (
    <div className="animate-fade-in-large w-full">
      {locale === "es" && (
        <iframe
          data-tally-src="https://tally.so/embed/31Y4ZQ?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
          loading="lazy"
          width="100%"
          height="407"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Evaluación de Potencial Publicitario"
        ></iframe>
      )}
      {locale === "en" && (
        <iframe
          data-tally-src="https://tally.so/embed/nPNAgb?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
          loading="lazy"
          width="100%"
          height="407"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Evaluación de Potencial Publicitario"
        ></iframe>
      )}

      {/* Cargamos el script de Tally con lazyOnload */}
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof Tally !== "undefined") {
            Tally.loadEmbeds();
          }
        }}
      />
    </div>
  );
}
