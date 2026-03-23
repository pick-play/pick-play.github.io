import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liar Game - Party Game",
  description:
    "Find the liar among your friends! The ultimate party game with 8 topic categories. One person gets a different word — can you catch them?",
  keywords: [
    "liar game",
    "party game",
    "find the liar",
    "word game",
    "group game",
    "party games for adults",
    "social deduction game",
    "fun party game",
    "friends game",
  ],
  openGraph: {
    title: "Liar Game - The Ultimate Party Game",
    description:
      "Find the liar among your friends! 8 topic categories. One person gets a different word — can you catch them?",
    url: "https://pick-play.github.io/en/liar-game/",
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
    canonical: "https://pick-play.github.io/en/liar-game/",
    languages: {
      "x-default": "https://pick-play.github.io/liar-game/",
      "ko": "https://pick-play.github.io/liar-game/",
      en: "https://pick-play.github.io/en/liar-game/",
      ja: "https://pick-play.github.io/jp/liar-game/",
      "zh-CN": "https://pick-play.github.io/cn/liar-game/",
      es: "https://pick-play.github.io/es/liar-game/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Liar Game - Party Game",
      url: "https://pick-play.github.io/en/liar-game/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "A social deduction party game where players must identify who got the different word across 8 topic categories.",
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
          name: "Liar Game",
          item: "https://pick-play.github.io/en/liar-game/",
        },
      ],
    },
  ],
};

export default function LiarGameEnLayout({
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
