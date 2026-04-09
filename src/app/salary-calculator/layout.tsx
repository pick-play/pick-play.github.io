import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "연봉 실수령액 계산기 - 4대보험 세금 계산",
  description:
    "2024년 연봉 실수령액을 즉시 계산하세요. 국민연금·건강보험·장기요양·고용보험·소득세·지방소득세를 자동으로 계산하고 월 실수령액과 연 실수령액을 확인할 수 있습니다.",
  keywords: [
    "연봉 실수령액 계산기",
    "실수령액 계산",
    "4대보험 계산기",
    "연봉 세금 계산",
    "월급 실수령액",
    "국민연금 계산",
    "건강보험 계산",
    "소득세 계산기",
    "2024 연봉 실수령",
  ],
  openGraph: {
    title: "연봉 실수령액 계산기 - 4대보험 세금 계산",
    description:
      "연봉 입력 한 번으로 국민연금·건강보험·소득세 등 4대보험을 자동 계산. 월 실수령액과 연 실수령액을 즉시 확인.",
    url: "https://pick-play.github.io/salary-calculator/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/salary-calculator/",
    languages: {
      "x-default": "https://pick-play.github.io/salary-calculator/",
      ko: "https://pick-play.github.io/salary-calculator/",
      en: "https://pick-play.github.io/en/salary-calculator/",
      ja: "https://pick-play.github.io/jp/salary-calculator/",
      "zh-CN": "https://pick-play.github.io/cn/salary-calculator/",
      es: "https://pick-play.github.io/es/salary-calculator/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "연봉 실수령액 계산기",
      description:
        "연봉을 입력하면 국민연금, 건강보험, 장기요양보험, 고용보험, 소득세, 지방소득세를 자동으로 계산하여 월 실수령액과 연 실수령액을 알려주는 온라인 계산기",
      url: "https://pick-play.github.io/salary-calculator/",
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
          name: "연봉 실수령액 계산기",
          item: "https://pick-play.github.io/salary-calculator/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "연봉 실수령액은 어떻게 계산하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "연봉을 12로 나눈 월 세전 급여에서 국민연금(4.5%), 건강보험(3.545%), 장기요양보험(건강보험의 12.81%), 고용보험(0.9%), 소득세, 지방소득세(소득세의 10%)를 공제하면 월 실수령액이 됩니다.",
          },
        },
        {
          "@type": "Question",
          name: "비과세 금액이란 무엇인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "식대(월 20만원 한도), 자가운전보조금 등 세금이 부과되지 않는 급여 항목입니다. 일반적으로 식대 10만원이 기본 비과세 금액으로 적용됩니다.",
          },
        },
        {
          "@type": "Question",
          name: "부양가족 수는 왜 입력하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "소득세 계산 시 본인 포함 부양가족 1인당 연 150만원의 인적공제가 적용됩니다. 부양가족이 많을수록 소득세가 줄어들어 실수령액이 증가합니다.",
          },
        },
        {
          "@type": "Question",
          name: "국민연금 보험료에 상한선이 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "네, 2024년 기준 국민연금 기준소득월액 상한액은 590만원입니다. 월급이 590만원을 초과하더라도 국민연금은 590만원 기준으로 계산됩니다.",
          },
        },
      ],
    },
  ],
};

export default function SalaryCalculatorLayout({
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
