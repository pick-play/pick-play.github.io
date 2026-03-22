import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "PickPlay - Qué Comer | Juego del Mentiroso | Equipos | Citas",
    template: "%s | PickPlay",
  },
  description:
    "¿Qué comer? Juego del mentiroso, formador de equipos, rutas de cita y más. ¡Decisiones divertidas y fáciles! PickPlay",
  keywords: [
    "qué comer",
    "juego del mentiroso",
    "formar equipos",
    "dividir cuenta",
    "ruta de cita",
    "juegos de fiesta",
    "recomendación de comida",
  ],
  openGraph: {
    title: "PickPlay - Decisiones Divertidas y Fáciles",
    description:
      "¿Qué comer? Juego del mentiroso, formar equipos, rutas de cita - todo en un solo lugar.",
    type: "website",
    locale: "es_ES",
    url: "https://pick-play.github.io/es",
    siteName: "PickPlay",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - Herramientas de estilo de vida",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es",
    languages: {
      "x-default": "https://pick-play.github.io",
      "ko": "https://pick-play.github.io",
      en: "https://pick-play.github.io/en",
      ja: "https://pick-play.github.io/jp",
      "zh-CN": "https://pick-play.github.io/cn",
      es: "https://pick-play.github.io/es",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      url: "https://pick-play.github.io/es",
      name: "PickPlay",
      publisher: { "@id": "https://pick-play.github.io/#organization" },
      inLanguage: "es",
    },
  ],
};

export default function EsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="es">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}
