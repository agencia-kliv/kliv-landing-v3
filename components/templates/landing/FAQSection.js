import HeadSection from "@/components/atoms/HeadSection";
import PullDown from "@/components/atoms/PullDown";
import { useTranslations } from "next-intl";

const FAQSection = () => {
  const t_faq = useTranslations("faq");

  return (
    <section className="landing-section-container" data-aos="fade-bottom">
      <section className="flex flex-col gap-[50px] items-center m-auto max-w-[1191px] w-full">
        <HeadSection>{t_faq("title")}</HeadSection>
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
