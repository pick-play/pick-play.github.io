import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Picker - Random Groups",
  description:
    "Randomly divide into fair teams with exciting animations! Great for sports, games, classrooms, and any group activity.",
  keywords: [
    "team picker",
    "random teams",
    "team generator",
    "group divider",
    "random group maker",
    "team randomizer",
    "split into teams",
    "fair team selection",
    "random team builder",
  ],
  openGraph: {
    title: "Team Picker - Random Group Divider",
    description:
      "Randomly divide into fair teams with suspenseful animations! Perfect for any group activity.",
    url: "https://pick-play.github.io/en/random-team",
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
    canonical: "https://pick-play.github.io/en/random-team",
    languages: {
      "x-default": "https://pick-play.github.io/random-team",
      "ko": "https://pick-play.github.io/random-team",
      en: "https://pick-play.github.io/en/random-team",
      ja: "https://pick-play.github.io/jp/random-team",
      "zh-CN": "https://pick-play.github.io/cn/random-team",
      es: "https://pick-play.github.io/es/random-team",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Team Picker - Random Groups",
      url: "https://pick-play.github.io/en/random-team",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Randomly and fairly divide people into teams with exciting reveal animations.",
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
          name: "Team Picker",
          item: "https://pick-play.github.io/en/random-team",
        },
      ],
    },
  ],
};

export default function RandomTeamEnLayout({
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
