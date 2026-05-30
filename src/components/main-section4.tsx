"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";



export const MainSection4 = () => {
    const section3Ref = useRef<HTMLElement>(null);

    const headline3Ref = useRef<HTMLHeadingElement>(null);
  

    const backScrollRef = useRef<HTMLDivElement>(null);
    const frontScrollRef = useRef<HTMLDivElement>(null);


    useGSAP(() => {





        gsap.timeline({
            scrollTrigger: {
                trigger: section3Ref.current,
                start: "top 80%",
            },
        })
    
            .from(headline3Ref.current, {
                y: 70,
                opacity: 0,
                duration: 1,
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
                className="relative min-h-screen  overflow-hidden py-[60px] md:py-[100px] w-full bg-white"
            >
                {/* Background Decorative Elements */}
                <div className="relative  px-4  w-full h-full max-w-[1360px] mx-auto flex  flex-col   ">

                    <div className="relative z-10 max-w-5xl">

                        
                        <h2
                            ref={headline3Ref}
                            className=" max-w-xl  text-5xl md:text-6xl uppercase heading-font leading-snug text-gradient"
                        >
                            JOIN THE
                            SUPER’S
                        </h2>




                    </div>
                </div>
                <div className="scroll-container3 relative overflow-hidden">


                    <div ref={frontScrollRef} className="scroll-row bottom-scroll relative flex">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <Image
                                key={i}
                                src="/member-card.png"
                                alt=""
                                width={1600}
                                height={1600}
                                className="shrink-0"
                            />
                        ))}
                    </div>
                    <div ref={backScrollRef} className="scroll-row top-scroll relative flex">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <Image
                                key={i}
                                src="/member-card.png"
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
