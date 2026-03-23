import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MBTI性格测试 - 20题测你的MBTI",
  description: "20道题了解你的MBTI性格类型和配对匹配度。16种人格类型全面解析，完全免费。",
  keywords: ["MBTI测试", "MBTI性格", "性格测试", "MBTI类型", "MBTI免费", "16型人格", "心理测试"],
  openGraph: {
    title: "MBTI性格测试 - 20题测你的MBTI | PickPlay",
    description: "20道题了解你的MBTI性格类型和配对匹配度。16种人格类型全面解析。",
    url: "https://pick-play.github.io/cn/mbti/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - MBTI测试" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/mbti/",
    languages: {
      "x-default": "https://pick-play.github.io/mbti/",
      "ko": "https://pick-play.github.io/mbti/",
      "en": "https://pick-play.github.io/en/mbti/",
      "ja": "https://pick-play.github.io/jp/mbti/",
      "zh-CN": "https://pick-play.github.io/cn/mbti/",
      "es": "https://pick-play.github.io/es/mbti/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "MBTI性格测试 - 20题测你的MBTI",
      url: "https://pick-play.github.io/cn/mbti/",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description: "20道题了解你的MBTI性格类型和配对匹配度。",
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://pick-play.github.io/cn/" },
        { "@type": "ListItem", position: 2, name: "MBTI测试", item: "https://pick-play.github.io/cn/mbti/" },
      ],
    },
  ],
};

export default function MbtiCnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
