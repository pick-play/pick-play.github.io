import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Quiz - Initial Letter Game",
  description:
    "Guess the word from its initial letters! With hints and a countdown timer for extra excitement. 100+ words to challenge your vocabulary.",
  keywords: [
    "word quiz",
    "initial letter game",
    "word guessing game",
    "vocabulary quiz",
    "word puzzle",
    "party quiz",
    "letter game",
    "brain game",
    "word challenge",
  ],
  openGraph: {
    title: "Word Quiz - Guess the Word from Initial Letters",
    description:
      "Guess the word from initial letters! With hints and a timer for extra fun. 100+ words to challenge you.",
    url: "https://pick-play.github.io/en/chosung-quiz/",
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
    canonical: "https://pick-play.github.io/en/chosung-quiz/",
    languages: {
      "x-default": "https://pick-play.github.io/chosung-quiz/",
      "ko": "https://pick-play.github.io/chosung-quiz/",
      en: "https://pick-play.github.io/en/chosung-quiz/",
      ja: "https://pick-play.github.io/jp/chosung-quiz/",
      "zh-CN": "https://pick-play.github.io/cn/chosung-quiz/",
      es: "https://pick-play.github.io/es/chosung-quiz/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Word Quiz - Initial Letter Game",
      url: "https://pick-play.github.io/en/chosung-quiz/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "A word guessing game with 100+ words, hints, and a countdown timer for added excitement.",
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
          name: "Word Quiz",
          item: "https://pick-play.github.io/en/chosung-quiz/",
        },
      ],
    },
  ],
};

export default function ChosungQuizEnLayout({
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
