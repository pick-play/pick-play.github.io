import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "エイムトレーナー - マウス精度テスト | PickPlay",
  description:
    "30秒のエイムトレーナーでマウスの精度と反応速度をテスト・トレーニング。かんたん・ふつう・むずかしい3段階の難易度と詳細な統計を提供。",
  keywords: [
    "エイムトレーナー",
    "エイムテスト",
    "マウス精度",
    "反応速度テスト",
    "クリックトレーニング",
    "FPSエイム練習",
    "マウストレーニング",
    "エイム上達",
    "クリック精度",
  ],
  openGraph: {
    title: "エイムトレーナー - マウス精度テスト",
    description:
      "30秒のエイムトレーナーでマウスの精度と反応速度をトレーニング。3段階の難易度と詳細な統計付き。",
    url: "https://pick-play.github.io/jp/aim-test/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - エイムトレーナー",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/aim-test/",
    languages: {
      "x-default": "https://pick-play.github.io/aim-test/",
      ko: "https://pick-play.github.io/aim-test/",
      en: "https://pick-play.github.io/en/aim-test/",
      ja: "https://pick-play.github.io/jp/aim-test/",
      "zh-CN": "https://pick-play.github.io/cn/aim-test/",
      es: "https://pick-play.github.io/es/aim-test/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "エイムトレーナー - マウス精度テスト",
      url: "https://pick-play.github.io/jp/aim-test/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description:
        "30秒のエイムトレーナーでマウスの精度と反応速度をテスト。3段階の難易度と命中率・平均反応時間の統計を提供します。",
      inLanguage: "ja",
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
          name: "エイムトレーナー",
          item: "https://pick-play.github.io/jp/aim-test/",
        },
      ],
    },
  ],
};

export default function AimTestJpLayout({
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
