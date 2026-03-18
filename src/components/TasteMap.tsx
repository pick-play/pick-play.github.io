"use client";

import { useState, useRef, useCallback, useEffect } from "react";

type TasteMapProps<T extends { id: number }> = {
  items: T[];
  getCoords: (item: T) => { x: number; y: number };
  getLabel: (item: T) => string;
  xLabels: [string, string];
  yLabels: [string, string];
  accent: string;
  onSelect: (selected: T[]) => void;
};

export default function TasteMap<T extends { id: number }>({
  items,
  getCoords,
  getLabel,
  xLabels,
  yLabels,
  accent,
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
      <div className="relative">
        <div className="flex justify-between text-[11px] font-medium text-slate-400 dark:text-slate-500 mb-1.5 px-1">
          <span>{yLabels[1]}</span>
        </div>

        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          className="w-full aspect-square rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 cursor-crosshair"
          onClick={handleClick}
          onTouchStart={handleTouch}
          style={{ touchAction: "none" }}
        >
          {[25, 50, 75].map((v) => (
            <g key={v}>
              <line
                x1={v} y1={0} x2={v} y2={100}
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-700"
                strokeWidth={v === 50 ? 0.4 : 0.25}
              />
              <line
                x1={0} y1={v} x2={100} y2={v}
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-700"
                strokeWidth={v === 50 ? 0.4 : 0.25}
              />
            </g>
          ))}

          {center && (
            <circle
              cx={center.x}
              cy={100 - center.y}
              r={radius}
              fill={accent}
              fillOpacity={0.08}
              stroke={accent}
              strokeWidth={0.5}
              strokeDasharray="2,1.5"
            />
          )}

          {items.map((item) => {
            const c = getCoords(item);
            const sel = isSel(item);
            const hov = hovered === item.id;
            return (
              <g
                key={item.id}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {sel && (
                  <circle
                    cx={c.x}
                    cy={100 - c.y}
                    r={4.5}
                    fill={accent}
                    fillOpacity={0.12}
                  />
                )}
                <circle
                  cx={c.x}
                  cy={100 - c.y}
                  r={sel ? 2.5 : 1.8}
                  fill={sel ? accent : "#94a3b8"}
                  opacity={center ? (sel ? 1 : 0.18) : 0.55}
                  className="transition-all duration-200"
                />
                {(hov || (sel && selCount <= 12)) && (
                  <text
                    x={c.x}
                    y={100 - c.y - 4.5}
                    textAnchor="middle"
                    fontSize={2.6}
                    fill="currentColor"
                    className="text-slate-700 dark:text-slate-200 pointer-events-none"
                    fontWeight={500}
                  >
                    {getLabel(item)}
                  </text>
                )}
              </g>
            );
          })}

          {center && (
            <g opacity={0.5}>
              <line
                x1={center.x - 3} y1={100 - center.y}
                x2={center.x + 3} y2={100 - center.y}
                stroke={accent} strokeWidth={0.35}
              />
              <line
                x1={center.x} y1={100 - center.y - 3}
                x2={center.x} y2={100 - center.y + 3}
                stroke={accent} strokeWidth={0.35}
              />
            </g>
          )}
        </svg>

        <div className="flex justify-between text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-1.5 px-1">
          <span>{xLabels[0]}</span>
          <span>{yLabels[0]}</span>
          <span>{xLabels[1]}</span>
        </div>
      </div>

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
          className="text-sm font-semibold min-w-[3rem] text-right"
          style={{ color: accent }}
        >
          {center ? `${selCount}개` : "\u2014"}
        </span>
      </div>

      {!center && (
        <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-2">
          맵을 터치하여 취향 위치를 선택하세요
        </p>
      )}
    </div>
  );
}
