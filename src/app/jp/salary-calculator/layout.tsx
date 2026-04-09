import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "年収手取り計算機 - 社会保険・税金計算",
  description:
    "韓国の年収手取り額を即座に計算。国民年金・健康保険・介護保険・雇用保険・所得税・地方所得税を自動計算し、月額および年間手取り額を表示します。",
  keywords: [
    "年収手取り計算機",
    "韓国給与計算",
    "手取り額計算",
    "所得税計算",
    "国民年金計算",
    "健康保険計算",
    "2024年収計算",
  ],
  openGraph: {
    title: "年収手取り計算機 - 社会保険・税金計算",
    description:
      "年収を入力するだけで韓国の社会保険・税金を自動計算。月額・年間手取り額を即座に確認。",
    url: "https://pick-play.github.io/jp/salary-calculator/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/salary-calculator/",
    languages: {
      "x-default": "https://pick-play.github.io/salary-calculator/",
      ko: "https://pick-play.github.io/salary-calculator/",
      en: "https://pick-play.github.io/en/salary-calculator/",
      ja: "https://pick-play.github.io/jp/salary-calculator/",
      "zh-CN": "https://pick-play.github.io/cn/salary-calculator/",
      es: "https://pick-play.github.io/es/salary-calculator/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "年収手取り計算機",
      description:
        "年収を入力すると国民年金・健康保険・介護保険・雇用保険・所得税・地方所得税を自動計算し、月額および年間手取り額を表示するオンライン計算機。",
      url: "https://pick-play.github.io/jp/salary-calculator/",
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
          name: "年収手取り計算機",
          item: "https://pick-play.github.io/jp/salary-calculator/",
        },
      ],
    },
  ],
};

export default function SalaryCalculatorJpLayout({
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
