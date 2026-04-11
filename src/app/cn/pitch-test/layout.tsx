import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "绝对音感测试 - 你的音乐耳力如何? | PickPlay",
  description:
    "「聆听纯正弦波音符，在钢琴键盘上识别正确音名的绝对音感测试。从初级（仅白键）到专家级（3个八度）共4种难度。测测你的音乐能力！」",
  keywords: [
    "绝对音感测试",
    "绝对音感",
    "音感测试",
    "听音训练",
    "钢琴音符识别",
    "音乐能力测试",
    "音名识别",
    "相对音感",
    "完美音感",
    "音程识别",
  ],
  openGraph: {
    title: "绝对音感测试 - 你的音乐耳力如何?",
    description:
      "「聆听纯正弦波音符，在钢琴键盘上识别音名。4种难度等级测试你的绝对音感。」",
    url: "https://pick-play.github.io/cn/pitch-test/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 绝对音感测试",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/pitch-test/",
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
      name: "绝对音感测试 - 你的音乐耳力如何?",
      url: "https://pick-play.github.io/cn/pitch-test/",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      description:
        "「聆听纯正弦波音符，在钢琴键盘上识别正确音名的绝对音感测试。从初级仅白键到专家级3个八度共4种难度。」",
      inLanguage: "zh-CN",
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
          name: "绝对音感测试",
          item: "https://pick-play.github.io/cn/pitch-test/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "什么是绝对音感？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "绝对音感（Perfect Pitch）是指无需参考音，就能立即识别所听到音符名称的能力。全球仅约0.01~1%的人拥有此能力，通常与幼年时期的音乐教育密切相关。",
          },
        },
        {
          "@type": "Question",
          name: "这个测试是如何工作的？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "使用Web Audio API生成纯正弦波音。聆听后，在钢琴键盘上点击相应的键。初级仅用白键（7音），专家模式跨越3个八度（36音）。",
          },
        },
      ],
    },
  ],
};

export default function PitchTestCnLayout({
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
