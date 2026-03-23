import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seat Arranger - Random Seating",
  description:
    "Randomly assign seats for classrooms, offices, or study cafes. Fair seating arrangement with convenient presets.",
  keywords: [
    "seat arranger",
    "random seating",
    "seat assignment",
    "classroom seating",
    "office seating",
    "random seat picker",
    "seating chart",
    "seat randomizer",
  ],
  openGraph: {
    title: "Seat Arranger - Random Seating",
    description:
      "Randomly assign seats for classrooms, offices, or study cafes with handy presets.",
    url: "https://pick-play.github.io/en/seat/",
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
    canonical: "https://pick-play.github.io/en/seat/",
    languages: {
      "x-default": "https://pick-play.github.io/seat/",
      "ko": "https://pick-play.github.io/seat/",
      en: "https://pick-play.github.io/en/seat/",
      ja: "https://pick-play.github.io/jp/seat/",
      "zh-CN": "https://pick-play.github.io/cn/seat/",
      es: "https://pick-play.github.io/es/seat/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Seat Arranger - Random Seating",
      url: "https://pick-play.github.io/en/seat/",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Randomly and fairly assign seats for any space — classrooms, meeting rooms, study cafes, and more.",
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
          name: "Seat Arranger",
          item: "https://pick-play.github.io/en/seat/",
        },
      ],
    },
  ],
};

export default function SeatEnLayout({
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
