import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "理想型世界杯 - 淘汰赛",
  description: "6大类别，96位候选人！淘汰赛找到你的完美理想型。好感度、外貌、气质全面评选。",
  keywords: ["理想型世界杯", "淘汰赛", "理想型测试", "颜值淘汰赛", "爱好排名", "理想型排行"],
  openGraph: {
    title: "理想型世界杯 - 淘汰赛 | PickPlay",
    description: "6大类别，96位候选人！淘汰赛找到你的完美理想型。",
    url: "https://pick-play.github.io/cn/worldcup",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - 理想型世界杯" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/worldcup",
    languages: {
      "x-default": "https://pick-play.github.io/worldcup",
      "ko": "https://pick-play.github.io/worldcup",
      "en": "https://pick-play.github.io/en/worldcup",
      "ja": "https://pick-play.github.io/jp/worldcup",
      "zh-CN": "https://pick-play.github.io/cn/worldcup",
      "es": "https://pick-play.github.io/es/worldcup",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "理想型世界杯 - 淘汰赛",
      url: "https://pick-play.github.io/cn/worldcup",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description: "6大类别，96位候选人！淘汰赛找到你的完美理想型。",
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://pick-play.github.io/cn" },
        { "@type": "ListItem", position: 2, name: "理想型世界杯", item: "https://pick-play.github.io/cn/worldcup" },
      ],
    },
  ],
};

export default function WorldcupCnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
