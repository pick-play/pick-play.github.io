"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/i18n/config";

const translations: Record<Locale, {
  title: string;
  subtitle: string;
  easy: string;
  medium: string;
  hard: string;
  start: string;
  timeLeft: string;
  hits: string;
  misses: string;
  accuracy: string;
  score: string;
  gameOver: string;
  totalHits: string;
  avgReaction: string;
  highScore: string;
  newRecord: string;
  playAgain: string;
  changeDifficulty: string;
  ms: string;
  easyDesc: string;
  mediumDesc: string;
  hardDesc: string;
  sec: string;
}> = {
  ko: {
    title: "에임 트레이너",
    subtitle: "마우스 정확도와 반응속도를 훈련하세요",
    easy: "쉬움",
    medium: "보통",
    hard: "어려움",
    start: "시작하기",
    timeLeft: "남은 시간",
    hits: "맞춤",
    misses: "빗나감",
    accuracy: "정확도",
    score: "점수",
    gameOver: "게임 종료!",
    totalHits: "총 적중 수",
    avgReaction: "평균 반응 시간",
    highScore: "최고 점수",
    newRecord: "신기록!",
    playAgain: "다시 하기",
    changeDifficulty: "난이도 변경",
    ms: "ms",
    easyDesc: "큰 타겟 · 1.5초마다",
    mediumDesc: "중간 타겟 · 1초마다",
    hardDesc: "작은 타겟 · 0.7초마다",
    sec: "초",
  },
  en: {
    title: "Aim Trainer",
    subtitle: "Train your mouse accuracy and reaction speed",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    start: "Start",
    timeLeft: "Time Left",
    hits: "Hits",
    misses: "Misses",
    accuracy: "Accuracy",
    score: "Score",
    gameOver: "Game Over!",
    totalHits: "Total Hits",
    avgReaction: "Avg Reaction",
    highScore: "High Score",
    newRecord: "New Record!",
    playAgain: "Play Again",
    changeDifficulty: "Change Difficulty",
    ms: "ms",
    easyDesc: "Large targets · every 1.5s",
    mediumDesc: "Medium targets · every 1s",
    hardDesc: "Small targets · every 0.7s",
    sec: "s",
  },
  ja: {
    title: "エイムトレーナー",
    subtitle: "マウスの精度と反応速度をトレーニング",
    easy: "かんたん",
    medium: "ふつう",
    hard: "むずかしい",
    start: "スタート",
    timeLeft: "残り時間",
    hits: "ヒット",
    misses: "ミス",
    accuracy: "精度",
    score: "スコア",
    gameOver: "ゲームオーバー！",
    totalHits: "総ヒット数",
    avgReaction: "平均反応時間",
    highScore: "ハイスコア",
    newRecord: "新記録！",
    playAgain: "もう一度",
    changeDifficulty: "難易度を変更",
    ms: "ms",
    easyDesc: "大きいターゲット · 1.5秒ごと",
    mediumDesc: "中くらいのターゲット · 1秒ごと",
    hardDesc: "小さいターゲット · 0.7秒ごと",
    sec: "秒",
  },
  zh: {
    title: "瞄准训练器",
    subtitle: "训练你的鼠标精度和反应速度",
    easy: "简单",
    medium: "普通",
    hard: "困难",
    start: "开始",
    timeLeft: "剩余时间",
    hits: "命中",
    misses: "未中",
    accuracy: "准确率",
    score: "分数",
    gameOver: "游戏结束！",
    totalHits: "总命中数",
    avgReaction: "平均反应时间",
    highScore: "最高分",
    newRecord: "新纪录！",
    playAgain: "再玩一次",
    changeDifficulty: "更改难度",
    ms: "ms",
    easyDesc: "「大目标」每1.5秒",
    mediumDesc: "「中目标」每1秒",
    hardDesc: "「小目标」每0.7秒",
    sec: "秒",
  },
  es: {
    title: "Entrenador de Puntería",
    subtitle: "Entrena la precisión y velocidad de reacción del ratón",
    easy: "Fácil",
    medium: "Medio",
    hard: "Difícil",
    start: "Comenzar",
    timeLeft: "Tiempo",
    hits: "Aciertos",
    misses: "Fallos",
    accuracy: "Precisión",
    score: "Puntos",
    gameOver: "¡Juego Terminado!",
    totalHits: "Total Aciertos",
    avgReaction: "Reacción Media",
    highScore: "Récord",
    newRecord: "¡Nuevo Récord!",
    playAgain: "Jugar de Nuevo",
    changeDifficulty: "Cambiar Dificultad",
    ms: "ms",
    easyDesc: "Blancos grandes · cada 1.5s",
    mediumDesc: "Blancos medianos · cada 1s",
    hardDesc: "Blancos pequeños · cada 0.7s",
    sec: "s",
  },
};

type Difficulty = "easy" | "medium" | "hard";
type GameState = "idle" | "playing" | "results";

interface Target {
  id: number;
  x: number;
  y: number;
  size: number;
  spawnTime: number;
}

interface FloatingText {
  id: number;
  x: number;
  y: number;
}

const DIFFICULTY_CONFIG: Record<Difficulty, { size: number; interval: number; lifetime: number; color: string }> = {
  easy: { size: 60, interval: 1500, lifetime: 2000, color: "from-green-400 to-emerald-500" },
  medium: { size: 40, interval: 1000, lifetime: 1500, color: "from-orange-400 to-amber-500" },
  hard: { size: 25, interval: 700, lifetime: 1000, color: "from-red-400 to-pink-500" },
};

const GAME_DURATION = 30;

export default function AimTestPage() {
  const locale = useLocale();
  const t = translations[locale];

  const [gameState, setGameState] = useState<GameState>("idle");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [target, setTarget] = useState<Target | null>(null);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [flashRed, setFlashRed] = useState(false);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [highScores, setHighScores] = useState<Record<Difficulty, number>>({ easy: 0, medium: 0, hard: 0 });
  const [isNewRecord, setIsNewRecord] = useState(false);

  const gameAreaRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const targetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const targetIdRef = useRef(0);
  const floatIdRef = useRef(0);
  const hitsRef = useRef(0);
  const missesRef = useRef(0);
  const reactionTimesRef = useRef<number[]>([]);

  // Load high scores
  useEffect(() => {
    try {
      const saved = localStorage.getItem("aim-test-highscores");
      if (saved) setHighScores(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  const saveHighScore = useCallback((diff: Difficulty, score: number) => {
    setHighScores((prev) => {
      const next = { ...prev, [diff]: Math.max(prev[diff], score) };
      try { localStorage.setItem("aim-test-highscores", JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const spawnTarget = useCallback(() => {
    if (!gameAreaRef.current) return;
    const area = gameAreaRef.current.getBoundingClientRect();
    const config = DIFFICULTY_CONFIG[difficulty];
    const halfSize = config.size / 2;
    const x = halfSize + Math.random() * (area.width - config.size);
    const y = halfSize + Math.random() * (area.height - config.size);

    targetIdRef.current += 1;
    const id = targetIdRef.current;
    setTarget({ id, x, y, size: config.size, spawnTime: Date.now() });

    // Auto-expire target
    targetTimerRef.current = setTimeout(() => {
      setTarget((curr) => {
        if (curr?.id === id) {
          missesRef.current += 1;
          setMisses(missesRef.current);
          setFlashRed(true);
          setTimeout(() => setFlashRed(false), 200);
          return null;
        }
        return curr;
      });
      spawnTarget();
    }, config.lifetime);
  }, [difficulty]);

  const startGame = useCallback(() => {
    hitsRef.current = 0;
    missesRef.current = 0;
    reactionTimesRef.current = [];
    setHits(0);
    setMisses(0);
    setTimeLeft(GAME_DURATION);
    setReactionTimes([]);
    setTarget(null);
    setFlashRed(false);
    setFloatingTexts([]);
    setIsNewRecord(false);
    setGameState("playing");
  }, []);

  // Game timer
  useEffect(() => {
    if (gameState !== "playing") return;

    spawnTarget();

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          if (targetTimerRef.current) clearTimeout(targetTimerRef.current);
          setTarget(null);
          setGameState("results");

          const finalHits = hitsRef.current;
          const saved = (() => {
            try {
              const s = localStorage.getItem("aim-test-highscores");
              return s ? JSON.parse(s) : { easy: 0, medium: 0, hard: 0 };
            } catch { return { easy: 0, medium: 0, hard: 0 }; }
          })();
          if (finalHits > (saved[difficulty] || 0)) {
            setIsNewRecord(true);
          }
          saveHighScore(difficulty, finalHits);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerRef.current!);
      if (targetTimerRef.current) clearTimeout(targetTimerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  const handleTargetClick = useCallback((e: React.MouseEvent, tgt: Target) => {
    e.stopPropagation();
    if (targetTimerRef.current) clearTimeout(targetTimerRef.current);

    const reactionTime = Date.now() - tgt.spawnTime;
    reactionTimesRef.current = [...reactionTimesRef.current, reactionTime];
    setReactionTimes([...reactionTimesRef.current]);

    hitsRef.current += 1;
    setHits(hitsRef.current);

    // Floating +1
    const rect = gameAreaRef.current?.getBoundingClientRect();
    if (rect) {
      floatIdRef.current += 1;
      const fid = floatIdRef.current;
      const fx = tgt.x;
      const fy = tgt.y;
      setFloatingTexts((prev) => [...prev, { id: fid, x: fx, y: fy }]);
      setTimeout(() => {
        setFloatingTexts((prev) => prev.filter((f) => f.id !== fid));
      }, 700);
    }

    setTarget(null);
    spawnTarget();
  }, [spawnTarget]);

  const handleAreaClick = useCallback(() => {
    if (gameState !== "playing") return;
    missesRef.current += 1;
    setMisses(missesRef.current);
    setFlashRed(true);
    setTimeout(() => setFlashRed(false), 200);
  }, [gameState]);

  const totalShots = hits + misses;
  const accuracyPct = totalShots > 0 ? Math.round((hits / totalShots) * 100) : 0;
  const avgReaction = reactionTimes.length > 0
    ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)
    : 0;

  const config = DIFFICULTY_CONFIG[difficulty];

  const difficultyButtons: { key: Difficulty; label: string; desc: string; ring: string }[] = [
    { key: "easy", label: t.easy, desc: t.easyDesc, ring: "ring-green-400" },
    { key: "medium", label: t.medium, desc: t.mediumDesc, ring: "ring-orange-400" },
    { key: "hard", label: t.hard, desc: t.hardDesc, ring: "ring-red-400" },
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-gradient-to-br from-orange-500 to-red-500 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white drop-shadow">{t.title}</h1>
            <p className="text-orange-100 mt-1 text-sm">{t.subtitle}</p>
          </div>

          <AdBanner format="horizontal" className="mb-6" />

          {/* Idle Screen */}
          {gameState === "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur rounded-2xl p-6"
            >
              <div className="grid grid-cols-3 gap-3 mb-6">
                {difficultyButtons.map(({ key, label, desc, ring }) => (
                  <button
                    key={key}
                    onClick={() => setDifficulty(key)}
                    className={`rounded-xl p-4 text-center transition-all ${
                      difficulty === key
                        ? `bg-white text-gray-800 ring-2 ${ring} shadow-lg scale-105`
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    <div className="font-bold text-lg">{label}</div>
                    <div className={`text-xs mt-1 ${difficulty === key ? "text-gray-500" : "text-white/70"}`}>{desc}</div>
                    {highScores[key] > 0 && (
                      <div className={`text-xs mt-2 font-semibold ${difficulty === key ? "text-orange-500" : "text-yellow-300"}`}>
                        {t.highScore}: {highScores[key]}
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <button
                onClick={startGame}
                className="w-full py-4 bg-white text-orange-500 font-bold text-xl rounded-xl hover:bg-orange-50 active:scale-95 transition-all shadow-lg"
              >
                {t.start}
              </button>
            </motion.div>
          )}

          {/* Playing Screen */}
          {gameState === "playing" && (
            <div className="space-y-4">
              {/* Stats bar */}
              <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-3 flex items-center justify-between text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold tabular-nums">
                    {timeLeft}<span className="text-sm ml-1">{t.sec}</span>
                  </div>
                  <div className="text-xs opacity-75">{t.timeLeft}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold tabular-nums text-green-300">{hits}</div>
                  <div className="text-xs opacity-75">{t.hits}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold tabular-nums text-red-300">{misses}</div>
                  <div className="text-xs opacity-75">{t.misses}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold tabular-nums">{accuracyPct}%</div>
                  <div className="text-xs opacity-75">{t.accuracy}</div>
                </div>
              </div>

              {/* Game Area */}
              <div
                ref={gameAreaRef}
                onClick={handleAreaClick}
                className={`relative w-full rounded-2xl overflow-hidden transition-colors duration-100 ${
                  flashRed ? "bg-red-900/80" : "bg-gray-900"
                }`}
                style={{ height: "400px", cursor: "crosshair" }}
              >
                {/* Grid lines for visual effect */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Target */}
                <AnimatePresence>
                  {target && (
                    <motion.button
                      key={target.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.12, ease: "backOut" }}
                      onClick={(e) => handleTargetClick(e, target)}
                      className={`absolute rounded-full bg-gradient-to-br ${config.color} shadow-lg focus:outline-none`}
                      style={{
                        width: target.size,
                        height: target.size,
                        left: target.x - target.size / 2,
                        top: target.y - target.size / 2,
                        boxShadow: `0 0 ${target.size / 2}px rgba(251,146,60,0.7), 0 0 ${target.size}px rgba(251,146,60,0.3)`,
                      }}
                    >
                      <span className="sr-only">target</span>
                    </motion.button>
                  )}
                </AnimatePresence>

                {/* Floating +1 texts */}
                <AnimatePresence>
                  {floatingTexts.map((ft) => (
                    <motion.div
                      key={ft.id}
                      initial={{ opacity: 1, y: 0, scale: 1 }}
                      animate={{ opacity: 0, y: -40, scale: 1.4 }}
                      transition={{ duration: 0.65, ease: "easeOut" }}
                      className="absolute pointer-events-none text-yellow-300 font-bold text-lg select-none"
                      style={{ left: ft.x, top: ft.y - 20 }}
                    >
                      +1
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Results Screen */}
          {gameState === "results" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur rounded-2xl p-6 text-white text-center"
            >
              <h2 className="text-2xl font-bold mb-1">{t.gameOver}</h2>
              {isNewRecord && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="inline-block bg-yellow-400 text-yellow-900 font-bold px-4 py-1 rounded-full text-sm mb-4"
                >
                  {t.newRecord}
                </motion.div>
              )}

              <div className="grid grid-cols-2 gap-4 my-6">
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="text-3xl font-bold text-green-300">{hits}</div>
                  <div className="text-sm opacity-75 mt-1">{t.totalHits}</div>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="text-3xl font-bold text-blue-300">{accuracyPct}%</div>
                  <div className="text-sm opacity-75 mt-1">{t.accuracy}</div>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="text-3xl font-bold text-yellow-300">
                    {avgReaction > 0 ? `${avgReaction}${t.ms}` : "-"}
                  </div>
                  <div className="text-sm opacity-75 mt-1">{t.avgReaction}</div>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="text-3xl font-bold text-orange-300">{highScores[difficulty]}</div>
                  <div className="text-sm opacity-75 mt-1">{t.highScore}</div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={startGame}
                  className="flex-1 py-3 bg-white text-orange-500 font-bold rounded-xl hover:bg-orange-50 active:scale-95 transition-all"
                >
                  {t.playAgain}
                </button>
                <button
                  onClick={() => setGameState("idle")}
                  className="flex-1 py-3 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 active:scale-95 transition-all"
                >
                  {t.changeDifficulty}
                </button>
              </div>
            </motion.div>
          )}

          <AdBanner format="rectangle" className="mt-6" />
        </div>
      </main>
    </PageTransition>
  );
}
