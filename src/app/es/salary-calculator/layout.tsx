import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Salario Neto - Impuestos y Seguro Social",
  description:
    "Calcula al instante tu salario neto en Corea. Calcula automáticamente pensión nacional, seguro de salud, cuidado a largo plazo, seguro de empleo, impuesto sobre la renta e impuesto local para mostrar tu pago mensual y anual.",
  keywords: [
    "calculadora salario neto",
    "calculadora salario Korea",
    "sueldo neto Korea",
    "calculadora impuesto renta",
    "pensión nacional Korea",
    "seguro salud Korea",
    "2024 calculadora salario",
  ],
  openGraph: {
    title: "Calculadora de Salario Neto - Impuestos y Seguro Social",
    description:
      "Ingresa tu salario anual para calcular automáticamente todas las deducciones coreanas y ver tu salario neto mensual y anual.",
    url: "https://pick-play.github.io/es/salary-calculator/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/salary-calculator/",
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
      name: "Calculadora de Salario Neto",
      description:
        "Calculadora en línea que calcula el salario neto coreano deduciendo pensión nacional, seguro de salud, cuidado a largo plazo, seguro de empleo, impuesto sobre la renta e impuesto local.",
      url: "https://pick-play.github.io/es/salary-calculator/",
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
          name: "Calculadora de Salario Neto",
          item: "https://pick-play.github.io/es/salary-calculator/",
        },
      ],
    },
  ],
};

export default function SalaryCalculatorEsLayout({
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
