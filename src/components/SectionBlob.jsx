import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Database, Globe, Smartphone, Server, Cpu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function SectionBlob() {
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

            tl.fromTo(".giant-blob",
                { scale: 0 },
                { scale: 1, duration: 1, ease: "back.out(1.2)" }
            )
                .fromTo(".face-eye",
                    { scale: 0, autoAlpha: 0 },
                    { scale: 1, autoAlpha: 1, duration: 0.5, stagger: 0.2 },
                    "-=0.5"
                )
                .fromTo(".face-smile",
                    { scaleX: 0, autoAlpha: 0 },
                    { scaleX: 1, autoAlpha: 1, duration: 0.5 },
                    "-=0.3"
                )
                .fromTo(".tech-icon",
                    { scale: 0, autoAlpha: 0 },
                    { scale: 1, autoAlpha: 1, duration: 0.5, stagger: 0.1, ease: "back.out(2)" }
                );

            // Continuous orbit animation
            gsap.to(".tech-orbit", { rotation: 360, duration: 20, repeat: -1, ease: "none" });
            gsap.to(".tech-icon", { rotation: -360, duration: 20, repeat: -1, ease: "none" });

        }, rootRef);

        const handleMouseMove = (e) => {
            const eyes = document.querySelectorAll(".face-eye");
            eyes.forEach((eye) => {
                const rect = eye.getBoundingClientRect();
                const eyeCenterX = rect.left + rect.width / 2;
                const eyeCenterY = rect.top + rect.height / 2;
                const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
                const distance = Math.min(3, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 10);

                const pupilX = Math.cos(angle) * distance;
                const pupilY = Math.sin(angle) * distance;

                gsap.to(eye.querySelector(".pupil"), {
                    x: pupilX,
                    y: pupilY,
                    duration: 0.2
                });
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
            className="min-h-screen snap-start bg-creamWhite flex flex-col items-center justify-center px-4 overflow-hidden relative"
        >
            <div className="absolute top-10 md:top-20 z-10 text-center">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-deepGreenText max-w-3xl mx-auto leading-tight">
                    WE ADAPT TO ANY TECH STACK YOU NEED.
                </h2>
            </div>

            <div className="giant-blob w-[80vw] h-[80vw] md:w-[500px] md:h-[500px] bg-skyBlue rounded-full flex items-center justify-center relative border-4 border-deepGreenText shadow-[8px_8px_0px_0px_rgba(0,77,51,1)]">
                {/* Face */}
                <div className="flex gap-12 mb-8 relative z-20">
                    <div className="face-eye w-8 h-12 bg-deepGreenText rounded-full relative overflow-hidden">
                        <div className="pupil absolute top-2 right-2 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="face-eye w-8 h-12 bg-deepGreenText rounded-full relative overflow-hidden">
                        <div className="pupil absolute top-2 right-2 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                </div>
                <div className="face-smile absolute bottom-24 w-32 h-16 border-b-8 border-deepGreenText rounded-full z-20"></div>

                {/* Orbiting Icons */}
                <div className="tech-orbit absolute inset-[-60px] md:inset-[-100px] rounded-full pointer-events-none">
                    {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                        const Icon = [Code, Database, Globe, Smartphone, Server, Cpu][i];
                        const colors = ["bg-lemonYellow", "bg-bubblePink", "bg-creamWhite", "bg-mintGreen", "bg-skyBlue", "bg-lemonYellow"];
                        return (
                            <div
                                key={i}
                                className="absolute top-1/2 left-1/2 w-0 h-0"
                                style={{ transform: `rotate(${deg}deg)` }}
                            >
                                <div className={`tech-icon absolute -top-8 -left-8 w-16 h-16 ${colors[i]} border-2 border-deepGreenText rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,77,51,1)] translate-x-[140px] md:translate-x-[300px]`}>
                                    <Icon className="w-8 h-8 text-deepGreenText transform" style={{ transform: `rotate(${-deg}deg)` }} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
