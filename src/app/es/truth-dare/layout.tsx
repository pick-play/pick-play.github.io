import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verdad o Reto - Juego de Fiesta",
  description:
    "¡392 preguntas y misiones! Juego esencial de fiesta con niveles de intensidad. ¿Verdad o reto? ¡Tú decides!",
  keywords: [
    "verdad o reto",
    "truth or dare",
    "juego de fiesta",
    "preguntas verdad o reto",
    "retos divertidos",
    "juego grupal",
    "juego de preguntas",
    "preguntas atrevidas",
  ],
  openGraph: {
    title: "Verdad o Reto - 392 Preguntas y Misiones",
    description:
      "El juego de fiesta esencial con 392 preguntas y misiones. Niveles de intensidad para todos.",
    url: "https://pick-play.github.io/es/truth-dare/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Verdad o Reto" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/truth-dare/",
    languages: {
      "x-default": "https://pick-play.github.io/truth-dare/",
      "ko": "https://pick-play.github.io/truth-dare/",
      en: "https://pick-play.github.io/en/truth-dare/",
      ja: "https://pick-play.github.io/jp/truth-dare/",
      "zh-CN": "https://pick-play.github.io/cn/truth-dare/",
      es: "https://pick-play.github.io/es/truth-dare/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Verdad o Reto - Juego de Fiesta",
      url: "https://pick-play.github.io/es/truth-dare/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "392 preguntas y misiones de verdad o reto con niveles de intensidad.",
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pick-play.github.io/es/" },
        { "@type": "ListItem", position: 2, name: "Verdad o Reto", item: "https://pick-play.github.io/es/truth-dare/" },
      ],
    },
  ],
};

export default function TruthDareEsLayout({ children }: { children: React.ReactNode }) {
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
