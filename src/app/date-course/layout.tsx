import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "데이트 코스 추천",
  description:
    "데이트 코스 추천! 지역, 시간, 취향에 맞는 완벽한 데이트 코스를 만들어 드립니다. 카페, 식사, 산책까지 한 번에.",
  openGraph: {
    title: "데이트 코스 추천 | LifePick",
    description:
      "지역, 시간, 취향에 맞는 완벽한 데이트 코스를 만들어 드립니다.",
    url: "https://lifepick.vercel.app/date-course",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://lifepick.vercel.app/date-course",
  },
};

export default function DateCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
