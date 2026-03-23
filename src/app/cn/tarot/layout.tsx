import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yes or No 塔罗 - 牌阵占卜",
  description: "有烦恼时问问塔罗牌！22张大阿尔卡纳为你指引方向，解答心中困惑。",
  keywords: ["塔罗牌", "塔罗占卜", "Yes or No塔罗", "在线塔罗", "塔罗预测", "大阿尔卡纳", "免费塔罗"],
  openGraph: {
    title: "Yes or No 塔罗 - 牌阵占卜 | PickPlay",
    description: "有烦恼时问问塔罗牌！22张大阿尔卡纳为你指引方向。",
    url: "https://pick-play.github.io/cn/tarot/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - 塔罗占卜" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/tarot/",
    languages: {
      "x-default": "https://pick-play.github.io/tarot/",
      "ko": "https://pick-play.github.io/tarot/",
      "en": "https://pick-play.github.io/en/tarot/",
      "ja": "https://pick-play.github.io/jp/tarot/",
      "zh-CN": "https://pick-play.github.io/cn/tarot/",
      "es": "https://pick-play.github.io/es/tarot/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Yes or No 塔罗 - 牌阵占卜",
      url: "https://pick-play.github.io/cn/tarot/",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description: "有烦恼时问问塔罗牌！22张大阿尔卡纳为你指引方向。",
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://pick-play.github.io/cn/" },
        { "@type": "ListItem", position: 2, name: "塔罗占卜", item: "https://pick-play.github.io/cn/tarot/" },
      ],
    },
  ],
};

export default function TarotCnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
