import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MBTI 성격유형 검사 - 20문항으로 알아보는 나의 MBTI",
  description:
    "간편한 20문항 MBTI 성격유형 검사! E/I, S/N, T/F, J/P 각 지표별 퍼센트(%)로 정확한 결과를 확인하세요. 16가지 성격 유형 설명과 궁합 정보까지 제공합니다.",
  keywords: [
    "MBTI 검사",
    "MBTI 테스트",
    "성격유형 검사",
    "MBTI 무료",
    "16가지 성격",
    "MBTI 궁합",
  ],
  openGraph: {
    title: "MBTI 성격유형 검사 - 나의 MBTI는?",
    description: "20문항으로 알아보는 나의 MBTI! 각 지표별 % 결과와 궁합까지",
    url: "https://pick-korea.github.io/mbti",
  },
  alternates: { canonical: "https://pick-korea.github.io/mbti" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "MBTI 성격유형 검사",
      url: "https://pick-korea.github.io/mbti",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      description:
        "20문항으로 알아보는 MBTI 성격유형 검사. 외향/내향, 감각/직관, 사고/감정, 판단/인식 각 지표별 퍼센트와 16가지 성격 유형 결과를 제공합니다.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "홈",
          item: "https://pick-korea.github.io",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "MBTI 성격유형 검사",
          item: "https://pick-korea.github.io/mbti",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "MBTI 검사는 어떻게 진행되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "총 20문항(외향/내향, 감각/직관, 사고/감정, 판단/인식 각 5문항)에 답하면 각 지표별 퍼센트와 함께 16가지 성격 유형 중 하나의 결과를 확인할 수 있습니다.",
          },
        },
        {
          "@type": "Question",
          name: "MBTI 결과는 정확한가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "간이 검사이므로 공식 MBTI 검사와는 차이가 있을 수 있지만, 성격 성향을 파악하는 데 도움이 됩니다. 정확한 결과를 원하시면 전문 기관의 공식 검사를 추천드립니다.",
          },
        },
      ],
    },
  ],
};

export default function MbtiLayout({
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
