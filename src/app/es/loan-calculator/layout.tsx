import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Interés de Préstamo - Comparar Métodos | PickPlay",
  description:
    "Ingresa el monto, la tasa de interés y el plazo para calcular al instante la cuota mensual y el interés total con cuota fija, capital fijo y pago al vencimiento.",
  keywords: [
    "calculadora de préstamo",
    "calculadora hipoteca",
    "cuota mensual préstamo",
    "amortización préstamo",
    "comparar métodos de pago",
    "interés total préstamo",
    "simulador de préstamo",
    "tabla de amortización",
  ],
  openGraph: {
    title: "Calculadora de Interés de Préstamo - Comparar Métodos | PickPlay",
    description:
      "Compara cuota mensual e interés total entre cuota fija, capital fijo y pago al vencimiento.",
    url: "https://pick-play.github.io/es/loan-calculator/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - Calculadora de Interés de Préstamo",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/loan-calculator/",
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
      name: "Calculadora de Interés de Préstamo",
      description:
        "Calcula cuota mensual e interés total para cuota fija, capital fijo y pago al vencimiento.",
      url: "https://pick-play.github.io/es/loan-calculator/",
      applicationCategory: "FinanceApplication",
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
          name: "Calculadora de Interés de Préstamo",
          item: "https://pick-play.github.io/es/loan-calculator/",
        },
      ],
    },
  ],
};

export default function LoanCalculatorEsLayout({
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
