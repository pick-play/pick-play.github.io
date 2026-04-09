import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "대출이자 계산기 - 원리금균등 원금균등 상환 계산 | PickPlay",
  description:
    "대출금액, 이자율, 기간을 입력하면 원리금균등상환, 원금균등상환, 만기일시상환 방식별 월 상환액과 총 이자를 즉시 계산합니다. 상환방식 비교 및 월별 상환 스케줄도 제공합니다.",
  keywords: [
    "대출이자 계산기",
    "주택담보대출 계산",
    "원리금균등상환",
    "원금균등상환",
    "대출 이자 계산",
    "월 상환액",
    "만기일시상환",
    "대출 계산기",
    "이자 계산",
    "상환 계획",
  ],
  openGraph: {
    title: "대출이자 계산기 - 원리금균등 원금균등 상환 계산 | PickPlay",
    description: "대출 이자와 월 상환액을 원리금균등, 원금균등, 만기일시 방식으로 즉시 비교하세요",
    url: "https://pick-play.github.io/loan-calculator/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 대출이자 계산기",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/loan-calculator/",
    languages: {
      "x-default": "https://pick-play.github.io/loan-calculator/",
      ko: "https://pick-play.github.io/loan-calculator/",
      en: "https://pick-play.github.io/en/loan-calculator/",
      ja: "https://pick-play.github.io/jp/loan-calculator/",
      "zh-CN": "https://pick-play.github.io/cn/loan-calculator/",
      es: "https://pick-play.github.io/es/loan-calculator/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "대출이자 계산기",
      description:
        "대출금액, 연이자율, 기간을 입력해 원리금균등상환, 원금균등상환, 만기일시상환 방식별 월 상환액과 총 이자를 계산하는 무료 온라인 도구",
      url: "https://pick-play.github.io/loan-calculator/",
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
          name: "대출이자 계산기",
          item: "https://pick-play.github.io/loan-calculator/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "원리금균등상환이란 무엇인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "매월 동일한 금액(원금+이자)을 납부하는 방식입니다. 초기에는 이자 비중이 높고 후반으로 갈수록 원금 비중이 높아집니다. 주택담보대출에서 가장 많이 사용됩니다.",
          },
        },
        {
          "@type": "Question",
          name: "원금균등상환과 원리금균등상환의 차이는?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "원금균등상환은 매월 동일한 원금을 갚고 이자는 줄어드는 방식으로, 총 납부 이자가 원리금균등상환보다 적습니다. 단, 초기 상환 부담이 더 큽니다.",
          },
        },
        {
          "@type": "Question",
          name: "만기일시상환은 어떤 경우에 유리한가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "만기일시상환은 매월 이자만 납부하다가 만기에 원금을 전액 상환하는 방식입니다. 단기 대출이나 목돈 상환 계획이 있을 때 유리하지만 총 이자 부담이 가장 큽니다.",
          },
        },
      ],
    },
  ],
};

export default function LoanCalculatorLayout({
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
