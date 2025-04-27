import HeadSection from "@/components/atoms/HeadSection";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const SvgComponent1 = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    id="Layer_1"
    x={0}
    y={0}
    className="col-10 col-lg-5"
    style={{
      enableBackground: "new 0 0 255 255",
      cursor: "pointer",
    }}
    width={props.size || 325}
    height={props.size || 325}
    viewBox="0 0 255 255"
    {...props}
  >
    <style>
      {
        ".st0-svg1{fill:#1d7a5f}.filledP-svg1{fill:#0a362a}.st1{fill:none}.st2{fill:#fff}.st3,.st4{font-size:50px !important}"
      }
    </style>
    <image
      href="/kliv-isotipo-green.png"
      width={1241}
      height={1241}
      style={{
        overflow: "visible",
      }}
      transform="matrix(.09883 0 0 .09883 66.392 66.764)"
    />
    <g id="flecha3-svg1" className="paso3-svg1">
      <path
        d="m2.7 130.9 34.9-21.2L71.9 131l.2.2c1.6 19.9 14.3 37.9 32.6 46 5.2 2.3 10.8 3.8 16.5 4.4h.2L100 217.2l21.1 34.1h-.3c-13.8-.7-27.4-3.8-40.1-9-22-8.9-41.2-24.1-54.9-43.4C11.7 179.1 3.5 155.3 2.6 131l.1-.1z"
        className="st0-svg1"
        id="flecha3-path-svg1"
      />
    </g>
    <g id="flecha4-svg1" className="paso4-svg1">
      <path
        d="m123.9 2.6 21.2 34.9-21.4 34.4-.2.2c-19.9 1.6-37.9 14.3-46 32.6-2.3 5.2-3.8 10.8-4.4 16.5v.2L37.6 99.9 3.4 121v-.3c.7-13.8 3.8-27.4 9-40.1 8.9-22 24.1-41.2 43.4-54.9C75.6 11.4 99.3 3.3 123.7 2.4l.2.2z"
        className="st0-svg1"
        id="flecha4-path-svg1"
      />
    </g>
    <g id="flecha1-svg1" className="paso1-svg1">
      <path
        d="m252.5 123.5-34.9 21.2-34.4-21.4-.2-.2c-1.6-19.9-14.3-37.9-32.6-46-5.2-2.3-10.8-3.8-16.5-4.4h-.2l21.5-35.6-21.1-34h.3c13.8.7 27.4 3.8 40.1 9 22 8.9 41.2 24.1 54.9 43.4 14.1 19.8 22.3 43.6 23.2 67.9l-.1.1z"
        id="flecha1-path-svg1"
        className="filledP-svg1"
      />
    </g>
    <g id="flecha2-svg1" className="paso2">
      <path
        d="m131.4 251.7-21.2-34.9 21.4-34.4.2-.2c19.9-1.6 37.9-14.3 46-32.6 2.3-5.2 3.8-10.8 4.4-16.5v-.2l35.6 21.5 34.1-21.1v.3c-.7 13.8-3.8 27.4-9 40.1-8.9 22-24.1 41.2-43.4 54.9-19.8 14.1-43.6 22.3-67.9 23.2l-.2-.1z"
        className="st0-svg1"
        id="flecha2-path-svg1"
      />
    </g>
    <path
      d="M55.6 36.6H93v43.2H55.6z"
      className="st1 paso4"
      id="flecha4-st1-svg1"
    />
    <text
      className="st2 st3 st4 paso4"
      transform="translate(55.64 72.36)"
      id="flecha4-text"
    >
      {"4"}
    </text>
    <path
      d="M187 57.2h37.4v43.2H187z"
      className="st1 paso1"
      id="flecha1-st1-svg1"
    />
    <text
      className="st2 st3 st4 paso1"
      transform="translate(187 92.96)"
      id="flecha1-text"
    >
      {"1"}
    </text>
    <path
      d="M169.3 180.5h37.4v43.2h-37.4z"
      className="st1 paso2"
      id="flecha2-st2"
    />
    <text
      className="st2 st3 st4 paso2"
      transform="translate(169.325 216.266)"
      id="flecha2-text"
    >
      {"2"}
    </text>
    <path
      d="M41.7 160.8h37.4V204H41.7z"
      className="st1 paso3"
      id="flecha3-st3"
    />
    <text
      className="st2 st3 st4 paso3"
      transform="translate(41.672 196.617)"
      id="flecha3-text"
    >
      {"3"}
    </text>
  </svg>
);
const SvgComponent2 = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    id="Layer_2"
    x={0}
    y={0}
    className="col-10 col-lg-5"
    style={{
      enableBackground: "new 0 0 255 255",
      cursor: "pointer",
    }}
    width={props.size || 325}
    height={props.size || 325}
    viewBox="0 0 255 255"
    {...props}
  >
    <style>
      {
        ".st0-svg2{fill:#1d7a5f}.filledP2{fill:#0a362a}.st1{fill:none}.st2{fill:#fff}.st3,.st4{font-size:50px !important}"
      }
    </style>
    <image
      href="/kliv-isotipo-green.png"
      width={1241}
      height={1241}
      style={{
        overflow: "visible",
      }}
      transform="matrix(.09883 0 0 .09883 66.392 66.764)"
    />
    <g id="flecha3" className="paso3">
      <path
        d="m2.7 130.9 34.9-21.2L71.9 131l.2.2c1.6 19.9 14.3 37.9 32.6 46 5.2 2.3 10.8 3.8 16.5 4.4h.2L100 217.2l21.1 34.1h-.3c-13.8-.7-27.4-3.8-40.1-9-22-8.9-41.2-24.1-54.9-43.4C11.7 179.1 3.5 155.3 2.6 131l.1-.1z"
        className="st0-svg2"
        id="flecha3-path"
      />
    </g>
    <g id="flecha4" className="paso4">
      <path
        d="m123.9 2.6 21.2 34.9-21.4 34.4-.2.2c-19.9 1.6-37.9 14.3-46 32.6-2.3 5.2-3.8 10.8-4.4 16.5v.2L37.6 99.9 3.4 121v-.3c.7-13.8 3.8-27.4 9-40.1 8.9-22 24.1-41.2 43.4-54.9C75.6 11.4 99.3 3.3 123.7 2.4l.2.2z"
        className="st0-svg2"
        id="flecha4-path"
      />
    </g>
    <g id="flecha1" className="paso1">
      <path
        d="m252.5 123.5-34.9 21.2-34.4-21.4-.2-.2c-1.6-19.9-14.3-37.9-32.6-46-5.2-2.3-10.8-3.8-16.5-4.4h-.2l21.5-35.6-21.1-34h.3c13.8.7 27.4 3.8 40.1 9 22 8.9 41.2 24.1 54.9 43.4 14.1 19.8 22.3 43.6 23.2 67.9l-.1.1z"
        className="st0-svg2"
        id="flecha1-path"
      />
    </g>
    <g id="flecha2" className="paso2">
      <path
        d="m131.4 251.7-21.2-34.9 21.4-34.4.2-.2c19.9-1.6 37.9-14.3 46-32.6 2.3-5.2 3.8-10.8 4.4-16.5v-.2l35.6 21.5 34.1-21.1v.3c-.7 13.8-3.8 27.4-9 40.1-8.9 22-24.1 41.2-43.4 54.9-19.8 14.1-43.6 22.3-67.9 23.2l-.2-.1z"
        className="filledP2"
        id="flecha2-path"
      />
    </g>
    <path d="M55.6 36.6H93v43.2H55.6z" className="st1 paso4" id="flecha4-st1" />
    <text
      className="st2 st3 st4 paso4"
      transform="translate(55.64 72.36)"
      id="flecha4-text"
    >
      {"4"}
    </text>
    <path d="M187 57.2h37.4v43.2H187z" className="st1 paso1" id="flecha1-st1" />
    <text
      className="st2 st3 st4 paso1"
      transform="translate(187 92.96)"
      id="flecha1-text"
    >
      {"1"}
    </text>
    <path
      d="M169.3 180.5h37.4v43.2h-37.4z"
      className="st1 paso2"
      id="flecha2-st2"
    />
    <text
      className="st2 st3 st4 paso2"
      transform="translate(169.325 216.266)"
      id="flecha2-text"
    >
      {"2"}
    </text>
    <path
      d="M41.7 160.8h37.4V204H41.7z"
      className="st1 paso3"
      id="flecha3-st3"
    />
    <text
      className="st2 st3 st4 paso3"
      transform="translate(41.672 196.617)"
      id="flecha3-text"
    >
      {"3"}
    </text>
  </svg>
);
const SvgComponent3 = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    id="Layer_3"
    x={0}
    y={0}
    className="col-10 col-lg-5"
    style={{
      enableBackground: "new 0 0 255 255",
      cursor: "pointer",
    }}
    width={props.size || 325}
    height={props.size || 325}
    viewBox="0 0 255 255"
    {...props}
  >
    <style>
      {
        ".st0{fill:#1d7a5f}.filledP3{fill:#0a362a}.st1{fill:none}.st2{fill:#fff}.st3,.st4{font-size:50px !important}"
      }
    </style>
    <image
      href="/kliv-isotipo-green.png"
      width={1241}
      height={1241}
      style={{
        overflow: "visible",
      }}
      transform="matrix(.09883 0 0 .09883 66.392 66.764)"
    />
    <g id="flecha3" className="paso3">
      <path
        d="m2.7 130.9 34.9-21.2L71.9 131l.2.2c1.6 19.9 14.3 37.9 32.6 46 5.2 2.3 10.8 3.8 16.5 4.4h.2L100 217.2l21.1 34.1h-.3c-13.8-.7-27.4-3.8-40.1-9-22-8.9-41.2-24.1-54.9-43.4C11.7 179.1 3.5 155.3 2.6 131l.1-.1z"
        className="filledP3"
        id="flecha3-path"
      />
    </g>
    <g id="flecha4" className="paso4">
      <path
        d="m123.9 2.6 21.2 34.9-21.4 34.4-.2.2c-19.9 1.6-37.9 14.3-46 32.6-2.3 5.2-3.8 10.8-4.4 16.5v.2L37.6 99.9 3.4 121v-.3c.7-13.8 3.8-27.4 9-40.1 8.9-22 24.1-41.2 43.4-54.9C75.6 11.4 99.3 3.3 123.7 2.4l.2.2z"
        className="st0"
        id="flecha4-path"
      />
    </g>
    <g id="flecha1" className="paso1">
      <path
        d="m252.5 123.5-34.9 21.2-34.4-21.4-.2-.2c-1.6-19.9-14.3-37.9-32.6-46-5.2-2.3-10.8-3.8-16.5-4.4h-.2l21.5-35.6-21.1-34h.3c13.8.7 27.4 3.8 40.1 9 22 8.9 41.2 24.1 54.9 43.4 14.1 19.8 22.3 43.6 23.2 67.9l-.1.1z"
        className="st0"
        id="flecha1-path"
      />
    </g>
    <g id="flecha2" className="paso2">
      <path
        d="m131.4 251.7-21.2-34.9 21.4-34.4.2-.2c19.9-1.6 37.9-14.3 46-32.6 2.3-5.2 3.8-10.8 4.4-16.5v-.2l35.6 21.5 34.1-21.1v.3c-.7 13.8-3.8 27.4-9 40.1-8.9 22-24.1 41.2-43.4 54.9-19.8 14.1-43.6 22.3-67.9 23.2l-.2-.1z"
        className="st0"
        id="flecha2-path"
      />
    </g>
    <path d="M55.6 36.6H93v43.2H55.6z" className="st1 paso4" id="flecha4-st1" />
    <text
      className="st2 st3 st4 paso4"
      transform="translate(55.64 72.36)"
      id="flecha4-text"
    >
      {"4"}
    </text>
    <path d="M187 57.2h37.4v43.2H187z" className="st1 paso1" id="flecha1-st1" />
    <text
      className="st2 st3 st4 paso1"
      transform="translate(187 92.96)"
      id="flecha1-text"
    >
      {"1"}
    </text>
    <path
      d="M169.3 180.5h37.4v43.2h-37.4z"
      className="st1 paso2"
      id="flecha2-st2"
    />
    <text
      className="st2 st3 st4 paso2"
      transform="translate(169.325 216.266)"
      id="flecha2-text"
    >
      {"2"}
    </text>
    <path
      d="M41.7 160.8h37.4V204H41.7z"
      className="st1 paso3"
      id="flecha3-st3"
    />
    <text
      className="st2 st3 st4 paso3"
      transform="translate(41.672 196.617)"
      id="flecha3-text"
    >
      {"3"}
    </text>
  </svg>
);
const SvgComponent4 = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    id="Layer_4"
    x={0}
    y={0}
    className="col-10 col-lg-5"
    style={{
      enableBackground: "new 0 0 255 255",
      cursor: "pointer",
    }}
    width={props.size || 325}
    height={props.size || 325}
    viewBox="0 0 255 255"
    {...props}
  >
    <style>
      {
        ".st0{fill:#1d7a5f}.filledP4{fill:#0a362a}.st1{fill:none}.st2{fill:#fff}.st3,.st4{font-size:50px !important}"
      }
    </style>
    <image
      href="/kliv-isotipo-green.png"
      width={1241}
      height={1241}
      style={{
        overflow: "visible",
      }}
      transform="matrix(.09883 0 0 .09883 66.392 66.764)"
    />
    <g id="flecha3" className="paso3">
      <path
        d="m2.7 130.9 34.9-21.2L71.9 131l.2.2c1.6 19.9 14.3 37.9 32.6 46 5.2 2.3 10.8 3.8 16.5 4.4h.2L100 217.2l21.1 34.1h-.3c-13.8-.7-27.4-3.8-40.1-9-22-8.9-41.2-24.1-54.9-43.4C11.7 179.1 3.5 155.3 2.6 131l.1-.1z"
        className="st0"
        id="flecha3-path"
      />
    </g>
    <g id="flecha4" className="paso4">
      <path
        d="m123.9 2.6 21.2 34.9-21.4 34.4-.2.2c-19.9 1.6-37.9 14.3-46 32.6-2.3 5.2-3.8 10.8-4.4 16.5v.2L37.6 99.9 3.4 121v-.3c.7-13.8 3.8-27.4 9-40.1 8.9-22 24.1-41.2 43.4-54.9C75.6 11.4 99.3 3.3 123.7 2.4l.2.2z"
        className="filledP4"
        id="flecha4-path"
      />
    </g>
    <g id="flecha1" className="paso1">
      <path
        d="m252.5 123.5-34.9 21.2-34.4-21.4-.2-.2c-1.6-19.9-14.3-37.9-32.6-46-5.2-2.3-10.8-3.8-16.5-4.4h-.2l21.5-35.6-21.1-34h.3c13.8.7 27.4 3.8 40.1 9 22 8.9 41.2 24.1 54.9 43.4 14.1 19.8 22.3 43.6 23.2 67.9l-.1.1z"
        className="st0"
        id="flecha1-path"
      />
    </g>
    <g id="flecha2" className="paso2">
      <path
        d="m131.4 251.7-21.2-34.9 21.4-34.4.2-.2c19.9-1.6 37.9-14.3 46-32.6 2.3-5.2 3.8-10.8 4.4-16.5v-.2l35.6 21.5 34.1-21.1v.3c-.7 13.8-3.8 27.4-9 40.1-8.9 22-24.1 41.2-43.4 54.9-19.8 14.1-43.6 22.3-67.9 23.2l-.2-.1z"
        className="st0"
        id="flecha2-path"
      />
    </g>
    <path d="M55.6 36.6H93v43.2H55.6z" className="st1 paso4" id="flecha4-st1" />
    <text
      className="st2 st3 st4 paso4"
      transform="translate(55.64 72.36)"
      id="flecha4-text"
    >
      {"4"}
    </text>
    <path d="M187 57.2h37.4v43.2H187z" className="st1 paso1" id="flecha1-st1" />
    <text
      className="st2 st3 st4 paso1"
      transform="translate(187 92.96)"
      id="flecha1-text"
    >
      {"1"}
    </text>
    <path
      d="M169.3 180.5h37.4v43.2h-37.4z"
      className="st1 paso2"
      id="flecha2-st2"
    />
    <text
      className="st2 st3 st4 paso2"
      transform="translate(169.325 216.266)"
      id="flecha2-text"
    >
      {"2"}
    </text>
    <path
      d="M41.7 160.8h37.4V204H41.7z"
      className="st1 paso3"
      id="flecha3-st3"
    />
    <text
      className="st2 st3 st4 paso3"
      transform="translate(41.672 196.617)"
      id="flecha3-text"
    >
      {"3"}
    </text>
  </svg>
);

const HowWeWorkSection = () => {
  const [selectedStep, setSelectedStep] = useState(1);

  const [innerWidth, setInnerWidth] = useState(0);

  const t_howWeWork = useTranslations("howWeWork");

  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  const handleClickSvg = (e) => {
    if (e.target.id.includes("flecha1")) {
      setSelectedStep(1);
    }
    if (e.target.id.includes("flecha2")) {
      setSelectedStep(2);
    }
    if (e.target.id.includes("flecha3")) {
      setSelectedStep(3);
    }
    if (e.target.id.includes("flecha4")) {
      setSelectedStep(4);
    }
  };

  const selectedSvg = "z-10";
  const unselectedSvg = "absolute z-[-1]";

  return (
    <section
      className="bg-kliv-sand"
      id="como-trabajamos"
      data-aos="fade-right"
      data-section="como-trabajamos"
    >
      <div className="flex flex-col gap-[100px] lg:gap-[50px] items-center landing-section-container">
        <HeadSection className="text-kliv-consideracion max-w-[490px]">
          {t_howWeWork("title")}
        </HeadSection>

        <div className="flex flex-col gap-[120px] lg:gap-[90px] items-center">
          <figure className="relative w-full flex flex-col items-center max-w-[300px]">
            <div
              className={`${selectedStep === 1 ? selectedSvg : unselectedSvg}`}
            >
              <SvgComponent1 onClick={handleClickSvg} />
            </div>
            <div
              className={`${selectedStep === 2 ? selectedSvg : unselectedSvg}`}
            >
              <SvgComponent2 onClick={handleClickSvg} />
            </div>
            <div
              className={`${selectedStep === 3 ? selectedSvg : unselectedSvg}`}
            >
              <SvgComponent3 onClick={handleClickSvg} />
            </div>
            <div
              className={`${selectedStep === 4 ? selectedSvg : unselectedSvg}`}
            >
              <SvgComponent4 onClick={handleClickSvg} />
            </div>

            <span
              className={`text-base ${
                selectedStep === 4
                  ? "text-kliv-secondary"
                  : "text-kliv-text-4 opacity-70"
              } text-center absolute top-[-60px] lg:top-[-0px] left-[-20px] lg:left-[-120px] font-[700]`}
            >
              {t_howWeWork.rich("step4", {
                br: () => <br></br>,
              })}
            </span>
            <span
              className={`text-base ${
                selectedStep === 1
                  ? "text-kliv-secondary"
                  : "text-kliv-text-4 opacity-70"
              } text-center absolute top-[-60px] lg:top-[-0px] right-[-20px] lg:right-[-120px] font-[700]`}
            >
              {t_howWeWork.rich("step1", {
                br: () => <br></br>,
              })}
            </span>
            <span
              className={`text-base ${
                selectedStep === 2
                  ? "text-kliv-secondary"
                  : "text-kliv-text-4 opacity-70"
              } text-center absolute bottom-[-60px] lg:bottom-[0px] right-[-20px] lg:right-[-120px] font-[700]`}
            >
              {t_howWeWork.rich("step2", {
                br: () => <br></br>,
              })}
            </span>
            <span
              className={`text-base ${
                selectedStep === 3
                  ? "text-kliv-secondary"
                  : "text-kliv-text-4 opacity-70"
              } text-center absolute bottom-[-60px] lg:bottom-[0px] left-[-20px] lg:left-[-120px] font-[700]`}
            >
              {t_howWeWork.rich("step3", {
                br: () => <br></br>,
              })}
            </span>
          </figure>

          <div className="flex max-w-[600px] text-center items-center">
            <p className="text-base leading-[24px] font-[400]">
              {selectedStep === 1 && t_howWeWork("step1Content")}
              {selectedStep === 2 && t_howWeWork("step2Content")}
              {selectedStep === 3 && t_howWeWork("step3Content")}
              {selectedStep === 4 && t_howWeWork("step4Content")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
