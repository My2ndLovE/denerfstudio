import { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function SectionWhoIs() {
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

      tl.fromTo(
        ".who-card",
        { scale: 0.9, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.8, ease: "back.out(1.2)" }
      )
        .fromTo(
          ".who-headline",
          { y: -40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, ease: "power2.out" }
        )
        .fromTo(
          ".who-pill",
          { x: -30, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, stagger: 0.15, duration: 0.5, ease: "power2.out" }
        )
        .fromTo(
          ".who-cta",
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.4 },
          "-=0.2"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const pills = Array.from(document.querySelectorAll(".who-pill"));
    const handlePillMove = (e) => {
      const pill = e.currentTarget;
      const rect = pill.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      gsap.to(pill, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handlePillLeave = (e) => {
      gsap.to(e.currentTarget, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)"
      });
    };

    pills.forEach((pill) => {
      pill.addEventListener("mousemove", handlePillMove);
      pill.addEventListener("mouseleave", handlePillLeave);
    });

    return () => {
      pills.forEach((pill) => {
        pill.removeEventListener("mousemove", handlePillMove);
        pill.removeEventListener("mouseleave", handlePillLeave);
      });
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="min-h-screen snap-start bg-mintGreen flex items-center justify-center px-4 overflow-hidden"
    >
      <div className="who-card w-full max-w-5xl bg-bubblePink rounded-[3rem] p-8 md:p-20 shadow-xl border-4 border-deepGreenText flex flex-col items-start">
        <h2 className="who-headline text-4xl md:text-6xl font-display font-bold text-deepGreenText mb-12 leading-tight">
          DENERF IS FOR FOUNDERS WHO...
        </h2>

        <div className="flex flex-col gap-4 mb-12 w-full">
          {[
            "Want MVPs shipped in days, not months",
            "Are open to AI-assisted workflows",
            "Hate wasting budget on overhead",
            "Value speed and transparency"
          ].map((text, i) => (
            <div
              key={i}
              className="who-pill bg-white px-6 py-4 rounded-full border-2 border-deepGreenText text-lg md:text-xl font-bold text-deepGreenText shadow-[4px_4px_0px_0px_rgba(0,77,51,1)] hover:translate-x-2 transition-transform flex items-center gap-4 w-fit"
            >
              <div className="w-8 h-8 rounded-full bg-lemonYellow border-2 border-deepGreenText flex items-center justify-center">
                <Check className="w-5 h-5 text-deepGreenText" />
              </div>
              {text}
            </div>
          ))}
        </div>

        <button className="who-cta group px-8 py-4 bg-deepGreenText text-white font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2">
          See Example Projects
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
