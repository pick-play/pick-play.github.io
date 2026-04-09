import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "為替計算機 - リアルタイム為替レート | PickPlay",
  description:
    "USD、EUR、KRW、JPY、CNYなど20通貨のリアルタイム為替レートで即時換算。無料のオンライン為替計算機。",
  keywords: [
    "為替計算機",
    "為替レート",
    "ドル円",
    "ユーロ円",
    "ウォン円",
    "リアルタイム為替",
    "外貨換算",
    "通貨換算",
    "外為計算機",
    "為替変換",
  ],
  openGraph: {
    title: "為替計算機 - リアルタイム為替レート | PickPlay",
    description: "20通貨のリアルタイム為替レートで即時換算できる無料ツール。",
    url: "https://pick-play.github.io/jp/currency-converter/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 為替計算機",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/currency-converter/",
    languages: {
      "x-default": "https://pick-play.github.io/currency-converter/",
      ko: "https://pick-play.github.io/currency-converter/",
      en: "https://pick-play.github.io/en/currency-converter/",
      ja: "https://pick-play.github.io/jp/currency-converter/",
      "zh-CN": "https://pick-play.github.io/cn/currency-converter/",
      es: "https://pick-play.github.io/es/currency-converter/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "為替計算機",
      description: "20通貨のリアルタイム為替レートで換算する無料オンラインツール。",
      url: "https://pick-play.github.io/jp/currency-converter/",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      inLanguage: "ja",
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
          name: "為替計算機",
          item: "https://pick-play.github.io/jp/currency-converter/",
        },
      ],
    },
  ],
};

export default function CurrencyConverterJpLayout({
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
