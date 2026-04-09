import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Currency Converter - Live Exchange Rates | PickPlay",
  description:
    "Convert between 20 currencies including USD, EUR, KRW, JPY, CNY and GBP with real-time exchange rates. Free online currency converter with instant results.",
  keywords: [
    "currency converter",
    "exchange rate",
    "USD to KRW",
    "EUR to KRW",
    "JPY to KRW",
    "live exchange rates",
    "foreign exchange",
    "money converter",
    "forex calculator",
    "currency exchange",
  ],
  openGraph: {
    title: "Currency Converter - Live Exchange Rates | PickPlay",
    description:
      "Instantly convert between 20 currencies with real-time exchange rates.",
    url: "https://pick-play.github.io/en/currency-converter/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - Currency Converter",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/en/currency-converter/",
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
      name: "Currency Converter",
      description:
        "Convert between 20 currencies with real-time exchange rates. Free online currency converter.",
      url: "https://pick-play.github.io/en/currency-converter/",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://pick-play.github.io/en/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Currency Converter",
          item: "https://pick-play.github.io/en/currency-converter/",
        },
      ],
    },
  ],
};

export default function CurrencyConverterEnLayout({
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
