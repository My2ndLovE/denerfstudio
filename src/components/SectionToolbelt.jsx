import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bot, Code2, Cpu, Database, Sparkles, Terminal } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function SectionToolbelt() {
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

            tl.fromTo(".tool-card",
                { y: 100, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" }
            )
                .fromTo(".tool-icon",
                    { scale: 0, autoAlpha: 0 },
                    {
                        scale: 1,
                        autoAlpha: 1,
                        duration: 0.8,
                        stagger: { amount: 0.5, from: "random" },
                        ease: "back.out(1.5)"
                    }
                );

            // Simple orbit animation
            gsap.to(".tool-orbit", { rotation: 360, duration: 30, repeat: -1, ease: "none" });
            gsap.to(".tool-icon-inner", { rotation: -360, duration: 30, repeat: -1, ease: "none" });

        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={rootRef}
            className="min-h-screen snap-start bg-skyBlue flex flex-col items-center justify-center px-4 overflow-hidden relative"
        >
            <h2 className="text-4xl md:text-6xl font-display font-bold text-deepGreenText mb-12 z-10 text-center">
                AI IS OUR BEST ASSISTANT.
            </h2>

            <div className="relative w-[90vw] h-[90vw] md:w-[600px] md:h-[600px] flex items-center justify-center">
                {/* Outer Orbit */}
                <div className="tool-orbit absolute inset-0 rounded-full border-2 border-dashed border-deepGreenText/30"></div>

                {/* Inner Orbit */}
                <div className="tool-orbit-inner absolute inset-16 md:inset-24 rounded-full border-2 border-dashed border-deepGreenText/20"></div>

                {/* Orbiting Icons - Outer */}
                <div className="absolute inset-0 animate-[spin_30s_linear_infinite]">
                    {[Bot, Code2, Cpu, Database, Sparkles, Terminal].map((Icon, i) => {
                        const angle = (i * 360) / 6;
                        return (
                            <div
                                key={i}
                                className="absolute top-1/2 left-1/2 w-0 h-0"
                                style={{ transform: `rotate(${angle}deg)` }}
                            >
                                <div className="absolute -top-8 -left-8 w-16 h-16 bg-white border-2 border-deepGreenText rounded-full flex items-center justify-center shadow-lg translate-x-[40vw] md:translate-x-[280px]">
                                    <div className="animate-[spin_30s_linear_infinite_reverse]">
                                        <Icon className="w-8 h-8 text-deepGreenText" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Orbiting Icons - Inner (Counter-rotating) */}
                <div className="absolute inset-0 animate-[spin_20s_linear_infinite_reverse]">
                    {[Code2, Terminal, Sparkles].map((Icon, i) => {
                        const angle = (i * 360) / 3;
                        return (
                            <div
                                key={i}
                                className="absolute top-1/2 left-1/2 w-0 h-0"
                                style={{ transform: `rotate(${angle}deg)` }}
                            >
                                <div className="absolute -top-6 -left-6 w-12 h-12 bg-lemonYellow border-2 border-deepGreenText rounded-full flex items-center justify-center shadow-md translate-x-[25vw] md:translate-x-[180px]">
                                    <div className="animate-[spin_20s_linear_infinite]">
                                        <Icon className="w-6 h-6 text-deepGreenText" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Central Card */}
                <div className="tool-card w-48 h-48 md:w-64 md:h-64 bg-mintGreen rounded-3xl border-4 border-deepGreenText shadow-[8px_8px_0px_0px_rgba(0,77,51,1)] flex items-center justify-center z-10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-skyBlue)_0%,_transparent_70%)] opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className="text-center relative z-10">
                        <div className="text-5xl mb-2 group-hover:scale-125 transition-transform duration-300">🤝</div>
                        <div className="font-display font-bold text-xl text-deepGreenText">Human + AI</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
