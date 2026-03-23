import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ワードクイズ - 文字当てゲーム",
  description:
    "頭文字だけで単語を当てよう！ヒントとタイマー付き。100種類以上の単語で友達と競い合おう。",
  keywords: [
    "ワードクイズ",
    "文字当てゲーム",
    "単語クイズ",
    "なぞなぞ",
    "パーティーゲーム",
    "友達クイズ",
    "頭文字クイズ",
    "言葉遊び",
    "頭の体操",
    "クイズゲーム",
  ],
  openGraph: {
    title: "ワードクイズ - 文字当てゲーム | PickPlay",
    description:
      "頭文字だけで単語を当てよう！ヒントとタイマー付きワードクイズ。",
    url: "https://pick-play.github.io/jp/chosung-quiz/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - ワードクイズ",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/chosung-quiz/",
    languages: {
      "x-default": "https://pick-play.github.io/chosung-quiz/",
      "ko": "https://pick-play.github.io/chosung-quiz/",
      en: "https://pick-play.github.io/en/chosung-quiz/",
      ja: "https://pick-play.github.io/jp/chosung-quiz/",
      "zh-CN": "https://pick-play.github.io/cn/chosung-quiz/",
      es: "https://pick-play.github.io/es/chosung-quiz/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ワードクイズ - 文字当てゲーム",
      url: "https://pick-play.github.io/jp/chosung-quiz/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description: "頭文字だけで単語を当てよう！ヒントとタイマー付き。",
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
          name: "ワードクイズ",
          item: "https://pick-play.github.io/jp/chosung-quiz/",
        },
      ],
    },
  ],
};

export default function ChosungQuizJpLayout({
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
