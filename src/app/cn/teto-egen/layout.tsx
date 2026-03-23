import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "人格测试 - 性格分析",
  description: "你是Teto还是Egen？通过性格测试来了解你的真实一面。详细的性格分析报告。",
  keywords: ["人格测试", "性格测试", "Teto", "Egen", "性格分析", "心理测试", "性格类型"],
  openGraph: {
    title: "人格测试 - 性格分析 | PickPlay",
    description: "你是Teto还是Egen？通过性格测试来了解你的真实一面。",
    url: "https://pick-play.github.io/cn/teto-egen/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - 人格测试" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/teto-egen/",
    languages: {
      "x-default": "https://pick-play.github.io/teto-egen/",
      "ko": "https://pick-play.github.io/teto-egen/",
      "en": "https://pick-play.github.io/en/teto-egen/",
      "ja": "https://pick-play.github.io/jp/teto-egen/",
      "zh-CN": "https://pick-play.github.io/cn/teto-egen/",
      "es": "https://pick-play.github.io/es/teto-egen/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "人格测试 - 性格分析",
      url: "https://pick-play.github.io/cn/teto-egen/",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description: "你是Teto还是Egen？通过性格测试来了解你的真实一面。",
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://pick-play.github.io/cn/" },
        { "@type": "ListItem", position: 2, name: "人格测试", item: "https://pick-play.github.io/cn/teto-egen/" },
      ],
    },
  ],
};

export default function TetoEgenCnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
