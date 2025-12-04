import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SectionLighter() {
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

            tl.fromTo(".lighter-headline",
                { x: -100, autoAlpha: 0 },
                { x: 0, autoAlpha: 1, duration: 1, ease: "power2.out" }
            )
                .fromTo(".lighter-subcopy",
                    { autoAlpha: 0 },
                    { autoAlpha: 1, duration: 1 },
                    "-=0.5"
                )
                .fromTo(".lighter-image",
                    { y: 100, autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" },
                    "-=0.5"
                );

        }, rootRef);



        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            // Move avatars slightly in opposite directions for depth
            gsap.to(".lighter-image .absolute.rounded-full", {
                x: (i) => x * (i + 1) * 0.5,
                y: (i) => y * (i + 1) * 0.5,
                duration: 1,
                ease: "power2.out"
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={rootRef}
            className="min-h-screen snap-start bg-creamWhite flex flex-col md:flex-row items-center justify-center px-4 md:px-20 gap-12 overflow-hidden"
        >
            <div className="flex-1 max-w-xl">
                <h2 className="lighter-headline text-5xl md:text-7xl font-display font-bold text-deepGreenText leading-tight mb-6">
                    PROJECTS SHOULD FEEL LIGHTER.
                </h2>
                <p className="lighter-subcopy text-xl text-softGrayText font-body leading-relaxed">
                    We act as your product team powered by AI, so you don’t have to manage a huge dev squad.
                </p>
            </div>

            <div className="lighter-image flex-1 w-full max-w-lg aspect-square bg-mintGreen rounded-3xl border-4 border-deepGreenText shadow-[12px_12px_0px_0px_rgba(0,77,51,1)] overflow-hidden relative flex items-center justify-center group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-lemonYellow)_0%,_transparent_70%)] opacity-50"></div>

                {/* Team Avatars Composition */}
                <div className="relative w-64 h-64">
                    {[
                        { color: "bg-bubblePink", x: "0", y: "0", rotate: "-10" },
                        { color: "bg-skyBlue", x: "80", y: "40", rotate: "5" },
                        { color: "bg-creamWhite", x: "40", y: "100", rotate: "-5" }
                    ].map((avatar, i) => (
                        <div
                            key={i}
                            className={`absolute w-32 h-32 ${avatar.color} rounded-full border-4 border-deepGreenText shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300`}
                            style={{
                                left: `${avatar.x}px`,
                                top: `${avatar.y}px`,
                                transform: `rotate(${avatar.rotate}deg)`,
                                zIndex: i
                            }}
                        >
                            {/* Simple Face SVG */}
                            <svg viewBox="0 0 100 100" className="w-20 h-20 text-deepGreenText fill-current">
                                <circle cx="35" cy="40" r="6" />
                                <circle cx="65" cy="40" r="6" />
                                <path d="M 30 65 Q 50 80 70 65" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                            </svg>
                        </div>
                    ))}

                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 bg-white px-4 py-2 rounded-full border-2 border-deepGreenText font-bold shadow-md animate-bounce">
                        We're hiring!
                    </div>
                </div>
            </div>
        </section>
    );
}
