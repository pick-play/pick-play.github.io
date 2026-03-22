import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Tools - Merge, Split, Convert",
  description:
    "Merge, split, convert to JPG, compress PDFs — all in your browser. No upload needed, completely private and free.",
  keywords: [
    "pdf tools",
    "merge pdf",
    "split pdf",
    "pdf to jpg",
    "compress pdf",
    "pdf converter",
    "online pdf editor",
    "free pdf tools",
    "pdf combiner",
  ],
  openGraph: {
    title: "PDF Tools - Merge, Split, Convert & Compress",
    description:
      "Merge, split, convert to JPG, compress PDFs — all securely in your browser. No upload required.",
    url: "https://pick-play.github.io/en/pdf",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - Fun lifestyle tools",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/en/pdf",
    languages: {
      "x-default": "https://pick-play.github.io/pdf",
      "ko": "https://pick-play.github.io/pdf",
      en: "https://pick-play.github.io/en/pdf",
      ja: "https://pick-play.github.io/jp/pdf",
      "zh-CN": "https://pick-play.github.io/cn/pdf",
      es: "https://pick-play.github.io/es/pdf",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "PDF Tools - Merge, Split, Convert",
      url: "https://pick-play.github.io/en/pdf",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "7 PDF tools including merge, split, JPG conversion, and compression — all in-browser for privacy.",
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://pick-play.github.io/en",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "PDF Tools",
          item: "https://pick-play.github.io/en/pdf",
        },
      ],
    },
  ],
};

export default function PdfEnLayout({
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
