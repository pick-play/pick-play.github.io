import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "タイマー & ストップウォッチ - オンライン時間計測",
  description:
    "無料のオンラインタイマーとストップウォッチ。カウントダウンタイマー、プリセット、ラップタイム記録機能。勉強・運動・料理に活用できます。",
  keywords: [
    "オンラインタイマー",
    "ストップウォッチ",
    "カウントダウン",
    "タイマーアプリ",
    "時間計測",
    "無料タイマー",
    "ラップタイム",
  ],
  openGraph: {
    title: "タイマー & ストップウォッチ - オンライン時間計測 | PickPlay",
    description: "無料のオンラインタイマーとストップウォッチ。カウントダウン、プリセット、ラップタイム。",
    url: "https://pick-play.github.io/jp/timer/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - タイマー & ストップウォッチ" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/timer/",
    languages: {
      "x-default": "https://pick-play.github.io/timer/",
      ko: "https://pick-play.github.io/timer/",
      en: "https://pick-play.github.io/en/timer/",
      ja: "https://pick-play.github.io/jp/timer/",
      "zh-CN": "https://pick-play.github.io/cn/timer/",
      es: "https://pick-play.github.io/es/timer/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "タイマー & ストップウォッチ",
      url: "https://pick-play.github.io/jp/timer/",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description: "無料のオンラインタイマーとストップウォッチ。カウントダウン、プリセット、ラップタイム。",
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
          name: "タイマー & ストップウォッチ",
          item: "https://pick-play.github.io/jp/timer/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "タイマーとストップウォッチの違いは何ですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "タイマーは設定した時間からゼロまでカウントダウンし、終了時にアラートが鳴ります。ストップウォッチはゼロから時間を計測し、ラップタイムを記録できます。",
          },
        },
        {
          "@type": "Question",
          name: "タイマーのアラートが聞こえません",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ブラウザの設定でサウンドが許可されているか確認してください。Web Audio APIを使用しているため、追加インストールは不要です。",
          },
        },
        {
          "@type": "Question",
          name: "ラップタイムはどう使いますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ストップウォッチ作動中に「ラップ」ボタンを押すと現在の時間が記録されます。複数のセクションのタイムを比較する際に便利です。",
          },
        },
      ],
    },
  ],
};

export default function TimerJpLayout({ children }: { children: React.ReactNode }) {
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
