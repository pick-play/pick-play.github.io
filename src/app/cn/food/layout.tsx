import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "吃什么？ - 菜单推荐轮盘",
  description: "不知道吃什么？从130多种菜品中根据口味偏好智能推荐。中餐、日料、韩餐、西餐、甜点全都有，告别选择困难！",
  keywords: ["吃什么", "今天吃什么", "午餐推荐", "晚餐推荐", "美食推荐", "菜单推荐", "随机美食", "中餐推荐", "外卖推荐"],
  openGraph: {
    title: "吃什么？ - 130种菜品推荐轮盘 | PickPlay",
    description: "减少纠结，快速选择！在口味地图上选好偏好，轮盘帮你挑出最合适的美食。",
    url: "https://pick-play.github.io/cn/food/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - 吃什么推荐" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/food/",
    languages: {
      "x-default": "https://pick-play.github.io/food/",
      "ko": "https://pick-play.github.io/food/",
      "en": "https://pick-play.github.io/en/food/",
      "ja": "https://pick-play.github.io/jp/food/",
      "zh-CN": "https://pick-play.github.io/cn/food/",
      "es": "https://pick-play.github.io/es/food/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "吃什么？ - 菜单推荐轮盘",
      url: "https://pick-play.github.io/cn/food/",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description: "从130多种菜品中根据口味偏好推荐最合适的美食。",
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://pick-play.github.io/cn/" },
        { "@type": "ListItem", position: 2, name: "吃什么？", item: "https://pick-play.github.io/cn/food/" },
      ],
    },
  ],
};

export default function FoodCnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
