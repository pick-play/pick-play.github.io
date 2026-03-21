"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";

type Phase = "input" | "animating" | "result";

interface TeamResult {
  teamIndex: number;
  members: string[];
}

const TEAM_GRADIENTS = [
  { from: "from-blue-500", to: "to-cyan-500", bg: "bg-gradient-to-br from-blue-500 to-cyan-500", light: "bg-blue-50 dark:bg-blue-900/20", border: "border-blue-200 dark:border-blue-700" },
  { from: "from-rose-500", to: "to-pink-500", bg: "bg-gradient-to-br from-rose-500 to-pink-500", light: "bg-rose-50 dark:bg-rose-900/20", border: "border-rose-200 dark:border-rose-700" },
  { from: "from-amber-500", to: "to-yellow-500", bg: "bg-gradient-to-br from-amber-500 to-yellow-500", light: "bg-amber-50 dark:bg-amber-900/20", border: "border-amber-200 dark:border-amber-700" },
  { from: "from-emerald-500", to: "to-green-500", bg: "bg-gradient-to-br from-emerald-500 to-green-500", light: "bg-emerald-50 dark:bg-emerald-900/20", border: "border-emerald-200 dark:border-emerald-700" },
  { from: "from-violet-500", to: "to-purple-500", bg: "bg-gradient-to-br from-violet-500 to-purple-500", light: "bg-violet-50 dark:bg-violet-900/20", border: "border-violet-200 dark:border-violet-700" },
  { from: "from-orange-500", to: "to-red-500", bg: "bg-gradient-to-br from-orange-500 to-red-500", light: "bg-orange-50 dark:bg-orange-900/20", border: "border-orange-200 dark:border-orange-700" },
  { from: "from-teal-500", to: "to-cyan-600", bg: "bg-gradient-to-br from-teal-500 to-cyan-600", light: "bg-teal-50 dark:bg-teal-900/20", border: "border-teal-200 dark:border-teal-700" },
  { from: "from-indigo-500", to: "to-blue-600", bg: "bg-gradient-to-br from-indigo-500 to-blue-600", light: "bg-indigo-50 dark:bg-indigo-900/20", border: "border-indigo-200 dark:border-indigo-700" },
  { from: "from-pink-500", to: "to-fuchsia-500", bg: "bg-gradient-to-br from-pink-500 to-fuchsia-500", light: "bg-pink-50 dark:bg-pink-900/20", border: "border-pink-200 dark:border-pink-700" },
  { from: "from-lime-500", to: "to-green-600", bg: "bg-gradient-to-br from-lime-500 to-green-600", light: "bg-lime-50 dark:bg-lime-900/20", border: "border-lime-200 dark:border-lime-700" },
];

const CHIP_COLORS = [
  "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
];

function fisherYatesShuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function assignTeams(names: string[], numTeams: number): TeamResult[] {
  const shuffled = fisherYatesShuffle(names);
  const teams: TeamResult[] = Array.from({ length: numTeams }, (_, i) => ({
    teamIndex: i,
    members: [],
  }));
  shuffled.forEach((name, idx) => {
    teams[idx % numTeams].members.push(name);
  });
  return teams;
}

// Shuffle animation card component
function ShuffleCard({ name, delay, phase }: { name: string; delay: number; phase: "shuffling" | "dealing" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={
        phase === "shuffling"
          ? {
              opacity: [0, 1, 1, 1],
              scale: [0.5, 1, 1, 1],
              x: [0, Math.random() * 60 - 30, Math.random() * 40 - 20, 0],
              y: [0, Math.random() * 40 - 20, Math.random() * 20 - 10, 0],
              rotate: [0, Math.random() * 20 - 10, Math.random() * 10 - 5, 0],
              filter: ["blur(0px)", "blur(2px)", "blur(1px)", "blur(0px)"],
            }
          : {
              opacity: [1, 0],
              scale: [1, 1.2, 0],
              y: [0, -20, 60],
            }
      }
      transition={
        phase === "shuffling"
          ? { duration: 0.4, delay, repeat: 3, repeatType: "mirror" as const, ease: "easeInOut" }
          : { duration: 0.5, delay, ease: "backIn" }
      }
      className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 shadow-md text-slate-700 dark:text-slate-200 font-semibold text-sm whitespace-nowrap"
    >
      {name}
    </motion.div>
  );
}

export default function RandomTeamPage() {
  const [names, setNames] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [numTeams, setNumTeams] = useState(2);
  const [phase, setPhase] = useState<Phase>("input");
  const [teams, setTeams] = useState<TeamResult[]>([]);
  const [animPhase, setAnimPhase] = useState<"shuffling" | "dealing">("shuffling");
  const [copySuccess, setCopySuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addNames = useCallback(() => {
    const raw = inputValue.trim();
    if (!raw) return;
    const newNames = raw
      .split(/[,，、\n]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !names.includes(s));
    if (newNames.length > 0) {
      setNames((prev) => [...prev, ...newNames]);
    }
    setInputValue("");
    inputRef.current?.focus();
  }, [inputValue, names]);

  const removeName = useCallback((idx: number) => {
    setNames((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNames();
    }
  };

  const startShuffle = useCallback(() => {
    if (names.length < 2 || numTeams > names.length) return;
    const result = assignTeams(names, numTeams);
    setTeams(result);
    setPhase("animating");
    setAnimPhase("shuffling");

    // Phase 1: shuffle for 1.5s, Phase 2: deal cards
    setTimeout(() => {
      setAnimPhase("dealing");
      // After dealing animation completes, show result
      const dealDuration = names.length * 350 + 800;
      setTimeout(() => {
        setPhase("result");
      }, dealDuration);
    }, 1800);
  }, [names, numTeams]);

  const resetAll = () => {
    setNames([]);
    setInputValue("");
    setNumTeams(2);
    setTeams([]);
    setPhase("input");
    setCopySuccess(false);
  };

  const reshuffle = () => {
    if (names.length < 2) return;
    const result = assignTeams(names, numTeams);
    setTeams(result);
    setPhase("animating");
    setAnimPhase("shuffling");
    setTimeout(() => {
      setAnimPhase("dealing");
      const dealDuration = names.length * 350 + 800;
      setTimeout(() => {
        setPhase("result");
      }, dealDuration);
    }, 1800);
  };

  const copyResult = useCallback(async () => {
    const lines = ["[랜덤 조 뽑기 결과]", ""];
    teams.forEach((team) => {
      lines.push(`${team.teamIndex + 1}조: ${team.members.join(", ")}`);
    });
    lines.push("", "PickPlay에서 생성");
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      // fallback: do nothing
    }
  }, [teams]);

  const canStart = names.length >= 2 && numTeams <= names.length && numTeams >= 2;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg mb-4">
              <span className="text-3xl">🎲</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
              랜덤 조 뽑기
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              공정하고 긴장감 넘치는 팀 배정
            </p>
          </motion.div>

          {/* Input Phase */}
          <AnimatePresence mode="wait">
            {phase === "input" && (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {/* Name input card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5">
                  <h2 className="text-base font-semibold text-slate-700 dark:text-slate-200 mb-3">
                    참가자 추가
                  </h2>
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="이름 입력 (쉼표로 여러 명 한번에)"
                      className="flex-1 min-h-[48px] px-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                    />
                    <button
                      onClick={addNames}
                      className="min-h-[48px] px-5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm hover:from-blue-600 hover:to-cyan-600 transition-all active:scale-95 shadow-sm"
                    >
                      추가
                    </button>
                  </div>

                  {/* Name chips */}
                  <AnimatePresence>
                    {names.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 flex flex-wrap gap-2"
                      >
                        {names.map((name, idx) => (
                          <motion.span
                            key={`${name}-${idx}`}
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${CHIP_COLORS[idx % CHIP_COLORS.length]}`}
                          >
                            {name}
                            <button
                              onClick={() => removeName(idx)}
                              className="ml-0.5 w-4 h-4 rounded-full flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                              aria-label={`${name} 제거`}
                            >
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </motion.span>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {names.length > 0 && (
                    <p className="mt-3 text-xs text-slate-400">
                      {names.length}명 추가됨
                    </p>
                  )}
                </div>

                {/* Teams count card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5">
                  <h2 className="text-base font-semibold text-slate-700 dark:text-slate-200 mb-4">
                    조 수 설정
                  </h2>
                  <div className="flex items-center justify-center gap-5">
                    <button
                      onClick={() => setNumTeams((n) => Math.max(2, n - 1))}
                      disabled={numTeams <= 2}
                      className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xl disabled:opacity-30 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors active:scale-95"
                    >
                      −
                    </button>
                    <div className="text-center">
                      <span className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                        {numTeams}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 ml-1 text-lg">조</span>
                    </div>
                    <button
                      onClick={() => setNumTeams((n) => Math.min(10, n + 1))}
                      disabled={numTeams >= 10}
                      className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xl disabled:opacity-30 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors active:scale-95"
                    >
                      +
                    </button>
                  </div>
                  {numTeams > names.length && names.length > 0 && (
                    <p className="mt-3 text-center text-xs text-rose-500">
                      조 수가 참가자 수({names.length}명)보다 많습니다
                    </p>
                  )}
                </div>

                {/* Start button */}
                <motion.button
                  onClick={startShuffle}
                  disabled={!canStart}
                  whileHover={canStart ? { scale: 1.02 } : {}}
                  whileTap={canStart ? { scale: 0.97 } : {}}
                  className="w-full min-h-[56px] rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg shadow-lg hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {names.length < 2
                    ? "참가자를 2명 이상 추가하세요"
                    : numTeams > names.length
                    ? "조 수가 참가자보다 많습니다"
                    : "🎲 조 뽑기 시작!"}
                </motion.button>
              </motion.div>
            )}

            {/* Animation Phase */}
            {phase === "animating" && (
              <motion.div
                key="animating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-[400px] flex flex-col items-center justify-center"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 w-full text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg"
                  >
                    <span className="text-3xl">🎲</span>
                  </motion.div>

                  <motion.h2
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-xl font-bold text-slate-800 dark:text-white mb-6"
                  >
                    {animPhase === "shuffling" ? "섞는 중..." : "배정 중..."}
                  </motion.h2>

                  {/* Shuffle cards grid */}
                  <div className="flex flex-wrap gap-2 justify-center max-w-md mx-auto">
                    {names.map((name, idx) => (
                      <ShuffleCard
                        key={`${name}-${idx}`}
                        name={name}
                        delay={idx * 0.05}
                        phase={animPhase}
                      />
                    ))}
                  </div>

                  {animPhase === "dealing" && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 text-sm text-slate-400"
                    >
                      결과를 준비하고 있어요...
                    </motion.p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Result Phase */}
            {phase === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {/* Result header */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="text-center py-4"
                >
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-5xl mb-3"
                  >
                    🎉
                  </motion.div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                    조 배정 완료!
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    {names.length}명을 {numTeams}개 조로 나눴습니다
                  </p>
                </motion.div>

                {/* Team cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {teams.map((team, teamIdx) => {
                    const gradient = TEAM_GRADIENTS[team.teamIndex % TEAM_GRADIENTS.length];
                    return (
                      <motion.div
                        key={team.teamIndex}
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: teamIdx * 0.12,
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        }}
                        className={`rounded-2xl overflow-hidden border ${gradient.border} shadow-sm`}
                      >
                        {/* Team header */}
                        <div className={`${gradient.bg} px-4 py-3`}>
                          <h3 className="text-white font-bold text-lg">
                            {team.teamIndex + 1}조
                          </h3>
                          <p className="text-white/80 text-xs">
                            {team.members.length}명
                          </p>
                        </div>
                        {/* Members */}
                        <div className={`${gradient.light} px-4 py-3 space-y-2`}>
                          {team.members.map((member, memberIdx) => (
                            <motion.div
                              key={memberIdx}
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: teamIdx * 0.12 + memberIdx * 0.08 + 0.2,
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                              }}
                              className="flex items-center gap-2"
                            >
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  delay: teamIdx * 0.12 + memberIdx * 0.08 + 0.25,
                                  type: "spring",
                                  stiffness: 400,
                                }}
                                className={`w-6 h-6 rounded-full ${gradient.bg} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                              >
                                {memberIdx + 1}
                              </motion.span>
                              <span className="text-slate-700 dark:text-slate-200 font-medium text-sm">
                                {member}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-3 gap-3 pt-2"
                >
                  <button
                    onClick={copyResult}
                    className={`min-h-[48px] rounded-xl font-semibold text-sm transition-all active:scale-95 border ${
                      copySuccess
                        ? "bg-emerald-500 text-white border-emerald-500"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
                    }`}
                  >
                    {copySuccess ? "복사됨!" : "결과 복사"}
                  </button>
                  <button
                    onClick={reshuffle}
                    className="min-h-[48px] rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm hover:from-blue-600 hover:to-cyan-600 transition-all active:scale-95 shadow-sm"
                  >
                    다시 뽑기
                  </button>
                  <button
                    onClick={resetAll}
                    className="min-h-[48px] rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-all active:scale-95"
                  >
                    처음부터
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
