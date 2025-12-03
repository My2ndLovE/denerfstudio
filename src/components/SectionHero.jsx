import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SectionHero() {
    const rootRef = useRef(null);

    useLayoutEffect(() => {
        if (!rootRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: "top center",
                    end: "bottom center",
                    toggleActions: "play reverse play reverse"
                }
            });

            tl.to(".hero-blobs", { opacity: 1, duration: 1, ease: "power2.out" })
                .fromTo(".hero-heading",
                    { y: 40, autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, duration: 0.8 },
                    "-=0.4"
                )
                .fromTo(".hero-ctas",
                    { y: 30, autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1 },
                    "-=0.5"
                )
                .fromTo(".hero-devices",
                    { y: -80, rotation: -8, autoAlpha: 0 },
                    { y: 0, rotation: 0, autoAlpha: 1, duration: 1.2, ease: "back.out(1.7)" }
                );

        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={rootRef}
            className="min-h-screen snap-start bg-mintGreen flex flex-col items-center justify-center px-4 overflow-hidden relative"
        >
            {/* Background Blobs */}
            <div className="hero-blobs absolute inset-0 opacity-0 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-lemonYellow rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-skyBlue rounded-full blur-3xl opacity-50"></div>
            </div>

            {/* Content */}
            <div className="z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
                <div className="hero-heading">
                    <span className="inline-block px-4 py-1 mb-4 text-sm font-bold tracking-wide text-deepGreenText bg-white/50 rounded-full backdrop-blur-sm">
                        AI-DRIVEN SOFTWARE STUDIO
                    </span>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-deepGreenText leading-tight mb-6">
                        YOUR POCKET TEAM FOR SHIPPING MVPs FAST.
                    </h1>
                    <p className="text-lg md:text-xl text-deepGreenText/80 max-w-2xl mx-auto mb-8 font-body">
                        We build your product with AI-speed and human-expertise. Work first, pay later. Zero risk.
                    </p>
                </div>

                <div className="hero-ctas flex flex-col sm:flex-row gap-4 mb-12">
                    <button className="px-8 py-4 bg-lemonYellow border-2 border-deepGreenText text-deepGreenText font-bold rounded-full hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(0,77,51,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,77,51,1)] hover:translate-x-[2px] hover:translate-y-[2px]">
                        Book Free Demo
                    </button>
                    <button className="px-8 py-4 bg-creamWhite border-2 border-deepGreenText text-deepGreenText font-bold rounded-full hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(0,77,51,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,77,51,1)] hover:translate-x-[2px] hover:translate-y-[2px]">
                        See How It Works
                    </button>
                </div>

                <div className="hero-devices relative w-full max-w-lg h-64 md:h-80 flex items-center justify-center perspective-1000">
                    {/* Laptop Mockup */}
                    <div className="absolute w-64 md:w-80 aspect-[16/10] bg-white rounded-xl border-4 border-deepGreenText shadow-2xl transform -rotate-6 -translate-x-8 z-10 flex flex-col overflow-hidden">
                        <div className="flex-1 bg-creamWhite flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-mintGreen/20 to-skyBlue/20"></div>
                            <div className="w-16 h-16 rounded-full bg-lemonYellow border-2 border-deepGreenText flex items-center justify-center">
                                <div className="w-2 h-2 bg-deepGreenText rounded-full mx-1"></div>
                                <div className="w-2 h-2 bg-deepGreenText rounded-full mx-1"></div>
                            </div>
                        </div>
                        <div className="h-4 bg-gray-100 border-t-2 border-deepGreenText"></div>
                    </div>

                    {/* Phone Mockup */}
                    <div className="absolute w-24 md:w-32 aspect-[9/19] bg-white rounded-[2rem] border-4 border-deepGreenText shadow-2xl transform rotate-12 translate-x-24 translate-y-8 z-20 flex flex-col overflow-hidden">
                        <div className="h-6 w-full flex justify-center items-center">
                            <div className="w-12 h-4 bg-black rounded-b-xl"></div>
                        </div>
                        <div className="flex-1 bg-bubblePink/20 p-2 flex flex-col gap-2">
                            <div className="w-full h-12 bg-white rounded-xl border-2 border-deepGreenText/10"></div>
                            <div className="w-full h-12 bg-white rounded-xl border-2 border-deepGreenText/10"></div>
                            <div className="w-full h-12 bg-white rounded-xl border-2 border-deepGreenText/10"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
