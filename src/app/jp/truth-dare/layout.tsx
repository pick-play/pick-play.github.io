import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "真実か挑戦か - パーティーゲーム",
  description:
    "392の質問とミッション！レベル別に楽しむパーティー必須ゲーム。Truth or Dareで友達との距離を縮めよう。",
  keywords: [
    "Truth or Dare",
    "真実か挑戦か",
    "パーティーゲーム",
    "友達ゲーム",
    "飲み会ゲーム",
    "質問ゲーム",
    "ミッションゲーム",
    "盛り上がるゲーム",
    "カップルゲーム",
    "仲良しゲーム",
  ],
  openGraph: {
    title: "真実か挑戦か - パーティーゲーム | PickPlay",
    description:
      "392の質問とミッション！レベル別に楽しむパーティー必須ゲーム。",
    url: "https://pick-play.github.io/jp/truth-dare",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 真実か挑戦か",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/truth-dare",
    languages: {
      "x-default": "https://pick-play.github.io/truth-dare",
      "ko": "https://pick-play.github.io/truth-dare",
      en: "https://pick-play.github.io/en/truth-dare",
      ja: "https://pick-play.github.io/jp/truth-dare",
      "zh-CN": "https://pick-play.github.io/cn/truth-dare",
      es: "https://pick-play.github.io/es/truth-dare",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "真実か挑戦か - パーティーゲーム",
      url: "https://pick-play.github.io/jp/truth-dare",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description: "392の質問とミッション！レベル別に楽しむパーティー必須ゲーム。",
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
          name: "真実か挑戦か",
          item: "https://pick-play.github.io/jp/truth-dare",
        },
      ],
    },
  ],
};

export default function TruthDareJpLayout({
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
