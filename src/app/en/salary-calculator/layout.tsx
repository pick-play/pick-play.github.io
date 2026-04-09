import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salary Net Pay Calculator - Tax & Social Insurance",
  description:
    "Calculate your Korean salary net pay instantly. Automatically computes national pension, health insurance, long-term care, employment insurance, income tax, and local tax to show your monthly and annual take-home pay.",
  keywords: [
    "salary net pay calculator",
    "Korean salary calculator",
    "take-home pay Korea",
    "income tax calculator Korea",
    "national pension calculator",
    "health insurance Korea",
    "2024 salary calculator",
  ],
  openGraph: {
    title: "Salary Net Pay Calculator - Tax & Social Insurance",
    description:
      "Enter your annual salary to instantly calculate all Korean deductions and see your monthly and annual net pay.",
    url: "https://pick-play.github.io/en/salary-calculator/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/en/salary-calculator/",
    languages: {
      "x-default": "https://pick-play.github.io/salary-calculator/",
      ko: "https://pick-play.github.io/salary-calculator/",
      en: "https://pick-play.github.io/en/salary-calculator/",
      ja: "https://pick-play.github.io/jp/salary-calculator/",
      "zh-CN": "https://pick-play.github.io/cn/salary-calculator/",
      es: "https://pick-play.github.io/es/salary-calculator/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Salary Net Pay Calculator",
      description:
        "Online calculator that computes Korean salary net pay by deducting national pension, health insurance, long-term care, employment insurance, income tax, and local income tax.",
      url: "https://pick-play.github.io/en/salary-calculator/",
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
          name: "Salary Net Pay Calculator",
          item: "https://pick-play.github.io/en/salary-calculator/",
        },
      ],
    },
  ],
};

export default function SalaryCalculatorEnLayout({
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
