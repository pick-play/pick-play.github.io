"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import TasteMap from "@/components/TasteMap";
import AdBanner from "@/components/AdBanner";
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
  x: number;
  y: number;
};

const categories = ["전체", "한식", "일식", "중식", "양식", "아시안", "분식", "디저트", "패스트푸드"];
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

const categoryColors: Record<string, string> = {
  한식: "#ef4444",
  일식: "#3b82f6",
  중식: "#eab308",
  양식: "#8b5cf6",
  아시안: "#10b981",
  분식: "#f97316",
  디저트: "#ec4899",
  패스트푸드: "#6366f1",
};

const foodLegend = Object.entries(categoryColors).map(([label, color]) => ({
  label,
  color,
}));

export default function FoodPage() {
  const [mode, setMode] = useState<"map" | "filter">("map");
  const [category, setCategory] = useState("전체");
  const [priceRange, setPriceRange] = useState("");
  const [mapCategories, setMapCategories] = useState<Set<string>>(new Set(["전체"]));

  const [spinning, setSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<Food | null>(null);
  const [candidates, setCandidates] = useState<Food[]>([]);
  const [mapSelected, setMapSelected] = useState<Food[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
    if (category !== "전체") filtered = filtered.filter((f) => f.category === category);
    if (priceRange) filtered = filtered.filter((f) => f.priceRange === priceRange);
    return filtered;
  };

  const startSlot = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const filtered = mode === "map" ? mapSelected : getFiltered();
    if (filtered.length === 0) {
      setCandidates([]);
      setResult(null);
      setSpinning(false);
      return;
    }

    setCandidates(filtered);
    setResult(null);
    setSpinning(true);

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
        setTimeout(() => { setSpinning(false); setResult(filtered[finalIndex]); }, 300);
        return;
      }
      const progress = tick / totalTicks;
      const delay = progress < 0.5 ? 60 : progress < 0.75 ? 60 + (progress - 0.5) * 400 : 160 + (progress - 0.75) * 800;
      intervalRef.current = setTimeout(runPhase, delay);
    };
    intervalRef.current = setTimeout(runPhase, 60);
  };

  const displayFood = candidates.length > 0 ? candidates[currentIndex % candidates.length] : null;

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            오늘{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">뭐 먹지?</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400">맛 지도에서 취향을 찍으면, 슬롯머신이 메뉴를 골라드립니다</p>
        </motion.div>

        {/* Mode Toggle */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="flex justify-center mb-6">
          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
            <button onClick={() => setMode("map")} className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${mode === "map" ? "bg-white dark:bg-slate-700 text-orange-500 shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700"}`}>
              맛 지도
            </button>
            <button onClick={() => setMode("filter")} className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${mode === "filter" ? "bg-white dark:bg-slate-700 text-orange-500 shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700"}`}>
              필터
            </button>
          </div>
        </motion.div>

        <AdBanner format="horizontal" className="my-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

        <AnimatePresence mode="wait">
          {mode === "map" && (
            <motion.div key="map" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.2 }} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-8">
              <div className="flex gap-2 overflow-x-auto pb-2 mb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {categories.map((cat) => {
                  const isSelected = mapCategories.has(cat);
                  const accentColor = cat === "전체" ? "#f97316" : categoryColors[cat] || "#f97316";
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setMapSelected([]);
                        if (cat === "전체") {
                          setMapCategories(new Set(["전체"]));
                        } else {
                          const next = new Set(mapCategories);
                          next.delete("전체");
                          if (next.has(cat)) {
                            next.delete(cat);
                            if (next.size === 0) next.add("전체");
                          } else {
                            next.add(cat);
                            if (next.size === categories.length - 1) {
                              setMapCategories(new Set(["전체"]));
                              return;
                            }
                          }
                          setMapCategories(next);
                        }
                      }}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${isSelected ? "text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"}`}
                      style={isSelected ? { backgroundColor: accentColor } : undefined}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
              <div className="max-w-md mx-auto">
                <TasteMap
                  items={(mapCategories.has("전체") ? foodsData : foodsData.filter((f) => mapCategories.has(f.category))) as Food[]}
                  getCoords={(item) => ({ x: item.x, y: item.y })}
                  getLabel={(item) => item.name}
                  getColor={(item) => categoryColors[item.category] || "#94a3b8"}
                  xLabels={["담백", "자극적"]}
                  yLabels={["가벼운", "고급"]}
                  quadrantHints={["고급 담백", "고급 자극", "가벼운 담백", "가벼운 자극"]}
                  accent={mapCategories.has("전체") || mapCategories.size > 1 ? "#f97316" : categoryColors[Array.from(mapCategories)[0]] || "#f97316"}
                  legend={foodLegend}
                  onSelect={setMapSelected}
                />
              </div>
              <button onClick={() => startSlot()} disabled={spinning || mapSelected.length === 0} className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50">
                {spinning ? "추천 중..." : mapSelected.length > 0 ? `${mapSelected.length}개 메뉴 중 추천받기` : "맵에서 위치를 선택하세요"}
              </button>
            </motion.div>
          )}

          {mode === "filter" && (
            <motion.div key="filter" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.2 }}>
              <form onSubmit={startSlot} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">음식 종류</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">가격대</label>
                    <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      {priceRanges.map((p) => (<option key={p.value} value={p.value}>{p.label}</option>))}
                    </select>
                  </div>
                </div>
                <button type="submit" disabled={spinning} className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50">
                  {spinning ? "추천 중..." : "추천받기"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Slot Machine Display */}
        {(spinning || result) && candidates.length > 0 && (
          <div className="mb-8">
            <AnimatePresence mode="wait">
              {spinning && displayFood && (
                <motion.div key="slot" className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 p-1 mb-4">
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center">
                    <div className="text-sm text-slate-400 mb-2">오늘의 메뉴는...</div>
                    <div className="h-20 flex items-center justify-center overflow-hidden">
                      <motion.div key={currentIndex} initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.05 }} className="text-4xl md:text-5xl font-bold">
                        {displayFood.name}
                      </motion.div>
                    </div>
                    <div className="mt-3 text-slate-400 text-sm">{displayFood.category}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {!spinning && result && (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
                  <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 p-1">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-8">
                      <div className="text-center mb-6">
                        <div className="text-sm text-orange-500 font-medium mb-2">오늘의 추천 메뉴</div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-2">{result.name}</h2>
                        <span className="inline-block px-3 py-1 text-sm rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">{result.category}</span>
                      </div>
                      <div className="flex justify-center gap-3 mb-6">
                        <span className="px-4 py-1.5 text-sm font-semibold rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                          {result.priceRange === "low" ? "저렴" : result.priceRange === "mid" ? "보통" : "고급"}
                        </span>
                      </div>
                      <p className="text-center text-slate-500 dark:text-slate-400 mb-6">{result.description}</p>
                      <button onClick={() => startSlot()} className="w-full py-3 rounded-xl border-2 border-orange-400 text-orange-500 font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors">
                        다시 뽑기
                      </button>
                      <div className="flex gap-3 mt-3">
                        <a href={`https://map.naver.com/v5/search/${encodeURIComponent(result.name)}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-colors">
                          <span>📍</span> 네이버 지도에서 검색
                        </a>
                        <a href={`https://www.google.com/maps/search/${encodeURIComponent(result.name)}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-colors">
                          <span>📍</span> 구글 맵에서 검색
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {!spinning && !result && candidates.length === 0 && mode === "filter" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 text-center">
            <div className="text-4xl mb-4">🤔</div>
            <h3 className="text-lg font-bold mb-2">조건에 맞는 메뉴가 없어요</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">조건을 바꿔보시거나, 전체 메뉴에서 랜덤으로 뽑아볼까요?</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button onClick={() => { setCategory("전체"); setPriceRange(""); }} className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">조건 초기화</button>
              <button onClick={() => { setCategory("전체"); setPriceRange(""); setTimeout(() => { const form = document.querySelector("form"); if (form) form.requestSubmit(); }, 50); }} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold hover:shadow-lg transition-all">전체에서 랜덤 뽑기</button>
            </div>
          </motion.div>
        )}
        <AdBanner format="in-article" className="mt-8 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
        <AdBanner format="rectangle" className="my-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

        {/* SEO FAQ Section */}
        <section className="mt-16 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">자주 묻는 질문</h2>
          <div className="space-y-4">
            <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-orange-500 transition-colors">
                오늘 뭐 먹지? 메뉴 추천은 어떻게 받나요?
                <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <p className="px-5 pb-5 text-slate-500 dark:text-slate-400 leading-relaxed">
                맛 지도에서 담백~자극, 가벼운~고급 축으로 취향 위치를 클릭하면, 근처에 있는 메뉴들 중 슬롯머신이 랜덤으로 하나를 골라드립니다. 한식, 일식, 중식, 양식, 아시안, 분식, 디저트, 패스트푸드 등 130가지 메뉴를 지원합니다.
              </p>
            </details>
            <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-orange-500 transition-colors">
                점심 메뉴 추천, 저녁 메뉴 추천도 가능한가요?
                <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <p className="px-5 pb-5 text-slate-500 dark:text-slate-400 leading-relaxed">
                네! 맛 지도 모드에서 취향 위치를 선택하거나, 필터 모드에서 음식 종류와 가격대를 설정하면 점심·저녁 구분 없이 상황에 맞는 메뉴를 추천받을 수 있습니다. 혼밥 메뉴, 회식 메뉴, 배달 메뉴 추천 모두 가능합니다.
              </p>
            </details>
            <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-orange-500 transition-colors">
                무료로 사용할 수 있나요?
                <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <p className="px-5 pb-5 text-slate-500 dark:text-slate-400 leading-relaxed">
                네, PickPlay의 모든 기능은 완전 무료입니다. 회원가입 없이, 앱 설치 없이 웹 브라우저에서 바로 사용할 수 있습니다. 오늘 뭐 먹지 고민될 때 언제든 방문하세요!
              </p>
            </details>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
