import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asientos - Distribución Aleatoria",
  description:
    "Asigna asientos aleatoriamente para aulas, oficinas, salas de reuniones o cafés de estudio. Distribución justa y rápida.",
  keywords: [
    "asignación de asientos",
    "distribución de asientos",
    "asientos aleatorios",
    "plano de asientos",
    "asientos de clase",
    "asientos de oficina",
    "sorteo de asientos",
    "ordenar asientos",
  ],
  openGraph: {
    title: "Asientos - Distribución Aleatoria Justa",
    description:
      "Asigna asientos aleatoriamente para aulas, oficinas o cafés de estudio. Rápido y justo.",
    url: "https://pick-play.github.io/es/seat/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Asignación de Asientos" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/seat/",
    languages: {
      "x-default": "https://pick-play.github.io/seat/",
      "ko": "https://pick-play.github.io/seat/",
      en: "https://pick-play.github.io/en/seat/",
      ja: "https://pick-play.github.io/jp/seat/",
      "zh-CN": "https://pick-play.github.io/cn/seat/",
      es: "https://pick-play.github.io/es/seat/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Asientos - Distribución Aleatoria",
      url: "https://pick-play.github.io/es/seat/",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Asigna asientos aleatoriamente para aulas, oficinas o cafés de estudio.",
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pick-play.github.io/es/" },
        { "@type": "ListItem", position: 2, name: "Asientos", item: "https://pick-play.github.io/es/seat/" },
      ],
    },
  ],
};

export default function SeatEsLayout({ children }: { children: React.ReactNode }) {
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
