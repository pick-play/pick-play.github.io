import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "あみだくじ - ランダムマッチング",
  description:
    "誰が当たり？ドキドキの経路追跡アニメーション！当番決め、プレゼント配分、チーム分けに最適。",
  keywords: [
    "あみだくじ",
    "あみだ",
    "ランダムマッチング",
    "当番決め",
    "担当決め",
    "あみだくじオンライン",
    "くじ引き",
    "ランダム割り当て",
    "グループ分け",
    "役割決め",
  ],
  openGraph: {
    title: "あみだくじ - ランダムマッチング | PickPlay",
    description: "誰が当たり？ドキドキの経路追跡アニメーション付きあみだくじ！",
    url: "https://pick-play.github.io/jp/ladder/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - あみだくじ",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/ladder/",
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
      name: "あみだくじ - ランダムマッチング",
      url: "https://pick-play.github.io/jp/ladder/",
      applicationCategory: "EntertainmentApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description: "誰が当たり？ドキドキの経路追跡アニメーション！",
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
          name: "あみだくじ",
          item: "https://pick-play.github.io/jp/ladder/",
        },
      ],
    },
  ],
};

export default function LadderJpLayout({
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
