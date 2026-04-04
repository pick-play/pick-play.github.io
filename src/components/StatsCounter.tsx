"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface Stat {
  icon: string;
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { icon: "👥", value: 50000, suffix: "+", label: "월간 사용자" },
  { icon: "🛠️", value: 26, suffix: "", label: "무료 도구" },
  { icon: "🌐", value: 5, suffix: "", label: "지원 언어" },
  { icon: "🎉", value: 100, suffix: "%", label: "완전 무료" },
];

function CountUp({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);
  const rafId = useRef(0);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1.8;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [inView, target]);

  return (
    <span>
      {target >= 1000 ? display.toLocaleString("ko-KR") : display}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="w-full py-12 px-4"
      aria-label="서비스 통계"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="
                flex flex-col items-center justify-center gap-2
                rounded-2xl p-5
                bg-white/80 dark:bg-slate-800/80
                backdrop-blur
                border border-slate-100 dark:border-slate-700/60
                shadow-sm
              "
            >
              <span className="text-3xl" role="img" aria-hidden="true">
                {stat.icon}
              </span>
              <span className="text-2xl font-bold text-slate-800 dark:text-slate-100 tabular-nums">
                <CountUp target={stat.value} suffix={stat.suffix} inView={inView} />
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 text-center">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
