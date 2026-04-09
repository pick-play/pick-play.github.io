import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "贷款利息计算器 - 还款方式对比 | PickPlay",
  description:
    "输入贷款金额、年利率和期限，立即计算等额还款、等本还款和到期一次性还款的月还款额与总利息，并查看详细还款计划表。",
  keywords: [
    "贷款计算器",
    "房贷计算",
    "等额还款计算",
    "等本还款计算",
    "月供计算器",
    "利息计算器",
    "还款计划表",
    "贷款利率计算",
  ],
  openGraph: {
    title: "贷款利息计算器 - 还款方式对比 | PickPlay",
    description: "一键对比等额还款、等本还款和到期一次性还款的月供与总利息。",
    url: "https://pick-play.github.io/cn/loan-calculator/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 贷款利息计算器",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/loan-calculator/",
    languages: {
      "x-default": "https://pick-play.github.io/loan-calculator/",
      ko: "https://pick-play.github.io/loan-calculator/",
      en: "https://pick-play.github.io/en/loan-calculator/",
      ja: "https://pick-play.github.io/jp/loan-calculator/",
      "zh-CN": "https://pick-play.github.io/cn/loan-calculator/",
      es: "https://pick-play.github.io/es/loan-calculator/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "贷款利息计算器",
      description: "计算等额还款、等本还款与到期一次性还款的月供和总利息的免费在线工具",
      url: "https://pick-play.github.io/cn/loan-calculator/",
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
          name: "贷款利息计算器",
          item: "https://pick-play.github.io/cn/loan-calculator/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "等额还款是什么？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "等额还款是每月偿还相同金额「本金＋利息」的还款方式。初期利息占比较高，后期本金占比逐渐增大。是房贷中最常见的还款方式。",
          },
        },
        {
          "@type": "Question",
          name: "等本还款和等额还款有什么区别？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "等本还款每月偿还相同的本金，利息随余额减少而降低，总利息低于等额还款。但初期月还款额较高，还款压力较大。",
          },
        },
        {
          "@type": "Question",
          name: "到期一次性还款适合什么情况？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "到期一次性还款是每月只还利息，到期时一次性偿还全部本金的方式。适合短期借款或有大额资金安排的情况，但总利息负担最重。",
          },
        },
      ],
    },
  ],
};

export default function LoanCalculatorCnLayout({
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
