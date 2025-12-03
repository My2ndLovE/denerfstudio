
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHero } from "./components/SectionHero";
import { SectionWithDenerf } from "./components/SectionWithDenerf";
import { SectionBlob } from "./components/SectionBlob";
import { SectionLighter } from "./components/SectionLighter";
import { SectionWhoIs } from "./components/SectionWhoIs";
import { SectionToolbelt } from "./components/SectionToolbelt";
import { SectionTrust } from "./components/SectionTrust";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Force a refresh after a short delay to ensure layout is settled (fonts, etc.)
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <>
      <main className="w-full overflow-hidden">
        <SectionHero />
        <SectionWithDenerf />
        <SectionBlob />
        <SectionLighter />
        <SectionWhoIs />
        <SectionToolbelt />
        <SectionTrust />
      </main>

      {/* Floating Next Button */}
      <button
        onClick={handleNext}
        className="fixed bottom-8 right-8 z-50 bg-white border-2 border-deepGreenText rounded-full p-4 shadow-[4px_4px_0px_0px_rgba(0,77,51,1)] hover:scale-110 transition-transform active:scale-95"
        aria-label="Next Section"
      >
        <ArrowDown className="w-6 h-6 text-deepGreenText" />
      </button>
    </>
  );
}

export default App;
