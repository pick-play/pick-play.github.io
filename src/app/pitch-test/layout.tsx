import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "절대음감 테스트 - 나의 음감 능력은? | PickPlay",
  description:
    "순수 사인파 음을 듣고 음이름을 맞추는 절대음감 테스트. 초급(흰 건반)부터 전문가(3옥타브)까지 4단계 난이도. 피아노 음 맞추기로 나의 음악 능력을 확인하세요.",
  keywords: [
    "절대음감 테스트",
    "음감 테스트",
    "절대음감",
    "상대음감",
    "피아노 음 맞추기",
    "음악 능력 테스트",
    "음이름 맞추기",
    "음감 훈련",
    "퍼펙트 피치",
    "음정 맞추기",
  ],
  openGraph: {
    title: "절대음감 테스트 - 나의 음감 능력은?",
    description:
      "순수 사인파 음을 듣고 음이름을 맞추는 절대음감 테스트. 초급부터 전문가까지 4단계 난이도로 나의 음악 능력을 확인하세요.",
    url: "https://pick-play.github.io/pitch-test/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 절대음감 테스트",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/pitch-test/",
    languages: {
      "x-default": "https://pick-play.github.io/pitch-test/",
      ko: "https://pick-play.github.io/pitch-test/",
      en: "https://pick-play.github.io/en/pitch-test/",
      ja: "https://pick-play.github.io/jp/pitch-test/",
      "zh-CN": "https://pick-play.github.io/cn/pitch-test/",
      es: "https://pick-play.github.io/es/pitch-test/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "절대음감 테스트 - 나의 음감 능력은?",
      url: "https://pick-play.github.io/pitch-test/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      description:
        "순수 사인파 음을 듣고 음이름을 맞추는 절대음감 테스트. 초급(흰 건반)부터 전문가(3옥타브)까지 4단계 난이도. 피아노 음 맞추기로 나의 음악 능력을 확인하세요.",
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
          name: "절대음감 테스트",
          item: "https://pick-play.github.io/pitch-test/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "절대음감이란 무엇인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "절대음감(Perfect Pitch)은 어떤 참고음 없이도 들리는 음의 이름(도·레·미 등)을 즉시 알아내는 능력입니다. 전 세계 인구의 약 0.01~1%만이 가지고 있으며, 주로 어린 시절 음악 교육과 연관됩니다.",
          },
        },
        {
          "@type": "Question",
          name: "상대음감과 절대음감의 차이는 무엇인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "절대음감은 기준음 없이 음을 인식하는 능력이고, 상대음감은 기준음을 듣고 다른 음과의 관계를 파악하는 능력입니다. 대부분의 음악가들은 상대음감을 훈련을 통해 개발할 수 있습니다.",
          },
        },
        {
          "@type": "Question",
          name: "이 테스트는 어떻게 작동하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Web Audio API를 사용해 순수 사인파 음을 생성합니다. 음을 들은 후 피아노 건반에서 해당하는 음을 클릭하세요. 초급은 흰 건반(7음), 중급은 12음, 고급/전문가는 2~3옥타브에 걸친 24~36음 중에서 맞춰야 합니다.",
          },
        },
        {
          "@type": "Question",
          name: "다시 듣기 기능이 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "라운드당 최대 2번까지 다시 듣기가 가능합니다. 단, 고급과 전문가 모드에서는 다시 듣기를 사용할 때마다 1점이 차감됩니다.",
          },
        },
        {
          "@type": "Question",
          name: "절대음감은 훈련으로 개발할 수 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "성인이 된 후 진정한 절대음감을 개발하기는 매우 어렵습니다. 하지만 규칙적인 음감 훈련을 통해 특정 음을 기억하거나 상대음감을 크게 향상시킬 수 있습니다.",
          },
        },
      ],
    },
  ],
};

export default function PitchTestLayout({
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
