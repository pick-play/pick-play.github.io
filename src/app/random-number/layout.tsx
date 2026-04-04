import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "랜덤 숫자 생성기 - 무작위 번호 뽑기",
  description:
    "랜덤 숫자를 생성하세요. 로또 번호 추첨, 주사위 굴리기, 범위 지정 등 다양한 용도로 사용할 수 있습니다.",
  keywords: [
    "랜덤 숫자 생성기",
    "무작위 번호",
    "로또 번호 생성",
    "랜덤 넘버",
    "숫자 뽑기",
    "난수 생성기",
  ],
  openGraph: {
    title: "랜덤 숫자 생성기 - 무작위 번호 뽑기",
    description: "랜덤 숫자를 쉽고 빠르게 생성하세요.",
    url: "https://pick-play.github.io/random-number/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/random-number/",
    languages: {
      "x-default": "https://pick-play.github.io/random-number/",
      ko: "https://pick-play.github.io/random-number/",
      en: "https://pick-play.github.io/en/random-number/",
      ja: "https://pick-play.github.io/jp/random-number/",
      "zh-CN": "https://pick-play.github.io/cn/random-number/",
      es: "https://pick-play.github.io/es/random-number/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "랜덤 숫자 생성기",
      description: "무작위 숫자 생성 도구. 로또, 주사위, 범위 지정 등 다양한 용도.",
      url: "https://pick-play.github.io/random-number/",
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
          name: "랜덤 숫자 생성기",
          item: "https://pick-play.github.io/random-number/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "로또 번호 생성은 어떻게 하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "상단의 '로또' 프리셋을 클릭하면 1~45 범위에서 중복 없이 6개 번호가 자동으로 설정됩니다. 생성 버튼을 누르면 바로 번호가 나옵니다.",
          },
        },
        {
          "@type": "Question",
          name: "중복 없이 여러 숫자를 생성할 수 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "'중복 허용' 토글을 끄면 지정한 범위 내에서 중복 없이 숫자를 뽑습니다. 단, 생성 개수가 범위보다 많으면 오류가 납니다.",
          },
        },
        {
          "@type": "Question",
          name: "생성된 숫자를 정렬할 수 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "결과 아래의 정렬 옵션에서 오름차순 또는 내림차순을 선택할 수 있습니다.",
          },
        },
      ],
    },
  ],
};

export default function RandomNumberLayout({
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
