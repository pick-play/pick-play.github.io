import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "PickPlay - What to Eat | Liar Game | Team Picker | Date Course",
    template: "%s | PickPlay",
  },
  description:
    "What should I eat? Liar game, random team picker, date course recommendations, and more. Fun decisions made easy! PickPlay",
  keywords: [
    "what to eat",
    "liar game",
    "random team picker",
    "bill splitter",
    "date course",
    "party games",
    "team divider",
    "food recommendation",
  ],
  openGraph: {
    title: "PickPlay - Fun Choices Made Easy",
    description:
      "What should I eat? Liar game, random team picker, date course recommendations - all in one place.",
    type: "website",
    locale: "en_US",
    url: "https://pick-play.github.io/en",
    siteName: "PickPlay",
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
    canonical: "https://pick-play.github.io/en",
    languages: {
      "x-default": "https://pick-play.github.io",
      "ko": "https://pick-play.github.io",
      en: "https://pick-play.github.io/en",
      ja: "https://pick-play.github.io/jp",
      "zh-CN": "https://pick-play.github.io/cn",
      es: "https://pick-play.github.io/es",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      url: "https://pick-play.github.io/en",
      name: "PickPlay",
      publisher: { "@id": "https://pick-play.github.io/#organization" },
      inLanguage: "en",
    },
  ],
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}
