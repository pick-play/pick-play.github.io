"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import testData from "@/data/mbti-test.json";

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

const DIMENSION_LABELS: Record<string, { label: string; left: string; right: string }> = {
  EI: { label: "외향 vs 내향", left: "E 외향", right: "I 내향" },
  SN: { label: "감각 vs 직관", left: "S 감각", right: "N 직관" },
  TF: { label: "사고 vs 감정", left: "T 사고", right: "F 감정" },
  JP: { label: "판단 vs 인식", left: "J 판단", right: "P 인식" },
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

      const newScores = { ...scores, [answerType]: scores[answerType] + weight };
      setScores(newScores);

      setTimeout(() => {
        const nextIndex = currentIndex + 1;
        if (nextIndex >= questions.length) {
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
    const p = (a: number, b: number) => { const t = a + b; return t === 0 ? 50 : Math.round((a / t) * 100); };
    const text = `나의 MBTI는 ${mbtiResult} (${typeInfo.title})!\nE${p(scores.E, scores.I)}% / I${p(scores.I, scores.E)}% | S${p(scores.S, scores.N)}% / N${p(scores.N, scores.S)}% | T${p(scores.T, scores.F)}% / F${p(scores.F, scores.T)}% | J${p(scores.J, scores.P)}% / P${p(scores.P, scores.J)}%\nPickPlay에서 MBTI 검사 해보기: https://pick-korea.github.io/mbti`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [mbtiResult, scores]);

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
              MBTI 성격유형 검사
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {questions.length}가지 질문으로 알아보는 나의 성격 유형
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
                    나의 성격 유형은?
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed">
                    총 {questions.length}문항 · 정밀 분석<br />
                    지표별 퍼센트와 함께 결과를 알려드려요
                  </p>

                  {/* Dimension info */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {Object.entries(DIMENSION_LABELS).map(([key, val], i) => (
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
                    시작하기
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
                      {DIMENSION_ICONS[dimension]} {DIMENSION_LABELS[dimension]?.label}
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
                    솔직하게 답해주세요
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
                    당신의 유형
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
                    지표별 분석
                  </h3>
                  <DimensionBar leftLabel="E 외향" rightLabel="I 내향" leftPercent={eiPercent.l} rightPercent={eiPercent.r} delay={0.3} />
                  <DimensionBar leftLabel="S 감각" rightLabel="N 직관" leftPercent={snPercent.l} rightPercent={snPercent.r} delay={0.4} />
                  <DimensionBar leftLabel="T 사고" rightLabel="F 감정" leftPercent={tfPercent.l} rightPercent={tfPercent.r} delay={0.5} />
                  <DimensionBar leftLabel="J 판단" rightLabel="P 인식" leftPercent={jpPercent.l} rightPercent={jpPercent.r} delay={0.6} />
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
                        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-3">💪 강점</h3>
                        <div className="flex flex-wrap gap-2">
                          {resultType.strengths.map((s) => (
                            <span key={s} className="px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-sm font-medium border border-green-200 dark:border-green-800/50">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {resultType.weaknesses && (
                      <div>
                        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-3">⚡ 약점</h3>
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
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-4">💕 나와 잘 맞는 유형</h3>
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
                        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-3">🎯 추천 직업</h3>
                        <div className="flex flex-wrap gap-2">
                          {resultType.careers.map((c) => (
                            <span key={c} className="px-3 py-1.5 rounded-full bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 text-sm font-medium border border-violet-200 dark:border-violet-800/50">{c}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {resultType.famousPeople && (
                      <div>
                        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-3">🌟 같은 유형 유명인</h3>
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
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-4">16가지 성격 유형</h3>
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
                    {copied ? "✓ 복사 완료!" : "결과 공유하기"}
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleRestart}
                    className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-bold text-base shadow-md hover:shadow-violet-500/30 transition-shadow"
                  >
                    다시 하기
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
