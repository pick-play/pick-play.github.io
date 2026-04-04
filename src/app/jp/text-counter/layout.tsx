import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "文字数カウント - リアルタイム文字・単語カウンター",
  description:
    "文字数、単語数、文数、段落数、バイト数をリアルタイムで確認。キーワード密度や読了時間の目安も表示。",
  keywords: [
    "文字数カウント",
    "文字数カウンター",
    "単語数カウント",
    "バイト数計算",
    "文字数確認",
    "テキストカウンター",
    "文字数ツール",
  ],
  openGraph: {
    title: "文字数カウント - リアルタイム文字・単語カウンター",
    description:
      "文字数、単語数、バイト数をリアルタイムで確認。キーワード密度・読了時間も表示。",
    url: "https://pick-play.github.io/jp/text-counter/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/text-counter/",
    languages: {
      "x-default": "https://pick-play.github.io/text-counter/",
      ko: "https://pick-play.github.io/text-counter/",
      en: "https://pick-play.github.io/en/text-counter/",
      ja: "https://pick-play.github.io/jp/text-counter/",
      "zh-CN": "https://pick-play.github.io/cn/text-counter/",
      es: "https://pick-play.github.io/es/text-counter/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "文字数カウント",
      description:
        "文字数、単語数、文数、段落数、バイト数をリアルタイムで確認できるテキストカウンター。",
      url: "https://pick-play.github.io/jp/text-counter/",
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
          name: "文字数カウント",
          item: "https://pick-play.github.io/jp/text-counter/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "文字数カウントの使い方は？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "テキストを入力欄に貼り付けるか直接入力するだけで、文字数・単語数・文数・段落数・バイト数がリアルタイムで自動計算されます。",
          },
        },
        {
          "@type": "Question",
          name: "スペース含む・除くの違いは何ですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "スペース含む文字数はスペース・タブ・改行を含む全文字数です。スペース除く文字数はすべての空白文字を除いた純粋な文字数です。",
          },
        },
        {
          "@type": "Question",
          name: "バイト数はどのように計算されますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "UTF-8エンコーディング基準で計算されます。英数字は1バイト、日本語（ひらがな・カタカナ・漢字）は3バイトとしてカウントされます。",
          },
        },
      ],
    },
  ],
};

export default function TextCounterJpLayout({
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
