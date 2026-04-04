import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "记忆翻牌游戏 - 翻转配对",
  description:
    "免费在线记忆翻牌游戏。翻转卡片找到配对。三种难度级别，星级评分，最佳时间记录功能。",
  keywords: [
    "记忆游戏",
    "翻牌游戏",
    "配对游戏",
    "脑力游戏",
    "在线游戏",
    "免费游戏",
    "益智游戏",
  ],
  openGraph: {
    title: "记忆翻牌游戏 - 翻转配对 | PickPlay",
    description: "免费在线记忆翻牌游戏。翻转卡片找到配对，支持三种难度。",
    url: "https://pick-play.github.io/cn/memory-game/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - 记忆翻牌游戏" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/memory-game/",
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
      name: "记忆翻牌游戏",
      description: "免费在线记忆翻牌游戏。翻转卡片找到配对，支持三种难度，带星级评分。",
      url: "https://pick-play.github.io/cn/memory-game/",
      applicationCategory: "GameApplication",
      genre: "Puzzle",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "首页",
          item: "https://pick-play.github.io/cn/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "记忆翻牌游戏",
          item: "https://pick-play.github.io/cn/memory-game/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "游戏怎么玩？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "每次翻两张牌，找到相同图案的配对。配对所有卡片即可获胜！步数越少，星级越高。",
          },
        },
        {
          "@type": "Question",
          name: "星级评分如何确定？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "步数越少星级越高。简单：12步以内获得3星，普通：16步以内获得3星，困难：24步以内获得3星。",
          },
        },
        {
          "@type": "Question",
          name: "最佳时间保存在哪里？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "最佳时间保存在浏览器的本地存储中。清除浏览器数据将重置记录。",
          },
        },
      ],
    },
  ],
};

export default function MemoryGameCnLayout({ children }: { children: React.ReactNode }) {
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
