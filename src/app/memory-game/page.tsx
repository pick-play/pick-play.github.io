"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/i18n/config";

// ── Translations ─────────────────────────────────────────────────────────────

const translations: Record<Locale, {
  title: string;
  subtitle: string;
  easy: string;
  medium: string;
  hard: string;
  easyDesc: string;
  mediumDesc: string;
  hardDesc: string;
  moves: string;
  time: string;
  pairs: string;
  playAgain: string;
  changeDifficulty: string;
  chooseDifficulty: string;
  congratulations: string;
  completedIn: string;
  movesLabel: string;
  stars3: string;
  stars2: string;
  stars1: string;
  bestTime: string;
  newRecord: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
}> = {
  ko: {
    title: "기억력 게임",
    subtitle: "카드를 뒤집어 짝을 맞추세요",
    easy: "쉬움",
    medium: "보통",
    hard: "어려움",
    easyDesc: "4×3 (6쌍)",
    mediumDesc: "4×4 (8쌍)",
    hardDesc: "6×4 (12쌍)",
    moves: "이동",
    time: "시간",
    pairs: "쌍",
    playAgain: "다시 하기",
    changeDifficulty: "난이도 변경",
    chooseDifficulty: "난이도를 선택하세요",
    congratulations: "완료!",
    completedIn: "완료했습니다",
    movesLabel: "이동 횟수",
    stars3: "완벽해요!",
    stars2: "잘 했어요!",
    stars1: "계속 도전!",
    bestTime: "최고 기록",
    newRecord: "신기록!",
    faqTitle: "자주 묻는 질문",
    faq: [
      {
        q: "기억력 게임이란 무엇인가요?",
        a: "카드를 두 장씩 뒤집어 같은 그림의 짝을 찾는 게임입니다. 모든 카드의 짝을 맞추면 게임이 끝납니다.",
      },
      {
        q: "별점은 어떻게 결정되나요?",
        a: "이동 횟수가 적을수록 높은 별점을 받습니다. 쉬움: 12회 이하 ⭐⭐⭐, 보통: 16회 이하 ⭐⭐⭐, 어려움: 24회 이하 ⭐⭐⭐",
      },
      {
        q: "최고 기록은 어디에 저장되나요?",
        a: "최고 기록은 브라우저의 로컬 저장소에 저장됩니다. 브라우저 데이터를 지우면 초기화됩니다.",
      },
    ],
  },
  en: {
    title: "Memory Card Game",
    subtitle: "Flip cards to find matching pairs",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    easyDesc: "4×3 (6 pairs)",
    mediumDesc: "4×4 (8 pairs)",
    hardDesc: "6×4 (12 pairs)",
    moves: "Moves",
    time: "Time",
    pairs: "Pairs",
    playAgain: "Play Again",
    changeDifficulty: "Change Difficulty",
    chooseDifficulty: "Choose Difficulty",
    congratulations: "Complete!",
    completedIn: "You finished!",
    movesLabel: "Total Moves",
    stars3: "Perfect!",
    stars2: "Well done!",
    stars1: "Keep trying!",
    bestTime: "Best Time",
    newRecord: "New Record!",
    faqTitle: "FAQ",
    faq: [
      {
        q: "How do you play?",
        a: "Flip two cards at a time to find matching pairs. Match all pairs to win!",
      },
      {
        q: "How is the star rating determined?",
        a: "Fewer moves = more stars. Easy: ≤12 moves ⭐⭐⭐, Medium: ≤16 ⭐⭐⭐, Hard: ≤24 ⭐⭐⭐",
      },
      {
        q: "Where is the best time stored?",
        a: "Best times are saved in your browser's local storage. Clearing browser data will reset them.",
      },
    ],
  },
  ja: {
    title: "神経衰弱ゲーム",
    subtitle: "カードをめくってペアを見つけよう",
    easy: "かんたん",
    medium: "ふつう",
    hard: "むずかしい",
    easyDesc: "4×3（6ペア）",
    mediumDesc: "4×4（8ペア）",
    hardDesc: "6×4（12ペア）",
    moves: "手数",
    time: "時間",
    pairs: "ペア",
    playAgain: "もう一度",
    changeDifficulty: "難易度変更",
    chooseDifficulty: "難易度を選んでください",
    congratulations: "クリア！",
    completedIn: "完了しました",
    movesLabel: "総手数",
    stars3: "パーフェクト！",
    stars2: "よくできました！",
    stars1: "頑張れ！",
    bestTime: "ベストタイム",
    newRecord: "新記録！",
    faqTitle: "よくある質問",
    faq: [
      {
        q: "ゲームのルールは？",
        a: "2枚のカードをめくって同じ絵柄のペアを探します。すべてのペアを揃えたらクリアです。",
      },
      {
        q: "星の数はどう決まりますか？",
        a: "手数が少ないほど高評価です。かんたん：12手以下 ⭐⭐⭐、ふつう：16手以下 ⭐⭐⭐、むずかしい：24手以下 ⭐⭐⭐",
      },
      {
        q: "ベストタイムはどこに保存されますか？",
        a: "ブラウザのローカルストレージに保存されます。ブラウザデータを消去するとリセットされます。",
      },
    ],
  },
  zh: {
    title: "记忆翻牌游戏",
    subtitle: "翻转卡片找到配对",
    easy: "简单",
    medium: "普通",
    hard: "困难",
    easyDesc: "4×3（6对）",
    mediumDesc: "4×4（8对）",
    hardDesc: "6×4（12对）",
    moves: "步数",
    time: "时间",
    pairs: "对",
    playAgain: "再玩一次",
    changeDifficulty: "更改难度",
    chooseDifficulty: "选择难度",
    congratulations: "完成！",
    completedIn: "你完成了",
    movesLabel: "总步数",
    stars3: "完美！",
    stars2: "做得好！",
    stars1: "继续加油！",
    bestTime: "最佳时间",
    newRecord: "新纪录！",
    faqTitle: "常见问题",
    faq: [
      {
        q: "游戏怎么玩？",
        a: "每次翻两张牌，找到相同图案的配对。配对所有卡片即可获胜！",
      },
      {
        q: "星级评分如何确定？",
        a: "步数越少星级越高。简单：12步以内 ⭐⭐⭐，普通：16步以内 ⭐⭐⭐，困难：24步以内 ⭐⭐⭐",
      },
      {
        q: "最佳时间保存在哪里？",
        a: "最佳时间保存在浏览器的本地存储中。清除浏览器数据将重置记录。",
      },
    ],
  },
  es: {
    title: "Juego de Memoria",
    subtitle: "Voltea las cartas y encuentra los pares",
    easy: "Fácil",
    medium: "Medio",
    hard: "Difícil",
    easyDesc: "4×3 (6 pares)",
    mediumDesc: "4×4 (8 pares)",
    hardDesc: "6×4 (12 pares)",
    moves: "Movimientos",
    time: "Tiempo",
    pairs: "Pares",
    playAgain: "Jugar de nuevo",
    changeDifficulty: "Cambiar dificultad",
    chooseDifficulty: "Elige la dificultad",
    congratulations: "¡Completado!",
    completedIn: "¡Lo lograste!",
    movesLabel: "Total movimientos",
    stars3: "¡Perfecto!",
    stars2: "¡Bien hecho!",
    stars1: "¡Sigue intentando!",
    bestTime: "Mejor tiempo",
    newRecord: "¡Nuevo récord!",
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Cómo se juega?",
        a: "Voltea dos cartas a la vez para encontrar pares iguales. ¡Empareja todas para ganar!",
      },
      {
        q: "¿Cómo se determina la puntuación de estrellas?",
        a: "Menos movimientos = más estrellas. Fácil: ≤12 ⭐⭐⭐, Medio: ≤16 ⭐⭐⭐, Difícil: ≤24 ⭐⭐⭐",
      },
      {
        q: "¿Dónde se guarda el mejor tiempo?",
        a: "Los mejores tiempos se guardan en el almacenamiento local de tu navegador. Borrar los datos del navegador los reiniciará.",
      },
    ],
  },
};

// ── Types & Constants ─────────────────────────────────────────────────────────

type Difficulty = "easy" | "medium" | "hard";

interface Card {
  id: number;
  emoji: string;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

const EMOJIS = ["🍕", "🎮", "⚽", "🎸", "🌸", "🎪", "🦁", "🌈", "🍦", "🎯", "🚀", "💎"];

const DIFFICULTY_CONFIG: Record<Difficulty, { cols: number; rows: number; pairs: number; perfectMoves: number }> = {
  easy: { cols: 4, rows: 3, pairs: 6, perfectMoves: 12 },
  medium: { cols: 4, rows: 4, pairs: 8, perfectMoves: 16 },
  hard: { cols: 6, rows: 4, pairs: 12, perfectMoves: 24 },
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function getStars(difficulty: Difficulty, moves: number): number {
  const { perfectMoves } = DIFFICULTY_CONFIG[difficulty];
  if (moves <= perfectMoves) return 3;
  if (moves <= perfectMoves * 1.5) return 2;
  return 1;
}

function createDeck(pairs: number): Card[] {
  const emojis = EMOJIS.slice(0, pairs);
  const cards: Card[] = [];
  emojis.forEach((emoji, i) => {
    cards.push({ id: i * 2, emoji, pairId: i, isFlipped: false, isMatched: false });
    cards.push({ id: i * 2 + 1, emoji, pairId: i, isFlipped: false, isMatched: false });
  });
  // Fisher-Yates shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

// ── Confetti ──────────────────────────────────────────────────────────────────

function ConfettiPiece({ x, color, delay }: { x: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute top-0 w-2 h-3 rounded-sm pointer-events-none"
      style={{ left: `${x}%`, backgroundColor: color }}
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{
        y: "100vh",
        opacity: [1, 1, 0],
        rotate: [0, 180, 360, 540],
        x: [0, Math.random() * 80 - 40],
      }}
      transition={{ duration: 2 + Math.random(), delay, ease: "easeIn" }}
    />
  );
}

function Confetti() {
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    x: Math.random() * 100,
    color: ["#f472b6", "#a855f7", "#60a5fa", "#34d399", "#fbbf24", "#f87171"][i % 6],
    delay: Math.random() * 0.5,
  }));
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {pieces.map((p, i) => (
        <ConfettiPiece key={i} {...p} />
      ))}
    </div>
  );
}

// ── Card Component ────────────────────────────────────────────────────────────

function MemoryCard({
  card,
  onClick,
  disabled,
}: {
  card: Card;
  onClick: () => void;
  disabled: boolean;
}) {
  const isVisible = card.isFlipped || card.isMatched;
  return (
    <button
      onClick={onClick}
      disabled={disabled || card.isMatched}
      className="relative w-full aspect-square"
      style={{ perspective: "600px" }}
      aria-label={isVisible ? card.emoji : "Hidden card"}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isVisible ? 180 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {/* Back face */}
        <div
          className="absolute inset-0 rounded-xl shadow-md flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            background: "linear-gradient(135deg, #d946ef 0%, #a855f7 50%, #ec4899 100%)",
          }}
        >
          <span className="text-white text-2xl font-bold opacity-60 select-none">?</span>
        </div>
        {/* Front face */}
        <div
          className={`absolute inset-0 rounded-xl shadow-md flex items-center justify-center bg-white
            ${card.isMatched ? "ring-4 ring-emerald-400 ring-offset-2" : ""}`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <span className="text-3xl sm:text-4xl select-none">{card.emoji}</span>
        </div>
      </motion.div>
    </button>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function MemoryGamePage() {
  const locale = useLocale();
  const t = translations[locale];

  const [screen, setScreen] = useState<"select" | "game" | "result">("select");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [pairs, setPairs] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [bestTimes, setBestTimes] = useState<Record<Difficulty, number | null>>({
    easy: null,
    medium: null,
    hard: null,
  });
  const [isNewRecord, setIsNewRecord] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load best times from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("memoryGameBestTimes");
      if (stored) {
        setBestTimes(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
  }, [stopTimer]);

  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  const startGame = useCallback((diff: Difficulty) => {
    setDifficulty(diff);
    const config = DIFFICULTY_CONFIG[diff];
    setCards(createDeck(config.pairs));
    setFlipped([]);
    setMoves(0);
    setPairs(0);
    setElapsed(0);
    setIsChecking(false);
    setShowConfetti(false);
    setIsNewRecord(false);
    setScreen("game");
    // Timer starts on first flip
  }, []);

  const handleCardClick = useCallback(
    (cardId: number) => {
      if (isChecking) return;
      if (flipped.length === 2) return;
      if (flipped.includes(cardId)) return;

      const newFlipped = [...flipped, cardId];
      setFlipped(newFlipped);

      // Start timer on first flip
      if (moves === 0 && flipped.length === 0) {
        startTimer();
      }

      if (newFlipped.length === 2) {
        const [a, b] = newFlipped;
        const cardA = cards.find((c) => c.id === a)!;
        const cardB = cards.find((c) => c.id === b)!;
        // Flip the second card visually
        setCards((prev) =>
          prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
        );
        const nextMoves = moves + 1;
        setMoves(nextMoves);
        setIsChecking(true);

        if (cardA.pairId === cardB.pairId) {
          // Match
          const nextPairs = pairs + 1;
          const totalPairs = DIFFICULTY_CONFIG[difficulty].pairs;
          setCards((prev) =>
            prev.map((c) =>
              c.id === a || c.id === b ? { ...c, isMatched: true, isFlipped: true } : c
            )
          );
          setFlipped([]);
          setPairs(nextPairs);
          setIsChecking(false);

          if (nextPairs === totalPairs) {
            stopTimer();
            // Save best time
            const currentBest = bestTimes[difficulty];
            let newRecord = false;
            if (currentBest === null || elapsed + 1 < currentBest) {
              newRecord = true;
              const updated = { ...bestTimes, [difficulty]: elapsed + 1 };
              setBestTimes(updated);
              try {
                localStorage.setItem("memoryGameBestTimes", JSON.stringify(updated));
              } catch {
                // ignore
              }
            }
            setIsNewRecord(newRecord);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 2500);
            setTimeout(() => setScreen("result"), 600);
          }
        } else {
          // No match — flip back after 0.8s
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === a || c.id === b ? { ...c, isFlipped: false } : c
              )
            );
            setFlipped([]);
            setIsChecking(false);
          }, 800);
        }
      } else {
        setCards((prev) =>
          prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
        );
      }
    },
    [isChecking, flipped, moves, cards, pairs, difficulty, elapsed, bestTimes, startTimer, stopTimer]
  );

  const config = DIFFICULTY_CONFIG[difficulty];
  const stars = screen === "result" ? getStars(difficulty, moves) : 0;

  const gridCols =
    difficulty === "hard"
      ? "grid-cols-6"
      : difficulty === "medium"
      ? "grid-cols-4"
      : "grid-cols-4";

  const maxW = difficulty === "hard" ? "max-w-2xl" : "max-w-lg";

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-pink-50 py-8 px-4">
        {showConfetti && <Confetti />}

        <div className={`${maxW} mx-auto`}>
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-gray-500 mt-1">{t.subtitle}</p>
          </div>

          <AdBanner format="horizontal" className="mb-6" />

          {/* Difficulty Select Screen */}
          <AnimatePresence mode="wait">
            {screen === "select" && (
              <motion.div
                key="select"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="space-y-4"
              >
                <h2 className="text-center text-xl font-semibold text-gray-700 mb-4">
                  {t.chooseDifficulty}
                </h2>
                {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => startGame(diff)}
                    className="w-full rounded-2xl p-5 text-left shadow-md hover:shadow-lg transition-all
                      bg-white border-2 border-transparent hover:border-fuchsia-400 group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-gray-800 group-hover:text-fuchsia-600 transition-colors">
                          {t[diff]}
                        </span>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {diff === "easy" ? t.easyDesc : diff === "medium" ? t.mediumDesc : t.hardDesc}
                        </p>
                      </div>
                      <div className="text-3xl">
                        {diff === "easy" ? "😊" : diff === "medium" ? "🤔" : "😤"}
                      </div>
                    </div>
                    {bestTimes[diff] !== null && (
                      <p className="text-xs text-fuchsia-500 mt-2 font-medium">
                        {t.bestTime}: {formatTime(bestTimes[diff]!)}
                      </p>
                    )}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Game Screen */}
            {screen === "game" && (
              <motion.div
                key="game"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
              >
                {/* Stats bar */}
                <div className="flex justify-around bg-white rounded-2xl shadow-sm p-3 mb-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">{t.moves}</p>
                    <p className="text-xl font-bold text-fuchsia-600">{moves}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">{t.time}</p>
                    <p className="text-xl font-bold text-pink-600">{formatTime(elapsed)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">{t.pairs}</p>
                    <p className="text-xl font-bold text-purple-600">
                      {pairs}/{config.pairs}
                    </p>
                  </div>
                </div>

                {/* Card grid */}
                <div className={`grid ${gridCols} gap-2 sm:gap-3`}>
                  {cards.map((card) => (
                    <MemoryCard
                      key={card.id}
                      card={card}
                      onClick={() => handleCardClick(card.id)}
                      disabled={isChecking || flipped.length === 2}
                    />
                  ))}
                </div>

                <button
                  onClick={() => { stopTimer(); setScreen("select"); }}
                  className="mt-5 w-full text-sm text-gray-400 hover:text-fuchsia-500 transition-colors py-2"
                >
                  {t.changeDifficulty}
                </button>
              </motion.div>
            )}

            {/* Result Screen */}
            {screen === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-xl p-8 text-center"
              >
                <p className="text-5xl mb-2">
                  {stars === 3 ? "🏆" : stars === 2 ? "🥈" : "🥉"}
                </p>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent mb-1">
                  {t.congratulations}
                </h2>
                <p className="text-gray-500 mb-4">{t.completedIn}</p>

                {/* Stars */}
                <div className="flex justify-center gap-1 text-4xl mb-4">
                  {[1, 2, 3].map((n) => (
                    <motion.span
                      key={n}
                      initial={{ scale: 0 }}
                      animate={{ scale: n <= stars ? 1 : 0.4, opacity: n <= stars ? 1 : 0.25 }}
                      transition={{ delay: n * 0.15, type: "spring", stiffness: 300 }}
                    >
                      ⭐
                    </motion.span>
                  ))}
                </div>

                <p className="text-sm font-semibold text-fuchsia-600 mb-4">
                  {stars === 3 ? t.stars3 : stars === 2 ? t.stars2 : t.stars1}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-fuchsia-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400">{t.movesLabel}</p>
                    <p className="text-2xl font-bold text-fuchsia-600">{moves}</p>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400">{t.time}</p>
                    <p className="text-2xl font-bold text-pink-600">{formatTime(elapsed)}</p>
                  </div>
                </div>

                {isNewRecord && (
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-fuchsia-500 font-bold mb-3"
                  >
                    🎉 {t.newRecord}
                  </motion.p>
                )}

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => startGame(difficulty)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500
                      text-white font-bold text-lg shadow-md hover:shadow-lg hover:opacity-90 transition-all"
                  >
                    {t.playAgain}
                  </button>
                  <button
                    onClick={() => setScreen("select")}
                    className="w-full py-3 rounded-xl border-2 border-fuchsia-300 text-fuchsia-600
                      font-semibold hover:bg-fuchsia-50 transition-all"
                  >
                    {t.changeDifficulty}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ad between game and FAQ */}
          <AdBanner format="in-article" className="my-8" />

          {/* FAQ */}
          <section className="mt-2">
            <h2 className="text-xl font-bold text-gray-700 mb-4">{t.faqTitle}</h2>
            <div className="space-y-3">
              {t.faq.map((item, i) => (
                <details
                  key={i}
                  className="bg-white rounded-xl shadow-sm p-4 group cursor-pointer"
                >
                  <summary className="font-semibold text-gray-800 list-none flex justify-between items-center">
                    {item.q}
                    <span className="text-fuchsia-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-2 text-gray-600 text-sm leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <AdBanner format="rectangle" className="mt-8" />
        </div>
      </div>
    </PageTransition>
  );
}
