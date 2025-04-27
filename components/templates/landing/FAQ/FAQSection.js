import HeadSection from "@/components/atoms/HeadSection";
import PullDown from "@/components/atoms/PullDown";
import { useTranslations } from "next-intl";
import FAQData from "./FAQData.json";

const FAQSection = () => {
  const t_faq = useTranslations("faq");

  return (
    <section className="landing-section-container" data-aos="fade-bottom">
      <section className="flex flex-col gap-[50px] items-center m-auto max-w-[761px] w-full">
        <HeadSection>{t_faq("title")}</HeadSection>
        <div className="flex flex-col gap-[0px] w-full">
          {FAQData.map((item, index) => (
            <PullDown
              key={item.id}
              startOpened={index === 0}
              questionNumber={index + 1}
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default FAQSection;
