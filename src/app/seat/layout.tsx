import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "랜덤 자리 배치 - 좌석 배정 프로그램 | PickPlay",
  description:
    "교실, 회의실, 모임 자리를 랜덤으로 배치하세요! 공정한 좌석 배정을 위한 무료 온라인 도구. 칠판 기준 자리 배치도를 만들어 드립니다.",
  keywords: [
    "자리 배치",
    "좌석 배정",
    "랜덤 자리",
    "자리 뽑기",
    "교실 자리배치",
    "좌석 프로그램",
    "랜덤 좌석",
    "자리 배정 프로그램",
  ],
  openGraph: {
    title: "랜덤 자리 배치 - 공정한 좌석 배정 프로그램",
    description:
      "교실, 회의실, 모임 자리를 랜덤으로 배치하세요! 칠판 기준 자리 배치도를 즉시 만들어 드립니다.",
    url: "https://pick-play.github.io/seat",
  },
  alternates: { canonical: "https://pick-play.github.io/seat" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebApplication", "UtilityApplication"],
      name: "랜덤 자리 배치 - 좌석 배정 프로그램",
      url: "https://pick-play.github.io/seat",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      description:
        "교실, 회의실, 모임 자리를 랜덤으로 배치하는 무료 온라인 좌석 배정 프로그램입니다. 칠판 기준 자리 배치도를 만들어 드립니다.",
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
          name: "랜덤 자리 배치",
          item: "https://pick-play.github.io/seat",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "랜덤 자리 배치는 어떻게 사용하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "행과 열 수를 설정하고 참가자 이름을 입력하세요. 쉼표로 여러 명을 한꺼번에 입력할 수 있습니다. '자리 배치 시작!' 버튼을 누르면 Fisher-Yates 알고리즘으로 공정하게 자리를 배정합니다. 칠판 기준으로 앞줄부터 자리 배치도가 표시됩니다.",
          },
        },
        {
          "@type": "Question",
          name: "빈자리(공석)는 어떻게 설정하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "참가자 수가 전체 좌석 수보다 적을 경우 자동으로 빈자리가 생깁니다. 빈자리는 배치도에서 회색으로 표시됩니다. 예를 들어 5×6 교실(30자리)에 28명을 입력하면 2개의 자리가 빈자리로 배정됩니다.",
          },
        },
        {
          "@type": "Question",
          name: "자리 배치 결과를 공유할 수 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "결과 화면에서 '결과 복사' 버튼을 누르면 자리 배치도가 텍스트 그리드 형식으로 클립보드에 복사됩니다. 카카오톡, 슬랙 등 메신저에 바로 붙여넣기하여 공유할 수 있습니다. '다시 배치' 버튼으로 같은 참가자들로 새로운 자리 배치를 할 수 있습니다.",
          },
        },
      ],
    },
  ],
};

export default function SeatLayout({
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
