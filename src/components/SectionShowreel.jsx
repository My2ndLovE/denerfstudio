import { useRef, useEffect, useState } from "react";

// Import portfolio images
import winesLoungeImg from "../assets/portfolio/wineslounge.webp";
import superOhImg from "../assets/portfolio/superoh.webp";
import codAutoProImg from "../assets/portfolio/codautopro.webp";
import kepongHondaImg from "../assets/portfolio/keponghonda.webp";
import hkFunCasinoImg from "../assets/portfolio/hkfuncasinoonline.webp";
import hkTrustedGroupsImg from "../assets/portfolio/hktrustedgroups.webp";

const reels = [
  {
    title: "Wine Lounge",
    tags: ["Pure HTML", "NextJs", "Client App"],
    gradient: "var(--gradient-portfolio-1)",
    image: winesLoungeImg,
    type: "Landing Page + Web App",
    link: "https://wineslounge.com/"
  },
  {
    title: "SuperOH",
    tags: ["NextJs", "iGaming", "Frontend"],
    gradient: "var(--gradient-portfolio-2)",
    image: superOhImg,
    type: "Platform",
    link: "https://igaming-platform.vercel.app/"
  },
  {
    title: "COD Auto Pro",
    tags: ["Pure HTML", "Corporate", "Services"],
    gradient: "var(--gradient-portfolio-3)",
    image: codAutoProImg,
    type: "Landing Page",
    link: "https://codautopro.com.my/"
  },
  {
    title: "Kepong Honda",
    tags: ["Pure HTML", "Automotive", "Landing Page"],
    gradient: "var(--gradient-portfolio-4)",
    image: kepongHondaImg,
    type: "Landing Page",
    link: "https://keponghonda.com/"
  },
  {
    title: "HK Fun Casino",
    tags: ["Wordpress", "Blog", "Reviews"],
    gradient: "var(--gradient-portfolio-5)",
    image: hkFunCasinoImg,
    type: "Blog",
    link: "https://hkfuncasinoonline.com/"
  },
  {
    title: "HK Trusted Groups",
    tags: ["Review Platform", "Referral", "Web"],
    gradient: "var(--gradient-portfolio-6)",
    image: hkTrustedGroupsImg,
    type: "Landing Page",
    link: "https://hktrustedgroups.com/"
  }
];

export function SectionShowreel({ onOpenModal }) {
  const rootRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track active slide for dots
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const firstCard = container.querySelector(".reel-card");
      if (!firstCard) return;
      const cardWidth = firstCard.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(container).columnGap || getComputedStyle(container).gap || "0");
      const segment = cardWidth + gap;
      const idx = Math.round(container.scrollLeft / (segment || 1));
      setActiveIndex(Math.min(reels.length - 1, Math.max(0, idx)));
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="Portfolio"
      className="section-showreel bg-offWhite overflow-hidden relative py-10"
    >
      {/* Pinned content wrapper */}
      <div
        ref={pinWrapperRef}
        className="flex flex-col gap-6"
      >

        {/* Header */}
        <div
          ref={headerRef}
          className="reel-intro px-4 md:px-16 lg:px-24 mb-4 md:mb-8"
        >
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-deepInk/60 mb-2 md:mb-3">
            SELECTED WORKS
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold leading-tight text-deepInk max-w-4xl">
            Real results, shipped fast.
          </h2>
          <p className="text-sm sm:text-lg text-deepInk/70 max-w-2xl mt-2 md:mt-4">
            From high-performance landing pages to complex web applications.
            We build scalable, fast, and beautiful digital experiences.
          </p>
        </div>

        {/* Horizontal scrolling container */}
        <div
          ref={containerRef}
          role="region"
          aria-label="Portfolio projects"
          tabIndex={0}
          onKeyDown={(e) => {
            const container = containerRef.current;
            if (!container) return;
            const firstCard = container.querySelector(".reel-card");
            if (!firstCard) return;
            const cardWidth = firstCard.getBoundingClientRect().width;
            const gap = parseFloat(getComputedStyle(container).columnGap || getComputedStyle(container).gap || "0");
            const segment = cardWidth + gap;
            if (e.key === "ArrowRight") {
              e.preventDefault();
              container.scrollBy({ left: segment, behavior: "smooth" });
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              container.scrollBy({ left: -segment, behavior: "smooth" });
            }
          }}
          className="flex gap-4 md:gap-6 px-4 md:px-8 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth focus:outline-2 focus:outline-offset-2 focus:outline-deepGreenText"
          style={{
            width: "100%",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch"
          }}
        >
          {reels.map((item, index) => (
            <article
              key={index}
              className="reel-card shrink-0 w-[82vw] sm:w-[320px] md:w-[360px] lg:w-[420px] bg-white border-2 border-deepInk rounded-[--radius-card] md:rounded-[--radius-card-lg] shadow-[--shadow-brutal-md-ink] md:shadow-[--shadow-brutal-lg-ink] overflow-hidden hover:shadow-[--shadow-brutal-lg-ink] transition-shadow duration-[--duration-chill] snap-start"
            >
              <div className="relative aspect-[3/4] overflow-hidden group">
                {/* Gradient background */}
                <div className="absolute inset-0" style={{ background: item.gradient }}></div>

                {/* Image */}
                <img
                  className="reel-image absolute inset-0 w-full h-full object-cover mix-blend-overlay transition-transform duration-[--duration-chill] group-hover:scale-110"
                  src={item.image}
                  alt={`${item.title} ${item.type} preview`}
                  width="900"
                  height="1200"
                  loading="lazy"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-deepInk/90 via-deepInk/40 to-transparent"></div>

                {/* Project Type badge */}
                <div className="absolute top-3 left-3 md:top-4 md:left-4 inline-flex items-center gap-2 px-2 py-1 md:px-3 md:py-1 rounded-full bg-offWhite/90 text-deepInk text-[10px] md:text-xs font-bold">
                  Project
                  <span className="text-[9px] md:text-[10px] px-1.5 py-0.5 rounded-full bg-deepInk text-offWhite">
                    {item.type}
                  </span>
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 space-y-1 md:space-y-2 text-offWhite">
                  <h3 className="text-xl md:text-3xl font-display font-bold leading-tight">{item.title}</h3>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="reel-tag px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-offWhite/15 border border-offWhite/20 text-[10px] md:text-xs font-semibold backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card footer */}
              <div className="p-3 md:p-4 flex items-center justify-between text-xs md:text-sm font-semibold text-deepInk/80">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-deepInk text-offWhite shadow-[--shadow-brutal-sm-ink] hover:shadow-[--shadow-brutal-sm] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all duration-[--duration-snappy] inline-flex items-center justify-center"
                >
                  View Site
                </a>
                <span className="px-2 py-1 md:px-3 md:py-1 rounded-full bg-neonMint text-deepInk border border-deepInk/20">
                  Live
                </span>
              </div>
            </article>
          ))}

          {/* ETC... Card */}
          <article
            className="reel-card shrink-0 w-[82vw] sm:w-[320px] md:w-[360px] lg:w-[420px] bg-deepInk border-2 border-deepInk rounded-[--radius-card] md:rounded-[--radius-card-lg] shadow-[--shadow-brutal-md-ink] md:shadow-[--shadow-brutal-lg-ink] overflow-hidden flex flex-col items-center justify-center text-center p-6 md:p-8 snap-start"
          >
            <div className="text-offWhite space-y-4">
              <h3 className="text-3xl md:text-5xl font-display font-bold">And Etc...</h3>
              <p className="text-offWhite/70 text-base md:text-lg">
                We have built many more projects. <br />
                Let's discuss yours next.
              </p>
              <button
                onClick={onOpenModal}
                className="relative overflow-hidden group mt-6 md:mt-8 px-6 py-3 md:px-8 md:py-4 bg-neonMint text-deepInk font-bold rounded-full shadow-[--shadow-brutal-sm] hover:shadow-[--shadow-brutal-md] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[--shadow-brutal-xs] active:translate-x-0.5 active:translate-y-0.5 transition-all duration-[--duration-snappy] text-sm md:text-base">
                <span className="relative z-10">Start Your Project</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer-auto" />
              </button>
            </div>
          </article>
        </div>

        {/* Slider dots */}
        <div className="flex items-center justify-center gap-2 mt-4 px-4" role="tablist" aria-label="Portfolio slides">
          {reels.map((item, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={activeIndex === idx}
              aria-label={`Slide ${idx + 1}: ${item.title}`}
              onClick={() => {
                const container = containerRef.current;
                if (!container) return;
                const firstCard = container.querySelector(".reel-card");
                if (!firstCard) return;
                const cardWidth = firstCard.getBoundingClientRect().width;
                const gap = parseFloat(getComputedStyle(container).columnGap || getComputedStyle(container).gap || "0");
                container.scrollTo({ left: idx * (cardWidth + gap), behavior: "smooth" });
              }}
              className={`rounded-full transition-all duration-[--duration-snappy] ${activeIndex === idx ? "w-3 h-3 bg-deepInk" : "w-2 h-2 bg-deepInk/20"} min-w-[44px] min-h-[44px] flex items-center justify-center`}
            >
              <span className={`block rounded-full ${activeIndex === idx ? "w-3 h-3 bg-deepInk" : "w-2 h-2 bg-deepInk/20"}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
