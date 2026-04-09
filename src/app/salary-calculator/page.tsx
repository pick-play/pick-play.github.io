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
    annualSalaryLabel: string;
    annualSalaryUnit: string;
    nonTaxableLabel: string;
    nonTaxableDesc: string;
    dependentsLabel: string;
    childrenLabel: string;
    monthlyGross: string;
    monthlyNet: string;
    annualNet: string;
    totalDeductions: string;
    deductionItems: {
      pension: string;
      health: string;
      longTermCare: string;
      employment: string;
      incomeTax: string;
      localTax: string;
    };
    comparisonTitle: string;
    comparisonAnnual: string;
    comparisonMonthlyNet: string;
    comparisonAnnualNet: string;
    wonUnit: string;
    manwonUnit: string;
    personUnit: string;
    people: string;
    totalLabel: string;
  }
> = {
  ko: {
    title: "연봉 실수령액 계산기",
    subtitle: "4대보험 및 세금 자동 계산",
    annualSalaryLabel: "연봉",
    annualSalaryUnit: "만원",
    nonTaxableLabel: "비과세 금액",
    nonTaxableDesc: "식대 등 비과세 항목 (기본 10만원)",
    dependentsLabel: "부양가족 수",
    childrenLabel: "20세 이하 자녀 수",
    monthlyGross: "월 세전 급여",
    monthlyNet: "월 실수령액",
    annualNet: "연 실수령액",
    totalDeductions: "공제 내역",
    deductionItems: {
      pension: "국민연금",
      health: "건강보험",
      longTermCare: "장기요양보험",
      employment: "고용보험",
      incomeTax: "소득세",
      localTax: "지방소득세",
    },
    comparisonTitle: "연봉별 실수령액 비교",
    comparisonAnnual: "연봉",
    comparisonMonthlyNet: "월 실수령액",
    comparisonAnnualNet: "연 실수령액",
    wonUnit: "원",
    manwonUnit: "만원",
    personUnit: "명",
    people: "명",
    totalLabel: "합계",
  },
  en: {
    title: "Salary Net Pay Calculator",
    subtitle: "Auto-calculate tax & social insurance",
    annualSalaryLabel: "Annual Salary",
    annualSalaryUnit: "10K KRW",
    nonTaxableLabel: "Non-taxable Amount",
    nonTaxableDesc: "Meal allowance etc. (default 100,000 KRW)",
    dependentsLabel: "Number of Dependents",
    childrenLabel: "Children under 20",
    monthlyGross: "Monthly Gross Pay",
    monthlyNet: "Monthly Net Pay",
    annualNet: "Annual Net Pay",
    totalDeductions: "Deductions",
    deductionItems: {
      pension: "National Pension",
      health: "Health Insurance",
      longTermCare: "Long-term Care",
      employment: "Employment Insurance",
      incomeTax: "Income Tax",
      localTax: "Local Income Tax",
    },
    comparisonTitle: "Net Pay by Salary Level",
    comparisonAnnual: "Annual Salary",
    comparisonMonthlyNet: "Monthly Net",
    comparisonAnnualNet: "Annual Net",
    wonUnit: "KRW",
    manwonUnit: "10K",
    personUnit: "",
    people: "people",
    totalLabel: "Total",
  },
  ja: {
    title: "年収手取り計算機",
    subtitle: "社会保険・税金を自動計算",
    annualSalaryLabel: "年収",
    annualSalaryUnit: "万ウォン",
    nonTaxableLabel: "非課税額",
    nonTaxableDesc: "食事手当など（デフォルト10万ウォン）",
    dependentsLabel: "扶養家族数",
    childrenLabel: "20歳以下の子供数",
    monthlyGross: "月額総支給",
    monthlyNet: "月額手取り",
    annualNet: "年間手取り",
    totalDeductions: "控除内訳",
    deductionItems: {
      pension: "国民年金",
      health: "健康保険",
      longTermCare: "介護保険",
      employment: "雇用保険",
      incomeTax: "所得税",
      localTax: "地方所得税",
    },
    comparisonTitle: "年収別手取り比較",
    comparisonAnnual: "年収",
    comparisonMonthlyNet: "月額手取り",
    comparisonAnnualNet: "年間手取り",
    wonUnit: "ウォン",
    manwonUnit: "万ウォン",
    personUnit: "人",
    people: "人",
    totalLabel: "合計",
  },
  zh: {
    title: "年薪实得工资计算器",
    subtitle: "「四大保险」及税金自动计算",
    annualSalaryLabel: "年薪",
    annualSalaryUnit: "万韩元",
    nonTaxableLabel: "免税金额",
    nonTaxableDesc: "「餐补」等免税项目「默认10万韩元」",
    dependentsLabel: "赡养家属人数",
    childrenLabel: "「20岁以下子女数」",
    monthlyGross: "月税前工资",
    monthlyNet: "月实得工资",
    annualNet: "年实得工资",
    totalDeductions: "「扣除明细」",
    deductionItems: {
      pension: "「国民年金」",
      health: "「健康保险」",
      longTermCare: "「长期护理保险」",
      employment: "「就业保险」",
      incomeTax: "所得税",
      localTax: "「地方所得税」",
    },
    comparisonTitle: "「各年薪实得工资对比」",
    comparisonAnnual: "年薪",
    comparisonMonthlyNet: "月实得",
    comparisonAnnualNet: "年实得",
    wonUnit: "韩元",
    manwonUnit: "万韩元",
    personUnit: "人",
    people: "人",
    totalLabel: "「合计」",
  },
  es: {
    title: "Calculadora de Salario Neto",
    subtitle: "Cálculo automático de impuestos y seguro social",
    annualSalaryLabel: "Salario Anual",
    annualSalaryUnit: "10K KRW",
    nonTaxableLabel: "Monto No Imponible",
    nonTaxableDesc: "Subsidio de comida, etc. (predeterminado 100.000 KRW)",
    dependentsLabel: "Número de Dependientes",
    childrenLabel: "Hijos menores de 20 años",
    monthlyGross: "Salario Bruto Mensual",
    monthlyNet: "Salario Neto Mensual",
    annualNet: "Salario Neto Anual",
    totalDeductions: "Deducciones",
    deductionItems: {
      pension: "Pensión Nacional",
      health: "Seguro de Salud",
      longTermCare: "Cuidado a Largo Plazo",
      employment: "Seguro de Empleo",
      incomeTax: "Impuesto a la Renta",
      localTax: "Impuesto Local",
    },
    comparisonTitle: "Salario Neto por Nivel Salarial",
    comparisonAnnual: "Salario Anual",
    comparisonMonthlyNet: "Neto Mensual",
    comparisonAnnualNet: "Neto Anual",
    wonUnit: "KRW",
    manwonUnit: "10K",
    personUnit: "",
    people: "personas",
    totalLabel: "Total",
  },
};

// Korean income tax brackets (2024 simplified, annual taxable income in KRW)
const TAX_BRACKETS = [
  { limit: 12_000_000, rate: 0.06, deduction: 0 },
  { limit: 46_000_000, rate: 0.15, deduction: 1_080_000 },
  { limit: 88_000_000, rate: 0.24, deduction: 5_220_000 },
  { limit: 150_000_000, rate: 0.35, deduction: 14_900_000 },
  { limit: 300_000_000, rate: 0.38, deduction: 19_400_000 },
  { limit: 500_000_000, rate: 0.40, deduction: 25_400_000 },
  { limit: 1_000_000_000, rate: 0.42, deduction: 35_400_000 },
  { limit: Infinity, rate: 0.45, deduction: 65_400_000 },
];

// Pension monthly cap (2024): 590만원
const PENSION_CAP_MONTHLY = 5_900_000;

interface DeductionResult {
  pension: number;
  health: number;
  longTermCare: number;
  employment: number;
  incomeTax: number;
  localTax: number;
  total: number;
}

function calcIncomeTax(annualTaxable: number): number {
  for (const bracket of TAX_BRACKETS) {
    if (annualTaxable <= bracket.limit) {
      return Math.max(0, annualTaxable * bracket.rate - bracket.deduction);
    }
  }
  return 0;
}

function calcDeductions(
  annualSalaryWon: number,
  nonTaxableWon: number,
  dependents: number,
  childrenUnder20: number
): DeductionResult {
  const monthlyGross = annualSalaryWon / 12;
  const monthlyTaxable = monthlyGross - nonTaxableWon;

  // 국민연금 4.5%, capped at 590만원/month
  const pensionBase = Math.min(monthlyTaxable, PENSION_CAP_MONTHLY);
  const pension = Math.floor(pensionBase * 0.045);

  // 건강보험 3.545%
  const health = Math.floor(monthlyTaxable * 0.03545);

  // 장기요양보험 = 건강보험의 12.81%
  const longTermCare = Math.floor(health * 0.1281);

  // 고용보험 0.9%
  const employment = Math.floor(monthlyTaxable * 0.009);

  // 소득세: annual calculation with deductions then divide by 12
  // Personal deduction: 150만원 per dependent (including self), 150만원 per child under 20
  const personalDeduction =
    1_500_000 * Math.max(1, dependents) + 1_500_000 * childrenUnder20;
  const annualTaxable = Math.max(
    0,
    annualSalaryWon - nonTaxableWon * 12 - personalDeduction
  );
  const annualIncomeTax = calcIncomeTax(annualTaxable);
  const monthlyIncomeTax = Math.floor(annualIncomeTax / 12);

  // 지방소득세 = 소득세의 10%
  const localTax = Math.floor(monthlyIncomeTax * 0.1);

  const total =
    pension + health + longTermCare + employment + monthlyIncomeTax + localTax;

  return {
    pension,
    health,
    longTermCare,
    employment,
    incomeTax: monthlyIncomeTax,
    localTax,
    total,
  };
}

function formatWon(amount: number): string {
  return amount.toLocaleString("ko-KR");
}

function formatManwon(manwon: number): string {
  if (manwon >= 10000) {
    return `${(manwon / 10000).toFixed(0)}억`;
  }
  return `${manwon.toLocaleString()}만`;
}

const COMPARISON_LEVELS = [3000, 4000, 5000, 6000, 8000, 10000];

export default function SalaryCalculatorPage() {
  const locale = useLocale() as Locale;
  const t = translations[locale] ?? translations.ko;

  const [annualManwon, setAnnualManwon] = useState(5000);
  const [nonTaxableManwon, setNonTaxableManwon] = useState(10);
  const [dependents, setDependents] = useState(1);
  const [childrenUnder20, setChildrenUnder20] = useState(0);

  const annualWon = annualManwon * 10_000;
  const nonTaxableWon = nonTaxableManwon * 10_000;

  const deductions = useMemo(
    () => calcDeductions(annualWon, nonTaxableWon, dependents, childrenUnder20),
    [annualWon, nonTaxableWon, dependents, childrenUnder20]
  );

  const monthlyGross = Math.floor(annualWon / 12);
  const monthlyNet = monthlyGross - deductions.total;
  const annualNet = monthlyNet * 12;

  const comparisonRows = useMemo(
    () =>
      COMPARISON_LEVELS.map((manwon) => {
        const won = manwon * 10_000;
        const d = calcDeductions(won, nonTaxableWon, dependents, childrenUnder20);
        const gross = Math.floor(won / 12);
        const net = gross - d.total;
        return { manwon, monthlyNet: net, annualNet: net * 12 };
      }),
    [nonTaxableWon, dependents, childrenUnder20]
  );

  const deductionRows: { key: keyof DeductionResult; label: string }[] = [
    { key: "pension", label: t.deductionItems.pension },
    { key: "health", label: t.deductionItems.health },
    { key: "longTermCare", label: t.deductionItems.longTermCare },
    { key: "employment", label: t.deductionItems.employment },
    { key: "incomeTax", label: t.deductionItems.incomeTax },
    { key: "localTax", label: t.deductionItems.localTax },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-purple-50/20 dark:from-slate-950 dark:via-violet-950/20 dark:to-purple-950/10">
        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 text-center"
          >
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-2xl">💰</span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
                {t.title}
              </h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t.subtitle}</p>
          </motion.div>

          {/* Top Ad */}
          <div className="mb-4">
            <AdBanner format="horizontal" />
          </div>

          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 mb-4 space-y-5"
          >
            {/* Annual Salary Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t.annualSalaryLabel}
                </span>
                <span className="text-sm font-bold text-violet-600 dark:text-violet-400 tabular-nums">
                  {annualManwon.toLocaleString()} {t.annualSalaryUnit}
                </span>
              </div>
              <input
                type="range"
                min={2000}
                max={20000}
                step={100}
                value={annualManwon}
                onChange={(e) => setAnnualManwon(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer accent-violet-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>2,000만</span>
                <span>2억</span>
              </div>
            </div>

            {/* Non-taxable */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t.nonTaxableLabel}
                </span>
                <span className="text-sm font-bold text-violet-600 dark:text-violet-400 tabular-nums">
                  {nonTaxableManwon} {t.annualSalaryUnit}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-2">{t.nonTaxableDesc}</p>
              <input
                type="range"
                min={0}
                max={50}
                step={1}
                value={nonTaxableManwon}
                onChange={(e) => setNonTaxableManwon(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer accent-violet-500"
              />
            </div>

            {/* Dependents & Children */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">
                  {t.dependentsLabel}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDependents((v) => Math.max(0, v - 1))}
                    className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 font-bold text-lg flex items-center justify-center hover:bg-violet-200 dark:hover:bg-violet-800/40 transition-colors"
                  >
                    −
                  </button>
                  <span className="flex-1 text-center font-bold text-slate-700 dark:text-slate-300 tabular-nums">
                    {dependents}
                    {t.people && <span className="text-xs font-normal ml-0.5">{t.people}</span>}
                  </span>
                  <button
                    onClick={() => setDependents((v) => Math.min(10, v + 1))}
                    className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 font-bold text-lg flex items-center justify-center hover:bg-violet-200 dark:hover:bg-violet-800/40 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">
                  {t.childrenLabel}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setChildrenUnder20((v) => Math.max(0, v - 1))}
                    className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 font-bold text-lg flex items-center justify-center hover:bg-violet-200 dark:hover:bg-violet-800/40 transition-colors"
                  >
                    −
                  </button>
                  <span className="flex-1 text-center font-bold text-slate-700 dark:text-slate-300 tabular-nums">
                    {childrenUnder20}
                    {t.people && <span className="text-xs font-normal ml-0.5">{t.people}</span>}
                  </span>
                  <button
                    onClick={() => setChildrenUnder20((v) => Math.min(10, v + 1))}
                    className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 font-bold text-lg flex items-center justify-center hover:bg-violet-200 dark:hover:bg-violet-800/40 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Monthly Net Pay — Big animated result */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl shadow-lg p-6 mb-4 text-white text-center"
          >
            <p className="text-sm font-medium opacity-80 mb-1">{t.monthlyNet}</p>
            <motion.div
              key={monthlyNet}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="text-4xl font-black tabular-nums mb-1"
            >
              {formatWon(monthlyNet)}
              <span className="text-lg font-normal ml-1 opacity-80">{t.wonUnit}</span>
            </motion.div>
            <p className="text-xs opacity-70">
              {t.annualNet}: {formatWon(annualNet)} {t.wonUnit}
            </p>
          </motion.div>

          {/* Summary Row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="grid grid-cols-2 gap-3 mb-4"
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{t.monthlyGross}</p>
              <p className="text-base font-bold text-slate-700 dark:text-slate-200 tabular-nums">
                {formatWon(monthlyGross)}
                <span className="text-xs font-normal ml-0.5">{t.wonUnit}</span>
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{t.totalDeductions}</p>
              <p className="text-base font-bold text-red-500 tabular-nums">
                -{formatWon(deductions.total)}
                <span className="text-xs font-normal ml-0.5">{t.wonUnit}</span>
              </p>
            </div>
          </motion.div>

          {/* In-article Ad */}
          <div className="mb-4">
            <AdBanner format="in-article" />
          </div>

          {/* Deductions Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 mb-4"
          >
            <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">
              {t.totalDeductions}
            </h2>
            <div className="space-y-2.5">
              {deductionRows.map(({ key, label }) => {
                const amount = deductions[key] as number;
                const pct =
                  deductions.total > 0
                    ? Math.round((amount / deductions.total) * 100)
                    : 0;
                return (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600 dark:text-slate-400">{label}</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300 tabular-nums">
                        {formatWon(amount)} {t.wonUnit}
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-violet-400 to-purple-500 rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-between text-sm pt-2 border-t border-slate-100 dark:border-slate-700 font-semibold">
                <span className="text-slate-700 dark:text-slate-200">{t.totalLabel}</span>
                <span className="text-red-500 tabular-nums">
                  -{formatWon(deductions.total)} {t.wonUnit}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 mb-4"
          >
            <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">
              {t.comparisonTitle}
            </h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-700">
                  <th className="text-left py-1.5 font-medium">{t.comparisonAnnual}</th>
                  <th className="text-right py-1.5 font-medium">{t.comparisonMonthlyNet}</th>
                  <th className="text-right py-1.5 font-medium">{t.comparisonAnnualNet}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => {
                  const isActive = row.manwon === annualManwon;
                  return (
                    <tr
                      key={row.manwon}
                      className={`border-b border-slate-50 dark:border-slate-700/60 last:border-0 transition-colors ${
                        isActive
                          ? "bg-violet-50 dark:bg-violet-950/30 font-bold"
                          : ""
                      }`}
                    >
                      <td className={`py-2 tabular-nums ${isActive ? "text-violet-600 dark:text-violet-400" : "text-slate-600 dark:text-slate-400"}`}>
                        {isActive && <span className="mr-1">▶</span>}
                        {formatManwon(row.manwon)}
                      </td>
                      <td className={`py-2 text-right tabular-nums ${isActive ? "text-violet-600 dark:text-violet-400" : "text-slate-700 dark:text-slate-300"}`}>
                        {formatWon(row.monthlyNet)}
                      </td>
                      <td className={`py-2 text-right tabular-nums ${isActive ? "text-violet-600 dark:text-violet-400" : "text-slate-500 dark:text-slate-400"}`}>
                        {formatWon(row.annualNet)}
                      </td>
                    </tr>
                  );
                })}
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
