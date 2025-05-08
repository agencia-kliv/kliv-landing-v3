import LogitoSection from "@/components/atoms/LogitoSection";
import PullDown from "@/components/atoms/PullDown";
import SectionTitle from "@/components/atoms/SectionTitle";
import { useTranslations } from "next-intl";
import { useState } from "react";

const FAQSection = () => {
  const t_faq = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState(0); // el primero abierto por defecto

  const handleToggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section className="landing-section-container" data-aos="fade-bottom">
      <section className="flex flex-col gap-[50px] items-center m-auto w-full max-w-[1100px]">
        <div className="flex flex-col gap-[20px] items-center text-center">
          <LogitoSection />
          <SectionTitle>{t_faq("title")}</SectionTitle>
        </div>
        <div className="flex flex-col w-full">
          {[...Array(9)].map((_, index) => (
            <PullDown
              key={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              questionNumber={index + 1}
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default FAQSection;
