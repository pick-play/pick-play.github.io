import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "에임 테스트 - 마우스 정확도 훈련 | PickPlay",
  description:
    "30초 에임 트레이너로 마우스 정확도와 반응속도를 테스트하고 훈련하세요. 쉬움·보통·어려움 3단계 난이도, 적중률과 평균 반응시간 통계 제공.",
  keywords: [
    "에임 테스트",
    "에임 트레이너",
    "마우스 정확도",
    "반응속도 테스트",
    "클릭 훈련",
    "FPS 에임",
    "마우스 훈련",
    "에임 향상",
    "클릭 정확도",
  ],
  openGraph: {
    title: "에임 테스트 - 마우스 정확도 훈련",
    description:
      "30초 에임 트레이너로 마우스 정확도와 반응속도를 훈련하세요. 3단계 난이도와 상세 통계를 제공합니다.",
    url: "https://pick-play.github.io/aim-test/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 에임 테스트",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/aim-test/",
    languages: {
      "x-default": "https://pick-play.github.io/aim-test/",
      ko: "https://pick-play.github.io/aim-test/",
      en: "https://pick-play.github.io/en/aim-test/",
      ja: "https://pick-play.github.io/jp/aim-test/",
      "zh-CN": "https://pick-play.github.io/cn/aim-test/",
      es: "https://pick-play.github.io/es/aim-test/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "에임 테스트 - 마우스 정확도 훈련",
      url: "https://pick-play.github.io/aim-test/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      description:
        "30초 에임 트레이너로 마우스 정확도와 반응속도를 테스트하세요. 쉬움·보통·어려움 3단계 난이도, 적중률과 평균 반응시간을 측정합니다.",
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
          name: "에임 테스트",
          item: "https://pick-play.github.io/aim-test/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "에임 테스트는 어떻게 진행되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "화면에 나타나는 원형 타겟을 클릭하면 됩니다. 30초 동안 가능한 많은 타겟을 클릭하여 점수를 올리세요. 쉬움(큰 타겟), 보통(중간 타겟), 어려움(작은 타겟) 세 가지 난이도 중 선택할 수 있습니다.",
          },
        },
        {
          "@type": "Question",
          name: "에임 테스트로 어떤 정보를 확인할 수 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "총 적중 수, 마우스 정확도(%), 평균 반응 시간(ms), 난이도별 최고 점수를 확인할 수 있습니다. 최고 점수는 브라우저에 저장되어 다음 방문 시에도 유지됩니다.",
          },
        },
        {
          "@type": "Question",
          name: "에임 트레이너가 FPS 게임에 도움이 되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "네, 에임 트레이너는 마우스 정확도와 반응속도를 향상시키는 데 효과적입니다. 어려움 난이도의 작은 타겟 훈련은 특히 정밀한 조준이 필요한 FPS 게임에 도움이 됩니다.",
          },
        },
      ],
    },
  ],
};

export default function AimTestLayout({
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
