import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Impuesto de Adquisición - Impuesto Inmobiliario Coreano",
  description:
    "Calcula al instante el impuesto de adquisición inmobiliaria en Corea para viviendas, terrenos y locales comerciales. Incluye reducción para primera compra y tasas de áreas reguladas.",
  keywords: [
    "calculadora impuesto adquisición",
    "impuesto inmobiliario Corea",
    "취득세 calculator",
    "primera compra vivienda Corea",
    "área regulada Korea",
    "impuesto transferencia inmobiliaria",
    "calcular impuesto compra vivienda",
  ],
  openGraph: {
    title: "Calculadora de Impuesto de Adquisición - Impuesto Inmobiliario Coreano",
    description:
      "Calcula al instante el impuesto de adquisición en Corea. Vivienda, terreno y comercial con reducción primera compra y área regulada.",
    url: "https://pick-play.github.io/es/property-tax/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/property-tax/",
    languages: {
      "x-default": "https://pick-play.github.io/property-tax/",
      ko: "https://pick-play.github.io/property-tax/",
      en: "https://pick-play.github.io/en/property-tax/",
      ja: "https://pick-play.github.io/jp/property-tax/",
      "zh-CN": "https://pick-play.github.io/cn/property-tax/",
      es: "https://pick-play.github.io/es/property-tax/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Calculadora de Impuesto de Adquisición",
      description:
        "Calculadora online del impuesto de adquisición inmobiliaria en Corea. Cubre viviendas, terrenos y locales comerciales con reducción para primera compra y tasas de áreas reguladas.",
      url: "https://pick-play.github.io/es/property-tax/",
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
          name: "Calculadora de Impuesto de Adquisición",
          item: "https://pick-play.github.io/es/property-tax/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cómo se determina la tasa del impuesto de adquisición?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Para viviendas, la tasa es del 1% hasta 600M KRW, 2% entre 600M y 900M KRW, y 3% por encima de 900M KRW. Una segunda vivienda en área regulada tributa al 8%, y tres o más viviendas al 12%. Terrenos y locales comerciales tienen una tasa fija del 4%.",
          },
        },
        {
          "@type": "Question",
          name: "¿En qué consiste la reducción para primera compra?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Los compradores de su primera vivienda que adquieran un inmueble de hasta 1.200 millones KRW obtienen una reducción del 50% en el impuesto de adquisición, con un tope máximo de 2 millones KRW.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuánto son el impuesto de educación local y el impuesto especial rural?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El impuesto de educación local es el 10% del impuesto de adquisición. El impuesto especial rural está exento para propietarios de una sola vivienda (menos de 85m²) y es el 0,2% del precio de compra para otras propiedades.",
          },
        },
      ],
    },
  ],
};

export default function PropertyTaxEsLayout({
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
