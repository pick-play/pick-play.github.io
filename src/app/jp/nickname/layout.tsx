import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ニックネーム生成 - ランダム名前",
  description:
    "可愛い、カッコいい、面白いなど6スタイルのランダムニックネーム。ゲーム、SNS、チームに使えるユニークな名前を自動生成。",
  keywords: [
    "ニックネーム生成",
    "ニックネーム",
    "ゲームネーム",
    "SNSニックネーム",
    "ランダムニックネーム",
    "面白いニックネーム",
    "可愛いニックネーム",
    "チーム名",
    "ユーザー名生成",
    "ハンドルネーム",
  ],
  openGraph: {
    title: "ニックネーム生成 - ランダム名前 | PickPlay",
    description:
      "6スタイルのランダムニックネーム生成。ゲーム、SNS、チームに最適。",
    url: "https://pick-play.github.io/jp/nickname",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - ニックネーム生成",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/nickname",
    languages: {
      "x-default": "https://pick-play.github.io/nickname",
      "ko": "https://pick-play.github.io/nickname",
      en: "https://pick-play.github.io/en/nickname",
      ja: "https://pick-play.github.io/jp/nickname",
      "zh-CN": "https://pick-play.github.io/cn/nickname",
      es: "https://pick-play.github.io/es/nickname",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ニックネーム生成 - ランダム名前",
      url: "https://pick-play.github.io/jp/nickname",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description: "6スタイルのランダムニックネームを自動生成。",
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
          name: "ニックネーム生成",
          item: "https://pick-play.github.io/jp/nickname",
        },
      ],
    },
  ],
};

export default function NicknameJpLayout({
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
