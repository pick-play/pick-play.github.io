"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";

type Phase = "setup" | "animating" | "result";

interface SeatAssignment {
  seatIndex: number;
  row: number;
  col: number;
  name: string | null; // null = empty seat
  colorIndex: number;
}

const SEAT_COLORS = [
  { bg: "bg-blue-100 dark:bg-blue-900/40", border: "border-blue-300 dark:border-blue-600", text: "text-blue-800 dark:text-blue-200", dot: "bg-blue-400" },
  { bg: "bg-rose-100 dark:bg-rose-900/40", border: "border-rose-300 dark:border-rose-600", text: "text-rose-800 dark:text-rose-200", dot: "bg-rose-400" },
  { bg: "bg-amber-100 dark:bg-amber-900/40", border: "border-amber-300 dark:border-amber-600", text: "text-amber-800 dark:text-amber-200", dot: "bg-amber-400" },
  { bg: "bg-emerald-100 dark:bg-emerald-900/40", border: "border-emerald-300 dark:border-emerald-600", text: "text-emerald-800 dark:text-emerald-200", dot: "bg-emerald-400" },
  { bg: "bg-violet-100 dark:bg-violet-900/40", border: "border-violet-300 dark:border-violet-600", text: "text-violet-800 dark:text-violet-200", dot: "bg-violet-400" },
  { bg: "bg-orange-100 dark:bg-orange-900/40", border: "border-orange-300 dark:border-orange-600", text: "text-orange-800 dark:text-orange-200", dot: "bg-orange-400" },
  { bg: "bg-teal-100 dark:bg-teal-900/40", border: "border-teal-300 dark:border-teal-600", text: "text-teal-800 dark:text-teal-200", dot: "bg-teal-400" },
  { bg: "bg-indigo-100 dark:bg-indigo-900/40", border: "border-indigo-300 dark:border-indigo-600", text: "text-indigo-800 dark:text-indigo-200", dot: "bg-indigo-400" },
  { bg: "bg-pink-100 dark:bg-pink-900/40", border: "border-pink-300 dark:border-pink-600", text: "text-pink-800 dark:text-pink-200", dot: "bg-pink-400" },
  { bg: "bg-lime-100 dark:bg-lime-900/40", border: "border-lime-300 dark:border-lime-600", text: "text-lime-800 dark:text-lime-200", dot: "bg-lime-400" },
];

const CHIP_COLORS = [
  "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
];

const PRESETS = [
  { label: "교실", rows: 5, cols: 6, emoji: "🏫" },
  { label: "회의실", rows: 3, cols: 4, emoji: "🤝" },
  { label: "모임", rows: 2, cols: 4, emoji: "🎉" },
];

function fisherYatesShuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function assignSeats(names: string[], rows: number, cols: number): SeatAssignment[] {
  const totalSeats = rows * cols;
  const shuffledNames = fisherYatesShuffle(names);
  // Pad with nulls for empty seats
  const padded: (string | null)[] = [
    ...shuffledNames,
    ...Array(totalSeats - shuffledNames.length).fill(null),
  ];
  // Shuffle again so empty seats are distributed randomly
  const shuffledPadded = fisherYatesShuffle(padded);

  return shuffledPadded.map((name, idx) => ({
    seatIndex: idx,
    row: Math.floor(idx / cols),
    col: idx % cols,
    name,
    colorIndex: name !== null ? (shuffledNames.indexOf(name) % SEAT_COLORS.length) : -1,
  }));
}

function ShuffleCard({ name, delay, phase }: { name: string; delay: number; phase: "shuffling" | "settling" }) {
  const [randomVals] = useState(() => ({
    x1: Math.random() * 80 - 40, x2: Math.random() * 50 - 25,
    y1: Math.random() * 50 - 25, y2: Math.random() * 25 - 12,
    r1: Math.random() * 24 - 12, r2: Math.random() * 12 - 6,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={
        phase === "shuffling"
          ? {
              opacity: [0, 1, 1, 1],
              scale: [0.5, 1, 1, 1],
              x: [0, randomVals.x1, randomVals.x2, 0],
              y: [0, randomVals.y1, randomVals.y2, 0],
              rotate: [0, randomVals.r1, randomVals.r2, 0],
              filter: ["blur(0px)", "blur(2px)", "blur(1px)", "blur(0px)"],
            }
          : {
              opacity: [1, 0],
              scale: [1, 1.2, 0],
              y: [0, -20, 60],
            }
      }
      transition={
        phase === "shuffling"
          ? { duration: 0.4, delay, repeat: 3, repeatType: "mirror" as const, ease: "easeInOut" }
          : { duration: 0.4, delay, ease: "backIn" }
      }
      className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 shadow-md text-slate-700 dark:text-slate-200 font-semibold text-xs whitespace-nowrap"
    >
      {name}
    </motion.div>
  );
}

export default function SeatPage() {
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(5);
  const [names, setNames] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [phase, setPhase] = useState<Phase>("setup");
  const [seats, setSeats] = useState<SeatAssignment[]>([]);
  const [animPhase, setAnimPhase] = useState<"shuffling" | "settling">("shuffling");
  const [revealedSeats, setRevealedSeats] = useState<Set<number>>(new Set());
  const [copySuccess, setCopySuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const totalSeats = rows * cols;
  const canStart = names.length >= 1 && names.length <= totalSeats;

  const addNames = useCallback(() => {
    const raw = inputValue.trim();
    if (!raw) return;
    const newNames = raw
      .split(/[,，、\n]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !names.includes(s));
    if (newNames.length > 0) {
      setNames((prev) => [...prev, ...newNames]);
    }
    setInputValue("");
    inputRef.current?.focus();
  }, [inputValue, names]);

  const removeName = useCallback((idx: number) => {
    setNames((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNames();
    }
  };

  const applyPreset = (preset: typeof PRESETS[number]) => {
    setRows(preset.rows);
    setCols(preset.cols);
  };

  const startArrangement = useCallback(() => {
    if (!canStart) return;
    const result = assignSeats(names, rows, cols);
    setSeats(result);
    setRevealedSeats(new Set());
    setPhase("animating");
    setAnimPhase("shuffling");

    // Phase 1: shuffle for 1.8s, Phase 2: reveal seats one by one
    setTimeout(() => {
      setAnimPhase("settling");
      const totalWithNames = result.filter((s) => s.name !== null).length;
      const revealDelay = Math.min(120, 600 / totalWithNames);

      result.forEach((seat, idx) => {
        setTimeout(() => {
          setRevealedSeats((prev) => new Set(Array.from(prev).concat(seat.seatIndex)));
        }, idx * revealDelay + 300);
      });

      const totalDuration = result.length * revealDelay + 1200;
      setTimeout(() => {
        setPhase("result");
      }, totalDuration);
    }, 1800);
  }, [names, rows, cols, canStart]);

  const reshuffle = useCallback(() => {
    if (names.length < 1) return;
    const result = assignSeats(names, rows, cols);
    setSeats(result);
    setRevealedSeats(new Set());
    setPhase("animating");
    setAnimPhase("shuffling");

    setTimeout(() => {
      setAnimPhase("settling");
      const revealDelay = Math.min(120, 600 / result.length);
      result.forEach((seat, idx) => {
        setTimeout(() => {
          setRevealedSeats((prev) => new Set(Array.from(prev).concat(seat.seatIndex)));
        }, idx * revealDelay + 300);
      });
      const totalDuration = result.length * revealDelay + 1200;
      setTimeout(() => {
        setPhase("result");
      }, totalDuration);
    }, 1800);
  }, [names, rows, cols]);

  const resetAll = () => {
    setNames([]);
    setInputValue("");
    setRows(4);
    setCols(5);
    setSeats([]);
    setRevealedSeats(new Set());
    setPhase("setup");
    setCopySuccess(false);
  };

  const copyResult = useCallback(async () => {
    const lines: string[] = ["[랜덤 자리 배치 결과]", ""];
    lines.push("  [칠판 / 화이트보드]");
    lines.push("  " + "─".repeat(cols * 6));
    for (let r = 0; r < rows; r++) {
      const rowSeats = seats.filter((s) => s.row === r).sort((a, b) => a.col - b.col);
      const rowStr = rowSeats
        .map((s) => {
          const label = s.name ?? "빈자리";
          return label.padEnd(5).slice(0, 5);
        })
        .join(" | ");
      lines.push(`${r + 1}행 | ${rowStr}`);
    }
    lines.push("", "PickPlay에서 생성 - https://pick-play.github.io/seat");
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      // fallback: do nothing
    }
  }, [seats, rows, cols]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg mb-4">
              <span className="text-3xl">💺</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
              랜덤 자리 배치
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              공정하고 투명한 좌석 배정 프로그램
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* ─── Setup Phase ─── */}
            {phase === "setup" && (
              <motion.div
                key="setup"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {/* Preset buttons */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5">
                  <h2 className="text-base font-semibold text-slate-700 dark:text-slate-200 mb-3">
                    빠른 설정
                  </h2>
                  <div className="flex gap-2 flex-wrap">
                    {PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => applyPreset(preset)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium hover:border-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 dark:hover:border-cyan-500 transition-all active:scale-95"
                      >
                        <span>{preset.emoji}</span>
                        <span>{preset.label}</span>
                        <span className="text-slate-400 dark:text-slate-500 text-xs">
                          ({preset.rows}×{preset.cols})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid size settings */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5">
                  <h2 className="text-base font-semibold text-slate-700 dark:text-slate-200 mb-4">
                    격자 크기 설정
                  </h2>
                  <div className="grid grid-cols-2 gap-6">
                    {/* Rows */}
                    <div className="text-center">
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">행 (가로줄)</p>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => setRows((n) => Math.max(2, n - 1))}
                          disabled={rows <= 2}
                          className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-lg disabled:opacity-30 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors active:scale-95"
                        >
                          −
                        </button>
                        <span className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent w-8 text-center">
                          {rows}
                        </span>
                        <button
                          onClick={() => setRows((n) => Math.min(8, n + 1))}
                          disabled={rows >= 8}
                          className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-lg disabled:opacity-30 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors active:scale-95"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {/* Cols */}
                    <div className="text-center">
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">열 (세로줄)</p>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => setCols((n) => Math.max(2, n - 1))}
                          disabled={cols <= 2}
                          className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-lg disabled:opacity-30 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors active:scale-95"
                        >
                          −
                        </button>
                        <span className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent w-8 text-center">
                          {cols}
                        </span>
                        <button
                          onClick={() => setCols((n) => Math.min(8, n + 1))}
                          disabled={cols >= 8}
                          className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-lg disabled:opacity-30 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors active:scale-95"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-4">
                    총 <span className="font-semibold text-cyan-600 dark:text-cyan-400">{totalSeats}</span>개 자리
                  </p>
                </div>

                {/* Name input */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5">
                  <h2 className="text-base font-semibold text-slate-700 dark:text-slate-200 mb-3">
                    참가자 입력
                  </h2>
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="이름 입력 (쉼표로 여러 명 한번에)"
                      className="flex-1 min-h-[48px] px-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
                    />
                    <button
                      onClick={addNames}
                      className="min-h-[48px] px-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-sm hover:from-cyan-600 hover:to-blue-600 transition-all active:scale-95 shadow-sm"
                    >
                      추가
                    </button>
                  </div>

                  {/* Name chips */}
                  <AnimatePresence>
                    {names.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 flex flex-wrap gap-2"
                      >
                        {names.map((name, idx) => (
                          <motion.span
                            key={`${name}-${idx}`}
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${CHIP_COLORS[idx % CHIP_COLORS.length]}`}
                          >
                            {name}
                            <button
                              onClick={() => removeName(idx)}
                              className="ml-0.5 w-4 h-4 rounded-full flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                              aria-label={`${name} 제거`}
                            >
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </motion.span>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {names.length > 0 && (
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xs text-slate-400">
                        {names.length}명 추가됨
                        {names.length < totalSeats && (
                          <span className="ml-1 text-slate-300 dark:text-slate-500">
                            (빈자리 {totalSeats - names.length}개)
                          </span>
                        )}
                      </p>
                      {names.length > totalSeats && (
                        <p className="text-xs text-rose-500 font-medium">
                          자리 수({totalSeats})보다 많습니다
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Ad: before start */}
                <AdBanner format="horizontal" className="rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

                {/* Start button */}
                <motion.button
                  onClick={startArrangement}
                  disabled={!canStart}
                  whileHover={canStart ? { scale: 1.02 } : {}}
                  whileTap={canStart ? { scale: 0.97 } : {}}
                  className="w-full min-h-[56px] rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg shadow-lg hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {names.length === 0
                    ? "참가자를 1명 이상 추가하세요"
                    : names.length > totalSeats
                    ? `참가자가 자리 수(${totalSeats})보다 많습니다`
                    : "💺 자리 배치 시작!"}
                </motion.button>
              </motion.div>
            )}

            {/* ─── Animation Phase ─── */}
            {phase === "animating" && (
              <motion.div
                key="animating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-[400px] flex flex-col items-center justify-center"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 w-full text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg"
                  >
                    <span className="text-3xl">💺</span>
                  </motion.div>

                  <motion.h2
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-xl font-bold text-slate-800 dark:text-white mb-6"
                  >
                    {animPhase === "shuffling" ? "자리를 섞는 중..." : "배치 중..."}
                  </motion.h2>

                  <div className="flex flex-wrap gap-2 justify-center max-w-md mx-auto">
                    {names.map((name, idx) => (
                      <ShuffleCard
                        key={`${name}-${idx}`}
                        name={name}
                        delay={idx * 0.04}
                        phase={animPhase}
                      />
                    ))}
                  </div>

                  {animPhase === "settling" && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 text-sm text-slate-400"
                    >
                      자리를 배치하고 있어요...
                    </motion.p>
                  )}
                </div>
              </motion.div>
            )}

            {/* ─── Result Phase ─── */}
            {phase === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-5"
              >
                {/* Result header */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="text-center py-2"
                >
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-5xl mb-3"
                  >
                    🎉
                  </motion.div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                    자리 배치 완료!
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    {rows}행 × {cols}열 &nbsp;|&nbsp; {names.length}명 배정 &nbsp;
                    {totalSeats - names.length > 0 && (
                      <span>/ 빈자리 {totalSeats - names.length}개</span>
                    )}
                  </p>
                </motion.div>

                {/* Grid */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6 overflow-x-auto">
                  {/* Chalkboard indicator */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4 flex items-center justify-center"
                  >
                    <div className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 text-white font-bold text-sm shadow-inner w-full max-w-sm justify-center">
                      <span>📋</span>
                      <span>칠판 / 화이트보드</span>
                    </div>
                  </motion.div>

                  {/* Seat grid */}
                  <div
                    className="grid gap-2"
                    style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
                  >
                    {seats.map((seat) => {
                      const color = seat.name !== null ? SEAT_COLORS[seat.colorIndex] : null;
                      return (
                        <motion.div
                          key={seat.seatIndex}
                          initial={{ opacity: 0, scale: 0.5, y: 20 }}
                          animate={
                            revealedSeats.has(seat.seatIndex)
                              ? { opacity: 1, scale: 1, y: 0 }
                              : { opacity: 0, scale: 0.5, y: 20 }
                          }
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 22,
                          }}
                          className={`
                            relative rounded-xl border-2 p-2 text-center
                            ${seat.name !== null
                              ? `${color!.bg} ${color!.border}`
                              : "bg-slate-50 dark:bg-slate-700/30 border-slate-200 dark:border-slate-700 border-dashed"
                            }
                          `}
                        >
                          {seat.name !== null ? (
                            <>
                              <div className={`text-[10px] font-medium mb-1 ${color!.text} opacity-70`}>
                                {seat.row + 1}행 {seat.col + 1}열
                              </div>
                              <div className={`font-bold text-xs sm:text-sm leading-tight truncate ${color!.text}`}>
                                {seat.name}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="text-[10px] font-medium mb-1 text-slate-400 dark:text-slate-500">
                                {seat.row + 1}행 {seat.col + 1}열
                              </div>
                              <div className="text-xs text-slate-300 dark:text-slate-600 font-medium">
                                빈자리
                              </div>
                            </>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Ad: after grid */}
                <AdBanner format="rectangle" className="rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-3 gap-3"
                >
                  <button
                    onClick={copyResult}
                    className={`min-h-[48px] rounded-xl font-semibold text-sm transition-all active:scale-95 border ${
                      copySuccess
                        ? "bg-emerald-500 text-white border-emerald-500"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
                    }`}
                  >
                    {copySuccess ? "복사됨!" : "결과 복사"}
                  </button>
                  <button
                    onClick={reshuffle}
                    className="min-h-[48px] rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-sm hover:from-cyan-600 hover:to-blue-600 transition-all active:scale-95 shadow-sm"
                  >
                    다시 배치
                  </button>
                  <button
                    onClick={resetAll}
                    className="min-h-[48px] rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-all active:scale-95"
                  >
                    처음부터
                  </button>
                </motion.div>

                {/* Ad: bottom in-article */}
                <AdBanner format="in-article" className="rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

                {/* FAQ Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 space-y-4"
                >
                  <h2 className="text-base font-semibold text-slate-700 dark:text-slate-200">
                    자주 묻는 질문
                  </h2>
                  <div className="space-y-3">
                    {[
                      {
                        q: "자리 배치는 정말 랜덤인가요?",
                        a: "네! Fisher-Yates 셔플 알고리즘을 사용해 모든 배치 조합이 동일한 확률로 나타납니다. 수학적으로 편향 없이 완전히 공정한 랜덤 배치입니다.",
                      },
                      {
                        q: "빈자리는 어떻게 처리되나요?",
                        a: "참가자 수보다 자리가 많은 경우 나머지 자리는 자동으로 빈자리로 처리됩니다. 빈자리도 랜덤으로 배치되어 특정 위치에 몰리지 않습니다.",
                      },
                      {
                        q: "결과를 어떻게 공유하나요?",
                        a: "'결과 복사' 버튼을 누르면 칠판 기준 자리 배치도가 텍스트 형식으로 복사됩니다. 카카오톡, 슬랙 등 메신저에 바로 붙여넣어 공유하세요.",
                      },
                    ].map((faq, i) => (
                      <div key={i} className="rounded-xl bg-slate-50 dark:bg-slate-700/40 p-4">
                        <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm mb-1">
                          Q. {faq.q}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
