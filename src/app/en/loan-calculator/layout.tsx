import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Interest Calculator - Compare Repayment Methods | PickPlay",
  description:
    "Enter loan amount, interest rate, and term to instantly calculate monthly payments and total interest for equal payment, equal principal, and bullet repayment methods.",
  keywords: [
    "loan interest calculator",
    "mortgage calculator",
    "loan repayment calculator",
    "equal payment loan",
    "amortization schedule",
    "monthly payment calculator",
    "interest rate calculator",
    "loan comparison",
  ],
  openGraph: {
    title: "Loan Interest Calculator - Compare Repayment Methods | PickPlay",
    description:
      "Compare monthly payments and total interest across equal payment, equal principal, and bullet repayment methods.",
    url: "https://pick-play.github.io/en/loan-calculator/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - Loan Interest Calculator",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/en/loan-calculator/",
    languages: {
      "x-default": "https://pick-play.github.io/loan-calculator/",
      ko: "https://pick-play.github.io/loan-calculator/",
      en: "https://pick-play.github.io/en/loan-calculator/",
      ja: "https://pick-play.github.io/jp/loan-calculator/",
      "zh-CN": "https://pick-play.github.io/cn/loan-calculator/",
      es: "https://pick-play.github.io/es/loan-calculator/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Loan Interest Calculator",
      description:
        "Calculate monthly payments and total interest for equal payment, equal principal, and bullet repayment loans.",
      url: "https://pick-play.github.io/en/loan-calculator/",
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
          name: "Loan Interest Calculator",
          item: "https://pick-play.github.io/en/loan-calculator/",
        },
      ],
    },
  ],
};

export default function LoanCalculatorEnLayout({
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
