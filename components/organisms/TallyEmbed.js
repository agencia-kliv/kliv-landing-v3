"use client";

import { useLocale } from "next-intl";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function TallyEmbed() {
  const locale = useLocale();

  const [formCompleted, setFormCompleted] = useState(false);

  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobile =
        typeof window !== "undefined" &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobileDevice(isMobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      // Tally.FormSubmitted es la señal de envío
      if (e?.data?.includes("Tally.FormSubmitted")) {
        setFormCompleted(true);
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  useEffect(() => {
    // Si el script ya cargó antes de montar el componente
    if (typeof Tally !== "undefined") {
      Tally.loadEmbeds();
    }
  }, []);

  return (
    <div className="animate-fade-in-large w-full relative">
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

      <div
        className={`absolute ${formCompleted ? "!w-[200px]" : ""} ${
          isMobileDevice ? "!h-[91px]" : ""
        } w-[60px] xs:w-[200px] h-[60px] bg-white bottom-0 right-0`}
      ></div>
    </div>
  );
}
