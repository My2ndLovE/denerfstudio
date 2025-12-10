export function SectionFooter() {
  return (
    <footer id="section-footer" className="bg-deepInk text-offWhite px-4 py-10 md:py-12">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4 text-center">
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-lemonYellow/80 to-transparent rounded-full"></div>
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border-2 border-offWhite/30 bg-white/5 shadow-[0_6px_18px_rgba(0,0,0,0.25)]">
          <span className="inline-block w-2 h-2 rounded-full bg-neonMint shadow-[0_0_12px_rgba(124,255,178,0.8)]"></span>
          <span className="text-sm uppercase tracking-[0.18em] text-offWhite/80">Designed & shipped by</span>
          <span className="font-display font-bold text-offWhite">DENERF STUDIO</span>
          <span className="text-[11px] text-offWhite/70">(003751888-X)</span>
        </div>
        <p className="text-sm text-offWhite/70">
          Need help fast? <a className="underline decoration-neonMint/80 decoration-2 underline-offset-4 hover:text-neonMint transition-colors" href="mailto:sam@denerf.studio">sam@denerf.studio</a>
        </p>
      </div>
    </footer>
  );
}
