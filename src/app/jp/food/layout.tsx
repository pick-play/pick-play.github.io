import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "何食べる？ - メニュー提案ルーレット",
  description:
    "何食べるか迷ったら！130種類以上のメニューからお好みに合った料理を提案します。和食、洋食、中華、韓国料理、デザートなどお好みマップで選ぶだけ。",
  keywords: [
    "何食べる",
    "今日のご飯",
    "ランチ何食べる",
    "ディナー提案",
    "食事提案アプリ",
    "ランダムメニュー",
    "メニュー決め",
    "ご飯選び",
    "和食提案",
    "食べ物ルーレット",
    "外食決め",
    "メニュー迷う",
  ],
  openGraph: {
    title: "何食べる？ - 130種類メニュー提案ルーレット | PickPlay",
    description:
      "迷ったらPickPlay！お好みマップで選ぶだけで料理を提案します。",
    url: "https://pick-play.github.io/jp/food/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 何食べる？メニュー提案",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/food/",
    languages: {
      "x-default": "https://pick-play.github.io/food/",
      "ko": "https://pick-play.github.io/food/",
      en: "https://pick-play.github.io/en/food/",
      ja: "https://pick-play.github.io/jp/food/",
      "zh-CN": "https://pick-play.github.io/cn/food/",
      es: "https://pick-play.github.io/es/food/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "何食べる？ - メニュー提案ルーレット",
      url: "https://pick-play.github.io/jp/food/",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description:
        "130種類以上のメニューからお好みに合った料理をお好みマップで提案します。",
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
          name: "何食べる？",
          item: "https://pick-play.github.io/jp/food/",
        },
      ],
    },
  ],
};

export default function FoodJpLayout({
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
