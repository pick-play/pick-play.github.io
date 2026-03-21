import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "랜덤 조 뽑기 - 팀 나누기 생성기",
  description:
    "랜덤으로 조를 나눠보세요! 참가자 이름을 입력하고 원하는 조 수를 설정하면 긴장감 넘치는 애니메이션과 함께 공정하게 팀을 나눠드립니다. 회사 팀빌딩, 학교 조편성에 딱!",
  keywords: [
    "랜덤 조 뽑기",
    "팀 나누기",
    "조 편성",
    "랜덤 팀",
    "팀빌딩",
    "조 뽑기 생성기",
    "그룹 나누기",
  ],
  openGraph: {
    title: "랜덤 조 뽑기 - 긴장감 넘치는 팀 배정",
    description:
      "참가자를 입력하고 조 수를 설정하면 랜덤으로 팀을 나눠드립니다!",
    url: "https://pick-korea.github.io/random-team",
  },
  alternates: { canonical: "https://pick-korea.github.io/random-team" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "랜덤 조 뽑기 - 팀 나누기 생성기",
      url: "https://pick-korea.github.io/random-team",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      description:
        "랜덤으로 조를 나눠보세요! 참가자 이름을 입력하고 원하는 조 수를 설정하면 공정하게 팀을 나눠드립니다.",
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
          name: "랜덤 조 뽑기",
          item: "https://pick-korea.github.io/random-team",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "랜덤 조 뽑기는 어떻게 사용하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "참가자 이름을 입력란에 하나씩 추가하거나 쉼표로 구분하여 한꺼번에 입력하세요. 그런 다음 원하는 조 수를 설정하고 '조 뽑기 시작!' 버튼을 누르면 Fisher-Yates 알고리즘으로 공정하게 랜덤 배정됩니다.",
          },
        },
        {
          "@type": "Question",
          name: "공정한 랜덤 배정인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "네, PickPlay 랜덤 조 뽑기는 Fisher-Yates 셔플 알고리즘을 사용합니다. 이 알고리즘은 모든 순열이 동일한 확률로 나타나는 수학적으로 공정한 방식으로, 편향 없이 완전히 랜덤하게 팀이 구성됩니다.",
          },
        },
        {
          "@type": "Question",
          name: "조 뽑기 결과를 저장하거나 공유할 수 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "결과 화면에서 '결과 복사' 버튼을 누르면 조별 명단이 텍스트 형식으로 클립보드에 복사됩니다. 카카오톡, 슬랙 등 메신저에 바로 붙여넣기하여 공유할 수 있습니다. '다시 뽑기' 버튼으로 같은 참가자들로 다시 뽑을 수도 있습니다.",
          },
        },
      ],
    },
  ],
};

export default function RandomTeamLayout({
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
