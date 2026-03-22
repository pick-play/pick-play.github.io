import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ideal Type World Cup - Tournament",
  description:
    "6 categories, 96 candidates! Find your ideal type through a thrilling tournament bracket. Who will be your ultimate pick?",
  keywords: [
    "ideal type world cup",
    "tournament bracket",
    "favorite picker",
    "elimination tournament",
    "who would you rather",
    "preference tournament",
    "world cup game",
    "party tournament",
    "celebrity world cup",
  ],
  openGraph: {
    title: "Ideal Type World Cup - 96-Candidate Tournament",
    description:
      "6 categories, 96 candidates! Battle it out in a bracket tournament to find your ideal type.",
    url: "https://pick-play.github.io/en/worldcup",
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
    canonical: "https://pick-play.github.io/en/worldcup",
    languages: {
      "x-default": "https://pick-play.github.io/worldcup",
      "ko": "https://pick-play.github.io/worldcup",
      en: "https://pick-play.github.io/en/worldcup",
      ja: "https://pick-play.github.io/jp/worldcup",
      "zh-CN": "https://pick-play.github.io/cn/worldcup",
      es: "https://pick-play.github.io/es/worldcup",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Ideal Type World Cup - Tournament",
      url: "https://pick-play.github.io/en/worldcup",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "An elimination tournament game with 6 categories and 96 candidates to find your ideal type.",
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
          name: "Ideal Type World Cup",
          item: "https://pick-play.github.io/en/worldcup",
        },
      ],
    },
  ],
};

export default function WorldcupEnLayout({
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
