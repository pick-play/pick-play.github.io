import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "회식비 정산 - 더치페이 계산기",
  description:
    "회식비 정산을 쉽고 빠르게! 더치페이, 차등 분할, 카드/현금 혼합 결제까지. 최소 송금 구조로 깔끔하게 정산하세요.",
  openGraph: {
    title: "회식비 정산 - 더치페이 계산기 | LifePick",
    description:
      "더치페이부터 차등 분할까지, 최소 송금으로 깔끔하게 정산하세요.",
    url: "https://lifepick.vercel.app/settlement",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://lifepick.vercel.app/settlement",
  },
};

export default function SettlementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
