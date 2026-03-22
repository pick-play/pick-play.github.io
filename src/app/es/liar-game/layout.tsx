import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juego del Mentiroso - Juego de Fiesta",
  description:
    "¡Encuentra al mentiroso entre tus amigos! El juego de fiesta definitivo con 8 temas diferentes. ¿Quién está mintiendo?",
  keywords: [
    "juego del mentiroso",
    "liar game",
    "juego de fiesta",
    "juego para grupos",
    "juego de deducción",
    "encontrar al mentiroso",
    "juego con amigos",
    "juego de rol",
  ],
  openGraph: {
    title: "Juego del Mentiroso - ¡Encuentra al Impostol!",
    description:
      "¡Encuentra al mentiroso entre tus amigos! El juego de fiesta definitivo con 8 temas diferentes.",
    url: "https://pick-play.github.io/es/liar-game",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Juego del Mentiroso" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/liar-game",
    languages: {
      "x-default": "https://pick-play.github.io/liar-game",
      "ko": "https://pick-play.github.io/liar-game",
      en: "https://pick-play.github.io/en/liar-game",
      ja: "https://pick-play.github.io/jp/liar-game",
      "zh-CN": "https://pick-play.github.io/cn/liar-game",
      es: "https://pick-play.github.io/es/liar-game",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Juego del Mentiroso - Juego de Fiesta",
      url: "https://pick-play.github.io/es/liar-game",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Encuentra al mentiroso entre tus amigos. El juego de fiesta definitivo.",
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pick-play.github.io/es" },
        { "@type": "ListItem", position: 2, name: "Juego del Mentiroso", item: "https://pick-play.github.io/es/liar-game" },
      ],
    },
  ],
};

export default function LiarGameEsLayout({ children }: { children: React.ReactNode }) {
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
