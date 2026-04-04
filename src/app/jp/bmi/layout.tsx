import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI計算機 - 体格指数（BMI）測定",
  description:
    "身長と体重を入力するだけでBMI（体格指数）を瞬時に計算。低体重・普通体重・過体重・肥満の分類と標準体重範囲を確認できます。",
  keywords: [
    "BMI計算機",
    "体格指数",
    "BMI計算",
    "肥満度計算",
    "標準体重計算",
    "体重計算機",
    "BMI測定",
  ],
  openGraph: {
    title: "BMI計算機 - 体格指数（BMI）測定",
    description:
      "身長と体重からBMIを瞬時に計算。分類と標準体重範囲を確認。",
    url: "https://pick-play.github.io/jp/bmi/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/bmi/",
    languages: {
      "x-default": "https://pick-play.github.io/bmi/",
      ko: "https://pick-play.github.io/bmi/",
      en: "https://pick-play.github.io/en/bmi/",
      ja: "https://pick-play.github.io/jp/bmi/",
      "zh-CN": "https://pick-play.github.io/cn/bmi/",
      es: "https://pick-play.github.io/es/bmi/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "BMI計算機",
      description:
        "身長と体重からBMI（体格指数）を瞬時に計算し、分類するオンラインBMI計算機。",
      url: "https://pick-play.github.io/jp/bmi/",
      applicationCategory: "HealthApplication",
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
          name: "BMI計算機",
          item: "https://pick-play.github.io/jp/bmi/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "BMIはどのように計算しますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "BMI（体格指数）は体重（kg）を身長（m）の二乗で割って計算します。例えば身長170cm、体重65kgの場合、BMI = 65 ÷ (1.7 × 1.7) = 22.5となります。",
          },
        },
        {
          "@type": "Question",
          name: "BMIの正常範囲はどれくらいですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "WHO基準では、BMI18.5未満が低体重、18.5〜24.9が普通体重、25〜29.9が過体重、30以上が肥満に分類されます。",
          },
        },
        {
          "@type": "Question",
          name: "メートル法とヤード・ポンド法の両方に対応していますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "はい。上部のトグルボタンでcm/kg（メートル法）とft-in/lbs（ヤード・ポンド法）を切り替えられます。",
          },
        },
      ],
    },
  ],
};

export default function BmiJpLayout({
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
