"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/i18n/config";

const translations: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    heightLabel: string;
    weightLabel: string;
    unitMetric: string;
    unitImperial: string;
    heightCm: string;
    heightFt: string;
    heightIn: string;
    weightKg: string;
    weightLbs: string;
    bmiResult: string;
    category: string;
    normalRange: string;
    normalRangeLabel: (min: string, max: string) => string;
    tableTitle: string;
    tableCategory: string;
    tableBmi: string;
    categories: {
      underweight: string;
      normal: string;
      overweight: string;
      obese: string;
    };
  }
> = {
  ko: {
    title: "BMI 계산기",
    subtitle: "체질량지수 측정",
    heightLabel: "키",
    weightLabel: "몸무게",
    unitMetric: "미터법 (cm/kg)",
    unitImperial: "야드파운드법 (ft-in/lbs)",
    heightCm: "cm",
    heightFt: "ft",
    heightIn: "in",
    weightKg: "kg",
    weightLbs: "lbs",
    bmiResult: "BMI 지수",
    category: "분류",
    normalRange: "정상 체중 범위",
    normalRangeLabel: (min, max) => `정상 체중 범위: ${min} ~ ${max} kg`,
    tableTitle: "BMI 기준표",
    tableCategory: "분류",
    tableBmi: "BMI 범위",
    categories: {
      underweight: "저체중",
      normal: "정상",
      overweight: "과체중",
      obese: "비만",
    },
  },
  en: {
    title: "BMI Calculator",
    subtitle: "Body Mass Index",
    heightLabel: "Height",
    weightLabel: "Weight",
    unitMetric: "Metric (cm/kg)",
    unitImperial: "Imperial (ft-in/lbs)",
    heightCm: "cm",
    heightFt: "ft",
    heightIn: "in",
    weightKg: "kg",
    weightLbs: "lbs",
    bmiResult: "BMI",
    category: "Category",
    normalRange: "Normal Weight Range",
    normalRangeLabel: (min, max) => `Normal range: ${min} ~ ${max} kg`,
    tableTitle: "BMI Reference Table",
    tableCategory: "Category",
    tableBmi: "BMI Range",
    categories: {
      underweight: "Underweight",
      normal: "Normal",
      overweight: "Overweight",
      obese: "Obese",
    },
  },
  ja: {
    title: "BMI計算機",
    subtitle: "体格指数（BMI）測定",
    heightLabel: "身長",
    weightLabel: "体重",
    unitMetric: "メートル法（cm/kg）",
    unitImperial: "ヤード・ポンド法（ft-in/lbs）",
    heightCm: "cm",
    heightFt: "ft",
    heightIn: "in",
    weightKg: "kg",
    weightLbs: "lbs",
    bmiResult: "BMI指数",
    category: "分類",
    normalRange: "標準体重範囲",
    normalRangeLabel: (min, max) => `標準体重範囲: ${min} ~ ${max} kg`,
    tableTitle: "BMI基準表",
    tableCategory: "分類",
    tableBmi: "BMI範囲",
    categories: {
      underweight: "低体重",
      normal: "普通体重",
      overweight: "過体重",
      obese: "肥満",
    },
  },
  zh: {
    title: "BMI计算器",
    subtitle: "体质量指数测量",
    heightLabel: "身高",
    weightLabel: "体重",
    unitMetric: "公制「cm/kg」",
    unitImperial: "英制「ft-in/lbs」",
    heightCm: "cm",
    heightFt: "ft",
    heightIn: "in",
    weightKg: "kg",
    weightLbs: "lbs",
    bmiResult: "BMI指数",
    category: "分类",
    normalRange: "正常体重范围",
    normalRangeLabel: (min, max) => `正常范围：${min} ~ ${max} kg`,
    tableTitle: "BMI参考表",
    tableCategory: "分类",
    tableBmi: "BMI范围",
    categories: {
      underweight: "偏瘦",
      normal: "正常",
      overweight: "超重",
      obese: "肥胖",
    },
  },
  es: {
    title: "Calculadora de IMC",
    subtitle: "Índice de Masa Corporal",
    heightLabel: "Altura",
    weightLabel: "Peso",
    unitMetric: "Métrico (cm/kg)",
    unitImperial: "Imperial (ft-in/lbs)",
    heightCm: "cm",
    heightFt: "ft",
    heightIn: "in",
    weightKg: "kg",
    weightLbs: "lbs",
    bmiResult: "IMC",
    category: "Categoría",
    normalRange: "Rango de peso normal",
    normalRangeLabel: (min, max) => `Rango normal: ${min} ~ ${max} kg`,
    tableTitle: "Tabla de referencia IMC",
    tableCategory: "Categoría",
    tableBmi: "Rango IMC",
    categories: {
      underweight: "Bajo peso",
      normal: "Normal",
      overweight: "Sobrepeso",
      obese: "Obesidad",
    },
  },
};

type BmiCategory = "underweight" | "normal" | "overweight" | "obese";

function getBmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  return "obese";
}

function getCategoryColor(category: BmiCategory): string {
  switch (category) {
    case "underweight":
      return "text-blue-500";
    case "normal":
      return "text-green-500";
    case "overweight":
      return "text-yellow-500";
    case "obese":
      return "text-red-500";
  }
}

function getCategoryBg(category: BmiCategory): string {
  switch (category) {
    case "underweight":
      return "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800";
    case "normal":
      return "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800";
    case "overweight":
      return "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800";
    case "obese":
      return "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800";
  }
}

function getGaugePercent(bmi: number): number {
  // Map BMI 10-40 → 0-100%
  const clamped = Math.max(10, Math.min(40, bmi));
  return ((clamped - 10) / 30) * 100;
}

function cmToFtIn(cm: number): { ft: number; inches: number } {
  const totalInches = cm / 2.54;
  const ft = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { ft, inches };
}

function ftInToCm(ft: number, inches: number): number {
  return Math.round((ft * 12 + inches) * 2.54);
}

function kgToLbs(kg: number): number {
  return Math.round(kg * 2.20462);
}

function lbsToKg(lbs: number): number {
  return Math.round(lbs / 2.20462);
}

const BMI_TABLE: { range: string; category: BmiCategory; color: string }[] = [
  { range: "< 18.5", category: "underweight", color: "text-blue-500" },
  { range: "18.5 – 24.9", category: "normal", color: "text-green-500" },
  { range: "25.0 – 29.9", category: "overweight", color: "text-yellow-500" },
  { range: "≥ 30.0", category: "obese", color: "text-red-500" },
];

export default function BmiPage() {
  const locale = useLocale() as Locale;
  const t = translations[locale] ?? translations.ko;

  const [isImperial, setIsImperial] = useState(false);
  const [heightCm, setHeightCm] = useState(170);
  const [weightKg, setWeightKg] = useState(65);
  const [ftVal, setFtVal] = useState(5);
  const [inVal, setInVal] = useState(7);
  const [lbsVal, setLbsVal] = useState(143);

  const { bmi, category, normalMin, normalMax } = useMemo(() => {
    let hCm = heightCm;
    let wKg = weightKg;
    if (isImperial) {
      hCm = ftInToCm(ftVal, inVal);
      wKg = lbsToKg(lbsVal);
    }
    const hM = hCm / 100;
    const bmiVal = wKg / (hM * hM);
    const cat = getBmiCategory(bmiVal);
    // Normal range: 18.5–24.9 for given height
    const minKg = Math.round(18.5 * hM * hM * 10) / 10;
    const maxKg = Math.round(24.9 * hM * hM * 10) / 10;
    return { bmi: bmiVal, category: cat, normalMin: minKg, normalMax: maxKg };
  }, [heightCm, weightKg, isImperial, ftVal, inVal, lbsVal]);

  const gaugePercent = getGaugePercent(bmi);
  const bmiDisplay = bmi.toFixed(1);

  function handleHeightCmChange(val: number) {
    setHeightCm(val);
    const { ft, inches } = cmToFtIn(val);
    setFtVal(ft);
    setInVal(inches);
  }

  function handleWeightKgChange(val: number) {
    setWeightKg(val);
    setLbsVal(kgToLbs(val));
  }

  function handleFtChange(val: number) {
    setFtVal(val);
    setHeightCm(ftInToCm(val, inVal));
  }

  function handleInChange(val: number) {
    setInVal(val);
    setHeightCm(ftInToCm(ftVal, val));
  }

  function handleLbsChange(val: number) {
    setLbsVal(val);
    setWeightKg(lbsToKg(val));
  }

  function handleUnitToggle(imperial: boolean) {
    setIsImperial(imperial);
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/20 dark:from-slate-950 dark:via-teal-950/20 dark:to-cyan-950/10">
        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 text-center"
          >
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-2xl">⚖️</span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                {t.title}
              </h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t.subtitle}</p>
          </motion.div>

          {/* Unit Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 mb-4 bg-white dark:bg-slate-800 shadow-sm"
          >
            <button
              onClick={() => handleUnitToggle(false)}
              className={`flex-1 py-2 text-xs font-medium transition-colors ${
                !isImperial
                  ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50"
              }`}
            >
              {t.unitMetric}
            </button>
            <button
              onClick={() => handleUnitToggle(true)}
              className={`flex-1 py-2 text-xs font-medium transition-colors ${
                isImperial
                  ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50"
              }`}
            >
              {t.unitImperial}
            </button>
          </motion.div>

          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 mb-4 space-y-5"
          >
            {/* Height */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t.heightLabel}
                </span>
                {!isImperial ? (
                  <span className="text-sm font-bold text-teal-600 dark:text-teal-400 tabular-nums">
                    {heightCm} {t.heightCm}
                  </span>
                ) : (
                  <span className="text-sm font-bold text-teal-600 dark:text-teal-400 tabular-nums">
                    {ftVal} {t.heightFt} {inVal} {t.heightIn}
                  </span>
                )}
              </div>
              {!isImperial ? (
                <input
                  type="range"
                  min={140}
                  max={210}
                  value={heightCm}
                  onChange={(e) => handleHeightCmChange(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer accent-teal-500"
                />
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 w-6">{t.heightFt}</span>
                    <input
                      type="range"
                      min={4}
                      max={7}
                      value={ftVal}
                      onChange={(e) => handleFtChange(Number(e.target.value))}
                      className="flex-1 h-2 rounded-full appearance-none cursor-pointer accent-teal-500"
                    />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300 w-4 text-right tabular-nums">
                      {ftVal}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 w-6">{t.heightIn}</span>
                    <input
                      type="range"
                      min={0}
                      max={11}
                      value={inVal}
                      onChange={(e) => handleInChange(Number(e.target.value))}
                      className="flex-1 h-2 rounded-full appearance-none cursor-pointer accent-teal-500"
                    />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300 w-4 text-right tabular-nums">
                      {inVal}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Weight */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t.weightLabel}
                </span>
                {!isImperial ? (
                  <span className="text-sm font-bold text-teal-600 dark:text-teal-400 tabular-nums">
                    {weightKg} {t.weightKg}
                  </span>
                ) : (
                  <span className="text-sm font-bold text-teal-600 dark:text-teal-400 tabular-nums">
                    {lbsVal} {t.weightLbs}
                  </span>
                )}
              </div>
              {!isImperial ? (
                <input
                  type="range"
                  min={30}
                  max={200}
                  value={weightKg}
                  onChange={(e) => handleWeightKgChange(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer accent-teal-500"
                />
              ) : (
                <input
                  type="range"
                  min={66}
                  max={440}
                  value={lbsVal}
                  onChange={(e) => handleLbsChange(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer accent-teal-500"
                />
              )}
            </div>
          </motion.div>

          {/* BMI Result */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className={`rounded-2xl shadow-sm border p-6 mb-4 text-center ${getCategoryBg(category)}`}
          >
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
              {t.bmiResult}
            </p>
            <motion.div
              key={bmiDisplay}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`text-6xl font-black tabular-nums mb-2 ${getCategoryColor(category)}`}
            >
              {bmiDisplay}
            </motion.div>
            <p className={`text-lg font-bold ${getCategoryColor(category)}`}>
              {t.categories[category]}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              {t.normalRangeLabel(normalMin.toFixed(1), normalMax.toFixed(1))}
            </p>
          </motion.div>

          {/* BMI Gauge Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 mb-4"
          >
            <div className="relative h-5 rounded-full overflow-hidden mb-3">
              {/* Gradient track */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-500" />
              {/* Marker */}
              <motion.div
                animate={{ left: `${Math.max(2, Math.min(96, gaugePercent))}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-md border-2 border-slate-300"
              />
            </div>
            {/* Labels */}
            <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 px-0.5">
              <span>10</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40</span>
            </div>
            <div className="flex justify-between text-xs mt-1 px-0.5">
              <span className="text-blue-500">{t.categories.underweight}</span>
              <span className="text-green-500">{t.categories.normal}</span>
              <span className="text-yellow-500">{t.categories.overweight}</span>
              <span className="text-red-500">{t.categories.obese}</span>
            </div>
          </motion.div>

          {/* Ad Banner */}
          <div className="mb-4">
            <AdBanner format="horizontal" />
          </div>

          {/* BMI Reference Table */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 mb-4"
          >
            <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">
              {t.tableTitle}
            </h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-700">
                  <th className="text-left py-1.5 font-medium">{t.tableCategory}</th>
                  <th className="text-right py-1.5 font-medium">{t.tableBmi}</th>
                </tr>
              </thead>
              <tbody>
                {BMI_TABLE.map((row) => (
                  <tr
                    key={row.category}
                    className={`border-b border-slate-50 dark:border-slate-700/60 last:border-0 ${
                      category === row.category ? "font-bold" : ""
                    }`}
                  >
                    <td className={`py-2 ${row.color}`}>
                      {category === row.category && (
                        <span className="mr-1.5">▶</span>
                      )}
                      {t.categories[row.category]}
                    </td>
                    <td className={`py-2 text-right tabular-nums ${row.color}`}>
                      {row.range}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Bottom Ad */}
          <div className="mt-2">
            <AdBanner format="rectangle" />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
