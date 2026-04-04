import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timer & Stopwatch - Online Time Measurement",
  description:
    "Free online timer and stopwatch. Countdown timer with presets, lap time recording. Perfect for studying, exercise, and cooking.",
  keywords: [
    "online timer",
    "stopwatch",
    "countdown timer",
    "timer app",
    "time measurement",
    "free timer",
    "lap timer",
  ],
  openGraph: {
    title: "Timer & Stopwatch - Online Time Measurement",
    description: "Free online timer and stopwatch. Countdown, presets, and lap times.",
    url: "https://pick-play.github.io/en/timer/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/en/timer/",
    languages: {
      "x-default": "https://pick-play.github.io/timer/",
      ko: "https://pick-play.github.io/timer/",
      en: "https://pick-play.github.io/en/timer/",
      ja: "https://pick-play.github.io/jp/timer/",
      "zh-CN": "https://pick-play.github.io/cn/timer/",
      es: "https://pick-play.github.io/es/timer/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Timer & Stopwatch - Online Time Measurement",
      url: "https://pick-play.github.io/en/timer/",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Free online timer and stopwatch with countdown, presets, and lap time recording.",
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
          name: "Timer & Stopwatch",
          item: "https://pick-play.github.io/en/timer/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the difference between a timer and a stopwatch?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A timer counts down from a set time to zero and plays an alert when it finishes. A stopwatch counts up from zero and lets you record lap times.",
          },
        },
        {
          "@type": "Question",
          name: "I can't hear the timer alert",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Make sure sound is allowed in your browser settings. This tool uses the Web Audio API, so no extra installation is needed.",
          },
        },
        {
          "@type": "Question",
          name: "How do I use lap times?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Press the 'Lap' button while the stopwatch is running to record the current time. This is useful for comparing split times across multiple segments.",
          },
        },
      ],
    },
  ],
};

export default function TimerEnLayout({ children }: { children: React.ReactNode }) {
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
