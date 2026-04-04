import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code Generator - Free Online QR Code Maker",
  description:
    "Convert any URL or text into a QR code instantly. Customize size and colors, then download your QR code for free.",
  keywords: [
    "QR code generator",
    "free QR code",
    "create QR code",
    "URL to QR code",
    "QR code maker",
    "download QR code",
  ],
  openGraph: {
    title: "QR Code Generator - Free Online QR Code Maker",
    description:
      "Convert any URL or text into a QR code instantly and download it for free.",
    url: "https://pick-play.github.io/en/qr-code/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/en/qr-code/",
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
      name: "QR Code Generator",
      description:
        "Convert URLs and text to QR codes instantly. Customize size and colors, then download for free.",
      url: "https://pick-play.github.io/en/qr-code/",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      inLanguage: "en",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://pick-play.github.io/en/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "QR Code Generator",
          item: "https://pick-play.github.io/en/qr-code/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is a QR code?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A QR code (Quick Response Code) is a two-dimensional barcode that smartphones can scan to instantly access URLs, text, contacts, and more.",
          },
        },
        {
          "@type": "Question",
          name: "How do I use the generated QR code?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Click the download button to save the image, then use it freely on business cards, posters, or websites. Scanning it with a smartphone camera links directly to the content.",
          },
        },
        {
          "@type": "Question",
          name: "What content can I put in a QR code?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can encode website URLs, plain text, email addresses, phone numbers, and more. Shorter text produces a simpler QR code that is easier to scan.",
          },
        },
      ],
    },
  ],
};

export default function QrCodeEnLayout({
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
