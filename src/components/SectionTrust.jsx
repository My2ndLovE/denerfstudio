import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SectionTrust({ onOpenModal }) {
    const rootRef = useRef(null);
    const progressRef = useRef(null);
    const [showConfetti, setShowConfetti] = useState(false);

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
                    end: scrollDistance, // Pin long enough for the content height
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        // Trigger confetti near end of pin
                        if (self.progress >= 0.9 && !showConfetti) {
                            setShowConfetti(true);
                        } else if (self.progress < 0.8 && showConfetti) {
                            setShowConfetti(false);
                        }
                    }
                }
            });

            // 1. HEADLINE REVEAL
            tl.fromTo(".trust-headline",
                { y: 80, opacity: 0, rotateX: -20 },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 1,
                    ease: "power3.out"
                }
            );

            // 2. PROGRESS BAR FILL (Scrubbed)
            tl.to(".progress-bar-fill", {
                width: "100%",
                duration: 3, // Takes up significant portion of scroll
                ease: "none"
            });

            // 3. STEPS UNLOCK (Staggered with progress)
            const steps = gsap.utils.toArray(".progress-step");
            steps.forEach((step, i) => {
                // Calculate insertion point in timeline based on step index
                const position = 1 + (i * 0.7); // Start after headline (at 1s), spaced out

                tl.fromTo(step,
                    { scale: 0.6, opacity: 0.3 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        ease: "back.out(2)"
                    },
                    position
                );

                // Glow effect
                tl.to(step.querySelector(".step-circle"), {
                    boxShadow: "0 0 20px rgba(255, 232, 107, 0.8), 0 0 40px rgba(255, 232, 107, 0.4)",
                    duration: 0.3
                }, position + 0.2);
            });

            // 4. PAY LATER CARD
            tl.fromTo(".pay-later-card",
                { x: 200, rotateY: -45, autoAlpha: 0 },
                {
                    x: 0,
                    rotateY: 0,
                    autoAlpha: 1,
                    duration: 1,
                    ease: "back.out(1.2)"
                },
                "-=1"
            );

            // 5. CTA BUTTON
            tl.fromTo(".trust-cta",
                { y: 60, scale: 0.8, autoAlpha: 0 },
                {
                    y: 0,
                    scale: 1,
                    autoAlpha: 1,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.5)"
                },
                "-=0.5"
            );

            // Buffer at end
            tl.to({}, { duration: 0.5 });

            // Continuous Float for CTA
            gsap.to(".trust-btn-wrapper", {
                y: -6,
                duration: 2,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
            });

        }, rootRef);

        // 3D Tilt for Pay Later Card
        const card = rootRef.current.querySelector(".pay-later-card");

        const handleCardMove = (e) => {
            if (window.matchMedia("(hover: none)").matches) return;

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
                rotation: 2,
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
    }, [showConfetti]);

    // Confetti particles
    const confettiColors = ["#FFE86B", "#77F0A0", "#FFB6D5", "#8DEBFF", "#7CFFB2"];

    return (
        <section
            ref={rootRef}
            className="min-h-screen bg-creamWhite flex flex-col items-center justify-center px-4 overflow-hidden relative"
            style={{ perspective: "1200px" }}
        >
            {/* Confetti celebration */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="confetti-particle animate-bounce"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `-20px`,
                                width: `${8 + Math.random() * 8}px`,
                                height: `${8 + Math.random() * 8}px`,
                                backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
                                transform: `rotate(${Math.random() * 360}deg)`,
                                animation: `fall ${2 + Math.random() * 2}s linear forwards`,
                                animationDelay: `${Math.random() * 0.5}s`
                            }}
                        />
                    ))}
                </div>
            )}

            <h2 className="trust-headline text-4xl md:text-8xl font-display font-bold text-deepGreenText mb-8 text-center leading-tight will-change-transform">
                WORK FIRST.<br />PAY LATER.
            </h2>

            <p className="text-lg md:text-xl text-softGrayText max-w-2xl text-center mb-12 md:mb-16 font-body px-4">
                We build your MVP. You only pay if you're happy with the result. No risk, just results.
            </p>

            <div ref={progressRef} className="w-full max-w-4xl mb-12 md:mb-16 relative px-2">
                {/* Progress Bar Background */}
                <div className="w-full h-3 md:h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                    <div className="progress-bar-fill w-0 h-full bg-gradient-to-r from-lemonYellow via-neonMint to-lemonYellow relative">
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
                    </div>
                </div>

                {/* Steps */}
                <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex justify-between px-2 md:px-4">
                    {[
                        { step: "1", label: "Quick Call" },
                        { step: "2", label: "AI Prototype" },
                        { step: "3", label: "MVP Build" },
                        { step: "4", label: "Launch & Pay" }
                    ].map((item, i) => (
                        <div key={i} className="progress-step flex flex-col items-center gap-2 will-change-transform">
                            <div className="step-circle w-8 h-8 md:w-12 md:h-12 bg-white border-2 md:border-4 border-deepGreenText rounded-full flex items-center justify-center font-bold text-deepGreenText z-10 shadow-sm text-sm md:text-base transition-shadow duration-300">
                                {item.step}
                            </div>
                            <span className="text-[10px] md:text-sm font-bold text-deepGreenText bg-white/90 px-1 md:px-2 py-0.5 md:py-1 rounded backdrop-blur-sm whitespace-nowrap shadow-sm">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pay-later-card bg-mintGreen p-6 md:p-8 rounded-3xl border-4 border-deepGreenText shadow-[6px_6px_0px_0px_rgba(0,77,51,1)] md:shadow-[8px_8px_0px_0px_rgba(0,77,51,1)] mb-12 transform rotate-2 cursor-pointer group max-w-xs md:max-w-none will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
            >
                <p className="text-xl md:text-2xl font-bold text-deepGreenText flex items-center gap-3 md:gap-4">
                    <span className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full border-2 border-deepGreenText flex items-center justify-center text-xl md:text-2xl group-hover:scale-125 transition-transform duration-300">😊</span>
                    <span>Satisfaction Guaranteed</span>
                </p>
            </div>

            <div className="trust-btn-wrapper relative">
                <button
                    onClick={onOpenModal}
                    className="group relative trust-cta px-8 py-4 md:px-12 md:py-6 bg-lemonYellow border-4 border-deepGreenText text-xl md:text-2xl font-bold text-deepGreenText rounded-full shadow-[4px_4px_0px_0px_rgba(0,77,51,1)] md:shadow-[6px_6px_0px_0px_rgba(0,77,51,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,77,51,1)] md:hover:shadow-[10px_10px_0px_0px_rgba(0,77,51,1)] hover:-translate-x-1 hover:-translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,77,51,1)] md:active:shadow-[2px_2px_0px_0px_rgba(0,77,51,1)] active:translate-x-1 active:translate-y-1 transition-all duration-200 will-change-transform glow-pulse overflow-hidden"
                >
                    <span className="relative z-10">Start Free Demo</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer-auto" />
                </button>
            </div>

            {/* CSS for confetti animation */}
            <style>{`
                @keyframes fall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
            `}</style>
        </section>
    );
}
