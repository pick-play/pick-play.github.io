"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/hooks/useLocale";

const translations = {
  ko: {
    title: "랜덤 숫자 생성기",
    subtitle: "무작위 번호를 빠르게 생성하세요",
    presetsLabel: "빠른 프리셋",
    presets: [
      { label: "로또", min: 1, max: 45, count: 6, allowDup: false },
      { label: "주사위", min: 1, max: 6, count: 1, allowDup: true },
      { label: "동전", min: 1, max: 2, count: 1, allowDup: true },
    ],
    minLabel: "최솟값",
    maxLabel: "최댓값",
    countLabel: "생성 개수",
    allowDupLabel: "중복 허용",
    generateBtn: "숫자 생성",
    generating: "생성 중...",
    sortLabel: "정렬",
    sortNone: "없음",
    sortAsc: "오름차순",
    sortDesc: "내림차순",
    sumLabel: "합계",
    avgLabel: "평균",
    historyLabel: "최근 기록",
    historyEmpty: "아직 생성 기록이 없습니다",
    errorMinMax: "최솟값은 최댓값보다 작아야 합니다",
    errorCount: "범위 내 숫자 개수보다 많은 개수를 중복 없이 생성할 수 없습니다",
    errorCountRange: "생성 개수는 1~100 사이여야 합니다",
    coin1: "앞면",
    coin2: "뒷면",
    faqTitle: "자주 묻는 질문",
    faq: [
      {
        q: "로또 번호 생성은 어떻게 하나요?",
        a: "상단의 '로또' 프리셋을 클릭하면 1~45 범위에서 중복 없이 6개 번호가 자동으로 설정됩니다. 생성 버튼을 누르면 바로 번호가 나옵니다.",
      },
      {
        q: "중복 없이 여러 숫자를 생성할 수 있나요?",
        a: "네! '중복 허용' 토글을 끄면 지정한 범위 내에서 중복 없이 숫자를 뽑습니다. 단, 생성 개수가 범위(최댓값-최솟값+1)보다 많으면 오류가 납니다.",
      },
      {
        q: "생성된 숫자를 정렬할 수 있나요?",
        a: "네! 결과 아래의 정렬 옵션에서 오름차순 또는 내림차순을 선택할 수 있습니다.",
      },
    ],
  },
  en: {
    title: "Random Number Generator",
    subtitle: "Generate random numbers instantly",
    presetsLabel: "Quick Presets",
    presets: [
      { label: "Lotto", min: 1, max: 45, count: 6, allowDup: false },
      { label: "Dice", min: 1, max: 6, count: 1, allowDup: true },
      { label: "Coin", min: 1, max: 2, count: 1, allowDup: true },
    ],
    minLabel: "Min",
    maxLabel: "Max",
    countLabel: "Count",
    allowDupLabel: "Allow Duplicates",
    generateBtn: "Generate",
    generating: "Generating...",
    sortLabel: "Sort",
    sortNone: "None",
    sortAsc: "Ascending",
    sortDesc: "Descending",
    sumLabel: "Sum",
    avgLabel: "Average",
    historyLabel: "Recent History",
    historyEmpty: "No history yet",
    errorMinMax: "Min must be less than Max",
    errorCount: "Cannot generate that many unique numbers in the given range",
    errorCountRange: "Count must be between 1 and 100",
    coin1: "Heads",
    coin2: "Tails",
    faqTitle: "FAQ",
    faq: [
      {
        q: "How do I generate lottery numbers?",
        a: "Click the 'Lotto' preset to automatically set the range to 1–45 with 6 unique numbers. Then press Generate.",
      },
      {
        q: "Can I generate numbers without duplicates?",
        a: "Yes! Turn off the 'Allow Duplicates' toggle to pick unique numbers. Note that the count must not exceed the range size (max - min + 1).",
      },
      {
        q: "Can I sort the results?",
        a: "Yes! Use the sort options below the results to arrange numbers in ascending or descending order.",
      },
    ],
  },
  ja: {
    title: "ランダム数字ジェネレーター",
    subtitle: "無作為な数字を素早く生成",
    presetsLabel: "クイックプリセット",
    presets: [
      { label: "ロト", min: 1, max: 45, count: 6, allowDup: false },
      { label: "サイコロ", min: 1, max: 6, count: 1, allowDup: true },
      { label: "コイン", min: 1, max: 2, count: 1, allowDup: true },
    ],
    minLabel: "最小値",
    maxLabel: "最大値",
    countLabel: "生成数",
    allowDupLabel: "重複を許可",
    generateBtn: "生成",
    generating: "生成中...",
    sortLabel: "並び替え",
    sortNone: "なし",
    sortAsc: "昇順",
    sortDesc: "降順",
    sumLabel: "合計",
    avgLabel: "平均",
    historyLabel: "最近の履歴",
    historyEmpty: "まだ履歴がありません",
    errorMinMax: "最小値は最大値より小さくしてください",
    errorCount: "指定の範囲内でその数の一意な数値を生成できません",
    errorCountRange: "生成数は1〜100の間で設定してください",
    coin1: "表",
    coin2: "裏",
    faqTitle: "よくある質問",
    faq: [
      {
        q: "ロト番号の生成方法は？",
        a: "「ロト」プリセットをクリックすると1〜45の範囲で重複なし6個の設定が自動で入ります。生成ボタンを押してください。",
      },
      {
        q: "重複なしで複数の数字を生成できますか？",
        a: "はい！「重複を許可」トグルをオフにすると、指定範囲内で重複なしの数字を生成します。生成数が範囲サイズを超えないよう注意してください。",
      },
      {
        q: "結果を並び替えできますか？",
        a: "はい！結果の下の並び替えオプションで昇順・降順を選択できます。",
      },
    ],
  },
  zh: {
    title: "随机数字生成器",
    subtitle: "快速生成随机数字",
    presetsLabel: "快速预设",
    presets: [
      { label: "彩票", min: 1, max: 45, count: 6, allowDup: false },
      { label: "骰子", min: 1, max: 6, count: 1, allowDup: true },
      { label: "硬币", min: 1, max: 2, count: 1, allowDup: true },
    ],
    minLabel: "最小值",
    maxLabel: "最大值",
    countLabel: "生成数量",
    allowDupLabel: "允许重复",
    generateBtn: "生成",
    generating: "生成中...",
    sortLabel: "排序",
    sortNone: "无",
    sortAsc: "升序",
    sortDesc: "降序",
    sumLabel: "总和",
    avgLabel: "平均值",
    historyLabel: "最近记录",
    historyEmpty: "暂无记录",
    errorMinMax: "最小值必须小于最大值",
    errorCount: "在给定范围内无法生成那么多不重复的数字",
    errorCountRange: "数量必须在1到100之间",
    coin1: "正面",
    coin2: "反面",
    faqTitle: "常见问题",
    faq: [
      {
        q: "如何生成彩票号码？",
        a: "点击「彩票」预设，系统会自动设置1~45范围、生成6个不重复的数字。点击生成按钮即可。",
      },
      {
        q: "可以生成不重复的数字吗？",
        a: "可以！关闭「允许重复」开关，即可在指定范围内生成不重复的数字。注意生成数量不能超过范围大小。",
      },
      {
        q: "可以对结果排序吗？",
        a: "可以！在结果下方的排序选项中选择升序或降序。",
      },
    ],
  },
  es: {
    title: "Generador de Números Aleatorios",
    subtitle: "Genera números al azar al instante",
    presetsLabel: "Presets Rápidos",
    presets: [
      { label: "Lotería", min: 1, max: 45, count: 6, allowDup: false },
      { label: "Dado", min: 1, max: 6, count: 1, allowDup: true },
      { label: "Moneda", min: 1, max: 2, count: 1, allowDup: true },
    ],
    minLabel: "Mínimo",
    maxLabel: "Máximo",
    countLabel: "Cantidad",
    allowDupLabel: "Permitir duplicados",
    generateBtn: "Generar",
    generating: "Generando...",
    sortLabel: "Ordenar",
    sortNone: "Sin orden",
    sortAsc: "Ascendente",
    sortDesc: "Descendente",
    sumLabel: "Suma",
    avgLabel: "Promedio",
    historyLabel: "Historial reciente",
    historyEmpty: "Sin historial todavía",
    errorMinMax: "El mínimo debe ser menor que el máximo",
    errorCount: "No se pueden generar tantos números únicos en el rango dado",
    errorCountRange: "La cantidad debe estar entre 1 y 100",
    coin1: "Cara",
    coin2: "Cruz",
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Cómo genero números de lotería?",
        a: "Haz clic en el preset 'Lotería' para configurar automáticamente el rango 1–45 con 6 números únicos. Luego presiona Generar.",
      },
      {
        q: "¿Puedo generar números sin duplicados?",
        a: "¡Sí! Desactiva el toggle 'Permitir duplicados' para obtener números únicos. La cantidad no debe superar el tamaño del rango (máx - mín + 1).",
      },
      {
        q: "¿Puedo ordenar los resultados?",
        a: "¡Sí! Usa las opciones de orden debajo de los resultados para ordenarlos de forma ascendente o descendente.",
      },
    ],
  },
};

type SortOrder = "none" | "asc" | "desc";

interface HistoryEntry {
  numbers: number[];
  min: number;
  max: number;
  count: number;
  timestamp: number;
}

export default function RandomNumberPage() {
  const locale = useLocale();
  const lang = locale as keyof typeof translations;
  const t = translations[lang] ?? translations.ko;

  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [allowDup, setAllowDup] = useState(true);
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);

  const applyPreset = useCallback(
    (preset: { min: number; max: number; count: number; allowDup: boolean }) => {
      setMin(preset.min);
      setMax(preset.max);
      setCount(preset.count);
      setAllowDup(preset.allowDup);
      setError("");
      setResults([]);
      setHasGenerated(false);
    },
    []
  );

  const generate = useCallback(() => {
    setError("");
    if (min >= max) {
      setError(t.errorMinMax);
      return;
    }
    if (count < 1 || count > 100) {
      setError(t.errorCountRange);
      return;
    }
    const rangeSize = max - min + 1;
    if (!allowDup && count > rangeSize) {
      setError(t.errorCount);
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      let nums: number[];
      if (allowDup) {
        const arr = new Uint32Array(count);
        crypto.getRandomValues(arr);
        nums = Array.from(arr, (n) => (n % rangeSize) + min);
      } else {
        const pool = Array.from({ length: rangeSize }, (_, i) => min + i);
        const randArr = new Uint32Array(pool.length);
        crypto.getRandomValues(randArr);
        for (let i = pool.length - 1; i > 0; i--) {
          const j = randArr[i] % (i + 1);
          [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        nums = pool.slice(0, count);
      }

      setResults(nums);
      setHasGenerated(true);
      setIsGenerating(false);
      setHistory((prev) => [
        { numbers: nums, min, max, count, timestamp: Date.now() },
        ...prev.slice(0, 4),
      ]);
    }, 400);
  }, [min, max, count, allowDup, t]);

  const getSorted = (nums: number[]) => {
    if (sortOrder === "asc") return [...nums].sort((a, b) => a - b);
    if (sortOrder === "desc") return [...nums].sort((a, b) => b - a);
    return nums;
  };

  const displayResults = getSorted(results);
  const sum = results.reduce((a, b) => a + b, 0);
  const avg = results.length > 0 ? (sum / results.length).toFixed(2) : "0";

  const getNumberLabel = (num: number) => {
    if (min === 1 && max === 2) {
      return num === 1 ? t.coin1 : t.coin2;
    }
    return String(num);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/20 dark:from-slate-950 dark:via-amber-950/20 dark:to-orange-950/10">
        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-1">
              {t.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{t.subtitle}</p>
          </div>

          <AdBanner format="horizontal" />

          {/* Presets */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-4">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
              {t.presetsLabel}
            </p>
            <div className="flex gap-2 flex-wrap">
              {t.presets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => applyPreset(preset)}
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-800/40 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                  {t.minLabel}
                </label>
                <input
                  type="number"
                  value={min}
                  onChange={(e) => { setMin(Number(e.target.value)); setError(""); setResults([]); setHasGenerated(false); }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                  {t.maxLabel}
                </label>
                <input
                  type="number"
                  value={max}
                  onChange={(e) => { setMax(Number(e.target.value)); setError(""); setResults([]); setHasGenerated(false); }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                {t.countLabel}
              </label>
              <input
                type="number"
                min={1}
                max={100}
                value={count}
                onChange={(e) => { setCount(Number(e.target.value)); setError(""); setResults([]); setHasGenerated(false); }}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Allow Duplicates Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t.allowDupLabel}
              </span>
              <button
                onClick={() => { setAllowDup((v) => !v); setError(""); }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  allowDup ? "bg-amber-500" : "bg-slate-300 dark:bg-slate-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    allowDup ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-xl text-red-600 dark:text-red-400 text-sm text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Generate Button */}
          <button
            onClick={generate}
            disabled={isGenerating}
            className="w-full py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all mb-4"
          >
            {isGenerating ? t.generating : t.generateBtn}
          </button>

          {/* Results */}
          <AnimatePresence mode="wait">
            {hasGenerated && !isGenerating && displayResults.length > 0 && (
              <motion.div
                key={displayResults.join(",")}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-4"
              >
                <div className="flex flex-wrap gap-3 justify-center mb-4">
                  {displayResults.map((num, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20, delay: i * 0.05 }}
                      className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white font-bold text-xl shadow-md"
                    >
                      {getNumberLabel(num)}
                    </motion.div>
                  ))}
                </div>

                {/* Sort Options */}
                <div className="flex items-center gap-2 justify-center mb-4">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {t.sortLabel}:
                  </span>
                  {(["none", "asc", "desc"] as SortOrder[]).map((order) => (
                    <button
                      key={order}
                      onClick={() => setSortOrder(order)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                        sortOrder === order
                          ? "bg-amber-500 text-white"
                          : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                      }`}
                    >
                      {order === "none" ? t.sortNone : order === "asc" ? t.sortAsc : t.sortDesc}
                    </button>
                  ))}
                </div>

                {/* Sum & Average */}
                {results.length > 1 && (
                  <div className="flex gap-4 justify-center">
                    <div className="text-center">
                      <p className="text-xs text-slate-400 dark:text-slate-500">{t.sumLabel}</p>
                      <p className="text-lg font-bold text-amber-600 dark:text-amber-400">{sum}</p>
                    </div>
                    <div className="w-px bg-slate-200 dark:bg-slate-600" />
                    <div className="text-center">
                      <p className="text-xs text-slate-400 dark:text-slate-500">{t.avgLabel}</p>
                      <p className="text-lg font-bold text-orange-600 dark:text-orange-400">{avg}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <AdBanner format="rectangle" />

          {/* History */}
          {history.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mt-4">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                {t.historyLabel}
              </p>
              <div className="space-y-2">
                {history.map((entry, i) => (
                  <div
                    key={entry.timestamp}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${
                      i === 0
                        ? "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700"
                        : "bg-slate-50 dark:bg-slate-700/50"
                    }`}
                  >
                    <span className="text-slate-400 dark:text-slate-500 text-xs shrink-0">
                      {entry.min}–{entry.max}
                    </span>
                    <span className="flex-1 font-mono text-slate-700 dark:text-slate-200 truncate">
                      {[...entry.numbers].sort((a, b) => a - b).join(", ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ */}
          <div className="mt-8">
            <h2 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4">
              {t.faqTitle}
            </h2>
            <div className="space-y-3">
              {t.faq.map((item, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700"
                >
                  <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1 text-sm">
                    {item.q}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
