"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import AnimatedButton from "@/components/AnimatedButton";

export const Hero = () => {
    const firstSlideRef = useRef<HTMLDivElement>(null);
    const secondSlideRef = useRef<HTMLDivElement>(null);
    const section1Ref = useRef<HTMLElement>(null);
    const section3Ref = useRef<HTMLElement>(null);

    const headline1Ref = useRef<HTMLHeadingElement>(null);
    const subtitle1Ref = useRef<HTMLHeadingElement>(null);
    const desc1Ref = useRef<HTMLParagraphElement>(null);

    const headline2Ref = useRef<HTMLHeadingElement>(null);

    const icon3Ref = useRef<HTMLImageElement>(null);
    const headline3Ref = useRef<HTMLHeadingElement>(null);
    const img3Ref = useRef<HTMLImageElement>(null);
    const desc3Ref = useRef<HTMLParagraphElement>(null);
    const btn3Ref = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        // Initial setup for Cross-Fade
        // Slide 1 starts visible, Slide 2 starts hidden
        gsap.set(secondSlideRef.current, { autoAlpha: 0, scale: 1.05 });
        gsap.set(firstSlideRef.current, { autoAlpha: 1, scale: 1 });

        const mainTl = gsap.timeline();

        // 1. Initial Entry Animation for the first slide content
        mainTl
            .from(headline1Ref.current, {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            })
            .from(
                subtitle1Ref.current,
                {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                },
                "-=0.6"
            )
            .from(
                desc1Ref.current,
                {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                },
                "-=0.4"
            )
            // 2. Start the seamless cross-fade loop
            .add(() => {
                const loop = gsap.timeline({ repeat: -1 });

                loop
                    // Wait on Slide 1
                    .to({}, { duration: 4 })
                    
                    // CROSS-FADE TRANSITION: 1 -> 2
                    .to(firstSlideRef.current, {
                        autoAlpha: 0,
                        scale: 0.95,
                        duration: 1.5,
                        ease: "power2.inOut"
                    })
                    .to(secondSlideRef.current, {
                        autoAlpha: 1,
                        scale: 1,
                        duration: 1.5,
                        ease: "power2.inOut"
                    }, "<") // Start at the same time for perfect cross-fade

                    // Wait on Slide 2
                    .to({}, { duration: 4 })

                    // CROSS-FADE TRANSITION: 2 -> 1
                    .to(secondSlideRef.current, {
                        autoAlpha: 0,
                        scale: 0.95,
                        duration: 1.5,
                        ease: "power2.inOut"
                    })
                    .to(firstSlideRef.current, {
                        autoAlpha: 1,
                        scale: 1,
                        duration: 1.5,
                        ease: "power2.inOut"
                    }, "<");
            });

        // Section 3 ScrollTrigger Animations
        gsap.timeline({
            scrollTrigger: {
                trigger: section3Ref.current,
                start: "top 80%",
            },
        })
            .from(icon3Ref.current, { y: 60, opacity: 0, duration: 1 })
            .from(headline3Ref.current, { y: 60, opacity: 0, duration: 1 }, "-=0.7")
            .from(img3Ref.current, { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
            .from(desc3Ref.current, { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
            .from(btn3Ref.current, { y: 30, opacity: 0, duration: 0.8 }, "-=0.5");
            
    }, { scope: section1Ref });

    return (
        <>
            <section
                ref={section1Ref}
                className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 bg-[url('/bg.webp')] bg-cover bg-center w-full"
            >
                {/* Decorative Shapes */}
                <Image src="/shape1.png" alt="shape" width={20} height={20} className="absolute w-[12px] md:w-[15px] left-[20px] md:left-[40px] top-[20px] md:top-[40px]" />
                <Image src="/shape2.png" alt="shape" width={20} height={20} className="absolute w-[15px] md:w-[20px] right-[20px] md:right-[40px] top-[20px] md:top-[40px]" />
                <Image src="/shape4.png" alt="shape" width={20} height={20} className="absolute w-[15px] md:w-[20px] left-[20px] md:left-[40px] bottom-[20px] md:bottom-[40px]" />
                <Image src="/shape3.png" alt="shape" width={20} height={20} className="absolute w-[12px] md:w-[15px] right-[20px] md:right-[40px] bottom-[20px] md:bottom-[40px]" />

                {/* Main Content Area */}
                <div className="relative w-full flex-1 max-w-[1360px] mx-auto flex flex-col items-center justify-center overflow-hidden">
                    {/* Slide 1 */}
                    <div
                        ref={firstSlideRef}
                        className="first-slide absolute inset-0 flex flex-col items-center justify-center text-center px-4"
                    >
                        <div className="relative z-10 max-w-5xl">
                            <h1 ref={headline1Ref} className="text-5xl md:text-6xl text-white">
                                It’s 2026
                            </h1>
                            <h2 ref={subtitle1Ref} className="text-2xl md:text-[30px] pt-7 pb-2 text-gradient2 font-semibold">
                                It’s already happening…
                            </h2>
                            <p ref={desc1Ref} className="mx-auto mt-3 max-w-3xl text-sm md:text-lg white-text">
                                If you feel a sudden surge of pure digital energy in the room, don't panic. That’s just the framework coming alive under the hood.
                                <br />Stay tuned.
                            </p>
                        </div>
                    </div>

                    {/* Slide 2 */}
                    <div
                        ref={secondSlideRef}
                        className="second-slide absolute inset-0 flex flex-col items-center justify-center text-center px-4"
                    >
                        <div className="relative z-10 max-w-5xl">
                            <h3 ref={headline2Ref} className="heading-font mx-auto max-w-[850px] text-2xl md:text-4xl text-white leading-tight">
                                Every interaction — from posting to engaging — contributes to your identity, your presence, and your ecosystem.
                            </h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3 */}
            <section
                ref={section3Ref}
                className="py-[60px] md:py-[100px] relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 bg-[url('/bg.webp')] bg-cover bg-center w-full"
            >
                <div className="relative w-full h-full max-w-[1360px] mx-auto flex flex-col items-center justify-center">
                    <div className="relative z-10 max-w-5xl text-center mx-auto">
                        <Image ref={icon3Ref} src="/icon-only.png" alt="icon" width={70} height={70} className="mx-auto pb-3" />
                        <h2 ref={headline3Ref} className="max-w-4xl mx-auto text-4xl md:text-6xl heading-font leading-snug text-gradient">
                            Why settle for basic when you can be Simply Super?
                        </h2>
                        <Image ref={img3Ref} src="/underline.png" alt="underline" width={500} height={20} className="mx-auto py-8" />
                        <p ref={desc3Ref} className="mx-auto max-w-[980px] text-sm md:text-[16px] white-text">
                            Ahead of you is a connected ecosystem built around social presence, intelligent systems, creator commerce, identity, and shared experiences. Every interaction inside Setup is designed to feel smoother, calmer, and more intentional — shaped by the choices people make, the communities they build, and the value they create together.
                        </p>
                        <div className="pt-15 md:pt-[170px]" ref={btn3Ref}>
                            <AnimatedButton label="BEGIN YOUR JOURNEY" className="w-fit mx-auto" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
