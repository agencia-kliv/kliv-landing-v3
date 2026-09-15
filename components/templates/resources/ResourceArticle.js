"use client";

import AgendarLLamadaButton from "@/components/atoms/AgendarLLamadaButton";
import Link from "next-intl/link";
import { FiArrowLeft } from "react-icons/fi";
import { HIGH_PERFORMANCE_SECTIONS } from "@/data/resources";

export default function ResourceArticle({ locale, resource }) {
  const isSpanish = locale === "es";
  const isReady = resource === "claves-alto-performance" && isSpanish;

  if (!isReady) {
    return (
      <main className="min-h-[65svh] bg-kliv-lightgreen px-[20px] py-[90px] flex items-center">
        <div className="max-w-[760px] mx-auto text-center">
          <p className="text-[12px] tracking-[.15em] font-[700] text-kliv-primary mb-[20px]">{isSpanish ? "RECURSOS KLIV" : "KLIV RESOURCES"}</p>
          <h1 className="text-[34px] lg:text-[48px] leading-[1.1] font-[700] text-kliv-secondary mb-[22px]">{isSpanish ? "Estamos preparando este artículo" : "We’re preparing this article"}</h1>
          <p className="text-[17px] leading-[1.7] text-kliv-text-4 max-w-[570px] mx-auto mb-[34px]">{isSpanish ? "La estructura ya está lista para la vista previa. Publicaremos el contenido cuando KLIV apruebe la versión definitiva." : "The preview structure is ready. We’ll publish the content once KLIV approves the final version."}</p>
          <Link href="/#recursos" className="inline-flex items-center gap-[10px] text-kliv-primary font-[700]"><FiArrowLeft /> {isSpanish ? "Volver a Recursos" : "Back to Resources"}</Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <header className="bg-kliv-lightgreen px-[20px] py-[72px] lg:py-[110px]">
        <div className="max-w-[920px] mx-auto">
          <Link href="/#recursos" className="inline-flex items-center gap-[10px] text-kliv-primary font-[700] mb-[42px]"><FiArrowLeft /> Volver a Recursos</Link>
          <p className="text-[12px] tracking-[.15em] font-[700] text-kliv-primary mb-[18px]">RECURSOS KLIV · PERFORMANCE MARKETING</p>
          <h1 className="text-[38px] sm:text-[48px] lg:text-[64px] leading-[1.04] font-[700] tracking-[-.04em] text-kliv-secondary max-w-[850px]">Claves para el alto performance</h1>
          <p className="text-[18px] lg:text-[21px] leading-[1.65] text-kliv-text-4 max-w-[740px] mt-[26px]">Construir una marca sólida y lograr resultados rentables es un proceso de largo plazo que exige estrategia, paciencia, experimentación y una mirada integral del negocio.</p>
        </div>
      </header>
      <article className="max-w-[780px] mx-auto px-[20px] py-[70px] lg:py-[100px]">
        <p className="text-[18px] leading-[1.8] text-kliv-text-3 mb-[60px]">En KLIV trabajamos con expectativas realistas, ajustadas al punto de partida de cada marca, sus recursos y el mercado en el que opera. Estas son las variables que consideramos para construir campañas de alto rendimiento.</p>
        <div className="flex flex-col gap-[58px]">
          {HIGH_PERFORMANCE_SECTIONS.map((section, index) => (
            <section key={section.title}>
              <p className="text-[11px] tracking-[.14em] font-[700] text-kliv-tertiary mb-[12px]">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="text-[28px] lg:text-[34px] leading-[1.2] font-[700] tracking-[-.025em] text-kliv-secondary mb-[20px]">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p className="text-[17px] leading-[1.8] text-kliv-text-3 mb-[16px]" key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul className="flex flex-col gap-[12px] pl-[20px] text-[17px] leading-[1.7] text-kliv-text-3">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
            </section>
          ))}
        </div>
        <aside className="mt-[76px] p-[28px] sm:p-[42px] rounded-[20px] bg-kliv-secondary text-white">
          <h2 className="text-[27px] sm:text-[34px] leading-[1.2] font-[700] mb-[14px]">¿Tu empresa está lista para escalar?</h2>
          <p className="text-[16px] leading-[1.7] mb-[26px] text-white/80">Evaluamos si tu negocio tiene las condiciones para crecer de forma rentable y sostenible.</p>
          <AgendarLLamadaButton />
        </aside>
      </article>
    </main>
  );
}
