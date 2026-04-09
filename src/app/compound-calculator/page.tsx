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
    initialAmount: string;
    initialAmountUnit: string;
    monthlyContrib: string;
    monthlyContribUnit: string;
    annualRate: string;
    period: string;
    periodUnit: string;
    compoundFreq: string;
    freqMonthly: string;
    freqQuarterly: string;
    freqYearly: string;
    interestType: string;
    simple: string;
    compound: string;
    calculate: string;
    finalAmount: string;
    totalContrib: string;
    totalInterest: string;
    interestRatio: string;
    principal: string;
    interest: string;
    yearLabel: string;
    rule72Title: string;
    rule72Desc: string;
    rule72Years: string;
    goalTitle: string;
    goalAmount: string;
    goalAmountUnit: string;
    goalResult: string;
    goalResultUnit: string;
    goalNoSolution: string;
    chartTitle: string;
    faqTitle: string;
    faq: { q: string; a: string }[];
  }
> = {
  ko: {
    title: "복리 계산기",
    subtitle: "적금·투자 수익을 한눈에 계산하세요",
    initialAmount: "초기 투자금",
    initialAmountUnit: "만원",
    monthlyContrib: "월 적립액",
    monthlyContribUnit: "만원 (0 = 거치식)",
    annualRate: "연 이자율",
    period: "투자 기간",
    periodUnit: "년",
    compoundFreq: "복리 주기",
    freqMonthly: "월복리",
    freqQuarterly: "분기복리",
    freqYearly: "연복리",
    interestType: "이자 방식",
    simple: "단리",
    compound: "복리",
    calculate: "계산하기",
    finalAmount: "최종 금액",
    totalContrib: "총 납입액",
    totalInterest: "총 이자",
    interestRatio: "이자 비율",
    principal: "원금",
    interest: "이자",
    yearLabel: "년",
    rule72Title: "72 법칙",
    rule72Desc: "원금이 2배가 되는 데 걸리는 시간 ≈ 72 ÷ 연이율",
    rule72Years: "약 {n}년 후 2배",
    goalTitle: "목표 금액 역산",
    goalAmount: "목표 금액",
    goalAmountUnit: "만원",
    goalResult: "필요한 월 적립액",
    goalResultUnit: "만원",
    goalNoSolution: "현재 조건으로 달성 불가",
    chartTitle: "연도별 자산 성장",
    faqTitle: "자주 묻는 질문",
    faq: [
      {
        q: "복리와 단리의 차이는 무엇인가요?",
        a: "단리는 원금에만 이자가 붙지만, 복리는 이자에도 이자가 붙어 시간이 지날수록 자산이 기하급수적으로 늘어납니다.",
      },
      {
        q: "복리 주기가 빠를수록 유리한가요?",
        a: "네. 월복리 > 분기복리 > 연복리 순으로 최종 수익이 높습니다. 같은 연이율이라면 복리 주기가 짧을수록 실효 이율이 높아집니다.",
      },
      {
        q: "72 법칙이란 무엇인가요?",
        a: "72를 연이율로 나누면 원금이 약 2배가 되는 기간(년)을 빠르게 추정할 수 있습니다. 예: 연 8%면 72÷8=9년.",
      },
    ],
  },
  en: {
    title: "Compound Interest Calculator",
    subtitle: "Calculate your savings & investment returns instantly",
    initialAmount: "Initial Amount",
    initialAmountUnit: "10K KRW",
    monthlyContrib: "Monthly Contribution",
    monthlyContribUnit: "10K KRW (0 = lump sum)",
    annualRate: "Annual Rate",
    period: "Period",
    periodUnit: "years",
    compoundFreq: "Compounding",
    freqMonthly: "Monthly",
    freqQuarterly: "Quarterly",
    freqYearly: "Yearly",
    interestType: "Interest Type",
    simple: "Simple",
    compound: "Compound",
    calculate: "Calculate",
    finalAmount: "Final Amount",
    totalContrib: "Total Contributions",
    totalInterest: "Total Interest",
    interestRatio: "Interest Ratio",
    principal: "Principal",
    interest: "Interest",
    yearLabel: "yr",
    rule72Title: "Rule of 72",
    rule72Desc: "Time to double your money ≈ 72 ÷ annual rate",
    rule72Years: "Doubles in ~{n} years",
    goalTitle: "Goal Calculator",
    goalAmount: "Target Amount",
    goalAmountUnit: "10K KRW",
    goalResult: "Monthly contribution needed",
    goalResultUnit: "10K KRW",
    goalNoSolution: "Not achievable with current settings",
    chartTitle: "Year-by-Year Growth",
    faqTitle: "FAQ",
    faq: [
      {
        q: "What is the difference between simple and compound interest?",
        a: "Simple interest is calculated only on the principal, while compound interest is calculated on both the principal and accumulated interest, leading to exponential growth over time.",
      },
      {
        q: "Does compounding frequency matter?",
        a: "Yes. Monthly > Quarterly > Yearly in terms of returns. A shorter compounding period results in a higher effective annual rate.",
      },
      {
        q: "What is the Rule of 72?",
        a: "Divide 72 by the annual interest rate to estimate how many years it takes to double your money. Example: at 8% per year, 72÷8 = 9 years.",
      },
    ],
  },
  ja: {
    title: "複利計算機",
    subtitle: "貯蓄・投資のリターンを瞬時に計算",
    initialAmount: "初期投資額",
    initialAmountUnit: "万円",
    monthlyContrib: "毎月の積立額",
    monthlyContribUnit: "万円（0 = 一括）",
    annualRate: "年利率",
    period: "投資期間",
    periodUnit: "年",
    compoundFreq: "複利周期",
    freqMonthly: "月複利",
    freqQuarterly: "四半期複利",
    freqYearly: "年複利",
    interestType: "利息方式",
    simple: "単利",
    compound: "複利",
    calculate: "計算する",
    finalAmount: "最終金額",
    totalContrib: "総積立額",
    totalInterest: "総利息",
    interestRatio: "利息割合",
    principal: "元本",
    interest: "利息",
    yearLabel: "年",
    rule72Title: "72の法則",
    rule72Desc: "元本が2倍になるまでの期間 ≈ 72 ÷ 年利率",
    rule72Years: "約{n}年で2倍",
    goalTitle: "目標金額の逆算",
    goalAmount: "目標金額",
    goalAmountUnit: "万円",
    goalResult: "必要な毎月の積立額",
    goalResultUnit: "万円",
    goalNoSolution: "現在の条件では達成不可",
    chartTitle: "年別資産成長",
    faqTitle: "よくある質問",
    faq: [
      {
        q: "単利と複利の違いは何ですか？",
        a: "単利は元本のみに利息がつきますが、複利は利息にも利息がつくため、時間が経つほど指数関数的に資産が増えます。",
      },
      {
        q: "複利周期が短いほど有利ですか？",
        a: "はい。月複利 > 四半期複利 > 年複利の順でリターンが高くなります。複利周期が短いほど実効年利率が高くなります。",
      },
      {
        q: "72の法則とは何ですか？",
        a: "72を年利率で割ると、元本が約2倍になるまでの年数を素早く推定できます。例：年利8%なら72÷8=9年。",
      },
    ],
  },
  zh: {
    title: "复利计算器",
    subtitle: "即时计算储蓄和投资收益",
    initialAmount: "初始金额",
    initialAmountUnit: "万元",
    monthlyContrib: "每月存入",
    monthlyContribUnit: "万元（0 = 一次性）",
    annualRate: "年利率",
    period: "投资期限",
    periodUnit: "年",
    compoundFreq: "复利周期",
    freqMonthly: "月复利",
    freqQuarterly: "季度复利",
    freqYearly: "年复利",
    interestType: "利息方式",
    simple: "单利",
    compound: "复利",
    calculate: "计算",
    finalAmount: "最终金额",
    totalContrib: "总存入额",
    totalInterest: "总利息",
    interestRatio: "利息占比",
    principal: "本金",
    interest: "利息",
    yearLabel: "年",
    rule72Title: "72法则",
    rule72Desc: "本金翻倍所需时间 ≈ 72 ÷ 年利率",
    rule72Years: "约{n}年后翻倍",
    goalTitle: "目标金额反算",
    goalAmount: "目标金额",
    goalAmountUnit: "万元",
    goalResult: "每月需存入",
    goalResultUnit: "万元",
    goalNoSolution: "当前条件无法达成",
    chartTitle: "逐年资产增长",
    faqTitle: "常见问题",
    faq: [
      {
        q: "单利和复利有什么区别？",
        a: "单利只对本金计息，而复利对本金和累积利息都计息，随着时间推移资产呈指数增长。",
      },
      {
        q: "复利周期越短越好吗？",
        a: "是的。月复利 > 季度复利 > 年复利，收益依次递减。复利周期越短，实际年利率越高。",
      },
      {
        q: "72法则是什么？",
        a: "用72除以年利率，可以快速估算本金翻倍所需的年数。例如：年利率8%，则72÷8=9年。",
      },
    ],
  },
  es: {
    title: "Calculadora de Interés Compuesto",
    subtitle: "Calcula tus ahorros e inversiones al instante",
    initialAmount: "Monto inicial",
    initialAmountUnit: "10K KRW",
    monthlyContrib: "Aporte mensual",
    monthlyContribUnit: "10K KRW (0 = único)",
    annualRate: "Tasa anual",
    period: "Período",
    periodUnit: "años",
    compoundFreq: "Capitalización",
    freqMonthly: "Mensual",
    freqQuarterly: "Trimestral",
    freqYearly: "Anual",
    interestType: "Tipo de interés",
    simple: "Simple",
    compound: "Compuesto",
    calculate: "Calcular",
    finalAmount: "Monto final",
    totalContrib: "Total aportado",
    totalInterest: "Interés total",
    interestRatio: "Proporción de interés",
    principal: "Capital",
    interest: "Interés",
    yearLabel: "año",
    rule72Title: "Regla del 72",
    rule72Desc: "Tiempo para doblar tu dinero ≈ 72 ÷ tasa anual",
    rule72Years: "Se duplica en ~{n} años",
    goalTitle: "Calculadora de Meta",
    goalAmount: "Monto objetivo",
    goalAmountUnit: "10K KRW",
    goalResult: "Aporte mensual necesario",
    goalResultUnit: "10K KRW",
    goalNoSolution: "No alcanzable con los ajustes actuales",
    chartTitle: "Crecimiento año a año",
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Cuál es la diferencia entre interés simple y compuesto?",
        a: "El interés simple se calcula solo sobre el capital, mientras que el compuesto se calcula sobre el capital y los intereses acumulados, generando crecimiento exponencial.",
      },
      {
        q: "¿Importa la frecuencia de capitalización?",
        a: "Sí. Mensual > Trimestral > Anual en términos de rendimiento. Una capitalización más frecuente resulta en una tasa efectiva anual más alta.",
      },
      {
        q: "¿Qué es la Regla del 72?",
        a: "Divide 72 entre la tasa de interés anual para estimar en cuántos años se duplica tu dinero. Ejemplo: al 8% anual, 72÷8 = 9 años.",
      },
    ],
  },
};

type FreqKey = "monthly" | "quarterly" | "yearly";

const FREQ_MAP: Record<FreqKey, number> = {
  monthly: 12,
  quarterly: 4,
  yearly: 1,
};

function formatMan(value: number): string {
  if (!isFinite(value)) return "—";
  if (value >= 10000) {
    const eok = value / 10000;
    return eok % 1 === 0
      ? eok.toLocaleString() + "억원"
      : eok.toFixed(1) + "억원";
  }
  return value.toLocaleString(undefined, { maximumFractionDigits: 1 }) + "만원";
}

function calcCompound(
  principal: number,
  monthly: number,
  rate: number,
  years: number,
  n: number,
  isCompound: boolean
): number[] {
  const results: number[] = [];
  for (let y = 1; y <= years; y++) {
    if (!isCompound) {
      // Simple interest
      const totalPrincipal = principal + monthly * 12 * y;
      const simpleInterest = principal * (rate / 100) * y + monthly * 12 * y * (rate / 100) * (y / 2);
      results.push(totalPrincipal + simpleInterest);
    } else {
      const r = rate / 100 / n;
      const t = n * y;
      let fv = principal * Math.pow(1 + r, t);
      if (monthly > 0) {
        fv += monthly * ((Math.pow(1 + r, t) - 1) / r);
      }
      results.push(fv);
    }
  }
  return results;
}

function calcGoalMonthly(
  principal: number,
  rate: number,
  years: number,
  n: number,
  goal: number
): number | null {
  const r = rate / 100 / n;
  const t = n * years;
  const fvPrincipal = principal * Math.pow(1 + r, t);
  const remaining = goal - fvPrincipal;
  if (remaining <= 0) return 0;
  if (r === 0) return remaining / (12 * years);
  const fvFactor = (Math.pow(1 + r, t) - 1) / r;
  if (fvFactor <= 0) return null;
  return remaining / fvFactor;
}

export default function CompoundCalculatorPage() {
  const locale = useLocale();
  const t = translations[locale] ?? translations.ko;

  const [principal, setPrincipal] = useState("1000");
  const [monthly, setMonthly] = useState("50");
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);
  const [freq, setFreq] = useState<FreqKey>("monthly");
  const [isCompound, setIsCompound] = useState(true);
  const [goalAmount, setGoalAmount] = useState("");

  const principalNum = parseFloat(principal) || 0;
  const monthlyNum = parseFloat(monthly) || 0;
  const n = FREQ_MAP[freq];

  const yearlyBalances = useMemo(
    () => calcCompound(principalNum, monthlyNum, rate, years, n, isCompound),
    [principalNum, monthlyNum, rate, years, n, isCompound]
  );

  const finalAmount = yearlyBalances[yearlyBalances.length - 1] ?? 0;
  const totalContrib = principalNum + monthlyNum * 12 * years;
  const totalInterest = Math.max(0, finalAmount - totalContrib);
  const interestRatio = finalAmount > 0 ? (totalInterest / finalAmount) * 100 : 0;

  const rule72Years = rate > 0 ? (72 / rate).toFixed(1) : "—";

  const goalNum = parseFloat(goalAmount) || 0;
  const goalMonthly = useMemo(() => {
    if (!goalNum || !isCompound) return null;
    return calcGoalMonthly(principalNum, rate, years, n, goalNum);
  }, [goalNum, principalNum, rate, years, n, isCompound]);

  const chartMax = Math.max(...yearlyBalances, 1);
  const chartYears = yearlyBalances.length <= 30
    ? yearlyBalances.map((_, i) => i + 1)
    : yearlyBalances.map((_, i) => i + 1).filter((y) => y % 5 === 0 || y === 1 || y === yearlyBalances.length);

  const freqOptions: { key: FreqKey; label: string }[] = [
    { key: "monthly", label: t.freqMonthly },
    { key: "quarterly", label: t.freqQuarterly },
    { key: "yearly", label: t.freqYearly },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-yellow-50/20 dark:from-slate-950 dark:via-amber-950/20 dark:to-yellow-950/10">
        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 shadow-lg mb-3">
              <span className="text-2xl">💰</span>
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

          {/* Input card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-5"
          >
            {/* Principal */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 block">
                {t.initialAmount} ({t.initialAmountUnit})
              </label>
              <input
                type="number"
                min="0"
                placeholder="1000"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-sm font-medium border-none outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Monthly contribution */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 block">
                {t.monthlyContrib} ({t.monthlyContribUnit})
              </label>
              <input
                type="number"
                min="0"
                placeholder="50"
                value={monthly}
                onChange={(e) => setMonthly(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-sm font-medium border-none outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Annual rate slider */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {t.annualRate}
                </label>
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                  {rate}%
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                step={0.5}
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-slate-200 dark:bg-slate-600 accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 mt-1">
                <span>1%</span>
                <span>20%</span>
              </div>
            </div>

            {/* Period slider */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {t.period}
                </label>
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                  {years} {t.periodUnit}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={50}
                step={1}
                value={years}
                onChange={(e) => setYears(parseInt(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-slate-200 dark:bg-slate-600 accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 mt-1">
                <span>1{t.periodUnit}</span>
                <span>50{t.periodUnit}</span>
              </div>
            </div>

            {/* Compounding frequency */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 block">
                {t.compoundFreq}
              </label>
              <div className="flex gap-2">
                {freqOptions.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setFreq(key)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                      freq === key
                        ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interest type toggle */}
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 block">
                {t.interestType}
              </label>
              <div className="flex bg-slate-100 dark:bg-slate-700 rounded-xl p-1">
                <button
                  onClick={() => setIsCompound(false)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                    !isCompound
                      ? "bg-white dark:bg-slate-600 text-amber-600 dark:text-amber-400 shadow"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {t.simple}
                </button>
                <button
                  onClick={() => setIsCompound(true)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isCompound
                      ? "bg-white dark:bg-slate-600 text-amber-600 dark:text-amber-400 shadow"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {t.compound}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl p-5 shadow-lg mb-5"
          >
            <p className="text-xs font-semibold text-amber-100 mb-3 uppercase tracking-wide">
              {t.finalAmount}
            </p>
            <motion.p
              key={finalAmount}
              initial={{ scale: 0.92, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-bold text-white tabular-nums mb-4"
            >
              {formatMan(finalAmount)}
            </motion.p>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/20 rounded-xl p-3 text-center">
                <p className="text-xs text-amber-100 mb-1">{t.totalContrib}</p>
                <p className="text-sm font-bold text-white">{formatMan(totalContrib)}</p>
              </div>
              <div className="bg-white/20 rounded-xl p-3 text-center">
                <p className="text-xs text-amber-100 mb-1">{t.totalInterest}</p>
                <p className="text-sm font-bold text-white">{formatMan(totalInterest)}</p>
              </div>
              <div className="bg-white/20 rounded-xl p-3 text-center">
                <p className="text-xs text-amber-100 mb-1">{t.interestRatio}</p>
                <p className="text-sm font-bold text-white">{interestRatio.toFixed(1)}%</p>
              </div>
            </div>
          </motion.div>

          {/* Ad in-article */}
          <AdBanner
            format="in-article"
            className="mb-5 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
          />

          {/* Bar chart */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-5"
          >
            <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4">
              {t.chartTitle}
            </h2>
            <div className="flex items-end gap-1 h-40 overflow-x-auto pb-2">
              {chartYears.map((y) => {
                const balance = yearlyBalances[y - 1];
                const principalAtYear = Math.min(principalNum + monthlyNum * 12 * y, balance);
                const interestAtYear = Math.max(0, balance - principalAtYear);
                const totalH = (balance / chartMax) * 100;
                const principalH = (principalAtYear / chartMax) * 100;
                const interestH = (interestAtYear / chartMax) * 100;
                return (
                  <div
                    key={y}
                    className="flex flex-col items-center flex-shrink-0"
                    style={{ minWidth: years <= 20 ? "auto" : "18px", flex: "1 1 0" }}
                  >
                    <div
                      className="w-full relative rounded-t-sm overflow-hidden"
                      style={{ height: `${Math.max(totalH, 1)}%` }}
                    >
                      <div
                        className="absolute bottom-0 w-full bg-amber-400"
                        style={{ height: `${principalH > 0 ? (principalH / totalH) * 100 : 0}%` }}
                      />
                      <div
                        className="absolute top-0 w-full bg-amber-600 dark:bg-amber-500"
                        style={{ height: `${interestH > 0 ? (interestH / totalH) * 100 : 0}%` }}
                      />
                    </div>
                    {(y === 1 || y % (years <= 10 ? 1 : years <= 20 ? 5 : 10) === 0) && (
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 text-center leading-none">
                        {y}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Legend */}
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-amber-400" />
                <span className="text-xs text-slate-500 dark:text-slate-400">{t.principal}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-amber-600 dark:bg-amber-500" />
                <span className="text-xs text-slate-500 dark:text-slate-400">{t.interest}</span>
              </div>
            </div>
          </motion.div>

          {/* Rule of 72 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 mb-5"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <h2 className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-1">
                  {t.rule72Title}
                </h2>
                <p className="text-xs text-amber-700 dark:text-amber-400 mb-2">
                  {t.rule72Desc}
                </p>
                <p className="text-lg font-bold text-amber-600 dark:text-amber-400">
                  {t.rule72Years.replace("{n}", String(rule72Years))}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Goal calculator */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-5"
          >
            <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4">
              {t.goalTitle}
            </h2>
            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 block">
                {t.goalAmount} ({t.goalAmountUnit})
              </label>
              <input
                type="number"
                min="0"
                placeholder="10000"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-sm font-medium border-none outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            {goalNum > 0 && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-800">
                <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mb-1">
                  {t.goalResult}
                </p>
                {goalMonthly === null || (goalMonthly !== null && !isFinite(goalMonthly)) ? (
                  <p className="text-sm font-bold text-red-500 dark:text-red-400">
                    {t.goalNoSolution}
                  </p>
                ) : (
                  <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                    {goalMonthly <= 0
                      ? "0"
                      : goalMonthly.toLocaleString(undefined, { maximumFractionDigits: 1 })}{" "}
                    {t.goalResultUnit}
                  </p>
                )}
              </div>
            )}
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
            transition={{ delay: 0.16 }}
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
