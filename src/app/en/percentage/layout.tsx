import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Percentage Calculator - Calculate Percentages Easily",
  description:
    "Free online percentage calculator. Find what Y% of X is, what percentage X is of Y, and calculate percentage change. Includes a tip calculator.",
  keywords: [
    "percentage calculator",
    "percent calculator",
    "percentage change",
    "tip calculator",
    "ratio calculator",
    "online percentage",
    "discount calculator",
  ],
  openGraph: {
    title: "Percentage Calculator - Calculate Percentages Easily",
    description: "Free online percentage calculator. Percent of, what percent, change rate, and tip calculator.",
    url: "https://pick-play.github.io/en/percentage/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/en/percentage/",
    languages: {
      "x-default": "https://pick-play.github.io/percentage/",
      ko: "https://pick-play.github.io/percentage/",
      en: "https://pick-play.github.io/en/percentage/",
      ja: "https://pick-play.github.io/jp/percentage/",
      "zh-CN": "https://pick-play.github.io/cn/percentage/",
      es: "https://pick-play.github.io/es/percentage/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Percentage Calculator",
      url: "https://pick-play.github.io/en/percentage/",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Free online percentage calculator. Percent of a number, what percent one number is of another, percentage change, and tip calculation.",
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
          name: "Percentage Calculator",
          item: "https://pick-play.github.io/en/percentage/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is a percentage?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A percentage represents a ratio out of 100. For example, 15% of 200 = 200 × 0.15 = 30.",
          },
        },
        {
          "@type": "Question",
          name: "How is percentage change calculated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "% Change = (New Value - Original Value) ÷ Original Value × 100. For example, from 100 to 150: (150-100)÷100×100 = +50%.",
          },
        },
        {
          "@type": "Question",
          name: "How do I use the tip calculator?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Enter your bill amount and the tip percentage. The tip amount and total will be calculated automatically.",
          },
        },
      ],
    },
  ],
};

export default function PercentageEnLayout({ children }: { children: React.ReactNode }) {
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
