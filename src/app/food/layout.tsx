import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오늘 뭐 먹지 - 음식 추천",
  description:
    "오늘 뭐 먹지? 가격대, 인원, 음식 종류에 맞춰 최적의 메뉴를 추천해 드립니다. 가성비, 인기, 분위기 기반 맞춤 추천.",
  openGraph: {
    title: "오늘 뭐 먹지 - 음식 추천 | LifePick",
    description:
      "가격대, 인원, 음식 종류에 맞춰 최적의 메뉴를 추천해 드립니다.",
    url: "https://lifepick.vercel.app/food",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://lifepick.vercel.app/food",
  },
};

export default function FoodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
