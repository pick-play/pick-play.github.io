import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "색깔 심리 테스트 - 나를 나타내는 색깔은? | PickPlay",
  description:
    "10가지 질문으로 알아보는 나의 색깔 성격 유형! 빨강, 파랑, 초록, 보라 등 8가지 색깔 중 나와 가장 잘 맞는 색깔을 찾아보세요.",
  keywords: [
    "색깔 심리 테스트",
    "컬러 테스트",
    "색깔 성격",
    "심리 테스트",
    "성격 테스트",
    "색깔 유형",
  ],
  openGraph: {
    title: "색깔 심리 테스트 - 나를 나타내는 색깔은?",
    description: "10가지 질문으로 알아보는 나의 색깔 성격! 8가지 색깔 유형 중 나는 어떤 색?",
    url: "https://pick-play.github.io/color-test",
  },
  alternates: { canonical: "https://pick-play.github.io/color-test" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "색깔 심리 테스트",
      url: "https://pick-play.github.io/color-test",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      description:
        "10가지 질문으로 알아보는 나의 색깔 성격 유형. 빨강, 주황, 노랑, 초록, 파랑, 남색, 보라, 분홍 8가지 색깔 중 나와 가장 잘 맞는 색깔과 성격 유형을 알아보세요.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "홈",
          item: "https://pick-play.github.io",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "색깔 심리 테스트",
          item: "https://pick-play.github.io/color-test",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "색깔 심리 테스트는 어떻게 진행되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "총 10개의 일상 상황 질문에 답하면, 8가지 색깔 성격 유형(빨강, 주황, 노랑, 초록, 파랑, 남색, 보라, 분홍) 중 나와 가장 잘 맞는 색깔과 그에 따른 상세한 성격 분석 결과를 확인할 수 있습니다.",
          },
        },
        {
          "@type": "Question",
          name: "색깔 심리 테스트 결과는 무엇을 의미하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "결과는 주 색깔 유형과 부 색깔 유형으로 나뉩니다. 주 색깔은 당신의 핵심 성격을, 부 색깔은 그것을 보완하는 성향을 나타냅니다. 각 색깔마다 성격 특성, 강점, 약점, 그리고 잘 맞는 색깔 유형을 함께 제공합니다.",
          },
        },
        {
          "@type": "Question",
          name: "8가지 색깔 유형에는 어떤 것이 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "빨강(열정적인 리더), 주황(활발한 모험가), 노랑(밝은 낙천가), 초록(평화로운 조화가), 파랑(차분한 사색가), 남색(직관적인 탐구자), 보라(신비로운 예술가), 분홍(따뜻한 공감러) 총 8가지 유형이 있습니다.",
          },
        },
      ],
    },
  ],
};

export default function ColorTestLayout({
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
