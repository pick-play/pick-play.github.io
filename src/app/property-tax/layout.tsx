import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "취득세 계산기 - 부동산 취득세 자동 계산",
  description:
    "주택·토지·상가 취득세를 즉시 계산하세요. 1주택·2주택·3주택, 생애최초 감면, 조정대상지역 여부에 따른 취득세·지방교육세·농어촌특별세를 자동 산출합니다.",
  keywords: [
    "취득세 계산기",
    "부동산 취득세",
    "취득세 계산",
    "주택 취득세",
    "생애최초 감면",
    "조정대상지역 취득세",
    "2주택 취득세",
    "부동산 세금 계산",
    "지방교육세",
    "농어촌특별세",
  ],
  openGraph: {
    title: "취득세 계산기 - 부동산 취득세 자동 계산",
    description:
      "주택·토지·상가 취득세를 즉시 계산. 생애최초 감면·조정대상지역 포함.",
    url: "https://pick-play.github.io/property-tax/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/property-tax/",
    languages: {
      "x-default": "https://pick-play.github.io/property-tax/",
      ko: "https://pick-play.github.io/property-tax/",
      en: "https://pick-play.github.io/en/property-tax/",
      ja: "https://pick-play.github.io/jp/property-tax/",
      "zh-CN": "https://pick-play.github.io/cn/property-tax/",
      es: "https://pick-play.github.io/es/property-tax/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "취득세 계산기",
      description:
        "부동산 취득세를 자동 계산하는 온라인 취득세 계산기. 주택·토지·상가, 보유 주택 수, 생애최초 감면, 조정대상지역 여부에 따라 취득세·지방교육세·농어촌특별세를 즉시 산출합니다.",
      url: "https://pick-play.github.io/property-tax/",
      applicationCategory: "FinanceApplication",
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
          name: "취득세 계산기",
          item: "https://pick-play.github.io/property-tax/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "취득세율은 어떻게 결정되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "주택의 경우 취득가액 6억 이하는 1%, 6억~9억은 2%, 9억 초과는 3%입니다. 2주택 조정대상지역은 8%, 3주택 이상은 12%가 적용됩니다. 상가·토지는 4%로 단일 세율입니다.",
          },
        },
        {
          "@type": "Question",
          name: "생애최초 감면이란 무엇인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "생애 처음으로 주택을 취득하는 경우 취득가액 12억 원 이하 주택에 한해 취득세의 50%를 감면받을 수 있으며, 감면 한도는 최대 200만 원입니다.",
          },
        },
        {
          "@type": "Question",
          name: "지방교육세와 농어촌특별세는 얼마인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "지방교육세는 취득세액의 10%입니다. 농어촌특별세는 주택 1주택(전용 85m² 이하)은 비과세이며, 그 외 부동산은 취득가액의 0.2%가 부과됩니다.",
          },
        },
      ],
    },
  ],
};

export default function PropertyTaxLayout({
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
