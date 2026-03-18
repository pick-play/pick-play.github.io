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
  quadrantHints?: [string, string, string, string]; // [top-left, top-right, bottom-left, bottom-right]
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
    <div className="space-y-3">
      {/* Axis labels top */}
      <div className="flex justify-between items-center px-1">
        <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          {yLabels[1]}
        </span>
        {quadrantHints && (
          <div className="flex gap-4 text-[10px] text-slate-300 dark:text-slate-600">
            <span>{quadrantHints[0]}</span>
            <span>{quadrantHints[1]}</span>
          </div>
        )}
      </div>

      {/* SVG Map */}
      <div className="relative">
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          className="w-full aspect-square rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/80 dark:to-slate-800/40 border border-slate-200 dark:border-slate-700 cursor-crosshair shadow-inner"
          onClick={handleClick}
          onTouchStart={handleTouch}
          style={{ touchAction: "none" }}
        >
          {/* Grid */}
          {[25, 50, 75].map((v) => (
            <g key={v}>
              <line
                x1={v} y1={0} x2={v} y2={100}
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-700"
                strokeWidth={v === 50 ? 0.5 : 0.2}
                strokeDasharray={v === 50 ? undefined : "1,2"}
              />
              <line
                x1={0} y1={v} x2={100} y2={v}
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-700"
                strokeWidth={v === 50 ? 0.5 : 0.2}
                strokeDasharray={v === 50 ? undefined : "1,2"}
              />
            </g>
          ))}

          {/* Quadrant hint text inside SVG */}
          {quadrantHints && (
            <g className="pointer-events-none" opacity={0.15}>
              <text x={25} y={30} textAnchor="middle" fontSize={3.5} fill="currentColor" className="text-slate-500">{quadrantHints[0]}</text>
              <text x={75} y={30} textAnchor="middle" fontSize={3.5} fill="currentColor" className="text-slate-500">{quadrantHints[1]}</text>
              <text x={25} y={75} textAnchor="middle" fontSize={3.5} fill="currentColor" className="text-slate-500">{quadrantHints[2]}</text>
              <text x={75} y={75} textAnchor="middle" fontSize={3.5} fill="currentColor" className="text-slate-500">{quadrantHints[3]}</text>
            </g>
          )}

          {/* Selection area */}
          {center && (
            <>
              {/* Glow */}
              <circle
                cx={center.x} cy={100 - center.y} r={radius}
                fill={accent} fillOpacity={0.06}
              />
              {/* Border */}
              <circle
                cx={center.x} cy={100 - center.y} r={radius}
                fill="none"
                stroke={accent} strokeWidth={0.6} strokeDasharray="3,2"
                opacity={0.5}
              />
            </>
          )}

          {/* Item dots */}
          {items.map((item) => {
            const c = getCoords(item);
            const sel = isSel(item);
            const hov = hovered === item.id;
            const color = getColor(item);
            return (
              <g
                key={item.id}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Selection highlight ring */}
                {sel && (
                  <circle
                    cx={c.x} cy={100 - c.y} r={5}
                    fill={accent} fillOpacity={0.08}
                  />
                )}
                {/* Dot shadow */}
                <circle
                  cx={c.x + 0.3} cy={100 - c.y + 0.3} r={sel ? 2.5 : 1.8}
                  fill="black" opacity={0.08}
                />
                {/* Dot */}
                <circle
                  cx={c.x} cy={100 - c.y}
                  r={sel ? 2.5 : hov ? 2.2 : 1.8}
                  fill={sel ? accent : color}
                  opacity={center ? (sel ? 1 : 0.2) : 0.7}
                  stroke={sel ? "white" : "none"}
                  strokeWidth={sel ? 0.4 : 0}
                  className="transition-all duration-200"
                />
                {/* Label */}
                {(hov || (sel && selCount <= 12)) && (
                  <g>
                    <rect
                      x={c.x - getLabel(item).length * 1.3}
                      y={100 - c.y - 7.5}
                      width={getLabel(item).length * 2.6}
                      height={4}
                      rx={1}
                      fill="white"
                      fillOpacity={0.85}
                      className="dark:fill-slate-800"
                    />
                    <text
                      x={c.x} y={100 - c.y - 4.5}
                      textAnchor="middle" fontSize={2.5}
                      fill="currentColor"
                      className="text-slate-700 dark:text-slate-200 pointer-events-none"
                      fontWeight={600}
                    >
                      {getLabel(item)}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Crosshair */}
          {center && (
            <g opacity={0.4}>
              <line x1={center.x - 3} y1={100 - center.y} x2={center.x + 3} y2={100 - center.y} stroke={accent} strokeWidth={0.4} />
              <line x1={center.x} y1={100 - center.y - 3} x2={center.x} y2={100 - center.y + 3} stroke={accent} strokeWidth={0.4} />
              <circle cx={center.x} cy={100 - center.y} r={1} fill={accent} opacity={0.6} />
            </g>
          )}
        </svg>
      </div>

      {/* Axis labels bottom */}
      <div className="flex justify-between items-center px-1">
        <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          {xLabels[0]}
        </span>
        <span className="text-[11px] text-slate-300 dark:text-slate-600">
          {yLabels[0]}
        </span>
        <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          {xLabels[1]}
        </span>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 py-2">
        {legend.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full shadow-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Radius slider */}
      <div className="flex items-center gap-2.5 px-1">
        <span className="text-xs text-slate-400 shrink-0">좁게</span>
        <input
          type="range"
          min={8}
          max={45}
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="flex-1 h-1.5 rounded-full appearance-none bg-slate-200 dark:bg-slate-700"
          style={{ accentColor: accent }}
        />
        <span className="text-xs text-slate-400 shrink-0">넓게</span>
        <span
          className="text-sm font-bold min-w-[3rem] text-right"
          style={{ color: accent }}
        >
          {center ? `${selCount}개` : "\u2014"}
        </span>
      </div>

      {!center && (
        <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-1">
          맵을 터치하여 취향 위치를 선택하세요
        </p>
      )}
    </div>
  );
}
