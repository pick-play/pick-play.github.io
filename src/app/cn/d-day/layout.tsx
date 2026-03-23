import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "倒计时计算器 - D-Day",
  description: "重要日期一目了然。考试、生日、纪念日倒计时，还支持已过天数统计。",
  keywords: ["倒计时", "D-Day计算器", "生日倒计时", "纪念日倒计时", "考试倒计时", "天数计算", "重要日期"],
  openGraph: {
    title: "倒计时计算器 - D-Day | PickPlay",
    description: "重要日期一目了然。考试、生日、纪念日倒计时。",
    url: "https://pick-play.github.io/cn/d-day/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay - 倒计时计算器" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/d-day/",
    languages: {
      "x-default": "https://pick-play.github.io/d-day/",
      "ko": "https://pick-play.github.io/d-day/",
      "en": "https://pick-play.github.io/en/d-day/",
      "ja": "https://pick-play.github.io/jp/d-day/",
      "zh-CN": "https://pick-play.github.io/cn/d-day/",
      "es": "https://pick-play.github.io/es/d-day/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "倒计时计算器 - D-Day",
      url: "https://pick-play.github.io/cn/d-day/",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description: "重要日期一目了然。考试、生日、纪念日倒计时。",
      inLanguage: "zh-CN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://pick-play.github.io/cn/" },
        { "@type": "ListItem", position: 2, name: "倒计时计算器", item: "https://pick-play.github.io/cn/d-day/" },
      ],
    },
  ],
};

export default function DDayCnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
