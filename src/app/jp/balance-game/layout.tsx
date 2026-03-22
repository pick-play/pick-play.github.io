import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "バランスゲーム - 二者択一",
  description:
    "これvsあれ！様々なテーマのバランスゲームを楽しもう。50問以上の質問で盛り上がること間違いなし。",
  keywords: [
    "バランスゲーム",
    "二者択一",
    "どっちが好き",
    "パーティーゲーム",
    "友達ゲーム",
    "飲み会ゲーム",
    "話題ゲーム",
    "選択ゲーム",
    "どっちを選ぶ",
    "盛り上がるゲーム",
  ],
  openGraph: {
    title: "バランスゲーム - 二者択一 | PickPlay",
    description:
      "これvsあれ！50問以上の質問で楽しむバランスゲーム。",
    url: "https://pick-play.github.io/jp/balance-game",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - バランスゲーム",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/balance-game",
    languages: {
      "x-default": "https://pick-play.github.io/balance-game",
      "ko": "https://pick-play.github.io/balance-game",
      en: "https://pick-play.github.io/en/balance-game",
      ja: "https://pick-play.github.io/jp/balance-game",
      "zh-CN": "https://pick-play.github.io/cn/balance-game",
      es: "https://pick-play.github.io/es/balance-game",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "バランスゲーム - 二者択一",
      url: "https://pick-play.github.io/jp/balance-game",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description: "これvsあれ！様々なテーマのバランスゲームを楽しもう。",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "ホーム",
          item: "https://pick-play.github.io/jp",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "バランスゲーム",
          item: "https://pick-play.github.io/jp/balance-game",
        },
      ],
    },
  ],
};

export default function BalanceGameJpLayout({
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
