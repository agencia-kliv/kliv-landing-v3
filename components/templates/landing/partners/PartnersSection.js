import usePartnersImages from "@/hooks/usePartnersImages";
import Image from "next/image";

const PartnerCard = ({ src, alt }) => {
  return (
    <figure className="w-[120px] md:w-[140px] lg:w-[160px] 2xl:w-[180px] 22xl:w-[200px] aspect-[1.6] relative bg-background_elements rounded-small shadow-landing overflow-hidden lg:rounded-medium">
      <Image src={src} alt={alt} fill={true} objectFit="contain" />
    </figure>
  );
};

const PartnersSection = () => {
  const { data: partnersImages, refetch: refetchImages } = usePartnersImages();

  if (!partnersImages) return <></>;

  console.log(partnersImages);

  return (
    <section className="w-full py-[60px] px-[15px] gap-[40px] items-center flex flex-col lg:py-[100px] lg:gap-[50px] overflow-hidden relative">
      <div className="w-[20dvw] absolute left-0 top-0 h-full  z-10 bg-gradient-to-r from-[#fff] to-transparent" />
      <div className="w-[20dvw] absolute right-0 top-0 h-full  z-10 bg-gradient-to-l from-[#fff] to-transparent" />
      <div className="w-full">
        <div className="flex gap-[20px] min-w-max animate-marquee">
          {[...partnersImages.links, ...partnersImages.links].map((src, i) => (
            <PartnerCard key={i} src={src} alt={`carousel-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
