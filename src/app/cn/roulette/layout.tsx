import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "随机轮盘 - 决策转盘",
  description: "选择困难？转动轮盘帮你决定！自定义选项，公平随机，让轮盘替你做决定。",
  keywords: ["随机轮盘", "决策轮盘", "转盘游戏", "随机选择", "选择困难", "随机决定", "命运轮盘"],
  openGraph: {
    title: "随机轮盘 - 决策转盘 | PickPlay",
    description: "选择困难？转动轮盘帮你决定！自定义选项，公平随机。",
    url: "https://pick-play.github.io/cn/roulette",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - 随机轮盘" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/roulette",
    languages: {
      "x-default": "https://pick-play.github.io/roulette",
      "ko": "https://pick-play.github.io/roulette",
      "en": "https://pick-play.github.io/en/roulette",
      "ja": "https://pick-play.github.io/jp/roulette",
      "zh-CN": "https://pick-play.github.io/cn/roulette",
      "es": "https://pick-play.github.io/es/roulette",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "随机轮盘 - 决策转盘",
      url: "https://pick-play.github.io/cn/roulette",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description: "选择困难？转动轮盘帮你决定！自定义选项，公平随机。",
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://pick-play.github.io/cn" },
        { "@type": "ListItem", position: 2, name: "随机轮盘", item: "https://pick-play.github.io/cn/roulette" },
      ],
    },
  ],
};

export default function RouletteCnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
