import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date Course - Route Recommendations",
  description:
    "200 date courses across 10 cities. Find the perfect route on our atmosphere map. Personalized date itineraries for day and night.",
  keywords: [
    "date course",
    "date ideas",
    "date route",
    "date spots",
    "romantic date",
    "couple activities",
    "date planner",
    "date recommendation",
    "where to go on a date",
  ],
  openGraph: {
    title: "Date Course - Route Recommendations",
    description:
      "200 curated date routes across 10 cities. Find your perfect vibe on our atmosphere map.",
    url: "https://pick-play.github.io/en/date-course",
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
    canonical: "https://pick-play.github.io/en/date-course",
    languages: {
      "x-default": "https://pick-play.github.io/date-course",
      "ko": "https://pick-play.github.io/date-course",
      en: "https://pick-play.github.io/en/date-course",
      ja: "https://pick-play.github.io/jp/date-course",
      "zh-CN": "https://pick-play.github.io/cn/date-course",
      es: "https://pick-play.github.io/es/date-course",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Date Course - Route Recommendations",
      url: "https://pick-play.github.io/en/date-course",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "200 date courses across 10 cities. Find the perfect route using an atmosphere map.",
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
          name: "Date Course",
          item: "https://pick-play.github.io/en/date-course",
        },
      ],
    },
  ],
};

export default function DateCourseEnLayout({
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
