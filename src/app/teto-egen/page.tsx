"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import testData from "@/data/teto-egen-test.json";
import { useLocale } from "@/hooks/useLocale";

const translations = {
  ko: {
    title: "테토 vs 에겐 테스트",
    subtitle: "나는 테토일까? 에겐일까? 내 성향을 알아보세요!",
    selectGender: "성별을 선택해 주세요",
    male: "남성",
    maleDesc: "테토남 / 에겐남",
    female: "여성",
    femaleDesc: "테토녀 / 에겐녀",
    infoText1: "테토",
    infoText2: "는 테스토스테론,",
    infoText3: "에겐",
    infoText4: "은 에스트로겐의 줄임말로,",
    infoText5: "성격과 연애 스타일을 분류하는 요즘 대세 성향 테스트입니다.",
    question: "질문",
    detailedAnalysis: "상세 분석",
    traits: "성향 특징",
    strengths: "강점",
    weaknesses: "주의할 점",
    loveStyle: "연애 스타일",
    compatibility: "궁합",
    bestMatch: "최고 궁합",
    worstMatch: "주의 궁합",
    share: "결과 공유하기",
    copied: "클립보드에 복사됨!",
    restart: "다시 하기",
    shareText: "[테토 vs 에겐 성향 테스트 결과]\n",
    shareMiddle: "\n테토 ",
    shareEgen: "% / 에겐 ",
    shareBest: "\n\n최고 궁합: ",
    shareWorst: "\n최악 궁합: ",
    shareLink: "\n\n테스트 해보기: https://pick-play.github.io/teto-egen",
    egennyeo: "에겐녀",
    egennam: "에겐남",
    tetonyeo: "테토녀",
    tetonam: "테토남",
    teto: "테토",
    egen: "에겐",
    faqTitle: "자주 묻는 질문",
    faqItems: [
      { q: "테토와 에겐이란 무엇인가요?", a: "테토(Teto)는 테스토스테론, 에겐(Egen)은 에스트로겐의 줄임말로, 성격과 연애 스타일을 분류하는 새로운 성향 테스트입니다. 테토 성향은 주도적이고 경쟁적이며 논리적인 특성을 보이고, 에겐 성향은 감수성이 풍부하고 공감 능력이 뛰어난 특성을 나타냅니다." },
      { q: "테토 vs 에겐 테스트는 어떻게 진행되나요?", a: "먼저 성별을 선택한 후, 일상적인 상황에 대한 질문에 답변합니다. 각 답변이 테토 또는 에겐 성향에 얼마나 부합하는지 분석하여 최종 결과와 함께 테토/에겐 비율을 보여줍니다. 결과에는 성향 특징, 강점, 약점, 연애 스타일, 궁합 정보도 함께 제공됩니다." },
      { q: "성별을 선택하는 이유는 무엇인가요?", a: "테토남/에겐남, 테토녀/에겐녀는 같은 성향이더라도 표현 방식과 특성이 다를 수 있기 때문입니다. 성별에 따라 맞춤화된 결과와 분석을 제공하기 위해 선택하게 됩니다." },
      { q: "결과가 100% 테토 또는 100% 에겐으로 나올 수 있나요?", a: "대부분의 사람들은 테토와 에겐 성향을 모두 가지고 있으며, 비율이 다를 뿐입니다. 극단적으로 한쪽으로 쏠리는 경우는 드물며, 보통 60~70% 정도의 주요 성향을 갖게 됩니다. 어느 쪽이 더 강한지 파악하는 것이 이 테스트의 목적입니다." },
    ],
  },
  en: {
    title: "Teto vs Egen Test",
    subtitle: "Are you Teto or Egen? Discover your personality type!",
    selectGender: "Please select your gender",
    male: "Male",
    maleDesc: "Teto Male / Egen Male",
    female: "Female",
    femaleDesc: "Teto Female / Egen Female",
    infoText1: "Teto",
    infoText2: "stands for testosterone,",
    infoText3: "Egen",
    infoText4: "stands for estrogen —",
    infoText5: "a trending personality test that categorizes your character and love style.",
    question: "Question",
    detailedAnalysis: "Detailed Analysis",
    traits: "Personality Traits",
    strengths: "Strengths",
    weaknesses: "Watch Out For",
    loveStyle: "Love Style",
    compatibility: "Compatibility",
    bestMatch: "Best Match",
    worstMatch: "Worst Match",
    share: "Share Result",
    copied: "Copied to clipboard!",
    restart: "Try Again",
    shareText: "[Teto vs Egen Personality Test Result]\n",
    shareMiddle: "\nTeto ",
    shareEgen: "% / Egen ",
    shareBest: "\n\nBest Match: ",
    shareWorst: "\nWorst Match: ",
    shareLink: "\n\nTake the test: https://pick-play.github.io/teto-egen",
    egennyeo: "Egen F",
    egennam: "Egen M",
    tetonyeo: "Teto F",
    tetonam: "Teto M",
    teto: "Teto",
    egen: "Egen",
    faqTitle: "Frequently Asked Questions",
    faqItems: [
      { q: "What are Teto and Egen?", a: "Teto stands for testosterone and Egen stands for estrogen — a trending personality test that categorizes your character and love style. Teto personalities tend to be assertive, competitive, and logical, while Egen personalities are characterized by sensitivity, empathy, and emotional depth." },
      { q: "How does the Teto vs Egen test work?", a: "First, select your gender, then answer questions about everyday situations. The test analyzes how much each answer aligns with Teto or Egen tendencies, showing your final result along with a Teto/Egen percentage. Results also include personality traits, strengths, weaknesses, love style, and compatibility information." },
      { q: "Why do I need to select a gender?", a: "Teto male/Egen male and Teto female/Egen female may express the same tendencies differently. Selecting your gender allows the test to provide customized results and analysis tailored to your experience." },
      { q: "Can I get 100% Teto or 100% Egen?", a: "Most people have a mix of both Teto and Egen tendencies, just in different proportions. Extreme results leaning entirely one way are rare — most people end up with around 60-70% on one side. The purpose of this test is to identify which tendency is stronger." },
    ],
  },
  ja: {
    title: "テト vs エゲン テスト",
    subtitle: "あなたはテト？エゲン？自分の傾向を確認しよう！",
    selectGender: "性別を選択してください",
    male: "男性",
    maleDesc: "テト男 / エゲン男",
    female: "女性",
    femaleDesc: "テト女 / エゲン女",
    infoText1: "テト",
    infoText2: "はテストステロン、",
    infoText3: "エゲン",
    infoText4: "はエストロゲンの略で、",
    infoText5: "性格と恋愛スタイルを分類するトレンドの性格テストです。",
    question: "質問",
    detailedAnalysis: "詳細分析",
    traits: "性格の特徴",
    strengths: "強み",
    weaknesses: "注意点",
    loveStyle: "恋愛スタイル",
    compatibility: "相性",
    bestMatch: "最高の相性",
    worstMatch: "注意の相性",
    share: "結果をシェア",
    copied: "クリップボードにコピーしました！",
    restart: "もう一度",
    shareText: "[テト vs エゲン 性格テスト結果]\n",
    shareMiddle: "\nテト ",
    shareEgen: "% / エゲン ",
    shareBest: "\n\n最高の相性: ",
    shareWorst: "\n注意の相性: ",
    shareLink: "\n\nテストを受ける: https://pick-play.github.io/teto-egen",
    egennyeo: "エゲン女",
    egennam: "エゲン男",
    tetonyeo: "テト女",
    tetonam: "テト男",
    teto: "テト",
    egen: "エゲン",
    faqTitle: "よくある質問",
    faqItems: [
      { q: "テトとエゲンとは何ですか？", a: "テト（Teto）はテストステロン、エゲン（Egen）はエストロゲンの略で、性格と恋愛スタイルを分類する新しい性格テストです。テト傾向は主体的・競争的・論理的な特性を持ち、エゲン傾向は感受性が豊かで共感能力に優れた特性を示します。" },
      { q: "テスト vs エゲンテストはどのように進みますか？", a: "まず性別を選択し、日常的な状況についての質問に答えます。各回答がテトまたはエゲン傾向にどれほど合致するかを分析し、テト/エゲンの比率とともに最終結果を表示します。" },
      { q: "性別を選択する理由は何ですか？", a: "テト男/エゲン男、テト女/エゲン女は同じ傾向でも表現の仕方や特性が異なることがあるためです。性別に応じてカスタマイズされた結果と分析を提供するために選択します。" },
      { q: "100%テトまたは100%エゲンという結果が出ることはありますか？", a: "ほとんどの人はテトとエゲン両方の傾向を持っており、比率が異なるだけです。極端に片方に偏るケースは稀で、通常は60〜70%程度の主要傾向を持ちます。" },
    ],
  },
  zh: {
    title: "Teto vs Egen 测试",
    subtitle: "你是Teto还是Egen？探索你的性格倾向！",
    selectGender: "请选择性别",
    male: "男性",
    maleDesc: "Teto男 / Egen男",
    female: "女性",
    femaleDesc: "Teto女 / Egen女",
    infoText1: "Teto",
    infoText2: "代表睾酮，",
    infoText3: "Egen",
    infoText4: "代表雌激素，",
    infoText5: "这是一种流行的性格测试，用于划分你的个性与恋爱风格。",
    question: "问题",
    detailedAnalysis: "详细分析",
    traits: "性格特征",
    strengths: "优点",
    weaknesses: "注意事项",
    loveStyle: "恋爱风格",
    compatibility: "相性",
    bestMatch: "最佳配对",
    worstMatch: "注意配对",
    share: "分享结果",
    copied: "已复制到剪贴板！",
    restart: "再试一次",
    shareText: "[Teto vs Egen 性格测试结果]\n",
    shareMiddle: "\nTeto ",
    shareEgen: "% / Egen ",
    shareBest: "\n\n最佳配对: ",
    shareWorst: "\n注意配对: ",
    shareLink: "\n\n参加测试: https://pick-play.github.io/teto-egen",
    egennyeo: "Egen女",
    egennam: "Egen男",
    tetonyeo: "Teto女",
    tetonam: "Teto男",
    teto: "Teto",
    egen: "Egen",
    faqTitle: "常见问题",
    faqItems: [
      { q: "Teto和Egen是什么？", a: "Teto代表睾酮，Egen代表雌激素，这是一种流行的性格测试，用于划分你的个性与恋爱风格。Teto性格倾向主动、有竞争性且逻辑性强，而Egen性格倾向感受性丰富、共情能力强。" },
      { q: "Teto vs Egen测试如何进行？", a: "首先选择性别，然后回答关于日常情景的问题。测试分析每个答案与Teto或Egen倾向的契合度，显示最终结果和Teto/Egen比例。结果还包括性格特征、优点、缺点、恋爱风格和配对信息。" },
      { q: "为什么需要选择性别？", a: "Teto男/Egen男和Teto女/Egen女即使倾向相同，表达方式和特性也可能不同。选择性别是为了提供针对您性别定制的结果和分析。" },
      { q: "结果会是100% Teto或100% Egen吗？", a: "大多数人同时具有Teto和Egen两种倾向，只是比例不同。极端偏向一方的情况很少见，通常主要倾向约为60至70%。这个测试的目的是找出哪种倾向更强。" },
    ],
  },
  es: {
    title: "Test Teto vs Egen",
    subtitle: "¿Eres Teto o Egen? ¡Descubre tu tipo de personalidad!",
    selectGender: "Por favor selecciona tu género",
    male: "Masculino",
    maleDesc: "Teto M / Egen M",
    female: "Femenino",
    femaleDesc: "Teto F / Egen F",
    infoText1: "Teto",
    infoText2: "representa la testosterona,",
    infoText3: "Egen",
    infoText4: "representa el estrógeno —",
    infoText5: "una prueba de personalidad de tendencia que clasifica tu carácter y estilo amoroso.",
    question: "Pregunta",
    detailedAnalysis: "Análisis Detallado",
    traits: "Rasgos de Personalidad",
    strengths: "Fortalezas",
    weaknesses: "Ten Cuidado Con",
    loveStyle: "Estilo Amoroso",
    compatibility: "Compatibilidad",
    bestMatch: "Mejor Compatibilidad",
    worstMatch: "Compatibilidad a Evitar",
    share: "Compartir Resultado",
    copied: "¡Copiado al portapapeles!",
    restart: "Intentar de Nuevo",
    shareText: "[Resultado del Test Teto vs Egen]\n",
    shareMiddle: "\nTeto ",
    shareEgen: "% / Egen ",
    shareBest: "\n\nMejor compatibilidad: ",
    shareWorst: "\nCompatibilidad a evitar: ",
    shareLink: "\n\nHaz el test: https://pick-play.github.io/teto-egen",
    egennyeo: "Egen F",
    egennam: "Egen M",
    tetonyeo: "Teto F",
    tetonam: "Teto M",
    teto: "Teto",
    egen: "Egen",
    faqTitle: "Preguntas Frecuentes",
    faqItems: [
      { q: "¿Qué son Teto y Egen?", a: "Teto representa la testosterona y Egen representa el estrógeno — una prueba de personalidad de tendencia que clasifica tu carácter y estilo amoroso. Las personalidades Teto tienden a ser asertivas, competitivas y lógicas, mientras que las personalidades Egen se caracterizan por sensibilidad, empatía y profundidad emocional." },
      { q: "¿Cómo funciona el test Teto vs Egen?", a: "Primero, selecciona tu género, luego responde preguntas sobre situaciones cotidianas. La prueba analiza cuánto se alinea cada respuesta con las tendencias Teto o Egen, mostrando tu resultado final junto con un porcentaje Teto/Egen. Los resultados también incluyen rasgos de personalidad, fortalezas, debilidades, estilo amoroso e información de compatibilidad." },
      { q: "¿Por qué necesito seleccionar género?", a: "Teto masculino/Egen masculino y Teto femenino/Egen femenino pueden expresar las mismas tendencias de manera diferente. Seleccionar tu género permite que la prueba proporcione resultados y análisis personalizados según tu experiencia." },
      { q: "¿Puedo obtener 100% Teto o 100% Egen?", a: "La mayoría de las personas tienen una mezcla de tendencias Teto y Egen, solo en proporciones diferentes. Los resultados extremos hacia un solo lado son raros — la mayoría termina con alrededor del 60-70% en un lado. El propósito de esta prueba es identificar cuál tendencia es más fuerte." },
    ],
  },
};

type Gender = "male" | "female";
type Phase = "gender" | "quiz" | "result";
type ResultKey = "tetoMale" | "egenMale" | "tetoFemale" | "egenFemale";

interface Option {
  text: string;
  type: "teto" | "egen";
  weight: number;
}

interface Question {
  id: number;
  question: string;
  category?: string;
  optionA: Option;
  optionB: Option;
  tiebreaker?: boolean;
}

interface PercentageRange {
  min: number;
  label: string;
  text: string;
}

interface DetailedAnalysis {
  strongTeto: string;
  moderateTeto: string;
  balanced: string;
  moderateEgen: string;
  strongEgen: string;
}

interface ResultData {
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  description: string;
  traits: string[];
  loveStyle: string;
  bestMatch: string;
  bestMatchDesc: string;
  worstMatch: string;
  worstMatchDesc: string;
  strengths: string[];
  weaknesses: string[];
  detailedAnalysis: DetailedAnalysis;
  percentageAnalysis: {
    extreme: PercentageRange;
    strong: PercentageRange;
    moderate: PercentageRange;
    slight: PercentageRange;
  };
}

const results = testData.results as unknown as Record<ResultKey, ResultData>;
const loveChain = testData.loveChain;

function getPercentageAnalysis(result: ResultData, dominantPercent: number): { label: string; text: string } {
  const pa = result.percentageAnalysis;
  if (dominantPercent >= pa.extreme.min) return pa.extreme;
  if (dominantPercent >= pa.strong.min) return pa.strong;
  if (dominantPercent >= pa.moderate.min) return pa.moderate;
  return pa.slight;
}

function getDetailedAnalysis(result: ResultData, dominantPercent: number): string {
  const da = result.detailedAnalysis;
  if (dominantPercent >= 80) {
    // Strong dominant type
    return result.title.includes("테토") ? da.strongTeto : da.strongEgen;
  } else if (dominantPercent >= 65) {
    return result.title.includes("테토") ? da.moderateTeto : da.moderateEgen;
  } else if (dominantPercent >= 55) {
    return da.balanced;
  } else {
    // Near the boundary
    return result.title.includes("테토") ? da.moderateTeto : da.moderateEgen;
  }
}

// Map result color gradient strings to solid Tailwind-safe bg classes for bars
const tetoBarColor: Record<ResultKey, string> = {
  tetoMale: "bg-blue-500",
  egenMale: "bg-purple-500",
  tetoFemale: "bg-orange-500",
  egenFemale: "bg-pink-400",
};

const egenBarColor: Record<ResultKey, string> = {
  tetoMale: "bg-indigo-300",
  egenMale: "bg-pink-300",
  tetoFemale: "bg-red-300",
  egenFemale: "bg-rose-300",
};

export default function TetoEgenPage() {
  const locale = useLocale();
  const t = translations[locale];
  const [phase, setPhase] = useState<Phase>("gender");
  const [gender, setGender] = useState<Gender | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | null>(null);
  const [tetoScore, setTetoScore] = useState(0);
  const [egenScore, setEgenScore] = useState(0);
  const [resultKey, setResultKey] = useState<ResultKey | null>(null);
  const [tetoPercent, setTetoPercent] = useState(0);
  const [egenPercent, setEgenPercent] = useState(0);
  const [copied, setCopied] = useState(false);

  const questions: Question[] =
    gender === "male"
      ? (testData.male.questions as Question[])
      : gender === "female"
      ? (testData.female.questions as Question[])
      : [];

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];

  const handleGenderSelect = useCallback((g: Gender) => {
    setGender(g);
    setPhase("quiz");
    setCurrentIndex(0);
    setTetoScore(0);
    setEgenScore(0);
    setSelectedOption(null);
  }, []);

  const handleOptionSelect = useCallback(
    (option: "A" | "B") => {
      if (selectedOption !== null) return;
      setSelectedOption(option);

      const chosen =
        option === "A" ? currentQuestion.optionA : currentQuestion.optionB;
      const newTeto = chosen.type === "teto" ? tetoScore + chosen.weight : tetoScore;
      const newEgen = chosen.type === "egen" ? egenScore + chosen.weight : egenScore;

      setTimeout(() => {
        const nextIndex = currentIndex + 1;
        if (nextIndex >= totalQuestions) {
          // Calculate result
          const total = newTeto + newEgen;
          const tp = total > 0 ? Math.round((newTeto / total) * 100) : 50;
          const ep = 100 - tp;
          setTetoPercent(tp);
          setEgenPercent(ep);

          let key: ResultKey;
          if (gender === "male") {
            key = tp >= 50 ? "tetoMale" : "egenMale";
          } else {
            key = tp >= 50 ? "tetoFemale" : "egenFemale";
          }
          setTetoScore(newTeto);
          setEgenScore(newEgen);
          setResultKey(key);
          setPhase("result");
        } else {
          setTetoScore(newTeto);
          setEgenScore(newEgen);
          setCurrentIndex(nextIndex);
          setSelectedOption(null);
        }
      }, 500);
    },
    [selectedOption, currentQuestion, tetoScore, egenScore, currentIndex, totalQuestions, gender]
  );

  const handleRestart = useCallback(() => {
    setPhase("gender");
    setGender(null);
    setCurrentIndex(0);
    setSelectedOption(null);
    setTetoScore(0);
    setEgenScore(0);
    setResultKey(null);
    setTetoPercent(0);
    setEgenPercent(0);
    setCopied(false);
  }, []);

  const handleShare = useCallback(() => {
    if (!resultKey) return;
    const r = results[resultKey];
    const text = `${t.shareText}${r.emoji} ${r.title} - ${r.subtitle}${t.shareMiddle}${tetoPercent}${t.shareEgen}${egenPercent}%\n\n${r.description}${t.shareBest}${r.bestMatch}${t.shareWorst}${r.worstMatch}${t.shareLink}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }, [resultKey, tetoPercent, egenPercent]);

  const result = resultKey ? results[resultKey] : null;

  // Determine the dominant percent for percentage analysis
  const dominantPercent = resultKey
    ? resultKey.startsWith("teto") ? tetoPercent : egenPercent
    : 50;
  const analysis = result ? getPercentageAnalysis(result, dominantPercent) : null;
  const detailed = result ? getDetailedAnalysis(result, dominantPercent) : null;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50/30 to-violet-50/20 dark:from-slate-950 dark:via-pink-950/20 dark:to-violet-950/10">
        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 bg-clip-text text-transparent mb-2">
              {t.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {t.subtitle}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* ── GENDER SELECTION ── */}
            {phase === "gender" && (
              <motion.div
                key="gender"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <p className="text-center text-slate-600 dark:text-slate-300 font-semibold text-lg mb-6">
                  {t.selectGender}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {/* Male card */}
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleGenderSelect("male")}
                    className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl bg-white dark:bg-slate-800 border-2 border-blue-200 dark:border-blue-800 shadow-sm hover:shadow-blue-200 dark:hover:shadow-blue-900/40 hover:border-blue-400 dark:hover:border-blue-500 transition-all"
                  >
                    <span className="text-6xl">🙋‍♂️</span>
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {t.male}
                    </span>
                    <span className="text-xs text-slate-400">
                      {t.maleDesc}
                    </span>
                  </motion.button>

                  {/* Female card */}
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleGenderSelect("female")}
                    className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl bg-white dark:bg-slate-800 border-2 border-pink-200 dark:border-pink-800 shadow-sm hover:shadow-pink-200 dark:hover:shadow-pink-900/40 hover:border-pink-400 dark:hover:border-pink-500 transition-all"
                  >
                    <span className="text-6xl">🙋‍♀️</span>
                    <span className="text-xl font-bold text-pink-500 dark:text-pink-400">
                      {t.female}
                    </span>
                    <span className="text-xs text-slate-400">
                      {t.femaleDesc}
                    </span>
                  </motion.button>
                </div>

                {/* Ad: in gender selection */}
                <AdBanner format="horizontal" className="rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

                {/* Info card */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-center">
                    <span className="font-semibold text-violet-500">{t.infoText1}</span>{t.infoText2}{" "}
                    <span className="font-semibold text-pink-500">{t.infoText3}</span>{t.infoText4}
                    <br />
                    {t.infoText5}
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* ── QUIZ SCREEN ── */}
            {phase === "quiz" && currentQuestion && (
              <motion.div
                key={`quiz-${currentIndex}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.28 }}
                className="space-y-5"
              >
                {/* Progress bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      {t.question}
                    </span>
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                      {currentIndex + 1} / {totalQuestions}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 rounded-full"
                      initial={{ width: `${(currentIndex / totalQuestions) * 100}%` }}
                      animate={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                {/* Question card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  {currentQuestion.category && (
                    <p className="text-xs font-medium text-violet-500 dark:text-violet-400 text-center mb-2">
                      {currentQuestion.category}
                    </p>
                  )}
                  <p className="text-xl font-bold text-slate-800 dark:text-slate-100 text-center leading-snug">
                    {currentQuestion.question}
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {(["A", "B"] as const).map((opt) => {
                    const option =
                      opt === "A" ? currentQuestion.optionA : currentQuestion.optionB;
                    const isSelected = selectedOption === opt;
                    const isOther =
                      selectedOption !== null && selectedOption !== opt;

                    return (
                      <motion.button
                        key={opt}
                        whileHover={selectedOption === null ? { scale: 1.02 } : {}}
                        whileTap={selectedOption === null ? { scale: 0.98 } : {}}
                        animate={
                          isSelected
                            ? { scale: 1.03 }
                            : isOther
                            ? { opacity: 0.45, scale: 0.98 }
                            : { scale: 1, opacity: 1 }
                        }
                        onClick={() => handleOptionSelect(opt)}
                        disabled={selectedOption !== null}
                        className={`w-full p-5 rounded-2xl text-left font-medium transition-all border-2 ${
                          isSelected
                            ? "bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 text-white border-transparent shadow-lg"
                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-600 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400"
                            }`}
                          >
                            {opt}
                          </span>
                          <span className="leading-snug pt-0.5">{option.text}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ── RESULT SCREEN ── */}
            {phase === "result" && result && resultKey && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                {/* Result hero card */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
                  className={`rounded-2xl p-8 bg-gradient-to-br ${result.color} text-white text-center shadow-lg`}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="text-7xl mb-4"
                  >
                    {result.emoji}
                  </motion.div>
                  <p className="text-white/70 text-sm font-medium mb-1">{result.subtitle}</p>
                  <h2 className="text-3xl font-extrabold mb-3">{result.title}</h2>
                  <p className="text-white/85 text-sm leading-relaxed">{result.description}</p>
                </motion.div>

                {/* Percentage bar + analysis */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-blue-500">
                      {t.teto} {tetoPercent}%
                    </span>
                    <span className="text-xs text-slate-400 font-medium">vs</span>
                    <span className="text-sm font-bold text-pink-500">
                      {t.egen} {egenPercent}%
                    </span>
                  </div>
                  <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden flex">
                    <motion.div
                      className={`h-full ${tetoBarColor[resultKey]} rounded-l-full`}
                      initial={{ width: "0%" }}
                      animate={{ width: `${tetoPercent}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    />
                    <motion.div
                      className={`h-full ${egenBarColor[resultKey]} rounded-r-full`}
                      initial={{ width: "0%" }}
                      animate={{ width: `${egenPercent}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    />
                  </div>

                  {/* Percentage analysis badge + text */}
                  {analysis && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="mt-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${result.color}`}>
                          {analysis.label}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {dominantPercent}%
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {analysis.text}
                      </p>
                    </motion.div>
                  )}
                </motion.div>

                {/* Detailed analysis */}
                {detailed && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
                  >
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                      {t.detailedAnalysis}
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {detailed}
                    </p>
                  </motion.div>
                )}

                {/* Traits */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                    {t.traits}
                  </h3>
                  <ul className="space-y-2">
                    {result.traits.map((trait, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                        className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
                      >
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-violet-400 mt-2" />
                        {trait}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Strengths & Weaknesses */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2 flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-[10px]">+</span>
                        {t.strengths}
                      </h3>
                      <ul className="space-y-1.5">
                        {result.strengths.map((s, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.45 + i * 0.05 }}
                            className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2"
                          >
                            <span className="flex-shrink-0 text-green-500 mt-0.5">+</span>
                            {s}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t border-slate-100 dark:border-slate-700 pt-4">
                      <h3 className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-[10px]">!</span>
                        {t.weaknesses}
                      </h3>
                      <ul className="space-y-1.5">
                        {result.weaknesses.map((w, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.55 + i * 0.05 }}
                            className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2"
                          >
                            <span className="flex-shrink-0 text-amber-500 mt-0.5">!</span>
                            {w}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Love style */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                    {t.loveStyle}
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {result.loveStyle}
                  </p>
                </motion.div>

                {/* Compatibility */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
                    {t.compatibility}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50">
                      <span className="text-xl flex-shrink-0">💚</span>
                      <div>
                        <p className="text-sm font-bold text-green-700 dark:text-green-400 mb-0.5">
                          {t.bestMatch}: {result.bestMatch}
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-500 leading-relaxed">
                          {result.bestMatchDesc}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50">
                      <span className="text-xl flex-shrink-0">💔</span>
                      <div>
                        <p className="text-sm font-bold text-red-700 dark:text-red-400 mb-0.5">
                          {t.worstMatch}: {result.worstMatch}
                        </p>
                        <p className="text-xs text-red-600 dark:text-red-500 leading-relaxed">
                          {result.worstMatchDesc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.52 }}
                >
                  <AdBanner format="rectangle" className="rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
                </motion.div>

                {/* Love chain */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
                    {loveChain.description}
                  </h3>
                  {/* Chain diagram */}
                  <div className="flex items-center justify-center gap-1 flex-wrap mb-4">
                    {[t.egennyeo, t.egennam, t.tetonyeo, t.tetonam].map((type, i) => (
                      <div key={type} className="flex items-center gap-1">
                        <div
                          className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 ${
                            result.title === type
                              ? `bg-gradient-to-r ${result.color} text-white border-transparent shadow`
                              : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600"
                          }`}
                        >
                          {type}
                        </div>
                        {i < 3 && (
                          <span className="text-slate-400 dark:text-slate-500 text-sm font-bold">
                            →
                          </span>
                        )}
                      </div>
                    ))}
                    <div className="flex items-center gap-1">
                      <span className="text-slate-400 dark:text-slate-500 text-sm font-bold">
                        →
                      </span>
                      <div
                        className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 ${
                          result.title === t.egennyeo
                            ? `bg-gradient-to-r ${result.color} text-white border-transparent shadow`
                            : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600"
                        }`}
                      >
                        {t.egennyeo}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-center">
                    {loveChain.explanation}
                  </p>
                </motion.div>

                <AdBanner format="in-article" className="rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3"
                >
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleShare}
                    className="w-full py-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-violet-300 dark:border-violet-700 text-violet-600 dark:text-violet-400 font-bold text-base hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors shadow-sm"
                  >
                    {copied ? t.copied : t.share}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleRestart}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 text-white font-bold text-base shadow-md hover:shadow-violet-500/30 transition-shadow"
                  >
                    {t.restart}
                  </motion.button>
                </motion.div>
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
