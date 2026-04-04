import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Match Game - Stroop Test | PickPlay",
  description:
    "Play the Stroop Test color matching game! Can you identify the font color when the word says something different? Test your focus and reaction speed. 30-second rounds, 3 difficulty levels.",
  keywords: [
    "color match game",
    "stroop test",
    "concentration game",
    "color game",
    "reaction speed test",
    "cognitive game",
    "brain training",
    "color quiz",
    "stroop effect",
    "focus test",
  ],
  openGraph: {
    title: "Color Match Game - Stroop Test",
    description: "When a color word is written in a different color, which do you recognize first? Test your focus!",
    url: "https://pick-play.github.io/en/color-match/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - Color Match Stroop Test",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/en/color-match/",
    languages: {
      "x-default": "https://pick-play.github.io/color-match/",
      ko: "https://pick-play.github.io/color-match/",
      en: "https://pick-play.github.io/en/color-match/",
      ja: "https://pick-play.github.io/jp/color-match/",
      "zh-CN": "https://pick-play.github.io/cn/color-match/",
      es: "https://pick-play.github.io/es/color-match/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Color Match Game - Stroop Test",
      url: "https://pick-play.github.io/en/color-match/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "A Stroop Test-based color matching game. Two modes: match the font color or match the word meaning. Three difficulty levels to test your concentration.",
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://pick-play.github.io/en/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Color Match Game",
          item: "https://pick-play.github.io/en/color-match/",
        },
      ],
    },
  ],
};

export default function ColorMatchEnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
