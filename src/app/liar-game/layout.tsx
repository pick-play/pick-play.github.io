import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "라이어 게임 - 친구들과 함께하는 파티 게임",
  description:
    "라이어 게임을 온라인으로 즐기세요! 다양한 주제(일반상식, 음식, 직업, 동물, 영화, 장소, 스포츠)에서 라이어를 찾아내는 재미있는 파티 게임. 모바일에서도 편하게 플레이할 수 있습니다.",
  keywords: [
    "라이어 게임",
    "파티 게임",
    "보드게임",
    "친구 게임",
    "단체 게임",
    "술자리 게임",
    "라이어 찾기",
  ],
  openGraph: {
    title: "라이어 게임 - 파티 필수 게임",
    description:
      "라이어를 찾아라! 다양한 주제의 단어로 친구들과 즐기는 파티 게임",
    url: "https://pick-play.github.io/liar-game/",
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
    canonical: "https://pick-play.github.io/liar-game/",
    languages: {
      "x-default": "https://pick-play.github.io/liar-game/",
      ko: "https://pick-play.github.io/liar-game/",
      en: "https://pick-play.github.io/en/liar-game/",
      ja: "https://pick-play.github.io/jp/liar-game/",
      "zh-CN": "https://pick-play.github.io/cn/liar-game/",
      es: "https://pick-play.github.io/es/liar-game/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "라이어 게임 - 파티 필수 게임",
      url: "https://pick-play.github.io/liar-game/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      description:
        "다양한 주제의 단어로 라이어를 찾아내는 재미있는 파티 게임. 3~10명이 함께 즐길 수 있습니다.",
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
          name: "라이어 게임",
          item: "https://pick-play.github.io/liar-game/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "라이어 게임은 어떻게 진행하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "한 명의 라이어를 제외한 모든 플레이어가 같은 단어를 받습니다. 라이어는 단어를 모르지만 들키지 않아야 합니다. 토론 후 투표로 라이어를 찾아내면 일반 플레이어가 승리하고, 라이어가 숨으면 라이어가 승리합니다.",
          },
        },
        {
          "@type": "Question",
          name: "몇 명이서 플레이할 수 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "3명에서 10명까지 플레이할 수 있습니다. 5~7명이 가장 재미있게 즐길 수 있는 인원입니다.",
          },
        },
        {
          "@type": "Question",
          name: "어떤 주제 카테고리가 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "일반상식, 음식, 직업, 동물, 영화/드라마, 장소, 스포츠, 음악 총 8가지 카테고리를 제공합니다. 각 카테고리마다 12개 이상의 단어가 준비되어 있어 반복 없이 즐길 수 있습니다.",
          },
        },
      ],
    },
  ],
};

export default function LiarGameLayout({
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
