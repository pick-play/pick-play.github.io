import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "모임이 10배 재미있어지는 파티 게임 추천 TOP 7",
  description:
    "라이어 게임, 밸런스 게임, 초성 퀴즈 등 모임 분위기를 확 바꿔줄 파티 게임 7가지 소개. 플레이 방법과 꿀팁까지.",
  keywords: [
    "파티 게임",
    "모임 게임",
    "라이어 게임",
    "밸런스 게임",
    "초성 퀴즈",
    "진실 도전",
    "술자리 게임",
    "회식 게임",
    "친목 게임",
  ],
  openGraph: {
    title: "모임이 10배 재미있어지는 파티 게임 추천 TOP 7",
    description:
      "라이어 게임부터 밸런스 게임, 초성 퀴즈까지 모임 분위기를 확 살려줄 파티 게임 7가지.",
    url: "https://pick-play.github.io/blog/party-game-ideas/",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "파티 게임 추천",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/blog/party-game-ideas/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "모임이 10배 재미있어지는 파티 게임 추천 TOP 7",
  description:
    "라이어 게임, 밸런스 게임, 초성 퀴즈 등 모임 분위기를 확 바꿔줄 파티 게임 7가지 소개.",
  url: "https://pick-play.github.io/blog/party-game-ideas/",
  datePublished: "2024-12-20",
  dateModified: "2024-12-20",
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

export default function PartyGameIdeasLayout({
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
