import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Edad - Años, Zodiaco y Cuenta Regresiva | PickPlay",
  description:
    "Ingresa tu fecha de nacimiento para calcular al instante tu edad exacta, signo zodiacal occidental, zodiaco chino, generación y días hasta tu próximo cumpleaños.",
  keywords: [
    "calculadora de edad",
    "cuántos años tengo",
    "cuenta regresiva cumpleaños",
    "calculadora signo zodiacal",
    "zodiaco chino calculadora",
    "días vividos",
    "edad exacta",
    "generación millennial",
    "calculadora generación",
  ],
  openGraph: {
    title: "Calculadora de Edad - Años, Zodiaco y Cuenta Regresiva | PickPlay",
    description:
      "Calcula tu edad exacta, signo zodiacal, zodiaco chino y días hasta tu próximo cumpleaños.",
    url: "https://pick-play.github.io/es/age-calculator/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - Calculadora de Edad",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/age-calculator/",
    languages: {
      "x-default": "https://pick-play.github.io/age-calculator/",
      ko: "https://pick-play.github.io/age-calculator/",
      en: "https://pick-play.github.io/en/age-calculator/",
      ja: "https://pick-play.github.io/jp/age-calculator/",
      "zh-CN": "https://pick-play.github.io/cn/age-calculator/",
      es: "https://pick-play.github.io/es/age-calculator/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Calculadora de Edad",
      description:
        "Calcula edad exacta, signo zodiacal, zodiaco chino, generación y cuenta regresiva de cumpleaños.",
      url: "https://pick-play.github.io/es/age-calculator/",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: "https://pick-play.github.io/es/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Calculadora de Edad",
          item: "https://pick-play.github.io/es/age-calculator/",
        },
      ],
    },
  ],
};

export default function AgeCalculatorEsLayout({
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
