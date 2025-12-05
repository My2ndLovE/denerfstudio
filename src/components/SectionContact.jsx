import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarRange, MessageCircle, PhoneCall, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const options = [
  {
    title: "I need a jaw-drop homepage",
    desc: "Hero + scroll story + motion system. Fast design/build to launch.",
    badge: "UI/UX + Motion",
    accent: "bg-lemonYellow/70"
  },
  {
    title: "I need a motion system",
    desc: "Microinteractions, transitions, and prototyping to handoff to dev.",
    badge: "Motion Lab",
    accent: "bg-neonMint/70"
  },
  {
    title: "I need a product UI revamp",
    desc: "Component library, design tokens, and playful UX for mobile-first.",
    badge: "Product",
    accent: "bg-skyBlue/70"
  }
];

const quickActions = [
  { label: "WhatsApp", href: "https://wa.me/60165271501", icon: MessageCircle },
  { label: "Telegram", href: "https://t.me/yourhandle", icon: Send },
  { label: "Email", href: "mailto:sam@denerf.studio", icon: Send }
];

export function SectionContact() {
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

      // 1. HEADER TITLE REVEAL
      tl.fromTo(".contact-header",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        }
      );

      // 2. OPTION CARDS - STAGGERED CASCADE
      const cards = gsap.utils.toArray(".option-card");
      cards.forEach((card, i) => {
        tl.fromTo(card,
          {
            y: 100,
            opacity: 0,
            rotateY: -15,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)"
          },
          "-=0.5"
        );
      });

      // 3. PANELS SLIDE IN
      tl.fromTo(".quick-actions-panel",
        { x: -150, opacity: 0, rotateY: 20 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          ease: "power3.out"
        },
        "-=0.5"
      );

      tl.fromTo(".calendar-panel",
        { x: 100, opacity: 0, rotateY: -15 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          ease: "power3.out"
        },
        "<"
      );

      // 4. QUICK ACTION BUTTONS STAGGER
      const btns = gsap.utils.toArray(".quick-action-btn");
      btns.forEach((btn, i) => {
        tl.fromTo(btn,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.5)"
          },
          "-=0.3"
        );
      });

      // Buffer
      tl.to({}, { duration: 0.5 });

    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="min-h-screen bg-gradient-to-b from-offWhite via-mintGreen/25 to-skyBlue/25 px-4 py-16 flex items-center justify-center"
      style={{ perspective: "1200px" }}
    >
      <div className="w-full max-w-5xl space-y-10">
        <div className="contact-header space-y-3 text-deepInk text-center will-change-transform">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-deepInk/60">
            Choose your adventure
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold leading-tight">
            Tell us what you're dreaming up.
          </h2>
          <p className="text-base sm:text-lg text-deepInk/70 max-w-3xl mx-auto">
            Drop a quick brief—voice note or Figma link welcome. We reply in under 2 hours with
            a motion idea and a first-build plan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ perspective: "1000px" }}>
          {options.map((option, i) => (
            <div
              key={option.title}
              className="option-card group relative rounded-[24px] border-2 border-deepInk bg-white shadow-[10px_12px_0_0_rgba(11,42,27,0.2)] overflow-hidden hover:-translate-y-2 transition-transform duration-[var(--duration-snappy)] will-change-transform cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className={`absolute inset-0 ${option.accent} blur-3xl opacity-40 pointer-events-none`}></div>
              <div className="relative p-6 space-y-4">
                <span className="inline-flex px-3 py-1 rounded-full bg-deepInk text-offWhite text-xs font-semibold">
                  {option.badge}
                </span>
                <h3 className="text-xl font-display font-bold text-deepInk leading-tight">{option.title}</h3>
                <p className="text-sm text-deepInk/70">{option.desc}</p>
                <button className="inline-flex items-center gap-2 text-sm font-bold text-deepInk group-hover:translate-x-2 transition-transform">
                  Start this brief
                  <span aria-hidden="true" className="text-lg">↗</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-4" style={{ perspective: "1000px" }}>
          <div
            className="quick-actions-panel flex-1 rounded-[24px] border-2 border-deepInk bg-deepInk text-offWhite p-6 shadow-[10px_12px_0_0_rgba(11,42,27,0.35)] flex flex-col gap-4 will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-offWhite/70">Quick actions</p>
                <p className="text-lg font-bold">Pick a channel—we respond fast</p>
              </div>
              <div className="px-3 py-1 rounded-full bg-offWhite text-deepInk text-xs font-bold glow-pulse">
                &lt; 2h
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, i) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="quick-action-btn inline-flex items-center gap-2 px-4 py-2 rounded-full bg-offWhite/10 border border-offWhite/20 hover:bg-offWhite/20 hover:scale-105 transition-all text-sm font-semibold will-change-transform"
                >
                  <action.icon className="w-4 h-4" />
                  {action.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3 text-sm text-offWhite/80">
              <PhoneCall className="w-4 h-4" />
              Prefer voice? Send a voice note or schedule below.
            </div>
          </div>

          <div
            className="calendar-panel w-full md:w-60 rounded-[24px] border-2 border-deepInk bg-white p-6 shadow-[10px_12px_0_0_rgba(11,42,27,0.2)] flex flex-col gap-4 justify-between will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neonMint text-deepInk text-xs font-bold">
                <CalendarRange className="w-4 h-4" />
                Calendar
              </span>
              <h4 className="text-lg font-display font-bold text-deepInk">Book a 15-min intro</h4>
              <p className="text-sm text-deepInk/70">Live or async—your choice. We'll prep ideas before the call.</p>
            </div>
            <button className="w-full px-4 py-3 rounded-full bg-deepInk text-offWhite font-bold border-2 border-deepInk hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(124,255,178,0.5)] transition-all duration-[var(--duration-snappy)]">
              Open calendar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
