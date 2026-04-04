import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reaction Speed Test - How Fast Are You? | PickPlay",
  description:
    "Click as soon as the screen turns green! Measure your reaction time in milliseconds and compare against the average human (215ms). Track your best score and 5-attempt average.",
  keywords: [
    "reaction speed test",
    "reaction time test",
    "reaction time",
    "click speed test",
    "reflex test",
    "how fast are your reflexes",
    "reaction game",
    "human reaction time",
  ],
  openGraph: {
    title: "Reaction Speed Test - How Fast Are You?",
    description: "Click when it turns green! Measure your reaction time and compare against the average human (215ms).",
    url: "https://pick-play.github.io/en/reaction-test/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - Reaction Speed Test",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/en/reaction-test/",
    languages: {
      "x-default": "https://pick-play.github.io/reaction-test/",
      ko: "https://pick-play.github.io/reaction-test/",
      en: "https://pick-play.github.io/en/reaction-test/",
      ja: "https://pick-play.github.io/jp/reaction-test/",
      "zh-CN": "https://pick-play.github.io/cn/reaction-test/",
      es: "https://pick-play.github.io/es/reaction-test/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Reaction Speed Test",
      url: "https://pick-play.github.io/en/reaction-test/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Click as soon as the screen turns green to measure your reaction time in milliseconds. Compare against the average human and track your best score.",
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
          name: "Reaction Speed Test",
          item: "https://pick-play.github.io/en/reaction-test/",
        },
      ],
    },
  ],
};

export default function ReactionTestEnLayout({
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
