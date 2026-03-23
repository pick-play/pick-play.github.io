import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "谁是卧底 - 派对游戏",
  description: "和朋友们一起找出卧底！终极派对游戏，8个主题，欢笑不停。聚会必备游戏！",
  keywords: ["谁是卧底", "卧底游戏", "派对游戏", "聚会游戏", "找卧底", "派对必备", "朋友游戏"],
  openGraph: {
    title: "谁是卧底 - 派对游戏 | PickPlay",
    description: "和朋友们一起找出卧底！终极派对游戏，欢笑不停。",
    url: "https://pick-play.github.io/cn/liar-game/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - 谁是卧底" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/liar-game/",
    languages: {
      "x-default": "https://pick-play.github.io/liar-game/",
      "ko": "https://pick-play.github.io/liar-game/",
      "en": "https://pick-play.github.io/en/liar-game/",
      "ja": "https://pick-play.github.io/jp/liar-game/",
      "zh-CN": "https://pick-play.github.io/cn/liar-game/",
      "es": "https://pick-play.github.io/es/liar-game/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "谁是卧底 - 派对游戏",
      url: "https://pick-play.github.io/cn/liar-game/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description: "和朋友们一起找出卧底！终极派对游戏，欢笑不停。",
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://pick-play.github.io/cn/" },
        { "@type": "ListItem", position: 2, name: "谁是卧底", item: "https://pick-play.github.io/cn/liar-game/" },
      ],
    },
  ],
};

export default function LiarGameCnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
