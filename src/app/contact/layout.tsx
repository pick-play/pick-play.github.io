import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "연락처 | PickPlay",
  description:
    "PickPlay에 문의하세요. 버그 신고, 기능 제안, 광고 문의 등 다양한 문의 유형별 안내와 자주 묻는 질문을 확인하세요.",
  keywords: [
    "PickPlay 연락처",
    "PickPlay 문의",
    "버그 신고",
    "기능 제안",
    "광고 문의",
  ],
  openGraph: {
    title: "연락처 | PickPlay",
    description: "PickPlay에 문의하세요.",
    url: "https://pick-play.github.io/contact/",
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
    canonical: "https://pick-play.github.io/contact/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      name: "PickPlay 연락처",
      url: "https://pick-play.github.io/contact/",
      description: "PickPlay 문의 안내 페이지",
      publisher: {
        "@type": "Organization",
        name: "PickPlay",
        url: "https://pick-play.github.io/",
        email: "pickplay.tools@gmail.com",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "PickPlay는 무료인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "네, PickPlay의 모든 도구는 완전 무료입니다. 회원가입도 필요 없습니다.",
          },
        },
        {
          "@type": "Question",
          name: "버그나 오류를 발견했어요. 어떻게 신고하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "pickplay.tools@gmail.com으로 이메일을 보내주시거나 GitHub 저장소에 이슈를 등록해 주세요. 빠르게 확인하겠습니다.",
          },
        },
        {
          "@type": "Question",
          name: "새로운 기능이나 도구를 제안할 수 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "물론입니다! pickplay.tools@gmail.com으로 아이디어를 보내주세요. 모든 제안을 검토합니다.",
          },
        },
      ],
    },
  ],
};

export default function ContactLayout({
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
