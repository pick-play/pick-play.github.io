import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ローン利息計算機 - 返済方式の比較 | PickPlay",
  description:
    "借入金額・年利・期間を入力するだけで、元利均等返済・元金均等返済・満期一括返済の月々の返済額と総利息を即座に計算。返済スケジュール表も確認できます。",
  keywords: [
    "ローン計算機",
    "住宅ローン計算",
    "元利均等返済",
    "元金均等返済",
    "返済シミュレーション",
    "月々の返済額",
    "利息計算",
    "返済スケジュール",
  ],
  openGraph: {
    title: "ローン利息計算機 - 返済方式の比較 | PickPlay",
    description: "元利均等・元金均等・満期一括の月返済額と総利息を即座に比較。",
    url: "https://pick-play.github.io/jp/loan-calculator/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - ローン利息計算機",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/loan-calculator/",
    languages: {
      "x-default": "https://pick-play.github.io/loan-calculator/",
      ko: "https://pick-play.github.io/loan-calculator/",
      en: "https://pick-play.github.io/en/loan-calculator/",
      ja: "https://pick-play.github.io/jp/loan-calculator/",
      "zh-CN": "https://pick-play.github.io/cn/loan-calculator/",
      es: "https://pick-play.github.io/es/loan-calculator/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ローン利息計算機",
      description: "元利均等・元金均等・満期一括返済の月返済額と総利息を計算するWebアプリ",
      url: "https://pick-play.github.io/jp/loan-calculator/",
      applicationCategory: "FinanceApplication",
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
          name: "ローン利息計算機",
          item: "https://pick-play.github.io/jp/loan-calculator/",
        },
      ],
    },
  ],
};

export default function LoanCalculatorJpLayout({
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
