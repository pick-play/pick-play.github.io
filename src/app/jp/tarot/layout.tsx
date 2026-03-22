import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yes or No タロット - カード占い",
  description:
    "悩みがあるときタロットカードに聞いてみよう！22枚のメジャーアルカナで答えが出る。恋愛、仕事、日常の迷いに。",
  keywords: [
    "タロット占い",
    "タロットカード",
    "Yes No占い",
    "タロット",
    "カード占い",
    "メジャーアルカナ",
    "恋愛占い",
    "仕事占い",
    "無料タロット",
    "オンラインタロット",
    "占い",
  ],
  openGraph: {
    title: "Yes or No タロット - カード占い | PickPlay",
    description:
      "悩みがあるときタロットカードに聞いてみよう！22枚のメジャーアルカナ。",
    url: "https://pick-play.github.io/jp/tarot",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - タロット占い",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/tarot",
    languages: {
      "x-default": "https://pick-play.github.io/tarot",
      "ko": "https://pick-play.github.io/tarot",
      en: "https://pick-play.github.io/en/tarot",
      ja: "https://pick-play.github.io/jp/tarot",
      "zh-CN": "https://pick-play.github.io/cn/tarot",
      es: "https://pick-play.github.io/es/tarot",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Yes or No タロット - カード占い",
      url: "https://pick-play.github.io/jp/tarot",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description: "悩みがあるときタロットカードに聞いてみよう！22枚のメジャーアルカナ。",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "ホーム",
          item: "https://pick-play.github.io/jp",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Yes or No タロット",
          item: "https://pick-play.github.io/jp/tarot",
        },
      ],
    },
  ],
};

export default function TarotJpLayout({
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
