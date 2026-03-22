import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "昵称生成器 - 随机名字",
  description: "6种风格的随机昵称生成。可爱、酷炫、搞笑等多种风格，一键生成独特昵称。",
  keywords: ["昵称生成器", "随机昵称", "游戏名字", "网名生成", "随机名字", "起名工具", "创意昵称"],
  openGraph: {
    title: "昵称生成器 - 随机名字 | PickPlay",
    description: "6种风格的随机昵称生成。可爱、酷炫、搞笑等多种风格。",
    url: "https://pick-play.github.io/cn/nickname",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - 昵称生成器" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/nickname",
    languages: {
      "x-default": "https://pick-play.github.io/nickname",
      "ko": "https://pick-play.github.io/nickname",
      "en": "https://pick-play.github.io/en/nickname",
      "ja": "https://pick-play.github.io/jp/nickname",
      "zh-CN": "https://pick-play.github.io/cn/nickname",
      "es": "https://pick-play.github.io/es/nickname",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "昵称生成器 - 随机名字",
      url: "https://pick-play.github.io/cn/nickname",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description: "6种风格的随机昵称生成。可爱、酷炫、搞笑等多种风格。",
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://pick-play.github.io/cn" },
        { "@type": "ListItem", position: 2, name: "昵称生成器", item: "https://pick-play.github.io/cn/nickname" },
      ],
    },
  ],
};

export default function NicknameCnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
