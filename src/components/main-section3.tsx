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
  const desc2Ref = useRef<HTMLHeadingElement>(null);
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
        .from(subtitleRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          headlineRef.current,
          {
            y: 70,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          desc1Ref.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          desc2Ref.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          desc3Ref.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        );

      // 2. Stacking Logic for Center Screenshots
      const screenshotItems = gsap.utils.toArray<HTMLElement>(".screenshot-item");

      screenshotItems.forEach((ss, i) => {
        // Pin each screenshot at the top when it reaches the offset
        ScrollTrigger.create({
          trigger: ss,
          start: "top 40px", // Pinned position from top of viewport
          endTrigger: containerRef.current,
          end: "bottom bottom", // Pin until the end of the storytelling container
          pin: true,
          pinSpacing: false, // Allows subsequent content to scroll over
          scrub: true,
          anticipatePin: 1,
        });

        // Stacking transitions: animate the PREVIOUS screenshot when this one enters
        if (i > 0) {
          gsap.to(screenshotItems[i - 1], {
            scale: 0.92,
                        opacity: 0.4,
            filter: "blur(2px)",
            duration: 1,
            scrollTrigger: {
              trigger: ss,
              start: "top 90%", // Start scaling down as next card enters
              end: "top 80px",   // Finish when next card hits its pin point
              scrub: true,
            },
          });
        }

        // Deep stack: animate the screenshot TWO positions back
        if (i > 1) {
          gsap.to(screenshotItems[i - 2], {
            scale: 0.85,
             opacity: 0.2,
            filter: "blur(4px)",
            duration: 1,
            scrollTrigger: {
              trigger: ss,
              start: "top 90%",
              end: "top 80px",
              scrub: true,
            },
          });
        }
      });

      // Cleanup on unmount handled by useGSAP
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-[60px] md:py-[100px] w-full overflow-visible"
    >
      <div className="relative px-4 w-full h-full max-w-[1360px] mx-auto flex flex-col items-center justify-center">
        {/* --- Header Section (Original Content Preserved) --- */}
        <div className="relative z-10 max-w-5xl text-center mx-auto mb-20">
          <h3
            ref={subtitleRef}
            className="text-2xl md:text-[22px] pt-7 pb-2 text-gradient2 font-semibold mb-5"
          >
            THE STORY
          </h3>
          <h2
            ref={headlineRef}
            className="max-w-[800px] mx-auto text-5xl md:text-8xl heading-font leading-snug text-gradient"
          >
            The Internet Finally Starts Paying Rent.
          </h2>

          <p
            ref={desc1Ref}
            className="mx-auto mt-3 max-w-3xl font-light text-[14px] white-text text-gradient2 mt-7"
          >
            Let's be honest: your current social media treats you like a
            product. You give them your data, they give you brain rot and
            targeted ads for things you searched for once.
            <br />
            <br />
            SETUP Super Network is the digital layer that finally starts paying
            rent for living in your head. We aren't just an app — we are the
            foundation. We're building an ecosystem where your participation is
            the economy, and your identity is the currency.
          </p>
        </div>

        <div className="relative z-10 max-w-5xl text-center mx-auto mb-16">
          <h4
            ref={desc2Ref}
            className="mx-auto max-w-[350px] text-[16px] white-text"
          >
            "On other platforms, you're the product. On SETUP, you're the
            Shareholder."
          </h4>

          <p
            ref={desc3Ref}
            className="mx-auto mt-2 max-w-[600px] font-light text-[12px] white-text opacity-[80%]"
          >
            Powered by Polygon Blockchain — Ethereum Security. Fractions of a
            cent per transaction.
          </p>
        </div>

        <div className="relative inline-flex items-center justify-center px-10 py-3 mb-20 rounded-full text-white bg-[#ffffff1a] border border-white/10 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_0_40px_rgba(170,255,0,0.08)]">
          PHASE:1
        </div>

        {/* --- Apple-Style Storytelling Container --- */}
        <div
          ref={containerRef}
          className="storytelling-container w-full relative space-y-0"
        >
        
          <div className="grid grid-cols-1 md:grid-cols-4 items-center  relative py-10">
            {/* Left Content */}
            <div className="col-span-1 px-4 flex items-center justify-center order-2 md:order-1">
              <div className="side-card transform hover:scale-105 transition-transform duration-500">
                <Image
                  src="/card1.png"
                  alt="card"
                  width={400}
                  height={400}
                  className="mx-auto max-w-[280px]"
                />
              </div>
            </div>

            {/* Center Screenshots (Stacking) */}
            <div className="col-span-2 px-4 flex flex-col items-center order-1 md:order-2">
              <div className="screenshot-item z-10 w-full max-w-[420px] overflow-hidden ">
                <Image
                  src="/ss1.png"
                  alt="screenshot 1"
                  width={450}
                  height={900}
                  className="w-full h-auto max-w-[350px]  max-h-[90vh] object-contain mx-auto"
                />
              </div>
            </div>

            {/* Right Column (Empty for this step) */}
            <div className="col-span-1 order-3"></div>
          </div>

    
          <div className="grid grid-cols-1 md:grid-cols-4 items-center relative py-10">
            {/* Left Column (Empty for this step) */}
            <div className="col-span-1 order-2 md:order-1"></div>

            {/* Center Screenshots (Stacking) */}
            <div className="col-span-2 px-4 flex flex-col items-center order-1 md:order-2">
              <div className="screenshot-item z-20 w-full max-w-[420px] overflow-hidden ">
                <Image
                  src="/ss2.png"
                  alt="screenshot 2"
                  width={450}
                  height={900}
                  className="w-full h-auto max-w-[350px]  max-h-[90vh] object-contain mx-auto"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="col-span-1 px-4 flex items-center justify-center order-3">
              <div className="side-card transform hover:scale-105 transition-transform duration-500">
                <Image
                  src="/card2.png"
                  alt="card"
                  width={400}
                  height={400}
                  className="mx-auto max-w-[280px]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 items-center  relative py-10">
            {/* Left Content */}
            <div className="col-span-1 px-4 flex items-center justify-center order-2 md:order-1">
              <div className="side-card transform hover:scale-105 transition-transform duration-500">
                <Image
                  src="/card3.png"
                  alt="card"
                  width={400}
                  height={400}
                  className="mx-auto max-w-[280px]"
                />
              </div>
            </div>

            {/* Center Screenshots (Stacking) */}
            <div className="col-span-2 px-4 flex flex-col items-center order-1 md:order-2">
              <div className="screenshot-item z-30 w-full max-w-[420px] overflow-hidden ">
                <Image
                  src="/ss3.png"
                  alt="screenshot 3"
                  width={450}
                  height={900}
                  className="w-full h-auto max-w-[350px]  max-h-[90vh] object-contain mx-auto"
                />
              </div>
            </div>

            {/* Right Column (Empty for this step) */}
            <div className="col-span-1 order-3"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center relative py-10">
            {/* Left Column (Empty for this step) */}
            <div className="col-span-1 order-2 md:order-1"></div>

            {/* Center Screenshots (Stacking) */}
            <div className="col-span-2 px-4 flex flex-col items-center order-1 md:order-2">
              <div className="screenshot-item z-40 w-full max-w-[420px] overflow-hidden ">
                <Image
                  src="/ss4.png"
                  alt="screenshot 2"
                  width={450}
                  height={900}
                  className="w-full h-auto max-w-[350px]  max-h-[90vh] object-contain mx-auto"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="col-span-1 px-4 flex items-center justify-center order-3">
              <div className="side-card transform hover:scale-105 transition-transform duration-500">
                <Image
                  src="/card4.png"
                  alt="card"
                  width={400}
                  height={400}
                  className="mx-auto max-w-[280px]"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center  relative py-10">
            {/* Left Content */}
            <div className="col-span-1 px-4 flex items-center justify-center order-2 md:order-1">
              <div className="side-card transform hover:scale-105 transition-transform duration-500">
                <Image
                  src="/card5.png"
                  alt="card"
                  width={400}
                  height={400}
                  className="mx-auto max-w-[280px]"
                />
              </div>
            </div>

            {/* Center Screenshots (Stacking) */}
            <div className="col-span-2 px-4 flex flex-col items-center order-1 md:order-2">
              <div className="screenshot-item z-50 w-full max-w-[420px] overflow-hidden ">
                <Image
                  src="/ss5.png"
                  alt="screenshot 1"
                  width={450}
                  height={900}
                  className="w-full h-auto max-w-[350px]  max-h-[90vh] object-contain mx-auto"
                />
              </div>
            </div>

            {/* Right Column (Empty for this step) */}
            <div className="col-span-1 order-3"></div>
          </div>

    
          <div className="grid grid-cols-1 md:grid-cols-4 items-center relative py-10">
            {/* Left Column (Empty for this step) */}
            <div className="col-span-1 order-2 md:order-1"></div>

            {/* Center Screenshots (Stacking) */}
            <div className="col-span-2 px-4 flex flex-col items-center order-1 md:order-2">
              <div className="screenshot-item z-60 w-full max-w-[420px] overflow-hidden ">
                <Image
                  src="/ss6.png"
                  alt="screenshot 2"
                  width={450}
                  height={900}
                  className="w-full h-auto max-w-[350px]  max-h-[90vh] object-contain mx-auto"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="col-span-1 px-4 flex items-center justify-center order-3">
              <div className="side-card transform hover:scale-105 transition-transform duration-500">
                <Image
                  src="/card6.png"
                  alt="card"
                  width={400}
                  height={400}
                  className="mx-auto max-w-[280px]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 items-center  relative py-10">
            {/* Left Content */}
            <div className="col-span-1 px-4 flex items-center justify-center order-2 md:order-1">
              <div className="side-card transform hover:scale-105 transition-transform duration-500">
                <Image
                  src="/card7.png"
                  alt="card"
                  width={400}
                  height={400}
                  className="mx-auto max-w-[280px]"
                />
              </div>
            </div>

            {/* Center Screenshots (Stacking) */}
            <div className="col-span-2 px-4 flex flex-col items-center order-1 md:order-2">
              <div className="screenshot-item z-70 w-full max-w-[420px] overflow-hidden ">
                <Image
                  src="/ss7.png"
                  alt="screenshot 3"
                  width={450}
                  height={900}
                  className="w-full h-auto max-w-[350px]  max-h-[90vh] object-contain mx-auto"
                />
              </div>
            </div>

            {/* Right Column (Empty for this step) */}
            <div className="col-span-1 order-3"></div>
          </div>

        </div>
      </div>

    </section>
  );
};
