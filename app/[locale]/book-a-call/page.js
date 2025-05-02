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
        <p className="text-[18px] md:text-[22px] leading-[33px]">
          {t.rich("text", {
            br: () => <br />,
          })}
        </p>
        <InlineWidget
          url="https://calendly.com/auditoria-kliv/30min"
          styles={{
            width: "100%",
            height: "800px", // ajusta este valor hasta que desaparezca el scroll
            minWidth: "320px", // opcional, para móviles
          }}
        />
      </div>
    </section>
  );
};

export default Page;
