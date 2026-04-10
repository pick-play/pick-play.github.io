"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import testData from "@/data/mbti-test.json";
import { useLocale } from "@/hooks/useLocale";

const translations = {
  ko: {
    title: "MBTI 성격유형 검사",
    subtitle: (n: number) => `${n}가지 질문으로 알아보는 나의 성격 유형`,
    introHeading: "나의 성격 유형은?",
    introDesc: (n: number) => `총 ${n}문항 · 정밀 분석\n지표별 퍼센트와 함께 결과를 알려드려요`,
    start: "시작하기",
    honestAnswer: "솔직하게 답해주세요",
    yourType: "당신의 유형",
    dimensionAnalysis: "지표별 분석",
    strengths: "💪 강점",
    weaknesses: "⚡ 약점",
    compatible: "💕 나와 잘 맞는 유형",
    careers: "🎯 추천 직업",
    famous: "🌟 같은 유형 유명인",
    allTypes: "16가지 성격 유형",
    share: "결과 공유하기",
    copied: "✓ 복사 완료!",
    restart: "다시 하기",
    dimLabels: {
      EI: { label: "외향 vs 내향", left: "E 외향", right: "I 내향" },
      SN: { label: "감각 vs 직관", left: "S 감각", right: "N 직관" },
      TF: { label: "사고 vs 감정", left: "T 사고", right: "F 감정" },
      JP: { label: "판단 vs 인식", left: "J 판단", right: "P 인식" },
    },
    shareText: (mbti: string, title: string, e: number, i: number, s: number, n: number, tf: number, f: number, j: number, p: number) =>
      `나의 MBTI는 ${mbti} (${title})!\nE${e}% / I${i}% | S${s}% / N${n}% | T${tf}% / F${f}% | J${j}% / P${p}%\nPickPlay에서 MBTI 검사 해보기: https://pick-play.github.io/mbti`,
    faqTitle: "자주 묻는 질문",
    faqItems: [
      { q: "MBTI 검사는 얼마나 정확한가요?", a: "MBTI는 심리학적 이론을 기반으로 한 성격 유형 분류 도구입니다. 이 검사는 카를 융의 심리 유형론을 바탕으로 개발되었으며, 자신의 성향을 이해하는 데 도움을 줍니다. 다만 성격은 고정된 것이 아니라 상황과 시간에 따라 변할 수 있으므로, 참고 자료로 활용하는 것이 좋습니다." },
      { q: "MBTI 4가지 지표는 무엇을 의미하나요?", a: "E/I(외향/내향)는 에너지를 어디서 얻는지, S/N(감각/직관)은 정보를 어떻게 수집하는지, T/F(사고/감정)는 결정을 어떻게 내리는지, J/P(판단/인식)는 외부 세계에 어떻게 대처하는지를 나타냅니다. 이 네 가지 조합으로 16가지 유형이 만들어집니다." },
      { q: "결과가 예상과 다르게 나왔어요. 어떻게 하나요?", a: "MBTI 결과는 검사 당시의 심리 상태와 질문 해석 방식에 따라 달라질 수 있습니다. 다시 한번 차분한 상태에서 솔직하게 답해보세요. 경계선에 있는 지표(예: E/I 비율이 55%/45%처럼 근접한 경우)는 양쪽 성향을 모두 가지고 있을 수 있습니다." },
      { q: "MBTI 유형은 바뀔 수 있나요?", a: "네, MBTI 유형은 나이가 들거나 환경이 바뀌면서 변할 수 있습니다. 특히 20대~30대에 많이 변하며, 스트레스 상황이나 삶의 큰 변화 후에 결과가 달라지는 경우가 많습니다. 주기적으로 재검사해보는 것도 자기 이해에 도움이 됩니다." },
      { q: "어떤 MBTI 유형이 가장 좋은가요?", a: "MBTI의 모든 16가지 유형은 각각의 강점과 약점을 가지고 있습니다. 좋고 나쁜 유형은 없으며, 각 유형은 서로 다른 상황과 역할에서 빛을 발합니다. 중요한 것은 자신의 유형을 이해하고 강점을 활용하며 약점을 보완하는 것입니다." },
    ],
  },
  en: {
    title: "MBTI Personality Test",
    subtitle: (n: number) => `Discover your personality type with ${n} questions`,
    introHeading: "What's my personality type?",
    introDesc: (n: number) => `${n} questions · Detailed analysis\nResults include percentage scores for each dimension`,
    start: "Start",
    honestAnswer: "Answer honestly",
    yourType: "Your Type",
    dimensionAnalysis: "Dimension Analysis",
    strengths: "💪 Strengths",
    weaknesses: "⚡ Weaknesses",
    compatible: "💕 Best Compatible Types",
    careers: "🎯 Recommended Careers",
    famous: "🌟 Famous People with Same Type",
    allTypes: "All 16 Personality Types",
    share: "Share Result",
    copied: "✓ Copied!",
    restart: "Try Again",
    dimLabels: {
      EI: { label: "Extraversion vs Introversion", left: "E Extrovert", right: "I Introvert" },
      SN: { label: "Sensing vs Intuition", left: "S Sensing", right: "N Intuition" },
      TF: { label: "Thinking vs Feeling", left: "T Thinking", right: "F Feeling" },
      JP: { label: "Judging vs Perceiving", left: "J Judging", right: "P Perceiving" },
    },
    shareText: (mbti: string, title: string, e: number, i: number, s: number, n: number, tf: number, f: number, j: number, p: number) =>
      `My MBTI is ${mbti} (${title})!\nE${e}% / I${i}% | S${s}% / N${n}% | T${tf}% / F${f}% | J${j}% / P${p}%\nTake the MBTI test on PickPlay: https://pick-play.github.io/mbti`,
    faqTitle: "Frequently Asked Questions",
    faqItems: [
      { q: "How accurate is the MBTI test?", a: "MBTI is a personality type classification tool based on psychological theory, developed from Carl Jung's theory of psychological types. It helps you understand your own tendencies and preferences. Since personality is not fixed and can change over time, it's best used as a reference rather than a definitive label." },
      { q: "What do the 4 MBTI dimensions mean?", a: "E/I (Extraversion/Introversion) reflects where you get your energy; S/N (Sensing/Intuition) reflects how you gather information; T/F (Thinking/Feeling) reflects how you make decisions; J/P (Judging/Perceiving) reflects how you deal with the outside world. These four combinations create 16 personality types." },
      { q: "My result seems different from what I expected. What should I do?", a: "MBTI results can vary depending on your mental state and how you interpret questions at the time of testing. Try taking the test again in a calm, relaxed state, answering as honestly as possible. If a dimension score is close (e.g., E55%/I45%), you likely exhibit traits of both sides." },
      { q: "Which MBTI type is the best?", a: "All 16 MBTI types have their own unique strengths and weaknesses. There is no good or bad type — each shines in different situations and roles. What matters is understanding your type, leveraging your strengths, and working on your areas of growth." },
    ],
  },
  ja: {
    title: "MBTI 性格タイプ診断",
    subtitle: (n: number) => `${n}の質問で分かる私の性格タイプ`,
    introHeading: "私の性格タイプは？",
    introDesc: (n: number) => `全${n}問 · 精密分析\n各指標のパーセンテージと一緒に結果をお伝えします`,
    start: "スタート",
    honestAnswer: "正直に答えてください",
    yourType: "あなたのタイプ",
    dimensionAnalysis: "指標別分析",
    strengths: "💪 強み",
    weaknesses: "⚡ 弱み",
    compatible: "💕 相性の良いタイプ",
    careers: "🎯 おすすめの職業",
    famous: "🌟 同じタイプの有名人",
    allTypes: "16種類の性格タイプ",
    share: "結果をシェア",
    copied: "✓ コピー完了！",
    restart: "もう一度",
    dimLabels: {
      EI: { label: "外向 vs 内向", left: "E 外向", right: "I 内向" },
      SN: { label: "感覚 vs 直観", left: "S 感覚", right: "N 直観" },
      TF: { label: "思考 vs 感情", left: "T 思考", right: "F 感情" },
      JP: { label: "判断 vs 知覚", left: "J 判断", right: "P 知覚" },
    },
    shareText: (mbti: string, title: string, e: number, i: number, s: number, n: number, tf: number, f: number, j: number, p: number) =>
      `私のMBTIは${mbti}（${title}）！\nE${e}% / I${i}% | S${s}% / N${n}% | T${tf}% / F${f}% | J${j}% / P${p}%\nPickPlayでMBTI診断: https://pick-play.github.io/mbti`,
    faqTitle: "よくある質問",
    faqItems: [
      { q: "MBTI検査はどれくらい正確ですか？", a: "MBTIはカール・ユングの心理的類型論をもとに開発された性格類型分類ツールです。自分の傾向を理解するのに役立ちます。ただし性格は固定されたものではなく、状況や時間とともに変化することがあるため、参考資料として活用することをお勧めします。" },
      { q: "MBTI 4つの指標はどういう意味ですか？", a: "E/I（外向/内向）はエネルギーをどこから得るか、S/N（感覚/直観）は情報をどのように収集するか、T/F（思考/感情）はどのように意思決定するか、J/P（判断/知覚）は外の世界にどう対処するかを示します。この4つの組み合わせで16の類型が生まれます。" },
      { q: "どのMBTI類型が最も優れていますか？", a: "MBTIの16すべての類型にはそれぞれの強みと弱みがあります。良い・悪い類型はなく、各類型は異なる状況や役割で輝きます。大切なのは自分の類型を理解し、強みを活かして弱みを補うことです。" },
      { q: "MBTI類型は変わることがありますか？", a: "はい、MBTI類型は年齢を重ねたり環境が変わったりすることで変化することがあります。特に20〜30代に変化することが多く、ストレスや大きなライフイベントの後に結果が変わることもあります。" },
    ],
  },
  zh: {
    title: "MBTI 性格类型测试",
    subtitle: (n: number) => `通过${n}个问题了解你的性格类型`,
    introHeading: "我的性格类型是什么？",
    introDesc: (n: number) => `共${n}题 · 精准分析\n结果附带各维度百分比`,
    start: "开始",
    honestAnswer: "请诚实作答",
    yourType: "你的类型",
    dimensionAnalysis: "各维度分析",
    strengths: "💪 优点",
    weaknesses: "⚡ 缺点",
    compatible: "💕 与我相配的类型",
    careers: "🎯 推荐职业",
    famous: "🌟 同类型名人",
    allTypes: "16种性格类型",
    share: "分享结果",
    copied: "✓ 已复制！",
    restart: "再试一次",
    dimLabels: {
      EI: { label: "外向 vs 内向", left: "E 外向", right: "I 内向" },
      SN: { label: "感觉 vs 直觉", left: "S 感觉", right: "N 直觉" },
      TF: { label: "思考 vs 情感", left: "T 思考", right: "F 情感" },
      JP: { label: "判断 vs 感知", left: "J 判断", right: "P 感知" },
    },
    shareText: (mbti: string, title: string, e: number, i: number, s: number, n: number, tf: number, f: number, j: number, p: number) =>
      `我的MBTI是${mbti}（${title}）！\nE${e}% / I${i}% | S${s}% / N${n}% | T${tf}% / F${f}% | J${j}% / P${p}%\n在PickPlay做MBTI测试: https://pick-play.github.io/mbti`,
    faqTitle: "常见问题",
    faqItems: [
      { q: "MBTI测试有多准确？", a: "MBTI是基于卡尔·荣格心理类型理论开发的性格类型分类工具。它有助于了解自己的性格倾向。由于性格并非固定不变，会随时间和环境变化，建议将其作为参考资料使用。" },
      { q: "MBTI四个维度分别代表什么？", a: "E/I（外向/内向）反映您从哪里获得能量；S/N（感觉/直觉）反映您如何收集信息；T/F（思考/情感）反映您如何做决定；J/P（判断/感知）反映您如何处理外部世界。这四个维度的组合产生了16种性格类型。" },
      { q: "哪种MBTI类型最好？", a: "MBTI所有16种类型都有各自的优点和缺点。没有好坏之分，每种类型在不同情况和角色中都能发光发热。重要的是了解自己的类型，发挥优势，弥补不足。" },
      { q: "MBTI类型会改变吗？", a: "是的，MBTI类型会随着年龄增长或环境变化而改变。特别是20至30岁之间变化较多，在压力或重大生活变化后结果也可能不同。定期重新测试有助于更好地了解自己。" },
    ],
  },
  es: {
    title: "Test de Personalidad MBTI",
    subtitle: (n: number) => `Descubre tu tipo de personalidad con ${n} preguntas`,
    introHeading: "¿Cuál es mi tipo de personalidad?",
    introDesc: (n: number) => `${n} preguntas · Análisis detallado\nResultados con porcentaje por dimensión`,
    start: "Comenzar",
    honestAnswer: "Responde con honestidad",
    yourType: "Tu Tipo",
    dimensionAnalysis: "Análisis por Dimensión",
    strengths: "💪 Fortalezas",
    weaknesses: "⚡ Debilidades",
    compatible: "💕 Tipos Más Compatibles",
    careers: "🎯 Carreras Recomendadas",
    famous: "🌟 Famosos del Mismo Tipo",
    allTypes: "Los 16 Tipos de Personalidad",
    share: "Compartir Resultado",
    copied: "✓ ¡Copiado!",
    restart: "Intentar de Nuevo",
    dimLabels: {
      EI: { label: "Extraversión vs Introversión", left: "E Extrovertido", right: "I Introvertido" },
      SN: { label: "Sensación vs Intuición", left: "S Sensación", right: "N Intuición" },
      TF: { label: "Pensamiento vs Sentimiento", left: "T Pensamiento", right: "F Sentimiento" },
      JP: { label: "Juicio vs Percepción", left: "J Juicio", right: "P Percepción" },
    },
    shareText: (mbti: string, title: string, e: number, i: number, s: number, n: number, tf: number, f: number, j: number, p: number) =>
      `Mi MBTI es ${mbti} (${title})!\nE${e}% / I${i}% | S${s}% / N${n}% | T${tf}% / F${f}% | J${j}% / P${p}%\nHaz el test MBTI en PickPlay: https://pick-play.github.io/mbti`,
    faqTitle: "Preguntas Frecuentes",
    faqItems: [
      { q: "¿Qué tan preciso es el test MBTI?", a: "El MBTI es una herramienta de clasificación de tipos de personalidad basada en la teoría psicológica de Carl Jung. Ayuda a entender tus propias tendencias. Como la personalidad no es fija y puede cambiar con el tiempo, es mejor usarla como referencia en lugar de una etiqueta definitiva." },
      { q: "¿Qué significan las 4 dimensiones del MBTI?", a: "E/I (Extraversión/Introversión) refleja de dónde obtienes energía; S/N (Sensación/Intuición) refleja cómo recopilas información; T/F (Pensamiento/Sentimiento) refleja cómo tomas decisiones; J/P (Juicio/Percepción) refleja cómo manejas el mundo exterior. Estas cuatro combinaciones crean 16 tipos de personalidad." },
      { q: "¿Qué tipo MBTI es el mejor?", a: "Los 16 tipos MBTI tienen sus propias fortalezas y debilidades únicas. No hay un tipo bueno o malo — cada uno brilla en diferentes situaciones y roles. Lo importante es entender tu tipo, aprovechar tus fortalezas y trabajar en tus áreas de mejora." },
      { q: "¿El tipo MBTI puede cambiar?", a: "Sí, el tipo MBTI puede cambiar a medida que envejecemos o cambia nuestro entorno. Es especialmente frecuente que cambie entre los 20 y 30 años, y después de eventos importantes de la vida. Repetir el test periódicamente puede ayudarte a entenderte mejor." },
    ],
  },
};

type Phase = "intro" | "quiz" | "result";

type ScoreKey = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

type Scores = Record<ScoreKey, number>;

interface TypeData {
  title: string;
  emoji: string;
  desc: string;
  traits: string[];
  color: string;
  strengths?: string[];
  weaknesses?: string[];
  famousPeople?: string[];
  careers?: string[];
}

const typesData = testData.types as Record<string, TypeData>;
const compatibilityData = testData.compatibility as Record<string, string[]>;
const questions = testData.questions;

// Weight map: question ID -> weight (1-3) for weighted scoring
// weight 3 = very strong indicator, 2 = moderate, 1 = mild
const QUESTION_WEIGHTS: Record<number, number> = {
  1: 3, 2: 3, 10: 3, 12: 3,
  3: 2, 4: 2, 5: 2, 6: 2, 9: 2, 11: 2,
  7: 1, 8: 1,
  17: 3, 23: 3,
  13: 2, 14: 2, 15: 2, 16: 2, 20: 2, 21: 2, 24: 2,
  18: 1, 19: 1, 22: 1,
  25: 3, 26: 3, 34: 3,
  27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 33: 2,
  32: 1, 35: 1, 36: 1,
  39: 3, 40: 3, 47: 3,
  37: 2, 38: 2, 41: 2, 42: 2, 44: 2, 45: 2, 46: 2,
  43: 1, 48: 1,
};

const DIMENSION_ICONS: Record<string, string> = {
  EI: "🗣️",
  SN: "👁️",
  TF: "🧠",
  JP: "📅",
};

const ALL_16_TYPES = [
  "ISTJ", "ISFJ", "INFJ", "INTJ",
  "ISTP", "ISFP", "INFP", "INTP",
  "ESTP", "ESFP", "ENFP", "ENTP",
  "ESTJ", "ESFJ", "ENFJ", "ENTJ",
] as const;

function DimensionBar({
  leftLabel,
  rightLabel,
  leftPercent,
  rightPercent,
  delay,
}: {
  leftLabel: string;
  rightLabel: string;
  leftPercent: number;
  rightPercent: number;
  delay: number;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
      <div className="flex rounded-full overflow-hidden h-4 bg-slate-200 dark:bg-slate-700">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${leftPercent}%` }}
          transition={{ duration: 0.7, delay, ease: "easeOut" }}
        />
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-400 to-blue-400 flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
        <span>{leftPercent}%</span>
        <span>{rightPercent}%</span>
      </div>
    </div>
  );
}

export default function MbtiPage() {
  const locale = useLocale();
  const t = translations[locale];

  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<"A" | "B" | null>(null);
  const [scores, setScores] = useState<Scores>({
    E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0,
  });
  const [mbtiResult, setMbtiResult] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;
  const dimension = currentQuestion?.dimension ?? "EI";
  const dimLabels = t.dimLabels;

  const handleStart = useCallback(() => {
    setPhase("quiz");
    setCurrentIndex(0);
    setSelected(null);
    setScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
    setMbtiResult("");
    setCopied(false);
  }, []);

  const handleSelect = useCallback(
    (choice: "A" | "B") => {
      if (selected !== null) return;
      setSelected(choice);

      const option = choice === "A" ? currentQuestion.optionA : currentQuestion.optionB;
      const answerType = option.type as ScoreKey;
      const weight = QUESTION_WEIGHTS[currentQuestion.id] ?? 1;

      setScores(prev => ({ ...prev, [answerType]: prev[answerType] + weight }));

      setTimeout(() => {
        const nextIndex = currentIndex + 1;
        if (nextIndex >= questions.length) {
          const newScores = { ...scores, [answerType]: scores[answerType] + weight };
          const result =
            (newScores.E >= newScores.I ? "E" : "I") +
            (newScores.S >= newScores.N ? "S" : "N") +
            (newScores.T >= newScores.F ? "T" : "F") +
            (newScores.J >= newScores.P ? "J" : "P");
          setMbtiResult(result);
          setPhase("result");
        } else {
          setCurrentIndex(nextIndex);
          setSelected(null);
        }
      }, 500);
    },
    [selected, currentIndex, currentQuestion, scores]
  );

  const handleRestart = useCallback(() => {
    setPhase("intro");
    setCurrentIndex(0);
    setSelected(null);
    setScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
    setMbtiResult("");
    setCopied(false);
  }, []);

  const pct = (a: number, b: number) => {
    const total = a + b;
    if (total === 0) return { l: 50, r: 50 };
    return { l: Math.round((a / total) * 100), r: Math.round((b / total) * 100) };
  };

  const handleCopyResult = useCallback(() => {
    if (!mbtiResult) return;
    const typeInfo = typesData[mbtiResult];
    const p = (a: number, b: number) => { const total = a + b; return total === 0 ? 50 : Math.round((a / total) * 100); };
    const text = t.shareText(
      mbtiResult, typeInfo.title,
      p(scores.E, scores.I), p(scores.I, scores.E),
      p(scores.S, scores.N), p(scores.N, scores.S),
      p(scores.T, scores.F), p(scores.F, scores.T),
      p(scores.J, scores.P), p(scores.P, scores.J)
    );
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }, [mbtiResult, scores, t]);

  const eiPercent = pct(scores.E, scores.I);
  const snPercent = pct(scores.S, scores.N);
  const tfPercent = pct(scores.T, scores.F);
  const jpPercent = pct(scores.J, scores.P);

  const resultType = mbtiResult ? typesData[mbtiResult] : null;
  const compatibleTypes = mbtiResult ? compatibilityData[mbtiResult] ?? [] : [];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-violet-950/20 dark:to-indigo-950/10">
        <div className="max-w-2xl mx-auto px-4 py-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent mb-2">
              {t.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {t.subtitle(questions.length)}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">

            {/* ── INTRO ── */}
            {phase === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="text-6xl mb-4"
                  >
                    🧬
                  </motion.div>
                  <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">
                    {t.introHeading}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed whitespace-pre-line">
                    {t.introDesc(questions.length)}
                  </p>

                  {/* Dimension info */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {Object.entries(dimLabels).map(([key, val], i) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.07 }}
                        className="rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 p-3 text-left"
                      >
                        <span className="text-xl mr-2">{DIMENSION_ICONS[key]}</span>
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                          {val.label}
                        </span>
                        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                          {val.left} / {val.right}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <AdBanner format="horizontal" className="mb-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleStart}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-bold text-lg shadow-md hover:shadow-violet-500/30 transition-shadow"
                  >
                    {t.start}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ── QUIZ ── */}
            {phase === "quiz" && currentQuestion && (
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
                    <span className="font-semibold text-sm">
                      {currentIndex + 1} / {questions.length}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-300 text-xs font-semibold">
                      {DIMENSION_ICONS[dimension]} {dimLabels[dimension as keyof typeof dimLabels]?.label}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Question card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-100 text-center leading-snug">
                    {currentQuestion.question}
                  </p>
                </div>

                {/* Options */}
                <div className="flex flex-col gap-4">
                  {(["A", "B"] as const).map((opt) => {
                    const option = opt === "A" ? currentQuestion.optionA : currentQuestion.optionB;
                    const isSelected = selected === opt;
                    const isOther = selected !== null && selected !== opt;
                    const gradientClass = opt === "A"
                      ? "bg-gradient-to-r from-violet-500 to-indigo-500 border-violet-400 shadow-violet-400/40"
                      : "bg-gradient-to-r from-indigo-500 to-blue-500 border-indigo-400 shadow-indigo-400/40";
                    const pillClass = opt === "A"
                      ? "bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-300"
                      : "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300";

                    return (
                      <motion.button
                        key={opt}
                        onClick={() => handleSelect(opt)}
                        disabled={selected !== null}
                        animate={
                          selected === null
                            ? { scale: 1, opacity: 1 }
                            : isSelected
                            ? { scale: 1.03, opacity: 1 }
                            : { scale: 0.95, opacity: 0.45 }
                        }
                        whileHover={selected === null ? { scale: 1.02 } : {}}
                        whileTap={selected === null ? { scale: 0.98 } : {}}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={`relative w-full min-h-20 rounded-2xl p-5 flex items-center gap-4 text-left shadow-sm border-2 transition-shadow cursor-pointer disabled:cursor-default ${
                          isSelected
                            ? `${gradientClass} shadow-lg text-white`
                            : `bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 hover:border-violet-300 dark:hover:border-violet-600 hover:shadow-md`
                        }`}
                      >
                        <span
                          className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                            isSelected ? "bg-white/20 text-white" : pillClass
                          }`}
                        >
                          {opt}
                        </span>
                        <span className="font-medium text-sm leading-snug flex-1">
                          {option.text}
                        </span>
                        {isSelected && (
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, delay: 0.05 }}
                            className="flex-shrink-0 text-white text-lg"
                          >
                            ✓
                          </motion.span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {selected === null && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-xs text-slate-400 dark:text-slate-500"
                  >
                    {t.honestAnswer}
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* ── RESULT ── */}
            {phase === "result" && resultType && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                {/* Type card */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 180 }}
                  className={`rounded-2xl p-8 text-center text-white bg-gradient-to-br ${resultType.color} shadow-lg`}
                >
                  <motion.div
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 220, delay: 0.2 }}
                    className="text-7xl mb-3"
                  >
                    {resultType.emoji}
                  </motion.div>
                  <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-1">
                    {t.yourType}
                  </p>
                  <h2 className="text-5xl font-extrabold mb-2 drop-shadow">
                    {mbtiResult}
                  </h2>
                  <p className="text-xl font-bold mb-4 text-white/90">
                    {resultType.title}
                  </p>
                  <p className="text-sm text-white/80 leading-relaxed mb-5">
                    {resultType.desc}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {resultType.traits.map((trait) => (
                      <span
                        key={trait}
                        className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Dimension percentages */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-4"
                >
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-4">
                    {t.dimensionAnalysis}
                  </h3>
                  <DimensionBar leftLabel={dimLabels.EI.left} rightLabel={dimLabels.EI.right} leftPercent={eiPercent.l} rightPercent={eiPercent.r} delay={0.3} />
                  <DimensionBar leftLabel={dimLabels.SN.left} rightLabel={dimLabels.SN.right} leftPercent={snPercent.l} rightPercent={snPercent.r} delay={0.4} />
                  <DimensionBar leftLabel={dimLabels.TF.left} rightLabel={dimLabels.TF.right} leftPercent={tfPercent.l} rightPercent={tfPercent.r} delay={0.5} />
                  <DimensionBar leftLabel={dimLabels.JP.left} rightLabel={dimLabels.JP.right} leftPercent={jpPercent.l} rightPercent={jpPercent.r} delay={0.6} />
                </motion.div>

                {/* Strengths & Weaknesses */}
                {(resultType.strengths || resultType.weaknesses) && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
                  >
                    {resultType.strengths && (
                      <div className="mb-4">
                        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-3">{t.strengths}</h3>
                        <div className="flex flex-wrap gap-2">
                          {resultType.strengths.map((s) => (
                            <span key={s} className="px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-sm font-medium border border-green-200 dark:border-green-800/50">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {resultType.weaknesses && (
                      <div>
                        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-3">{t.weaknesses}</h3>
                        <div className="flex flex-wrap gap-2">
                          {resultType.weaknesses.map((w) => (
                            <span key={w} className="px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 text-sm font-medium border border-amber-200 dark:border-amber-800/50">{w}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Compatibility */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
                >
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-4">{t.compatible}</h3>
                  <div className="flex gap-3">
                    {compatibleTypes.map((typeCode) => {
                      const info = typesData[typeCode];
                      return (
                        <div key={typeCode} className={`flex-1 rounded-xl p-4 text-center text-white bg-gradient-to-br ${info.color}`}>
                          <div className="text-3xl mb-1">{info.emoji}</div>
                          <div className="font-extrabold text-lg">{typeCode}</div>
                          <div className="text-xs text-white/80 mt-0.5">{info.title}</div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Careers & Famous People */}
                {(resultType.careers || resultType.famousPeople) && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.33 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
                  >
                    {resultType.careers && (
                      <div className="mb-4">
                        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-3">{t.careers}</h3>
                        <div className="flex flex-wrap gap-2">
                          {resultType.careers.map((c) => (
                            <span key={c} className="px-3 py-1.5 rounded-full bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 text-sm font-medium border border-violet-200 dark:border-violet-800/50">{c}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {resultType.famousPeople && (
                      <div>
                        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-3">{t.famous}</h3>
                        <div className="flex flex-wrap gap-2">
                          {resultType.famousPeople.map((fp) => (
                            <span key={fp} className="px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 text-sm font-medium border border-indigo-200 dark:border-indigo-800/50">{fp}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 }}>
                  <AdBanner format="rectangle" className="rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
                </motion.div>

                {/* All 16 types grid */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
                >
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-4">{t.allTypes}</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {ALL_16_TYPES.map((typeCode) => {
                      const info = typesData[typeCode];
                      const isResult = typeCode === mbtiResult;
                      return (
                        <motion.div
                          key={typeCode}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.45 + ALL_16_TYPES.indexOf(typeCode) * 0.03 }}
                          className={`rounded-xl p-2 text-center transition-all ${
                            isResult
                              ? `bg-gradient-to-br ${info.color} text-white shadow-md ring-2 ring-white dark:ring-slate-900 scale-105`
                              : "bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300"
                          }`}
                        >
                          <div className="text-xl mb-0.5">{info.emoji}</div>
                          <div className={`text-xs font-bold ${isResult ? "text-white" : ""}`}>{typeCode}</div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                <AdBanner format="in-article" className="rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <button
                    onClick={handleCopyResult}
                    className={`flex-1 py-4 rounded-2xl font-bold text-base shadow-sm border-2 transition-all ${
                      copied
                        ? "bg-green-500 border-green-400 text-white"
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-violet-300 dark:hover:border-violet-600"
                    }`}
                  >
                    {copied ? t.copied : t.share}
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleRestart}
                    className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-bold text-base shadow-md hover:shadow-violet-500/30 transition-shadow"
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
