import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "随机分组 - 团队组建",
  description: "随机公平分组，配上紧张刺激的动画效果！适合班级、团建、聚会活动。",
  keywords: ["随机分组", "团队组建", "随机分队", "公平分组", "分组工具", "团建分组", "随机配对"],
  openGraph: {
    title: "随机分组 - 团队组建 | PickPlay",
    description: "随机公平分组，配上紧张刺激的动画效果！",
    url: "https://pick-play.github.io/cn/random-team/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - 随机分组" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/random-team/",
    languages: {
      "x-default": "https://pick-play.github.io/random-team/",
      "ko": "https://pick-play.github.io/random-team/",
      "en": "https://pick-play.github.io/en/random-team/",
      "ja": "https://pick-play.github.io/jp/random-team/",
      "zh-CN": "https://pick-play.github.io/cn/random-team/",
      "es": "https://pick-play.github.io/es/random-team/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "随机分组 - 团队组建",
      url: "https://pick-play.github.io/cn/random-team/",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description: "随机公平分组，配上紧张刺激的动画效果！",
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://pick-play.github.io/cn/" },
        { "@type": "ListItem", position: 2, name: "随机分组", item: "https://pick-play.github.io/cn/random-team/" },
      ],
    },
  ],
};

export default function RandomTeamCnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
