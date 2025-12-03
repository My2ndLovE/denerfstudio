export function MobileQuickBar() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
      <div className="rounded-3xl bg-deepInk text-offWhite shadow-[8px_10px_0_0_rgba(11,42,27,0.45)] border-2 border-deepInk overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 gap-2">
          <div className="flex flex-col text-left leading-tight">
            <span className="text-xs uppercase tracking-[0.2em] text-offWhite/70">Talk to us</span>
            <span className="text-sm font-semibold">We reply in &lt; 2 hours</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/0000000000"
              className="px-3 py-2 rounded-full bg-offWhite text-deepInk text-xs font-bold border border-offWhite/40"
            >
              WhatsApp
            </a>
            <a
              href="mailto:hello@denerf.studio"
              className="px-3 py-2 rounded-full bg-neonMint text-deepInk text-xs font-bold border border-deepInk"
            >
              Email
            </a>
          </div>
        </div>
        <button className="w-full py-3 bg-offWhite text-deepInk font-bold text-center tracking-wide">
          Book a 15-min intro
        </button>
      </div>
    </div>
  );
}
