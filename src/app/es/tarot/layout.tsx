import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarot Sí o No - Lectura de Cartas",
  description:
    "¡Pregunta a las cartas del tarot! 22 Arcanos Mayores responden tus dudas con un sí o un no. Lectura de tarot online gratuita.",
  keywords: [
    "tarot sí o no",
    "tarot online",
    "lectura de tarot",
    "cartas del tarot",
    "arcanos mayores",
    "tarot gratis",
    "tirada de tarot",
    "oráculo online",
    "consultar el tarot",
  ],
  openGraph: {
    title: "Tarot Sí o No - 22 Arcanos Mayores Responden",
    description:
      "¿Tienes una duda? Las 22 cartas de los Arcanos Mayores del tarot responden con sí o no.",
    url: "https://pick-play.github.io/es/tarot",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Tarot Sí o No" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/tarot",
    languages: {
      "x-default": "https://pick-play.github.io/tarot",
      "ko": "https://pick-play.github.io/tarot",
      en: "https://pick-play.github.io/en/tarot",
      ja: "https://pick-play.github.io/jp/tarot",
      "zh-CN": "https://pick-play.github.io/cn/tarot",
      es: "https://pick-play.github.io/es/tarot",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tarot Sí o No - Lectura de Cartas",
      url: "https://pick-play.github.io/es/tarot",
      applicationCategory: "EntertainmentApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "22 Arcanos Mayores del tarot responden tus preguntas con sí o no.",
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pick-play.github.io/es" },
        { "@type": "ListItem", position: 2, name: "Tarot Sí o No", item: "https://pick-play.github.io/es/tarot" },
      ],
    },
  ],
};

export default function TarotEsLayout({ children }: { children: React.ReactNode }) {
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
