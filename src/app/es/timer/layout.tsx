import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Temporizador & Cronómetro - Medición de Tiempo Online",
  description:
    "Temporizador y cronómetro gratuitos en línea. Cuenta regresiva, presets de tiempo y registro de vueltas. Ideal para estudiar, hacer ejercicio o cocinar.",
  keywords: [
    "temporizador online",
    "cronómetro",
    "cuenta regresiva",
    "app temporizador",
    "medición de tiempo",
    "temporizador gratis",
    "tiempos de vuelta",
  ],
  openGraph: {
    title: "Temporizador & Cronómetro - Medición de Tiempo Online | PickPlay",
    description: "Temporizador y cronómetro gratuitos. Cuenta regresiva, presets y tiempos de vuelta.",
    url: "https://pick-play.github.io/es/timer/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Temporizador & Cronómetro" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/timer/",
    languages: {
      "x-default": "https://pick-play.github.io/timer/",
      ko: "https://pick-play.github.io/timer/",
      en: "https://pick-play.github.io/en/timer/",
      ja: "https://pick-play.github.io/jp/timer/",
      "zh-CN": "https://pick-play.github.io/cn/timer/",
      es: "https://pick-play.github.io/es/timer/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Temporizador & Cronómetro",
      url: "https://pick-play.github.io/es/timer/",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Temporizador y cronómetro gratuitos en línea con cuenta regresiva, presets y tiempos de vuelta.",
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pick-play.github.io/es/" },
        { "@type": "ListItem", position: 2, name: "Temporizador & Cronómetro", item: "https://pick-play.github.io/es/timer/" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cuál es la diferencia entre temporizador y cronómetro?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El temporizador cuenta hacia atrás desde un tiempo establecido hasta cero y suena una alerta al terminar. El cronómetro cuenta hacia adelante desde cero y permite registrar tiempos de vuelta.",
          },
        },
        {
          "@type": "Question",
          name: "No escucho la alerta del temporizador",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Asegúrate de que el sonido esté permitido en la configuración del navegador. Esta herramienta usa la API Web Audio, sin necesidad de instalación adicional.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo uso los tiempos de vuelta?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pulsa el botón 'Vuelta' mientras el cronómetro está en marcha para registrar el tiempo actual. Es útil para comparar tiempos en distintos tramos.",
          },
        },
      ],
    },
  ],
};

export default function TimerEsLayout({ children }: { children: React.ReactNode }) {
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
