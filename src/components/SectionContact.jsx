import { CalendarRange, MessageCircle, PhoneCall, Send } from "lucide-react";

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
  { label: "WhatsApp", href: "https://wa.me/0000000000", icon: MessageCircle },
  { label: "Telegram", href: "https://t.me/yourhandle", icon: Send },
  { label: "Email", href: "mailto:hello@denerf.studio", icon: Send }
];

export function SectionContact() {
  return (
    <section className="min-h-screen snap-start bg-gradient-to-b from-offWhite via-mintGreen/25 to-skyBlue/25 px-4 py-16 flex items-center justify-center">
      <div className="w-full max-w-5xl space-y-10">
        <div className="space-y-3 text-deepInk text-center">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-deepInk/60">
            Choose your adventure
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold leading-tight">
            Tell us what you’re dreaming up.
          </h2>
          <p className="text-base sm:text-lg text-deepInk/70 max-w-3xl mx-auto">
            Drop a quick brief—voice note or Figma link welcome. We reply in under 2 hours with
            a motion idea and a first-build plan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {options.map((option) => (
            <div
              key={option.title}
              className="group relative rounded-[24px] border-2 border-deepInk bg-white shadow-[10px_12px_0_0_rgba(11,42,27,0.2)] overflow-hidden hover:-translate-y-2 transition-transform duration-[var(--duration-snappy)]"
            >
              <div className={`absolute inset-0 ${option.accent} blur-3xl opacity-40 pointer-events-none`}></div>
              <div className="relative p-6 space-y-4">
                <span className="inline-flex px-3 py-1 rounded-full bg-deepInk text-offWhite text-xs font-semibold">
                  {option.badge}
                </span>
                <h3 className="text-xl font-display font-bold text-deepInk leading-tight">{option.title}</h3>
                <p className="text-sm text-deepInk/70">{option.desc}</p>
                <button className="inline-flex items-center gap-2 text-sm font-bold text-deepInk group-hover:translate-x-1 transition-transform">
                  Start this brief
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-4">
          <div className="flex-1 rounded-[24px] border-2 border-deepInk bg-deepInk text-offWhite p-6 shadow-[10px_12px_0_0_rgba(11,42,27,0.35)] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-offWhite/70">Quick actions</p>
                <p className="text-lg font-bold">Pick a channel—we respond fast</p>
              </div>
              <div className="px-3 py-1 rounded-full bg-offWhite text-deepInk text-xs font-bold">
                &lt; 2h
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-offWhite/10 border border-offWhite/20 hover:bg-offWhite/20 transition-colors text-sm font-semibold"
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

          <div className="w-full md:w-60 rounded-[24px] border-2 border-deepInk bg-white p-6 shadow-[10px_12px_0_0_rgba(11,42,27,0.2)] flex flex-col gap-4 justify-between">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neonMint text-deepInk text-xs font-bold">
                <CalendarRange className="w-4 h-4" />
                Calendar
              </span>
              <h4 className="text-lg font-display font-bold text-deepInk">Book a 15-min intro</h4>
              <p className="text-sm text-deepInk/70">Live or async—your choice. We’ll prep ideas before the call.</p>
            </div>
            <button className="w-full px-4 py-3 rounded-full bg-deepInk text-offWhite font-bold border-2 border-deepInk hover:-translate-y-1 transition-transform duration-[var(--duration-snappy)]">
              Open calendar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
