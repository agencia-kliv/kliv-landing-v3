"use client";

import { useEffect } from "react";

const ALIGNMENT_DELAYS = [0, 200, 600, 1200, 2000];

export default function HashAnchorScroll() {
  useEffect(() => {
    let timers = [];
    let userInteracted = false;

    const alignHashTarget = () => {
      if (userInteracted || !window.location.hash) return;

      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = document.getElementById(id);

      if (!target) return;

      target.scrollIntoView({ behavior: "auto", block: "start" });
    };

    const scheduleAlignment = () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      alignHashTarget();
      timers = ALIGNMENT_DELAYS.slice(1).map((delay) =>
        window.setTimeout(alignHashTarget, delay)
      );
    };

    const handleHashChange = () => {
      userInteracted = false;
      scheduleAlignment();
    };

    const stopAlignment = () => {
      userInteracted = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };

    scheduleAlignment();
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("wheel", stopAlignment, { passive: true });
    window.addEventListener("touchstart", stopAlignment, { passive: true });
    window.addEventListener("pointerdown", stopAlignment, { passive: true });
    window.addEventListener("keydown", stopAlignment);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("wheel", stopAlignment);
      window.removeEventListener("touchstart", stopAlignment);
      window.removeEventListener("pointerdown", stopAlignment);
      window.removeEventListener("keydown", stopAlignment);
    };
  }, []);

  return null;
}
