import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "회식비 정산 계산기 - 더치페이 / N빵",
  description:
    "회식비, 모임비를 간편하게 정산하세요. 더치페이, N빵, 차등 정산까지 지원하는 무료 정산 계산기. 누가 얼마를 내야 하는지 한눈에 확인할 수 있습니다.",
  keywords: [
    "회식비 정산",
    "더치페이 계산기",
    "N빵 계산기",
    "정산 계산기",
    "모임비 정산",
    "회식 정산",
    "송금 계산",
    "돈 나누기",
    "회비 정산",
    "술값 정산",
    "밥값 정산",
    "경비 정산",
  ],
  openGraph: {
    title: "회식비 정산 계산기 - 더치페이 / N빵",
    description:
      "회식비, 모임비를 간편하게 정산하세요. 누가 얼마를 내야 하는지 한눈에!",
    url: "https://pick-play.github.io/settlement",
  },
  alternates: {
    canonical: "https://pick-play.github.io/settlement",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "회식비 정산 계산기 - 더치페이 / N빵",
      url: "https://pick-play.github.io/settlement",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      description: "회식비, 모임비를 간편하게 정산하세요. 더치페이, N빵, 차등 정산까지 지원합니다.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: "https://pick-play.github.io" },
        { "@type": "ListItem", position: 2, name: "회식비 정산", item: "https://pick-play.github.io/settlement" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "회식비 정산은 어떻게 하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "참여자 이름을 입력하고, 각 지출 항목(식사, 2차 등)의 금액과 지불자를 입력하면 자동으로 최소 송금 횟수로 정산 결과를 계산해 드립니다. 특정 항목에 참여하지 않은 사람은 제외할 수도 있습니다.",
          },
        },
        {
          "@type": "Question",
          name: "더치페이와 N빵의 차이가 뭔가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "더치페이는 각자 먹은 만큼 내는 방식이고, N빵은 총액을 인원수로 균등하게 나누는 방식입니다. PickPlay 정산 계산기는 두 방식 모두 지원하며, 항목별로 참여자를 제외하는 차등 정산도 가능합니다.",
          },
        },
        {
          "@type": "Question",
          name: "정산 결과를 공유할 수 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "네, 정산 결과 화면에서 '결과 복사' 버튼을 누르면 텍스트 형태로 클립보드에 복사됩니다. 카카오톡이나 메신저에 바로 붙여넣기하여 공유할 수 있습니다.",
          },
        },
      ],
    },
  ],
};

export default function SettlementLayout({
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
