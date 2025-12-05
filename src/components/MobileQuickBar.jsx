import { useState } from "react";
import { MessageCircle, ChevronDown, X } from "lucide-react";

export function MobileQuickBar() {
  const [isMinimized, setIsMinimized] = useState(true);

  if (isMinimized) {
    return (
      <div className="mobile-quick-bar fixed right-4 bottom-4 z-40 will-change-transform transition-all duration-300 ease-in-out">
        <button
          onClick={() => setIsMinimized(false)}
          className="relative overflow-hidden group flex items-center gap-2 px-5 py-3 rounded-full bg-deepInk text-offWhite shadow-[4px_6px_0_0_rgba(11,42,27,0.45)] border-2 border-deepInk font-bold text-sm hover:shadow-[6px_8px_0_0_rgba(11,42,27,0.45)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[2px_4px_0_0_rgba(11,42,27,0.45)] active:translate-x-0.5 active:translate-y-0.5 transition-all duration-200"
        >
          <span className="relative z-10 flex items-center gap-2">
            <MessageCircle size={18} />
            <span>Talk to us</span>
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer-auto" />
        </button>
      </div>
    );
  }

  return (
    <div className="mobile-quick-bar fixed inset-x-4 md:inset-x-auto md:right-4 bottom-4 z-40 md:w-80 will-change-transform transition-all duration-300 ease-in-out">
      <div className="relative rounded-3xl bg-deepInk text-offWhite shadow-[8px_10px_0_0_rgba(11,42,27,0.45)] border-2 border-deepInk overflow-hidden">

        {/* Minimize Button */}
        <button
          onClick={() => setIsMinimized(true)}
          className="absolute top-3 right-3 p-1 text-offWhite/50 hover:text-offWhite hover:bg-white/10 rounded-full transition-colors z-10"
          aria-label="Minimize"
        >
          <ChevronDown size={20} />
        </button>

        <div className="flex items-center justify-between px-5 py-4 gap-2">
          <div className="flex flex-col text-left leading-tight">
            <span className="text-xs uppercase tracking-[0.2em] text-offWhite/70 mb-0.5">Talk to us</span>
            <span className="text-sm font-semibold">We reply in &lt; 2 hours</span>
          </div>
          {/* Spacer for the minimize button */}
          <div className="w-6"></div>
        </div>

        <div className="flex items-center gap-3 px-5 pb-4">
          <a
            href="https://wa.me/60165271501"
            className="flex-1 px-3 py-2.5 rounded-xl bg-offWhite text-deepInk text-xs font-bold border border-offWhite/40 text-center hover:bg-white transition-colors"
          >
            WhatsApp
          </a>
          <a
            href="mailto:sam@denerf.studio"
            className="flex-1 px-3 py-2.5 rounded-xl bg-neonMint text-deepInk text-xs font-bold border border-deepInk text-center hover:bg-neonMint/90 transition-colors"
          >
            Email
          </a>
        </div>

        <button
          onClick={() => window.location.href = "mailto:sam@denerf.studio"}
          className="w-full py-3 bg-offWhite text-deepInk font-bold text-center tracking-wide hover:bg-gray-100 transition-colors border-t border-deepInk/10"
        >
          Start Your Project
        </button>
      </div>
    </div>
  );
}
