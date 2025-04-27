"use client";

import { useEffect } from "react";
import TagManager from "react-gtm-module";

const GTM = () => {
  useEffect(() => {
    TagManager.initialize({
      gtmId: process.env.NEXT_PUBLIC_GTM_ID, //cSpell:disable-line
    });
  }, []);

  return <></>;
};

export default GTM;
