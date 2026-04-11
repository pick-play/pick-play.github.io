import Link from "next/link";
import type { Metadata } from "next";

const posts = [
  {
    slug: "strong-password-guide",
    title: "안전한 비밀번호 만드는 법 - 2024년 완벽 가이드",
    date: "2024.12.10",
    readTime: "7분",
    excerpt:
      "비밀번호 하나가 당신의 계정 전체를 지킵니다. 해커가 쉽게 뚫는 패턴과, 실제로 안전한 비밀번호를 만드는 원칙을 알아보세요.",
  },
  {
    slug: "compound-interest-explained",
    title: "복리의 마법 - 10년 후 내 돈은 얼마가 될까?",
    date: "2024.12.12",
    readTime: "8분",
    excerpt:
      "복리는 아인슈타인이 '세계 8대 불가사의'라 불렀을 만큼 강력한 개념입니다. 72법칙과 실제 계산 예시로 복리의 힘을 체감해보세요.",
  },
  {
    slug: "korean-property-tax-guide",
    title: "2024년 부동산 취득세 완벽 가이드 - 다주택자·생애최초 감면까지",
    date: "2024.12.14",
    readTime: "10분",
    excerpt:
      "집을 살 때 내야 하는 취득세, 정확히 얼마인지 아시나요? 기본 세율부터 다주택자 중과, 생애최초 감면 조건까지 한 번에 정리했습니다.",
  },
  {
    slug: "salary-deductions-explained",
    title: "연봉 실수령액의 비밀 - 4대보험과 세금 완전 해부",
    date: "2024.12.16",
    readTime: "9분",
    excerpt:
      "연봉 5,000만 원인데 실제로 받는 돈은 왜 이렇게 적을까요? 국민연금, 건강보험, 고용보험, 소득세가 어떻게 빠져나가는지 낱낱이 공개합니다.",
  },
  {
    slug: "typing-speed-tips",
    title: "타이핑 속도 200% 올리는 10가지 방법",
    date: "2024.12.18",
    readTime: "6분",
    excerpt:
      "타이핑 속도는 연습보다 방법이 중요합니다. 올바른 손 자세, 홈 포지션, 효과적인 연습법으로 WPM을 두 배로 늘려보세요.",
  },
  {
    slug: "party-game-ideas",
    title: "모임이 10배 재미있어지는 파티 게임 추천 TOP 7",
    date: "2024.12.20",
    readTime: "7분",
    excerpt:
      "어색한 침묵은 이제 그만! 라이어 게임부터 밸런스 게임, 초성 퀴즈까지 모임 분위기를 확 바꿔줄 파티 게임 7가지를 소개합니다.",
  },
  {
    slug: "reaction-time-science",
    title: "반응속도의 과학 - 인간 반응속도는 평균 몇 ms일까?",
    date: "2024.12.22",
    readTime: "6분",
    excerpt:
      "F1 드라이버의 반응속도는 0.2초, 일반인은 0.25초. 반응속도를 결정하는 요인과 나이·카페인의 영향, 그리고 훈련으로 개선하는 법을 알아봅니다.",
  },
  {
    slug: "loan-repayment-methods",
    title: "원리금균등 vs 원금균등 - 대출 상환 방식 완벽 비교",
    date: "2024.12.24",
    readTime: "8분",
    excerpt:
      "같은 대출이라도 상환 방식에 따라 총 이자가 수백만 원 차이납니다. 원리금균등과 원금균등의 차이, 어떤 상황에서 어떤 방식이 유리한지 알아보세요.",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">PickPlay 블로그</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          비밀번호 보안, 금융 계산, 부동산 세금, 생산성 팁 등 실생활에 바로 쓸 수 있는 가이드를 제공합니다.
        </p>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow"
          >
            <Link href={`/blog/${post.slug}/`} className="group block">
              <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-4 leading-relaxed text-sm">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <time>{post.date}</time>
                <span>·</span>
                <span>읽기 {post.readTime}</span>
                <span className="ml-auto text-blue-500 group-hover:underline">
                  읽기 →
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
