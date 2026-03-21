"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import allQuestions from "@/data/balance-questions.json";

type Question = {
  id: number;
  optionA: string;
  optionB: string;
  category: string;
};

type Phase = "play" | "result";

const CATEGORIES = ["전체", "상황", "음식", "연애", "취향", "극한"] as const;

const categoryIcons: Record<string, string> = {
  전체: "🎮",
  상황: "💡",
  음식: "🍜",
  연애: "💕",
  취향: "🎨",
  극한: "🔥",
};

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function BalanceGamePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [questions, setQuestions] = useState<Question[]>(() =>
    shuffle(allQuestions as Question[])
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("play");
  const [selected, setSelected] = useState<"A" | "B" | null>(null);
  const [choicesA, setChoicesA] = useState(0);
  const [choicesB, setChoicesB] = useState(0);
  const [answered, setAnswered] = useState(0);

  const filteredQuestions = selectedCategory === "전체"
    ? questions
    : questions.filter((q) => q.category === selectedCategory);

  const currentQuestion = filteredQuestions[currentIndex];
  const total = filteredQuestions.length;

  const handleCategoryChange = useCallback((cat: string) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setSelected(null);
    setPhase("play");
    setChoicesA(0);
    setChoicesB(0);
    setAnswered(0);
    setQuestions(shuffle(allQuestions as Question[]));
  }, []);

  const handleSelect = useCallback(
    (choice: "A" | "B") => {
      if (selected !== null) return;
      setSelected(choice);
      if (choice === "A") setChoicesA((n) => n + 1);
      else setChoicesB((n) => n + 1);
      setAnswered((n) => n + 1);

      setTimeout(() => {
        const nextIndex = currentIndex + 1;
        if (nextIndex >= total) {
          setPhase("result");
        } else {
          setCurrentIndex(nextIndex);
          setSelected(null);
        }
      }, 1000);
    },
    [selected, currentIndex, total]
  );

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setSelected(null);
    setPhase("play");
    setChoicesA(0);
    setChoicesB(0);
    setAnswered(0);
    setQuestions(shuffle(allQuestions as Question[]));
  }, []);

  const progress = total > 0 ? ((currentIndex) / total) * 100 : 0;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-red-50/20 dark:from-slate-950 dark:via-blue-950/20 dark:to-red-950/10">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent mb-2">
              밸런스 게임
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              둘 중 하나만 골라야 한다면?
            </p>
          </motion.div>

          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 justify-center mb-6"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-blue-500 to-red-500 text-white shadow-md scale-105"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
                }`}
              >
                {categoryIcons[cat]} {cat}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {/* ── PLAY PHASE ── */}
            {phase === "play" && currentQuestion && (
              <motion.div
                key={`question-${currentQuestion.id}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-medium">{currentIndex + 1} / {total}</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs">
                      {currentQuestion.category}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-red-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Cards */}
                <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                  {/* Option A */}
                  <motion.button
                    onClick={() => handleSelect("A")}
                    disabled={selected !== null}
                    animate={
                      selected === null
                        ? { scale: 1, opacity: 1 }
                        : selected === "A"
                        ? { scale: 1.04, opacity: 1 }
                        : { scale: 0.93, opacity: 0.45 }
                    }
                    whileHover={selected === null ? { scale: 1.02 } : {}}
                    whileTap={selected === null ? { scale: 0.98 } : {}}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`relative flex-1 min-h-40 sm:min-h-52 rounded-2xl p-6 flex flex-col items-center justify-center text-white font-bold text-xl text-center shadow-lg bg-gradient-to-br from-blue-400 to-blue-600 cursor-pointer disabled:cursor-default transition-shadow ${
                      selected === "A"
                        ? "shadow-blue-400/60 shadow-2xl ring-4 ring-blue-300"
                        : "hover:shadow-blue-400/30 hover:shadow-xl"
                    }`}
                  >
                    {selected === "A" && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-base"
                      >
                        ✓
                      </motion.div>
                    )}
                    <span className="leading-snug">{currentQuestion.optionA}</span>
                    <span className="mt-3 text-xs font-semibold uppercase tracking-widest text-blue-100 opacity-80">
                      A
                    </span>
                  </motion.button>

                  {/* VS divider */}
                  <div className="flex sm:flex-col items-center justify-center gap-1 py-1 sm:py-0">
                    <div className="flex-1 sm:flex-none sm:h-10 w-px sm:w-px h-px sm:h-auto bg-slate-300 dark:bg-slate-600 hidden sm:block" />
                    <span className="text-slate-400 dark:text-slate-500 font-extrabold text-lg tracking-wider px-3 sm:px-0 sm:py-2">
                      VS
                    </span>
                    <div className="flex-1 sm:flex-none sm:h-10 w-px sm:w-px h-px sm:h-auto bg-slate-300 dark:bg-slate-600 hidden sm:block" />
                  </div>

                  {/* Option B */}
                  <motion.button
                    onClick={() => handleSelect("B")}
                    disabled={selected !== null}
                    animate={
                      selected === null
                        ? { scale: 1, opacity: 1 }
                        : selected === "B"
                        ? { scale: 1.04, opacity: 1 }
                        : { scale: 0.93, opacity: 0.45 }
                    }
                    whileHover={selected === null ? { scale: 1.02 } : {}}
                    whileTap={selected === null ? { scale: 0.98 } : {}}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`relative flex-1 min-h-40 sm:min-h-52 rounded-2xl p-6 flex flex-col items-center justify-center text-white font-bold text-xl text-center shadow-lg bg-gradient-to-br from-red-400 to-red-600 cursor-pointer disabled:cursor-default transition-shadow ${
                      selected === "B"
                        ? "shadow-red-400/60 shadow-2xl ring-4 ring-red-300"
                        : "hover:shadow-red-400/30 hover:shadow-xl"
                    }`}
                  >
                    {selected === "B" && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-base"
                      >
                        ✓
                      </motion.div>
                    )}
                    <span className="leading-snug">{currentQuestion.optionB}</span>
                    <span className="mt-3 text-xs font-semibold uppercase tracking-widest text-red-100 opacity-80">
                      B
                    </span>
                  </motion.button>
                </div>

                {/* Hint text */}
                {selected === null && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-xs text-slate-400 dark:text-slate-500"
                  >
                    카드를 눌러 선택하세요
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* ── RESULT PHASE ── */}
            {phase === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="text-6xl mb-4"
                  >
                    🎉
                  </motion.div>
                  <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-1">
                    게임 완료!
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
                    총 {answered}개의 질문에 답했어요
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <motion.div
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                      className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/30 border border-blue-200/60 dark:border-blue-700/40 p-5"
                    >
                      <p className="text-xs font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wide mb-2">
                        A 선택
                      </p>
                      <p className="text-5xl font-extrabold text-blue-600 dark:text-blue-400">
                        {choicesA}
                      </p>
                      <p className="text-xs text-blue-400 dark:text-blue-500 mt-1">
                        {answered > 0 ? Math.round((choicesA / answered) * 100) : 0}%
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="rounded-2xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/30 border border-red-200/60 dark:border-red-700/40 p-5"
                    >
                      <p className="text-xs font-semibold text-red-500 dark:text-red-400 uppercase tracking-wide mb-2">
                        B 선택
                      </p>
                      <p className="text-5xl font-extrabold text-red-600 dark:text-red-400">
                        {choicesB}
                      </p>
                      <p className="text-xs text-red-400 dark:text-red-500 mt-1">
                        {answered > 0 ? Math.round((choicesB / answered) * 100) : 0}%
                      </p>
                    </motion.div>
                  </div>

                  {/* A/B bar */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                  >
                    <div className="flex rounded-full overflow-hidden h-3 bg-slate-200 dark:bg-slate-700">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-500"
                        initial={{ width: 0 }}
                        animate={{
                          width: answered > 0 ? `${(choicesA / answered) * 100}%` : "50%",
                        }}
                        transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
                      />
                      <motion.div
                        className="h-full bg-gradient-to-r from-red-400 to-red-500 flex-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.45 }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-slate-400">
                      <span>A</span>
                      <span>B</span>
                    </div>
                  </motion.div>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleRestart}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-red-500 text-white font-bold text-lg shadow-md hover:shadow-blue-500/20 transition-shadow"
                  >
                    다시 하기
                  </motion.button>
                  <AdBanner format="rectangle" className="mt-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
