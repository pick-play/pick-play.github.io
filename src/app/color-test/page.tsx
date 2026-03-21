"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import testData from "@/data/color-test.json";

type Phase = "intro" | "quiz" | "result";
type ColorKey = "red" | "orange" | "yellow" | "green" | "blue" | "indigo" | "purple" | "pink";
type ColorScores = Record<ColorKey, number>;

interface ColorOption {
  text: string;
  color: string;
  weight: number;
}

interface Question {
  id: number;
  question: string;
  options: ColorOption[];
}

interface ResultData {
  name: string;
  title: string;
  emoji: string;
  color: string;
  bgColor: string;
  swatchClass: string;
  description: string;
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  compatible: string[];
  advice: string;
}

interface ColorMeta {
  hex: string;
  label: string;
}

const questions = testData.questions as Question[];
const results = testData.results as Record<string, ResultData>;
const colorMeta = testData.colorMeta as Record<string, ColorMeta>;

const COLOR_SWATCH: Record<string, string> = {
  red:    "bg-red-500",
  orange: "bg-orange-500",
  yellow: "bg-yellow-400",
  green:  "bg-green-500",
  blue:   "bg-blue-500",
  indigo: "bg-indigo-600",
  purple: "bg-purple-500",
  pink:   "bg-pink-400",
};

const COLOR_RING: Record<string, string> = {
  red:    "ring-red-300 dark:ring-red-700",
  orange: "ring-orange-300 dark:ring-orange-700",
  yellow: "ring-yellow-300 dark:ring-yellow-600",
  green:  "ring-green-300 dark:ring-green-700",
  blue:   "ring-blue-300 dark:ring-blue-700",
  indigo: "ring-indigo-300 dark:ring-indigo-700",
  purple: "ring-purple-300 dark:ring-purple-700",
  pink:   "ring-pink-300 dark:ring-pink-700",
};

const COLOR_SELECTED_BG: Record<string, string> = {
  red:    "bg-red-50 dark:bg-red-950/30 border-red-400 dark:border-red-600",
  orange: "bg-orange-50 dark:bg-orange-950/30 border-orange-400 dark:border-orange-600",
  yellow: "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-400 dark:border-yellow-600",
  green:  "bg-green-50 dark:bg-green-950/30 border-green-400 dark:border-green-600",
  blue:   "bg-blue-50 dark:bg-blue-950/30 border-blue-400 dark:border-blue-600",
  indigo: "bg-indigo-50 dark:bg-indigo-950/30 border-indigo-400 dark:border-indigo-600",
  purple: "bg-purple-50 dark:bg-purple-950/30 border-purple-400 dark:border-purple-600",
  pink:   "bg-pink-50 dark:bg-pink-950/30 border-pink-400 dark:border-pink-600",
};

const ALL_COLOR_TYPES: ColorKey[] = ["red", "orange", "yellow", "green", "blue", "indigo", "purple", "pink"];

const INITIAL_SCORES: ColorScores = {
  red: 0, orange: 0, yellow: 0, green: 0,
  blue: 0, indigo: 0, purple: 0, pink: 0,
};

function getTopColors(scores: ColorScores): { primary: ColorKey; secondary: ColorKey | null } {
  const sorted = (Object.keys(scores) as ColorKey[]).sort((a, b) => scores[b] - scores[a]);
  const primary = sorted[0];
  const secondary = scores[sorted[1]] > 0 && sorted[1] !== primary ? sorted[1] : null;
  return { primary, secondary };
}

export default function ColorTestPage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [scores, setScores] = useState<ColorScores>({ ...INITIAL_SCORES });
  const [primaryColor, setPrimaryColor] = useState<ColorKey | null>(null);
  const [secondaryColor, setSecondaryColor] = useState<ColorKey | null>(null);
  const [copied, setCopied] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;

  const handleStart = useCallback(() => {
    setPhase("quiz");
    setCurrentIndex(0);
    setSelectedIndex(null);
    setScores({ ...INITIAL_SCORES });
    setPrimaryColor(null);
    setSecondaryColor(null);
    setCopied(false);
  }, []);

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (selectedIndex !== null) return;
      setSelectedIndex(optionIndex);

      const option = currentQuestion.options[optionIndex];
      const colorKey = option.color as ColorKey;
      const newScores = { ...scores, [colorKey]: scores[colorKey] + option.weight };
      setScores(newScores);

      setTimeout(() => {
        const nextIndex = currentIndex + 1;
        if (nextIndex >= questions.length) {
          const { primary, secondary } = getTopColors(newScores);
          setPrimaryColor(primary);
          setSecondaryColor(secondary);
          setPhase("result");
        } else {
          setCurrentIndex(nextIndex);
          setSelectedIndex(null);
        }
      }, 500);
    },
    [selectedIndex, currentIndex, currentQuestion, scores]
  );

  const handleRestart = useCallback(() => {
    setPhase("intro");
    setCurrentIndex(0);
    setSelectedIndex(null);
    setScores({ ...INITIAL_SCORES });
    setPrimaryColor(null);
    setSecondaryColor(null);
    setCopied(false);
  }, []);

  const handleShare = useCallback(() => {
    if (!primaryColor) return;
    const r = results[primaryColor];
    const text = `나의 색깔 성격 유형은 ${r.name}(${r.title})!\n${r.traits.slice(0, 3).join(", ")}\nPickPlay에서 색깔 심리 테스트 해보기: https://pick-korea.github.io/color-test`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [primaryColor]);

  const resultData = primaryColor ? results[primaryColor] : null;
  const secondaryData = secondaryColor ? results[secondaryColor] : null;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20 dark:from-slate-950 dark:via-purple-950/20 dark:to-pink-950/10">
        <div className="max-w-lg mx-auto px-4 py-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-2">
              색깔 심리 테스트
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {questions.length}가지 질문으로 알아보는 나의 색깔 성격
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
                    🎨
                  </motion.div>
                  <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">
                    나를 나타내는 색깔은?
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                    총 {questions.length}문항 · 8가지 색깔 유형<br />
                    일상 속 상황에서 나의 선택이 색깔 성격을 알려줘요
                  </p>

                  {/* Color type preview grid */}
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {ALL_COLOR_TYPES.map((colorKey, i) => {
                      const r = results[colorKey];
                      return (
                        <motion.div
                          key={colorKey}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.15 + i * 0.06 }}
                          className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600"
                        >
                          <div className={`w-8 h-8 rounded-full ${COLOR_SWATCH[colorKey]} shadow-sm`} />
                          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 truncate w-full text-center">
                            {r.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>

                  <AdBanner format="horizontal" className="mb-5 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleStart}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-bold text-lg shadow-md hover:shadow-pink-500/30 transition-shadow"
                  >
                    시작하기
                  </motion.button>
                </div>

                {/* FAQ */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-4"
                >
                  <h2 className="font-bold text-slate-800 dark:text-slate-100 text-base">자주 묻는 질문</h2>
                  {[
                    {
                      q: "색깔 심리 테스트는 어떻게 진행되나요?",
                      a: "총 10개의 일상 상황 질문에 답하면, 8가지 색깔 성격 유형 중 나와 가장 잘 맞는 색깔과 그에 따른 성격 분석을 확인할 수 있어요.",
                    },
                    {
                      q: "결과에서 주 색깔과 부 색깔이 무엇인가요?",
                      a: "주 색깔은 나의 핵심 성격을, 부 색깔은 그것을 보완하는 성향을 나타냅니다. 두 색깔이 합쳐져 나만의 고유한 성격이 만들어져요.",
                    },
                    {
                      q: "8가지 색깔 유형은 무엇인가요?",
                      a: "빨강(열정적인 리더), 주황(활발한 모험가), 노랑(밝은 낙천가), 초록(평화로운 조화가), 파랑(차분한 사색가), 남색(직관적인 탐구자), 보라(신비로운 예술가), 분홍(따뜻한 공감러)가 있어요.",
                    },
                  ].map(({ q, a }, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Q. {q}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">A. {a}</p>
                    </div>
                  ))}
                </motion.div>
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
                    <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 text-xs font-semibold">
                      {Math.round(progress)}% 완료
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400"
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
                <div className="flex flex-col gap-3">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedIndex === idx;
                    const isOther = selectedIndex !== null && selectedIndex !== idx;
                    const colorKey = option.color;

                    return (
                      <motion.button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        disabled={selectedIndex !== null}
                        animate={
                          selectedIndex === null
                            ? { scale: 1, opacity: 1 }
                            : isSelected
                            ? { scale: 1.02, opacity: 1 }
                            : { scale: 0.96, opacity: 0.45 }
                        }
                        whileHover={selectedIndex === null ? { scale: 1.015 } : {}}
                        whileTap={selectedIndex === null ? { scale: 0.98 } : {}}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className={`relative w-full min-h-16 rounded-2xl px-5 py-4 flex items-center gap-4 text-left border-2 transition-all cursor-pointer disabled:cursor-default shadow-sm ${
                          isSelected
                            ? `${COLOR_SELECTED_BG[colorKey]} shadow-md`
                            : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 hover:shadow-md"
                        }`}
                      >
                        {/* Color circle swatch */}
                        <span
                          className={`flex-shrink-0 w-10 h-10 rounded-full ${COLOR_SWATCH[colorKey]} shadow-sm ring-2 ring-offset-1 ${COLOR_RING[colorKey]} ring-offset-white dark:ring-offset-slate-800 transition-transform ${isSelected ? "scale-110" : ""}`}
                        />
                        <span className="font-medium text-sm leading-snug flex-1 text-slate-800 dark:text-slate-100">
                          {option.text}
                        </span>
                        {isSelected && (
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, delay: 0.05 }}
                            className="flex-shrink-0 text-lg"
                          >
                            ✓
                          </motion.span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {selectedIndex === null && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-xs text-slate-400 dark:text-slate-500"
                  >
                    가장 끌리는 답을 선택하세요
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* ── RESULT ── */}
            {phase === "result" && resultData && primaryColor && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                {/* Hero result card */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 180 }}
                  className={`rounded-2xl p-8 text-center text-white bg-gradient-to-br ${resultData.color} shadow-xl`}
                >
                  {/* Large color swatch */}
                  <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 220, delay: 0.2 }}
                    className="flex justify-center mb-4"
                  >
                    <div
                      className="w-24 h-24 rounded-full shadow-2xl ring-4 ring-white/30"
                      style={{ backgroundColor: resultData.bgColor }}
                    />
                  </motion.div>

                  <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-1">
                    나의 색깔 유형
                  </p>
                  <h2 className="text-4xl font-extrabold mb-1 drop-shadow">
                    {resultData.emoji} {resultData.name}
                  </h2>
                  <p className="text-xl font-bold mb-4 text-white/90">
                    {resultData.title}
                  </p>
                  <p className="text-sm text-white/80 leading-relaxed mb-5">
                    {resultData.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {resultData.traits.map((trait) => (
                      <span
                        key={trait}
                        className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Strengths & Weaknesses */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
                >
                  <div className="mb-4">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-3">💪 강점</h3>
                    <div className="flex flex-col gap-2">
                      {resultData.strengths.map((s) => (
                        <div key={s} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <span className="mt-0.5 flex-shrink-0 text-green-500">✦</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-3">⚡ 약점</h3>
                    <div className="flex flex-col gap-2">
                      {resultData.weaknesses.map((w) => (
                        <div key={w} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <span className="mt-0.5 flex-shrink-0 text-amber-500">✦</span>
                          <span>{w}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* AdBanner between traits and compatibility */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                  <AdBanner format="rectangle" className="rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
                </motion.div>

                {/* Compatible types */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
                >
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-4">💕 나와 잘 맞는 색깔</h3>
                  <div className="flex gap-3">
                    {resultData.compatible.map((colorKey) => {
                      const info = results[colorKey];
                      return (
                        <div
                          key={colorKey}
                          className={`flex-1 rounded-xl p-4 text-center text-white bg-gradient-to-br ${info.color}`}
                        >
                          <div
                            className="w-10 h-10 rounded-full mx-auto mb-2 shadow-md ring-2 ring-white/30"
                            style={{ backgroundColor: info.bgColor }}
                          />
                          <div className="font-extrabold text-sm">{info.name}</div>
                          <div className="text-xs text-white/80 mt-0.5 leading-tight">{info.title}</div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Secondary color influence */}
                {secondaryData && secondaryColor && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
                  >
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-3">
                      🌈 부 색깔 영향
                    </h3>
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex-shrink-0 w-14 h-14 rounded-full shadow-md ring-2 ring-offset-2 ${COLOR_RING[secondaryColor]} ring-offset-white dark:ring-offset-slate-800`}
                        style={{ backgroundColor: secondaryData.bgColor }}
                      />
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                          {secondaryData.emoji} {secondaryData.name} · {secondaryData.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          {secondaryData.traits.slice(0, 3).join(", ")}의 성향이 당신을 더욱 풍부하게 만들어줍니다.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Advice card */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38 }}
                  className={`rounded-2xl p-6 bg-gradient-to-br ${resultData.color} text-white shadow-lg`}
                >
                  <h3 className="font-bold text-base mb-2 text-white/90">💡 나에게 보내는 메시지</h3>
                  <p className="text-sm leading-relaxed text-white/85">{resultData.advice}</p>
                </motion.div>

                {/* All 8 types grid */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
                >
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-4">8가지 색깔 유형</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {ALL_COLOR_TYPES.map((colorKey, i) => {
                      const info = results[colorKey];
                      const isPrimary = colorKey === primaryColor;
                      const isSecondary = colorKey === secondaryColor;
                      return (
                        <motion.div
                          key={colorKey}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.48 + i * 0.04 }}
                          className={`rounded-xl p-2 flex flex-col items-center gap-1 transition-all ${
                            isPrimary
                              ? `bg-gradient-to-br ${info.color} shadow-md ring-2 ring-white dark:ring-slate-900 scale-105`
                              : isSecondary
                              ? "bg-slate-100 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-500"
                              : "bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600"
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-full shadow-sm ${isPrimary ? "ring-2 ring-white/50" : ""}`}
                            style={{ backgroundColor: info.bgColor }}
                          />
                          <span className={`text-xs font-bold text-center leading-tight ${isPrimary ? "text-white" : "text-slate-600 dark:text-slate-300"}`}>
                            {info.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Bottom ad */}
                <AdBanner format="in-article" className="rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <button
                    onClick={handleShare}
                    className={`flex-1 py-4 rounded-2xl font-bold text-base shadow-sm border-2 transition-all ${
                      copied
                        ? "bg-green-500 border-green-400 text-white"
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-purple-300 dark:hover:border-purple-600"
                    }`}
                  >
                    {copied ? "✓ 복사 완료!" : "결과 공유하기"}
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleRestart}
                    className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-bold text-base shadow-md hover:shadow-pink-500/30 transition-shadow"
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
