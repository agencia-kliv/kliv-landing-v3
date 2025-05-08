import Image from "next/image";

const TestimonialCard = ({
  id,
  logo,
  name,
  company,
  position,
  video,
  text,
  innerRef,
}) => (
  <div
    id={id}
    ref={innerRef}
    className="w-full flex-1 basis-full lg:basis-[33.333%] shrink-0 px-[10px] max-w-[450px] mx-auto snap-start"
  >
    <div className="aspect-[0.68] w-full p-[20px_30px] flex flex-col gap-[20px] border-[2px] border-kliv-primary rounded-[30px]">
      <header className="flex flex-col gap-[10px] items-start select-none">
        <figure className="relative w-[70px] h-[70px] md:w-[80px] md:h-[80px] rounded-full bg-white">
          <Image
            src={logo}
            alt={name}
            fill
            objectFit="contain"
            draggable={false}
          />
        </figure>
        <div className="flex flex-col items-start gap-[0px]">
          <h5 className="text-[22px] lg:text-[18px] font-[700] text-kliv-primary">
            {name}
          </h5>
          {(company || position) && (
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
          )}
        </div>
      </header>
      <section className="flex-1 w-full overflow-auto">
        {video ? (
          <video
            controls
            className="px-[30px] aspect-[5_/_4] mx-auto object-cover"
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <p className="text-[14px] sm:text-[18px] leading-normal text-kliv-text-2 select-none whitespace-pre-wrap">
            {text}
          </p>
        )}
      </section>
    </div>
  </div>
);

export default TestimonialCard;
