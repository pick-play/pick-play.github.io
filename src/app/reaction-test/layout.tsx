import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "반응속도 테스트 - 나의 반응속도는? | PickPlay",
  description:
    "초록색으로 바뀌면 바로 클릭! 나의 반응속도를 ms 단위로 측정하고 평균 인간과 비교해보세요. 최고 기록과 최근 5회 평균도 확인할 수 있어요.",
  keywords: [
    "반응속도 테스트",
    "반응속도 측정",
    "반응속도",
    "반응 테스트",
    "클릭 반응속도",
    "반응속도 게임",
    "reaction time test",
    "반응속도 평균",
  ],
  openGraph: {
    title: "반응속도 테스트 - 나의 반응속도는?",
    description: "초록색이 되면 바로 클릭! 평균 인간(215ms)과 나의 반응속도를 비교해보세요.",
    url: "https://pick-play.github.io/reaction-test/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 반응속도 테스트",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/reaction-test/",
    languages: {
      "x-default": "https://pick-play.github.io/reaction-test/",
      ko: "https://pick-play.github.io/reaction-test/",
      en: "https://pick-play.github.io/en/reaction-test/",
      ja: "https://pick-play.github.io/jp/reaction-test/",
      "zh-CN": "https://pick-play.github.io/cn/reaction-test/",
      es: "https://pick-play.github.io/es/reaction-test/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "반응속도 테스트",
      url: "https://pick-play.github.io/reaction-test/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      description:
        "초록색 화면이 나타나면 바로 클릭해 반응속도를 ms 단위로 측정합니다. 평균 인간(215ms)과 비교하고 최고 기록을 갱신해보세요.",
      inLanguage: "ko",
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
          name: "반응속도 테스트",
          item: "https://pick-play.github.io/reaction-test/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "평균 인간의 반응속도는 얼마인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "일반적인 인간의 시각 반응속도는 약 200~250ms입니다. 150ms 이하면 매우 빠른 편에 속합니다.",
          },
        },
        {
          "@type": "Question",
          name: "반응속도에 영향을 주는 요소는 무엇인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "피로, 집중력, 카페인 섭취, 나이 등이 반응속도에 영향을 줍니다. 최상의 결과를 위해 집중하고 편안한 상태에서 테스트하세요.",
          },
        },
        {
          "@type": "Question",
          name: "더 빠르게 할 수 있는 방법이 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "충분한 수면, 규칙적인 운동, 그리고 꾸준한 연습이 반응속도 향상에 도움이 됩니다.",
          },
        },
      ],
    },
  ],
};

export default function ReactionTestLayout({
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
