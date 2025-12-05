import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bot, Code2, Cpu, Database, Sparkles, Terminal } from "lucide-react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

gsap.registerPlugin(ScrollTrigger);

export function SectionToolbelt() {
    const rootRef = useRef(null);

    useLayoutEffect(() => {
        if (!rootRef.current) return;

        const ctx = gsap.context(() => {
            // === PINNED SCROLL SEQUENCE ===
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: "top top",
                    end: "+=150%",
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1
                }
            });

            // 1. CENTRAL CARD & LOTTIE ENTRANCE (together)
            tl.fromTo(".tool-card",
                { y: 150, scale: 0.7, rotateX: 30, autoAlpha: 0 },
                {
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                    autoAlpha: 1,
                    duration: 1.5,
                    ease: "back.out(1.5)"
                }
            );

            // Lottie animates with the card (no scale to avoid buffer mismatch)
            tl.fromTo(".toolbelt-lottie",
                { y: 150, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1.5,
                    ease: "back.out(1.5)"
                },
                "<" // Same time as card
            );

            // 2. TITLE REVEAL
            tl.fromTo(".toolbelt-title",
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out"
                },
                "-=1"
            );

            // 3. ORBIT ROTATION (Scrubbed during pin)
            tl.to(".orbit-outer", {
                rotation: 540,
                duration: 4,
                ease: "none"
            }, "-=1");

            tl.to(".orbit-outer .icon-inner", {
                rotation: -540,
                duration: 4,
                ease: "none"
            }, "<");

            tl.to(".orbit-inner", {
                rotation: -360,
                duration: 4,
                ease: "none"
            }, "<");

            tl.to(".orbit-inner .icon-inner", {
                rotation: 360,
                duration: 4,
                ease: "none"
            }, "<");

            // 4. CENTRAL CARD PULSE (during pin)
            tl.to(".tool-card", {
                boxShadow: "0 0 40px rgba(124, 255, 178, 0.6), 0 0 80px rgba(124, 255, 178, 0.3)",
                scale: 1.05,
                duration: 2,
                yoyo: true,
                repeat: 1
            }, "-=3");

            // 5. ICON GLOW (during pin)
            tl.to(".tool-icon-glow", {
                boxShadow: "0 0 20px rgba(255, 232, 107, 0.8), 0 0 40px rgba(255, 232, 107, 0.4)",
                duration: 2,
                stagger: {
                    each: 0.2,
                    from: "random"
                },
                yoyo: true,
                repeat: 1
            }, "-=3.5");

            // Buffer
            tl.to({}, { duration: 1 });

        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={rootRef}
            className="min-h-screen bg-skyBlue flex flex-col items-center justify-center px-4 overflow-hidden relative"
            style={{ perspective: "1200px" }}
        >
            <h2 className="toolbelt-title text-4xl md:text-6xl font-display font-bold text-deepGreenText mb-12 z-10 text-center will-change-transform">
                AI IS OUR BEST ASSISTANT.
            </h2>

            <div className="relative w-[90vw] h-[90vw] md:w-[600px] md:h-[600px] flex items-center justify-center">

                {/* Ambient glow ring */}
                <div className="absolute inset-8 md:inset-16 rounded-full bg-gradient-to-br from-neonMint/20 to-transparent blur-2xl"></div>

                {/* Outer Orbit Ring (visual) */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-deepGreenText/30"></div>

                {/* Inner Orbit Ring (visual) */}
                <div className="absolute inset-16 md:inset-24 rounded-full border-2 border-dashed border-deepGreenText/20"></div>

                {/* Outer Orbiting Icons */}
                <div className="orbit-outer absolute inset-0 will-change-transform">
                    {[Bot, Code2, Cpu, Database, Sparkles, Terminal].map((Icon, i) => {
                        const angle = (i * 360) / 6;
                        return (
                            <div
                                key={i}
                                className="absolute top-1/2 left-1/2 w-0 h-0"
                                style={{ transform: `rotate(${angle}deg)` }}
                            >
                                <div className="tool-icon-glow absolute -top-8 -left-8 w-16 h-16 bg-white border-2 border-deepGreenText rounded-full flex items-center justify-center shadow-lg translate-x-[40vw] md:translate-x-[280px] will-change-transform transition-shadow duration-300">
                                    <div className="icon-inner">
                                        <Icon className="w-8 h-8 text-deepGreenText" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Inner Orbiting Icons */}
                <div className="orbit-inner absolute inset-0 will-change-transform">
                    {[Code2, Terminal, Sparkles].map((Icon, i) => {
                        const angle = (i * 360) / 3;
                        return (
                            <div
                                key={i}
                                className="absolute top-1/2 left-1/2 w-0 h-0"
                                style={{ transform: `rotate(${angle}deg)` }}
                            >
                                <div className="tool-icon-glow absolute -top-6 -left-6 w-12 h-12 bg-lemonYellow border-2 border-deepGreenText rounded-full flex items-center justify-center shadow-md translate-x-[25vw] md:translate-x-[180px] will-change-transform transition-shadow duration-300">
                                    <div className="icon-inner">
                                        <Icon className="w-6 h-6 text-deepGreenText" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Central Card */}
                <div
                    className="tool-card w-48 h-48 md:w-64 md:h-64 bg-mintGreen rounded-3xl border-4 border-deepGreenText shadow-[8px_8px_0px_0px_rgba(0,77,51,1)] z-10 relative group will-change-transform transition-shadow duration-500"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-skyBlue)_0%,_transparent_70%)] opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-3xl"></div>
                </div>

                {/* Lottie - larger than card for 3D pop-out effect, animates with card */}
                <div className="toolbelt-lottie absolute z-20 h-64 md:h-96 pointer-events-none flex items-center justify-center will-change-transform">
                    <DotLottieReact
                        src="https://lottie.host/94360e93-cf10-4d0c-9a57-22e2546eeb01/4RlAvZgm1y.lottie"
                        loop
                        autoplay
                        renderConfig={{ autoResize: true }}
                    />
                </div>
            </div>
        </section>
    );
}
