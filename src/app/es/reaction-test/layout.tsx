import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test de Velocidad de Reacción - ¿Qué tan rápido eres? | PickPlay",
  description:
    "¡Haz clic en cuanto se ponga verde! Mide tu tiempo de reacción en milisegundos y compáralo con el humano promedio (215ms). Registra tu mejor puntuación y el promedio de tus últimos 5 intentos.",
  keywords: [
    "test de velocidad de reacción",
    "tiempo de reacción",
    "test de reflejos",
    "velocidad de reacción",
    "juego de reflejos",
    "tiempo de reacción humano",
    "test clic",
  ],
  openGraph: {
    title: "Test de Velocidad de Reacción | PickPlay",
    description: "¡Haz clic cuando se ponga verde! Mide tu reacción y compárala con el humano promedio (215ms).",
    url: "https://pick-play.github.io/es/reaction-test/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - Test de Velocidad de Reacción",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/reaction-test/",
    languages: {
      "x-default": "https://pick-play.github.io/reaction-test/",
      ko: "https://pick-play.github.io/reaction-test/",
      en: "https://pick-play.github.io/en/reaction-test/",
      ja: "https://pick-play.github.io/jp/reaction-test/",
      "zh-CN": "https://pick-play.github.io/cn/reaction-test/",
      es: "https://pick-play.github.io/es/reaction-test/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Test de Velocidad de Reacción",
      url: "https://pick-play.github.io/es/reaction-test/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Haz clic en cuanto la pantalla se ponga verde para medir tu tiempo de reacción en milisegundos. Compárate con el humano promedio y supera tu mejor marca.",
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
          name: "Test de Velocidad de Reacción",
          item: "https://pick-play.github.io/es/reaction-test/",
        },
      ],
    },
  ],
};

export default function ReactionTestEsLayout({
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
