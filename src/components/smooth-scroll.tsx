"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export const SmoothScroll = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.06,
      wheelMultiplier: 0.7,
      touchMultiplier: 1,
      smoothWheel: true,
    });

    // Make lenis globally accessible for gated scrolling
    if (typeof window !== "undefined") {
      (window as any).lenis = lenis;
    }

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};