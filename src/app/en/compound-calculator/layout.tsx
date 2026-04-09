import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compound Interest Calculator - Savings & Investment Returns | PickPlay",
  description:
    "Free compound interest calculator. Enter your initial amount, monthly contribution, and annual rate to instantly see your final balance, total interest, and growth chart. Includes Rule of 72 and goal calculator.",
  keywords: [
    "compound interest calculator",
    "savings calculator",
    "investment return calculator",
    "simple vs compound interest",
    "rule of 72",
    "monthly savings calculator",
    "annual interest calculator",
    "financial calculator",
  ],
  openGraph: {
    title: "Compound Interest Calculator - Savings & Investment Returns | PickPlay",
    description:
      "Free compound interest calculator. See final balance, total interest, year-by-year growth chart and Rule of 72 instantly.",
    url: "https://pick-play.github.io/en/compound-calculator/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/en/compound-calculator/",
    languages: {
      "x-default": "https://pick-play.github.io/compound-calculator/",
      ko: "https://pick-play.github.io/compound-calculator/",
      en: "https://pick-play.github.io/en/compound-calculator/",
      ja: "https://pick-play.github.io/jp/compound-calculator/",
      "zh-CN": "https://pick-play.github.io/cn/compound-calculator/",
      es: "https://pick-play.github.io/es/compound-calculator/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Compound Interest Calculator",
      description:
        "Calculate compound or simple interest with initial amount, monthly contributions, annual rate, and compounding frequency. Includes year-by-year growth chart, Rule of 72, and goal calculator.",
      url: "https://pick-play.github.io/en/compound-calculator/",
      applicationCategory: "FinanceApplication",
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
          name: "Compound Interest Calculator",
          item: "https://pick-play.github.io/en/compound-calculator/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the difference between simple and compound interest?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Simple interest is calculated only on the principal, while compound interest is calculated on both the principal and accumulated interest, leading to exponential growth over time.",
          },
        },
        {
          "@type": "Question",
          name: "Does compounding frequency matter?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Monthly compounding yields more than quarterly, which yields more than annual. A shorter compounding period results in a higher effective annual rate.",
          },
        },
        {
          "@type": "Question",
          name: "What is the Rule of 72?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Divide 72 by the annual interest rate to estimate how many years it takes to double your money. Example: at 8% per year, 72 ÷ 8 = 9 years.",
          },
        },
      ],
    },
  ],
};

export default function CompoundCalculatorEnLayout({
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
