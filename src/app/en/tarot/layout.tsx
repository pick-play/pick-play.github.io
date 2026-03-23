import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yes or No Tarot - Card Reading",
  description:
    "Ask the tarot cards your yes/no question! Draw from all 22 Major Arcana cards and receive guidance for your dilemmas.",
  keywords: [
    "yes or no tarot",
    "tarot card reading",
    "tarot cards online",
    "free tarot reading",
    "major arcana",
    "tarot yes no",
    "online tarot",
    "tarot divination",
    "card reading",
  ],
  openGraph: {
    title: "Yes or No Tarot - Free Online Card Reading",
    description:
      "Ask the tarot cards your question! Draw from all 22 Major Arcana for guidance on your dilemmas.",
    url: "https://pick-play.github.io/en/tarot/",
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
    canonical: "https://pick-play.github.io/en/tarot/",
    languages: {
      "x-default": "https://pick-play.github.io/tarot/",
      "ko": "https://pick-play.github.io/tarot/",
      en: "https://pick-play.github.io/en/tarot/",
      ja: "https://pick-play.github.io/jp/tarot/",
      "zh-CN": "https://pick-play.github.io/cn/tarot/",
      es: "https://pick-play.github.io/es/tarot/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Yes or No Tarot - Card Reading",
      url: "https://pick-play.github.io/en/tarot/",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "A free online yes/no tarot reading using all 22 Major Arcana cards to answer your questions.",
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
          name: "Yes or No Tarot",
          item: "https://pick-play.github.io/en/tarot/",
        },
      ],
    },
  ],
};

export default function TarotEnLayout({
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
