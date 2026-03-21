"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";

const COLORS = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
  "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9",
  "#F1948A", "#82E0AA", "#F8C471", "#AED6F1", "#D2B4DE",
  "#A3E4D7", "#FAD7A0", "#A9CCE3", "#D5DBDB", "#EDBB99",
];

const PRESETS: Record<string, string[]> = {
  "점심 메뉴": ["한식", "중식", "일식", "양식", "분식", "패스트푸드"],
  "벌칙 게임": ["노래 부르기", "춤추기", "개인기", "사랑해 말하기", "윗몸일으키기"],
  "순서 정하기": ["1번", "2번", "3번", "4번", "5번"],
};

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
  // The pointer is at the top (12 o'clock = 0 deg in CSS = 270 deg mathematically)
  // Wheel rotates clockwise. Segment 0 starts at top going clockwise.
  // After rotation R, segment that lands at pointer = floor((R % 360) / segmentDeg)
  const normalized = ((totalRotation % 360) + 360) % 360;
  // Segment index is calculated from how far we rotated into the wheel
  // Since segment 0 was originally at top, after rotating `normalized` deg,
  // the segment at top is the one that was `normalized` degrees behind the start.
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
  const [items, setItems] = useState<string[]>(["한식", "중식", "일식", "양식", "분식", "패스트푸드"]);
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
    setItems(PRESETS[presetName]);
    setWinner(null);
    setShowResult(false);
    setRotation(0);
    totalRotationRef.current = 0;
  }, []);

  const spin = useCallback(() => {
    if (isSpinning || items.length < 2) return;
    setIsSpinning(true);
    setShowResult(false);
    setWinner(null);
    setConfetti(false);

    // Random: 3-5 full rotations + random offset
    const extraRotations = (3 + Math.floor(Math.random() * 3)) * 360;
    const randomOffset = Math.random() * 360;
    const delta = extraRotations + randomOffset;

    const newTotal = totalRotationRef.current + delta;
    totalRotationRef.current = newTotal;
    setRotation(newTotal);

    // Duration: 4s, matches CSS transition
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
              랜덤 룰렛
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              고민될 때는 룰렛에 맡겨! 돌리면 결정됩니다
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
                  const radius = 34; // % from center
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
                {isSpinning ? "..." : "돌리기!"}
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
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">결과</p>
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
                  다시 돌리기
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
              프리셋
            </h2>
            <div className="flex flex-wrap gap-2">
              {Object.keys(PRESETS).map((name) => (
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
              항목 관리 ({items.length}/20)
            </h2>

            {/* Input row */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="항목 입력..."
                maxLength={20}
                className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 text-sm"
              />
              <button
                onClick={addItem}
                disabled={!inputValue.trim() || items.length >= 20}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                추가
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
                      aria-label={`${item} 삭제`}
                    >
                      ×
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {items.length < 2 && (
              <p className="text-xs text-rose-500 mt-2">최소 2개 이상의 항목이 필요합니다</p>
            )}
          </motion.div>

          <AdBanner format="in-article" className="mt-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

          <AdBanner format="rectangle" className="mt-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
        </div>
      </div>
    </PageTransition>
  );
}
