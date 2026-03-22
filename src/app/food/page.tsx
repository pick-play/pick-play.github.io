"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import TasteMap from "@/components/TasteMap";
import AdBanner from "@/components/AdBanner";
import foodsData from "@/data/foods.json";
import { useLocale } from "@/hooks/useLocale";

type Food = {
  id: number;
  name: string;
  category: string;
  priceRange: string;
  rating: number;
  reason: string;
  description: string;
  servings: string;
  x: number;
  y: number;
};

const translations = {
  ko: {
    title: "오늘",
    titleHighlight: "뭐 먹지?",
    subtitle: "맛 지도에서 취향을 찍으면, 슬롯머신이 메뉴를 골라드립니다",
    modeMap: "맛 지도",
    modeFilter: "필터",
    categoryAll: "전체",
    categories: ["전체", "한식", "일식", "중식", "양식", "아시안", "분식", "디저트", "패스트푸드"],
    categoryLabels: {
      "한식": "한식", "일식": "일식", "중식": "중식", "양식": "양식",
      "아시안": "아시안", "분식": "분식", "디저트": "디저트", "패스트푸드": "패스트푸드",
    },
    priceRanges: [
      { value: "", label: "전체" },
      { value: "low", label: "저렴 (1만원 이하)" },
      { value: "mid", label: "보통 (1~2만원)" },
      { value: "high", label: "고급 (2만원 이상)" },
    ],
    filterFoodType: "음식 종류",
    filterPriceRange: "가격대",
    btnSpinning: "추천 중...",
    btnRecommend: "추천받기",
    btnRecommendCount: (n: number) => `${n}개 메뉴 중 추천받기`,
    btnSelectOnMap: "맵에서 위치를 선택하세요",
    slotLabel: "오늘의 메뉴는...",
    resultLabel: "오늘의 추천 메뉴",
    priceLow: "저렴",
    priceMid: "보통",
    priceHigh: "고급",
    btnRetry: "다시 뽑기",
    naverMap: "네이버 지도에서 검색",
    googleMap: "구글 맵에서 검색",
    emptyTitle: "조건에 맞는 메뉴가 없어요",
    emptyDesc: "조건을 바꿔보시거나, 전체 메뉴에서 랜덤으로 뽑아볼까요?",
    btnReset: "조건 초기화",
    btnRandomAll: "전체에서 랜덤 뽑기",
    xLabels: ["담백", "자극적"] as [string, string],
    yLabels: ["가벼운", "고급"] as [string, string],
    quadrantHints: ["고급 담백", "고급 자극", "가벼운 담백", "가벼운 자극"] as [string, string, string, string],
    faqTitle: "자주 묻는 질문",
    faqItems: [
      {
        q: "오늘 뭐 먹지? 메뉴 추천은 어떻게 받나요?",
        a: "맛 지도에서 담백~자극, 가벼운~고급 축으로 취향 위치를 클릭하면, 근처에 있는 메뉴들 중 슬롯머신이 랜덤으로 하나를 골라드립니다. 한식, 일식, 중식, 양식, 아시안, 분식, 디저트, 패스트푸드 등 130가지 메뉴를 지원합니다.",
      },
      {
        q: "점심 메뉴 추천, 저녁 메뉴 추천도 가능한가요?",
        a: "네! 맛 지도 모드에서 취향 위치를 선택하거나, 필터 모드에서 음식 종류와 가격대를 설정하면 점심·저녁 구분 없이 상황에 맞는 메뉴를 추천받을 수 있습니다. 혼밥 메뉴, 회식 메뉴, 배달 메뉴 추천 모두 가능합니다.",
      },
      {
        q: "무료로 사용할 수 있나요?",
        a: "네, PickPlay의 모든 기능은 완전 무료입니다. 회원가입 없이, 앱 설치 없이 웹 브라우저에서 바로 사용할 수 있습니다. 오늘 뭐 먹지 고민될 때 언제든 방문하세요!",
      },
    ],
  },
  en: {
    title: "What should I",
    titleHighlight: "eat today?",
    subtitle: "Pick a spot on the taste map and the slot machine picks your meal",
    modeMap: "Taste Map",
    modeFilter: "Filter",
    categoryAll: "All",
    categories: ["All", "Korean", "Japanese", "Chinese", "Western", "Asian", "Street Food", "Dessert", "Fast Food"],
    categoryLabels: {
      "한식": "Korean", "일식": "Japanese", "중식": "Chinese", "양식": "Western",
      "아시안": "Asian", "분식": "Street Food", "디저트": "Dessert", "패스트푸드": "Fast Food",
    },
    priceRanges: [
      { value: "", label: "All" },
      { value: "low", label: "Budget (under ₩10,000)" },
      { value: "mid", label: "Moderate (₩10,000–20,000)" },
      { value: "high", label: "Premium (₩20,000+)" },
    ],
    filterFoodType: "Food Type",
    filterPriceRange: "Price Range",
    btnSpinning: "Picking...",
    btnRecommend: "Get Recommendation",
    btnRecommendCount: (n: number) => `Pick from ${n} options`,
    btnSelectOnMap: "Select a spot on the map",
    slotLabel: "Today's menu is...",
    resultLabel: "Today's Recommendation",
    priceLow: "Budget",
    priceMid: "Moderate",
    priceHigh: "Premium",
    btnRetry: "Pick Again",
    naverMap: "Search on Naver Map",
    googleMap: "Search on Google Maps",
    emptyTitle: "No results match your filters",
    emptyDesc: "Try adjusting your filters, or pick randomly from all options.",
    btnReset: "Reset Filters",
    btnRandomAll: "Pick Randomly from All",
    xLabels: ["Mild", "Bold"] as [string, string],
    yLabels: ["Light", "Rich"] as [string, string],
    quadrantHints: ["Rich & Mild", "Rich & Bold", "Light & Mild", "Light & Bold"] as [string, string, string, string],
    faqTitle: "Frequently Asked Questions",
    faqItems: [
      {
        q: "How do I get a meal recommendation?",
        a: "Click a spot on the taste map along the mild–bold and light–rich axes. The slot machine will randomly select a menu item from nearby options. We support 130+ menu items across Korean, Japanese, Chinese, Western, Asian, street food, dessert, and fast food categories.",
      },
      {
        q: "Can I get lunch and dinner recommendations?",
        a: "Yes! Use the taste map to pick your vibe, or use filter mode to set food type and price range. Works for solo meals, group outings, and delivery — any time of day.",
      },
      {
        q: "Is it free to use?",
        a: "Yes, all features on PickPlay are completely free. No sign-up, no app install — just open it in your browser whenever you can't decide what to eat.",
      },
    ],
  },
  ja: {
    title: "今日",
    titleHighlight: "何食べよう？",
    subtitle: "味マップで好みを選ぶと、スロットマシンがメニューを選びます",
    modeMap: "味マップ",
    modeFilter: "フィルター",
    categoryAll: "すべて",
    categories: ["すべて", "韓国料理", "和食", "中華", "洋食", "アジア料理", "軽食", "デザート", "ファストフード"],
    categoryLabels: {
      "한식": "韓国料理", "일식": "和食", "중식": "中華", "양식": "洋食",
      "아시안": "アジア料理", "분식": "軽食", "디저트": "デザート", "패스트푸드": "ファストフード",
    },
    priceRanges: [
      { value: "", label: "すべて" },
      { value: "low", label: "安い (1万ウォン以下)" },
      { value: "mid", label: "普通 (1〜2万ウォン)" },
      { value: "high", label: "高級 (2万ウォン以上)" },
    ],
    filterFoodType: "料理の種類",
    filterPriceRange: "価格帯",
    btnSpinning: "選択中...",
    btnRecommend: "おすすめを見る",
    btnRecommendCount: (n: number) => `${n}件のメニューからおすすめ`,
    btnSelectOnMap: "マップで場所を選んでください",
    slotLabel: "今日のメニューは...",
    resultLabel: "今日のおすすめメニュー",
    priceLow: "安い",
    priceMid: "普通",
    priceHigh: "高級",
    btnRetry: "もう一度",
    naverMap: "Naverマップで検索",
    googleMap: "Googleマップで検索",
    emptyTitle: "条件に合うメニューがありません",
    emptyDesc: "条件を変えるか、全メニューからランダムに選びますか？",
    btnReset: "条件をリセット",
    btnRandomAll: "全体からランダムに選ぶ",
    xLabels: ["あっさり", "濃い"] as [string, string],
    yLabels: ["軽い", "高級"] as [string, string],
    quadrantHints: ["高級・あっさり", "高級・濃い", "軽い・あっさり", "軽い・濃い"] as [string, string, string, string],
    faqTitle: "よくある質問",
    faqItems: [
      {
        q: "メニューのおすすめはどうやって受けますか？",
        a: "味マップであっさり〜濃い、軽い〜高級の軸で好みの位置をクリックすると、近くのメニューの中からスロットマシンがランダムに1つ選びます。韓国料理、和食、中華、洋食、アジア料理、軽食、デザート、ファストフードなど130種類以上のメニューに対応しています。",
      },
      {
        q: "ランチとディナーのおすすめも可能ですか？",
        a: "はい！味マップモードで好みの位置を選ぶか、フィルターモードで料理の種類と価格帯を設定すると、ランチ・ディナーを問わず状況に合ったメニューをおすすめできます。",
      },
      {
        q: "無料で使えますか？",
        a: "はい、PickPlayのすべての機能は完全無料です。会員登録もアプリのインストールも不要で、ブラウザからすぐに使えます。",
      },
    ],
  },
  zh: {
    title: "今天",
    titleHighlight: "吃什么？",
    subtitle: "在口味地图上选择偏好，老虎机为您挑选菜单",
    modeMap: "口味地图",
    modeFilter: "筛选",
    categoryAll: "全部",
    categories: ["全部", "韩餐", "日料", "中餐", "西餐", "亚洲菜", "小吃", "甜点", "快餐"],
    categoryLabels: {
      "한식": "韩餐", "일식": "日料", "중식": "中餐", "양식": "西餐",
      "아시안": "亚洲菜", "분식": "小吃", "디저트": "甜点", "패스트푸드": "快餐",
    },
    priceRanges: [
      { value: "", label: "全部" },
      { value: "low", label: "实惠 (1万韩元以下)" },
      { value: "mid", label: "普通 (1~2万韩元)" },
      { value: "high", label: "高档 (2万韩元以上)" },
    ],
    filterFoodType: "菜品类型",
    filterPriceRange: "价格区间",
    btnSpinning: "推荐中...",
    btnRecommend: "获取推荐",
    btnRecommendCount: (n: number) => `从${n}个菜品中推荐`,
    btnSelectOnMap: "请在地图上选择位置",
    slotLabel: "今天的菜单是...",
    resultLabel: "今日推荐",
    priceLow: "实惠",
    priceMid: "普通",
    priceHigh: "高档",
    btnRetry: "重新选择",
    naverMap: "在Naver地图中搜索",
    googleMap: "在Google地图中搜索",
    emptyTitle: "没有符合条件的菜单",
    emptyDesc: "请更换条件，或从所有菜品中随机选择",
    btnReset: "重置条件",
    btnRandomAll: "从全部随机选择",
    xLabels: ["清淡", "浓郁"] as [string, string],
    yLabels: ["轻食", "高档"] as [string, string],
    quadrantHints: ["高档·清淡", "高档·浓郁", "轻食·清淡", "轻食·浓郁"] as [string, string, string, string],
    faqTitle: "常见问题",
    faqItems: [
      {
        q: "如何获取菜单推荐？",
        a: "在口味地图上按照清淡~浓郁、轻食~高档的轴点击您的偏好位置，老虎机会从附近的菜品中随机选择一个。支持韩餐、日料、中餐、西餐、亚洲菜、小吃、甜点、快餐等130种以上菜单。",
      },
      {
        q: "午餐和晚餐都可以推荐吗？",
        a: "是的！在口味地图模式中选择偏好位置，或在筛选模式中设置菜品类型和价格区间，不管午餐还是晚餐都能推荐适合的菜单。",
      },
      {
        q: "可以免费使用吗？",
        a: "是的，PickPlay的所有功能完全免费。无需注册，无需安装App，直接在浏览器中使用即可。",
      },
    ],
  },
  es: {
    title: "¿Qué como",
    titleHighlight: "hoy?",
    subtitle: "Elige un punto en el mapa de sabores y la máquina tragamonedas elige tu menú",
    modeMap: "Mapa de sabores",
    modeFilter: "Filtrar",
    categoryAll: "Todo",
    categories: ["Todo", "Coreano", "Japonés", "Chino", "Occidental", "Asiático", "Snacks", "Postre", "Comida rápida"],
    categoryLabels: {
      "한식": "Coreano", "일식": "Japonés", "중식": "Chino", "양식": "Occidental",
      "아시안": "Asiático", "분식": "Snacks", "디저트": "Postre", "패스트푸드": "Comida rápida",
    },
    priceRanges: [
      { value: "", label: "Todo" },
      { value: "low", label: "Económico (menos de ₩10.000)" },
      { value: "mid", label: "Moderado (₩10.000–20.000)" },
      { value: "high", label: "Premium (más de ₩20.000)" },
    ],
    filterFoodType: "Tipo de comida",
    filterPriceRange: "Rango de precio",
    btnSpinning: "Eligiendo...",
    btnRecommend: "Recomendar",
    btnRecommendCount: (n: number) => `Elegir de ${n} opciones`,
    btnSelectOnMap: "Selecciona una ubicación en el mapa",
    slotLabel: "El menú de hoy es...",
    resultLabel: "Recomendación del día",
    priceLow: "Económico",
    priceMid: "Moderado",
    priceHigh: "Premium",
    btnRetry: "Intentar de nuevo",
    naverMap: "Buscar en Naver Map",
    googleMap: "Buscar en Google Maps",
    emptyTitle: "No hay menús que coincidan con los filtros",
    emptyDesc: "Intenta ajustar los filtros o elige aleatoriamente de todas las opciones.",
    btnReset: "Restablecer filtros",
    btnRandomAll: "Elegir aleatoriamente de todo",
    xLabels: ["Suave", "Intenso"] as [string, string],
    yLabels: ["Ligero", "Gourmet"] as [string, string],
    quadrantHints: ["Gourmet suave", "Gourmet intenso", "Ligero suave", "Ligero intenso"] as [string, string, string, string],
    faqTitle: "Preguntas frecuentes",
    faqItems: [
      {
        q: "¿Cómo obtengo una recomendación de menú?",
        a: "Haz clic en un punto del mapa de sabores según los ejes suave–intenso y ligero–gourmet. La máquina tragamonedas seleccionará aleatoriamente un menú de las opciones cercanas. Soportamos más de 130 menús en categorías como coreano, japonés, chino, occidental, asiático, snacks, postre y comida rápida.",
      },
      {
        q: "¿Puedo obtener recomendaciones para el almuerzo y la cena?",
        a: "¡Sí! Usa el mapa de sabores para elegir tu preferencia, o usa el modo de filtro para configurar el tipo de comida y el rango de precio. Funciona para comidas en solitario, salidas en grupo y pedidos a domicilio.",
      },
      {
        q: "¿Es gratuito?",
        a: "Sí, todas las funciones de PickPlay son completamente gratuitas. Sin registro, sin instalación de app — ábrelo en tu navegador cuando no sepas qué comer.",
      },
    ],
  },
};

const koreanCategories = ["전체", "한식", "일식", "중식", "양식", "아시안", "분식", "디저트", "패스트푸드"];

const categoryColors: Record<string, string> = {
  한식: "#ef4444",
  일식: "#3b82f6",
  중식: "#eab308",
  양식: "#8b5cf6",
  아시안: "#10b981",
  분식: "#f97316",
  디저트: "#ec4899",
  패스트푸드: "#6366f1",
};

const foodLegend = Object.entries(categoryColors).map(([label, color]) => ({
  label,
  color,
}));

export default function FoodPage() {
  const locale = useLocale();
  const t = translations[locale];

  const [mode, setMode] = useState<"map" | "filter">("map");
  const [category, setCategory] = useState("전체");
  const [priceRange, setPriceRange] = useState("");
  const [mapCategories, setMapCategories] = useState<Set<string>>(new Set(["전체"]));

  const [spinning, setSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<Food | null>(null);
  const [candidates, setCandidates] = useState<Food[]>([]);
  const [mapSelected, setMapSelected] = useState<Food[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopSlot = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopSlot();
  }, [stopSlot]);

  const getFiltered = () => {
    let filtered = [...foodsData] as Food[];
    if (category !== "전체") filtered = filtered.filter((f) => f.category === category);
    if (priceRange) filtered = filtered.filter((f) => f.priceRange === priceRange);
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
    const totalTicks = 30 + Math.floor(Math.random() * 15);
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
      const delay = progress < 0.5 ? 60 : progress < 0.75 ? 60 + (progress - 0.5) * 400 : 160 + (progress - 0.75) * 800;
      intervalRef.current = setTimeout(runPhase, delay);
    };
    intervalRef.current = setTimeout(runPhase, 60);
  };

  const displayFood = candidates.length > 0 ? candidates[currentIndex % candidates.length] : null;

  // Map Korean category key to translated label
  const getCatLabel = (korCat: string) => {
    if (korCat === "전체") return t.categoryAll;
    return t.categoryLabels[korCat as keyof typeof t.categoryLabels] ?? korCat;
  };

  // Map legend labels to translated names
  const translatedLegend = foodLegend.map((item) => ({
    label: t.categoryLabels[item.label as keyof typeof t.categoryLabels] ?? item.label,
    color: item.color,
  }));

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {t.title}{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">{t.titleHighlight}</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400">{t.subtitle}</p>
        </motion.div>

        {/* Mode Toggle */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="flex justify-center mb-6">
          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
            <button onClick={() => setMode("map")} className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${mode === "map" ? "bg-white dark:bg-slate-700 text-orange-500 shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700"}`}>
              {t.modeMap}
            </button>
            <button onClick={() => setMode("filter")} className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${mode === "filter" ? "bg-white dark:bg-slate-700 text-orange-500 shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700"}`}>
              {t.modeFilter}
            </button>
          </div>
        </motion.div>

        <AdBanner format="horizontal" className="my-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

        <AnimatePresence mode="wait">
          {mode === "map" && (
            <motion.div key="map" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.2 }} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-8">
              <div className="flex gap-2 overflow-x-auto pb-2 mb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {koreanCategories.map((cat) => {
                  const isSelected = mapCategories.has(cat);
                  const accentColor = cat === "전체" ? "#f97316" : categoryColors[cat] || "#f97316";
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setMapSelected([]);
                        if (cat === "전체") {
                          setMapCategories(new Set(["전체"]));
                        } else {
                          const next = new Set(mapCategories);
                          next.delete("전체");
                          if (next.has(cat)) {
                            next.delete(cat);
                            if (next.size === 0) next.add("전체");
                          } else {
                            next.add(cat);
                            if (next.size === koreanCategories.length - 1) {
                              setMapCategories(new Set(["전체"]));
                              return;
                            }
                          }
                          setMapCategories(next);
                        }
                      }}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${isSelected ? "text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"}`}
                      style={isSelected ? { backgroundColor: accentColor } : undefined}
                    >
                      {getCatLabel(cat)}
                    </button>
                  );
                })}
              </div>
              <div className="max-w-md mx-auto">
                <TasteMap
                  items={(mapCategories.has("전체") ? foodsData : foodsData.filter((f) => mapCategories.has(f.category))) as Food[]}
                  getCoords={(item) => ({ x: item.x, y: item.y })}
                  getLabel={(item) => item.name}
                  getColor={(item) => categoryColors[item.category] || "#94a3b8"}
                  xLabels={t.xLabels}
                  yLabels={t.yLabels}
                  quadrantHints={t.quadrantHints}
                  accent={mapCategories.has("전체") || mapCategories.size > 1 ? "#f97316" : categoryColors[Array.from(mapCategories)[0]] || "#f97316"}
                  legend={translatedLegend}
                  onSelect={setMapSelected}
                />
              </div>
              <button onClick={() => startSlot()} disabled={spinning || mapSelected.length === 0} className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50">
                {spinning ? t.btnSpinning : mapSelected.length > 0 ? t.btnRecommendCount(mapSelected.length) : t.btnSelectOnMap}
              </button>
            </motion.div>
          )}

          {mode === "filter" && (
            <motion.div key="filter" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.2 }}>
              <form onSubmit={startSlot} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t.filterFoodType}</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      {koreanCategories.map((c) => (<option key={c} value={c}>{getCatLabel(c)}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t.filterPriceRange}</label>
                    <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      {t.priceRanges.map((p) => (<option key={p.value} value={p.value}>{p.label}</option>))}
                    </select>
                  </div>
                </div>
                <button type="submit" disabled={spinning} className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50">
                  {spinning ? t.btnSpinning : t.btnRecommend}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Slot Machine Display */}
        {(spinning || result) && candidates.length > 0 && (
          <div className="mb-8">
            <AnimatePresence mode="wait">
              {spinning && displayFood && (
                <motion.div key="slot" className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 p-1 mb-4">
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center">
                    <div className="text-sm text-slate-400 mb-2">{t.slotLabel}</div>
                    <div className="h-20 flex items-center justify-center overflow-hidden">
                      <motion.div key={currentIndex} initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.05 }} className="text-4xl md:text-5xl font-bold">
                        {displayFood.name}
                      </motion.div>
                    </div>
                    <div className="mt-3 text-slate-400 text-sm">{t.categoryLabels[displayFood.category as keyof typeof t.categoryLabels] ?? displayFood.category}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {!spinning && result && (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
                  <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 p-1">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-8">
                      <div className="text-center mb-6">
                        <div className="text-sm text-orange-500 font-medium mb-2">{t.resultLabel}</div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-2">{result.name}</h2>
                        <span className="inline-block px-3 py-1 text-sm rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">{t.categoryLabels[result.category as keyof typeof t.categoryLabels] ?? result.category}</span>
                      </div>
                      <div className="flex justify-center gap-3 mb-6">
                        <span className="px-4 py-1.5 text-sm font-semibold rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                          {result.priceRange === "low" ? t.priceLow : result.priceRange === "mid" ? t.priceMid : t.priceHigh}
                        </span>
                      </div>
                      <p className="text-center text-slate-500 dark:text-slate-400 mb-6">{result.description}</p>
                      <button onClick={() => startSlot()} disabled={spinning} className="w-full py-3 rounded-xl border-2 border-orange-400 text-orange-500 font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        {t.btnRetry}
                      </button>
                      <div className="flex gap-3 mt-3">
                        <a href={`https://map.naver.com/v5/search/${encodeURIComponent(result.name)}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-colors">
                          <span>📍</span> {t.naverMap}
                        </a>
                        <a href={`https://www.google.com/maps/search/${encodeURIComponent(result.name)}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-colors">
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
            <div className="text-4xl mb-4">🤔</div>
            <h3 className="text-lg font-bold mb-2">{t.emptyTitle}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{t.emptyDesc}</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button onClick={() => { setCategory("전체"); setPriceRange(""); }} className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">{t.btnReset}</button>
              <button onClick={() => { setCategory("전체"); setPriceRange(""); setTimeout(() => { const form = document.querySelector("form"); if (form) form.requestSubmit(); }, 50); }} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold hover:shadow-lg transition-all">{t.btnRandomAll}</button>
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
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-orange-500 transition-colors">
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
