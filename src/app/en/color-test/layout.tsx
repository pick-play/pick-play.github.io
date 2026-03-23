import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Personality Test",
  description:
    "What color represents you? Answer 10 questions to discover your color personality. Find out what your personal color says about you.",
  keywords: [
    "color personality test",
    "personal color",
    "color quiz",
    "personality color",
    "color psychology",
    "what color am I",
    "color personality quiz",
    "color test",
    "personality quiz",
  ],
  openGraph: {
    title: "Color Personality Test - What Color Are You?",
    description:
      "Answer 10 questions to discover what color represents your personality. 8 possible color results!",
    url: "https://pick-play.github.io/en/color-test/",
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
    canonical: "https://pick-play.github.io/en/color-test/",
    languages: {
      "x-default": "https://pick-play.github.io/color-test/",
      "ko": "https://pick-play.github.io/color-test/",
      en: "https://pick-play.github.io/en/color-test/",
      ja: "https://pick-play.github.io/jp/color-test/",
      "zh-CN": "https://pick-play.github.io/cn/color-test/",
      es: "https://pick-play.github.io/es/color-test/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Color Personality Test",
      url: "https://pick-play.github.io/en/color-test/",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "A 10-question personality test that reveals which of 8 colors best represents your character.",
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
          name: "Color Personality Test",
          item: "https://pick-play.github.io/en/color-test/",
        },
      ],
    },
  ],
};

export default function ColorTestEnLayout({
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
