"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";

// ── Types ──────────────────────────────────────────────────────────────────

type Phase = "setup" | "draw" | "result";

interface DrawCard {
  id: number;
  label: string; // item name shown on back face
  isWinner: boolean;
  flipped: boolean;
}

// ── Constants ──────────────────────────────────────────────────────────────

const CHIP_COLORS = [
  "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
];

const PRESETS: Array<{ label: string; items: string[] }> = [
  { label: "당첨/꽝", items: ["당첨", "꽝"] },
  { label: "1·2·3등/꽝", items: ["1등", "2등", "3등", "꽝"] },
  { label: "벌칙 있음/없음", items: ["벌칙", "면제", "면제", "면제"] },
];

// ── Utilities ──────────────────────────────────────────────────────────────

function fisherYatesShuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildCards(items: string[], winnerCount: number): DrawCard[] {
  // Build result pool: winnerCount winners + rest losers
  const results: boolean[] = [
    ...Array(winnerCount).fill(true),
    ...Array(items.length - winnerCount).fill(false),
  ];
  const shuffledResults = fisherYatesShuffle(results);
  return items.map((label, i) => ({
    id: i,
    label,
    isWinner: shuffledResults[i],
    flipped: false,
  }));
}

// ── Confetti ───────────────────────────────────────────────────────────────

const CONFETTI_COLORS = [
  "#FF6B6B", "#4ECDC4", "#FFE66D", "#A8E6CF", "#FF8B94",
  "#B5EAD7", "#FFDAC1", "#C7CEEA", "#F9C74F", "#90DBF4",
];

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
}

function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  const pieces: ConfettiPiece[] = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size: 6 + Math.random() * 8,
    delay: Math.random() * 0.5,
    duration: 1.2 + Math.random() * 0.8,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "-5vh", x: `${p.x}vw`, opacity: 1, rotate: 0, scale: 1 }}
          animate={{
            y: "110vh",
            opacity: [1, 1, 0],
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
            scale: [1, 1.2, 0.8],
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: p.size,
            height: p.size,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
}

// ── Flip Card Component ────────────────────────────────────────────────────

interface FlipCardProps {
  card: DrawCard;
  index: number;
  onFlip: (id: number) => void;
  isShuffling: boolean;
  shuffleDelay: number;
}

function FlipCard({ card, index, onFlip, isShuffling, shuffleDelay }: FlipCardProps) {
  const handleClick = () => {
    if (!isShuffling && !card.flipped) onFlip(card.id);
  };

  return (
    <motion.div
      className="cursor-pointer"
      style={{ perspective: "1000px" }}
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      animate={
        isShuffling
          ? {
              opacity: 1,
              y: [0, -12, 8, -6, 0],
              x: [0, 10, -8, 5, 0],
              rotate: [0, 4, -3, 2, 0],
              scale: [1, 1.04, 0.97, 1.02, 1],
            }
          : { opacity: 1, y: 0, scale: 1 }
      }
      transition={
        isShuffling
          ? {
              duration: 0.6,
              delay: shuffleDelay,
              repeat: 3,
              repeatType: "mirror",
              ease: "easeInOut",
            }
          : { duration: 0.4, delay: index * 0.06, type: "spring", stiffness: 200, damping: 20 }
      }
      onClick={handleClick}
      whileHover={!card.flipped && !isShuffling ? { scale: 1.06, y: -4 } : {}}
      whileTap={!card.flipped && !isShuffling ? { scale: 0.96 } : {}}
    >
      {/* Card flip container */}
      <motion.div
        style={{ transformStyle: "preserve-3d", position: "relative", height: "120px" }}
        animate={{ rotateY: card.flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Front face (face-down, question mark) */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex flex-col items-center justify-center shadow-md border-2 border-amber-300/50"
        >
          <span className="text-3xl select-none">🎴</span>
          <span className="text-white/80 text-xs font-semibold mt-1 select-none">탭하여 공개</span>
        </div>

        {/* Back face (revealed result) */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center shadow-md border-2 ${
            card.isWinner
              ? "bg-gradient-to-br from-amber-400 to-yellow-300 border-amber-300/70"
              : "bg-gradient-to-br from-slate-500 to-slate-600 border-slate-400/30"
          }`}
        >
          <span className="text-3xl select-none">{card.isWinner ? "🎉" : "😢"}</span>
          <span
            className={`text-sm font-bold mt-1 select-none ${
              card.isWinner ? "text-amber-900" : "text-slate-200"
            }`}
          >
            {card.label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────

export default function DrawPage() {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [winnerCount, setWinnerCount] = useState(1);
  const [phase, setPhase] = useState<Phase>("setup");
  const [cards, setCards] = useState<DrawCard[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Setup helpers ──

  const addItems = useCallback(() => {
    const raw = inputValue.trim();
    if (!raw) return;
    const parsed = raw
      .split(/[,，、\n]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !items.includes(s));
    if (parsed.length > 0) setItems((prev) => [...prev, ...parsed].slice(0, 20));
    setInputValue("");
    inputRef.current?.focus();
  }, [inputValue, items]);

  const removeItem = useCallback((idx: number) => {
    setItems((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      setWinnerCount((w) => Math.min(w, Math.max(1, next.length - 1)));
      return next;
    });
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { e.preventDefault(); addItems(); }
  };

  const applyPreset = (preset: { label: string; items: string[] }) => {
    setItems(preset.items);
    setWinnerCount(1);
  };

  // ── Draw flow ──

  const startDraw = useCallback(() => {
    if (items.length < 2) return;
    const built = buildCards(items, winnerCount);
    setCards(built);
    setPhase("draw");
    setIsShuffling(true);
    // Shuffle animation: ~3s (0.6s * 3 repeats + stagger), then allow flipping
    setTimeout(() => setIsShuffling(false), 3000);
  }, [items, winnerCount]);

  const flipCard = useCallback((id: number) => {
    setCards((prev) => prev.map((c) => c.id === id ? { ...c, flipped: true } : c));
  }, []);

  const flipAll = useCallback(() => {
    setCards((prev) => prev.map((c) => ({ ...c, flipped: true })));
  }, []);

  // Watch for all cards flipped → confetti + phase change
  const allFlipped = cards.length > 0 && cards.every((c) => c.flipped);
  const hasWinnerFlipped = cards.some((c) => c.flipped && c.isWinner);

  // Trigger confetti when a winner is first revealed
  const confettiTriggeredRef = useRef(false);
  if (hasWinnerFlipped && !confettiTriggeredRef.current) {
    confettiTriggeredRef.current = true;
    setTimeout(() => setShowConfetti(true), 0);
    setTimeout(() => setShowConfetti(false), 2500);
  }

  // Go to result when all flipped
  const resultTriggeredRef = useRef(false);
  if (allFlipped && phase === "draw" && !resultTriggeredRef.current) {
    resultTriggeredRef.current = true;
    setTimeout(() => setPhase("result"), 800);
  }

  const resetAll = () => {
    setItems([]);
    setInputValue("");
    setWinnerCount(1);
    setPhase("setup");
    setCards([]);
    setIsShuffling(false);
    setShowConfetti(false);
    setCopySuccess(false);
    confettiTriggeredRef.current = false;
    resultTriggeredRef.current = false;
  };

  const redraw = () => {
    confettiTriggeredRef.current = false;
    resultTriggeredRef.current = false;
    setShowConfetti(false);
    setCopySuccess(false);
    startDraw();
  };

  const copyResult = useCallback(async () => {
    const winners = cards.filter((c) => c.isWinner).map((c) => c.label);
    const losers = cards.filter((c) => !c.isWinner).map((c) => c.label);
    const lines = [
      "[제비뽑기 결과]",
      "",
      `당첨 (${winners.length}명): ${winners.join(", ")}`,
      `꽝 (${losers.length}명): ${losers.join(", ")}`,
      "",
      "PickPlay에서 생성",
    ];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      // clipboard not available
    }
  }, [cards]);

  const canStart = items.length >= 2 && winnerCount >= 1 && winnerCount < items.length;
  const winners = cards.filter((c) => c.isWinner);
  const losers = cards.filter((c) => !c.isWinner);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/20 dark:from-slate-950 dark:via-amber-950/20 dark:to-orange-950/10">
        <Confetti active={showConfetti} />

        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg mb-4">
              <span className="text-3xl">🎴</span>
            </div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent mb-2">
              제비뽑기
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              공정하고 긴장감 넘치는 온라인 추첨
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
                className="space-y-4"
              >
                {/* Presets */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                    빠른 시작 프리셋
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => applyPreset(preset)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          JSON.stringify(items) === JSON.stringify(preset.items)
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md scale-105"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-900/30"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Item input */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                    항목 추가 <span className="text-xs normal-case font-normal">(최대 20개)</span>
                  </h2>
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="이름 입력 (쉼표로 여러 개)"
                      className="flex-1 min-h-[48px] px-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                    />
                    <button
                      onClick={addItems}
                      className="min-h-[48px] px-5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm hover:from-amber-600 hover:to-orange-600 transition-all active:scale-95 shadow-sm"
                    >
                      추가
                    </button>
                  </div>

                  {/* Item chips */}
                  <AnimatePresence>
                    {items.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 flex flex-wrap gap-2"
                      >
                        {items.map((item, idx) => (
                          <motion.span
                            key={`${item}-${idx}`}
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${CHIP_COLORS[idx % CHIP_COLORS.length]}`}
                          >
                            {item}
                            <button
                              onClick={() => removeItem(idx)}
                              className="ml-0.5 w-4 h-4 rounded-full flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                              aria-label={`${item} 제거`}
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

                  {items.length > 0 && (
                    <p className="mt-3 text-xs text-slate-400">{items.length}개 항목</p>
                  )}
                </div>

                {/* Winner count */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
                    당첨자 수
                  </h2>
                  <div className="flex items-center justify-center gap-6">
                    <button
                      onClick={() => setWinnerCount((n) => Math.max(1, n - 1))}
                      disabled={winnerCount <= 1}
                      className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-slate-700 dark:text-slate-200 text-2xl font-bold disabled:opacity-30 transition-colors flex items-center justify-center"
                    >
                      −
                    </button>
                    <div className="text-center">
                      <span className="text-5xl font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                        {winnerCount}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 ml-1 text-lg">명</span>
                    </div>
                    <button
                      onClick={() => setWinnerCount((n) => Math.min(Math.max(1, items.length - 1), n + 1))}
                      disabled={winnerCount >= items.length - 1 || items.length < 2}
                      className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-slate-700 dark:text-slate-200 text-2xl font-bold disabled:opacity-30 transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  {items.length >= 2 && (
                    <p className="text-center text-xs text-slate-400 mt-3">
                      전체 {items.length}개 중 {winnerCount}명 당첨 / {items.length - winnerCount}명 꽝
                    </p>
                  )}
                  {winnerCount >= items.length && items.length > 0 && (
                    <p className="text-center text-xs text-rose-500 mt-1">
                      당첨자 수는 전체 항목보다 적어야 합니다
                    </p>
                  )}
                </div>

                {/* Ad: setup bottom */}
                <AdBanner format="horizontal" className="rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

                {/* Start button */}
                <motion.button
                  onClick={startDraw}
                  disabled={!canStart}
                  whileHover={canStart ? { scale: 1.02 } : {}}
                  whileTap={canStart ? { scale: 0.97 } : {}}
                  className="w-full min-h-[56px] rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {items.length < 2
                    ? "항목을 2개 이상 추가하세요"
                    : winnerCount >= items.length
                    ? "당첨자 수를 줄여주세요"
                    : "🎴 추첨 시작!"}
                </motion.button>
              </motion.div>
            )}

            {/* ── DRAW PHASE ── */}
            {phase === "draw" && (
              <motion.div
                key="draw"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  {/* Status bar */}
                  <div className="text-center mb-6">
                    {isShuffling ? (
                      <motion.p
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.7, repeat: Infinity }}
                        className="text-lg font-bold text-amber-500"
                      >
                        🔀 카드를 섞는 중...
                      </motion.p>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <p className="text-lg font-bold text-slate-700 dark:text-slate-200">
                          카드를 탭해서 뒤집으세요!
                        </p>
                        <p className="text-sm text-slate-400 mt-1">
                          {cards.filter((c) => c.flipped).length} / {cards.length} 공개됨
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Card grid */}
                  <div className={`grid gap-3 ${cards.length <= 4 ? "grid-cols-2" : cards.length <= 6 ? "grid-cols-3" : "grid-cols-4"}`}>
                    {cards.map((card, idx) => (
                      <FlipCard
                        key={card.id}
                        card={card}
                        index={idx}
                        onFlip={flipCard}
                        isShuffling={isShuffling}
                        shuffleDelay={idx * 0.04}
                      />
                    ))}
                  </div>

                  {/* Flip all button */}
                  {!isShuffling && !allFlipped && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      onClick={flipAll}
                      className="w-full mt-6 min-h-[48px] rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-all active:scale-95"
                    >
                      전체 공개
                    </motion.button>
                  )}
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
                transition={{ duration: 0.4 }}
                className="space-y-4"
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
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-5xl mb-3"
                  >
                    🎊
                  </motion.div>
                  <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
                    추첨 완료!
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    전체 {cards.length}개 중 당첨 {winners.length}명
                  </p>
                </motion.div>

                {/* Winners */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 rounded-2xl p-5 border border-amber-200/60 dark:border-amber-700/40"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">🎉</span>
                    <h3 className="text-base font-bold text-amber-700 dark:text-amber-300">
                      당첨 ({winners.length}명)
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {winners.map((c, i) => (
                      <motion.span
                        key={c.id}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 300 }}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold text-sm shadow-sm"
                      >
                        {c.label}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Losers */}
                {losers.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">😢</span>
                      <h3 className="text-base font-bold text-slate-600 dark:text-slate-300">
                        꽝 ({losers.length}명)
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {losers.map((c, i) => (
                        <motion.span
                          key={c.id}
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.45 + i * 0.06, type: "spring", stiffness: 300 }}
                          className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-medium text-sm"
                        >
                          {c.label}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Ad: after results */}
                <AdBanner format="rectangle" className="mt-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
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
                    onClick={redraw}
                    className="min-h-[48px] rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm hover:from-amber-600 hover:to-orange-600 transition-all active:scale-95 shadow-sm"
                  >
                    다시 뽑기
                  </button>
                  <button
                    onClick={resetAll}
                    className="min-h-[48px] rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-all active:scale-95"
                  >
                    처음부터
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ad: page bottom */}
          <AdBanner format="in-article" className="mt-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

          {/* FAQ Section */}
          <section className="mt-16 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-slate-800 dark:text-slate-100">
              자주 묻는 질문
            </h2>
            <div className="space-y-4">
              <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-amber-500 transition-colors">
                  제비뽑기는 어떻게 사용하나요?
                  <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  추첨할 항목(이름, 팀명 등)을 입력하거나 프리셋을 선택한 후 당첨자 수를 정하세요. 추첨 시작 버튼을 누르면 카드가 섞이고, 각 카드를 탭해 당첨 여부를 공개할 수 있습니다.
                </div>
              </details>

              <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-amber-500 transition-colors">
                  추첨 결과가 정말 공정한가요?
                  <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  네! Fisher-Yates 셔플 알고리즘을 사용해 완전히 무작위로 당첨자를 결정합니다. 사전에 결과가 정해지지 않으며, 누구도 예측하거나 조작할 수 없어 공정한 추첨이 보장됩니다.
                </div>
              </details>

              <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-amber-500 transition-colors">
                  어떤 상황에서 활용할 수 있나요?
                  <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  당첨자 선발, 벌칙 뽑기, 순서 정하기, 경품 추첨, 파티 게임 등 다양한 상황에서 활용할 수 있습니다. 프리셋으로 당첨/꽝, 1·2·3등 추첨도 바로 시작할 수 있어요.
                </div>
              </details>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
