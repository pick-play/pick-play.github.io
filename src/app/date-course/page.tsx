"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import TasteMap from "@/components/TasteMap";
import AdBanner from "@/components/AdBanner";
import coursesData from "@/data/date-courses.json";
import { useLocale } from "@/hooks/useLocale";

type CourseStep = { step: number; place: string; type: string; duration: string };
type Course = {
  id: number;
  city: string;
  region: string;
  time: string;
  preference: string;
  x: number;
  y: number;
  course: CourseStep[];
};

const translations = {
  ko: {
    title: "데이트 코스",
    titleHighlight: "추천",
    subtitle: "분위기 지도에서 원하는 느낌을 찍으면, 완벽한 코스를 짜드립니다",
    modeMap: "분위기 지도",
    modeFilter: "필터",
    timeDay: "낮",
    timeNight: "밤",
    filterRegion: "지역",
    filterPreference: "취향",
    preferences: [
      { value: "", label: "전체" },
      { value: "카페", label: "카페" },
      { value: "야외", label: "야외" },
      { value: "실내", label: "실내" },
      { value: "액티비티", label: "액티비티" },
    ],
    btnSpinning: "추천 중...",
    btnRecommendFilter: "코스 추천받기",
    btnRecommendCount: (n: number) => `${n}개 코스 중 추천받기`,
    btnSelectOnMap: "맵에서 위치를 선택하세요",
    slotLabel: "오늘의 데이트 코스는...",
    resultLabel: "오늘의 데이트 코스",
    btnRetry: "다시 뽑기",
    naverMap: "네이버 지도에서 검색",
    googleMap: "구글 맵에서 검색",
    emptyTitle: "조건에 맞는 코스가 없어요",
    emptyDesc: "조건을 바꿔보시거나, 전체 코스에서 랜덤으로 뽑아볼까요?",
    btnReset: "조건 초기화",
    btnRandomAll: "전체에서 랜덤 뽑기",
    xLabels: ["조용한", "활동적"] as [string, string],
    yLabels: ["실내", "야외"] as [string, string],
    quadrantHints: ["야외·조용", "야외·활동", "실내·조용", "실내·활동"] as [string, string, string, string],
    timeLabel: (time: string) => time === "day" ? "낮" : "밤",
    regionAll: "전체",
    faqTitle: "자주 묻는 질문",
    faqItems: [
      {
        q: "데이트 코스 추천은 어떻게 받나요?",
        a: "도시를 선택하고 낮/밤 시간대를 고른 뒤, 분위기 지도에서 조용한~활동적, 실내~야외 축으로 원하는 느낌을 클릭하세요. 슬롯머신이 카페, 식사, 산책, 액티비티, 관광 등으로 구성된 완벽한 데이트 코스를 짜드립니다.",
      },
      {
        q: "어떤 도시의 데이트 코스를 추천받을 수 있나요?",
        a: "서울, 부산, 대구, 인천, 광주, 대전, 울산, 세종, 경기북부, 경기남부 총 10개 도시의 200가지 이상 데이트 코스를 지원합니다. 각 도시별 인기 장소와 숨겨진 명소를 포함한 코스를 추천해 드립니다.",
      },
      {
        q: "낮 데이트와 밤 데이트 코스가 다른가요?",
        a: "네, 낮과 밤에 따라 완전히 다른 데이트 코스를 추천합니다. 낮에는 야외 산책, 카페, 관광 중심의 코스를, 밤에는 분위기 있는 식사, 야경, 실내 액티비티 위주의 코스를 제공합니다.",
      },
    ],
  },
  en: {
    title: "Date Course",
    titleHighlight: "Recommender",
    subtitle: "Pick a vibe on the map and we'll plan the perfect date course for you",
    modeMap: "Vibe Map",
    modeFilter: "Filter",
    timeDay: "Day",
    timeNight: "Night",
    filterRegion: "Area",
    filterPreference: "Vibe",
    preferences: [
      { value: "", label: "All" },
      { value: "카페", label: "Café" },
      { value: "야외", label: "Outdoor" },
      { value: "실내", label: "Indoor" },
      { value: "액티비티", label: "Activity" },
    ],
    btnSpinning: "Planning...",
    btnRecommendFilter: "Find a Course",
    btnRecommendCount: (n: number) => `Pick from ${n} courses`,
    btnSelectOnMap: "Select a spot on the map",
    slotLabel: "Today's date course is...",
    resultLabel: "Today's Date Course",
    btnRetry: "Try Again",
    naverMap: "Search on Naver Map",
    googleMap: "Search on Google Maps",
    emptyTitle: "No courses match your filters",
    emptyDesc: "Try adjusting your filters, or pick randomly from all courses.",
    btnReset: "Reset Filters",
    btnRandomAll: "Pick Randomly from All",
    xLabels: ["Quiet", "Active"] as [string, string],
    yLabels: ["Indoor", "Outdoor"] as [string, string],
    quadrantHints: ["Outdoor·Quiet", "Outdoor·Active", "Indoor·Quiet", "Indoor·Active"] as [string, string, string, string],
    timeLabel: (time: string) => time === "day" ? "Day" : "Night",
    regionAll: "All",
    faqTitle: "Frequently Asked Questions",
    faqItems: [
      {
        q: "How do I get a date course recommendation?",
        a: "Select a city and time of day (day/night), then click a spot on the vibe map along the quiet–active and indoor–outdoor axes. The slot machine will build you a perfect date course with cafés, meals, walks, activities, and sightseeing.",
      },
      {
        q: "Which cities are supported?",
        a: "We support 200+ date courses across 10 cities: Seoul, Busan, Daegu, Incheon, Gwangju, Daejeon, Ulsan, Sejong, Northern Gyeonggi, and Southern Gyeonggi — including popular spots and hidden gems in each city.",
      },
      {
        q: "Are day and night date courses different?",
        a: "Yes! Day courses focus on outdoor walks, cafés, and sightseeing, while night courses feature atmospheric dining, night views, and indoor activities.",
      },
    ],
  },
  ja: {
    title: "デートコース",
    titleHighlight: "おすすめ",
    subtitle: "雰囲気マップで好みを選ぶと、完璧なデートコースを提案します",
    modeMap: "雰囲気マップ",
    modeFilter: "フィルター",
    timeDay: "昼",
    timeNight: "夜",
    filterRegion: "エリア",
    filterPreference: "好み",
    preferences: [
      { value: "", label: "すべて" },
      { value: "카페", label: "カフェ" },
      { value: "야외", label: "屋外" },
      { value: "실내", label: "室内" },
      { value: "액티비티", label: "アクティビティ" },
    ],
    btnSpinning: "提案中...",
    btnRecommendFilter: "コースを探す",
    btnRecommendCount: (n: number) => `${n}件のコースからおすすめ`,
    btnSelectOnMap: "マップで場所を選んでください",
    slotLabel: "今日のデートコースは...",
    resultLabel: "今日のデートコース",
    btnRetry: "もう一度",
    naverMap: "Naverマップで検索",
    googleMap: "Googleマップで検索",
    emptyTitle: "条件に合うコースがありません",
    emptyDesc: "条件を変えるか、全コースからランダムに選びますか？",
    btnReset: "条件をリセット",
    btnRandomAll: "全体からランダムに選ぶ",
    xLabels: ["静か", "アクティブ"] as [string, string],
    yLabels: ["室内", "屋外"] as [string, string],
    quadrantHints: ["屋外·静か", "屋外·アクティブ", "室内·静か", "室内·アクティブ"] as [string, string, string, string],
    timeLabel: (time: string) => time === "day" ? "昼" : "夜",
    regionAll: "すべて",
    faqTitle: "よくある質問",
    faqItems: [
      {
        q: "デートコースのおすすめはどうやって受けますか？",
        a: "都市を選んで昼/夜の時間帯を選んだあと、雰囲気マップで静か〜アクティブ、室内〜屋外の軸で好みをクリックしてください。スロットマシンがカフェ、食事、散歩、アクティビティ、観光などで構成された完璧なデートコースを提案します。",
      },
      {
        q: "どの都市のデートコースをおすすめできますか？",
        a: "ソウル、釜山、大邱、仁川、光州、大田、蔚山、世宗、京畿北部、京畿南部の計10都市、200種類以上のデートコースに対応しています。",
      },
      {
        q: "昼と夜のデートコースは違いますか？",
        a: "はい、昼と夜によって全く異なるデートコースをおすすめします。昼は屋外散歩、カフェ、観光中心のコースを、夜は雰囲気のある食事、夜景、室内アクティビティ中心のコースを提供します。",
      },
    ],
  },
  zh: {
    title: "约会路线",
    titleHighlight: "推荐",
    subtitle: "在氛围地图上选择偏好，为您规划完美的约会路线",
    modeMap: "氛围地图",
    modeFilter: "筛选",
    timeDay: "白天",
    timeNight: "夜晚",
    filterRegion: "地区",
    filterPreference: "偏好",
    preferences: [
      { value: "", label: "全部" },
      { value: "카페", label: "咖啡厅" },
      { value: "야외", label: "户外" },
      { value: "실내", label: "室内" },
      { value: "액티비티", label: "活动" },
    ],
    btnSpinning: "推荐中...",
    btnRecommendFilter: "查找路线",
    btnRecommendCount: (n: number) => `从${n}条路线中推荐`,
    btnSelectOnMap: "请在地图上选择位置",
    slotLabel: "今日约会路线是...",
    resultLabel: "今日约会路线",
    btnRetry: "重新选择",
    naverMap: "在Naver地图中搜索",
    googleMap: "在Google地图中搜索",
    emptyTitle: "没有符合条件的路线",
    emptyDesc: "请更换条件，或从所有路线中随机选择",
    btnReset: "重置条件",
    btnRandomAll: "从全部随机选择",
    xLabels: ["安静", "活跃"] as [string, string],
    yLabels: ["室内", "户外"] as [string, string],
    quadrantHints: ["户外·安静", "户外·活跃", "室内·安静", "室内·活跃"] as [string, string, string, string],
    timeLabel: (time: string) => time === "day" ? "白天" : "夜晚",
    regionAll: "全部",
    faqTitle: "常见问题",
    faqItems: [
      {
        q: "如何获取约会路线推荐？",
        a: "选择城市和时间段（白天/夜晚），然后在氛围地图上按照安静~活跃、室内~户外的轴点击您的偏好位置。系统会为您规划包含咖啡厅、餐饮、散步、活动和观光的完美约会路线。",
      },
      {
        q: "支持哪些城市的约会路线？",
        a: "支持首尔、釜山、大邱、仁川、光州、大田、蔚山、世宗、京畿北部、京畿南部共10个城市的200多条约会路线，包含各城市的热门景点和隐藏名所。",
      },
      {
        q: "白天和夜晚的约会路线不同吗？",
        a: "是的，白天和夜晚的约会路线完全不同。白天以户外散步、咖啡厅、观光为主，夜晚则以氛围餐厅、夜景和室内活动为主。",
      },
    ],
  },
  es: {
    title: "Rutas de",
    titleHighlight: "cita",
    subtitle: "Elige un ambiente en el mapa y planificaremos la cita perfecta para ti",
    modeMap: "Mapa de ambiente",
    modeFilter: "Filtrar",
    timeDay: "Día",
    timeNight: "Noche",
    filterRegion: "Zona",
    filterPreference: "Ambiente",
    preferences: [
      { value: "", label: "Todo" },
      { value: "카페", label: "Cafetería" },
      { value: "야외", label: "Exterior" },
      { value: "실내", label: "Interior" },
      { value: "액티비티", label: "Actividad" },
    ],
    btnSpinning: "Planificando...",
    btnRecommendFilter: "Buscar ruta",
    btnRecommendCount: (n: number) => `Elegir de ${n} rutas`,
    btnSelectOnMap: "Selecciona un punto en el mapa",
    slotLabel: "La ruta de hoy es...",
    resultLabel: "Ruta de cita de hoy",
    btnRetry: "Intentar de nuevo",
    naverMap: "Buscar en Naver Map",
    googleMap: "Buscar en Google Maps",
    emptyTitle: "No hay rutas que coincidan",
    emptyDesc: "Intenta ajustar los filtros o elige aleatoriamente de todas las rutas.",
    btnReset: "Restablecer filtros",
    btnRandomAll: "Elegir aleatoriamente de todo",
    xLabels: ["Tranquilo", "Activo"] as [string, string],
    yLabels: ["Interior", "Exterior"] as [string, string],
    quadrantHints: ["Exterior·Tranquilo", "Exterior·Activo", "Interior·Tranquilo", "Interior·Activo"] as [string, string, string, string],
    timeLabel: (time: string) => time === "day" ? "Día" : "Noche",
    regionAll: "Todo",
    faqTitle: "Preguntas frecuentes",
    faqItems: [
      {
        q: "¿Cómo obtengo una recomendación de ruta de cita?",
        a: "Selecciona una ciudad y el momento del día (día/noche), luego haz clic en el mapa de ambiente según los ejes tranquilo–activo e interior–exterior. El sistema planificará una ruta de cita perfecta con cafeterías, comidas, paseos, actividades y turismo.",
      },
      {
        q: "¿Qué ciudades están disponibles?",
        a: "Soportamos más de 200 rutas de cita en 10 ciudades: Seúl, Busan, Daegu, Incheon, Gwangju, Daejeon, Ulsan, Sejong, Gyeonggi Norte y Gyeonggi Sur — incluyendo lugares populares y joyas escondidas.",
      },
      {
        q: "¿Las rutas de día y noche son diferentes?",
        a: "¡Sí! Las rutas de día se enfocan en paseos al aire libre, cafeterías y turismo, mientras que las rutas de noche presentan cenas con ambiente, vistas nocturnas y actividades en interiores.",
      },
    ],
  },
};

const cities = ["서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", "경기북부", "경기남부"];

const stepIcons: Record<string, string> = {
  카페: "☕",
  식사: "🍽️",
  산책: "🚶",
  액티비티: "🎮",
  관광: "📸",
};

const prefColors: Record<string, string> = {
  카페: "#92400e",
  야외: "#16a34a",
  실내: "#7c3aed",
  액티비티: "#ea580c",
};

const courseLegend = Object.entries(prefColors).map(([label, color]) => ({ label, color }));

export default function DateCoursePage() {
  const locale = useLocale();
  const t = translations[locale];

  const [city, setCity] = useState("서울");
  const [mode, setMode] = useState<"map" | "filter">("map");
  const [region, setRegion] = useState("전체");
  const [time, setTime] = useState<"day" | "night">("day");
  const [preference, setPreference] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<Course | null>(null);
  const [candidates, setCandidates] = useState<Course[]>([]);
  const [mapSelected, setMapSelected] = useState<Course[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const cityCourses = useMemo(
    () => (coursesData as Course[]).filter((c) => c.city === city),
    [city]
  );

  const cityCoursesFiltered = useMemo(
    () => cityCourses.filter((c) => c.time === time),
    [cityCourses, time]
  );

  const cityRegions = useMemo(() => {
    const regs = new Set(cityCourses.map((c) => c.region));
    return ["전체", ...Array.from(regs)];
  }, [cityCourses]);

  useEffect(() => {
    setRegion("전체");
    setResult(null);
    setCandidates([]);
    setMapSelected([]);
  }, [city]);

  useEffect(() => {
    setResult(null);
    setCandidates([]);
    setMapSelected([]);
  }, [time]);

  const stopSlot = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, []);

  useEffect(() => { return () => stopSlot(); }, [stopSlot]);

  const getFiltered = () => {
    let filtered = cityCourses.filter((c) => c.time === time);
    if (region !== "전체") filtered = filtered.filter((c) => c.region === region);
    if (preference) filtered = filtered.filter((c) => c.preference === preference);
    return filtered;
  };

  const startSlot = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const filtered = mode === "map" ? mapSelected : getFiltered();
    if (filtered.length === 0) {
      setCandidates([]);
      setResult(null);
      setSpinning(false);
      return;
    }
    setCandidates(filtered);
    setResult(null);
    setSpinning(true);

    const finalIndex = Math.floor(Math.random() * filtered.length);
    let tick = 0;
    const totalTicks = 25 + Math.floor(Math.random() * 12);
    stopSlot();

    const runPhase = () => {
      tick++;
      setCurrentIndex((prev) => (prev + 1) % filtered.length);
      if (tick >= totalTicks) {
        stopSlot();
        setCurrentIndex(finalIndex);
        setTimeout(() => { setSpinning(false); setResult(filtered[finalIndex]); }, 300);
        return;
      }
      const progress = tick / totalTicks;
      const delay = progress < 0.5 ? 70 : progress < 0.75 ? 70 + (progress - 0.5) * 500 : 195 + (progress - 0.75) * 900;
      intervalRef.current = setTimeout(runPhase, delay);
    };
    intervalRef.current = setTimeout(runPhase, 70);
  };

  const displayCourse = candidates.length > 0 ? candidates[currentIndex % candidates.length] : null;

  // Translate preference label for display
  const getPrefLabel = (prefValue: string) => {
    const found = t.preferences.find((p) => p.value === prefValue);
    return found ? found.label : prefValue;
  };

  // Translate legend labels
  const translatedCourseLegend = courseLegend.map((item) => ({
    label: getPrefLabel(item.label),
    color: item.color,
  }));

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {t.title}{" "}
            <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">{t.titleHighlight}</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400">{t.subtitle}</p>
        </motion.div>

        {/* City Selector */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-6">
          <div className="flex flex-wrap justify-center gap-2">
            {cities.map((c) => {
              const count = (coursesData as Course[]).filter((d) => d.city === c).length;
              return (
                <button
                  key={c}
                  onClick={() => setCity(c)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    city === c
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md shadow-pink-500/20"
                      : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-pink-300 dark:hover:border-pink-700"
                  }`}
                >
                  {c}
                  <span className={`ml-1 text-[10px] ${city === c ? "text-pink-200" : "text-slate-400"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Day / Night Toggle */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="flex justify-center mb-6">
          <div className="inline-flex rounded-xl bg-amber-50 dark:bg-slate-800 p-1 border border-amber-200 dark:border-slate-700 gap-1">
            <button
              onClick={() => setTime("day")}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                time === "day"
                  ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-sm shadow-amber-400/30"
                  : "text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
              }`}
            >
              <span>☀️</span> {t.timeDay}
            </button>
            <button
              onClick={() => setTime("night")}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                time === "night"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-sm shadow-indigo-500/30"
                  : "text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
              }`}
            >
              <span>🌙</span> {t.timeNight}
            </button>
          </div>
        </motion.div>

        {/* Mode Toggle */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex justify-center mb-6">
          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
            <button onClick={() => setMode("map")} className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${mode === "map" ? "bg-white dark:bg-slate-700 text-pink-500 shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700"}`}>
              {t.modeMap}
            </button>
            <button onClick={() => setMode("filter")} className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${mode === "filter" ? "bg-white dark:bg-slate-700 text-pink-500 shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700"}`}>
              {t.modeFilter}
            </button>
          </div>
        </motion.div>

        <AdBanner format="horizontal" className="my-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

        <AnimatePresence mode="wait">
          {mode === "map" && (
            <motion.div key={`map-${city}-${time}`} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.2 }} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-8">
              <div className="max-w-md mx-auto">
                <TasteMap
                  items={cityCoursesFiltered}
                  getCoords={(item) => ({ x: item.x, y: item.y })}
                  getLabel={(item) => `${item.region}`}
                  getColor={(item) => prefColors[item.preference] || "#94a3b8"}
                  xLabels={t.xLabels}
                  yLabels={t.yLabels}
                  quadrantHints={t.quadrantHints}
                  accent="#ec4899"
                  legend={translatedCourseLegend}
                  onSelect={setMapSelected}
                />
              </div>
              <button onClick={() => startSlot()} disabled={spinning || mapSelected.length === 0} className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all disabled:opacity-50">
                {spinning ? t.btnSpinning : mapSelected.length > 0 ? t.btnRecommendCount(mapSelected.length) : t.btnSelectOnMap}
              </button>
            </motion.div>
          )}

          {mode === "filter" && (
            <motion.div key="filter" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.2 }}>
              <form onSubmit={startSlot} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t.filterRegion}</label>
                    <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                      {cityRegions.map((r) => (
                        <option key={r} value={r}>
                          {r === "전체" ? t.regionAll : r}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t.filterPreference}</label>
                    <select value={preference} onChange={(e) => setPreference(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                      {t.preferences.map((p) => (<option key={p.value} value={p.value}>{p.label}</option>))}
                    </select>
                  </div>
                </div>
                <button type="submit" disabled={spinning} className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all disabled:opacity-50">
                  {spinning ? t.btnSpinning : t.btnRecommendFilter}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Slot Machine Display */}
        {(spinning || result) && candidates.length > 0 && (
          <div className="mb-8">
            <AnimatePresence mode="wait">
              {spinning && displayCourse && (
                <motion.div key="slot" className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 p-1 mb-4">
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center">
                    <div className="text-sm text-slate-400 mb-2">{t.slotLabel}</div>
                    <div className="h-24 flex items-center justify-center overflow-hidden">
                      <motion.div key={currentIndex} initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} transition={{ duration: 0.05 }} className="text-center">
                        <div className="text-2xl md:text-3xl font-bold mb-1">{displayCourse.region} · {t.timeLabel(displayCourse.time)}</div>
                        <div className="text-slate-400 text-sm">{displayCourse.course.map((s) => s.place).join(" → ")}</div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {!spinning && result && (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
                  <div className="rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 p-1">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-8">
                      <div className="text-center mb-6">
                        <div className="text-sm text-pink-500 font-medium mb-2">{t.resultLabel}</div>
                        <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
                          <span className="px-3 py-1 text-sm font-semibold rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400">{result.city} · {result.region}</span>
                          <span className="px-3 py-1 text-sm font-semibold rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">{t.timeLabel(result.time)}</span>
                          <span className="px-3 py-1 text-sm font-semibold rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">{getPrefLabel(result.preference)}</span>
                        </div>
                      </div>
                      <div className="space-y-4 mb-6">
                        {result.course.map((step, i) => (
                          <motion.div key={step.step} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }} className="flex items-start gap-3">
                            <div className="flex flex-col items-center">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-xl shadow-lg">{stepIcons[step.type] || "📍"}</div>
                              {i < result.course.length - 1 && (<div className="w-0.5 h-10 bg-gradient-to-b from-pink-300 to-purple-300 dark:from-pink-700 dark:to-purple-700 mt-1" />)}
                            </div>
                            <div className="flex-1 pt-1">
                              <div className="flex items-center gap-2 mb-1"><span className="text-xs font-bold text-pink-500">STEP {step.step}</span></div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-lg">{step.place}</h4>
                                <a href={`https://map.naver.com/v5/search/${encodeURIComponent(step.place + ' ' + result.city)}`} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors text-xs" title="네이버 지도에서 검색">
                                  📍
                                </a>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-slate-400 mt-0.5">
                                <span>{step.type}</span><span>·</span><span>{step.duration}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <button onClick={() => startSlot()} disabled={spinning} className="w-full py-3 rounded-xl border-2 border-pink-400 text-pink-500 font-semibold hover:bg-pink-50 dark:hover:bg-pink-900/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{t.btnRetry}</button>
                      <div className="flex gap-3 mt-3">
                        <a href={`https://map.naver.com/v5/search/${encodeURIComponent(result.region + ' 데이트')}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-colors">
                          <span>📍</span> {t.naverMap}
                        </a>
                        <a href={`https://www.google.com/maps/search/${encodeURIComponent(result.region + ' 데이트')}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-colors">
                          <span>📍</span> {t.googleMap}
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {!spinning && !result && candidates.length === 0 && mode === "filter" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 text-center">
            <div className="text-4xl mb-4">💑</div>
            <h3 className="text-lg font-bold mb-2">{t.emptyTitle}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{t.emptyDesc}</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button onClick={() => { setRegion("전체"); setPreference(""); }} className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">{t.btnReset}</button>
              <button onClick={() => { setRegion("전체"); setPreference(""); setTimeout(() => { const form = document.querySelector("form"); if (form) form.requestSubmit(); }, 50); }} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold hover:shadow-lg transition-all">{t.btnRandomAll}</button>
            </div>
          </motion.div>
        )}
        <AdBanner format="in-article" className="mt-8 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
        <AdBanner format="rectangle" className="my-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

        {/* SEO FAQ Section */}
        <section className="mt-16 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">{t.faqTitle}</h2>
          <div className="space-y-4">
            {t.faqItems.map((item, idx) => (
              <details key={idx} className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-pink-500 transition-colors">
                  {item.q}
                  <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="px-5 pb-5 text-slate-500 dark:text-slate-400 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
