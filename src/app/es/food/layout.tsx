import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "¿Qué Comer? - Ruleta de Menú",
  description:
    "¿No sabes qué comer? Obtén recomendaciones de más de 130 menús según tus gustos. Comida coreana, japonesa, china, occidental, postres y más.",
  keywords: [
    "qué comer",
    "recomendación de menú",
    "qué comer hoy",
    "ruleta de comida",
    "menú aleatorio",
    "recomendación de comida",
    "qué comer para almorzar",
    "qué comer para cenar",
    "comida a domicilio",
    "restaurante recomendado",
  ],
  openGraph: {
    title: "¿Qué Comer? - Ruleta de Menú con 130+ Opciones",
    description:
      "Menos dudas, más sabor. Selecciona tu estado de ánimo en el mapa de sabores y deja que la ruleta elija por ti.",
    url: "https://pick-play.github.io/es/food/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Qué Comer" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/food/",
    languages: {
      "x-default": "https://pick-play.github.io/food/",
      "ko": "https://pick-play.github.io/food/",
      en: "https://pick-play.github.io/en/food/",
      ja: "https://pick-play.github.io/jp/food/",
      "zh-CN": "https://pick-play.github.io/cn/food/",
      es: "https://pick-play.github.io/es/food/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "¿Qué Comer? - Ruleta de Menú",
      url: "https://pick-play.github.io/es/food/",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Recomendaciones de más de 130 menús según tus gustos. ¡Deja que la ruleta elija!",
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pick-play.github.io/es/" },
        { "@type": "ListItem", position: 2, name: "¿Qué Comer?", item: "https://pick-play.github.io/es/food/" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cómo funciona el recomendador de comida?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Selecciona tu preferencia de sabor en el mapa (suave-intenso, ligero-abundante) y la ruleta te recomendará un menú de entre más de 130 opciones. Incluye comida coreana, japonesa, china, occidental, asiática, snacks, postres y comida rápida.",
          },
        },
        {
          "@type": "Question",
          name: "¿Es gratuito?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí, todas las funciones de PickPlay son completamente gratuitas. No necesitas registrarte ni instalar ninguna aplicación.",
          },
        },
      ],
    },
  ],
};

export default function FoodEsLayout({ children }: { children: React.ReactNode }) {
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
