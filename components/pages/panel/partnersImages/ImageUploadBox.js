import Button from "@/components/atoms/Button";
import InputFile from "@/components/atoms/InputFile";
import { updatePartnersImagesData, uploadFile } from "@/firebase/Client";
import { getDownloadURL } from "firebase/storage";
import { useState } from "react";

const TASK_STATE = {
  PROGRESS: "PROGRESS",
  COMPLETE: "COMPLETE",
  ERROR: "error",
};

const ImageUploadBox = ({ link, partnersImages, index, refetchImages }) => {
  const [fileUploaded, setFileUploaded] = useState(null);
  const [taskState, setTaskState] = useState(null);

  const handleUpload = async () => {
    setTaskState(null);

    const file = fileUploaded;

    const task = uploadFile(file, `partners/${index}`);

    const onProgress = (snapshot) => {
      setTaskState(TASK_STATE.PROGRESS);
    };

    const onError = (error) => {
      setTaskState(TASK_STATE.ERROR);
      throw new Error(error);
    };

    const onComplete = () => {
      //   setProgress(null);
      getDownloadURL(task.snapshot.ref).then((downloadURL) => {
        const newPartnersImages = partnersImages;
        newPartnersImages.links[index] = downloadURL;
        updatePartnersImagesData(newPartnersImages).then(() => {
          setTaskState(TASK_STATE.COMPLETE);
          alert("Imagen subida correctamente");
          setFileUploaded(null);
          refetchImages();
        });
      });
    };

    task.on("state_changed", onProgress, onError, onComplete);
  };

  return (
    <article className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[10px] h-[400px] rounded-[10px] border-[1px] border-kliv-text-6 p-[10px]">
        <figure className="w-full h-full ">
          <img
            src={fileUploaded ? URL.createObjectURL(fileUploaded) : link}
            className="w-full h-full object-contain mix-blend-multiply"
            // alt={`foto de ${name}`}
          />
        </figure>

        <div className="w-full flex flex-col gap-[20px]">
          <InputFile
            types={["image/png", "image/webp"]}
            onFileLoad={(file) => {
              setFileUploaded(file);
            }}
          />
        </div>
      </div>
      {fileUploaded && (
        <Button
          onClick={handleUpload}
          loading={taskState === TASK_STATE.PROGRESS}
        >
          Subir imagen
        </Button>
      )}
    </article>
  );
};

export default ImageUploadBox;
