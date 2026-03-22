import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "理想型ワールドカップ - トーナメント",
  description:
    "6カテゴリー、96人の候補！トーナメントであなたの理想型を見つけよう。アイドル、俳優、アニメキャラまで。",
  keywords: [
    "理想型ワールドカップ",
    "ワールドカップ",
    "トーナメント",
    "理想の人",
    "好みのタイプ",
    "アイドルトーナメント",
    "二択ゲーム",
    "理想型診断",
    "好きなキャラ",
    "推しトーナメント",
  ],
  openGraph: {
    title: "理想型ワールドカップ - トーナメント | PickPlay",
    description:
      "6カテゴリー、96人の候補！トーナメントであなたの理想型を見つけよう。",
    url: "https://pick-play.github.io/jp/worldcup",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 理想型ワールドカップ",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/worldcup",
    languages: {
      "x-default": "https://pick-play.github.io/worldcup",
      "ko": "https://pick-play.github.io/worldcup",
      en: "https://pick-play.github.io/en/worldcup",
      ja: "https://pick-play.github.io/jp/worldcup",
      "zh-CN": "https://pick-play.github.io/cn/worldcup",
      es: "https://pick-play.github.io/es/worldcup",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "理想型ワールドカップ - トーナメント",
      url: "https://pick-play.github.io/jp/worldcup",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description: "6カテゴリー、96人の候補！トーナメントで理想型を見つけよう。",
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
          name: "理想型ワールドカップ",
          item: "https://pick-play.github.io/jp/worldcup",
        },
      ],
    },
  ],
};

export default function WorldcupJpLayout({
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
