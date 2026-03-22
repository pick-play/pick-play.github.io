import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Herramientas de Imagen - Convertir, Comprimir",
  description:
    "Convierte, comprime, redimensiona, recorta imágenes. Procesamiento por lotes para múltiples imágenes a la vez. Gratis y sin instalación.",
  keywords: [
    "convertir imagen",
    "comprimir imagen",
    "redimensionar imagen",
    "recortar imagen",
    "herramientas de imagen",
    "convertir PNG JPG",
    "compresión de imágenes",
    "editor de imágenes online",
    "procesar imágenes",
  ],
  openGraph: {
    title: "Herramientas de Imagen - Convertir, Comprimir, Redimensionar",
    description:
      "Convierte, comprime, redimensiona y recorta imágenes. Procesamiento múltiple de una sola vez.",
    url: "https://pick-play.github.io/es/image",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Herramientas de Imagen" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/image",
    languages: {
      "x-default": "https://pick-play.github.io/image",
      "ko": "https://pick-play.github.io/image",
      en: "https://pick-play.github.io/en/image",
      ja: "https://pick-play.github.io/jp/image",
      "zh-CN": "https://pick-play.github.io/cn/image",
      es: "https://pick-play.github.io/es/image",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Herramientas de Imagen - Convertir, Comprimir",
      url: "https://pick-play.github.io/es/image",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Convierte, comprime, redimensiona, recorta imágenes. Procesamiento por lotes.",
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pick-play.github.io/es" },
        { "@type": "ListItem", position: 2, name: "Herramientas de Imagen", item: "https://pick-play.github.io/es/image" },
      ],
    },
  ],
};

export default function ImageEsLayout({ children }: { children: React.ReactNode }) {
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
