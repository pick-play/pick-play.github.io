import Link from "next/link";

const footerCategories = [
  {
    label: "생활 도구",
    links: [
      { href: "/food", label: "뭐 먹지?" },
      { href: "/settlement", label: "회식비 정산" },
      { href: "/date-course", label: "데이트 코스" },
      { href: "/roulette", label: "랜덤 룰렛" },
      { href: "/d-day", label: "D-Day 계산기" },
      { href: "/draw", label: "제비뽑기" },
      { href: "/seat", label: "자리 배치" },
      { href: "/nickname", label: "닉네임 생성기" },
    ],
  },
  {
    label: "파티 게임",
    links: [
      { href: "/liar-game", label: "라이어 게임" },
      { href: "/random-team", label: "조 뽑기" },
      { href: "/balance-game", label: "밸런스 게임" },
      { href: "/chosung-quiz", label: "초성 퀴즈" },
      { href: "/ladder", label: "사다리 타기" },
      { href: "/truth-dare", label: "진실 or 도전" },
      { href: "/worldcup", label: "이상형 월드컵" },
    ],
  },
  {
    label: "테스트",
    links: [
      { href: "/teto-egen", label: "테토 vs 에겐" },
      { href: "/mbti", label: "MBTI 검사" },
      { href: "/couple-test", label: "커플 궁합" },
      { href: "/color-test", label: "색깔 테스트" },
      { href: "/tarot", label: "Yes or No 타로" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-10 mb-8">
          {/* Brand */}
          <div className="shrink-0">
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent"
            >
              PickPlay
            </Link>
            <p className="text-sm text-slate-400 mt-1">
              고민은 줄이고, 선택은 빠르게.
            </p>
          </div>

          {/* Category link columns */}
          <nav className="flex flex-wrap gap-10 md:gap-12">
            {footerCategories.map((category) => (
              <div key={category.label}>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                  {category.label}
                </p>
                <ul className="space-y-2">
                  {category.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <span>&copy; {new Date().getFullYear()} PickPlay</span>
          <span>
            Made by{" "}
            <a
              href="https://github.com/pick-play"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-primary-500 transition-colors"
            >
              pick-play
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
