import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "复利计算器 - 储蓄和投资收益计算 | PickPlay",
  description:
    "免费复利计算器。输入初始金额、每月存入金额和年利率，即时查看最终金额、总利息和逐年增长图表。包含72法则和目标金额反算功能。",
  keywords: [
    "复利计算器",
    "单利复利计算",
    "利息计算器",
    "投资收益计算",
    "储蓄计算器",
    "72法则",
    "目标金额计算",
    "年复利计算",
  ],
  openGraph: {
    title: "复利计算器 - 储蓄和投资收益计算 | PickPlay",
    description:
      "免费复利计算器。输入初始金额、每月存入和年利率，即时计算最终金额。含单利复利对比和72法则。",
    url: "https://pick-play.github.io/cn/compound-calculator/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/compound-calculator/",
    languages: {
      "x-default": "https://pick-play.github.io/compound-calculator/",
      ko: "https://pick-play.github.io/compound-calculator/",
      en: "https://pick-play.github.io/en/compound-calculator/",
      ja: "https://pick-play.github.io/jp/compound-calculator/",
      "zh-CN": "https://pick-play.github.io/cn/compound-calculator/",
      es: "https://pick-play.github.io/es/compound-calculator/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "复利计算器",
      description:
        "输入初始金额、每月存入金额、年利率和复利周期，即时计算最终金额和总利息。含逐年增长图表、72法则和目标金额反算功能。",
      url: "https://pick-play.github.io/cn/compound-calculator/",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "首页",
          item: "https://pick-play.github.io/cn/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "复利计算器",
          item: "https://pick-play.github.io/cn/compound-calculator/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "单利和复利有什么区别？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "单利只对本金计息，而复利对本金和累积利息都计息，随着时间推移资产呈指数增长。",
          },
        },
        {
          "@type": "Question",
          name: "复利周期越短越好吗？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "是的。月复利 > 季度复利 > 年复利，收益依次递减。复利周期越短，实际年利率越高。",
          },
        },
        {
          "@type": "Question",
          name: "72法则是什么？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "用72除以年利率，可以快速估算本金翻倍所需的年数。例如：年利率8%，则72÷8=9年。",
          },
        },
      ],
    },
  ],
};

export default function CompoundCalculatorCnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
