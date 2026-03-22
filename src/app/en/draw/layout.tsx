import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lucky Draw - Random Picker",
  description:
    "Fair random drawing with dramatic card-flip reveals! Pick winners, assign tasks, or make any random choice with flair.",
  keywords: [
    "lucky draw",
    "random picker",
    "random draw",
    "pick a winner",
    "random selection",
    "card flip",
    "random name picker",
    "drawing lots",
    "raffle",
  ],
  openGraph: {
    title: "Lucky Draw - Random Picker",
    description:
      "Fair random drawing with dramatic card-flip reveals! Who will be chosen?",
    url: "https://pick-play.github.io/en/draw",
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
    canonical: "https://pick-play.github.io/en/draw",
    languages: {
      "x-default": "https://pick-play.github.io/draw",
      "ko": "https://pick-play.github.io/draw",
      en: "https://pick-play.github.io/en/draw",
      ja: "https://pick-play.github.io/jp/draw",
      "zh-CN": "https://pick-play.github.io/cn/draw",
      es: "https://pick-play.github.io/es/draw",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Lucky Draw - Random Picker",
      url: "https://pick-play.github.io/en/draw",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "A fair random drawing tool with dramatic card-flip animations to reveal the winner.",
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
          name: "Lucky Draw",
          item: "https://pick-play.github.io/en/draw",
        },
      ],
    },
  ],
};

export default function DrawEnLayout({
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
