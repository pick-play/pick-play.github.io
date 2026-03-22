import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nickname Generator - Random Names",
  description:
    "Generate random nicknames in 6 different styles — cute, cool, funny, and more. Find the perfect username instantly.",
  keywords: [
    "nickname generator",
    "random nickname",
    "username generator",
    "random name",
    "cool nicknames",
    "cute nicknames",
    "funny nicknames",
    "online name generator",
    "gamertag generator",
  ],
  openGraph: {
    title: "Nickname Generator - Random Names in 6 Styles",
    description:
      "Generate random nicknames in 6 different styles — cute, cool, funny, and more. Find your perfect username!",
    url: "https://pick-play.github.io/en/nickname",
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
    canonical: "https://pick-play.github.io/en/nickname",
    languages: {
      "x-default": "https://pick-play.github.io/nickname",
      "ko": "https://pick-play.github.io/nickname",
      en: "https://pick-play.github.io/en/nickname",
      ja: "https://pick-play.github.io/jp/nickname",
      "zh-CN": "https://pick-play.github.io/cn/nickname",
      es: "https://pick-play.github.io/es/nickname",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Nickname Generator - Random Names",
      url: "https://pick-play.github.io/en/nickname",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Instantly generate random nicknames in 6 styles: cute, cool, funny, and more.",
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
          name: "Nickname Generator",
          item: "https://pick-play.github.io/en/nickname",
        },
      ],
    },
  ],
};

export default function NicknameEnLayout({
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
