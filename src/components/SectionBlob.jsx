import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Database, Globe, Smartphone, Server, Cpu } from "lucide-react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

gsap.registerPlugin(ScrollTrigger);

export function SectionBlob() {
    const rootRef = useRef(null);
    const blobRef = useRef(null);

    useLayoutEffect(() => {
        if (!rootRef.current) return;
        const prefersReducedMotion = typeof window !== "undefined" &&
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 1080;
            const contentHeight = rootRef.current?.offsetHeight || viewportHeight;
            const scrollDistance = `+=${Math.max(viewportHeight * 1.5, contentHeight + viewportHeight * 0.25)}`;

            // === PINNED SCROLL SEQUENCE ===
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: "top top",
                    end: scrollDistance,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1
                }
            });

            // 1. BLOB ENTRANCE
            tl.fromTo(".giant-blob",
                { scale: 0, rotate: -10 },
                { scale: 1, rotate: 0, duration: 2, ease: "elastic.out(1, 0.6)" }
            )
                // Lottie appears with the blob (no scale to avoid buffer mismatch)
                .fromTo(".lottie-container",
                    { y: 50, autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, duration: 1.2, ease: "back.out(2)" },
                    "-=1.5"
                )
                .fromTo(".tech-icon",
                    { scale: 0, autoAlpha: 0, rotation: -180 },
                    { scale: 1, autoAlpha: 1, rotation: 0, duration: 1.2, stagger: 0.1, ease: "back.out(2)" },
                    "-=1"
                );

            // 2. SCROLL-LINKED ORBIT ROTATION (during pin)
            tl.to(".tech-orbit", {
                rotation: 360,
                duration: 4,
                ease: "none"
            }, "-=1.5");

            // Counter-rotate icons
            tl.to(".tech-icon-inner", {
                rotation: -360,
                duration: 4,
                ease: "none"
            }, "<");

            // 3. BLOB PULSE (during pin)
            tl.to(".giant-blob", {
                scale: 1.05,
                duration: 2,
                ease: "power2.inOut",
                yoyo: true,
                repeat: 1
            }, "-=3");

            // 4. TITLE REVEAL
            tl.fromTo(".blob-title",
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power3.out"
                },
                "-=3.5"
            );

            // Buffer
            tl.to({}, { duration: 1 });

        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={rootRef}
            className="min-h-screen bg-creamWhite flex flex-col items-center justify-center px-4 overflow-hidden relative"
        >
            <div className="blob-title absolute top-10 md:top-20 z-10 text-center will-change-transform">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-deepGreenText max-w-3xl mx-auto leading-tight px-4">
                    WE ADAPT TO ANY TECH STACK YOU NEED.
                </h2>
            </div>

            <div
                ref={blobRef}
                className="giant-blob w-[78vw] h-[78vw] max-w-[320px] max-h-[320px] md:max-w-none md:max-h-none md:w-[500px] md:h-[500px] bg-skyBlue rounded-full flex items-center justify-center relative border-4 border-deepGreenText shadow-[8px_8px_0px_0px_rgba(0,77,51,1)] will-change-transform"
            >
                {/* Lottie Animation - centered in blob, absolute to avoid flex distortion */}
                <div className="lottie-container absolute inset-0 z-20 will-change-transform flex items-center justify-center pointer-events-none">
                    <DotLottieReact
                        src="https://lottie.host/933cc748-8833-4c8f-a20a-f7be423c2d75/y4FWRipyMk.lottie"
                        loop
                        autoplay
                        renderConfig={{ autoResize: true }}
                        style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "contain",
                            overflow: "hidden",
                            transform: "translateZ(0)"
                        }}
                    />
                </div>

                <div className="tech-orbit absolute inset-[-30px] md:inset-[-100px] rounded-full pointer-events-none will-change-transform">
                    {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                        const Icon = [Code, Database, Globe, Smartphone, Server, Cpu][i];
                        const colors = ["bg-lemonYellow", "bg-bubblePink", "bg-creamWhite", "bg-mintGreen", "bg-skyBlue", "bg-lemonYellow"];
                        return (
                            <div
                                key={i}
                                className="absolute top-1/2 left-1/2 w-0 h-0"
                                style={{ transform: `rotate(${deg}deg)` }}
                            >
                                <div className={`tech-icon absolute -top-5 -left-5 w-10 h-10 md:-top-8 md:-left-8 md:w-16 md:h-16 ${colors[i]} border-2 border-deepGreenText rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,77,51,1)] md:shadow-[4px_4px_0px_0px_rgba(0,77,51,1)] translate-x-[38vw] md:translate-x-[300px] will-change-transform`}>
                                    <div className="tech-icon-inner" style={{ transform: `rotate(${-deg}deg)` }}>
                                        <Icon className="w-5 h-5 md:w-8 md:h-8 text-deepGreenText" />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
