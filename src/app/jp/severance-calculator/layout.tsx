import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "退職金計算機 - 退職金自動計算・退職所得税推定 | PickPlay",
  description:
    "入社日・退職日・月給を入力するだけで韓国の退職金（퇴직금）と退職所得税の推定額を自動計算します。勤続年数・1日平均賃金・手取り退職金を一目で確認。",
  keywords: [
    "退職金計算機",
    "退職金計算",
    "韓国退職金",
    "退職所得税",
    "勤続年数計算",
    "1日平均賃金",
    "手取り退職金",
    "韓国労働法",
    "退職金いくら",
  ],
  openGraph: {
    title: "退職金計算機 - 退職金自動計算・退職所得税推定 | PickPlay",
    description: "入社日・退職日・月給から韓国退職金と退職所得税を自動計算。",
    url: "https://pick-play.github.io/jp/severance-calculator/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 退職金計算機",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/severance-calculator/",
    languages: {
      "x-default": "https://pick-play.github.io/severance-calculator/",
      ko: "https://pick-play.github.io/severance-calculator/",
      en: "https://pick-play.github.io/en/severance-calculator/",
      ja: "https://pick-play.github.io/jp/severance-calculator/",
      "zh-CN": "https://pick-play.github.io/cn/severance-calculator/",
      es: "https://pick-play.github.io/es/severance-calculator/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "退職金計算機",
      description: "韓国の退職金と退職所得税を自動計算する無料Webツール",
      url: "https://pick-play.github.io/jp/severance-calculator/",
      applicationCategory: "UtilityApplication",
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
          name: "退職金計算機",
          item: "https://pick-play.github.io/jp/severance-calculator/",
        },
      ],
    },
  ],
};

export default function SeveranceCalculatorJpLayout({
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
