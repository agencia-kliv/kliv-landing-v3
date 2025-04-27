import { getPackagesBillingData } from "@/firebase/Client";
import { useEffect, useState } from "react";

const usePackageBillingData = () => {
  const [data, setPackageBillingData] = useState(undefined);

  const getData = async () => {
    const data = await getPackagesBillingData();
    setPackageBillingData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, refetch: getData };
};

export default usePackageBillingData;
