import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SidebarAds from "@/components/SidebarAds";
import AnchorAd from "@/components/AnchorAd";
import LanguageDetector from "@/components/LanguageDetector";
import HtmlLangSetter from "@/components/HtmlLangSetter";

export const metadata: Metadata = {
  metadataBase: new URL("https://pick-play.github.io/"),
  verification: {
    google: "0c1Q1LUKx3fTxGQ9BHGViwcOtcz7ETY-vhjnSw11oMU",
    other: {
      "naver-site-verification": ["4b7849490bde02d9a26e3f216598d9df8b45e25d"],
    },
  },
  title: {
    default: "PickPlay - 오늘 뭐 먹지 | 라이어 게임 | 조 뽑기 | 데이트 코스",
    template: "%s | PickPlay",
  },
  description:
    "오늘 뭐 먹지? 라이어 게임, 랜덤 조 뽑기, 데이트 코스 추천까지. 선택과 재미를 한 번에! PickPlay",
  keywords: [
    "오늘 뭐 먹지",
    "라이어 게임",
    "랜덤 조 뽑기",
    "회식비 정산",
    "데이트 코스 추천",
    "파티 게임",
    "팀 나누기",
    "음식 추천",
    "무료 온라인 도구",
    "PDF 합치기",
    "이미지 압축",
    "닉네임 생성기",
    "MBTI 검사",
    "밸런스 게임",
    "초성 퀴즈",
    "사다리 타기",
    "제비뽑기",
    "룰렛 돌리기",
    "커플 궁합",
    "색깔 테스트",
    "타로",
    "자리 배치",
    "D-Day 계산기",
  ],
  openGraph: {
    title: "PickPlay - 선택과 재미를 한 번에",
    description:
      "오늘 뭐 먹지? 라이어 게임, 랜덤 조 뽑기, 데이트 코스 추천까지 한 곳에서.",
    type: "website",
    locale: "ko_KR",
    url: "https://pick-play.github.io/",
    siteName: "PickPlay",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PickPlay - 라이프스타일 추천 서비스",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-play.github.io/",
    languages: {
      "x-default": "https://pick-play.github.io/",
      "ko": "https://pick-play.github.io/",
      "en": "https://pick-play.github.io/en/",
      "ja": "https://pick-play.github.io/jp/",
      "zh-CN": "https://pick-play.github.io/cn/",
      "es": "https://pick-play.github.io/es/",
    },
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
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
      "@type": "Organization",
      "@id": "https://pick-play.github.io/#organization",
      name: "PickPlay",
      url: "https://pick-play.github.io/",
      logo: "https://pick-play.github.io/apple-touch-icon.png",
      description: "오늘 뭐 먹지? 라이어 게임, 랜덤 조 뽑기, 데이트 코스 추천까지. 선택과 재미를 한 번에!",
    },
    {
      "@type": "WebSite",
      "@id": "https://pick-play.github.io/#website",
      url: "https://pick-play.github.io/",
      name: "PickPlay",
      publisher: { "@id": "https://pick-play.github.io/#organization" },
      inLanguage: "ko-KR",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://pick-play.github.io/#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: "https://pick-play.github.io/" },
        { "@type": "ListItem", position: 2, name: "오늘 뭐 먹지?", item: "https://pick-play.github.io/food/" },
        { "@type": "ListItem", position: 3, name: "데이트 코스", item: "https://pick-play.github.io/date-course/" },
        { "@type": "ListItem", position: 4, name: "회식비 정산", item: "https://pick-play.github.io/settlement/" },
        { "@type": "ListItem", position: 5, name: "라이어 게임", item: "https://pick-play.github.io/liar-game/" },
        { "@type": "ListItem", position: 6, name: "조 뽑기", item: "https://pick-play.github.io/random-team/" },
        { "@type": "ListItem", position: 7, name: "밸런스 게임", item: "https://pick-play.github.io/balance-game/" },
        { "@type": "ListItem", position: 8, name: "랜덤 룰렛", item: "https://pick-play.github.io/roulette/" },
        { "@type": "ListItem", position: 9, name: "초성 퀴즈", item: "https://pick-play.github.io/chosung-quiz/" },
        { "@type": "ListItem", position: 10, name: "테토 vs 에겐", item: "https://pick-play.github.io/teto-egen/" },
        { "@type": "ListItem", position: 11, name: "MBTI 검사", item: "https://pick-play.github.io/mbti/" },
        { "@type": "ListItem", position: 12, name: "PDF 도구", item: "https://pick-play.github.io/pdf/" },
        { "@type": "ListItem", position: 13, name: "이미지 도구", item: "https://pick-play.github.io/image/" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "PickPlay는 무료인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "네, 모든 도구를 무료로 이용할 수 있습니다. 회원가입도 필요 없습니다.",
          },
        },
        {
          "@type": "Question",
          name: "어떤 파티 게임이 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "라이어 게임, 밸런스 게임, 초성 퀴즈, 진실 or 도전, 이상형 월드컵, 조 뽑기, 사다리 타기 등 7가지 파티 게임을 즐길 수 있습니다.",
          },
        },
        {
          "@type": "Question",
          name: "오늘 뭐 먹지 기능은 어떻게 사용하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "뭐 먹지 페이지에서 맛 지도로 취향을 선택하면 130가지 메뉴 중 딱 맞는 음식을 추천받을 수 있습니다.",
          },
        },
        {
          "@type": "Question",
          name: "몇 개 언어를 지원하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "한국어, English, 日本語, 中文, Español 5개 언어를 지원합니다.",
          },
        },
        {
          "@type": "Question",
          name: "PDF 도구로 무엇을 할 수 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "PDF 합치기, 분할, JPG 변환, 압축, 워터마크 추가 등 7가지 기능을 브라우저에서 안전하게 사용할 수 있습니다.",
          },
        },
      ],
    },
    {
      "@type": "WebApplication",
      name: "PickPlay",
      url: "https://pick-play.github.io/",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      inLanguage: ["ko", "en", "ja", "zh-CN", "es"],
      description: "26가지 무료 온라인 도구 - 음식 추천, 파티 게임, 심리 테스트, PDF 도구, 비밀번호 생성기, 타이머 등",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="//googleads.g.doubleclick.net" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <meta name="google-adsense-account" content="ca-pub-7766090864059500" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7766090864059500"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
        <ThemeProvider>
          <Header />
          <LanguageDetector />
          <HtmlLangSetter />
          <div className="flex-1 flex">
            <SidebarAds side="left" />
            <main className="flex-1 min-w-0 pb-16 md:pb-0">{children}</main>
            <SidebarAds side="right" />
          </div>
          <Footer />
          <AnchorAd />
        </ThemeProvider>
      </body>
    </html>
  );
}
