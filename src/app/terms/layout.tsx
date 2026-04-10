import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관 | PickPlay",
  description:
    "PickPlay 서비스 이용약관입니다. 서비스 이용 조건, 면책 조항, 지적재산권 등에 대한 내용을 확인하세요.",
  keywords: [
    "PickPlay 이용약관",
    "서비스 이용약관",
    "면책 조항",
    "지적재산권",
    "이용 조건",
  ],
  openGraph: {
    title: "이용약관 | PickPlay",
    description: "PickPlay 서비스 이용약관을 확인하세요.",
    url: "https://pick-play.github.io/terms/",
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
    canonical: "https://pick-play.github.io/terms/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "이용약관",
  url: "https://pick-play.github.io/terms/",
  description: "PickPlay 서비스 이용약관",
  publisher: {
    "@type": "Organization",
    name: "PickPlay",
    url: "https://pick-play.github.io/",
  },
};

export default function TermsLayout({
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
