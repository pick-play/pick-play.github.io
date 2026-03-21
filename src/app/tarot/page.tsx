"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import tarotData from "@/data/tarot.json";

type TarotCard = (typeof tarotData.cards)[0];
type Phase = "input" | "select" | "reveal";
type Answer = "yes" | "no" | "maybe";

const ANSWER_CONFIG: Record<
  Answer,
  { label: string; color: string; bg: string; border: string; glow: string }
> = {
  yes: {
    label: "YES ✨",
    color: "text-emerald-400",
    bg: "bg-emerald-500/20",
    border: "border-emerald-500/50",
    glow: "shadow-emerald-500/30",
  },
  no: {
    label: "NO 🚫",
    color: "text-rose-400",
    bg: "bg-rose-500/20",
    border: "border-rose-500/50",
    glow: "shadow-rose-500/30",
  },
  maybe: {
    label: "MAYBE 🌙",
    color: "text-amber-400",
    bg: "bg-amber-500/20",
    border: "border-amber-500/50",
    glow: "shadow-amber-500/30",
  },
};

// Arc positions for 5 cards
const ARC_POSITIONS = [
  { rotate: -30, translateY: 20 },
  { rotate: -15, translateY: 6 },
  { rotate: 0, translateY: 0 },
  { rotate: 15, translateY: 6 },
  { rotate: 30, translateY: 20 },
];

function CardBack({ index, isSelected, isHidden, onClick }: {
  index: number;
  isSelected: boolean;
  isHidden: boolean;
  onClick: () => void;
}) {
  const arc = ARC_POSITIONS[index];

  return (
    <AnimatePresence>
      {!isHidden && (
        <motion.div
          key={`card-back-${index}`}
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{
            opacity: 1,
            y: arc.translateY,
            scale: isSelected ? 1.1 : 1,
            rotate: isSelected ? 0 : arc.rotate,
            zIndex: isSelected ? 10 : index,
          }}
          exit={{ opacity: 0, scale: 0.6, y: -20 }}
          transition={{ type: "spring", stiffness: 200, damping: 22, delay: index * 0.08 }}
          whileHover={!isSelected ? { scale: 1.08, y: arc.translateY - 12, transition: { duration: 0.2 } } : {}}
          onClick={onClick}
          className="cursor-pointer select-none"
          style={{ originX: "50%", originY: "100%" }}
        >
          {/* Card back face */}
          <div
            className="w-20 h-32 sm:w-24 sm:h-36 rounded-xl border-2 border-purple-400/60 relative overflow-hidden shadow-xl"
            style={{
              background: "linear-gradient(135deg, #4c1d95 0%, #3730a3 50%, #1e1b4b 100%)",
              boxShadow: isSelected
                ? "0 0 30px rgba(168, 85, 247, 0.6), 0 8px 32px rgba(0,0,0,0.5)"
                : "0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            {/* Decorative inner border */}
            <div className="absolute inset-1.5 rounded-lg border border-purple-400/30 pointer-events-none" />
            {/* Center emblem */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl mb-1 opacity-80">✦</div>
                <div className="text-[8px] text-purple-300/70 font-medium tracking-widest uppercase">Tarot</div>
              </div>
            </div>
            {/* Corner stars */}
            <div className="absolute top-2 left-2 text-purple-400/50 text-xs">★</div>
            <div className="absolute top-2 right-2 text-purple-400/50 text-xs">★</div>
            <div className="absolute bottom-2 left-2 text-purple-400/50 text-xs">★</div>
            <div className="absolute bottom-2 right-2 text-purple-400/50 text-xs">★</div>
            {/* Shimmer overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.04) 100%)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CardFront({ card, isFlipped }: { card: TarotCard; isFlipped: boolean }) {
  const answerCfg = ANSWER_CONFIG[card.answer as Answer];

  return (
    <div
      className="relative"
      style={{
        perspective: "1000px",
        width: "180px",
        height: "280px",
      }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 0 : 180 }}
        initial={{ rotateY: 180 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Back side (shown initially) */}
        <div
          className="absolute inset-0 rounded-2xl border-2 border-purple-400/60 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #4c1d95 0%, #3730a3 50%, #1e1b4b 100%)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          } as React.CSSProperties}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-5xl opacity-60">✦</div>
          </div>
        </div>

        {/* Front side (revealed after flip) */}
        <div
          className={`rounded-2xl border-2 overflow-hidden ${answerCfg.border}`}
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            position: "absolute",
            inset: 0,
            background: "linear-gradient(160deg, #1e1b4b 0%, #2d1b69 40%, #1a1040 100%)",
          } as React.CSSProperties}
        >
          <div className="flex flex-col items-center justify-center h-full p-4 gap-3">
            <div className="text-5xl">{card.emoji}</div>
            <div className="text-xs text-purple-300/70 font-medium tracking-widest uppercase text-center">
              {card.number}
            </div>
            <div className="text-sm font-bold text-amber-300 text-center leading-tight">
              {card.name}
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-extrabold ${answerCfg.color} ${answerCfg.bg} border ${answerCfg.border}`}
            >
              {answerCfg.label}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function TarotPage() {
  const [phase, setPhase] = useState<Phase>("input");
  const [question, setQuestion] = useState("");
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [drawnCard, setDrawnCard] = useState<TarotCard | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);

  const startCardSelection = useCallback(() => {
    if (!question.trim()) return;
    // Shuffle and pick 5 random cards
    const shuffled = [...tarotData.cards]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    setShuffledIndices(shuffled.map((c) => c.id));
    setPhase("select");
    setSelectedCardIndex(null);
    setDrawnCard(null);
    setIsFlipped(false);
  }, [question]);

  const selectCard = useCallback(
    (index: number) => {
      if (selectedCardIndex !== null) return;
      setSelectedCardIndex(index);
      const cardId = shuffledIndices[index];
      const card = tarotData.cards.find((c) => c.id === cardId)!;
      setDrawnCard(card);
      // Flip after cards animate out
      setTimeout(() => {
        setPhase("reveal");
        setTimeout(() => setIsFlipped(true), 400);
      }, 700);
    },
    [selectedCardIndex, shuffledIndices]
  );

  const resetAll = useCallback(() => {
    setPhase("input");
    setQuestion("");
    setSelectedCardIndex(null);
    setDrawnCard(null);
    setIsFlipped(false);
  }, []);

  const drawAgain = useCallback(() => {
    setSelectedCardIndex(null);
    setDrawnCard(null);
    setIsFlipped(false);
    setPhase("select");
    const shuffled = [...tarotData.cards]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    setShuffledIndices(shuffled.map((c) => c.id));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") startCardSelection();
  };

  const answerCfg = drawnCard ? ANSWER_CONFIG[drawnCard.answer as Answer] : null;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/80 to-indigo-950">
        {/* Decorative ambient orbs */}
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-0 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-lg mx-auto px-4 py-8 relative">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="text-4xl mb-3">🔮</div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent mb-2">
              Yes or No 타로
            </h1>
            <p className="text-purple-300/70 text-sm">
              22장의 메이저 아르카나가 답을 알려드립니다
            </p>
          </motion.div>

          {/* Phase 1: Question Input */}
          <AnimatePresence mode="wait">
            {phase === "input" && (
              <motion.div
                key="input-phase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 mb-4 shadow-xl">
                  <h2 className="text-amber-300 font-semibold text-sm uppercase tracking-wider mb-4 text-center">
                    ✦ 마음속의 질문을 적어보세요 ✦
                  </h2>
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="이 사람과 잘 될까?"
                    maxLength={60}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-400/60 text-sm mb-2"
                  />
                  <p className="text-purple-400/50 text-xs text-center mb-4">
                    예) 이직을 해야 할까? / 이 결정이 맞을까?
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={startCardSelection}
                    disabled={!question.trim()}
                    className="w-full py-3 rounded-xl font-bold text-sm text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    style={{
                      background: "linear-gradient(135deg, #f59e0b, #fbbf24, #f59e0b)",
                      boxShadow: question.trim() ? "0 0 20px rgba(245,158,11,0.4)" : "none",
                    }}
                  >
                    카드 뽑기 ✨
                  </motion.button>
                </div>

                <AdBanner
                  format="horizontal"
                  className="my-4 rounded-2xl bg-white/5 border border-purple-500/10 p-2"
                />

                {/* Mystical decoration */}
                <div className="text-center mt-6 space-y-2">
                  <div className="flex justify-center gap-6 text-purple-400/40 text-xs">
                    <span>♠ 신중함</span>
                    <span>♥ 사랑</span>
                    <span>♦ 운</span>
                    <span>♣ 지혜</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Phase 2: Card Selection */}
            {phase === "select" && (
              <motion.div
                key="select-phase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 mb-4 shadow-xl">
                  {/* Question display */}
                  <div className="text-center mb-6">
                    <p className="text-purple-300/60 text-xs uppercase tracking-wider mb-1">당신의 질문</p>
                    <p className="text-amber-300 font-medium text-sm">&ldquo;{question}&rdquo;</p>
                  </div>

                  <h2 className="text-white/80 font-semibold text-sm text-center mb-6">
                    ✦ 카드 한 장을 선택하세요 ✦
                  </h2>

                  {/* Arc of cards */}
                  <div className="flex justify-center items-end gap-2 mb-6 py-4" style={{ minHeight: "160px" }}>
                    {ARC_POSITIONS.map((_, i) => (
                      <CardBack
                        key={i}
                        index={i}
                        isSelected={selectedCardIndex === i}
                        isHidden={selectedCardIndex !== null && selectedCardIndex !== i}
                        onClick={() => selectCard(i)}
                      />
                    ))}
                  </div>

                  <p className="text-purple-400/50 text-xs text-center">
                    직감이 이끄는 카드를 선택하세요
                  </p>
                </div>
              </motion.div>
            )}

            {/* Phase 3: Reveal */}
            {phase === "reveal" && drawnCard && answerCfg && (
              <motion.div
                key="reveal-phase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Question display */}
                <div className="text-center mb-4">
                  <p className="text-purple-300/60 text-xs uppercase tracking-wider mb-1">당신의 질문</p>
                  <p className="text-amber-300 font-medium text-sm">&ldquo;{question}&rdquo;</p>
                </div>

                {/* Card flip area */}
                <div className="flex justify-center mb-6">
                  <CardFront card={drawnCard} isFlipped={isFlipped} />
                </div>

                {/* Result details */}
                <AnimatePresence>
                  {isFlipped && (
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      {/* Answer badge */}
                      <div className="text-center mb-4">
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
                          className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-xl font-extrabold border-2 shadow-lg ${answerCfg.color} ${answerCfg.bg} ${answerCfg.border} ${answerCfg.glow}`}
                          style={{ boxShadow: `0 0 24px var(--tw-shadow-color)` }}
                        >
                          {answerCfg.label}
                        </motion.div>
                      </div>

                      {/* Card info */}
                      <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-5 mb-4 shadow-xl">
                        <div className="text-center mb-4">
                          <div className="text-4xl mb-2">{drawnCard.emoji}</div>
                          <h2 className="text-amber-300 font-bold text-lg">{drawnCard.name}</h2>
                          <p className="text-purple-300/60 text-xs mt-1">{drawnCard.meaning}</p>
                        </div>

                        {/* Keywords */}
                        <div className="flex justify-center gap-2 mb-4">
                          {drawnCard.keywords.map((kw) => (
                            <span
                              key={kw}
                              className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>

                        {/* Interpretation */}
                        <div className="bg-white/5 rounded-xl p-4 mb-3">
                          <p className="text-white/80 text-sm leading-relaxed text-center">
                            {drawnCard.interpretation}
                          </p>
                        </div>

                        {/* Advice */}
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-3">
                          <p className="text-amber-300/80 text-xs font-semibold uppercase tracking-wider mb-1 text-center">
                            ✦ 오늘의 조언
                          </p>
                          <p className="text-amber-200/70 text-sm leading-relaxed text-center">
                            {drawnCard.advice}
                          </p>
                        </div>

                        {/* Lucky info */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white/5 rounded-xl p-3 text-center">
                            <p className="text-purple-400/60 text-xs mb-1">행운의 색</p>
                            <p className="text-white font-semibold text-sm">{drawnCard.luckyColor}</p>
                          </div>
                          <div className="bg-white/5 rounded-xl p-3 text-center">
                            <p className="text-purple-400/60 text-xs mb-1">행운의 숫자</p>
                            <p className="text-white font-semibold text-sm">{drawnCard.luckyNumber}</p>
                          </div>
                        </div>
                      </div>

                      <AdBanner
                        format="rectangle"
                        className="my-4 rounded-2xl bg-white/5 border border-purple-500/10 p-2"
                      />

                      {/* Action buttons */}
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={drawAgain}
                          className="flex-1 py-3 rounded-xl font-bold text-sm text-white border border-purple-400/40 bg-white/5 hover:bg-white/10 transition-all"
                        >
                          다시 뽑기 🃏
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={resetAll}
                          className="flex-1 py-3 rounded-xl font-bold text-sm text-slate-950 transition-all"
                          style={{
                            background: "linear-gradient(135deg, #f59e0b, #fbbf24, #f59e0b)",
                          }}
                        >
                          다른 질문 ✨
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          <AdBanner
            format="in-article"
            className="mt-6 rounded-2xl bg-white/5 border border-purple-500/10 p-2"
          />

          {/* FAQ Section */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6"
          >
            <h2 className="text-amber-300 font-bold text-sm uppercase tracking-wider mb-4 text-center">
              ✦ 자주 묻는 질문
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-white/80 font-semibold text-sm mb-1">
                  타로 카드 결과를 맹신해도 되나요?
                </h3>
                <p className="text-purple-300/60 text-xs leading-relaxed">
                  타로 카드는 재미와 영감을 위한 도구입니다. 결과를 맹신하기보다는 자신의 직관과 상황을 함께 고려해 참고용으로 활용하세요.
                </p>
              </div>
              <div className="border-t border-purple-500/10 pt-4">
                <h3 className="text-white/80 font-semibold text-sm mb-1">
                  메이저 아르카나가 무엇인가요?
                </h3>
                <p className="text-purple-300/60 text-xs leading-relaxed">
                  타로 78장 중 22장의 주요 카드로, 바보(0번)부터 세계(21번)까지 삶의 중요한 여정을 상징합니다. 강력한 메시지를 전달해 Yes or No 타로에 최적화되어 있습니다.
                </p>
              </div>
              <div className="border-t border-purple-500/10 pt-4">
                <h3 className="text-white/80 font-semibold text-sm mb-1">
                  같은 질문으로 여러 번 뽑아도 되나요?
                </h3>
                <p className="text-purple-300/60 text-xs leading-relaxed">
                  물론입니다! 매번 랜덤으로 카드가 선택됩니다. 다만 타로는 그 순간의 에너지를 반영하므로, 다른 결과가 나올 수 있어요.
                </p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
}
