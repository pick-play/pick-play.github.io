import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "割り勘計算 - 公平な精算ツール",
  description:
    "複雑な割り勘もスッキリ。項目別除外、差額分割、最小送金まで。飲み会・食事会の精算をかんたんに。",
  keywords: [
    "割り勘",
    "割り勘計算",
    "飲み会精算",
    "食事代精算",
    "割り勘アプリ",
    "精算ツール",
    "費用分担",
    "グループ精算",
    "最小送金",
    "割り勘計算機",
  ],
  openGraph: {
    title: "割り勘計算 - 公平な精算ツール | PickPlay",
    description:
      "複雑な割り勘もスッキリ。項目別除外、差額分割、最小送金まで対応。",
    url: "https://pick-play.github.io/jp/settlement",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 割り勘計算ツール",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/settlement",
    languages: {
      "x-default": "https://pick-play.github.io/settlement",
      "ko": "https://pick-play.github.io/settlement",
      en: "https://pick-play.github.io/en/settlement",
      ja: "https://pick-play.github.io/jp/settlement",
      "zh-CN": "https://pick-play.github.io/cn/settlement",
      es: "https://pick-play.github.io/es/settlement",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "割り勘計算 - 公平な精算ツール",
      url: "https://pick-play.github.io/jp/settlement",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description: "複雑な割り勘もスッキリ。項目別除外、差額分割、最小送金まで。",
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
          name: "割り勘計算",
          item: "https://pick-play.github.io/jp/settlement",
        },
      ],
    },
  ],
};

export default function SettlementJpLayout({
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
