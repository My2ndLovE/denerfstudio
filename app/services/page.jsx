import Link from "next/link";

export const metadata = {
  title: "Services",
  description:
    "Denerf Studio offers product design, motion design, scroll animations, MVP builds, and web development services. Based in Malaysia, serving globally.",
  alternates: {
    canonical: "https://denerf.studio/services",
  },
};

const services = [
  {
    title: "Product & UI/UX Design",
    description:
      "Research-driven interfaces that convert. We design flows, wireframes, and high-fidelity screens tuned for delight and conversion.",
  },
  {
    title: "Motion Design & Scroll Animations",
    description:
      "GSAP-powered scroll stories, Lottie animations, and micro-interactions that make your product feel alive and memorable.",
  },
  {
    title: "MVP & Prototype Builds",
    description:
      "From brief to shipped MVP in 7–12 days. Pay only if you love the result. Rapid iteration with real code, not just mockups.",
  },
  {
    title: "Web Development",
    description:
      "React, Next.js, and Tailwind — fast, accessible, SEO-optimized builds. We ship production-ready code with motion polish baked in.",
  },
  {
    title: "Brand Identity & Visual Systems",
    description:
      "Logo, color, typography, and component libraries that scale. We build design systems you can grow with.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-creamWhite px-6 py-24 md:px-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-deepInk mb-4">
          Services
        </h1>
        <p className="text-lg text-softGrayText mb-12 max-w-2xl">
          Everything you need to launch a bold, motion-first digital product —
          from design to shipped code.
        </p>

        <div className="space-y-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border-2 border-deepGreenText bg-white p-6 shadow-[--shadow-brutal-sm]"
            >
              <h2 className="font-display text-xl font-bold text-deepInk mb-2">
                {service.title}
              </h2>
              <p className="text-softGrayText">{service.description}</p>
            </div>
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
