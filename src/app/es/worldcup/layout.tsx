import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Torneo del Tipo Ideal - Torneo",
  description:
    "6 categorías, 96 candidatos. ¡Encuentra tu tipo ideal en un torneo de eliminación directa! ¿Quién ganará?",
  keywords: [
    "torneo del tipo ideal",
    "torneo de eliminación",
    "tipo ideal",
    "worldcup game",
    "ideal type worldcup",
    "torneo de preferencias",
    "juego de selección",
    "mi tipo ideal",
  ],
  openGraph: {
    title: "Torneo del Tipo Ideal - Torneo con 96 Candidatos",
    description:
      "6 categorías, 96 candidatos. ¡Encuentra tu tipo ideal a través de un emocionante torneo de eliminación!",
    url: "https://pick-play.github.io/es/worldcup/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Torneo del Tipo Ideal" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/worldcup/",
    languages: {
      "x-default": "https://pick-play.github.io/worldcup/",
      "ko": "https://pick-play.github.io/worldcup/",
      en: "https://pick-play.github.io/en/worldcup/",
      ja: "https://pick-play.github.io/jp/worldcup/",
      "zh-CN": "https://pick-play.github.io/cn/worldcup/",
      es: "https://pick-play.github.io/es/worldcup/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Torneo del Tipo Ideal - Torneo",
      url: "https://pick-play.github.io/es/worldcup/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "6 categorías, 96 candidatos. Encuentra tu tipo ideal en un torneo.",
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pick-play.github.io/es/" },
        { "@type": "ListItem", position: 2, name: "Torneo del Tipo Ideal", item: "https://pick-play.github.io/es/worldcup/" },
      ],
    },
  ],
};

export default function WorldcupEsLayout({ children }: { children: React.ReactNode }) {
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
