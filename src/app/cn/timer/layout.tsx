import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "计时器 & 秒表 - 在线时间测量",
  description: "免费在线计时器和秒表。倒计时、预设时间、计次功能。适合学习、运动、烹饪使用。",
  keywords: ["在线计时器", "秒表", "倒计时", "计时器应用", "时间测量", "免费计时器", "计次"],
  openGraph: {
    title: "计时器 & 秒表 - 在线时间测量 | PickPlay",
    description: "免费在线计时器和秒表。倒计时、预设时间、计次功能。",
    url: "https://pick-play.github.io/cn/timer/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - 计时器 & 秒表" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/timer/",
    languages: {
      "x-default": "https://pick-play.github.io/timer/",
      ko: "https://pick-play.github.io/timer/",
      en: "https://pick-play.github.io/en/timer/",
      ja: "https://pick-play.github.io/jp/timer/",
      "zh-CN": "https://pick-play.github.io/cn/timer/",
      es: "https://pick-play.github.io/es/timer/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "计时器 & 秒表",
      url: "https://pick-play.github.io/cn/timer/",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description: "免费在线计时器和秒表。倒计时、预设时间、计次功能。",
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://pick-play.github.io/cn/" },
        { "@type": "ListItem", position: 2, name: "计时器 & 秒表", item: "https://pick-play.github.io/cn/timer/" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "计时器和秒表有什么区别？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "计时器从设定时间倒数到零，结束时发出提示音。秒表从零开始计时，可以记录计次时间。",
          },
        },
        {
          "@type": "Question",
          name: "我听不到计时器的提示音",
          acceptedAnswer: {
            "@type": "Answer",
            text: "请确认浏览器设置中允许播放声音。本工具使用 Web Audio API，无需额外安装。",
          },
        },
        {
          "@type": "Question",
          name: "如何使用计次功能？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "秒表运行时按下"计次"按钮即可记录当前时间，方便比较多个阶段的用时。",
          },
        },
      ],
    },
  ],
};

export default function TimerCnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
