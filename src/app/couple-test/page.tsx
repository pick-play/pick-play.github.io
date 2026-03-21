"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import testData from "@/data/couple-test.json";

type Phase = "input" | "analyzing" | "result";

interface CategoryScore {
  name: string;
  icon: string;
  score: number;
  description: string;
}

interface Result {
  name1: string;
  name2: string;
  overall: number;
  title: string;
  emoji: string;
  desc: string;
  categories: CategoryScore[];
  advice: string;
}

// Deterministic hash from two names — same input always yields same output
function hashNames(a: string, b: string): number {
  const combined = (a + "❤" + b).split("").reduce((acc, ch) => {
    return ((acc << 5) - acc + ch.charCodeAt(0)) | 0;
  }, 0);
  return Math.abs(combined);
}

function seededRand(seed: number, index: number): number {
  const s = ((seed ^ (index * 2654435761)) >>> 0) * 1234567891;
  return ((s ^ (s >>> 16)) >>> 0) / 0xffffffff;
}

function calcScore(seed: number, index: number): number {
  return Math.floor(seededRand(seed, index) * 60) + 40; // 40–99
}

function getTitleData(score: number) {
  const thresholds = [90, 80, 70, 60, 50, 40, 0] as const;
  for (const t of thresholds) {
    if (score >= t) {
      return testData.titles[String(t) as keyof typeof testData.titles];
    }
  }
  return testData.titles["0"];
}

function getCategoryDesc(
  catKey: keyof typeof testData.categories,
  score: number,
  seed: number,
  descIndex: number
): string {
  const cat = testData.categories[catKey];
  const level = score >= 75 ? "high" : score >= 55 ? "medium" : "low";
  const descs = cat.descriptions[level];
  return descs[descIndex % descs.length];
}

function getAdvice(overall: number, seed: number): string {
  const level = overall >= 75 ? "high" : overall >= 55 ? "medium" : "low";
  const advices = testData.advice[level];
  return advices[seed % advices.length];
}

function computeResult(name1: string, name2: string): Result {
  const seed = hashNames(name1.trim(), name2.trim());
  const categoryKeys = Object.keys(
    testData.categories
  ) as (keyof typeof testData.categories)[];

  const categories: CategoryScore[] = categoryKeys.map((key, i) => {
    const score = calcScore(seed, i + 1);
    const cat = testData.categories[key];
    const desc = getCategoryDesc(key, score, seed, (seed >> (i * 3)) % 5);
    return { name: key + " 궁합", icon: cat.icon, score, description: desc };
  });

  const weights = [0.25, 0.25, 0.2, 0.15, 0.15];
  const overall = Math.round(
    categories.reduce((sum, c, i) => sum + c.score * weights[i], 0)
  );

  const titleData = getTitleData(overall);
  const advice = getAdvice(overall, seed % testData.advice.high.length);

  return {
    name1: name1.trim(),
    name2: name2.trim(),
    overall,
    title: titleData.title,
    emoji: titleData.emoji,
    desc: titleData.desc,
    categories,
    advice,
  };
}

// Animated counter hook
function useCountUp(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, active, duration]);

  return value;
}

// Floating particle component
function FloatingHeart({
  delay,
  x,
  emoji,
}: {
  delay: number;
  x: number;
  emoji: string;
}) {
  return (
    <motion.div
      className="absolute text-2xl pointer-events-none select-none"
      style={{ left: `${x}%`, bottom: "10%" }}
      initial={{ y: 0, opacity: 0, scale: 0.5 }}
      animate={{
        y: [0, -120, -200],
        opacity: [0, 1, 0],
        scale: [0.5, 1.2, 0.8],
        rotate: [0, 15, -15, 0],
      }}
      transition={{
        duration: 2.2,
        delay,
        ease: "easeOut",
        repeat: Infinity,
        repeatDelay: 1.5,
      }}
    >
      {emoji}
    </motion.div>
  );
}

export default function CoupleTestPage() {
  const [phase, setPhase] = useState<Phase>("input");
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [analyzeProgress, setAnalyzeProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const counterValue = useCountUp(result?.overall ?? 0, showResult, 1400);

  const handleAnalyze = useCallback(() => {
    if (!name1.trim() || !name2.trim()) return;
    const computed = computeResult(name1, name2);
    setResult(computed);
    setAnalyzeProgress(0);
    setShowResult(false);
    setPhase("analyzing");
  }, [name1, name2]);

  // Drive the progress bar and then flip to result
  useEffect(() => {
    if (phase !== "analyzing") return;

    let raf: number;
    const start = performance.now();
    const duration = 2600;

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setAnalyzeProgress(Math.round(p));
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setPhase("result");
          setTimeout(() => setShowResult(true), 200);
        }, 300);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const handleRestart = useCallback(() => {
    setPhase("input");
    setName1("");
    setName2("");
    setResult(null);
    setAnalyzeProgress(0);
    setShowResult(false);
    setCopied(false);
  }, []);

  const handleShare = useCallback(() => {
    if (!result) return;
    const text = `[커플 궁합 테스트 결과]\n${result.name1} ❤ ${result.name2}\n\n${result.emoji} ${result.title} - ${result.overall}%\n\n${result.desc}\n\n궁합 테스트 해보기: https://pick-play.github.io/couple-test`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [result]);

  const canSubmit = name1.trim().length > 0 && name2.trim().length > 0;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50/30 to-rose-50/20 dark:from-slate-950 dark:via-pink-950/20 dark:to-rose-950/10">
        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-2">
              커플 궁합 테스트
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              이름으로 알아보는 우리의 궁합 💕
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* ── INPUT PHASE ── */}
            {phase === "input" && (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* Name inputs */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="space-y-4">
                    {/* Name 1 */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                        첫 번째 이름
                      </label>
                      <input
                        type="text"
                        value={name1}
                        onChange={(e) => setName1(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && canSubmit) handleAnalyze();
                        }}
                        placeholder="이름을 입력하세요"
                        maxLength={20}
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-pink-400 dark:focus:border-pink-500 transition-colors text-base font-medium"
                      />
                    </div>

                    {/* Heart divider */}
                    <div className="flex items-center justify-center gap-3 py-1">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-pink-200 dark:to-pink-800" />
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          rotate: [0, -10, 10, 0],
                        }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="text-2xl"
                      >
                        💕
                      </motion.div>
                      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-pink-200 dark:to-pink-800" />
                    </div>

                    {/* Name 2 */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                        두 번째 이름
                      </label>
                      <input
                        type="text"
                        value={name2}
                        onChange={(e) => setName2(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && canSubmit) handleAnalyze();
                        }}
                        placeholder="이름을 입력하세요"
                        maxLength={20}
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-rose-400 dark:focus:border-rose-500 transition-colors text-base font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <motion.button
                  whileHover={canSubmit ? { scale: 1.02, y: -1 } : {}}
                  whileTap={canSubmit ? { scale: 0.97 } : {}}
                  onClick={handleAnalyze}
                  disabled={!canSubmit}
                  className={`w-full py-4 rounded-2xl font-bold text-base transition-all shadow-md ${
                    canSubmit
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-pink-500/40 hover:shadow-lg cursor-pointer"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                  }`}
                >
                  💕 궁합 분석하기
                </motion.button>

                {/* Ad below input */}
                <AdBanner
                  format="horizontal"
                  className="rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
                />

                {/* Info card */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3 flex items-center gap-2">
                    <span>✨</span> 분석 항목
                  </h2>
                  <div className="grid grid-cols-5 gap-2">
                    {Object.entries(testData.categories).map(([key, cat]) => (
                      <div
                        key={key}
                        className="flex flex-col items-center gap-1 p-2 rounded-xl bg-pink-50 dark:bg-pink-950/30"
                      >
                        <span className="text-xl">{cat.icon}</span>
                        <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                          {key}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 text-center leading-relaxed">
                    같은 이름을 입력하면 항상 같은 결과가 나와요 😊
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* ── ANALYZING PHASE ── */}
            {phase === "analyzing" && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="relative"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-slate-200 dark:border-slate-700 shadow-sm text-center relative overflow-hidden min-h-[360px] flex flex-col items-center justify-center gap-6">
                  {/* Floating particles */}
                  <FloatingHeart delay={0} x={15} emoji="💕" />
                  <FloatingHeart delay={0.5} x={35} emoji="✨" />
                  <FloatingHeart delay={0.9} x={60} emoji="💖" />
                  <FloatingHeart delay={0.3} x={80} emoji="⭐" />
                  <FloatingHeart delay={1.2} x={50} emoji="💝" />
                  <FloatingHeart delay={0.7} x={25} emoji="🌟" />

                  {/* Pulsing heart */}
                  <motion.div
                    animate={{
                      scale: [1, 1.25, 1],
                      filter: [
                        "drop-shadow(0 0 0px #f43f5e)",
                        "drop-shadow(0 0 16px #f43f5e)",
                        "drop-shadow(0 0 0px #f43f5e)",
                      ],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-7xl"
                  >
                    💗
                  </motion.div>

                  {/* Names display */}
                  <div className="flex items-center gap-3 text-lg font-bold text-slate-700 dark:text-slate-200">
                    <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/40 rounded-full text-pink-600 dark:text-pink-300">
                      {name1}
                    </span>
                    <motion.span
                      animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="text-xl"
                    >
                      ❤
                    </motion.span>
                    <span className="px-3 py-1 bg-rose-100 dark:bg-rose-900/40 rounded-full text-rose-600 dark:text-rose-300">
                      {name2}
                    </span>
                  </div>

                  {/* Status text */}
                  <div className="space-y-1">
                    <motion.p
                      key={Math.floor(analyzeProgress / 34)}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-base font-semibold text-slate-700 dark:text-slate-200"
                    >
                      {analyzeProgress < 34
                        ? "이름을 분석하는 중..."
                        : analyzeProgress < 67
                        ? "궁합을 계산하는 중..."
                        : "결과를 준비하는 중..."}
                    </motion.p>
                    <p className="text-sm text-pink-500 dark:text-pink-400 font-medium">
                      궁합 분석 중... {analyzeProgress}%
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full max-w-xs">
                    <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full"
                        style={{ width: `${analyzeProgress}%` }}
                        transition={{ ease: "linear" }}
                      />
                    </div>
                  </div>

                  {/* Category dots */}
                  <div className="flex gap-3">
                    {Object.entries(testData.categories).map(
                      ([key, cat], i) => (
                        <motion.div
                          key={key}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={
                            analyzeProgress >= (i + 1) * 18
                              ? { scale: 1, opacity: 1 }
                              : {}
                          }
                          transition={{ type: "spring", stiffness: 200 }}
                          className="flex flex-col items-center gap-1"
                        >
                          <span className="text-xl">{cat.icon}</span>
                          <span className="text-xs text-slate-400 dark:text-slate-500">
                            {key}
                          </span>
                        </motion.div>
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── RESULT PHASE ── */}
            {phase === "result" && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                {/* Hero result card */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
                  className="rounded-2xl p-8 bg-gradient-to-br from-pink-500 to-rose-500 text-white text-center shadow-lg relative overflow-hidden"
                >
                  {/* Background decoration */}
                  <div className="absolute inset-0 opacity-10">
                    {["💕", "✨", "💖"].map((e, i) => (
                      <span
                        key={i}
                        className="absolute text-4xl"
                        style={{
                          top: `${20 + i * 25}%`,
                          left: `${10 + i * 35}%`,
                          transform: `rotate(${i * 20 - 10}deg)`,
                        }}
                      >
                        {e}
                      </span>
                    ))}
                  </div>

                  {/* Names */}
                  <div className="relative flex items-center justify-center gap-3 mb-4 text-white/80 text-sm font-medium">
                    <span className="px-3 py-1 bg-white/20 rounded-full">
                      {result.name1}
                    </span>
                    <span>💕</span>
                    <span className="px-3 py-1 bg-white/20 rounded-full">
                      {result.name2}
                    </span>
                  </div>

                  {/* Big score */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="relative mb-2"
                  >
                    <span className="text-7xl font-extrabold tabular-nums">
                      {counterValue}
                    </span>
                    <span className="text-4xl font-extrabold">%</span>
                  </motion.div>

                  {/* Title */}
                  <div className="relative flex items-center justify-center gap-2 mb-3">
                    <span className="text-3xl">{result.emoji}</span>
                    <span className="text-2xl font-extrabold">
                      {result.title}
                    </span>
                  </div>
                  <p className="relative text-white/85 text-sm leading-relaxed max-w-xs mx-auto">
                    {result.desc}
                  </p>
                </motion.div>

                {/* Heart gauge */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                    궁합 게이지
                  </h3>

                  {/* Heart row gauge */}
                  <div className="flex gap-1 mb-3 flex-wrap">
                    {Array.from({ length: 10 }).map((_, i) => {
                      const filled = i < Math.round(result.overall / 10);
                      return (
                        <motion.span
                          key={i}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={
                            showResult
                              ? { scale: 1, opacity: 1 }
                              : { scale: 0, opacity: 0 }
                          }
                          transition={{
                            delay: 0.1 + i * 0.07,
                            type: "spring",
                            stiffness: 250,
                          }}
                          className="text-2xl"
                        >
                          {filled ? "❤️" : "🤍"}
                        </motion.span>
                      );
                    })}
                  </div>

                  {/* Bar */}
                  <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full"
                      initial={{ width: "0%" }}
                      animate={showResult ? { width: `${result.overall}%` } : {}}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                    />
                  </div>
                  <div className="flex justify-between mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                    <span>0%</span>
                    <span className="font-bold text-pink-500">
                      {result.overall}%
                    </span>
                    <span>100%</span>
                  </div>
                </motion.div>

                {/* Category scores */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
                    카테고리별 궁합
                  </h3>
                  <div className="space-y-4">
                    {result.categories.map((cat, i) => (
                      <motion.div
                        key={cat.name}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + i * 0.07 }}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-lg">{cat.icon}</span>
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex-1">
                            {cat.name}
                          </span>
                          <span
                            className={`text-sm font-bold tabular-nums ${
                              cat.score >= 75
                                ? "text-pink-500"
                                : cat.score >= 55
                                ? "text-amber-500"
                                : "text-slate-500"
                            }`}
                          >
                            {cat.score}점
                          </span>
                        </div>
                        <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${
                              cat.score >= 75
                                ? "bg-gradient-to-r from-pink-400 to-rose-500"
                                : cat.score >= 55
                                ? "bg-gradient-to-r from-amber-400 to-orange-400"
                                : "bg-gradient-to-r from-slate-400 to-slate-500"
                            }`}
                            initial={{ width: "0%" }}
                            animate={
                              showResult ? { width: `${cat.score}%` } : {}
                            }
                            transition={{
                              duration: 0.9,
                              ease: "easeOut",
                              delay: 0.4 + i * 0.08,
                            }}
                          />
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          {cat.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Ad between categories and advice */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <AdBanner
                    format="rectangle"
                    className="rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
                  />
                </motion.div>

                {/* Advice */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                    커플 조언
                  </h3>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800/50">
                    <span className="text-2xl flex-shrink-0">💌</span>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {result.advice}
                    </p>
                  </div>
                </motion.div>

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3"
                >
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleShare}
                    className="w-full py-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-pink-300 dark:border-pink-700 text-pink-600 dark:text-pink-400 font-bold text-base hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors shadow-sm"
                  >
                    {copied ? "클립보드에 복사됨! ✓" : "결과 공유하기 📋"}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleRestart}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-base shadow-md hover:shadow-pink-500/30 hover:shadow-lg transition-shadow"
                  >
                    다시 하기 🔄
                  </motion.button>
                </motion.div>

                {/* Bottom ad */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                >
                  <AdBanner
                    format="in-article"
                    className="rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
                  />
                </motion.div>

                {/* FAQ Section */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
                    자주 묻는 질문
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        q: "궁합 점수는 어떻게 계산되나요?",
                        a: "입력한 두 이름의 글자 코드를 기반으로 독자적인 알고리즘으로 계산해요. 재미로 즐기는 테스트예요 😊",
                      },
                      {
                        q: "같은 이름을 입력하면 항상 같은 결과인가요?",
                        a: "네! 이름 기반의 결정론적 알고리즘이라 같은 이름 쌍은 언제나 동일한 결과가 나와요.",
                      },
                      {
                        q: "친구 이름으로도 테스트할 수 있나요?",
                        a: "물론이죠! 커플뿐 아니라 친구, 가족, 동료 등 어떤 두 사람의 이름으로도 테스트해볼 수 있어요.",
                      },
                    ].map((faq, i) => (
                      <div
                        key={i}
                        className="border-b border-slate-100 dark:border-slate-700 last:border-0 pb-4 last:pb-0"
                      >
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5 flex items-start gap-2">
                          <span className="flex-shrink-0 text-pink-500">Q.</span>
                          {faq.q}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex items-start gap-2">
                          <span className="flex-shrink-0 text-rose-400">A.</span>
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
