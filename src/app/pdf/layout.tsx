import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF 도구 - 합치기, 분할, 변환, 압축 | PickPlay",
  description:
    "PDF 합치기, 분할, JPG 변환, 압축, 페이지 편집까지. 모든 작업이 브라우저에서 처리되어 안전합니다. 무료 온라인 PDF 도구.",
  keywords: [
    "PDF 합치기",
    "PDF 분할",
    "PDF JPG 변환",
    "PDF 압축",
    "PDF 편집",
    "무료 PDF 도구",
    "PDF 페이지 삭제",
    "PDF 텍스트 추출",
    "JPG PDF 변환",
    "온라인 PDF",
  ],
  openGraph: {
    title: "PDF 도구 - 합치기, 분할, 변환, 압축 | PickPlay",
    description:
      "PDF 합치기, 분할, JPG 변환, 압축, 페이지 편집까지. 모든 작업이 브라우저에서 처리됩니다.",
    url: "https://pick-play.github.io/pdf/",
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
    canonical: "https://pick-play.github.io/pdf/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "PDF 도구",
      description: "PDF 합치기, 분할, 변환, 압축 등 다양한 PDF 작업 도구",
      url: "https://pick-play.github.io/pdf/",
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
          name: "PDF 도구",
          item: "https://pick-play.github.io/pdf/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "PDF 파일을 합치려면 어떻게 하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "PDF 합치기 탭에서 여러 PDF 파일을 업로드하면 순서대로 합쳐진 PDF를 다운로드할 수 있습니다. 모든 처리는 브라우저에서 이루어져 파일이 서버에 업로드되지 않습니다.",
          },
        },
        {
          "@type": "Question",
          name: "PDF를 JPG로 변환할 수 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "네, PDF → JPG 변환 탭에서 PDF를 업로드하면 각 페이지를 JPG 이미지로 변환해 다운로드할 수 있습니다. 개별 다운로드 또는 ZIP 파일로 묶어서 다운로드할 수 있습니다.",
          },
        },
        {
          "@type": "Question",
          name: "업로드한 파일이 서버에 저장되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "아니요, 모든 PDF 처리는 사용자의 브라우저에서만 이루어집니다. 파일이 서버에 전송되거나 저장되지 않아 개인 정보가 완전히 보호됩니다.",
          },
        },
      ],
    },
  ],
};

export default function PdfLayout({ children }: { children: React.ReactNode }) {
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
