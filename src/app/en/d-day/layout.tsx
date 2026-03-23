import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "D-Day Calculator - Countdown Timer",
  description:
    "Track important dates at a glance. Count down to exams, birthdays, anniversaries, and any special event with our D-Day calculator.",
  keywords: [
    "d-day calculator",
    "countdown timer",
    "days until",
    "date countdown",
    "event countdown",
    "anniversary countdown",
    "exam countdown",
    "birthday countdown",
    "days remaining",
  ],
  openGraph: {
    title: "D-Day Calculator - Countdown Timer",
    description:
      "Count down to your most important dates. Exams, birthdays, anniversaries — all at a glance.",
    url: "https://pick-play.github.io/en/d-day/",
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
    canonical: "https://pick-play.github.io/en/d-day/",
    languages: {
      "x-default": "https://pick-play.github.io/d-day/",
      "ko": "https://pick-play.github.io/d-day/",
      en: "https://pick-play.github.io/en/d-day/",
      ja: "https://pick-play.github.io/jp/d-day/",
      "zh-CN": "https://pick-play.github.io/cn/d-day/",
      es: "https://pick-play.github.io/es/d-day/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "D-Day Calculator - Countdown Timer",
      url: "https://pick-play.github.io/en/d-day/",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Track how many days remain until your important events — exams, birthdays, anniversaries, and more.",
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
          name: "D-Day Calculator",
          item: "https://pick-play.github.io/en/d-day/",
        },
      ],
    },
  ],
};

export default function DDayEnLayout({
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
