import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://denerf.studio"),
  title: {
    default: "DENERF Studio — Bold motion-first product design",
    template: "%s | DENERF Studio",
  },
  description:
    "Denerf Studio builds joyful, high-converting product experiences with bold motion, award-winning scroll stories, and fast MVP previews you only pay for if you love.",
  keywords: [
    "Denerf Studio",
    "product design",
    "motion design",
    "MVP preview",
    "UI/UX agency",
    "scroll animation",
    "web design",
    "Malaysia",
  ],
  openGraph: {
    type: "website",
    title: "Denerf Studio — Bold motion-first product design",
    description:
      "We craft playful, high-converting digital experiences with scroll magic, Lottie, and rapid MVP builds. Pay only if you love it.",
    url: "https://denerf.studio/",
    siteName: "Denerf Studio",
    images: [
      {
        url: "/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Denerf Studio — Bold motion-first product design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Denerf Studio — Bold motion-first product design",
    description:
      "Playful, motion-led product design, MVP previews, and scroll stories you only pay for if you love.",
    images: ["/og-cover.png"],
  },
  icons: {
    icon: [
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicons/favicon.ico",
    apple: "/favicons/apple-touch-icon.png",
  },
  manifest: "/favicons/site.webmanifest",
  alternates: {
    canonical: "https://denerf.studio/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Denerf Studio",
              url: "https://denerf.studio/",
              logo: "https://denerf.studio/og-cover.png",
              description:
                "Denerf Studio designs joyful, high-converting product experiences with bold motion systems and rapid MVP previews.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "MY",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How does the pay-later model work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We deliver the prototype/MVP first. You only pay when you approve the shipped build. If you don't love it, you walk away with no fee.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How fast can we launch?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Discovery to shipped MVP usually runs 7–12 days: 0–1 day for the brief, 2 days for AI prototype, and 5–9 days to build with motion polish.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What tech stack do you use?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "React/Next.js for front-end, Tailwind for styling, GSAP/Lottie for motion, and API-ready handoff. We can pair with your backend or deliver a static build.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What's included in the first delivery?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Hero and scroll story, CTA funnels, responsive layouts, motion system, and a handoff package (assets, tokens, and notes) tuned for fast LCP.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do we collaborate?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We work async-first with Loom, Figma links, and short calls. You get a single channel for feedback with under 2 hour response time.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        {children}
        <noscript>
          <div style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 2rem", fontFamily: "sans-serif", lineHeight: 1.6 }}>
            <h1>Denerf Studio — Bold Motion-First Product Design</h1>
            <p>
              Denerf Studio builds joyful, high-converting product experiences with bold motion,
              award-winning scroll stories, and fast MVP previews you only pay for if you love.
            </p>
            <h2>Services</h2>
            <ul>
              <li>Product &amp; UI/UX Design</li>
              <li>Motion Design &amp; Scroll Animations (GSAP, Lottie)</li>
              <li>MVP &amp; Prototype Builds</li>
              <li>Web Development (React, Tailwind)</li>
              <li>Brand Identity &amp; Visual Systems</li>
            </ul>
            <h2>Contact</h2>
            <p>
              Email: <a href="mailto:sam@denerf.studio">sam@denerf.studio</a> |{" "}
              <a href="https://wa.me/60165271501">WhatsApp</a>
            </p>
            <p>Based in Malaysia (003751888-X)</p>
          </div>
        </noscript>
      </body>
    </html>
  );
}
