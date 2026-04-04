import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI 계산기 - 체질량지수 측정",
  description:
    "키와 몸무게를 입력하면 BMI(체질량지수)를 즉시 계산합니다. 저체중·정상·과체중·비만 기준과 정상 체중 범위를 확인하세요.",
  keywords: [
    "BMI 계산기",
    "체질량지수",
    "BMI 계산",
    "비만도 계산기",
    "정상 체중 계산",
    "체중 계산기",
    "BMI 측정",
  ],
  openGraph: {
    title: "BMI 계산기 - 체질량지수 측정",
    description: "키와 몸무게로 BMI를 즉시 계산. 저체중·정상·과체중·비만 기준 확인.",
    url: "https://pick-play.github.io/bmi/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/bmi/",
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
      name: "BMI 계산기",
      description:
        "키와 몸무게를 입력하면 체질량지수(BMI)를 즉시 계산하고 분류하는 온라인 BMI 계산기",
      url: "https://pick-play.github.io/bmi/",
      applicationCategory: "HealthApplication",
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
          name: "BMI 계산기",
          item: "https://pick-play.github.io/bmi/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "BMI는 어떻게 계산하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "BMI(체질량지수)는 몸무게(kg)를 키(m)의 제곱으로 나누어 계산합니다. 예를 들어 키 170cm, 몸무게 65kg이면 BMI = 65 ÷ (1.7 × 1.7) = 22.5입니다.",
          },
        },
        {
          "@type": "Question",
          name: "BMI 정상 범위는 얼마인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "세계보건기구(WHO) 기준으로 BMI 18.5 미만은 저체중, 18.5~24.9는 정상, 25~29.9는 과체중, 30 이상은 비만으로 분류됩니다.",
          },
        },
        {
          "@type": "Question",
          name: "미터법과 야드파운드법 모두 지원하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "네, cm/kg(미터법)과 ft-in/lbs(야드파운드법) 모두 지원합니다. 상단 토글 버튼으로 단위를 전환할 수 있습니다.",
          },
        },
      ],
    },
  ],
};

export default function BmiLayout({
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
