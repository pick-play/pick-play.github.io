import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "单位换算器 - 长度、重量、温度换算",
  description:
    "快速换算长度、重量、温度、面积、体积、速度和数据单位。支持厘米换英寸、千克换磅、摄氏度换华氏度等常用换算。",
  keywords: [
    "单位换算",
    "单位换算器",
    "长度换算",
    "重量换算",
    "温度换算",
    "厘米英寸换算",
    "千克磅换算",
    "摄氏华氏换算",
  ],
  openGraph: {
    title: "单位换算器 - 长度、重量、温度换算",
    description: "快速换算厘米↔英寸、千克↔磅、摄氏度↔华氏度等各种单位。",
    url: "https://pick-play.github.io/cn/unit-converter/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/unit-converter/",
    languages: {
      "x-default": "https://pick-play.github.io/unit-converter/",
      ko: "https://pick-play.github.io/unit-converter/",
      en: "https://pick-play.github.io/en/unit-converter/",
      ja: "https://pick-play.github.io/jp/unit-converter/",
      "zh-CN": "https://pick-play.github.io/cn/unit-converter/",
      es: "https://pick-play.github.io/es/unit-converter/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "单位换算器",
      description:
        "在线实时换算长度、重量、温度、面积、体积、速度和数据容量单位。",
      url: "https://pick-play.github.io/cn/unit-converter/",
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
          name: "单位换算器",
          item: "https://pick-play.github.io/cn/unit-converter/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "如何使用单位换算器？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "选择分类标签，选择换算的起始单位和目标单位，输入数值后立即显示换算结果。",
          },
        },
        {
          "@type": "Question",
          name: "支持哪些单位类型？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "支持长度（mm、cm、m、km、in、ft、yd、mi）、重量（mg、g、kg、oz、lb、ton）、温度（°C、°F、K）、面积、体积、速度和数据容量的换算。",
          },
        },
        {
          "@type": "Question",
          name: "快捷换算按钮是什么？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "快捷换算按钮可让您一键选择最常用的换算组合，例如厘米换英寸、千克换磅、摄氏度换华氏度等。",
          },
        },
      ],
    },
  ],
};

export default function UnitConverterCnLayout({
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
