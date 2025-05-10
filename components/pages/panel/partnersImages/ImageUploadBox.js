import Button from "@/components/atoms/Button";
import InputFile from "@/components/atoms/InputFile";
import {
  deleteFile,
  removePartnerImageLink,
  updatePartnersImagesData,
  uploadFile,
} from "@/firebase/Client";
import { getDownloadURL } from "firebase/storage";
import Image from "next/image";
import { useRef, useState } from "react";
import { MdDelete } from "react-icons/md";

const TASK_STATE = {
  PROGRESS: "PROGRESS",
  COMPLETE: "COMPLETE",
  ERROR: "error",
};

const ImageUploadBox = ({
  link,
  index,
  partnersImages,
  refetchImages,
  isNew = false,
}) => {
  const [fileUploaded, setFileUploaded] = useState(null);
  const [taskState, setTaskState] = useState(null);

  const inputRef = useRef();

  const handleUpload = async () => {
    setTaskState(null);
    if (!fileUploaded) return;

    const uuid = crypto.randomUUID();

    const task = uploadFile(fileUploaded, `partners/${index}-${uuid}`);

    task.on(
      "state_changed",
      () => setTaskState(TASK_STATE.PROGRESS),
      (error) => {
        setTaskState(TASK_STATE.ERROR);
        console.error(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(task.snapshot.ref);

        // Copiamos el objeto para no mutar el state directamente
        const newData = { ...partnersImages };

        if (isNew) {
          // Push: si es nuevo, añadimos al final
          newData.links = [...(newData.links || []), downloadURL];
        } else {
          // Replace: si no es nuevo, reemplazamos en index
          newData.links = [...(newData.links || [])];
          newData.links[index] = downloadURL;
        }

        await updatePartnersImagesData(newData);
        setTaskState(TASK_STATE.COMPLETE);
        setFileUploaded(null);
        refetchImages();
      }
    );
  };

  const handleDelete = async () => {
    if (!link) return;
    const ok = confirm("¿Seguro que querés borrar esta imagen?");
    if (!ok) return;

    try {
      // 1) Borrar del Storage

      // acomodar los escapes de caracteres del "-" la url
      const fileRef = `${link
        .split("/")
        .pop()
        .split("?")[0]
        .replace(/%2F/g, "/")}`;

      console.log(fileRef);

      await deleteFile(fileRef);

      // 2) Borrar del array de links
      const newLinks = partnersImages.links.filter((_, idx) => idx !== index);
      await removePartnerImageLink(newLinks);

      refetchImages();
      alert("Imagen eliminada");
    } catch (err) {
      console.error(err);
      alert("Error al eliminar la imagen");
    }
  };

  return (
    <article className="flex flex-col gap-5">
      <div className="h-[400px] border rounded-lg p-2 flex flex-col relative">
        {/* Botón de delete (solo si hay link y no es caja "new") */}
        {link && !isNew && (
          <button
            onClick={handleDelete}
            className="absolute top-2 right-2 text-red-600 bg-red-200 p-[5px] rounded-md hover:text-red-700 z-30"
            title="Eliminar imagen"
          >
            <MdDelete size={24} />
          </button>
        )}

        {/* Si no hay link Y es isNew, mostramos un "+" */}
        {!link && isNew && !fileUploaded && (
          <button
            onClick={() => {
              inputRef.current.click();
            }}
            className="flex-1 flex items-center justify-center text-4xl text-gray-400 hover:bg-gray-100 rounded-lg"
          >
            + Cargar nueva imagen
          </button>
        )}

        {/* Vista previa de la imagen ya existente o del file seleccionado */}
        {(link || fileUploaded) && (
          <figure className="flex-1 relative aspect-partnerCard">
            <Image
              fill
              src={fileUploaded ? URL.createObjectURL(fileUploaded) : link}
              className="w-full h-full object-contain"
              alt=""
            />
          </figure>
        )}

        {/*InputFile oculto pero enlazado al botón “+” */}
        <InputFile
          innerRef={inputRef}
          id={`input-${index}`}
          types={["image/png", "image/webp"]}
          onFileLoad={setFileUploaded}
          className="hidden"
        />
      </div>

      {/* Botón de subir solo si hay un file seleccionado */}
      {fileUploaded && (
        <Button
          onClick={handleUpload}
          loading={taskState === TASK_STATE.PROGRESS}
        >
          {isNew ? "Subir nueva imagen" : "Reemplazar imagen"}
        </Button>
      )}
    </article>
  );
};

export default ImageUploadBox;
