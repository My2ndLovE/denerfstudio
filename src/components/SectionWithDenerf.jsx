import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Zap, DollarSign } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function SectionWithDenerf() {
    const rootRef = useRef(null);

    useLayoutEffect(() => {
        if (!rootRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play reverse play reverse"
                }
            });

            // Main card
            tl.fromTo(".pink-card",
                { y: 100, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" }
            );

            // Feature cards - animate individually to preserve their unique rotations
            const cards = gsap.utils.toArray(".feature-card");
            cards.forEach((card, i) => {
                const targetRotation = [-2, 2, -1][i] || 0;
                tl.fromTo(card,
                    { y: 50, autoAlpha: 0, rotation: 10 },
                    { y: 0, autoAlpha: 1, rotation: targetRotation, duration: 0.8, ease: "back.out(1.5)" },
                    i === 0 ? "-=0.5" : "-=0.6" // Overlap slightly
                );
            });

            // Pills
            tl.fromTo(".emoji-pill",
                { scale: 0, autoAlpha: 0 },
                { scale: 1, autoAlpha: 1, duration: 0.5, stagger: 0.1, ease: "elastic.out(1, 0.5)" },
                "-=0.3"
            );

        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={rootRef}
            className="min-h-screen snap-start bg-mintGreen flex items-center justify-center px-4 overflow-hidden"
        >
            <div className="pink-card w-full max-w-6xl bg-bubblePink rounded-[3rem] p-8 md:p-16 shadow-xl border-4 border-deepGreenText relative">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-deepGreenText text-center mb-12">
                    WITH DENERF YOU CAN:
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { icon: Check, text: "Ship the right MVP", color: "bg-creamWhite", rotate: "-2" },
                        { icon: Zap, text: "Use AI like a superpower", color: "bg-skyBlue", rotate: "2" },
                        { icon: DollarSign, text: "Skip big agency overhead", color: "bg-lemonYellow", rotate: "-1" }
                    ].map((item, i) => (
                        <div
                            key={i}
                            className={`feature-card ${item.color} p-8 rounded-3xl border-4 border-deepGreenText shadow-[8px_8px_0px_0px_rgba(0,77,51,1)] flex flex-col items-center text-center transform hover:-translate-y-4 hover:shadow-[12px_12px_0px_0px_rgba(0,77,51,1)] transition-all duration-300`}
                            style={{ transform: `rotate(${item.rotate}deg)` }}
                        >
                            <div className="w-20 h-20 bg-white rounded-full border-2 border-deepGreenText flex items-center justify-center mb-6 shadow-sm">
                                <item.icon className="w-10 h-10 text-deepGreenText" />
                            </div>
                            <h3 className="text-2xl font-bold text-deepGreenText font-display leading-tight">{item.text}</h3>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-6 flex-wrap">
                    {[
                        { text: "Fast Delivery", icon: "🚀", color: "bg-lemonYellow" },
                        { text: "Smart Code", icon: "🤖", color: "bg-skyBlue" },
                        { text: "Affordable", icon: "💰", color: "bg-bubblePink" }
                    ].map((item, i) => (
                        <div key={i} className={`emoji-pill px-8 py-3 ${item.color} border-2 border-deepGreenText rounded-full text-deepGreenText font-bold shadow-[4px_4px_0px_0px_rgba(0,77,51,1)] hover:scale-105 transition-transform flex items-center gap-2`}>
                            <span className="text-xl">{item.icon}</span>
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
