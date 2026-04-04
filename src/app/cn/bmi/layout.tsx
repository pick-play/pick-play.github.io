import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI计算器 - 体质量指数测量",
  description:
    "输入身高和体重，即刻计算BMI（体质量指数）。查看偏瘦、正常、超重、肥胖分类及正常体重范围。",
  keywords: [
    "BMI计算器",
    "体质量指数",
    "BMI计算",
    "肥胖度计算",
    "标准体重计算",
    "体重计算器",
    "BMI测量",
  ],
  openGraph: {
    title: "BMI计算器 - 体质量指数测量",
    description: "即刻通过身高体重计算BMI，查看分类与正常体重范围。",
    url: "https://pick-play.github.io/cn/bmi/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/bmi/",
    languages: {
      "x-default": "https://pick-play.github.io/bmi/",
      ko: "https://pick-play.github.io/bmi/",
      en: "https://pick-play.github.io/en/bmi/",
      ja: "https://pick-play.github.io/jp/bmi/",
      "zh-CN": "https://pick-play.github.io/cn/bmi/",
      es: "https://pick-play.github.io/es/bmi/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "BMI计算器",
      description:
        "在线BMI计算器，通过身高和体重即刻计算体质量指数并进行分类。",
      url: "https://pick-play.github.io/cn/bmi/",
      applicationCategory: "HealthApplication",
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
          name: "BMI计算器",
          item: "https://pick-play.github.io/cn/bmi/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "BMI是如何计算的？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "BMI（体质量指数）的计算公式为：体重（kg）除以身高（m）的平方。例如身高170cm、体重65kg时，BMI = 65 ÷ （1.7 × 1.7）= 22.5。",
          },
        },
        {
          "@type": "Question",
          name: "BMI正常范围是多少？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "根据世界卫生组织标准，BMI低于18.5为偏瘦，18.5至24.9为正常，25至29.9为超重，30及以上为肥胖。",
          },
        },
        {
          "@type": "Question",
          name: "是否支持公制和英制单位？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "支持。可通过顶部切换按钮在公制「cm/kg」和英制「ft-in/lbs」之间切换。",
          },
        },
      ],
    },
  ],
};

export default function BmiCnLayout({
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
