import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "图片工具 - 转换、压缩、调整大小",
  description: "图片转换、压缩、调整大小、裁剪。支持批量处理，JPG/PNG/WebP格式互转，完全免费。",
  keywords: ["图片压缩", "图片转换", "图片调整大小", "图片裁剪", "图片工具", "批量图片处理", "WebP转换"],
  openGraph: {
    title: "图片工具 - 转换、压缩、调整大小 | PickPlay",
    description: "图片转换、压缩、调整大小、裁剪。支持批量处理。",
    url: "https://pick-play.github.io/cn/image/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - 图片工具" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/image/",
    languages: {
      "x-default": "https://pick-play.github.io/image/",
      "ko": "https://pick-play.github.io/image/",
      "en": "https://pick-play.github.io/en/image/",
      "ja": "https://pick-play.github.io/jp/image/",
      "zh-CN": "https://pick-play.github.io/cn/image/",
      "es": "https://pick-play.github.io/es/image/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "图片工具 - 转换、压缩、调整大小",
      url: "https://pick-play.github.io/cn/image/",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description: "图片转换、压缩、调整大小、裁剪。支持批量处理。",
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://pick-play.github.io/cn/" },
        { "@type": "ListItem", position: 2, name: "图片工具", item: "https://pick-play.github.io/cn/image/" },
      ],
    },
  ],
};

export default function ImageCnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
