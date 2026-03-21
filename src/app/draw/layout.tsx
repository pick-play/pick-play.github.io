import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "제비뽑기 - 온라인 추첨, 당첨 뽑기 | PickPlay",
  description:
    "공정한 온라인 제비뽑기! 당첨자 추첨, 벌칙 뽑기, 순서 정하기 등 다양한 추첨을 간편하게. 카드 뒤집기 애니메이션으로 긴장감 넘치는 추첨을 경험하세요.",
  keywords: ["제비뽑기", "온라인 추첨", "당첨 뽑기", "랜덤 뽑기", "벌칙 뽑기", "추첨기"],
  openGraph: {
    title: "제비뽑기 - 온라인 추첨 | PickPlay",
    description: "공정한 온라인 제비뽑기로 추첨하세요",
    url: "https://pick-play.github.io/draw",
  },
  alternates: { canonical: "https://pick-play.github.io/draw" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "제비뽑기",
      description: "온라인 추첨 도구",
      url: "https://pick-play.github.io/draw",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
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
          name: "제비뽑기",
          item: "https://pick-play.github.io/draw",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "제비뽑기는 어떻게 사용하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "항목을 입력하거나 프리셋을 선택한 후 당첨자 수를 정하고 추첨 시작 버튼을 누르세요. 카드를 탭해 뒤집으면 당첨 여부가 공개됩니다.",
          },
        },
        {
          "@type": "Question",
          name: "결과가 공정한가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Fisher-Yates 셔플 알고리즘을 사용해 완전히 무작위로 당첨자를 선정합니다. 누구도 결과를 예측하거나 조작할 수 없습니다.",
          },
        },
        {
          "@type": "Question",
          name: "몇 명까지 추첨할 수 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "항목은 최대 20개까지 추가할 수 있으며, 당첨자 수는 전체 항목 수보다 적게 설정할 수 있습니다. 당첨/꽝 프리셋으로 바로 시작할 수도 있습니다.",
          },
        },
      ],
    },
  ],
};

export default function DrawLayout({ children }: { children: React.ReactNode }) {
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
