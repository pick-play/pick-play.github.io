import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "くじ引き - ランダム抽選",
  description:
    "公平なランダム抽選！カードめくりでドラマチックに。当番決め、プレゼント抽選、担当割り当てに便利。",
  keywords: [
    "くじ引き",
    "抽選",
    "ランダム抽選",
    "当番決め",
    "担当決め",
    "くじびき",
    "くじ",
    "抽選ツール",
    "プレゼント抽選",
    "グループ抽選",
    "公平抽選",
  ],
  openGraph: {
    title: "くじ引き - ランダム抽選 | PickPlay",
    description:
      "公平なランダム抽選！カードめくりでドラマチックに当選者を決定。",
    url: "https://pick-play.github.io/jp/draw",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - くじ引き",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/draw",
    languages: {
      "x-default": "https://pick-play.github.io/draw",
      "ko": "https://pick-play.github.io/draw",
      en: "https://pick-play.github.io/en/draw",
      ja: "https://pick-play.github.io/jp/draw",
      "zh-CN": "https://pick-play.github.io/cn/draw",
      es: "https://pick-play.github.io/es/draw",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "くじ引き - ランダム抽選",
      url: "https://pick-play.github.io/jp/draw",
      applicationCategory: "EntertainmentApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description: "公平なランダム抽選！カードめくりでドラマチックに。",
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
          name: "くじ引き",
          item: "https://pick-play.github.io/jp/draw",
        },
      ],
    },
  ],
};

export default function DrawJpLayout({
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
