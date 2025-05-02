import LogitoSection from "@/components/atoms/LogitoSection";
import PullDown from "@/components/atoms/PullDown";
import SectionTitle from "@/components/atoms/SectionTitle";
import { useTranslations } from "next-intl";

const FAQSection = () => {
  const t_faq = useTranslations("faq");

  return (
    <section className="landing-section-container" data-aos="fade-bottom">
      <section className="flex flex-col gap-[50px] items-center m-auto max-w-[1191px] w-full">
        <div className="flex flex-col gap-[20px] items-center text-center">
          <LogitoSection />
          <SectionTitle>{t_faq("title")}</SectionTitle>
        </div>
        <div className="flex flex-col gap-[10px] w-full">
          {[...Array(9)].map((item, index) => (
            <PullDown
              key={index}
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
