"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import testData from "@/data/teto-egen-test.json";

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
  optionA: Option;
  optionB: Option;
  tiebreaker?: boolean;
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
}

const results = testData.results as Record<ResultKey, ResultData>;
const loveChain = testData.loveChain;

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
    const text = `[테토 vs 에겐 성향 테스트 결과]\n${r.emoji} ${r.title} - ${r.subtitle}\n테토 ${tetoPercent}% / 에겐 ${egenPercent}%\n\n${r.description}\n\n최고 궁합: ${r.bestMatch}\n최악 궁합: ${r.worstMatch}\n\n테스트 해보기: https://pick-korea.github.io/teto-egen`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [resultKey, tetoPercent, egenPercent]);

  const result = resultKey ? results[resultKey] : null;

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
              테토 vs 에겐 테스트
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              나는 테토일까? 에겐일까? 내 성향을 알아보세요!
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
                  성별을 선택해 주세요
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
                      남성
                    </span>
                    <span className="text-xs text-slate-400">
                      테토남 / 에겐남
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
                      여성
                    </span>
                    <span className="text-xs text-slate-400">
                      테토녀 / 에겐녀
                    </span>
                  </motion.button>
                </div>

                {/* Info card */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-center">
                    <span className="font-semibold text-violet-500">테토</span>는 테스토스테론,{" "}
                    <span className="font-semibold text-pink-500">에겐</span>은 에스트로겐의 줄임말로,
                    <br />
                    성격과 연애 스타일을 분류하는 요즘 대세 성향 테스트입니다.
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
                      질문
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

                {/* Percentage bar */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-blue-500">
                      테토 {tetoPercent}%
                    </span>
                    <span className="text-xs text-slate-400 font-medium">vs</span>
                    <span className="text-sm font-bold text-pink-500">
                      에겐 {egenPercent}%
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
                </motion.div>

                {/* Traits */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                    성향 특징
                  </h3>
                  <ul className="space-y-2">
                    {result.traits.map((trait, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.07 }}
                        className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
                      >
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-violet-400 mt-2" />
                        {trait}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Love style */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                    연애 스타일
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
                    궁합
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50">
                      <span className="text-xl flex-shrink-0">💚</span>
                      <div>
                        <p className="text-sm font-bold text-green-700 dark:text-green-400 mb-0.5">
                          최고 궁합: {result.bestMatch}
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
                          주의 궁합: {result.worstMatch}
                        </p>
                        <p className="text-xs text-red-600 dark:text-red-500 leading-relaxed">
                          {result.worstMatchDesc}
                        </p>
                      </div>
                    </div>
                  </div>
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
                    {["에겐녀", "에겐남", "테토녀", "테토남"].map((type, i) => (
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
                          result.title === "에겐녀"
                            ? `bg-gradient-to-r ${result.color} text-white border-transparent shadow`
                            : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600"
                        }`}
                      >
                        에겐녀
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-center">
                    {loveChain.explanation}
                  </p>
                </motion.div>

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
                    {copied ? "클립보드에 복사됨!" : "결과 공유하기"}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleRestart}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 text-white font-bold text-base shadow-md hover:shadow-violet-500/30 transition-shadow"
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
