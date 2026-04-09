import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "복리 계산기 - 적금 이자 투자 수익 계산",
  description:
    "무료 복리 계산기. 초기 투자금과 월 적립액을 입력해 최종 금액, 총 이자, 수익률을 한눈에 확인하세요. 단리·복리 비교, 72 법칙, 목표 금액 역산 기능 제공.",
  keywords: [
    "복리 계산기",
    "단리 복리 계산",
    "이자 계산기",
    "투자 수익 계산기",
    "적금 계산기",
    "월 적립금 계산",
    "72 법칙",
    "목표 금액 계산",
    "연복리 계산",
  ],
  openGraph: {
    title: "복리 계산기 - 적금 이자 투자 수익 계산",
    description:
      "무료 복리 계산기. 초기 투자금·월 적립액·연이율로 최종 수익을 즉시 계산. 단리·복리 비교 및 72 법칙 제공.",
    url: "https://pick-play.github.io/compound-calculator/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/compound-calculator/",
    languages: {
      "x-default": "https://pick-play.github.io/compound-calculator/",
      ko: "https://pick-play.github.io/compound-calculator/",
      en: "https://pick-play.github.io/en/compound-calculator/",
      ja: "https://pick-play.github.io/jp/compound-calculator/",
      "zh-CN": "https://pick-play.github.io/cn/compound-calculator/",
      es: "https://pick-play.github.io/es/compound-calculator/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "복리 계산기",
      description:
        "초기 투자금, 월 적립액, 연이율, 투자 기간을 입력하면 최종 금액과 총 이자를 즉시 계산. 단리·복리 비교, 72 법칙, 목표 금액 역산 기능 제공.",
      url: "https://pick-play.github.io/compound-calculator/",
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
          name: "복리 계산기",
          item: "https://pick-play.github.io/compound-calculator/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "복리와 단리의 차이는 무엇인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "단리는 원금에만 이자가 붙지만, 복리는 이자에도 이자가 붙어 시간이 지날수록 자산이 기하급수적으로 늘어납니다.",
          },
        },
        {
          "@type": "Question",
          name: "복리 주기가 빠를수록 유리한가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "네. 월복리 > 분기복리 > 연복리 순으로 최종 수익이 높습니다. 같은 연이율이라면 복리 주기가 짧을수록 실효 이율이 높아집니다.",
          },
        },
        {
          "@type": "Question",
          name: "72 법칙이란 무엇인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "72를 연이율로 나누면 원금이 약 2배가 되는 기간(년)을 빠르게 추정할 수 있습니다. 예: 연 8%면 72÷8=9년.",
          },
        },
      ],
    },
  ],
};

export default function CompoundCalculatorLayout({
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
