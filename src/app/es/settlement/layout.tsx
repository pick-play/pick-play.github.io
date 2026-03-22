import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dividir Cuenta - Calculadora Justa",
  description:
    "Divide cuentas fácilmente con exclusiones por ítem, división diferencial y transferencia mínima. La forma más justa de pagar entre amigos.",
  keywords: [
    "dividir cuenta",
    "calculadora de gastos",
    "dividir gastos",
    "pagar entre amigos",
    "dutch pay",
    "división de gastos",
    "calcular transferencia mínima",
    "gastos de grupo",
  ],
  openGraph: {
    title: "Dividir Cuenta - Calculadora de Gastos Justa",
    description:
      "Divide cuentas complejas sin complicaciones. Exclusiones por ítem, división diferencial y transferencia mínima.",
    url: "https://pick-play.github.io/es/settlement",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - Dividir Cuenta" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/es/settlement",
    languages: {
      "x-default": "https://pick-play.github.io/settlement",
      "ko": "https://pick-play.github.io/settlement",
      en: "https://pick-play.github.io/en/settlement",
      ja: "https://pick-play.github.io/jp/settlement",
      "zh-CN": "https://pick-play.github.io/cn/settlement",
      es: "https://pick-play.github.io/es/settlement",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Dividir Cuenta - Calculadora Justa",
      url: "https://pick-play.github.io/es/settlement",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Divide cuentas fácilmente con exclusiones, división diferencial y transferencia mínima.",
      inLanguage: "es",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pick-play.github.io/es" },
        { "@type": "ListItem", position: 2, name: "Dividir Cuenta", item: "https://pick-play.github.io/es/settlement" },
      ],
    },
  ],
};

export default function SettlementEsLayout({ children }: { children: React.ReactNode }) {
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
