import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "타이머 & 스톱워치 - 온라인 시간 측정",
  description:
    "무료 온라인 타이머와 스톱워치. 카운트다운 타이머, 프리셋 시간, 랩 타임 기능까지. 공부, 운동, 요리에 활용하세요.",
  keywords: [
    "온라인 타이머",
    "스톱워치",
    "카운트다운",
    "타이머 앱",
    "시간 측정",
    "무료 타이머",
  ],
  openGraph: {
    title: "타이머 & 스톱워치 - 온라인 시간 측정",
    description: "무료 온라인 타이머와 스톱워치로 시간을 측정하세요.",
    url: "https://pick-play.github.io/timer/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/timer/",
    languages: {
      "x-default": "https://pick-play.github.io/timer/",
      ko: "https://pick-play.github.io/timer/",
      en: "https://pick-play.github.io/en/timer/",
      ja: "https://pick-play.github.io/jp/timer/",
      "zh-CN": "https://pick-play.github.io/cn/timer/",
      es: "https://pick-play.github.io/es/timer/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "타이머 & 스톱워치",
      description: "무료 온라인 타이머와 스톱워치. 카운트다운, 프리셋, 랩 타임 기능 제공.",
      url: "https://pick-play.github.io/timer/",
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
          name: "타이머 & 스톱워치",
          item: "https://pick-play.github.io/timer/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "타이머와 스톱워치의 차이는 무엇인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "타이머는 설정한 시간에서 0까지 카운트다운하며, 완료 시 알림음이 울립니다. 스톱워치는 0부터 시간을 측정하며 랩 타임 기록 기능을 제공합니다.",
          },
        },
        {
          "@type": "Question",
          name: "타이머 알림음이 들리지 않아요",
          acceptedAnswer: {
            "@type": "Answer",
            text: "브라우저 설정에서 소리가 허용되어 있는지 확인하세요. Web Audio API를 사용하므로 별도 설치가 필요 없습니다.",
          },
        },
        {
          "@type": "Question",
          name: "랩 타임은 어떻게 사용하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "스톱워치 실행 중 '랩' 버튼을 누르면 현재 시간이 기록됩니다. 여러 구간의 시간을 비교할 때 유용합니다.",
          },
        },
      ],
    },
  ],
};

export default function TimerLayout({ children }: { children: React.ReactNode }) {
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
