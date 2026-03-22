"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/hooks/useLocale";

const translations = {
  ko: {
    title: "사다리 타기",
    subtitle: "공정한 사다리로 순서, 당번, 벌칙을 정해보세요",
    playerCount: "참가자 수",
    playerRange: (min: number, max: number) => `${min}명 ~ ${max}명`,
    playerNames: "참가자 이름 (선택)",
    playerPlaceholder: (i: number) => `참가자 ${i + 1}`,
    results: "결과 입력 (선택)",
    resultPlaceholder: (i: number) => `결과 ${i + 1}`,
    presetWinner: "당첨 1명",
    presetPenalty: "벌칙 1명",
    startBtn: "사다리 시작",
    faqTitle: "자주 묻는 질문",
    faq: [
      {
        q: "사다리 타기는 어떻게 사용하나요?",
        a: "참가자 수와 이름, 결과를 입력하고 사다리 시작 버튼을 누르세요. 이름 카드를 클릭하면 해당 사람의 경로가 애니메이션으로 표시됩니다.",
      },
      {
        q: "사다리 결과는 공정한가요?",
        a: "네! 가로 막대는 매번 무작위로 생성되어 결과를 예측하거나 조작할 수 없습니다. 완전히 공정합니다.",
      },
      {
        q: "전체 공개는 어떻게 하나요?",
        a: "사다리 화면 하단의 '전체 공개' 버튼을 누르면 모든 참가자의 경로가 순서대로 애니메이션과 함께 공개됩니다.",
      },
    ],
    clickToReveal: "이름을 클릭해 경로를 확인하세요",
    tracing: "경로 추적 중...",
    revealed: (done: number, total: number) => `${done}/${total}명 확인됨`,
    resetSetup: "다시 설정",
    revealAll: "전체 공개",
    viewResult: "결과 보기",
    backToStart: "처음으로",
    hintText: "위의 색깔 이름 버튼을 눌러 사다리를 타세요",
    finalResult: "최종 결과",
    copyResult: "결과 복사",
    playAgain: "다시 하기",
    defaultResult: (i: number) => `결과 ${i + 1}`,
    defaultPlayer: (i: number) => `참가자 ${i + 1}`,
    presetWinnerItems: (count: number) => ["당첨", ...Array(count - 1).fill("꽝")],
    presetPenaltyItems: (count: number) => ["벌칙", ...Array(count - 1).fill("면제")],
  },
  en: {
    title: "Ladder Game",
    subtitle: "Use a fair ladder to decide order, duty, or penalties",
    playerCount: "Number of Players",
    playerRange: (min: number, max: number) => `${min} – ${max} players`,
    playerNames: "Player Names (optional)",
    playerPlaceholder: (i: number) => `Player ${i + 1}`,
    results: "Results (optional)",
    resultPlaceholder: (i: number) => `Result ${i + 1}`,
    presetWinner: "1 Winner",
    presetPenalty: "1 Penalty",
    startBtn: "Start Ladder",
    faqTitle: "FAQ",
    faq: [
      {
        q: "How do I use the ladder game?",
        a: "Enter the number of players, their names, and the results, then press Start Ladder. Click a player's name card to animate their path down the ladder.",
      },
      {
        q: "Are the ladder results fair?",
        a: "Yes! The horizontal rungs are generated randomly each time, so results cannot be predicted or manipulated — completely fair.",
      },
      {
        q: "How do I reveal all paths at once?",
        a: "Press the 'Reveal All' button at the bottom of the ladder screen to animate every player's path in sequence.",
      },
    ],
    clickToReveal: "Click a name to reveal their path",
    tracing: "Tracing path...",
    revealed: (done: number, total: number) => `${done}/${total} revealed`,
    resetSetup: "Reset",
    revealAll: "Reveal All",
    viewResult: "View Results",
    backToStart: "Back to Start",
    hintText: "Click a colored name button above to start",
    finalResult: "Final Results",
    copyResult: "Copy Results",
    playAgain: "Play Again",
    defaultResult: (i: number) => `Result ${i + 1}`,
    defaultPlayer: (i: number) => `Player ${i + 1}`,
    presetWinnerItems: (count: number) => ["Winner", ...Array(count - 1).fill("Lose")],
    presetPenaltyItems: (count: number) => ["Penalty", ...Array(count - 1).fill("Safe")],
  },
  ja: {
    title: "はしごゲーム",
    subtitle: "公平なはしごで順番・当番・罰ゲームを決めよう",
    playerCount: "参加者数",
    playerRange: (min: number, max: number) => `${min}人 〜 ${max}人`,
    playerNames: "参加者名（任意）",
    playerPlaceholder: (i: number) => `参加者 ${i + 1}`,
    results: "結果入力（任意）",
    resultPlaceholder: (i: number) => `結果 ${i + 1}`,
    presetWinner: "当選1人",
    presetPenalty: "罰ゲーム1人",
    startBtn: "はしごスタート",
    faqTitle: "よくある質問",
    faq: [
      {
        q: "はしごゲームの使い方は？",
        a: "参加者数・名前・結果を入力してスタートボタンを押してください。名前カードをクリックするとその人の経路がアニメーションで表示されます。",
      },
      {
        q: "はしごの結果は公平ですか？",
        a: "はい！横棒は毎回ランダムに生成されるため、結果を予測・操作することはできません。完全に公平です。",
      },
      {
        q: "全員まとめて公開するには？",
        a: "はしが画面下の「全て公開」ボタンを押すと、全参加者の経路が順番にアニメーションで公開されます。",
      },
    ],
    clickToReveal: "名前をクリックして経路を確認",
    tracing: "経路追跡中...",
    revealed: (done: number, total: number) => `${done}/${total}人 確認済み`,
    resetSetup: "やり直し",
    revealAll: "全て公開",
    viewResult: "結果を見る",
    backToStart: "最初から",
    hintText: "上の色付き名前ボタンを押してはしごを進めてください",
    finalResult: "最終結果",
    copyResult: "結果をコピー",
    playAgain: "もう一度",
    defaultResult: (i: number) => `結果 ${i + 1}`,
    defaultPlayer: (i: number) => `参加者 ${i + 1}`,
    presetWinnerItems: (count: number) => ["当選", ...Array(count - 1).fill("ハズレ")],
    presetPenaltyItems: (count: number) => ["罰ゲーム", ...Array(count - 1).fill("セーフ")],
  },
  zh: {
    title: "梯子游戏",
    subtitle: "用公平的梯子决定顺序、值班和惩罚",
    playerCount: "参与者人数",
    playerRange: (min: number, max: number) => `${min} ~ ${max} 人`,
    playerNames: "参与者姓名（可选）",
    playerPlaceholder: (i: number) => `参与者 ${i + 1}`,
    results: "结果输入（可选）",
    resultPlaceholder: (i: number) => `结果 ${i + 1}`,
    presetWinner: "1人中签",
    presetPenalty: "1人受罚",
    startBtn: "开始梯子",
    faqTitle: "常见问题",
    faq: [
      {
        q: "梯子游戏怎么用？",
        a: "输入参与者人数、姓名和结果，然后点击开始。点击姓名卡片，该玩家的路径将以动画显示。",
      },
      {
        q: "梯子结果公平吗？",
        a: "是的！横杠每次随机生成，结果无法预测或操控，完全公平。",
      },
      {
        q: "如何一次公开所有路径？",
        a: '点击梯子画面底部的"全部公开"按钮，所有参与者的路径将依次以动画展示。',
      },
    ],
    clickToReveal: "点击姓名查看路径",
    tracing: "追踪路径中...",
    revealed: (done: number, total: number) => `已查看 ${done}/${total} 人`,
    resetSetup: "重新设置",
    revealAll: "全部公开",
    viewResult: "查看结果",
    backToStart: "回到开始",
    hintText: "点击上方彩色姓名按钮开始",
    finalResult: "最终结果",
    copyResult: "复制结果",
    playAgain: "再玩一次",
    defaultResult: (i: number) => `结果 ${i + 1}`,
    defaultPlayer: (i: number) => `参与者 ${i + 1}`,
    presetWinnerItems: (count: number) => ["中签", ...Array(count - 1).fill("未中")],
    presetPenaltyItems: (count: number) => ["受罚", ...Array(count - 1).fill("免罚")],
  },
  es: {
    title: "Juego de escalera",
    subtitle: "Usa una escalera justa para decidir orden, turno o penalizaciones",
    playerCount: "Número de jugadores",
    playerRange: (min: number, max: number) => `${min} – ${max} jugadores`,
    playerNames: "Nombres de jugadores (opcional)",
    playerPlaceholder: (i: number) => `Jugador ${i + 1}`,
    results: "Resultados (opcional)",
    resultPlaceholder: (i: number) => `Resultado ${i + 1}`,
    presetWinner: "1 Ganador",
    presetPenalty: "1 Penalti",
    startBtn: "Iniciar escalera",
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Cómo se usa el juego de escalera?",
        a: "Ingresa el número de jugadores, sus nombres y los resultados, luego pulsa Iniciar escalera. Haz clic en el nombre de un jugador para animar su camino por la escalera.",
      },
      {
        q: "¿Son justos los resultados de la escalera?",
        a: "¡Sí! Los peldaños horizontales se generan aleatoriamente cada vez, por lo que los resultados no pueden predecirse ni manipularse — completamente justo.",
      },
      {
        q: "¿Cómo revelo todos los caminos a la vez?",
        a: "Pulsa el botón 'Revelar todo' en la parte inferior de la pantalla para animar el camino de todos los jugadores en secuencia.",
      },
    ],
    clickToReveal: "Haz clic en un nombre para revelar su camino",
    tracing: "Trazando camino...",
    revealed: (done: number, total: number) => `${done}/${total} revelados`,
    resetSetup: "Reiniciar",
    revealAll: "Revelar todo",
    viewResult: "Ver resultados",
    backToStart: "Volver al inicio",
    hintText: "Haz clic en un botón de nombre de color arriba para empezar",
    finalResult: "Resultados finales",
    copyResult: "Copiar resultados",
    playAgain: "Jugar de nuevo",
    defaultResult: (i: number) => `Resultado ${i + 1}`,
    defaultPlayer: (i: number) => `Jugador ${i + 1}`,
    presetWinnerItems: (count: number) => ["Gana", ...Array(count - 1).fill("Pierde")],
    presetPenaltyItems: (count: number) => ["Penalti", ...Array(count - 1).fill("Libre")],
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = "setup" | "play" | "result";

interface Rung {
  col: number;
  row: number;
}

interface PathStep {
  col: number;
  row: number;
  direction: "down" | "right" | "left";
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MIN_PLAYERS = 2;
const MAX_PLAYERS = 10;
const RUNG_ROWS = 8;

const PLAYER_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#F7DC6F",
  "#DDA0DD",
  "#98D8C8",
  "#F1948A",
  "#82E0AA",
  "#F8C471",
];

// ─── Utility ──────────────────────────────────────────────────────────────────

function generateRungs(playerCount: number): Rung[] {
  const rungs: Rung[] = [];
  for (let row = 0; row < RUNG_ROWS; row++) {
    let col = 0;
    while (col < playerCount - 1) {
      if (Math.random() < 0.45) {
        rungs.push({ col, row });
        col += 2;
      } else {
        col += 1;
      }
    }
  }
  return rungs;
}

function tracePath(startCol: number, rungs: Rung[], playerCount: number): PathStep[] {
  const steps: PathStep[] = [];
  let col = startCol;

  const rungSet = new Set(rungs.map((r) => `${r.row}:${r.col}`));
  const hasRung = (row: number, c: number) => rungSet.has(`${row}:${c}`);

  for (let row = 0; row < RUNG_ROWS; row++) {
    steps.push({ col, row, direction: "down" });

    if (col < playerCount - 1 && hasRung(row, col)) {
      steps.push({ col, row, direction: "right" });
      col += 1;
    } else if (col > 0 && hasRung(row, col - 1)) {
      steps.push({ col, row, direction: "left" });
      col -= 1;
    }
  }

  steps.push({ col, row: RUNG_ROWS, direction: "down" });

  return steps;
}

function getDestination(startCol: number, rungs: Rung[], playerCount: number): number {
  const path = tracePath(startCol, rungs, playerCount);
  return path[path.length - 1].col;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface LadderVisualizationProps {
  playerCount: number;
  rungs: Rung[];
  playerNames: string[];
  results: string[];
  animatingPlayer: number | null;
  revealedPlayers: Set<number>;
  destinations: number[];
  onPlayerClick: (idx: number) => void;
  animating: boolean;
}

function LadderVisualization({
  playerCount,
  rungs,
  playerNames,
  results,
  animatingPlayer,
  revealedPlayers,
  destinations,
  onPlayerClick,
  animating,
}: LadderVisualizationProps) {
  const PAD = 24;
  const colLeft = (col: number) => {
    const frac = playerCount <= 1 ? 0 : col / (playerCount - 1);
    return `calc(${PAD}px + (100% - ${PAD * 2}px) * ${frac})`;
  };
  const rowPercent = (row: number) => (row / RUNG_ROWS) * 100;
  const oneColFrac = playerCount <= 1 ? 0 : 1 / (playerCount - 1);

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full select-none overflow-x-auto">
      {/* Player name row */}
      <div className="relative flex mb-1" style={{ height: "44px", minWidth: playerCount > 6 ? `${playerCount * 56}px` : undefined }}>
        {Array.from({ length: playerCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => !animating && onPlayerClick(i)}
            disabled={animating || revealedPlayers.has(i)}
            className={`absolute -translate-x-1/2 flex flex-col items-center transition-all ${
              revealedPlayers.has(i) ? "cursor-default" : "cursor-pointer hover:scale-110"
            }`}
            style={{ left: colLeft(i), top: 0 }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md transition-all"
              style={{
                backgroundColor: PLAYER_COLORS[i % PLAYER_COLORS.length],
                opacity: revealedPlayers.has(i) ? 0.6 : 1,
                boxShadow:
                  animatingPlayer === i
                    ? `0 0 12px 4px ${PLAYER_COLORS[i % PLAYER_COLORS.length]}88`
                    : undefined,
              }}
            >
              {(playerNames[i] || `${i + 1}`).slice(0, 2)}
            </div>
          </button>
        ))}
      </div>

      {/* Ladder body */}
      <div
        ref={containerRef}
        className="relative w-full bg-white/60 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700"
        style={{ height: "320px", minWidth: playerCount > 6 ? `${playerCount * 56}px` : undefined }}
      >
        {/* Vertical lines */}
        {Array.from({ length: playerCount }).map((_, i) => (
          <div
            key={`vline-${i}`}
            className="absolute top-0 bottom-0"
            style={{
              left: colLeft(i),
              width: "3px",
              transform: "translateX(-50%)",
              backgroundColor: "#cbd5e1",
            }}
          />
        ))}

        {/* Horizontal rungs */}
        {rungs.map((rung, idx) => (
          <div
            key={`rung-${idx}`}
            className="absolute"
            style={{
              left: colLeft(rung.col),
              top: `${rowPercent(rung.row + 0.5)}%`,
              width: `calc((100% - ${PAD * 2}px) * ${oneColFrac})`,
              height: "3px",
              transform: "translateY(-50%)",
              backgroundColor: "#94a3b8",
            }}
          />
        ))}

        {/* Animated paths for revealed players */}
        {Array.from(revealedPlayers).map((playerIdx) => {
          const path = tracePath(playerIdx, rungs, playerCount);
          const color = PLAYER_COLORS[playerIdx % PLAYER_COLORS.length];
          return (
            <AnimatedPath
              key={`path-${playerIdx}`}
              path={path}
              color={color}
              playerCount={playerCount}
              isAnimating={animatingPlayer === playerIdx}
              pad={PAD}
            />
          );
        })}
      </div>

      {/* Result row */}
      <div className="relative flex mt-1" style={{ height: "44px", minWidth: playerCount > 6 ? `${playerCount * 56}px` : undefined }}>
        {Array.from({ length: playerCount }).map((_, i) => {
          const playerAtI = destinations.indexOf(i);
          const isRevealed = playerAtI !== -1 && revealedPlayers.has(playerAtI);

          return (
            <div
              key={i}
              className="absolute -translate-x-1/2 flex items-center justify-center"
              style={{ left: colLeft(i), top: 0, height: "44px" }}
            >
              <AnimatePresence>
                {isRevealed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="px-2 py-1 rounded-lg text-xs font-bold text-white shadow-md whitespace-nowrap"
                    style={{
                      backgroundColor: PLAYER_COLORS[playerAtI % PLAYER_COLORS.length],
                      maxWidth: "72px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {results[i]}
                  </motion.div>
                ) : (
                  <div className="px-2 py-1 rounded-lg text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700 whitespace-nowrap">
                    {results[i]}
                  </div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── SVG-based animated path overlay ──────────────────────────────────────────

interface AnimatedPathProps {
  path: PathStep[];
  color: string;
  playerCount: number;
  isAnimating: boolean;
  pad: number;
}

function AnimatedPath({ path, color, playerCount, isAnimating, pad }: AnimatedPathProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });
  const [dashOffset, setDashOffset] = useState(0);
  const [totalLength, setTotalLength] = useState(0);
  const pathRef = useRef<SVGPolylineElement>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const parent = svg.parentElement;
    if (!parent) return;
    const measure = () => {
      const rect = parent.getBoundingClientRect();
      setSvgSize({ w: rect.width, h: rect.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  const points = useMemo(() => {
    if (svgSize.w === 0 || svgSize.h === 0) return [];
    const usableW = svgSize.w - pad * 2;
    const colX = (col: number) =>
      pad + (playerCount <= 1 ? 0 : (col / (playerCount - 1)) * usableW);
    const rowY = (row: number) => (row / RUNG_ROWS) * svgSize.h;

    const pts: { x: number; y: number }[] = [];
    let curCol = path[0]?.col ?? 0;

    for (let i = 0; i < path.length; i++) {
      const step = path[i];
      if (step.direction === "down") {
        pts.push({ x: colX(step.col), y: rowY(step.row) });
        curCol = step.col;
      } else if (step.direction === "right") {
        pts.push({ x: colX(curCol), y: rowY(step.row + 0.5) });
        pts.push({ x: colX(curCol + 1), y: rowY(step.row + 0.5) });
        curCol = curCol + 1;
      } else if (step.direction === "left") {
        pts.push({ x: colX(curCol), y: rowY(step.row + 0.5) });
        pts.push({ x: colX(curCol - 1), y: rowY(step.row + 0.5) });
        curCol = curCol - 1;
      }
    }
    return pts;
  }, [path, svgSize.w, svgSize.h, playerCount, pad]);

  const pointsStr = points.map((p) => `${p.x},${p.y}`).join(" ");

  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      setTotalLength(len);
      if (isAnimating) {
        setDashOffset(len);
      }
    }
  }, [pointsStr, isAnimating]);

  useEffect(() => {
    if (!isAnimating || totalLength === 0) {
      if (!isAnimating) setDashOffset(0);
      return;
    }
    setDashOffset(totalLength);
    const duration = path.length * 80;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDashOffset(totalLength * (1 - eased));
      if (progress < 1) {
        animRef.current = requestAnimationFrame(tick);
      }
    };
    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isAnimating, totalLength, path.length]);

  const needlePos = useMemo(() => {
    if (!pathRef.current || totalLength === 0) return null;
    const drawnLength = totalLength - dashOffset;
    if (drawnLength <= 0) return null;
    const pt = pathRef.current.getPointAtLength(Math.min(drawnLength, totalLength));
    return { x: pt.x, y: pt.y };
  }, [dashOffset, totalLength]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 10, overflow: "visible" }}
      width="100%"
      height="100%"
    >
      {points.length < 2 ? null : <>
      <defs>
        <filter id={`glow-${color.replace("#", "")}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <polyline
        points={pointsStr}
        fill="none"
        stroke={color}
        strokeWidth={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.3}
        strokeDasharray={totalLength || undefined}
        strokeDashoffset={dashOffset}
      />
      <polyline
        ref={pathRef}
        points={pointsStr}
        fill="none"
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={totalLength || undefined}
        strokeDashoffset={dashOffset}
        filter={`url(#glow-${color.replace("#", "")})`}
      />
      {isAnimating && needlePos && (
        <>
          <circle cx={needlePos.x} cy={needlePos.y} r={12} fill={color} opacity={0.25}>
            <animate attributeName="r" values="10;16;10" dur="0.7s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.15;0.3" dur="0.7s" repeatCount="indefinite" />
          </circle>
          <circle cx={needlePos.x} cy={needlePos.y} r={6} fill="white" stroke={color} strokeWidth={3}>
            <animate attributeName="r" values="5;7;5" dur="0.7s" repeatCount="indefinite" />
          </circle>
        </>
      )}
      </>}
    </svg>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function LadderPage() {
  const locale = useLocale();
  const t = translations[locale];

  const [phase, setPhase] = useState<Phase>("setup");
  const [playerCount, setPlayerCount] = useState(4);
  const [playerNames, setPlayerNames] = useState<string[]>(
    Array.from({ length: 4 }, () => "")
  );
  const [results, setResults] = useState<string[]>(
    Array.from({ length: 4 }, () => "")
  );
  const [rungs, setRungs] = useState<Rung[]>([]);
  const [revealedPlayers, setRevealedPlayers] = useState<Set<number>>(new Set());
  const [animatingPlayer, setAnimatingPlayer] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [allRevealed, setAllRevealed] = useState(false);
  const animationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealAllTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    setPlayerNames((prev) => {
      return Array.from({ length: playerCount }, (_, i) => prev[i] ?? "");
    });
    setResults((prev) => {
      return Array.from({ length: playerCount }, (_, i) => prev[i] ?? "");
    });
  }, [playerCount]);

  const effectiveNames = useMemo(
    () => playerNames.map((n, i) => n.trim() || t.defaultPlayer(i)),
    [playerNames, t]
  );
  const effectiveResults = useMemo(
    () => results.map((r, i) => r.trim() || t.defaultResult(i)),
    [results, t]
  );

  const destinations = useMemo(() => {
    if (rungs.length === 0) return [];
    return Array.from({ length: playerCount }, (_, i) =>
      getDestination(i, rungs, playerCount)
    );
  }, [rungs, playerCount]);

  const applyPreset = useCallback(
    (type: "winner" | "penalty") => {
      const arr =
        type === "winner"
          ? t.presetWinnerItems(playerCount)
          : t.presetPenaltyItems(playerCount);
      const shuffled = [...arr].sort(() => Math.random() - 0.5);
      setResults(shuffled);
    },
    [playerCount, t]
  );

  const startGame = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const generated = generateRungs(playerCount);
    setRungs(generated);
    setRevealedPlayers(new Set());
    setAnimatingPlayer(null);
    setAnimating(false);
    setAllRevealed(false);
    setPhase("play");
  }, [playerCount]);

  const ANIM_DURATION = RUNG_ROWS * 80 + 200;

  const handlePlayerClick = useCallback(
    (idx: number) => {
      if (animating || revealedPlayers.has(idx)) return;
      setAnimatingPlayer(idx);
      setAnimating(true);
      setRevealedPlayers((prev) => new Set(Array.from(prev).concat(idx)));

      if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
      animationTimerRef.current = setTimeout(() => {
        setAnimatingPlayer(null);
        setAnimating(false);
      }, ANIM_DURATION);
    },
    [animating, revealedPlayers, ANIM_DURATION]
  );

  const handleRevealAll = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    const unrevealed = Array.from({ length: playerCount }, (_, i) => i).filter(
      (i) => !revealedPlayers.has(i)
    );

    revealAllTimersRef.current = [];
    unrevealed.forEach((playerIdx, seq) => {
      const delay = seq * (ANIM_DURATION * 0.6);
      const t1 = setTimeout(() => {
        setRevealedPlayers((prev) => new Set(Array.from(prev).concat(playerIdx)));
        setAnimatingPlayer(playerIdx);
        const t2 = setTimeout(() => {
          setAnimatingPlayer(null);
        }, ANIM_DURATION);
        revealAllTimersRef.current.push(t2);
      }, delay);
      revealAllTimersRef.current.push(t1);
    });

    const totalDuration = unrevealed.length * (ANIM_DURATION * 0.6) + ANIM_DURATION;
    const tFinal = setTimeout(() => {
      setAnimating(false);
      setAllRevealed(true);
      setAnimatingPlayer(null);
    }, totalDuration);
    revealAllTimersRef.current.push(tFinal);
  }, [animating, playerCount, revealedPlayers, ANIM_DURATION]);

  useEffect(() => {
    if (revealedPlayers.size === playerCount && playerCount > 0) {
      setAllRevealed(true);
    }
  }, [revealedPlayers, playerCount]);

  const resetGame = useCallback(() => {
    if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
    revealAllTimersRef.current.forEach(clearTimeout);
    revealAllTimersRef.current = [];
    setPhase("setup");
    setRungs([]);
    setRevealedPlayers(new Set());
    setAnimatingPlayer(null);
    setAnimating(false);
    setAllRevealed(false);
  }, []);

  const goToResult = useCallback(() => {
    setPhase("result");
  }, []);

  const copyResult = useCallback(() => {
    const lines = Array.from({ length: playerCount }, (_, i) => {
      const destCol = destinations[i];
      return `${effectiveNames[i]} → ${effectiveResults[destCol]}`;
    });
    navigator.clipboard.writeText(lines.join("\n")).catch(() => {});
  }, [playerCount, destinations, effectiveNames, effectiveResults]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 dark:from-slate-950 dark:via-emerald-950/20 dark:to-teal-950/10">
        <div className="max-w-2xl mx-auto px-4 py-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent mb-2">
              {t.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {t.subtitle}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">

            {/* ── SETUP PHASE ── */}
            {phase === "setup" && (
              <motion.div
                key="setup"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* Player count */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
                    {t.playerCount}
                  </h2>
                  <div className="flex items-center justify-center gap-6">
                    <button
                      onClick={() => setPlayerCount((n) => Math.max(MIN_PLAYERS, n - 1))}
                      className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-slate-700 dark:text-slate-200 text-2xl font-bold transition-colors flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="text-5xl font-extrabold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent w-16 text-center">
                      {playerCount}
                    </span>
                    <button
                      onClick={() => setPlayerCount((n) => Math.min(MAX_PLAYERS, n + 1))}
                      className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-slate-700 dark:text-slate-200 text-2xl font-bold transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-center text-xs text-slate-400 mt-3">
                    {t.playerRange(MIN_PLAYERS, MAX_PLAYERS)}
                  </p>
                </div>

                {/* Player names */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
                    {t.playerNames}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Array.from({ length: playerCount }).map((_, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-full flex-shrink-0"
                          style={{ backgroundColor: PLAYER_COLORS[i % PLAYER_COLORS.length] }}
                        />
                        <input
                          type="text"
                          value={playerNames[i] ?? ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setPlayerNames((prev) => {
                              const next = [...prev];
                              next[i] = val;
                              return next;
                            });
                          }}
                          placeholder={t.playerPlaceholder(i)}
                          maxLength={8}
                          className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      {t.results}
                    </h2>
                    <div className="flex gap-2">
                      <button
                        onClick={() => applyPreset("winner")}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors"
                      >
                        {t.presetWinner}
                      </button>
                      <button
                        onClick={() => applyPreset("penalty")}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-900/60 transition-colors"
                      >
                        {t.presetPenalty}
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Array.from({ length: playerCount }).map((_, i) => (
                      <input
                        key={i}
                        type="text"
                        value={results[i] ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setResults((prev) => {
                            const next = [...prev];
                            next[i] = val;
                            return next;
                          });
                        }}
                        placeholder={t.resultPlaceholder(i)}
                        maxLength={10}
                        className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
                      />
                    ))}
                  </div>
                </div>

                <AdBanner
                  format="horizontal"
                  className="rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
                />

                {/* Start button */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={startGame}
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xl font-bold shadow-lg hover:shadow-emerald-500/30 transition-shadow"
                >
                  {t.startBtn}
                </motion.button>

                {/* FAQ */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    {t.faqTitle}
                  </h2>
                  {t.faq.map((faq, i) => (
                    <div key={i}>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">
                        Q. {faq.q}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        A. {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── PLAY PHASE ── */}
            {phase === "play" && (
              <motion.div
                key="play"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {revealedPlayers.size === 0
                        ? t.clickToReveal
                        : animating
                        ? t.tracing
                        : t.revealed(revealedPlayers.size, playerCount)}
                    </p>
                    <button
                      onClick={resetGame}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    >
                      {t.resetSetup}
                    </button>
                  </div>

                  <LadderVisualization
                    playerCount={playerCount}
                    rungs={rungs}
                    playerNames={effectiveNames}
                    results={effectiveResults}
                    animatingPlayer={animatingPlayer}
                    revealedPlayers={revealedPlayers}
                    destinations={destinations}
                    onPlayerClick={handlePlayerClick}
                    animating={animating}
                  />
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  {!allRevealed && (
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleRevealAll}
                      disabled={animating}
                      className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-md hover:shadow-emerald-500/30 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t.revealAll}
                    </motion.button>
                  )}
                  {allRevealed && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={goToResult}
                      className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-md hover:shadow-emerald-500/30 transition-shadow"
                    >
                      {t.viewResult}
                    </motion.button>
                  )}
                  <button
                    onClick={resetGame}
                    className="px-5 py-4 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    {t.backToStart}
                  </button>
                </div>

                {/* Hint */}
                {revealedPlayers.size === 0 && (
                  <p className="text-center text-xs text-slate-400 dark:text-slate-500 animate-pulse">
                    {t.hintText}
                  </p>
                )}
              </motion.div>
            )}

            {/* ── RESULT PHASE ── */}
            {phase === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mb-6 text-center">
                    {t.finalResult}
                  </h2>
                  <div className="space-y-3">
                    {Array.from({ length: playerCount }).map((_, playerIdx) => {
                      const destCol = destinations[playerIdx];
                      const resultText = effectiveResults[destCol];
                      const name = effectiveNames[playerIdx];
                      const color = PLAYER_COLORS[playerIdx % PLAYER_COLORS.length];
                      return (
                        <motion.div
                          key={playerIdx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: playerIdx * 0.07 }}
                          className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50"
                        >
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md"
                            style={{ backgroundColor: color }}
                          >
                            {name.slice(0, 2)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-slate-800 dark:text-slate-100 truncate">
                              {name}
                            </p>
                          </div>
                          <div
                            className="px-4 py-2 rounded-xl text-white font-bold text-sm shadow-sm flex-shrink-0"
                            style={{ backgroundColor: color }}
                          >
                            {resultText}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <AdBanner
                  format="rectangle"
                  className="mt-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
                />

                {/* Action buttons */}
                <div className="flex gap-3">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={copyResult}
                    className="flex-1 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
                  >
                    {t.copyResult}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={startGame}
                    className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-md hover:shadow-emerald-500/30 transition-shadow"
                  >
                    {t.playAgain}
                  </motion.button>
                </div>

                <AdBanner
                  format="in-article"
                  className="mt-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
                />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
