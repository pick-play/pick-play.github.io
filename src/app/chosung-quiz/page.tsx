"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import wordsData from "@/data/chosung-words.json";

type Phase = "setup" | "game" | "result";
type TimerMode = 30 | 60 | 0; // 0 = unlimited
type FeedbackState = "idle" | "correct" | "wrong" | "revealed";

interface Word {
  id: number;
  word: string;
  chosung: string;
  category: string;
  hint: string;
}

const ALL_WORDS: Word[] = wordsData as Word[];

const CATEGORIES = ["전체", "음식", "동물", "영화", "장소", "유명인"] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_ICONS: Record<string, string> = {
  전체: "🎯",
  음식: "🍜",
  동물: "🐾",
  영화: "🎬",
  장소: "📍",
  유명인: "🌟",
};

const TIMER_OPTIONS: { label: string; value: TimerMode }[] = [
  { label: "30초", value: 30 },
  { label: "60초", value: 60 },
  { label: "무제한", value: 0 },
];

function shuffleArray<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Chosung tile component
function ChosungTiles({ chosung }: { chosung: string }) {
  const letters = chosung.split("");
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {letters.map((ch, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: i * 0.08,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="w-14 h-14 md:w-20 md:h-20 rounded-xl bg-primary-100 dark:bg-primary-900 border-2 border-primary-200 dark:border-primary-700 flex items-center justify-center shadow-md"
        >
          <span className="text-3xl md:text-5xl font-bold text-primary-700 dark:text-primary-200">
            {ch}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// Circular timer component
function CircularTimer({
  timeLeft,
  total,
}: {
  timeLeft: number;
  total: number;
}) {
  const r = 44;
  const circumference = 2 * Math.PI * r;
  const percent = total > 0 ? timeLeft / total : 1;
  const offset = circumference * (1 - percent);
  const strokeColor =
    percent > 0.5
      ? "stroke-primary-500"
      : percent > 0.25
      ? "stroke-amber-400"
      : "stroke-red-400";

  return (
    <div className="relative w-28 h-28 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-slate-200 dark:text-slate-700"
        />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`transition-all duration-1000 ${strokeColor}`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`text-2xl font-extrabold ${
            percent > 0.5
              ? "text-primary-600 dark:text-primary-400"
              : percent > 0.25
              ? "text-amber-500"
              : "text-red-500"
          }`}
        >
          {timeLeft}
        </span>
      </div>
    </div>
  );
}

export default function ChosungQuizPage() {
  // Setup state
  const [selectedCategory, setSelectedCategory] = useState<Category>("전체");
  const [timerMode, setTimerMode] = useState<TimerMode>(60);

  // Game state
  const [phase, setPhase] = useState<Phase>("setup");
  const [queue, setQueue] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<FeedbackState>("idle");
  const [hintLevel, setHintLevel] = useState(0); // 0=none, 1=category, 2=hint
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [shownAnswer, setShownAnswer] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const feedbackTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);

  const currentWord = queue[currentIndex] ?? null;

  // Timer countdown
  useEffect(() => {
    if (!timerActive || timeLeft <= 0) {
      if (timerActive && timeLeft <= 0 && feedback === "idle") {
        // Time ran out
        setTimerActive(false);
        setShownAnswer(true);
        setFeedback("revealed");
        setAttempted((a) => a + 1);
        setStreak(0);
        autoAdvanceRef.current = setTimeout(() => advanceQuestion(), 2500);
      }
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerActive, timeLeft]);

  const clearTimers = useCallback(() => {
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
    }
    if (autoAdvanceRef.current) {
      clearTimeout(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
  }, []);

  const advanceQuestion = useCallback(() => {
    clearTimers();
    setCurrentIndex((i) => i + 1);
    setAnswer("");
    setFeedback("idle");
    setHintLevel(0);
    setShownAnswer(false);
    if (timerMode > 0) {
      setTimeLeft(timerMode);
      setTimerActive(true);
    }
    setTimeout(() => inputRef.current?.focus(), 100);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearTimers, timerMode]);

  const startGame = useCallback(() => {
    clearTimers();
    const pool =
      selectedCategory === "전체"
        ? ALL_WORDS
        : ALL_WORDS.filter((w) => w.category === selectedCategory);
    const shuffled = shuffleArray(pool);
    setQueue(shuffled);
    setCurrentIndex(0);
    setAnswer("");
    setFeedback("idle");
    setHintLevel(0);
    setShownAnswer(false);
    setScore(0);
    setAttempted(0);
    setStreak(0);
    setBestStreak(0);
    if (timerMode > 0) {
      setTimeLeft(timerMode);
      setTimerActive(true);
    } else {
      setTimeLeft(0);
      setTimerActive(false);
    }
    setPhase("game");
    setTimeout(() => inputRef.current?.focus(), 150);
  }, [clearTimers, selectedCategory, timerMode]);

  const handleSubmit = useCallback(() => {
    if (!currentWord || feedback !== "idle" || shownAnswer) return;
    const trimmed = answer.trim();
    if (!trimmed) return;

    setTimerActive(false);
    clearTimers();
    setAttempted((a) => a + 1);

    if (trimmed === currentWord.word) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBestStreak((b) => Math.max(b, newStreak));
      setScore((s) => s + 1);
      setFeedback("correct");
      autoAdvanceRef.current = setTimeout(() => advanceQuestion(), 1800);
    } else {
      setStreak(0);
      setFeedback("wrong");
      feedbackTimerRef.current = setTimeout(() => {
        setFeedback("idle");
        setAnswer("");
        if (timerMode > 0) {
          setTimeLeft((t) => t); // keep remaining time
          setTimerActive(true);
        }
        setTimeout(() => inputRef.current?.focus(), 50);
      }, 1000);
    }
  }, [currentWord, feedback, shownAnswer, answer, streak, advanceQuestion, clearTimers, timerMode]);

  const handleGiveUp = useCallback(() => {
    if (!currentWord || shownAnswer) return;
    clearTimers();
    setTimerActive(false);
    setShownAnswer(true);
    setFeedback("revealed");
    setAttempted((a) => a + 1);
    setStreak(0);
    autoAdvanceRef.current = setTimeout(() => advanceQuestion(), 2500);
  }, [currentWord, shownAnswer, clearTimers, advanceQuestion]);

  const handleHint = useCallback(() => {
    if (hintLevel < 2) setHintLevel((h) => h + 1);
  }, [hintLevel]);

  const handleFinish = useCallback(() => {
    clearTimers();
    setTimerActive(false);
    setPhase("result");
  }, [clearTimers]);

  // Auto-finish when queue is exhausted
  useEffect(() => {
    if (phase === "game" && queue.length > 0 && currentIndex >= queue.length) {
      clearTimers();
      setTimerActive(false);
      setPhase("result");
    }
  }, [phase, queue.length, currentIndex, clearTimers]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const isDone = currentIndex >= queue.length && queue.length > 0;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-sky-950/20 dark:to-indigo-950/10">
        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent mb-2">
              초성 퀴즈
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              초성만 보고 단어를 맞춰보세요!
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* ── SETUP PHASE ── */}
            {phase === "setup" && (
              <motion.div
                key="setup"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* Category selection */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
                    카테고리
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedCategory === cat
                            ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-md scale-105"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-sky-900/30"
                        }`}
                      >
                        {CATEGORY_ICONS[cat]} {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timer selection */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
                    타이머
                  </h2>
                  <div className="flex gap-3">
                    {TIMER_OPTIONS.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => setTimerMode(opt.value)}
                        className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                          timerMode === opt.value
                            ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-md"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-sky-900/30"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Word count info */}
                <p className="text-center text-xs text-slate-400">
                  {selectedCategory === "전체"
                    ? `전체 ${ALL_WORDS.length}개 단어`
                    : `${selectedCategory} 카테고리 ${ALL_WORDS.filter((w) => w.category === selectedCategory).length}개 단어`}
                </p>

                {/* Start button */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={startGame}
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-xl font-bold shadow-lg hover:shadow-sky-500/30 transition-shadow"
                >
                  시작하기
                </motion.button>
              </motion.div>
            )}

            {/* ── GAME PHASE ── */}
            {phase === "game" && currentWord && !isDone && (
              <motion.div
                key={`game-${currentWord.id}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                {/* Score & Progress bar */}
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <span>
                    {currentIndex + 1} / {queue.length}
                  </span>
                  <span className="font-semibold text-sky-600 dark:text-sky-400">
                    {score}정답 / {attempted}문제
                  </span>
                  {streak >= 2 && (
                    <motion.span
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="font-bold text-amber-500"
                    >
                      연속 {streak}개!
                    </motion.span>
                  )}
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((currentIndex) / queue.length) * 100}%`,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                {/* Main card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  {/* Category badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                      {CATEGORY_ICONS[currentWord.category]} {currentWord.category}
                    </span>
                    {timerMode > 0 && (
                      <CircularTimer timeLeft={timeLeft} total={timerMode} />
                    )}
                  </div>

                  {/* Chosung tiles */}
                  <div className="py-4">
                    <ChosungTiles chosung={currentWord.chosung} />
                  </div>

                  {/* Hint area */}
                  <AnimatePresence>
                    {hintLevel > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-amber-700 dark:text-amber-300 text-sm"
                      >
                        {hintLevel === 1 && (
                          <span>
                            카테고리: <strong>{currentWord.category}</strong>
                          </span>
                        )}
                        {hintLevel === 2 && (
                          <span>
                            힌트: <strong>{currentWord.hint}</strong>
                          </span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Revealed answer */}
                  <AnimatePresence>
                    {shownAnswer && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-700 text-center"
                      >
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                          정답은
                        </p>
                        <p className="text-2xl font-extrabold bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
                          {currentWord.word}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Feedback overlay */}
                <AnimatePresence>
                  {feedback === "correct" && (
                    <motion.div
                      key="correct"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className="text-center py-2"
                    >
                      <p className="text-3xl font-extrabold text-emerald-500">
                        정답!
                      </p>
                      {streak >= 2 && (
                        <p className="text-sm text-amber-500 font-semibold mt-1">
                          연속 {streak}개 정답!
                        </p>
                      )}
                    </motion.div>
                  )}
                  {feedback === "wrong" && (
                    <motion.div
                      key="wrong"
                      initial={{ x: 0 }}
                      animate={{ x: [0, -10, 10, -8, 8, -4, 4, 0] }}
                      transition={{ duration: 0.45 }}
                      className="text-center py-2"
                    >
                      <p className="text-3xl font-extrabold text-red-500">
                        오답!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Answer input */}
                {feedback !== "correct" && !shownAnswer && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="정답을 입력하세요"
                      disabled={feedback !== "idle"}
                      className={`flex-1 px-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none transition-all ${
                        feedback === "wrong"
                          ? "border-red-400 dark:border-red-500"
                          : "border-slate-200 dark:border-slate-600 focus:border-sky-400 dark:focus:border-sky-500"
                      }`}
                    />
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSubmit}
                      disabled={feedback !== "idle" || !answer.trim()}
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold shadow-md disabled:opacity-40 transition-opacity"
                    >
                      확인
                    </motion.button>
                  </motion.div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3">
                  {/* Hint button */}
                  {!shownAnswer && feedback !== "correct" && (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleHint}
                      disabled={hintLevel >= 2}
                      className={`flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                        hintLevel >= 2
                          ? "bg-amber-500 border-amber-500 text-white opacity-60"
                          : hintLevel > 0
                          ? "bg-amber-50 dark:bg-amber-950/30 border-amber-400 text-amber-600 dark:text-amber-300"
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-amber-400 hover:text-amber-600"
                      }`}
                    >
                      {hintLevel === 0
                        ? "힌트 보기"
                        : hintLevel === 1
                        ? "힌트 더 보기"
                        : "힌트 다 봄"}
                    </motion.button>
                  )}

                  {/* Give up / Next button */}
                  {!shownAnswer && feedback !== "correct" ? (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleGiveUp}
                      className="flex-1 py-3 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-all border-2 border-transparent"
                    >
                      포기
                    </motion.button>
                  ) : feedback === "correct" ? null : (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={advanceQuestion}
                      className="flex-1 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-md"
                    >
                      다음 문제
                    </motion.button>
                  )}

                  {/* Finish early button */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleFinish}
                    className="px-4 py-3 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    종료
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ── RESULT PHASE ── */}
            {phase === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 180, delay: 0.1 }}
                    className="text-7xl mb-4"
                  >
                    {score === attempted && attempted > 0 ? "🏆" : score > attempted / 2 ? "🎉" : "📝"}
                  </motion.div>

                  <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">
                    퀴즈 종료!
                  </h2>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-950/40 dark:to-indigo-950/40 rounded-2xl p-5 mb-6 border border-sky-200/50 dark:border-sky-700/50 space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400 text-sm">
                        최종 점수
                      </span>
                      <span className="text-2xl font-extrabold bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
                        {score} / {attempted}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400 text-sm">
                        정답률
                      </span>
                      <span className="text-lg font-bold text-slate-700 dark:text-slate-200">
                        {attempted > 0
                          ? Math.round((score / attempted) * 100)
                          : 0}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400 text-sm">
                        최고 연속 정답
                      </span>
                      <span className="text-lg font-bold text-amber-500">
                        {bestStreak}개
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400 text-sm">
                        카테고리
                      </span>
                      <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                        {CATEGORY_ICONS[selectedCategory]} {selectedCategory}
                      </span>
                    </div>
                  </motion.div>

                  <div className="flex gap-3">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={startGame}
                      className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold text-lg shadow-md hover:shadow-sky-500/30 transition-shadow"
                    >
                      다시 하기
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setPhase("setup")}
                      className="flex-1 py-4 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-lg transition-colors hover:bg-slate-200 dark:hover:bg-slate-600"
                    >
                      설정 변경
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
