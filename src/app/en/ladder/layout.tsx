import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ladder Game - Random Matching",
  description:
    "Who will be chosen? Exciting path-tracing animation makes every result a dramatic reveal! Perfect for assigning tasks, picking who pays, and more.",
  keywords: [
    "ladder game",
    "random matching",
    "ghost leg",
    "amidakuji",
    "random assignment",
    "party game",
    "ladder lottery",
    "random pairing",
  ],
  openGraph: {
    title: "Ladder Game - Random Matching with Path Animation",
    description:
      "Who will be chosen? Thrilling path-tracing animation makes the result dramatic and fun!",
    url: "https://pick-play.github.io/en/ladder/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - Fun lifestyle tools",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/en/ladder/",
    languages: {
      "x-default": "https://pick-play.github.io/ladder/",
      "ko": "https://pick-play.github.io/ladder/",
      en: "https://pick-play.github.io/en/ladder/",
      ja: "https://pick-play.github.io/jp/ladder/",
      "zh-CN": "https://pick-play.github.io/cn/ladder/",
      es: "https://pick-play.github.io/es/ladder/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Ladder Game - Random Matching",
      url: "https://pick-play.github.io/en/ladder/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Ladder game (amidakuji) with exciting path-tracing animation for random matching and assignment.",
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
          name: "Ladder Game",
          item: "https://pick-play.github.io/en/ladder/",
        },
      ],
    },
  ],
};

export default function LadderEnLayout({
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
