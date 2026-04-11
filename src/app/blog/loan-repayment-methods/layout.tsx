import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "원리금균등 vs 원금균등 - 대출 상환 방식 완벽 비교",
  description:
    "원리금균등상환과 원금균등상환 방식의 차이, 장단점, 이자 총액 비교, 어떤 상황에 유리한지 계산 예시와 함께 완벽 정리.",
  keywords: [
    "원리금균등상환",
    "원금균등상환",
    "대출 상환 방식",
    "대출 이자 계산",
    "주택담보대출",
    "대출 비교",
    "이자 총액",
    "대출 계산기",
    "상환 방법",
  ],
  openGraph: {
    title: "원리금균등 vs 원금균등 - 대출 상환 방식 완벽 비교",
    description:
      "대출 상환 방식 두 가지의 차이, 장단점, 이자 총액 비교. 어떤 상황에서 어떤 방식이 유리한지 완벽 정리.",
    url: "https://pick-play.github.io/blog/loan-repayment-methods/",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "대출 상환 방식 비교 가이드",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/blog/loan-repayment-methods/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "원리금균등 vs 원금균등 - 대출 상환 방식 완벽 비교",
  description:
    "원리금균등상환과 원금균등상환 방식의 차이, 장단점, 이자 총액 비교, 어떤 상황에 유리한지.",
  url: "https://pick-play.github.io/blog/loan-repayment-methods/",
  datePublished: "2024-12-24",
  dateModified: "2024-12-24",
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

export default function LoanRepaymentLayout({
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
