import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "D-Day 계산기 - 디데이 카운트다운 | PickPlay",
  description:
    "D-Day 계산기로 중요한 날까지 남은 일수를 계산하세요. 수능, 생일, 기념일 등 다양한 디데이를 한눈에 관리할 수 있습니다. 무료 온라인 D-Day 카운터.",
  keywords: [
    "D-Day 계산기",
    "디데이 계산",
    "디데이 카운트다운",
    "남은 일수 계산",
    "수능 디데이",
    "기념일 계산기",
    "D데이 계산기",
    "디데이 앱",
    "날짜 계산기",
    "카운트다운",
  ],
  openGraph: {
    title: "D-Day 계산기 - 디데이 카운트다운 | PickPlay",
    description: "중요한 날까지 남은 일수를 계산하세요",
    url: "https://pick-play.github.io/d-day",
  },
  alternates: {
    canonical: "https://pick-play.github.io/d-day",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "D-Day 계산기",
      description: "D-Day 카운트다운 계산기",
      url: "https://pick-play.github.io/d-day",
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
          name: "D-Day 계산기",
          item: "https://pick-play.github.io/d-day",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "D-Day는 어떻게 계산하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "목표 날짜에서 오늘 날짜를 빼면 됩니다. 남은 일수가 양수면 D-숫자(예: D-30), 오늘이면 D-Day, 지난 날짜면 D+숫자(예: D+1)로 표시됩니다.",
          },
        },
        {
          "@type": "Question",
          name: "여러 개의 D-Day를 동시에 관리할 수 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "네, PickPlay D-Day 계산기는 여러 개의 디데이 이벤트를 동시에 추가하고 관리할 수 있습니다. 각 이벤트에 제목과 이모지를 설정할 수 있으며, 수능·생일·기념일 등 프리셋도 제공합니다.",
          },
        },
        {
          "@type": "Question",
          name: "D-Day 결과를 공유할 수 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "네, 각 D-Day 카드의 복사 버튼을 누르면 결과 텍스트가 클립보드에 복사됩니다. 카카오톡이나 SNS에 바로 붙여넣기해서 공유할 수 있습니다.",
          },
        },
      ],
    },
  ],
};

export default function DdayLayout({
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
