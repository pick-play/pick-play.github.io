import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDFツール - 結合・分割・変換",
  description:
    "PDF結合、分割、JPG変換、圧縮まで。ブラウザで安全に処理。アップロード不要でプライバシー保護。",
  keywords: [
    "PDF結合",
    "PDF分割",
    "PDF変換",
    "PDF圧縮",
    "PDFツール",
    "PDFオンライン",
    "PDF編集",
    "JPG変換",
    "PDF無料",
    "ブラウザPDF",
    "PDFまとめ",
  ],
  openGraph: {
    title: "PDFツール - 結合・分割・変換 | PickPlay",
    description:
      "PDF結合、分割、JPG変換、圧縮まで。ブラウザで安全に処理できます。",
    url: "https://pick-play.github.io/jp/pdf/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - PDFツール",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/pdf/",
    languages: {
      "x-default": "https://pick-play.github.io/pdf/",
      "ko": "https://pick-play.github.io/pdf/",
      en: "https://pick-play.github.io/en/pdf/",
      ja: "https://pick-play.github.io/jp/pdf/",
      "zh-CN": "https://pick-play.github.io/cn/pdf/",
      es: "https://pick-play.github.io/es/pdf/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "PDFツール - 結合・分割・変換",
      url: "https://pick-play.github.io/jp/pdf/",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description: "PDF結合、分割、JPG変換、圧縮まで。ブラウザで安全に。",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "ホーム",
          item: "https://pick-play.github.io/jp/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "PDFツール",
          item: "https://pick-play.github.io/jp/pdf/",
        },
      ],
    },
  ],
};

export default function PdfJpLayout({
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
