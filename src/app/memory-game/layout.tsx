import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "기억력 게임 - 카드 뒤집기 매칭",
  description:
    "무료 온라인 기억력 게임. 카드를 뒤집어 짝을 맞추세요. 쉬움·보통·어려움 난이도, 별점 평가, 최고 기록 저장 기능 제공.",
  keywords: [
    "기억력 게임",
    "카드 뒤집기",
    "메모리 게임",
    "짝 맞추기",
    "두뇌 게임",
    "온라인 게임",
    "무료 게임",
  ],
  openGraph: {
    title: "기억력 게임 - 카드 뒤집기 매칭",
    description: "카드를 뒤집어 짝을 맞추는 무료 온라인 기억력 게임. 난이도 3단계 지원.",
    url: "https://pick-play.github.io/memory-game/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/memory-game/",
    languages: {
      "x-default": "https://pick-play.github.io/memory-game/",
      ko: "https://pick-play.github.io/memory-game/",
      en: "https://pick-play.github.io/en/memory-game/",
      ja: "https://pick-play.github.io/jp/memory-game/",
      "zh-CN": "https://pick-play.github.io/cn/memory-game/",
      es: "https://pick-play.github.io/es/memory-game/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "기억력 게임 - 카드 뒤집기 매칭",
      description:
        "무료 온라인 기억력 게임. 카드를 뒤집어 짝을 맞추세요. 쉬움·보통·어려움 난이도 제공.",
      url: "https://pick-play.github.io/memory-game/",
      applicationCategory: "GameApplication",
      genre: "Puzzle",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
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
          name: "기억력 게임",
          item: "https://pick-play.github.io/memory-game/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "기억력 게임이란 무엇인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "카드를 두 장씩 뒤집어 같은 그림의 짝을 찾는 게임입니다. 모든 카드의 짝을 맞추면 게임이 끝납니다.",
          },
        },
        {
          "@type": "Question",
          name: "별점은 어떻게 결정되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "이동 횟수가 적을수록 높은 별점을 받습니다. 쉬움 기준 12회 이하면 별 3개, 18회 이하면 별 2개, 그 이상이면 별 1개입니다.",
          },
        },
        {
          "@type": "Question",
          name: "최고 기록은 어디에 저장되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "최고 기록은 브라우저의 로컬 저장소에 저장됩니다. 브라우저 데이터를 지우면 초기화됩니다.",
          },
        },
      ],
    },
  ],
};

export default function MemoryGameLayout({ children }: { children: React.ReactNode }) {
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
