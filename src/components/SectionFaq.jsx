import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";

const faqs = [
  {
    q: "How does the pay-later model work?",
    a: "We deliver the prototype/MVP first. You only pay when you approve the shipped build. If you don’t love it, you walk away with no fee."
  },
  {
    q: "How fast can we launch?",
    a: "Discovery to shipped MVP usually runs 7–12 days: 0–1 day for the brief, 2 days for AI prototype, and 5–9 days to build with motion polish."
  },
  {
    q: "What tech stack do you use?",
    a: "React/Vite for front-end, Tailwind for styling, GSAP/Lottie for motion, and API-ready handoff. We can pair with your backend or deliver a static build."
  },
  {
    q: "What’s included in the first delivery?",
    a: "A full UI sweep that maps every major feature you need—front-end flows, backend-ready API touchpoints, and app-ready interaction patterns—so you see the whole experience before we iterate. All delivered as a working demo, not static mocks."
  },
  {
    q: "How do we collaborate?",
    a: "We work async-first and skip slow design tools. We turn your brief into a full PRD with AI + our guidance, ship a working demo fast, then iterate from your feedback. Minimum effort from you, maximum motion polish from us."
  }
];

export function SectionFaq({ onOpenModal }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-offWhite px-4 py-16 md:py-24 flex justify-center">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-deepInk/60">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-deepInk leading-tight">Answers that shorten the back-and-forth.</h2>
          <p className="text-base md:text-lg text-deepInk/70 max-w-2xl mx-auto">
            If it’s not covered here, ping us—we reply fast.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = idx === openIndex;
            return (
              <div key={item.q} className="border-2 border-deepGreenText bg-white rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,77,51,0.2)] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-lg font-display font-bold text-deepInk">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-deepInk transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm md:text-base text-deepInk/80 border-t border-deepGreenText/10">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 rounded-[20px] border-2 border-deepGreenText bg-deepInk text-offWhite p-5 shadow-[8px_8px_0px_0px_rgba(255,232,107,1)]">
          <div className="space-y-1">
            <p className="text-sm uppercase tracking-[0.2em] text-offWhite/70">Still wondering?</p>
            <p className="text-xl font-display font-bold">Talk to a human in under 2 hours.</p>
          </div>
          <button
            type="button"
            onClick={onOpenModal}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-neonMint text-deepInk font-bold border-2 border-deepGreenText hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(0,77,51,1)]"
          >
            <MessageCircle className="w-5 h-5" />
            Start a chat
          </button>
        </div>
      </div>
    </section>
  );
}
