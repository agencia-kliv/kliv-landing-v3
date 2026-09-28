"use client";
import AgendarLLamadaButton from "@/components/atoms/AgendarLLamadaButton";
import SectionSubtitle from "@/components/atoms/SectionSubtitle";
import SectionTitle from "@/components/atoms/SectionTitle";
import TallyEmbed from "@/components/organisms/TallyEmbed";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { QUIZ_SOURCE_KEY } from "@/components/templates/blog/BlogQuizPrompt";

function quizSource() {
  try {
    const article = window.sessionStorage.getItem(QUIZ_SOURCE_KEY);
    return article ? { source: "blog_prompt", article } : {};
  } catch {
    return {};
  }
}

const Page = () => {
  const t = useTranslations("quiz");

  const [formCompleted, setFormCompleted] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let tracked = false;

    const handler = (e) => {
      // Tally.FormSubmitted es la señal de envío. Solo se acepta desde el
      // iframe de Tally: cualquier otra ventana podría inventar un envío.
      if (e.origin !== "https://tally.so") return;
      if (typeof e?.data !== "string" || !e.data.includes("Tally.FormSubmitted")) return;

      setFormCompleted(true);

      const payload = JSON.parse(e.data).payload;
      const scoreItem = payload?.fields?.find(
        (item) => item.type === "CALCULATED_FIELDS"
      );
      const score = Number(scoreItem?.answer?.value);
      const qualified = score >= 7;

      if (qualified) {
        setShowButton(true);
      }

      // Envío del quiz a GA4. Solo el puntaje, nunca las respuestas: pueden
      // traer datos personales. Si llegó desde la tarjeta del blog,
      // BlogQuizPrompt dejó el artículo en la sesión.
      if (!tracked) {
        tracked = true;
        window.gtag?.("event", "quiz_submit", {
          ...(Number.isFinite(score) && { score }),
          qualified,
          ...quizSource(),
        });
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
          <SectionTitle as="h1" className={"w-full text-center"}>
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
