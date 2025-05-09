import usePartnersImages from "@/hooks/usePartnersImages";
import ImageUploadBox from "./ImageUploadBox";

const PartnersImages = () => {
  const { data: partnersImages, refetch: refetchImages } = usePartnersImages();

  // Si aún no cargó nada...
  // if (!partnersImages) return null;

  // console.log(partnersImages);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-14 w-full">
      {/* 1) Cajas para cada imagen existente */}
      {partnersImages?.links?.map((image, idx) => (
        <ImageUploadBox
          key={idx}
          index={idx}
          link={image}
          partnersImages={partnersImages}
          refetchImages={refetchImages}
          isNew={false}
        />
      ))}

      {/* 2) Caja para añadir una imagen nueva */}
      <ImageUploadBox
        key="new"
        index={partnersImages?.links?.length || 0}
        link={null}
        partnersImages={partnersImages}
        refetchImages={refetchImages}
        isNew={true}
      />
    </div>
  );
};

export default PartnersImages;
