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
      // === 1. CARD ENTRANCE (Plays BEFORE pinning) ===
      // This ensures the card is visible as you scroll into the section
      gsap.fromTo(".who-card",
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
      const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 1080;
      const contentHeight = rootRef.current?.offsetHeight || viewportHeight;
      const scrollDistance = `+=${Math.max(viewportHeight * 1.5, contentHeight + viewportHeight * 0.25)}`;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: scrollDistance, // Pin long enough for the content height
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // 1. HEADLINE DROP (starts immediately on pin)
      tl.fromTo(".who-headline",
        { y: -80, opacity: 0, rotateX: -20 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          ease: "bounce.out"
        },
        "0"
      );

      // 2. PILLS STAGGER (Scrubbed)
      const pills = gsap.utils.toArray(".who-pill");
      pills.forEach((pill, i) => {
        tl.fromTo(pill,
          {
            x: -100,
            opacity: 0,
            rotateZ: -5,
            scale: 0.9
          },
          {
            x: 0,
            opacity: 1,
            rotateZ: 0,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.5)"
          },
          "-=0.3"
        );

        // Check icon pop
        const checkIcon = pill.querySelector(".check-icon");
        if (checkIcon) {
          tl.fromTo(checkIcon,
            { scale: 0, rotation: -180 },
            {
              scale: 1,
              rotation: 0,
              duration: 0.4,
              ease: "elastic.out(1.2, 0.5)"
            },
            "<+=0.2"
          );
        }
      });

      // 3. CTA BUTTON
      tl.fromTo(".who-cta",
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.5)"
        },
        "-=0.2"
      );

      // Buffer
      tl.to({}, { duration: 0.5 });

    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleSeeProjects = () => {
    const showreel = typeof document !== "undefined" ? document.getElementById("section-showreel") : null;
    if (!showreel) return;
    const targetY = Math.max(showreel.offsetTop - 16, 0);
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  // === MAGNETIC PILL HOVER EFFECT ===
  useEffect(() => {
    const pills = Array.from(document.querySelectorAll(".who-pill"));

    const handlePillMove = (e) => {
      if (window.matchMedia("(hover: none)").matches) return;

      const pill = e.currentTarget;
      const rect = pill.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      gsap.to(pill, {
        x: x * 0.25,
        y: y * 0.25,
        rotation: x * 0.02,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handlePillLeave = (e) => {
      gsap.to(e.currentTarget, {
        x: 0,
        y: 0,
        rotation: 0,
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
      className="min-h-screen bg-mintGreen flex items-center justify-center px-4 overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      <div
        className="who-card w-full max-w-5xl bg-bubblePink rounded-[3rem] p-8 md:p-20 shadow-xl border-4 border-deepGreenText flex flex-col items-start will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <h2 className="who-headline text-4xl md:text-6xl font-display font-bold text-deepGreenText mb-12 leading-tight will-change-transform">
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
              className="who-pill bg-white px-6 py-4 rounded-full border-2 border-deepGreenText text-lg md:text-xl font-bold text-deepGreenText shadow-[4px_4px_0px_0px_rgba(0,77,51,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,77,51,1)] transition-all flex items-center gap-4 w-fit cursor-pointer will-change-transform"
            >
              <div className="check-icon w-8 h-8 rounded-full bg-lemonYellow border-2 border-deepGreenText flex items-center justify-center will-change-transform">
                <Check className="w-5 h-5 text-deepGreenText" />
              </div>
              {text}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleSeeProjects}
          className="who-cta group px-8 py-4 bg-deepGreenText text-white font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(255,232,107,1)] will-change-transform"
        >
          See Example Projects
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </section>
  );
}
