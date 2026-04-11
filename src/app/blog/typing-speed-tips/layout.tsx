import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "타이핑 속도 200% 올리는 10가지 방법",
  description:
    "올바른 손 자세, 홈 포지션, 효과적인 연습 방법으로 타이핑 WPM을 두 배로 올리는 실용 가이드. 초보자부터 중급자까지 적용 가능.",
  keywords: [
    "타이핑 속도",
    "타자 속도 올리기",
    "WPM 높이기",
    "홈 포지션",
    "타이핑 연습",
    "타자 연습",
    "타이핑 잘하는 법",
    "키보드 자세",
    "타이핑 테스트",
  ],
  openGraph: {
    title: "타이핑 속도 200% 올리는 10가지 방법",
    description:
      "올바른 자세와 홈 포지션, 효과적인 연습법으로 타이핑 속도를 두 배로 높이는 실용 가이드.",
    url: "https://pick-play.github.io/blog/typing-speed-tips/",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "타이핑 속도 올리기 가이드",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/blog/typing-speed-tips/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "타이핑 속도 200% 올리는 10가지 방법",
  description:
    "올바른 손 자세, 홈 포지션, 효과적인 연습 방법으로 타이핑 WPM을 두 배로 올리는 실용 가이드.",
  url: "https://pick-play.github.io/blog/typing-speed-tips/",
  datePublished: "2024-12-18",
  dateModified: "2024-12-18",
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

export default function TypingSpeedTipsLayout({
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
