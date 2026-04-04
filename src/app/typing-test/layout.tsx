import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "타이핑 속도 테스트 - 타자 연습 | PickPlay",
  description:
    "무료 온라인 타이핑 속도 테스트. 분당 타수(WPM)와 정확도를 실시간으로 측정하고, 난이도별 문장으로 타자 실력을 키워보세요.",
  keywords: [
    "타이핑 테스트",
    "타자 연습",
    "타이핑 속도",
    "WPM 측정",
    "키보드 연습",
    "분당 타수",
    "타자 속도",
  ],
  openGraph: {
    title: "타이핑 속도 테스트 - 타자 연습 | PickPlay",
    description: "무료 온라인 타이핑 속도 테스트. 분당 타수와 정확도를 실시간으로 측정하세요.",
    url: "https://pick-play.github.io/typing-test/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/typing-test/",
    languages: {
      "x-default": "https://pick-play.github.io/typing-test/",
      ko: "https://pick-play.github.io/typing-test/",
      en: "https://pick-play.github.io/en/typing-test/",
      ja: "https://pick-play.github.io/jp/typing-test/",
      "zh-CN": "https://pick-play.github.io/cn/typing-test/",
      es: "https://pick-play.github.io/es/typing-test/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "타이핑 속도 테스트",
      description:
        "무료 온라인 타이핑 속도 테스트. 분당 타수(WPM)와 정확도를 실시간으로 측정하고, 난이도별 문장으로 타자 실력을 키워보세요.",
      url: "https://pick-play.github.io/typing-test/",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      inLanguage: "ko",
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
          name: "타이핑 속도 테스트",
          item: "https://pick-play.github.io/typing-test/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "타수(WPM)는 어떻게 계산하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "한국어는 분당 입력한 글자 수를 5로 나누어 타수를 계산합니다. 국제 표준에서는 5글자를 1단어로 간주합니다.",
          },
        },
        {
          "@type": "Question",
          name: "정확도는 어떻게 계산하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "전체 입력한 글자 중 올바르게 입력한 글자의 비율입니다. 오타를 수정해도 오류 횟수는 증가합니다.",
          },
        },
        {
          "@type": "Question",
          name: "최고 기록은 어디에 저장되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "최고 기록은 브라우저의 로컬 스토리지에 저장되어 같은 기기에서 유지됩니다.",
          },
        },
      ],
    },
  ],
};

export default function TypingTestLayout({
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
