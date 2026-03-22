import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ライアーゲーム - パーティーゲーム",
  description:
    "友達と一緒にライアーを探せ！8つのテーマから選べるパーティーゲーム。誰が嘘をついているか当てよう。",
  keywords: [
    "ライアーゲーム",
    "パーティーゲーム",
    "友達ゲーム",
    "嘘つきゲーム",
    "グループゲーム",
    "飲み会ゲーム",
    "オンラインパーティー",
    "嘘発見",
    "ボードゲーム風",
    "室内ゲーム",
  ],
  openGraph: {
    title: "ライアーゲーム - パーティーゲーム | PickPlay",
    description:
      "友達と一緒にライアーを探せ！8テーマのパーティーゲーム。",
    url: "https://pick-play.github.io/jp/liar-game",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - ライアーゲーム",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/liar-game",
    languages: {
      "x-default": "https://pick-play.github.io/liar-game",
      "ko": "https://pick-play.github.io/liar-game",
      en: "https://pick-play.github.io/en/liar-game",
      ja: "https://pick-play.github.io/jp/liar-game",
      "zh-CN": "https://pick-play.github.io/cn/liar-game",
      es: "https://pick-play.github.io/es/liar-game",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ライアーゲーム - パーティーゲーム",
      url: "https://pick-play.github.io/jp/liar-game",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description: "友達と一緒にライアーを探せ！8テーマのパーティーゲーム。",
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
          name: "ライアーゲーム",
          item: "https://pick-play.github.io/jp/liar-game",
        },
      ],
    },
  ],
};

export default function LiarGameJpLayout({
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
