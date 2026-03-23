import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MBTI診断 - 20問で分かる性格タイプ",
  description:
    "20問であなたのMBTI性格タイプと相性を診断。INFP、ENFJ、INTJなど16タイプの詳細な分析。",
  keywords: [
    "MBTI",
    "MBTI診断",
    "MBTI性格",
    "性格タイプ",
    "16タイプ",
    "INFP",
    "ENFJ",
    "INTJ",
    "MBTI相性",
    "心理テスト",
    "性格診断",
    "自己分析",
  ],
  openGraph: {
    title: "MBTI診断 - 20問で分かる性格タイプ | PickPlay",
    description:
      "20問であなたのMBTI性格タイプと相性を診断。16タイプの詳細分析。",
    url: "https://pick-play.github.io/jp/mbti/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - MBTI診断",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/mbti/",
    languages: {
      "x-default": "https://pick-play.github.io/mbti/",
      "ko": "https://pick-play.github.io/mbti/",
      en: "https://pick-play.github.io/en/mbti/",
      ja: "https://pick-play.github.io/jp/mbti/",
      "zh-CN": "https://pick-play.github.io/cn/mbti/",
      es: "https://pick-play.github.io/es/mbti/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "MBTI診断 - 20問で分かる性格タイプ",
      url: "https://pick-play.github.io/jp/mbti/",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description: "20問であなたのMBTI性格タイプと相性を診断。",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "ホーム",
          item: "https://pick-play.github.io/jp/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "MBTI診断",
          item: "https://pick-play.github.io/jp/mbti/",
        },
      ],
    },
  ],
};

export default function MbtiJpLayout({
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
