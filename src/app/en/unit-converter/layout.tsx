import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unit Converter - Length, Weight, Temperature & More",
  description:
    "Convert length, weight, temperature, area, volume, speed, and data units instantly. cm to inch, kg to lb, °C to °F and more.",
  keywords: [
    "unit converter",
    "length converter",
    "weight converter",
    "temperature converter",
    "cm to inch",
    "kg to lb",
    "celsius to fahrenheit",
    "online unit converter",
  ],
  openGraph: {
    title: "Unit Converter - Length, Weight, Temperature & More",
    description:
      "Convert cm to inch, kg to lb, °C to °F and dozens more units instantly.",
    url: "https://pick-play.github.io/en/unit-converter/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/en/unit-converter/",
    languages: {
      "x-default": "https://pick-play.github.io/unit-converter/",
      ko: "https://pick-play.github.io/unit-converter/",
      en: "https://pick-play.github.io/en/unit-converter/",
      ja: "https://pick-play.github.io/jp/unit-converter/",
      "zh-CN": "https://pick-play.github.io/cn/unit-converter/",
      es: "https://pick-play.github.io/es/unit-converter/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Unit Converter",
      description:
        "Instantly convert length, weight, temperature, area, volume, speed, and data units online.",
      url: "https://pick-play.github.io/en/unit-converter/",
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
          name: "Unit Converter",
          item: "https://pick-play.github.io/en/unit-converter/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I use the unit converter?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Select a category tab, choose the source and target units, then type a number. The result is calculated instantly.",
          },
        },
        {
          "@type": "Question",
          name: "What unit categories are supported?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Length (mm, cm, m, km, in, ft, yd, mi), Weight (mg, g, kg, oz, lb, ton), Temperature (°C, °F, K), Area, Volume, Speed, and Data units are all supported.",
          },
        },
        {
          "@type": "Question",
          name: "What are the quick link buttons?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Quick links let you jump to the most common conversions like cm to inch, kg to lb, or °C to °F with a single click.",
          },
        },
      ],
    },
  ],
};

export default function UnitConverterEnLayout({
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
