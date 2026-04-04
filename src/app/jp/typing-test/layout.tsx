import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "タイピング速度テスト - タイピング練習 | PickPlay",
  description:
    "無料のオンラインタイピング速度テスト。WPMと正確率をリアルタイムで計測。やさしい・普通・難しいの3段階で練習できます。",
  keywords: [
    "タイピングテスト",
    "タイピング練習",
    "入力速度",
    "WPM計測",
    "キーボード練習",
    "タイピングスピード",
    "正確率",
  ],
  openGraph: {
    title: "タイピング速度テスト - タイピング練習 | PickPlay",
    description: "無料のオンラインタイピング速度テスト。WPMと正確率をリアルタイムで計測。",
    url: "https://pick-play.github.io/jp/typing-test/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/typing-test/",
    languages: {
      "x-default": "https://pick-play.github.io/typing-test/",
      ko: "https://pick-play.github.io/typing-test/",
      en: "https://pick-play.github.io/en/typing-test/",
      ja: "https://pick-play.github.io/jp/typing-test/",
      "zh-CN": "https://pick-play.github.io/cn/typing-test/",
      es: "https://pick-play.github.io/es/typing-test/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "タイピング速度テスト",
      description:
        "無料のオンラインタイピング速度テスト。WPMと正確率をリアルタイムで計測。やさしい・普通・難しいの3段階で練習できます。",
      url: "https://pick-play.github.io/jp/typing-test/",
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
          name: "タイピング速度テスト",
          item: "https://pick-play.github.io/jp/typing-test/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "WPMはどのように計算されますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "入力した総文字数を5（標準的な単語の長さ）で割り、経過時間（分）で割ることでWPMを算出します。",
          },
        },
        {
          "@type": "Question",
          name: "正確率はどのように計算されますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "入力した全文字数のうち、正しく入力できた文字の割合です。タイプミスを修正してもエラーカウントは増えます。",
          },
        },
        {
          "@type": "Question",
          name: "ベスト記録はどこに保存されますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ベスト記録はブラウザのローカルストレージに保存され、同じデバイスで引き続き表示されます。",
          },
        },
      ],
    },
  ],
};

export default function TypingTestJpLayout({
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
