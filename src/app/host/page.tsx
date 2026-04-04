"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface PathVisit {
  total: number;
  daily: Record<string, number>;
}
type VisitData = Record<string, PathVisit>;

// ─── Constants ────────────────────────────────────────────────────────────────
const PASSWORD = "9703";
const VISIT_KEY = "pickplay_visits";
const AUTH_KEY = "pickplay_host_auth";

const ALL_TOOLS = [
  { path: "/food", name: "뭐 먹지?" },
  { path: "/settlement", name: "회식비 정산" },
  { path: "/date-course", name: "데이트 코스" },
  { path: "/roulette", name: "랜덤 룰렛" },
  { path: "/d-day", name: "D-Day 계산기" },
  { path: "/draw", name: "제비뽑기" },
  { path: "/seat", name: "자리 배치" },
  { path: "/nickname", name: "닉네임 생성기" },
  { path: "/pdf", name: "PDF 도구" },
  { path: "/image", name: "이미지 도구" },
  { path: "/ladder", name: "사다리 타기" },
  { path: "/password", name: "비밀번호 생성기" },
  { path: "/text-counter", name: "글자수 세기" },
  { path: "/random-number", name: "랜덤 숫자" },
  { path: "/timer", name: "타이머" },
  { path: "/qr-code", name: "QR 코드 생성기" },
  { path: "/age-calculator", name: "나이 계산기" },
  { path: "/percentage", name: "퍼센트 계산기" },
  { path: "/bmi", name: "BMI 계산기" },
  { path: "/unit-converter", name: "단위 변환기" },
  { path: "/reaction-test", name: "반응속도 테스트" },
  { path: "/memory-game", name: "메모리 게임" },
  { path: "/liar-game", name: "라이어 게임" },
  { path: "/random-team", name: "조 뽑기" },
  { path: "/balance-game", name: "밸런스 게임" },
  { path: "/chosung-quiz", name: "초성 퀴즈" },
  { path: "/truth-dare", name: "진실 or 도전" },
  { path: "/worldcup", name: "이상형 월드컵" },
  { path: "/teto-egen", name: "테토 vs 에겐" },
  { path: "/mbti", name: "MBTI 검사" },
  { path: "/couple-test", name: "커플 궁합" },
  { path: "/color-test", name: "색깔 테스트" },
  { path: "/tarot", name: "Yes or No 타로" },
  { path: "/", name: "홈" },
  { path: "/en", name: "Home (EN)" },
  { path: "/jp", name: "ホーム (JP)" },
];

// ─── Login Gate ───────────────────────────────────────────────────────────────
function LoginGate({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "1");
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div
        className={`bg-white rounded-2xl shadow-2xl p-10 w-full max-w-sm text-center ${shake ? "animate-bounce" : ""}`}
      >
        <div className="mb-6">
          <span className="text-5xl">🎮</span>
          <h1 className="text-2xl font-extrabold text-slate-800 mt-3">PickPlay</h1>
          <p className="text-slate-400 text-sm mt-1">관리자 대시보드</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
              setError(false);
            }}
            placeholder="비밀번호 입력"
            autoFocus
            className={`w-full px-4 py-3 rounded-xl border-2 text-center text-lg tracking-widest outline-none transition-colors ${
              error
                ? "border-red-400 bg-red-50 text-red-700"
                : "border-slate-200 focus:border-slate-500"
            }`}
          />
          {error && (
            <p className="text-red-500 text-sm">비밀번호가 올바르지 않습니다.</p>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard() {
  const [visitData, setVisitData] = useState<VisitData>({});
  const [sessionStart] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "visits" | "analytics" | "session" | "actions">("overview");

  const today = new Date().toISOString().split("T")[0];
  const deployDate = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Load visit data
  const loadVisits = useCallback(() => {
    try {
      const raw = localStorage.getItem(VISIT_KEY);
      setVisitData(raw ? JSON.parse(raw) : {});
    } catch {
      setVisitData({});
    }
  }, []);

  useEffect(() => {
    loadVisits();
  }, [loadVisits]);

  // Session timer
  useEffect(() => {
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - sessionStart) / 1000)), 1000);
    return () => clearInterval(id);
  }, [sessionStart]);

  const formatElapsed = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `${h}시간 ${m}분 ${sec}초`;
    if (m > 0) return `${m}분 ${sec}초`;
    return `${sec}초`;
  };

  // Build sorted tool visit table
  const toolRows = ALL_TOOLS.map((t) => {
    const v = visitData[t.path];
    return {
      ...t,
      total: v?.total ?? 0,
      todayCount: v?.daily?.[today] ?? 0,
    };
  }).sort((a, b) => b.total - a.total);

  const maxTotal = Math.max(1, ...toolRows.map((r) => r.total));
  const globalTotal = visitData["_global"]?.total ?? 0;
  const globalToday = visitData["_global"]?.daily?.[today] ?? 0;

  // Actions
  const clearData = () => {
    if (confirm("모든 방문 데이터를 삭제하시겠습니까?")) {
      localStorage.removeItem(VISIT_KEY);
      loadVisits();
    }
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(visitData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pickplay-visits-${today}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const bg = isDark ? "bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-800";
  const card = isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200";
  const sidebar = "bg-slate-800 text-slate-100";

  const navItems = [
    { id: "overview", label: "사이트 개요", icon: "📊" },
    { id: "visits", label: "방문 추적", icon: "👁" },
    { id: "analytics", label: "애널리틱스 링크", icon: "🔗" },
    { id: "session", label: "세션 정보", icon: "💻" },
    { id: "actions", label: "빠른 실행", icon: "⚡" },
  ] as const;

  return (
    <div className={`min-h-screen flex ${bg} transition-colors`}>
      {/* Sidebar */}
      <aside className={`w-56 shrink-0 flex flex-col ${sidebar} min-h-screen`}>
        <div className="px-5 py-6 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎮</span>
            <div>
              <div className="font-extrabold text-sm leading-tight">PickPlay</div>
              <div className="text-slate-400 text-xs">Host Dashboard</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                activeTab === item.id
                  ? "bg-slate-600 text-white"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-slate-700">
          <button
            onClick={() => setIsDark((d) => !d)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            {isDark ? "☀️" : "🌙"} {isDark ? "라이트 모드" : "다크 모드"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className={`bg-gradient-to-r from-slate-800 to-slate-900 text-white px-8 py-5 flex items-center justify-between`}>
          <div>
            <h1 className="text-xl font-bold">
              {navItems.find((n) => n.id === activeTab)?.icon}{" "}
              {navItems.find((n) => n.id === activeTab)?.label}
            </h1>
            <p className="text-slate-400 text-xs mt-0.5">PickPlay 관리자 전용 페이지</p>
          </div>
          <div className="text-right text-xs text-slate-400">
            <div>{deployDate}</div>
            <div className="text-slate-500">세션 {formatElapsed(elapsed)}</div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 overflow-auto">
          {/* ── Overview ── */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "총 도구 수", value: "36", sub: "31 유틸 + 5 게임", icon: "🛠" },
                  { label: "지원 언어", value: "5", sub: "ko / en / jp / cn / es", icon: "🌐" },
                  { label: "총 페이지", value: "180+", sub: "로케일 포함", icon: "📄" },
                  { label: "마지막 배포", value: deployDate, sub: "근사치", icon: "🚀" },
                ].map((stat) => (
                  <div key={stat.label} className={`rounded-2xl border p-5 ${card}`}>
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-extrabold">{stat.value}</div>
                    <div className="text-xs font-semibold mt-1">{stat.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{stat.sub}</div>
                  </div>
                ))}
              </div>
              <div className={`rounded-2xl border p-6 ${card}`}>
                <h2 className="font-bold text-base mb-4">방문 요약</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: "총 방문", value: globalTotal.toLocaleString() },
                    { label: "오늘 방문", value: globalToday.toLocaleString() },
                    { label: "추적 경로", value: Object.keys(visitData).filter((k) => k !== "_global").length },
                  ].map((item) => (
                    <div key={item.label} className={`rounded-xl p-4 ${isDark ? "bg-slate-700" : "bg-slate-50"}`}>
                      <div className="text-xl font-extrabold">{item.value}</div>
                      <div className="text-xs text-slate-400 mt-1">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Visit Tracker ── */}
          {activeTab === "visits" && (
            <div className={`rounded-2xl border ${card} overflow-hidden`}>
              <div className="p-5 border-b border-inherit flex items-center justify-between">
                <div>
                  <h2 className="font-bold">페이지별 방문 수</h2>
                  <p className="text-xs text-slate-400 mt-0.5">방문 많은 순 정렬 · localStorage 기반</p>
                </div>
                <div className="text-right text-sm">
                  <span className="font-bold">{globalTotal.toLocaleString()}</span>
                  <span className="text-slate-400 ml-1">총 방문</span>
                  <span className="ml-3 font-bold text-emerald-500">{globalToday.toLocaleString()}</span>
                  <span className="text-slate-400 ml-1">오늘</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`text-xs ${isDark ? "bg-slate-700 text-slate-300" : "bg-slate-50 text-slate-500"}`}>
                      <th className="px-5 py-3 text-left font-semibold w-6">#</th>
                      <th className="px-5 py-3 text-left font-semibold">페이지</th>
                      <th className="px-5 py-3 text-left font-semibold">경로</th>
                      <th className="px-5 py-3 text-right font-semibold">오늘</th>
                      <th className="px-5 py-3 text-right font-semibold">총계</th>
                      <th className="px-5 py-3 text-left font-semibold w-40">비율</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-inherit">
                    {toolRows.map((row, i) => (
                      <tr key={row.path} className={`transition-colors ${isDark ? "hover:bg-slate-700" : "hover:bg-slate-50"}`}>
                        <td className="px-5 py-3 text-slate-400 text-xs">{i + 1}</td>
                        <td className="px-5 py-3 font-medium">{row.name}</td>
                        <td className="px-5 py-3 text-slate-400 font-mono text-xs">{row.path}</td>
                        <td className="px-5 py-3 text-right tabular-nums">
                          {row.todayCount > 0 ? (
                            <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                              +{row.todayCount}
                            </span>
                          ) : (
                            <span className="text-slate-300">—</span>
                          )}
                        </td>
                        <td className="px-5 py-3 text-right tabular-nums font-semibold">{row.total.toLocaleString()}</td>
                        <td className="px-5 py-3">
                          <div className={`rounded-full h-2 overflow-hidden ${isDark ? "bg-slate-700" : "bg-slate-200"}`}>
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-slate-500 to-slate-400 transition-all"
                              style={{ width: `${(row.total / maxTotal) * 100}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Analytics Links ── */}
          {activeTab === "analytics" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: "Google Analytics",
                  desc: "트래픽, 이벤트, 전환 분석",
                  icon: "📈",
                  url: "https://analytics.google.com",
                  color: "from-orange-400 to-amber-500",
                },
                {
                  name: "Google Search Console",
                  desc: "검색 성능, 색인 상태, Core Web Vitals",
                  icon: "🔍",
                  url: "https://search.google.com/search-console",
                  color: "from-blue-400 to-cyan-500",
                },
                {
                  name: "Google AdSense",
                  desc: "광고 수익, 단가, 노출 현황",
                  icon: "💰",
                  url: "https://adsense.google.com",
                  color: "from-green-400 to-emerald-500",
                },
                {
                  name: "GitHub Repository",
                  desc: "소스코드, 배포 기록, Issues",
                  icon: "🐙",
                  url: "https://github.com/pick-play/pick-play.github.io",
                  color: "from-slate-500 to-slate-700",
                },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group rounded-2xl border ${card} p-6 flex items-start gap-4 hover:shadow-md transition-shadow`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center text-2xl shrink-0`}>
                    {link.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-sm group-hover:underline">{link.name}</div>
                    <div className="text-xs text-slate-400 mt-1">{link.desc}</div>
                    <div className="text-xs text-slate-400 mt-1 truncate font-mono">{link.url}</div>
                  </div>
                  <span className="ml-auto text-slate-300 group-hover:text-slate-500 shrink-0">↗</span>
                </a>
              ))}
            </div>
          )}

          {/* ── Session Info ── */}
          {activeTab === "session" && (
            <div className={`rounded-2xl border ${card} p-6`}>
              <h2 className="font-bold text-base mb-5">실시간 세션 정보</h2>
              <dl className="space-y-4">
                {[
                  {
                    label: "세션 지속 시간",
                    value: (
                      <span className="font-mono text-emerald-500 font-bold">
                        {formatElapsed(elapsed)}
                      </span>
                    ),
                  },
                  {
                    label: "유입 페이지 (Referrer)",
                    value: (
                      <span className="font-mono text-xs break-all">
                        {typeof document !== "undefined" && document.referrer
                          ? document.referrer
                          : "직접 접속 (없음)"}
                      </span>
                    ),
                  },
                  {
                    label: "브라우저 언어",
                    value: (
                      <span className="font-mono text-xs">
                        {typeof navigator !== "undefined" ? navigator.language : "—"}
                      </span>
                    ),
                  },
                  {
                    label: "화면 해상도",
                    value: (
                      <span className="font-mono text-xs">
                        {typeof screen !== "undefined"
                          ? `${screen.width} × ${screen.height} (DPR: ${window.devicePixelRatio ?? 1})`
                          : "—"}
                      </span>
                    ),
                  },
                  {
                    label: "User Agent",
                    value: (
                      <span className="font-mono text-xs break-all leading-relaxed">
                        {typeof navigator !== "undefined" ? navigator.userAgent : "—"}
                      </span>
                    ),
                  },
                ].map((row) => (
                  <div key={row.label} className={`flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 border-b last:border-b-0 ${isDark ? "border-slate-700" : "border-slate-100"}`}>
                    <dt className="text-xs font-semibold text-slate-400 sm:w-44 shrink-0">{row.label}</dt>
                    <dd className="flex-1">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* ── Quick Actions ── */}
          {activeTab === "actions" && (
            <div className="space-y-4">
              <div className={`rounded-2xl border ${card} p-6`}>
                <h2 className="font-bold text-base mb-5">빠른 실행</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={clearData}
                    className="flex items-center gap-3 px-5 py-4 rounded-xl border-2 border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-sm transition-colors"
                  >
                    <span className="text-xl">🗑</span>
                    <div className="text-left">
                      <div>방문 데이터 초기화</div>
                      <div className="text-xs font-normal text-red-400 mt-0.5">localStorage에서 모든 방문 기록 삭제</div>
                    </div>
                  </button>
                  <button
                    onClick={exportData}
                    className="flex items-center gap-3 px-5 py-4 rounded-xl border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-sm transition-colors"
                  >
                    <span className="text-xl">📥</span>
                    <div className="text-left">
                      <div>데이터 JSON 내보내기</div>
                      <div className="text-xs font-normal text-blue-400 mt-0.5">방문 기록을 JSON 파일로 다운로드</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setIsDark((d) => !d)}
                    className={`flex items-center gap-3 px-5 py-4 rounded-xl border-2 font-semibold text-sm transition-colors ${
                      isDark
                        ? "border-yellow-500/30 bg-yellow-900/20 hover:bg-yellow-900/30 text-yellow-400"
                        : "border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <span className="text-xl">{isDark ? "☀️" : "🌙"}</span>
                    <div className="text-left">
                      <div>{isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}</div>
                      <div className={`text-xs font-normal mt-0.5 ${isDark ? "text-yellow-600" : "text-slate-400"}`}>
                        대시보드 테마 변경
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      loadVisits();
                      alert("데이터를 새로고침했습니다.");
                    }}
                    className="flex items-center gap-3 px-5 py-4 rounded-xl border-2 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-sm transition-colors"
                  >
                    <span className="text-xl">🔄</span>
                    <div className="text-left">
                      <div>데이터 새로고침</div>
                      <div className="text-xs font-normal text-emerald-400 mt-0.5">localStorage에서 최신 방문 데이터 로드</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HostPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem(AUTH_KEY) === "1") {
      setAuthed(true);
    }
    setChecking(false);
  }, []);

  if (checking) return null;
  if (!authed) return <LoginGate onSuccess={() => setAuthed(true)} />;
  return <Dashboard />;
}
