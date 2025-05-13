import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MdPause, MdPlayArrow } from "react-icons/md";

const TestimonialCard = ({
  id,
  logo,
  name,
  video,
  text,
  innerRef,
  reproducingVideoID,
  onVideoPlay = () => {},
  onVideoPause = () => {},
}) => {
  const t = useTranslations("testimonials");
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const togglePlay = () => {
    if (isPlaying) {
      onVideoPause();
    } else {
      onVideoPlay();
    }

    return;

    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (!videoRef.current) return;

    if (reproducingVideoID === id && isVisible) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [reproducingVideoID, videoRef, id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      {
        threshold: 0.1, // Ajusta este valor según lo que consideres "en pantalla"
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const locale = useLocale();

  return (
    <div
      id={id}
      ref={innerRef}
      className="mb-[60px] w-full  px-[5px] max-w-[450px]"
    >
      <div className="aspect-[0.68] w-full p-[20px_30px] flex flex-col gap-[10px] bg-[url(/shapes/folder-testimony.svg)] bg-contain bg-center bg-no-repeat">
        <header className="flex flex-col gap-[0px] items-start select-none">
          <figure className="relative w-[40%] aspect-[1.9] md:w-[130px] md:h-[80px] translate-x-[-10px] translate-y-[-10px]">
            <Image
              src={logo}
              alt={name}
              width={280}
              height={80}
              className="-translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 absolute"
              quality={100}
              draggable={false}
            />
          </figure>
          <div className="flex flex-col items-start gap-[0px]">
            <h5 className="text-[22px] lg:text-[18px] font-[700] text-kliv-primary">
              {name}
            </h5>
            {/* {(company || position) && (
            <div className="flex flex-col items-start">
              <h6 className="text-[18px] font-[400] leading-[25px] text-kliv-primary">
                {company}
              </h6>
              {position && (
                <span className="text-[18px] font-[400] leading-[25px] text-kliv-primary">
                  {position}
                </span>
              )}
            </div>
          )} */}
          </div>
        </header>
        <section
          className={`${
            video ? "overflow-hidden" : "overflow-auto"
          } flex-1 w-full relative`} // añadimos relative para el overlay
        >
          {video ? (
            <>
              {/* El vídeo repite tus clases tal cual */}
              <video
                ref={videoRef}
                src={`${
                  locale === "es"
                    ? video
                    : `${video.split(".mp4")[0] + "-eng.mp4"}`
                }#t=0.001`}
                playsInline
                preload="metadata"
                controls={false} // quitamos controles nativos
                className="aspect-[4_/_5] mx-auto object-cover rounded-[30px]"
                onClick={togglePlay}
              />

              {/* Overlay: sólo visible al hover o si está pausado */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                  hovered ? "opacity-100" : "opacity-0"
                }`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onTouchStart={() => setHovered(true)} // ← touch support
                onTouchEnd={() => setHovered(false)} // ← touch support
              >
                <button
                  onClick={togglePlay}
                  className="bg-black bg-opacity-30 rounded-full p-2"
                >
                  {isPlaying ? (
                    <MdPause size={32} className="text-white" />
                  ) : (
                    <MdPlayArrow size={32} className="text-white" />
                  )}
                </button>
              </div>
            </>
          ) : (
            <p className="text-[14px] sm:text-[14px] lg:text-[16px] leading-normal text-kliv-text-2 select-none whitespace-pre-wrap">
              {t(text)}
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default TestimonialCard;
