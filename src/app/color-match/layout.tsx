import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "색깔 맞추기 게임 - 스트룹 테스트 | PickPlay",
  description:
    "스트룹 테스트 기반 색깔 맞추기 게임! 글자의 색깔과 뜻 중 어떤 것을 먼저 인식하나요? 집중력과 반응속도를 테스트해보세요. 30초 타이머, 3가지 난이도.",
  keywords: [
    "색깔 맞추기",
    "스트룹 테스트",
    "집중력 게임",
    "색깔 게임",
    "반응속도 테스트",
    "인지 게임",
    "뇌 트레이닝",
    "색깔 퀴즈",
    "스트룹 효과",
    "color match",
    "stroop test",
  ],
  openGraph: {
    title: "색깔 맞추기 게임 - 스트룹 테스트",
    description: "글자 색깔과 단어 뜻이 다를 때 어떤 것을 먼저 인식하나요? 집중력 테스트!",
    url: "https://pick-play.github.io/color-match/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 색깔 맞추기 스트룹 테스트",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/color-match/",
    languages: {
      "x-default": "https://pick-play.github.io/color-match/",
      ko: "https://pick-play.github.io/color-match/",
      en: "https://pick-play.github.io/en/color-match/",
      ja: "https://pick-play.github.io/jp/color-match/",
      "zh-CN": "https://pick-play.github.io/cn/color-match/",
      es: "https://pick-play.github.io/es/color-match/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "색깔 맞추기 게임 - 스트룹 테스트",
      url: "https://pick-play.github.io/color-match/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      description:
        "스트룹 테스트 기반 색깔 맞추기 게임. 글자의 폰트 색깔 또는 단어의 뜻을 맞추는 두 가지 모드와 3가지 난이도로 집중력을 테스트하세요.",
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
          name: "색깔 맞추기 게임",
          item: "https://pick-play.github.io/color-match/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "스트룹 테스트란 무엇인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "스트룹 테스트는 색깔 이름이 적힌 단어가 다른 색깔로 표시될 때 글자 색깔과 단어 의미 사이의 인지 간섭 효과를 측정하는 심리학 실험입니다. 집중력과 처리 속도를 측정하는 데 활용됩니다.",
          },
        },
        {
          "@type": "Question",
          name: "색깔 맞추기 게임은 어떻게 플레이하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "화면 중앙에 색깔 이름이 표시됩니다. 색깔 맞추기 모드에서는 글자의 폰트 색깔을, 단어 맞추기 모드에서는 글자가 뜻하는 색깔을 선택하세요. 30초 안에 최대한 많이 맞추어 점수를 획득하세요.",
          },
        },
        {
          "@type": "Question",
          name: "점수는 어떻게 계산되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "정답 시 +10점, 오답 시 -5점입니다. 연속 정답(3개 이상)에는 콤보 보너스가 적용되어 점수가 2배, 5개 이상 시 3배가 됩니다.",
          },
        },
      ],
    },
  ],
};

export default function ColorMatchLayout({
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
