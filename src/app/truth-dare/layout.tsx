import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "진실 혹은 도전 - 진실게임, 벌칙게임 | PickPlay",
  description:
    "친구들과 함께하는 진실 혹은 도전! 200개 이상의 질문과 미션으로 파티를 더 재미있게. 연애, 우정, 일상 카테고리별 다양한 질문.",
  keywords: [
    "진실 혹은 거짓",
    "진실게임",
    "진실 혹은 도전",
    "벌칙게임",
    "파티게임",
    "술자리 게임",
  ],
  openGraph: {
    title: "진실 혹은 도전 - 파티 필수 게임",
    description:
      "진실 or 도전! 200개 이상의 질문과 미션으로 친구들과 더 재미있게",
    url: "https://pick-play.github.io/truth-dare",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 선택과 재미를 한 번에",
      },
    ],
  },
  alternates: { canonical: "https://pick-play.github.io/truth-dare" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "진실 혹은 도전 - 파티 필수 게임",
      url: "https://pick-play.github.io/truth-dare",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      description:
        "연애, 우정, 학교/직장, 일상 카테고리의 200개 이상 질문과 미션으로 즐기는 진실 혹은 도전 게임.",
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
          name: "진실 혹은 도전",
          item: "https://pick-play.github.io/truth-dare",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "진실 혹은 도전은 어떻게 진행하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "순서가 된 사람이 '진실' 또는 '도전' 버튼을 선택합니다. 진실을 선택하면 솔직하게 질문에 답해야 하고, 도전을 선택하면 주어진 미션을 수행해야 합니다. 거부하면 벌칙을 받습니다.",
          },
        },
        {
          "@type": "Question",
          name: "어떤 카테고리의 질문이 준비되어 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "연애, 우정, 학교/직장, 일상 총 4가지 카테고리가 있으며, 각 카테고리마다 순한맛/보통/매운맛 3단계의 강도로 구분되어 있습니다. 총 200개 이상의 질문과 미션이 준비되어 있습니다.",
          },
        },
        {
          "@type": "Question",
          name: "몇 명이서 플레이할 수 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "2명부터 여러 명까지 함께 즐길 수 있습니다. 3~8명 정도가 가장 재미있게 즐길 수 있는 인원입니다. 술자리나 파티에서 특히 인기 있는 게임입니다.",
          },
        },
      ],
    },
  ],
};

export default function TruthDareLayout({
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
