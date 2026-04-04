import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memory Card Game - Flip & Match",
  description:
    "Free online memory card game. Flip cards to find matching pairs. Three difficulty levels with star ratings and best time tracking.",
  keywords: [
    "memory card game",
    "card matching game",
    "flip cards",
    "brain game",
    "memory game online",
    "free game",
    "puzzle game",
  ],
  openGraph: {
    title: "Memory Card Game - Flip & Match | PickPlay",
    description: "Free online memory card game with 3 difficulty levels. Flip cards to find matching pairs.",
    url: "https://pick-play.github.io/en/memory-game/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Memory Card Game" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/en/memory-game/",
    languages: {
      "x-default": "https://pick-play.github.io/memory-game/",
      ko: "https://pick-play.github.io/memory-game/",
      en: "https://pick-play.github.io/en/memory-game/",
      ja: "https://pick-play.github.io/jp/memory-game/",
      "zh-CN": "https://pick-play.github.io/cn/memory-game/",
      es: "https://pick-play.github.io/es/memory-game/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Memory Card Game - Flip & Match",
      description:
        "Free online memory card game. Flip cards to find matching pairs. Three difficulty levels with star ratings.",
      url: "https://pick-play.github.io/en/memory-game/",
      applicationCategory: "GameApplication",
      genre: "Puzzle",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
          name: "Memory Card Game",
          item: "https://pick-play.github.io/en/memory-game/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do you play the memory card game?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Flip two cards at a time to find matching pairs. Match all pairs to win! The fewer moves you use, the higher your star rating.",
          },
        },
        {
          "@type": "Question",
          name: "How is the star rating determined?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Fewer moves earn more stars. Easy: 12 or fewer moves for 3 stars, Medium: 16 or fewer, Hard: 24 or fewer.",
          },
        },
        {
          "@type": "Question",
          name: "Where is the best time stored?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Best times are saved in your browser's local storage. Clearing browser data will reset them.",
          },
        },
      ],
    },
  ],
};

export default function MemoryGameEnLayout({ children }: { children: React.ReactNode }) {
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
