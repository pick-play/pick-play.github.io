import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Truth or Dare - Party Game",
  description:
    "392 truths and dares! The ultimate party game sorted by intensity level. Perfect for friend groups, date nights, and social gatherings.",
  keywords: [
    "truth or dare",
    "party game",
    "truth or dare questions",
    "dare game",
    "party questions",
    "adult party game",
    "icebreaker game",
    "group game",
    "social game",
  ],
  openGraph: {
    title: "Truth or Dare - 392 Truths & Dares",
    description:
      "392 questions and dares sorted by intensity! The essential party game for any social gathering.",
    url: "https://pick-play.github.io/en/truth-dare/",
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
    canonical: "https://pick-play.github.io/en/truth-dare/",
    languages: {
      "x-default": "https://pick-play.github.io/truth-dare/",
      "ko": "https://pick-play.github.io/truth-dare/",
      en: "https://pick-play.github.io/en/truth-dare/",
      ja: "https://pick-play.github.io/jp/truth-dare/",
      "zh-CN": "https://pick-play.github.io/cn/truth-dare/",
      es: "https://pick-play.github.io/es/truth-dare/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Truth or Dare - Party Game",
      url: "https://pick-play.github.io/en/truth-dare/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Truth or Dare with 392 truths and dares sorted by intensity level — the must-have party game.",
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
          name: "Truth or Dare",
          item: "https://pick-play.github.io/en/truth-dare/",
        },
      ],
    },
  ],
};

export default function TruthDareEnLayout({
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
