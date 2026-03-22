import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "カップル相性 - 名前占い",
  description:
    "名前で分かるふたりの相性！5カテゴリー分析。恋愛、友情、仕事など多角的に相性を診断します。",
  keywords: [
    "カップル相性",
    "名前占い",
    "相性診断",
    "ふたりの相性",
    "カップル診断",
    "相性テスト",
    "恋愛相性",
    "名前で相性",
    "ラブマッチ",
    "相性占い",
  ],
  openGraph: {
    title: "カップル相性 - 名前占い | PickPlay",
    description:
      "名前で分かるふたりの相性！5カテゴリーで多角的に分析。",
    url: "https://pick-play.github.io/jp/couple-test",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - カップル相性診断",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/couple-test",
    languages: {
      "x-default": "https://pick-play.github.io/couple-test",
      "ko": "https://pick-play.github.io/couple-test",
      en: "https://pick-play.github.io/en/couple-test",
      ja: "https://pick-play.github.io/jp/couple-test",
      "zh-CN": "https://pick-play.github.io/cn/couple-test",
      es: "https://pick-play.github.io/es/couple-test",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "カップル相性 - 名前占い",
      url: "https://pick-play.github.io/jp/couple-test",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description: "名前で分かるふたりの相性！5カテゴリー分析。",
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
          name: "カップル相性",
          item: "https://pick-play.github.io/jp/couple-test",
        },
      ],
    },
  ],
};

export default function CoupleTestJpLayout({
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
