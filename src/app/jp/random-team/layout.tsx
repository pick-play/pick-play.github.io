import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "チーム分け - ランダムグループ",
  description:
    "ランダムで公平にチームを分けます。臨場感あるアニメーション！授業、スポーツ、飲み会のチーム分けに。",
  keywords: [
    "チーム分け",
    "グループ分け",
    "ランダムチーム",
    "チーム決め",
    "メンバー振り分け",
    "授業グループ",
    "スポーツチーム",
    "飲み会チーム",
    "公平チーム分け",
    "チーム自動振り分け",
  ],
  openGraph: {
    title: "チーム分け - ランダムグループ | PickPlay",
    description:
      "ランダムで公平にチームを分けます。臨場感あるアニメーション付き。",
    url: "https://pick-play.github.io/jp/random-team/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - チーム分け",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/random-team/",
    languages: {
      "x-default": "https://pick-play.github.io/random-team/",
      "ko": "https://pick-play.github.io/random-team/",
      en: "https://pick-play.github.io/en/random-team/",
      ja: "https://pick-play.github.io/jp/random-team/",
      "zh-CN": "https://pick-play.github.io/cn/random-team/",
      es: "https://pick-play.github.io/es/random-team/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "チーム分け - ランダムグループ",
      url: "https://pick-play.github.io/jp/random-team/",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description: "ランダムで公平にチームを分けます。臨場感あるアニメーション！",
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
          name: "チーム分け",
          item: "https://pick-play.github.io/jp/random-team/",
        },
      ],
    },
  ],
};

export default function RandomTeamJpLayout({
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
