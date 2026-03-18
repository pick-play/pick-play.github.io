import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent mb-3">
              LifePick
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              정보 제공이 아니라, 선택을 대신 내려주는 서비스
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">서비스</h4>
            <div className="space-y-2">
              <Link href="/food" className="block text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors">
                오늘 뭐 먹지
              </Link>
              <Link href="/settlement" className="block text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors">
                회식비 정산
              </Link>
              <Link href="/date-course" className="block text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors">
                데이트 코스 추천
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">정보</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              20~40대를 위한 라이프스타일 추천 서비스
            </p>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-700 text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} LifePick. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
