import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "데이트 코스 추천 - 전국 10개 도시",
  description:
    "서울, 부산, 대구, 인천, 광주, 대전, 울산, 세종, 경기 등 전국 10개 도시 100가지 데이트 코스를 추천받으세요. 낮/밤 시간대별, 카페·야외·실내·액티비티 취향별 맞춤 코스를 분위기 지도에서 골라드립니다.",
  keywords: [
    "데이트 코스 추천",
    "서울 데이트",
    "부산 데이트",
    "대구 데이트",
    "인천 데이트",
    "경기도 데이트",
    "데이트 장소",
    "커플 데이트",
    "데이트 코스",
    "실내 데이트",
    "야외 데이트",
    "카페 데이트",
    "낮 데이트",
    "밤 데이트",
    "주말 데이트",
    "데이트 플래너",
  ],
  openGraph: {
    title: "데이트 코스 추천 - 전국 10개 도시 100+ 코스",
    description:
      "분위기 지도에서 원하는 느낌을 찍으면, 완벽한 데이트 코스를 짜드립니다. 서울부터 경기까지!",
    url: "https://pick-ai.github.io/flowday/date-course",
  },
  alternates: {
    canonical: "https://pick-ai.github.io/flowday/date-course",
  },
};

export default function DateCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
