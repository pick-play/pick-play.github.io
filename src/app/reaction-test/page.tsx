"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/i18n/config";

type GameState = "waiting" | "ready" | "go" | "result" | "tooearly";

const AVERAGE_HUMAN_MS = 215;

const translations: Record<Locale, {
  title: string;
  subtitle: string;
  waitInstruction: string;
  readyInstruction: string;
  goInstruction: string;
  tooEarlyMsg: string;
  tooEarlyBtn: string;
  resultTitle: string;
  yourTime: string;
  ms: string;
  bestScore: string;
  tryAgain: string;
  historyTitle: string;
  avgLabel: string;
  chartTitle: string;
  youLabel: string;
  avgHumanLabel: string;
  ratings: {
    incredible: string;
    fast: string;
    average: string;
    slow: string;
    tryAgain: string;
  };
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  ko: {
    title: "반응속도 테스트",
    subtitle: "초록색으로 바뀌면 바로 클릭하세요!",
    waitInstruction: "클릭해서 시작",
    readyInstruction: "준비... 초록색이 될 때까지 기다려요!",
    goInstruction: "지금 클릭!",
    tooEarlyMsg: "너무 일찍 클릭했어요!",
    tooEarlyBtn: "다시 시도",
    resultTitle: "결과",
    yourTime: "나의 반응속도",
    ms: "ms",
    bestScore: "최고 기록",
    tryAgain: "다시 하기",
    historyTitle: "최근 기록",
    avgLabel: "평균",
    chartTitle: "평균 인간과 비교",
    youLabel: "나",
    avgHumanLabel: "평균 인간 (215ms)",
    ratings: {
      incredible: "믿을 수 없는 속도!",
      fast: "빠름!",
      average: "보통",
      slow: "느림",
      tryAgain: "다시 도전해봐요",
    },
    faqTitle: "자주 묻는 질문",
    faqs: [
      {
        q: "평균 인간의 반응속도는 얼마인가요?",
        a: "일반적인 인간의 시각 반응속도는 약 200~250ms입니다. 150ms 이하면 매우 빠른 편에 속합니다.",
      },
      {
        q: "반응속도에 영향을 주는 요소는 무엇인가요?",
        a: "피로, 집중력, 카페인 섭취, 나이 등이 반응속도에 영향을 줍니다. 최상의 결과를 위해 집중하고 편안한 상태에서 테스트하세요.",
      },
      {
        q: "더 빠르게 할 수 있는 방법이 있나요?",
        a: "충분한 수면, 규칙적인 운동, 그리고 꾸준한 연습이 반응속도 향상에 도움이 됩니다.",
      },
    ],
  },
  en: {
    title: "Reaction Speed Test",
    subtitle: "Click as soon as it turns green!",
    waitInstruction: "Click to start",
    readyInstruction: "Get ready... wait for green!",
    goInstruction: "CLICK NOW!",
    tooEarlyMsg: "Too early!",
    tooEarlyBtn: "Try Again",
    resultTitle: "Result",
    yourTime: "Your Reaction Time",
    ms: "ms",
    bestScore: "Best Score",
    tryAgain: "Try Again",
    historyTitle: "Recent Attempts",
    avgLabel: "Average",
    chartTitle: "Compare vs. Average Human",
    youLabel: "You",
    avgHumanLabel: "Avg Human (215ms)",
    ratings: {
      incredible: "Incredible!",
      fast: "Fast!",
      average: "Average",
      slow: "Slow",
      tryAgain: "Try again",
    },
    faqTitle: "FAQ",
    faqs: [
      {
        q: "What is the average human reaction time?",
        a: "The average human visual reaction time is about 200–250ms. Under 150ms is considered exceptionally fast.",
      },
      {
        q: "What factors affect reaction time?",
        a: "Fatigue, focus, caffeine intake, and age all affect reaction time. Test in a comfortable, focused state for best results.",
      },
      {
        q: "How can I improve my reaction speed?",
        a: "Good sleep, regular exercise, and consistent practice all help improve reaction time.",
      },
    ],
  },
  ja: {
    title: "反応速度テスト",
    subtitle: "緑になったらすぐクリック！",
    waitInstruction: "クリックしてスタート",
    readyInstruction: "準備して... 緑になるまで待って！",
    goInstruction: "今すぐクリック！",
    tooEarlyMsg: "早すぎます！",
    tooEarlyBtn: "もう一度",
    resultTitle: "結果",
    yourTime: "あなたの反応速度",
    ms: "ms",
    bestScore: "ベストスコア",
    tryAgain: "もう一度",
    historyTitle: "最近の記録",
    avgLabel: "平均",
    chartTitle: "平均との比較",
    youLabel: "あなた",
    avgHumanLabel: "平均 (215ms)",
    ratings: {
      incredible: "信じられない！",
      fast: "速い！",
      average: "普通",
      slow: "遅い",
      tryAgain: "もう一度挑戦",
    },
    faqTitle: "よくある質問",
    faqs: [
      {
        q: "人間の平均反応速度はどのくらいですか？",
        a: "一般的な人間の視覚反応速度は約200〜250msです。150ms以下は非常に速い部類に入ります。",
      },
      {
        q: "反応速度に影響する要因は何ですか？",
        a: "疲労、集中力、カフェイン摂取、年齢などが反応速度に影響します。最良の結果のためにリラックスして集中した状態でテストしてください。",
      },
      {
        q: "反応速度を上げる方法はありますか？",
        a: "十分な睡眠、定期的な運動、継続的な練習が反応速度の向上に役立ちます。",
      },
    ],
  },
  zh: {
    title: "反应速度测试",
    subtitle: "变绿后立刻点击！",
    waitInstruction: "点击开始",
    readyInstruction: "准备好... 等待变绿！",
    goInstruction: "现在点击！",
    tooEarlyMsg: "太早了！",
    tooEarlyBtn: "再试一次",
    resultTitle: "结果",
    yourTime: "你的反应速度",
    ms: "ms",
    bestScore: "最佳成绩",
    tryAgain: "再试一次",
    historyTitle: "最近记录",
    avgLabel: "平均",
    chartTitle: "与平均人类比较",
    youLabel: "你",
    avgHumanLabel: "平均人类 (215ms)",
    ratings: {
      incredible: "难以置信！",
      fast: "很快！",
      average: "一般",
      slow: "较慢",
      tryAgain: "再试一次",
    },
    faqTitle: "常见问题",
    faqs: [
      {
        q: "人类的平均反应速度是多少？",
        a: "一般人类的视觉反应速度约为200至250毫秒。低于150毫秒属于极快水平。",
      },
      {
        q: "哪些因素会影响反应速度？",
        a: "疲劳、注意力、咖啡因摄入和年龄都会影响反应速度。在放松专注的状态下测试可获得最佳结果。",
      },
      {
        q: "如何提高反应速度？",
        a: "充足的睡眠、规律的运动和持续的练习都有助于提高反应速度。",
      },
    ],
  },
  es: {
    title: "Test de Velocidad de Reacción",
    subtitle: "¡Haz clic en cuanto se ponga verde!",
    waitInstruction: "Haz clic para empezar",
    readyInstruction: "Prepárate... ¡espera el verde!",
    goInstruction: "¡CLIC AHORA!",
    tooEarlyMsg: "¡Demasiado pronto!",
    tooEarlyBtn: "Intentar de nuevo",
    resultTitle: "Resultado",
    yourTime: "Tu tiempo de reacción",
    ms: "ms",
    bestScore: "Mejor puntuación",
    tryAgain: "Intentar de nuevo",
    historyTitle: "Intentos recientes",
    avgLabel: "Promedio",
    chartTitle: "Comparación con humano promedio",
    youLabel: "Tú",
    avgHumanLabel: "Humano promedio (215ms)",
    ratings: {
      incredible: "¡Increíble!",
      fast: "¡Rápido!",
      average: "Normal",
      slow: "Lento",
      tryAgain: "Inténtalo de nuevo",
    },
    faqTitle: "Preguntas frecuentes",
    faqs: [
      {
        q: "¿Cuál es el tiempo de reacción humano promedio?",
        a: "El tiempo de reacción visual humano promedio es de unos 200-250ms. Por debajo de 150ms se considera excepcionalmente rápido.",
      },
      {
        q: "¿Qué factores afectan el tiempo de reacción?",
        a: "La fatiga, la concentración, la cafeína y la edad afectan el tiempo de reacción. Prueba en un estado relajado y concentrado para mejores resultados.",
      },
      {
        q: "¿Cómo puedo mejorar mi velocidad de reacción?",
        a: "Dormir bien, hacer ejercicio regularmente y practicar de manera constante ayudan a mejorar el tiempo de reacción.",
      },
    ],
  },
};

function getRating(ms: number, t: (typeof translations)[Locale]) {
  if (ms < 150) return { label: t.ratings.incredible, color: "from-purple-500 via-pink-500 to-yellow-500", textClass: "bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent" };
  if (ms < 250) return { label: t.ratings.fast, color: "from-green-400 to-emerald-500", textClass: "text-green-400" };
  if (ms < 350) return { label: t.ratings.average, color: "from-yellow-400 to-amber-500", textClass: "text-yellow-400" };
  if (ms < 500) return { label: t.ratings.slow, color: "from-orange-400 to-orange-500", textClass: "text-orange-400" };
  return { label: t.ratings.tryAgain, color: "from-red-400 to-red-500", textClass: "text-red-400" };
}

const MAX_HISTORY = 5;
const STORAGE_KEY = "reaction-test-best";

export default function ReactionTestPage() {
  const locale = useLocale();
  const t = translations[locale];

  const [gameState, setGameState] = useState<GameState>("waiting");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setBestScore(Number(stored));
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const startReady = useCallback(() => {
    setGameState("ready");
    const delay = 1000 + Math.random() * 4000;
    timeoutRef.current = setTimeout(() => {
      setGameState("go");
      startTimeRef.current = performance.now();
    }, delay);
  }, []);

  const handleAreaClick = useCallback(() => {
    if (gameState === "waiting") {
      startReady();
    } else if (gameState === "ready") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setGameState("tooearly");
    } else if (gameState === "go") {
      const elapsed = Math.round(performance.now() - startTimeRef.current);
      setReactionTime(elapsed);
      setHistory((prev) => [elapsed, ...prev].slice(0, MAX_HISTORY));
      if (bestScore === null || elapsed < bestScore) {
        setBestScore(elapsed);
        localStorage.setItem(STORAGE_KEY, String(elapsed));
      }
      setGameState("result");
    }
  }, [gameState, bestScore, startReady]);

  const reset = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setReactionTime(null);
    setGameState("waiting");
  }, []);

  const historyAvg = history.length > 0 ? Math.round(history.reduce((a, b) => a + b, 0) / history.length) : null;

  const areaColors: Record<GameState, string> = {
    waiting: "from-red-500 to-orange-500",
    ready: "from-red-600 to-red-700",
    go: "from-green-400 to-emerald-500",
    result: "from-slate-700 to-slate-800",
    tooearly: "from-yellow-500 to-amber-600",
  };

  const rating = reactionTime !== null ? getRating(reactionTime, t) : null;

  const maxChartMs = Math.max(reactionTime ?? 0, AVERAGE_HUMAN_MS, 600);
  const userBarWidth = reactionTime !== null ? Math.min((reactionTime / maxChartMs) * 100, 100) : 0;
  const avgBarWidth = Math.min((AVERAGE_HUMAN_MS / maxChartMs) * 100, 100);

  return (
    <PageTransition>
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-6 px-4">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">{t.title}</h1>
            <p className="text-slate-400 text-sm">{t.subtitle}</p>
          </div>

          <AdBanner format="horizontal" className="mb-6" />

          {/* Main clickable area */}
          <AnimatePresence mode="wait">
            {(gameState === "waiting" || gameState === "ready" || gameState === "go") && (
              <motion.button
                key="game-area"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={handleAreaClick}
                className={`w-full rounded-2xl bg-gradient-to-br ${areaColors[gameState]} flex flex-col items-center justify-center cursor-pointer select-none focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30 active:scale-[0.98] transition-transform`}
                style={{ minHeight: "280px" }}
                aria-label={gameState === "go" ? t.goInstruction : gameState === "ready" ? t.readyInstruction : t.waitInstruction}
              >
                <AnimatePresence mode="wait">
                  {gameState === "waiting" && (
                    <motion.div
                      key="waiting"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center px-6"
                    >
                      <div className="text-6xl mb-4">👆</div>
                      <p className="text-white text-2xl font-bold">{t.waitInstruction}</p>
                    </motion.div>
                  )}
                  {gameState === "ready" && (
                    <motion.div
                      key="ready"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center px-6"
                    >
                      <div className="text-6xl mb-4">🔴</div>
                      <p className="text-white/90 text-xl font-semibold">{t.readyInstruction}</p>
                    </motion.div>
                  )}
                  {gameState === "go" && (
                    <motion.div
                      key="go"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="text-center px-6"
                    >
                      <div className="text-6xl mb-4">🟢</div>
                      <p className="text-white text-3xl font-extrabold tracking-wide">{t.goInstruction}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

            {gameState === "tooearly" && (
              <motion.div
                key="tooearly"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 flex flex-col items-center justify-center py-16 px-6"
              >
                <div className="text-6xl mb-4">⚡</div>
                <p className="text-white text-2xl font-bold mb-6">{t.tooEarlyMsg}</p>
                <button
                  onClick={reset}
                  className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-full transition-colors"
                >
                  {t.tooEarlyBtn}
                </button>
              </motion.div>
            )}

            {gameState === "result" && reactionTime !== null && rating && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full rounded-2xl bg-slate-800/80 border border-slate-700 p-6"
              >
                <h2 className="text-white/70 text-sm font-medium text-center mb-2 uppercase tracking-wider">{t.resultTitle}</h2>

                {/* Big time display */}
                <div className="text-center mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                    className="inline-flex items-baseline gap-1"
                  >
                    <span className="text-7xl font-black text-white">{reactionTime}</span>
                    <span className="text-2xl text-slate-400 font-semibold">{t.ms}</span>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className={`text-2xl font-bold mt-1 ${rating.textClass}`}
                  >
                    {rating.label}
                  </motion.p>
                </div>

                {/* Best score */}
                {bestScore !== null && (
                  <p className="text-center text-slate-400 text-sm mb-5">
                    {t.bestScore}: <span className="text-white font-semibold">{bestScore}{t.ms}</span>
                  </p>
                )}

                {/* Comparison chart */}
                <div className="bg-slate-900/60 rounded-xl p-4 mb-4">
                  <p className="text-slate-400 text-xs font-medium mb-3 uppercase tracking-wider">{t.chartTitle}</p>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>{t.youLabel}</span>
                        <span>{reactionTime}{t.ms}</span>
                      </div>
                      <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${userBarWidth}%` }}
                          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                          className={`h-full rounded-full bg-gradient-to-r ${rating.color}`}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>{t.avgHumanLabel}</span>
                        <span>{AVERAGE_HUMAN_MS}{t.ms}</span>
                      </div>
                      <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${avgBarWidth}%` }}
                          transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
                          className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={reset}
                  className={`w-full bg-gradient-to-r ${rating.color} hover:opacity-90 text-white font-bold py-3 rounded-xl transition-opacity`}
                >
                  {t.tryAgain}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* History panel */}
          {history.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-slate-800/60 border border-slate-700 rounded-2xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white/80 text-sm font-semibold">{t.historyTitle}</h3>
                {historyAvg !== null && (
                  <span className="text-slate-400 text-xs">{t.avgLabel}: <span className="text-white font-medium">{historyAvg}{t.ms}</span></span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {history.map((ms, idx) => {
                  const r = getRating(ms, t);
                  return (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${r.color} text-white`}
                    >
                      {ms}{t.ms}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          )}

          <AdBanner format="in-article" className="my-6" />

          {/* FAQ */}
          <section className="mt-2">
            <h2 className="text-white/70 text-lg font-semibold mb-4">{t.faqTitle}</h2>
            <div className="space-y-3">
              {t.faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
                  <p className="text-white font-medium mb-1 text-sm">{faq.q}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <AdBanner format="rectangle" className="mt-8" />
        </div>
      </main>
    </PageTransition>
  );
}
