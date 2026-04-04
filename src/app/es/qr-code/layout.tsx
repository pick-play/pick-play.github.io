import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generador de Código QR - Crear QR Gratis Online",
  description:
    "Convierte cualquier URL o texto en un código QR al instante. Personaliza el tamaño y los colores, y descarga tu código QR gratis.",
  keywords: [
    "generador de código QR",
    "crear código QR",
    "código QR gratis",
    "URL a código QR",
    "hacer código QR",
    "descargar código QR",
  ],
  openGraph: {
    title: "Generador de Código QR - Crear QR Gratis Online",
    description:
      "Convierte cualquier URL o texto en un código QR al instante y descárgalo gratis.",
    url: "https://pick-play.github.io/es/qr-code/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/qr-code/",
    languages: {
      "x-default": "https://pick-play.github.io/qr-code/",
      ko: "https://pick-play.github.io/qr-code/",
      en: "https://pick-play.github.io/en/qr-code/",
      ja: "https://pick-play.github.io/jp/qr-code/",
      "zh-CN": "https://pick-play.github.io/cn/qr-code/",
      es: "https://pick-play.github.io/es/qr-code/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Generador de Código QR",
      description:
        "Convierte URLs y texto en códigos QR al instante. Personaliza tamaño y colores, luego descarga gratis.",
      url: "https://pick-play.github.io/es/qr-code/",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      inLanguage: "es",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: "https://pick-play.github.io/es/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Generador de Código QR",
          item: "https://pick-play.github.io/es/qr-code/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Qué es un código QR?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Un código QR (Quick Response Code) es un código de barras bidimensional que los smartphones pueden escanear para acceder instantáneamente a URLs, texto, contactos y más.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo uso el código QR generado?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Haz clic en el botón de descarga para guardar la imagen y úsala libremente en tarjetas de visita, carteles o sitios web. Al escanearlo con un smartphone te lleva directamente al contenido.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué contenido puedo poner en un código QR?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Puedes codificar URLs de sitios web, texto plano, direcciones de correo electrónico, números de teléfono y más. El texto más corto genera un código QR más simple y fácil de escanear.",
          },
        },
      ],
    },
  ],
};

export default function QrCodeEsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
