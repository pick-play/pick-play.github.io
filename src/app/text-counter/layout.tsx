import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "글자수 세기 - 실시간 문자 수 카운터",
  description:
    "글자수, 단어수, 문장수, 바이트 수를 실시간으로 확인하세요. 공백 포함/제외, 키워드 밀도, 읽기 시간까지 한 번에.",
  keywords: [
    "글자수 세기",
    "문자수 세기",
    "바이트 수 계산",
    "글자 카운터",
    "단어 수 세기",
    "글자수 세기 사이트",
  ],
  openGraph: {
    title: "글자수 세기 - 실시간 문자 수 카운터",
    description: "글자수, 단어수, 바이트 수를 실시간으로 확인하세요.",
    url: "https://pick-play.github.io/text-counter/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/text-counter/",
    languages: {
      "x-default": "https://pick-play.github.io/text-counter/",
      ko: "https://pick-play.github.io/text-counter/",
      en: "https://pick-play.github.io/en/text-counter/",
      ja: "https://pick-play.github.io/jp/text-counter/",
      "zh-CN": "https://pick-play.github.io/cn/text-counter/",
      es: "https://pick-play.github.io/es/text-counter/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "글자수 세기",
      description:
        "글자수, 단어수, 문장수, 바이트 수를 실시간으로 확인하는 온라인 문자 카운터",
      url: "https://pick-play.github.io/text-counter/",
      applicationCategory: "UtilityApplication",
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
          name: "글자수 세기",
          item: "https://pick-play.github.io/text-counter/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "글자수 세기는 어떻게 사용하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "텍스트를 입력창에 붙여넣거나 직접 입력하면 글자수, 단어수, 문장수, 바이트 수가 실시간으로 자동 계산됩니다.",
          },
        },
        {
          "@type": "Question",
          name: "공백 포함과 공백 제외 글자수의 차이는 무엇인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "공백 포함 글자수는 스페이스, 탭, 줄바꿈을 포함한 전체 문자 수이고, 공백 제외 글자수는 모든 공백 문자를 제거한 순수 문자 수입니다.",
          },
        },
        {
          "@type": "Question",
          name: "바이트 수는 어떻게 계산되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "UTF-8 인코딩 기준으로 계산됩니다. 영문·숫자는 1바이트, 한글은 3바이트로 계산되므로 한글이 많을수록 바이트 수가 글자수보다 많아집니다.",
          },
        },
      ],
    },
  ],
};

export default function TextCounterLayout({
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
