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
    <div className="aspect-[0.68] w-full p-[20px_30px] flex flex-col gap-[20px] bg-[url(/shapes/folder-testimony.svg)] bg-cover bg-center bg-no-repeat">
      <header className="flex flex-col gap-[0px] items-start select-none">
        <figure className="relative w-[50%] aspect-[2] md:w-[180px] md:h-[80px] translate-x-[-15px] translate-y-[-10px]">
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
          video ? "px-[30px]" : "px-0"
        } flex-1 w-full overflow-auto`}
      >
        {video ? (
          <video controls className="aspect-[4_/_5] mx-auto object-cover">
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
