import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF工具 - 合并、拆分、转换",
  description: "PDF合并、拆分、转JPG、压缩，浏览器内安全处理，无需上传服务器，保护隐私。",
  keywords: ["PDF合并", "PDF拆分", "PDF转图片", "PDF压缩", "PDF工具", "在线PDF", "免费PDF工具"],
  openGraph: {
    title: "PDF工具 - 合并、拆分、转换 | PickPlay",
    description: "PDF合并、拆分、转JPG、压缩，浏览器内安全处理，无需上传服务器。",
    url: "https://pick-play.github.io/cn/pdf",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - PDF工具" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/pdf",
    languages: {
      "x-default": "https://pick-play.github.io/pdf",
      "ko": "https://pick-play.github.io/pdf",
      "en": "https://pick-play.github.io/en/pdf",
      "ja": "https://pick-play.github.io/jp/pdf",
      "zh-CN": "https://pick-play.github.io/cn/pdf",
      "es": "https://pick-play.github.io/es/pdf",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "PDF工具 - 合并、拆分、转换",
      url: "https://pick-play.github.io/cn/pdf",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description: "PDF合并、拆分、转JPG、压缩，浏览器内安全处理。",
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://pick-play.github.io/cn" },
        { "@type": "ListItem", position: 2, name: "PDF工具", item: "https://pick-play.github.io/cn/pdf" },
      ],
    },
  ],
};

export default function PdfCnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
