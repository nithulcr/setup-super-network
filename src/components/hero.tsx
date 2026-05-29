"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const container = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(headlineRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
      })
        .from(
          subheadlineRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 1,
          },
          "-=0.8"
        )
        .from(
          ctaRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute top-1/4 right-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-[100px]" />

      <div className="relative z-10 max-w-5xl text-center">
        <h1
          ref={headlineRef}
          className="text-5xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl"
        >
          Building the Future <br />
          <span className="text-blue-500">Super Network</span>
        </h1>
        <p
          ref={subheadlineRef}
          className="mx-auto mt-8 max-w-2xl text-lg text-zinc-400 sm:text-xl"
        >
          An ultra-fast, decentralized infrastructure for the next generation of 
          internet applications. Scalable, secure, and built for everyone.
        </p>
        <div ref={ctaRef} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 font-semibold text-black transition-all hover:pr-10 active:scale-95">
            Get Started
            <ArrowRight className="h-5 w-5 transition-all group-hover:translate-x-1" />
          </button>
          <button className="rounded-full border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 active:scale-95">
            View Documentation
          </button>
        </div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </section>
  );
};
