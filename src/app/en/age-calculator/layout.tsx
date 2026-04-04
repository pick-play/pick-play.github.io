import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Calculator - Years, Zodiac & Birthday Countdown | PickPlay",
  description:
    "Enter your date of birth to instantly calculate your exact age, Western zodiac sign, Chinese zodiac, generation label, and days until your next birthday.",
  keywords: [
    "age calculator",
    "how old am i",
    "birthday countdown",
    "zodiac sign calculator",
    "chinese zodiac calculator",
    "days lived calculator",
    "birthday d-day",
    "exact age",
    "generation calculator",
  ],
  openGraph: {
    title: "Age Calculator - Years, Zodiac & Birthday Countdown | PickPlay",
    description:
      "Calculate your exact age, zodiac sign, Chinese zodiac, and days until your next birthday.",
    url: "https://pick-play.github.io/en/age-calculator/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - Age Calculator",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/en/age-calculator/",
    languages: {
      "x-default": "https://pick-play.github.io/age-calculator/",
      ko: "https://pick-play.github.io/age-calculator/",
      en: "https://pick-play.github.io/en/age-calculator/",
      ja: "https://pick-play.github.io/jp/age-calculator/",
      "zh-CN": "https://pick-play.github.io/cn/age-calculator/",
      es: "https://pick-play.github.io/es/age-calculator/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Age Calculator",
      description:
        "Calculate your exact age, Western zodiac, Chinese zodiac, generation, and birthday countdown.",
      url: "https://pick-play.github.io/en/age-calculator/",
      applicationCategory: "UtilityApplication",
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
          name: "Age Calculator",
          item: "https://pick-play.github.io/en/age-calculator/",
        },
      ],
    },
  ],
};

export default function AgeCalculatorEnLayout({
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
