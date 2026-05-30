"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface MainSectionWrapperProps {
  children: [React.ReactNode, React.ReactNode];
}

export const MainSectionWrapper = ({ children }: MainSectionWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !firstRef.current || !secondRef.current) return;

    // Reset initial states
    gsap.set(secondRef.current, { opacity: 0, scale: 0.8 });

    // Timeline for reveal (pinned duration)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", // Further reduced scroll distance for snappier transition
        scrub: 1, 
        pin: true, // Pins the container
        pinSpacing: true, // Ensures MainSection3 is pushed down
      },
    });

    // Animate MainSection out, MainSection2 in (0% to 50% of timeline)
    tl.to(firstRef.current, {
      scale: 1.2, // Slightly less aggressive zoom
      opacity: 0,
      filter: "blur(20px)",
      duration: 1,
      ease: "power2.inOut",
    })
    .to(secondRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power2.inOut",
    }, "<") // Start at the same time
    
    // Hold MainSection2 fully visible for the remaining 50% of the pin duration (50% to 100%)
    .to({}, { duration: 1 }); // Just to add duration to the timeline

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-black h-screen">
      {/* MainSection (Top layer - Pinned overlay) */}
      <div 
        ref={firstRef} 
        className="absolute inset-0 z-20 w-full h-screen"
      >
        {children[0]}
      </div>

      {/* MainSection2 (Bottom layer - Normal flow) */}
      <div 
        ref={secondRef} 
        className="absolute inset-0 z-10 w-full h-screen"
      >
        {children[1]}
      </div>
    </div>
  );
};
