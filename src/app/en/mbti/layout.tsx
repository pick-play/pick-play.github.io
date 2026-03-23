import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MBTI Personality Test - 20 Questions",
  description:
    "Discover your MBTI personality type and compatibility in just 20 questions. Find out if you're INFP, ENFJ, INTJ, and more — with compatibility insights.",
  keywords: [
    "MBTI test",
    "MBTI personality",
    "personality test",
    "16 personalities",
    "INFP",
    "ENFJ",
    "personality type quiz",
    "MBTI quiz",
    "MBTI compatibility",
    "Myers-Briggs",
  ],
  openGraph: {
    title: "MBTI Personality Test - Discover Your Type in 20 Questions",
    description:
      "Find your MBTI personality type and compatibility in 20 questions. Which of the 16 types are you?",
    url: "https://pick-play.github.io/en/mbti/",
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
    canonical: "https://pick-play.github.io/en/mbti/",
    languages: {
      "x-default": "https://pick-play.github.io/mbti/",
      "ko": "https://pick-play.github.io/mbti/",
      en: "https://pick-play.github.io/en/mbti/",
      ja: "https://pick-play.github.io/jp/mbti/",
      "zh-CN": "https://pick-play.github.io/cn/mbti/",
      es: "https://pick-play.github.io/es/mbti/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "MBTI Personality Test - 20 Questions",
      url: "https://pick-play.github.io/en/mbti/",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "A 20-question MBTI personality test that reveals your type and compatibility with all 16 types.",
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
          name: "MBTI Test",
          item: "https://pick-play.github.io/en/mbti/",
        },
      ],
    },
  ],
};

export default function MbtiEnLayout({
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
