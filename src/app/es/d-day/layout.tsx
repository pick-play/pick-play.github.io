import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora D-Day - Cuenta Regresiva",
  description:
    "Rastrea fechas importantes con la calculadora de cuenta regresiva. Exámenes, cumpleaños, aniversarios y cualquier evento especial.",
  keywords: [
    "calculadora d-day",
    "cuenta regresiva",
    "días para el evento",
    "días hasta la fecha",
    "calculadora de días",
    "aniversario cuenta regresiva",
    "cumpleaños cuenta regresiva",
    "contador de días",
  ],
  openGraph: {
    title: "Calculadora D-Day - Cuenta Regresiva para Fechas Especiales",
    description:
      "Rastrea cuántos días faltan para tus fechas importantes. Exámenes, cumpleaños, aniversarios y más.",
    url: "https://pick-play.github.io/es/d-day/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Calculadora D-Day" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/d-day/",
    languages: {
      "x-default": "https://pick-play.github.io/d-day/",
      "ko": "https://pick-play.github.io/d-day/",
      en: "https://pick-play.github.io/en/d-day/",
      ja: "https://pick-play.github.io/jp/d-day/",
      "zh-CN": "https://pick-play.github.io/cn/d-day/",
      es: "https://pick-play.github.io/es/d-day/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Calculadora D-Day - Cuenta Regresiva",
      url: "https://pick-play.github.io/es/d-day/",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Rastrea fechas importantes con cuenta regresiva. Exámenes, cumpleaños, aniversarios.",
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pick-play.github.io/es/" },
        { "@type": "ListItem", position: 2, name: "Calculadora D-Day", item: "https://pick-play.github.io/es/d-day/" },
      ],
    },
  ],
};

export default function DDayEsLayout({ children }: { children: React.ReactNode }) {
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
