import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sorteo - Selección Aleatoria",
  description:
    "¡Sorteo aleatorio completamente justo con revelaciones dramáticas! Voltea las cartas y descubre quién es el ganador.",
  keywords: [
    "sorteo aleatorio",
    "sorteo online",
    "selección aleatoria",
    "lotería online",
    "elegir ganador",
    "sorteo justo",
    "voltear carta",
    "selección al azar",
  ],
  openGraph: {
    title: "Sorteo - Selección Aleatoria con Animación Dramática",
    description:
      "¡Sorteo aleatorio justo con revelaciones dramáticas! Voltea las cartas y descubre al ganador.",
    url: "https://pick-play.github.io/es/draw/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Sorteo" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/draw/",
    languages: {
      "x-default": "https://pick-play.github.io/draw/",
      "ko": "https://pick-play.github.io/draw/",
      en: "https://pick-play.github.io/en/draw/",
      ja: "https://pick-play.github.io/jp/draw/",
      "zh-CN": "https://pick-play.github.io/cn/draw/",
      es: "https://pick-play.github.io/es/draw/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Sorteo - Selección Aleatoria",
      url: "https://pick-play.github.io/es/draw/",
      applicationCategory: "EntertainmentApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Sorteo aleatorio justo con revelaciones dramáticas de cartas.",
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pick-play.github.io/es/" },
        { "@type": "ListItem", position: 2, name: "Sorteo", item: "https://pick-play.github.io/es/draw/" },
      ],
    },
  ],
};

export default function DrawEsLayout({ children }: { children: React.ReactNode }) {
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
