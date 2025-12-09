
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHero } from "./components/SectionHero";
import { SectionWithDenerf } from "./components/SectionWithDenerf";
import { SectionBlob } from "./components/SectionBlob";
import { SectionLighter } from "./components/SectionLighter";
import { SectionWhoIs } from "./components/SectionWhoIs";
import { SectionShowreel } from "./components/SectionShowreel";
import { SectionToolbelt } from "./components/SectionToolbelt";
import { SectionTrust } from "./components/SectionTrust";
import { SectionContact } from "./components/SectionContact";
import { MobileQuickBar } from "./components/MobileQuickBar";
import { ContactModal } from "./components/ContactModal";
import { ArrowDown, ArrowUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const sectionOrder = [
    "section-hero",
    "section-denerf",
    "section-showreel",
    "section-blob",
    "section-lighter",
    "section-who",
    "section-toolbelt",
    "section-contact",
    "section-trust"
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollStateTimeout = useRef(null);

  useEffect(() => {
    // Force a refresh after a short delay to ensure layout is settled (fonts, etc.)
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const btns = gsap.utils.toArray(".floating-nav-btn");
      if (!btns.length) return;
      gsap.to(btns, {
        y: -8,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.15
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const updateEndState = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      setIsAtEnd(scrollBottom >= docHeight - 10);
    };
    updateEndState();
    window.addEventListener("scroll", updateEndState);
    window.addEventListener("resize", updateEndState);
    return () => {
      window.removeEventListener("scroll", updateEndState);
      window.removeEventListener("resize", updateEndState);
    };
  }, []);

  useEffect(() => {
    const triggerScrollState = () => {
      setIsScrolling(true);
      if (scrollStateTimeout.current) clearTimeout(scrollStateTimeout.current);
      scrollStateTimeout.current = setTimeout(() => setIsScrolling(false), 450);
    };
    window.addEventListener("scroll", triggerScrollState);
    return () => {
      window.removeEventListener("scroll", triggerScrollState);
      if (scrollStateTimeout.current) clearTimeout(scrollStateTimeout.current);
    };
  }, []);

  const scrollToNextSection = () => {
    const sections = sectionOrder
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const scrollMid = window.scrollY + window.innerHeight / 2;

    // Find current section using viewport midpoint
    let currentIndex = sections.findIndex((section) => {
      const start = section.offsetTop;
      const end = section.offsetTop + section.offsetHeight;
      return scrollMid >= start && scrollMid < end;
    });

    if (currentIndex === -1) {
      // Fallback to the last section the midpoint has passed
      currentIndex = sections.reduce((idx, section, i) => {
        return section.offsetTop <= scrollMid ? i : idx;
      }, -1);
    }

    const nextSection = sections[currentIndex + 1];
    if (!nextSection) return;

    const sectionTop = nextSection.offsetTop;
    const sectionEnd = sectionTop + nextSection.offsetHeight;

    // Scroll into the section enough to see the pinned animation but stay inside it
    const desired = sectionTop + nextSection.offsetHeight * 0.6;
    const clampEnd = sectionEnd - window.innerHeight * 0.5;
    const targetOffset = Math.max(sectionTop, Math.min(desired, clampEnd));

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight - 4;
    window.scrollTo({
      top: Math.min(targetOffset, maxScroll),
      behavior: "smooth"
    });
  };

  const handleNext = () => {
    scrollToNextSection();
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSeeAction = () => {
    const showreel = document.getElementById("section-showreel");
    if (!showreel) return;
    const targetY = Math.max(showreel.offsetTop - 24, 0);
    window.scrollTo({ top: targetY, behavior: "smooth" });

    const firstCard = showreel.querySelector(".reel-card");
    if (firstCard) {
      gsap.fromTo(firstCard,
        { filter: "drop-shadow(0 0 0 rgba(124,255,178,0))", scale: 1 },
        {
          filter: "drop-shadow(0 0 14px rgba(124,255,178,0.6))",
          scale: 1.04,
          duration: 0.25,
          ease: "power2.out",
          yoyo: true,
          repeat: 3,
          delay: 0.4,
          clearProps: "filter,scale"
        }
      );
    }
  };

  return (
    <>
      {isMounted && typeof document !== "undefined" && (
        <style>
          {`
            .floating-nav-container { pointer-events: none; }
            .floating-nav-container button, .floating-nav-container .hint { pointer-events: auto; }

            .scroll-signal { pointer-events: none; }
            .scroll-signal .capsule { pointer-events: auto; transition: transform 0.3s var(--ease-soft), box-shadow 0.3s var(--ease-soft), border-color 0.3s var(--ease-soft), background 0.3s var(--ease-soft); }
            .scroll-signal .capsule.idle { box-shadow: 0 6px 14px rgba(0,77,51,0.12), 0 0 0 1px rgba(0,77,51,0.06); background: rgba(255,255,255,0.9); }
            .scroll-signal .capsule.running { transform: translateY(-1px) scale(1.01); box-shadow: 0 12px 24px rgba(0,77,51,0.18), 0 0 0 1px rgba(0,77,51,0.2); border-color: rgba(0,77,51,0.26); background: linear-gradient(140deg, rgba(124,255,178,0.92), rgba(255,255,255,0.95) 60%, rgba(141,235,255,0.9)); }

            @keyframes haloFloat {
              0% { transform: scale(0.96); box-shadow: 0 0 0 0 rgba(124,255,178,0.22); opacity: 0.9; }
              45% { transform: scale(1); box-shadow: 0 0 0 12px rgba(255,232,107,0.18); opacity: 1; }
              100% { transform: scale(0.96); box-shadow: 0 0 0 0 rgba(124,255,178,0.1); opacity: 0.85; }
            }

            @keyframes orbitSpin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }

            @keyframes labelIdle {
              0%,100% { letter-spacing: 0.26em; opacity: 0.82; }
              50% { letter-spacing: 0.32em; opacity: 1; }
            }

            @keyframes runnerIdle {
              0% { transform: translateX(-12%); opacity: 0.55; }
              50% { transform: translateX(6%); opacity: 0.85; }
              100% { transform: translateX(-12%); opacity: 0.55; }
            }

            @keyframes runnerActive {
              0% { transform: translateX(-70%) scaleX(0.9); opacity: 0.95; filter: blur(0px); }
              35% { filter: blur(0.6px); }
              100% { transform: translateX(110%) scaleX(1.08); opacity: 1; filter: blur(0.2px); }
            }

            @keyframes sparkDrift {
              from { background-position: 0 0, 60% 0, 120% 0; }
              to { background-position: 140% 0, 200% 0, 260% 0; }
            }

            @keyframes dashSweep {
              0% { stroke-dashoffset: 50; opacity: 0.3; }
              50% { stroke-dashoffset: 0; opacity: 1; }
              100% { stroke-dashoffset: -50; opacity: 0.3; }
            }

            @keyframes arrowNudge {
              0%,100% { transform: translateY(0); }
              50% { transform: translateY(3px); }
            }

            .scroll-signal .halo { animation: haloFloat 2.4s ease-in-out infinite; filter: drop-shadow(0 10px 18px rgba(0,77,51,0.14)); }
            .scroll-signal .capsule.running .halo { animation-duration: 1.4s; }
            .scroll-signal .orbit { animation: orbitSpin 4.2s linear infinite; opacity: 0; transition: opacity 0.24s var(--ease-soft); }
            .scroll-signal .capsule.running .orbit { animation-duration: 3s; opacity: 1; }
            .scroll-signal .orbit .orb { position: absolute; top: 50%; left: 50%; width: 5px; height: 5px; border-radius: 9999px; background: linear-gradient(145deg, #7CFFB2, #004D33); transform: translate(-50%, -50%) translateY(-12px); box-shadow: 0 0 0 5px rgba(124,255,178,0.16); }
            .scroll-signal .orbit .orb.alt { transform: translate(-50%, -50%) translateY(-12px) rotate(160deg); opacity: 0.55; box-shadow: 0 0 0 5px rgba(0,77,51,0.12); }
            .scroll-signal .core { background: radial-gradient(circle at 30% 30%, rgba(124,255,178,0.85), #004D33); }
            .scroll-signal .core.idle { opacity: 0; box-shadow: none; }
            .scroll-signal .label { animation: labelIdle 3s ease-in-out infinite; }
            .scroll-signal .capsule.running .label { animation: none; letter-spacing: 0.24em; }
            .scroll-signal .track { position: relative; overflow: hidden; }
            .scroll-signal .runner { position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(0,77,51,0.16), rgba(0,77,51,0.7), rgba(124,255,178,0.85), rgba(255,232,107,0.8), transparent); transform: translateX(-20%); animation: runnerIdle 2.3s ease-in-out infinite; }
            .scroll-signal .capsule.running .runner { animation: runnerActive 0.72s cubic-bezier(0.2, 0.8, 0.3, 1) infinite; }
            .scroll-signal .sparks { position: absolute; inset: 0; background-image: radial-gradient(circle at 20% 50%, rgba(124,255,178,0.45) 0, rgba(124,255,178,0.0) 45%), radial-gradient(circle at 60% 50%, rgba(255,182,213,0.35) 0, rgba(255,182,213,0.0) 35%), radial-gradient(circle at 100% 50%, rgba(141,235,255,0.45) 0, rgba(141,235,255,0.0) 40%); background-size: 26% 100%, 18% 100%, 30% 100%; background-repeat: no-repeat; opacity: 0.42; animation: sparkDrift 1.4s linear infinite; }
            .scroll-signal .capsule.running .sparks { opacity: 0.78; animation-duration: 0.62s; }
            .scroll-signal .ring-svg { position: absolute; inset: 0; transform: rotate(-90deg); opacity: 0; transition: opacity 0.24s var(--ease-soft); }
            .scroll-signal .ring-svg circle { fill: none; stroke-linecap: round; stroke-width: 3; stroke: rgba(0,77,51,0.2); }
            .scroll-signal .capsule.running .ring-svg { opacity: 1; }
            .scroll-signal .capsule.running .ring-svg circle { stroke: rgba(0,77,51,0.38); animation: dashSweep 1.4s ease-in-out infinite; }
            .scroll-signal .confetti { position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity 0.24s var(--ease-soft); }
            .scroll-signal .confetti span { position: absolute; width: 5px; height: 5px; border-radius: 9999px; opacity: 0.8; }
            .scroll-signal .capsule.running .confetti { opacity: 1; }
            .scroll-signal .idle-inner { display: grid; place-items: center; width: 100%; height: 100%; }
            .scroll-signal .capsule.running .idle-inner { display: none; }
            .scroll-signal .idle-arrow { display: inline-block; color: #0B2A1B; animation: arrowNudge 1.3s ease-in-out infinite; }
            .scroll-signal .idle-dots { position: absolute; bottom: 18%; left: 50%; display: flex; gap: 4px; transform: translateX(-50%); }
            .scroll-signal .idle-dots span { width: 4px; height: 4px; border-radius: 9999px; background: rgba(0,77,51,0.4); animation: runnerIdle 2s ease-in-out infinite; }
            .scroll-signal .idle-dots span:nth-child(2) { animation-delay: 0.12s; background: rgba(255,182,213,0.8); }
            .scroll-signal .idle-dots span:nth-child(3) { animation-delay: 0.24s; background: rgba(141,235,255,0.8); }

            /* Hanging logo plaque */
            .brand-plaque { pointer-events: none; transform: rotate(-1.2deg); }
            .brand-plaque .tag { box-shadow: 0 8px 18px rgba(0,77,51,0.14), 0 2px 0 rgba(0,77,51,0.16), 0 0 0 1px rgba(0,77,51,0.08); }
            .brand-plaque .rope { position: absolute; width: 3px; background: linear-gradient(180deg, #0B2A1B, #0B2A1B); border-radius: 99px; }
            .brand-plaque .rope.left { left: 10px; top: -16px; height: 24px; }
            .brand-plaque .rope.right { right: 14px; top: -28px; height: 38px; }
            .brand-plaque .knot { position: absolute; width: 9px; height: 9px; background: #0B2A1B; border-radius: 99px; box-shadow: 0 2px 0 rgba(0,0,0,0.1); }
            .brand-plaque .knot.left { left: 6px; top: -19px; }
            .brand-plaque .knot.right { right: 9px; top: -31px; }
            .brand-plaque .wood { background: linear-gradient(90deg, rgba(255,232,189,0.95), rgba(255,248,220,0.95)); }
            .brand-plaque .grain { background-image: repeating-linear-gradient(90deg, rgba(0,77,51,0.05) 0, rgba(0,77,51,0.05) 4px, transparent 4px, transparent 10px); mix-blend-mode: multiply; }
            .brand-plaque .sticker { position: absolute; width: 11px; height: 11px; border-radius: 999px; display: grid; place-items: center; font-size: 8px; font-weight: 800; }
            .brand-plaque .sticker.star { top: 4px; right: 6px; background: #FFB6D5; color: #0B2A1B; box-shadow: 0 2px 0 rgba(0,77,51,0.18); }
            .brand-plaque .sticker.heart { bottom: 4px; left: 6px; background: #8DEBFF; color: #0B2A1B; box-shadow: 0 2px 0 rgba(0,77,51,0.18); }
            @media (max-width: 767px) {
              .brand-plaque { transform: scale(0.9) rotate(-1deg); }
            }
          `}
        </style>
      )}
      <main className="w-full overflow-hidden">
        {/* Hanging logo plaque (non-blocking) */}
        <div className="brand-plaque fixed top-1 left-2 md:top-4 md:left-4 z-[40] scale-100 md:scale-[1.15] origin-top-left">
          <div className="rope left"></div>
          <div className="rope right"></div>
          <div className="knot left"></div>
          <div className="knot right"></div>
          <div className="tag relative wood rounded-[16px] px-3.5 py-2.5 flex items-center gap-3 transition-all duration-200 border border-deepGreenText/20 overflow-hidden">
            <div className="grain absolute inset-0 opacity-60 pointer-events-none"></div>
            <div className="sticker star">✦</div>
            <div className="sticker heart">❤</div>
            <div className="relative flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/70 border border-deepGreenText/10 shadow-[0_2px_0_rgba(0,77,51,0.16)]">
              <span className="absolute w-2.5 h-2.5 rounded-full bg-neonMint shadow-[0_0_0_1px_rgba(0,77,51,0.45)]"></span>
              <span className="absolute w-[7px] h-[7px] rounded-full bg-lemonYellow translate-x-[5px] translate-y-[3px] opacity-70"></span>
            </div>
            <div className="relative flex flex-col leading-tight">
              <span className="text-[12px] md:text-sm font-black tracking-[0.08em] text-deepGreenText">DENERF STUDIO</span>
              <span className="text-[9px] md:text-[11px] font-semibold tracking-[0.08em] text-deepGreenText/80">(003751888-X)</span>
            </div>
          </div>
        </div>
        <div id="section-hero" data-nav-section>
          <SectionHero onOpenModal={() => setIsModalOpen(true)} onSeeAction={handleSeeAction} />
        </div>
        <div id="section-denerf" data-nav-section>
          <SectionWithDenerf />
        </div>
        <div id="section-showreel" data-nav-section>
          <SectionShowreel onOpenModal={() => setIsModalOpen(true)} />
        </div>
        <div id="section-blob" data-nav-section>
          <SectionBlob />
        </div>
        <div id="section-lighter" data-nav-section>
          <SectionLighter />
        </div>
        <div id="section-who" data-nav-section>
          <SectionWhoIs />
        </div>
        <div id="section-toolbelt" data-nav-section>
          <SectionToolbelt />
        </div>
        <div id="section-contact" data-nav-section>
          <SectionContact />
        </div>
        <div id="section-trust" data-nav-section>
          <SectionTrust onOpenModal={() => setIsModalOpen(true)} />
        </div>
      </main>
      <MobileQuickBar />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {isMounted && typeof document !== "undefined" && createPortal(
        <>
          {!isAtEnd && (
            <div className="scroll-signal fixed left-3 bottom-4 md:left-1/2 md:bottom-6 md:-translate-x-1/2 z-[28]">
              <div className={`capsule ${isScrolling ? "running" : "idle"} flex items-center gap-2.5 bg-white/95 backdrop-blur-lg border border-deepGreenText/25 rounded-full px-2.5 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,77,51,0.16)] md:px-3 md:py-1 md:gap-2.5`}>
                <div className="relative w-8 h-8 md:w-9 md:h-9 shrink-0">
                  {isScrolling && (
                    <>
                      <span className="halo absolute inset-0 rounded-full bg-gradient-to-br from-neonMint/60 via-white to-lemonYellow/25"></span>
                      <span className="ring absolute inset-[6px] rounded-full border border-deepGreenText/25"></span>
                      <svg className="ring-svg" viewBox="0 0 44 44">
                        <circle cx="22" cy="22" r="18" pathLength="100" strokeDasharray="50 50" />
                      </svg>
                      <span className="orbit absolute inset-0">
                        <span className="orb"></span>
                        <span className="orb alt"></span>
                      </span>
                    </>
                  )}
                  <span className={`core absolute inset-[10px] md:inset-[11px] rounded-full shadow-[0_10px_18px_rgba(0,77,51,0.22)] ${isScrolling ? "" : "idle"}`}></span>
                  {!isScrolling && (
                    <span className="idle-inner">
                      <span className="idle-arrow">
                        <ArrowDown className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      </span>
                      <span className="idle-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                    </span>
                  )}
                  {isScrolling && (
                    <div className="confetti">
                      <span style={{ top: "22%", left: "18%", background: "var(--color-lemonYellow)" }}></span>
                      <span style={{ top: "12%", right: "12%", background: "var(--color-skyBlue)" }}></span>
                      <span style={{ bottom: "14%", left: "28%", background: "var(--color-bubblePink)" }}></span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-0.5 leading-tight">
                  <span className="label text-[9px] md:text-[10px] font-black uppercase tracking-[0.22em] text-deepGreenText/90 select-none">
                    {isScrolling ? "Content revealing" : "Scroll to reveal"}
                  </span>
                  <div className="track relative w-24 md:w-26 h-[6px] md:h-[7px] rounded-full bg-deepGreenText/10 overflow-hidden">
                    <span className="runner rounded-full"></span>
                    <span className="sparks"></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="floating-nav-container fixed right-3 bottom-20 md:right-10 md:top-1/2 md:-translate-y-1/2 z-[30] flex flex-col items-end gap-3 md:gap-4">
            {/* Floating Back to Top Button */}
            <button
              onClick={handleScrollTop}
              className="floating-nav-btn relative overflow-hidden group bg-white border-2 border-deepGreenText rounded-full p-3 md:p-4 shadow-[4px_4px_0px_0px_rgba(0,77,51,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,77,51,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,77,51,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all duration-200"
              aria-label="Back to Top"
            >
              <span className="relative z-10"><ArrowUp className="w-5 h-5 md:w-6 md:h-6 text-deepGreenText" /></span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-deepGreenText/10 to-transparent -translate-x-full animate-shimmer-auto" />
            </button>

            {/* Floating Next Button */}
            <button
              onClick={handleNext}
              className="floating-nav-btn relative overflow-hidden group bg-white border-2 border-deepGreenText rounded-full p-3 md:p-4 shadow-[4px_4px_0px_0px_rgba(0,77,51,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,77,51,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,77,51,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all duration-200"
              aria-label="Next Section"
            >
              <span className="relative z-10"><ArrowDown className="w-5 h-5 md:w-6 md:h-6 text-deepGreenText" /></span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-deepGreenText/10 to-transparent -translate-x-full animate-shimmer-auto" />
            </button>
          </div>
        </>,
        document.body
      )}
    </>
  );
}

export default App;
