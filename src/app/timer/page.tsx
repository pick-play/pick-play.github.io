"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/hooks/useLocale";

const translations = {
  ko: {
    title: "타이머 & 스톱워치",
    subtitle: "온라인 타이머와 스톱워치로 시간을 측정하세요",
    timerTab: "타이머",
    stopwatchTab: "스톱워치",
    presets: "프리셋",
    custom: "직접 입력",
    hours: "시간",
    minutes: "분",
    seconds: "초",
    start: "시작",
    pause: "일시정지",
    reset: "초기화",
    lap: "랩",
    lapList: "랩 기록",
    noLaps: "랩 기록이 없습니다",
    timerDone: "시간 완료!",
    faqTitle: "자주 묻는 질문",
    faq: [
      {
        q: "타이머와 스톱워치의 차이는 무엇인가요?",
        a: "타이머는 설정한 시간에서 0까지 카운트다운하며, 완료 시 알림음이 울립니다. 스톱워치는 0부터 시간을 측정하며, 랩 타임 기록 기능을 제공합니다.",
      },
      {
        q: "타이머 알림음이 들리지 않아요",
        a: "브라우저 설정에서 소리가 허용되어 있는지 확인하세요. Web Audio API를 사용하므로 별도 설치가 필요 없습니다.",
      },
      {
        q: "랩 타임은 어떻게 사용하나요?",
        a: "스톱워치 실행 중 '랩' 버튼을 누르면 현재 시간이 기록됩니다. 여러 구간의 시간을 비교할 때 유용합니다.",
      },
    ],
  },
  en: {
    title: "Timer & Stopwatch",
    subtitle: "Measure time with an online timer and stopwatch",
    timerTab: "Timer",
    stopwatchTab: "Stopwatch",
    presets: "Presets",
    custom: "Custom",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    start: "Start",
    pause: "Pause",
    reset: "Reset",
    lap: "Lap",
    lapList: "Lap Times",
    noLaps: "No laps recorded",
    timerDone: "Time's up!",
    faqTitle: "FAQ",
    faq: [
      {
        q: "What is the difference between a timer and a stopwatch?",
        a: "A timer counts down from a set time to zero and plays an alert when it finishes. A stopwatch counts up from zero and lets you record lap times.",
      },
      {
        q: "I can't hear the timer alert",
        a: "Make sure sound is allowed in your browser settings. This tool uses the Web Audio API, so no extra installation is needed.",
      },
      {
        q: "How do I use lap times?",
        a: "Press the 'Lap' button while the stopwatch is running to record the current time. This is useful for comparing split times across multiple segments.",
      },
    ],
  },
  ja: {
    title: "タイマー & ストップウォッチ",
    subtitle: "オンラインタイマーとストップウォッチで時間を計測",
    timerTab: "タイマー",
    stopwatchTab: "ストップウォッチ",
    presets: "プリセット",
    custom: "カスタム",
    hours: "時間",
    minutes: "分",
    seconds: "秒",
    start: "スタート",
    pause: "一時停止",
    reset: "リセット",
    lap: "ラップ",
    lapList: "ラップ記録",
    noLaps: "ラップ記録なし",
    timerDone: "時間終了！",
    faqTitle: "よくある質問",
    faq: [
      {
        q: "タイマーとストップウォッチの違いは何ですか？",
        a: "タイマーは設定した時間からゼロまでカウントダウンし、終了時にアラートが鳴ります。ストップウォッチはゼロから時間を計測し、ラップタイムを記録できます。",
      },
      {
        q: "タイマーのアラートが聞こえません",
        a: "ブラウザの設定でサウンドが許可されているか確認してください。Web Audio APIを使用しているため、追加インストールは不要です。",
      },
      {
        q: "ラップタイムはどう使いますか？",
        a: "ストップウォッチ作動中に「ラップ」ボタンを押すと現在の時間が記録されます。複数のセクションのタイムを比較する際に便利です。",
      },
    ],
  },
  zh: {
    title: "计时器 & 秒表",
    subtitle: "使用在线计时器和秒表测量时间",
    timerTab: "计时器",
    stopwatchTab: "秒表",
    presets: "预设",
    custom: "自定义",
    hours: "小时",
    minutes: "分钟",
    seconds: "秒",
    start: "开始",
    pause: "暂停",
    reset: "重置",
    lap: "计次",
    lapList: "计次记录",
    noLaps: "暂无计次记录",
    timerDone: "时间到！",
    faqTitle: "常见问题",
    faq: [
      {
        q: "计时器和秒表有什么区别？",
        a: "计时器从设定时间倒数到零，结束时发出提示音。秒表从零开始计时，可以记录计次时间。",
      },
      {
        q: "我听不到计时器的提示音",
        a: "请确认浏览器设置中允许播放声音。本工具使用 Web Audio API，无需额外安装。",
      },
      {
        q: "如何使用计次功能？",
        a: "秒表运行时按下"计次"按钮即可记录当前时间，方便比较多个阶段的用时。",
      },
    ],
  },
  es: {
    title: "Temporizador & Cronómetro",
    subtitle: "Mide el tiempo con un temporizador y cronómetro en línea",
    timerTab: "Temporizador",
    stopwatchTab: "Cronómetro",
    presets: "Presets",
    custom: "Personalizar",
    hours: "Horas",
    minutes: "Minutos",
    seconds: "Segundos",
    start: "Iniciar",
    pause: "Pausar",
    reset: "Reiniciar",
    lap: "Vuelta",
    lapList: "Tiempos de vuelta",
    noLaps: "Sin vueltas registradas",
    timerDone: "¡Tiempo!",
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Cuál es la diferencia entre temporizador y cronómetro?",
        a: "El temporizador cuenta hacia atrás desde un tiempo establecido hasta cero y suena una alerta al terminar. El cronómetro cuenta hacia adelante desde cero y permite registrar tiempos de vuelta.",
      },
      {
        q: "No escucho la alerta del temporizador",
        a: "Asegúrate de que el sonido esté permitido en la configuración del navegador. Esta herramienta usa la API Web Audio, sin necesidad de instalación adicional.",
      },
      {
        q: "¿Cómo uso los tiempos de vuelta?",
        a: "Pulsa el botón 'Vuelta' mientras el cronómetro está en marcha para registrar el tiempo actual. Es útil para comparar tiempos en distintos tramos.",
      },
    ],
  },
};

const PRESETS = [
  { label: "1min", seconds: 60 },
  { label: "3min", seconds: 180 },
  { label: "5min", seconds: 300 },
  { label: "10min", seconds: 600 },
  { label: "15min", seconds: 900 },
  { label: "30min", seconds: 1800 },
  { label: "1hr", seconds: 3600 },
];

function playBeep(audioCtxRef: React.MutableRefObject<AudioContext | null>) {
  try {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    const ctx = audioCtxRef.current;
    const beepCount = 3;
    for (let i = 0; i < beepCount; i++) {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, ctx.currentTime + i * 0.4);
      gainNode.gain.setValueAtTime(0.5, ctx.currentTime + i * 0.4);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.4 + 0.3);
      oscillator.start(ctx.currentTime + i * 0.4);
      oscillator.stop(ctx.currentTime + i * 0.4 + 0.35);
    }
  } catch {
    // Audio not available
  }
}

function formatTimerDisplay(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) {
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatStopwatchDisplay(ms: number): string {
  const totalCentiseconds = Math.floor(ms / 10);
  const minutes = Math.floor(totalCentiseconds / 6000);
  const seconds = Math.floor((totalCentiseconds % 6000) / 100);
  const centiseconds = totalCentiseconds % 100;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`;
}

export default function TimerPage() {
  const locale = useLocale();
  const t = translations[locale as keyof typeof translations] ?? translations.ko;

  // Mode: "timer" | "stopwatch"
  const [mode, setMode] = useState<"timer" | "stopwatch">("timer");

  // ── Timer state ──────────────────────────────────────────────────────────
  const [timerTotal, setTimerTotal] = useState(300); // total seconds set
  const [timerRemaining, setTimerRemaining] = useState(300);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerDone, setTimerDone] = useState(false);
  const [customH, setCustomH] = useState(0);
  const [customM, setCustomM] = useState(5);
  const [customS, setCustomS] = useState(0);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // ── Stopwatch state ──────────────────────────────────────────────────────
  const [swElapsed, setSwElapsed] = useState(0); // milliseconds
  const [swRunning, setSwRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const swStartRef = useRef<number>(0);
  const swBaseRef = useRef<number>(0);
  const swFrameRef = useRef<number | null>(null);

  // ── Timer logic ──────────────────────────────────────────────────────────
  const clearTimerInterval = useCallback(() => {
    if (timerIntervalRef.current !== null) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }, []);

  const handleTimerStart = useCallback(() => {
    if (timerRemaining <= 0) return;
    setTimerDone(false);
    setTimerRunning(true);
    timerIntervalRef.current = setInterval(() => {
      setTimerRemaining((prev) => {
        if (prev <= 1) {
          clearTimerInterval();
          setTimerRunning(false);
          setTimerDone(true);
          playBeep(audioCtxRef);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [timerRemaining, clearTimerInterval]);

  const handleTimerPause = useCallback(() => {
    clearTimerInterval();
    setTimerRunning(false);
  }, [clearTimerInterval]);

  const handleTimerReset = useCallback(() => {
    clearTimerInterval();
    setTimerRunning(false);
    setTimerDone(false);
    setTimerRemaining(timerTotal);
  }, [clearTimerInterval, timerTotal]);

  const applyPreset = useCallback(
    (seconds: number) => {
      clearTimerInterval();
      setTimerRunning(false);
      setTimerDone(false);
      setTimerTotal(seconds);
      setTimerRemaining(seconds);
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      setCustomH(h);
      setCustomM(m);
      setCustomS(s);
    },
    [clearTimerInterval]
  );

  const applyCustom = useCallback(() => {
    const total = customH * 3600 + customM * 60 + customS;
    if (total <= 0) return;
    clearTimerInterval();
    setTimerRunning(false);
    setTimerDone(false);
    setTimerTotal(total);
    setTimerRemaining(total);
  }, [customH, customM, customS, clearTimerInterval]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimerInterval();
    };
  }, [clearTimerInterval]);

  // ── Stopwatch logic ──────────────────────────────────────────────────────
  const stopSwFrame = useCallback(() => {
    if (swFrameRef.current !== null) {
      cancelAnimationFrame(swFrameRef.current);
      swFrameRef.current = null;
    }
  }, []);

  const tickSw = useCallback(() => {
    setSwElapsed(swBaseRef.current + (performance.now() - swStartRef.current));
    swFrameRef.current = requestAnimationFrame(tickSw);
  }, []);

  const handleSwStart = useCallback(() => {
    swStartRef.current = performance.now();
    setSwRunning(true);
    swFrameRef.current = requestAnimationFrame(tickSw);
  }, [tickSw]);

  const handleSwPause = useCallback(() => {
    stopSwFrame();
    swBaseRef.current += performance.now() - swStartRef.current;
    setSwRunning(false);
  }, [stopSwFrame]);

  const handleSwReset = useCallback(() => {
    stopSwFrame();
    setSwRunning(false);
    setSwElapsed(0);
    swBaseRef.current = 0;
    setLaps([]);
  }, [stopSwFrame]);

  const handleSwLap = useCallback(() => {
    setLaps((prev) => [...prev, swElapsed]);
  }, [swElapsed]);

  useEffect(() => {
    return () => {
      stopSwFrame();
    };
  }, [stopSwFrame]);

  // ── Timer progress ring ───────────────────────────────────────────────────
  const RADIUS = 90;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const progress = timerTotal > 0 ? timerRemaining / timerTotal : 1;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50/30 to-pink-50/20 dark:from-slate-950 dark:via-rose-950/20 dark:to-pink-950/10">
        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {t.title}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Ad - top */}
          <AdBanner
            format="horizontal"
            className="mb-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
          />

          {/* Mode tabs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-1.5 shadow-sm border border-slate-200 dark:border-slate-700 mb-5 flex"
          >
            {(["timer", "stopwatch"] as const).map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setMode(tabKey)}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                  mode === tabKey
                    ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                {tabKey === "timer" ? t.timerTab : t.stopwatchTab}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {mode === "timer" ? (
              <motion.div
                key="timer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Preset buttons */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-4">
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3">
                    {t.presets}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PRESETS.map((p) => (
                      <button
                        key={p.label}
                        onClick={() => applyPreset(p.seconds)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          timerTotal === p.seconds
                            ? "bg-rose-500 text-white"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-rose-100 dark:hover:bg-rose-900/40"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom input */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-5">
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3">
                    {t.custom}
                  </p>
                  <div className="flex items-end gap-3">
                    {(
                      [
                        { label: t.hours, val: customH, set: setCustomH, max: 23 },
                        { label: t.minutes, val: customM, set: setCustomM, max: 59 },
                        { label: t.seconds, val: customS, set: setCustomS, max: 59 },
                      ] as { label: string; val: number; set: (v: number) => void; max: number }[]
                    ).map(({ label, val, set, max }) => (
                      <div key={label} className="flex flex-col items-center flex-1">
                        <label className="text-xs text-slate-400 dark:text-slate-500 mb-1">
                          {label}
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={max}
                          value={val}
                          onChange={(e) => set(Math.min(max, Math.max(0, Number(e.target.value))))}
                          className="w-full text-center text-lg font-mono font-bold bg-slate-100 dark:bg-slate-700 rounded-xl py-2 border-none outline-none focus:ring-2 focus:ring-rose-400 text-slate-800 dark:text-slate-100"
                        />
                      </div>
                    ))}
                    <button
                      onClick={applyCustom}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-semibold shadow hover:opacity-90 transition-opacity"
                    >
                      OK
                    </button>
                  </div>
                </div>

                {/* Progress ring + time display */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-5 flex flex-col items-center">
                  <div className="relative flex items-center justify-center mb-6">
                    <svg width="220" height="220" className="-rotate-90">
                      {/* Background track */}
                      <circle
                        cx="110"
                        cy="110"
                        r={RADIUS}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="10"
                        className="text-slate-200 dark:text-slate-700"
                      />
                      {/* Progress arc */}
                      <circle
                        cx="110"
                        cy="110"
                        r={RADIUS}
                        fill="none"
                        stroke="url(#timerGradient)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={CIRCUMFERENCE}
                        strokeDashoffset={dashOffset}
                        style={{ transition: "stroke-dashoffset 0.9s linear" }}
                      />
                      <defs>
                        <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f43f5e" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-5xl font-mono font-bold tabular-nums text-slate-800 dark:text-slate-100">
                        {formatTimerDisplay(timerRemaining)}
                      </span>
                      <AnimatePresence>
                        {timerDone && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="text-sm font-semibold text-rose-500 mt-1"
                          >
                            {t.timerDone}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex gap-3 w-full justify-center">
                    {!timerRunning ? (
                      <button
                        onClick={handleTimerStart}
                        disabled={timerRemaining <= 0}
                        className="flex-1 max-w-[140px] py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow hover:opacity-90 transition-opacity disabled:opacity-40"
                      >
                        {t.start}
                      </button>
                    ) : (
                      <button
                        onClick={handleTimerPause}
                        className="flex-1 max-w-[140px] py-3 rounded-xl bg-amber-500 text-white font-semibold shadow hover:opacity-90 transition-opacity"
                      >
                        {t.pause}
                      </button>
                    )}
                    <button
                      onClick={handleTimerReset}
                      className="flex-1 max-w-[140px] py-3 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                    >
                      {t.reset}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="stopwatch"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Stopwatch display */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-5 flex flex-col items-center">
                  <div className="py-8">
                    <span className="text-5xl font-mono font-bold tabular-nums text-slate-800 dark:text-slate-100">
                      {formatStopwatchDisplay(swElapsed)}
                    </span>
                  </div>

                  {/* Controls */}
                  <div className="flex gap-3 w-full justify-center">
                    {!swRunning ? (
                      <button
                        onClick={handleSwStart}
                        className="flex-1 max-w-[120px] py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow hover:opacity-90 transition-opacity"
                      >
                        {t.start}
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleSwPause}
                          className="flex-1 max-w-[120px] py-3 rounded-xl bg-amber-500 text-white font-semibold shadow hover:opacity-90 transition-opacity"
                        >
                          {t.pause}
                        </button>
                        <button
                          onClick={handleSwLap}
                          className="flex-1 max-w-[120px] py-3 rounded-xl bg-blue-500 text-white font-semibold shadow hover:opacity-90 transition-opacity"
                        >
                          {t.lap}
                        </button>
                      </>
                    )}
                    <button
                      onClick={handleSwReset}
                      className="flex-1 max-w-[120px] py-3 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                    >
                      {t.reset}
                    </button>
                  </div>
                </div>

                {/* Lap list */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-5">
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3">
                    {t.lapList}
                  </p>
                  {laps.length === 0 ? (
                    <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-4">
                      {t.noLaps}
                    </p>
                  ) : (
                    <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                      {[...laps].reverse().map((lapMs, idx) => {
                        const lapNum = laps.length - idx;
                        const prevMs = lapNum > 1 ? laps[lapNum - 2] : 0;
                        const split = lapMs - prevMs;
                        return (
                          <div
                            key={lapNum}
                            className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-700/50"
                          >
                            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                              #{lapNum}
                            </span>
                            <span className="text-sm font-mono font-semibold text-slate-700 dark:text-slate-200">
                              {formatStopwatchDisplay(lapMs)}
                            </span>
                            <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                              +{formatStopwatchDisplay(split)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ad - rectangle */}
          <AdBanner
            format="rectangle"
            className="mb-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
          />

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-base font-bold text-slate-700 dark:text-slate-200 mb-4">
              {t.faqTitle}
            </h2>
            <div className="flex flex-col gap-4">
              {t.faq.map((item, i) => (
                <div key={i}>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    Q. {item.q}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
