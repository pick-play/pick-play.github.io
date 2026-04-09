"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/i18n/config";

const translations: Record<Locale, {
  title: string;
  subtitle: string;
  birthDateLabel: string;
  yearLabel: string;
  monthLabel: string;
  dayLabel: string;
  calculateBtn: string;
  resultsTitle: string;
  koreanAge: string;
  koreanAgeUnit: string;
  yearsLived: string;
  monthsLived: string;
  daysLived: string;
  totalDays: string;
  nextBirthday: string;
  birthdayToday: string;
  daysUntilBirthday: (n: number) => string;
  dayOfWeek: string;
  zodiacSign: string;
  chineseZodiac: string;
  generation: string;
  funFacts: string;
  hoursLived: (n: string) => string;
  heartbeats: (n: string) => string;
  selectYear: string;
  selectMonth: string;
  selectDay: string;
  errorInvalid: string;
  errorFuture: string;
  days: string;
  months: string[];
  weekdays: string[];
  zodiacSigns: string[];
  chineseZodiacs: string[];
  generationLabel: (gen: string) => string;
  faqTitle: string;
  faq: { q: string; a: string }[];
}> = {
  ko: {
    title: "나이 계산기",
    subtitle: "만 나이, 띠, 생일 카운트다운을 한눈에",
    birthDateLabel: "생년월일",
    yearLabel: "년",
    monthLabel: "월",
    dayLabel: "일",
    calculateBtn: "계산하기",
    resultsTitle: "계산 결과",
    koreanAge: "만 나이",
    koreanAgeUnit: "세",
    yearsLived: "살아온 날",
    monthsLived: "개월",
    daysLived: "일",
    totalDays: "총 살아온 날",
    nextBirthday: "다음 생일",
    birthdayToday: "오늘이 생일이에요! 🎂",
    daysUntilBirthday: (n) => `D-${n}`,
    dayOfWeek: "태어난 요일",
    zodiacSign: "별자리",
    chineseZodiac: "띠",
    generation: "세대",
    funFacts: "재미있는 사실",
    hoursLived: (n) => `약 ${n}시간을 살았어요`,
    heartbeats: (n) => `약 ${n}번 심장이 뛰었어요`,
    selectYear: "년도 선택",
    selectMonth: "월 선택",
    selectDay: "일 선택",
    errorInvalid: "올바른 날짜를 입력해주세요",
    errorFuture: "미래 날짜는 입력할 수 없어요",
    days: "일",
    months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    weekdays: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
    zodiacSigns: ["염소자리", "물병자리", "물고기자리", "양자리", "황소자리", "쌍둥이자리", "게자리", "사자자리", "처녀자리", "천칭자리", "전갈자리", "사수자리"],
    chineseZodiacs: ["쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양", "원숭이", "닭", "개", "돼지"],
    generationLabel: (gen) => gen,
    faqTitle: "자주 묻는 질문",
    faq: [
      {
        q: "만 나이란 무엇인가요?",
        a: "만 나이는 태어난 날부터 현재까지 실제로 지난 햇수를 세는 방식입니다. 생일이 지나지 않았으면 올해 연도에서 태어난 연도를 뺀 후 1을 빼고, 생일이 지났으면 그대로 뺍니다.",
      },
      {
        q: "별자리는 어떻게 계산하나요?",
        a: "서양 별자리(황도 12궁)는 태어난 월과 일을 기준으로 정해집니다. 예를 들어 3월 21일부터 4월 19일 사이에 태어났다면 양자리입니다.",
      },
      {
        q: "띠는 어떻게 결정되나요?",
        a: "띠는 태어난 해를 12로 나눈 나머지를 기준으로 정해지는 12가지 동물 상징입니다. 2024년은 용띠 해입니다.",
      },
    ],
  },
  en: {
    title: "Age Calculator",
    subtitle: "Calculate your age, zodiac, and birthday countdown",
    birthDateLabel: "Date of Birth",
    yearLabel: "Year",
    monthLabel: "Month",
    dayLabel: "Day",
    calculateBtn: "Calculate",
    resultsTitle: "Results",
    koreanAge: "Age",
    koreanAgeUnit: "years old",
    yearsLived: "Years lived",
    monthsLived: "months",
    daysLived: "days",
    totalDays: "Total days lived",
    nextBirthday: "Next birthday",
    birthdayToday: "Happy Birthday! 🎂",
    daysUntilBirthday: (n) => `${n} days away`,
    dayOfWeek: "Born on",
    zodiacSign: "Zodiac sign",
    chineseZodiac: "Chinese zodiac",
    generation: "Generation",
    funFacts: "Fun facts",
    hoursLived: (n) => `You've lived approximately ${n} hours`,
    heartbeats: (n) => `Your heart has beaten about ${n} times`,
    selectYear: "Select year",
    selectMonth: "Select month",
    selectDay: "Select day",
    errorInvalid: "Please enter a valid date",
    errorFuture: "Future dates are not allowed",
    days: "days",
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    zodiacSigns: ["Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"],
    chineseZodiacs: ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"],
    generationLabel: (gen) => gen,
    faqTitle: "Frequently Asked Questions",
    faq: [
      {
        q: "How is age calculated?",
        a: "Age is calculated by counting the full years elapsed since your birth date. If your birthday has not yet occurred this year, we subtract one from the year difference.",
      },
      {
        q: "How is the zodiac sign determined?",
        a: "Western zodiac signs are based on the month and day of birth. For example, if you were born between March 21 and April 19, your sign is Aries.",
      },
      {
        q: "What is the Chinese zodiac?",
        a: "The Chinese zodiac assigns one of 12 animal symbols to each year in a repeating 12-year cycle. 2024 is the Year of the Dragon.",
      },
    ],
  },
  ja: {
    title: "年齢計算機",
    subtitle: "年齢・干支・誕生日カウントダウンを一目で",
    birthDateLabel: "生年月日",
    yearLabel: "年",
    monthLabel: "月",
    dayLabel: "日",
    calculateBtn: "計算する",
    resultsTitle: "計算結果",
    koreanAge: "満年齢",
    koreanAgeUnit: "歳",
    yearsLived: "生きた年数",
    monthsLived: "ヶ月",
    daysLived: "日",
    totalDays: "生きた総日数",
    nextBirthday: "次の誕生日",
    birthdayToday: "お誕生日おめでとう！🎂",
    daysUntilBirthday: (n) => `あと${n}日`,
    dayOfWeek: "生まれた曜日",
    zodiacSign: "星座",
    chineseZodiac: "干支",
    generation: "世代",
    funFacts: "豆知識",
    hoursLived: (n) => `約${n}時間生きてきました`,
    heartbeats: (n) => `心臓が約${n}回鼓動しました`,
    selectYear: "年を選択",
    selectMonth: "月を選択",
    selectDay: "日を選択",
    errorInvalid: "正しい日付を入力してください",
    errorFuture: "未来の日付は入力できません",
    days: "日",
    months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    weekdays: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
    zodiacSigns: ["山羊座", "水瓶座", "魚座", "牡羊座", "牡牛座", "双子座", "蟹座", "獅子座", "乙女座", "天秤座", "蠍座", "射手座"],
    chineseZodiacs: ["子（ねずみ）", "丑（うし）", "寅（とら）", "卯（うさぎ）", "辰（たつ）", "巳（へび）", "午（うま）", "未（ひつじ）", "申（さる）", "酉（とり）", "戌（いぬ）", "亥（いのしし）"],
    generationLabel: (gen) => gen,
    faqTitle: "よくある質問",
    faq: [
      {
        q: "満年齢とは何ですか？",
        a: "満年齢は、誕生日から現在までの実際に経過した年数を数える方法です。今年の誕生日がまだ来ていない場合は1を引き、過ぎている場合はそのまま計算します。",
      },
      {
        q: "星座はどのように決まりますか？",
        a: "西洋占星術の星座は、生まれた月と日を基に決まります。例えば3月21日〜4月19日生まれなら牡羊座です。",
      },
      {
        q: "干支はどのように決まりますか？",
        a: "干支は生まれた年を12で割った余りを基に決まる12種類の動物シンボルです。2024年は辰（たつ）年です。",
      },
    ],
  },
  zh: {
    title: "年龄计算器",
    subtitle: "计算年龄、生肖与生日倒计时",
    birthDateLabel: "出生日期",
    yearLabel: "年",
    monthLabel: "月",
    dayLabel: "日",
    calculateBtn: "立即计算",
    resultsTitle: "计算结果",
    koreanAge: "周岁",
    koreanAgeUnit: "岁",
    yearsLived: "已活岁数",
    monthsLived: "个月",
    daysLived: "天",
    totalDays: "总计天数",
    nextBirthday: "下次生日",
    birthdayToday: "生日快乐！🎂",
    daysUntilBirthday: (n) => `还有${n}天`,
    dayOfWeek: "出生星期",
    zodiacSign: "星座",
    chineseZodiac: "生肖",
    generation: "世代",
    funFacts: "趣味数据",
    hoursLived: (n) => `您已经大约活了${n}小时`,
    heartbeats: (n) => `您的心脏大约跳动了${n}次`,
    selectYear: "选择年份",
    selectMonth: "选择月份",
    selectDay: "选择日期",
    errorInvalid: "请输入正确的日期",
    errorFuture: "不能输入未来日期",
    days: "天",
    months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    weekdays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    zodiacSigns: ["摩羯座", "水瓶座", "双鱼座", "白羊座", "金牛座", "双子座", "巨蟹座", "狮子座", "处女座", "天秤座", "天蝎座", "射手座"],
    chineseZodiacs: ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
    generationLabel: (gen) => gen,
    faqTitle: "常见问题",
    faq: [
      {
        q: "周岁是如何计算的？",
        a: "周岁是从出生日期到当前日期经过的完整年数。如果今年的生日还没到，则用年份差减去1；如果已过生日，则直接用年份差。",
      },
      {
        q: "星座是如何确定的？",
        a: "西方星座根据出生的月份和日期来确定。例如，出生在3月21日至4月19日之间的人是白羊座。",
      },
      {
        q: "生肖是如何确定的？",
        a: "生肖是将出生年份除以12所得余数对应的12种动物之一，循环周期为12年。2024年是龙年。",
      },
    ],
  },
  es: {
    title: "Calculadora de Edad",
    subtitle: "Calcula tu edad, signo zodiacal y cuenta regresiva de cumpleaños",
    birthDateLabel: "Fecha de nacimiento",
    yearLabel: "Año",
    monthLabel: "Mes",
    dayLabel: "Día",
    calculateBtn: "Calcular",
    resultsTitle: "Resultados",
    koreanAge: "Edad",
    koreanAgeUnit: "años",
    yearsLived: "Años vividos",
    monthsLived: "meses",
    daysLived: "días",
    totalDays: "Total de días vividos",
    nextBirthday: "Próximo cumpleaños",
    birthdayToday: "¡Feliz cumpleaños! 🎂",
    daysUntilBirthday: (n) => `Faltan ${n} días`,
    dayOfWeek: "Día de nacimiento",
    zodiacSign: "Signo zodiacal",
    chineseZodiac: "Zodiaco chino",
    generation: "Generación",
    funFacts: "Datos curiosos",
    hoursLived: (n) => `Has vivido aproximadamente ${n} horas`,
    heartbeats: (n) => `Tu corazón ha latido unas ${n} veces`,
    selectYear: "Seleccionar año",
    selectMonth: "Seleccionar mes",
    selectDay: "Seleccionar día",
    errorInvalid: "Por favor ingresa una fecha válida",
    errorFuture: "No se permiten fechas futuras",
    days: "días",
    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    weekdays: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    zodiacSigns: ["Capricornio", "Acuario", "Piscis", "Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario"],
    chineseZodiacs: ["Rata", "Buey", "Tigre", "Conejo", "Dragón", "Serpiente", "Caballo", "Cabra", "Mono", "Gallo", "Perro", "Cerdo"],
    generationLabel: (gen) => gen,
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Cómo se calcula la edad?",
        a: "La edad se calcula contando los años completos transcurridos desde la fecha de nacimiento. Si aún no ha ocurrido el cumpleaños este año, se resta uno a la diferencia de años.",
      },
      {
        q: "¿Cómo se determina el signo zodiacal?",
        a: "Los signos del zodiaco occidental se determinan por el mes y día de nacimiento. Por ejemplo, si naciste entre el 21 de marzo y el 19 de abril, tu signo es Aries.",
      },
      {
        q: "¿Qué es el zodiaco chino?",
        a: "El zodiaco chino asigna uno de 12 animales a cada año en un ciclo de 12 años. El año 2024 es el Año del Dragón.",
      },
    ],
  },
};

function getZodiacSign(month: number, day: number): number {
  // Returns index into zodiacSigns array
  const dates = [20, 19, 20, 20, 21, 21, 23, 23, 23, 23, 22, 22];
  if (day <= dates[month - 1]) {
    return month - 1;
  }
  return month % 12;
}

function getChineseZodiac(year: number): number {
  return ((year - 2020) % 12 + 12) % 12;
  // 2020 = rat(0), 2021 = ox(1), ...
}

function getGeneration(year: number): string {
  if (year >= 2013) return "Gen Alpha";
  if (year >= 1997) return "Gen Z";
  if (year >= 1981) return "Millennial";
  if (year >= 1965) return "Gen X";
  if (year >= 1946) return "Boomer";
  return "Silent Generation";
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  nextBirthdayDays: number;
  isBirthdayToday: boolean;
  weekdayIndex: number;
  zodiacIndex: number;
  chineseZodiacIndex: number;
  generation: string;
  hoursLived: string;
  heartbeats: string;
}

function calculateAge(birthYear: number, birthMonth: number, birthDay: number): AgeResult {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  // Korean age (만 나이)
  let years = todayYear - birthYear;
  let months = todayMonth - birthMonth;
  let days = todayDay - birthDay;

  if (days < 0) {
    months -= 1;
    days += getDaysInMonth(todayYear, todayMonth - 1 === 0 ? 12 : todayMonth - 1);
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Total days
  const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
  const totalDays = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));

  // Next birthday
  const isBirthdayToday = todayMonth === birthMonth && todayDay === birthDay;
  let nextBirthdayDays = 0;
  if (!isBirthdayToday) {
    let nextBirthday = new Date(todayYear, birthMonth - 1, birthDay);
    if (nextBirthday <= today) {
      nextBirthday = new Date(todayYear + 1, birthMonth - 1, birthDay);
    }
    nextBirthdayDays = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  }

  const weekdayIndex = birthDate.getDay();
  const zodiacIndex = getZodiacSign(birthMonth, birthDay);
  const chineseZodiacIndex = getChineseZodiac(birthYear);
  const generation = getGeneration(birthYear);

  const hoursLived = (totalDays * 24).toLocaleString();
  const heartbeats = Math.floor(totalDays * 24 * 60 * 70).toLocaleString();

  return {
    years,
    months,
    days,
    totalDays,
    nextBirthdayDays,
    isBirthdayToday,
    weekdayIndex,
    zodiacIndex,
    chineseZodiacIndex,
    generation,
    hoursLived,
    heartbeats,
  };
}

const ZODIAC_EMOJIS = ["♑", "♒", "♓", "♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐"];
const CHINESE_ZODIAC_EMOJIS = ["🐭", "🐮", "🐯", "🐰", "🐲", "🐍", "🐴", "🐑", "🐵", "🐔", "🐶", "🐷"];

export default function AgeCalculatorPage() {
  const locale = useLocale();
  const t = translations[locale] ?? translations.ko;

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

  const [birthYear, setBirthYear] = useState<number | "">("");
  const [birthMonth, setBirthMonth] = useState<number | "">("");
  const [birthDay, setBirthDay] = useState<number | "">("");
  const [result, setResult] = useState<AgeResult | null>(null);
  const [error, setError] = useState("");

  const daysInMonth = useMemo(() => {
    if (birthYear !== "" && birthMonth !== "") {
      return getDaysInMonth(Number(birthYear), Number(birthMonth));
    }
    return 31;
  }, [birthYear, birthMonth]);

  const dayOptions = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  function handleCalculate() {
    setError("");
    if (birthYear === "" || birthMonth === "" || birthDay === "") {
      setError(t.errorInvalid);
      return;
    }
    const y = Number(birthYear);
    const m = Number(birthMonth);
    const d = Number(birthDay);
    const date = new Date(y, m - 1, d);
    if (date.getFullYear() !== y || date.getMonth() + 1 !== m || date.getDate() !== d) {
      setError(t.errorInvalid);
      return;
    }
    if (date > new Date()) {
      setError(t.errorFuture);
      return;
    }
    setResult(calculateAge(y, m, d));
  }

  const selectClass =
    "flex-1 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400 appearance-none cursor-pointer";

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/20 dark:from-slate-950 dark:via-cyan-950/20 dark:to-blue-950/10">
        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white text-2xl mb-3 shadow-md">
              🎂
            </div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-1">
              {t.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{t.subtitle}</p>
          </div>

          <AdBanner format="horizontal" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

          {/* Input Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-4 mt-4">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
              {t.birthDateLabel}
            </p>
            <div className="flex gap-2">
              {/* Year */}
              <select
                value={birthYear}
                onChange={(e) => {
                  setBirthYear(e.target.value === "" ? "" : Number(e.target.value));
                  setResult(null);
                  setError("");
                }}
                className={selectClass}
                aria-label={t.yearLabel}
              >
                <option value="">{t.selectYear}</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}{locale === "ko" || locale === "ja" || locale === "zh" ? t.yearLabel : ""}</option>
                ))}
              </select>

              {/* Month */}
              <select
                value={birthMonth}
                onChange={(e) => {
                  setBirthMonth(e.target.value === "" ? "" : Number(e.target.value));
                  setBirthDay("");
                  setResult(null);
                  setError("");
                }}
                className={selectClass}
                aria-label={t.monthLabel}
              >
                <option value="">{t.selectMonth}</option>
                {t.months.map((m, i) => (
                  <option key={i + 1} value={i + 1}>{m}</option>
                ))}
              </select>

              {/* Day */}
              <select
                value={birthDay}
                onChange={(e) => {
                  setBirthDay(e.target.value === "" ? "" : Number(e.target.value));
                  setResult(null);
                  setError("");
                }}
                className={selectClass}
                aria-label={t.dayLabel}
              >
                <option value="">{t.selectDay}</option>
                {dayOptions.map((d) => (
                  <option key={d} value={d}>{d}{locale === "ko" || locale === "ja" || locale === "zh" ? t.dayLabel : ""}</option>
                ))}
              </select>
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

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-md hover:shadow-lg transition-all mb-4"
          >
            {t.calculateBtn}
          </button>

          {/* Results */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
              >
                {/* Main Age Card */}
                <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl p-5 shadow-md mb-4 text-white text-center">
                  <p className="text-sm font-medium opacity-80 mb-1">{t.koreanAge}</p>
                  <p className="text-6xl font-extrabold mb-1">{result.years}</p>
                  <p className="text-lg font-semibold opacity-90">{t.koreanAgeUnit}</p>
                  <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-white/20">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{result.months}</p>
                      <p className="text-xs opacity-75">{t.monthsLived}</p>
                    </div>
                    <div className="w-px bg-white/20" />
                    <div className="text-center">
                      <p className="text-2xl font-bold">{result.days}</p>
                      <p className="text-xs opacity-75">{t.daysLived}</p>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {/* Total Days */}
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">{t.totalDays}</p>
                    <p className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
                      {result.totalDays.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{t.days}</p>
                  </div>

                  {/* Next Birthday */}
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">{t.nextBirthday}</p>
                    {result.isBirthdayToday ? (
                      <p className="text-sm font-bold text-pink-500">{t.birthdayToday}</p>
                    ) : (
                      <>
                        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                          {t.daysUntilBirthday(result.nextBirthdayDays)}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Day of week */}
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">{t.dayOfWeek}</p>
                    <p className="text-xl font-bold text-slate-700 dark:text-slate-200">
                      {t.weekdays[result.weekdayIndex]}
                    </p>
                  </div>

                  {/* Generation */}
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">{t.generation}</p>
                    <p className="text-lg font-bold text-slate-700 dark:text-slate-200">
                      {t.generationLabel(result.generation)}
                    </p>
                  </div>
                </div>

                {/* Zodiac Row */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                    <span className="text-3xl">{ZODIAC_EMOJIS[result.zodiacIndex]}</span>
                    <div>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{t.zodiacSign}</p>
                      <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">
                        {t.zodiacSigns[result.zodiacIndex]}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                    <span className="text-3xl">{CHINESE_ZODIAC_EMOJIS[result.chineseZodiacIndex]}</span>
                    <div>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{t.chineseZodiac}</p>
                      <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">
                        {t.chineseZodiacs[result.chineseZodiacIndex]}
                      </p>
                    </div>
                  </div>
                </div>

                <AdBanner format="in-article" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

                {/* Fun Facts */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mt-4">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                    {t.funFacts}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl">
                      <span className="text-xl">⏰</span>
                      <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">
                        {t.hoursLived(result.hoursLived)}
                      </p>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                      <span className="text-xl">💓</span>
                      <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">
                        {t.heartbeats(result.heartbeats)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AdBanner format="rectangle" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

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
