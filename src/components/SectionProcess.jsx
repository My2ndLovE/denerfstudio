export function SectionProcess() {
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

  return (
    <section className="bg-gradient-to-b from-creamWhite to-mintGreen/25 px-4 py-16 md:py-24 flex justify-center">
      <div className="w-full max-w-5xl space-y-10">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-deepInk/60">How we work</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-deepInk leading-tight">A fast, low-risk delivery loop.</h2>
          <p className="text-base md:text-lg text-deepInk/70 max-w-3xl mx-auto">
            One loop: align, prototype, ship. You see work in days, pay only when you love it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step) => (
            <div key={step.title} className="rounded-[24px] border-2 border-deepGreenText bg-white shadow-[8px_8px_0px_0px_rgba(0,77,51,0.2)] p-6 space-y-3 hover:-translate-y-1 transition-transform duration-200">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lemonYellow text-deepGreenText text-xs font-bold border border-deepGreenText/30">
                {step.timing}
              </div>
              <h3 className="text-xl font-display font-bold text-deepInk leading-tight">{step.title}</h3>
              <p className="text-sm text-deepInk/70">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {proof.map((item) => (
            <div key={item.label} className="px-4 py-3 rounded-full bg-deepInk text-offWhite border-2 border-deepGreenText shadow-[4px_4px_0px_0px_rgba(255,232,107,1)] text-sm md:text-base font-bold flex items-center gap-2">
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
