"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = "setup" | "play" | "result";

interface Rung {
  /** which column (0-indexed) the rung starts from; connects col → col+1 */
  col: number;
  /** which row band (0-indexed out of RUNG_ROWS) */
  row: number;
}

interface PathStep {
  col: number;
  row: number; // row index within the traversal grid (0 = top, RUNG_ROWS = bottom)
  direction: "down" | "right" | "left";
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MIN_PLAYERS = 2;
const MAX_PLAYERS = 10;
const RUNG_ROWS = 8; // how many possible rung positions vertically

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

const PRESET_WINNER_ONE = (count: number): string[] => [
  "당첨",
  ...Array(count - 1).fill("꽝"),
];
const PRESET_PENALTY_ONE = (count: number): string[] => [
  "벌칙",
  ...Array(count - 1).fill("면제"),
];

// ─── Utility ──────────────────────────────────────────────────────────────────

function generateRungs(playerCount: number): Rung[] {
  const rungs: Rung[] = [];
  // For each row, randomly add rungs, ensuring no two adjacent rungs in the same row
  for (let row = 0; row < RUNG_ROWS; row++) {
    let col = 0;
    while (col < playerCount - 1) {
      if (Math.random() < 0.45) {
        rungs.push({ col, row });
        col += 2; // skip next col to avoid adjacent rungs
      } else {
        col += 1;
      }
    }
  }
  return rungs;
}

/**
 * Trace path for a given starting column.
 * Returns array of steps for animation.
 */
function tracePath(startCol: number, rungs: Rung[], playerCount: number): PathStep[] {
  const steps: PathStep[] = [];
  let col = startCol;

  // Build a lookup: row → set of starting cols that have rungs
  const rungSet = new Set(rungs.map((r) => `${r.row}:${r.col}`));
  const hasRung = (row: number, c: number) => rungSet.has(`${row}:${c}`);

  for (let row = 0; row < RUNG_ROWS; row++) {
    // Step down into this row band
    steps.push({ col, row, direction: "down" });

    // Check if there's a rung going right (col → col+1)
    if (col < playerCount - 1 && hasRung(row, col)) {
      steps.push({ col, row, direction: "right" });
      col += 1;
    }
    // Check if there's a rung going left (col-1 → col, i.e., rung at col-1)
    else if (col > 0 && hasRung(row, col - 1)) {
      steps.push({ col, row, direction: "left" });
      col -= 1;
    }
  }

  // Final step: arrive at bottom
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
  /** null = nothing animating, number = that player's path is being traced */
  animatingPlayer: number | null;
  /** set of player indices whose paths are fully revealed */
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
  const PAD = 24; // px padding inside ladder body
  // Returns a CSS calc expression for the X position of a column
  const colLeft = (col: number) => {
    const frac = playerCount <= 1 ? 0 : col / (playerCount - 1);
    return `calc(${PAD}px + (100% - ${PAD * 2}px) * ${frac})`;
  };
  const rowPercent = (row: number) => (row / RUNG_ROWS) * 100;
  // Fraction for one column gap
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
        {rungs.map((rung, idx) => {
          return (
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
          );
        })}

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
                    {results[i] || `결과 ${i + 1}`}
                  </motion.div>
                ) : (
                  <div className="px-2 py-1 rounded-lg text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700 whitespace-nowrap">
                    {results[i] || `결과 ${i + 1}`}
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

// ─── Animated path overlay ─────────────────────────────────────────────────────

interface AnimatedPathProps {
  path: PathStep[];
  color: string;
  playerCount: number;
  isAnimating: boolean;
  pad: number;
}

function AnimatedPath({ path, color, playerCount, isAnimating, pad }: AnimatedPathProps) {
  const [visibleSteps, setVisibleSteps] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isAnimating) {
      setVisibleSteps(0);
      let step = 0;
      const advance = () => {
        step += 1;
        setVisibleSteps(step);
        if (step < path.length) {
          timerRef.current = setTimeout(advance, 80);
        }
      };
      timerRef.current = setTimeout(advance, 60);
    } else {
      setVisibleSteps(path.length);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isAnimating, path.length]);

  const colFrac = (col: number) =>
    playerCount <= 1 ? 0 : col / (playerCount - 1);
  const rowPercent = (row: number) => (row / RUNG_ROWS) * 100;

  const colCalc = (col: number) =>
    `calc(${pad}px + (100% - ${pad * 2}px) * ${colFrac(col)})`;

  return (
    <>
      {path.slice(0, visibleSteps).map((step, idx) => {
        if (idx === 0) return null;
        const prev = path[idx - 1];
        const cur = step;

        let col1: number, row1: number, col2: number, row2: number;

        if (cur.direction === "down") {
          col1 = prev.col;
          col2 = cur.col;
          // If previous step was horizontal (right/left), start from the rung Y (row + 0.5)
          row1 = prev.direction === "right" || prev.direction === "left"
            ? prev.row + 0.5
            : prev.row;
          row2 = cur.row;
        } else if (cur.direction === "right") {
          col1 = prev.col; row1 = cur.row + 0.5;
          col2 = prev.col + 1; row2 = cur.row + 0.5;
        } else {
          col1 = prev.col; row1 = cur.row + 0.5;
          col2 = prev.col - 1; row2 = cur.row + 0.5;
        }

        const isVertical = col1 === col2;
        const minCol = Math.min(col1, col2);
        const maxCol = Math.max(col1, col2);
        const minRow = Math.min(row1, row2);
        const maxRow = Math.max(row1, row2);

        return (
          <motion.div
            key={`seg-${idx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.05 }}
            className="absolute pointer-events-none"
            style={{
              left: colCalc(minCol),
              top: `${rowPercent(minRow)}%`,
              width: isVertical
                ? "5px"
                : `calc((100% - ${pad * 2}px) * ${colFrac(maxCol) - colFrac(minCol)} + 5px)`,
              height: isVertical ? `${rowPercent(maxRow) - rowPercent(minRow)}%` : "5px",
              backgroundColor: color,
              borderRadius: "3px",
              transform: isVertical ? "translateX(-50%)" : "translateY(-50%)",
              boxShadow: `0 0 8px 2px ${color}66`,
              zIndex: 10,
            }}
          />
        );
      })}
      {isAnimating && visibleSteps > 0 && (() => {
        const lastStep = path[visibleSteps - 1];
        const prevStep = visibleSteps >= 2 ? path[visibleSteps - 2] : null;

        let dotCol = lastStep.col;
        let dotRow = lastStep.row;

        if (lastStep.direction === "right" && prevStep) {
          dotCol = prevStep.col + 1;
          dotRow = lastStep.row + 0.5;
        } else if (lastStep.direction === "left" && prevStep) {
          dotCol = prevStep.col - 1;
          dotRow = lastStep.row + 0.5;
        } else if (lastStep.direction === "down") {
          dotCol = lastStep.col;
          dotRow = lastStep.row;
        }

        return (
          <motion.div
            key="needle-dot"
            className="absolute pointer-events-none rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            style={{
              left: colCalc(dotCol),
              top: `${rowPercent(dotRow)}%`,
              width: "12px",
              height: "12px",
              backgroundColor: color,
              transform: "translate(-50%, -50%)",
              boxShadow: `0 0 16px 6px ${color}AA, 0 0 32px 12px ${color}44`,
              zIndex: 20,
            }}
          />
        );
      })()}
    </>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function LadderPage() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [playerCount, setPlayerCount] = useState(4);
  const [playerNames, setPlayerNames] = useState<string[]>(
    Array.from({ length: 4 }, (_, i) => "")
  );
  const [results, setResults] = useState<string[]>(
    Array.from({ length: 4 }, (_, i) => "")
  );
  const [rungs, setRungs] = useState<Rung[]>([]);
  const [revealedPlayers, setRevealedPlayers] = useState<Set<number>>(new Set());
  const [animatingPlayer, setAnimatingPlayer] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [allRevealed, setAllRevealed] = useState(false);
  const animationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealAllTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Sync arrays when playerCount changes
  useEffect(() => {
    setPlayerNames((prev) => {
      const next = Array.from({ length: playerCount }, (_, i) => prev[i] ?? "");
      return next;
    });
    setResults((prev) => {
      const next = Array.from({ length: playerCount }, (_, i) => prev[i] ?? "");
      return next;
    });
  }, [playerCount]);

  const effectiveNames = useMemo(
    () => playerNames.map((n, i) => n.trim() || `참가자 ${i + 1}`),
    [playerNames]
  );
  const effectiveResults = useMemo(
    () => results.map((r, i) => r.trim() || `결과 ${i + 1}`),
    [results]
  );

  // Pre-compute destinations once rungs are set
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
          ? PRESET_WINNER_ONE(playerCount)
          : PRESET_PENALTY_ONE(playerCount);
      // Shuffle before setting
      const shuffled = [...arr].sort(() => Math.random() - 0.5);
      setResults(shuffled);
    },
    [playerCount]
  );

  const startGame = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const generated = generateRungs(playerCount);
    setRungs(generated);
    setRevealedPlayers(new Set());
    setAnimatingPlayer(null);
    setAnimating(false);
    setAllRevealed(false);
    setPhase("play");
  }, [playerCount]);

  const ANIM_DURATION = RUNG_ROWS * 80 + 200; // ms

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
    // Reveal players one by one with staggered delays
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

  // Check if all revealed
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
              사다리 타기
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              공정한 사다리로 순서, 당번, 벌칙을 정해보세요
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
                    참가자 수
                  </h2>
                  <div className="flex items-center justify-center gap-6">
                    <button
                      onClick={() =>
                        setPlayerCount((n) => Math.max(MIN_PLAYERS, n - 1))
                      }
                      className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-slate-700 dark:text-slate-200 text-2xl font-bold transition-colors flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="text-5xl font-extrabold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent w-16 text-center">
                      {playerCount}
                    </span>
                    <button
                      onClick={() =>
                        setPlayerCount((n) => Math.min(MAX_PLAYERS, n + 1))
                      }
                      className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-slate-700 dark:text-slate-200 text-2xl font-bold transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-center text-xs text-slate-400 mt-3">
                    {MIN_PLAYERS}명 ~ {MAX_PLAYERS}명
                  </p>
                </div>

                {/* Player names */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
                    참가자 이름 (선택)
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Array.from({ length: playerCount }).map((_, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor: PLAYER_COLORS[i % PLAYER_COLORS.length],
                          }}
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
                          placeholder={`참가자 ${i + 1}`}
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
                      결과 입력 (선택)
                    </h2>
                    <div className="flex gap-2">
                      <button
                        onClick={() => applyPreset("winner")}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors"
                      >
                        당첨 1명
                      </button>
                      <button
                        onClick={() => applyPreset("penalty")}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-900/60 transition-colors"
                      >
                        벌칙 1명
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
                        placeholder={`결과 ${i + 1}`}
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
                  사다리 시작
                </motion.button>

                {/* FAQ */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    자주 묻는 질문
                  </h2>
                  {[
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
                  ].map((faq, i) => (
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
                        ? "이름을 클릭해 경로를 확인하세요"
                        : animating
                        ? "경로 추적 중..."
                        : `${revealedPlayers.size}/${playerCount}명 확인됨`}
                    </p>
                    <button
                      onClick={resetGame}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    >
                      다시 설정
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
                      전체 공개
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
                      결과 보기
                    </motion.button>
                  )}
                  <button
                    onClick={resetGame}
                    className="px-5 py-4 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    처음으로
                  </button>
                </div>

                {/* Hint */}
                {revealedPlayers.size === 0 && (
                  <p className="text-center text-xs text-slate-400 dark:text-slate-500 animate-pulse">
                    위의 색깔 이름 버튼을 눌러 사다리를 타세요
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
                    최종 결과
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
                    결과 복사
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={startGame}
                    className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-md hover:shadow-emerald-500/30 transition-shadow"
                  >
                    다시 하기
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
