import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "복리의 마법 - 10년 후 내 돈은 얼마가 될까?",
  description:
    "복리 원리, 72법칙, 실제 계산 예시로 배우는 복리의 힘. 적금 vs 투자 비교와 PickPlay 복리 계산기 활용법 안내.",
  keywords: [
    "복리",
    "복리의 마법",
    "72법칙",
    "복리 계산",
    "적금 vs 투자",
    "투자 수익",
    "장기 투자",
    "이자 계산",
    "복리 계산기",
  ],
  openGraph: {
    title: "복리의 마법 - 10년 후 내 돈은 얼마가 될까?",
    description:
      "복리 원리와 72법칙, 실제 계산 예시로 배우는 장기 투자의 힘. PickPlay 복리 계산기로 직접 확인해보세요.",
    url: "https://pick-play.github.io/blog/compound-interest-explained/",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "복리의 마법 가이드",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/blog/compound-interest-explained/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "복리의 마법 - 10년 후 내 돈은 얼마가 될까?",
  description:
    "복리 원리, 72법칙, 실제 계산 예시로 배우는 복리의 힘. 적금 vs 투자 비교.",
  url: "https://pick-play.github.io/blog/compound-interest-explained/",
  datePublished: "2024-12-12",
  dateModified: "2024-12-12",
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

export default function CompoundInterestLayout({
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
