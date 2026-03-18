"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function FoodPage() {
  const [category, setCategory] = useState("전체");
  const [priceRange, setPriceRange] = useState("");
  const [people, setPeople] = useState("");
  const [results, setResults] = useState<Food[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

    filtered.sort((a, b) => b.rating - a.rating);
    setResults(filtered.slice(0, 5));
    setSearched(true);
  };

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
            조건에 맞는 최적의 메뉴를 추천해 드립니다
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
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
            className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all"
          >
            추천받기
          </button>
        </motion.form>

        {searched && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {results.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className="text-center py-12 text-slate-500"
              >
                조건에 맞는 메뉴가 없습니다. 조건을 변경해 보세요.
              </motion.div>
            ) : (
              results.map((food, index) => (
                <motion.div
                  key={food.id}
                  variants={itemVariants}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-primary-500">
                          {index + 1}
                        </span>
                        <h3 className="text-lg font-bold">{food.name}</h3>
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          {food.category}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                        {food.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span>
                          {food.priceRange === "low" ? "💰 저렴" : food.priceRange === "mid" ? "💰💰 보통" : "💰💰💰 고급"}
                        </span>
                        <span>{food.servings}인</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-600 dark:text-orange-400">
                        {reasonLabels[food.reason] || food.reason}
                      </span>
                      <div className="mt-2 text-sm font-medium text-yellow-500">
                        {"★".repeat(Math.floor(food.rating))} {food.rating}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
