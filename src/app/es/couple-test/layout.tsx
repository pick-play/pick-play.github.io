import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compatibilidad de Pareja - Por Nombres",
  description:
    "¡Prueba tu compatibilidad de pareja por nombre! Análisis detallado en 5 categorías. ¿Cuánto se complementan?",
  keywords: [
    "compatibilidad de pareja",
    "test de pareja",
    "compatibilidad por nombre",
    "amor por nombre",
    "prueba de compatibilidad",
    "test de amor",
    "compatibilidad romántica",
    "test para parejas",
  ],
  openGraph: {
    title: "Compatibilidad de Pareja - Test por Nombres",
    description:
      "Descubre tu compatibilidad de pareja por nombre. Análisis completo en 5 categorías diferentes.",
    url: "https://pick-play.github.io/es/couple-test",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Compatibilidad de Pareja" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/couple-test",
    languages: {
      "x-default": "https://pick-play.github.io/couple-test",
      "ko": "https://pick-play.github.io/couple-test",
      en: "https://pick-play.github.io/en/couple-test",
      ja: "https://pick-play.github.io/jp/couple-test",
      "zh-CN": "https://pick-play.github.io/cn/couple-test",
      es: "https://pick-play.github.io/es/couple-test",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Compatibilidad de Pareja - Por Nombres",
      url: "https://pick-play.github.io/es/couple-test",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Prueba tu compatibilidad de pareja por nombre. Análisis en 5 categorías.",
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pick-play.github.io/es" },
        { "@type": "ListItem", position: 2, name: "Compatibilidad de Pareja", item: "https://pick-play.github.io/es/couple-test" },
      ],
    },
  ],
};

export default function CoupleTestEsLayout({ children }: { children: React.ReactNode }) {
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
