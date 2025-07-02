import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import LogitoSection from "../atoms/LogitoSection";
import SectionSubtitle from "../atoms/SectionSubtitle";
import SectionTitle from "../atoms/SectionTitle";
import FAQSection from "./landing/FAQSection";
import PartnersSection from "./landing/partners/PartnersSection";
import TestimonialsSection from "./landing/TestimonialsSection";

const ThankYouSection = () => {
  const t = useTranslations("thankYou");

  const locale = useLocale();

  console.log(locale);

  return (
    <>
      <section
        className="landing-section-container flex flex-col gap-[50px] !pb-[0] relative"
        // data-aos="fade-up"
        id="thank-you"
        data-section="thank-you"
      >
        <div className="absolute top-0 left-0 w-full aspect-square opacity-[4%] lg:w-[50dvw] max-w-[720px]">
          <Image src={"/logito.svg"} alt="" fill={true} />
        </div>
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
          <section className="w-full max-w-[900px] flex flex-col gap-[20px] lg:gap-[40px]">
            <div className="w-full items-center flex flex-col gap-[20px] border-[2px] border-kliv-secondary rounded-[10px] p-[20px]">
              <div className="max-w-max flex items-center gap-[15px]">
                <LogitoSection className="shrink-0" />
                <SectionSubtitle className={"text-left !text-[16px]"}>
                  <strong>{t("step1")}</strong>: {t("step1Text")}
                </SectionSubtitle>
              </div>
              <video
                className="aspect-[4_/_5] w-full h-auto md:w-auto md:h-[70dvh] !max-h-[1200px] rounded-[10px] object-cover overflow-hidden"
                controls
              >
                <source
                  src={`/videos/thank-you-video-${locale}.mp4`}
                  type="video/mp4"
                />
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
                    if (locale === "es") {
                      window.open(
                        "https://drive.google.com/file/d/1YeghuT5A8iS6qUAOAZjI18P81b9AZYYd/view?usp=drive_link",
                        "_blank"
                      );
                    } else {
                      window.open(
                        "https://drive.google.com/file/d/114kuK6bZbv5PrlyLDlVfQ6NcgcXy-81k/view?usp=drive_link ",
                        "_blank"
                      );
                    }
                  }}
                >
                  <Image
                    src={
                      locale === "es"
                        ? "/images/pdf-ty-page.png"
                        : "/images/pdf-ty-page-eng.png"
                    }
                    alt="pdf"
                    fill
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="w-full items-center flex flex-col justify-between gap-[20px] border-[2px] border-kliv-secondary rounded-[10px] p-[20px]">
                <div className="max-w-max flex items-start gap-[15px]">
                  <LogitoSection className="shrink-0" />
                  <SectionSubtitle className={"text-left !text-[16px]"}>
                    <strong>{t("step3")}</strong>: {t("step3Text")}
                  </SectionSubtitle>
                </div>
                <div
                  className="cajita-thank-you w-full relative aspect-square cursor-pointer grid place-items-center rounded-[10px] overflow-hidden"
                  onClick={() => {
                    if (locale === "es") {
                      window.open("https://bit.ly/AuditoriaKLIV", "_blank");
                    } else {
                      window.open(
                        "https://docs.google.com/forms/d/e/1FAIpQLSfOA8OwLgHY4-qy2N_Qzpi6eQj6-Qz4yBj7fiijsyqbpKbTOw/viewform",
                        "_blank"
                      );
                    }
                  }}
                >
                  <Image
                    src={
                      locale === "es"
                        ? "/images/form-ty-page.png"
                        : "/images/form-ty-page-eng.png"
                    }
                    alt="pdf"
                    fill
                    objectFit="cover"
                  />
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
          <div className="flex flex-col items-center gap-[20px] lg:flex-[3] lg:items-start lg:text-left lg:mb-[30px]">
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

      <PartnersSection />
      <TestimonialsSection />

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
