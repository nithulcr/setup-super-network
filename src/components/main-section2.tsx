"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";



export const MainSection2 = () => {
    const section3Ref = useRef<HTMLElement>(null);

    const headline3Ref = useRef<HTMLHeadingElement>(null);
    const icon3Ref = useRef<HTMLImageElement>(null);

    const subtitle1Ref = useRef<HTMLHeadingElement>(null);
    const desc1Ref = useRef<HTMLParagraphElement>(null);
    const signatureRef = useRef<HTMLImageElement>(null);
    const desc2Ref = useRef<HTMLParagraphElement>(null);




    useGSAP(() => {





        gsap.timeline({
            scrollTrigger: {
                trigger: section3Ref.current,
                start: "top 80%",
            },
        })
            .from(icon3Ref.current, {
                y: 80,
                opacity: 0,
                duration: 1,
            })
            .from(headline3Ref.current, {
                y: 70,
                opacity: 0,
                duration: 1,
            })
            .from(
                subtitle1Ref.current,
                {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                },
                "-=0.6"
            )
            .from(
                desc1Ref.current,
                {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                },
                "-=0.4"
            )
            .from(
                signatureRef.current,
                {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                },
                "-=0.4"
            )
            .from(
                desc2Ref.current,
                {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                },
                "-=0.4"
            );







    });

    return (
        <>

            <section
                ref={section3Ref}
                className="relative min-h-screen  overflow-hidden pt-[60px] md:pt-[100px] pb-[30px] md:pb-[50px] w-full flex  flex-col items-center justify-center gap-[140px]"
            >

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
                            className=" max-w-[800px] mx-auto text-5xl md:text-7xl  heading-font leading-snug text-gradient"
                        >
                            India’s First <br />Social Media App.
                        </h2>
                        <h3 ref={subtitle1Ref} className="text-2xl md:text-[24px] pt-7 pb-2 text-gradient font-semibold">All in one App</h3>
                        <p
                            ref={desc1Ref}
                            className="mx-auto mt-3 max-w-2xl font-light text-[14px] white-text opacity-[80%]"
                        >
                            SETUP Super Network is the digital layer that finally starts paying rent for living in your head.
                            We aren’t just an app; we are the foundation. We’re building an ecosystem where your
                            participation is the economy, and your identity is the currency.
                        </p>
                    </div>
                </div>
                <div className="relative  px-4  w-full h-full max-w-[1360px] mx-auto flex  flex-col items-center justify-center ">

                    <div className="relative z-10 max-w-5xl text-center mx-auto">
                        <Image
                            ref={signatureRef}
                            src="/signature.png"
                            alt="icon"
                            width={300}
                            height={100}
                            className="signature mx-auto pb-3"
                        />

                        <p
                            ref={desc2Ref}
                            className="mx-auto mt-3 max-w-[460px] font-light text-[14px] white-text opacity-[80%]"
                        >
                            Your participation is the economy. Your identity is the currency.
                            The digital layer that finally pays rent.
                        </p>
                    </div>
                </div>

            </section>
        </>
    );
};
