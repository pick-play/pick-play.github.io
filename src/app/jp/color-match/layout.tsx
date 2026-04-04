import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "色マッチゲーム - ストループテスト | PickPlay",
  description:
    "ストループテストベースの色マッチゲーム！文字の色と意味が違うとき、どちらを先に認識しますか？集中力と反応速度をテストしよう。30秒タイマー、3つの難易度。",
  keywords: [
    "色マッチゲーム",
    "ストループテスト",
    "集中力ゲーム",
    "色ゲーム",
    "反応速度テスト",
    "認知ゲーム",
    "脳トレ",
    "色クイズ",
    "ストループ効果",
    "集中力テスト",
  ],
  openGraph: {
    title: "色マッチゲーム - ストループテスト",
    description: "色の名前が違う色で書かれているとき、どちらを先に認識しますか？集中力テスト！",
    url: "https://pick-play.github.io/jp/color-match/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 色マッチ ストループテスト",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/color-match/",
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
      name: "色マッチゲーム - ストループテスト",
      url: "https://pick-play.github.io/jp/color-match/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description:
        "ストループテストベースの色マッチゲーム。フォントカラーを合わせるモードと単語の意味を合わせるモードの2種類。3段階の難易度で集中力をテストしよう。",
      inLanguage: "ja",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "ホーム",
          item: "https://pick-play.github.io/jp/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "色マッチゲーム",
          item: "https://pick-play.github.io/jp/color-match/",
        },
      ],
    },
  ],
};

export default function ColorMatchJpLayout({
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
