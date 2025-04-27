import { FileInput } from "flowbite-react";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

const InputFile = ({ types, maxSize, onFileLoad }) => {
  const [error, setError] = useState(false);

  const handleLoad = (event) => {
    event.preventDefault();
    try {
      if (types) {
        if (types.find((type) => type === event.target.files[0].type)) {
          if (event.target.files[0].size > maxSize) {
            setError(
              `El tamaño del archivo no puede ser mayor a ${(
                maxSize /
                1024 /
                1024
              ).toFixed(2)}MB.`
            );
          } else {
            setError(null);
            onFileLoad(event.target.files[0]);
          }
        } else {
          setError(
            `Solo se aceptan archivos de tipo >${types.map(
              (type) => ` ${type}`
            )}`
          );
        }
      } else {
        if (event.target.files[0].size > maxSize) {
          setError(
            `El tamaño del archivo no puede ser mayor a ${(
              maxSize /
              1024 /
              1024
            ).toFixed(2)}MB.`
          );
        } else {
          setError(null);
          onFileLoad(event.target.files[0]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <FileInput onChange={handleLoad} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default InputFile;
