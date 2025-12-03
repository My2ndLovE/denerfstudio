import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Play, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function SectionHero() {
  const rootRef = useRef(null);
  const blobRef = useRef(null);
  const magnetRef = useRef(null);
  const [verbIndex, setVerbIndex] = useState(0);
  const verbs = ["build", "choreograph", "animate", "ship"];
  const prefersFinePointer = useRef(
    typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(pointer: fine)").matches
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setVerbIndex((prev) => (prev + 1) % verbs.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

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

      tl.to(".hero-blobs", { opacity: 1, duration: 1, ease: "power2.out" })
        .fromTo(
          ".hero-heading",
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          ".hero-ctas",
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1 },
          "-=0.5"
        )
        .fromTo(
          ".hero-devices",
          { y: -80, rotation: -8, autoAlpha: 0, scale: 0.85 },
          {
            y: 0,
            rotation: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.7)"
          }
        );
    }, rootRef);

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;

      gsap.to(".hero-blobs", {
        x: x,
        y: y,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const floatBlob = blobRef.current;
    if (floatBlob) {
      gsap.to(floatBlob, {
        y: 20,
        rotation: 3,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  const handleMagnetMove = (e) => {
    if (!prefersFinePointer.current) return;
    if (!magnetRef.current) return;
    const rect = magnetRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(magnetRef.current, {
      x: x * 0.18,
      y: y * 0.18,
      duration: 0.25,
      ease: "power2.out"
    });
  };

  const resetMagnet = () => {
    if (!magnetRef.current) return;
    gsap.to(magnetRef.current, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "elastic.out(1, 0.4)"
    });
  };

  return (
    <section
      ref={rootRef}
      className="min-h-screen snap-start bg-gradient-to-br from-creamWhite via-mintGreen/30 to-skyBlue/40 flex flex-col items-center justify-center px-4 overflow-hidden relative"
    >
      <div className="hero-blobs absolute inset-0 opacity-0 pointer-events-none">
        <div className="absolute top-10 left-6 w-64 h-64 bg-lemonYellow rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-skyBlue rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-neonMint/40 rounded-full blur-[80px] opacity-70"></div>
      </div>

      <div className="z-10 text-center max-w-5xl mx-auto flex flex-col items-center gap-8">
        <div className="hero-heading space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold tracking-wide text-deepInk bg-white/70 rounded-full backdrop-blur-sm border border-deepInk/10 shadow-soft">
            <Sparkles className="w-4 h-4 text-deepInk" />
            JOYFUL CREATIVE AGENCY — UI/UX + MOTION
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-deepInk leading-tight">
            Creative products that{" "}
            <span className="relative inline-block px-2 rounded-2xl bg-neonMint/60 text-deepInk shadow-[0_6px_0_0_rgba(11,42,27,0.16)]">
              {verbs[verbIndex]}
            </span>{" "}
            back.
          </h1>
          <p className="text-lg md:text-xl text-deepInk/80 max-w-2xl mx-auto font-body">
            We mix playful motion, crisp UX, and rapid build cycles to launch what others only storyboard.
            Mobile-first, motion-led, founder-friendly.
          </p>
        </div>

        <div className="hero-ctas flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button
            ref={magnetRef}
            onMouseMove={handleMagnetMove}
            onMouseLeave={resetMagnet}
            className="group relative px-9 py-4 bg-deepInk text-offWhite font-bold rounded-full border-2 border-deepInk shadow-[6px_8px_0px_0px_rgba(11,42,27,0.45)] transition-all duration-[var(--duration-snappy)]"
          >
            <span className="flex items-center gap-3">
              Show me the magic
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
            <span className="pointer-events-none absolute -inset-1 rounded-full border border-neonMint/60 opacity-0 group-hover:opacity-100 group-hover:blur-sm transition-all duration-300" />
          </button>
          <button className="flex items-center gap-3 px-9 py-4 bg-creamWhite text-deepInk font-bold rounded-full border-2 border-deepInk shadow-[6px_8px_0px_0px_rgba(11,42,27,0.25)] hover:-translate-y-1 transition-transform duration-[var(--duration-snappy)]">
            <Play className="w-5 h-5" />
            Scope it in 15 minutes
          </button>
        </div>

        <div className="hero-devices relative w-full max-w-3xl h-[420px] md:h-[500px] flex items-center justify-center perspective-1000">
          <div
            ref={blobRef}
            className="absolute inset-x-6 top-6 bottom-12 bg-[radial-gradient(circle_at_30%_20%,rgba(255,232,107,0.55),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(141,235,255,0.5),transparent_40%),radial-gradient(circle_at_40%_80%,rgba(124,255,178,0.5),transparent_35%)] rounded-[40px] blur-[16px] opacity-90"
          ></div>

          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute -left-6 sm:-left-12 -rotate-6 bg-white border-4 border-deepInk rounded-3xl shadow-lift w-56 sm:w-72 md:w-80 h-60 md:h-72 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-lemonYellow/40 via-creamWhite to-skyBlue/40"></div>
              <div className="absolute inset-4 bg-white/70 backdrop-blur-sm rounded-2xl border-2 border-deepInk/10 flex flex-col justify-center items-start px-6 gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-deepInk/60">
                  Storyboard
                </span>
                <p className="text-lg font-display text-deepInk leading-tight">
                  Microinteractions that smile back.
                </p>
              </div>
            </div>

            <div className="absolute right-2 sm:right-6 rotate-3 bg-deepInk text-offWhite border-4 border-deepInk rounded-[32px] shadow-[10px_14px_0_0_rgba(11,42,27,0.4)] w-48 sm:w-64 md:w-72 h-64 md:h-80 overflow-hidden flex flex-col">
              <div className="flex-1 bg-gradient-to-b from-deepInk to-deepInk/90 flex flex-col justify-between p-6 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,255,178,0.12),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(141,235,255,0.14),transparent_45%)]"></div>
                <div className="relative space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-offWhite/10 border border-offWhite/10 text-xs font-semibold">
                    Playful SaaS
                  </div>
                  <h3 className="text-2xl font-display leading-tight">
                    Motion-led flows crafted for thumbs.
                  </h3>
                </div>
                <div className="relative flex items-center justify-between text-sm font-semibold">
                  <span className="text-offWhite/80">Live prototype</span>
                  <span className="px-3 py-1 rounded-full bg-offWhite text-deepInk">00:12</span>
                </div>
              </div>
              <div className="h-10 bg-offWhite/10 border-t border-offWhite/10 flex items-center justify-center text-sm font-semibold tracking-wide">
                Tap & drag to orbit
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
