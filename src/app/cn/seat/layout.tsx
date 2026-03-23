import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "座位安排 - 随机分配",
  description: "教室、会议室座位随机分配，整齐高效。支持自定义行列，一键生成座位图。",
  keywords: ["座位安排", "随机座位", "座位分配", "座位表", "教室座位", "会议室座位", "随机分配座位"],
  openGraph: {
    title: "座位安排 - 随机分配 | PickPlay",
    description: "教室、会议室座位随机分配，整齐高效。",
    url: "https://pick-play.github.io/cn/seat/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - 座位安排" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/seat/",
    languages: {
      "x-default": "https://pick-play.github.io/seat/",
      "ko": "https://pick-play.github.io/seat/",
      "en": "https://pick-play.github.io/en/seat/",
      "ja": "https://pick-play.github.io/jp/seat/",
      "zh-CN": "https://pick-play.github.io/cn/seat/",
      "es": "https://pick-play.github.io/es/seat/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "座位安排 - 随机分配",
      url: "https://pick-play.github.io/cn/seat/",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description: "教室、会议室座位随机分配，整齐高效。",
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://pick-play.github.io/cn/" },
        { "@type": "ListItem", position: 2, name: "座位安排", item: "https://pick-play.github.io/cn/seat/" },
      ],
    },
  ],
};

export default function SeatCnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
