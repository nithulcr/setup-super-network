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
      lerp: 0.06, // lower = slower & smoother
      wheelMultiplier: 0.7, // lower = slower wheel scroll
      touchMultiplier: 1,
      smoothWheel: true,
    });

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