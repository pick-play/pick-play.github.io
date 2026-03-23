import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz de Palabras - Juego de Letras",
  description:
    "¡Adivina la palabra por las iniciales! Con pistas y temporizador para más emoción. Más de 100 palabras para adivinar.",
  keywords: [
    "quiz de palabras",
    "adivina la palabra",
    "juego de letras",
    "juego de iniciales",
    "quiz de vocabulario",
    "juego de palabras",
    "trivia de palabras",
    "juego educativo",
  ],
  openGraph: {
    title: "Quiz de Palabras - Adivina por las Iniciales",
    description:
      "¡Adivina la palabra a partir de las iniciales! Con pistas y temporizador. Más de 100 palabras.",
    url: "https://pick-play.github.io/es/chosung-quiz/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Quiz de Palabras" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/chosung-quiz/",
    languages: {
      "x-default": "https://pick-play.github.io/chosung-quiz/",
      "ko": "https://pick-play.github.io/chosung-quiz/",
      en: "https://pick-play.github.io/en/chosung-quiz/",
      ja: "https://pick-play.github.io/jp/chosung-quiz/",
      "zh-CN": "https://pick-play.github.io/cn/chosung-quiz/",
      es: "https://pick-play.github.io/es/chosung-quiz/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Quiz de Palabras - Juego de Letras",
      url: "https://pick-play.github.io/es/chosung-quiz/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Adivina la palabra por las iniciales con pistas y temporizador.",
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pick-play.github.io/es/" },
        { "@type": "ListItem", position: 2, name: "Quiz de Palabras", item: "https://pick-play.github.io/es/chosung-quiz/" },
      ],
    },
  ],
};

export default function ChosungQuizEsLayout({ children }: { children: React.ReactNode }) {
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
