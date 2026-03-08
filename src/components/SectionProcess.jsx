import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SectionProcess() {
  const rootRef = useRef(null);

  const steps = [
    { title: "Discovery + Brief", desc: "15-minute call or async brief. We align on scope, success metrics, and must-haves.", timing: "<1 day" },
    { title: "AI Prototype", desc: "Interactive flows, motion cues, and hero concept in 48 hours for quick validation.", timing: "48 hours" },
    { title: "Build & Ship", desc: "Ship the MVP experience with motion polish, handoff, and launch support.", timing: "5–10 days" }
  ];

  const proof = [
    { label: "MVPs shipped", value: "12 in 90 days" },
    { label: "Performance", value: "LCP < 1.6s avg" },
    { label: "Response time", value: "< 2 hours" }
  ];

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const prefersReducedMotion = typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(".process-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".process-header",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Step cards stagger
      gsap.fromTo(".process-card",
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".process-cards-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Proof pills stagger
      gsap.fromTo(".proof-pill",
        { y: 20, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".proof-pills",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} aria-label="Our process" className="bg-gradient-to-b from-creamWhite to-mintGreen/25 px-4 py-16 md:py-24 flex justify-center">
      <div className="w-full max-w-5xl space-y-10">
        <div className="process-header text-center space-y-3 will-change-transform">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-deepInk/60">How we work</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-deepInk leading-tight">A fast, low-risk delivery loop.</h2>
          <p className="text-base md:text-lg text-deepInk/70 max-w-3xl mx-auto">
            One loop: align, prototype, ship. You see work in days, pay only when you love it.
          </p>
        </div>

        <div className="process-cards-grid grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step) => (
            <div key={step.title} className="process-card rounded-[--radius-card] border-2 border-deepGreenText bg-white shadow-[--shadow-brutal-lg-subtle] p-6 space-y-3 hover:-translate-y-1 transition-transform duration-[--duration-snappy] will-change-transform">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lemonYellow text-deepGreenText text-xs font-bold border border-deepGreenText/30">
                {step.timing}
              </div>
              <h3 className="text-xl font-display font-bold text-deepInk leading-tight">{step.title}</h3>
              <p className="text-sm text-deepInk/70">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="proof-pills flex flex-wrap justify-center gap-3">
          {proof.map((item) => (
            <div key={item.label} className="proof-pill px-4 py-3 rounded-full bg-deepInk text-offWhite border-2 border-deepGreenText shadow-[--shadow-brutal-sm-yellow] text-sm md:text-base font-bold flex items-center gap-2 will-change-transform">
              <span className="text-lemonYellow">●</span>
              <span>{item.label}:</span>
              <span className="text-neonMint">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
