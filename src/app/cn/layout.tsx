import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "PickPlay - 吃什么 | 谁是卧底 | 随机分组 | 约会路线",
    template: "%s | PickPlay",
  },
  description: "吃什么？谁是卧底、随机分组、约会路线推荐，一站式解决！选择与乐趣，尽在PickPlay",
  keywords: ["吃什么", "谁是卧底", "随机分组", "AA算账", "约会路线", "派对游戏", "美食推荐"],
  openGraph: {
    title: "PickPlay - 轻松做出有趣的选择",
    description: "吃什么？谁是卧底、随机分组、约会路线推荐，一站搞定。",
    type: "website",
    locale: "zh_CN",
    url: "https://pick-play.github.io/cn/",
    siteName: "PickPlay",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - 生活方式工具" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/",
    languages: {
      "x-default": "https://pick-play.github.io/",
      "ko": "https://pick-play.github.io/",
      "en": "https://pick-play.github.io/en/",
      "ja": "https://pick-play.github.io/jp/",
      "zh-CN": "https://pick-play.github.io/cn/",
      "es": "https://pick-play.github.io/es/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      url: "https://pick-play.github.io/cn/",
      name: "PickPlay",
      publisher: { "@id": "https://pick-play.github.io/#organization" },
      inLanguage: "zh-CN",
    },
  ],
};

export default function CnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="zh-CN">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </div>
  );
}
