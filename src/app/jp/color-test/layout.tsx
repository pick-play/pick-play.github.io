import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "カラー性格診断",
  description:
    "あなたを表す色は？10問で分かるカラー性格。8種類のカラータイプで自分の性格を発見しよう。",
  keywords: [
    "カラー性格診断",
    "色の性格",
    "性格診断",
    "カラータイプ",
    "色彩性格",
    "パーソナルカラー",
    "性格テスト",
    "心理テスト",
    "色診断",
    "カラー心理",
  ],
  openGraph: {
    title: "カラー性格診断 | PickPlay",
    description:
      "あなたを表す色は？10問で分かるカラー性格。8種類のカラータイプを診断。",
    url: "https://pick-play.github.io/jp/color-test/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - カラー性格診断",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/color-test/",
    languages: {
      "x-default": "https://pick-play.github.io/color-test/",
      "ko": "https://pick-play.github.io/color-test/",
      en: "https://pick-play.github.io/en/color-test/",
      ja: "https://pick-play.github.io/jp/color-test/",
      "zh-CN": "https://pick-play.github.io/cn/color-test/",
      es: "https://pick-play.github.io/es/color-test/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "カラー性格診断",
      url: "https://pick-play.github.io/jp/color-test/",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description: "あなたを表す色は？10問で分かるカラー性格診断。",
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
          name: "カラー性格診断",
          item: "https://pick-play.github.io/jp/color-test/",
        },
      ],
    },
  ],
};

export default function ColorTestJpLayout({
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
