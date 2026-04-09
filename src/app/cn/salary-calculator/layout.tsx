import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "年薪实得工资计算器 - 「四大保险」税金计算",
  description:
    "即时计算韩国年薪实得工资。自动计算「国民年金」「健康保险」「长期护理保险」「就业保险」所得税及「地方所得税」，显示月实得及年实得工资。",
  keywords: [
    "年薪实得工资计算器",
    "韩国工资计算",
    "实得工资计算",
    "「所得税计算」",
    "「国民年金计算」",
    "「四大保险计算」",
    "2024年薪计算",
  ],
  openGraph: {
    title: "年薪实得工资计算器 - 「四大保险」税金计算",
    description:
      "输入年薪即可自动计算韩国「四大保险」和税金，立即查看月实得及年实得工资。",
    url: "https://pick-play.github.io/cn/salary-calculator/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/salary-calculator/",
    languages: {
      "x-default": "https://pick-play.github.io/salary-calculator/",
      ko: "https://pick-play.github.io/salary-calculator/",
      en: "https://pick-play.github.io/en/salary-calculator/",
      ja: "https://pick-play.github.io/jp/salary-calculator/",
      "zh-CN": "https://pick-play.github.io/cn/salary-calculator/",
      es: "https://pick-play.github.io/es/salary-calculator/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "年薪实得工资计算器",
      description:
        "输入年薪自动计算「国民年金」「健康保险」「长期护理保险」「就业保险」所得税及「地方所得税」，显示月实得及年实得工资的在线计算器。",
      url: "https://pick-play.github.io/cn/salary-calculator/",
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
          name: "年薪实得工资计算器",
          item: "https://pick-play.github.io/cn/salary-calculator/",
        },
      ],
    },
  ],
};

export default function SalaryCalculatorCnLayout({
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
