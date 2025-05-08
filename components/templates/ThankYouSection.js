import { useTranslations } from "next-intl";
import Image from "next/image";
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
        <section className="flex flex-col place-items-center gap-[40px] text-center items-center">
          <div className="flex flex-col gap-[20px] items-center">
            <div className="hidden lg:block">
              <LogitoSection />
            </div>
            <SectionTitle className={""}>{t("title")}</SectionTitle>
            <SectionSubtitle className={"lg:max-w-[350px] 2xl:max-w-[520px]"}>
              {t("subtitle")}
            </SectionSubtitle>
          </div>
          {/* <span className="text-[22px] text-white bg-kliv-tertiary rounded-full p-[10px]">
            <MdArrowDownward />
          </span> */}
          <section className="w-full max-w-[900px] flex flex-col gap-[40px]">
            <div className="w-full items-center flex flex-col gap-[20px] border-[2px] border-kliv-secondary rounded-[10px] p-[20px]">
              <div className="max-w-max flex items-center gap-[15px]">
                <LogitoSection />
                <SectionSubtitle className={"text-left !text-[16px]"}>
                  <strong>{t("step1")}</strong>: {t("step1Text")}
                </SectionSubtitle>
              </div>
              <video className="w-full aspect-video" controls>
                <source src="/videos/thank-you-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-[20px] items-stretch">
              <div className="w-full items-center flex flex-col justify-between gap-[20px] border-[2px] border-kliv-secondary rounded-[10px] p-[20px]">
                <div className="max-w-max flex items-center gap-[15px]">
                  <LogitoSection className="shrink-0" />
                  <SectionSubtitle className={"text-left !text-[16px]"}>
                    <strong>{t("step2")}</strong>: {t("step2Text")}
                  </SectionSubtitle>
                </div>
                <div
                  className="cajita-thank-you  w-full relative aspect-square cursor-pointer grid place-items-center rounded-[10px] overflow-hidden"
                  onClick={() => {
                    window.open("https://bit.ly/ClavesPerformance", "_blank");
                  }}
                >
                  <Image src={"/images/pdf-ty-page.png"} alt="pdf" fill />
                </div>
              </div>
              <div className="w-full items-center flex flex-col justify-between gap-[20px] border-[2px] border-kliv-secondary rounded-[10px] p-[20px]">
                <div className="max-w-max flex items-center gap-[15px]">
                  <LogitoSection className="shrink-0" />
                  <SectionSubtitle className={"text-left !text-[16px]"}>
                    <strong>{t("step3")}</strong>: {t("step3Text")}
                  </SectionSubtitle>
                </div>
                <div
                  className="cajita-thank-you w-full relative aspect-square cursor-pointer grid place-items-center rounded-[10px] overflow-hidden"
                  onClick={() => {
                    window.open("https://bit.ly/AuditoriaKLIV", "_blank");
                  }}
                >
                  <Image src={"/images/form-ty-page.png"} alt="pdf" fill />
                  {/* <FaWpforms size={172} /> */}
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>

      <section
        className="landing-section-container flex flex-col gap-[50px]"
        // data-aos="fade-up"
        id="thank-you"
        data-section="thank-you"
      >
        <section className="flex flex-col place-items-center py-[20px] gap-[20px] text-center items-center lg:flex-row-reverse lg:items-end lg:gap-[100px] max-w-[1270px] mx-auto">
          <div className="flex flex-col items-center gap-[20px] lg:flex-[3] lg:items-start lg:text-left">
            <LogitoSection />
            <SectionTitle>{t("aboutUs")}</SectionTitle>
            <SectionSubtitle className={"whitespace-pre-wrap"}>
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
      </section>

      <FAQSection />

      <section className="w-full bg-kliv-secondary p-[50px] text-center">
        <span className="text-[30px] font-[700] text-white text-center">
          {t("seeYouLater")}
        </span>
      </section>
    </>
  );
};

export default ThankYouSection;
