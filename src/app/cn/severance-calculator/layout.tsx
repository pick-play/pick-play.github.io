import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "退职金计算器 - 韩国退职金自动计算与税额估算 | PickPlay",
  description:
    "输入入职日期、离职日期和月薪，自动计算韩国退职金及退职所得税估算。快速查看工作年限、日均工资和实收退职金。",
  keywords: [
    "退职金计算器",
    "韩国退职金",
    "退职金计算",
    "退职所得税",
    "工作年限计算",
    "日均工资",
    "实收退职金",
    "韩国劳动法",
    "退职金多少",
  ],
  openGraph: {
    title: "退职金计算器 - 韩国退职金自动计算 | PickPlay",
    description: "输入入职日期、离职日期和月薪，一键计算韩国退职金和税额。",
    url: "https://pick-play.github.io/cn/severance-calculator/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 退职金计算器",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/severance-calculator/",
    languages: {
      "x-default": "https://pick-play.github.io/severance-calculator/",
      ko: "https://pick-play.github.io/severance-calculator/",
      en: "https://pick-play.github.io/en/severance-calculator/",
      ja: "https://pick-play.github.io/jp/severance-calculator/",
      "zh-CN": "https://pick-play.github.io/cn/severance-calculator/",
      es: "https://pick-play.github.io/es/severance-calculator/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "退职金计算器",
      description: "自动计算韩国退职金及退职所得税的免费在线工具",
      url: "https://pick-play.github.io/cn/severance-calculator/",
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
          name: "退职金计算器",
          item: "https://pick-play.github.io/cn/severance-calculator/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "退职金何时支付？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "根据韩国劳动基准法，退职金须在离职日起14天内支付。双方协商一致可延期支付。",
          },
        },
        {
          "@type": "Question",
          name: "韩国退职金的计算公式是什么？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "退职金 = 日均工资 × 30天 × 工作年数。日均工资 = 最近3个月工资总额 ÷ 最近3个月总天数。",
          },
        },
      ],
    },
  ],
};

export default function SeveranceCalculatorCnLayout({
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
