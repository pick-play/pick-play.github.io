import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Couple Compatibility - Name Match",
  description:
    "Test your compatibility by name! 5-category analysis covering love style, communication, trust, passion, and future outlook.",
  keywords: [
    "couple compatibility",
    "name compatibility",
    "love compatibility",
    "couple test",
    "relationship test",
    "compatibility quiz",
    "love match",
    "couple quiz",
    "name match",
  ],
  openGraph: {
    title: "Couple Compatibility Test - Name Match Analysis",
    description:
      "How compatible are you? Enter two names for a 5-category compatibility analysis!",
    url: "https://pick-play.github.io/en/couple-test",
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
    canonical: "https://pick-play.github.io/en/couple-test",
    languages: {
      "x-default": "https://pick-play.github.io/couple-test",
      "ko": "https://pick-play.github.io/couple-test",
      en: "https://pick-play.github.io/en/couple-test",
      ja: "https://pick-play.github.io/jp/couple-test",
      "zh-CN": "https://pick-play.github.io/cn/couple-test",
      es: "https://pick-play.github.io/es/couple-test",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Couple Compatibility - Name Match",
      url: "https://pick-play.github.io/en/couple-test",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "A fun couple compatibility test based on names, covering 5 categories of relationship analysis.",
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
          name: "Couple Compatibility",
          item: "https://pick-play.github.io/en/couple-test",
        },
      ],
    },
  ],
};

export default function CoupleTestEnLayout({
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
