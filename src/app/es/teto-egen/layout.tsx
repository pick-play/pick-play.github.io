import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test de Personalidad - Teto o Egen",
  description:
    "¿Eres tipo Teto o Egen? Descúbrelo con este test de personalidad. Análisis detallado de tu carácter y compatibilidad.",
  keywords: [
    "test teto egen",
    "teto vs egen",
    "test de personalidad",
    "análisis de carácter",
    "tipo de personalidad",
    "test psicológico",
    "test online",
    "qué tipo soy",
  ],
  openGraph: {
    title: "Test Teto vs Egen - ¿Cuál Eres Tú?",
    description:
      "¿Eres tipo Teto o Egen? Descúbrelo con este divertido test de análisis de personalidad.",
    url: "https://pick-play.github.io/es/teto-egen/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Test Teto vs Egen" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/teto-egen/",
    languages: {
      "x-default": "https://pick-play.github.io/teto-egen/",
      "ko": "https://pick-play.github.io/teto-egen/",
      en: "https://pick-play.github.io/en/teto-egen/",
      ja: "https://pick-play.github.io/jp/teto-egen/",
      "zh-CN": "https://pick-play.github.io/cn/teto-egen/",
      es: "https://pick-play.github.io/es/teto-egen/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Test de Personalidad - Teto o Egen",
      url: "https://pick-play.github.io/es/teto-egen/",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "¿Eres tipo Teto o Egen? Descúbrelo con este test de personalidad.",
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pick-play.github.io/es/" },
        { "@type": "ListItem", position: 2, name: "Test Teto vs Egen", item: "https://pick-play.github.io/es/teto-egen/" },
      ],
    },
  ],
};

export default function TetoEgenEsLayout({ children }: { children: React.ReactNode }) {
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
