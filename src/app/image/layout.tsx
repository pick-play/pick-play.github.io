import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이미지 도구 - 변환, 압축, 크기 변경, 자르기 | PickPlay",
  description:
    "PNG JPG WEBP 변환, 이미지 압축, 크기 변경, 자르기까지. 모든 작업이 브라우저에서 처리되어 안전합니다. 무료 온라인 이미지 편집 도구.",
  keywords: [
    "이미지 변환",
    "이미지 압축",
    "이미지 크기 변경",
    "이미지 자르기",
    "PNG JPG 변환",
    "WEBP 변환",
    "무료 이미지 도구",
    "온라인 이미지 편집",
    "이미지 리사이즈",
    "이미지 크롭",
  ],
  openGraph: {
    title: "이미지 도구 - 변환, 압축, 크기 변경, 자르기 | PickPlay",
    description: "PNG JPG WEBP 변환, 이미지 압축, 크기 변경, 자르기까지. 모든 작업이 브라우저에서 처리됩니다.",
    url: "https://pick-play.github.io/image/",
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
    canonical: "https://pick-play.github.io/image/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "이미지 도구",
      description: "이미지 변환, 압축, 크기 변경, 자르기 도구",
      url: "https://pick-play.github.io/image/",
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
          name: "이미지 도구",
          item: "https://pick-play.github.io/image/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "이미지 변환 시 파일이 서버에 업로드되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "아니요, 모든 처리는 브라우저 내에서 완전히 이루어집니다. 파일이 서버에 업로드되지 않아 개인정보가 안전하게 보호됩니다.",
          },
        },
        {
          "@type": "Question",
          name: "PNG를 JPG로 변환하면 투명 배경은 어떻게 되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "JPG는 투명도를 지원하지 않아 투명 부분이 흰색 배경으로 채워집니다. 투명도를 유지하려면 PNG 형식을 사용하세요.",
          },
        },
        {
          "@type": "Question",
          name: "이미지 압축 후 화질이 많이 낮아지나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "압축 수준에 따라 다르지만, 고품질 설정에서는 육안으로 거의 차이를 느낄 수 없으면서 파일 크기를 크게 줄일 수 있습니다.",
          },
        },
      ],
    },
  ],
};

export default function ImageLayout({
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
