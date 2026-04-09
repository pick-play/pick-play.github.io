"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/i18n/config";

const translations: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    startDateLabel: string;
    endDateLabel: string;
    salaryLabel: string;
    salaryUnit: string;
    includeLeaveToggle: string;
    leavePayLabel: string;
    calculateBtn: string;
    resetBtn: string;
    resultsTitle: string;
    workPeriod: string;
    years: string;
    months: string;
    days: string;
    totalWorkDays: string;
    dailyAvgWage: string;
    severancePay: string;
    incomeTax: string;
    netSeverance: string;
    taxNote: string;
    infoTitle: string;
    infoItems: string[];
    faqTitle: string;
    faq: { q: string; a: string }[];
    errorStartDate: string;
    errorEndDate: string;
    errorDateOrder: string;
    errorMinPeriod: string;
    errorSalary: string;
    unit: string;
    taxRateLabel: string;
    formulaTitle: string;
    formulaItems: string[];
  }
> = {
  ko: {
    title: "퇴직금 계산기",
    subtitle: "퇴직금 자동 계산 · 퇴직소득세 추정",
    startDateLabel: "입사일",
    endDateLabel: "퇴직일",
    salaryLabel: "월 급여",
    salaryUnit: "만원",
    includeLeaveToggle: "연차수당 포함",
    leavePayLabel: "연차수당 (만원)",
    calculateBtn: "계산하기",
    resetBtn: "초기화",
    resultsTitle: "계산 결과",
    workPeriod: "근속 기간",
    years: "년",
    months: "개월",
    days: "일",
    totalWorkDays: "총 근속 일수",
    dailyAvgWage: "1일 평균임금",
    severancePay: "퇴직금",
    incomeTax: "퇴직소득세 (추정)",
    netSeverance: "실수령 퇴직금",
    taxNote: "* 세액은 간이 추정치입니다. 실제 세금은 세무사 확인을 권장합니다.",
    infoTitle: "퇴직금 제도 안내",
    infoItems: [
      "1년 이상 근무한 근로자는 퇴직금을 받을 권리가 있습니다.",
      "퇴직금 = 1일 평균임금 × 30일 × 근속연수",
      "1일 평균임금 = 퇴직 전 3개월 임금 총액 ÷ 퇴직 전 3개월 총일수",
      "2012년 7월 이후 입사자는 DC형 퇴직연금이 적용될 수 있습니다.",
      "퇴직금은 퇴직 후 14일 이내 지급되어야 합니다.",
    ],
    faqTitle: "자주 묻는 질문",
    faq: [
      {
        q: "퇴직금은 언제 받을 수 있나요?",
        a: "근로기준법에 따라 퇴직일로부터 14일 이내에 지급되어야 합니다. 당사자 합의 시 연장 가능합니다.",
      },
      {
        q: "1년 미만 근무하면 퇴직금이 없나요?",
        a: "맞습니다. 퇴직금은 1년 이상 근무한 경우에만 발생합니다. 1년 미만 근무 시에는 법적으로 퇴직금 지급 의무가 없습니다.",
      },
      {
        q: "퇴직금 계산 시 포함되는 임금은 무엇인가요?",
        a: "기본급 외에도 정기적·일률적으로 지급되는 각종 수당(식대, 교통비 등)이 포함됩니다. 비정기적 지급금은 제외될 수 있습니다.",
      },
    ],
    errorStartDate: "입사일을 입력해주세요",
    errorEndDate: "퇴직일을 입력해주세요",
    errorDateOrder: "퇴직일은 입사일 이후여야 합니다",
    errorMinPeriod: "퇴직금은 1년 이상 근무한 경우에 발생합니다",
    errorSalary: "월 급여를 입력해주세요",
    unit: "만원",
    taxRateLabel: "적용 세율",
    formulaTitle: "계산 공식",
    formulaItems: [
      "퇴직금 = 1일 평균임금 × 30 × 근속연수",
      "1일 평균임금 = 월급 × 3 ÷ 91일 (간이 계산)",
    ],
  },
  en: {
    title: "Severance Pay Calculator",
    subtitle: "Estimate Korean severance pay & income tax",
    startDateLabel: "Start Date",
    endDateLabel: "End Date",
    salaryLabel: "Monthly Salary",
    salaryUnit: "10k KRW",
    includeLeaveToggle: "Include Annual Leave Pay",
    leavePayLabel: "Annual Leave Pay (10k KRW)",
    calculateBtn: "Calculate",
    resetBtn: "Reset",
    resultsTitle: "Results",
    workPeriod: "Work Period",
    years: "yr",
    months: "mo",
    days: "d",
    totalWorkDays: "Total Work Days",
    dailyAvgWage: "Daily Average Wage",
    severancePay: "Severance Pay",
    incomeTax: "Income Tax (estimated)",
    netSeverance: "Net Severance Pay",
    taxNote: "* Tax is a simplified estimate. Consult a tax advisor for accurate figures.",
    infoTitle: "About Korean Severance Pay",
    infoItems: [
      "Employees who have worked 1+ years are entitled to severance pay.",
      "Severance = Daily Average Wage × 30 days × Years of Service",
      "Daily Average Wage = Total wages in last 3 months ÷ Total days in last 3 months",
      "Employees hired after July 2012 may be enrolled in a DC pension plan.",
      "Severance must be paid within 14 days of termination.",
    ],
    faqTitle: "Frequently Asked Questions",
    faq: [
      {
        q: "When should severance pay be paid?",
        a: "Under Korean Labor Standards Act, severance must be paid within 14 days of the termination date. An extension is possible with mutual agreement.",
      },
      {
        q: "Is there no severance if I worked less than 1 year?",
        a: "Correct. Severance pay is only triggered when employment lasts 1 year or more. There is no legal obligation to pay severance for less than 1 year.",
      },
      {
        q: "What wages are included in the calculation?",
        a: "Regular and fixed allowances (meals, transport, etc.) are included in addition to base salary. Irregular payments may be excluded.",
      },
    ],
    errorStartDate: "Please enter the start date",
    errorEndDate: "Please enter the end date",
    errorDateOrder: "End date must be after start date",
    errorMinPeriod: "Severance only applies when employment is 1 year or more",
    errorSalary: "Please enter monthly salary",
    unit: "10k KRW",
    taxRateLabel: "Applied Tax Rate",
    formulaTitle: "Formula",
    formulaItems: [
      "Severance = Daily Average Wage × 30 × Years of Service",
      "Daily Average Wage = Monthly Salary × 3 ÷ 91 (simplified)",
    ],
  },
  ja: {
    title: "退職金計算機",
    subtitle: "退職金の自動計算・退職所得税の推定",
    startDateLabel: "入社日",
    endDateLabel: "退職日",
    salaryLabel: "月給",
    salaryUnit: "万ウォン",
    includeLeaveToggle: "年次有給休暇手当を含む",
    leavePayLabel: "年次有給休暇手当（万ウォン）",
    calculateBtn: "計算する",
    resetBtn: "リセット",
    resultsTitle: "計算結果",
    workPeriod: "勤続期間",
    years: "年",
    months: "ヶ月",
    days: "日",
    totalWorkDays: "総勤続日数",
    dailyAvgWage: "1日平均賃金",
    severancePay: "退職金",
    incomeTax: "退職所得税（推定）",
    netSeverance: "手取り退職金",
    taxNote: "※ 税額は簡易推定です。正確な税額は税理士にご確認ください。",
    infoTitle: "退職金制度について",
    infoItems: [
      "1年以上勤務した労働者は退職金を受け取る権利があります。",
      "退職金 = 1日平均賃金 × 30日 × 勤続年数",
      "1日平均賃金 = 直近3ヶ月の賃金総額 ÷ 直近3ヶ月の総日数",
      "2012年7月以降の入社者はDC型退職年金が適用される場合があります。",
      "退職金は退職後14日以内に支払われなければなりません。",
    ],
    faqTitle: "よくある質問",
    faq: [
      {
        q: "退職金はいつ受け取れますか？",
        a: "韓国労働基準法により、退職日から14日以内に支払われなければなりません。当事者間の合意により延長することも可能です。",
      },
      {
        q: "1年未満の勤務では退職金はもらえませんか？",
        a: "その通りです。退職金は1年以上勤務した場合にのみ発生します。1年未満の場合、法律上の支払義務はありません。",
      },
      {
        q: "計算に含まれる賃金は何ですか？",
        a: "基本給のほか、定期・一律に支給される各種手当（食事代、交通費など）が含まれます。非定期的な支給金は除外される場合があります。",
      },
    ],
    errorStartDate: "入社日を入力してください",
    errorEndDate: "退職日を入力してください",
    errorDateOrder: "退職日は入社日より後でなければなりません",
    errorMinPeriod: "退職金は1年以上勤務した場合に発生します",
    errorSalary: "月給を入力してください",
    unit: "万ウォン",
    taxRateLabel: "適用税率",
    formulaTitle: "計算式",
    formulaItems: [
      "退職金 = 1日平均賃金 × 30 × 勤続年数",
      "1日平均賃金 = 月給 × 3 ÷ 91日（簡易計算）",
    ],
  },
  zh: {
    title: "退职金计算器",
    subtitle: "自动计算退职金及退职所得税估算",
    startDateLabel: "入职日期",
    endDateLabel: "离职日期",
    salaryLabel: "月薪",
    salaryUnit: "万韩元",
    includeLeaveToggle: "包含年假工资",
    leavePayLabel: "年假工资「万韩元」",
    calculateBtn: "立即计算",
    resetBtn: "重置",
    resultsTitle: "计算结果",
    workPeriod: "工作年限",
    years: "年",
    months: "个月",
    days: "天",
    totalWorkDays: "总工作天数",
    dailyAvgWage: "日均工资",
    severancePay: "退职金",
    incomeTax: "退职所得税「估算」",
    netSeverance: "实收退职金",
    taxNote: "* 税额为简易估算，建议咨询税务师获取准确数据。",
    infoTitle: "退职金制度说明",
    infoItems: [
      "工作满1年的员工享有退职金权利。",
      "退职金 = 日均工资 × 30天 × 工作年数",
      "日均工资 = 最近3个月工资总额 ÷ 最近3个月总天数",
      "2012年7月后入职者可能适用DC型退职年金。",
      "退职金须在离职后14天内支付。",
    ],
    faqTitle: "常见问题",
    faq: [
      {
        q: "退职金何时支付？",
        a: "根据韩国劳动基准法，退职金须在离职日起14天内支付。双方协商一致可延期支付。",
      },
      {
        q: "工作不满1年没有退职金吗？",
        a: "是的。退职金仅在工作满1年时产生。工作不满1年，法律上没有支付退职金的义务。",
      },
      {
        q: "计算中包含哪些工资？",
        a: "除基本工资外，还包括定期、统一发放的各类津贴「餐费、交通费等」。非定期性支付可能被排除。",
      },
    ],
    errorStartDate: "请输入入职日期",
    errorEndDate: "请输入离职日期",
    errorDateOrder: "离职日期须晚于入职日期",
    errorMinPeriod: "退职金仅适用于工作满1年的情况",
    errorSalary: "请输入月薪",
    unit: "万韩元",
    taxRateLabel: "适用税率",
    formulaTitle: "计算公式",
    formulaItems: [
      "退职金 = 日均工资 × 30 × 工作年数",
      "日均工资 = 月薪 × 3 ÷ 91天「简易计算」",
    ],
  },
  es: {
    title: "Calculadora de Indemnización",
    subtitle: "Calcula tu indemnización laboral coreana y el impuesto estimado",
    startDateLabel: "Fecha de inicio",
    endDateLabel: "Fecha de fin",
    salaryLabel: "Salario mensual",
    salaryUnit: "10k KRW",
    includeLeaveToggle: "Incluir pago de vacaciones",
    leavePayLabel: "Pago de vacaciones (10k KRW)",
    calculateBtn: "Calcular",
    resetBtn: "Restablecer",
    resultsTitle: "Resultados",
    workPeriod: "Período laboral",
    years: "año(s)",
    months: "mes(es)",
    days: "día(s)",
    totalWorkDays: "Total días trabajados",
    dailyAvgWage: "Salario diario promedio",
    severancePay: "Indemnización",
    incomeTax: "Impuesto estimado",
    netSeverance: "Indemnización neta",
    taxNote: "* El impuesto es una estimación simplificada. Consulte a un asesor fiscal.",
    infoTitle: "Sobre la indemnización coreana",
    infoItems: [
      "Los empleados con 1+ año tienen derecho a indemnización.",
      "Indemnización = Salario diario × 30 días × Años de servicio",
      "Salario diario = Total salario últimos 3 meses ÷ Total días últimos 3 meses",
      "Los empleados contratados después de julio de 2012 pueden estar en un plan DC.",
      "La indemnización debe pagarse dentro de los 14 días del despido.",
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Cuándo se paga la indemnización?",
        a: "Según la Ley de Normas Laborales de Corea, debe pagarse dentro de 14 días. Puede extenderse con acuerdo mutuo.",
      },
      {
        q: "¿No hay indemnización si trabajé menos de 1 año?",
        a: "Correcto. La indemnización solo aplica cuando la relación laboral dura 1 año o más.",
      },
      {
        q: "¿Qué salarios se incluyen en el cálculo?",
        a: "Además del salario base, se incluyen asignaciones regulares y fijas (comida, transporte, etc.). Los pagos irregulares pueden excluirse.",
      },
    ],
    errorStartDate: "Por favor ingresa la fecha de inicio",
    errorEndDate: "Por favor ingresa la fecha de fin",
    errorDateOrder: "La fecha de fin debe ser posterior a la de inicio",
    errorMinPeriod: "La indemnización solo aplica con 1 año o más de servicio",
    errorSalary: "Por favor ingresa el salario mensual",
    unit: "10k KRW",
    taxRateLabel: "Tasa impositiva aplicada",
    formulaTitle: "Fórmula",
    formulaItems: [
      "Indemnización = Salario diario × 30 × Años de servicio",
      "Salario diario = Salario mensual × 3 ÷ 91 (simplificado)",
    ],
  },
};

/** Simplified Korean severance income tax (퇴직소득세) estimate */
function estimateTax(severanceWon: number): { tax: number; rate: number } {
  // Simplified progressive rate on severance (not the full formula, but reasonable estimate)
  const s = severanceWon;
  let tax = 0;
  if (s <= 10_000_000) {
    tax = s * 0.06;
  } else if (s <= 40_000_000) {
    tax = 10_000_000 * 0.06 + (s - 10_000_000) * 0.15;
  } else if (s <= 80_000_000) {
    tax = 10_000_000 * 0.06 + 30_000_000 * 0.15 + (s - 40_000_000) * 0.24;
  } else if (s <= 150_000_000) {
    tax = 10_000_000 * 0.06 + 30_000_000 * 0.15 + 40_000_000 * 0.24 + (s - 80_000_000) * 0.35;
  } else {
    tax =
      10_000_000 * 0.06 +
      30_000_000 * 0.15 +
      40_000_000 * 0.24 +
      70_000_000 * 0.35 +
      (s - 150_000_000) * 0.38;
  }
  const rate = s > 0 ? (tax / s) * 100 : 0;
  return { tax: Math.round(tax), rate: Math.round(rate * 10) / 10 };
}

function calcWorkPeriod(start: Date, end: Date) {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const yearsDecimal = totalDays / 365;
  return { years, months, days, totalDays, yearsDecimal };
}

function formatWon(won: number): string {
  return won.toLocaleString("ko-KR");
}

export default function SeveranceCalculatorPage() {
  const locale = useLocale() as Locale;
  const t = translations[locale] ?? translations.ko;

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [salary, setSalary] = useState("");
  const [includeLeavePay, setIncludeLeavePay] = useState(false);
  const [leavePay, setLeavePay] = useState("");
  const [error, setError] = useState("");
  const [calculated, setCalculated] = useState(false);

  const result = useMemo(() => {
    if (!calculated || !startDate || !endDate || !salary) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const { years, months, days, totalDays, yearsDecimal } = calcWorkPeriod(start, end);
    const monthlySalaryWon = parseFloat(salary) * 10000;
    const leavePayWon = includeLeavePay && leavePay ? parseFloat(leavePay) * 10000 : 0;
    const totalMonthlySalary = monthlySalaryWon + leavePayWon;
    // 1일 평균임금 = 최근 3개월 임금총액 / 91일 (simplified: 3 months ≈ 91 days)
    const dailyAvgWage = (totalMonthlySalary * 3) / 91;
    // 퇴직금 = 1일 평균임금 × 30일 × 근속연수
    const severancePay = dailyAvgWage * 30 * yearsDecimal;
    const { tax, rate } = estimateTax(severancePay);
    const netSeverance = severancePay - tax;
    return {
      years,
      months,
      days,
      totalDays,
      yearsDecimal,
      dailyAvgWage: Math.round(dailyAvgWage),
      severancePay: Math.round(severancePay),
      tax,
      taxRate: rate,
      netSeverance: Math.round(netSeverance),
    };
  }, [calculated, startDate, endDate, salary, includeLeavePay, leavePay]);

  function handleCalculate() {
    setError("");
    if (!startDate) { setError(t.errorStartDate); return; }
    if (!endDate) { setError(t.errorEndDate); return; }
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start) { setError(t.errorDateOrder); return; }
    const { yearsDecimal } = calcWorkPeriod(start, end);
    if (yearsDecimal < 1) { setError(t.errorMinPeriod); return; }
    if (!salary || parseFloat(salary) <= 0) { setError(t.errorSalary); return; }
    setCalculated(true);
  }

  function handleReset() {
    setStartDate("");
    setEndDate("");
    setSalary("");
    setIncludeLeavePay(false);
    setLeavePay("");
    setError("");
    setCalculated(false);
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-blue-950/20 dark:to-indigo-950/10">
        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 text-center"
          >
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-2xl">💼</span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                {t.title}
              </h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t.subtitle}</p>
          </motion.div>

          {/* Ad - horizontal */}
          <div className="mb-4">
            <AdBanner format="horizontal" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
          </div>

          {/* Input Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 mb-4 space-y-4"
          >
            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.startDateLabel}
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value); setCalculated(false); }}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.endDateLabel}
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => { setEndDate(e.target.value); setCalculated(false); }}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.salaryLabel}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  placeholder="300"
                  value={salary}
                  onChange={(e) => { setSalary(e.target.value); setCalculated(false); }}
                  className="flex-1 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <span className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{t.salaryUnit}</span>
              </div>
            </div>

            {/* Annual Leave Toggle */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div
                  onClick={() => { setIncludeLeavePay(!includeLeavePay); setCalculated(false); }}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    includeLeavePay ? "bg-blue-500" : "bg-slate-300 dark:bg-slate-600"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                      includeLeavePay ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t.includeLeaveToggle}
                </span>
              </label>
            </div>

            {/* Leave Pay Input */}
            <AnimatePresence>
              {includeLeavePay && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {t.leavePayLabel}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={leavePay}
                      onChange={(e) => { setLeavePay(e.target.value); setCalculated(false); }}
                      className="flex-1 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <span className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{t.salaryUnit}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-red-500 dark:text-red-400 font-medium"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCalculate}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold text-sm shadow hover:opacity-90 active:scale-95 transition-all"
              >
                {t.calculateBtn}
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                {t.resetBtn}
              </button>
            </div>
          </motion.div>

          {/* Results */}
          <AnimatePresence>
            {calculated && result && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 mb-4"
              >
                <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                  <span className="text-lg">📊</span>
                  {t.resultsTitle}
                </h2>

                <div className="space-y-3">
                  {/* Work Period */}
                  <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{t.workPeriod}</span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 tabular-nums">
                      {result.years > 0 && `${result.years}${t.years} `}
                      {result.months > 0 && `${result.months}${t.months} `}
                      {result.days > 0 && `${result.days}${t.days}`}
                    </span>
                  </div>

                  {/* Total Work Days */}
                  <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{t.totalWorkDays}</span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 tabular-nums">
                      {result.totalDays.toLocaleString()}{t.days}
                    </span>
                  </div>

                  {/* Daily Average Wage */}
                  <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{t.dailyAvgWage}</span>
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 tabular-nums">
                      {formatWon(result.dailyAvgWage)}원
                    </span>
                  </div>

                  {/* Ad - in-article */}
                  <div className="py-2">
                    <AdBanner format="in-article" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
                  </div>

                  {/* Severance Pay */}
                  <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{t.severancePay}</span>
                    <span className="text-base font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                      {formatWon(result.severancePay)}원
                    </span>
                  </div>

                  {/* Income Tax */}
                  <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {t.incomeTax}
                      <span className="ml-1 text-xs text-slate-400">({t.taxRateLabel} {result.taxRate}%)</span>
                    </span>
                    <span className="text-sm font-semibold text-red-500 dark:text-red-400 tabular-nums">
                      -{formatWon(result.tax)}원
                    </span>
                  </div>

                  {/* Net Severance */}
                  <div className="flex items-center justify-between py-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 px-3">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{t.netSeverance}</span>
                    <span className="text-lg font-extrabold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent tabular-nums">
                      {formatWon(result.netSeverance)}원
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{t.taxNote}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Formula section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-blue-50/60 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900 p-4 mb-4"
          >
            <h3 className="text-sm font-bold text-blue-700 dark:text-blue-300 mb-2">{t.formulaTitle}</h3>
            <ul className="space-y-1">
              {t.formulaItems.map((item, i) => (
                <li key={i} className="text-xs text-blue-600 dark:text-blue-400 flex gap-2">
                  <span className="text-blue-400 flex-shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Ad - rectangle */}
          <div className="mb-4">
            <AdBanner format="rectangle" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
          </div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 mb-4"
          >
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
              <span className="text-lg">ℹ️</span>
              {t.infoTitle}
            </h2>
            <ul className="space-y-2">
              {t.infoItems.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span className="text-blue-400 flex-shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 mb-4"
          >
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-3">{t.faqTitle}</h2>
            <div className="space-y-4">
              {t.faq.map((item, i) => (
                <div key={i}>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Q. {item.q}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">A. {item.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
