import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Typing Speed Test - WPM Practice | PickPlay",
  description:
    "Free online typing speed test. Measure your WPM and accuracy in real time. Practice with easy, medium, and hard texts to improve your typing skills.",
  keywords: [
    "typing test",
    "typing speed",
    "WPM test",
    "words per minute",
    "typing practice",
    "keyboard test",
    "accuracy test",
  ],
  openGraph: {
    title: "Typing Speed Test - WPM Practice | PickPlay",
    description: "Free online typing speed test. Measure your WPM and accuracy in real time.",
    url: "https://pick-play.github.io/en/typing-test/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/en/typing-test/",
    languages: {
      "x-default": "https://pick-play.github.io/typing-test/",
      ko: "https://pick-play.github.io/typing-test/",
      en: "https://pick-play.github.io/en/typing-test/",
      ja: "https://pick-play.github.io/jp/typing-test/",
      "zh-CN": "https://pick-play.github.io/cn/typing-test/",
      es: "https://pick-play.github.io/es/typing-test/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Typing Speed Test",
      description:
        "Free online typing speed test. Measure your WPM and accuracy in real time. Practice with easy, medium, and hard texts.",
      url: "https://pick-play.github.io/en/typing-test/",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      inLanguage: "en",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
          name: "Typing Speed Test",
          item: "https://pick-play.github.io/en/typing-test/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How is WPM calculated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "WPM is calculated by dividing the total characters typed by 5 (standard word length), then dividing by the elapsed time in minutes.",
          },
        },
        {
          "@type": "Question",
          name: "How is accuracy measured?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Accuracy is the percentage of correctly typed characters out of total characters attempted. Fixing a typo does not remove it from the error count.",
          },
        },
        {
          "@type": "Question",
          name: "Where is my best score saved?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your best score is saved in your browser's local storage, so it persists across sessions on the same device.",
          },
        },
      ],
    },
  ],
};

export default function TypingTestEnLayout({
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
