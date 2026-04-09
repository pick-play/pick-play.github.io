import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conversor de Divisas - Tipos de Cambio en Tiempo Real | PickPlay",
  description:
    "Convierte entre 20 divisas incluyendo USD, EUR, KRW, JPY, CNY y GBP con tipos de cambio en tiempo real. Conversor de divisas gratuito con resultados instantáneos.",
  keywords: [
    "conversor de divisas",
    "tipo de cambio",
    "calculadora de divisas",
    "cambio de moneda",
    "tipo de cambio en tiempo real",
    "dólar a won",
    "euro a won",
    "calculadora forex",
    "divisas en línea",
    "conversión de moneda",
  ],
  openGraph: {
    title: "Conversor de Divisas - Tipos de Cambio en Tiempo Real | PickPlay",
    description:
      "Convierte entre 20 divisas con tipos de cambio en tiempo real. Herramienta gratuita.",
    url: "https://pick-play.github.io/es/currency-converter/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - Conversor de Divisas",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/currency-converter/",
    languages: {
      "x-default": "https://pick-play.github.io/currency-converter/",
      ko: "https://pick-play.github.io/currency-converter/",
      en: "https://pick-play.github.io/en/currency-converter/",
      ja: "https://pick-play.github.io/jp/currency-converter/",
      "zh-CN": "https://pick-play.github.io/cn/currency-converter/",
      es: "https://pick-play.github.io/es/currency-converter/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Conversor de Divisas",
      description:
        "Convierte entre 20 divisas con tipos de cambio en tiempo real. Herramienta gratuita en línea.",
      url: "https://pick-play.github.io/es/currency-converter/",
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
          name: "Conversor de Divisas",
          item: "https://pick-play.github.io/es/currency-converter/",
        },
      ],
    },
  ],
};

export default function CurrencyConverterEsLayout({
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
