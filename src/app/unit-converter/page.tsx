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
    faqTitle: string;
    faqItems: { q: string; a: string }[];
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
    faqTitle: "자주 묻는 질문",
    faqItems: [
      { q: "단위 변환기는 어떤 단위를 지원하나요?", a: "길이(mm, cm, m, km, in, ft, yd, mi), 무게(mg, g, kg, oz, lb, ton), 온도(°C, °F, K), 넓이(mm², cm², m², km², ft², ac, ha), 부피(mL, L, gal, fl oz, cup), 속도(m/s, km/h, mph, knot), 데이터(B, KB, MB, GB, TB) 등 7가지 카테고리를 지원합니다." },
      { q: "온도 변환은 어떻게 작동하나요?", a: "섭씨(°C)와 화씨(°F) 간의 변환은 °F = °C × 9/5 + 32 공식을 사용합니다. 켈빈(K)은 절대영도를 기준으로 하며 K = °C + 273.15 공식으로 변환됩니다. 이 세 온도 단위를 자유롭게 변환할 수 있습니다." },
      { q: "빠른 변환 버튼은 무엇인가요?", a: "빠른 변환 버튼은 자주 사용되는 단위 조합(예: cm→in, kg→lb, °C→°F 등)을 한 번의 클릭으로 바로 설정해주는 기능입니다. 자주 쓰는 변환을 빠르게 이용하고 싶을 때 편리하게 사용할 수 있습니다." },
      { q: "결과가 소수점이 너무 많이 나와요. 어떻게 하나요?", a: "변환 결과는 최대 10자리 유효숫자로 표시되며 불필요한 0은 자동으로 제거됩니다. 매우 크거나 매우 작은 값은 지수 표기법(예: 1.23e-8)으로 표시됩니다." },
    ],
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
    faqTitle: "Frequently Asked Questions",
    faqItems: [
      { q: "What units does the converter support?", a: "The converter supports 7 categories: length (mm, cm, m, km, in, ft, yd, mi), weight (mg, g, kg, oz, lb, ton), temperature (°C, °F, K), area (mm², cm², m², km², ft², ac, ha), volume (mL, L, gal, fl oz, cup), speed (m/s, km/h, mph, knot), and data (B, KB, MB, GB, TB)." },
      { q: "How does temperature conversion work?", a: "Celsius to Fahrenheit uses the formula °F = °C × 9/5 + 32. Kelvin is based on absolute zero with the formula K = °C + 273.15. You can freely convert between all three temperature units." },
      { q: "What are the Quick Link buttons?", a: "Quick Link buttons set up frequently used unit combinations (e.g., cm→in, kg→lb, °C→°F) with a single click, saving you time from manually selecting categories and units each time." },
      { q: "The result has too many decimal places. What do I do?", a: "Conversion results are displayed with up to 10 significant figures, and trailing zeros are automatically removed. Very large or very small values are shown in scientific notation (e.g., 1.23e-8)." },
    ],
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
    faqTitle: "よくある質問",
    faqItems: [
      { q: "単位変換ツールはどの単位に対応していますか？", a: "長さ（mm, cm, m, km, in, ft, yd, mi）、重さ（mg, g, kg, oz, lb, ton）、温度（°C, °F, K）、面積（mm², cm², m², km², ft², ac, ha）、体積（mL, L, gal, fl oz, cup）、速度（m/s, km/h, mph, knot）、データ（B, KB, MB, GB, TB）の7カテゴリに対応しています。" },
      { q: "温度変換はどのように行われますか？", a: "摂氏から華氏への変換は °F = °C × 9/5 + 32 の公式を使用します。ケルビンは絶対零度を基準とし、K = °C + 273.15 で変換されます。3つの温度単位を自由に変換できます。" },
      { q: "クイック変換ボタンとは何ですか？", a: "クイック変換ボタンは、よく使われる単位の組み合わせ（例：cm→in、kg→lb、°C→°F など）をワンクリックで設定できる機能です。毎回カテゴリと単位を手動で選択する手間を省けます。" },
      { q: "結果の小数点が多すぎます。どうすればいいですか？", a: "変換結果は最大10桁の有効数字で表示され、不要な0は自動的に削除されます。非常に大きいまたは小さい値は指数表記（例：1.23e-8）で表示されます。" },
    ],
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
    faqTitle: "常见问题",
    faqItems: [
      { q: "单位换算器支持哪些单位？", a: "支持7个类别：长度（mm, cm, m, km, in, ft, yd, mi）、重量（mg, g, kg, oz, lb, ton）、温度（°C, °F, K）、面积（mm², cm², m², km², ft², ac, ha）、体积（mL, L, gal, fl oz, cup）、速度（m/s, km/h, mph, knot）和数据（B, KB, MB, GB, TB）。" },
      { q: "温度换算是如何工作的？", a: "摄氏转华氏使用公式 °F = °C × 9/5 + 32。开尔文以绝对零度为基准，使用公式 K = °C + 273.15 进行换算。三种温度单位之间可以自由换算。" },
      { q: "「快捷换算」按钮是什么？", a: "快捷换算按钮是一键设置常用单位组合（例如cm→in、kg→lb、°C→°F等）的功能，省去每次手动选择类别和单位的麻烦。" },
      { q: "结果小数点太多怎么办？", a: "换算结果最多显示10位有效数字，多余的零会自动去除。极大或极小的值会以科学计数法（如1.23e-8）显示。" },
    ],
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
    faqTitle: "Preguntas Frecuentes",
    faqItems: [
      { q: "¿Qué unidades soporta el conversor?", a: "El conversor soporta 7 categorías: longitud (mm, cm, m, km, in, ft, yd, mi), peso (mg, g, kg, oz, lb, ton), temperatura (°C, °F, K), área (mm², cm², m², km², ft², ac, ha), volumen (mL, L, gal, fl oz, cup), velocidad (m/s, km/h, mph, knot) y datos (B, KB, MB, GB, TB)." },
      { q: "¿Cómo funciona la conversión de temperatura?", a: "De Celsius a Fahrenheit se usa la fórmula °F = °C × 9/5 + 32. Kelvin se basa en el cero absoluto con la fórmula K = °C + 273.15. Puedes convertir libremente entre las tres unidades de temperatura." },
      { q: "¿Qué son los botones de Accesos rápidos?", a: "Los botones de acceso rápido configuran combinaciones de unidades de uso frecuente (por ejemplo, cm→in, kg→lb, °C→°F) con un solo clic, ahorrándote el tiempo de seleccionar manualmente categorías y unidades cada vez." },
      { q: "El resultado tiene demasiados decimales. ¿Qué hago?", a: "Los resultados se muestran con hasta 10 cifras significativas y los ceros al final se eliminan automáticamente. Los valores muy grandes o pequeños se muestran en notación científica (por ejemplo, 1.23e-8)." },
    ],
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
            <AdBanner format="horizontal" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
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

          {/* FAQ Section */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mt-4">
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
              {t.faqTitle}
            </h2>
            <div className="space-y-2">
              {t.faqItems.map((item: {q: string; a: string}, i: number) => (
                <details key={i} className="group">
                  <summary className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-200 py-2 hover:text-primary-500">
                    {item.q}
                  </summary>
                  <p className="text-sm text-slate-500 dark:text-slate-400 pb-3 pl-4 leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Bottom Ad */}
          <div className="mt-2">
            <AdBanner format="rectangle" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
