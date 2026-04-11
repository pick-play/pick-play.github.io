import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test de Oído Absoluto - ¿Qué tan bueno es tu oído musical? | PickPlay",
  description:
    "Escucha tonos de onda sinusoidal pura e identifica las notas en un teclado de piano. Test de oído absoluto con 4 niveles de dificultad: desde teclas blancas hasta 3 octavas.",
  keywords: [
    "test de oído absoluto",
    "oído absoluto",
    "oído perfecto",
    "entrenamiento auditivo",
    "identificación de notas",
    "test de habilidad musical",
    "reconocimiento de notas",
    "oído relativo",
    "perfect pitch test",
    "quiz de piano",
  ],
  openGraph: {
    title: "Test de Oído Absoluto - ¿Qué tan bueno es tu oído musical?",
    description:
      "Escucha tonos puros e identifica notas en un teclado de piano. 4 niveles de dificultad para poner a prueba tu oído absoluto.",
    url: "https://pick-play.github.io/es/pitch-test/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - Test de Oído Absoluto",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/pitch-test/",
    languages: {
      "x-default": "https://pick-play.github.io/pitch-test/",
      ko: "https://pick-play.github.io/pitch-test/",
      en: "https://pick-play.github.io/en/pitch-test/",
      ja: "https://pick-play.github.io/jp/pitch-test/",
      "zh-CN": "https://pick-play.github.io/cn/pitch-test/",
      es: "https://pick-play.github.io/es/pitch-test/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Test de Oído Absoluto - ¿Qué tan bueno es tu oído musical?",
      url: "https://pick-play.github.io/es/pitch-test/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      description:
        "Escucha tonos de onda sinusoidal pura e identifica las notas en un teclado de piano. 4 niveles de dificultad desde teclas blancas hasta 3 octavas completas.",
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
          name: "Test de Oído Absoluto",
          item: "https://pick-play.github.io/es/pitch-test/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Qué es el oído absoluto?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El oído absoluto (perfect pitch) es la capacidad de identificar el nombre de cualquier nota musical sin necesidad de una nota de referencia. Se estima que lo posee el 0,01–1% de la población.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo funciona el test de oído absoluto?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Se generan tonos de onda sinusoidal pura usando la Web Audio API. Tras escuchar, haz clic en la tecla correspondiente del teclado. El modo Fácil usa solo teclas blancas (7 notas) y el Experto abarca 3 octavas (36 notas).",
          },
        },
      ],
    },
  ],
};

export default function PitchTestEsLayout({
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
