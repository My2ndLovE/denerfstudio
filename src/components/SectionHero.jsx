import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Play, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function SectionHero({ onOpenModal }) {
  const rootRef = useRef(null);

  const magnetRef = useRef(null);
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
      // === ENTRY ANIMATION (plays on load) ===
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
          ".hero-lottie",
          { y: -40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "back.out(1.7)"
          }
        );

      // Continuous Float for Buttons
      gsap.to(".hero-btn-wrapper", {
        y: -6,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.3
      });



      // === LIVING SCRIBBLE ANIMATION ===
      const scribble = document.querySelector(".logo-scribble");
      if (scribble) {
        gsap.fromTo(".logo-scribble",
          { strokeDasharray: 100, strokeDashoffset: 100 },
          {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.5
          }
        );
      }

      // === SCRUBBED PARALLAX ON SCROLL (award-winning technique) ===
      // Multi-layer parallax: each blob moves at different speeds
      gsap.to(".blob-layer-1", {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5  // Smooth 1.5s lag for cinematic feel
        }
      });

      gsap.to(".blob-layer-2", {
        y: -300,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to(".blob-layer-3", {
        y: -100,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2
        }
      });

    }, rootRef);

    // === MOUSE PARALLAX (Desktop only) ===
    const handleMouseMove = (e) => {
      if (window.matchMedia("(hover: none)").matches) return;

      const xNorm = (e.clientX / window.innerWidth - 0.5);
      const yNorm = (e.clientY / window.innerHeight - 0.5);

      // Different layers move at different intensities
      gsap.to(".blob-layer-1", {
        x: xNorm * 30,
        y: yNorm * 30,
        duration: 1.2,
        ease: "power2.out"
      });

      gsap.to(".blob-layer-2", {
        x: xNorm * 50,
        y: yNorm * 50,
        duration: 1,
        ease: "power2.out"
      });

      gsap.to(".blob-layer-3", {
        x: xNorm * 20,
        y: yNorm * 20,
        duration: 1.5,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const existingScript = document.querySelector("script[src='https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.5/dist/dotlottie-wc.js']");
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = "https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.5/dist/dotlottie-wc.js";
    script.type = "module";
    document.head.appendChild(script);
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
      className="min-h-screen bg-gradient-to-br from-creamWhite via-mintGreen/30 to-skyBlue/40 flex flex-col items-center justify-center px-4 overflow-hidden relative perspective-1000"
    >
      {/* Multi-Layer Parallax Blobs */}
      <div className="hero-blobs absolute inset-0 opacity-0 pointer-events-none will-change-transform">
        {/* Layer 1 - Slowest (foreground feel) */}
        <div className="blob-layer-1 absolute top-10 left-6 w-64 h-64 bg-lemonYellow rounded-full blur-3xl opacity-50"></div>

        {/* Layer 2 - Medium speed */}
        <div className="blob-layer-2 absolute bottom-10 right-10 w-80 h-80 bg-skyBlue rounded-full blur-3xl opacity-50"></div>

        {/* Layer 3 - Fastest (background) */}
        <div className="blob-layer-3 absolute top-1/2 left-1/3 w-72 h-72 bg-neonMint/40 rounded-full blur-[80px] opacity-70"></div>
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      ></div>

      {/* Scribble accent for logo anim hook */}
      <svg className="logo-scribble absolute top-4 left-5 w-12 h-6 text-deepInk/60 pointer-events-none" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
        <path d="M5 25 C25 5, 45 35, 65 12 S95 30, 85 20" />
      </svg>

      {/* Company Logo - Stacked Design */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50 pointer-events-auto cursor-pointer select-none">
        <div className="flex flex-col items-start leading-none">
          <span className="font-body text-[10px] md:text-xs text-deepInk/50 tracking-[0.3em] uppercase pl-0.5">
            Studio
          </span>
          <span className="font-display font-black text-2xl md:text-4xl text-deepInk tracking-tight uppercase -mt-0.5">
            Denerf
          </span>
        </div>
      </div>

      <div className="z-10 text-center max-w-5xl mx-auto flex flex-col items-center gap-8">

        <div className="hero-content-wrapper space-y-6 flex flex-col items-center will-change-transform">
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

        <div className="relative w-full flex items-center justify-center pt-0 -mt-16 sm:-mt-8 h-[300px] sm:h-[320px] md:h-[340px]">
          <div className="hero-lottie absolute inset-x-0 bottom-[-80px] sm:bottom-[-48px] md:bottom-[-20px] flex items-center justify-center pointer-events-none will-change-transform">
            <dotlottie-wc
              src="https://lottie.host/5d0fa4c5-4ca6-4419-8117-0c2d62fdf8d6/VOhL48A5qp.lottie"
              style={{
                width: "clamp(240px, 76vw, 440px)",
                height: "clamp(180px, 62vw, 300px)"
              }}
              autoplay
              loop
            ></dotlottie-wc>
          </div>
          <div className="relative z-10 hero-ctas flex flex-col sm:flex-row gap-5 items-center justify-center -translate-y-[212px] sm:-translate-y-32 md:-translate-y-20 will-change-transform">
            <div className="hero-btn-wrapper">
              <button
                ref={magnetRef}
                onMouseMove={handleMagnetMove}
                onMouseLeave={resetMagnet}
                onClick={onOpenModal}
                className="group relative px-10 py-5 bg-deepInk text-offWhite font-bold text-lg rounded-full border-2 border-deepInk shadow-[8px_8px_0px_0px_rgba(11,42,27,0.3)] hover:shadow-[12px_12px_0px_0px_rgba(11,42,27,0.3)] hover:-translate-x-1 hover:-translate-y-1 active:shadow-[4px_4px_0px_0px_rgba(11,42,27,0.3)] active:translate-x-1 active:translate-y-1 transition-all duration-200 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start free demo
                  <ArrowRight className="w-6 h-6 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer-auto" />
              </button>
            </div>
            <div className="hero-btn-wrapper">
              <button
                onClick={() => document.getElementById('section-denerf')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative flex items-center gap-3 px-10 py-5 bg-white text-deepInk font-bold text-lg rounded-full border-2 border-deepInk shadow-[8px_8px_0px_0px_rgba(255,232,107,1)] hover:shadow-[12px_12px_0px_0px_rgba(255,232,107,1)] hover:-translate-x-1 hover:-translate-y-1 active:shadow-[4px_4px_0px_0px_rgba(255,232,107,1)] active:translate-x-1 active:translate-y-1 transition-all duration-200 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Play className="w-5 h-5 fill-current" />
                  See it in action
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-deepInk/10 to-transparent -translate-x-full animate-shimmer-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
