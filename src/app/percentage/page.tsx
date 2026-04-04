"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/i18n/config";

const translations: Record<Locale, {
  title: string;
  subtitle: string;
  tab1: string;
  tab2: string;
  tab3: string;
  inputX: string;
  inputY: string;
  result: string;
  quickButtons: string;
  tipSection: string;
  billAmount: string;
  tipPercent: string;
  tipAmount: string;
  total: string;
  faqTitle: string;
  modeLabels: [string, string, string];
  faq: { q: string; a: string }[];
}> = {
  ko: {
    title: "퍼센트 계산기",
    subtitle: "백분율을 쉽고 빠르게 계산하세요",
    tab1: "X의 Y%는?",
    tab2: "X는 Y의 몇 %?",
    tab3: "변화율",
    inputX: "X (기준값)",
    inputY: "Y (%)",
    result: "결과",
    quickButtons: "빠른 선택",
    tipSection: "팁 계산기",
    billAmount: "금액",
    tipPercent: "팁 %",
    tipAmount: "팁 금액",
    total: "합계",
    faqTitle: "자주 묻는 질문",
    modeLabels: ["X의 Y%", "X는 Y의 몇 %?", "변화율 (X → Y)"],
    faq: [
      {
        q: "퍼센트(%)란 무엇인가요?",
        a: "퍼센트는 전체를 100으로 봤을 때의 비율입니다. 예를 들어 200의 15%는 200 × 0.15 = 30입니다.",
      },
      {
        q: "변화율은 어떻게 계산하나요?",
        a: "변화율(%) = (새 값 - 원래 값) ÷ 원래 값 × 100 입니다. 예를 들어 100에서 150으로 바뀌면 (150-100)÷100×100 = +50%입니다.",
      },
      {
        q: "팁 계산기는 어떻게 사용하나요?",
        a: "금액과 팁 퍼센트를 입력하면 팁 금액과 최종 합계가 자동으로 계산됩니다.",
      },
    ],
  },
  en: {
    title: "Percentage Calculator",
    subtitle: "Calculate percentages quickly and easily",
    tab1: "Y% of X",
    tab2: "X is what % of Y?",
    tab3: "% Change",
    inputX: "X (base value)",
    inputY: "Y (%)",
    result: "Result",
    quickButtons: "Quick Select",
    tipSection: "Tip Calculator",
    billAmount: "Bill Amount",
    tipPercent: "Tip %",
    tipAmount: "Tip Amount",
    total: "Total",
    faqTitle: "FAQ",
    modeLabels: ["Y% of X", "X is what % of Y?", "% Change (X → Y)"],
    faq: [
      {
        q: "What is a percentage?",
        a: "A percentage represents a ratio out of 100. For example, 15% of 200 = 200 × 0.15 = 30.",
      },
      {
        q: "How is percentage change calculated?",
        a: "% Change = (New Value - Original Value) ÷ Original Value × 100. For example, from 100 to 150: (150-100)÷100×100 = +50%.",
      },
      {
        q: "How do I use the tip calculator?",
        a: "Enter your bill amount and the tip percentage. The tip amount and total will be calculated automatically.",
      },
    ],
  },
  ja: {
    title: "パーセント計算機",
    subtitle: "割合を素早く簡単に計算",
    tab1: "XのY%は？",
    tab2: "XはYの何%？",
    tab3: "変化率",
    inputX: "X（基準値）",
    inputY: "Y（%）",
    result: "結果",
    quickButtons: "クイック選択",
    tipSection: "チップ計算機",
    billAmount: "金額",
    tipPercent: "チップ %",
    tipAmount: "チップ金額",
    total: "合計",
    faqTitle: "よくある質問",
    modeLabels: ["XのY%", "XはYの何%？", "変化率（X → Y）"],
    faq: [
      {
        q: "パーセントとは何ですか？",
        a: "パーセントは全体を100としたときの割合です。例えば200の15%は200×0.15=30です。",
      },
      {
        q: "変化率はどのように計算しますか？",
        a: "変化率(%) = (新しい値 - 元の値) ÷ 元の値 × 100 です。100から150になった場合は(150-100)÷100×100=+50%です。",
      },
      {
        q: "チップ計算機の使い方は？",
        a: "金額とチップのパーセントを入力すると、チップ金額と合計が自動的に計算されます。",
      },
    ],
  },
  zh: {
    title: "百分比计算器",
    subtitle: "快速轻松地计算百分比",
    tab1: "X的Y%是多少？",
    tab2: "X是Y的百分之几？",
    tab3: "变化率",
    inputX: "X（基准值）",
    inputY: "Y（%）",
    result: "结果",
    quickButtons: "快速选择",
    tipSection: "小费计算器",
    billAmount: "金额",
    tipPercent: "小费 %",
    tipAmount: "小费金额",
    total: "合计",
    faqTitle: "常见问题",
    modeLabels: ["X的Y%", "X是Y的百分之几？", "变化率（X → Y）"],
    faq: [
      {
        q: "什么是百分比？",
        a: "百分比表示以100为基础的比率。例如，200的15%等于200×0.15=30。",
      },
      {
        q: "如何计算变化率？",
        a: "变化率(%) = 「新值 - 原值」÷ 原值 × 100。例如从100变为150：「150-100」÷100×100 = +50%。",
      },
      {
        q: "如何使用小费计算器？",
        a: "输入账单金额和小费百分比，小费金额和总计将自动计算。",
      },
    ],
  },
  es: {
    title: "Calculadora de Porcentajes",
    subtitle: "Calcula porcentajes de forma rápida y sencilla",
    tab1: "Y% de X",
    tab2: "X es qué % de Y?",
    tab3: "Variación %",
    inputX: "X (valor base)",
    inputY: "Y (%)",
    result: "Resultado",
    quickButtons: "Selección rápida",
    tipSection: "Calculadora de propina",
    billAmount: "Importe",
    tipPercent: "Propina %",
    tipAmount: "Propina",
    total: "Total",
    faqTitle: "Preguntas frecuentes",
    modeLabels: ["Y% de X", "X es qué % de Y?", "Variación % (X → Y)"],
    faq: [
      {
        q: "¿Qué es un porcentaje?",
        a: "Un porcentaje representa una proporción sobre 100. Por ejemplo, el 15% de 200 = 200 × 0,15 = 30.",
      },
      {
        q: "¿Cómo se calcula la variación porcentual?",
        a: "Variación % = (Valor nuevo - Valor original) ÷ Valor original × 100. De 100 a 150: (150-100)÷100×100 = +50%.",
      },
      {
        q: "¿Cómo uso la calculadora de propina?",
        a: "Introduce el importe de la cuenta y el porcentaje de propina. El importe de la propina y el total se calculan automáticamente.",
      },
    ],
  },
};

const QUICK_PERCENTS = [10, 15, 20, 25, 50, 75];

type Mode = "of" | "what" | "change";

function formatNum(n: number): string {
  if (!isFinite(n)) return "—";
  const rounded = Math.round(n * 100) / 100;
  return rounded.toLocaleString();
}

export default function PercentagePage() {
  const locale = useLocale();
  const t = translations[locale] ?? translations.ko;

  const [mode, setMode] = useState<Mode>("of");

  // Mode 1: what is Y% of X?
  const [ofX, setOfX] = useState("");
  const [ofY, setOfY] = useState("");

  // Mode 2: X is what % of Y?
  const [whatX, setWhatX] = useState("");
  const [whatY, setWhatY] = useState("");

  // Mode 3: % change from X to Y
  const [changeX, setChangeX] = useState("");
  const [changeY, setChangeY] = useState("");

  // Tip calculator
  const [bill, setBill] = useState("");
  const [tipPct, setTipPct] = useState("15");

  // Calculations
  const ofResult = ofX && ofY ? (parseFloat(ofX) * parseFloat(ofY)) / 100 : null;
  const whatResult = whatX && whatY && parseFloat(whatY) !== 0
    ? (parseFloat(whatX) / parseFloat(whatY)) * 100
    : null;
  const changeResult = changeX && changeY && parseFloat(changeX) !== 0
    ? ((parseFloat(changeY) - parseFloat(changeX)) / Math.abs(parseFloat(changeX))) * 100
    : null;

  const billNum = parseFloat(bill) || 0;
  const tipPctNum = parseFloat(tipPct) || 0;
  const tipAmount = (billNum * tipPctNum) / 100;
  const tipTotal = billNum + tipAmount;

  // Progress bar value (0–100)
  function getProgressBar(): number {
    if (mode === "of" && ofResult !== null && ofX) {
      const base = parseFloat(ofX);
      if (base > 0) return Math.min(100, Math.max(0, (ofResult / base) * 100));
    }
    if (mode === "what" && whatResult !== null) {
      return Math.min(100, Math.max(0, whatResult));
    }
    if (mode === "change" && changeResult !== null) {
      return Math.min(100, Math.max(0, changeResult));
    }
    return 0;
  }

  const progressVal = getProgressBar();

  function getResultDisplay(): string {
    if (mode === "of") return ofResult !== null ? formatNum(ofResult) : "—";
    if (mode === "what") return whatResult !== null ? `${formatNum(whatResult)}%` : "—";
    if (mode === "change") {
      if (changeResult === null) return "—";
      return `${changeResult >= 0 ? "+" : ""}${formatNum(changeResult)}%`;
    }
    return "—";
  }

  const resultDisplay = getResultDisplay();
  const isPositiveChange = mode === "change" && changeResult !== null && changeResult >= 0;
  const isNegativeChange = mode === "change" && changeResult !== null && changeResult < 0;

  const MODES: { key: Mode; label: string }[] = [
    { key: "of", label: t.tab1 },
    { key: "what", label: t.tab2 },
    { key: "change", label: t.tab3 },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-emerald-50/20 dark:from-slate-950 dark:via-green-950/20 dark:to-emerald-950/10">
        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg mb-3">
              <span className="text-2xl font-bold text-white">%</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {t.title}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Ad top */}
          <AdBanner
            format="horizontal"
            className="mb-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
          />

          {/* Mode tabs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-1.5 shadow-sm border border-slate-200 dark:border-slate-700 mb-5 flex"
          >
            {MODES.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setMode(key)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                  mode === key
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>

          {/* Calculator card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-5"
            >
              {/* Mode description */}
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-4">
                {t.modeLabels[mode === "of" ? 0 : mode === "what" ? 1 : 2]}
              </p>

              {mode === "of" && (
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">
                        X
                      </label>
                      <input
                        type="number"
                        placeholder="200"
                        value={ofX}
                        onChange={(e) => setOfX(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-sm font-medium border-none outline-none focus:ring-2 focus:ring-green-400"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">
                        Y %
                      </label>
                      <input
                        type="number"
                        placeholder="15"
                        value={ofY}
                        onChange={(e) => setOfY(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-sm font-medium border-none outline-none focus:ring-2 focus:ring-green-400"
                      />
                    </div>
                  </div>
                  {/* Quick % buttons */}
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">{t.quickButtons}</p>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_PERCENTS.map((p) => (
                        <button
                          key={p}
                          onClick={() => setOfY(String(p))}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                            ofY === String(p)
                              ? "bg-green-500 text-white"
                              : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-green-100 dark:hover:bg-green-900/40"
                          }`}
                        >
                          {p}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {mode === "what" && (
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">X</label>
                    <input
                      type="number"
                      placeholder="30"
                      value={whatX}
                      onChange={(e) => setWhatX(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-sm font-medium border-none outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">Y</label>
                    <input
                      type="number"
                      placeholder="200"
                      value={whatY}
                      onChange={(e) => setWhatY(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-sm font-medium border-none outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>
                </div>
              )}

              {mode === "change" && (
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">
                      {locale === "ko" ? "원래 값 (X)" : locale === "ja" ? "元の値 (X)" : locale === "zh" ? "原值 (X)" : locale === "es" ? "Valor original (X)" : "From (X)"}
                    </label>
                    <input
                      type="number"
                      placeholder="100"
                      value={changeX}
                      onChange={(e) => setChangeX(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-sm font-medium border-none outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">
                      {locale === "ko" ? "새 값 (Y)" : locale === "ja" ? "新しい値 (Y)" : locale === "zh" ? "新值 (Y)" : locale === "es" ? "Valor nuevo (Y)" : "To (Y)"}
                    </label>
                    <input
                      type="number"
                      placeholder="150"
                      value={changeY}
                      onChange={(e) => setChangeY(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-sm font-medium border-none outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>
                </div>
              )}

              {/* Result display */}
              <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800">
                <p className="text-xs text-green-600 dark:text-green-400 font-semibold mb-1">
                  {t.result}
                </p>
                <motion.p
                  key={resultDisplay}
                  initial={{ scale: 0.92, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`text-4xl font-bold tabular-nums ${
                    isNegativeChange
                      ? "text-red-500 dark:text-red-400"
                      : isPositiveChange
                      ? "text-green-600 dark:text-green-400"
                      : "text-slate-800 dark:text-slate-100"
                  }`}
                >
                  {resultDisplay}
                </motion.p>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 mb-1">
                  <span>0%</span>
                  <span>{Math.min(100, Math.max(0, Math.round(progressVal)))}%</span>
                  <span>100%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, Math.max(0, progressVal))}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Ad in-article */}
          <AdBanner
            format="in-article"
            className="mb-5 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
          />

          {/* Tip calculator */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-5"
          >
            <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4">
              {t.tipSection}
            </h2>
            <div className="flex gap-3 mb-4">
              <div className="flex-1">
                <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">
                  {t.billAmount}
                </label>
                <input
                  type="number"
                  placeholder="50000"
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-sm font-medium border-none outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">
                  {t.tipPercent}
                </label>
                <input
                  type="number"
                  placeholder="15"
                  value={tipPct}
                  onChange={(e) => setTipPct(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-sm font-medium border-none outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>
            {/* Tip quick buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              {QUICK_PERCENTS.map((p) => (
                <button
                  key={p}
                  onClick={() => setTipPct(String(p))}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    tipPct === String(p)
                      ? "bg-green-500 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-green-100 dark:hover:bg-green-900/40"
                  }`}
                >
                  {p}%
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">{t.tipAmount}</p>
                <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  {formatNum(tipAmount)}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800">
                <p className="text-xs text-green-600 dark:text-green-400 mb-1">{t.total}</p>
                <p className="text-lg font-bold text-green-700 dark:text-green-300">
                  {formatNum(tipTotal)}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Ad rectangle */}
          <AdBanner
            format="rectangle"
            className="mb-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
          />

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-base font-bold text-slate-700 dark:text-slate-200 mb-4">
              {t.faqTitle}
            </h2>
            <div className="flex flex-col gap-4">
              {t.faq.map((item, i) => (
                <div key={i}>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    Q. {item.q}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
