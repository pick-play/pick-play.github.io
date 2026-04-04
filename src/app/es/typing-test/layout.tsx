import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test de Velocidad de Escritura - Práctica de Mecanografía | PickPlay",
  description:
    "Test de velocidad de escritura gratuito en línea. Mide tu PPM y precisión en tiempo real. Practica con textos de nivel fácil, medio y difícil.",
  keywords: [
    "test de mecanografía",
    "velocidad de escritura",
    "palabras por minuto",
    "práctica de teclado",
    "test de precisión",
    "mecanografía online",
    "PPM",
  ],
  openGraph: {
    title: "Test de Velocidad de Escritura - Práctica de Mecanografía | PickPlay",
    description: "Test de velocidad de escritura gratuito. Mide tu PPM y precisión en tiempo real.",
    url: "https://pick-play.github.io/es/typing-test/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/typing-test/",
    languages: {
      "x-default": "https://pick-play.github.io/typing-test/",
      ko: "https://pick-play.github.io/typing-test/",
      en: "https://pick-play.github.io/en/typing-test/",
      ja: "https://pick-play.github.io/jp/typing-test/",
      "zh-CN": "https://pick-play.github.io/cn/typing-test/",
      es: "https://pick-play.github.io/es/typing-test/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Test de Velocidad de Escritura",
      description:
        "Test de velocidad de escritura gratuito en línea. Mide tu PPM y precisión en tiempo real con textos de distintos niveles.",
      url: "https://pick-play.github.io/es/typing-test/",
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
          name: "Test de Velocidad de Escritura",
          item: "https://pick-play.github.io/es/typing-test/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cómo se calcula el PPM?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El PPM se calcula dividiendo el total de caracteres escritos entre 5 (longitud estándar de una palabra), luego dividiendo entre el tiempo transcurrido en minutos.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo se mide la precisión?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La precisión es el porcentaje de caracteres escritos correctamente del total de caracteres intentados. Corregir un error no lo elimina del conteo.",
          },
        },
        {
          "@type": "Question",
          name: "¿Dónde se guarda mi mejor marca?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tu mejor marca se guarda en el almacenamiento local del navegador y persiste entre sesiones en el mismo dispositivo.",
          },
        },
      ],
    },
  ],
};

export default function TypingTestEsLayout({
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
