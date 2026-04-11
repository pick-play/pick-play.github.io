import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "안전한 비밀번호 만드는 법 - 2024년 완벽 가이드",
  description:
    "비밀번호 보안 원칙, 해커가 뚫지 못하는 강력한 비밀번호 만드는 법, 좋은 비밀번호 예시와 관리 팁까지. 2024년 최신 보안 가이드.",
  keywords: [
    "안전한 비밀번호",
    "비밀번호 만들기",
    "비밀번호 보안",
    "강력한 비밀번호",
    "비밀번호 해킹 방지",
    "비밀번호 생성기",
    "계정 보안",
    "사이버 보안",
  ],
  openGraph: {
    title: "안전한 비밀번호 만드는 법 - 2024년 완벽 가이드",
    description:
      "비밀번호 보안 원칙과 강력한 비밀번호 만드는 법을 알아보세요. 해킹 방지 팁과 PickPlay 비밀번호 생성기 소개.",
    url: "https://pick-play.github.io/blog/strong-password-guide/",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "안전한 비밀번호 가이드",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/blog/strong-password-guide/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "안전한 비밀번호 만드는 법 - 2024년 완벽 가이드",
  description:
    "비밀번호 보안 원칙, 해커가 뚫지 못하는 강력한 비밀번호 만드는 법, 좋은 비밀번호 예시와 관리 팁.",
  url: "https://pick-play.github.io/blog/strong-password-guide/",
  datePublished: "2024-12-10",
  dateModified: "2024-12-10",
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

export default function StrongPasswordGuideLayout({
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
