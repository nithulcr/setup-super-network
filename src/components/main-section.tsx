"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import AnimatedButton from "@/components/AnimatedButton";


export const MainSection = () => {
    const section3Ref = useRef<HTMLElement>(null);

    const headline3Ref = useRef<HTMLHeadingElement>(null);
    const icon3Ref = useRef<HTMLImageElement>(null);

    const backScrollRef = useRef<HTMLDivElement>(null);
    const frontScrollRef = useRef<HTMLDivElement>(null);


    useGSAP(() => {





        gsap.timeline({
            scrollTrigger: {
                trigger: section3Ref.current,
                start: "top 70%",
            },
        })
            .from(icon3Ref.current, {
                y: 100,
                opacity: 0,
                duration: 1.2,
            })
            .from(headline3Ref.current, {
                y: 100,
                opacity: 0,
                duration: 1.2,
            });






        const marquee = (
            element: HTMLDivElement,
            direction: 1 | -1,
            speed = 30
        ) => {
            const width = element.scrollWidth / 2;

            gsap.fromTo(
                element,
                { x: direction === 1 ? -width : 0 },
                {
                    x: direction === 1 ? 0 : -width,
                    duration: speed,
                    ease: "none",
                    repeat: -1,
                }
            );
        };

        marquee(backScrollRef.current!, 1, 70);
        marquee(frontScrollRef.current!, -1, 70);


    });

    return (
        <>

            <section
                ref={section3Ref}
                className="relative min-h-screen  overflow-hidden py-[60px] md:py-[100px] w-full"
            >
                {/* Background Decorative Elements */}
                <div className="relative  px-4  w-full h-full max-w-[1360px] mx-auto flex  flex-col items-center justify-center ">

                    <div className="relative z-10 max-w-5xl text-center mx-auto">
                        <Image
                            ref={icon3Ref}
                            src="/icon-only.png"
                            alt="icon"
                            width={70}
                            height={70}
                            className="mx-auto pb-3"
                        />
                        <h2
                            ref={headline3Ref}
                            className=" max-w-4xl mx-auto text-5xl md:text-8xl uppercase heading-font leading-snug text-gradient"
                        >
                            Setup Super Network
                        </h2>




                    </div>
                </div>
                <div className="scroll-container relative overflow-hidden">
                    <div ref={backScrollRef} className="back-scroll absolute bottom-0 flex">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <Image
                                key={i}
                                src="/back-scroll.png"
                                alt=""
                                width={1600}
                                height={1600}
                                className="shrink-0"
                            />
                        ))}

                    </div>

                    <div ref={frontScrollRef} className="front-scroll relative flex">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <Image
                                key={i}
                                src="/front-scroll.png"
                                alt=""
                                width={1600}
                                height={1600}
                                className="shrink-0"
                            />
                        ))}
                    </div>
                </div>


            </section>
        </>
    );
};
