import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juego de Escalera - Emparejamiento Aleatorio",
  description:
    "¿Quién será elegido? ¡Animación emocionante de seguimiento de rutas en el juego de escalera! Emparejamiento aleatorio y justo.",
  keywords: [
    "juego de escalera",
    "emparejamiento aleatorio",
    "escalera aleatoria",
    "ghost leg",
    "amida kuji",
    "sorteo con escalera",
    "decidir con escalera",
    "juego de líneas",
  ],
  openGraph: {
    title: "Juego de Escalera - Emparejamiento Aleatorio con Animación",
    description:
      "¿Quién será el elegido? Emocionante animación de seguimiento de rutas en el juego de escalera.",
    url: "https://pick-play.github.io/es/ladder",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Juego de Escalera" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/ladder",
    languages: {
      "x-default": "https://pick-play.github.io/ladder",
      "ko": "https://pick-play.github.io/ladder",
      en: "https://pick-play.github.io/en/ladder",
      ja: "https://pick-play.github.io/jp/ladder",
      "zh-CN": "https://pick-play.github.io/cn/ladder",
      es: "https://pick-play.github.io/es/ladder",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Juego de Escalera - Emparejamiento Aleatorio",
      url: "https://pick-play.github.io/es/ladder",
      applicationCategory: "EntertainmentApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Emparejamiento aleatorio con animación emocionante de seguimiento de rutas.",
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pick-play.github.io/es" },
        { "@type": "ListItem", position: 2, name: "Juego de Escalera", item: "https://pick-play.github.io/es/ladder" },
      ],
    },
  ],
};

export default function LadderEsLayout({ children }: { children: React.ReactNode }) {
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
