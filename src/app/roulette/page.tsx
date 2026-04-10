"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/hooks/useLocale";

const translations = {
  ko: {
    title: "랜덤 룰렛",
    subtitle: "고민될 때는 룰렛에 맡겨! 돌리면 결정됩니다",
    presetsLabel: "프리셋",
    presets: {
      "점심 메뉴": ["한식", "중식", "일식", "양식", "분식", "패스트푸드"],
      "벌칙 게임": ["노래 부르기", "춤추기", "개인기", "사랑해 말하기", "윗몸일으키기"],
      "순서 정하기": ["1번", "2번", "3번", "4번", "5번"],
    } as Record<string, string[]>,
    itemsLabel: (count: number) => `항목 관리 (${count}/20)`,
    inputPlaceholder: "항목 입력...",
    btnAdd: "추가",
    btnSpin: "돌리기!",
    btnSpinning: "...",
    resultLabel: "결과",
    btnRetry: "다시 돌리기",
    minItemsWarning: "최소 2개 이상의 항목이 필요합니다",
    ariaRemove: (item: string) => `${item} 삭제`,
    defaultItems: ["한식", "중식", "일식", "양식", "분식", "패스트푸드"],
    faqTitle: "자주 묻는 질문",
    faqItems: [
      { q: "룰렛 항목은 몇 개까지 추가할 수 있나요?", a: "최대 20개까지 항목을 추가할 수 있습니다. 항목이 많을수록 각 영역이 좁아지므로, 10개 이하로 설정하면 가독성이 좋습니다. 최소 2개의 항목이 있어야 룰렛을 돌릴 수 있습니다." },
      { q: "결과는 완전히 랜덤인가요?", a: "네, 회전 각도는 매번 무작위로 생성됩니다. 각 항목이 선택될 확률은 동일하며, 어떤 항목에도 편향이 없습니다. 공정한 랜덤 방식으로 결정이 이루어집니다." },
      { q: "프리셋은 어떻게 사용하나요?", a: "상단의 프리셋 버튼을 누르면 점심 메뉴, 벌칙 게임, 순서 정하기 등 미리 설정된 항목 세트가 자동으로 입력됩니다. 프리셋 적용 후 항목을 추가하거나 삭제해서 원하는 대로 커스터마이징할 수 있습니다." },
      { q: "항목을 삭제하려면 어떻게 하나요?", a: "각 항목 태그의 오른쪽에 있는 × 버튼을 누르면 해당 항목이 삭제됩니다. 단, 항목이 2개 이하일 때는 삭제가 비활성화되어 최소 개수를 유지합니다." },
      { q: "룰렛을 활용할 수 있는 상황은 어떤 게 있나요?", a: "점심 메뉴 고르기, 게임 순서 정하기, 파티 벌칙 결정, 공부 과목 선택, 업무 담당자 배정 등 다양한 상황에서 활용할 수 있습니다. 누군가를 설득하기 어려울 때 룰렛에 결정을 맡겨 중립적으로 해결할 수 있습니다." },
    ],
  },
  en: {
    title: "Random Roulette",
    subtitle: "Can't decide? Spin the wheel and let fate choose!",
    presetsLabel: "Presets",
    presets: {
      "Lunch": ["Korean", "Chinese", "Japanese", "Western", "Snacks", "Fast Food"],
      "Penalty Game": ["Sing a song", "Dance", "Do a trick", "Say I love you", "Do sit-ups"],
      "Pick Order": ["1st", "2nd", "3rd", "4th", "5th"],
    } as Record<string, string[]>,
    itemsLabel: (count: number) => `Items (${count}/20)`,
    inputPlaceholder: "Add an item...",
    btnAdd: "Add",
    btnSpin: "Spin!",
    btnSpinning: "...",
    resultLabel: "Result",
    btnRetry: "Spin Again",
    minItemsWarning: "At least 2 items are required",
    ariaRemove: (item: string) => `Remove ${item}`,
    defaultItems: ["Korean", "Chinese", "Japanese", "Western", "Snacks", "Fast Food"],
    faqTitle: "Frequently Asked Questions",
    faqItems: [
      { q: "How many items can I add to the roulette?", a: "You can add up to 20 items. The more items you add, the narrower each segment becomes, so 10 or fewer items is recommended for readability. At least 2 items are required to spin." },
      { q: "Is the result truly random?", a: "Yes, the spin angle is generated randomly each time. Every item has an equal probability of being selected, with no bias toward any particular option. The decision is made through a fair random process." },
      { q: "How do I use the presets?", a: "Tap one of the preset buttons at the top to automatically load a predefined set of items such as lunch menus, penalty games, or order selection. After applying a preset, you can freely add or remove items to customize it." },
      { q: "How do I remove an item?", a: "Tap the × button on the right side of any item tag to remove it. Deletion is disabled when there are 2 or fewer items to maintain the minimum count required to spin." },
    ],
  },
  ja: {
    title: "ランダムルーレット",
    subtitle: "迷ったらルーレットにお任せ！回せば決まります",
    presetsLabel: "プリセット",
    presets: {
      "ランチメニュー": ["韓国料理", "中華", "和食", "洋食", "軽食", "ファストフード"],
      "罰ゲーム": ["歌を歌う", "踊る", "一芸", "愛してると言う", "腹筋"],
      "順番決め": ["1番", "2番", "3番", "4番", "5番"],
    } as Record<string, string[]>,
    itemsLabel: (count: number) => `項目管理 (${count}/20)`,
    inputPlaceholder: "項目を入力...",
    btnAdd: "追加",
    btnSpin: "回す！",
    btnSpinning: "...",
    resultLabel: "結果",
    btnRetry: "もう一度",
    minItemsWarning: "最低2つ以上の項目が必要です",
    ariaRemove: (item: string) => `${item}を削除`,
    defaultItems: ["韓国料理", "中華", "和食", "洋食", "軽食", "ファストフード"],
    faqTitle: "よくある質問",
    faqItems: [
      { q: "ルーレットに追加できる項目は何個までですか？", a: "最大20個まで項目を追加できます。項目が多いほど各セクションが狭くなるため、10個以下に設定すると見やすくなります。ルーレットを回すには最低2つの項目が必要です。" },
      { q: "結果は完全にランダムですか？", a: "はい、回転角度は毎回ランダムに生成されます。各項目が選ばれる確率は均等で、特定の項目への偏りはありません。公平なランダム方式で決定されます。" },
      { q: "プリセットはどのように使いますか？", a: "上部のプリセットボタンを押すと、ランチメニュー、罰ゲーム、順番決めなど、あらかじめ設定された項目セットが自動的に入力されます。適用後に項目を追加・削除してカスタマイズできます。" },
      { q: "項目を削除するにはどうすればいいですか？", a: "各項目タグの右側にある × ボタンを押すと削除できます。ただし、項目が2つ以下の場合は削除が無効になり、最小数が維持されます。" },
    ],
  },
  zh: {
    title: "随机转盘",
    subtitle: "犹豫不决？转动轮盘让命运决定！",
    presetsLabel: "预设",
    presets: {
      "午餐菜单": ["韩餐", "中餐", "日料", "西餐", "小吃", "快餐"],
      "惩罚游戏": ["唱歌", "跳舞", "表演才艺", "说我爱你", "做仰卧起坐"],
      "决定顺序": ["第1", "第2", "第3", "第4", "第5"],
    } as Record<string, string[]>,
    itemsLabel: (count: number) => `项目管理 (${count}/20)`,
    inputPlaceholder: "输入项目...",
    btnAdd: "添加",
    btnSpin: "旋转！",
    btnSpinning: "...",
    resultLabel: "结果",
    btnRetry: "再转一次",
    minItemsWarning: "至少需要2个项目",
    ariaRemove: (item: string) => `删除${item}`,
    defaultItems: ["韩餐", "中餐", "日料", "西餐", "小吃", "快餐"],
    faqTitle: "常见问题",
    faqItems: [
      { q: "转盘最多可以添加多少个选项？", a: "最多可以添加20个选项。选项越多，每个扇形区域越窄，建议设置10个以内以保证可读性。转动转盘至少需要2个选项。" },
      { q: "结果是完全随机的吗？", a: "是的，每次旋转角度都是随机生成的。每个选项被选中的概率相同，不会偏向任何特定选项。通过公平的随机方式做出决定。" },
      { q: "如何使用「预设」功能？", a: "点击顶部的预设按钮，即可自动加载预先设置好的选项组合，例如午餐菜单、惩罚游戏、顺序决定等。应用预设后，您可以自由添加或删除选项进行自定义。" },
      { q: "如何删除选项？", a: "点击每个选项标签右侧的 × 按钮即可删除该选项。当选项数量为2个或以下时，删除功能将被禁用，以维持所需的最少数量。" },
    ],
  },
  es: {
    title: "Ruleta aleatoria",
    subtitle: "¿No puedes decidir? ¡Gira la ruleta y deja que el destino elija!",
    presetsLabel: "Preajustes",
    presets: {
      "Almuerzo": ["Coreano", "Chino", "Japonés", "Occidental", "Snacks", "Comida rápida"],
      "Juego de penalti": ["Cantar", "Bailar", "Hacer un truco", "Decir te quiero", "Hacer abdominales"],
      "Elegir orden": ["1°", "2°", "3°", "4°", "5°"],
    } as Record<string, string[]>,
    itemsLabel: (count: number) => `Elementos (${count}/20)`,
    inputPlaceholder: "Agregar elemento...",
    btnAdd: "Agregar",
    btnSpin: "¡Girar!",
    btnSpinning: "...",
    resultLabel: "Resultado",
    btnRetry: "Girar de nuevo",
    minItemsWarning: "Se necesitan al menos 2 elementos",
    ariaRemove: (item: string) => `Eliminar ${item}`,
    defaultItems: ["Coreano", "Chino", "Japonés", "Occidental", "Snacks", "Comida rápida"],
    faqTitle: "Preguntas Frecuentes",
    faqItems: [
      { q: "¿Cuántos elementos puedo agregar a la ruleta?", a: "Puedes agregar hasta 20 elementos. Cuantos más elementos agregues, más estrecho será cada segmento, por lo que se recomienda usar 10 o menos para mayor legibilidad. Se necesitan al menos 2 elementos para girar." },
      { q: "¿El resultado es verdaderamente aleatorio?", a: "Sí, el ángulo de giro se genera aleatoriamente cada vez. Cada elemento tiene la misma probabilidad de ser seleccionado, sin ningún sesgo. La decisión se toma mediante un proceso completamente aleatorio y justo." },
      { q: "¿Cómo uso los preajustes?", a: "Toca uno de los botones de preajuste en la parte superior para cargar automáticamente un conjunto predefinido de elementos como menús de almuerzo, juegos de penalti o selección de orden. Después puedes agregar o eliminar elementos para personalizar." },
      { q: "¿Cómo elimino un elemento?", a: "Toca el botón × en el lado derecho de cualquier etiqueta de elemento para eliminarlo. La eliminación está desactivada cuando hay 2 o menos elementos para mantener el mínimo requerido." },
    ],
  },
};

const COLORS = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
  "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9",
  "#F1948A", "#82E0AA", "#F8C471", "#AED6F1", "#D2B4DE",
  "#A3E4D7", "#FAD7A0", "#A9CCE3", "#D5DBDB", "#EDBB99",
];

// Build a conic-gradient CSS string from items and colors
function buildConicGradient(items: string[]): string {
  const count = items.length;
  const segmentDeg = 360 / count;
  const stops: string[] = [];
  items.forEach((_, i) => {
    const color = COLORS[i % COLORS.length];
    const start = i * segmentDeg;
    const end = (i + 1) * segmentDeg;
    stops.push(`${color} ${start}deg ${end}deg`);
  });
  return `conic-gradient(${stops.join(", ")})`;
}

// Given final rotation (cumulative degrees), determine winning index
function getWinnerIndex(totalRotation: number, count: number): number {
  const segmentDeg = 360 / count;
  const normalized = ((totalRotation % 360) + 360) % 360;
  const idx = (count - Math.floor(normalized / segmentDeg)) % count;
  return idx;
}

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
}

function Confetti({ active }: { active: boolean }) {
  const pieces = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: COLORS[i % COLORS.length],
    size: 6 + Math.random() * 8,
    delay: Math.random() * 0.4,
    rotateDelta: Math.random() > 0.5 ? 360 : -360,
    duration: 1.4 + Math.random() * 0.8,
    borderRadius: Math.random() > 0.5 ? "50%" : "2px",
  })), []);

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: "110%", opacity: 0, rotate: p.rotateDelta }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.borderRadius,
          }}
        />
      ))}
    </div>
  );
}

export default function RoulettePage() {
  const locale = useLocale();
  const t = translations[locale];

  const [items, setItems] = useState<string[]>(t.defaultItems);
  const [inputValue, setInputValue] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const totalRotationRef = useRef(0);

  const addItem = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed || items.length >= 20 || items.includes(trimmed)) return;
    setItems((prev) => [...prev, trimmed]);
    setInputValue("");
    setWinner(null);
    setShowResult(false);
  }, [inputValue, items]);

  const removeItem = useCallback((index: number) => {
    if (items.length <= 2) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
    setWinner(null);
    setShowResult(false);
  }, [items.length]);

  const applyPreset = useCallback((presetName: string) => {
    setItems(t.presets[presetName]);
    setWinner(null);
    setShowResult(false);
    setRotation(0);
    totalRotationRef.current = 0;
  }, [t.presets]);

  const spin = useCallback(() => {
    if (isSpinning || items.length < 2) return;
    setIsSpinning(true);
    setShowResult(false);
    setWinner(null);
    setConfetti(false);

    const extraRotations = (3 + Math.floor(Math.random() * 3)) * 360;
    const randomOffset = Math.random() * 360;
    const delta = extraRotations + randomOffset;

    const newTotal = totalRotationRef.current + delta;
    totalRotationRef.current = newTotal;
    setRotation(newTotal);

    setTimeout(() => {
      const winnerIdx = getWinnerIndex(newTotal, items.length);
      setWinner(items[winnerIdx]);
      setIsSpinning(false);
      setShowResult(true);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 2500);
    }, 4100);
  }, [isSpinning, items]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addItem();
  };

  const conicGradient = buildConicGradient(items);
  const segmentDeg = 360 / items.length;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-fuchsia-50/20 dark:from-slate-950 dark:via-violet-950/20 dark:to-fuchsia-950/10">
        <div className="max-w-lg mx-auto px-4 py-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent mb-2">
              {t.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Wheel section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative flex flex-col items-center mb-8"
          >
            {/* Pointer arrow at top */}
            <div className="relative z-10 mb-[-16px]">
              <div
                className="w-0 h-0"
                style={{
                  borderLeft: "14px solid transparent",
                  borderRight: "14px solid transparent",
                  borderTop: "28px solid #8B5CF6",
                  filter: "drop-shadow(0 2px 4px rgba(139,92,246,0.5))",
                }}
              />
            </div>

            {/* Wheel container */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              {/* Spinning wheel */}
              <div
                ref={wheelRef}
                className="w-full h-full rounded-full overflow-hidden shadow-2xl"
                style={{
                  background: conicGradient,
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning
                    ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
                    : "transform 0.1s ease",
                  willChange: "transform",
                }}
              >
                {/* Segment labels */}
                {items.map((item, i) => {
                  const angleDeg = i * segmentDeg + segmentDeg / 2;
                  const angleRad = (angleDeg - 90) * (Math.PI / 180);
                  const radius = 34;
                  const x = 50 + radius * Math.cos(angleRad);
                  const y = 50 + radius * Math.sin(angleRad);
                  return (
                    <div
                      key={i}
                      className="absolute flex items-center justify-center"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: `translate(-50%, -50%) rotate(${angleDeg}deg)`,
                        width: "80px",
                        textAlign: "center",
                      }}
                    >
                      <span
                        className="font-bold text-white drop-shadow-md leading-tight"
                        style={{
                          fontSize: items.length <= 6 ? "13px" : items.length <= 10 ? "11px" : "9px",
                          textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                          maxWidth: "70px",
                          display: "block",
                          wordBreak: "keep-all",
                          overflowWrap: "break-word",
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Center spin button */}
              <button
                onClick={spin}
                disabled={isSpinning || items.length < 2}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white dark:bg-slate-900 shadow-lg border-4 border-violet-400 dark:border-violet-500 flex items-center justify-center font-extrabold text-violet-600 dark:text-violet-400 text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ zIndex: 10 }}
              >
                {isSpinning ? t.btnSpinning : t.btnSpin}
              </button>
            </div>
          </motion.div>

          {/* Result display */}
          <AnimatePresence>
            {showResult && winner && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="relative mb-6 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-violet-200 dark:border-violet-700 text-center overflow-hidden"
              >
                <Confetti active={confetti} />
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">{t.resultLabel}</p>
                <motion.p
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  className="text-4xl font-extrabold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent mb-4"
                >
                  {winner}
                </motion.p>
                <button
                  onClick={spin}
                  disabled={isSpinning}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {t.btnRetry}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Preset buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-4"
          >
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
              {t.presetsLabel}
            </h2>
            <div className="flex flex-wrap gap-2">
              {Object.keys(t.presets).map((name) => (
                <button
                  key={name}
                  onClick={() => applyPreset(name)}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-violet-100 dark:hover:bg-violet-900/40 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
                >
                  {name}
                </button>
              ))}
            </div>
          </motion.div>

          <AdBanner format="horizontal" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

          {/* Item management */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
              {t.itemsLabel(items.length)}
            </h2>

            {/* Input row */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.inputPlaceholder}
                maxLength={20}
                className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 text-sm"
              />
              <button
                onClick={addItem}
                disabled={!inputValue.trim() || items.length >= 20}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {t.btnAdd}
              </button>
            </div>

            {/* Item tags */}
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {items.map((item, i) => (
                  <motion.div
                    key={item + i}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-1 pl-3 pr-1 py-1 rounded-full text-sm font-medium text-white shadow-sm"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  >
                    <span style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>
                      {item}
                    </span>
                    <button
                      onClick={() => removeItem(i)}
                      disabled={items.length <= 2}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-black/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold ml-0.5"
                      aria-label={t.ariaRemove(item)}
                    >
                      ×
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {items.length < 2 && (
              <p className="text-xs text-rose-500 mt-2">{t.minItemsWarning}</p>
            )}
          </motion.div>

          <AdBanner format="in-article" className="mt-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

          {/* FAQ Section */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mt-4">
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
              {t.faqTitle}
            </h2>
            <div className="space-y-2">
              {t.faqItems.map((item: {q: string; a: string}, i: number) => (
                <details key={i} className="group">
                  <summary className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-200 py-2 hover:text-primary-500">
                    {item.q}
                  </summary>
                  <p className="text-sm text-slate-500 dark:text-slate-400 pb-3 pl-4 leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <AdBanner format="rectangle" className="mt-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
        </div>
      </div>
    </PageTransition>
  );
}
