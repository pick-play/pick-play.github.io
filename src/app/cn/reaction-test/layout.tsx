import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "反应速度测试 - 你的反应有多快？ | PickPlay",
  description:
    "变绿后立刻点击！以毫秒为单位测量你的反应速度，并与平均人类（215ms）进行比较。查看最佳成绩和最近5次平均值。",
  keywords: [
    "反应速度测试",
    "反应时间测试",
    "反应测试",
    "点击速度",
    "反射神经测试",
    "反应速度游戏",
    "人类反应时间",
  ],
  openGraph: {
    title: "反应速度测试 | PickPlay",
    description: "变绿后立刻点击！测量你的反应速度并与平均人类（215ms）比较。",
    url: "https://pick-play.github.io/cn/reaction-test/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 反应速度测试",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/reaction-test/",
    languages: {
      "x-default": "https://pick-play.github.io/reaction-test/",
      ko: "https://pick-play.github.io/reaction-test/",
      en: "https://pick-play.github.io/en/reaction-test/",
      ja: "https://pick-play.github.io/jp/reaction-test/",
      "zh-CN": "https://pick-play.github.io/cn/reaction-test/",
      es: "https://pick-play.github.io/es/reaction-test/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "反应速度测试",
      url: "https://pick-play.github.io/cn/reaction-test/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description:
        "当屏幕变绿时立即点击，以毫秒为单位测量你的反应速度。与平均人类比较并刷新最佳成绩。",
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
          name: "反应速度测试",
          item: "https://pick-play.github.io/cn/reaction-test/",
        },
      ],
    },
  ],
};

export default function ReactionTestCnLayout({
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
