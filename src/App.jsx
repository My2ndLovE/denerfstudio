
import { useEffect, useState } from "react";
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
import { CustomCursor } from "./components/CustomCursor";
import { MobileQuickBar } from "./components/MobileQuickBar";
import { ContactModal } from "./components/ContactModal";
import { ArrowDown, ArrowUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Force a refresh after a short delay to ensure layout is settled (fonts, etc.)
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".floating-nav-btn", {
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

  const handleNext = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <CustomCursor />
      <main className="w-full overflow-hidden">
        <SectionHero onOpenModal={() => setIsModalOpen(true)} />
        <SectionWithDenerf />
        <SectionShowreel />
        <SectionBlob />
        <SectionLighter />
        <SectionWhoIs />
        <SectionToolbelt />
        <SectionContact />
        <SectionTrust onOpenModal={() => setIsModalOpen(true)} />
      </main>
      <MobileQuickBar />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {createPortal(
        <>
          <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[9990] flex flex-col gap-3 md:gap-4">
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
        document.documentElement
      )}
    </>
  );
}

export default App;
