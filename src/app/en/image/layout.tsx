import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Tools - Convert, Compress, Resize",
  description:
    "Convert, compress, resize, and crop images online. Batch processing supported. Free image editing tools in your browser.",
  keywords: [
    "image tools",
    "image converter",
    "image compressor",
    "resize image",
    "crop image",
    "batch image processing",
    "online image editor",
    "free image tools",
    "image format converter",
  ],
  openGraph: {
    title: "Image Tools - Convert, Compress, Resize & Crop",
    description:
      "Convert, compress, resize, and crop images online. Batch processing supported. Free and in-browser.",
    url: "https://pick-play.github.io/en/image",
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
    canonical: "https://pick-play.github.io/en/image",
    languages: {
      "x-default": "https://pick-play.github.io/image",
      "ko": "https://pick-play.github.io/image",
      en: "https://pick-play.github.io/en/image",
      ja: "https://pick-play.github.io/jp/image",
      "zh-CN": "https://pick-play.github.io/cn/image",
      es: "https://pick-play.github.io/es/image",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Image Tools - Convert, Compress, Resize",
      url: "https://pick-play.github.io/en/image",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "6 image tools including conversion, compression, resizing, and cropping — with batch processing support.",
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
          name: "Image Tools",
          item: "https://pick-play.github.io/en/image",
        },
      ],
    },
  ],
};

export default function ImageEnLayout({
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
