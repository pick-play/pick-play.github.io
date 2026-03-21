import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://pick-korea.github.io"),
  verification: {
    google: "0c1Q1LUKx3fTxGQ9BHGViwcOtcz7ETY-vhjnSw11oMU",
  },
  title: {
    default: "LifePick - 오늘 뭐 먹지 | 회식비 정산 | 데이트 코스 추천",
    template: "%s | LifePick",
  },
  description:
    "오늘 뭐 먹지? 회식비 정산, 데이트 코스 추천까지. 선택을 대신 내려주는 라이프스타일 서비스 LifePick",
  keywords: [
    "오늘 뭐 먹지",
    "회식비 정산",
    "데이트 코스 추천",
    "더치페이 계산기",
    "음식 추천",
    "데이트 장소",
  ],
  openGraph: {
    title: "LifePick - 선택을 대신 내려주는 서비스",
    description:
      "오늘 뭐 먹지? 회식비 정산, 데이트 코스 추천까지 한 곳에서.",
    type: "website",
    locale: "ko_KR",
    url: "https://pick-korea.github.io",
    siteName: "LifePick",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LifePick - 라이프스타일 추천 서비스",
      },
    ],
  },
  alternates: {
    canonical: "https://pick-korea.github.io",
    languages: {
      "ko-KR": "https://pick-korea.github.io",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
