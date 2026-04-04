import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Number Generator - Pick Random Numbers",
  description:
    "Generate random numbers instantly. Perfect for lotteries, dice rolls, coin flips, and any range you need.",
  keywords: [
    "random number generator",
    "random number",
    "lottery number generator",
    "dice roller",
    "random picker",
    "number randomizer",
    "random number tool",
  ],
  openGraph: {
    title: "Random Number Generator - Pick Random Numbers",
    description: "Generate random numbers instantly with lotto, dice, and custom range presets.",
    url: "https://pick-play.github.io/en/random-number/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/en/random-number/",
    languages: {
      "x-default": "https://pick-play.github.io/random-number/",
      ko: "https://pick-play.github.io/random-number/",
      en: "https://pick-play.github.io/en/random-number/",
      ja: "https://pick-play.github.io/jp/random-number/",
      "zh-CN": "https://pick-play.github.io/cn/random-number/",
      es: "https://pick-play.github.io/es/random-number/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Random Number Generator",
      description: "Generate random numbers instantly. Supports lotto, dice, coin flip, and custom ranges.",
      url: "https://pick-play.github.io/en/random-number/",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      inLanguage: "en",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
          name: "Random Number Generator",
          item: "https://pick-play.github.io/en/random-number/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I generate lottery numbers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Click the 'Lotto' preset to automatically set the range to 1–45 with 6 unique numbers. Then press Generate.",
          },
        },
        {
          "@type": "Question",
          name: "Can I generate numbers without duplicates?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Turn off the 'Allow Duplicates' toggle to pick unique numbers. The count must not exceed the range size (max - min + 1).",
          },
        },
        {
          "@type": "Question",
          name: "Can I sort the results?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Use the sort options below the results to arrange numbers in ascending or descending order.",
          },
        },
      ],
    },
  ],
};

export default function RandomNumberEnLayout({
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
