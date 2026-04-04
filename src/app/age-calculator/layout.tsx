import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "나이 계산기 - 만 나이, 띠, 생일 카운트다운 | PickPlay",
  description:
    "생년월일을 입력하면 만 나이, 띠, 별자리, 다음 생일 D-day까지 한번에 계산해드립니다. 살아온 총 일수와 심장 박동 수 등 재미있는 통계도 확인하세요.",
  keywords: [
    "나이 계산기",
    "만 나이 계산",
    "띠 계산",
    "별자리 계산",
    "생일 카운트다운",
    "나이 계산",
    "생년월일 계산기",
    "D-day 생일",
    "나이 세는 법",
    "만 나이 뜻",
  ],
  openGraph: {
    title: "나이 계산기 - 만 나이, 띠, 생일 카운트다운 | PickPlay",
    description: "생년월일로 만 나이, 띠, 별자리, 생일 D-day를 한번에 계산하세요",
    url: "https://pick-play.github.io/age-calculator/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 나이 계산기",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/age-calculator/",
    languages: {
      "x-default": "https://pick-play.github.io/age-calculator/",
      ko: "https://pick-play.github.io/age-calculator/",
      en: "https://pick-play.github.io/en/age-calculator/",
      ja: "https://pick-play.github.io/jp/age-calculator/",
      "zh-CN": "https://pick-play.github.io/cn/age-calculator/",
      es: "https://pick-play.github.io/es/age-calculator/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "나이 계산기",
      description: "생년월일로 만 나이, 띠, 별자리, 생일 D-day를 계산하는 무료 온라인 도구",
      url: "https://pick-play.github.io/age-calculator/",
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
          name: "나이 계산기",
          item: "https://pick-play.github.io/age-calculator/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "만 나이란 무엇인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "만 나이는 태어난 날부터 현재까지 실제로 지난 햇수를 세는 방식입니다. 생일이 지나지 않았으면 올해 연도에서 태어난 연도를 뺀 후 1을 빼고, 생일이 지났으면 그대로 뺍니다.",
          },
        },
        {
          "@type": "Question",
          name: "띠는 어떻게 결정되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "띠는 태어난 해를 12로 나눈 나머지를 기준으로 정해지는 12가지 동물 상징입니다. 쥐, 소, 호랑이, 토끼, 용, 뱀, 말, 양, 원숭이, 닭, 개, 돼지 순으로 반복됩니다.",
          },
        },
        {
          "@type": "Question",
          name: "생일 D-day는 어떻게 계산하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "오늘 날짜부터 올해 혹은 내년 생일까지 남은 일수를 계산합니다. 오늘이 생일이면 특별 메시지가 표시됩니다.",
          },
        },
      ],
    },
  ],
};

export default function AgeCalculatorLayout({
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
