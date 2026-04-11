import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "絶対音感テスト - あなたの音感はどのくらい? | PickPlay",
  description:
    "純粋なサイン波の音を聴いてピアノ鍵盤で音名を当てる絶対音感テスト。初級（白鍵のみ）からプロ（3オクターブ）まで4段階の難易度。あなたの音楽能力を確かめましょう。",
  keywords: [
    "絶対音感テスト",
    "絶対音感",
    "音感テスト",
    "耳のトレーニング",
    "ピアノ音当て",
    "音楽能力テスト",
    "音名識別",
    "相対音感",
    "パーフェクトピッチ",
    "音程当て",
  ],
  openGraph: {
    title: "絶対音感テスト - あなたの音感はどのくらい?",
    description:
      "サイン波音を聴いてピアノ鍵盤で音名を当てる絶対音感テスト。4段階の難易度であなたの音楽能力を確かめましょう。",
    url: "https://pick-play.github.io/jp/pitch-test/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 絶対音感テスト",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/pitch-test/",
    languages: {
      "x-default": "https://pick-play.github.io/pitch-test/",
      ko: "https://pick-play.github.io/pitch-test/",
      en: "https://pick-play.github.io/en/pitch-test/",
      ja: "https://pick-play.github.io/jp/pitch-test/",
      "zh-CN": "https://pick-play.github.io/cn/pitch-test/",
      es: "https://pick-play.github.io/es/pitch-test/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "絶対音感テスト - あなたの音感はどのくらい?",
      url: "https://pick-play.github.io/jp/pitch-test/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description:
        "純粋なサイン波の音を聴いてピアノ鍵盤で音名を当てる絶対音感テスト。初級から3オクターブのプロモードまで4段階の難易度。",
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
          name: "絶対音感テスト",
          item: "https://pick-play.github.io/jp/pitch-test/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "絶対音感とは何ですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "絶対音感とは、基準音なしで聴いた音の音名を即座に識別できる能力です。世界人口の約0.01〜1%しか持っておらず、幼少期の音楽教育と関連していることが多いです。",
          },
        },
        {
          "@type": "Question",
          name: "このテストはどのように機能しますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Web Audio APIを使って純粋なサイン波音を生成します。音を聴いた後、ピアノの鍵盤から該当する音をクリックしてください。初級は白鍵のみ（7音）、プロモードは3オクターブ（36音）です。",
          },
        },
      ],
    },
  ],
};

export default function PitchTestJpLayout({
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
