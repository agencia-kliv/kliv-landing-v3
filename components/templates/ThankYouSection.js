import { useTranslations } from "next-intl";
import Image from "next/image";
import { MdArrowDownward } from "react-icons/md";
import LogitoSection from "../atoms/LogitoSection";
import SectionSubtitle from "../atoms/SectionSubtitle";
import SectionTitle from "../atoms/SectionTitle";
import FAQSection from "./landing/FAQSection";

const ThankYouSection = () => {
  const t = useTranslations("thankYou");

  return (
    <>
      <section
        className="landing-section-container flex flex-col gap-[50px]"
        // data-aos="fade-up"
        id="thank-you"
        data-section="thank-you"
      >
        <section className="flex flex-col place-items-center py-[20px] gap-[40px] text-center items-center">
          <div className="flex flex-col gap-[20px] items-center">
            <LogitoSection />
            <SectionTitle
              className={
                "lg:max-w-[450px] 2xl:max-w-[550px] whitespace-pre-wrap"
              }
            >
              {t("title")}
            </SectionTitle>
            <SectionSubtitle className={"lg:max-w-[350px] 2xl:max-w-[550px]"}>
              {t("subtitle")}
            </SectionSubtitle>
          </div>
          <span className="text-[22px] text-white bg-kliv-tertiary rounded-full p-[10px]">
            <MdArrowDownward />
          </span>
          <div className="flex flex-col gap-[40px] items-center">
            <span className="text-[20px] py-[6px] px-[30px] pr-[40px] font-[800] bg-kliv-primary rounded-[0_1000px_0_0] text-white">
              {t("step1")}
            </span>
            <p className="text-[20px] leading-[30px] font-[800] lg:max-w-[400px]">
              {t("step1Text")}
            </p>
            <div className="w-full aspect-video border-[1px] border-kliv-primary rounded-[10px]"></div>
          </div>
          <div className="flex flex-col gap-[40px] items-center">
            <span className="text-[20px] py-[6px] px-[30px] pr-[40px] font-[800] bg-kliv-primary rounded-[0_1000px_0_0] text-white">
              {t("step2")}
            </span>
            <p className="text-[20px] leading-[30px] font-[800]  lg:max-w-[400px]">
              {t("step2Text")}
            </p>
            <button
              type="button"
              onClick={() => {
                window.open("https://bit.ly/ClavesPerformance", "_blank");
              }}
              className="p-[20px] rounded-full bg-kliv-tertiary w-[90px] h-[90px] flex justify-center items-center"
            >
              <figure className="w-full h-full relative">
                <Image
                  src={"/illustrations/typ-1.svg"}
                  alt=""
                  fill
                  objectFit="contain"
                />
              </figure>
            </button>
          </div>
          <div className="flex flex-col gap-[40px] items-center">
            <span className="text-[20px] py-[6px] px-[30px] pr-[40px] font-[800] bg-kliv-primary rounded-[0_1000px_0_0] text-white">
              {t("step3")}
            </span>
            <p className="text-[20px] leading-[30px] font-[800]  lg:max-w-[400px] whitespace-pre-wrap">
              {t("step3Text")}
            </p>
            <button
              type="button"
              onClick={() => {
                window.open("https://bit.ly/AuditoriaKLIV", "_blank");
              }}
              className="p-[20px] rounded-full bg-kliv-tertiary w-[90px] h-[90px] flex justify-center items-center"
            >
              <figure className="w-full h-full relative">
                <Image
                  src={"/illustrations/typ-1.svg"}
                  alt=""
                  fill
                  objectFit="contain"
                />
              </figure>
            </button>
          </div>
        </section>
        <section className="flex flex-col place-items-center py-[20px] gap-[20px] text-center items-center lg:flex-row-reverse lg:items-end lg:gap-[100px] max-w-[1270px] mx-auto">
          <div className="flex flex-col items-center gap-[20px] lg:flex-[3] lg:items-start lg:text-left">
            <LogitoSection />
            <SectionTitle>{t("aboutUs")}</SectionTitle>
            <SectionSubtitle>
              {t.rich("aboutUsText", {
                strong: (children) => <strong>{children}</strong>,
              })}
            </SectionSubtitle>
          </div>
          <div className="w-full rounded-[30px] aspect-square relative overflow-hidden lg:flex-[2]">
            <figure className="absolute w-[90%] bottom-0 left-1/4 aspect-square">
              <Image src={"/teamPhotos/gonzalo-nazar.webp"} alt="" fill />
            </figure>
            <figure className="absolute w-[90%] bottom-0 right-1/4 aspect-square">
              <Image src={"/teamPhotos/agustin-ibanez.webp"} alt="" fill />
            </figure>
          </div>
        </section>

        <FAQSection />
      </section>
      <section className="w-full bg-kliv-secondary p-[50px] text-center">
        <span className="text-[30px] font-[700] text-white text-center">
          {t("seeYouLater")}
        </span>
      </section>
    </>
  );
};

export default ThankYouSection;
