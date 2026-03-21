"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import data from "@/data/truth-dare.json";

type Phase = "setup" | "game";
type CardType = "truth" | "dare";
type Intensity = "mild" | "medium" | "hot";

const CATEGORIES = ["연애", "우정", "학교/직장", "일상"] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_ICONS: Record<Category, string> = {
  연애: "💕",
  우정: "🤝",
  "학교/직장": "🏫",
  일상: "☀️",
};

const INTENSITY_LABELS: Record<Intensity, string> = {
  mild: "순한맛",
  medium: "보통",
  hot: "매운맛",
};

const INTENSITY_COLORS: Record<Intensity, string> = {
  mild: "from-green-400 to-emerald-500",
  medium: "from-amber-400 to-orange-500",
  hot: "from-rose-500 to-red-600",
};

function getPool(
  categories: Category[],
  intensity: Intensity,
  type: CardType
): string[] {
  const pool: string[] = [];
  const typeData = data[type] as Record<string, Record<string, string[]>>;
  for (const cat of categories) {
    const catData = typeData[cat];
    if (catData && catData[intensity]) {
      pool.push(...catData[intensity]);
    }
  }
  return pool;
}

function pickRandom(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function TruthDarePage() {
  // Setup state
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([
    "연애",
    "우정",
    "일상",
  ]);
  const [intensity, setIntensity] = useState<Intensity>("mild");

  // Game state
  const [phase, setPhase] = useState<Phase>("setup");
  const [currentCard, setCurrentCard] = useState<{
    type: CardType;
    text: string;
  } | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);
  const [roundCount, setRoundCount] = useState(0);

  const toggleCategory = useCallback((cat: Category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(cat)) {
        if (prev.length === 1) return prev;
        return prev.filter((c) => c !== cat);
      }
      return [...prev, cat];
    });
  }, []);

  const truthPool = useMemo(
    () => getPool(selectedCategories, intensity, "truth"),
    [selectedCategories, intensity]
  );
  const darePool = useMemo(
    () => getPool(selectedCategories, intensity, "dare"),
    [selectedCategories, intensity]
  );

  const drawCard = useCallback(
    (type: CardType) => {
      const pool = type === "truth" ? truthPool : darePool;
      if (pool.length === 0) return;
      const text = pickRandom(pool);
      setCurrentCard({ type, text });
      setFlipped(false);
      // Small delay then flip to reveal
      setTimeout(() => setFlipped(true), 80);
    },
    [truthPool, darePool]
  );

  const handleTruth = useCallback(() => {
    drawCard("truth");
  }, [drawCard]);

  const handleDare = useCallback(() => {
    drawCard("dare");
  }, [drawCard]);

  const handleNext = useCallback(() => {
    if (!currentCard) return;
    setAnsweredCount((c) => c + 1);
    setRoundCount((c) => c + 1);
    setCurrentCard(null);
    setFlipped(false);
  }, [currentCard]);

  const handleSkip = useCallback(() => {
    setSkippedCount((c) => c + 1);
    setRoundCount((c) => c + 1);
    setCurrentCard(null);
    setFlipped(false);
  }, []);

  const startGame = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPhase("game");
    setCurrentCard(null);
    setFlipped(false);
    setAnsweredCount(0);
    setSkippedCount(0);
    setRoundCount(0);
  }, []);

  const resetToSetup = useCallback(() => {
    setPhase("setup");
    setCurrentCard(null);
    setFlipped(false);
    setAnsweredCount(0);
    setSkippedCount(0);
    setRoundCount(0);
  }, []);

  const showMidAd = roundCount > 0 && roundCount % 5 === 0 && !currentCard;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50/30 to-orange-50/20 dark:from-slate-950 dark:via-rose-950/20 dark:to-orange-950/10">
        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent mb-2">
              진실 혹은 도전
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Truth or Dare · 친구들과 함께하는 파티 게임
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
                className="space-y-6"
              >
                {/* Category selection */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
                    카테고리 선택
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {CATEGORIES.map((cat) => {
                      const active = selectedCategories.includes(cat);
                      return (
                        <button
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                            active
                              ? "bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-md scale-[1.02]"
                              : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-900/30"
                          }`}
                        >
                          <span>{CATEGORY_ICONS[cat]}</span>
                          <span>{cat}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-slate-400 mt-3 text-center">
                    최소 1개 이상 선택해주세요
                  </p>
                </div>

                {/* Intensity selection */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
                    강도 설정
                  </h2>
                  <div className="flex gap-3">
                    {(["mild", "medium", "hot"] as Intensity[]).map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setIntensity(lvl)}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                          intensity === lvl
                            ? `bg-gradient-to-r ${INTENSITY_COLORS[lvl]} text-white shadow-md`
                            : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-900/30"
                        }`}
                      >
                        {INTENSITY_LABELS[lvl]}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-3 px-1">
                    <span className="text-xs text-slate-400">🌿 가볍게</span>
                    <span className="text-xs text-slate-400">🔥 강렬하게</span>
                  </div>
                </div>

                {/* Question count info */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <span>📝</span>
                      <span>준비된 진실 질문</span>
                    </div>
                    <span className="font-bold text-rose-500">
                      {truthPool.length}개
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <span>⚡</span>
                      <span>준비된 도전 미션</span>
                    </div>
                    <span className="font-bold text-orange-500">
                      {darePool.length}개
                    </span>
                  </div>
                </div>

                {/* Ad */}
                <AdBanner
                  format="horizontal"
                  className="rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
                />

                {/* Start button */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={startGame}
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xl font-bold shadow-lg hover:shadow-rose-500/30 transition-shadow"
                >
                  게임 시작 🎉
                </motion.button>

                {/* FAQ section */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    자주 묻는 질문
                  </h2>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-1">
                      Q. 진실 혹은 도전은 어떻게 하나요?
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                      순서가 된 사람이 진실 또는 도전 버튼을 눌러 질문/미션을
                      받습니다. 진실을 고르면 솔직하게 답해야 하고, 도전을
                      고르면 주어진 미션을 수행해야 합니다!
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-1">
                      Q. 어떤 카테고리가 있나요?
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                      연애, 우정, 학교/직장, 일상 4가지 카테고리가 있고 각각
                      순한맛/보통/매운맛 강도로 나뉩니다. 원하는 카테고리와
                      강도를 조합해서 즐기세요!
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-1">
                      Q. 몇 명이서 할 수 있나요?
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                      2명부터 여러 명까지 가능합니다. 3~8명이 가장 재미있고,
                      술자리나 파티에서 하나의 폰을 돌려가며 즐기기 딱 좋아요!
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── GAME PHASE ── */}
            {phase === "game" && (
              <motion.div
                key="game"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Stats bar */}
                <div className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-2xl px-5 py-3 shadow-sm border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={resetToSetup}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm transition-colors"
                  >
                    ← 설정
                  </button>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                      완료{" "}
                      <span className="font-bold text-rose-500">
                        {answeredCount}
                      </span>
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">|</span>
                    <span className="text-slate-500 dark:text-slate-400">
                      건너뜀{" "}
                      <span className="font-bold text-slate-400">
                        {skippedCount}
                      </span>
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {selectedCategories.map((cat) => (
                      <span key={cat} className="text-base">
                        {CATEGORY_ICONS[cat]}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mid-game ad every 5 rounds */}
                {showMidAd && (
                  <AdBanner
                    format="in-article"
                    className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
                  />
                )}

                {/* Card area */}
                <AnimatePresence mode="wait">
                  {!currentCard ? (
                    /* Choose screen */
                    <motion.div
                      key="choose"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">
                          {roundCount === 0
                            ? "게임을 시작해보세요!"
                            : "다음 차례!"}
                        </p>
                        <p className="text-slate-800 dark:text-slate-100 text-lg font-bold mb-6">
                          진실 또는 도전을 선택하세요
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                          {/* Truth button */}
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={handleTruth}
                            className="flex flex-col items-center gap-3 py-8 px-4 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
                          >
                            <span className="text-4xl">🙋</span>
                            <div>
                              <p className="text-xl font-extrabold">진실</p>
                              <p className="text-xs opacity-80 mt-0.5">Truth</p>
                            </div>
                          </motion.button>

                          {/* Dare button */}
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={handleDare}
                            className="flex flex-col items-center gap-3 py-8 px-4 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 transition-shadow"
                          >
                            <span className="text-4xl">⚡</span>
                            <div>
                              <p className="text-xl font-extrabold">도전</p>
                              <p className="text-xs opacity-80 mt-0.5">Dare</p>
                            </div>
                          </motion.button>
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${INTENSITY_COLORS[intensity]} text-white`}
                          >
                            {intensity === "mild"
                              ? "🌿"
                              : intensity === "medium"
                              ? "🌶️"
                              : "🔥"}{" "}
                            {INTENSITY_LABELS[intensity]}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    /* Card reveal */
                    <motion.div
                      key={`card-${currentCard.text}`}
                      initial={{ opacity: 0, rotateY: -90 }}
                      animate={{ opacity: 1, rotateY: flipped ? 0 : -90 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="space-y-4"
                      style={{ perspective: 1000 }}
                    >
                      <div
                        className={`rounded-2xl p-8 shadow-lg border text-center min-h-52 flex flex-col items-center justify-center gap-4 ${
                          currentCard.type === "truth"
                            ? "bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-950/40 dark:to-violet-950/40 border-blue-200/60 dark:border-blue-700/50"
                            : "bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950/40 dark:to-orange-950/40 border-rose-200/60 dark:border-rose-700/50"
                        }`}
                      >
                        {/* Card type badge */}
                        <div
                          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-sm font-bold ${
                            currentCard.type === "truth"
                              ? "bg-gradient-to-r from-blue-500 to-violet-500"
                              : "bg-gradient-to-r from-rose-500 to-orange-500"
                          }`}
                        >
                          <span>
                            {currentCard.type === "truth" ? "🙋" : "⚡"}
                          </span>
                          <span>
                            {currentCard.type === "truth" ? "진실" : "도전"}
                          </span>
                        </div>

                        {/* Question / challenge text */}
                        <motion.p
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 }}
                          className="text-xl font-bold text-slate-800 dark:text-slate-100 leading-relaxed"
                        >
                          {currentCard.text}
                        </motion.p>

                        {/* Intensity badge */}
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${INTENSITY_COLORS[intensity]} text-white opacity-80`}
                        >
                          {intensity === "mild"
                            ? "🌿"
                            : intensity === "medium"
                            ? "🌶️"
                            : "🔥"}{" "}
                          {INTENSITY_LABELS[intensity]}
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="grid grid-cols-2 gap-3">
                        <motion.button
                          whileTap={{ scale: 0.96 }}
                          onClick={handleSkip}
                          className="py-4 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                        >
                          건너뛰기 ⏭
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.96 }}
                          onClick={handleNext}
                          className="py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold shadow-md hover:shadow-rose-500/30 transition-shadow"
                        >
                          완료! 다음 →
                        </motion.button>
                      </div>

                      {/* Draw again (different type) */}
                      <div className="flex gap-2">
                        <button
                          onClick={
                            currentCard.type === "truth"
                              ? handleTruth
                              : handleDare
                          }
                          className="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          🔄 다른 질문
                        </button>
                        <button
                          onClick={
                            currentCard.type === "truth"
                              ? handleDare
                              : handleTruth
                          }
                          className="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          {currentCard.type === "truth"
                            ? "⚡ 도전으로"
                            : "🙋 진실로"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom ad */}
                <AdBanner
                  format="rectangle"
                  className="mt-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
