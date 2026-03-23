import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "二选一 - 平衡游戏",
  description: "这个vs那个！各种主题的二选一游戏，考验你的价值观与选择。50多个问题，欢笑连连。",
  keywords: ["二选一", "平衡游戏", "选择题游戏", "两难选择", "派对游戏", "聚会游戏", "有趣问答"],
  openGraph: {
    title: "二选一 - 平衡游戏 | PickPlay",
    description: "这个vs那个！各种主题的二选一游戏，考验你的价值观。",
    url: "https://pick-play.github.io/cn/balance-game/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - 二选一平衡游戏" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/balance-game/",
    languages: {
      "x-default": "https://pick-play.github.io/balance-game/",
      "ko": "https://pick-play.github.io/balance-game/",
      "en": "https://pick-play.github.io/en/balance-game/",
      "ja": "https://pick-play.github.io/jp/balance-game/",
      "zh-CN": "https://pick-play.github.io/cn/balance-game/",
      "es": "https://pick-play.github.io/es/balance-game/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "二选一 - 平衡游戏",
      url: "https://pick-play.github.io/cn/balance-game/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description: "这个vs那个！各种主题的二选一游戏，考验你的价值观与选择。",
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://pick-play.github.io/cn/" },
        { "@type": "ListItem", position: 2, name: "二选一", item: "https://pick-play.github.io/cn/balance-game/" },
      ],
    },
  ],
};

export default function BalanceGameCnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
