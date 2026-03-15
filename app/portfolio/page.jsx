import { portfolioItems } from "@/content/portfolio/data";
import Link from "next/link";

export const metadata = {
  title: "Portfolio",
  description:
    "Explore Denerf Studio's portfolio of bold, motion-first digital experiences — landing pages, web apps, and platforms built with scroll magic and rapid MVP delivery.",
  alternates: {
    canonical: "https://denerf.studio/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-creamWhite px-6 py-24 md:px-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-deepInk mb-4">
          Our Work
        </h1>
        <p className="text-lg text-softGrayText mb-12 max-w-2xl">
          Bold motion, playful scroll stories, and fast MVPs — here&apos;s what
          we&apos;ve shipped.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <a
              key={item.slug}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl border-2 border-deepGreenText bg-white p-5 shadow-[--shadow-brutal-sm] transition-all duration-[--duration-snappy] hover:shadow-[--shadow-brutal-md] hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-deepGreenText/60">
                {item.type}
              </div>
              <h2 className="font-display text-xl font-bold text-deepInk mb-2">
                {item.title}
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-mintGreen/20 px-2.5 py-0.5 text-xs font-medium text-deepGreenText"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border-2 border-deepGreenText bg-white px-6 py-3 font-semibold text-deepGreenText shadow-[--shadow-brutal-sm] transition-all duration-[--duration-snappy] hover:shadow-[--shadow-brutal-md] hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
