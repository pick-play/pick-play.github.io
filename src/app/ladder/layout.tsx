import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "사다리 타기 - 온라인 사다리 게임 | PickPlay",
  description:
    "온라인 사다리 타기 게임! 친구들과 함께 공정하게 순서를 정하거나 벌칙을 정해보세요. 실시간 애니메이션으로 긴장감 넘치는 사다리 게임.",
  keywords: [
    "사다리 타기",
    "사다리 게임",
    "온라인 사다리",
    "사다리 타기 게임",
    "순서 정하기",
    "벌칙 사다리",
  ],
  openGraph: {
    title: "사다리 타기 - 온라인 사다리 게임 | PickPlay",
    description: "친구들과 함께하는 온라인 사다리 타기",
    url: "https://pick-play.github.io/ladder",
  },
  alternates: { canonical: "https://pick-play.github.io/ladder" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "사다리 타기",
      description: "온라인 사다리 타기 게임",
      url: "https://pick-play.github.io/ladder",
      applicationCategory: "GameApplication",
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
          name: "사다리 타기",
          item: "https://pick-play.github.io/ladder",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "사다리 타기는 어떻게 사용하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "참가자 수를 설정하고, 이름과 결과를 입력한 뒤 사다리 시작 버튼을 누르세요. 각 참가자의 선을 클릭해 결과를 확인하거나, 전체 공개 버튼으로 한 번에 모든 결과를 볼 수 있습니다.",
          },
        },
        {
          "@type": "Question",
          name: "몇 명까지 사다리 타기를 할 수 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "최소 2명에서 최대 10명까지 사다리 타기를 즐길 수 있습니다. 참가자 이름은 입력하지 않으면 기본값(참가자 1, 2...)으로 자동 설정됩니다.",
          },
        },
        {
          "@type": "Question",
          name: "사다리 결과는 공정한가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "네, 사다리의 가로 막대는 매번 새로 무작위로 생성됩니다. 누구도 결과를 예측하거나 조작할 수 없어 완전히 공정합니다.",
          },
        },
      ],
    },
  ],
};

export default function LadderLayout({
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
