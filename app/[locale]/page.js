"use client";
import LandingPage from "@/components/pages/LandingPage";
import { FB_PIXEL_ID } from "@/lib/fpixel";
import { LinkedInInsightTag } from "nextjs-linkedin-insight-tag";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(FB_PIXEL_ID); // facebookPixelId
        ReactPixel.pageView();
      });
  }, []);

  return (
    <>
      <LandingPage />
      {/* <WhatsappCTA /> */}
      <LinkedInInsightTag />
    </>
  );
}
