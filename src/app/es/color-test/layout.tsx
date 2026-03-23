import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test de Color - Personalidad",
  description:
    "¿Qué color te representa? Test de personalidad por colores en 10 preguntas. Descubre tu color y lo que dice de ti.",
  keywords: [
    "test de color",
    "personalidad por colores",
    "qué color soy",
    "test de personalidad colores",
    "color de personalidad",
    "análisis de color",
    "test psicológico colores",
    "significado de los colores",
  ],
  openGraph: {
    title: "Test de Color - ¿Qué Color Representa tu Personalidad?",
    description:
      "Descubre qué color representa tu personalidad con solo 10 preguntas. 8 colores con análisis detallado.",
    url: "https://pick-play.github.io/es/color-test/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Test de Color" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/color-test/",
    languages: {
      "x-default": "https://pick-play.github.io/color-test/",
      "ko": "https://pick-play.github.io/color-test/",
      en: "https://pick-play.github.io/en/color-test/",
      ja: "https://pick-play.github.io/jp/color-test/",
      "zh-CN": "https://pick-play.github.io/cn/color-test/",
      es: "https://pick-play.github.io/es/color-test/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Test de Color - Personalidad",
      url: "https://pick-play.github.io/es/color-test/",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Test de personalidad por colores en 10 preguntas. 8 colores posibles.",
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pick-play.github.io/es/" },
        { "@type": "ListItem", position: 2, name: "Test de Color", item: "https://pick-play.github.io/es/color-test/" },
      ],
    },
  ],
};

export default function ColorTestEsLayout({ children }: { children: React.ReactNode }) {
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
