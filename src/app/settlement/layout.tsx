import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "회식비 정산 계산기 - 더치페이 / N빵",
  description:
    "회식비, 모임비를 간편하게 정산하세요. 더치페이, N빵, 차등 정산까지 지원하는 무료 정산 계산기. 누가 얼마를 내야 하는지 한눈에 확인할 수 있습니다.",
  keywords: [
    "회식비 정산",
    "더치페이 계산기",
    "N빵 계산기",
    "정산 계산기",
    "모임비 정산",
    "회식 정산",
    "송금 계산",
    "돈 나누기",
    "회비 정산",
    "술값 정산",
    "밥값 정산",
    "경비 정산",
  ],
  openGraph: {
    title: "회식비 정산 계산기 - 더치페이 / N빵",
    description:
      "회식비, 모임비를 간편하게 정산하세요. 누가 얼마를 내야 하는지 한눈에!",
    url: "https://pick-korea.github.io/settlement",
  },
  alternates: {
    canonical: "https://pick-korea.github.io/settlement",
  },
};

export default function SettlementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
