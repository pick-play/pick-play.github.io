"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/i18n/config";

// ─── Types ───────────────────────────────────────────────────────────────────

type CategoryKey = "length" | "weight" | "temperature" | "area" | "volume" | "speed" | "data";

interface UnitDef {
  key: string;
  label: string;
  /** Convert this unit to the base unit of its category */
  toBase: (v: number) => number;
  /** Convert from the base unit to this unit */
  fromBase: (v: number) => number;
}

// ─── Unit definitions (base unit is first in each array) ─────────────────────

const LENGTH_UNITS: UnitDef[] = [
  { key: "mm",  label: "mm",  toBase: (v) => v / 1000,       fromBase: (v) => v * 1000 },
  { key: "cm",  label: "cm",  toBase: (v) => v / 100,        fromBase: (v) => v * 100 },
  { key: "m",   label: "m",   toBase: (v) => v,              fromBase: (v) => v },
  { key: "km",  label: "km",  toBase: (v) => v * 1000,       fromBase: (v) => v / 1000 },
  { key: "in",  label: "in",  toBase: (v) => v * 0.0254,     fromBase: (v) => v / 0.0254 },
  { key: "ft",  label: "ft",  toBase: (v) => v * 0.3048,     fromBase: (v) => v / 0.3048 },
  { key: "yd",  label: "yd",  toBase: (v) => v * 0.9144,     fromBase: (v) => v / 0.9144 },
  { key: "mi",  label: "mi",  toBase: (v) => v * 1609.344,   fromBase: (v) => v / 1609.344 },
];

const WEIGHT_UNITS: UnitDef[] = [
  { key: "mg",  label: "mg",  toBase: (v) => v / 1_000_000, fromBase: (v) => v * 1_000_000 },
  { key: "g",   label: "g",   toBase: (v) => v / 1000,      fromBase: (v) => v * 1000 },
  { key: "kg",  label: "kg",  toBase: (v) => v,             fromBase: (v) => v },
  { key: "oz",  label: "oz",  toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
  { key: "lb",  label: "lb",  toBase: (v) => v * 0.453592,  fromBase: (v) => v / 0.453592 },
  { key: "ton", label: "ton", toBase: (v) => v * 1000,      fromBase: (v) => v / 1000 },
];

const TEMPERATURE_UNITS: UnitDef[] = [
  { key: "C", label: "°C", toBase: (v) => v,                    fromBase: (v) => v },
  { key: "F", label: "°F", toBase: (v) => (v - 32) * 5 / 9,    fromBase: (v) => v * 9 / 5 + 32 },
  { key: "K", label: "K",  toBase: (v) => v - 273.15,           fromBase: (v) => v + 273.15 },
];

const AREA_UNITS: UnitDef[] = [
  { key: "mm2", label: "mm²", toBase: (v) => v / 1_000_000,       fromBase: (v) => v * 1_000_000 },
  { key: "cm2", label: "cm²", toBase: (v) => v / 10_000,          fromBase: (v) => v * 10_000 },
  { key: "m2",  label: "m²",  toBase: (v) => v,                   fromBase: (v) => v },
  { key: "km2", label: "km²", toBase: (v) => v * 1_000_000,       fromBase: (v) => v / 1_000_000 },
  { key: "ft2", label: "ft²", toBase: (v) => v * 0.092903,        fromBase: (v) => v / 0.092903 },
  { key: "ac",  label: "ac",  toBase: (v) => v * 4046.86,         fromBase: (v) => v / 4046.86 },
  { key: "ha",  label: "ha",  toBase: (v) => v * 10_000,          fromBase: (v) => v / 10_000 },
];

const VOLUME_UNITS: UnitDef[] = [
  { key: "mL",   label: "mL",    toBase: (v) => v / 1000,       fromBase: (v) => v * 1000 },
  { key: "L",    label: "L",     toBase: (v) => v,              fromBase: (v) => v },
  { key: "gal",  label: "gal",   toBase: (v) => v * 3.78541,    fromBase: (v) => v / 3.78541 },
  { key: "floz", label: "fl oz", toBase: (v) => v * 0.0295735,  fromBase: (v) => v / 0.0295735 },
  { key: "cup",  label: "cup",   toBase: (v) => v * 0.236588,   fromBase: (v) => v / 0.236588 },
];

const SPEED_UNITS: UnitDef[] = [
  { key: "ms",   label: "m/s",   toBase: (v) => v,              fromBase: (v) => v },
  { key: "kmh",  label: "km/h",  toBase: (v) => v / 3.6,        fromBase: (v) => v * 3.6 },
  { key: "mph",  label: "mph",   toBase: (v) => v * 0.44704,    fromBase: (v) => v / 0.44704 },
  { key: "knot", label: "knot",  toBase: (v) => v * 0.514444,   fromBase: (v) => v / 0.514444 },
];

const DATA_UNITS: UnitDef[] = [
  { key: "B",  label: "B",  toBase: (v) => v,                       fromBase: (v) => v },
  { key: "KB", label: "KB", toBase: (v) => v * 1024,                fromBase: (v) => v / 1024 },
  { key: "MB", label: "MB", toBase: (v) => v * 1024 ** 2,           fromBase: (v) => v / 1024 ** 2 },
  { key: "GB", label: "GB", toBase: (v) => v * 1024 ** 3,           fromBase: (v) => v / 1024 ** 3 },
  { key: "TB", label: "TB", toBase: (v) => v * 1024 ** 4,           fromBase: (v) => v / 1024 ** 4 },
];

const CATEGORY_UNITS: Record<CategoryKey, UnitDef[]> = {
  length:      LENGTH_UNITS,
  weight:      WEIGHT_UNITS,
  temperature: TEMPERATURE_UNITS,
  area:        AREA_UNITS,
  volume:      VOLUME_UNITS,
  speed:       SPEED_UNITS,
  data:        DATA_UNITS,
};

// ─── Quick links ─────────────────────────────────────────────────────────────

interface QuickLink {
  category: CategoryKey;
  from: string;
  to: string;
  label: string;
}

const QUICK_LINKS: QuickLink[] = [
  { category: "length",      from: "cm",  to: "in",  label: "cm→in" },
  { category: "length",      from: "km",  to: "mi",  label: "km→mi" },
  { category: "weight",      from: "kg",  to: "lb",  label: "kg→lb" },
  { category: "temperature", from: "C",   to: "F",   label: "°C→°F" },
  { category: "temperature", from: "F",   to: "C",   label: "°F→°C" },
  { category: "volume",      from: "L",   to: "gal", label: "L→gal" },
  { category: "speed",       from: "kmh", to: "mph", label: "km/h→mph" },
  { category: "data",        from: "MB",  to: "GB",  label: "MB→GB" },
];

// ─── Translations ─────────────────────────────────────────────────────────────

const translations: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    categories: Record<CategoryKey, string>;
    fromLabel: string;
    toLabel: string;
    swapBtn: string;
    placeholder: string;
    result: string;
    quickLinks: string;
    invalidInput: string;
  }
> = {
  ko: {
    title: "단위 변환기",
    subtitle: "길이, 무게, 온도 등 다양한 단위를 빠르게 변환하세요",
    categories: {
      length:      "길이",
      weight:      "무게",
      temperature: "온도",
      area:        "넓이",
      volume:      "부피",
      speed:       "속도",
      data:        "데이터",
    },
    fromLabel:    "변환할 값",
    toLabel:      "변환 결과",
    swapBtn:      "↔ 바꾸기",
    placeholder:  "숫자를 입력하세요",
    result:       "결과",
    quickLinks:   "빠른 변환",
    invalidInput: "올바른 숫자를 입력하세요",
  },
  en: {
    title: "Unit Converter",
    subtitle: "Convert length, weight, temperature and more instantly",
    categories: {
      length:      "Length",
      weight:      "Weight",
      temperature: "Temp",
      area:        "Area",
      volume:      "Volume",
      speed:       "Speed",
      data:        "Data",
    },
    fromLabel:    "From",
    toLabel:      "To",
    swapBtn:      "↔ Swap",
    placeholder:  "Enter a number",
    result:       "Result",
    quickLinks:   "Quick Links",
    invalidInput: "Please enter a valid number",
  },
  ja: {
    title: "単位変換ツール",
    subtitle: "長さ・重さ・温度などをすばやく変換",
    categories: {
      length:      "長さ",
      weight:      "重さ",
      temperature: "温度",
      area:        "面積",
      volume:      "体積",
      speed:       "速度",
      data:        "データ",
    },
    fromLabel:    "変換元",
    toLabel:      "変換先",
    swapBtn:      "↔ 入替",
    placeholder:  "数値を入力",
    result:       "結果",
    quickLinks:   "クイック変換",
    invalidInput: "正しい数値を入力してください",
  },
  zh: {
    title: "单位换算器",
    subtitle: "快速换算长度、重量、温度等各种单位",
    categories: {
      length:      "长度",
      weight:      "重量",
      temperature: "温度",
      area:        "面积",
      volume:      "体积",
      speed:       "速度",
      data:        "数据",
    },
    fromLabel:    "输入",
    toLabel:      "结果",
    swapBtn:      "↔ 互换",
    placeholder:  "请输入数值",
    result:       "结果",
    quickLinks:   "快捷换算",
    invalidInput: "请输入有效数字",
  },
  es: {
    title: "Convertidor de Unidades",
    subtitle: "Convierte longitud, peso, temperatura y más al instante",
    categories: {
      length:      "Longitud",
      weight:      "Peso",
      temperature: "Temp",
      area:        "Área",
      volume:      "Volumen",
      speed:       "Velocidad",
      data:        "Datos",
    },
    fromLabel:    "De",
    toLabel:      "A",
    swapBtn:      "↔ Invertir",
    placeholder:  "Ingresa un número",
    result:       "Resultado",
    quickLinks:   "Accesos rápidos",
    invalidInput: "Ingresa un número válido",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatResult(value: number): string {
  if (!isFinite(value)) return "—";
  if (Math.abs(value) >= 1e12 || (Math.abs(value) < 1e-6 && value !== 0)) {
    return value.toExponential(6);
  }
  // Up to 10 significant figures, strip trailing zeros
  const str = parseFloat(value.toPrecision(10)).toString();
  return str;
}

function convert(value: number, fromUnit: UnitDef, toUnit: UnitDef): number {
  const base = fromUnit.toBase(value);
  return toUnit.fromBase(base);
}

// ─── Component ────────────────────────────────────────────────────────────────

const CATEGORY_KEYS: CategoryKey[] = [
  "length", "weight", "temperature", "area", "volume", "speed", "data",
];

export default function UnitConverterPage() {
  const locale = useLocale() as Locale;
  const t = translations[locale] ?? translations.ko;

  const [activeCategory, setActiveCategory] = useState<CategoryKey>("length");
  const units = CATEGORY_UNITS[activeCategory];

  const [fromKey, setFromKey] = useState<string>(units[0].key);
  const [toKey, setToKey]     = useState<string>(units[1].key);
  const [inputVal, setInputVal] = useState<string>("1");

  const getUnit = useCallback(
    (key: string, unitList: UnitDef[]) => unitList.find((u) => u.key === key) ?? unitList[0],
    []
  );

  const handleCategoryChange = (cat: CategoryKey) => {
    const newUnits = CATEGORY_UNITS[cat];
    setActiveCategory(cat);
    setFromKey(newUnits[0].key);
    setToKey(newUnits[1].key);
    setInputVal("1");
  };

  const handleSwap = () => {
    setFromKey(toKey);
    setToKey(fromKey);
  };

  const handleQuickLink = (ql: QuickLink) => {
    handleCategoryChange(ql.category);
    const newUnits = CATEGORY_UNITS[ql.category];
    const fromExists = newUnits.find((u) => u.key === ql.from);
    const toExists   = newUnits.find((u) => u.key === ql.to);
    if (fromExists) setFromKey(ql.from);
    if (toExists)   setToKey(ql.to);
    setInputVal("1");
  };

  // Compute result
  const numInput = parseFloat(inputVal);
  const isValid  = inputVal.trim() !== "" && !isNaN(numInput);

  const currentUnits = CATEGORY_UNITS[activeCategory];
  const fromUnit = getUnit(fromKey, currentUnits);
  const toUnit   = getUnit(toKey, currentUnits);

  const resultValue  = isValid ? convert(numInput, fromUnit, toUnit) : null;
  const resultString = resultValue !== null ? formatResult(resultValue) : "—";

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/20 dark:from-slate-950 dark:via-indigo-950/20 dark:to-violet-950/10">
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                {t.title}
              </h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t.subtitle}</p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-4 overflow-x-auto"
          >
            <div className="flex gap-2 min-w-max pb-1">
              {CATEGORY_KEYS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-sm"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600"
                  }`}
                >
                  {t.categories[cat]}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Converter Card */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 mb-4"
          >
            {/* From */}
            <div className="mb-3">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">
                {t.fromLabel}
              </label>
              <div className="flex gap-2">
                <select
                  value={fromKey}
                  onChange={(e) => setFromKey(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  {currentUnits.map((u) => (
                    <option key={u.key} value={u.key}>{u.label}</option>
                  ))}
                </select>
                <input
                  type="number"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={t.placeholder}
                  className="flex-[2] rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 tabular-nums"
                />
              </div>
            </div>

            {/* Swap button */}
            <div className="flex justify-center mb-3">
              <button
                onClick={handleSwap}
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:from-indigo-600 hover:to-violet-600 transition-all shadow-sm"
              >
                {t.swapBtn}
              </button>
            </div>

            {/* To */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">
                {t.toLabel}
              </label>
              <div className="flex gap-2">
                <select
                  value={toKey}
                  onChange={(e) => setToKey(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  {currentUnits.map((u) => (
                    <option key={u.key} value={u.key}>{u.label}</option>
                  ))}
                </select>
                <div className="flex-[2] rounded-xl border border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-2.5 text-sm tabular-nums font-semibold text-indigo-700 dark:text-indigo-300 flex items-center">
                  {isValid ? resultString : <span className="text-slate-400 dark:text-slate-500 font-normal text-xs">{t.invalidInput}</span>}
                </div>
              </div>
            </div>

            {/* Equation line */}
            {isValid && (
              <div className="text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 rounded-xl px-3 py-2">
                {inputVal} {fromUnit.label} = {resultString} {toUnit.label}
              </div>
            )}
          </motion.div>

          {/* Ad Banner */}
          <div className="mb-4">
            <AdBanner format="horizontal" />
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 mb-4"
          >
            <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">
              {t.quickLinks}
            </h2>
            <div className="flex flex-wrap gap-2">
              {QUICK_LINKS.map((ql) => (
                <button
                  key={ql.label}
                  onClick={() => handleQuickLink(ql)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition-all bg-slate-50 dark:bg-slate-700"
                >
                  {ql.label}
                </button>
              ))}
            </div>
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
