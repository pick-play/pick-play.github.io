import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "年龄计算器 - 周岁、生肖与生日倒计时 | PickPlay",
  description:
    "输入出生日期，立即计算您的周岁、星座、生肖、所属世代以及距离下次生日的天数。还可查看您已活了多少小时和心跳次数等趣味数据。",
  keywords: [
    "年龄计算器",
    "周岁计算",
    "生日倒计时",
    "星座计算",
    "生肖计算",
    "我多少岁",
    "活了多少天",
    "下次生日",
    "世代划分",
  ],
  openGraph: {
    title: "年龄计算器 - 周岁、生肖与生日倒计时 | PickPlay",
    description: "输入出生日期，一键计算周岁、星座、生肖和生日倒计时。",
    url: "https://pick-play.github.io/cn/age-calculator/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 年龄计算器",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/age-calculator/",
    languages: {
      "x-default": "https://pick-play.github.io/age-calculator/",
      ko: "https://pick-play.github.io/age-calculator/",
      en: "https://pick-play.github.io/en/age-calculator/",
      ja: "https://pick-play.github.io/jp/age-calculator/",
      "zh-CN": "https://pick-play.github.io/cn/age-calculator/",
      es: "https://pick-play.github.io/es/age-calculator/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "年龄计算器",
      description: "计算周岁、星座、生肖与生日倒计时的免费在线工具",
      url: "https://pick-play.github.io/cn/age-calculator/",
      applicationCategory: "UtilityApplication",
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
          name: "年龄计算器",
          item: "https://pick-play.github.io/cn/age-calculator/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "周岁是如何计算的？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "周岁是从出生日期到当前日期经过的完整年数。如果今年的生日还没到，则用年份差减去1；如果已过生日，则直接用年份差。",
          },
        },
        {
          "@type": "Question",
          name: "生肖是如何确定的？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "生肖是将出生年份对应到12年循环中的12种动物之一。例如2024年是「龙」年，2025年是「蛇」年。",
          },
        },
      ],
    },
  ],
};

export default function AgeCalculatorCnLayout({
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
