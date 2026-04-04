import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aim Trainer - Mouse Accuracy Test | PickPlay",
  description:
    "Test and train your mouse accuracy and reaction speed with a 30-second aim trainer. Three difficulty levels with hit rate and average reaction time stats.",
  keywords: [
    "aim trainer",
    "aim test",
    "mouse accuracy",
    "reaction speed test",
    "click training",
    "FPS aim practice",
    "mouse training",
    "aim improvement",
    "click accuracy",
  ],
  openGraph: {
    title: "Aim Trainer - Mouse Accuracy Test",
    description:
      "Train your mouse accuracy and reaction speed with a 30-second aim trainer. Three difficulty levels and detailed stats.",
    url: "https://pick-play.github.io/en/aim-test/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - Aim Trainer",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/en/aim-test/",
    languages: {
      "x-default": "https://pick-play.github.io/aim-test/",
      ko: "https://pick-play.github.io/aim-test/",
      en: "https://pick-play.github.io/en/aim-test/",
      ja: "https://pick-play.github.io/jp/aim-test/",
      "zh-CN": "https://pick-play.github.io/cn/aim-test/",
      es: "https://pick-play.github.io/es/aim-test/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Aim Trainer - Mouse Accuracy Test",
      url: "https://pick-play.github.io/en/aim-test/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "A 30-second aim trainer to test your mouse accuracy and reaction speed. Three difficulty levels with hit rate and reaction time statistics.",
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
          name: "Aim Trainer",
          item: "https://pick-play.github.io/en/aim-test/",
        },
      ],
    },
  ],
};

export default function AimTestEnLayout({
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
