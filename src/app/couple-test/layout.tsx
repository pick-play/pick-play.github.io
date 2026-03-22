import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "커플 궁합 테스트 - 이름으로 보는 우리의 궁합 | PickPlay",
  description:
    "이름만 입력하면 커플 궁합을 알 수 있어요! 성격, 연애, 소통, 미래, 운명 5가지 카테고리로 분석하는 재미있는 궁합 테스트.",
  keywords: [
    "커플 궁합",
    "궁합 테스트",
    "이름 궁합",
    "연애 궁합",
    "커플 테스트",
    "궁합 보기",
    "이름으로 보는 궁합",
    "무료 궁합",
  ],
  openGraph: {
    title: "커플 궁합 테스트 - 이름으로 보는 우리의 궁합",
    description:
      "이름만 입력하면 커플 궁합을 알 수 있어요! 5가지 카테고리로 분석하는 재미있는 궁합 테스트.",
    url: "https://pick-play.github.io/couple-test",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 선택과 재미를 한 번에",
      },
    ],
  },
  alternates: { canonical: "https://pick-play.github.io/couple-test" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "커플 궁합 테스트",
      url: "https://pick-play.github.io/couple-test",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      description:
        "이름만 입력하면 커플 궁합을 알 수 있어요! 성격, 연애, 소통, 미래, 운명 5가지 카테고리로 분석하는 재미있는 궁합 테스트.",
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
          name: "커플 궁합 테스트",
          item: "https://pick-play.github.io/couple-test",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "커플 궁합 테스트는 어떻게 진행되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "두 사람의 이름을 입력하면 이름의 글자를 분석하여 성격, 연애, 소통, 미래, 운명 5가지 카테고리의 궁합 점수를 계산해 드려요. 같은 이름을 입력하면 항상 같은 결과가 나옵니다.",
          },
        },
        {
          "@type": "Question",
          name: "궁합 점수는 어떻게 계산되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "입력한 두 이름의 글자 코드를 바탕으로 독자적인 알고리즘으로 궁합 점수를 계산해요. 재미로 즐기는 테스트이므로 결과를 너무 진지하게 받아들이지 마세요!",
          },
        },
        {
          "@type": "Question",
          name: "같은 이름을 입력하면 항상 같은 결과가 나오나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "네, 맞아요! 이름 기반의 결정론적 알고리즘을 사용하므로 같은 두 이름을 입력하면 언제나 동일한 궁합 결과가 나옵니다. 친구들에게 공유해서 함께 확인해보세요.",
          },
        },
      ],
    },
  ],
};

export default function CoupleTestLayout({
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
