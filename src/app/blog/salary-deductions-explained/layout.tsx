import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "연봉 실수령액의 비밀 - 4대보험과 세금 완전 해부",
  description:
    "국민연금, 건강보험, 고용보험, 소득세가 연봉에서 얼마나 빠져나가는지 계산 예시와 함께 완전 해부. 연봉 3천~1억 실수령액 계산법.",
  keywords: [
    "연봉 실수령액",
    "4대보험",
    "국민연금",
    "건강보험",
    "고용보험",
    "소득세",
    "연봉 세금",
    "실수령액 계산",
    "연봉 계산기",
  ],
  openGraph: {
    title: "연봉 실수령액의 비밀 - 4대보험과 세금 완전 해부",
    description:
      "연봉에서 국민연금·건강보험·고용보험·소득세가 얼마나 빠지는지, 실수령액 계산법을 완전 해부.",
    url: "https://pick-play.github.io/blog/salary-deductions-explained/",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "연봉 실수령액 가이드",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/blog/salary-deductions-explained/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "연봉 실수령액의 비밀 - 4대보험과 세금 완전 해부",
  description:
    "국민연금, 건강보험, 고용보험, 소득세가 연봉에서 얼마나 빠져나가는지 계산 예시와 함께 완전 해부.",
  url: "https://pick-play.github.io/blog/salary-deductions-explained/",
  datePublished: "2024-12-16",
  dateModified: "2024-12-16",
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

export default function SalaryDeductionsLayout({
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
