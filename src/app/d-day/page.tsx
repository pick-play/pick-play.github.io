"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/hooks/useLocale";

const translations = {
  ko: {
    title: "계산기",
    subtitle: "중요한 날까지 남은 시간을 한눈에 확인하세요",
    quickAdd: "빠른 추가",
    addEvent: "이벤트 추가",
    eventNamePlaceholder: "이벤트 이름 (예: 내 생일)",
    cancel: "취소",
    add: "추가하기",
    addNew: "+ 새 D-Day 추가",
    emptyTitle: "아직 추가된 D-Day가 없어요",
    emptySubtitle: "위에서 프리셋을 선택하거나 직접 추가해보세요",
    today: "오늘이 바로 그날! 🎉",
    daysPast: (n: number) => `${n}일 지남`,
    daysLeft: (n: number) => `${n}일 남음`,
    weeks: "주",
    hours: "시간",
    minutes: "분",
    todayLabel: "오늘",
    baseDateLabel: "기준일",
    copyTitle: "결과 복사",
    deleteTitle: "삭제",
    copyDate: "날짜",
    copyDday: "디데이",
    copyTodayMsg: "오늘이 바로 그날입니다!",
    copyPastMsg: (n: number) => `${n}일이 지났습니다`,
    copyFutureMsg: (diff: number, weeks: number, rem: number) =>
      `${diff}일 남았습니다 (${weeks}주 ${rem}일)`,
    faqTitle: "자주 묻는 질문",
    faq: [
      {
        q: "D-Day는 어떻게 계산하나요?",
        a: "목표 날짜에서 오늘 날짜를 빼면 됩니다. 예를 들어 목표일이 30일 후라면 D-30, 오늘이라면 D-Day, 이미 지난 날짜라면 D+1, D+2... 로 표시됩니다. PickPlay D-Day 계산기는 날짜를 입력하면 자동으로 계산해 드립니다.",
      },
      {
        q: "여러 개의 D-Day를 동시에 관리할 수 있나요?",
        a: "네, 여러 개의 D-Day 이벤트를 동시에 추가하고 관리할 수 있습니다. 수능, 생일, 기념일 등 원하는 만큼 추가하세요. 수능·크리스마스·새해·설날·추석·생일 프리셋 버튼으로 빠르게 추가할 수도 있습니다.",
      },
      {
        q: "D-Day 결과를 공유할 수 있나요?",
        a: "네, 각 D-Day 카드 오른쪽 상단의 복사 버튼을 누르면 결과 텍스트가 클립보드에 복사됩니다. 이름, 날짜, 디데이 카운트를 포함한 텍스트가 복사되므로 카카오톡이나 SNS에 바로 붙여넣기할 수 있습니다.",
      },
    ],
    presets: {
      suneung: { label: "수능", title: "수능" },
      christmas: { label: "크리스마스", title: "크리스마스" },
      newyear: { label: "새해", title: "새해 첫날" },
      seollal: { label: "설날", title: "설날" },
      chuseok: { label: "추석", title: "추석" },
      birthday: { label: "생일", title: "내 생일" },
    },
  },
  en: {
    title: "Calculator",
    subtitle: "Track countdowns to your important dates at a glance",
    quickAdd: "Quick Add",
    addEvent: "Add Event",
    eventNamePlaceholder: "Event name (e.g. My Birthday)",
    cancel: "Cancel",
    add: "Add",
    addNew: "+ Add New D-Day",
    emptyTitle: "No D-Days added yet",
    emptySubtitle: "Pick a preset above or add one manually",
    today: "Today is the day! 🎉",
    daysPast: (n: number) => `${n} day${n !== 1 ? "s" : ""} ago`,
    daysLeft: (n: number) => `${n} day${n !== 1 ? "s" : ""} left`,
    weeks: "wks",
    hours: "hrs",
    minutes: "min",
    todayLabel: "Today",
    baseDateLabel: "Base date",
    copyTitle: "Copy result",
    deleteTitle: "Delete",
    copyDate: "Date",
    copyDday: "D-Day",
    copyTodayMsg: "Today is the day!",
    copyPastMsg: (n: number) => `${n} day${n !== 1 ? "s" : ""} have passed`,
    copyFutureMsg: (diff: number, weeks: number, rem: number) =>
      `${diff} day${diff !== 1 ? "s" : ""} left (${weeks}w ${rem}d)`,
    faqTitle: "FAQ",
    faq: [
      {
        q: "How is a D-Day calculated?",
        a: "Subtract today's date from the target date. If the target is 30 days away it shows D-30, if it's today D-Day, and if it has already passed D+1, D+2… PickPlay calculates it automatically once you enter a date.",
      },
      {
        q: "Can I manage multiple D-Days at once?",
        a: "Yes! You can add as many D-Day events as you like — exams, birthdays, anniversaries, and more. Use the preset buttons for quick access to common events.",
      },
      {
        q: "Can I share the D-Day result?",
        a: "Yes — tap the copy button on any D-Day card to copy the result to your clipboard, including the name, date and count. You can then paste it directly into any messaging app or social media.",
      },
    ],
    presets: {
      suneung: { label: "CSAT", title: "CSAT Exam" },
      christmas: { label: "Christmas", title: "Christmas" },
      newyear: { label: "New Year", title: "New Year's Day" },
      seollal: { label: "Seollal", title: "Seollal" },
      chuseok: { label: "Chuseok", title: "Chuseok" },
      birthday: { label: "Birthday", title: "My Birthday" },
    },
  },
  ja: {
    title: "カウントダウン",
    subtitle: "大切な日までの残り時間を一目で確認",
    quickAdd: "クイック追加",
    addEvent: "イベントを追加",
    eventNamePlaceholder: "イベント名（例：誕生日）",
    cancel: "キャンセル",
    add: "追加",
    addNew: "+ 新しいD-Dayを追加",
    emptyTitle: "まだD-Dayが登録されていません",
    emptySubtitle: "プリセットを選ぶか、直接追加してください",
    today: "今日がその日です！🎉",
    daysPast: (n: number) => `${n}日経過`,
    daysLeft: (n: number) => `残り${n}日`,
    weeks: "週",
    hours: "時間",
    minutes: "分",
    todayLabel: "今日",
    baseDateLabel: "基準日",
    copyTitle: "結果をコピー",
    deleteTitle: "削除",
    copyDate: "日付",
    copyDday: "D-Day",
    copyTodayMsg: "今日がその日です！",
    copyPastMsg: (n: number) => `${n}日が経過しました`,
    copyFutureMsg: (diff: number, weeks: number, rem: number) =>
      `残り${diff}日（${weeks}週${rem}日）`,
    faqTitle: "よくある質問",
    faq: [
      {
        q: "D-Dayはどのように計算されますか？",
        a: "目標日から今日の日付を引いた日数です。30日後ならD-30、今日ならD-Day、過ぎた日ならD+1…と表示されます。日付を入力すると自動で計算します。",
      },
      {
        q: "複数のD-Dayを同時に管理できますか？",
        a: "はい、試験・誕生日・記念日など、いくつでも追加できます。プリセットボタンを使うとよく使うイベントをすぐに追加できます。",
      },
      {
        q: "D-Dayの結果を共有できますか？",
        a: "はい、各カードのコピーボタンを押すと名前・日付・カウントをまとめたテキストがクリップボードにコピーされます。LINEやSNSにそのまま貼り付けられます。",
      },
    ],
    presets: {
      suneung: { label: "センター試験", title: "センター試験" },
      christmas: { label: "クリスマス", title: "クリスマス" },
      newyear: { label: "お正月", title: "元日" },
      seollal: { label: "ソルラル", title: "ソルラル" },
      chuseok: { label: "チュソク", title: "チュソク" },
      birthday: { label: "誕生日", title: "私の誕生日" },
    },
  },
  zh: {
    title: "倒计时",
    subtitle: "一目了然地查看距离重要日子的时间",
    quickAdd: "快速添加",
    addEvent: "添加事件",
    eventNamePlaceholder: "事件名称（例：我的生日）",
    cancel: "取消",
    add: "添加",
    addNew: "+ 添加新的倒计时",
    emptyTitle: "还没有添加任何倒计时",
    emptySubtitle: "从上方选择预设或手动添加",
    today: "就是今天！🎉",
    daysPast: (n: number) => `已过${n}天`,
    daysLeft: (n: number) => `还剩${n}天`,
    weeks: "周",
    hours: "小时",
    minutes: "分钟",
    todayLabel: "今天",
    baseDateLabel: "基准日期",
    copyTitle: "复制结果",
    deleteTitle: "删除",
    copyDate: "日期",
    copyDday: "倒计时",
    copyTodayMsg: "就是今天！",
    copyPastMsg: (n: number) => `已过去${n}天`,
    copyFutureMsg: (diff: number, weeks: number, rem: number) =>
      `还剩${diff}天（${weeks}周${rem}天）`,
    faqTitle: "常见问题",
    faq: [
      {
        q: "倒计时是如何计算的？",
        a: "用目标日期减去今天的日期。例如目标日期是30天后则显示D-30，今天则显示D-Day，已过去则显示D+1、D+2……输入日期后自动计算。",
      },
      {
        q: "可以同时管理多个倒计时吗？",
        a: "可以，您可以添加任意数量的倒计时事件，例如考试、生日、纪念日等。使用预设按钮可以快速添加常用事件。",
      },
      {
        q: "可以分享倒计时结果吗？",
        a: "可以，点击卡片上的复制按钮，包含名称、日期和天数的文本将被复制到剪贴板，可直接粘贴到微信或社交媒体。",
      },
    ],
    presets: {
      suneung: { label: "高考", title: "高考" },
      christmas: { label: "圣诞节", title: "圣诞节" },
      newyear: { label: "新年", title: "元旦" },
      seollal: { label: "春节", title: "春节" },
      chuseok: { label: "中秋节", title: "中秋节" },
      birthday: { label: "生日", title: "我的生日" },
    },
  },
  es: {
    title: "Calculadora",
    subtitle: "Visualiza el tiempo restante hasta tus fechas importantes",
    quickAdd: "Acceso rápido",
    addEvent: "Agregar evento",
    eventNamePlaceholder: "Nombre del evento (ej: Mi cumpleaños)",
    cancel: "Cancelar",
    add: "Agregar",
    addNew: "+ Agregar nuevo D-Day",
    emptyTitle: "Aún no hay eventos añadidos",
    emptySubtitle: "Elige un preset o agrega uno manualmente",
    today: "¡Hoy es el día! 🎉",
    daysPast: (n: number) => `Hace ${n} día${n !== 1 ? "s" : ""}`,
    daysLeft: (n: number) => `${n} día${n !== 1 ? "s" : ""} restante${n !== 1 ? "s" : ""}`,
    weeks: "sem",
    hours: "hrs",
    minutes: "min",
    todayLabel: "Hoy",
    baseDateLabel: "Fecha base",
    copyTitle: "Copiar resultado",
    deleteTitle: "Eliminar",
    copyDate: "Fecha",
    copyDday: "D-Day",
    copyTodayMsg: "¡Hoy es el día!",
    copyPastMsg: (n: number) => `Han pasado ${n} día${n !== 1 ? "s" : ""}`,
    copyFutureMsg: (diff: number, weeks: number, rem: number) =>
      `Faltan ${diff} día${diff !== 1 ? "s" : ""} (${weeks}s ${rem}d)`,
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Cómo se calcula el D-Day?",
        a: "Se resta la fecha de hoy a la fecha objetivo. Si faltan 30 días se muestra D-30, si es hoy D-Day, y si ya pasó D+1, D+2… PickPlay lo calcula automáticamente al introducir una fecha.",
      },
      {
        q: "¿Puedo gestionar varios D-Days a la vez?",
        a: "Sí, puedes agregar todos los eventos que quieras: exámenes, cumpleaños, aniversarios… Usa los botones de preset para agregar eventos comunes rápidamente.",
      },
      {
        q: "¿Puedo compartir el resultado?",
        a: "Sí, pulsa el botón de copiar en cualquier tarjeta para copiar al portapapeles el nombre, la fecha y el conteo. Luego puedes pegarlo directamente en WhatsApp o redes sociales.",
      },
    ],
    presets: {
      suneung: { label: "Examen", title: "Examen Nacional" },
      christmas: { label: "Navidad", title: "Navidad" },
      newyear: { label: "Año Nuevo", title: "Año Nuevo" },
      seollal: { label: "Seollal", title: "Seollal" },
      chuseok: { label: "Chuseok", title: "Chuseok" },
      birthday: { label: "Cumpleaños", title: "Mi Cumpleaños" },
    },
  },
};

type DayEvent = {
  id: number;
  title: string;
  emoji: string;
  targetDate: string;
};

type DayInfo = {
  diff: number;
  label: string;
  weeks: number;
  hours: number;
  minutes: number;
  isToday: boolean;
  isPast: boolean;
};

function calcDayInfo(targetDate: string): DayInfo {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  const diffMs = target.getTime() - today.getTime();
  const diff = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const isToday = diff === 0;
  const isPast = diff < 0;

  let label: string;
  if (isToday) {
    label = "D-Day";
  } else if (isPast) {
    label = `D+${Math.abs(diff)}`;
  } else {
    label = `D-${diff}`;
  }

  const absDiffMs = Math.abs(diffMs);
  const weeks = Math.floor(Math.abs(diff) / 7);
  const hours = Math.floor(absDiffMs / (1000 * 60 * 60));
  const minutes = Math.floor(absDiffMs / (1000 * 60));

  return { diff, label, weeks, hours, minutes, isToday, isPast };
}

function formatDate(dateStr: string, locale: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const localeMap: Record<string, string> = {
    ko: "ko-KR",
    en: "en-US",
    ja: "ja-JP",
    zh: "zh-CN",
    es: "es-ES",
  };
  return d.toLocaleDateString(localeMap[locale] ?? "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
}

function getTodayString(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getDateString(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getNextMonthDay(month: number, day: number): string {
  const today = new Date();
  const year = today.getFullYear();
  const candidate = new Date(year, month - 1, day);
  if (candidate < today) {
    candidate.setFullYear(year + 1);
  }
  const yyyy = candidate.getFullYear();
  const mm = String(candidate.getMonth() + 1).padStart(2, "0");
  const dd = String(candidate.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getNextChuseok(): string {
  const today = new Date();
  const year = today.getFullYear();
  const dates: Record<number, string> = {
    2025: "2025-10-06",
    2026: "2026-09-25",
    2027: "2027-09-15",
  };
  const candidate = dates[year] ? new Date(dates[year]) : new Date(year, 9, 1);
  if (candidate < today && dates[year + 1]) {
    return dates[year + 1];
  }
  return dates[year] ?? `${year}-10-01`;
}

function getNextSeollal(): string {
  const today = new Date();
  const year = today.getFullYear();
  const dates: Record<number, string> = {
    2025: "2025-01-29",
    2026: "2026-02-17",
    2027: "2027-02-06",
  };
  const candidate = dates[year] ? new Date(dates[year]) : new Date(year, 0, 28);
  if (candidate < today && dates[year + 1]) {
    return dates[year + 1];
  }
  return dates[year] ?? `${year}-01-28`;
}

function getSuneungDate(): string {
  const today = new Date();
  let year = today.getFullYear();
  function thirdThursdayOfNov(y: number): Date {
    const nov1 = new Date(y, 10, 1);
    const day = nov1.getDay();
    const thurOffset = (4 - day + 7) % 7;
    return new Date(y, 10, 1 + thurOffset + 14);
  }
  let d = thirdThursdayOfNov(year);
  if (d < today) {
    year += 1;
    d = thirdThursdayOfNov(year);
  }
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

const CARD_GRADIENTS = [
  "from-sky-400 to-blue-500",
  "from-emerald-400 to-teal-500",
  "from-violet-400 to-purple-500",
  "from-rose-400 to-pink-500",
  "from-amber-400 to-orange-500",
  "from-cyan-400 to-sky-500",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function DdayPage() {
  const locale = useLocale();
  const t = translations[locale];

  const nextIdRef = useRef(1);
  const [events, setEvents] = useState<DayEvent[]>([]);
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("📅");
  const [targetDate, setTargetDate] = useState("");
  const [copied, setCopied] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(true);

  const PRESETS = [
    { key: "suneung" as const, emoji: "📝", getDate: getSuneungDate },
    { key: "christmas" as const, emoji: "🎄", getDate: () => getNextMonthDay(12, 25) },
    {
      key: "newyear" as const,
      emoji: "🎆",
      getDate: () => {
        const next = new Date();
        next.setFullYear(next.getFullYear() + 1, 0, 1);
        return `${next.getFullYear()}-01-01`;
      },
    },
    { key: "seollal" as const, emoji: "🌙", getDate: getNextSeollal },
    { key: "chuseok" as const, emoji: "🎑", getDate: getNextChuseok },
    { key: "birthday" as const, emoji: "🎂", getDate: () => getDateString(30) },
  ];

  const addEvent = useCallback(() => {
    if (!title.trim() || !targetDate) return;
    setEvents((prev) => [
      ...prev,
      { id: nextIdRef.current++, title: title.trim(), emoji, targetDate },
    ]);
    setTitle("");
    setEmoji("📅");
    setTargetDate("");
    setShowForm(false);
  }, [title, emoji, targetDate]);

  const removeEvent = useCallback((id: number) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const applyPreset = useCallback((preset: typeof PRESETS[number]) => {
    const presetData = t.presets[preset.key];
    setTitle(presetData.title);
    setEmoji(preset.emoji);
    setTargetDate(preset.getDate());
    setShowForm(true);
  }, [t]);

  const handleCopy = useCallback(
    (event: DayEvent) => {
      const info = calcDayInfo(event.targetDate);
      const text = [
        `${event.emoji} ${event.title}`,
        `${t.copyDate}: ${formatDate(event.targetDate, locale)}`,
        `${t.copyDday}: ${info.label}`,
        info.isToday
          ? t.copyTodayMsg
          : info.isPast
          ? t.copyPastMsg(Math.abs(info.diff))
          : t.copyFutureMsg(info.diff, info.weeks, info.diff % 7),
      ].join("\n");
      navigator.clipboard.writeText(text);
      setCopied(event.id);
      setTimeout(() => setCopied(null), 2000);
    },
    [t, locale]
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/30 to-emerald-50/20 dark:from-slate-950 dark:via-sky-950/20 dark:to-emerald-950/10">
        <div className="max-w-2xl mx-auto px-4 py-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
              <span className="bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent">
                D-Day
              </span>{" "}
              {t.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Ad - top */}
          <AdBanner
            format="horizontal"
            className="mb-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
          />

          {/* Preset buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-4"
          >
            <h2 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
              {t.quickAdd}
            </h2>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.key}
                  onClick={() => applyPreset(preset)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-sky-900/40 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
                >
                  <span>{preset.emoji}</span>
                  <span>{t.presets[preset.key].label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Add form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                key="form"
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-4">
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                    {t.addEvent}
                  </h2>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={emoji}
                        onChange={(e) => setEmoji(e.target.value)}
                        placeholder="😊"
                        maxLength={2}
                        className="w-14 text-center px-2 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
                      />
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={t.eventNamePlaceholder}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder-slate-400"
                      />
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={targetDate}
                        min="2000-01-01"
                        max="2099-12-31"
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
                      />
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => setShowForm(false)}
                        className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        {t.cancel}
                      </button>
                      <button
                        onClick={addEvent}
                        disabled={!title.trim() || !targetDate}
                        className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-sky-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {t.add}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add button (when form hidden) */}
          {!showForm && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setShowForm(true)}
              className="w-full py-3 mb-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 font-medium hover:border-sky-400 hover:text-sky-500 transition-colors"
            >
              {t.addNew}
            </motion.button>
          )}

          {/* Ad - between sections */}
          {events.length > 0 && (
            <AdBanner
              format="in-article"
              className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
            />
          )}

          {/* Event cards */}
          <AnimatePresence>
            {events.length === 0 && !showForm && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 text-slate-400 dark:text-slate-500"
              >
                <div className="text-5xl mb-4">📅</div>
                <p className="font-medium">{t.emptyTitle}</p>
                <p className="text-sm mt-1">{t.emptySubtitle}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <AnimatePresence>
              {events.map((event, idx) => {
                const info = calcDayInfo(event.targetDate);
                const gradient = CARD_GRADIENTS[idx % CARD_GRADIENTS.length];
                const isCopied = copied === event.id;

                return (
                  <motion.div
                    key={event.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.92, y: -10, transition: { duration: 0.2 } }}
                    layout
                  >
                    <div
                      className={`relative rounded-2xl overflow-hidden shadow-md border ${
                        info.isToday
                          ? "border-amber-300 dark:border-amber-500"
                          : info.isPast
                          ? "border-slate-300 dark:border-slate-600"
                          : "border-sky-200 dark:border-sky-800"
                      }`}
                    >
                      {/* Gradient top bar */}
                      <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />

                      <div
                        className={`p-5 ${
                          info.isToday
                            ? "bg-amber-50 dark:bg-amber-950/30"
                            : info.isPast
                            ? "bg-slate-50 dark:bg-slate-800/80"
                            : "bg-white dark:bg-slate-800"
                        }`}
                      >
                        {/* Card header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{event.emoji}</span>
                            <div>
                              <h3 className="font-bold text-slate-800 dark:text-slate-100 leading-tight">
                                {event.title}
                              </h3>
                              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                                {formatDate(event.targetDate, locale)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleCopy(event)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/30 transition-colors"
                              title={t.copyTitle}
                            >
                              {isCopied ? (
                                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              )}
                            </button>
                            <button
                              onClick={() => removeEvent(event.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors"
                              title={t.deleteTitle}
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* D-Day label */}
                        <div className="flex items-end justify-between">
                          <motion.div
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                          >
                            <div
                              className={`text-5xl font-extrabold leading-none ${
                                info.isToday
                                  ? "bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"
                                  : info.isPast
                                  ? "text-slate-400 dark:text-slate-500"
                                  : `bg-gradient-to-r ${gradient} bg-clip-text text-transparent`
                              }`}
                            >
                              {info.label}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                              {info.isToday
                                ? t.today
                                : info.isPast
                                ? t.daysPast(Math.abs(info.diff))
                                : t.daysLeft(info.diff)}
                            </div>
                          </motion.div>

                          {/* Stats grid */}
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="bg-slate-100/70 dark:bg-slate-700/50 rounded-xl px-3 py-2">
                              <div className="text-xs text-slate-400 dark:text-slate-500 mb-0.5">{t.weeks}</div>
                              <div className="font-bold text-slate-700 dark:text-slate-200 text-sm">
                                {info.weeks}
                              </div>
                            </div>
                            <div className="bg-slate-100/70 dark:bg-slate-700/50 rounded-xl px-3 py-2">
                              <div className="text-xs text-slate-400 dark:text-slate-500 mb-0.5">{t.hours}</div>
                              <div className="font-bold text-slate-700 dark:text-slate-200 text-sm">
                                {info.hours > 9999 ? "999+" : info.hours}
                              </div>
                            </div>
                            <div className="bg-slate-100/70 dark:bg-slate-700/50 rounded-xl px-3 py-2">
                              <div className="text-xs text-slate-400 dark:text-slate-500 mb-0.5">{t.minutes}</div>
                              <div className="font-bold text-slate-700 dark:text-slate-200 text-sm">
                                {info.minutes > 99999 ? "99K+" : info.minutes > 9999 ? `${Math.floor(info.minutes / 1000)}K+` : info.minutes}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Progress hint for upcoming */}
                        {!info.isPast && !info.isToday && (
                          <div className="mt-4">
                            <div className="text-xs text-slate-400 dark:text-slate-500 mb-1.5 flex justify-between">
                              <span>{t.todayLabel}</span>
                              <span>{event.title}</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                              <motion.div
                                className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${Math.max(2, Math.min(98, 100 - (info.diff / Math.max(info.diff, 365)) * 100))}%`,
                                }}
                                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Today badge */}
          {events.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500"
            >
              {t.baseDateLabel}: {formatDate(getTodayString(), locale)}
            </motion.div>
          )}

          {/* Ad - bottom */}
          <AdBanner
            format="rectangle"
            className="mt-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
          />

          {/* FAQ Section */}
          <section className="mt-16 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">{t.faqTitle}</h2>
            <div className="space-y-4">
              {t.faq.map((item, i) => (
                <details
                  key={i}
                  className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-sky-500 transition-colors">
                    {item.q}
                    <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="px-5 pb-5 text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

        </div>
      </div>
    </PageTransition>
  );
}
