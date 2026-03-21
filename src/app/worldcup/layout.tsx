import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이상형 월드컵 - 나만의 최애를 찾아라! | PickPlay",
  description:
    "음식, 여행지, 동물, 취미 등 다양한 주제의 이상형 월드컵! 토너먼트 방식으로 나의 진짜 이상형을 찾아보세요.",
  keywords: [
    "이상형 월드컵",
    "월드컵 게임",
    "음식 월드컵",
    "이상형 테스트",
    "토너먼트",
    "밸런스 게임",
  ],
  openGraph: {
    title: "이상형 월드컵 - 나만의 최애를 찾아라!",
    description: "음식, 여행지, 동물, 취미 등 다양한 주제의 이상형 월드컵!",
    url: "https://pick-play.github.io/worldcup",
  },
  alternates: { canonical: "https://pick-play.github.io/worldcup" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebApplication", "GameApplication"],
      name: "이상형 월드컵 - 나만의 최애를 찾아라!",
      url: "https://pick-play.github.io/worldcup",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      description:
        "음식, 여행지, 동물, 취미 등 6가지 주제의 이상형 월드컵. 토너먼트 방식으로 나만의 최애를 찾아보세요.",
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
          name: "이상형 월드컵",
          item: "https://pick-play.github.io/worldcup",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "이상형 월드컵이란 무엇인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "이상형 월드컵은 토너먼트 방식으로 두 후보 중 하나를 반복 선택해 최종 1위를 가리는 게임입니다. 음식, 여행지, 동물 등 다양한 주제로 즐길 수 있습니다.",
          },
        },
        {
          "@type": "Question",
          name: "몇 강부터 시작할 수 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "16강, 8강, 4강 중에서 원하는 라운드를 선택할 수 있습니다. 각 주제별로 16명의 후보가 준비되어 있습니다.",
          },
        },
        {
          "@type": "Question",
          name: "어떤 주제가 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "음식 월드컵, 여행지 월드컵, 동물 월드컵, 취미 월드컵, 계절 월드컵, 디저트 월드컵 총 6가지 주제가 있습니다.",
          },
        },
      ],
    },
  ],
};

export default function WorldcupLayout({
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
