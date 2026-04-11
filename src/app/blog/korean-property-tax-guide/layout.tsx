import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "2024년 부동산 취득세 완벽 가이드 - 다주택자·생애최초 감면까지",
  description:
    "부동산 취득세 기본 구조, 세율표, 다주택자 중과세율, 생애최초 감면 조건, 계산 예시까지. 2024년 최신 기준 완벽 정리.",
  keywords: [
    "취득세",
    "부동산 취득세",
    "취득세 계산",
    "다주택자 취득세",
    "생애최초 취득세 감면",
    "취득세율",
    "부동산 세금",
    "집 살 때 세금",
    "취득세 계산기",
  ],
  openGraph: {
    title: "2024년 부동산 취득세 완벽 가이드 - 다주택자·생애최초 감면까지",
    description:
      "취득세 기본 구조부터 다주택자 중과, 생애최초 감면까지 한 번에 정리. 2024년 최신 기준.",
    url: "https://pick-play.github.io/blog/korean-property-tax-guide/",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "부동산 취득세 가이드",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/blog/korean-property-tax-guide/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "2024년 부동산 취득세 완벽 가이드 - 다주택자·생애최초 감면까지",
  description:
    "부동산 취득세 기본 구조, 세율표, 다주택자 중과세율, 생애최초 감면 조건, 계산 예시까지.",
  url: "https://pick-play.github.io/blog/korean-property-tax-guide/",
  datePublished: "2024-12-14",
  dateModified: "2024-12-14",
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

export default function KoreanPropertyTaxLayout({
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
