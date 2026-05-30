"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export const MainSection3 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Text refs for entry animations
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const desc1Ref = useRef<HTMLParagraphElement>(null);
  const desc2Ref = useRef<HTMLParagraphElement>(null);
  const desc3Ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      // 1. Initial Header Text Animations
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      textTl
        .from(subtitleRef.current, { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" })
        .from(headlineRef.current, { y: 70, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.6")
        .from(desc1Ref.current, { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .from(desc2Ref.current, { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .from(desc3Ref.current, { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4");

      // 2. Sticky Screenshot Logic
      const screenshots = gsap.utils.toArray<HTMLElement>(".screenshot-item");
      const rows = gsap.utils.toArray<HTMLElement>(".row-trigger");

      // Initial state: hide all, show first
      gsap.set(screenshots, { opacity: 0, scale: 0.96 });
      gsap.set(screenshots[0], { opacity: 1, scale: 1 });

      // Pin the wrapper element
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: ".sticky-pin",
        pinSpacing: false,
      });

      // Animate screenshots based on specific row enter/exit
      rows.forEach((row, i) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 50%", // Trigger when row reaches center
          end: "bottom 50%",
          onEnter: () => {
            gsap.to(screenshots, { opacity: 0, scale: 0.96, duration: 0.5 });
            gsap.to(screenshots[i], { opacity: 1, scale: 1, duration: 0.5 });
          },
          onEnterBack: () => {
            gsap.to(screenshots, { opacity: 0, scale: 0.96, duration: 0.5 });
            gsap.to(screenshots[i], { opacity: 1, scale: 1, duration: 0.5 });
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="main-section3 relative min-h-screen py-[60px] md:py-[100px] w-full overflow-visible">
      <div className="relative px-4 w-full h-full max-w-[1360px] mx-auto flex flex-col items-center justify-center">
        {/* --- Header Section (Preserved) --- */}
        <div className="relative z-10 max-w-5xl text-center mx-auto mb-20">
          <h3 ref={subtitleRef} className="text-2xl md:text-[22px] pt-7 pb-2 text-gradient2 font-semibold mb-5">
            THE STORY
          </h3>
          <h2 ref={headlineRef} className="max-w-[800px] mx-auto text-5xl md:text-8xl heading-font leading-snug text-gradient">
            The Internet Finally Starts Paying Rent.
          </h2>
          <p ref={desc1Ref} className="mx-auto mt-3 max-w-3xl font-light text-[14px] white-text text-gradient2 mt-7">
            Let's be honest: your current social media treats you like a product. You give them your data, they give you brain rot and targeted ads for things you searched for once.
            <br />
            <br />
            SETUP Super Network is the digital layer that finally starts paying rent for living in your head. We aren't just an app — we are the foundation. We're building an ecosystem where your participation is the economy, and your identity is the currency.
          </p>
        </div>

        <div className="relative z-10 max-w-5xl text-center mx-auto mb-16">
          <h4 ref={desc2Ref} className="mx-auto max-w-[350px] text-[16px] white-text">
            "On other platforms, you're the product. On SETUP, you're the Shareholder."
          </h4>
          <p ref={desc3Ref} className="mx-auto mt-2 max-w-[600px] font-light text-[12px] white-text opacity-[80%]">
            Powered by Polygon Blockchain — Ethereum Security. Fractions of a cent per transaction.
          </p>
        </div>

        <div className="relative inline-flex items-center justify-center px-10 py-3 mb-20 rounded-full text-white bg-[#ffffff1a] border border-white/10 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_0_40px_rgba(170,255,0,0.08)]">
          PHASE:1
        </div>

        {/* --- Apple-Style Storytelling Container --- */}
        <div ref={containerRef} className="storytelling-container w-full relative">
          
          {/* Sticky Pin Wrapper - Centered */}
          <div className="sticky-pin h-screen flex items-center justify-center absolute top-0 left-0 w-full z-0 pointer-events-none">
            <div className="relative w-full max-w-[420px] aspect-[9/18]">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="screenshot-item absolute inset-0 flex items-center justify-center">
                  <Image
                    src={`/ss${i}.png`}
                    alt={`screenshot ${i}`}
                    width={450}
                    height={900}
                    className="w-full h-auto max-h-[90vh] object-contain mx-auto"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Rows */}
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-4 items-center relative py-10 row-trigger z-10 min-h-screen">
              {i % 2 !== 0 ? (
                <>
                  <div className="col-span-1 px-4 flex items-center justify-center order-2 md:order-1">
                    <div className="side-card transform hover:scale-105 transition-transform duration-500">
                      <Image src={`/card${i}.png`} alt="card" width={400} height={400} className="mx-auto max-w-[280px]" />
                    </div>
                  </div>
                  <div className="col-span-2 order-1 md:order-2"></div>
                  <div className="col-span-1 order-3"></div>
                </>
              ) : (
                <>
                  <div className="col-span-1 order-2 md:order-1"></div>
                  <div className="col-span-2 order-1 md:order-2"></div>
                  <div className="col-span-1 px-4 flex items-center justify-center order-3">
                    <div className="side-card transform hover:scale-105 transition-transform duration-500">
                      <Image src={`/card${i}.png`} alt="card" width={400} height={400} className="mx-auto max-w-[280px]" />
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
