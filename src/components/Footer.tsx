import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent"
            >
              LifePick
            </Link>
            <p className="text-sm text-slate-400 mt-1">
              고민은 줄이고, 선택은 빠르게.
            </p>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="/food"
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors"
            >
              뭐 먹지
            </Link>
            <Link
              href="/settlement"
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors"
            >
              정산
            </Link>
            <Link
              href="/date-course"
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors"
            >
              데이트 코스
            </Link>
          </nav>
        </div>
        <div className="pt-6 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <span>&copy; {new Date().getFullYear()} LifePick</span>
          <span>
            Made by{" "}
            <a
              href="https://github.com/pick-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-primary-500 transition-colors"
            >
              pick-ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
