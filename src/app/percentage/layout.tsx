import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "퍼센트 계산기 - 백분율 쉽게 계산",
  description:
    "무료 온라인 퍼센트 계산기. X의 Y%가 얼마인지, X는 Y의 몇 %인지, 변화율까지 한 번에 계산하세요. 팁 계산기 기능도 제공합니다.",
  keywords: [
    "퍼센트 계산기",
    "백분율 계산기",
    "퍼센트 계산",
    "할인율 계산",
    "변화율 계산",
    "팁 계산기",
    "비율 계산기",
  ],
  openGraph: {
    title: "퍼센트 계산기 - 백분율 쉽게 계산",
    description: "무료 온라인 퍼센트 계산기. X의 Y%, 변화율, 팁 계산까지 한번에.",
    url: "https://pick-play.github.io/percentage/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/percentage/",
    languages: {
      "x-default": "https://pick-play.github.io/percentage/",
      ko: "https://pick-play.github.io/percentage/",
      en: "https://pick-play.github.io/en/percentage/",
      ja: "https://pick-play.github.io/jp/percentage/",
      "zh-CN": "https://pick-play.github.io/cn/percentage/",
      es: "https://pick-play.github.io/es/percentage/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "퍼센트 계산기",
      description:
        "무료 온라인 퍼센트 계산기. X의 Y%, X는 Y의 몇 %, 변화율, 팁 계산 기능 제공.",
      url: "https://pick-play.github.io/percentage/",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
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
          name: "퍼센트 계산기",
          item: "https://pick-play.github.io/percentage/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "퍼센트(%)란 무엇인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "퍼센트는 전체를 100으로 봤을 때의 비율입니다. 예를 들어 200의 15%는 200 × 0.15 = 30입니다.",
          },
        },
        {
          "@type": "Question",
          name: "변화율은 어떻게 계산하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "변화율(%) = (새 값 - 원래 값) ÷ 원래 값 × 100 입니다. 예를 들어 100에서 150으로 바뀌면 +50%입니다.",
          },
        },
        {
          "@type": "Question",
          name: "팁 계산기는 어떻게 사용하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "금액과 팁 퍼센트를 입력하면 팁 금액과 최종 합계가 자동으로 계산됩니다.",
          },
        },
      ],
    },
  ],
};

export default function PercentageLayout({ children }: { children: React.ReactNode }) {
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
