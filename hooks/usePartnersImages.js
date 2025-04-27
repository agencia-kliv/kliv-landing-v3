import { getPartnersImagesData } from "@/firebase/Client";
import { useEffect, useState } from "react";

const usePartnersImages = () => {
  const [data, setPartnersImages] = useState(undefined);

  const getData = async () => {
    const data = await getPartnersImagesData();
    setPartnersImages(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, refetch: getData };
};

export default usePartnersImages;
