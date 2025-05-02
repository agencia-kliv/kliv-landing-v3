"use client";
import AgendarLLamadaButton, {
  AGENDAR_BUTTON_SIZES,
} from "@/components/atoms/AgendarLLamadaButton";
import LogitoSection from "@/components/atoms/LogitoSection";
import SectionSubtitle from "@/components/atoms/SectionSubtitle";
import SectionTitle from "@/components/atoms/SectionTitle";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const HeroSection = () => {
  const router = useRouter();

  const t_globals = useTranslations("globals");
  const t_hero = useTranslations("hero");

  return (
    <div className="relative">
      <section
        className="landing-section-container relative"
        id="inicio"
        data-section="inicio"
      >
        <div className="relative z-10 flex w-full flex-col lg:flex-row gap-[30px] lg:gap-[100px] lg:justify-center items-center text-center max-w-[465px] lg:max-w-full justify-self-center">
          <div className="flex flex-col items-center lg:flex-1 lg:items-center">
            <div className="flex flex-col items-center gap-[30px] lg:gap-[10px] 2xl:gap-[40px] lg:flex-1 lg:items-start lg:text-start">
              <LogitoSection />
              <SectionTitle
                className={"lg:max-w-[300px] 2xl:max-w-[500px]"}
                isLargeText={true}
              >
                {t_hero("title")}
              </SectionTitle>
              <SectionSubtitle className={"lg:max-w-[270px] 2xl:max-w-[472px]"}>
                {t_hero.rich("subtitle", {
                  strong: (chunk) => <strong>{chunk}</strong>,
                })}
              </SectionSubtitle>
              <div className="flex flex-col gap-[30px] lg:flex-col-reverse items-center lg:items-start">
                <div className="flex items-center gap-[10px] py-[20px]">
                  <Image
                    width={144}
                    height={50}
                    src={"/images/meta_partner.png"}
                    alt="meta partner"
                  />
                  <Image
                    width={144}
                    height={50}
                    src={"/images/google_partner.png"}
                    alt="google partner"
                  />
                </div>
                <AgendarLLamadaButton size={AGENDAR_BUTTON_SIZES.LARGE} />
              </div>
            </div>
          </div>
          <div className="w-[90dvw] flex flex-col items-center lg:items-start bg-gradient-to-t from-[#FFFFFF] to-[#00000000] lg:flex-1 ">
            <video
              src="/hero-video.webm"
              className="max-w-[90dvw] lg:max-w-[483px] 2xl:max-w-[672px]"
              autoPlay
              loop
              muted
              playsInline /* ↓ habilita “inline” en móviles */
              webkit-playsinline="true" /* para compatibilidad extra con iOS */
            ></video>
          </div>
        </div>
      </section>
      <div className="absolute top-0 left-0 w-full aspect-square opacity-[4%] lg:w-[50dvw] max-w-[720px]">
        <Image src={"/logito.svg"} alt="" fill={true} />
      </div>
    </div>
    // <section
    //   className="landing-section-container"
    //   data-aos="fade-up"
    //   id="inicio"
    //   data-section="inicio"
    // >
    //   <section className="flex flex-col place-items-stretch sm:grid sm:grid-cols-2">
    //     <article className="flex flex-col justify-center text-center lg:text-start">
    //       <h1 className="text-[32px] lg:text-[44px] text-kliv-text-2 leading-[42px] lg:leading-[56px] py-[10px] lg:py-[5px]">
    //         <Carousel
    //           autoPlay={true}
    //           infiniteLoop={true}
    //           interval={5000}
    //           showArrows={false}
    //           showIndicators={false}
    //           showStatus={false}
    //           showThumbs={false}
    //           preventMovementUntilSwipeScrollTolerance={true}
    //           swipeScrollTolerance={50}
    //           centerMode={false}
    //           emulateTouch={true}
    //         >
    //           <span className="h-full flex lg:text-start flex-col items-center text-center lg:items-start justify-end">
    //             {t_hero("slide1")}
    //           </span>
    //           <span className="h-full flex lg:text-start flex-col items-center text-center lg:items-start justify-end">
    //             {t_hero.rich("slide2", {
    //               br: () => <br></br>,
    //             })}
    //           </span>
    //         </Carousel>

    //         <strong>{t_hero("title")}</strong>
    //       </h1>
    //       <p className="text-base italic py-[10px] lg:py-0">
    //         {t_hero("subtitle")}
    //       </p>
    //       <div className="flex lg:flex-row lg:justify-start justify-center gap-[10px] py-[25px]">
    //         <Button
    //           variant="filled"
    //           onClick={() => {
    //             router.push("#contactanos");
    //           }}
    //         >
    //           {t_globals("startNow")}
    //         </Button>
    //         <Button
    //           variant="outlined"
    //           onClick={() => {
    //             router.push("#servicios");
    //           }}
    //         >
    //           {t_globals("ourServices")}
    //         </Button>
    //       </div>
    //     </article>

    //     <video src="/hero-video.webm" autoPlay loop muted />
    //   </section>
    // </section>
  );
};

export default HeroSection;
