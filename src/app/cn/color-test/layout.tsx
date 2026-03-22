import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "颜色性格测试",
  description: "代表你的颜色是什么？10道题颜色性格测试，8种颜色揭示你的内在性格。",
  keywords: ["颜色性格测试", "颜色心理测试", "色彩性格", "颜色测试", "性格颜色", "心理测试", "颜色分析"],
  openGraph: {
    title: "颜色性格测试 | PickPlay",
    description: "代表你的颜色是什么？10道题颜色性格测试，8种颜色揭示你的内在性格。",
    url: "https://pick-play.github.io/cn/color-test",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - 颜色性格测试" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/color-test",
    languages: {
      "x-default": "https://pick-play.github.io/color-test",
      "ko": "https://pick-play.github.io/color-test",
      "en": "https://pick-play.github.io/en/color-test",
      "ja": "https://pick-play.github.io/jp/color-test",
      "zh-CN": "https://pick-play.github.io/cn/color-test",
      "es": "https://pick-play.github.io/es/color-test",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "颜色性格测试",
      url: "https://pick-play.github.io/cn/color-test",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description: "代表你的颜色是什么？10道题颜色性格测试。",
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://pick-play.github.io/cn" },
        { "@type": "ListItem", position: 2, name: "颜色性格测试", item: "https://pick-play.github.io/cn/color-test" },
      ],
    },
  ],
};

export default function ColorTestCnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
