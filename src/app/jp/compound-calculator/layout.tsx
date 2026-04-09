import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "複利計算機 - 貯蓄・投資リターン計算 | PickPlay",
  description:
    "無料の複利計算機。初期投資額・毎月の積立額・年利率を入力するだけで最終金額・総利息・年別成長チャートを即時表示。72の法則・目標金額逆算機能付き。",
  keywords: [
    "複利計算機",
    "単利複利計算",
    "利息計算機",
    "投資リターン計算",
    "積立計算機",
    "72の法則",
    "目標金額計算",
    "年複利計算",
  ],
  openGraph: {
    title: "複利計算機 - 貯蓄・投資リターン計算 | PickPlay",
    description:
      "無料複利計算機。初期投資・積立額・年利で最終金額を即計算。単利・複利比較と72の法則付き。",
    url: "https://pick-play.github.io/jp/compound-calculator/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/compound-calculator/",
    languages: {
      "x-default": "https://pick-play.github.io/compound-calculator/",
      ko: "https://pick-play.github.io/compound-calculator/",
      en: "https://pick-play.github.io/en/compound-calculator/",
      ja: "https://pick-play.github.io/jp/compound-calculator/",
      "zh-CN": "https://pick-play.github.io/cn/compound-calculator/",
      es: "https://pick-play.github.io/es/compound-calculator/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "複利計算機",
      description:
        "初期投資額・毎月の積立額・年利率・複利周期を入力して最終金額と総利息を即時計算。年別資産成長チャート・72の法則・目標金額逆算機能付き。",
      url: "https://pick-play.github.io/jp/compound-calculator/",
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
          name: "複利計算機",
          item: "https://pick-play.github.io/jp/compound-calculator/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "単利と複利の違いは何ですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "単利は元本のみに利息がつきますが、複利は利息にも利息がつくため、時間が経つほど指数関数的に資産が増えます。",
          },
        },
        {
          "@type": "Question",
          name: "複利周期が短いほど有利ですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "はい。月複利 > 四半期複利 > 年複利の順でリターンが高くなります。複利周期が短いほど実効年利率が高くなります。",
          },
        },
        {
          "@type": "Question",
          name: "72の法則とは何ですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "72を年利率で割ると、元本が約2倍になるまでの年数を素早く推定できます。例：年利8%なら72÷8=9年。",
          },
        },
      ],
    },
  ],
};

export default function CompoundCalculatorJpLayout({
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
