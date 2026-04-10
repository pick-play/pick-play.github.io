import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개 | PickPlay",
  description:
    "PickPlay는 일상의 선택을 돕는 무료 온라인 도구 모음입니다. 42가지 도구, 5개 언어, 회원가입 없이 누구나 무료로 사용할 수 있습니다.",
  keywords: [
    "PickPlay 소개",
    "무료 온라인 도구",
    "파티 게임",
    "생활 도구",
    "금융 계산기",
    "심리 테스트",
  ],
  openGraph: {
    title: "소개 | PickPlay",
    description:
      "PickPlay는 일상의 선택을 돕는 무료 온라인 도구 모음입니다.",
    url: "https://pick-play.github.io/about/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 선택과 재미를 한 번에",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/about/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "PickPlay 소개",
  url: "https://pick-play.github.io/about/",
  description:
    "PickPlay는 일상의 선택을 돕는 무료 온라인 도구 모음입니다. 42가지 도구, 5개 언어 지원.",
  publisher: {
    "@type": "Organization",
    name: "PickPlay",
    url: "https://pick-play.github.io/",
  },
};

export default function AboutLayout({
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
