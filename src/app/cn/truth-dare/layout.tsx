import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "真心话大冒险 - 派对游戏",
  description: "392个问题和任务！按难度等级享受派对必备游戏。真心话还是大冒险？",
  keywords: ["真心话大冒险", "派对游戏", "聚会游戏", "真相或挑战", "party游戏", "朋友游戏", "聚会必备"],
  openGraph: {
    title: "真心话大冒险 - 派对游戏 | PickPlay",
    description: "392个问题和任务！按难度等级享受派对必备游戏。",
    url: "https://pick-play.github.io/cn/truth-dare/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - 真心话大冒险" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/truth-dare/",
    languages: {
      "x-default": "https://pick-play.github.io/truth-dare/",
      "ko": "https://pick-play.github.io/truth-dare/",
      "en": "https://pick-play.github.io/en/truth-dare/",
      "ja": "https://pick-play.github.io/jp/truth-dare/",
      "zh-CN": "https://pick-play.github.io/cn/truth-dare/",
      "es": "https://pick-play.github.io/es/truth-dare/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "真心话大冒险 - 派对游戏",
      url: "https://pick-play.github.io/cn/truth-dare/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description: "392个问题和任务！按难度等级享受派对必备游戏。",
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://pick-play.github.io/cn/" },
        { "@type": "ListItem", position: 2, name: "真心话大冒险", item: "https://pick-play.github.io/cn/truth-dare/" },
      ],
    },
  ],
};

export default function TruthDareCnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
