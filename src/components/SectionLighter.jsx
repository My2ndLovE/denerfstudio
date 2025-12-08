import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SectionLighter() {
    const rootRef = useRef(null);
    const isMobileView = typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false;

    useLayoutEffect(() => {
        if (!rootRef.current) return;

        const mm = gsap.matchMedia();

        // Mobile: pinned but shorter to keep content contained
        mm.add("(max-width: 767px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: "top top",
                    end: "+=110%",
                    pin: true,
                    scrub: 0.8,
                    anticipatePin: 1
                }
            });

            tl.fromTo(".lighter-headline", { y: 18, opacity: 0.5 }, { y: -8, opacity: 1, ease: "power1.out" }, 0);
            tl.fromTo(".lighter-subcopy", { y: 14, opacity: 0 }, { y: -6, opacity: 1, ease: "power1.out" }, 0.05);
            tl.fromTo(".lighter-image", { y: 50, opacity: 0.15, scale: 0.9 }, { y: -6, opacity: 1, scale: 1, ease: "power1.out" }, 0.08);
            tl.fromTo(".team-avatar", { scale: 0.82, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.1, ease: "power1.out" }, 0.18);
            tl.fromTo(".hiring-badge", { y: 14, opacity: 0 }, { y: 0, opacity: 1, ease: "back.out(1.4)" }, 0.28);
        });

        // Desktop / tablet: pinned sequence
        mm.add("(min-width: 768px)", () => {
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

            tl.to(".lighter-text-container", { y: -50, duration: 3, ease: "none" }, 0);
            tl.to(".lighter-image", { y: 50, duration: 3, ease: "none" }, 0);

            tl.fromTo(".lighter-headline", { x: -120, opacity: 0, rotateY: -15 }, { x: 0, opacity: 1, rotateY: 0, duration: 1, ease: "power3.out" }, 0.2);
            tl.fromTo(".lighter-subcopy", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 0.5);

            tl.fromTo(".lighter-image-inner", { scale: 1.3, filter: "blur(15px)", opacity: 0 }, { scale: 1, filter: "blur(0px)", opacity: 1, duration: 1.5, ease: "none" }, 0);

            tl.fromTo(".team-avatar", { scale: 0, rotation: -30, opacity: 0 }, {
                scale: 1,
                rotation: (i) => [-10, 5, -5][i] || 0,
                opacity: 1,
                stagger: 0.2,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)"
            }, 1);

            tl.fromTo(".hiring-badge", { x: 50, y: -30, rotation: -10, scale: 0 }, { x: 0, y: 0, rotation: 0, scale: 1, duration: 0.8, ease: "back.out(2)" }, 1.5);

            // Hover parallax for desktops only
            const handleMouseMove = (e) => {
                if (window.matchMedia("(hover: none)").matches) return;
                const x = (e.clientX / window.innerWidth - 0.5) * 25;
                const y = (e.clientY / window.innerHeight - 0.5) * 25;
                gsap.to(".team-avatar", {
                    x: (i) => x * ((i + 1) * 0.4),
                    y: (i) => y * ((i + 1) * 0.4),
                    duration: 1,
                    ease: "power2.out"
                });
            };

            window.addEventListener("mousemove", handleMouseMove);
            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
            };
        });

        return () => {
            mm.revert();
        };
    }, []);

    return (
        <section
            ref={rootRef}
            className="bg-creamWhite flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center px-4 md:px-20 py-10 md:py-20 gap-6 md:gap-12 overflow-hidden min-h-screen"
            style={{ perspective: "1200px" }}
        >
            <div className="lighter-text-container w-full md:flex-1 max-w-xl will-change-transform">
                <h2 className="lighter-headline text-4xl md:text-7xl font-display font-bold text-deepGreenText leading-tight mb-4 md:mb-6 will-change-transform">
                    PROJECTS SHOULD FEEL LIGHTER.
                </h2>
                <p className="lighter-subcopy text-lg md:text-xl text-softGrayText font-body leading-relaxed will-change-transform">
                    We act as your product team powered by AI, so you don't have to manage a huge dev squad.
                </p>
            </div>

            <div className="lighter-image w-full md:flex-1 max-w-[230px] md:max-w-lg aspect-square bg-mintGreen rounded-3xl border-4 border-deepGreenText shadow-[8px_8px_0px_0px_rgba(0,77,51,1)] md:shadow-[12px_12px_0px_0px_rgba(0,77,51,1)] overflow-hidden relative flex items-center justify-center group will-change-transform mx-auto">
                <div className="lighter-image-inner absolute inset-0 w-full h-full will-change-transform">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-lemonYellow)_0%,_transparent_70%)] opacity-50"></div>
                </div>

                {/* Team Avatars Composition */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 z-10">
                    {[
                        isMobileView ? { color: "bg-bubblePink", x: "4", y: "4", rotate: "-8" } : { color: "bg-bubblePink", x: "0", y: "0", rotate: "-10" },
                        isMobileView ? { color: "bg-skyBlue", x: "60", y: "26", rotate: "5" } : { color: "bg-skyBlue", x: "80", y: "40", rotate: "5" },
                        isMobileView ? { color: "bg-creamWhite", x: "28", y: "78", rotate: "-4" } : { color: "bg-creamWhite", x: "40", y: "100", rotate: "-5" }
                    ].map((avatar, i) => (
                        <div
                            key={i}
                            className={`team-avatar absolute w-28 h-28 md:w-32 md:h-32 ${avatar.color} rounded-full border-4 border-deepGreenText shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300 will-change-transform`}
                            style={{
                                left: `${avatar.x}px`,
                                top: `${avatar.y}px`,
                                transform: `rotate(${avatar.rotate}deg)`,
                                zIndex: i
                            }}
                        >
                            {/* Simple Face SVG */}
                            <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-20 md:h-20 text-deepGreenText fill-current">
                                <circle cx="35" cy="40" r="6" />
                                <circle cx="65" cy="40" r="6" />
                                <path d="M 30 65 Q 50 80 70 65" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                            </svg>
                        </div>
                    ))}

                    {/* Floating Hiring Badge */}
                    <div className="hiring-badge absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-full border-2 border-deepGreenText font-bold text-xs md:text-sm shadow-md will-change-transform">
                        We are ready to be hired
                    </div>
                </div>
            </div>
        </section>
    );
}
