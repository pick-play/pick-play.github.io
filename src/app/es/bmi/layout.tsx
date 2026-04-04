import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de IMC - Índice de Masa Corporal",
  description:
    "Calcula tu IMC al instante introduciendo tu altura y peso. Consulta las categorías de bajo peso, normal, sobrepeso y obesidad, junto con tu rango de peso ideal.",
  keywords: [
    "calculadora IMC",
    "índice de masa corporal",
    "calcular IMC",
    "calculadora obesidad",
    "peso ideal",
    "calculadora peso",
    "IMC normal",
  ],
  openGraph: {
    title: "Calculadora de IMC - Índice de Masa Corporal",
    description:
      "Calcula tu IMC al instante con altura y peso. Ve tu categoría y rango de peso ideal.",
    url: "https://pick-play.github.io/es/bmi/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/bmi/",
    languages: {
      "x-default": "https://pick-play.github.io/bmi/",
      ko: "https://pick-play.github.io/bmi/",
      en: "https://pick-play.github.io/en/bmi/",
      ja: "https://pick-play.github.io/jp/bmi/",
      "zh-CN": "https://pick-play.github.io/cn/bmi/",
      es: "https://pick-play.github.io/es/bmi/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Calculadora de IMC",
      description:
        "Calculadora de IMC online que calcula al instante el Índice de Masa Corporal a partir de la altura y el peso con clasificación por categorías.",
      url: "https://pick-play.github.io/es/bmi/",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      inLanguage: "es",
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
          name: "Calculadora de IMC",
          item: "https://pick-play.github.io/es/bmi/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cómo se calcula el IMC?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El IMC (Índice de Masa Corporal) se calcula dividiendo el peso en kilogramos entre el cuadrado de la altura en metros. Por ejemplo, 65 kg con 170 cm da IMC = 65 ÷ (1,7 × 1,7) = 22,5.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuál es el rango de IMC saludable?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Según la OMS, un IMC inferior a 18,5 es bajo peso; de 18,5 a 24,9 es normal; de 25 a 29,9 es sobrepeso; y 30 o más es obesidad.",
          },
        },
        {
          "@type": "Question",
          name: "¿Admite unidades métricas e imperiales?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí. Puedes cambiar entre métrico (cm/kg) e imperial (ft-in/lbs) usando el selector en la parte superior de la calculadora.",
          },
        },
      ],
    },
  ],
};

export default function BmiEsLayout({
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
