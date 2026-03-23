import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "猜词游戏 - 首字母猜词",
  description: "根据首字母猜单词！带提示和计时器，越玩越上头。100多个词汇，适合聚会娱乐。",
  keywords: ["猜词游戏", "首字母游戏", "文字游戏", "猜单词", "聚会游戏", "益智游戏", "字谜游戏"],
  openGraph: {
    title: "猜词游戏 - 首字母猜词 | PickPlay",
    description: "根据首字母猜单词！带提示和计时器，越玩越上头。",
    url: "https://pick-play.github.io/cn/chosung-quiz/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - 猜词游戏" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/chosung-quiz/",
    languages: {
      "x-default": "https://pick-play.github.io/chosung-quiz/",
      "ko": "https://pick-play.github.io/chosung-quiz/",
      "en": "https://pick-play.github.io/en/chosung-quiz/",
      "ja": "https://pick-play.github.io/jp/chosung-quiz/",
      "zh-CN": "https://pick-play.github.io/cn/chosung-quiz/",
      "es": "https://pick-play.github.io/es/chosung-quiz/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "猜词游戏 - 首字母猜词",
      url: "https://pick-play.github.io/cn/chosung-quiz/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description: "根据首字母猜单词！带提示和计时器，越玩越上头。",
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://pick-play.github.io/cn/" },
        { "@type": "ListItem", position: 2, name: "猜词游戏", item: "https://pick-play.github.io/cn/chosung-quiz/" },
      ],
    },
  ],
};

export default function ChosungQuizCnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
