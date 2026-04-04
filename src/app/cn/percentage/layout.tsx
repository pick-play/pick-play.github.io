import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "百分比计算器 - 轻松计算百分比",
  description: "免费在线百分比计算器。计算X的Y%是多少、X是Y的百分之几、变化率，还有小费计算功能。",
  keywords: ["百分比计算器", "百分率计算", "变化率计算", "小费计算器", "折扣计算", "比率计算器"],
  openGraph: {
    title: "百分比计算器 - 轻松计算百分比 | PickPlay",
    description: "免费在线百分比计算器。百分比、变化率、小费计算一站搞定。",
    url: "https://pick-play.github.io/cn/percentage/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - 百分比计算器" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/percentage/",
    languages: {
      "x-default": "https://pick-play.github.io/percentage/",
      ko: "https://pick-play.github.io/percentage/",
      en: "https://pick-play.github.io/en/percentage/",
      ja: "https://pick-play.github.io/jp/percentage/",
      "zh-CN": "https://pick-play.github.io/cn/percentage/",
      es: "https://pick-play.github.io/es/percentage/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "百分比计算器",
      url: "https://pick-play.github.io/cn/percentage/",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description: "免费在线百分比计算器。百分比、变化率、小费计算功能。",
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://pick-play.github.io/cn/" },
        { "@type": "ListItem", position: 2, name: "百分比计算器", item: "https://pick-play.github.io/cn/percentage/" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "什么是百分比？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "百分比表示以100为基础的比率。例如，200的15%等于200×0.15=30。",
          },
        },
        {
          "@type": "Question",
          name: "如何计算变化率？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "变化率(%) = 「新值 - 原值」÷ 原值 × 100。例如从100变为150：「150-100」÷100×100 = +50%。",
          },
        },
        {
          "@type": "Question",
          name: "如何使用小费计算器？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "输入账单金额和小费百分比，小费金额和总计将自动计算。",
          },
        },
      ],
    },
  ],
};

export default function PercentageCnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
