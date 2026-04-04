import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR码生成器 - 免费在线QR码制作",
  description:
    "将任意网址或文本即时转换为QR码。自定义尺寸和颜色，免费下载您的QR码。",
  keywords: [
    "QR码生成器",
    "QR码制作",
    "免费QR码",
    "网址生成QR码",
    "二维码生成",
    "QR码下载",
  ],
  openGraph: {
    title: "QR码生成器 - 免费在线QR码制作",
    description:
      "将任意网址或文本即时转换为QR码，免费下载使用。",
    url: "https://pick-play.github.io/cn/qr-code/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/qr-code/",
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
      name: "QR码生成器",
      description:
        "将网址和文本即时转换为QR码。自定义尺寸和颜色，免费下载。",
      url: "https://pick-play.github.io/cn/qr-code/",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      inLanguage: "zh-CN",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "首页",
          item: "https://pick-play.github.io/cn/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "QR码生成器",
          item: "https://pick-play.github.io/cn/qr-code/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "什么是QR码？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "QR码（快速响应码）是一种二维条形码，智能手机摄像头扫描后可快速获取网址、文字、联系方式等各种信息。",
          },
        },
        {
          "@type": "Question",
          name: "如何使用生成的QR码？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "点击下载按钮保存图片，然后可自由用于名片、海报或网站等。用智能手机摄像头扫描即可直接访问对应内容。",
          },
        },
        {
          "@type": "Question",
          name: "QR码中可以包含哪些内容？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "可以编码网站网址、纯文本、电子邮件地址、电话号码等多种信息。文本越短，QR码越简单，越容易扫描。",
          },
        },
      ],
    },
  ],
};

export default function QrCodeCnLayout({
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
