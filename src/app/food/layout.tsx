import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오늘 뭐 먹지? - 메뉴 추천 룰렛",
  description:
    "뭐 먹을지 고민될 때! 한식, 일식, 중식, 양식, 분식, 디저트 등 130가지 메뉴 중 취향에 맞는 음식을 추천받으세요. 맛 지도에서 담백~자극, 가벼운~고급 취향을 선택하면 슬롯머신이 메뉴를 골라드립니다.",
  keywords: [
    "오늘 뭐 먹지",
    "점심 메뉴 추천",
    "저녁 메뉴 추천",
    "음식 추천 룰렛",
    "랜덤 메뉴 추천",
    "메뉴 고르기",
    "뭐먹지",
    "음식 추천",
    "한식 추천",
    "일식 추천",
    "디저트 추천",
    "회식 메뉴",
    "혼밥 메뉴",
    "배달 메뉴 추천",
  ],
  openGraph: {
    title: "오늘 뭐 먹지? - 130가지 메뉴 추천 룰렛",
    description:
      "고민은 줄이고 선택은 빠르게! 맛 지도에서 취향을 찍으면 슬롯머신이 메뉴를 골라드립니다.",
    url: "https://pick-korea.github.io/food",
  },
  alternates: {
    canonical: "https://pick-korea.github.io/food",
  },
};

export default function FoodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
