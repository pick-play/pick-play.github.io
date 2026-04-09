import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "퇴직금 계산기 - 퇴직금 자동 계산 · 퇴직소득세 추정 | PickPlay",
  description:
    "입사일과 퇴직일, 월 급여를 입력하면 퇴직금을 자동으로 계산합니다. 퇴직소득세 추정, 실수령액, 근속연수별 퇴직금을 한눈에 확인하세요.",
  keywords: [
    "퇴직금 계산기",
    "퇴직금 계산",
    "퇴직금 자동 계산",
    "퇴직소득세",
    "퇴직금 얼마",
    "근속연수 퇴직금",
    "1일 평균임금",
    "퇴직금 산정",
    "퇴직금 공식",
    "실수령 퇴직금",
  ],
  openGraph: {
    title: "퇴직금 계산기 - 퇴직금 자동 계산 | PickPlay",
    description: "입사일·퇴직일·월급으로 퇴직금과 퇴직소득세를 자동 계산하세요",
    url: "https://pick-play.github.io/severance-calculator/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 퇴직금 계산기",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/severance-calculator/",
    languages: {
      "x-default": "https://pick-play.github.io/severance-calculator/",
      ko: "https://pick-play.github.io/severance-calculator/",
      en: "https://pick-play.github.io/en/severance-calculator/",
      ja: "https://pick-play.github.io/jp/severance-calculator/",
      "zh-CN": "https://pick-play.github.io/cn/severance-calculator/",
      es: "https://pick-play.github.io/es/severance-calculator/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "퇴직금 계산기",
      description: "입사일, 퇴직일, 월급으로 퇴직금과 퇴직소득세를 자동 계산하는 무료 온라인 도구",
      url: "https://pick-play.github.io/severance-calculator/",
      applicationCategory: "UtilityApplication",
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
          name: "퇴직금 계산기",
          item: "https://pick-play.github.io/severance-calculator/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "퇴직금은 언제 받을 수 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "근로기준법에 따라 퇴직일로부터 14일 이내에 지급되어야 합니다. 당사자 합의 시 연장 가능합니다.",
          },
        },
        {
          "@type": "Question",
          name: "1년 미만 근무하면 퇴직금이 없나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "맞습니다. 퇴직금은 1년 이상 근무한 경우에만 발생합니다. 1년 미만 근무 시에는 법적으로 퇴직금 지급 의무가 없습니다.",
          },
        },
        {
          "@type": "Question",
          name: "퇴직금 계산 공식이 무엇인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "퇴직금 = 1일 평균임금 × 30일 × 근속연수입니다. 1일 평균임금은 퇴직 전 3개월 임금 총액을 해당 기간 총일수로 나누어 계산합니다.",
          },
        },
      ],
    },
  ],
};

export default function SeveranceCalculatorLayout({
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
