import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "テトvsエゲン - 性格診断",
  description:
    "テトタイプ？エゲンタイプ？性格診断で確認しよう。あなたの隠れた性向を分析します。",
  keywords: [
    "テトvsエゲン",
    "テトエゲン",
    "性格診断",
    "性向テスト",
    "テト",
    "エゲン",
    "性格タイプ",
    "自己分析",
    "心理テスト",
    "性格チェック",
  ],
  openGraph: {
    title: "テトvsエゲン - 性格診断 | PickPlay",
    description:
      "テトタイプ？エゲンタイプ？性格診断で確認しよう。",
    url: "https://pick-play.github.io/jp/teto-egen",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - テトvsエゲン性格診断",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/teto-egen",
    languages: {
      "x-default": "https://pick-play.github.io/teto-egen",
      "ko": "https://pick-play.github.io/teto-egen",
      en: "https://pick-play.github.io/en/teto-egen",
      ja: "https://pick-play.github.io/jp/teto-egen",
      "zh-CN": "https://pick-play.github.io/cn/teto-egen",
      es: "https://pick-play.github.io/es/teto-egen",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "テトvsエゲン - 性格診断",
      url: "https://pick-play.github.io/jp/teto-egen",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description: "テトタイプ？エゲンタイプ？性格診断で確認しよう。",
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
          name: "テトvsエゲン",
          item: "https://pick-play.github.io/jp/teto-egen",
        },
      ],
    },
  ],
};

export default function TetoEgenJpLayout({
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
