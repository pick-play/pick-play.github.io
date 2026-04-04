import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "打字速度测试 - 打字练习 | PickPlay",
  description:
    "免费在线打字速度测试。实时测量每分钟字符数和准确率。提供简单、中等、困难三个难度级别，帮助您提升打字技能。",
  keywords: [
    "打字测试",
    "打字速度",
    "每分钟字符数",
    "打字练习",
    "键盘练习",
    "准确率测试",
    "输入速度",
  ],
  openGraph: {
    title: "打字速度测试 - 打字练习 | PickPlay",
    description: "免费在线打字速度测试。实时测量每分钟字符数和准确率。",
    url: "https://pick-play.github.io/cn/typing-test/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/typing-test/",
    languages: {
      "x-default": "https://pick-play.github.io/typing-test/",
      ko: "https://pick-play.github.io/typing-test/",
      en: "https://pick-play.github.io/en/typing-test/",
      ja: "https://pick-play.github.io/jp/typing-test/",
      "zh-CN": "https://pick-play.github.io/cn/typing-test/",
      es: "https://pick-play.github.io/es/typing-test/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "打字速度测试",
      description:
        "免费在线打字速度测试。实时测量每分钟字符数和准确率。提供简单、中等、困难三个难度级别。",
      url: "https://pick-play.github.io/cn/typing-test/",
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
          name: "打字速度测试",
          item: "https://pick-play.github.io/cn/typing-test/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "速度是如何计算的？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "将输入的总字符数除以5（标准词长），再除以经过的时间（分钟）得出每分钟字数。",
          },
        },
        {
          "@type": "Question",
          name: "准确率是如何计算的？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "准确率是正确输入字符数占总输入字符数的百分比。修正错误不会减少错误计数。",
          },
        },
        {
          "@type": "Question",
          name: "最高记录保存在哪里？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "最高记录保存在浏览器的本地存储中，在同一设备上跨会话保留。",
          },
        },
      ],
    },
  ],
};

export default function TypingTestCnLayout({
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
