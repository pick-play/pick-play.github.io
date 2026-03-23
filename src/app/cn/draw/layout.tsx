import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "抽签 - 随机抽奖",
  description: "公平随机抽签！翻牌揭晓，戏剧性满分。适合决定谁来做、抽奖、随机分配任务。",
  keywords: ["抽签", "随机抽奖", "抽签工具", "公平抽签", "随机选人", "抽奖工具", "翻牌抽签"],
  openGraph: {
    title: "抽签 - 随机抽奖 | PickPlay",
    description: "公平随机抽签！翻牌揭晓，戏剧性满分。",
    url: "https://pick-play.github.io/cn/draw/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - 随机抽签" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/draw/",
    languages: {
      "x-default": "https://pick-play.github.io/draw/",
      "ko": "https://pick-play.github.io/draw/",
      "en": "https://pick-play.github.io/en/draw/",
      "ja": "https://pick-play.github.io/jp/draw/",
      "zh-CN": "https://pick-play.github.io/cn/draw/",
      "es": "https://pick-play.github.io/es/draw/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "抽签 - 随机抽奖",
      url: "https://pick-play.github.io/cn/draw/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description: "公平随机抽签！翻牌揭晓，戏剧性满分。",
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://pick-play.github.io/cn/" },
        { "@type": "ListItem", position: 2, name: "抽签", item: "https://pick-play.github.io/cn/draw/" },
      ],
    },
  ],
};

export default function DrawCnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
