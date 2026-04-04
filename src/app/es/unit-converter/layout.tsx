import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convertidor de Unidades - Longitud, Peso, Temperatura y más",
  description:
    "Convierte longitud, peso, temperatura, área, volumen, velocidad y datos al instante. cm a pulgadas, kg a libras, °C a °F y mucho más.",
  keywords: [
    "convertidor de unidades",
    "convertir longitud",
    "convertir peso",
    "convertir temperatura",
    "cm a pulgadas",
    "kg a libras",
    "celsius a fahrenheit",
    "convertidor online",
  ],
  openGraph: {
    title: "Convertidor de Unidades - Longitud, Peso, Temperatura y más",
    description:
      "Convierte cm a pulgadas, kg a libras, °C a °F y docenas de unidades al instante.",
    url: "https://pick-play.github.io/es/unit-converter/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/unit-converter/",
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
      name: "Convertidor de Unidades",
      description:
        "Convierte en tiempo real unidades de longitud, peso, temperatura, área, volumen, velocidad y datos.",
      url: "https://pick-play.github.io/es/unit-converter/",
      applicationCategory: "UtilityApplication",
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
          name: "Convertidor de Unidades",
          item: "https://pick-play.github.io/es/unit-converter/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cómo se usa el convertidor de unidades?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Selecciona una categoría, elige las unidades de origen y destino, escribe un número y el resultado aparece al instante.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué categorías de unidades están disponibles?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Longitud (mm, cm, m, km, in, ft, yd, mi), Peso (mg, g, kg, oz, lb, ton), Temperatura (°C, °F, K), Área, Volumen, Velocidad y Datos.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué son los accesos rápidos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Los accesos rápidos permiten saltar con un clic a las conversiones más usadas como cm a pulgadas, kg a libras o °C a °F.",
          },
        },
      ],
    },
  ],
};

export default function UnitConverterEsLayout({
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
