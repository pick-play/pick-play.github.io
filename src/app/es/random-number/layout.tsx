import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generador de Números Aleatorios - Elige Números al Azar",
  description:
    "Genera números aleatorios al instante. Ideal para lotería, dados, lanzamiento de moneda y rangos personalizados.",
  keywords: [
    "generador de números aleatorios",
    "número aleatorio",
    "generador de lotería",
    "tirar dado",
    "lanzar moneda",
    "número al azar",
    "randomizador de números",
    "selección aleatoria",
  ],
  openGraph: {
    title: "Generador de Números Aleatorios - Elige Números al Azar",
    description:
      "Genera números aleatorios al instante con presets de lotería, dado, moneda y rangos personalizados.",
    url: "https://pick-play.github.io/es/random-number/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/random-number/",
    languages: {
      "x-default": "https://pick-play.github.io/random-number/",
      ko: "https://pick-play.github.io/random-number/",
      en: "https://pick-play.github.io/en/random-number/",
      ja: "https://pick-play.github.io/jp/random-number/",
      "zh-CN": "https://pick-play.github.io/cn/random-number/",
      es: "https://pick-play.github.io/es/random-number/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Generador de Números Aleatorios",
      description:
        "Genera números aleatorios al instante. Presets para lotería, dado, moneda y rangos personalizados.",
      url: "https://pick-play.github.io/es/random-number/",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      inLanguage: "es",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
          name: "Generador de Números Aleatorios",
          item: "https://pick-play.github.io/es/random-number/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cómo genero números de lotería?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Haz clic en el preset 'Lotería' para configurar automáticamente el rango 1–45 con 6 números únicos. Luego presiona Generar.",
          },
        },
        {
          "@type": "Question",
          name: "¿Puedo generar números sin duplicados?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "¡Sí! Desactiva el toggle 'Permitir duplicados' para obtener números únicos. La cantidad no debe superar el tamaño del rango (máx - mín + 1).",
          },
        },
        {
          "@type": "Question",
          name: "¿Puedo ordenar los resultados?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "¡Sí! Usa las opciones de orden debajo de los resultados para ordenarlos de forma ascendente o descendente.",
          },
        },
      ],
    },
  ],
};

export default function RandomNumberEsLayout({
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
