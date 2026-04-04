import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "字数统计 - 实时字符与单词计数器",
  description:
    "实时统计字符数、单词数、句子数、段落数和字节数。支持关键词密度分析和预计阅读时间。",
  keywords: [
    "字数统计",
    "字符计数",
    "单词计数",
    "字节计算",
    "文字统计工具",
    "在线字数统计",
    "文本计数器",
  ],
  openGraph: {
    title: "字数统计 - 实时字符与单词计数器",
    description: "实时统计字符数、单词数、字节数，并提供关键词密度和阅读时间分析。",
    url: "https://pick-play.github.io/cn/text-counter/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/text-counter/",
    languages: {
      "x-default": "https://pick-play.github.io/text-counter/",
      ko: "https://pick-play.github.io/text-counter/",
      en: "https://pick-play.github.io/en/text-counter/",
      ja: "https://pick-play.github.io/jp/text-counter/",
      "zh-CN": "https://pick-play.github.io/cn/text-counter/",
      es: "https://pick-play.github.io/es/text-counter/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "字数统计",
      description:
        "实时统计字符数、单词数、句子数、段落数和字节数的在线文本计数器。",
      url: "https://pick-play.github.io/cn/text-counter/",
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
          name: "字数统计",
          item: "https://pick-play.github.io/cn/text-counter/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "如何使用字数统计工具？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "将文字粘贴或直接输入到文本框中，字符数、单词数、句子数、段落数和字节数将会实时自动统计。",
          },
        },
        {
          "@type": "Question",
          name: "含空格和不含空格的字符数有什么区别？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "含空格字符数包括空格、制表符和换行符在内的所有字符总数；不含空格字符数则是去除所有空白字符后的纯字符数。",
          },
        },
        {
          "@type": "Question",
          name: "字节数是如何计算的？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "字节数按UTF-8编码计算。英文字母和数字占1字节，汉字等CJK字符占3字节，因此中文文本的字节数通常远多于字符数。",
          },
        },
      ],
    },
  ],
};

export default function TextCounterCnLayout({
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
