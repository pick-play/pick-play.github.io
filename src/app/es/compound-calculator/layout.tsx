import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Interés Compuesto - Ahorros e Inversiones | PickPlay",
  description:
    "Calculadora de interés compuesto gratuita. Introduce el monto inicial, aporte mensual y tasa anual para ver al instante el saldo final, el interés total y el gráfico de crecimiento. Incluye Regla del 72 y calculadora de metas.",
  keywords: [
    "calculadora de interés compuesto",
    "calculadora de ahorro",
    "interés simple vs compuesto",
    "regla del 72",
    "calculadora de inversión",
    "rendimiento financiero",
    "calculadora de aporte mensual",
  ],
  openGraph: {
    title: "Calculadora de Interés Compuesto - Ahorros e Inversiones | PickPlay",
    description:
      "Calculadora de interés compuesto gratuita. Saldo final, interés total y gráfico de crecimiento al instante. Incluye Regla del 72.",
    url: "https://pick-play.github.io/es/compound-calculator/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/compound-calculator/",
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
      name: "Calculadora de Interés Compuesto",
      description:
        "Calcula interés simple o compuesto con monto inicial, aporte mensual, tasa anual y frecuencia de capitalización. Incluye gráfico de crecimiento año a año, Regla del 72 y calculadora de meta.",
      url: "https://pick-play.github.io/es/compound-calculator/",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
          name: "Calculadora de Interés Compuesto",
          item: "https://pick-play.github.io/es/compound-calculator/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cuál es la diferencia entre interés simple y compuesto?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El interés simple se calcula solo sobre el capital, mientras que el compuesto se calcula sobre el capital y los intereses acumulados, generando crecimiento exponencial.",
          },
        },
        {
          "@type": "Question",
          name: "¿Importa la frecuencia de capitalización?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí. Mensual > Trimestral > Anual en términos de rendimiento. Una capitalización más frecuente resulta en una tasa efectiva anual más alta.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué es la Regla del 72?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Divide 72 entre la tasa de interés anual para estimar en cuántos años se duplica tu dinero. Ejemplo: al 8% anual, 72÷8 = 9 años.",
          },
        },
      ],
    },
  ],
};

export default function CompoundCalculatorEsLayout({
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
