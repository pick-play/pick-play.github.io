import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "This or That - Balance Game",
  description:
    "This vs That! Enjoy various balance game topics with friends. 50+ thought-provoking dilemmas to spark great conversations.",
  keywords: [
    "balance game",
    "this or that",
    "would you rather",
    "dilemma game",
    "party game",
    "conversation game",
    "icebreaker game",
    "fun questions",
    "group game",
  ],
  openGraph: {
    title: "This or That - Balance Game with 50+ Topics",
    description:
      "This vs That! 50+ balance game dilemmas to play with friends and spark great conversations.",
    url: "https://pick-play.github.io/en/balance-game/",
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
    canonical: "https://pick-play.github.io/en/balance-game/",
    languages: {
      "x-default": "https://pick-play.github.io/balance-game/",
      "ko": "https://pick-play.github.io/balance-game/",
      en: "https://pick-play.github.io/en/balance-game/",
      ja: "https://pick-play.github.io/jp/balance-game/",
      "zh-CN": "https://pick-play.github.io/cn/balance-game/",
      es: "https://pick-play.github.io/es/balance-game/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "This or That - Balance Game",
      url: "https://pick-play.github.io/en/balance-game/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "A balance game (would you rather) with 50+ dilemma topics for fun conversations with friends.",
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
          name: "This or That",
          item: "https://pick-play.github.io/en/balance-game/",
        },
      ],
    },
  ],
};

export default function BalanceGameEnLayout({
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
