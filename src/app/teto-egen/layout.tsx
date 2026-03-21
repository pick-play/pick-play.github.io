import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "테토 vs 에겐 성향 테스트 - 나는 테토일까 에겐일까?",
  description:
    "요즘 대세 테토 vs 에겐 성향 테스트! 나는 테토남? 에겐남? 테토녀? 에겐녀? 11가지 질문으로 내 연애 성향과 성격 유형을 알아보세요. 궁합과 연애 먹이사슬까지!",
  keywords: [
    "테토 에겐 테스트",
    "테토남",
    "에겐남",
    "테토녀",
    "에겐녀",
    "성향 테스트",
    "연애 유형",
    "테토 에겐 궁합",
  ],
  openGraph: {
    title: "테토 vs 에겐 성향 테스트",
    description: "나는 테토일까 에겐일까? 11가지 질문으로 알아보는 내 성향!",
    url: "https://pick-play.github.io/teto-egen",
  },
  alternates: { canonical: "https://pick-play.github.io/teto-egen" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "테토 vs 에겐 성향 테스트",
      url: "https://pick-play.github.io/teto-egen",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      description:
        "11가지 질문으로 알아보는 테토 vs 에겐 성향 테스트. 테토남, 에겐남, 테토녀, 에겐녀 4가지 유형과 궁합, 연애 먹이사슬까지 확인하세요.",
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
          name: "테토 vs 에겐 성향 테스트",
          item: "https://pick-play.github.io/teto-egen",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "테토 에겐이 뭔가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "테스토스테론(테토)과 에스트로겐(에겐)의 줄임말로, 성격과 연애 스타일을 4가지 유형(테토남, 에겐남, 테토녀, 에겐녀)으로 분류하는 성향 테스트입니다.",
          },
        },
        {
          "@type": "Question",
          name: "결과는 어떻게 나오나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "11가지 질문에 답하면 테토/에겐 비율이 퍼센트(%)로 정확하게 계산되어, 4가지 유형 중 하나로 결과가 나옵니다. 궁합 정보와 연애 먹이사슬도 함께 확인할 수 있습니다.",
          },
        },
      ],
    },
  ],
};

export default function TetoEgenLayout({
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
