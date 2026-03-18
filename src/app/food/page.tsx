"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import foodsData from "@/data/foods.json";

type Food = {
  id: number;
  name: string;
  category: string;
  priceRange: string;
  rating: number;
  reason: string;
  description: string;
  servings: string;
};

const categories = ["전체", "한식", "일식", "중식", "양식", "아시안", "분식"];
const priceRanges = [
  { value: "", label: "전체" },
  { value: "low", label: "저렴 (1만원 이하)" },
  { value: "mid", label: "보통 (1~2만원)" },
  { value: "high", label: "고급 (2만원 이상)" },
];

const reasonLabels: Record<string, string> = {
  가성비: "가성비 최고",
  인기: "인기 메뉴",
  분위기: "분위기 굿",
  특별한날: "특별한 날",
  계절: "계절 추천",
};

export default function FoodPage() {
  const [category, setCategory] = useState("전체");
  const [priceRange, setPriceRange] = useState("");
  const [people, setPeople] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<Food | null>(null);
  const [candidates, setCandidates] = useState<Food[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const phaseRef = useRef(0);

  const stopSlot = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopSlot();
  }, [stopSlot]);

  const getFiltered = () => {
    let filtered = [...foodsData] as Food[];
    if (category !== "전체") {
      filtered = filtered.filter((f) => f.category === category);
    }
    if (priceRange) {
      filtered = filtered.filter((f) => f.priceRange === priceRange);
    }
    if (people) {
      const num = parseInt(people);
      filtered = filtered.filter((f) => {
        const [min, max] = f.servings.split("-").map(Number);
        return num >= min && num <= max;
      });
    }
    return filtered;
  };

  const startSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = getFiltered();
    if (filtered.length === 0) {
      setCandidates([]);
      setResult(null);
      setSpinning(false);
      return;
    }

    setCandidates(filtered);
    setResult(null);
    setSpinning(true);
    phaseRef.current = 0;

    const finalIndex = Math.floor(Math.random() * filtered.length);
    let tick = 0;
    const totalTicks = 30 + Math.floor(Math.random() * 15);

    stopSlot();

    const runPhase = () => {
      tick++;
      setCurrentIndex((prev) => (prev + 1) % filtered.length);

      if (tick >= totalTicks) {
        stopSlot();
        setCurrentIndex(finalIndex);
        setTimeout(() => {
          setSpinning(false);
          setResult(filtered[finalIndex]);
        }, 300);
        return;
      }

      const progress = tick / totalTicks;
      let delay: number;
      if (progress < 0.5) {
        delay = 60;
      } else if (progress < 0.75) {
        delay = 60 + (progress - 0.5) * 400;
      } else {
        delay = 160 + (progress - 0.75) * 800;
      }

      intervalRef.current = setTimeout(runPhase, delay);
    };

    intervalRef.current = setTimeout(runPhase, 60);
  };

  const displayFood = candidates.length > 0 ? candidates[currentIndex % candidates.length] : null;

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            오늘{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              뭐 먹지?
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            슬롯머신이 오늘의 메뉴를 골라드립니다
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={startSlot}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                음식 종류 (선택)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                가격대
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {priceRanges.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                인원 (선택)
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                placeholder="인원 수"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={spinning}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50"
          >
            {spinning ? "추천 중..." : "추천받기"}
          </button>
        </motion.form>

        {/* Slot Machine Display */}
        {(spinning || result) && candidates.length > 0 && (
          <div className="mb-8">
            {/* Spinning Slot */}
            <AnimatePresence mode="wait">
              {spinning && displayFood && (
                <motion.div
                  key="slot"
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 p-1 mb-4"
                >
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center">
                    <div className="text-sm text-slate-400 mb-2">오늘의 메뉴는...</div>
                    <div className="h-20 flex items-center justify-center overflow-hidden">
                      <motion.div
                        key={currentIndex}
                        initial={{ y: -40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ duration: 0.05 }}
                        className="text-4xl md:text-5xl font-bold"
                      >
                        {displayFood.name}
                      </motion.div>
                    </div>
                    <div className="mt-3 text-slate-400 text-sm">{displayFood.category}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Result Card */}
            <AnimatePresence>
              {!spinning && result && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 p-1">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-8">
                      <div className="text-center mb-6">
                        <div className="text-sm text-orange-500 font-medium mb-2">오늘의 추천 메뉴</div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-2">{result.name}</h2>
                        <span className="inline-block px-3 py-1 text-sm rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          {result.category}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                          <div className="text-xs text-slate-400 mb-1">추천 이유</div>
                          <div className="font-semibold text-orange-500">{reasonLabels[result.reason] || result.reason}</div>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                          <div className="text-xs text-slate-400 mb-1">가격대</div>
                          <div className="font-semibold">
                            {result.priceRange === "low" ? "저렴" : result.priceRange === "mid" ? "보통" : "고급"}
                          </div>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                          <div className="text-xs text-slate-400 mb-1">인원</div>
                          <div className="font-semibold">{result.servings}인</div>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                          <div className="text-xs text-slate-400 mb-1">평점</div>
                          <div className="font-semibold text-yellow-500">{"★".repeat(Math.floor(result.rating))} {result.rating}</div>
                        </div>
                      </div>
                      <p className="text-center text-slate-500 dark:text-slate-400 mb-6">{result.description}</p>
                      <button
                        onClick={startSlot as unknown as () => void}
                        className="w-full py-3 rounded-xl border-2 border-orange-400 text-orange-500 font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors"
                      >
                        다시 뽑기
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* No results - offer random from all */}
        {!spinning && !result && candidates.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 text-center"
          >
            <div className="text-4xl mb-4">🤔</div>
            <h3 className="text-lg font-bold mb-2">조건에 맞는 메뉴가 없어요</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
              조건을 바꿔보시거나, 전체 메뉴에서 랜덤으로 뽑아볼까요?
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => { setCategory("전체"); setPriceRange(""); setPeople(""); }}
                className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                조건 초기화
              </button>
              <button
                onClick={() => {
                  setCategory("전체");
                  setPriceRange("");
                  setPeople("");
                  setTimeout(() => {
                    const form = document.querySelector("form");
                    if (form) form.requestSubmit();
                  }, 50);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold hover:shadow-lg transition-all"
              >
                전체에서 랜덤 뽑기
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
