import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "座席配置 - ランダム配置",
  description:
    "教室、会議室、スタディカフェの座席をランダムに配置。プリセット対応で素早く公平な席替えが可能。",
  keywords: [
    "座席配置",
    "席替え",
    "ランダム座席",
    "教室席替え",
    "会議室座席",
    "座席決め",
    "席順決め",
    "座席抽選",
    "グループ座席",
    "公平な席替え",
  ],
  openGraph: {
    title: "座席配置 - ランダム配置 | PickPlay",
    description:
      "教室、会議室、スタディカフェの座席をランダムに公平配置。プリセット対応。",
    url: "https://pick-play.github.io/jp/seat/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 座席配置",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/seat/",
    languages: {
      "x-default": "https://pick-play.github.io/seat/",
      "ko": "https://pick-play.github.io/seat/",
      en: "https://pick-play.github.io/en/seat/",
      ja: "https://pick-play.github.io/jp/seat/",
      "zh-CN": "https://pick-play.github.io/cn/seat/",
      es: "https://pick-play.github.io/es/seat/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "座席配置 - ランダム配置",
      url: "https://pick-play.github.io/jp/seat/",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description: "教室、会議室、スタディカフェの座席をランダムに配置。",
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
          name: "座席配置",
          item: "https://pick-play.github.io/jp/seat/",
        },
      ],
    },
  ],
};

export default function SeatJpLayout({
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
