import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juego de Memoria - Voltea y Empareja",
  description:
    "Juego de memoria gratuito en línea. Voltea las cartas y encuentra los pares. Tres niveles de dificultad con puntuación de estrellas y registro de mejor tiempo.",
  keywords: [
    "juego de memoria",
    "voltear cartas",
    "juego de pares",
    "juego mental",
    "juego online",
    "juego gratis",
    "rompecabezas",
  ],
  openGraph: {
    title: "Juego de Memoria - Voltea y Empareja | PickPlay",
    description: "Juego de memoria gratuito en línea. Voltea las cartas y encuentra los pares. 3 niveles de dificultad.",
    url: "https://pick-play.github.io/es/memory-game/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Juego de Memoria" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/memory-game/",
    languages: {
      "x-default": "https://pick-play.github.io/memory-game/",
      ko: "https://pick-play.github.io/memory-game/",
      en: "https://pick-play.github.io/en/memory-game/",
      ja: "https://pick-play.github.io/jp/memory-game/",
      "zh-CN": "https://pick-play.github.io/cn/memory-game/",
      es: "https://pick-play.github.io/es/memory-game/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Juego de Memoria - Voltea y Empareja",
      description:
        "Juego de memoria gratuito en línea. Voltea las cartas y encuentra los pares. Tres niveles de dificultad con puntuación de estrellas.",
      url: "https://pick-play.github.io/es/memory-game/",
      applicationCategory: "GameApplication",
      genre: "Puzzle",
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
          name: "Juego de Memoria",
          item: "https://pick-play.github.io/es/memory-game/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cómo se juega al juego de memoria?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Voltea dos cartas a la vez para encontrar pares iguales. ¡Empareja todas para ganar! Cuantos menos movimientos uses, mayor será tu puntuación de estrellas.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo se determina la puntuación de estrellas?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Menos movimientos equivale a más estrellas. Fácil: 12 o menos movimientos para 3 estrellas, Medio: 16 o menos, Difícil: 24 o menos.",
          },
        },
        {
          "@type": "Question",
          name: "¿Dónde se guarda el mejor tiempo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Los mejores tiempos se guardan en el almacenamiento local de tu navegador. Borrar los datos del navegador los reiniciará.",
          },
        },
      ],
    },
  ],
};

export default function MemoryGameEsLayout({ children }: { children: React.ReactNode }) {
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
