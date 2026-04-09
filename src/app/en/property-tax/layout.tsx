import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Acquisition Tax Calculator - Korean Real Estate Tax",
  description:
    "Instantly calculate Korean property acquisition tax (취득세) for houses, land, and commercial properties. Includes first-time buyer reduction and regulated area rates.",
  keywords: [
    "property acquisition tax calculator",
    "Korean real estate tax",
    "취득세 calculator",
    "first-time buyer reduction",
    "Korean property tax",
    "real estate transfer tax Korea",
    "housing tax Korea",
  ],
  openGraph: {
    title: "Property Acquisition Tax Calculator - Korean Real Estate Tax",
    description:
      "Calculate Korean property acquisition tax instantly. Covers house, land, commercial with first-time buyer and regulated area options.",
    url: "https://pick-play.github.io/en/property-tax/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/en/property-tax/",
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
      name: "Property Acquisition Tax Calculator",
      description:
        "Online calculator for Korean property acquisition tax. Covers houses, land, and commercial properties with first-time buyer reductions and regulated area rates.",
      url: "https://pick-play.github.io/en/property-tax/",
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
          name: "Property Acquisition Tax Calculator",
          item: "https://pick-play.github.io/en/property-tax/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How is the acquisition tax rate determined?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For houses, the rate is 1% under 600M KRW, 2% for 600M–900M KRW, and 3% above 900M KRW. A second home in a regulated area is taxed at 8%, and three or more homes at 12%. Land and commercial properties are taxed at a flat 4%.",
          },
        },
        {
          "@type": "Question",
          name: "What is the first-time buyer reduction?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "First-time home buyers purchasing a property worth 1.2 billion KRW or less receive a 50% reduction on acquisition tax, capped at 2 million KRW.",
          },
        },
        {
          "@type": "Question",
          name: "How much are the local education tax and special rural tax?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The local education tax is 10% of the acquisition tax. The special rural tax is exempt for single-home buyers (under 85m²) and 0.2% of the purchase price for other properties.",
          },
        },
      ],
    },
  ],
};

export default function PropertyTaxEnLayout({
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
