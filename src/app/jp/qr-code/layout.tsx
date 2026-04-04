import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QRコード生成ツール - 無料オンラインQRコード作成",
  description:
    "URLやテキストを今すぐQRコードに変換。サイズと色をカスタマイズして無料でダウンロードできます。",
  keywords: [
    "QRコード生成",
    "QRコード作成",
    "無料QRコード",
    "URLからQRコード",
    "QRコードメーカー",
    "QRコードダウンロード",
  ],
  openGraph: {
    title: "QRコード生成ツール - 無料オンラインQRコード作成",
    description:
      "URLやテキストを今すぐQRコードに変換し、無料でダウンロードしましょう。",
    url: "https://pick-play.github.io/jp/qr-code/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/jp/qr-code/",
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
      name: "QRコード生成ツール",
      description:
        "URLとテキストを瞬時にQRコードへ変換。サイズと色をカスタマイズして無料ダウンロード。",
      url: "https://pick-play.github.io/jp/qr-code/",
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
          name: "QRコード生成ツール",
          item: "https://pick-play.github.io/jp/qr-code/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "QRコードとは何ですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "QRコード（Quick Response Code）はスマートフォンのカメラでスキャンすることで、URLやテキスト、連絡先などの情報を素早く読み取れる2次元バーコードです。",
          },
        },
        {
          "@type": "Question",
          name: "生成したQRコードはどう使えますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ダウンロードボタンで画像を保存し、名刺やポスター、ウェブサイトなどに自由に活用できます。スマートフォンでスキャンするとすぐにリンク先へ移動します。",
          },
        },
        {
          "@type": "Question",
          name: "QRコードにどんな情報を入れられますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ウェブサイトのURL、テキスト、メールアドレス、電話番号など様々な情報を含められます。テキストが短いほどQRコードがシンプルになりスキャンしやすくなります。",
          },
        },
      ],
    },
  ],
};

export default function QrCodeJpLayout({
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
