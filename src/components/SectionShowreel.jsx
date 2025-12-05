import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import portfolio images
import winesLoungeImg from "../assets/portfolio/wineslounge.webp";
import superOhImg from "../assets/portfolio/superoh.webp";
import codAutoProImg from "../assets/portfolio/codautopro.webp";
import kepongHondaImg from "../assets/portfolio/keponghonda.webp";
import hkFunCasinoImg from "../assets/portfolio/hkfuncasinoonline.webp";
import hkTrustedGroupsImg from "../assets/portfolio/hktrustedgroups.webp";

gsap.registerPlugin(ScrollTrigger);

const reels = [
  {
    title: "Wine Lounge",
    tags: ["Pure HTML", "NextJs", "Client App"],
    color: "from-purple-900/60 to-red-900/50",
    image: winesLoungeImg,
    type: "Landing Page + Web App",
    link: "https://wineslounge.com/"
  },
  {
    title: "SuperOH",
    tags: ["NextJs", "iGaming", "Frontend"],
    color: "from-blue-600/70 to-purple-600/60",
    image: superOhImg,
    type: "Platform",
    link: "https://igaming-platform.vercel.app/"
  },
  {
    title: "COD Auto Pro",
    tags: ["Pure HTML", "Corporate", "Services"],
    color: "from-gray-800/70 to-black/70",
    image: codAutoProImg,
    type: "Landing Page",
    link: "https://codautopro.com.my/"
  },
  {
    title: "Kepong Honda",
    tags: ["Pure HTML", "Automotive", "Landing Page"],
    color: "from-red-600/70 to-red-900/70",
    image: kepongHondaImg,
    type: "Landing Page",
    link: "https://keponghonda.com/"
  },
  {
    title: "HK Fun Casino",
    tags: ["Wordpress", "Blog", "Reviews"],
    color: "from-yellow-500/70 to-orange-600/60",
    image: hkFunCasinoImg,
    type: "Blog",
    link: "https://hkfuncasinoonline.com/"
  },
  {
    title: "HK Trusted Groups",
    tags: ["Review Platform", "Referral", "Web"],
    color: "from-green-600/70 to-emerald-800/70",
    image: hkTrustedGroupsImg,
    type: "Landing Page",
    link: "https://hktrustedgroups.com/"
  }
];

export function SectionShowreel() {
  const rootRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current || !containerRef.current || !pinWrapperRef.current) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const cards = gsap.utils.toArray(".reel-card");

      // === HORIZONTAL SCROLL TUNNEL (Award-winning Awwwards technique) ===
      // Pin the wrapper while scrolling horizontally through cards
      // Calculation: Total width of cards - viewport width + padding
      const getScrollAmount = () => {
        return -(container.scrollWidth - window.innerWidth + 40);
      };

      const horizontalScroll = gsap.to(container, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: pinWrapperRef.current, // Trigger on the wrapper
          start: "top top",
          end: () => `+=${container.scrollWidth}`,
          pin: true,
          pinSpacing: true, // Ensure section grows
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      // === PARALLAX HEADER (Disabled to prevent cutoff) ===
      // Kept the ScrollTrigger for potential future use or just removed the animation
      // gsap.to(headerRef.current, {
      //   x: () => -(container.scrollWidth * 0.05),
      //   ease: "none",
      //   scrollTrigger: {
      //     trigger: rootRef.current,
      //     start: "top top",
      //     end: () => `+=${container.scrollWidth}`,
      //     scrub: 1.5
      //   }
      // });

      // === CARD ANIMATIONS ON SCROLL ===
      cards.forEach((card, i) => {
        // Cards zoom from small to full as they enter viewport center
        gsap.fromTo(card,
          { scale: 0.85, opacity: 0.5 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalScroll,
              start: "left 80%",
              end: "left 40%",
              scrub: true
            }
          }
        );

        // Image reveal with circular mask
        const image = card.querySelector(".reel-image");
        if (image) {
          gsap.fromTo(image,
            { clipPath: "circle(0% at 50% 50%)" },
            {
              clipPath: "circle(100% at 50% 50%)",
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalScroll,
                start: "left 70%",
                end: "left 30%",
                scrub: true
              }
            }
          );
        }

        // Tags stagger in
        const tags = card.querySelectorAll(".reel-tag");
        if (tags.length > 0) {
          gsap.fromTo(tags,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalScroll,
                start: "left 60%",
                end: "left 40%",
                scrub: true
              }
            }
          );
        }
      });

      // === ENTRY ANIMATION (initial reveal) ===
      gsap.fromTo(".reel-intro",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // === TOGGLE MOBILE BAR VISIBILITY ===
      // Now using the section as trigger, which has grown due to pinSpacing
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top bottom", // When section top enters viewport
        end: "bottom top",   // When section bottom leaves viewport
        toggleClass: { targets: "body", className: "hide-mobile-bar" }
      });

    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="section-showreel min-h-screen bg-offWhite overflow-hidden relative"
    >
      {/* Pinned content wrapper */}
      <div ref={pinWrapperRef} className="h-[100dvh] flex flex-col justify-center py-4 md:py-0">

        {/* Header with parallax */}
        <div ref={headerRef} className="reel-intro px-6 md:px-20 lg:px-32 mb-4 md:mb-8 will-change-transform">
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
          className="flex gap-4 md:gap-8 px-6 md:px-16 will-change-transform"
          style={{ width: "fit-content" }}
        >
          {reels.map((item, index) => (
            <article
              key={index}
              className="reel-card shrink-0 w-[70vw] sm:w-[400px] lg:w-[450px] bg-white border-2 border-deepInk rounded-[24px] md:rounded-[28px] shadow-[6px_8px_0_0_rgba(11,42,27,0.2)] md:shadow-[10px_12px_0_0_rgba(11,42,27,0.2)] overflow-hidden will-change-transform hover:shadow-[10px_12px_0_0_rgba(11,42,27,0.3)] md:hover:shadow-[14px_16px_0_0_rgba(11,42,27,0.3)] transition-shadow duration-300"
            >
              <div className="relative aspect-[4/5] overflow-hidden group">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`}></div>

                {/* Image with circular reveal mask */}
                <img
                  className="reel-image absolute inset-0 w-full h-full object-cover mix-blend-overlay transition-transform duration-700 group-hover:scale-110"
                  src={item.image}
                  alt={item.title}
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
                <button
                  onClick={() => window.open(item.link, "_blank")}
                  className="relative overflow-hidden group px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-deepInk text-offWhite shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all duration-200"
                >
                  <span className="relative z-10">View Site</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer-auto" />
                </button>
                <span className="px-2 py-1 md:px-3 md:py-1 rounded-full bg-neonMint text-deepInk border border-deepInk/20">
                  Live
                </span>
              </div>
            </article>
          ))}

          {/* ETC... Card */}
          <article
            className="reel-card shrink-0 w-[70vw] sm:w-[400px] lg:w-[450px] bg-deepInk border-2 border-deepInk rounded-[24px] md:rounded-[28px] shadow-[6px_8px_0_0_rgba(11,42,27,0.2)] md:shadow-[10px_12px_0_0_rgba(11,42,27,0.2)] overflow-hidden will-change-transform flex flex-col items-center justify-center text-center p-6 md:p-8"
          >
            <div className="text-offWhite space-y-4">
              <h3 className="text-3xl md:text-5xl font-display font-bold">And Etc...</h3>
              <p className="text-offWhite/70 text-base md:text-lg">
                We have built many more projects. <br />
                Let's discuss yours next.
              </p>
              <button className="relative overflow-hidden group mt-6 md:mt-8 px-6 py-3 md:px-8 md:py-4 bg-neonMint text-deepInk font-bold rounded-full shadow-[4px_4px_0px_0px_rgba(0,77,51,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,77,51,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,77,51,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all duration-200 text-sm md:text-base">
                <span className="relative z-10">Start Your Project</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer-auto" />
              </button>
            </div>
          </article>

          {/* End spacer for smooth ending */}
          <div className="shrink-0 w-[10vw] md:w-[20vw]"></div>
        </div>
      </div>
    </section>
  );
}
