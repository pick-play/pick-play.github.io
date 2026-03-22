import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test MBTI - 20 Preguntas",
  description:
    "Descubre tu tipo de personalidad MBTI y compatibilidad en solo 20 preguntas. Los 16 tipos explicados en español.",
  keywords: [
    "test MBTI",
    "MBTI en español",
    "tipo de personalidad",
    "test de personalidad MBTI",
    "16 tipos de personalidad",
    "MBTI gratis",
    "test psicológico",
    "compatibilidad MBTI",
    "INFP ENFJ INTJ",
  ],
  openGraph: {
    title: "Test MBTI - Descubre tu Tipo de Personalidad en 20 Preguntas",
    description:
      "Descubre tu tipo MBTI y compatibilidad con solo 20 preguntas. Los 16 tipos de personalidad en español.",
    url: "https://pick-play.github.io/es/mbti",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Test MBTI" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/mbti",
    languages: {
      "x-default": "https://pick-play.github.io/mbti",
      "ko": "https://pick-play.github.io/mbti",
      en: "https://pick-play.github.io/en/mbti",
      ja: "https://pick-play.github.io/jp/mbti",
      "zh-CN": "https://pick-play.github.io/cn/mbti",
      es: "https://pick-play.github.io/es/mbti",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Test MBTI - 20 Preguntas",
      url: "https://pick-play.github.io/es/mbti",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Descubre tu tipo de personalidad MBTI y compatibilidad en 20 preguntas.",
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pick-play.github.io/es" },
        { "@type": "ListItem", position: 2, name: "Test MBTI", item: "https://pick-play.github.io/es/mbti" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Qué es el MBTI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El MBTI (Myers-Briggs Type Indicator) es un sistema de clasificación de personalidad que divide a las personas en 16 tipos basados en 4 dimensiones: Extraversión/Introversión, Sensación/Intuición, Pensamiento/Sentimiento, y Juicio/Percepción.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuánto tiempo toma el test MBTI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nuestro test MBTI consta de solo 20 preguntas y puede completarse en aproximadamente 3-5 minutos.",
          },
        },
      ],
    },
  ],
};

export default function MbtiEsLayout({ children }: { children: React.ReactNode }) {
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
