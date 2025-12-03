const reels = [
  {
    title: "Playful Fintech",
    tags: ["Motion UX", "Design System", "Mobile-first"],
    color: "from-neonMint/60 to-skyBlue/50",
    video: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
    duration: "00:24"
  },
  {
    title: "Creative SaaS",
    tags: ["Product UI", "Microcopy", "Animation"],
    color: "from-lemonYellow/70 to-bubblePink/60",
    video: "https://storage.googleapis.com/coverr-main/mp4/Night_Flight.mp4",
    duration: "00:18"
  },
  {
    title: "Immersive XR",
    tags: ["3D", "WebGL-lite", "Rapid Build"],
    color: "from-skyBlue/70 to-deepInk/70",
    video: "https://storage.googleapis.com/coverr-main/mp4/Footboys.mp4",
    duration: "00:12"
  }
];

export function SectionShowreel() {
  return (
    <section className="min-h-screen snap-start bg-offWhite flex items-center justify-center px-4 py-16 overflow-hidden">
      <div className="w-full max-w-6xl space-y-10">
        <div className="flex flex-col gap-3 text-deepInk">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-deepInk/60">
            WORK IN MOTION
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold leading-tight">
            See how playful UI, motion, and story stack together.
          </h2>
          <p className="text-base sm:text-lg text-deepInk/70 max-w-3xl">
            A quick swipe through real builds. Light, looping reels that spotlight tactile cards,
            scroll-synced storytelling, and motion systems tuned for thumbs.
          </p>
        </div>

        <div className="overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4">
          <div className="flex gap-6">
            {reels.map((item, index) => (
              <article
                key={index}
                className="snap-start shrink-0 w-[80vw] sm:w-[360px] lg:w-[400px] bg-white border-2 border-deepInk rounded-[28px] shadow-[10px_12px_0_0_rgba(11,42,27,0.2)] overflow-hidden hover:-translate-y-2 transition-transform duration-[var(--duration-snappy)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`}></div>
                  <video
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                    src={item.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster=""
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deepInk/80 via-deepInk/30 to-transparent"></div>
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-offWhite/90 text-deepInk text-xs font-bold">
                    Reel
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-deepInk text-offWhite">
                      {item.duration}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 space-y-2 text-offWhite">
                    <h3 className="text-2xl font-display font-bold leading-tight">{item.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-offWhite/15 border border-offWhite/20 text-xs font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between text-sm font-semibold text-deepInk/80">
                  <span>Tap to open full case</span>
                  <span className="px-3 py-1 rounded-full bg-neonMint text-deepInk border border-deepInk/20">
                    Auto loop
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
