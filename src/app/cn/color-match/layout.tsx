import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "颜色匹配游戏 - 斯特鲁普测试 | PickPlay",
  description:
    "基于斯特鲁普测试的颜色匹配游戏！当文字颜色与含义不同时，你能快速识别吗？测试你的专注力和反应速度。30秒计时，3种难度级别。",
  keywords: [
    "颜色匹配游戏",
    "斯特鲁普测试",
    "专注力游戏",
    "颜色游戏",
    "反应速度测试",
    "认知游戏",
    "大脑训练",
    "颜色测验",
    "斯特鲁普效应",
    "注意力测试",
  ],
  openGraph: {
    title: "颜色匹配游戏 - 斯特鲁普测试",
    description: "「颜色名称用不同颜色书写时，你先识别哪个？专注力测试！」",
    url: "https://pick-play.github.io/cn/color-match/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 颜色匹配斯特鲁普测试",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/color-match/",
    languages: {
      "x-default": "https://pick-play.github.io/color-match/",
      ko: "https://pick-play.github.io/color-match/",
      en: "https://pick-play.github.io/en/color-match/",
      ja: "https://pick-play.github.io/jp/color-match/",
      "zh-CN": "https://pick-play.github.io/cn/color-match/",
      es: "https://pick-play.github.io/es/color-match/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "颜色匹配游戏 - 斯特鲁普测试",
      url: "https://pick-play.github.io/cn/color-match/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description:
        "基于斯特鲁普测试的颜色匹配游戏。两种模式：匹配字体颜色或匹配单词含义。三种难度级别测试专注力。",
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
          name: "颜色匹配游戏",
          item: "https://pick-play.github.io/cn/color-match/",
        },
      ],
    },
  ],
};

export default function ColorMatchCnLayout({
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
