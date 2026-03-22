import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "초성 퀴즈 - 초성만 보고 맞춰봐",
  description:
    "초성만 보고 단어를 맞춰보세요! 음식, 동물, 영화, 장소, 유명인 등 다양한 카테고리의 100개 이상 단어로 즐기는 초성 퀴즈 게임.",
  keywords: [
    "초성 퀴즈",
    "초성 게임",
    "한글 퀴즈",
    "단어 맞추기",
    "초성퀴즈 게임",
    "파티 게임",
  ],
  openGraph: {
    title: "초성 퀴즈 - 초성만 보고 맞춰봐",
    description: "100개 이상의 단어! 초성만 보고 맞추는 재미있는 퀴즈 게임",
    url: "https://pick-play.github.io/chosung-quiz",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 선택과 재미를 한 번에",
      },
    ],
  },
  alternates: { canonical: "https://pick-play.github.io/chosung-quiz" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "초성 퀴즈 - 초성만 보고 맞춰봐",
      url: "https://pick-play.github.io/chosung-quiz",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      description:
        "음식, 동물, 영화, 장소, 유명인 5가지 카테고리의 초성만 보고 단어를 맞추는 퀴즈 게임. 타이머와 힌트 기능으로 더 재미있게 즐길 수 있습니다.",
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
          name: "초성 퀴즈",
          item: "https://pick-play.github.io/chosung-quiz",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "초성 퀴즈는 어떻게 하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "한글 단어의 초성(첫 자음)만 보고 원래 단어를 맞추는 게임입니다. 힌트를 사용하거나 타이머를 설정하여 더 재미있게 즐길 수 있습니다.",
          },
        },
        {
          "@type": "Question",
          name: "어떤 카테고리가 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "음식, 동물, 영화, 장소, 유명인 5가지 카테고리에 각 20개씩 총 100개의 단어가 준비되어 있습니다.",
          },
        },
      ],
    },
  ],
};

export default function ChosungQuizLayout({
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
