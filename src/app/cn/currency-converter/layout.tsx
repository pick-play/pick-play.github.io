import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "汇率计算器 - 实时汇率换算 | PickPlay",
  description:
    "支持美元、欧元、韩元、日元、人民币等20种货币的实时汇率换算。免费在线汇率计算器，结果即时显示。",
  keywords: [
    "汇率计算器",
    "实时汇率",
    "美元换算",
    "人民币汇率",
    "欧元汇率",
    "外汇计算器",
    "货币换算",
    "汇率转换",
    "在线汇率",
    "外币换算",
  ],
  openGraph: {
    title: "汇率计算器 - 实时汇率换算 | PickPlay",
    description: "支持20种货币的实时汇率换算，免费在线工具。",
    url: "https://pick-play.github.io/cn/currency-converter/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 汇率计算器",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/currency-converter/",
    languages: {
      "x-default": "https://pick-play.github.io/currency-converter/",
      ko: "https://pick-play.github.io/currency-converter/",
      en: "https://pick-play.github.io/en/currency-converter/",
      ja: "https://pick-play.github.io/jp/currency-converter/",
      "zh-CN": "https://pick-play.github.io/cn/currency-converter/",
      es: "https://pick-play.github.io/es/currency-converter/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "汇率计算器",
      description: "支持20种货币实时汇率换算的免费在线工具。",
      url: "https://pick-play.github.io/cn/currency-converter/",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      inLanguage: "zh",
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
          name: "汇率计算器",
          item: "https://pick-play.github.io/cn/currency-converter/",
        },
      ],
    },
  ],
};

export default function CurrencyConverterCnLayout({
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
