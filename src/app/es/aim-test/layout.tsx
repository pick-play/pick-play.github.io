import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrenador de Puntería - Test de Precisión del Ratón | PickPlay",
  description:
    "Prueba y entrena tu precisión de ratón y velocidad de reacción con un entrenador de puntería de 30 segundos. Tres niveles de dificultad con estadísticas detalladas.",
  keywords: [
    "entrenador de puntería",
    "test de puntería",
    "precisión del ratón",
    "test de velocidad de reacción",
    "entrenamiento de clic",
    "práctica de puntería FPS",
    "entrenamiento de ratón",
    "mejorar puntería",
    "precisión de clic",
  ],
  openGraph: {
    title: "Entrenador de Puntería - Test de Precisión del Ratón",
    description:
      "Entrena tu precisión de ratón y velocidad de reacción con un entrenador de 30 segundos. Tres niveles de dificultad y estadísticas detalladas.",
    url: "https://pick-play.github.io/es/aim-test/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - Entrenador de Puntería",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/aim-test/",
    languages: {
      "x-default": "https://pick-play.github.io/aim-test/",
      ko: "https://pick-play.github.io/aim-test/",
      en: "https://pick-play.github.io/en/aim-test/",
      ja: "https://pick-play.github.io/jp/aim-test/",
      "zh-CN": "https://pick-play.github.io/cn/aim-test/",
      es: "https://pick-play.github.io/es/aim-test/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Entrenador de Puntería - Test de Precisión del Ratón",
      url: "https://pick-play.github.io/es/aim-test/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      description:
        "Entrenador de puntería de 30 segundos para probar la precisión del ratón y la velocidad de reacción. Tres niveles de dificultad con estadísticas de tasa de acierto y tiempo de reacción.",
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
          name: "Entrenador de Puntería",
          item: "https://pick-play.github.io/es/aim-test/",
        },
      ],
    },
  ],
};

export default function AimTestEsLayout({
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
