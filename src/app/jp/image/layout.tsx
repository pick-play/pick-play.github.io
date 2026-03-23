import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "画像ツール - 変換・圧縮・リサイズ",
  description:
    "画像変換、圧縮、サイズ変更、切り抜き。一括処理も対応。ブラウザ上で安全に処理、アップロード不要。",
  keywords: [
    "画像変換",
    "画像圧縮",
    "画像リサイズ",
    "画像切り抜き",
    "画像ツール",
    "JPEG変換",
    "PNG変換",
    "WebP変換",
    "画像一括処理",
    "画像編集",
    "画像縮小",
  ],
  openGraph: {
    title: "画像ツール - 変換・圧縮・リサイズ | PickPlay",
    description:
      "画像変換、圧縮、サイズ変更、切り抜き。一括処理も対応。ブラウザで安全に。",
    url: "https://pick-play.github.io/jp/image/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 画像ツール",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/image/",
    languages: {
      "x-default": "https://pick-play.github.io/image/",
      "ko": "https://pick-play.github.io/image/",
      en: "https://pick-play.github.io/en/image/",
      ja: "https://pick-play.github.io/jp/image/",
      "zh-CN": "https://pick-play.github.io/cn/image/",
      es: "https://pick-play.github.io/es/image/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "画像ツール - 変換・圧縮・リサイズ",
      url: "https://pick-play.github.io/jp/image/",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description: "画像変換、圧縮、サイズ変更、切り抜き。一括処理も対応。",
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
          name: "画像ツール",
          item: "https://pick-play.github.io/jp/image/",
        },
      ],
    },
  ],
};

export default function ImageJpLayout({
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
