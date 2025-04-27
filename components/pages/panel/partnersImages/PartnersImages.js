import usePartnersImages from "@/hooks/usePartnersImages";
import ImageUploadBox from "./ImageUploadBox";

const PartnersImages = () => {
  const { data: partnersImages, refetch: refetchImages } = usePartnersImages();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 justify-center gap-x-[20px] gap-y-[60px] w-full items-start">
      {partnersImages?.links?.map((image, index) => {
        return (
          <ImageUploadBox
            key={index}
            link={image}
            index={index}
            partnersImages={partnersImages}
            refetchImages={refetchImages}
          />
        );
      })}
    </div>
  );
};

export default PartnersImages;
