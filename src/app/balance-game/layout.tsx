import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "밸런스 게임 - 이거 vs 저거 골라봐",
  description:
    "재미있는 밸런스 게임! 연애, 음식, 극한 상황 등 다양한 주제의 밸런스 게임을 친구들과 즐겨보세요. 50개 이상의 질문으로 끝없는 재미!",
  keywords: [
    "밸런스 게임",
    "이거 vs 저거",
    "선택 게임",
    "파티 게임",
    "밸런스게임 질문",
    "커플 밸런스게임",
  ],
  openGraph: {
    title: "밸런스 게임 - 이거 vs 저거",
    description: "다양한 주제의 밸런스 게임을 친구들과 즐겨보세요!",
    url: "https://pick-play.github.io/balance-game",
  },
  alternates: { canonical: "https://pick-play.github.io/balance-game" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "밸런스 게임 - 이거 vs 저거",
      url: "https://pick-play.github.io/balance-game",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      description:
        "연애, 음식, 극한 상황 등 다양한 주제의 밸런스 게임. 50개 이상의 질문으로 친구들과 즐길 수 있습니다.",
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
          name: "밸런스 게임",
          item: "https://pick-play.github.io/balance-game",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "밸런스 게임이란 무엇인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "두 가지 선택지 중 하나를 고르는 게임입니다. 연애, 음식, 극한 상황 등 다양한 주제로 친구들과 즐길 수 있습니다.",
          },
        },
        {
          "@type": "Question",
          name: "몇 개의 질문이 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "5개 카테고리에 걸쳐 50개 이상의 질문이 준비되어 있습니다. 카테고리별로 골라서 플레이할 수도 있습니다.",
          },
        },
      ],
    },
  ],
};

export default function BalanceGameLayout({
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
