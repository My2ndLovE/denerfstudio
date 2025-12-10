
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
import { SectionProcess } from "./components/SectionProcess";
import { SectionFaq } from "./components/SectionFaq";
import { SectionFooter } from "./components/SectionFooter";
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
    "section-process",
    "section-contact",
    "section-trust",
    "section-faq",
    "section-footer"
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
    const hero = typeof document !== "undefined" ? document.getElementById("section-hero") : null;
    const targetTop = hero ? hero.offsetTop : 0;
    // Force an immediate jump, then smooth-scroll to avoid pin interference
    window.scrollTo({ top: targetTop, behavior: "auto" });
    window.setTimeout(() => {
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    }, 10);
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
      <a href="#main-content" className="skip-link">Skip to main content</a>
      {isMounted && typeof document !== "undefined" && (
        <style>
          {`
            .floating-nav-container { pointer-events: none; }
            .floating-nav-container button, .floating-nav-container .hint { pointer-events: auto; }

            .scroll-signal { pointer-events: none; }
            .scroll-signal .capsule {
              pointer-events: auto;
              background: white;
              border: 2px solid var(--color-deepInk, #0B2A1B);
              box-shadow: 0 6px 12px rgba(0,0,0,0.08);
              transition: transform 0.25s var(--ease-soft), box-shadow 0.25s var(--ease-soft), background 0.25s var(--ease-soft);
            }
            .scroll-signal .capsule.idle { transform: translateY(0); }
            .scroll-signal .capsule.running { transform: translateY(-2px); background: linear-gradient(120deg, rgba(255,232,107,0.9), rgba(124,255,178,0.9)); box-shadow: 0 10px 18px rgba(0,0,0,0.12); }
            .scroll-signal .wagon {
              display: flex; align-items: center; gap: 6px;
              animation: wagon-bob 1.8s ease-in-out infinite;
            }
            .scroll-signal .capsule.running .wagon { animation: wagon-run 0.7s ease-in-out infinite; }
            .scroll-signal .wheels { display: flex; gap: 4px; }
            .scroll-signal .wheel {
              width: 9px; height: 9px;
              border-radius: 999px;
              border: 2px solid #0B2A1B;
              position: relative;
              background: radial-gradient(circle at 50% 50%, rgba(0,77,51,0.2) 35%, transparent 36%);
            }
            .scroll-signal .wheel:after {
              content: "";
              position: absolute;
              inset: 1px;
              border-radius: 999px;
              border: 2px solid rgba(0,77,51,0.4);
            }
            .scroll-signal .capsule.running .wheel { animation: wheel-spin 0.5s linear infinite; }
            .scroll-signal .capsule.idle .wheel { animation: wheel-spin 2.4s linear infinite; opacity: 0.8; }
            .scroll-signal .arrow {
              width: 14px; height: 14px;
              color: #0B2A1B;
              animation: arrow-bounce 1.8s ease-in-out infinite;
            }
            .scroll-signal .label {
              font-size: 10px;
              letter-spacing: 0.12em;
              text-transform: uppercase;
              color: #0B2A1B;
              font-weight: 900;
              display: inline-flex;
              align-items: center;
              gap: 6px;
            }
            .scroll-signal .dot {
              width: 6px; height: 6px; border-radius: 999px;
              background: #FFB6D5;
              box-shadow: 0 0 0 5px rgba(124,255,178,0.12);
            }
            @keyframes wheel-spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes wagon-bob {
              0%,100% { transform: translateY(0); }
              50% { transform: translateY(-3px); }
            }
            @keyframes wagon-run {
              0%,100% { transform: translateY(-1px); }
              50% { transform: translateY(1px); }
            }
            @keyframes arrow-bounce {
              0%, 100% { transform: translateY(0); opacity: 0.7; }
              50% { transform: translateY(3px); opacity: 1; }
            }

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
      <main id="main-content" className="w-full overflow-hidden">
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
        <div id="section-process" data-nav-section>
          <SectionProcess />
        </div>
        <div id="section-contact" data-nav-section>
          <SectionContact />
        </div>
        <div id="section-trust" data-nav-section>
          <SectionTrust onOpenModal={() => setIsModalOpen(true)} />
        </div>
        <div id="section-faq" data-nav-section>
          <SectionFaq onOpenModal={() => setIsModalOpen(true)} />
        </div>
        <div id="section-footer" data-nav-section>
          <SectionFooter />
        </div>
      </main>
      <MobileQuickBar />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {isMounted && typeof document !== "undefined" && createPortal(
        <>
          {!isAtEnd && (
            <div className="scroll-signal fixed left-3 bottom-4 md:left-1/2 md:bottom-6 md:-translate-x-1/2 z-[28]">
              <div className={`capsule ${isScrolling ? "running" : "idle"} flex items-center gap-2 bg-white/95 backdrop-blur-lg rounded-full px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,77,51,0.18)] md:gap-2`}>
                <div className="wagon">
                  <div className="wheels">
                    <span className="wheel"></span>
                    <span className="wheel"></span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 pr-1">
                  {!isScrolling && <ArrowDown className="arrow" />}
                  {isScrolling && <span className="dot"></span>}
                  <span className="label select-none">
                    {isScrolling ? "Keep rolling!" : "Scroll to reveal"}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="floating-nav-container fixed right-3 bottom-20 md:right-10 md:top-1/2 md:-translate-y-1/2 z-[30] flex flex-col items-end gap-3 md:gap-4">
            {/* Floating Back to Top Button */}
            <button
              onClick={handleScrollTop}
              type="button"
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
