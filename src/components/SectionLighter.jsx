import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SectionLighter() {
    const rootRef = useRef(null);

    useLayoutEffect(() => {
        if (!rootRef.current) return;

        const ctx = gsap.context(() => {
            // === PINNED SCROLL SEQUENCE ===
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

            // 1. SPLIT SCREEN PARALLAX (Scrubbed)
            // Left text scrolls slower, right image scrolls faster
            tl.to(".lighter-text-container", {
                y: -50,
                duration: 3,
                ease: "none"
            }, 0);

            tl.to(".lighter-image", {
                y: 50,
                duration: 3,
                ease: "none"
            }, 0);

            // 2. TEXT REVEAL
            tl.fromTo(".lighter-headline",
                {
                    x: -120,
                    opacity: 0,
                    rotateY: -15
                },
                {
                    x: 0,
                    opacity: 1,
                    rotateY: 0,
                    duration: 1,
                    ease: "power3.out"
                },
                0.2
            );

            tl.fromTo(".lighter-subcopy",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out"
                },
                0.5
            );

            // 3. IMAGE ZOOM & BLUR REVEAL
            tl.fromTo(".lighter-image-inner",
                {
                    scale: 1.3,
                    filter: "blur(15px)",
                    opacity: 0
                },
                {
                    scale: 1,
                    filter: "blur(0px)",
                    opacity: 1,
                    duration: 1.5,
                    ease: "none"
                },
                0
            );

            // 4. AVATAR STAGGER ENTRANCE
            tl.fromTo(".team-avatar",
                { scale: 0, rotation: -30, opacity: 0 },
                {
                    scale: 1,
                    rotation: (i) => [-10, 5, -5][i] || 0,
                    opacity: 1,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.5)"
                },
                1
            );

            // 5. FLOATING BADGE
            tl.fromTo(".hiring-badge",
                { x: 50, y: -30, rotation: -10, scale: 0 },
                {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "back.out(2)"
                },
                1.5
            );

            // Buffer
            tl.to({}, { duration: 0.5 });

        }, rootRef);

        // === MOUSE PARALLAX FOR AVATARS ===
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
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={rootRef}
            className="min-h-screen bg-creamWhite flex flex-col md:flex-row items-center justify-center px-4 md:px-20 gap-12 overflow-hidden"
            style={{ perspective: "1200px" }}
        >
            <div className="lighter-text-container flex-1 max-w-xl will-change-transform">
                <h2 className="lighter-headline text-5xl md:text-7xl font-display font-bold text-deepGreenText leading-tight mb-6 will-change-transform">
                    PROJECTS SHOULD FEEL LIGHTER.
                </h2>
                <p className="lighter-subcopy text-xl text-softGrayText font-body leading-relaxed will-change-transform">
                    We act as your product team powered by AI, so you don't have to manage a huge dev squad.
                </p>
            </div>

            <div className="lighter-image flex-1 w-full max-w-lg aspect-square bg-mintGreen rounded-3xl border-4 border-deepGreenText shadow-[12px_12px_0px_0px_rgba(0,77,51,1)] overflow-hidden relative flex items-center justify-center group will-change-transform">
                <div className="lighter-image-inner absolute inset-0 w-full h-full will-change-transform">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-lemonYellow)_0%,_transparent_70%)] opacity-50"></div>
                </div>

                {/* Team Avatars Composition */}
                <div className="relative w-64 h-64 z-10">
                    {[
                        { color: "bg-bubblePink", x: "0", y: "0", rotate: "-10" },
                        { color: "bg-skyBlue", x: "80", y: "40", rotate: "5" },
                        { color: "bg-creamWhite", x: "40", y: "100", rotate: "-5" }
                    ].map((avatar, i) => (
                        <div
                            key={i}
                            className={`team-avatar absolute w-32 h-32 ${avatar.color} rounded-full border-4 border-deepGreenText shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300 will-change-transform`}
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

                    {/* Floating Hiring Badge */}
                    <div className="hiring-badge absolute -top-4 -right-4 bg-white px-4 py-2 rounded-full border-2 border-deepGreenText font-bold shadow-md will-change-transform">
                        We are ready to be hired
                    </div>
                </div>
            </div>
        </section>
    );
}
