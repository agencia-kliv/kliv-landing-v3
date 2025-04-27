const Slider = (props) => {
  const { min, max, step, value, onChange } = props;

  return (
    <>
      {/* <label for="large-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Large range</label> */}
      <input
        // className="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-128"
        className="appearance-none h-[24px] w-full outline-none bg-transparent [::-webkit-slider-thumb]"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
      <style jsx>
        {`
          @media screen and (-webkit-min-device-pixel-ratio: 0) {
            input[type="range"]::-webkit-slider-runnable-track {
              width: 100%;
              height: 16px;
              background: hsla(213, 13%, 90%, 1);
              border: none;
              border-radius: 1000px;
            }

            input[type="range"]::-webkit-slider-thumb {
              width: 24px;
              -webkit-appearance: none;
              appearance: none;
              height: 24px;
              cursor: pointer;
              background: hsla(162, 68%, 29%, 1);
              border-radius: 50%;
              transform: translateY(-4px);
              position: relative;
            }

            input[type="range"] {
              position: relative;
            }

            input[type="range"]::before {
              content: "";
              position: absolute;
              top: 50%;
              left: 0;
              width: calc(
                ${((parseInt(value) - parseInt(min)) /
                    (parseInt(max) - parseInt(min))) *
                  100}% - 3px
              );
              height: 16px;
              border-radius: 1000px 0 0 1000px;
              background: linear-gradient(
                54.05deg,
                #2ba8c3 -30.22%,
                #219190 28.5%,
                #177b5d 87.22%
              );
              transform: translateY(-50%);
            }
          }
        `}
      </style>
    </>
  );
};

export default Slider;
