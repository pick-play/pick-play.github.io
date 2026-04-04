import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generador de Contraseñas - Contraseñas Seguras y Aleatorias",
  description:
    "Genera contraseñas seguras y aleatorias al instante. Personaliza la longitud, mayúsculas, minúsculas, números y caracteres especiales para crear la contraseña ideal.",
  keywords: [
    "generador de contraseñas",
    "contraseña aleatoria",
    "contraseña segura",
    "crear contraseña",
    "contraseña fuerte",
    "generador password",
  ],
  openGraph: {
    title: "Generador de Contraseñas - Contraseñas Seguras y Aleatorias",
    description: "Genera contraseñas seguras y aleatorias al instante.",
    url: "https://pick-play.github.io/es/password/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/password/",
    languages: {
      "x-default": "https://pick-play.github.io/password/",
      ko: "https://pick-play.github.io/password/",
      en: "https://pick-play.github.io/en/password/",
      ja: "https://pick-play.github.io/jp/password/",
      "zh-CN": "https://pick-play.github.io/cn/password/",
      es: "https://pick-play.github.io/es/password/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Generador de Contraseñas",
      description:
        "Genera contraseñas seguras y aleatorias. Personaliza longitud y tipos de caracteres, copia al instante.",
      url: "https://pick-play.github.io/es/password/",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      inLanguage: "es",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
          name: "Generador de Contraseñas",
          item: "https://pick-play.github.io/es/password/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Qué hace que una contraseña sea segura?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Una contraseña segura combina mayúsculas, minúsculas, números y caracteres especiales con una longitud mínima de 16 caracteres. El generador de PickPlay aplica estas reglas automáticamente.",
          },
        },
        {
          "@type": "Question",
          name: "¿Las contraseñas generadas se almacenan en un servidor?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No, toda la generación de contraseñas ocurre localmente en tu navegador. Nada se envía a ningún servidor, por lo que tus contraseñas son completamente privadas.",
          },
        },
        {
          "@type": "Question",
          name: "¿Por qué los caracteres especiales hacen la contraseña más segura?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Los caracteres especiales aumentan exponencialmente el número de combinaciones posibles, haciendo los ataques de fuerza bruta significativamente más difíciles.",
          },
        },
      ],
    },
  ],
};

export default function PasswordEsLayout({
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
