import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formar Equipos - Grupos Aleatorios",
  description:
    "¡Divide en equipos justos con animaciones emocionantes! Formador de equipos aleatorio para grupos de cualquier tamaño.",
  keywords: [
    "formar equipos",
    "dividir en equipos",
    "equipos aleatorios",
    "formador de grupos",
    "dividir grupo",
    "sorteo de equipos",
    "hacer equipos",
    "grupos aleatorios",
  ],
  openGraph: {
    title: "Formar Equipos - División Aleatoria y Justa",
    description:
      "Divide en equipos de forma aleatoria y justa. ¡Con animaciones llenas de emoción para cualquier tamaño de grupo!",
    url: "https://pick-play.github.io/es/random-team",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Formar Equipos" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/random-team",
    languages: {
      "x-default": "https://pick-play.github.io/random-team",
      "ko": "https://pick-play.github.io/random-team",
      en: "https://pick-play.github.io/en/random-team",
      ja: "https://pick-play.github.io/jp/random-team",
      "zh-CN": "https://pick-play.github.io/cn/random-team",
      es: "https://pick-play.github.io/es/random-team",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Formar Equipos - Grupos Aleatorios",
      url: "https://pick-play.github.io/es/random-team",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Divide en equipos justos con animaciones emocionantes.",
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pick-play.github.io/es" },
        { "@type": "ListItem", position: 2, name: "Formar Equipos", item: "https://pick-play.github.io/es/random-team" },
      ],
    },
  ],
};

export default function RandomTeamEsLayout({ children }: { children: React.ReactNode }) {
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
