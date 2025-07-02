"use client";
import { FB_PIXEL_ID } from "@/lib/fpixel";
import { useEffect } from "react";

export default function FacebookPixelEvents() {
  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(FB_PIXEL_ID); // facebookPixelId
        ReactPixel.pageView();
      });
  }, []);

  return null;
}
