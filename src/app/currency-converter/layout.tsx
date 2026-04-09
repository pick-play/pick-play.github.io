import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "환율 계산기 - 실시간 환율 변환 | PickPlay",
  description:
    "달러, 유로, 엔화, 위안 등 20개 통화의 실시간 환율을 즉시 계산하세요. USD, EUR, KRW, JPY, CNY, GBP 등 주요 통화 간 환율 변환을 무료로 제공합니다.",
  keywords: [
    "환율 계산기",
    "실시간 환율",
    "달러 환율",
    "엔화 환율",
    "유로 환율",
    "위안 환율",
    "환율 변환",
    "원달러 환율",
    "환전 계산기",
    "외환 계산기",
  ],
  openGraph: {
    title: "환율 계산기 - 실시간 환율 변환 | PickPlay",
    description: "달러, 유로, 엔화 등 20개 통화의 실시간 환율을 즉시 계산하세요",
    url: "https://pick-play.github.io/currency-converter/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 환율 계산기",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/currency-converter/",
    languages: {
      "x-default": "https://pick-play.github.io/currency-converter/",
      ko: "https://pick-play.github.io/currency-converter/",
      en: "https://pick-play.github.io/en/currency-converter/",
      ja: "https://pick-play.github.io/jp/currency-converter/",
      "zh-CN": "https://pick-play.github.io/cn/currency-converter/",
      es: "https://pick-play.github.io/es/currency-converter/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "환율 계산기",
      description: "달러, 유로, 엔화 등 20개 통화의 실시간 환율을 변환하는 무료 온라인 도구",
      url: "https://pick-play.github.io/currency-converter/",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      inLanguage: "ko",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "홈",
          item: "https://pick-play.github.io/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "환율 계산기",
          item: "https://pick-play.github.io/currency-converter/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "환율 데이터는 얼마나 자주 업데이트되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "환율 데이터는 open.er-api.com을 통해 제공되며 24시간마다 업데이트됩니다. 화면 하단에 최종 업데이트 시간이 표시됩니다.",
          },
        },
        {
          "@type": "Question",
          name: "어떤 통화를 지원하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "USD, EUR, KRW, JPY, CNY, GBP, CHF, CAD, AUD, NZD, SGD, HKD, TWD, THB, VND, PHP, IDR, MYR, INR, BRL 총 20개 통화를 지원합니다.",
          },
        },
        {
          "@type": "Question",
          name: "환율 계산은 어떻게 이루어지나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "미국 달러(USD)를 기준으로 각 통화의 환율을 가져온 후, 선택한 두 통화 간의 비율을 계산하여 변환합니다.",
          },
        },
      ],
    },
  ],
};

export default function CurrencyConverterLayout({
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
