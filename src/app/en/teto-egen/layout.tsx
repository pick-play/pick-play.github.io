import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personality Type Test - Teto or Egen?",
  description:
    "Am I a Teto or an Egen? Find out your personality type with this fun and insightful test. Discover how you think and feel.",
  keywords: [
    "teto egen",
    "personality test",
    "personality type",
    "teto or egen",
    "personality quiz",
    "fun personality test",
    "personality analysis",
    "character test",
    "self-discovery quiz",
  ],
  openGraph: {
    title: "Personality Type Test - Teto or Egen?",
    description:
      "Am I a Teto or an Egen? Discover your personality type with this fun test!",
    url: "https://pick-play.github.io/en/teto-egen",
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
    canonical: "https://pick-play.github.io/en/teto-egen",
    languages: {
      "x-default": "https://pick-play.github.io/teto-egen",
      "ko": "https://pick-play.github.io/teto-egen",
      en: "https://pick-play.github.io/en/teto-egen",
      ja: "https://pick-play.github.io/jp/teto-egen",
      "zh-CN": "https://pick-play.github.io/cn/teto-egen",
      es: "https://pick-play.github.io/es/teto-egen",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Personality Type Test - Teto or Egen?",
      url: "https://pick-play.github.io/en/teto-egen",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "A personality test to determine whether you are a Teto or Egen type — understand how you think and interact.",
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
          name: "Teto or Egen Test",
          item: "https://pick-play.github.io/en/teto-egen",
        },
      ],
    },
  ],
};

export default function TetoEgenEnLayout({
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
