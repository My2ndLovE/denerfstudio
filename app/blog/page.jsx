import Link from "next/link";

export const metadata = {
  title: "Blog",
  description:
    "Insights on product design, motion design, scroll animations, and building MVPs fast — from the Denerf Studio team.",
  alternates: {
    canonical: "https://denerf.studio/blog",
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-creamWhite px-6 py-24 md:px-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-deepInk mb-4">
          Blog
        </h1>
        <p className="text-lg text-softGrayText mb-12">
          Thoughts on product design, motion, and building fast.
        </p>

        <div className="rounded-2xl border-2 border-dashed border-deepGreenText/30 bg-white/50 p-12 text-center">
          <p className="text-softGrayText text-lg mb-2">Coming soon</p>
          <p className="text-softGrayText/70 text-sm">
            We&apos;re crafting our first posts. Check back soon for insights on
            motion design, scroll storytelling, and rapid MVP builds.
          </p>
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
