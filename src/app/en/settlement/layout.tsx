import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bill Splitter - Fair Cost Calculator",
  description:
    "Split bills easily with custom item exclusions, differential splitting, and minimum transfer optimization. Perfect for group dinners, trips, and shared expenses.",
  keywords: [
    "bill splitter",
    "split bill",
    "dutch pay",
    "group expense",
    "cost calculator",
    "fair split",
    "expense sharing",
    "dinner bill split",
    "travel expense split",
  ],
  openGraph: {
    title: "Bill Splitter - Fair Cost Calculator",
    description:
      "Split group expenses fairly with item exclusions, differential shares, and minimum transfer optimization.",
    url: "https://pick-play.github.io/en/settlement",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - Fun lifestyle tools",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/en/settlement",
    languages: {
      "x-default": "https://pick-play.github.io/settlement",
      "ko": "https://pick-play.github.io/settlement",
      en: "https://pick-play.github.io/en/settlement",
      ja: "https://pick-play.github.io/jp/settlement",
      "zh-CN": "https://pick-play.github.io/cn/settlement",
      es: "https://pick-play.github.io/es/settlement",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Bill Splitter - Fair Cost Calculator",
      url: "https://pick-play.github.io/en/settlement",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Split group bills fairly with custom exclusions, differential splitting, and minimum transfer calculation.",
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://pick-play.github.io/en",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Bill Splitter",
          item: "https://pick-play.github.io/en/settlement",
        },
      ],
    },
  ],
};

export default function SettlementEnLayout({
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
