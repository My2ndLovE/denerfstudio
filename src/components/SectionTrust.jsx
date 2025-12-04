import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SectionTrust() {
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

            tl.to(".progress-bar-fill", { width: "100%", duration: 1.5, ease: "power1.inOut" })
                .fromTo(".progress-step",
                    { scale: 0, autoAlpha: 0 },
                    { scale: 1, autoAlpha: 1, duration: 0.5, stagger: 0.3, ease: "back.out(2)" },
                    "-=1.2"
                )
                .fromTo(".pay-later-card",
                    { x: 100, autoAlpha: 0 },
                    { x: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" },
                    "-=0.5"
                )
                .fromTo(".trust-cta",
                    { y: 50, autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, duration: 0.8, ease: "bounce.out" }
                );

        }, rootRef);



        // 3D Tilt for Pay Later Card
        const card = rootRef.current.querySelector(".pay-later-card");

        const handleCardMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;

            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                scale: 1.05,
                duration: 0.4,
                ease: "power2.out",
                transformPerspective: 1000
            });
        };

        const handleCardLeave = () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                rotation: 2, // Return to original CSS rotation
                duration: 0.5,
                ease: "elastic.out(1, 0.5)"
            });
        };

        if (card) {
            card.addEventListener("mousemove", handleCardMove);
            card.addEventListener("mouseleave", handleCardLeave);
        }

        return () => {
            if (card) {
                card.removeEventListener("mousemove", handleCardMove);
                card.removeEventListener("mouseleave", handleCardLeave);
            }
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={rootRef}
            className="min-h-screen snap-start bg-creamWhite flex flex-col items-center justify-center px-4 overflow-hidden"
        >
            <h2 className="text-5xl md:text-8xl font-display font-bold text-deepGreenText mb-8 text-center">
                WORK FIRST.<br />PAY LATER.
            </h2>

            <p className="text-xl text-softGrayText max-w-2xl text-center mb-16 font-body">
                We build your MVP. You only pay if you're happy with the result. No risk, just results.
            </p>

            <div className="w-full max-w-4xl mb-16 relative">
                {/* Progress Bar Background */}
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="progress-bar-fill w-0 h-full bg-lemonYellow"></div>
                </div>

                {/* Steps */}
                <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex justify-between px-2">
                    {[
                        { step: "1", label: "Quick Call" },
                        { step: "2", label: "AI Prototype" },
                        { step: "3", label: "MVP Build" },
                        { step: "4", label: "Launch & Pay" }
                    ].map((item, i) => (
                        <div key={i} className="progress-step flex flex-col items-center gap-2">
                            <div className="w-12 h-12 bg-white border-4 border-deepGreenText rounded-full flex items-center justify-center font-bold text-deepGreenText z-10 shadow-sm">
                                {item.step}
                            </div>
                            <span className="text-xs md:text-sm font-bold text-deepGreenText bg-white/80 px-2 py-1 rounded backdrop-blur-sm whitespace-nowrap">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pay-later-card bg-mintGreen p-8 rounded-3xl border-4 border-deepGreenText shadow-[8px_8px_0px_0px_rgba(0,77,51,1)] mb-12 transform rotate-2 hover:rotate-0 transition-transform duration-300 cursor-pointer group">
                <p className="text-2xl font-bold text-deepGreenText flex items-center gap-4">
                    <span className="w-12 h-12 bg-white rounded-full border-2 border-deepGreenText flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">😊</span>
                    <span>Satisfaction Guaranteed</span>
                </p>
            </div>

            <button className="trust-cta px-12 py-6 bg-lemonYellow border-4 border-deepGreenText text-2xl font-bold text-deepGreenText rounded-full hover:scale-105 transition-transform shadow-[6px_6px_0px_0px_rgba(0,77,51,1)]">
                Start Free Demo
            </button>
        </section>
    );
}
