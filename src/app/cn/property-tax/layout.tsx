import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "房产取得税计算器 - 韩国房产税自动计算",
  description:
    "即刻计算韩国住宅、土地、商铺的取得税。包含首次购房减免及调整对象地区税率，自动计算取得税、地方教育税、农渔村特别税。",
  keywords: [
    "房产取得税计算器",
    "韩国房产税",
    "取得税计算",
    "首次购房减免",
    "调整对象地区",
    "韩国不动产税",
    "购房税计算",
  ],
  openGraph: {
    title: "房产取得税计算器 - 韩国房产税自动计算",
    description:
      "即刻计算韩国房产取得税，涵盖住宅、土地、商铺，支持首次购房减免及调整地区选项。",
    url: "https://pick-play.github.io/cn/property-tax/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/property-tax/",
    languages: {
      "x-default": "https://pick-play.github.io/property-tax/",
      ko: "https://pick-play.github.io/property-tax/",
      en: "https://pick-play.github.io/en/property-tax/",
      ja: "https://pick-play.github.io/jp/property-tax/",
      "zh-CN": "https://pick-play.github.io/cn/property-tax/",
      es: "https://pick-play.github.io/es/property-tax/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "房产取得税计算器",
      description:
        "在线韩国房产取得税计算器，支持住宅、土地、商铺，含首次购房减免及调整对象地区税率。",
      url: "https://pick-play.github.io/cn/property-tax/",
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
          name: "房产取得税计算器",
          item: "https://pick-play.github.io/cn/property-tax/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "取得税率如何确定？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "住宅方面，取得价格6亿韩元以下税率为1%，6亿至9亿为2%，9亿以上为3%。调整对象地区第2套住宅税率为8%，第3套及以上为12%。土地及商铺统一适用4%税率。",
          },
        },
        {
          "@type": "Question",
          name: "首次购房减免是什么？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "生平首次购买12亿韩元以下住宅可享受取得税50%减免，最高减免金额为200万韩元。",
          },
        },
        {
          "@type": "Question",
          name: "地方教育税和农渔村特别税是多少？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "地方教育税为取得税的10%。农渔村特别税：1套住宅「专用面积85m²以下」免税，其余房产按取得价格的0.2%征收。",
          },
        },
      ],
    },
  ],
};

export default function PropertyTaxCnLayout({
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
