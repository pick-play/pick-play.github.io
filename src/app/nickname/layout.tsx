import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "닉네임 생성기 - 게임, SNS 닉네임 추천 | PickPlay",
  description:
    "귀여운, 웃긴, 멋있는, 게임용, 판타지, 감성적 등 다양한 스타일의 닉네임을 자동으로 생성해 드립니다. 게임, SNS, 블로그에 딱 맞는 닉네임을 찾아보세요!",
  keywords: [
    "닉네임 생성기",
    "닉네임 추천",
    "게임 닉네임",
    "SNS 닉네임",
    "닉네임 만들기",
    "닉네임 짓기",
    "귀여운 닉네임",
    "멋있는 닉네임",
    "랜덤 닉네임",
    "닉네임 아이디어",
  ],
  openGraph: {
    title: "닉네임 생성기 - 게임, SNS 닉네임 추천 | PickPlay",
    description:
      "귀여운, 웃긴, 멋있는, 게임용, 판타지, 감성적 스타일로 나만의 닉네임을 자동 생성! 게임과 SNS에 딱 맞는 닉네임을 찾아보세요.",
    url: "https://pick-play.github.io/nickname/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 선택과 재미를 한 번에",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/nickname/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebApplication", "SoftwareApplication"],
      name: "닉네임 생성기",
      url: "https://pick-play.github.io/nickname/",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      description:
        "귀여운, 웃긴, 멋있는, 게임용, 판타지, 감성적 스타일로 닉네임을 자동 생성하는 무료 온라인 도구입니다.",
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
          name: "닉네임 생성기",
          item: "https://pick-play.github.io/nickname/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "닉네임 생성기는 어떻게 사용하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "원하는 스타일(귀여운, 웃긴, 멋있는, 게임용, 판타지, 감성적)을 선택하고 '생성하기' 버튼을 누르면 8개의 닉네임이 자동으로 만들어집니다. 숫자 포함, 특수문자 포함, 최대 글자 수도 설정할 수 있습니다.",
          },
        },
        {
          "@type": "Question",
          name: "생성된 닉네임을 복사하려면 어떻게 하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "각 닉네임 카드의 복사 버튼을 눌러 개별 닉네임을 복사하거나, '복사 전체' 버튼으로 생성된 닉네임 8개를 한 번에 클립보드에 복사할 수 있습니다.",
          },
        },
        {
          "@type": "Question",
          name: "닉네임 생성기는 무료인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "네, PickPlay의 닉네임 생성기는 완전 무료입니다. 회원가입 없이, 앱 설치 없이 웹 브라우저에서 바로 사용할 수 있습니다. 마음에 드는 닉네임이 나올 때까지 무제한으로 생성해보세요!",
          },
        },
      ],
    },
  ],
};

export default function NicknameLayout({
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
