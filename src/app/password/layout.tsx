import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "비밀번호 생성기 - 안전한 랜덤 비밀번호",
  description:
    "강력하고 안전한 랜덤 비밀번호를 생성하세요. 길이, 대소문자, 숫자, 특수문자를 조합하여 원하는 비밀번호를 만들 수 있습니다.",
  keywords: [
    "비밀번호 생성기",
    "랜덤 비밀번호",
    "강력한 비밀번호",
    "패스워드 생성",
    "비밀번호 만들기",
    "안전한 비밀번호",
  ],
  openGraph: {
    title: "비밀번호 생성기 - 안전한 랜덤 비밀번호",
    description: "강력하고 안전한 랜덤 비밀번호를 즉시 생성하세요.",
    url: "https://pick-play.github.io/password/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/password/",
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
      name: "비밀번호 생성기",
      description:
        "강력하고 안전한 랜덤 비밀번호 생성 도구. 길이, 대소문자, 숫자, 특수문자 조합 가능.",
      url: "https://pick-play.github.io/password/",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "홈",
          item: "https://pick-play.github.io/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "비밀번호 생성기",
          item: "https://pick-play.github.io/password/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "안전한 비밀번호를 만들려면 어떻게 해야 하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "대소문자, 숫자, 특수문자를 모두 조합하고 최소 16자 이상을 권장합니다. PickPlay 비밀번호 생성기는 이러한 규칙을 자동으로 적용해 드립니다.",
          },
        },
        {
          "@type": "Question",
          name: "생성된 비밀번호는 서버에 저장되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "아니요, 모든 비밀번호 생성은 사용자의 브라우저에서만 이루어집니다. 서버에 전송되거나 저장되지 않아 완전히 안전합니다.",
          },
        },
        {
          "@type": "Question",
          name: "특수문자가 포함된 비밀번호는 왜 더 안전한가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "특수문자를 포함하면 가능한 조합의 수가 기하급수적으로 늘어납니다. 16자 비밀번호에 특수문자를 추가하면 해킹에 수천 년이 걸릴 수 있습니다.",
          },
        },
      ],
    },
  ],
};

export default function PasswordLayout({
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
