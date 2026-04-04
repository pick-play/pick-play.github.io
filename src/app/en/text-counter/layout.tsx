import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Counter - Real-time Character & Word Counter",
  description:
    "Count characters, words, sentences, paragraphs, and bytes in real time. Includes keyword density analysis and estimated reading time.",
  keywords: [
    "text counter",
    "character counter",
    "word counter",
    "byte counter",
    "character count",
    "word count tool",
    "online text counter",
  ],
  openGraph: {
    title: "Text Counter - Real-time Character & Word Counter",
    description:
      "Count characters, words, bytes in real time with keyword density and reading time.",
    url: "https://pick-play.github.io/en/text-counter/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/en/text-counter/",
    languages: {
      "x-default": "https://pick-play.github.io/text-counter/",
      ko: "https://pick-play.github.io/text-counter/",
      en: "https://pick-play.github.io/en/text-counter/",
      ja: "https://pick-play.github.io/jp/text-counter/",
      "zh-CN": "https://pick-play.github.io/cn/text-counter/",
      es: "https://pick-play.github.io/es/text-counter/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Text Counter",
      description:
        "Real-time character, word, sentence, paragraph, and byte counter with keyword density analysis.",
      url: "https://pick-play.github.io/en/text-counter/",
      applicationCategory: "UtilityApplication",
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
          name: "Text Counter",
          item: "https://pick-play.github.io/en/text-counter/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I use the text counter?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Simply type or paste your text into the input box. Characters, words, sentences, paragraphs, and bytes are counted automatically in real time.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between characters with and without spaces?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Characters with spaces includes all whitespace (spaces, tabs, newlines), while characters without spaces counts only non-whitespace characters.",
          },
        },
        {
          "@type": "Question",
          name: "How is the byte count calculated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Bytes are calculated using UTF-8 encoding. ASCII characters (letters, digits) use 1 byte, while characters like Korean glyphs use 3 bytes each.",
          },
        },
      ],
    },
  ],
};

export default function TextCounterEnLayout({
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
