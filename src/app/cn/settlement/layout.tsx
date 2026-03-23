import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AA算账 - 公平分摊计算器",
  description: "复杂的AA也轻松搞定。支持项目排除、差额分摊、最小转账次数计算。聚餐、旅行账单一键搞定！",
  keywords: ["AA算账", "分摊计算", "聚餐分账", "账单分摊", "费用分摊", "AA制计算器", "转账计算"],
  openGraph: {
    title: "AA算账 - 公平分摊计算器 | PickPlay",
    description: "复杂的AA也轻松搞定。支持项目排除、差额分摊、最小转账次数。",
    url: "https://pick-play.github.io/cn/settlement/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - AA算账" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/settlement/",
    languages: {
      "x-default": "https://pick-play.github.io/settlement/",
      "ko": "https://pick-play.github.io/settlement/",
      "en": "https://pick-play.github.io/en/settlement/",
      "ja": "https://pick-play.github.io/jp/settlement/",
      "zh-CN": "https://pick-play.github.io/cn/settlement/",
      "es": "https://pick-play.github.io/es/settlement/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "AA算账 - 公平分摊计算器",
      url: "https://pick-play.github.io/cn/settlement/",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description: "复杂的AA也轻松搞定。支持项目排除、差额分摊、最小转账次数。",
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://pick-play.github.io/cn/" },
        { "@type": "ListItem", position: 2, name: "AA算账", item: "https://pick-play.github.io/cn/settlement/" },
      ],
    },
  ],
};

export default function SettlementCnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
