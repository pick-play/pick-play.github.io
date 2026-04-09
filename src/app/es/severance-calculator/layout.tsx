import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Indemnización - Pago por Despido Coreano | PickPlay",
  description:
    "Ingresa tu fecha de inicio, fecha de fin y salario mensual para calcular la indemnización laboral coreana (퇴직금) y el impuesto estimado. Herramienta gratuita en línea.",
  keywords: [
    "calculadora indemnización",
    "indemnización Corea",
    "pago por despido Corea",
    "퇴직금 calculadora",
    "ley laboral coreana indemnización",
    "impuesto retiro Corea",
    "años de servicio calculadora",
    "salario diario promedio Corea",
    "indemnización neta",
  ],
  openGraph: {
    title: "Calculadora de Indemnización - Pago por Despido Coreano | PickPlay",
    description:
      "Calcula la indemnización laboral coreana y el impuesto estimado con tu fecha de inicio, fin y salario mensual.",
    url: "https://pick-play.github.io/es/severance-calculator/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - Calculadora de Indemnización",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/severance-calculator/",
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
      name: "Calculadora de Indemnización",
      description:
        "Calcula la indemnización laboral coreana y el impuesto estimado según el período de empleo y el salario mensual.",
      url: "https://pick-play.github.io/es/severance-calculator/",
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
          name: "Calculadora de Indemnización",
          item: "https://pick-play.github.io/es/severance-calculator/",
        },
      ],
    },
  ],
};

export default function SeveranceCalculatorEsLayout({
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
