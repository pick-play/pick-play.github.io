import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "단위 변환기 - 길이, 무게, 온도 변환",
  description:
    "길이, 무게, 온도, 넓이, 부피, 속도, 데이터 단위를 빠르게 변환하세요. cm↔inch, kg↔lb, °C↔°F 등 다양한 단위 변환기.",
  keywords: [
    "단위 변환기",
    "길이 변환",
    "무게 변환",
    "온도 변환",
    "cm inch 변환",
    "kg lb 변환",
    "섭씨 화씨 변환",
    "단위 계산기",
  ],
  openGraph: {
    title: "단위 변환기 - 길이, 무게, 온도 변환",
    description: "cm↔inch, kg↔lb, °C↔°F 등 다양한 단위를 빠르게 변환하세요.",
    url: "https://pick-play.github.io/unit-converter/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/unit-converter/",
    languages: {
      "x-default": "https://pick-play.github.io/unit-converter/",
      ko: "https://pick-play.github.io/unit-converter/",
      en: "https://pick-play.github.io/en/unit-converter/",
      ja: "https://pick-play.github.io/jp/unit-converter/",
      "zh-CN": "https://pick-play.github.io/cn/unit-converter/",
      es: "https://pick-play.github.io/es/unit-converter/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "단위 변환기",
      description:
        "길이, 무게, 온도, 넓이, 부피, 속도, 데이터 단위를 실시간으로 변환하는 온라인 단위 변환기",
      url: "https://pick-play.github.io/unit-converter/",
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
          name: "단위 변환기",
          item: "https://pick-play.github.io/unit-converter/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "단위 변환기는 어떻게 사용하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "카테고리 탭에서 원하는 단위 종류를 선택하고, 변환할 단위와 결과 단위를 선택한 뒤 숫자를 입력하면 즉시 변환됩니다.",
          },
        },
        {
          "@type": "Question",
          name: "어떤 단위들을 변환할 수 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "길이(mm, cm, m, km, in, ft, yd, mi), 무게(mg, g, kg, oz, lb, ton), 온도(°C, °F, K), 넓이(mm², cm², m², km², ft², ac, ha), 부피(mL, L, gal, fl oz, cup), 속도(m/s, km/h, mph, knot), 데이터(B, KB, MB, GB, TB)를 지원합니다.",
          },
        },
        {
          "@type": "Question",
          name: "빠른 변환 버튼은 무엇인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "자주 사용하는 변환 쌍(cm↔inch, kg↔lb, °C↔°F 등)을 버튼 하나로 바로 선택할 수 있는 단축 기능입니다.",
          },
        },
      ],
    },
  ],
};

export default function UnitConverterLayout({
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
