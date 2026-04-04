import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Porcentajes - Calcula Porcentajes Fácilmente",
  description:
    "Calculadora de porcentajes gratuita en línea. Calcula el Y% de X, qué porcentaje es X de Y, variación porcentual y propinas.",
  keywords: [
    "calculadora de porcentajes",
    "calcular porcentaje",
    "variación porcentual",
    "calculadora de propina",
    "calculadora de descuento",
    "porcentaje online",
    "ratio calculadora",
  ],
  openGraph: {
    title: "Calculadora de Porcentajes - Calcula Porcentajes Fácilmente | PickPlay",
    description: "Calculadora de porcentajes gratuita. Porcentaje de, qué porcentaje, variación y propina.",
    url: "https://pick-play.github.io/es/percentage/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Calculadora de Porcentajes" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/percentage/",
    languages: {
      "x-default": "https://pick-play.github.io/percentage/",
      ko: "https://pick-play.github.io/percentage/",
      en: "https://pick-play.github.io/en/percentage/",
      ja: "https://pick-play.github.io/jp/percentage/",
      "zh-CN": "https://pick-play.github.io/cn/percentage/",
      es: "https://pick-play.github.io/es/percentage/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Calculadora de Porcentajes",
      url: "https://pick-play.github.io/es/percentage/",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Calculadora de porcentajes gratuita en línea con variación porcentual y calculadora de propina.",
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pick-play.github.io/es/" },
        { "@type": "ListItem", position: 2, name: "Calculadora de Porcentajes", item: "https://pick-play.github.io/es/percentage/" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Qué es un porcentaje?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Un porcentaje representa una proporción sobre 100. Por ejemplo, el 15% de 200 = 200 × 0,15 = 30.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo se calcula la variación porcentual?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Variación % = (Valor nuevo - Valor original) ÷ Valor original × 100. De 100 a 150: (150-100)÷100×100 = +50%.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo uso la calculadora de propina?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Introduce el importe de la cuenta y el porcentaje de propina. El importe de la propina y el total se calculan automáticamente.",
          },
        },
      ],
    },
  ],
};

export default function PercentageEsLayout({ children }: { children: React.ReactNode }) {
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
