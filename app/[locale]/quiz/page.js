"use client";
import AgendarLLamadaButton from "@/components/atoms/AgendarLLamadaButton";
import SectionSubtitle from "@/components/atoms/SectionSubtitle";
import SectionTitle from "@/components/atoms/SectionTitle";
import TallyEmbed from "@/components/organisms/TallyEmbed";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const Page = () => {
  const t = useTranslations("quiz");

  const [formCompleted, setFormCompleted] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // Dentro de un componente client o en un useEffect:
  useEffect(() => {
    const handler = (e) => {
      // Tally.FormSubmitted es la señal de envío
      if (e?.data?.includes("Tally.FormSubmitted")) {
        setFormCompleted(true);

        const payload = JSON.parse(e.data).payload;
        console.log("Formulario enviado:", payload);
        // aquí tu lógica: cerrar modal, mostrar gracias, etc.

        const scoreItem = payload?.fields?.find(
          (item) => item.type === "CALCULATED_FIELDS"
        );
        if (scoreItem?.answer?.value >= 7) {
          setShowButton(true);
        }
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <section
      className="landing-section-container relative !mb-[80px] !my-0 lg:!mb-0 !lg:my-[20px] animate-fade-in"
      id="servicios"
      data-section="servicios"
    >
      <div className="w-full flex flex-col gap-[10px] text-left items-stretch mx-auto max-w-[900px] ">
        <div className="w-full flex flex-col gap-[32px] items-center mb-[20px]">
          <SectionTitle className={"w-full text-center"}>
            {t("title")}
          </SectionTitle>

          {!formCompleted && (
            <div className="text-left flex flex-col gap-[10px] items-center w-full">
              <SectionSubtitle>
                <strong>{t("question")}</strong>
              </SectionSubtitle>
              <SectionSubtitle>{t("text")}</SectionSubtitle>
            </div>
          )}
        </div>
        <TallyEmbed />
        {showButton && (
          <footer className="flex items-center justify-center w-full animate-fade-in">
            <AgendarLLamadaButton definitive={true} />
          </footer>
        )}
      </div>
    </section>
  );
};

export default Page;
