import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "パスワード生成ツール - 安全なランダムパスワード",
  description:
    "強力で安全なランダムパスワードを今すぐ生成。長さ、大文字・小文字、数字、記号を組み合わせて理想のパスワードを作成できます。",
  keywords: [
    "パスワード生成",
    "ランダムパスワード",
    "強いパスワード",
    "安全なパスワード",
    "パスワード作成",
    "パスワードジェネレーター",
  ],
  openGraph: {
    title: "パスワード生成ツール - 安全なランダムパスワード",
    description: "強力で安全なランダムパスワードを今すぐ生成しましょう。",
    url: "https://pick-play.github.io/jp/password/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/password/",
    languages: {
      "x-default": "https://pick-play.github.io/password/",
      ko: "https://pick-play.github.io/password/",
      en: "https://pick-play.github.io/en/password/",
      ja: "https://pick-play.github.io/jp/password/",
      "zh-CN": "https://pick-play.github.io/cn/password/",
      es: "https://pick-play.github.io/es/password/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "パスワード生成ツール",
      description:
        "強力で安全なランダムパスワードを生成。長さや文字の種類をカスタマイズしてコピーできます。",
      url: "https://pick-play.github.io/jp/password/",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
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
          name: "パスワード生成ツール",
          item: "https://pick-play.github.io/jp/password/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "強いパスワードの条件は何ですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "大文字・小文字・数字・記号を組み合わせ、16文字以上にすることを推奨します。PickPlayのパスワード生成ツールはこれらのルールを自動で適用します。",
          },
        },
        {
          "@type": "Question",
          name: "生成されたパスワードはサーバーに保存されますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "いいえ、すべての処理はブラウザ内のみで行われます。サーバーには何も送信されないため、パスワードは完全にプライベートです。",
          },
        },
        {
          "@type": "Question",
          name: "なぜ記号を含めるとより安全なのですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "記号を含めることで使用できる文字の組み合わせ数が指数的に増加し、ブルートフォース攻撃が格段に困難になります。",
          },
        },
      ],
    },
  ],
};

export default function PasswordJpLayout({
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
