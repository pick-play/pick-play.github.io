import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "情侣匹配 - 姓名配对",
  description: "通过名字测试你们的默契！5维度全面分析，了解两人之间的缘分与契合度。",
  keywords: ["情侣匹配", "姓名配对", "缘分测试", "情侣测试", "爱情配对", "名字测运势", "情侣契合度"],
  openGraph: {
    title: "情侣匹配 - 姓名配对 | PickPlay",
    description: "通过名字测试你们的默契！5维度全面分析。",
    url: "https://pick-play.github.io/cn/couple-test",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - 情侣匹配" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/couple-test",
    languages: {
      "x-default": "https://pick-play.github.io/couple-test",
      "ko": "https://pick-play.github.io/couple-test",
      "en": "https://pick-play.github.io/en/couple-test",
      "ja": "https://pick-play.github.io/jp/couple-test",
      "zh-CN": "https://pick-play.github.io/cn/couple-test",
      "es": "https://pick-play.github.io/es/couple-test",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "情侣匹配 - 姓名配对",
      url: "https://pick-play.github.io/cn/couple-test",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description: "通过名字测试你们的默契！5维度全面分析。",
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://pick-play.github.io/cn" },
        { "@type": "ListItem", position: 2, name: "情侣匹配", item: "https://pick-play.github.io/cn/couple-test" },
      ],
    },
  ],
};

export default function CoupleTestCnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
