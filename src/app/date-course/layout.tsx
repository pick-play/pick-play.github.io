import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "데이트 코스 추천 - 전국 10개 도시",
  description:
    "서울, 부산, 대구, 인천, 광주, 대전, 울산, 세종, 경기 등 전국 10개 도시 200가지 데이트 코스를 추천받으세요. 낮/밤 시간대별, 카페·야외·실내·액티비티 취향별 맞춤 코스를 분위기 지도에서 골라드립니다.",
  keywords: [
    "데이트 코스 추천",
    "서울 데이트",
    "부산 데이트",
    "대구 데이트",
    "인천 데이트",
    "경기도 데이트",
    "데이트 장소",
    "커플 데이트",
    "데이트 코스",
    "실내 데이트",
    "야외 데이트",
    "카페 데이트",
    "낮 데이트",
    "밤 데이트",
    "주말 데이트",
    "데이트 플래너",
  ],
  openGraph: {
    title: "데이트 코스 추천 - 전국 10개 도시 200+ 코스",
    description:
      "분위기 지도에서 원하는 느낌을 찍으면, 완벽한 데이트 코스를 짜드립니다. 서울부터 경기까지!",
    url: "https://pick-play.github.io/date-course/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 선택과 재미를 한 번에",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/date-course/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "데이트 코스 추천 - 전국 10개 도시",
      url: "https://pick-play.github.io/date-course/",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      description: "전국 10개 도시 200가지 데이트 코스를 분위기 지도에서 추천받으세요.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: "https://pick-play.github.io/" },
        { "@type": "ListItem", position: 2, name: "데이트 코스 추천", item: "https://pick-play.github.io/date-course/" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "데이트 코스 추천은 어떻게 받나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "도시를 선택하고 낮/밤 시간대를 고른 뒤, 분위기 지도에서 조용한~활동적, 실내~야외 축으로 원하는 느낌을 클릭하세요. 슬롯머신이 카페, 식사, 산책, 액티비티, 관광 등으로 구성된 완벽한 데이트 코스를 짜드립니다.",
          },
        },
        {
          "@type": "Question",
          name: "어떤 도시의 데이트 코스를 추천받을 수 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "서울, 부산, 대구, 인천, 광주, 대전, 울산, 세종, 경기북부, 경기남부 총 10개 도시의 200가지 이상 데이트 코스를 지원합니다.",
          },
        },
        {
          "@type": "Question",
          name: "데이트 코스에 소요 시간이 표시되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "네, 추천된 코스의 각 장소별 예상 소요 시간이 표시됩니다. 카페 1시간, 식사 1.5시간 등 구체적인 시간 배분을 확인할 수 있어 일정 계획에 도움이 됩니다.",
          },
        },
      ],
    },
  ],
};

export default function DateCourseLayout({
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
