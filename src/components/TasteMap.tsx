"use client";

import { useState, useRef, useCallback, useEffect } from "react";

type LegendItem = { label: string; color: string };

type TasteMapProps<T extends { id: number }> = {
  items: T[];
  getCoords: (item: T) => { x: number; y: number };
  getLabel: (item: T) => string;
  getColor: (item: T) => string;
  xLabels: [string, string];
  yLabels: [string, string];
  quadrantHints?: [string, string, string, string];
  accent: string;
  legend: LegendItem[];
  onSelect: (selected: T[]) => void;
};

export default function TasteMap<T extends { id: number }>({
  items,
  getCoords,
  getLabel,
  getColor,
  xLabels,
  yLabels,
  quadrantHints,
  accent,
  legend,
  onSelect,
}: TasteMapProps<T>) {
  const [center, setCenter] = useState<{ x: number; y: number } | null>(null);
  const [radius, setRadius] = useState(20);
  const [hovered, setHovered] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const dist = useCallback(
    (item: T, cx: number, cy: number) => {
      const c = getCoords(item);
      return Math.sqrt((c.x - cx) ** 2 + (c.y - cy) ** 2);
    },
    [getCoords]
  );

  const getSelected = useCallback(
    (cx: number, cy: number, r: number) =>
      items.filter((it) => dist(it, cx, cy) <= r),
    [items, dist]
  );

  const toData = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)),
      y: Math.max(
        0,
        Math.min(100, 100 - ((clientY - rect.top) / rect.height) * 100)
      ),
    };
  }, []);

  const handlePointer = useCallback(
    (clientX: number, clientY: number) => {
      const pt = toData(clientX, clientY);
      if (!pt) return;
      setCenter(pt);
      onSelect(getSelected(pt.x, pt.y, radius));
    },
    [toData, radius, getSelected, onSelect]
  );

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) =>
    handlePointer(e.clientX, e.clientY);
  const handleTouch = (e: React.TouchEvent<SVGSVGElement>) =>
    handlePointer(e.touches[0].clientX, e.touches[0].clientY);

  useEffect(() => {
    if (center) onSelect(getSelected(center.x, center.y, radius));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radius]);

  const isSel = useCallback(
    (item: T) => center !== null && dist(item, center.x, center.y) <= radius,
    [center, radius, dist]
  );
  const selCount = center ? items.filter(isSel).length : 0;

  return (
    <>
      {/* Global styles for custom slider and animations */}
      <style>{`
        .tastemap-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          border-radius: 9999px;
          background: linear-gradient(
            to right,
            ${accent} 0%,
            ${accent} var(--slider-pct, 40%),
            rgba(148,163,184,0.25) var(--slider-pct, 40%),
            rgba(148,163,184,0.25) 100%
          );
          outline: none;
          cursor: pointer;
          transition: background 0.1s;
        }
        .tastemap-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: ${accent};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.9), 0 0 12px 2px ${accent}66;
          cursor: pointer;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .tastemap-slider::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 4px rgba(255,255,255,0.95), 0 0 20px 4px ${accent}88;
          transform: scale(1.15);
        }
        .tastemap-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: none;
          background: ${accent};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.9), 0 0 12px 2px ${accent}66;
          cursor: pointer;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        @keyframes spin-dash {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -30; }
        }
        @keyframes pulse-ring {
          0%   { r: 0; opacity: 0.5; }
          100% { r: 8; opacity: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        .tastemap-dot-selected {
          animation: fade-in 0.18s ease-out both;
        }
        .tastemap-spin-dash {
          animation: spin-dash 3s linear infinite;
        }
      `}</style>

      <div className="space-y-3">
        {/* Top axis label row */}
        <div className="flex justify-between items-center px-2">
          <span
            className="text-[11px] font-bold uppercase tracking-widest"
            style={{
              background: `linear-gradient(90deg, ${accent}, ${accent}aa)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {yLabels[1]}
          </span>
          {quadrantHints && (
            <div className="flex gap-3 text-[10px] text-slate-400 dark:text-slate-500 italic tracking-wide">
              <span>{quadrantHints[0]}</span>
              <span>{quadrantHints[1]}</span>
            </div>
          )}
        </div>

        {/* SVG Map */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            boxShadow: `0 4px 32px 0 ${accent}22, 0 1.5px 8px 0 rgba(0,0,0,0.10)`,
          }}
        >
          <svg
            ref={svgRef}
            viewBox="0 0 100 100"
            className="w-full aspect-square cursor-crosshair block"
            onClick={handleClick}
            onTouchStart={handleTouch}
            style={{ touchAction: "none" }}
          >
            <defs>
              {/* Background radial gradient */}
              <radialGradient id="tm-bg-radial" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#1e293b" stopOpacity="1" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
              </radialGradient>

              {/* Accent radial for selection area */}
              <radialGradient id="tm-sel-radial" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={accent} stopOpacity="0.18" />
                <stop offset="100%" stopColor={accent} stopOpacity="0" />
              </radialGradient>

              {/* Glow filter for selected dots */}
              <filter id="tm-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="1.8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Soft glow filter for crosshair center */}
              <filter id="tm-center-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="1.2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Glass filter for unselected dots */}
              <filter id="tm-glass" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="0.4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Noise texture */}
              <filter id="tm-noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
                <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
                <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blended" />
                <feComposite in="blended" in2="SourceGraphic" operator="in" />
              </filter>

              {/* Clip path for the map area */}
              <clipPath id="tm-clip">
                <rect x="0" y="0" width="100" height="100" />
              </clipPath>
            </defs>

            {/* Background */}
            <rect x="0" y="0" width="100" height="100" fill="url(#tm-bg-radial)" />

            {/* Subtle noise overlay for depth */}
            <rect x="0" y="0" width="100" height="100" fill="url(#tm-bg-radial)" filter="url(#tm-noise)" opacity="0.04" />

            {/* Mesh-like background pattern: concentric faint rings */}
            {[20, 35, 50, 65, 80].map((r) => (
              <circle
                key={r}
                cx="50" cy="50" r={r}
                fill="none"
                stroke="rgba(255,255,255,0.025)"
                strokeWidth="0.3"
              />
            ))}

            {/* Grid lines */}
            {[25, 50, 75].map((v) => (
              <g key={v}>
                <line
                  x1={v} y1={0} x2={v} y2={100}
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth={v === 50 ? 0.4 : 0.2}
                  strokeDasharray={v === 50 ? undefined : "1.5,2"}
                />
                <line
                  x1={0} y1={v} x2={100} y2={v}
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth={v === 50 ? 0.4 : 0.2}
                  strokeDasharray={v === 50 ? undefined : "1.5,2"}
                />
              </g>
            ))}

            {/* Quadrant hint text with glass-like backdrop */}
            {quadrantHints && (
              <g className="pointer-events-none">
                {(
                  [
                    { x: 25, y: 28, label: quadrantHints[0] },
                    { x: 75, y: 28, label: quadrantHints[1] },
                    { x: 25, y: 76, label: quadrantHints[2] },
                    { x: 75, y: 76, label: quadrantHints[3] },
                  ] as const
                ).map(({ x, y, label }) => (
                  <g key={label}>
                    <rect
                      x={x - label.length * 1.5}
                      y={y - 3.5}
                      width={label.length * 3}
                      height={5}
                      rx={1.5}
                      fill="rgba(255,255,255,0.04)"
                    />
                    <text
                      x={x} y={y}
                      textAnchor="middle"
                      fontSize={3}
                      fill="rgba(255,255,255,0.22)"
                      fontWeight={500}
                      letterSpacing="0.02em"
                    >
                      {label}
                    </text>
                  </g>
                ))}
              </g>
            )}

            {/* Selection area */}
            {center && (
              <g>
                {/* Radial glow fill */}
                <circle
                  cx={center.x}
                  cy={100 - center.y}
                  r={radius}
                  fill={accent}
                  fillOpacity={0.10}
                />
                {/* Inner soft fill */}
                <circle
                  cx={center.x}
                  cy={100 - center.y}
                  r={radius * 0.55}
                  fill={accent}
                  fillOpacity={0.07}
                />
                {/* Spinning dashed border */}
                <circle
                  cx={center.x}
                  cy={100 - center.y}
                  r={radius}
                  fill="none"
                  stroke={accent}
                  strokeWidth={0.55}
                  strokeDasharray="4,2.5"
                  opacity={0.7}
                  className="tastemap-spin-dash"
                  style={{ transformOrigin: `${center.x}px ${100 - center.y}px` }}
                />
                {/* Solid outer ring */}
                <circle
                  cx={center.x}
                  cy={100 - center.y}
                  r={radius}
                  fill="none"
                  stroke={accent}
                  strokeWidth={0.2}
                  opacity={0.25}
                />
              </g>
            )}

            {/* Item dots */}
            {items.map((item) => {
              const c = getCoords(item);
              const sel = isSel(item);
              const hov = hovered === item.id;
              const color = getColor(item);
              const cy = 100 - c.y;

              return (
                <g
                  key={item.id}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: "crosshair" }}
                >
                  {/* Glow halo for selected dots */}
                  {sel && (
                    <circle
                      cx={c.x}
                      cy={cy}
                      r={5}
                      fill={accent}
                      fillOpacity={0.18}
                      filter="url(#tm-glow)"
                      className="tastemap-dot-selected"
                    />
                  )}

                  {/* Hover ring */}
                  {hov && !sel && (
                    <circle
                      cx={c.x}
                      cy={cy}
                      r={3.5}
                      fill="none"
                      stroke={color}
                      strokeWidth={0.4}
                      opacity={0.4}
                    />
                  )}

                  {/* Dot */}
                  <circle
                    cx={c.x}
                    cy={cy}
                    r={sel ? 2.6 : hov ? 2.3 : 1.9}
                    fill={sel ? accent : color}
                    opacity={center ? (sel ? 1 : 0.22) : 0.72}
                    stroke={sel ? "rgba(255,255,255,0.8)" : hov ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.12)"}
                    strokeWidth={sel ? 0.5 : 0.3}
                    filter={sel ? "url(#tm-glow)" : "url(#tm-glass)"}
                    style={{ transition: "r 0.2s, opacity 0.2s, stroke 0.2s" }}
                  />

                  {/* Label tooltip */}
                  {(hov || (sel && selCount <= 12)) && (() => {
                    const label = getLabel(item);
                    const pw = label.length * 2.6 + 4;
                    const px = Math.min(Math.max(c.x, pw / 2 + 1), 100 - pw / 2 - 1);
                    const py = cy - 5.5;
                    const tipY = py < 5 ? cy + 5.5 + 4 : py;
                    return (
                      <g className="pointer-events-none">
                        {/* Backdrop blur rect */}
                        <rect
                          x={px - pw / 2}
                          y={tipY - 3.8}
                          width={pw}
                          height={4.5}
                          rx={2}
                          fill="rgba(15,23,42,0.82)"
                          stroke="rgba(255,255,255,0.10)"
                          strokeWidth={0.25}
                        />
                        {/* Accent underline */}
                        <rect
                          x={px - pw / 2 + 1}
                          y={tipY + 0.5}
                          width={pw - 2}
                          height={0.35}
                          rx={0.175}
                          fill={sel ? accent : color}
                          opacity={0.7}
                        />
                        <text
                          x={px}
                          y={tipY - 0.4}
                          textAnchor="middle"
                          fontSize={2.4}
                          fill="rgba(255,255,255,0.92)"
                          fontWeight={600}
                          letterSpacing="0.01em"
                        >
                          {label}
                        </text>
                      </g>
                    );
                  })()}
                </g>
              );
            })}

            {/* Crosshair center marker */}
            {center && (
              <g opacity={0.9}>
                <line
                  x1={center.x - 2.5} y1={100 - center.y}
                  x2={center.x + 2.5} y2={100 - center.y}
                  stroke={accent} strokeWidth={0.45}
                />
                <line
                  x1={center.x} y1={100 - center.y - 2.5}
                  x2={center.x} y2={100 - center.y + 2.5}
                  stroke={accent} strokeWidth={0.45}
                />
                <circle
                  cx={center.x} cy={100 - center.y}
                  r={1}
                  fill={accent}
                  filter="url(#tm-center-glow)"
                />
              </g>
            )}
          </svg>
        </div>

        {/* Bottom axis labels */}
        <div className="flex justify-between items-center px-2">
          <span
            className="text-[11px] font-bold uppercase tracking-widest"
            style={{
              background: `linear-gradient(90deg, ${accent}cc, ${accent}66)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {xLabels[0]}
          </span>
          <span
            className="text-[10px] italic text-slate-500 dark:text-slate-600"
          >
            {yLabels[0]}
          </span>
          <span
            className="text-[11px] font-bold uppercase tracking-widest"
            style={{
              background: `linear-gradient(90deg, ${accent}66, ${accent}cc)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {xLabels[1]}
          </span>
        </div>

        {/* Legend chips */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 py-1">
          {legend.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full"
              style={{
                backgroundColor: `${item.color}18`,
                border: `1px solid ${item.color}30`,
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{
                  backgroundColor: item.color,
                  boxShadow: `0 0 4px 1px ${item.color}66`,
                }}
              />
              <span
                className="text-[10px] font-medium tracking-wide"
                style={{ color: item.color + "cc" }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Radius slider */}
        <div className="flex items-center gap-3 px-1">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 shrink-0 tracking-wide">
            좁게
          </span>
          <input
            type="range"
            min={8}
            max={45}
            value={radius}
            onChange={(e) => {
              const val = Number(e.target.value);
              setRadius(val);
              const pct = ((val - 8) / (45 - 8)) * 100;
              (e.target as HTMLInputElement).style.setProperty("--slider-pct", `${pct}%`);
            }}
            className="tastemap-slider flex-1"
            style={
              {
                "--slider-pct": `${((radius - 8) / (45 - 8)) * 100}%`,
              } as React.CSSProperties
            }
          />
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 shrink-0 tracking-wide">
            넓게
          </span>
          <span
            className="text-sm font-black min-w-[3.5rem] text-right tabular-nums"
            style={{
              color: accent,
              textShadow: `0 0 8px ${accent}55`,
            }}
          >
            {center ? `${selCount}개` : "—"}
          </span>
        </div>

        {/* Empty state hint */}
        {!center && (
          <p
            className="text-center text-[13px] py-1 tracking-wide"
            style={{ color: `${accent}77` }}
          >
            맵을 터치하여 취향 위치를 선택하세요
          </p>
        )}
      </div>
    </>
  );
}
