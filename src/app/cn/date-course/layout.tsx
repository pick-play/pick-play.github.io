import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "约会路线 - 路线推荐",
  description: "10个城市200条约会路线。在氛围地图上找到完美动线，白天夜晚都有专属方案。",
  keywords: ["约会路线", "约会地点", "约会推荐", "情侣路线", "约会计划", "浪漫路线", "约会去哪"],
  openGraph: {
    title: "约会路线 - 路线推荐 | PickPlay",
    description: "10个城市200条约会路线。在氛围地图上找到完美动线。",
    url: "https://pick-play.github.io/cn/date-course/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - 约会路线" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/date-course/",
    languages: {
      "x-default": "https://pick-play.github.io/date-course/",
      "ko": "https://pick-play.github.io/date-course/",
      "en": "https://pick-play.github.io/en/date-course/",
      "ja": "https://pick-play.github.io/jp/date-course/",
      "zh-CN": "https://pick-play.github.io/cn/date-course/",
      "es": "https://pick-play.github.io/es/date-course/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "约会路线 - 路线推荐",
      url: "https://pick-play.github.io/cn/date-course/",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description: "10个城市200条约会路线。在氛围地图上找到完美动线。",
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://pick-play.github.io/cn/" },
        { "@type": "ListItem", position: 2, name: "约会路线", item: "https://pick-play.github.io/cn/date-course/" },
      ],
    },
  ],
};

export default function DateCourseCnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
