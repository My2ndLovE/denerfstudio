import HomepageClient from "@/components/HomepageClient";

export const metadata = {
  title: "DENERF Studio — Bold motion-first product design",
  description:
    "Denerf Studio builds joyful, high-converting product experiences with bold motion, award-winning scroll stories, and fast MVP previews you only pay for if you love.",
  alternates: {
    canonical: "https://denerf.studio/",
  },
};

export default function HomePage() {
  return <HomepageClient />;
}
