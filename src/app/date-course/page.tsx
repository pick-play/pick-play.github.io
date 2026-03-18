"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import coursesData from "@/data/date-courses.json";

type CourseStep = {
  step: number;
  place: string;
  type: string;
  duration: string;
};

type Course = {
  id: number;
  region: string;
  time: string;
  preference: string;
  course: CourseStep[];
};

const regions = ["전체", "강남", "홍대", "여의도", "성수", "이태원", "잠실", "북촌"];
const times = [
  { value: "", label: "전체" },
  { value: "day", label: "낮" },
  { value: "night", label: "밤" },
];
const preferences = [
  { value: "", label: "전체" },
  { value: "카페", label: "카페" },
  { value: "야외", label: "야외" },
  { value: "실내", label: "실내" },
  { value: "액티비티", label: "액티비티" },
];

const stepIcons: Record<string, string> = {
  카페: "☕",
  식사: "🍽️",
  산책: "🚶",
  액티비티: "🎮",
  관광: "📸",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function DateCoursePage() {
  const [region, setRegion] = useState("전체");
  const [time, setTime] = useState("");
  const [preference, setPreference] = useState("");
  const [results, setResults] = useState<Course[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let filtered = [...coursesData] as Course[];

    if (region !== "전체") {
      filtered = filtered.filter((c) => c.region === region);
    }
    if (time) {
      filtered = filtered.filter((c) => c.time === time);
    }
    if (preference) {
      filtered = filtered.filter((c) => c.preference === preference);
    }

    setResults(filtered);
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
            데이트 코스{" "}
            <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              추천
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            완벽한 데이트 코스를 만들어 드립니다
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
                지역
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {regions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                시간대
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {times.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                취향
              </label>
              <select
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {preferences.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all"
          >
            코스 추천받기
          </button>
        </motion.form>

        {searched && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {results.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className="text-center py-12 text-slate-500"
              >
                조건에 맞는 코스가 없습니다. 조건을 변경해 보세요.
              </motion.div>
            ) : (
              results.map((course) => (
                <motion.div
                  key={course.id}
                  variants={itemVariants}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400">
                      {course.region}
                    </span>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                      {course.time === "day" ? "낮" : "밤"}
                    </span>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {course.preference}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {course.course.map((step, i) => (
                      <div key={step.step} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-lg">
                            {stepIcons[step.type] || "📍"}
                          </div>
                          {i < course.course.length - 1 && (
                            <div className="w-0.5 h-8 bg-slate-200 dark:bg-slate-600 mt-1" />
                          )}
                        </div>
                        <div className="flex-1 pb-2">
                          <h4 className="font-semibold text-sm">
                            {step.place}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                            <span>{step.type}</span>
                            <span>·</span>
                            <span>{step.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
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
