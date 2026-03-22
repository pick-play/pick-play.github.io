import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "デートコース - ルート提案",
  description:
    "韓国10都市、200種類のデートコース。雰囲気マップで完璧な動線を。カフェ、グルメ、夜景、アウトドアなど気分に合わせて提案。",
  keywords: [
    "デートコース",
    "デートスポット",
    "デートプラン",
    "デート提案",
    "カップル",
    "デートルート",
    "週末デート",
    "デートアイデア",
    "デート場所",
    "韓国デート",
  ],
  openGraph: {
    title: "デートコース - ルート提案 | PickPlay",
    description:
      "韓国10都市、200種類のデートコース。雰囲気マップで完璧な動線を。",
    url: "https://pick-play.github.io/jp/date-course",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - デートコース提案",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/date-course",
    languages: {
      "x-default": "https://pick-play.github.io/date-course",
      "ko": "https://pick-play.github.io/date-course",
      en: "https://pick-play.github.io/en/date-course",
      ja: "https://pick-play.github.io/jp/date-course",
      "zh-CN": "https://pick-play.github.io/cn/date-course",
      es: "https://pick-play.github.io/es/date-course",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "デートコース - ルート提案",
      url: "https://pick-play.github.io/jp/date-course",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description: "韓国10都市、200種類のデートコース。雰囲気マップで完璧な動線を。",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "ホーム",
          item: "https://pick-play.github.io/jp",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "デートコース",
          item: "https://pick-play.github.io/jp/date-course",
        },
      ],
    },
  ],
};

export default function DateCourseJpLayout({
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
