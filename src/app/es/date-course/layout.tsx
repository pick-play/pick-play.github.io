import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ideas para Citas - Recomendaciones",
  description:
    "200 rutas de cita en 10 ciudades. Encuentra la ruta perfecta para tu cita según el ambiente y tus preferencias.",
  keywords: [
    "ideas para citas",
    "plan de cita",
    "qué hacer en una cita",
    "lugares para una cita",
    "plan romántico",
    "salida en pareja",
    "actividades en pareja",
    "ruta romántica",
  ],
  openGraph: {
    title: "Ideas para Citas - 200 Rutas en 10 Ciudades",
    description:
      "Encuentra la ruta perfecta para tu cita. Planes personalizados según tus gustos, disponibles de día y de noche.",
    url: "https://pick-play.github.io/es/date-course",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Ideas para Citas" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/date-course",
    languages: {
      "x-default": "https://pick-play.github.io/date-course",
      "ko": "https://pick-play.github.io/date-course",
      en: "https://pick-play.github.io/en/date-course",
      ja: "https://pick-play.github.io/jp/date-course",
      "zh-CN": "https://pick-play.github.io/cn/date-course",
      es: "https://pick-play.github.io/es/date-course",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Ideas para Citas - Recomendaciones",
      url: "https://pick-play.github.io/es/date-course",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "200 rutas de cita en 10 ciudades. Encuentra la ruta perfecta.",
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pick-play.github.io/es" },
        { "@type": "ListItem", position: 2, name: "Ideas para Citas", item: "https://pick-play.github.io/es/date-course" },
      ],
    },
  ],
};

export default function DateCourseEsLayout({ children }: { children: React.ReactNode }) {
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
