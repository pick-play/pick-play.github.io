import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "PickPlay - 何食べる？ | ライアーゲーム | チーム分け | デートコース",
    template: "%s | PickPlay",
  },
  description:
    "何食べる？ライアーゲーム、ランダムチーム分け、デートコースの提案まで。選択と楽しさを一度に！PickPlay",
  keywords: [
    "何食べる",
    "ライアーゲーム",
    "チーム分け",
    "割り勘",
    "デートコース",
    "パーティーゲーム",
    "食事提案",
  ],
  openGraph: {
    title: "PickPlay - 楽しい選択を簡単に",
    description:
      "何食べる？ライアーゲーム、チーム分け、デートコースまで一か所で。",
    type: "website",
    locale: "ja_JP",
    url: "https://pick-play.github.io/jp/",
    siteName: "PickPlay",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - ライフスタイルツール",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/",
    languages: {
      "x-default": "https://pick-play.github.io/",
      "ko": "https://pick-play.github.io/",
      en: "https://pick-play.github.io/en/",
      ja: "https://pick-play.github.io/jp/",
      "zh-CN": "https://pick-play.github.io/cn/",
      es: "https://pick-play.github.io/es/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      url: "https://pick-play.github.io/jp/",
      name: "PickPlay",
      publisher: { "@id": "https://pick-play.github.io/#organization" },
      inLanguage: "ja",
    },
  ],
};

export default function JpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="ja">
      <meta httpEquiv="content-language" content="ja" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}
