import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Zap, DollarSign } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function SectionWithDenerf() {
    const rootRef = useRef(null);
    const titleRef = useRef(null);

    useLayoutEffect(() => {
        if (!rootRef.current) return;

        const ctx = gsap.context(() => {
            // === 1. CARD ENTRANCE (Plays BEFORE pinning) ===
            // This ensures the card is visible as you scroll into the section, avoiding the "empty" look
            gsap.fromTo(".pink-card",
                { y: 100, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: rootRef.current,
                        start: "top 85%", // Start animating when section is 15% into view
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // === 2. PINNED CONTENT SEQUENCE ===
            // The section pins at the top, and internal content animates as you scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: "top top",
                    end: "+=150%", // Pin for 1.5x screen height
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1
                }
            });

            // 1. KINETIC TITLE
            const chars = titleRef.current.querySelectorAll(".char");
            tl.fromTo(chars,
                {
                    y: 80,
                    opacity: 0,
                    rotateX: -90,
                    transformOrigin: "top center"
                },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    stagger: 0.05, // Faster stagger
                    duration: 0.8, // Reduced from 1.5
                    ease: "back.out(1.5)"
                },
                "0" // Start immediately upon pinning
            );

            // 2. DOODLES
            tl.fromTo(".doodle-path",
                { strokeDasharray: 1000, strokeDashoffset: 1000 },
                { strokeDashoffset: 0, duration: 1, ease: "power2.out" }, // Reduced from 2
                "-=0.5"
            );

            // 3. FEATURE CARDS CASCADE
            const cards = gsap.utils.toArray(".feature-card");
            cards.forEach((card, i) => {
                const startX = -200;
                const startRotation = -15 + (i * 5);
                const endRotation = [-3, 3, -2][i] || 0;

                tl.fromTo(card,
                    {
                        x: startX,
                        y: 150,
                        autoAlpha: 0,
                        rotation: startRotation,
                        rotateY: -45,
                        scale: 0.8
                    },
                    {
                        x: 0,
                        y: 0,
                        autoAlpha: 1,
                        rotation: endRotation,
                        rotateY: 0,
                        scale: 1,
                        duration: 0.8, // Reduced from 1.5
                        ease: "back.out(1.2)"
                    },
                    i === 0 ? "-=0.6" : "-=0.6" // Tighter overlap
                );
            });

            // 4. EMOJI PILLS POP
            tl.fromTo(".emoji-pill",
                { scale: 0, rotation: -20, y: 30 },
                {
                    scale: 1,
                    rotation: 0,
                    y: 0,
                    duration: 0.6, // Reduced from 1
                    stagger: 0.1,
                    ease: "elastic.out(1, 0.5)"
                },
                "-=0.4"
            );

            // Add a small buffer at the end so user sees finished state before unpinning
            tl.to({}, { duration: 0.5 });

        }, rootRef);

        // --- Interactive 3D Tilt & Glare ---
        const cards = document.querySelectorAll(".feature-card");

        const handleCardMove = (e) => {
            if (window.matchMedia("(hover: none)").matches) return;

            const card = e.currentTarget;
            const glare = card.querySelector(".card-glare");
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -18;
            const rotateY = ((x - centerX) / centerX) * 18;

            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                scale: 1.08,
                z: 50,
                duration: 0.4,
                ease: "power2.out",
                transformPerspective: 1000
            });

            if (glare) {
                gsap.to(glare, {
                    x: (x - centerX) * 0.8,
                    y: (y - centerY) * 0.8,
                    opacity: 0.7,
                    duration: 0.4
                });
            }
        };

        const handleCardLeave = (e) => {
            const card = e.currentTarget;
            const glare = card.querySelector(".card-glare");

            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                z: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.5)"
            });

            if (glare) {
                gsap.to(glare, { opacity: 0, duration: 0.6 });
            }
        };

        cards.forEach(card => {
            card.addEventListener("mousemove", handleCardMove);
            card.addEventListener("mouseleave", handleCardLeave);
        });

        return () => {
            cards.forEach(card => {
                card.removeEventListener("mousemove", handleCardMove);
                card.removeEventListener("mouseleave", handleCardLeave);
            });
            ctx.revert();
        };
    }, []);

    // Helper to split text into chars with 3D perspective container
    const renderTitle = (text) => {
        return text.split("").map((char, i) => (
            <span
                key={i}
                className="char inline-block whitespace-pre origin-bottom will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
            >
                {char}
            </span>
        ));
    };

    return (
        <section
            id="section-denerf"
            ref={rootRef}
            className="min-h-screen bg-mintGreen flex items-start md:items-center justify-center px-4 pt-16 md:pt-0 overflow-hidden relative"
        >
            {/* Background Doodles */}
            <svg className="doodle-svg absolute top-10 left-10 w-32 h-32 opacity-40 pointer-events-none will-change-transform" viewBox="0 0 100 100">
                <path className="doodle-path" d="M10,50 Q30,10 50,50 T90,50" fill="none" stroke="#004D33" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <svg className="doodle-svg absolute bottom-20 right-10 w-40 h-40 opacity-40 pointer-events-none will-change-transform" viewBox="0 0 100 100">
                <circle className="doodle-path" cx="50" cy="50" r="40" fill="none" stroke="#004D33" strokeWidth="3" strokeDasharray="10 5" />
            </svg>

            <svg className="doodle-svg absolute top-1/3 right-5 w-24 h-24 opacity-30 pointer-events-none" viewBox="0 0 100 100">
                <path className="doodle-path" d="M20,80 Q50,20 80,80" fill="none" stroke="#004D33" strokeWidth="2" strokeLinecap="round" />
            </svg>

            <div className="pink-card w-full max-w-6xl bg-bubblePink rounded-[2rem] md:rounded-[3rem] px-4 py-8 md:p-16 shadow-xl border-4 border-deepGreenText relative perspective-1000 will-change-transform mt-8 mx-4">

                <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-lemonYellow text-deepGreenText font-bold px-4 py-1 md:px-6 md:py-2 text-sm md:text-base rounded-full border-4 border-deepGreenText shadow-[4px_4px_0px_0px_rgba(0,77,51,1)] rotate-12 z-20 glow-pulse">
                    New!
                </div>

                <h2 ref={titleRef} className="text-2xl sm:text-4xl md:text-6xl font-display font-bold text-deepGreenText text-center mb-6 md:mb-16 relative z-10" style={{ perspective: "1000px" }}>
                    {renderTitle("WITH DENERF YOU CAN:")}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-16 relative z-10" style={{ perspective: "1200px" }}>
                    {[
                        { icon: Check, text: "Ship the right MVP", color: "bg-creamWhite", rotate: "-3" },
                        { icon: Zap, text: "Use AI like a superpower", color: "bg-skyBlue", rotate: "3" },
                        { icon: DollarSign, text: "Skip big agency overhead", color: "bg-lemonYellow", rotate: "-2" }
                    ].map((item, i) => (
                        <div
                            key={i}
                            className={`feature-card group relative ${item.color} p-4 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border-4 border-deepGreenText shadow-[6px_6px_0px_0px_rgba(0,77,51,1)] md:shadow-[8px_8px_0px_0px_rgba(0,77,51,1)] flex flex-col items-center text-center overflow-hidden will-change-transform`}
                            style={{
                                transform: `rotate(${item.rotate}deg)`,
                                transformStyle: "preserve-3d"
                            }}
                        >
                            <div className="card-glare absolute -inset-full w-[300%] h-[300%] bg-gradient-to-br from-white/50 via-transparent to-transparent opacity-0 pointer-events-none z-20 blur-md hidden md:block"></div>

                            <div className="relative z-10 w-12 h-12 md:w-24 md:h-24 bg-white rounded-full border-4 border-deepGreenText flex items-center justify-center mb-3 md:mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                <item.icon className="w-6 h-6 md:w-12 md:h-12 text-deepGreenText" />
                            </div>
                            <h3 className="relative z-10 text-lg md:text-2xl font-bold text-deepGreenText font-display leading-tight">{item.text}</h3>

                            <div className="absolute inset-0 opacity-10 pointer-events-none"
                                style={{ backgroundImage: "radial-gradient(#004D33 1px, transparent 1px)", backgroundSize: "16px 16px" }}>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-4 md:gap-6 flex-wrap relative z-10">
                    {[
                        { text: "Fast Delivery", icon: "🚀", color: "bg-lemonYellow" },
                        { text: "Smart Code", icon: "🤖", color: "bg-skyBlue" },
                        { text: "Affordable", icon: "💰", color: "bg-creamWhite" }
                    ].map((item, i) => (
                        <div key={i} className={`emoji-pill px-3 py-2 md:px-8 md:py-4 ${item.color} border-2 border-deepGreenText rounded-full text-deepGreenText font-bold shadow-[3px_3px_0px_0px_rgba(0,77,51,1)] md:shadow-[4px_4px_0px_0px_rgba(0,77,51,1)] hover:scale-110 hover:-rotate-3 transition-all duration-300 cursor-pointer flex items-center gap-2 md:gap-3 will-change-transform`}>
                            <span className="text-base md:text-2xl filter drop-shadow-sm">{item.icon}</span>
                            <span className="text-xs md:text-base tracking-wide">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
