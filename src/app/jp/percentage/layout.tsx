import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "パーセント計算機 - 割合を簡単に計算",
  description:
    "無料のオンラインパーセント計算機。XのY%がいくらか、XはYの何%か、変化率の計算まで対応。チップ計算機能も付いています。",
  keywords: [
    "パーセント計算機",
    "割合計算",
    "百分率計算",
    "変化率計算",
    "チップ計算機",
    "割引計算",
    "比率計算機",
  ],
  openGraph: {
    title: "パーセント計算機 - 割合を簡単に計算 | PickPlay",
    description: "無料のオンラインパーセント計算機。割合・変化率・チップ計算まで一度に。",
    url: "https://pick-play.github.io/jp/percentage/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - パーセント計算機" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/percentage/",
    languages: {
      "x-default": "https://pick-play.github.io/percentage/",
      ko: "https://pick-play.github.io/percentage/",
      en: "https://pick-play.github.io/en/percentage/",
      ja: "https://pick-play.github.io/jp/percentage/",
      "zh-CN": "https://pick-play.github.io/cn/percentage/",
      es: "https://pick-play.github.io/es/percentage/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "パーセント計算機",
      url: "https://pick-play.github.io/jp/percentage/",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description: "無料のオンラインパーセント計算機。割合・変化率・チップ計算対応。",
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
          name: "パーセント計算機",
          item: "https://pick-play.github.io/jp/percentage/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "パーセントとは何ですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "パーセントは全体を100としたときの割合です。例えば200の15%は200×0.15=30です。",
          },
        },
        {
          "@type": "Question",
          name: "変化率はどのように計算しますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "変化率(%) = (新しい値 - 元の値) ÷ 元の値 × 100 です。100から150になった場合は+50%です。",
          },
        },
        {
          "@type": "Question",
          name: "チップ計算機の使い方は？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "金額とチップのパーセントを入力すると、チップ金額と合計が自動的に計算されます。",
          },
        },
      ],
    },
  ],
};

export default function PercentageJpLayout({ children }: { children: React.ReactNode }) {
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
