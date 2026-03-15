import Link from "next/link";

export const metadata = {
  title: "About",
  description:
    "Denerf Studio is a Malaysia-based product design studio specializing in bold motion design, scroll animations, and rapid MVP builds. Pay only if you love it.",
  alternates: {
    canonical: "https://denerf.studio/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-creamWhite px-6 py-24 md:px-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-deepInk mb-6">
          About Denerf Studio
        </h1>

        <div className="space-y-6 text-lg text-softGrayText leading-relaxed">
          <p>
            Denerf Studio is a product design studio based in Malaysia. We
            specialize in bold, motion-first digital experiences — combining
            award-winning scroll animations, playful micro-interactions, and
            rapid MVP delivery.
          </p>
          <p>
            Our pay-only-if-you-love-it model means zero risk for you. We
            deliver the prototype first, and you only pay when you approve the
            shipped build.
          </p>
          <p>
            From discovery to shipped MVP, we typically deliver in 7–12 days.
            Our stack includes React, Next.js, Tailwind CSS, GSAP, and Lottie
            — optimized for performance, accessibility, and SEO.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border-2 border-deepGreenText bg-white p-6 shadow-[--shadow-brutal-sm]">
          <h2 className="font-display text-xl font-bold text-deepInk mb-3">
            Get in Touch
          </h2>
          <p className="text-softGrayText mb-4">
            Ready to build something bold? Let&apos;s talk.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:sam@denerf.studio"
              className="inline-flex items-center gap-2 rounded-full border-2 border-deepGreenText bg-lemonYellow px-5 py-2.5 font-semibold text-deepGreenText shadow-[--shadow-brutal-sm] transition-all duration-[--duration-snappy] hover:shadow-[--shadow-brutal-md] hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              Email Us
            </a>
            <a
              href="https://wa.me/60165271501"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-deepGreenText bg-mintGreen px-5 py-2.5 font-semibold text-deepGreenText shadow-[--shadow-brutal-sm] transition-all duration-[--duration-snappy] hover:shadow-[--shadow-brutal-md] hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
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
