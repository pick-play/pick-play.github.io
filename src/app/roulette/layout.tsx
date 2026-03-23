import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "랜덤 룰렛 - 결정 못할 때 돌려봐",
  description:
    "뭐 먹을지, 누가 할지 고민될 때! 랜덤 룰렛으로 결정하세요. 점심 메뉴, 벌칙 게임, 순서 정하기 등 다양한 프리셋으로 바로 시작할 수 있습니다.",
  keywords: ["랜덤 룰렛", "돌림판", "룰렛 돌리기", "결정 룰렛", "점심 메뉴 룰렛", "랜덤 뽑기"],
  openGraph: {
    title: "랜덤 룰렛 - 결정 못할 때 돌려봐",
    description:
      "고민될 때는 룰렛에 맡겨! 커스텀 항목으로 나만의 룰렛을 만들어보세요.",
    url: "https://pick-play.github.io/roulette/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 선택과 재미를 한 번에",
      },
    ],
  },
  alternates: { canonical: "https://pick-play.github.io/roulette/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "랜덤 룰렛 - 결정 못할 때 돌려봐",
      url: "https://pick-play.github.io/roulette/",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      description:
        "뭐 먹을지, 누가 할지 고민될 때 사용하는 랜덤 룰렛. 항목을 직접 추가하거나 프리셋을 선택해 바로 돌릴 수 있습니다.",
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
          name: "랜덤 룰렛",
          item: "https://pick-play.github.io/roulette/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "랜덤 룰렛은 어떻게 사용하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "원하는 항목을 입력하거나 프리셋을 선택한 후 돌리기 버튼을 누르면 됩니다. 룰렛이 회전한 후 랜덤으로 하나의 항목이 선택됩니다.",
          },
        },
        {
          "@type": "Question",
          name: "몇 개까지 항목을 추가할 수 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "최소 2개에서 최대 20개까지 항목을 추가할 수 있습니다. 프리셋을 사용하면 빠르게 시작할 수 있습니다.",
          },
        },
      ],
    },
  ],
};

export default function RouletteLayout({
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
