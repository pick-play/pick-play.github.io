import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "梯子游戏 - 随机匹配",
  description: "谁会中奖？精彩的路径追踪动画，结果悬念十足！适合聚会、班级活动随机分配。",
  keywords: ["梯子游戏", "随机匹配", "梯子抽签", "路径追踪", "随机分配", "聚会游戏", "抽签游戏"],
  openGraph: {
    title: "梯子游戏 - 随机匹配 | PickPlay",
    description: "谁会中奖？精彩的路径追踪动画！",
    url: "https://pick-play.github.io/cn/ladder",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - 梯子游戏" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/ladder",
    languages: {
      "x-default": "https://pick-play.github.io/ladder",
      "ko": "https://pick-play.github.io/ladder",
      "en": "https://pick-play.github.io/en/ladder",
      "ja": "https://pick-play.github.io/jp/ladder",
      "zh-CN": "https://pick-play.github.io/cn/ladder",
      "es": "https://pick-play.github.io/es/ladder",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "梯子游戏 - 随机匹配",
      url: "https://pick-play.github.io/cn/ladder",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description: "谁会中奖？精彩的路径追踪动画，结果悬念十足！",
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://pick-play.github.io/cn" },
        { "@type": "ListItem", position: 2, name: "梯子游戏", item: "https://pick-play.github.io/cn/ladder" },
      ],
    },
  ],
};

export default function LadderCnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
