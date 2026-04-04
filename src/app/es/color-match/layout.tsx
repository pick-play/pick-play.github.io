import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juego de Combinar Colores - Test de Stroop | PickPlay",
  description:
    "¡Juega al test de Stroop combinando colores! Cuando el nombre de un color está escrito en otro color, ¿cuál reconoces primero? Pon a prueba tu concentración y velocidad de reacción. 30 segundos, 3 niveles de dificultad.",
  keywords: [
    "juego combinar colores",
    "test de stroop",
    "juego de concentración",
    "juego de colores",
    "test de reacción",
    "juego cognitivo",
    "entrenamiento cerebral",
    "quiz de colores",
    "efecto stroop",
    "test de atención",
  ],
  openGraph: {
    title: "Juego de Combinar Colores - Test de Stroop",
    description: "Cuando el nombre de un color está en otro color, ¿cuál identificas primero? ¡Test de concentración!",
    url: "https://pick-play.github.io/es/color-match/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - Combinar Colores Test de Stroop",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/color-match/",
    languages: {
      "x-default": "https://pick-play.github.io/color-match/",
      ko: "https://pick-play.github.io/color-match/",
      en: "https://pick-play.github.io/en/color-match/",
      ja: "https://pick-play.github.io/jp/color-match/",
      "zh-CN": "https://pick-play.github.io/cn/color-match/",
      es: "https://pick-play.github.io/es/color-match/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Juego de Combinar Colores - Test de Stroop",
      url: "https://pick-play.github.io/es/color-match/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      description:
        "Juego de combinación de colores basado en el test de Stroop. Dos modos: combinar el color de la fuente o el significado de la palabra. Tres niveles de dificultad para poner a prueba tu concentración.",
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
          name: "Juego de Combinar Colores",
          item: "https://pick-play.github.io/es/color-match/",
        },
      ],
    },
  ],
};

export default function ColorMatchEsLayout({
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
