import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ランダムルーレット - 決定スピナー",
  description:
    "迷ったときに！回して決めましょう。カスタムルーレットで何でも決定できます。食事、ゲーム、担当決めに大活躍。",
  keywords: [
    "ランダムルーレット",
    "ルーレット",
    "決定ルーレット",
    "ランダム決定",
    "何食べるルーレット",
    "担当決め",
    "じゃんけんルーレット",
    "くじ引きルーレット",
    "カスタムルーレット",
    "スピナー",
  ],
  openGraph: {
    title: "ランダムルーレット - 決定スピナー | PickPlay",
    description: "迷ったときに！回して決めましょう。カスタムルーレット対応。",
    url: "https://pick-play.github.io/jp/roulette",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - ランダムルーレット",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/roulette",
    languages: {
      "x-default": "https://pick-play.github.io/roulette",
      "ko": "https://pick-play.github.io/roulette",
      en: "https://pick-play.github.io/en/roulette",
      ja: "https://pick-play.github.io/jp/roulette",
      "zh-CN": "https://pick-play.github.io/cn/roulette",
      es: "https://pick-play.github.io/es/roulette",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ランダムルーレット - 決定スピナー",
      url: "https://pick-play.github.io/jp/roulette",
      applicationCategory: "EntertainmentApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description: "迷ったときに！カスタムルーレットで何でも決定できます。",
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
          name: "ランダムルーレット",
          item: "https://pick-play.github.io/jp/roulette",
        },
      ],
    },
  ],
};

export default function RouletteJpLayout({
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
