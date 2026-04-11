import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Absolute Pitch Test - How Good Is Your Musical Ear? | PickPlay",
  description:
    "Test your absolute pitch by listening to pure sine wave tones and identifying notes on a piano keyboard. 4 difficulty levels from beginner to expert. No reference tone — just your ear!",
  keywords: [
    "absolute pitch test",
    "perfect pitch test",
    "ear training",
    "note identification",
    "piano note quiz",
    "music ability test",
    "pitch recognition",
    "musical ear test",
    "relative pitch",
    "pitch training",
  ],
  openGraph: {
    title: "Absolute Pitch Test - How Good Is Your Musical Ear?",
    description:
      "Listen to pure sine wave tones and identify notes on a piano keyboard. Test your perfect pitch with 4 difficulty levels.",
    url: "https://pick-play.github.io/en/pitch-test/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - Absolute Pitch Test",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/en/pitch-test/",
    languages: {
      "x-default": "https://pick-play.github.io/pitch-test/",
      ko: "https://pick-play.github.io/pitch-test/",
      en: "https://pick-play.github.io/en/pitch-test/",
      ja: "https://pick-play.github.io/jp/pitch-test/",
      "zh-CN": "https://pick-play.github.io/cn/pitch-test/",
      es: "https://pick-play.github.io/es/pitch-test/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Absolute Pitch Test - How Good Is Your Musical Ear?",
      url: "https://pick-play.github.io/en/pitch-test/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Test your absolute pitch by listening to pure sine wave tones and identifying notes on a piano keyboard. 4 difficulty levels from easy (white keys only) to expert (3 octaves).",
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
          name: "Absolute Pitch Test",
          item: "https://pick-play.github.io/en/pitch-test/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is absolute pitch?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolute pitch (perfect pitch) is the ability to identify the name of any musical note without a reference tone. It is estimated to occur in about 0.01–1% of the population.",
          },
        },
        {
          "@type": "Question",
          name: "How does the absolute pitch test work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pure sine wave tones are generated using the Web Audio API. After listening, click the matching key on the piano keyboard. Easy mode uses white keys only (7 notes), while Expert mode spans 3 octaves (36 notes).",
          },
        },
      ],
    },
  ],
};

export default function PitchTestEnLayout({
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
