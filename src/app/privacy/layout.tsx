import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 | PickPlay",
  description:
    "PickPlay의 개인정보처리방침입니다. Google AdSense 쿠키, 데이터 수집, 이용자 권리 등에 대한 안내를 확인하세요.",
  keywords: [
    "PickPlay 개인정보처리방침",
    "개인정보 보호",
    "쿠키 정책",
    "Google AdSense",
    "데이터 수집",
  ],
  openGraph: {
    title: "개인정보처리방침 | PickPlay",
    description: "PickPlay의 개인정보처리방침을 확인하세요.",
    url: "https://pick-play.github.io/privacy/",
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
    canonical: "https://pick-play.github.io/privacy/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "개인정보처리방침",
  url: "https://pick-play.github.io/privacy/",
  description: "PickPlay 개인정보처리방침",
  publisher: {
    "@type": "Organization",
    name: "PickPlay",
    url: "https://pick-play.github.io/",
  },
};

export default function PrivacyLayout({
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
