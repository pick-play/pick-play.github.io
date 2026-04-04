import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "反応速度テスト - あなたの反応速度は？ | PickPlay",
  description:
    "画面が緑になったらすぐクリック！反応速度をミリ秒単位で計測し、平均的な人間（215ms）と比較しましょう。最高記録と直近5回の平均も確認できます。",
  keywords: [
    "反応速度テスト",
    "反応時間測定",
    "反射神経テスト",
    "クリック速度",
    "反応速度ゲーム",
    "反応速度 平均",
    "反射テスト",
  ],
  openGraph: {
    title: "反応速度テスト | PickPlay",
    description: "緑になったらすぐクリック！平均的な人間（215ms）と反応速度を比較しよう。",
    url: "https://pick-play.github.io/jp/reaction-test/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 反応速度テスト",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/reaction-test/",
    languages: {
      "x-default": "https://pick-play.github.io/reaction-test/",
      ko: "https://pick-play.github.io/reaction-test/",
      en: "https://pick-play.github.io/en/reaction-test/",
      ja: "https://pick-play.github.io/jp/reaction-test/",
      "zh-CN": "https://pick-play.github.io/cn/reaction-test/",
      es: "https://pick-play.github.io/es/reaction-test/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "反応速度テスト",
      url: "https://pick-play.github.io/jp/reaction-test/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description:
        "緑色の画面が表示されたらすぐにクリックして反応速度をミリ秒単位で計測します。平均的な人間と比較して最高記録を更新しましょう。",
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
          name: "反応速度テスト",
          item: "https://pick-play.github.io/jp/reaction-test/",
        },
      ],
    },
  ],
};

export default function ReactionTestJpLayout({
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
