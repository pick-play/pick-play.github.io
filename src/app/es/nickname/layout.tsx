import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generador de Apodos - Nombres Aleatorios",
  description:
    "Genera apodos aleatorios en 6 estilos diferentes: tierno, genial, gracioso, épico, misterioso y más.",
  keywords: [
    "generador de apodos",
    "apodos aleatorios",
    "nombres de usuario",
    "nickname aleatorio",
    "crear apodo",
    "nombre online",
    "apodo para juegos",
    "username generator",
  ],
  openGraph: {
    title: "Generador de Apodos - Nombres Aleatorios en 6 Estilos",
    description:
      "Genera apodos únicos y creativos en 6 estilos: tierno, genial, gracioso, épico, misterioso y más.",
    url: "https://pick-play.github.io/es/nickname/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Generador de Apodos" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/nickname/",
    languages: {
      "x-default": "https://pick-play.github.io/nickname/",
      "ko": "https://pick-play.github.io/nickname/",
      en: "https://pick-play.github.io/en/nickname/",
      ja: "https://pick-play.github.io/jp/nickname/",
      "zh-CN": "https://pick-play.github.io/cn/nickname/",
      es: "https://pick-play.github.io/es/nickname/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Generador de Apodos - Nombres Aleatorios",
      url: "https://pick-play.github.io/es/nickname/",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Genera apodos aleatorios en 6 estilos diferentes.",
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pick-play.github.io/es/" },
        { "@type": "ListItem", position: 2, name: "Generador de Apodos", item: "https://pick-play.github.io/es/nickname/" },
      ],
    },
  ],
};

export default function NicknameEsLayout({ children }: { children: React.ReactNode }) {
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
