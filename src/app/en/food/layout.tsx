import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What to Eat? - Menu Recommendation Roulette",
  description:
    "Can't decide what to eat? Get personalized food recommendations from 130+ menus including Korean, Japanese, Chinese, Western, and dessert. Pick your taste on our flavor map!",
  keywords: [
    "what to eat",
    "food recommendation",
    "menu picker",
    "random food",
    "meal ideas",
    "lunch ideas",
    "dinner ideas",
    "food roulette",
    "what should I eat",
    "restaurant picker",
  ],
  openGraph: {
    title: "What to Eat? - 130+ Menu Recommendation Roulette",
    description:
      "Less hesitation, faster choices! Pick your taste on the flavor map and let the slot machine choose your meal.",
    url: "https://pick-play.github.io/en/food",
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
    canonical: "https://pick-play.github.io/en/food",
    languages: {
      "x-default": "https://pick-play.github.io/food",
      "ko": "https://pick-play.github.io/food",
      en: "https://pick-play.github.io/en/food",
      ja: "https://pick-play.github.io/jp/food",
      "zh-CN": "https://pick-play.github.io/cn/food",
      es: "https://pick-play.github.io/es/food",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "What to Eat? - Menu Recommendation Roulette",
      url: "https://pick-play.github.io/en/food",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Get personalized food recommendations from 130+ menus using a flavor map. Free, no sign-up required.",
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
          name: "What to Eat?",
          item: "https://pick-play.github.io/en/food",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does the food recommendation work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Click your preference on the flavor map along the mild-to-bold and light-to-rich axes. The slot machine then randomly picks a menu that matches your taste from 130+ options including Korean, Japanese, Chinese, Western, Asian, street food, dessert, and fast food.",
          },
        },
        {
          "@type": "Question",
          name: "Can I get lunch or dinner recommendations?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Use the flavor map to select your preference, or apply filters by cuisine type and price range. Works great for both lunch and dinner recommendations.",
          },
        },
        {
          "@type": "Question",
          name: "Is it free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, all PickPlay features are completely free. No sign-up or app installation required — just open your browser and go.",
          },
        },
      ],
    },
  ],
};

export default function FoodEnLayout({
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
