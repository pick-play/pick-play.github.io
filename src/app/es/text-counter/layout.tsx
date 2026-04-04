import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contador de Texto - Contador de Caracteres y Palabras en Tiempo Real",
  description:
    "Cuenta caracteres, palabras, oraciones, párrafos y bytes en tiempo real. Incluye análisis de densidad de palabras clave y tiempo estimado de lectura.",
  keywords: [
    "contador de texto",
    "contador de caracteres",
    "contador de palabras",
    "contador de bytes",
    "contar caracteres online",
    "herramienta contador texto",
    "contador palabras online",
  ],
  openGraph: {
    title: "Contador de Texto - Contador de Caracteres y Palabras en Tiempo Real",
    description:
      "Cuenta caracteres, palabras y bytes en tiempo real con análisis de densidad y tiempo de lectura.",
    url: "https://pick-play.github.io/es/text-counter/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/text-counter/",
    languages: {
      "x-default": "https://pick-play.github.io/text-counter/",
      ko: "https://pick-play.github.io/text-counter/",
      en: "https://pick-play.github.io/en/text-counter/",
      ja: "https://pick-play.github.io/jp/text-counter/",
      "zh-CN": "https://pick-play.github.io/cn/text-counter/",
      es: "https://pick-play.github.io/es/text-counter/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Contador de Texto",
      description:
        "Contador en tiempo real de caracteres, palabras, oraciones, párrafos y bytes con análisis de densidad de palabras clave.",
      url: "https://pick-play.github.io/es/text-counter/",
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
          name: "Contador de Texto",
          item: "https://pick-play.github.io/es/text-counter/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cómo se usa el contador de texto?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Escribe o pega tu texto en el cuadro de entrada. Los caracteres, palabras, oraciones, párrafos y bytes se cuentan automáticamente en tiempo real.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuál es la diferencia entre caracteres con y sin espacios?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Los caracteres con espacios incluyen todos los espacios en blanco (espacios, tabulaciones, saltos de línea), mientras que los caracteres sin espacios solo cuentan los caracteres que no son espacios.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo se calcula el número de bytes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Los bytes se calculan usando codificación UTF-8. Los caracteres ASCII (letras, dígitos) usan 1 byte, mientras que caracteres especiales o de otros idiomas pueden usar 2 o 3 bytes.",
          },
        },
      ],
    },
  ],
};

export default function TextCounterEsLayout({
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
