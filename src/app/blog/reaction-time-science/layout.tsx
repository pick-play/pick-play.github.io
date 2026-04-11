import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "반응속도의 과학 - 인간 반응속도는 평균 몇 ms일까?",
  description:
    "인간 반응속도의 원리, 나이와 카페인이 반응속도에 미치는 영향, 평균 수치, 훈련으로 개선하는 방법까지. 반응속도 과학 완전 정리.",
  keywords: [
    "반응속도",
    "반응속도 평균",
    "반응속도 테스트",
    "반응속도 향상",
    "인간 반응속도",
    "반응속도 ms",
    "카페인 반응속도",
    "반응속도 훈련",
    "반사신경",
  ],
  openGraph: {
    title: "반응속도의 과학 - 인간 반응속도는 평균 몇 ms일까?",
    description:
      "반응속도 원리, 나이·카페인의 영향, 평균 수치와 향상 방법까지. 반응속도 과학 완전 정리.",
    url: "https://pick-play.github.io/blog/reaction-time-science/",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "반응속도 과학 가이드",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/blog/reaction-time-science/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "반응속도의 과학 - 인간 반응속도는 평균 몇 ms일까?",
  description:
    "인간 반응속도의 원리, 나이와 카페인이 반응속도에 미치는 영향, 평균 수치, 훈련으로 개선하는 방법.",
  url: "https://pick-play.github.io/blog/reaction-time-science/",
  datePublished: "2024-12-22",
  dateModified: "2024-12-22",
  author: {
    "@type": "Organization",
    name: "PickPlay",
    url: "https://pick-play.github.io/",
  },
  publisher: {
    "@type": "Organization",
    name: "PickPlay",
    url: "https://pick-play.github.io/",
  },
  inLanguage: "ko",
};

export default function ReactionTimeScienceLayout({
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
