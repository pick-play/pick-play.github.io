import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ruleta Aleatoria - Girar y Decidir",
  description:
    "¿No puedes decidir? ¡Gira la ruleta y deja que el destino elija! Ruleta personalizable para cualquier decisión.",
  keywords: [
    "ruleta aleatoria",
    "ruleta de decisión",
    "girar ruleta",
    "elegir al azar",
    "decisión aleatoria",
    "ruleta personalizable",
    "ruleta online",
    "rueda de la fortuna",
  ],
  openGraph: {
    title: "Ruleta Aleatoria - ¡Gira y Decide!",
    description:
      "¿No puedes decidir qué hacer o quién va primero? ¡Gira la ruleta y deja que el destino elija!",
    url: "https://pick-play.github.io/es/roulette",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Ruleta Aleatoria" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/roulette",
    languages: {
      "x-default": "https://pick-play.github.io/roulette",
      "ko": "https://pick-play.github.io/roulette",
      en: "https://pick-play.github.io/en/roulette",
      ja: "https://pick-play.github.io/jp/roulette",
      "zh-CN": "https://pick-play.github.io/cn/roulette",
      es: "https://pick-play.github.io/es/roulette",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Ruleta Aleatoria - Girar y Decidir",
      url: "https://pick-play.github.io/es/roulette",
      applicationCategory: "EntertainmentApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Ruleta personalizable para tomar decisiones aleatorias de forma divertida.",
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pick-play.github.io/es" },
        { "@type": "ListItem", position: 2, name: "Ruleta Aleatoria", item: "https://pick-play.github.io/es/roulette" },
      ],
    },
  ],
};

export default function RouletteEsLayout({ children }: { children: React.ReactNode }) {
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
