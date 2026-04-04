import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "年齢計算機 - 満年齢・星座・誕生日カウントダウン | PickPlay",
  description:
    "生年月日を入力するだけで、満年齢・星座・干支・世代・次の誕生日までのカウントダウンを即座に計算します。生きてきた総日数や心拍数などの豆知識もチェック。",
  keywords: [
    "年齢計算機",
    "満年齢計算",
    "誕生日カウントダウン",
    "星座計算",
    "干支計算",
    "何歳",
    "生きた日数",
    "誕生日まで",
    "世代診断",
  ],
  openGraph: {
    title: "年齢計算機 - 満年齢・星座・誕生日カウントダウン | PickPlay",
    description: "生年月日から満年齢・星座・干支・次の誕生日までを一気に計算。",
    url: "https://pick-play.github.io/jp/age-calculator/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 年齢計算機",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/age-calculator/",
    languages: {
      "x-default": "https://pick-play.github.io/age-calculator/",
      ko: "https://pick-play.github.io/age-calculator/",
      en: "https://pick-play.github.io/en/age-calculator/",
      ja: "https://pick-play.github.io/jp/age-calculator/",
      "zh-CN": "https://pick-play.github.io/cn/age-calculator/",
      es: "https://pick-play.github.io/es/age-calculator/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "年齢計算機",
      description: "満年齢・星座・干支・誕生日カウントダウンを計算するWebアプリ",
      url: "https://pick-play.github.io/jp/age-calculator/",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
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
          name: "年齢計算機",
          item: "https://pick-play.github.io/jp/age-calculator/",
        },
      ],
    },
  ],
};

export default function AgeCalculatorJpLayout({
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
