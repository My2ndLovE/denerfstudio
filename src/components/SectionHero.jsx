import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Play, ArrowRight, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function SectionHero() {
  const rootRef = useRef(null);
  const blobRef = useRef(null);
  const magnetRef = useRef(null);
  const device1Ref = useRef(null);
  const device2Ref = useRef(null);
  const [verbIndex, setVerbIndex] = useState(0);
  const verbs = ["build", "craft", "animate", "ship"];
  const prefersFinePointer = useRef(
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(pointer: fine)").matches
  );

  const isMounted = useRef(false);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const headlines = [
    { line1: "Free demo.", line2: "Zero risk." },
    { line1: "Min cost.", line2: "Max quality." }
  ];

  const verbRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Animate Out
      if (verbRef.current) {
        gsap.to(verbRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            setVerbIndex((prev) => (prev + 1) % verbs.length);
          }
        });
      }
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    // Animate In whenever verbIndex changes
    if (verbRef.current) {
      gsap.fromTo(verbRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, [verbIndex]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    gsap.fromTo(".hero-line-1",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
    gsap.fromTo(".hero-line-2",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.1 }
    );
  }, [headlineIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      const tl = gsap.timeline({
        onComplete: () => setHeadlineIndex(prev => (prev + 1) % headlines.length)
      });
      tl.to(".hero-line-1", { y: -40, opacity: 0, duration: 0.5, ease: "power2.in" })
        .to(".hero-line-2", { y: -40, opacity: 0, duration: 0.5, ease: "power2.in" }, "-=0.4");
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // Initial Entry Animation
      const entryTl = gsap.timeline();
      entryTl.to(".hero-blobs", { opacity: 1, duration: 1, ease: "power2.out" })
        .fromTo(
          ".hero-content-wrapper",
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

      // Scroll-Driven Progressive Animation (Devices Only)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        }
      });

      scrollTl
        .to(".hero-devices", {
          y: 100,
          rotation: 5,
          scale: 0.95,
          ease: "none"
        });

    }, rootRef);

    const handleMouseMove = (e) => {
      const xNorm = (e.clientX / window.innerWidth - 0.5);
      const yNorm = (e.clientY / window.innerHeight - 0.5);

      gsap.to(".hero-blobs", {
        x: xNorm * 40,
        y: yNorm * 40,
        duration: 1,
        ease: "power2.out"
      });

      if (device1Ref.current) {
        gsap.to(device1Ref.current, {
          rotationY: xNorm * 10,
          rotationX: -yNorm * 10,
          x: xNorm * 30,
          duration: 0.8,
          ease: "power2.out"
        });
      }

      if (device2Ref.current) {
        gsap.to(device2Ref.current, {
          rotationY: xNorm * 15,
          rotationX: -yNorm * 15,
          x: xNorm * -30,
          duration: 1,
          ease: "power2.out"
        });
      }
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
      className="min-h-screen snap-start bg-gradient-to-br from-creamWhite via-mintGreen/30 to-skyBlue/40 flex flex-col items-center justify-center px-4 overflow-hidden relative perspective-1000"
    >
      <div className="hero-blobs absolute inset-0 opacity-0 pointer-events-none">
        <div className="absolute top-10 left-6 w-64 h-64 bg-lemonYellow rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-skyBlue rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-neonMint/40 rounded-full blur-[80px] opacity-70"></div>
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      ></div>

      <div className="z-10 text-center max-w-5xl mx-auto flex flex-col items-center gap-8">

        <div className="hero-content-wrapper space-y-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold tracking-wide text-deepInk bg-white/60 rounded-full backdrop-blur-md border border-deepInk/10 shadow-sm hover:scale-105 transition-transform cursor-default">
            <Sparkles className="w-4 h-4 text-neonMint fill-deepInk" />
            ZERO RISK · PAY ONLY IF YOU LOVE IT
          </div>

          {/* Auto-Rotating Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-extrabold text-deepInk leading-[0.9] tracking-tight min-h-[1.8em]">
            <div className="hero-line-1 inline-block">
              {headlines[headlineIndex].line1}
            </div>
            <br />
            <div className="hero-line-2 inline-block text-transparent bg-clip-text bg-gradient-to-r from-deepInk to-deepInk/80">
              {headlines[headlineIndex].line2}
            </div>
          </h1>

          <p className="text-xl md:text-2xl text-deepInk/70 max-w-2xl mx-auto font-medium leading-relaxed flex flex-wrap items-center justify-center gap-x-2">
            <span className="w-full sm:w-auto">We build your MVP preview in days.</span>
            <span className="hidden sm:block w-full h-0"></span>
            <span className="text-deepInk font-bold">Pay only if you love what we</span>
            <span className="relative inline-flex items-center justify-start h-[1.6em] min-w-[160px] px-3 rounded-lg bg-neonMint/40 text-deepInk border border-neonMint/20 overflow-hidden">
              <span ref={verbRef} className="inline-block font-bold">
                {verbs[verbIndex]}
              </span>
            </span>
            <span>.</span>
          </p>
        </div>

        <div className="hero-ctas flex flex-col sm:flex-row gap-5 items-center justify-center pt-2">
          <button
            ref={magnetRef}
            onMouseMove={handleMagnetMove}
            onMouseLeave={resetMagnet}
            className="group relative px-10 py-5 bg-deepInk text-offWhite font-bold text-lg rounded-full border-2 border-deepInk shadow-[8px_8px_0px_0px_rgba(11,42,27,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(11,42,27,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              Start free demo
              <ArrowRight className="w-6 h-6 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          </button>
          <button className="flex items-center gap-3 px-10 py-5 bg-white text-deepInk font-bold text-lg rounded-full border-2 border-deepInk shadow-[8px_8px_0px_0px_rgba(255,232,107,1)] hover:shadow-[4px_4px_0px_0px_rgba(255,232,107,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
            <Play className="w-5 h-5 fill-current" />
            See it in action
          </button>
        </div>

        <div className="hero-devices relative w-full max-w-3xl h-[420px] md:h-[500px] flex items-center justify-center perspective-1000">
          <div
            ref={blobRef}
            className="absolute inset-x-6 top-6 bottom-12 bg-[radial-gradient(circle_at_30%_20%,rgba(255,232,107,0.55),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(141,235,255,0.5),transparent_40%),radial-gradient(circle_at_40%_80%,rgba(124,255,178,0.5),transparent_35%)] rounded-[40px] blur-[16px] opacity-90"
          ></div>

          <div className="relative w-full h-full flex items-center justify-center">
            <div
              ref={device1Ref}
              className="absolute -left-6 sm:-left-12 -rotate-6 bg-white border-4 border-deepInk rounded-3xl shadow-lift w-56 sm:w-72 md:w-80 h-60 md:h-72 overflow-hidden transform-gpu"
            >
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

            <div
              ref={device2Ref}
              className="absolute right-2 sm:right-6 rotate-3 bg-deepInk text-offWhite border-4 border-deepInk rounded-[32px] shadow-[10px_14px_0_0_rgba(11,42,27,0.4)] w-48 sm:w-64 md:w-72 h-64 md:h-80 overflow-hidden flex flex-col transform-gpu"
            >
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
