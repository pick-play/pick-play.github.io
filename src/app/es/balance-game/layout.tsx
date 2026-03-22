import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Esto o Aquello - Juego de Equilibrio",
  description:
    "¡Esto vs aquello! Disfruta de varios temas de juego y descubre las preferencias de tus amigos con preguntas divertidas.",
  keywords: [
    "esto o aquello",
    "juego de equilibrio",
    "balance game",
    "preguntas dilema",
    "juego de dilemas",
    "esto vs aquello",
    "juego para grupos",
    "preguntas divertidas",
  ],
  openGraph: {
    title: "Esto o Aquello - Juego de Dilemas Divertidos",
    description:
      "¡Esto vs aquello! Más de 50 preguntas de dilemas para disfrutar con amigos y descubrir preferencias.",
    url: "https://pick-play.github.io/es/balance-game",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Esto o Aquello" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/balance-game",
    languages: {
      "x-default": "https://pick-play.github.io/balance-game",
      "ko": "https://pick-play.github.io/balance-game",
      en: "https://pick-play.github.io/en/balance-game",
      ja: "https://pick-play.github.io/jp/balance-game",
      "zh-CN": "https://pick-play.github.io/cn/balance-game",
      es: "https://pick-play.github.io/es/balance-game",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Esto o Aquello - Juego de Equilibrio",
      url: "https://pick-play.github.io/es/balance-game",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Esto vs aquello — juego de dilemas divertidos para grupos.",
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pick-play.github.io/es" },
        { "@type": "ListItem", position: 2, name: "Esto o Aquello", item: "https://pick-play.github.io/es/balance-game" },
      ],
    },
  ],
};

export default function BalanceGameEsLayout({ children }: { children: React.ReactNode }) {
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
