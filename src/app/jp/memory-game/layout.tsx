import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "神経衰弱ゲーム - カードめくりマッチング",
  description:
    "無料オンライン神経衰弱ゲーム。カードをめくってペアを見つけよう。3段階の難易度、星評価、ベストタイム記録機能付き。",
  keywords: [
    "神経衰弱",
    "記憶力ゲーム",
    "カードゲーム",
    "ペア合わせ",
    "脳トレ",
    "オンラインゲーム",
    "無料ゲーム",
  ],
  openGraph: {
    title: "神経衰弱ゲーム - カードめくりマッチング | PickPlay",
    description: "無料オンライン神経衰弱ゲーム。カードをめくってペアを見つけよう。難易度3段階。",
    url: "https://pick-play.github.io/jp/memory-game/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - 神経衰弱ゲーム" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/memory-game/",
    languages: {
      "x-default": "https://pick-play.github.io/memory-game/",
      ko: "https://pick-play.github.io/memory-game/",
      en: "https://pick-play.github.io/en/memory-game/",
      ja: "https://pick-play.github.io/jp/memory-game/",
      "zh-CN": "https://pick-play.github.io/cn/memory-game/",
      es: "https://pick-play.github.io/es/memory-game/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "神経衰弱ゲーム",
      description: "無料オンライン神経衰弱ゲーム。カードをめくってペアを見つけよう。難易度3段階、星評価付き。",
      url: "https://pick-play.github.io/jp/memory-game/",
      applicationCategory: "GameApplication",
      genre: "Puzzle",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
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
          name: "神経衰弱ゲーム",
          item: "https://pick-play.github.io/jp/memory-game/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "神経衰弱のルールは？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "2枚のカードをめくって同じ絵柄のペアを探します。すべてのペアを揃えたらクリアです。手数が少ないほど高評価になります。",
          },
        },
        {
          "@type": "Question",
          name: "星の数はどう決まりますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "手数が少ないほど高評価です。かんたん：12手以下で星3、ふつう：16手以下で星3、むずかしい：24手以下で星3。",
          },
        },
        {
          "@type": "Question",
          name: "ベストタイムはどこに保存されますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ブラウザのローカルストレージに保存されます。ブラウザデータを消去するとリセットされます。",
          },
        },
      ],
    },
  ],
};

export default function MemoryGameJpLayout({ children }: { children: React.ReactNode }) {
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
