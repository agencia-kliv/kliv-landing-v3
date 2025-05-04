"use client";
import LogitoSection from "@/components/atoms/LogitoSection";
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
    onEventScheduled: (e) => {
      router.replace(`/${locale}/thank-you`);
    },
    onPageHeightResize: (e) => console.log(e.data.payload.height),
  });

  return (
    <section className="landing-section-container !max-w-[1118px] m-auto">
      <div className="w-full relative flex flex-col gap-[20px] items-center text-center">
        <LogitoSection />
        <p className="text-[14px] gap-[1px] lg:[&_span:first-child]:border-r-[1px] lg:[&_span:not(first-child)]:ml-[20px] lg:[&_span:first-child]:pr-[20px]  leading-[33px] grid lg:grid-cols-2">
          {t.rich("text", {
            span: (chunks) => (
              <span className="pb-[20px] mt-[20px] border-b-[1px] lg:border-b-0 tracking-tight text-left">
                {chunks}
              </span>
            ),
          })}
        </p>
        <div className="w-full h-[1100px] lg:h-[1800px]">
          <InlineWidget
            url="https://calendly.com/auditoria-kliv/30min"
            styles={{
              width: "100%",
              height: "inherit", // ajusta este valor hasta que desaparezca el scroll
              minWidth: "320px", // opcional, para móviles
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
