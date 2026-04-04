import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR 코드 생성기 - 무료 온라인 QR 코드 만들기",
  description:
    "URL, 텍스트를 QR 코드로 즉시 변환하세요. 크기와 색상을 커스터마이징하고 무료로 다운로드할 수 있는 QR 코드 생성기입니다.",
  keywords: [
    "QR 코드 생성기",
    "QR코드 만들기",
    "QR 코드 생성",
    "무료 QR 코드",
    "URL QR 코드",
    "QR 코드 다운로드",
  ],
  openGraph: {
    title: "QR 코드 생성기 - 무료 온라인 QR 코드 만들기",
    description: "URL이나 텍스트를 QR 코드로 즉시 변환하고 무료로 다운로드하세요.",
    url: "https://pick-play.github.io/qr-code/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/qr-code/",
    languages: {
      "x-default": "https://pick-play.github.io/qr-code/",
      ko: "https://pick-play.github.io/qr-code/",
      en: "https://pick-play.github.io/en/qr-code/",
      ja: "https://pick-play.github.io/jp/qr-code/",
      "zh-CN": "https://pick-play.github.io/cn/qr-code/",
      es: "https://pick-play.github.io/es/qr-code/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "QR 코드 생성기",
      description:
        "URL과 텍스트를 QR 코드로 즉시 변환. 크기와 색상 커스터마이징 후 무료 다운로드.",
      url: "https://pick-play.github.io/qr-code/",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "홈",
          item: "https://pick-play.github.io/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "QR 코드 생성기",
          item: "https://pick-play.github.io/qr-code/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "QR 코드란 무엇인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "QR 코드(Quick Response Code)는 스마트폰 카메라로 스캔하면 URL, 텍스트, 연락처 등 다양한 정보를 빠르게 읽을 수 있는 2차원 바코드입니다.",
          },
        },
        {
          "@type": "Question",
          name: "생성된 QR 코드는 어떻게 사용하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "다운로드 버튼을 눌러 이미지를 저장한 후 명함, 포스터, 웹사이트 등에 자유롭게 활용하세요. 스마트폰 카메라로 스캔하면 바로 연결됩니다.",
          },
        },
        {
          "@type": "Question",
          name: "QR 코드에 포함할 수 있는 내용은 무엇인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "웹사이트 URL, 일반 텍스트, 이메일 주소, 전화번호 등 다양한 정보를 담을 수 있습니다. 텍스트가 짧을수록 QR 코드가 더 단순하고 스캔이 쉬워집니다.",
          },
        },
      ],
    },
  ],
};

export default function QrCodeLayout({
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
