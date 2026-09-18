"use client";
import AgendarLLamadaButton, {
  AGENDAR_BUTTON_SIZES,
} from "@/components/atoms/AgendarLLamadaButton";
import LogitoSection from "@/components/atoms/LogitoSection";
import { useTranslations } from "next-intl";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const HeroSection = () => {
  const t_hero = useTranslations("hero");

  return (
    <div className="relative">
      <section
        className="landing-section-container relative"
        id="inicio"
        data-section="inicio"
      >
        <div className="relative z-10 mx-auto flex w-full flex-col lg:flex-row gap-[24px] lg:gap-[48px] xl:gap-[72px] lg:justify-center items-center text-center max-w-[465px] lg:max-w-full">
          <div className="flex min-w-0 w-full flex-col items-center lg:flex-1">
            <div className="flex w-full flex-col items-center gap-[18px] lg:gap-[22px] lg:items-start lg:text-start">
              <figure className="hidden lg:flex">
                <LogitoSection />
              </figure>
              <h1 className="w-full max-w-[520px] text-kliv-secondary">
                <span className="block text-[1rem] leading-[1.5] font-normal text-kliv-tertiary mb-[16px]">
                  {t_hero("kicker")}
                </span>
                <span className="block text-[2rem] sm:text-[2.375rem] lg:text-[2.625rem] leading-[1.15] font-bold">
                  {t_hero("title")}
                </span>
              </h1>
              <p className="max-w-[472px] text-[1.125rem] leading-[1.55] font-normal text-kliv-text-2">
                {t_hero("subtitle")}
              </p>
              <div className="flex flex-col gap-[10px] lg:flex-col-reverse items-center lg:items-start">
                <div className="flex items-center gap-[20px] py-[10px] lg:py-[30px]">
                  <figure className="w-[90px] lg:w-[100px] 2xl:w-[120px] aspect-[2.9] relative">
                    <Image
                      fill={true}
                      src={"/images/meta_partner.png"}
                      alt="meta partner"
                      priority
                      sizes="(max-width: 768px) 90px, 100px"
                    />
                  </figure>
                  <figure className="w-[90px] lg:w-[100px] 2xl:w-[120px] aspect-[2.24] relative">
                    <Image
                      fill={true}
                      src={"/images/google_partner.png"}
                      alt="google partner"
                      priority
                      sizes="(max-width: 768px) 90px, 100px"
                    />
                  </figure>
                </div>
                <AgendarLLamadaButton size={AGENDAR_BUTTON_SIZES.LARGE} />
              </div>
            </div>
          </div>
          <div className="min-w-0 w-full flex flex-col items-center lg:items-start bg-gradient-to-t from-[#FFFFFF] to-[#00000000] lg:flex-1">
            <video
              src="/hero-video.webm"
              poster="/hero-video-poster.jpg"
              preload="metadata"
              className="w-full max-w-full h-auto"
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
        <Image
          src={"/logito.svg"}
          alt=""
          fill={true}
          loading="lazy"
          aria-hidden="true"
        />
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
