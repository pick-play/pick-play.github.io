"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import wordsData from "@/data/chosung-words.json";
import { useLocale } from "@/hooks/useLocale";

type Phase = "setup" | "game" | "result";
type TimerMode = 30 | 60 | 0; // 0 = unlimited
type FeedbackState = "idle" | "correct" | "wrong" | "revealed";

interface Word {
  id: number;
  word: string;
  chosung: string;
  category: string;
  hint: string;
}

const ALL_WORDS: Word[] = wordsData as Word[];

const CATEGORIES = ["전체", "음식", "동물", "영화", "장소", "유명인", "브랜드", "게임", "노래/가수", "학교"] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_ICONS: Record<string, string> = {
  전체: "🎯",
  음식: "🍜",
  동물: "🐾",
  영화: "🎬",
  장소: "📍",
  유명인: "🌟",
  브랜드: "🏷️",
  게임: "🎮",
  "노래/가수": "🎵",
  학교: "🏫",
};

const translations = {
  ko: {
    title: "초성 퀴즈",
    subtitle: "초성만 보고 단어를 맞춰보세요!",
    koreanGameNote: null as string | null,
    categoryLabel: "카테고리",
    timerLabel: "타이머",
    timerOptions: [
      { label: "30초", value: 30 as TimerMode },
      { label: "60초", value: 60 as TimerMode },
      { label: "무제한", value: 0 as TimerMode },
    ],
    wordCountAll: (n: number) => `전체 ${n}개 단어`,
    wordCountCategory: (cat: string, n: number) => `${cat} 카테고리 ${n}개 단어`,
    startButton: "시작하기",
    scoreLabel: (score: number, attempted: number) => `${score}정답 / ${attempted}문제`,
    streakLabel: (n: number) => `연속 ${n}개!`,
    categoryBadge: (icon: string, cat: string) => `${icon} ${cat}`,
    hintCategoryPrefix: "카테고리:",
    hintPrefix: "힌트:",
    answerRevealLabel: "정답은",
    correctFeedback: "정답!",
    streakFeedback: (n: number) => `연속 ${n}개 정답!`,
    wrongFeedback: "오답!",
    inputPlaceholder: "정답을 입력하세요",
    submitButton: "확인",
    hintNone: "힌트 보기",
    hintMore: "힌트 더 보기",
    hintUsed: "힌트 다 봄",
    giveUpButton: "포기",
    nextButton: "다음 문제",
    finishButton: "종료",
    quizFinished: "퀴즈 종료!",
    finalScore: "최종 점수",
    accuracy: "정답률",
    bestStreak: "최고 연속 정답",
    bestStreakUnit: (n: number) => `${n}개`,
    categoryResultLabel: "카테고리",
    playAgain: "다시 하기",
    changeSettings: "설정 변경",
    faqTitle: "자주 묻는 질문",
    faqItems: [
      { q: "초성 퀴즈란 무엇인가요?", a: "초성 퀴즈는 한국어 단어의 초성(자음)만 보고 해당 단어를 맞추는 게임입니다. 예를 들어 'ㅅㄱ'을 보고 '사과'를 맞히는 방식입니다. 한국어 어휘력을 키우고 두뇌를 자극하는 재미있는 학습 게임입니다." },
      { q: "초성이란 무엇인가요?", a: "초성(初聲)은 한국어 음절의 맨 처음에 오는 자음을 의미합니다. 한글의 각 글자는 초성, 중성(모음), 종성으로 구성되며, 초성만 나열하면 단어의 힌트가 됩니다. 예를 들어 '대한민국'의 초성은 'ㄷㅎㅁㄱ'입니다." },
      { q: "타이머를 설정하면 어떻게 달라지나요?", a: "30초 또는 60초 타이머를 설정하면 시간 내에 답을 맞혀야 합니다. 시간이 초과되면 정답이 공개되고 다음 문제로 넘어갑니다. 무제한 모드에서는 시간 제한 없이 천천히 생각할 수 있습니다." },
      { q: "힌트는 어떻게 사용하나요?", a: "게임 화면에서 힌트 버튼을 누르면 먼저 카테고리 정보가 표시되고, 한 번 더 누르면 추가 힌트가 제공됩니다. 힌트를 사용하면 점수에는 영향이 없지만 연속 정답 기록은 유지됩니다." },
      { q: "카테고리별로 다른 난이도가 있나요?", a: "카테고리마다 단어의 친숙도가 다르기 때문에 체감 난이도가 다를 수 있습니다. 음식이나 동물 카테고리는 비교적 쉽고, 유명인이나 브랜드 카테고리는 더 어려울 수 있습니다. 자신의 수준에 맞는 카테고리를 선택해 보세요." },
    ],
  },
  en: {
    title: "Chosung Quiz",
    subtitle: "Guess the Korean word from its initial consonants!",
    koreanGameNote: "This is a Korean language game. The words and consonants are in Korean, but you can use the hints to learn!",
    categoryLabel: "Category",
    timerLabel: "Timer",
    timerOptions: [
      { label: "30 sec", value: 30 as TimerMode },
      { label: "60 sec", value: 60 as TimerMode },
      { label: "Unlimited", value: 0 as TimerMode },
    ],
    wordCountAll: (n: number) => `${n} words total`,
    wordCountCategory: (cat: string, n: number) => `${n} words in ${cat}`,
    startButton: "Start",
    scoreLabel: (score: number, attempted: number) => `${score} correct / ${attempted} tried`,
    streakLabel: (n: number) => `${n} streak!`,
    categoryBadge: (icon: string, cat: string) => `${icon} ${cat}`,
    hintCategoryPrefix: "Category:",
    hintPrefix: "Hint:",
    answerRevealLabel: "The answer is",
    correctFeedback: "Correct!",
    streakFeedback: (n: number) => `${n} in a row!`,
    wrongFeedback: "Wrong!",
    inputPlaceholder: "Type your answer in Korean",
    submitButton: "Check",
    hintNone: "Show Hint",
    hintMore: "More Hint",
    hintUsed: "All Hints Used",
    giveUpButton: "Give Up",
    nextButton: "Next",
    finishButton: "Finish",
    quizFinished: "Quiz Over!",
    finalScore: "Final Score",
    accuracy: "Accuracy",
    bestStreak: "Best Streak",
    bestStreakUnit: (n: number) => `${n}`,
    categoryResultLabel: "Category",
    playAgain: "Play Again",
    changeSettings: "Change Settings",
    faqTitle: "Frequently Asked Questions",
    faqItems: [
      { q: "What is the Chosung Quiz?", a: "The Chosung Quiz is a game where you guess a Korean word by seeing only its initial consonants (chosung). For example, seeing 'ㅅㄱ' and guessing '사과' (apple). It's a fun learning game to build Korean vocabulary and stimulate your brain." },
      { q: "What are chosung (initial consonants)?", a: "Chosung are the first consonants of Korean syllables. Each Korean character is made up of an initial consonant (chosung), a vowel (jungseong), and an optional final consonant (jongseong). Showing only the chosung provides a clue to guess the word." },
      { q: "How does the timer work?", a: "Setting a 30-second or 60-second timer means you must answer within that time. If time runs out, the answer is revealed and the quiz moves to the next word. In unlimited mode, you can take your time without any pressure." },
      { q: "How do hints work?", a: "Tap the hint button during the game to first reveal the category, and tap again for an additional clue. Using hints does not affect your score, but your streak record is maintained." },
    ],
  },
  ja: {
    title: "チョソンクイズ",
    subtitle: "韓国語の初声を見て単語を当てよう！",
    koreanGameNote: "これは韓国語のゲームです。単語と子音は韓国語ですが、ヒントを使って挑戦してみてください！",
    categoryLabel: "カテゴリー",
    timerLabel: "タイマー",
    timerOptions: [
      { label: "30秒", value: 30 as TimerMode },
      { label: "60秒", value: 60 as TimerMode },
      { label: "無制限", value: 0 as TimerMode },
    ],
    wordCountAll: (n: number) => `全${n}単語`,
    wordCountCategory: (cat: string, n: number) => `${cat} カテゴリー ${n}単語`,
    startButton: "スタート",
    scoreLabel: (score: number, attempted: number) => `${score}正解 / ${attempted}問`,
    streakLabel: (n: number) => `${n}連続！`,
    categoryBadge: (icon: string, cat: string) => `${icon} ${cat}`,
    hintCategoryPrefix: "カテゴリー:",
    hintPrefix: "ヒント:",
    answerRevealLabel: "正解は",
    correctFeedback: "正解！",
    streakFeedback: (n: number) => `${n}連続正解！`,
    wrongFeedback: "不正解！",
    inputPlaceholder: "韓国語で入力してください",
    submitButton: "確認",
    hintNone: "ヒントを見る",
    hintMore: "もっとヒント",
    hintUsed: "ヒント全表示",
    giveUpButton: "ギブアップ",
    nextButton: "次の問題",
    finishButton: "終了",
    quizFinished: "クイズ終了！",
    finalScore: "最終スコア",
    accuracy: "正答率",
    bestStreak: "最高連続正解",
    bestStreakUnit: (n: number) => `${n}`,
    categoryResultLabel: "カテゴリー",
    playAgain: "もう一度",
    changeSettings: "設定変更",
    faqTitle: "よくある質問",
    faqItems: [
      { q: "チョソンクイズとは何ですか？", a: "チョソンクイズは、韓国語の単語の初声（子音）だけを見て単語を当てるゲームです。例えば「ㅅㄱ」を見て「사과（リンゴ）」を当てる形式です。韓国語の語彙力を高め、脳を刺激する楽しい学習ゲームです。" },
      { q: "タイマーを設定するとどう変わりますか？", a: "30秒か60秒のタイマーを設定すると、その時間内に答えなければなりません。時間切れになると正解が表示されて次の問題に進みます。無制限モードでは時間制限なくゆっくり考えることができます。" },
      { q: "ヒントはどう使いますか？", a: "ゲーム中にヒントボタンを押すと、まずカテゴリー情報が表示され、もう一度押すと追加のヒントが表示されます。ヒントを使ってもスコアには影響しません。" },
      { q: "カテゴリーによって難易度は変わりますか？", a: "カテゴリーによって単語の馴染み度が異なるため、体感難易度が変わります。食べ物や動物は比較的簡単で、有名人やブランドはより難しい場合があります。自分のレベルに合ったカテゴリーを選んでみてください。" },
    ],
  },
  zh: {
    title: "初声猜词",
    subtitle: "根据韩语初声猜出单词！",
    koreanGameNote: "这是一个韩语游戏。单词和辅音均为韩语，可以使用提示来帮助猜测！",
    categoryLabel: "分类",
    timerLabel: "计时器",
    timerOptions: [
      { label: "30秒", value: 30 as TimerMode },
      { label: "60秒", value: 60 as TimerMode },
      { label: "无限制", value: 0 as TimerMode },
    ],
    wordCountAll: (n: number) => `共 ${n} 个单词`,
    wordCountCategory: (cat: string, n: number) => `${cat} 分类 ${n} 个单词`,
    startButton: "开始",
    scoreLabel: (score: number, attempted: number) => `${score}正确 / ${attempted}题`,
    streakLabel: (n: number) => `连续${n}个！`,
    categoryBadge: (icon: string, cat: string) => `${icon} ${cat}`,
    hintCategoryPrefix: "分类:",
    hintPrefix: "提示:",
    answerRevealLabel: "答案是",
    correctFeedback: "正确！",
    streakFeedback: (n: number) => `连续${n}个正确！`,
    wrongFeedback: "错误！",
    inputPlaceholder: "请用韩语输入答案",
    submitButton: "确认",
    hintNone: "查看提示",
    hintMore: "更多提示",
    hintUsed: "已用全部提示",
    giveUpButton: "放弃",
    nextButton: "下一题",
    finishButton: "结束",
    quizFinished: "测验结束！",
    finalScore: "最终得分",
    accuracy: "正确率",
    bestStreak: "最佳连续",
    bestStreakUnit: (n: number) => `${n}`,
    categoryResultLabel: "分类",
    playAgain: "再玩一次",
    changeSettings: "更改设置",
    faqTitle: "常见问题",
    faqItems: [
      { q: "什么是初声猜词游戏？", a: "初声猜词游戏是一种只看韩语单词的声母来猜出完整单词的游戏。例如看到「ㅅㄱ」猜出「사과（苹果）」。这是一个有趣的学习游戏，能增强韩语词汇量并刺激大脑。" },
      { q: "计时器设置有什么区别？", a: "设置30秒或60秒计时器后，必须在时间内答出答案。时间到则显示正确答案并进入下一题。无限制模式下可以不受时间限制慢慢思考。" },
      { q: "如何使用「提示」功能？", a: "游戏中点击提示按钮，首先会显示分类信息，再次点击会提供额外提示。使用提示不影响得分，但连续答对记录会保持。" },
      { q: "不同分类的难度有区别吗？", a: "由于各分类单词的熟悉度不同，体感难度会有差异。美食和动物分类相对简单，名人和品牌分类可能更难。请根据自己的水平选择合适的分类。" },
    ],
  },
  es: {
    title: "Quiz de Chosung",
    subtitle: "¡Adivina la palabra coreana por sus consonantes iniciales!",
    koreanGameNote: "Este es un juego en coreano. Las palabras y consonantes están en coreano, ¡pero puedes usar las pistas para aprender!",
    categoryLabel: "Categoría",
    timerLabel: "Temporizador",
    timerOptions: [
      { label: "30 seg", value: 30 as TimerMode },
      { label: "60 seg", value: 60 as TimerMode },
      { label: "Sin límite", value: 0 as TimerMode },
    ],
    wordCountAll: (n: number) => `${n} palabras en total`,
    wordCountCategory: (cat: string, n: number) => `${n} palabras en ${cat}`,
    startButton: "Empezar",
    scoreLabel: (score: number, attempted: number) => `${score} correctas / ${attempted} intentadas`,
    streakLabel: (n: number) => `¡${n} seguidas!`,
    categoryBadge: (icon: string, cat: string) => `${icon} ${cat}`,
    hintCategoryPrefix: "Categoría:",
    hintPrefix: "Pista:",
    answerRevealLabel: "La respuesta es",
    correctFeedback: "¡Correcto!",
    streakFeedback: (n: number) => `¡${n} seguidas!`,
    wrongFeedback: "¡Incorrecto!",
    inputPlaceholder: "Escribe la respuesta en coreano",
    submitButton: "Verificar",
    hintNone: "Ver pista",
    hintMore: "Más pistas",
    hintUsed: "Pistas agotadas",
    giveUpButton: "Rendirse",
    nextButton: "Siguiente",
    finishButton: "Terminar",
    quizFinished: "¡Quiz Terminado!",
    finalScore: "Puntuación Final",
    accuracy: "Precisión",
    bestStreak: "Mejor Racha",
    bestStreakUnit: (n: number) => `${n}`,
    categoryResultLabel: "Categoría",
    playAgain: "Jugar de Nuevo",
    changeSettings: "Cambiar Ajustes",
    faqTitle: "Preguntas Frecuentes",
    faqItems: [
      { q: "¿Qué es el Quiz de Chosung?", a: "El Quiz de Chosung es un juego en el que adivinas una palabra coreana viendo solo sus consonantes iniciales (chosung). Por ejemplo, ver 'ㅅㄱ' y adivinar '사과' (manzana). Es un divertido juego de aprendizaje para desarrollar vocabulario coreano." },
      { q: "¿Cómo funciona el temporizador?", a: "Configurar un temporizador de 30 o 60 segundos significa que debes responder dentro de ese tiempo. Si se acaba el tiempo, la respuesta se revela y el quiz avanza a la siguiente palabra. En el modo sin límite puedes tomarte tu tiempo." },
      { q: "¿Cómo funcionan las pistas?", a: "Toca el botón de pista durante el juego para revelar primero la categoría, y tócalo de nuevo para obtener una pista adicional. Usar pistas no afecta tu puntuación." },
      { q: "¿Varía la dificultad según la categoría?", a: "Cada categoría tiene palabras con distinto nivel de familiaridad, así que la dificultad percibida varía. Comida y animales son relativamente fáciles, mientras que famosos y marcas pueden ser más difíciles. Elige la categoría adecuada para tu nivel." },
    ],
  },
};

function shuffleArray<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Chosung tile component
function ChosungTiles({ chosung }: { chosung: string }) {
  const letters = chosung.split("");
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {letters.map((ch, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: i * 0.08,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="w-14 h-14 md:w-20 md:h-20 rounded-xl bg-primary-100 dark:bg-primary-900 border-2 border-primary-200 dark:border-primary-700 flex items-center justify-center shadow-md"
        >
          <span className="text-3xl md:text-5xl font-bold text-primary-700 dark:text-primary-200">
            {ch}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// Circular timer component
function CircularTimer({
  timeLeft,
  total,
}: {
  timeLeft: number;
  total: number;
}) {
  const r = 44;
  const circumference = 2 * Math.PI * r;
  const percent = total > 0 ? timeLeft / total : 1;
  const offset = circumference * (1 - percent);
  const strokeColor =
    percent > 0.5
      ? "stroke-primary-500"
      : percent > 0.25
      ? "stroke-amber-400"
      : "stroke-red-400";

  return (
    <div className="relative w-28 h-28 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-slate-200 dark:text-slate-700"
        />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`transition-all duration-1000 ${strokeColor}`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`text-2xl font-extrabold ${
            percent > 0.5
              ? "text-primary-600 dark:text-primary-400"
              : percent > 0.25
              ? "text-amber-500"
              : "text-red-500"
          }`}
        >
          {timeLeft}
        </span>
      </div>
    </div>
  );
}

export default function ChosungQuizPage() {
  const locale = useLocale();
  const t = translations[locale];

  // Setup state
  const [selectedCategory, setSelectedCategory] = useState<Category>("전체");
  const [timerMode, setTimerMode] = useState<TimerMode>(60);

  // Game state
  const [phase, setPhase] = useState<Phase>("setup");
  const [queue, setQueue] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<FeedbackState>("idle");
  const [hintLevel, setHintLevel] = useState(0); // 0=none, 1=category, 2=hint
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [shownAnswer, setShownAnswer] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const feedbackTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);

  const currentWord = queue[currentIndex] ?? null;

  // Timer countdown
  useEffect(() => {
    if (!timerActive || timeLeft <= 0) {
      if (timerActive && timeLeft <= 0 && feedback === "idle") {
        // Time ran out
        setTimerActive(false);
        setShownAnswer(true);
        setFeedback("revealed");
        setAttempted((a) => a + 1);
        setStreak(0);
        autoAdvanceRef.current = setTimeout(() => advanceQuestion(), 2500);
      }
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerActive, timeLeft]);

  const clearTimers = useCallback(() => {
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
    }
    if (autoAdvanceRef.current) {
      clearTimeout(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
  }, []);

  const advanceQuestion = useCallback(() => {
    clearTimers();
    setCurrentIndex((i) => i + 1);
    setAnswer("");
    setFeedback("idle");
    setHintLevel(0);
    setShownAnswer(false);
    if (timerMode > 0) {
      setTimeLeft(timerMode);
      setTimerActive(true);
    }
    setTimeout(() => inputRef.current?.focus(), 100);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearTimers, timerMode]);

  const startGame = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    clearTimers();
    const pool =
      selectedCategory === "전체"
        ? ALL_WORDS
        : ALL_WORDS.filter((w) => w.category === selectedCategory);
    const shuffled = shuffleArray(pool);
    setQueue(shuffled);
    setCurrentIndex(0);
    setAnswer("");
    setFeedback("idle");
    setHintLevel(0);
    setShownAnswer(false);
    setScore(0);
    setAttempted(0);
    setStreak(0);
    setBestStreak(0);
    if (timerMode > 0) {
      setTimeLeft(timerMode);
      setTimerActive(true);
    } else {
      setTimeLeft(0);
      setTimerActive(false);
    }
    setPhase("game");
    setTimeout(() => inputRef.current?.focus(), 150);
  }, [clearTimers, selectedCategory, timerMode]);

  const handleSubmit = useCallback(() => {
    if (!currentWord || feedback !== "idle" || shownAnswer) return;
    const trimmed = answer.trim();
    if (!trimmed) return;

    setTimerActive(false);
    clearTimers();
    setAttempted((a) => a + 1);

    if (trimmed === currentWord.word) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBestStreak((b) => Math.max(b, newStreak));
      setScore((s) => s + 1);
      setFeedback("correct");
      autoAdvanceRef.current = setTimeout(() => advanceQuestion(), 1800);
    } else {
      setStreak(0);
      setFeedback("wrong");
      feedbackTimerRef.current = setTimeout(() => {
        setFeedback("idle");
        setAnswer("");
        if (timerMode > 0) {
          setTimeLeft((t) => t); // keep remaining time
          setTimerActive(true);
        }
        setTimeout(() => inputRef.current?.focus(), 50);
      }, 1000);
    }
  }, [currentWord, feedback, shownAnswer, answer, streak, advanceQuestion, clearTimers, timerMode]);

  const handleGiveUp = useCallback(() => {
    if (!currentWord || shownAnswer) return;
    clearTimers();
    setTimerActive(false);
    setShownAnswer(true);
    setFeedback("revealed");
    setAttempted((a) => a + 1);
    setStreak(0);
    autoAdvanceRef.current = setTimeout(() => advanceQuestion(), 2500);
  }, [currentWord, shownAnswer, clearTimers, advanceQuestion]);

  const handleHint = useCallback(() => {
    if (hintLevel < 2) setHintLevel((h) => h + 1);
  }, [hintLevel]);

  const handleFinish = useCallback(() => {
    clearTimers();
    setTimerActive(false);
    setPhase("result");
  }, [clearTimers]);

  // Auto-finish when queue is exhausted
  useEffect(() => {
    if (phase === "game" && queue.length > 0 && currentIndex >= queue.length) {
      clearTimers();
      setTimerActive(false);
      setPhase("result");
    }
  }, [phase, queue.length, currentIndex, clearTimers]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const isDone = currentIndex >= queue.length && queue.length > 0;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-sky-950/20 dark:to-indigo-950/10">
        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent mb-2">
              {t.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {t.subtitle}
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
                className="space-y-5"
              >
                {/* Korean game note for non-Korean locales */}
                {t.koreanGameNote && (
                  <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-4 text-sm text-amber-700 dark:text-amber-300">
                    {t.koreanGameNote}
                  </div>
                )}

                {/* Category selection */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
                    {t.categoryLabel}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedCategory === cat
                            ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-md scale-105"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-sky-900/30"
                        }`}
                      >
                        {CATEGORY_ICONS[cat]} {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timer selection */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
                    {t.timerLabel}
                  </h2>
                  <div className="flex gap-3">
                    {t.timerOptions.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => setTimerMode(opt.value)}
                        className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                          timerMode === opt.value
                            ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-md"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-sky-900/30"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ad: between settings and start */}
                <AdBanner format="horizontal" className="rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

                {/* Word count info */}
                <p className="text-center text-xs text-slate-400">
                  {selectedCategory === "전체"
                    ? t.wordCountAll(ALL_WORDS.length)
                    : t.wordCountCategory(selectedCategory, ALL_WORDS.filter((w) => w.category === selectedCategory).length)}
                </p>

                {/* Start button */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={startGame}
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-xl font-bold shadow-lg hover:shadow-sky-500/30 transition-shadow"
                >
                  {t.startButton}
                </motion.button>
              </motion.div>
            )}

            {/* ── GAME PHASE ── */}
            {phase === "game" && currentWord && !isDone && (
              <motion.div
                key={`game-${currentWord.id}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                {/* Score & Progress bar */}
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <span>
                    {currentIndex + 1} / {queue.length}
                  </span>
                  <span className="font-semibold text-sky-600 dark:text-sky-400">
                    {t.scoreLabel(score, attempted)}
                  </span>
                  {streak >= 2 && (
                    <motion.span
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="font-bold text-amber-500"
                    >
                      {t.streakLabel(streak)}
                    </motion.span>
                  )}
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((currentIndex) / queue.length) * 100}%`,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                {/* Main card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  {/* Category badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                      {t.categoryBadge(CATEGORY_ICONS[currentWord.category], currentWord.category)}
                    </span>
                    {timerMode > 0 && (
                      <CircularTimer timeLeft={timeLeft} total={timerMode} />
                    )}
                  </div>

                  {/* Chosung tiles */}
                  <div className="py-4">
                    <ChosungTiles chosung={currentWord.chosung} />
                  </div>

                  {/* Hint area */}
                  <AnimatePresence>
                    {hintLevel > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-amber-700 dark:text-amber-300 text-sm"
                      >
                        {hintLevel === 1 && (
                          <span>
                            {t.hintCategoryPrefix} <strong>{currentWord.category}</strong>
                          </span>
                        )}
                        {hintLevel === 2 && (
                          <span>
                            {t.hintPrefix} <strong>{currentWord.hint}</strong>
                          </span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Revealed answer */}
                  <AnimatePresence>
                    {shownAnswer && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-700 text-center"
                      >
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                          {t.answerRevealLabel}
                        </p>
                        <p className="text-2xl font-extrabold bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
                          {currentWord.word}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Feedback overlay */}
                <AnimatePresence>
                  {feedback === "correct" && (
                    <motion.div
                      key="correct"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className="text-center py-2"
                    >
                      <p className="text-3xl font-extrabold text-emerald-500">
                        {t.correctFeedback}
                      </p>
                      {streak >= 2 && (
                        <p className="text-sm text-amber-500 font-semibold mt-1">
                          {t.streakFeedback(streak)}
                        </p>
                      )}
                    </motion.div>
                  )}
                  {feedback === "wrong" && (
                    <motion.div
                      key="wrong"
                      initial={{ x: 0 }}
                      animate={{ x: [0, -10, 10, -8, 8, -4, 4, 0] }}
                      transition={{ duration: 0.45 }}
                      className="text-center py-2"
                    >
                      <p className="text-3xl font-extrabold text-red-500">
                        {t.wrongFeedback}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Answer input */}
                {feedback !== "correct" && !shownAnswer && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={t.inputPlaceholder}
                      disabled={feedback !== "idle"}
                      className={`flex-1 px-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none transition-all ${
                        feedback === "wrong"
                          ? "border-red-400 dark:border-red-500"
                          : "border-slate-200 dark:border-slate-600 focus:border-sky-400 dark:focus:border-sky-500"
                      }`}
                    />
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSubmit}
                      disabled={feedback !== "idle" || !answer.trim()}
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold shadow-md disabled:opacity-40 transition-opacity"
                    >
                      {t.submitButton}
                    </motion.button>
                  </motion.div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3">
                  {/* Hint button */}
                  {!shownAnswer && feedback !== "correct" && (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleHint}
                      disabled={hintLevel >= 2}
                      className={`flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                        hintLevel >= 2
                          ? "bg-amber-500 border-amber-500 text-white opacity-60"
                          : hintLevel > 0
                          ? "bg-amber-50 dark:bg-amber-950/30 border-amber-400 text-amber-600 dark:text-amber-300"
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-amber-400 hover:text-amber-600"
                      }`}
                    >
                      {hintLevel === 0
                        ? t.hintNone
                        : hintLevel === 1
                        ? t.hintMore
                        : t.hintUsed}
                    </motion.button>
                  )}

                  {/* Give up / Next button */}
                  {!shownAnswer && feedback !== "correct" ? (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleGiveUp}
                      className="flex-1 py-3 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-all border-2 border-transparent"
                    >
                      {t.giveUpButton}
                    </motion.button>
                  ) : feedback === "correct" ? null : (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={advanceQuestion}
                      className="flex-1 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-md"
                    >
                      {t.nextButton}
                    </motion.button>
                  )}

                  {/* Finish early button */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleFinish}
                    className="px-4 py-3 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    {t.finishButton}
                  </motion.button>
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
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 180, delay: 0.1 }}
                    className="text-7xl mb-4"
                  >
                    {score === attempted && attempted > 0 ? "🏆" : score > attempted / 2 ? "🎉" : "📝"}
                  </motion.div>

                  <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">
                    {t.quizFinished}
                  </h2>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-950/40 dark:to-indigo-950/40 rounded-2xl p-5 mb-6 border border-sky-200/50 dark:border-sky-700/50 space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400 text-sm">
                        {t.finalScore}
                      </span>
                      <span className="text-2xl font-extrabold bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
                        {score} / {attempted}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400 text-sm">
                        {t.accuracy}
                      </span>
                      <span className="text-lg font-bold text-slate-700 dark:text-slate-200">
                        {attempted > 0
                          ? Math.round((score / attempted) * 100)
                          : 0}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400 text-sm">
                        {t.bestStreak}
                      </span>
                      <span className="text-lg font-bold text-amber-500">
                        {t.bestStreakUnit(bestStreak)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400 text-sm">
                        {t.categoryResultLabel}
                      </span>
                      <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                        {CATEGORY_ICONS[selectedCategory]} {selectedCategory}
                      </span>
                    </div>
                  </motion.div>

                  <div className="flex gap-3">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={startGame}
                      className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold text-lg shadow-md hover:shadow-sky-500/30 transition-shadow"
                    >
                      {t.playAgain}
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setPhase("setup")}
                      className="flex-1 py-4 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-lg transition-colors hover:bg-slate-200 dark:hover:bg-slate-600"
                    >
                      {t.changeSettings}
                    </motion.button>
                  </div>
                  <AdBanner format="rectangle" className="mt-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
                </div>
                <AdBanner format="in-article" className="mt-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
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
        </div>
      </div>
    </PageTransition>
  );
}
