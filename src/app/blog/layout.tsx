import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "블로그 | PickPlay",
  description:
    "PickPlay 블로그 - 비밀번호 보안, 금융 계산, 부동산 세금, 생산성 팁 등 실생활에 유용한 가이드와 정보를 제공합니다.",
  keywords: [
    "PickPlay 블로그",
    "비밀번호 보안",
    "복리 계산",
    "부동산 취득세",
    "연봉 실수령액",
    "타이핑 속도",
    "파티 게임",
    "반응속도",
    "대출 상환",
    "생활 가이드",
  ],
  openGraph: {
    title: "블로그 | PickPlay",
    description:
      "PickPlay 블로그 - 비밀번호 보안, 금융 계산, 부동산 세금, 생산성 팁 등 실생활에 유용한 가이드.",
    url: "https://pick-play.github.io/blog/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay 블로그",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/blog/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
