"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/i18n/config";

type RepaymentMethod = "equal-payment" | "equal-principal" | "bullet";

const translations: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    loanAmount: string;
    loanAmountUnit: string;
    interestRate: string;
    loanTerm: string;
    loanTermUnit: string;
    repaymentMethod: string;
    methods: Record<RepaymentMethod, string>;
    monthlyPayment: string;
    totalInterest: string;
    totalPayment: string;
    schedule: string;
    showAll: string;
    showLess: string;
    month: string;
    payment: string;
    principal: string;
    interest: string;
    balance: string;
    comparison: string;
    comparisonDesc: string;
    won: string;
    perMonth: string;
    faqTitle: string;
    faq: { q: string; a: string }[];
  }
> = {
  ko: {
    title: "대출이자 계산기",
    subtitle: "원리금균등, 원금균등, 만기일시 상환 방식 비교",
    loanAmount: "대출금액",
    loanAmountUnit: "만원",
    interestRate: "연이자율",
    loanTerm: "대출기간",
    loanTermUnit: "년",
    repaymentMethod: "상환방식",
    methods: {
      "equal-payment": "원리금균등상환",
      "equal-principal": "원금균등상환",
      bullet: "만기일시상환",
    },
    monthlyPayment: "월 상환액",
    totalInterest: "총 이자",
    totalPayment: "총 상환액",
    schedule: "월별 상환 스케줄",
    showAll: "전체 보기",
    showLess: "접기",
    month: "월",
    payment: "상환액",
    principal: "원금",
    interest: "이자",
    balance: "잔액",
    comparison: "상환방식 비교",
    comparisonDesc: "상환방식별 총 이자 비교",
    won: "원",
    perMonth: "/ 월",
    faqTitle: "자주 묻는 질문",
    faq: [
      {
        q: "원리금균등상환이란 무엇인가요?",
        a: "매월 동일한 금액(원금+이자)을 납부하는 방식입니다. 초기에는 이자 비중이 높고 후반으로 갈수록 원금 비중이 높아집니다. 주택담보대출에서 가장 많이 사용됩니다.",
      },
      {
        q: "원금균등상환과 원리금균등상환의 차이는?",
        a: "원금균등상환은 매월 동일한 원금을 갚고 이자는 줄어드는 방식으로, 총 납부 이자가 원리금균등상환보다 적습니다. 단, 초기 상환 부담이 더 큽니다.",
      },
      {
        q: "만기일시상환은 어떤 경우에 유리한가요?",
        a: "만기일시상환은 매월 이자만 납부하다가 만기에 원금을 전액 상환하는 방식입니다. 단기 대출이나 목돈 상환 계획이 있을 때 유리하지만 총 이자 부담이 가장 큽니다.",
      },
    ],
  },
  en: {
    title: "Loan Interest Calculator",
    subtitle: "Compare equal payment, equal principal & bullet repayment",
    loanAmount: "Loan Amount",
    loanAmountUnit: "만원",
    interestRate: "Annual Interest Rate",
    loanTerm: "Loan Term",
    loanTermUnit: "years",
    repaymentMethod: "Repayment Method",
    methods: {
      "equal-payment": "Equal Payment",
      "equal-principal": "Equal Principal",
      bullet: "Bullet (Interest Only)",
    },
    monthlyPayment: "Monthly Payment",
    totalInterest: "Total Interest",
    totalPayment: "Total Payment",
    schedule: "Amortization Schedule",
    showAll: "Show All",
    showLess: "Show Less",
    month: "Month",
    payment: "Payment",
    principal: "Principal",
    interest: "Interest",
    balance: "Balance",
    comparison: "Method Comparison",
    comparisonDesc: "Total interest by repayment method",
    won: "만원",
    perMonth: "/ mo",
    faqTitle: "Frequently Asked Questions",
    faq: [
      {
        q: "What is the equal payment method?",
        a: "Equal payment (annuity) keeps your monthly payment the same throughout the loan. Early payments are mostly interest; later payments shift toward principal. It is the most common method for mortgages.",
      },
      {
        q: "How does equal principal differ from equal payment?",
        a: "Equal principal repays the same principal amount each month, so total interest is lower than equal payment. However, early monthly payments are higher since you are also paying more interest at the start.",
      },
      {
        q: "When is bullet repayment advantageous?",
        a: "Bullet repayment means paying only interest each month and repaying the full principal at maturity. It suits short-term loans or when you expect a lump sum later, but total interest paid is the highest.",
      },
    ],
  },
  ja: {
    title: "ローン利息計算機",
    subtitle: "元利均等・元金均等・一括返済を比較",
    loanAmount: "借入金額",
    loanAmountUnit: "万円",
    interestRate: "年利",
    loanTerm: "借入期間",
    loanTermUnit: "年",
    repaymentMethod: "返済方式",
    methods: {
      "equal-payment": "元利均等返済",
      "equal-principal": "元金均等返済",
      bullet: "満期一括返済",
    },
    monthlyPayment: "毎月の返済額",
    totalInterest: "総利息",
    totalPayment: "総返済額",
    schedule: "返済スケジュール",
    showAll: "全て表示",
    showLess: "閉じる",
    month: "月",
    payment: "返済額",
    principal: "元金",
    interest: "利息",
    balance: "残高",
    comparison: "返済方式の比較",
    comparisonDesc: "返済方式別の総利息比較",
    won: "万円",
    perMonth: "/ 月",
    faqTitle: "よくある質問",
    faq: [
      {
        q: "元利均等返済とは何ですか？",
        a: "毎月の返済額（元金＋利息）が一定の返済方式です。初期は利息の割合が高く、後半になるほど元金の割合が高くなります。住宅ローンで最も多く使われます。",
      },
      {
        q: "元金均等返済と元利均等返済の違いは？",
        a: "元金均等返済は毎月同じ元金を返済し、利息は減少していく方式です。総利息は元利均等より少なくなりますが、返済初期の負担が大きくなります。",
      },
      {
        q: "満期一括返済はどんな場合に有利ですか？",
        a: "毎月利息のみを支払い、満期に元金を一括返済する方式です。短期ローンやまとまった資金の返済計画がある場合に向いていますが、総利息負担は最も大きくなります。",
      },
    ],
  },
  zh: {
    title: "贷款利息计算器",
    subtitle: "等额还款、等本还款与到期一次性还款对比",
    loanAmount: "贷款金额",
    loanAmountUnit: "万元",
    interestRate: "年利率",
    loanTerm: "贷款期限",
    loanTermUnit: "年",
    repaymentMethod: "还款方式",
    methods: {
      "equal-payment": "等额还款",
      "equal-principal": "等本还款",
      bullet: "到期一次性还款",
    },
    monthlyPayment: "月还款额",
    totalInterest: "总利息",
    totalPayment: "总还款额",
    schedule: "还款计划表",
    showAll: "显示全部",
    showLess: "收起",
    month: "月",
    payment: "还款额",
    principal: "本金",
    interest: "利息",
    balance: "剩余本金",
    comparison: "还款方式对比",
    comparisonDesc: "各还款方式总利息对比",
    won: "万元",
    perMonth: "/ 月",
    faqTitle: "常见问题",
    faq: [
      {
        q: "等额还款是什么？",
        a: "等额还款是每月偿还相同金额「本金＋利息」的还款方式。初期利息占比较高，后期本金占比逐渐增大。是房贷中最常见的还款方式。",
      },
      {
        q: "等本还款和等额还款有什么区别？",
        a: "等本还款每月偿还相同的本金，利息随余额减少而降低，总利息低于等额还款。但初期月还款额较高，还款压力较大。",
      },
      {
        q: "到期一次性还款适合什么情况？",
        a: "到期一次性还款是每月只还利息，到期时一次性偿还全部本金的方式。适合短期借款或有大额资金安排的情况，但总利息负担最重。",
      },
    ],
  },
  es: {
    title: "Calculadora de Interés de Préstamo",
    subtitle: "Compara cuota fija, capital fijo y pago al vencimiento",
    loanAmount: "Monto del Préstamo",
    loanAmountUnit: "만원",
    interestRate: "Tasa de Interés Anual",
    loanTerm: "Plazo del Préstamo",
    loanTermUnit: "años",
    repaymentMethod: "Método de Pago",
    methods: {
      "equal-payment": "Cuota Fija",
      "equal-principal": "Capital Fijo",
      bullet: "Pago al Vencimiento",
    },
    monthlyPayment: "Cuota Mensual",
    totalInterest: "Interés Total",
    totalPayment: "Pago Total",
    schedule: "Tabla de Amortización",
    showAll: "Ver Todo",
    showLess: "Ocultar",
    month: "Mes",
    payment: "Cuota",
    principal: "Capital",
    interest: "Interés",
    balance: "Saldo",
    comparison: "Comparación de Métodos",
    comparisonDesc: "Interés total por método de pago",
    won: "만원",
    perMonth: "/ mes",
    faqTitle: "Preguntas Frecuentes",
    faq: [
      {
        q: "¿Qué es la cuota fija?",
        a: "La cuota fija mantiene el mismo pago mensual (capital + interés) durante toda la vida del préstamo. Al inicio predomina el interés; al final predomina el capital. Es el método más común en hipotecas.",
      },
      {
        q: "¿En qué se diferencia capital fijo de cuota fija?",
        a: "El capital fijo amortiza la misma cantidad de capital cada mes, por lo que el interés total es menor que con cuota fija. Sin embargo, las cuotas iniciales son más altas.",
      },
      {
        q: "¿Cuándo conviene el pago al vencimiento?",
        a: "El pago al vencimiento implica pagar solo intereses cada mes y devolver el capital al final. Es útil para préstamos a corto plazo o cuando se espera un ingreso grande, pero el interés total es el mayor.",
      },
    ],
  },
};

interface ScheduleRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

function calcEqualPayment(principal: number, annualRate: number, years: number): ScheduleRow[] {
  const n = years * 12;
  const r = annualRate / 12 / 100;
  const rows: ScheduleRow[] = [];
  let balance = principal;

  if (r === 0) {
    const monthly = principal / n;
    for (let i = 1; i <= n; i++) {
      balance -= monthly;
      rows.push({ month: i, payment: monthly, principal: monthly, interest: 0, balance: Math.max(0, balance) });
    }
    return rows;
  }

  const monthlyPayment = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  for (let i = 1; i <= n; i++) {
    const interestPart = balance * r;
    const principalPart = monthlyPayment - interestPart;
    balance -= principalPart;
    rows.push({
      month: i,
      payment: monthlyPayment,
      principal: principalPart,
      interest: interestPart,
      balance: Math.max(0, balance),
    });
  }
  return rows;
}

function calcEqualPrincipal(principal: number, annualRate: number, years: number): ScheduleRow[] {
  const n = years * 12;
  const r = annualRate / 12 / 100;
  const principalPerMonth = principal / n;
  const rows: ScheduleRow[] = [];
  let balance = principal;

  for (let i = 1; i <= n; i++) {
    const interestPart = balance * r;
    const payment = principalPerMonth + interestPart;
    balance -= principalPerMonth;
    rows.push({
      month: i,
      payment,
      principal: principalPerMonth,
      interest: interestPart,
      balance: Math.max(0, balance),
    });
  }
  return rows;
}

function calcBullet(principal: number, annualRate: number, years: number): ScheduleRow[] {
  const n = years * 12;
  const r = annualRate / 12 / 100;
  const rows: ScheduleRow[] = [];

  for (let i = 1; i <= n; i++) {
    const isLast = i === n;
    const interest = principal * r;
    const payment = isLast ? principal + interest : interest;
    const principalPart = isLast ? principal : 0;
    rows.push({
      month: i,
      payment,
      principal: principalPart,
      interest,
      balance: isLast ? 0 : principal,
    });
  }
  return rows;
}

function formatWon(amount: number): string {
  if (amount >= 10000) {
    const uk = Math.floor(amount / 10000);
    const man = Math.round(amount % 10000);
    if (man === 0) return `${uk.toLocaleString()}억원`;
    return `${uk.toLocaleString()}억 ${man.toLocaleString()}만원`;
  }
  return `${Math.round(amount).toLocaleString()}만원`;
}

function formatNum(amount: number): string {
  return Math.round(amount).toLocaleString();
}

export default function LoanCalculatorPage() {
  const locale = useLocale() as Locale;
  const t = translations[locale] ?? translations.ko;

  const [loanAmount, setLoanAmount] = useState(30000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [method, setMethod] = useState<RepaymentMethod>("equal-payment");
  const [showAllSchedule, setShowAllSchedule] = useState(false);

  const { schedule, totalInterest, totalPayment, firstMonthPayment } = useMemo(() => {
    let rows: ScheduleRow[];
    if (method === "equal-payment") {
      rows = calcEqualPayment(loanAmount, interestRate, loanTerm);
    } else if (method === "equal-principal") {
      rows = calcEqualPrincipal(loanAmount, interestRate, loanTerm);
    } else {
      rows = calcBullet(loanAmount, interestRate, loanTerm);
    }
    const totalInt = rows.reduce((sum, r) => sum + r.interest, 0);
    const totalPay = rows.reduce((sum, r) => sum + r.payment, 0);
    return {
      schedule: rows,
      totalInterest: totalInt,
      totalPayment: totalPay,
      firstMonthPayment: rows[0]?.payment ?? 0,
    };
  }, [loanAmount, interestRate, loanTerm, method]);

  const comparison = useMemo(() => {
    const ep = calcEqualPayment(loanAmount, interestRate, loanTerm);
    const epr = calcEqualPrincipal(loanAmount, interestRate, loanTerm);
    const bl = calcBullet(loanAmount, interestRate, loanTerm);
    return {
      "equal-payment": ep.reduce((s, r) => s + r.interest, 0),
      "equal-principal": epr.reduce((s, r) => s + r.interest, 0),
      bullet: bl.reduce((s, r) => s + r.interest, 0),
    };
  }, [loanAmount, interestRate, loanTerm]);

  const maxInterest = Math.max(...Object.values(comparison));
  const displayRows = showAllSchedule ? schedule : schedule.slice(0, 12);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-green-50/20 dark:from-slate-950 dark:via-emerald-950/20 dark:to-green-950/10">
        <div className="max-w-lg mx-auto px-4 py-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 text-center"
          >
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-2xl">🏦</span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
                {t.title}
              </h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t.subtitle}</p>
          </motion.div>

          {/* AdBanner horizontal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-6"
          >
            <AdBanner format="horizontal" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
          </motion.div>

          {/* Inputs Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 mb-4 space-y-5"
          >
            {/* Loan Amount */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t.loanAmount}
                </span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {formatWon(loanAmount)}
                </span>
              </div>
              <input
                type="range"
                min={1000}
                max={100000}
                step={500}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>1,000만원</span>
                <span>10억원</span>
              </div>
              <input
                type="number"
                min={1000}
                max={100000}
                step={500}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Math.min(100000, Math.max(1000, Number(e.target.value))))}
                className="mt-2 w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t.interestRate}
                </span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {interestRate.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>1%</span>
                <span>15%</span>
              </div>
              <input
                type="number"
                min={1}
                max={15}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Math.min(15, Math.max(0.1, Number(e.target.value))))}
                className="mt-2 w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            {/* Loan Term */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t.loanTerm}
                </span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {loanTerm}{t.loanTermUnit}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={40}
                step={1}
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>1{t.loanTermUnit}</span>
                <span>40{t.loanTermUnit}</span>
              </div>
            </div>

            {/* Repayment Method Tabs */}
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t.repaymentMethod}
              </p>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-700/50 rounded-xl p-1">
                {(["equal-payment", "equal-principal", "bullet"] as RepaymentMethod[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`rounded-lg py-2 px-1 text-xs font-medium transition-all ${
                      method === m
                        ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-600/40"
                    }`}
                  >
                    {t.methods[m]}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Results Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl shadow-md p-5 mb-4 text-white"
          >
            {/* Monthly Payment - large */}
            <div className="text-center mb-4">
              <p className="text-sm font-medium text-emerald-100 mb-1">{t.monthlyPayment}</p>
              <motion.p
                key={firstMonthPayment}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-3xl font-bold"
              >
                {formatNum(firstMonthPayment)}만원
              </motion.p>
              <p className="text-xs text-emerald-100 mt-0.5">{t.perMonth}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/15 rounded-xl p-3 text-center">
                <p className="text-xs text-emerald-100 mb-1">{t.totalInterest}</p>
                <motion.p
                  key={totalInterest}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg font-bold"
                >
                  {formatWon(totalInterest)}
                </motion.p>
              </div>
              <div className="bg-white/15 rounded-xl p-3 text-center">
                <p className="text-xs text-emerald-100 mb-1">{t.totalPayment}</p>
                <motion.p
                  key={totalPayment}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg font-bold"
                >
                  {formatWon(totalPayment)}
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* In-article Ad */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-4"
          >
            <AdBanner format="in-article" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
          </motion.div>

          {/* Comparison Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.22 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 mb-4"
          >
            <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">
              {t.comparison}
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">{t.comparisonDesc}</p>
            <div className="space-y-3">
              {(["equal-payment", "equal-principal", "bullet"] as RepaymentMethod[]).map((m) => {
                const val = comparison[m];
                const pct = maxInterest > 0 ? (val / maxInterest) * 100 : 0;
                const isActive = method === m;
                return (
                  <div key={m}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className={`font-medium ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400"}`}>
                        {t.methods[m]}
                      </span>
                      <span className={`${isActive ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-slate-500"}`}>
                        {formatWon(val)}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full rounded-full ${
                          isActive
                            ? "bg-gradient-to-r from-emerald-500 to-green-500"
                            : "bg-slate-300 dark:bg-slate-600"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Amortization Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6 overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-700">
              <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200">{t.schedule}</h2>
              <button
                onClick={() => setShowAllSchedule((v) => !v)}
                className="text-xs text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
              >
                {showAllSchedule ? t.showLess : t.showAll} ({schedule.length})
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-700/50">
                    <th className="px-3 py-2 text-left text-slate-500 dark:text-slate-400 font-medium">{t.month}</th>
                    <th className="px-3 py-2 text-right text-slate-500 dark:text-slate-400 font-medium">{t.payment}</th>
                    <th className="px-3 py-2 text-right text-slate-500 dark:text-slate-400 font-medium">{t.principal}</th>
                    <th className="px-3 py-2 text-right text-slate-500 dark:text-slate-400 font-medium">{t.interest}</th>
                    <th className="px-3 py-2 text-right text-slate-500 dark:text-slate-400 font-medium">{t.balance}</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence initial={false}>
                    {displayRows.map((row) => (
                      <motion.tr
                        key={row.month}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="border-t border-slate-50 dark:border-slate-700/50 hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10"
                      >
                        <td className="px-3 py-2 text-slate-600 dark:text-slate-400">{row.month}</td>
                        <td className="px-3 py-2 text-right text-slate-700 dark:text-slate-300 font-medium">{formatNum(row.payment)}</td>
                        <td className="px-3 py-2 text-right text-blue-600 dark:text-blue-400">{formatNum(row.principal)}</td>
                        <td className="px-3 py-2 text-right text-orange-500 dark:text-orange-400">{formatNum(row.interest)}</td>
                        <td className="px-3 py-2 text-right text-slate-500 dark:text-slate-400">{formatNum(row.balance)}</td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 mb-6"
          >
            <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4">{t.faqTitle}</h2>
            <div className="space-y-4">
              {t.faq.map((item, idx) => (
                <div key={idx}>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Q. {item.q}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AdBanner rectangle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="mb-4"
          >
            <AdBanner format="rectangle" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
}
