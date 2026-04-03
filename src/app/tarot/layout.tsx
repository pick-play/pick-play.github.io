import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yes or No 타로 - 무료 타로 카드 점 | PickPlay",
  description:
    "고민이 있을 때 타로 카드에 물어보세요! 22장의 메이저 아르카나 카드로 Yes 또는 No 답을 알려드립니다. 무료 온라인 타로 점.",
  keywords: ["타로", "타로 카드", "Yes or No 타로", "무료 타로", "타로 점", "운세"],
  openGraph: {
    title: "Yes or No 타로 - 무료 타로 카드 점 | PickPlay",
    description:
      "고민이 있을 때 타로 카드에 물어보세요! 22장의 메이저 아르카나 카드로 Yes 또는 No 답을 알려드립니다.",
    url: "https://pick-play.github.io/tarot/",
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
    canonical: "https://pick-play.github.io/tarot/",
    languages: {
      "x-default": "https://pick-play.github.io/tarot/",
      ko: "https://pick-play.github.io/tarot/",
      en: "https://pick-play.github.io/en/tarot/",
      ja: "https://pick-play.github.io/jp/tarot/",
      "zh-CN": "https://pick-play.github.io/cn/tarot/",
      es: "https://pick-play.github.io/es/tarot/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Yes or No 타로 - 무료 타로 카드 점",
      url: "https://pick-play.github.io/tarot/",
      applicationCategory: "EntertainmentApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      description:
        "22장의 메이저 아르카나 타로 카드로 Yes 또는 No 답을 알려드리는 무료 온라인 타로 점입니다.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "홈",
          item: "https://pick-play.github.io/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Yes or No 타로",
          item: "https://pick-play.github.io/tarot/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Yes or No 타로는 어떻게 사용하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "질문을 입력하고 '카드 뽑기' 버튼을 누르세요. 5장의 카드 중 하나를 선택하면 타로 카드가 뒤집히며 Yes, No, Maybe 중 하나의 답과 상세한 해석을 알려드립니다.",
          },
        },
        {
          "@type": "Question",
          name: "타로 카드 결과를 맹신해도 되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "타로 카드는 재미와 영감을 위한 도구입니다. 결과를 맹신하기보다는 자신의 직관과 상황을 함께 고려하여 참고용으로 활용하세요. 중요한 결정은 스스로 내리는 것이 좋습니다.",
          },
        },
        {
          "@type": "Question",
          name: "메이저 아르카나가 무엇인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "메이저 아르카나는 타로 카드 78장 중 22장의 주요 카드입니다. 바보(0번)부터 세계(21번)까지 삶의 중요한 여정과 원형적인 에너지를 상징하며, 강력한 메시지를 전달합니다.",
          },
        },
      ],
    },
  ],
};

export default function TarotLayout({
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
