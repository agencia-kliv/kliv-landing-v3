"use client";
import SectionSubtitle from "@/components/atoms/SectionSubtitle";
import SectionTitle from "@/components/atoms/SectionTitle";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";

const Page = () => {
  const t = useTranslations("bookACall");

  const router = useRouter();
  const locale = useLocale();

  useCalendlyEventListener({
    onProfilePageViewed: () => console.log("onProfilePageViewed"),
    onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
    onEventTypeViewed: () => console.log("onEventTypeViewed"),
    onEventScheduled: () => {
      router.replace(`/${locale}/thank-you`);
    },
    onPageHeightResize: (e) => console.log(e.data.payload.height),
  });

  return (
    <section
      className="landing-section-container relative !mb-[80px] !my-0 lg:!mb-0 !lg:my-[20px]"
      id="servicios"
      data-section="servicios"
    >
      <div className="w-full flex flex-col gap-[40px] text-left items-stretch mx-auto max-w-[1350px]">
        <div className="w-full flex flex-col gap-[32px] items-center max-w-[900px] mx-auto  animate-fade-in">
          <SectionTitle className={"w-full text-center"}>
            {t("title")}
          </SectionTitle>

          <div className="text-left flex flex-col gap-[20px] items-center w-full">
            <SectionSubtitle>{t("text1")}</SectionSubtitle>
            <SectionSubtitle>{t("text2")}</SectionSubtitle>
            {/* <SectionSubtitle className={"italic mt-[-20px] mb-[-20px]"}>
                {t_services("iaBoost")}
              </SectionSubtitle> */}
          </div>
        </div>
        <div className="w-full h-[1100px] lg:h-[1800px] animate-fade-in-large">
          <InlineWidget
            url={
              locale === "es"
                ? "https://calendly.com/auditoria-kliv/30min"
                : "https://calendly.com/agenciakliv/audit"
            }
            styles={{
              width: "100%",
              height: "inherit", // ajusta este valor hasta que desaparezca el scroll
              minWidth: "320px", // opcional, para móviles
            }}
          />
        </div>
      </div>
    </section>
    // <section className="landing-section-container !max-w-[1118px] m-auto">
    //   <div className="w-full relative flex flex-col gap-[20px] items-center text-center">
    //     <LogitoSection />
    //     <p className="text-[14px] gap-[1px] lg:[&_span:first-child]:border-r-[1px] lg:[&_span:not(first-child)]:ml-[20px] lg:[&_span:first-child]:pr-[20px]  leading-[33px] grid lg:grid-cols-2">
    //       {t.rich("text", {
    //         span: (chunks) => (
    //           <span className="pb-[20px] mt-[20px] border-b-[1px] lg:border-b-0 tracking-tight text-left">
    //             {chunks}
    //           </span>
    //         ),
    //       })}
    //     </p>
    //     <div className="w-full h-[1100px] lg:h-[1800px]">
    //       <InlineWidget
    //         url={
    //           locale === "es"
    //             ? "https://calendly.com/auditoria-kliv/30min"
    //             : "https://calendly.com/agenciakliv/audit"
    //         }
    //         styles={{
    //           width: "100%",
    //           height: "inherit", // ajusta este valor hasta que desaparezca el scroll
    //           minWidth: "320px", // opcional, para móviles
    //         }}
    //       />
    //     </div>
    //   </div>
    // </section>
  );
};

export default Page;
