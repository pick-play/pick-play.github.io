import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "不動産取得税計算機 - 韓国不動産取得税の自動計算",
  description:
    "韓国の住宅・土地・商業施設の取得税を瞬時に計算。初回購入者控除・調整対象地域の税率に対応。取得税・地方教育税・農漁村特別税を自動算出します。",
  keywords: [
    "不動産取得税計算機",
    "韓国不動産税",
    "取得税計算",
    "初回購入者控除",
    "調整対象地域",
    "韓国不動産取得税",
    "住宅取得税",
  ],
  openGraph: {
    title: "不動産取得税計算機 - 韓国不動産取得税の自動計算",
    description:
      "韓国の住宅・土地・商業施設の取得税を瞬時に計算。初回購入者控除・調整対象地域対応。",
    url: "https://pick-play.github.io/jp/property-tax/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/property-tax/",
    languages: {
      "x-default": "https://pick-play.github.io/property-tax/",
      ko: "https://pick-play.github.io/property-tax/",
      en: "https://pick-play.github.io/en/property-tax/",
      ja: "https://pick-play.github.io/jp/property-tax/",
      "zh-CN": "https://pick-play.github.io/cn/property-tax/",
      es: "https://pick-play.github.io/es/property-tax/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "不動産取得税計算機",
      description:
        "韓国の住宅・土地・商業施設の取得税をオンラインで即時計算。初回購入者控除・調整対象地域の税率に対応。",
      url: "https://pick-play.github.io/jp/property-tax/",
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
          name: "不動産取得税計算機",
          item: "https://pick-play.github.io/jp/property-tax/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "取得税率はどのように決まりますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "住宅の場合、取得価額6億ウォン以下は1%、6億〜9億ウォンは2%、9億ウォン超は3%です。調整対象地域の2戸目は8%、3戸目以上は12%が適用されます。土地・商業施設は一律4%です。",
          },
        },
        {
          "@type": "Question",
          name: "初回購入者控除とは何ですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "生涯初めて12億ウォン以下の住宅を購入する場合、取得税の50%が控除され、控除上限は200万ウォンです。",
          },
        },
        {
          "@type": "Question",
          name: "地方教育税と農漁村特別税はいくらですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "地方教育税は取得税額の10%です。農漁村特別税は1戸目住宅（専用85m²以下）は非課税、それ以外の不動産は取得価額の0.2%が課税されます。",
          },
        },
      ],
    },
  ],
};

export default function PropertyTaxJpLayout({
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
