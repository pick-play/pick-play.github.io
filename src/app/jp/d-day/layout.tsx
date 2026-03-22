import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "D-Day計算機 - カウントダウン",
  description:
    "大切な日までの残り日数を一目で。受験、誕生日、記念日まで。複数のD-Dayを同時に管理できます。",
  keywords: [
    "Dday計算",
    "カウントダウン",
    "残り日数",
    "誕生日カウントダウン",
    "記念日計算",
    "試験まで",
    "入試カウントダウン",
    "日数計算",
    "特別な日",
    "イベントカウントダウン",
  ],
  openGraph: {
    title: "D-Day計算機 - カウントダウン | PickPlay",
    description:
      "大切な日までの残り日数を一目で。受験、誕生日、記念日まで管理。",
    url: "https://pick-play.github.io/jp/d-day",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - D-Day計算機",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/d-day",
    languages: {
      "x-default": "https://pick-play.github.io/d-day",
      "ko": "https://pick-play.github.io/d-day",
      en: "https://pick-play.github.io/en/d-day",
      ja: "https://pick-play.github.io/jp/d-day",
      "zh-CN": "https://pick-play.github.io/cn/d-day",
      es: "https://pick-play.github.io/es/d-day",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "D-Day計算機 - カウントダウン",
      url: "https://pick-play.github.io/jp/d-day",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description: "大切な日までの残り日数を一目で確認できます。",
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
          name: "D-Day計算機",
          item: "https://pick-play.github.io/jp/d-day",
        },
      ],
    },
  ],
};

export default function DDayJpLayout({
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
