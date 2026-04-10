"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import allQuestionsKo from "@/data/balance-questions.json";
import allQuestionsEn from "@/data/balance-questions.en.json";
import allQuestionsJa from "@/data/balance-questions.ja.json";
import allQuestionsZh from "@/data/balance-questions.zh.json";
import allQuestionsEs from "@/data/balance-questions.es.json";
import { useLocale } from "@/hooks/useLocale";

type Question = {
  id: number;
  optionA: string;
  optionB: string;
  category: string;
};

type Phase = "play" | "result";

const questionsByLocale: Record<string, Question[]> = {
  ko: allQuestionsKo as Question[],
  en: allQuestionsEn as Question[],
  ja: allQuestionsJa as Question[],
  zh: allQuestionsZh as Question[],
  es: allQuestionsEs as Question[],
};

const CATEGORIES_BY_LOCALE: Record<string, string[]> = {
  ko: ["전체", "상황", "음식", "연애", "취향", "극한", "학교/직장", "여행", "슈퍼파워"],
  en: ["All", "Scenario", "Food", "Romance", "Preference", "Extreme", "School/Work", "Travel", "Superpower"],
  ja: ["すべて", "シナリオ", "グルメ", "恋愛", "好み", "エクストリーム", "学校/職場", "旅行", "超能力"],
  zh: ["全部", "情景", "美食", "恋爱", "偏好", "极端", "学校/职场", "旅游", "超能力"],
  es: ["Todo", "Escenario", "Comida", "Romance", "Preferencias", "Extremo", "Escuela/Trabajo", "Viajes", "Superpoder"],
};

const CATEGORY_ALL_BY_LOCALE: Record<string, string> = {
  ko: "전체", en: "All", ja: "すべて", zh: "全部", es: "Todo",
};

const CATEGORY_ICONS_BY_LOCALE: Record<string, Record<string, string>> = {
  ko: { "전체": "🎮", "상황": "💡", "음식": "🍜", "연애": "💕", "취향": "🎨", "극한": "🔥", "학교/직장": "🏫", "여행": "✈️", "슈퍼파워": "⚡" },
  en: { "All": "🎮", "Scenario": "💡", "Food": "🍜", "Romance": "💕", "Preference": "🎨", "Extreme": "🔥", "School/Work": "🏫", "Travel": "✈️", "Superpower": "⚡" },
  ja: { "すべて": "🎮", "シナリオ": "💡", "グルメ": "🍜", "恋愛": "💕", "好み": "🎨", "エクストリーム": "🔥", "学校/職場": "🏫", "旅行": "✈️", "超能力": "⚡" },
  zh: { "全部": "🎮", "情景": "💡", "美食": "🍜", "恋爱": "💕", "偏好": "🎨", "极端": "🔥", "学校/职场": "🏫", "旅游": "✈️", "超能力": "⚡" },
  es: { "Todo": "🎮", "Escenario": "💡", "Comida": "🍜", "Romance": "💕", "Preferencias": "🎨", "Extremo": "🔥", "Escuela/Trabajo": "🏫", "Viajes": "✈️", "Superpoder": "⚡" },
};

const translations = {
  ko: {
    title: "밸런스 게임",
    subtitle: "둘 중 하나만 골라야 한다면?",
    hint: "카드를 눌러 선택하세요",
    gameComplete: "게임 완료!",
    answeredCount: (n: number) => `총 ${n}개의 질문에 답했어요`,
    choiceA: "A 선택",
    choiceB: "B 선택",
    playAgain: "다시 하기",
    faqTitle: "자주 묻는 질문",
    faqItems: [
      { q: "밸런스 게임이란 무엇인가요?", a: "밸런스 게임은 두 가지 선택지 중 하나를 반드시 골라야 하는 심리 게임입니다. 둘 다 싫거나 둘 다 좋더라도 반드시 하나를 선택해야 합니다. 자신의 가치관과 성향을 파악하고 친구들과 대화를 나누는 재미있는 방법입니다." },
      { q: "질문 카테고리는 어떻게 되나요?", a: "상황, 음식, 연애, 취향, 극한, 학교/직장, 여행, 슈퍼파워 등 다양한 카테고리가 준비되어 있습니다. 원하는 카테고리를 선택하면 해당 주제의 질문만 모아서 게임을 즐길 수 있습니다." },
      { q: "질문은 몇 개나 있나요?", a: "각 카테고리마다 수십 개의 질문이 준비되어 있으며, 전체 카테고리로 플레이하면 더 많은 질문을 접할 수 있습니다. 매번 질문 순서가 무작위로 섞여서 새로운 느낌으로 게임을 즐길 수 있습니다." },
      { q: "친구들과 함께 할 수 있나요?", a: "네, 화면을 보면서 각자의 선택을 말하거나, 한 명씩 돌아가며 선택 이유를 설명하면 더 재미있게 즐길 수 있습니다. 서로 다른 선택에 대해 이유를 토론하면 서로를 더 깊이 이해하는 계기가 됩니다." },
      { q: "결과 화면에서 A와 B 비율은 무엇을 의미하나요?", a: "게임 세션 동안 자신이 A를 몇 번, B를 몇 번 선택했는지를 보여주는 통계입니다. A 선택 비율이 높다면 주어진 선택지에서 앞쪽 옵션을 더 선호하는 경향이 있다는 것을 알 수 있습니다." },
    ],
  },
  en: {
    title: "Balance Game",
    subtitle: "If you had to pick just one...",
    hint: "Tap a card to choose",
    gameComplete: "Game Complete!",
    answeredCount: (n: number) => `You answered ${n} questions`,
    choiceA: "Chose A",
    choiceB: "Chose B",
    playAgain: "Play Again",
    faqTitle: "Frequently Asked Questions",
    faqItems: [
      { q: "What is the Balance Game?", a: "The Balance Game is a psychology game where you must choose one of two options, no matter how difficult the choice. Even if you dislike both or love both, you must pick one. It's a fun way to understand your own values and have meaningful conversations with friends." },
      { q: "What categories are available?", a: "There are diverse categories including Scenario, Food, Romance, Preference, Extreme, School/Work, Travel, and Superpower. Select any category to play with questions focused on that topic." },
      { q: "Can I play with friends?", a: "Absolutely! You can each state your choice while looking at the screen, or take turns explaining your reasoning. Discussing why you made different choices is a great way to understand each other better." },
      { q: "What does the A/B ratio in the result mean?", a: "It shows how many times you chose A versus B during the game session. A high A-selection rate suggests you tend to prefer the first option when presented with choices." },
    ],
  },
  ja: {
    title: "バランスゲーム",
    subtitle: "どちらか一つを選ぶなら？",
    hint: "カードをタップして選んでください",
    gameComplete: "ゲーム完了！",
    answeredCount: (n: number) => `${n}問に答えました`,
    choiceA: "Aを選択",
    choiceB: "Bを選択",
    playAgain: "もう一度",
    faqTitle: "よくある質問",
    faqItems: [
      { q: "バランスゲームとは何ですか？", a: "バランスゲームは、2つの選択肢のうち必ずどちらかを選ばなければならない心理ゲームです。両方嫌いでも両方好きでも、必ず1つを選びます。自分の価値観を知り、友達との会話を楽しむ面白い方法です。" },
      { q: "カテゴリはどんなものがありますか？", a: "シナリオ、グルメ、恋愛、好み、エクストリーム、学校/職場、旅行、超能力など様々なカテゴリがあります。好きなカテゴリを選ぶと、そのテーマの質問だけでゲームを楽しめます。" },
      { q: "友達と一緒に遊べますか？", a: "もちろんです！画面を見ながらそれぞれの選択を言い合ったり、順番に理由を説明し合うとより楽しめます。違う選択をした理由を議論することで、お互いをより深く理解できます。" },
      { q: "結果のA/B比率は何を意味しますか？", a: "ゲーム中にAを何回、Bを何回選んだかを示す統計です。A選択率が高い場合、選択肢の前者を好む傾向があることが分かります。" },
    ],
  },
  zh: {
    title: "平衡游戏",
    subtitle: "如果只能选一个...",
    hint: "点击卡片进行选择",
    gameComplete: "游戏结束！",
    answeredCount: (n: number) => `共回答了 ${n} 个问题`,
    choiceA: "选A",
    choiceB: "选B",
    playAgain: "再玩一次",
    faqTitle: "常见问题",
    faqItems: [
      { q: "什么是平衡游戏？", a: "平衡游戏是一种心理游戏，无论选择多难，你必须从两个选项中选择一个。即使两个都讨厌或都喜欢，也必须选一个。这是了解自己价值观并与朋友展开有趣对话的好方法。" },
      { q: "有哪些题目分类？", a: "有情景、美食、恋爱、偏好、极端、学校/职场、旅游、超能力等多种分类。选择您喜欢的分类，即可只玩该主题的题目。" },
      { q: "可以和朋友一起玩吗？", a: "当然可以！大家一起看屏幕各自说出选择，或轮流说明理由，会更有趣。讨论为什么做出不同选择是互相深入了解的好机会。" },
      { q: "结果中的A/B比例代表什么？", a: "这是显示您在游戏过程中选择A和B各多少次的统计。A选择率高说明您倾向于选择两个选项中的第一个选项。" },
    ],
  },
  es: {
    title: "Juego de Balance",
    subtitle: "Si tuvieras que elegir solo uno...",
    hint: "Toca una carta para elegir",
    gameComplete: "¡Juego Completo!",
    answeredCount: (n: number) => `Respondiste ${n} preguntas`,
    choiceA: "Eligió A",
    choiceB: "Eligió B",
    playAgain: "Jugar de Nuevo",
    faqTitle: "Preguntas Frecuentes",
    faqItems: [
      { q: "¿Qué es el Juego de Balance?", a: "El Juego de Balance es un juego psicológico en el que debes elegir una de dos opciones sin importar lo difícil que sea. Aunque te disgusten o te gusten ambas, debes elegir una. Es una forma divertida de conocer tus valores y tener conversaciones interesantes con amigos." },
      { q: "¿Qué categorías hay disponibles?", a: "Hay categorías diversas como Escenario, Comida, Romance, Preferencias, Extremo, Escuela/Trabajo, Viajes y Superpoder. Elige cualquier categoría para jugar con preguntas de ese tema." },
      { q: "¿Puedo jugar con amigos?", a: "¡Por supuesto! Pueden decir sus elecciones mientras miran la pantalla o turnarse para explicar sus razonamientos. Discutir por qué hicieron elecciones diferentes es una manera de entenderse mejor." },
      { q: "¿Qué significa la proporción A/B en el resultado?", a: "Muestra cuántas veces elegiste A versus B durante la sesión de juego. Una tasa alta de selección A sugiere que tiendes a preferir la primera opción cuando se presentan opciones." },
    ],
  },
};

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function BalanceGamePage() {
  const locale = useLocale();
  const t = translations[locale];
  const allQuestions = questionsByLocale[locale] ?? questionsByLocale.ko;
  const CATEGORIES = CATEGORIES_BY_LOCALE[locale] ?? CATEGORIES_BY_LOCALE.ko;
  const categoryAll = CATEGORY_ALL_BY_LOCALE[locale] ?? "전체";
  const categoryIcons = CATEGORY_ICONS_BY_LOCALE[locale] ?? CATEGORY_ICONS_BY_LOCALE.ko;

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryAll);
  const [questions, setQuestions] = useState<Question[]>(() =>
    shuffle(allQuestions)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("play");
  const [selected, setSelected] = useState<"A" | "B" | null>(null);
  const [choicesA, setChoicesA] = useState(0);
  const [choicesB, setChoicesB] = useState(0);
  const [answered, setAnswered] = useState(0);

  const filteredQuestions = selectedCategory === categoryAll
    ? questions
    : questions.filter((q) => q.category === selectedCategory);

  const currentQuestion = filteredQuestions[currentIndex];
  const total = filteredQuestions.length;

  const handleCategoryChange = useCallback((cat: string) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setSelected(null);
    setPhase("play");
    setChoicesA(0);
    setChoicesB(0);
    setAnswered(0);
    setQuestions(shuffle(allQuestions));
  }, [allQuestions]);

  const handleSelect = useCallback(
    (choice: "A" | "B") => {
      if (selected !== null) return;
      setSelected(choice);
      if (choice === "A") setChoicesA((n) => n + 1);
      else setChoicesB((n) => n + 1);
      setAnswered((n) => n + 1);

      setTimeout(() => {
        const nextIndex = currentIndex + 1;
        if (nextIndex >= total) {
          setPhase("result");
        } else {
          setCurrentIndex(nextIndex);
          setSelected(null);
        }
      }, 1000);
    },
    [selected, currentIndex, total]
  );

  const handleRestart = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentIndex(0);
    setSelected(null);
    setPhase("play");
    setChoicesA(0);
    setChoicesB(0);
    setAnswered(0);
    setQuestions(shuffle(allQuestions));
  }, [allQuestions]);

  const progress = total > 0 ? ((currentIndex) / total) * 100 : 0;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-red-50/20 dark:from-slate-950 dark:via-blue-950/20 dark:to-red-950/10">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent mb-2">
              {t.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 justify-center mb-6"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-blue-500 to-red-500 text-white shadow-md scale-105"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
                }`}
              >
                {categoryIcons[cat]} {cat}
              </button>
            ))}
          </motion.div>

          {/* Ad: after category selection */}
          <AdBanner format="horizontal" className="mb-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

          <AnimatePresence mode="wait">
            {/* ── PLAY PHASE ── */}
            {phase === "play" && currentQuestion && (
              <motion.div
                key={`question-${currentQuestion.id}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-medium">{currentIndex + 1} / {total}</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs">
                      {currentQuestion.category}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-red-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Cards */}
                <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                  {/* Option A */}
                  <motion.button
                    onClick={() => handleSelect("A")}
                    disabled={selected !== null}
                    animate={
                      selected === null
                        ? { scale: 1, opacity: 1 }
                        : selected === "A"
                        ? { scale: 1.04, opacity: 1 }
                        : { scale: 0.93, opacity: 0.45 }
                    }
                    whileHover={selected === null ? { scale: 1.02 } : {}}
                    whileTap={selected === null ? { scale: 0.98 } : {}}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`relative flex-1 min-h-40 sm:min-h-52 rounded-2xl p-6 flex flex-col items-center justify-center text-white font-bold text-xl text-center shadow-lg bg-gradient-to-br from-blue-400 to-blue-600 cursor-pointer disabled:cursor-default transition-shadow ${
                      selected === "A"
                        ? "shadow-blue-400/60 shadow-2xl ring-4 ring-blue-300"
                        : "hover:shadow-blue-400/30 hover:shadow-xl"
                    }`}
                  >
                    {selected === "A" && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-base"
                      >
                        ✓
                      </motion.div>
                    )}
                    <span className="leading-snug">{currentQuestion.optionA}</span>
                    <span className="mt-3 text-xs font-semibold uppercase tracking-widest text-blue-100 opacity-80">
                      A
                    </span>
                  </motion.button>

                  {/* VS divider */}
                  <div className="flex sm:flex-col items-center justify-center gap-1 py-1 sm:py-0">
                    <div className="flex-1 sm:flex-none sm:h-10 w-px sm:w-px h-px sm:h-auto bg-slate-300 dark:bg-slate-600 hidden sm:block" />
                    <span className="text-slate-400 dark:text-slate-500 font-extrabold text-lg tracking-wider px-3 sm:px-0 sm:py-2">
                      VS
                    </span>
                    <div className="flex-1 sm:flex-none sm:h-10 w-px sm:w-px h-px sm:h-auto bg-slate-300 dark:bg-slate-600 hidden sm:block" />
                  </div>

                  {/* Option B */}
                  <motion.button
                    onClick={() => handleSelect("B")}
                    disabled={selected !== null}
                    animate={
                      selected === null
                        ? { scale: 1, opacity: 1 }
                        : selected === "B"
                        ? { scale: 1.04, opacity: 1 }
                        : { scale: 0.93, opacity: 0.45 }
                    }
                    whileHover={selected === null ? { scale: 1.02 } : {}}
                    whileTap={selected === null ? { scale: 0.98 } : {}}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`relative flex-1 min-h-40 sm:min-h-52 rounded-2xl p-6 flex flex-col items-center justify-center text-white font-bold text-xl text-center shadow-lg bg-gradient-to-br from-red-400 to-red-600 cursor-pointer disabled:cursor-default transition-shadow ${
                      selected === "B"
                        ? "shadow-red-400/60 shadow-2xl ring-4 ring-red-300"
                        : "hover:shadow-red-400/30 hover:shadow-xl"
                    }`}
                  >
                    {selected === "B" && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-base"
                      >
                        ✓
                      </motion.div>
                    )}
                    <span className="leading-snug">{currentQuestion.optionB}</span>
                    <span className="mt-3 text-xs font-semibold uppercase tracking-widest text-red-100 opacity-80">
                      B
                    </span>
                  </motion.button>
                </div>

                {/* Hint text */}
                {selected === null && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-xs text-slate-400 dark:text-slate-500"
                  >
                    {t.hint}
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* ── RESULT PHASE ── */}
            {phase === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="text-6xl mb-4"
                  >
                    🎉
                  </motion.div>
                  <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-1">
                    {t.gameComplete}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
                    {t.answeredCount(answered)}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <motion.div
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                      className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/30 border border-blue-200/60 dark:border-blue-700/40 p-5"
                    >
                      <p className="text-xs font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wide mb-2">
                        {t.choiceA}
                      </p>
                      <p className="text-5xl font-extrabold text-blue-600 dark:text-blue-400">
                        {choicesA}
                      </p>
                      <p className="text-xs text-blue-400 dark:text-blue-500 mt-1">
                        {answered > 0 ? Math.round((choicesA / answered) * 100) : 0}%
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="rounded-2xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/30 border border-red-200/60 dark:border-red-700/40 p-5"
                    >
                      <p className="text-xs font-semibold text-red-500 dark:text-red-400 uppercase tracking-wide mb-2">
                        {t.choiceB}
                      </p>
                      <p className="text-5xl font-extrabold text-red-600 dark:text-red-400">
                        {choicesB}
                      </p>
                      <p className="text-xs text-red-400 dark:text-red-500 mt-1">
                        {answered > 0 ? Math.round((choicesB / answered) * 100) : 0}%
                      </p>
                    </motion.div>
                  </div>

                  {/* A/B bar */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                  >
                    <div className="flex rounded-full overflow-hidden h-3 bg-slate-200 dark:bg-slate-700">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-500"
                        initial={{ width: 0 }}
                        animate={{
                          width: answered > 0 ? `${(choicesA / answered) * 100}%` : "50%",
                        }}
                        transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
                      />
                      <motion.div
                        className="h-full bg-gradient-to-r from-red-400 to-red-500 flex-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.45 }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-slate-400">
                      <span>A</span>
                      <span>B</span>
                    </div>
                  </motion.div>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleRestart}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-red-500 text-white font-bold text-lg shadow-md hover:shadow-blue-500/20 transition-shadow"
                  >
                    {t.playAgain}
                  </motion.button>
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
