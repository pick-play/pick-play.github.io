"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import worldcupData from "@/data/worldcup.json";
import { useLocale } from "@/hooks/useLocale";

type Candidate = {
  id: number;
  name: string;
  emoji: string;
  desc: string;
};

type Topic = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  candidates: Candidate[];
};

type Phase = "select" | "tournament" | "result";
type RoundSize = 4 | 8 | 16;

const translations = {
  ko: {
    title: "이상형 월드컵",
    subtitle: "토너먼트로 나의 진짜 최애를 찾아보세요!",
    topicSelectTitle: "주제 선택",
    topicSelectSub: "월드컵 주제를 골라주세요",
    roundSelectLabel: "라운드 선택",
    startButton: (emoji: string, name: string) => `${emoji} ${name} 시작!`,
    faqTitle: "자주 묻는 질문",
    faqs: [
      {
        q: "이상형 월드컵이란?",
        a: "두 후보 중 하나를 반복 선택해 최종 우승자를 가리는 토너먼트 게임입니다.",
      },
      {
        q: "몇 강부터 시작할 수 있나요?",
        a: "16강, 8강, 4강 중 원하는 라운드를 선택해 시작할 수 있습니다.",
      },
      {
        q: "어떤 주제가 있나요?",
        a: "음식, 여행지, 동물, 취미, 계절, 디저트 총 6가지 주제가 준비되어 있습니다.",
      },
    ],
    matchLabel: (progress: string) => `${progress} 경기`,
    choosePrompt: "둘 중 더 좋아하는 것을 선택하세요!",
    hintText: "카드를 눌러 선택하세요",
    progressTitle: "진행 현황",
    roundWinnersPlaceholder: "이번 라운드 승자가 여기 표시됩니다",
    championLabel: "최종 우승",
    yourFavoriteIs: "당신의 최애는",
    favoriteNameSuffix: "입니다!",
    tournamentComplete: (topicName: string, roundSize: number) =>
      `${topicName} ${roundSize}강 토너먼트 완료`,
    restartButton: "🔄 다시 하기",
    changeTopicButton: "📋 다른 주제",
    shareButton: "🔗 결과 공유",
    copiedButton: "✓ 복사됨!",
    bracketTitle: "토너먼트 브라켓",
    roundName: (total: number) => {
      if (total === 16) return "16강";
      if (total === 8) return "8강";
      if (total === 4) return "4강";
      if (total === 2) return "결승";
      return `${total}강`;
    },
    shareText: (topicName: string, championEmoji: string, championName: string) =>
      `이상형 월드컵 결과: ${topicName}에서 "${championEmoji} ${championName}"이(가) 최종 우승했습니다! | PickPlay`,
    shareTitle: "이상형 월드컵 결과",
    roundSizeLabel: (size: number) => `${size}강`,
  },
  en: {
    title: "Ideal Type Worldcup",
    subtitle: "Find your ultimate favorite through a tournament!",
    topicSelectTitle: "Choose a Topic",
    topicSelectSub: "Pick a worldcup topic to get started",
    roundSelectLabel: "Select Round",
    startButton: (emoji: string, name: string) => `${emoji} Start ${name}!`,
    faqTitle: "FAQ",
    faqs: [
      {
        q: "What is Ideal Type Worldcup?",
        a: "A tournament game where you repeatedly choose between two options until one champion remains.",
      },
      {
        q: "What round sizes are available?",
        a: "You can start from Top 16, Top 8, or Top 4.",
      },
      {
        q: "What topics are available?",
        a: "Food, Travel destinations, Animals, Hobbies, Seasons, and Desserts — 6 topics in total.",
      },
    ],
    matchLabel: (progress: string) => `Match ${progress}`,
    choosePrompt: "Pick the one you like more!",
    hintText: "Tap a card to choose",
    progressTitle: "Round Progress",
    roundWinnersPlaceholder: "Round winners will appear here",
    championLabel: "Champion",
    yourFavoriteIs: "Your ultimate favorite is",
    favoriteNameSuffix: "!",
    tournamentComplete: (topicName: string, roundSize: number) =>
      `${topicName} Top ${roundSize} tournament complete`,
    restartButton: "🔄 Play Again",
    changeTopicButton: "📋 Change Topic",
    shareButton: "🔗 Share Result",
    copiedButton: "✓ Copied!",
    bracketTitle: "Tournament Bracket",
    roundName: (total: number) => {
      if (total === 2) return "Final";
      if (total === 4) return "Semi-final";
      if (total === 8) return "Quarter-final";
      return `Top ${total}`;
    },
    shareText: (topicName: string, championEmoji: string, championName: string) =>
      `Ideal Type Worldcup result: "${championEmoji} ${championName}" won the ${topicName} tournament! | PickPlay`,
    shareTitle: "Ideal Type Worldcup Result",
    roundSizeLabel: (size: number) => `Top ${size}`,
  },
  ja: {
    title: "理想型ワールドカップ",
    subtitle: "トーナメントで本当のお気に入りを見つけよう！",
    topicSelectTitle: "テーマ選択",
    topicSelectSub: "ワールドカップのテーマを選んでください",
    roundSelectLabel: "ラウンド選択",
    startButton: (emoji: string, name: string) => `${emoji} ${name} スタート！`,
    faqTitle: "よくある質問",
    faqs: [
      {
        q: "理想型ワールドカップとは？",
        a: "2つの候補から1つを繰り返し選んで最終優勝者を決めるトーナメントゲームです。",
      },
      {
        q: "何強から始められますか？",
        a: "16強、8強、4強の中から好きなラウンドを選択できます。",
      },
      {
        q: "どんなテーマがありますか？",
        a: "料理、旅行先、動物、趣味、季節、デザートの6テーマが用意されています。",
      },
    ],
    matchLabel: (progress: string) => `${progress} 試合`,
    choosePrompt: "どちらがより好きですか？",
    hintText: "カードをタップして選んでください",
    progressTitle: "進行状況",
    roundWinnersPlaceholder: "このラウンドの勝者がここに表示されます",
    championLabel: "最終優勝",
    yourFavoriteIs: "あなたの推しは",
    favoriteNameSuffix: "です！",
    tournamentComplete: (topicName: string, roundSize: number) =>
      `${topicName} ${roundSize}強トーナメント完了`,
    restartButton: "🔄 もう一度",
    changeTopicButton: "📋 テーマ変更",
    shareButton: "🔗 結果をシェア",
    copiedButton: "✓ コピー済み！",
    bracketTitle: "トーナメントブラケット",
    roundName: (total: number) => {
      if (total === 2) return "決勝";
      if (total === 4) return "準決勝";
      if (total === 8) return "準々決勝";
      return `${total}強`;
    },
    shareText: (topicName: string, championEmoji: string, championName: string) =>
      `理想型ワールドカップ結果：${topicName}で「${championEmoji} ${championName}」が最終優勝！ | PickPlay`,
    shareTitle: "理想型ワールドカップ結果",
    roundSizeLabel: (size: number) => `${size}強`,
  },
  zh: {
    title: "理想型世界杯",
    subtitle: "通过淘汰赛找出你真正的最爱！",
    topicSelectTitle: "选择主题",
    topicSelectSub: "选择世界杯主题",
    roundSelectLabel: "选择轮次",
    startButton: (emoji: string, name: string) => `${emoji} 开始${name}！`,
    faqTitle: "常见问题",
    faqs: [
      {
        q: "什么是理想型世界杯？",
        a: "通过反复在两个选项中选一个，最终决出冠军的淘汰赛游戏。",
      },
      {
        q: "可以从哪个轮次开始？",
        a: "可以选择16强、8强或4强开始。",
      },
      {
        q: "有哪些主题？",
        a: "食物、旅游目的地、动物、爱好、季节、甜点，共6个主题。",
      },
    ],
    matchLabel: (progress: string) => `第${progress}场`,
    choosePrompt: "选择你更喜欢的一个！",
    hintText: "点击卡片进行选择",
    progressTitle: "进行状况",
    roundWinnersPlaceholder: "本轮胜者将显示在此处",
    championLabel: "最终冠军",
    yourFavoriteIs: "你的最爱是",
    favoriteNameSuffix: "！",
    tournamentComplete: (topicName: string, roundSize: number) =>
      `${topicName} ${roundSize}强淘汰赛完成`,
    restartButton: "🔄 再玩一次",
    changeTopicButton: "📋 换主题",
    shareButton: "🔗 分享结果",
    copiedButton: "✓ 已复制！",
    bracketTitle: "淘汰赛对阵图",
    roundName: (total: number) => {
      if (total === 2) return "决赛";
      if (total === 4) return "半决赛";
      if (total === 8) return "八强赛";
      return `${total}强`;
    },
    shareText: (topicName: string, championEmoji: string, championName: string) =>
      `理想型世界杯结果：${topicName}中「${championEmoji} ${championName}」最终夺冠！ | PickPlay`,
    shareTitle: "理想型世界杯结果",
    roundSizeLabel: (size: number) => `${size}强`,
  },
  es: {
    title: "Worldcup del Tipo Ideal",
    subtitle: "¡Encuentra tu favorito definitivo en un torneo!",
    topicSelectTitle: "Elige un Tema",
    topicSelectSub: "Selecciona el tema del worldcup",
    roundSelectLabel: "Seleccionar Ronda",
    startButton: (emoji: string, name: string) => `${emoji} ¡Empezar ${name}!`,
    faqTitle: "Preguntas frecuentes",
    faqs: [
      {
        q: "¿Qué es el Worldcup del Tipo Ideal?",
        a: "Un juego de torneo en el que eliges repetidamente entre dos opciones hasta que queda un campeón.",
      },
      {
        q: "¿Desde qué ronda puedo empezar?",
        a: "Puedes empezar desde los 16, 8 o 4 mejores.",
      },
      {
        q: "¿Qué temas hay disponibles?",
        a: "Comida, Destinos de viaje, Animales, Hobbies, Estaciones y Postres — 6 temas en total.",
      },
    ],
    matchLabel: (progress: string) => `Partido ${progress}`,
    choosePrompt: "¡Elige el que más te gusta!",
    hintText: "Toca una carta para elegir",
    progressTitle: "Progreso",
    roundWinnersPlaceholder: "Los ganadores de la ronda aparecerán aquí",
    championLabel: "Campeón Final",
    yourFavoriteIs: "Tu favorito definitivo es",
    favoriteNameSuffix: "!",
    tournamentComplete: (topicName: string, roundSize: number) =>
      `Torneo Top ${roundSize} de ${topicName} completado`,
    restartButton: "🔄 Jugar de Nuevo",
    changeTopicButton: "📋 Cambiar Tema",
    shareButton: "🔗 Compartir Resultado",
    copiedButton: "✓ ¡Copiado!",
    bracketTitle: "Cuadro del Torneo",
    roundName: (total: number) => {
      if (total === 2) return "Final";
      if (total === 4) return "Semifinal";
      if (total === 8) return "Cuartos de final";
      return `Top ${total}`;
    },
    shareText: (topicName: string, championEmoji: string, championName: string) =>
      `Resultado del Worldcup: "${championEmoji} ${championName}" ganó el torneo de ${topicName}! | PickPlay`,
    shareTitle: "Resultado del Worldcup del Tipo Ideal",
    roundSizeLabel: (size: number) => `Top ${size}`,
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

const ROUND_SIZES: RoundSize[] = [16, 8, 4];

const topics = worldcupData.topics as Topic[];

export default function WorldcupPage() {
  const locale = useLocale();
  const t = translations[locale];

  const [phase, setPhase] = useState<Phase>("select");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [roundSize, setRoundSize] = useState<RoundSize>(16);
  const [copied, setCopied] = useState(false);

  // Tournament state
  const [bracket, setBracket] = useState<Candidate[]>([]);
  const [matchIndex, setMatchIndex] = useState(0);
  const [winners, setWinners] = useState<Candidate[]>([]);
  const [chosen, setChosen] = useState<"left" | "right" | null>(null);
  const [champion, setChampion] = useState<Candidate | null>(null);
  const [roundHistory, setRoundHistory] = useState<Candidate[][]>([]);

  // Current round total matches
  const totalMatches = useMemo(() => Math.floor(bracket.length / 2), [bracket]);
  const currentRoundName = useMemo(() => t.roundName(bracket.length), [bracket, t]);
  const matchProgress = `${matchIndex + 1}/${totalMatches}`;

  const leftCandidate = bracket[matchIndex * 2] ?? null;
  const rightCandidate = bracket[matchIndex * 2 + 1] ?? null;

  const startTournament = useCallback((topic: Topic, size: RoundSize) => {
    const pool = shuffle(topic.candidates).slice(0, size);
    setBracket(pool);
    setMatchIndex(0);
    setWinners([]);
    setChosen(null);
    setChampion(null);
    setRoundHistory([pool]);
    setPhase("tournament");
  }, []);

  const handlePick = useCallback(
    (side: "left" | "right") => {
      if (chosen !== null) return;
      setChosen(side);

      const winner = side === "left" ? leftCandidate : rightCandidate;
      if (!winner) return;

      setTimeout(() => {
        const newWinners = [...winners, winner];
        const nextMatchIndex = matchIndex + 1;

        if (nextMatchIndex >= totalMatches) {
          // Round complete
          if (newWinners.length === 1) {
            // Champion!
            setChampion(newWinners[0]);
            setPhase("result");
          } else {
            // Next round
            const nextBracket = shuffle(newWinners);
            setBracket(nextBracket);
            setRoundHistory((h) => [...h, nextBracket]);
            setMatchIndex(0);
            setWinners([]);
          }
        } else {
          setMatchIndex(nextMatchIndex);
          setWinners(newWinners);
        }
        setChosen(null);
      }, 800);
    },
    [chosen, leftCandidate, rightCandidate, winners, matchIndex, totalMatches]
  );

  const handleRestart = useCallback(() => {
    if (!selectedTopic) return;
    startTournament(selectedTopic, roundSize);
  }, [selectedTopic, roundSize, startTournament]);

  const handleChangeTopic = useCallback(() => {
    setPhase("select");
    setSelectedTopic(null);
    setBracket([]);
    setMatchIndex(0);
    setWinners([]);
    setChosen(null);
    setChampion(null);
    setRoundHistory([]);
  }, []);

  const handleShare = useCallback(() => {
    if (!champion || !selectedTopic) return;
    const text = t.shareText(selectedTopic.name, champion.emoji, champion.name);
    if (navigator.share) {
      navigator.share({ title: t.shareTitle, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {});
    }
  }, [champion, selectedTopic, t]);

  // Progress bar for tournament
  const totalRounds = useMemo(() => {
    if (roundSize === 16) return 4; // 16 → 8 → 4 → 2 → 1
    if (roundSize === 8) return 3;
    return 2;
  }, [roundSize]);

  const currentRoundNumber = useMemo(() => {
    return roundHistory.length;
  }, [roundHistory]);

  const overallProgress = useMemo(() => {
    if (totalMatches === 0) return 0;
    const roundProgress = (matchIndex / totalMatches) / totalRounds;
    const completedRounds = (currentRoundNumber - 1) / totalRounds;
    return Math.min((completedRounds + roundProgress) * 100, 99);
  }, [matchIndex, totalMatches, totalRounds, currentRoundNumber]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50/30 to-purple-50/20 dark:from-slate-950 dark:via-rose-950/20 dark:to-purple-950/10">
        <div className="max-w-2xl mx-auto px-4 py-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent mb-2">
              {t.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {t.subtitle}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">

            {/* ── PHASE 1: TOPIC SELECTION ── */}
            {phase === "select" && (
              <motion.div
                key="select"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-1">
                    {t.topicSelectTitle}
                  </h2>
                  <p className="text-sm text-slate-400 dark:text-slate-500">
                    {t.topicSelectSub}
                  </p>
                </div>

                {/* Topic Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {topics.map((topic) => (
                    <motion.button
                      key={topic.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedTopic(topic)}
                      className={`relative p-4 rounded-2xl border-2 text-left transition-all ${
                        selectedTopic?.id === topic.id
                          ? "border-rose-400 bg-rose-50 dark:bg-rose-950/30 shadow-md shadow-rose-200/50 dark:shadow-rose-900/30"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-rose-300 dark:hover:border-rose-700"
                      }`}
                    >
                      {selectedTopic?.id === topic.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center text-white text-xs"
                        >
                          ✓
                        </motion.div>
                      )}
                      <div className="text-3xl mb-2">{topic.emoji}</div>
                      <div className="font-bold text-sm text-slate-800 dark:text-slate-100 leading-tight">
                        {topic.name}
                      </div>
                      <div className="text-xs text-slate-400 dark:text-slate-500 mt-1 leading-snug">
                        {topic.description}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Ad between topic and round select */}
                <AdBanner
                  format="horizontal"
                  className="rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
                />

                {/* Round Size Selection */}
                {selectedTopic && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
                  >
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
                      {t.roundSelectLabel}
                    </p>
                    <div className="flex gap-3 mb-5">
                      {ROUND_SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => setRoundSize(size)}
                          className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
                            roundSize === size
                              ? "bg-gradient-to-r from-rose-500 to-purple-500 text-white shadow-md scale-105"
                              : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                          }`}
                        >
                          {t.roundSizeLabel(size)}
                        </button>
                      ))}
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => startTournament(selectedTopic, roundSize)}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-500 text-white font-bold text-lg shadow-md hover:shadow-rose-500/25 transition-shadow"
                    >
                      {t.startButton(selectedTopic.emoji, selectedTopic.name)}
                    </motion.button>
                  </motion.div>
                )}

                {/* FAQ Section */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-4">
                  <h2 className="text-base font-bold text-slate-700 dark:text-slate-200">{t.faqTitle}</h2>
                  {t.faqs.map((faq, i) => (
                    <div key={i}>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Q. {faq.q}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── PHASE 2: TOURNAMENT ── */}
            {phase === "tournament" && leftCandidate && rightCandidate && (
              <motion.div
                key={`match-${currentRoundName}-${matchIndex}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* Round info & progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-rose-500 dark:text-rose-400 uppercase tracking-wide">
                      {currentRoundName}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                      {t.matchLabel(matchProgress)}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-rose-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${overallProgress}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* In-article ad between rounds (show only at start of new round after first) */}
                {matchIndex === 0 && currentRoundNumber > 1 && (
                  <AdBanner
                    format="in-article"
                    className="rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
                  />
                )}

                {/* Prompt */}
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                    {t.choosePrompt}
                  </p>
                </div>

                {/* Match cards */}
                <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                  {/* Left candidate */}
                  <motion.button
                    onClick={() => handlePick("left")}
                    disabled={chosen !== null}
                    animate={
                      chosen === null
                        ? { scale: 1, opacity: 1 }
                        : chosen === "left"
                        ? { scale: 1.06, opacity: 1 }
                        : { scale: 0.9, opacity: 0.35 }
                    }
                    whileHover={chosen === null ? { scale: 1.02 } : {}}
                    whileTap={chosen === null ? { scale: 0.97 } : {}}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`relative flex-1 min-h-44 sm:min-h-56 rounded-2xl p-6 flex flex-col items-center justify-center text-white font-bold text-center shadow-lg bg-gradient-to-br from-rose-400 to-rose-600 cursor-pointer disabled:cursor-default transition-shadow ${
                      chosen === "left"
                        ? "shadow-rose-400/70 shadow-2xl ring-4 ring-rose-300"
                        : "hover:shadow-rose-400/30 hover:shadow-xl"
                    }`}
                  >
                    {chosen === "left" && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.05 }}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/30 flex items-center justify-center text-lg"
                      >
                        👑
                      </motion.div>
                    )}
                    <span className="text-5xl mb-3">{leftCandidate.emoji}</span>
                    <span className="text-xl font-extrabold leading-tight mb-1">
                      {leftCandidate.name}
                    </span>
                    <span className="text-xs text-rose-100 opacity-90 leading-snug">
                      {leftCandidate.desc}
                    </span>
                  </motion.button>

                  {/* VS divider */}
                  <div className="flex sm:flex-col items-center justify-center gap-1">
                    <div className="hidden sm:block flex-1 w-px bg-slate-300 dark:bg-slate-600" />
                    <motion.span
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="text-slate-400 dark:text-slate-500 font-extrabold text-xl tracking-wider px-3 sm:px-0 sm:py-2"
                    >
                      VS
                    </motion.span>
                    <div className="hidden sm:block flex-1 w-px bg-slate-300 dark:bg-slate-600" />
                  </div>

                  {/* Right candidate */}
                  <motion.button
                    onClick={() => handlePick("right")}
                    disabled={chosen !== null}
                    animate={
                      chosen === null
                        ? { scale: 1, opacity: 1 }
                        : chosen === "right"
                        ? { scale: 1.06, opacity: 1 }
                        : { scale: 0.9, opacity: 0.35 }
                    }
                    whileHover={chosen === null ? { scale: 1.02 } : {}}
                    whileTap={chosen === null ? { scale: 0.97 } : {}}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`relative flex-1 min-h-44 sm:min-h-56 rounded-2xl p-6 flex flex-col items-center justify-center text-white font-bold text-center shadow-lg bg-gradient-to-br from-purple-400 to-purple-600 cursor-pointer disabled:cursor-default transition-shadow ${
                      chosen === "right"
                        ? "shadow-purple-400/70 shadow-2xl ring-4 ring-purple-300"
                        : "hover:shadow-purple-400/30 hover:shadow-xl"
                    }`}
                  >
                    {chosen === "right" && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.05 }}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/30 flex items-center justify-center text-lg"
                      >
                        👑
                      </motion.div>
                    )}
                    <span className="text-5xl mb-3">{rightCandidate.emoji}</span>
                    <span className="text-xl font-extrabold leading-tight mb-1">
                      {rightCandidate.name}
                    </span>
                    <span className="text-xs text-purple-100 opacity-90 leading-snug">
                      {rightCandidate.desc}
                    </span>
                  </motion.button>
                </div>

                {/* Hint */}
                {chosen === null && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-xs text-slate-400 dark:text-slate-500"
                  >
                    {t.hintText}
                  </motion.p>
                )}

                {/* Bracket history */}
                {roundHistory.length > 0 && (
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">
                      {t.progressTitle}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {winners.map((w) => (
                        <motion.span
                          key={`winner-${w.id}-${w.name}`}
                          initial={{ scale: 0.7, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-xs font-medium text-rose-700 dark:text-rose-300"
                        >
                          {w.emoji} {w.name}
                        </motion.span>
                      ))}
                    </div>
                    {winners.length === 0 && (
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        {t.roundWinnersPlaceholder}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* ── PHASE 3: RESULT ── */}
            {phase === "result" && champion && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
                  {/* Celebration emoji */}
                  <motion.div
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="text-5xl mb-2"
                  >
                    🎉
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm font-bold text-rose-500 dark:text-rose-400 uppercase tracking-widest mb-4"
                  >
                    {t.championLabel}
                  </motion.p>

                  {/* Champion card */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 180, delay: 0.3 }}
                    className="inline-flex flex-col items-center justify-center bg-gradient-to-br from-rose-400 to-purple-500 rounded-3xl p-8 shadow-2xl shadow-rose-400/30 mb-6 min-w-[180px]"
                  >
                    <motion.span
                      animate={{ rotate: [0, -5, 5, -5, 0], scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
                      className="text-7xl mb-3"
                    >
                      {champion.emoji}
                    </motion.span>
                    <span className="text-2xl font-extrabold text-white mb-1">
                      {champion.name}
                    </span>
                    <span className="text-sm text-white/80">{champion.desc}</span>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mb-1"
                  >
                    {t.yourFavoriteIs}
                    <br />
                    <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
                      {champion.name}
                    </span>
                    {t.favoriteNameSuffix}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-slate-400 dark:text-slate-500 text-sm mb-6"
                  >
                    {t.tournamentComplete(selectedTopic?.name ?? "", roundSize)}
                  </motion.p>

                  {/* Ad: rectangle */}
                  <AdBanner
                    format="rectangle"
                    className="mb-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
                  />

                  {/* Action buttons */}
                  <div className="flex flex-col gap-3">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleRestart}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.65 }}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-500 text-white font-bold text-base shadow-md hover:shadow-rose-500/25 transition-shadow"
                    >
                      {t.restartButton}
                    </motion.button>
                    <div className="flex gap-3">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={handleChangeTopic}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex-1 py-3 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                      >
                        {t.changeTopicButton}
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={handleShare}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.75 }}
                        className="flex-1 py-3 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                      >
                        {copied ? t.copiedButton : t.shareButton}
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Final bracket — show all round winners */}
                {roundHistory.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700"
                  >
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-4">
                      {t.bracketTitle}
                    </p>
                    <div className="space-y-3">
                      {roundHistory.map((roundCandidates, roundIdx) => (
                        <div key={roundIdx}>
                          <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mb-2">
                            {t.roundName(roundCandidates.length)}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {roundCandidates.map((c) => {
                              const isChampion = c.id === champion.id && c.name === champion.name;
                              return (
                                <span
                                  key={`${roundIdx}-${c.id}-${c.name}`}
                                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                    isChampion
                                      ? "bg-gradient-to-r from-rose-500 to-purple-500 text-white"
                                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                                  }`}
                                >
                                  {c.emoji} {c.name}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Ad: in-article bottom */}
                <AdBanner
                  format="in-article"
                  className="rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
                />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
