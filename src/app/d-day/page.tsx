"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";

type DayEvent = {
  id: number;
  title: string;
  emoji: string;
  targetDate: string;
};

type DayInfo = {
  diff: number;
  label: string;
  weeks: number;
  hours: number;
  minutes: number;
  isToday: boolean;
  isPast: boolean;
};

function calcDayInfo(targetDate: string): DayInfo {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  const diffMs = target.getTime() - today.getTime();
  const diff = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const isToday = diff === 0;
  const isPast = diff < 0;

  let label: string;
  if (isToday) {
    label = "D-Day";
  } else if (isPast) {
    label = `D+${Math.abs(diff)}`;
  } else {
    label = `D-${diff}`;
  }

  const absDiffMs = Math.abs(diffMs);
  const weeks = Math.floor(Math.abs(diff) / 7);
  const hours = Math.floor(absDiffMs / (1000 * 60 * 60));
  const minutes = Math.floor(absDiffMs / (1000 * 60));

  return { diff, label, weeks, hours, minutes, isToday, isPast };
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
}

function getTodayString(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getDateString(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getNextMonthDay(month: number, day: number): string {
  const today = new Date();
  const year = today.getFullYear();
  const candidate = new Date(year, month - 1, day);
  if (candidate < today) {
    candidate.setFullYear(year + 1);
  }
  const yyyy = candidate.getFullYear();
  const mm = String(candidate.getMonth() + 1).padStart(2, "0");
  const dd = String(candidate.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getNextChuseok(): string {
  // Approximate Chuseok dates (lunar 8/15) - use fixed upcoming dates
  const today = new Date();
  const year = today.getFullYear();
  // Approximate Chuseok: 2025-10-06, 2026-09-25
  const dates: Record<number, string> = {
    2025: "2025-10-06",
    2026: "2026-09-25",
    2027: "2027-09-15",
  };
  const candidate = dates[year] ? new Date(dates[year]) : new Date(year, 9, 1);
  if (candidate < today && dates[year + 1]) {
    return dates[year + 1];
  }
  return dates[year] ?? `${year}-10-01`;
}

function getNextSeollal(): string {
  const today = new Date();
  const year = today.getFullYear();
  const dates: Record<number, string> = {
    2025: "2025-01-29",
    2026: "2026-02-17",
    2027: "2027-02-06",
  };
  const candidate = dates[year] ? new Date(dates[year]) : new Date(year, 0, 28);
  if (candidate < today && dates[year + 1]) {
    return dates[year + 1];
  }
  return dates[year] ?? `${year}-01-28`;
}

// Approximate CSAT (수능) date: third Thursday of November
function getSuneungDate(): string {
  const today = new Date();
  let year = today.getFullYear();
  function thirdThursdayOfNov(y: number): Date {
    const nov1 = new Date(y, 10, 1);
    const day = nov1.getDay(); // 0=Sun
    const thurOffset = (4 - day + 7) % 7;
    return new Date(y, 10, 1 + thurOffset + 14);
  }
  let d = thirdThursdayOfNov(year);
  if (d < today) {
    year += 1;
    d = thirdThursdayOfNov(year);
  }
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

type Preset = {
  label: string;
  emoji: string;
  title: string;
  getDate: () => string;
};

const PRESETS: Preset[] = [
  {
    label: "수능",
    emoji: "📝",
    title: "수능",
    getDate: getSuneungDate,
  },
  {
    label: "크리스마스",
    emoji: "🎄",
    title: "크리스마스",
    getDate: () => getNextMonthDay(12, 25),
  },
  {
    label: "새해",
    emoji: "🎆",
    title: "새해 첫날",
    getDate: () => {
      const next = new Date();
      next.setFullYear(next.getFullYear() + 1, 0, 1);
      return `${next.getFullYear()}-01-01`;
    },
  },
  {
    label: "설날",
    emoji: "🌙",
    title: "설날",
    getDate: getNextSeollal,
  },
  {
    label: "추석",
    emoji: "🎑",
    title: "추석",
    getDate: getNextChuseok,
  },
  {
    label: "생일",
    emoji: "🎂",
    title: "내 생일",
    getDate: () => getDateString(30),
  },
];

const CARD_GRADIENTS = [
  "from-sky-400 to-blue-500",
  "from-emerald-400 to-teal-500",
  "from-violet-400 to-purple-500",
  "from-rose-400 to-pink-500",
  "from-amber-400 to-orange-500",
  "from-cyan-400 to-sky-500",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

let nextId = 1;

export default function DdayPage() {
  const [events, setEvents] = useState<DayEvent[]>([]);
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("📅");
  const [targetDate, setTargetDate] = useState("");
  const [copied, setCopied] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(true);

  const addEvent = useCallback(() => {
    if (!title.trim() || !targetDate) return;
    setEvents((prev) => [
      ...prev,
      { id: nextId++, title: title.trim(), emoji, targetDate },
    ]);
    setTitle("");
    setEmoji("📅");
    setTargetDate("");
    setShowForm(false);
  }, [title, emoji, targetDate]);

  const removeEvent = useCallback((id: number) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const applyPreset = useCallback((preset: Preset) => {
    setTitle(preset.title);
    setEmoji(preset.emoji);
    setTargetDate(preset.getDate());
    setShowForm(true);
  }, []);

  const handleCopy = useCallback(
    (event: DayEvent) => {
      const info = calcDayInfo(event.targetDate);
      const text = [
        `${event.emoji} ${event.title}`,
        `날짜: ${formatDate(event.targetDate)}`,
        `디데이: ${info.label}`,
        info.isToday
          ? "오늘이 바로 그날입니다!"
          : info.isPast
          ? `${Math.abs(info.diff)}일이 지났습니다`
          : `${info.diff}일 남았습니다 (${info.weeks}주 ${info.diff % 7}일)`,
      ].join("\n");
      navigator.clipboard.writeText(text);
      setCopied(event.id);
      setTimeout(() => setCopied(null), 2000);
    },
    []
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/30 to-emerald-50/20 dark:from-slate-950 dark:via-sky-950/20 dark:to-emerald-950/10">
        <div className="max-w-2xl mx-auto px-4 py-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
              <span className="bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent">
                D-Day
              </span>{" "}
              계산기
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              중요한 날까지 남은 시간을 한눈에 확인하세요
            </p>
          </motion.div>

          {/* Ad - top */}
          <AdBanner
            format="horizontal"
            className="mb-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
          />

          {/* Preset buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-4"
          >
            <h2 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
              빠른 추가
            </h2>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => applyPreset(preset)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-sky-900/40 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
                >
                  <span>{preset.emoji}</span>
                  <span>{preset.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Add form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                key="form"
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-4">
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                    이벤트 추가
                  </h2>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={emoji}
                        onChange={(e) => setEmoji(e.target.value)}
                        placeholder="😊"
                        maxLength={2}
                        className="w-14 text-center px-2 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
                      />
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="이벤트 이름 (예: 내 생일)"
                        className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder-slate-400"
                      />
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={targetDate}
                        min="2000-01-01"
                        max="2099-12-31"
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
                      />
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => setShowForm(false)}
                        className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        취소
                      </button>
                      <button
                        onClick={addEvent}
                        disabled={!title.trim() || !targetDate}
                        className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-sky-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        추가하기
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add button (when form hidden) */}
          {!showForm && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setShowForm(true)}
              className="w-full py-3 mb-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 font-medium hover:border-sky-400 hover:text-sky-500 transition-colors"
            >
              + 새 D-Day 추가
            </motion.button>
          )}

          {/* Ad - between sections */}
          {events.length > 0 && (
            <AdBanner
              format="in-article"
              className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
            />
          )}

          {/* Event cards */}
          <AnimatePresence>
            {events.length === 0 && !showForm && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 text-slate-400 dark:text-slate-500"
              >
                <div className="text-5xl mb-4">📅</div>
                <p className="font-medium">아직 추가된 D-Day가 없어요</p>
                <p className="text-sm mt-1">위에서 프리셋을 선택하거나 직접 추가해보세요</p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <AnimatePresence>
              {events.map((event, idx) => {
                const info = calcDayInfo(event.targetDate);
                const gradient = CARD_GRADIENTS[idx % CARD_GRADIENTS.length];
                const isCopied = copied === event.id;

                return (
                  <motion.div
                    key={event.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.92, y: -10, transition: { duration: 0.2 } }}
                    layout
                  >
                    <div
                      className={`relative rounded-2xl overflow-hidden shadow-md border ${
                        info.isToday
                          ? "border-amber-300 dark:border-amber-500"
                          : info.isPast
                          ? "border-slate-300 dark:border-slate-600"
                          : "border-sky-200 dark:border-sky-800"
                      }`}
                    >
                      {/* Gradient top bar */}
                      <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />

                      <div
                        className={`p-5 ${
                          info.isToday
                            ? "bg-amber-50 dark:bg-amber-950/30"
                            : info.isPast
                            ? "bg-slate-50 dark:bg-slate-800/80"
                            : "bg-white dark:bg-slate-800"
                        }`}
                      >
                        {/* Card header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{event.emoji}</span>
                            <div>
                              <h3 className="font-bold text-slate-800 dark:text-slate-100 leading-tight">
                                {event.title}
                              </h3>
                              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                                {formatDate(event.targetDate)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleCopy(event)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/30 transition-colors"
                              title="결과 복사"
                            >
                              {isCopied ? (
                                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              )}
                            </button>
                            <button
                              onClick={() => removeEvent(event.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors"
                              title="삭제"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* D-Day label */}
                        <div className="flex items-end justify-between">
                          <motion.div
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                          >
                            <div
                              className={`text-5xl font-extrabold leading-none ${
                                info.isToday
                                  ? "bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"
                                  : info.isPast
                                  ? "text-slate-400 dark:text-slate-500"
                                  : `bg-gradient-to-r ${gradient} bg-clip-text text-transparent`
                              }`}
                            >
                              {info.label}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                              {info.isToday
                                ? "오늘이 바로 그날! 🎉"
                                : info.isPast
                                ? `${Math.abs(info.diff)}일 지남`
                                : `${info.diff}일 남음`}
                            </div>
                          </motion.div>

                          {/* Stats grid */}
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="bg-slate-100/70 dark:bg-slate-700/50 rounded-xl px-3 py-2">
                              <div className="text-xs text-slate-400 dark:text-slate-500 mb-0.5">주</div>
                              <div className="font-bold text-slate-700 dark:text-slate-200 text-sm">
                                {info.weeks}
                              </div>
                            </div>
                            <div className="bg-slate-100/70 dark:bg-slate-700/50 rounded-xl px-3 py-2">
                              <div className="text-xs text-slate-400 dark:text-slate-500 mb-0.5">시간</div>
                              <div className="font-bold text-slate-700 dark:text-slate-200 text-sm">
                                {info.hours > 9999 ? "999+" : info.hours}
                              </div>
                            </div>
                            <div className="bg-slate-100/70 dark:bg-slate-700/50 rounded-xl px-3 py-2">
                              <div className="text-xs text-slate-400 dark:text-slate-500 mb-0.5">분</div>
                              <div className="font-bold text-slate-700 dark:text-slate-200 text-sm">
                                {info.minutes > 99999 ? "99K+" : info.minutes > 9999 ? `${Math.floor(info.minutes / 1000)}K+` : info.minutes}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Progress hint for upcoming */}
                        {!info.isPast && !info.isToday && (
                          <div className="mt-4">
                            <div className="text-xs text-slate-400 dark:text-slate-500 mb-1.5 flex justify-between">
                              <span>오늘</span>
                              <span>{event.title}</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                              <motion.div
                                className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${Math.max(2, Math.min(98, 100 - (info.diff / Math.max(info.diff, 365)) * 100))}%`,
                                }}
                                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Today badge */}
          {events.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500"
            >
              기준일: {formatDate(getTodayString())}
            </motion.div>
          )}

          {/* Ad - bottom */}
          <AdBanner
            format="rectangle"
            className="mt-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
          />

          {/* FAQ Section */}
          <section className="mt-16 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">자주 묻는 질문</h2>
            <div className="space-y-4">
              <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-sky-500 transition-colors">
                  D-Day는 어떻게 계산하나요?
                  <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-slate-500 dark:text-slate-400 leading-relaxed">
                  목표 날짜에서 오늘 날짜를 빼면 됩니다. 예를 들어 목표일이 30일 후라면 D-30, 오늘이라면 D-Day, 이미 지난 날짜라면 D+1, D+2... 로 표시됩니다. PickPlay D-Day 계산기는 날짜를 입력하면 자동으로 계산해 드립니다.
                </p>
              </details>

              <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-sky-500 transition-colors">
                  여러 개의 D-Day를 동시에 관리할 수 있나요?
                  <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-slate-500 dark:text-slate-400 leading-relaxed">
                  네, 여러 개의 D-Day 이벤트를 동시에 추가하고 관리할 수 있습니다. 수능, 생일, 기념일 등 원하는 만큼 추가하세요. 수능·크리스마스·새해·설날·추석·생일 프리셋 버튼으로 빠르게 추가할 수도 있습니다.
                </p>
              </details>

              <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-sky-500 transition-colors">
                  D-Day 결과를 공유할 수 있나요?
                  <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-slate-500 dark:text-slate-400 leading-relaxed">
                  네, 각 D-Day 카드 오른쪽 상단의 복사 버튼을 누르면 결과 텍스트가 클립보드에 복사됩니다. 이름, 날짜, 디데이 카운트를 포함한 텍스트가 복사되므로 카카오톡이나 SNS에 바로 붙여넣기할 수 있습니다.
                </p>
              </details>
            </div>
          </section>

        </div>
      </div>
    </PageTransition>
  );
}
