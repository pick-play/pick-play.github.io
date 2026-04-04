import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "随机数字生成器 - 无规律数字生成",
  description: "快速生成随机数字。支持彩票号码、骰子、硬币投掷及自定义范围等多种用途。",
  keywords: [
    "随机数字生成器",
    "随机数",
    "彩票号码生成",
    "骰子",
    "硬币",
    "随机数生成",
    "乱数生成器",
    "随机号码",
  ],
  openGraph: {
    title: "随机数字生成器 - 无规律数字生成",
    description: "快速生成随机数字，支持彩票、骰子、硬币及自定义范围。",
    url: "https://pick-play.github.io/cn/random-number/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/random-number/",
    languages: {
      "x-default": "https://pick-play.github.io/random-number/",
      ko: "https://pick-play.github.io/random-number/",
      en: "https://pick-play.github.io/en/random-number/",
      ja: "https://pick-play.github.io/jp/random-number/",
      "zh-CN": "https://pick-play.github.io/cn/random-number/",
      es: "https://pick-play.github.io/es/random-number/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "随机数字生成器",
      description: "快速生成随机数字，支持彩票号码、骰子、硬币投掷及自定义范围。",
      url: "https://pick-play.github.io/cn/random-number/",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      inLanguage: "zh-CN",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
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
          name: "随机数字生成器",
          item: "https://pick-play.github.io/cn/random-number/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "如何生成彩票号码？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "点击「彩票」预设，系统会自动设置1~45范围、生成6个不重复的数字。点击生成按钮即可。",
          },
        },
        {
          "@type": "Question",
          name: "可以生成不重复的数字吗？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "可以！关闭「允许重复」开关，即可在指定范围内生成不重复的数字。注意生成数量不能超过范围大小。",
          },
        },
        {
          "@type": "Question",
          name: "可以对结果排序吗？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "可以！在结果下方的排序选项中选择升序或降序。",
          },
        },
      ],
    },
  ],
};

export default function RandomNumberCnLayout({
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
