import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Roulette - Decision Spinner",
  description:
    "Can't decide? Spin the wheel and let fate choose for you! Customize your roulette with any options you want.",
  keywords: [
    "random roulette",
    "decision spinner",
    "spin the wheel",
    "random picker",
    "random decision",
    "custom roulette",
    "roulette wheel",
    "random choice",
  ],
  openGraph: {
    title: "Random Roulette - Decision Spinner",
    description:
      "Spin the wheel and let fate decide! Customize with your own options.",
    url: "https://pick-play.github.io/en/roulette",
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
    canonical: "https://pick-play.github.io/en/roulette",
    languages: {
      "x-default": "https://pick-play.github.io/roulette",
      "ko": "https://pick-play.github.io/roulette",
      en: "https://pick-play.github.io/en/roulette",
      ja: "https://pick-play.github.io/jp/roulette",
      "zh-CN": "https://pick-play.github.io/cn/roulette",
      es: "https://pick-play.github.io/es/roulette",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Random Roulette - Decision Spinner",
      url: "https://pick-play.github.io/en/roulette",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Spin a customizable roulette wheel to make random decisions quickly and fairly.",
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://pick-play.github.io/en",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Random Roulette",
          item: "https://pick-play.github.io/en/roulette",
        },
      ],
    },
  ],
};

export default function RouletteEnLayout({
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
