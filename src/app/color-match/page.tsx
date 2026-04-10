"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/i18n/config";

type Phase = "setup" | "game" | "result";
type Difficulty = "easy" | "medium" | "hard";
type GameMode = "color" | "word";

interface ColorEntry {
  id: string;
  name: Record<Locale, string>;
  hex: string;
  tailwindText: string;
  tailwindBg: string;
}

const COLORS: ColorEntry[] = [
  {
    id: "red",
    name: { ko: "빨강", en: "Red", ja: "赤", zh: "红色", es: "Rojo" },
    hex: "#ef4444",
    tailwindText: "text-red-500",
    tailwindBg: "bg-red-500",
  },
  {
    id: "blue",
    name: { ko: "파랑", en: "Blue", ja: "青", zh: "蓝色", es: "Azul" },
    hex: "#3b82f6",
    tailwindText: "text-blue-500",
    tailwindBg: "bg-blue-500",
  },
  {
    id: "green",
    name: { ko: "초록", en: "Green", ja: "緑", zh: "绿色", es: "Verde" },
    hex: "#22c55e",
    tailwindText: "text-green-500",
    tailwindBg: "bg-green-500",
  },
  {
    id: "yellow",
    name: { ko: "노랑", en: "Yellow", ja: "黄", zh: "黄色", es: "Amarillo" },
    hex: "#eab308",
    tailwindText: "text-yellow-500",
    tailwindBg: "bg-yellow-400",
  },
  {
    id: "purple",
    name: { ko: "보라", en: "Purple", ja: "紫", zh: "紫色", es: "Morado" },
    hex: "#a855f7",
    tailwindText: "text-purple-500",
    tailwindBg: "bg-purple-500",
  },
  {
    id: "orange",
    name: { ko: "주황", en: "Orange", ja: "橙", zh: "橙色", es: "Naranja" },
    hex: "#f97316",
    tailwindText: "text-orange-500",
    tailwindBg: "bg-orange-500",
  },
];

const DIFFICULTY_CHOICES: Record<Difficulty, number> = {
  easy: 2,
  medium: 4,
  hard: 6,
};

const DIFFICULTY_TIME: Record<Difficulty, number> = {
  easy: 30,
  medium: 30,
  hard: 25,
};

const translations: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    modeColor: string;
    modeColorDesc: string;
    modeWord: string;
    modeWordDesc: string;
    difficultyLabel: string;
    easy: string;
    medium: string;
    hard: string;
    easyDesc: string;
    mediumDesc: string;
    hardDesc: string;
    startButton: string;
    instructionColor: string;
    instructionWord: string;
    timeLeft: string;
    score: string;
    streak: string;
    correct: string;
    wrong: string;
    accuracy: string;
    bestStreak: string;
    highScore: string;
    newHighScore: string;
    playAgain: string;
    changeMode: string;
    resultTitle: string;
    comboText: (n: number) => string;
    faqTitle: string;
    faqItems: { q: string; a: string }[];
  }
> = {
  ko: {
    title: "색깔 맞추기",
    subtitle: "스트룹 테스트 - 집중력을 테스트해보세요!",
    modeColor: "색깔 맞추기",
    modeColorDesc: "글자의 폰트 색깔을 선택하세요",
    modeWord: "단어 맞추기",
    modeWordDesc: "글자가 뜻하는 색깔을 선택하세요",
    difficultyLabel: "난이도",
    easy: "쉬움",
    medium: "보통",
    hard: "어려움",
    easyDesc: "2개 선택지 · 30초",
    mediumDesc: "4개 선택지 · 30초",
    hardDesc: "6개 선택지 · 25초",
    startButton: "시작하기",
    instructionColor: "글자의 색깔은?",
    instructionWord: "글자의 뜻은?",
    timeLeft: "남은 시간",
    score: "점수",
    streak: "연속",
    correct: "정답",
    wrong: "오답",
    accuracy: "정확도",
    bestStreak: "최고 연속",
    highScore: "최고 점수",
    newHighScore: "새 최고 기록!",
    playAgain: "다시 하기",
    changeMode: "모드 변경",
    resultTitle: "결과",
    comboText: (n: number) => `${n}연속! 🔥`,
    faqTitle: "자주 묻는 질문",
    faqItems: [
      {
        q: "스트룹 테스트(색깔 맞추기)란 무엇인가요?",
        a: "스트룹 테스트는 1935년 심리학자 John Ridley Stroop이 개발한 인지 능력 테스트입니다. 글자의 의미(예: '빨강')와 글자의 색깔(예: 파란색으로 쓰인)이 다를 때 두뇌가 혼란을 겪는 스트룹 간섭 효과를 측정합니다. 집중력, 처리 속도, 인지 유연성을 훈련하는 데 효과적입니다.",
      },
      {
        q: "색깔 맞추기와 단어 맞추기의 차이는 무엇인가요?",
        a: "색깔 맞추기 모드는 글자의 폰트 색깔을 선택하는 것이고, 단어 맞추기 모드는 글자가 뜻하는 색깔을 선택하는 것입니다. 단어 맞추기가 글자 의미의 간섭을 더 강하게 받아 일반적으로 더 어렵습니다.",
      },
      {
        q: "점수는 어떻게 계산되나요?",
        a: "정답을 맞출 때마다 10점이 주어집니다. 3연속 이상은 2배(20점), 5연속 이상은 3배(30점) 점수를 얻습니다. 오답 시에는 5점이 차감됩니다. 연속 정답을 유지할수록 더 높은 점수를 얻을 수 있습니다.",
      },
      {
        q: "어떻게 하면 높은 점수를 받을 수 있나요?",
        a: "글자의 의미에 집중하지 말고 시각적 색깔에만 집중하는 연습이 필요합니다. 처음에는 천천히 정확하게 시작하고, 익숙해지면 속도를 높이세요. 연속 정답 콤보를 유지하면 점수가 2~3배로 불어납니다.",
      },
    ],
  },
  en: {
    title: "Color Match",
    subtitle: "Stroop Test - Test your focus!",
    modeColor: "Match the Color",
    modeColorDesc: "Select the font color of the word",
    modeWord: "Match the Word",
    modeWordDesc: "Select the color the word means",
    difficultyLabel: "Difficulty",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    easyDesc: "2 choices · 30s",
    mediumDesc: "4 choices · 30s",
    hardDesc: "6 choices · 25s",
    startButton: "Start",
    instructionColor: "What color is the text?",
    instructionWord: "What does the word say?",
    timeLeft: "Time Left",
    score: "Score",
    streak: "Streak",
    correct: "Correct",
    wrong: "Wrong",
    accuracy: "Accuracy",
    bestStreak: "Best Streak",
    highScore: "High Score",
    newHighScore: "New High Score!",
    playAgain: "Play Again",
    changeMode: "Change Mode",
    resultTitle: "Result",
    comboText: (n: number) => `${n} Combo! 🔥`,
    faqTitle: "Frequently Asked Questions",
    faqItems: [
      {
        q: "What is a Stroop Test?",
        a: "The Stroop Test, developed by psychologist John Ridley Stroop in 1935, measures the Stroop interference effect — the cognitive confusion when a word's meaning (e.g. 'Red') conflicts with its ink color (e.g. written in blue). It's an effective tool for training focus, processing speed, and cognitive flexibility.",
      },
      {
        q: "What's the difference between Color mode and Word mode?",
        a: "In Color mode you select the font color of the displayed word, while in Word mode you select the color the word means. Word mode is generally harder because the word's meaning creates stronger interference with your response.",
      },
      {
        q: "How is the score calculated?",
        a: "Each correct answer earns 10 points. Maintaining a streak of 3+ gives 2x points (20), and 5+ gives 3x points (30). Wrong answers deduct 5 points. Building and maintaining combos is key to a high score.",
      },
      {
        q: "How can I get a higher score?",
        a: "Train yourself to focus only on the visual color, ignoring the word's meaning. Start slowly for accuracy, then increase speed as you improve. Maintaining a combo streak multiplies your points by 2–3x.",
      },
    ],
  },
  ja: {
    title: "色マッチ",
    subtitle: "ストループテスト - 集中力を試そう！",
    modeColor: "色を合わせる",
    modeColorDesc: "文字のフォントカラーを選んでください",
    modeWord: "単語を合わせる",
    modeWordDesc: "文字が意味する色を選んでください",
    difficultyLabel: "難易度",
    easy: "簡単",
    medium: "普通",
    hard: "難しい",
    easyDesc: "2択 · 30秒",
    mediumDesc: "4択 · 30秒",
    hardDesc: "6択 · 25秒",
    startButton: "スタート",
    instructionColor: "文字の色は？",
    instructionWord: "文字の意味は？",
    timeLeft: "残り時間",
    score: "スコア",
    streak: "連続",
    correct: "正解",
    wrong: "不正解",
    accuracy: "正確率",
    bestStreak: "最高連続",
    highScore: "ハイスコア",
    newHighScore: "新記録！",
    playAgain: "もう一度",
    changeMode: "モード変更",
    resultTitle: "結果",
    comboText: (n: number) => `${n}連続！🔥`,
    faqTitle: "よくある質問",
    faqItems: [
      {
        q: "ストループテストとは何ですか？",
        a: "ストループテストは1935年に心理学者John Ridley Stroopが開発した認知テストです。単語の意味（例：「赤」）とフォントカラー（例：青で書かれた）が異なる場合に脳が混乱するストループ干渉効果を測定します。集中力・処理速度・認知柔軟性のトレーニングに効果的です。",
      },
      {
        q: "色モードと単語モードの違いは？",
        a: "色モードは表示された文字のフォントカラーを選ぶモード、単語モードは文字が意味する色を選ぶモードです。単語モードは文字の意味による干渉が強く、一般的により難しいです。",
      },
      {
        q: "スコアはどう計算されますか？",
        a: "正解するたびに10点獲得。3連続以上は2倍（20点）、5連続以上は3倍（30点）になります。不正解は5点減点です。コンボを維持するほど高得点につながります。",
      },
    ],
  },
  zh: {
    title: "颜色匹配",
    subtitle: "斯特鲁普测试 - 测试你的专注力！",
    modeColor: "匹配颜色",
    modeColorDesc: "选择文字的字体颜色",
    modeWord: "匹配单词",
    modeWordDesc: "选择文字所表示的颜色",
    difficultyLabel: "难度",
    easy: "简单",
    medium: "普通",
    hard: "困难",
    easyDesc: "2个选项 · 30秒",
    mediumDesc: "4个选项 · 30秒",
    hardDesc: "6个选项 · 25秒",
    startButton: "开始",
    instructionColor: "「文字的颜色是？」",
    instructionWord: "「文字的含义是？」",
    timeLeft: "剩余时间",
    score: "分数",
    streak: "连续",
    correct: "正确",
    wrong: "错误",
    accuracy: "准确率",
    bestStreak: "最高连续",
    highScore: "最高分",
    newHighScore: "「新纪录！」",
    playAgain: "再玩一次",
    changeMode: "切换模式",
    resultTitle: "结果",
    comboText: (n: number) => `${n}连续！🔥`,
    faqTitle: "常见问题",
    faqItems: [
      {
        q: "「什么是斯特鲁普测试？」",
        a: "斯特鲁普测试由心理学家John Ridley Stroop于1935年开发，测量当单词含义（如「红色」）与字体颜色（如蓝色书写）不一致时大脑产生的干扰效应。对训练专注力、处理速度和认知灵活性非常有效。",
      },
      {
        q: "「颜色模式和单词模式有什么区别？」",
        a: "颜色模式是选择文字的字体颜色，单词模式是选择文字所表示的颜色。单词模式因文字含义干扰更强，通常更难。",
      },
      {
        q: "「分数如何计算？」",
        a: "每答对一题得10分。连续答对3次以上得2倍分（20分），5次以上得3倍分（30分）。答错扣5分。保持连击是获得高分的关键。",
      },
      {
        q: "「如何获得高分？」",
        a: "训练自己只关注视觉颜色而忽略单词含义。从准确开始，熟练后再提高速度。保持连击倍数可让分数提升2至3倍。",
      },
    ],
  },
  es: {
    title: "Combinar Colores",
    subtitle: "Test de Stroop - ¡Pon a prueba tu concentración!",
    modeColor: "Combinar Color",
    modeColorDesc: "Selecciona el color de la fuente del texto",
    modeWord: "Combinar Palabra",
    modeWordDesc: "Selecciona el color que significa la palabra",
    difficultyLabel: "Dificultad",
    easy: "Fácil",
    medium: "Medio",
    hard: "Difícil",
    easyDesc: "2 opciones · 30s",
    mediumDesc: "4 opciones · 30s",
    hardDesc: "6 opciones · 25s",
    startButton: "Comenzar",
    instructionColor: "¿De qué color es el texto?",
    instructionWord: "¿Qué dice la palabra?",
    timeLeft: "Tiempo",
    score: "Puntos",
    streak: "Racha",
    correct: "Correctas",
    wrong: "Incorrectas",
    accuracy: "Precisión",
    bestStreak: "Mejor Racha",
    highScore: "Récord",
    newHighScore: "¡Nuevo Récord!",
    playAgain: "Jugar de Nuevo",
    changeMode: "Cambiar Modo",
    resultTitle: "Resultado",
    comboText: (n: number) => `¡${n} seguidas! 🔥`,
    faqTitle: "Preguntas frecuentes",
    faqItems: [
      {
        q: "¿Qué es el Test de Stroop?",
        a: "El Test de Stroop, desarrollado por el psicólogo John Ridley Stroop en 1935, mide el efecto de interferencia Stroop — la confusión cognitiva cuando el significado de una palabra (p. ej. 'Rojo') contradice su color de tinta (p. ej. escrito en azul). Es una herramienta eficaz para entrenar la concentración, velocidad de procesamiento y flexibilidad cognitiva.",
      },
      {
        q: "¿En qué se diferencian el modo Color y el modo Palabra?",
        a: "En el modo Color seleccionas el color de la fuente de la palabra mostrada; en el modo Palabra seleccionas el color que significa la palabra. El modo Palabra es más difícil porque el significado de la palabra crea mayor interferencia.",
      },
      {
        q: "¿Cómo se calcula la puntuación?",
        a: "Cada respuesta correcta otorga 10 puntos. Una racha de 3+ da 2x puntos (20), y de 5+ da 3x puntos (30). Las respuestas incorrectas restan 5 puntos. Mantener combos es clave para una puntuación alta.",
      },
    ],
  },
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateQuestion(
  locale: Locale,
  mode: GameMode,
  numChoices: number
): {
  displayWord: ColorEntry;
  fontColor: ColorEntry;
  correctAnswer: ColorEntry;
  choices: ColorEntry[];
} {
  // Pick a word to display (the word meaning)
  const displayWord = pickRandom(COLORS);
  // Pick a font color that is different from the word meaning
  let fontColor = pickRandom(COLORS);
  while (fontColor.id === displayWord.id) {
    fontColor = pickRandom(COLORS);
  }

  // In color mode: correct answer = font color
  // In word mode: correct answer = display word (the meaning)
  const correctAnswer = mode === "color" ? fontColor : displayWord;

  // Build choices pool ensuring correct answer is included
  const pool = COLORS.filter((c) => c.id !== correctAnswer.id);
  const shuffledPool = shuffle(pool);
  const wrongChoices = shuffledPool.slice(0, numChoices - 1);
  const choices = shuffle([correctAnswer, ...wrongChoices]);

  return { displayWord, fontColor, correctAnswer, choices };
}

export default function ColorMatchPage() {
  const locale = useLocale();
  const t = translations[locale];

  const [phase, setPhase] = useState<Phase>("setup");
  const [mode, setMode] = useState<GameMode>("color");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");

  // Game state
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  // Current question
  const [question, setQuestion] = useState<ReturnType<typeof generateQuestion> | null>(null);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
  const [showCombo, setShowCombo] = useState(false);
  const [comboCount, setComboCount] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const feedbackRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const comboRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const highScoreKey = `color-match-highscore-${mode}-${difficulty}`;

  // Load high score
  useEffect(() => {
    try {
      const stored = localStorage.getItem(highScoreKey);
      if (stored) setHighScore(parseInt(stored, 10));
      else setHighScore(0);
    } catch {
      setHighScore(0);
    }
  }, [highScoreKey]);

  const nextQuestion = useCallback(() => {
    const numChoices = DIFFICULTY_CHOICES[difficulty];
    setQuestion(generateQuestion(locale, mode, numChoices));
    setFeedback("idle");
  }, [difficulty, locale, mode]);

  const endGame = useCallback(
    (finalScore: number) => {
      if (timerRef.current) clearInterval(timerRef.current);
      try {
        const stored = localStorage.getItem(highScoreKey);
        const prev = stored ? parseInt(stored, 10) : 0;
        if (finalScore > prev) {
          localStorage.setItem(highScoreKey, String(finalScore));
          setHighScore(finalScore);
          setIsNewHighScore(true);
        } else {
          setIsNewHighScore(false);
        }
      } catch {
        // localStorage unavailable
      }
      setPhase("result");
    },
    [highScoreKey]
  );

  const startGame = useCallback(() => {
    const totalTime = DIFFICULTY_TIME[difficulty];
    setTimeLeft(totalTime);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setCorrectCount(0);
    setWrongCount(0);
    setIsNewHighScore(false);
    setFeedback("idle");
    setShowCombo(false);
    setComboCount(0);

    const numChoices = DIFFICULTY_CHOICES[difficulty];
    setQuestion(generateQuestion(locale, mode, numChoices));
    setPhase("game");
  }, [difficulty, locale, mode]);

  // Track score in ref for timer closure
  const scoreRef = useRef(score);
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // Timer - uses scoreRef to avoid stale closure
  useEffect(() => {
    if (phase !== "game") return;
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          endGame(scoreRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, endGame]);

  const handleAnswer = useCallback(
    (chosen: ColorEntry) => {
      if (!question || feedback !== "idle") return;

      const isCorrect = chosen.id === question.correctAnswer.id;

      if (isCorrect) {
        setFeedback("correct");
        setCorrectCount((c) => c + 1);
        setStreak((s) => {
          const newStreak = s + 1;
          if (newStreak > bestStreak) setBestStreak(newStreak);

          // Streak bonus multiplier
          const multiplier = newStreak >= 5 ? 3 : newStreak >= 3 ? 2 : 1;
          const points = 10 * multiplier;
          setScore((prev) => prev + points);
          scoreRef.current = scoreRef.current + points;

          if (newStreak >= 3) {
            setComboCount(newStreak);
            setShowCombo(true);
            if (comboRef.current) clearTimeout(comboRef.current);
            comboRef.current = setTimeout(() => setShowCombo(false), 900);
          }

          return newStreak;
        });
      } else {
        setFeedback("wrong");
        setWrongCount((w) => w + 1);
        setStreak(0);
        setScore((prev) => Math.max(0, prev - 5));
        scoreRef.current = Math.max(0, scoreRef.current - 5);
      }

      if (feedbackRef.current) clearTimeout(feedbackRef.current);
      feedbackRef.current = setTimeout(() => {
        nextQuestion();
      }, 300);
    },
    [question, feedback, bestStreak, nextQuestion]
  );

  const totalAttempts = correctCount + wrongCount;
  const accuracy = totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0;

  const totalTime = DIFFICULTY_TIME[difficulty];
  const timerPercent = (timeLeft / totalTime) * 100;
  const timerColor =
    timerPercent > 50
      ? "bg-green-500"
      : timerPercent > 25
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <PageTransition>
      <main className="min-h-screen bg-gradient-to-br from-yellow-500 to-red-500 py-8 px-4">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-black text-white drop-shadow-lg">{t.title}</h1>
            <p className="text-white/80 text-sm mt-1">{t.subtitle}</p>
          </div>

          <AdBanner format="horizontal" className="mb-6 rounded-xl overflow-hidden" />

          {/* SETUP PHASE */}
          <AnimatePresence mode="wait">
            {phase === "setup" && (
              <motion.div
                key="setup"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {/* Mode selection */}
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setMode("color")}
                      className={`p-4 rounded-xl transition-all font-bold text-sm ${
                        mode === "color"
                          ? "bg-white text-orange-600 shadow-lg scale-105"
                          : "bg-white/30 text-white hover:bg-white/40"
                      }`}
                    >
                      <div className="text-2xl mb-1">🎨</div>
                      <div>{t.modeColor}</div>
                      <div className={`text-xs mt-1 font-normal ${mode === "color" ? "text-orange-400" : "text-white/70"}`}>
                        {t.modeColorDesc}
                      </div>
                    </button>
                    <button
                      onClick={() => setMode("word")}
                      className={`p-4 rounded-xl transition-all font-bold text-sm ${
                        mode === "word"
                          ? "bg-white text-orange-600 shadow-lg scale-105"
                          : "bg-white/30 text-white hover:bg-white/40"
                      }`}
                    >
                      <div className="text-2xl mb-1">📝</div>
                      <div>{t.modeWord}</div>
                      <div className={`text-xs mt-1 font-normal ${mode === "word" ? "text-orange-400" : "text-white/70"}`}>
                        {t.modeWordDesc}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Difficulty */}
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <p className="text-white font-bold text-sm mb-3">{t.difficultyLabel}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
                      <button
                        key={d}
                        onClick={() => setDifficulty(d)}
                        className={`p-3 rounded-xl transition-all font-bold text-xs ${
                          difficulty === d
                            ? "bg-white text-orange-600 shadow-lg scale-105"
                            : "bg-white/30 text-white hover:bg-white/40"
                        }`}
                      >
                        <div>{t[d]}</div>
                        <div className={`text-xs mt-1 font-normal ${difficulty === d ? "text-orange-400" : "text-white/70"}`}>
                          {t[`${d}Desc` as "easyDesc" | "mediumDesc" | "hardDesc"]}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* High score display */}
                {highScore > 0 && (
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 text-center">
                    <span className="text-white/80 text-sm">
                      {t.highScore}: <span className="font-black text-white text-lg">{highScore}</span>
                    </span>
                  </div>
                )}

                <button
                  onClick={startGame}
                  className="w-full py-4 bg-white text-orange-600 font-black text-xl rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-transform"
                >
                  {t.startButton}
                </button>
              </motion.div>
            )}

            {/* GAME PHASE */}
            {phase === "game" && question && (
              <motion.div
                key="game"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-4"
              >
                {/* Stats bar */}
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                  <div className="grid grid-cols-3 gap-2 text-center text-white">
                    <div>
                      <div className="text-xs opacity-75">{t.score}</div>
                      <div className="font-black text-xl">{score}</div>
                    </div>
                    <div>
                      <div className="text-xs opacity-75">{t.timeLeft}</div>
                      <div className={`font-black text-xl ${timeLeft <= 5 ? "text-red-200 animate-pulse" : ""}`}>
                        {timeLeft}s
                      </div>
                    </div>
                    <div>
                      <div className="text-xs opacity-75">{t.streak}</div>
                      <div className="font-black text-xl">{streak}</div>
                    </div>
                  </div>
                  {/* Timer bar */}
                  <div className="mt-2 h-2 bg-white/30 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${timerColor}`}
                      animate={{ width: `${timerPercent}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Instruction */}
                <div className="text-center text-white/90 font-bold text-sm">
                  {mode === "color" ? t.instructionColor : t.instructionWord}
                </div>

                {/* Main word display */}
                <div className="relative">
                  <motion.div
                    key={question.displayWord.id + question.fontColor.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center`}
                    style={{ height: "160px" }}
                  >
                    <span
                      className="font-black select-none"
                      style={{
                        color: question.fontColor.hex,
                        fontSize: "clamp(3rem, 12vw, 5rem)",
                        textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                      }}
                    >
                      {question.displayWord.name[locale]}
                    </span>
                  </motion.div>

                  {/* Feedback overlay */}
                  <AnimatePresence>
                    {feedback !== "idle" && (
                      <motion.div
                        key={feedback}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        className="absolute inset-0 flex items-center justify-center rounded-3xl"
                        style={{
                          background:
                            feedback === "correct"
                              ? "rgba(34,197,94,0.4)"
                              : "rgba(239,68,68,0.4)",
                        }}
                      >
                        <span className="text-6xl">
                          {feedback === "correct" ? "✓" : "✗"}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Combo animation */}
                <AnimatePresence>
                  {showCombo && (
                    <motion.div
                      key="combo"
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 1.2 }}
                      className="text-center"
                    >
                      <span className="text-white font-black text-2xl drop-shadow-lg">
                        {t.comboText(comboCount)}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Answer buttons */}
                <div
                  className={`grid gap-3 ${
                    question.choices.length === 2
                      ? "grid-cols-2"
                      : question.choices.length <= 4
                      ? "grid-cols-2"
                      : "grid-cols-3"
                  }`}
                >
                  {question.choices.map((color) => (
                    <motion.button
                      key={color.id}
                      onClick={() => handleAnswer(color)}
                      whileTap={{ scale: 0.92 }}
                      className={`py-4 rounded-2xl font-black text-white text-lg shadow-lg active:scale-95 transition-transform ${color.tailwindBg}`}
                      style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
                    >
                      {color.name[locale]}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* RESULT PHASE */}
            {phase === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 text-center text-white">
                  <div className="text-4xl mb-2">{isNewHighScore ? "🏆" : "🎯"}</div>
                  <h2 className="text-2xl font-black mb-1">{t.resultTitle}</h2>
                  {isNewHighScore && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-yellow-300 font-black text-lg mb-2"
                    >
                      {t.newHighScore}
                    </motion.div>
                  )}
                  <div className="text-5xl font-black mt-3 mb-4">{score}</div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-white/20 rounded-xl p-3">
                      <div className="opacity-75">{t.correct}</div>
                      <div className="font-black text-2xl text-green-300">{correctCount}</div>
                    </div>
                    <div className="bg-white/20 rounded-xl p-3">
                      <div className="opacity-75">{t.wrong}</div>
                      <div className="font-black text-2xl text-red-300">{wrongCount}</div>
                    </div>
                    <div className="bg-white/20 rounded-xl p-3">
                      <div className="opacity-75">{t.accuracy}</div>
                      <div className="font-black text-2xl">{accuracy}%</div>
                    </div>
                    <div className="bg-white/20 rounded-xl p-3">
                      <div className="opacity-75">{t.bestStreak}</div>
                      <div className="font-black text-2xl text-yellow-300">{bestStreak}</div>
                    </div>
                  </div>

                  {highScore > 0 && (
                    <div className="mt-3 text-sm opacity-80">
                      {t.highScore}: <span className="font-black">{highScore}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={startGame}
                    className="py-4 bg-white text-orange-600 font-black text-lg rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-transform"
                  >
                    {t.playAgain}
                  </button>
                  <button
                    onClick={() => setPhase("setup")}
                    className="py-4 bg-white/30 text-white font-black text-lg rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-transform"
                  >
                    {t.changeMode}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mt-4">
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
              {t.faqTitle}
            </h2>
            <div className="space-y-2">
              {t.faqItems.map((item: {q: string; a: string}, i: number) => (
                <details key={i} className="group">
                  <summary className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-200 py-2 hover:text-primary-500">
                    {item.q}
                  </summary>
                  <p className="text-sm text-slate-500 dark:text-slate-400 pb-3 pl-4 leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <AdBanner format="rectangle" className="mt-6" />
        </div>
      </main>
    </PageTransition>
  );
}
