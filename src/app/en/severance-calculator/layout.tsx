import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Severance Pay Calculator - Korean Retirement Pay Estimator | PickPlay",
  description:
    "Enter your start date, end date, and monthly salary to instantly calculate Korean severance pay (퇴직금) and estimated income tax. Free online tool.",
  keywords: [
    "severance pay calculator",
    "Korean severance pay",
    "retirement pay Korea",
    "퇴직금 calculator",
    "Korean labor law severance",
    "severance tax estimate",
    "years of service calculator",
    "daily average wage Korea",
    "net severance pay",
  ],
  openGraph: {
    title: "Severance Pay Calculator - Korean Retirement Pay Estimator | PickPlay",
    description:
      "Calculate Korean severance pay and estimated income tax with your start date, end date, and monthly salary.",
    url: "https://pick-play.github.io/en/severance-calculator/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - Severance Pay Calculator",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/en/severance-calculator/",
    languages: {
      "x-default": "https://pick-play.github.io/severance-calculator/",
      ko: "https://pick-play.github.io/severance-calculator/",
      en: "https://pick-play.github.io/en/severance-calculator/",
      ja: "https://pick-play.github.io/jp/severance-calculator/",
      "zh-CN": "https://pick-play.github.io/cn/severance-calculator/",
      es: "https://pick-play.github.io/es/severance-calculator/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Severance Pay Calculator",
      description:
        "Calculate Korean severance pay and estimated income tax based on employment period and monthly salary.",
      url: "https://pick-play.github.io/en/severance-calculator/",
      applicationCategory: "UtilityApplication",
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
          name: "Severance Pay Calculator",
          item: "https://pick-play.github.io/en/severance-calculator/",
        },
      ],
    },
  ],
};

export default function SeveranceCalculatorEnLayout({
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
