"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/i18n/config";

// ─── Typing texts per locale × difficulty ────────────────────────────────────

const typingTexts: Record<Locale, Record<"easy" | "medium" | "hard", string[]>> = {
  ko: {
    easy: [
      "하늘이 맑고 바람이 시원합니다.",
      "오늘 점심은 김치찌개를 먹었습니다.",
      "강아지가 공원에서 뛰어놀고 있어요.",
      "책상 위에 노트북이 놓여 있습니다.",
      "봄이 오면 꽃이 활짝 피어납니다.",
    ],
    medium: [
      "매일 꾸준히 연습하면 타이핑 실력이 빠르게 향상됩니다.",
      "대한민국은 빠른 인터넷 속도로 전 세계에서 유명합니다.",
      "독서는 지식을 쌓고 상상력을 키우는 최고의 방법입니다.",
      "건강한 생활을 위해서는 규칙적인 운동과 균형 잡힌 식사가 필요합니다.",
      "과학과 기술의 발전은 우리의 일상생활을 더욱 편리하게 만들어 줍니다.",
    ],
    hard: [
      "인공지능과 머신러닝 기술은 현대 사회의 다양한 분야에서 혁신적인 변화를 이끌고 있으며, 앞으로도 지속적인 발전이 기대됩니다.",
      "세계 각지의 다양한 문화와 언어를 이해하고 존중하는 것은 글로벌 시대에 살아가는 현대인에게 매우 중요한 덕목입니다.",
      "환경 보호와 지속 가능한 개발은 현세대와 미래 세대 모두를 위한 책임이며, 우리 모두가 함께 노력해야 할 과제입니다.",
      "창의적인 사고와 비판적 분석 능력은 복잡한 문제를 해결하고 새로운 아이디어를 만들어내는 데 필수적인 역량입니다.",
      "디지털 전환 시대에는 데이터를 올바르게 분석하고 활용하는 능력이 개인과 기업 모두에게 경쟁력의 핵심이 됩니다.",
    ],
  },
  en: {
    easy: [
      "The sun rises in the east every morning.",
      "A quick brown fox jumps over the lazy dog.",
      "She sells seashells by the seashore.",
      "Practice makes perfect in every skill.",
      "The sky is clear and the air is fresh.",
    ],
    medium: [
      "Regular typing practice can significantly improve your speed and accuracy over time.",
      "The internet has revolutionized the way people communicate and access information.",
      "Reading books every day is one of the best habits you can build for yourself.",
      "Technology continues to evolve at a rapid pace, changing every aspect of modern life.",
      "A balanced diet and regular exercise are the keys to maintaining good health.",
    ],
    hard: [
      "Artificial intelligence and machine learning are transforming industries across the globe, enabling automation and insights that were previously unimaginable.",
      "The development of renewable energy sources such as solar and wind power is critical to combating climate change and ensuring a sustainable future.",
      "Critical thinking and problem-solving skills are among the most valuable competencies in the modern workforce, regardless of industry or profession.",
      "Understanding diverse cultures and perspectives fosters empathy and cooperation, which are essential for building a peaceful and interconnected global society.",
      "The rise of digital platforms has fundamentally altered consumer behavior, forcing businesses to adapt their strategies to remain competitive in a fast-changing marketplace.",
    ],
  },
  ja: {
    easy: [
      "今日はとても良い天気です。",
      "猫が窓のそばで眠っています。",
      "毎朝コーヒーを一杯飲みます。",
      "図書館で本を借りてきました。",
      "春になると桜の花が咲きます。",
    ],
    medium: [
      "毎日練習すれば、タイピングのスピードは確実に上達します。",
      "インターネットは私たちの生活を大きく変えた革新的な技術です。",
      "読書は知識を広げ、想像力を育てる最も効果的な方法の一つです。",
      "健康的な生活を送るためには、運動と食事のバランスが大切です。",
      "科学技術の進歩は、私たちの日常生活をより便利にしてくれています。",
    ],
    hard: [
      "人工知能と機械学習の技術は現代社会のあらゆる分野に革新をもたらしており、今後もさらなる発展が期待されています。",
      "環境問題への取り組みは現在の世代だけでなく、未来の世代への責任でもあり、持続可能な社会の実現が急務となっています。",
      "グローバル化が進む現代において、多様な文化や価値観を理解し尊重することは国際社会で活躍するための重要な素養です。",
      "デジタルトランスフォーメーションの時代には、データを正確に分析し活用する能力が個人や企業の競争力を左右します。",
      "創造的思考と批判的分析の能力は、複雑な問題を解決し新たなアイデアを生み出すために不可欠なスキルです。",
    ],
  },
  zh: {
    easy: [
      "今天天气晴朗，阳光明媚。",
      "小猫在窗边安静地睡觉。",
      "我每天早上喝一杯咖啡。",
      "春天来了，花儿都开了。",
      "图书馆里有很多有趣的书。",
    ],
    medium: [
      "坚持每天练习打字，速度会显著提高。",
      "互联网改变了人们获取信息和交流的方式。",
      "阅读是积累知识、开阔眼界的最佳途径之一。",
      "科学技术的进步使我们的日常生活更加便捷。",
      "保持健康的生活方式需要均衡饮食和规律运动。",
    ],
    hard: [
      "人工智能和机器学习技术正在各行各业引发深刻变革，为自动化和数据洞察提供了前所未有的可能性。",
      "可再生能源的开发与利用对于应对气候变化、实现可持续发展具有至关重要的战略意义。",
      "在全球化的背景下，理解和尊重不同文化与价值观是建设和谐国际社会的基础。",
      "数字化转型时代，准确分析和利用数据的能力已成为个人和企业保持竞争力的核心要素。",
      "批判性思维和创造性解决问题的能力是应对复杂挑战、推动创新发展不可或缺的关键素质。",
    ],
  },
  es: {
    easy: [
      "El sol brilla con fuerza hoy.",
      "El gato duerme junto a la ventana.",
      "Me gusta caminar por el parque.",
      "Bebo un café todas las mañanas.",
      "Los libros abren la mente y el corazón.",
    ],
    medium: [
      "Practicar todos los días mejora significativamente la velocidad de escritura.",
      "El internet ha revolucionado la forma en que accedemos a la información.",
      "Leer libros con regularidad es uno de los mejores hábitos que puedes cultivar.",
      "El avance tecnológico transforma todos los aspectos de la vida moderna.",
      "Una dieta equilibrada y el ejercicio regular son clave para una buena salud.",
    ],
    hard: [
      "La inteligencia artificial y el aprendizaje automático están transformando industrias enteras, permitiendo niveles de automatización e insight antes inimaginables.",
      "El desarrollo de fuentes de energía renovable como la solar y la eólica es esencial para combatir el cambio climático y asegurar un futuro sostenible.",
      "El pensamiento crítico y la capacidad de resolución de problemas son las competencias más valoradas en el mercado laboral del siglo veintiuno.",
      "Comprender y respetar la diversidad cultural fomenta la empatía y la cooperación necesarias para construir una sociedad global pacífica e interconectada.",
      "El auge de las plataformas digitales ha transformado radicalmente el comportamiento del consumidor, obligando a las empresas a reinventar sus estrategias comerciales.",
    ],
  },
};

// ─── Translations ─────────────────────────────────────────────────────────────

const translations: Record<Locale, {
  title: string;
  subtitle: string;
  difficulty: string;
  easy: string;
  medium: string;
  hard: string;
  startPrompt: string;
  timeLeft: string;
  wpm: string;
  accuracy: string;
  chars: string;
  errors: string;
  results: string;
  finalWpm: string;
  finalAccuracy: string;
  charsTyped: string;
  errorsMade: string;
  rating: string;
  tryAgain: string;
  bestWpm: string;
  newRecord: string;
  ratings: { label: string; min: number }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  wpmUnit: string;
  seconds: string;
}> = {
  ko: {
    title: "타이핑 속도 테스트",
    subtitle: "타자 실력을 측정해보세요",
    difficulty: "난이도",
    easy: "쉬움",
    medium: "보통",
    hard: "어려움",
    startPrompt: "타이핑을 시작하면 타이머가 자동으로 시작됩니다",
    timeLeft: "남은 시간",
    wpm: "타수",
    accuracy: "정확도",
    chars: "입력 수",
    errors: "오류",
    results: "결과",
    finalWpm: "분당 타수",
    finalAccuracy: "정확도",
    charsTyped: "입력한 글자",
    errorsMade: "오류 수",
    rating: "등급",
    tryAgain: "다시 도전",
    bestWpm: "최고 기록",
    newRecord: "신기록!",
    wpmUnit: "타",
    seconds: "초",
    ratings: [
      { label: "입문자", min: 0 },
      { label: "평균", min: 100 },
      { label: "빠름", min: 250 },
      { label: "프로", min: 400 },
      { label: "마스터", min: 600 },
    ],
    faqTitle: "자주 묻는 질문",
    faq: [
      {
        q: "타수(WPM)는 어떻게 계산하나요?",
        a: "한국어는 분당 입력한 글자 수를 5로 나누어 타수를 계산합니다. 국제 표준에서는 5글자를 1단어로 간주합니다.",
      },
      {
        q: "정확도는 어떻게 계산하나요?",
        a: "전체 입력한 글자 중 올바르게 입력한 글자의 비율입니다. 오타를 수정해도 오류 횟수는 증가합니다.",
      },
      {
        q: "최고 기록은 어디에 저장되나요?",
        a: "최고 기록은 브라우저의 로컬 스토리지에 저장되어 같은 기기에서 유지됩니다.",
      },
    ],
  },
  en: {
    title: "Typing Speed Test",
    subtitle: "Measure your typing speed",
    difficulty: "Difficulty",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    startPrompt: "Start typing to begin the timer",
    timeLeft: "Time Left",
    wpm: "WPM",
    accuracy: "Accuracy",
    chars: "Chars",
    errors: "Errors",
    results: "Results",
    finalWpm: "Words Per Minute",
    finalAccuracy: "Accuracy",
    charsTyped: "Characters Typed",
    errorsMade: "Errors Made",
    rating: "Rating",
    tryAgain: "Try Again",
    bestWpm: "Best WPM",
    newRecord: "New Record!",
    wpmUnit: "WPM",
    seconds: "s",
    ratings: [
      { label: "Beginner", min: 0 },
      { label: "Average", min: 20 },
      { label: "Fast", min: 50 },
      { label: "Pro", min: 80 },
      { label: "Master", min: 120 },
    ],
    faqTitle: "FAQ",
    faq: [
      {
        q: "How is WPM calculated?",
        a: "WPM is calculated by dividing the total characters typed by 5 (standard word length), then dividing by the elapsed time in minutes.",
      },
      {
        q: "How is accuracy measured?",
        a: "Accuracy is the percentage of correctly typed characters out of total characters attempted. Fixing a typo does not remove it from the error count.",
      },
      {
        q: "Where is my best score saved?",
        a: "Your best score is saved in your browser's local storage, so it persists across sessions on the same device.",
      },
    ],
  },
  ja: {
    title: "タイピング速度テスト",
    subtitle: "タイピングの実力を測定しましょう",
    difficulty: "難易度",
    easy: "やさしい",
    medium: "普通",
    hard: "難しい",
    startPrompt: "入力を開始するとタイマーがスタートします",
    timeLeft: "残り時間",
    wpm: "打数",
    accuracy: "正確率",
    chars: "入力数",
    errors: "ミス",
    results: "結果",
    finalWpm: "1分間の打数",
    finalAccuracy: "正確率",
    charsTyped: "入力文字数",
    errorsMade: "ミス数",
    rating: "評価",
    tryAgain: "もう一度",
    bestWpm: "ベスト記録",
    newRecord: "新記録！",
    wpmUnit: "打",
    seconds: "秒",
    ratings: [
      { label: "初心者", min: 0 },
      { label: "平均", min: 20 },
      { label: "速い", min: 50 },
      { label: "プロ", min: 80 },
      { label: "マスター", min: 120 },
    ],
    faqTitle: "よくある質問",
    faq: [
      {
        q: "WPMはどのように計算されますか？",
        a: "入力した総文字数を5（標準的な単語の長さ）で割り、経過時間（分）で割ることでWPMを算出します。",
      },
      {
        q: "正確率はどのように計算されますか？",
        a: "入力した全文字数のうち、正しく入力できた文字の割合です。タイプミスを修正してもエラーカウントは増えます。",
      },
      {
        q: "ベスト記録はどこに保存されますか？",
        a: "ベスト記録はブラウザのローカルストレージに保存され、同じデバイスで引き続き表示されます。",
      },
    ],
  },
  zh: {
    title: "打字速度测试",
    subtitle: "测量您的打字速度",
    difficulty: "难度",
    easy: "简单",
    medium: "中等",
    hard: "困难",
    startPrompt: "开始输入后计时器自动启动",
    timeLeft: "剩余时间",
    wpm: "字符/分",
    accuracy: "准确率",
    chars: "字符数",
    errors: "错误",
    results: "结果",
    finalWpm: "每分钟字符数",
    finalAccuracy: "准确率",
    charsTyped: "已输入字符",
    errorsMade: "错误数",
    rating: "评级",
    tryAgain: "再试一次",
    bestWpm: "最高记录",
    newRecord: "新纪录！",
    wpmUnit: "字/分",
    seconds: "秒",
    ratings: [
      { label: "初学者", min: 0 },
      { label: "普通", min: 20 },
      { label: "较快", min: 50 },
      { label: "专业", min: 80 },
      { label: "大师", min: 120 },
    ],
    faqTitle: "常见问题",
    faq: [
      {
        q: "速度是如何计算的？",
        a: "将输入的总字符数除以5（标准词长），再除以经过的时间（分钟）得出每分钟字数。",
      },
      {
        q: "准确率是如何计算的？",
        a: "准确率是正确输入字符数占总输入字符数的百分比。修正错误不会减少错误计数。",
      },
      {
        q: "最高记录保存在哪里？",
        a: "最高记录保存在浏览器的本地存储中，在同一设备上跨会话保留。",
      },
    ],
  },
  es: {
    title: "Test de Velocidad de Escritura",
    subtitle: "Mide tu velocidad al escribir",
    difficulty: "Dificultad",
    easy: "Fácil",
    medium: "Medio",
    hard: "Difícil",
    startPrompt: "Comienza a escribir para iniciar el cronómetro",
    timeLeft: "Tiempo Restante",
    wpm: "PPM",
    accuracy: "Precisión",
    chars: "Caracteres",
    errors: "Errores",
    results: "Resultados",
    finalWpm: "Palabras por Minuto",
    finalAccuracy: "Precisión",
    charsTyped: "Caracteres Escritos",
    errorsMade: "Errores Cometidos",
    rating: "Clasificación",
    tryAgain: "Intentar de Nuevo",
    bestWpm: "Mejor Marca",
    newRecord: "¡Nuevo Récord!",
    wpmUnit: "PPM",
    seconds: "s",
    ratings: [
      { label: "Principiante", min: 0 },
      { label: "Promedio", min: 20 },
      { label: "Rápido", min: 50 },
      { label: "Pro", min: 80 },
      { label: "Maestro", min: 120 },
    ],
    faqTitle: "Preguntas Frecuentes",
    faq: [
      {
        q: "¿Cómo se calcula el PPM?",
        a: "El PPM se calcula dividiendo el total de caracteres escritos entre 5 (longitud estándar de una palabra), luego dividiendo entre el tiempo transcurrido en minutos.",
      },
      {
        q: "¿Cómo se mide la precisión?",
        a: "La precisión es el porcentaje de caracteres escritos correctamente del total de caracteres intentados. Corregir un error no lo elimina del conteo.",
      },
      {
        q: "¿Dónde se guarda mi mejor marca?",
        a: "Tu mejor marca se guarda en el almacenamiento local del navegador y persiste entre sesiones en el mismo dispositivo.",
      },
    ],
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TEST_DURATION = 60;

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function calcWpm(correctChars: number, elapsedSecs: number): number {
  if (elapsedSecs <= 0) return 0;
  return Math.round((correctChars / 5) / (elapsedSecs / 60));
}

function getRating(
  wpm: number,
  ratings: { label: string; min: number }[]
): string {
  const sorted = [...ratings].sort((a, b) => b.min - a.min);
  return (sorted.find((r) => wpm >= r.min) ?? ratings[0]).label;
}

// ─── Component ────────────────────────────────────────────────────────────────

type Difficulty = "easy" | "medium" | "hard";
type Phase = "idle" | "typing" | "done";

const BEST_KEY = "typing-test-best-wpm";

export default function TypingTestPage() {
  const locale = useLocale();
  const t = translations[locale];

  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [text, setText] = useState<string>(() =>
    pickRandom(typingTexts[locale][difficulty])
  );
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION);
  const [errors, setErrors] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [bestWpm, setBestWpm] = useState<number>(0);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [finalWpm, setFinalWpm] = useState(0);
  const [finalAccuracy, setFinalAccuracy] = useState(100);
  const [finalChars, setFinalChars] = useState(0);
  const [finalErrors, setFinalErrors] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const currentInputRef = useRef<string>("");

  // Load best from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(BEST_KEY);
      if (stored) setBestWpm(parseInt(stored, 10));
    } catch {
      // ignore
    }
  }, []);

  // Keep text updated when locale or difficulty changes (only in idle)
  useEffect(() => {
    if (phase === "idle") {
      setText(pickRandom(typingTexts[locale][difficulty]));
    }
  }, [locale, difficulty, phase]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const finishTest = useCallback(
    (inputValue: string, elapsedSecs: number) => {
      stopTimer();
      const correct = inputValue
        .split("")
        .filter((ch, i) => ch === text[i]).length;
      const total = inputValue.length;
      const errCount = inputValue
        .split("")
        .filter((ch, i) => ch !== text[i]).length;
      const wpm = calcWpm(correct, elapsedSecs);
      const acc = total > 0 ? Math.round((correct / total) * 100) : 100;

      setFinalWpm(wpm);
      setFinalAccuracy(acc);
      setFinalChars(total);
      setFinalErrors(errCount);
      setPhase("done");

      // Check best
      try {
        const stored = localStorage.getItem(BEST_KEY);
        const prev = stored ? parseInt(stored, 10) : 0;
        if (wpm > prev) {
          localStorage.setItem(BEST_KEY, String(wpm));
          setBestWpm(wpm);
          setIsNewRecord(true);
        }
      } catch {
        // ignore
      }
    },
    [text, stopTimer]
  );

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;

      // Don't allow typing past the text length
      if (val.length > text.length) return;

      setInput(val);
      currentInputRef.current = val;

      // Count live stats
      const correct = val.split("").filter((ch, i) => ch === text[i]).length;
      const errCount = val.split("").filter((ch, i) => ch !== text[i]).length;
      setCorrectChars(correct);
      setErrors(errCount);

      // Start timer on first keystroke
      if (phase === "idle" && val.length > 0) {
        setPhase("typing");
        startTimeRef.current = Date.now();
        timerRef.current = setInterval(() => {
          const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
          const remaining = TEST_DURATION - elapsed;
          if (remaining <= 0) {
            setTimeLeft(0);
            finishTest(currentInputRef.current, TEST_DURATION);
          } else {
            setTimeLeft(remaining);
          }
        }, 250);
      }

      // Finished entire text before time runs out
      if (val.length === text.length && phase !== "done") {
        const elapsed = Math.max(
          1,
          Math.floor((Date.now() - startTimeRef.current) / 1000)
        );
        finishTest(val, elapsed);
      }
    },
    [phase, text, finishTest]
  );

  const handleReset = useCallback(() => {
    stopTimer();
    const newText = pickRandom(typingTexts[locale][difficulty]);
    setText(newText);
    setInput("");
    setPhase("idle");
    setTimeLeft(TEST_DURATION);
    setErrors(0);
    setCorrectChars(0);
    setIsNewRecord(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [locale, difficulty, stopTimer]);

  const handleDifficulty = (d: Difficulty) => {
    if (phase !== "idle") return;
    setDifficulty(d);
  };

  // Live WPM during typing
  const elapsedSecs =
    phase === "typing"
      ? Math.max(1, TEST_DURATION - timeLeft)
      : TEST_DURATION;
  const liveWpm = phase === "typing" ? calcWpm(correctChars, elapsedSecs) : 0;
  const liveAccuracy =
    input.length > 0
      ? Math.round(
          (input.split("").filter((ch, i) => ch === text[i]).length /
            input.length) *
            100
        )
      : 100;

  // Rating color
  const ratingColorMap: Record<string, string> = {
    Beginner: "text-slate-400",
    Average: "text-green-400",
    Fast: "text-blue-400",
    Pro: "text-purple-400",
    Master: "text-yellow-400",
    입문자: "text-slate-400",
    평균: "text-green-400",
    빠름: "text-blue-400",
    프로: "text-purple-400",
    마스터: "text-yellow-400",
    初心者: "text-slate-400",
    平均: "text-green-400",
    速い: "text-blue-400",
    プロ: "text-purple-400",
    マスター: "text-yellow-400",
    初学者: "text-slate-400",
    普通: "text-green-400",
    较快: "text-blue-400",
    专业: "text-purple-400",
    大师: "text-yellow-400",
    Principiante: "text-slate-400",
    Promedio: "text-green-400",
    Rápido: "text-blue-400",
    Maestro: "text-yellow-400",
  };

  const finalRating = getRating(finalWpm, t.ratings);
  const ratingColor = ratingColorMap[finalRating] ?? "text-sky-400";

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-500 shadow-lg mb-3">
              <span className="text-2xl">⌨️</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {t.title}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Ad - horizontal */}
          <AdBanner format="horizontal" className="mb-5 rounded-2xl overflow-hidden" />

          {/* Difficulty selector */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 mb-4"
          >
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3">
              {t.difficulty}
            </p>
            <div className="flex gap-2">
              {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => handleDifficulty(d)}
                  disabled={phase !== "idle"}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                    difficulty === d
                      ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {t[d]}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="grid grid-cols-4 gap-3 mb-4"
          >
            {[
              {
                label: t.timeLeft,
                value: `${timeLeft}${t.seconds}`,
                color:
                  timeLeft <= 10
                    ? "text-red-500"
                    : "text-slate-700 dark:text-slate-200",
              },
              { label: t.wpm, value: liveWpm, color: "text-sky-600 dark:text-sky-400" },
              {
                label: t.accuracy,
                value: `${liveAccuracy}%`,
                color: "text-green-600 dark:text-green-400",
              },
              { label: t.errors, value: errors, color: "text-red-500 dark:text-red-400" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white dark:bg-slate-800 rounded-xl p-3 text-center shadow-sm border border-slate-200 dark:border-slate-700"
              >
                <p className={`text-lg font-bold font-mono ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Typing area */}
          <AnimatePresence mode="wait">
            {phase !== "done" ? (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-4"
              >
                {/* Text display */}
                <div
                  className="font-mono text-base leading-relaxed mb-4 select-none cursor-text p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 min-h-[80px]"
                  onClick={() => inputRef.current?.focus()}
                  aria-label="typing text"
                >
                  {text.split("").map((char, i) => {
                    let className = "text-slate-400 dark:text-slate-500"; // untyped
                    if (i < input.length) {
                      if (input[i] === char) {
                        className = "text-green-600 dark:text-green-400"; // correct
                      } else {
                        className = "bg-red-200 dark:bg-red-900/60 text-red-700 dark:text-red-400 rounded"; // wrong
                      }
                    } else if (i === input.length) {
                      className =
                        "text-slate-800 dark:text-slate-100 underline decoration-sky-500 decoration-2"; // cursor position
                    }
                    return (
                      <span key={i} className={className}>
                        {char}
                      </span>
                    );
                  })}
                </div>

                {/* Input field */}
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInput}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  placeholder={phase === "idle" ? t.startPrompt : ""}
                  className="w-full font-mono text-base px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-sky-400 dark:focus:border-sky-500 transition-colors"
                />

                {/* Best WPM note */}
                {bestWpm > 0 && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 text-right">
                    {t.bestWpm}: {bestWpm} {t.wpmUnit}
                  </p>
                )}
              </motion.div>
            ) : (
              /* ── Results screen ── */
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-4"
              >
                <h2 className="text-center text-lg font-bold text-slate-700 dark:text-slate-200 mb-4">
                  {t.results}
                </h2>

                {/* Big WPM number */}
                <div className="text-center mb-6">
                  <motion.p
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 14 }}
                    className="text-7xl font-black font-mono bg-gradient-to-r from-sky-500 to-blue-500 bg-clip-text text-transparent"
                  >
                    {finalWpm}
                  </motion.p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {t.finalWpm}
                  </p>
                  {isNewRecord && (
                    <motion.span
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="inline-block mt-2 px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400 text-xs font-bold"
                    >
                      {t.newRecord}
                    </motion.span>
                  )}
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { label: t.finalAccuracy, value: `${finalAccuracy}%`, color: "text-green-600 dark:text-green-400" },
                    { label: t.rating, value: finalRating, color: ratingColor },
                    { label: t.charsTyped, value: finalChars, color: "text-sky-600 dark:text-sky-400" },
                    { label: t.errorsMade, value: finalErrors, color: "text-red-500 dark:text-red-400" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 text-center"
                    >
                      <p className={`text-2xl font-bold font-mono ${s.color}`}>
                        {s.value}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Best WPM */}
                {bestWpm > 0 && (
                  <p className="text-center text-xs text-slate-400 dark:text-slate-500 mb-4">
                    {t.bestWpm}: {bestWpm} {t.wpmUnit}
                  </p>
                )}

                {/* Try again */}
                <button
                  onClick={handleReset}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 text-white font-semibold shadow hover:opacity-90 transition-opacity"
                >
                  {t.tryAgain}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reset button (visible during idle/typing) */}
          {phase !== "done" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-end mb-5"
            >
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                {t.tryAgain}
              </button>
            </motion.div>
          )}

          {/* Ad - in-article */}
          <AdBanner format="in-article" className="mb-5 rounded-2xl overflow-hidden" />

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-5"
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

          {/* Ad - rectangle */}
          <AdBanner format="rectangle" className="mb-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
        </div>
      </div>
    </PageTransition>
  );
}
