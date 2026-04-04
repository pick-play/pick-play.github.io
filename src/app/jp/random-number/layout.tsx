import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ランダム数字ジェネレーター - 無作為番号生成",
  description:
    "ランダムな数字を即座に生成。ロト番号、サイコロ、コイン投げ、カスタム範囲など様々な用途に対応。",
  keywords: [
    "ランダム数字",
    "乱数生成",
    "ロト番号生成",
    "サイコロ",
    "コイン投げ",
    "ランダムナンバー",
    "数字ランダム",
    "無作為数字",
  ],
  openGraph: {
    title: "ランダム数字ジェネレーター - 無作為番号生成",
    description: "ランダムな数字を即座に生成。ロト、サイコロ、カスタム範囲プリセット付き。",
    url: "https://pick-play.github.io/jp/random-number/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/random-number/",
    languages: {
      "x-default": "https://pick-play.github.io/random-number/",
      ko: "https://pick-play.github.io/random-number/",
      en: "https://pick-play.github.io/en/random-number/",
      ja: "https://pick-play.github.io/jp/random-number/",
      "zh-CN": "https://pick-play.github.io/cn/random-number/",
      es: "https://pick-play.github.io/es/random-number/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ランダム数字ジェネレーター",
      description: "ランダムな数字を即座に生成。ロト、サイコロ、コイン投げ、カスタム範囲に対応。",
      url: "https://pick-play.github.io/jp/random-number/",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
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
          name: "ランダム数字ジェネレーター",
          item: "https://pick-play.github.io/jp/random-number/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "ロト番号の生成方法は？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "「ロト」プリセットをクリックすると1〜45の範囲で重複なし6個の設定が自動で入ります。生成ボタンを押してください。",
          },
        },
        {
          "@type": "Question",
          name: "重複なしで複数の数字を生成できますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "はい！「重複を許可」トグルをオフにすると、指定範囲内で重複なしの数字を生成します。生成数が範囲サイズを超えないよう注意してください。",
          },
        },
        {
          "@type": "Question",
          name: "結果を並び替えできますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "はい！結果の下の並び替えオプションで昇順・降順を選択できます。",
          },
        },
      ],
    },
  ],
};

export default function RandomNumberJpLayout({
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
