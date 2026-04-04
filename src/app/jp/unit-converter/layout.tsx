import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "単位変換ツール - 長さ・重さ・温度を変換",
  description:
    "長さ・重さ・温度・面積・体積・速度・データ容量の単位をすばやく変換。cm↔inch、kg↔lb、°C↔°F など多彩な単位変換に対応。",
  keywords: [
    "単位変換",
    "単位変換ツール",
    "長さ変換",
    "重さ変換",
    "温度変換",
    "cm インチ 変換",
    "kg ポンド 変換",
    "摂氏 華氏 変換",
  ],
  openGraph: {
    title: "単位変換ツール - 長さ・重さ・温度を変換",
    description: "cm↔inch、kg↔lb、°C↔°F など多彩な単位をすばやく変換。",
    url: "https://pick-play.github.io/jp/unit-converter/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/unit-converter/",
    languages: {
      "x-default": "https://pick-play.github.io/unit-converter/",
      ko: "https://pick-play.github.io/unit-converter/",
      en: "https://pick-play.github.io/en/unit-converter/",
      ja: "https://pick-play.github.io/jp/unit-converter/",
      "zh-CN": "https://pick-play.github.io/cn/unit-converter/",
      es: "https://pick-play.github.io/es/unit-converter/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "単位変換ツール",
      description:
        "長さ・重さ・温度・面積・体積・速度・データ容量の単位をリアルタイムで変換するオンラインツール。",
      url: "https://pick-play.github.io/jp/unit-converter/",
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
          name: "単位変換ツール",
          item: "https://pick-play.github.io/jp/unit-converter/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "単位変換ツールの使い方は？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "カテゴリタブで変換したい種類を選び、変換元と変換先の単位を選択して数値を入力するだけで、すぐに結果が表示されます。",
          },
        },
        {
          "@type": "Question",
          name: "対応している単位の種類は？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "長さ（mm, cm, m, km, in, ft, yd, mi）、重さ（mg, g, kg, oz, lb, ton）、温度（°C, °F, K）、面積、体積、速度、データ容量に対応しています。",
          },
        },
        {
          "@type": "Question",
          name: "クイック変換ボタンとは何ですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "よく使う変換（cm↔inch、kg↔lb、°C↔°F など）をワンクリックで選べるショートカット機能です。",
          },
        },
      ],
    },
  ],
};

export default function UnitConverterJpLayout({
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
