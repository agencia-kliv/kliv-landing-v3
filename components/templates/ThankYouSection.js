import { useTranslations } from "next-intl";

const ThankYouSection = () => {
  const t = useTranslations("thankYou");

  return (
    <section
      className="landing-section-container"
      // data-aos="fade-up"
      id="thank-you"
      data-section="thank-you"
    >
      <section className="flex flex-col place-items-stretch py-[20px] gap-[10px] text-center items-center">
        <h1 className="text-[32px] lg:text-[44px] text-kliv-text-2 py-[10px] lg:py-[5px]">
          {t("title")}
        </h1>
        <p className="text-base max-w-[306px] py-[10px] lg:py-0">
          {t("content")}
        </p>
      </section>
    </section>
  );
};

export default ThankYouSection;
