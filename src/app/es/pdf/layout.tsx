import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Herramientas PDF - Unir, Dividir, Convertir",
  description:
    "Une, divide, convierte a JPG, comprime PDFs - todo en tu navegador de forma segura y gratuita. Sin necesidad de instalar software.",
  keywords: [
    "unir PDF",
    "dividir PDF",
    "convertir PDF a JPG",
    "comprimir PDF",
    "herramientas PDF",
    "editor PDF online",
    "PDF gratuito",
    "combinar PDF",
    "reducir tamaño PDF",
  ],
  openGraph: {
    title: "Herramientas PDF - Unir, Dividir, Convertir y Comprimir",
    description:
      "Une, divide, convierte a JPG y comprime PDFs directamente en tu navegador. Gratis y seguro.",
    url: "https://pick-play.github.io/es/pdf",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Herramientas PDF" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/pdf",
    languages: {
      "x-default": "https://pick-play.github.io/pdf",
      "ko": "https://pick-play.github.io/pdf",
      en: "https://pick-play.github.io/en/pdf",
      ja: "https://pick-play.github.io/jp/pdf",
      "zh-CN": "https://pick-play.github.io/cn/pdf",
      es: "https://pick-play.github.io/es/pdf",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Herramientas PDF - Unir, Dividir, Convertir",
      url: "https://pick-play.github.io/es/pdf",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Une, divide, convierte a JPG, comprime PDFs - todo en tu navegador.",
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pick-play.github.io/es" },
        { "@type": "ListItem", position: 2, name: "Herramientas PDF", item: "https://pick-play.github.io/es/pdf" },
      ],
    },
  ],
};

export default function PdfEsLayout({ children }: { children: React.ReactNode }) {
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
