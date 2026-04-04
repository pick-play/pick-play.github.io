import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI Calculator - Body Mass Index",
  description:
    "Calculate your BMI instantly by entering your height and weight. See underweight, normal, overweight, and obese classifications with your ideal weight range.",
  keywords: [
    "BMI calculator",
    "body mass index",
    "BMI calculation",
    "ideal weight calculator",
    "obesity calculator",
    "weight checker",
    "BMI chart",
  ],
  openGraph: {
    title: "BMI Calculator - Body Mass Index",
    description:
      "Instantly calculate BMI from height and weight. See your category and ideal weight range.",
    url: "https://pick-play.github.io/en/bmi/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/en/bmi/",
    languages: {
      "x-default": "https://pick-play.github.io/bmi/",
      ko: "https://pick-play.github.io/bmi/",
      en: "https://pick-play.github.io/en/bmi/",
      ja: "https://pick-play.github.io/jp/bmi/",
      "zh-CN": "https://pick-play.github.io/cn/bmi/",
      es: "https://pick-play.github.io/es/bmi/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "BMI Calculator",
      description:
        "Online BMI calculator that instantly computes Body Mass Index from height and weight with category classification.",
      url: "https://pick-play.github.io/en/bmi/",
      applicationCategory: "HealthApplication",
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
          name: "BMI Calculator",
          item: "https://pick-play.github.io/en/bmi/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How is BMI calculated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "BMI (Body Mass Index) is calculated by dividing your weight in kilograms by the square of your height in metres. For example, 65 kg at 170 cm gives BMI = 65 ÷ (1.7 × 1.7) = 22.5.",
          },
        },
        {
          "@type": "Question",
          name: "What is a healthy BMI range?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "According to the WHO, a BMI below 18.5 is underweight, 18.5–24.9 is normal, 25–29.9 is overweight, and 30 or above is obese.",
          },
        },
        {
          "@type": "Question",
          name: "Does the calculator support imperial units?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You can switch between metric (cm/kg) and imperial (ft-in/lbs) using the toggle at the top of the calculator.",
          },
        },
      ],
    },
  ],
};

export default function BmiEnLayout({
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
