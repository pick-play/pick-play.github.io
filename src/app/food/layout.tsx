import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오늘 뭐 먹지? - 메뉴 추천 룰렛",
  description:
    "뭐 먹을지 고민될 때! 한식, 일식, 중식, 양식, 분식, 디저트 등 130가지 메뉴 중 취향에 맞는 음식을 추천받으세요. 맛 지도에서 담백~자극, 가벼운~고급 취향을 선택하면 슬롯머신이 메뉴를 골라드립니다.",
  keywords: [
    "오늘 뭐 먹지",
    "점심 메뉴 추천",
    "저녁 메뉴 추천",
    "음식 추천 룰렛",
    "랜덤 메뉴 추천",
    "메뉴 고르기",
    "뭐먹지",
    "음식 추천",
    "한식 추천",
    "일식 추천",
    "디저트 추천",
    "회식 메뉴",
    "혼밥 메뉴",
    "배달 메뉴 추천",
  ],
  openGraph: {
    title: "오늘 뭐 먹지? - 130가지 메뉴 추천 룰렛",
    description:
      "고민은 줄이고 선택은 빠르게! 맛 지도에서 취향을 찍으면 슬롯머신이 메뉴를 골라드립니다.",
    url: "https://pick-play.github.io/food/",
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
    canonical: "https://pick-play.github.io/food/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "오늘 뭐 먹지? - 메뉴 추천 룰렛",
      url: "https://pick-play.github.io/food/",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      description: "130가지 메뉴 중 취향에 맞는 음식을 맛 지도에서 추천받으세요.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: "https://pick-play.github.io/" },
        { "@type": "ListItem", position: 2, name: "오늘 뭐 먹지?", item: "https://pick-play.github.io/food/" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "오늘 뭐 먹지? 메뉴 추천은 어떻게 받나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "맛 지도에서 담백~자극, 가벼운~고급 축으로 취향 위치를 클릭하면, 근처에 있는 메뉴들 중 슬롯머신이 랜덤으로 하나를 골라드립니다. 한식, 일식, 중식, 양식, 아시안, 분식, 디저트, 패스트푸드 등 130가지 메뉴를 지원합니다.",
          },
        },
        {
          "@type": "Question",
          name: "점심 메뉴 추천받을 수 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "네! 맛 지도 모드에서 취향 위치를 선택하거나, 필터 모드에서 음식 종류와 가격대를 설정하면 점심·저녁 구분 없이 상황에 맞는 메뉴를 추천받을 수 있습니다.",
          },
        },
        {
          "@type": "Question",
          name: "무료로 사용할 수 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "네, PickPlay의 모든 기능은 완전 무료입니다. 회원가입도 필요 없고, 앱 설치 없이 웹 브라우저에서 바로 사용할 수 있습니다.",
          },
        },
      ],
    },
  ],
};

export default function FoodLayout({
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
