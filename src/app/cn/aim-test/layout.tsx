import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "瞄准训练器 - 鼠标精度测试 | PickPlay",
  description:
    "通过30秒瞄准训练器测试和训练你的鼠标精度与反应速度。三种难度等级，提供命中率和平均反应时间统计。",
  keywords: [
    "瞄准训练器",
    "瞄准测试",
    "鼠标精度",
    "反应速度测试",
    "点击训练",
    "FPS瞄准练习",
    "鼠标训练",
    "提高瞄准",
    "点击精度",
  ],
  openGraph: {
    title: "瞄准训练器 - 鼠标精度测试",
    description:
      "「30秒瞄准训练器」测试你的鼠标精度和反应速度。三种难度等级，详细统计数据。",
    url: "https://pick-play.github.io/cn/aim-test/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 瞄准训练器",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/aim-test/",
    languages: {
      "x-default": "https://pick-play.github.io/aim-test/",
      ko: "https://pick-play.github.io/aim-test/",
      en: "https://pick-play.github.io/en/aim-test/",
      ja: "https://pick-play.github.io/jp/aim-test/",
      "zh-CN": "https://pick-play.github.io/cn/aim-test/",
      es: "https://pick-play.github.io/es/aim-test/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "瞄准训练器 - 鼠标精度测试",
      url: "https://pick-play.github.io/cn/aim-test/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description:
        "30秒瞄准训练器，测试鼠标精度与反应速度。三种难度等级，提供命中率和平均反应时间统计数据。",
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
          name: "瞄准训练器",
          item: "https://pick-play.github.io/cn/aim-test/",
        },
      ],
    },
  ],
};

export default function AimTestCnLayout({
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
