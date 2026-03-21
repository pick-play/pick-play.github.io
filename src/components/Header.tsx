"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

// ─── Data ────────────────────────────────────────────────────────────────────

const navCategories = [
  {
    label: "생활도구",
    color: "sky",
    links: [
      { href: "/food", label: "뭐 먹지", emoji: "🍽️" },
      { href: "/settlement", label: "정산", emoji: "💰" },
      { href: "/date-course", label: "데이트", emoji: "💌" },
      { href: "/roulette", label: "룰렛", emoji: "🎯" },
    ],
  },
  {
    label: "파티게임",
    color: "violet",
    links: [
      { href: "/liar-game", label: "라이어", emoji: "🎭" },
      { href: "/random-team", label: "조뽑기", emoji: "🎲" },
      { href: "/balance-game", label: "밸런스", emoji: "⚖️" },
      { href: "/chosung-quiz", label: "초성", emoji: "🔤" },
    ],
  },
  {
    label: "테스트",
    color: "amber",
    links: [
      { href: "/teto-egen", label: "테토에겐", emoji: "🧠" },
      { href: "/mbti", label: "MBTI", emoji: "✨" },
    ],
  },
];

// Per-category color tokens (Tailwind-safe, static strings)
const categoryStyles: Record<
  string,
  {
    group: string;
    label: string;
    pill: string;
    pillHover: string;
    dot: string;
  }
> = {
  sky: {
    group:
      "bg-sky-50/60 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40",
    label: "text-sky-500 dark:text-sky-400",
    pill: "text-slate-600 dark:text-slate-300",
    pillHover:
      "hover:bg-sky-100 dark:hover:bg-sky-900/40 hover:text-sky-600 dark:hover:text-sky-300",
    dot: "bg-sky-400",
  },
  violet: {
    group:
      "bg-violet-50/60 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/40",
    label: "text-violet-500 dark:text-violet-400",
    pill: "text-slate-600 dark:text-slate-300",
    pillHover:
      "hover:bg-violet-100 dark:hover:bg-violet-900/40 hover:text-violet-600 dark:hover:text-violet-300",
    dot: "bg-violet-400",
  },
  amber: {
    group:
      "bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40",
    label: "text-amber-500 dark:text-amber-400",
    pill: "text-slate-600 dark:text-slate-300",
    pillHover:
      "hover:bg-amber-100 dark:hover:bg-amber-900/40 hover:text-amber-600 dark:hover:text-amber-300",
    dot: "bg-amber-400",
  },
};

const mobileCategoryStyles: Record<string, { header: string; dot: string; item: string }> = {
  sky: {
    header: "text-sky-500 dark:text-sky-400",
    dot: "bg-sky-400",
    item: "hover:text-sky-600 dark:hover:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-950/40",
  },
  violet: {
    header: "text-violet-500 dark:text-violet-400",
    dot: "bg-violet-400",
    item: "hover:text-violet-600 dark:hover:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-950/40",
  },
  amber: {
    header: "text-amber-500 dark:text-amber-400",
    dot: "bg-amber-400",
    item: "hover:text-amber-600 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/40",
  },
};

// ─── Icons ───────────────────────────────────────────────────────────────────

function MoonIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-700/60">
        <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent shrink-0 tracking-tight"
          >
            PickPlay
          </Link>

          {/* Desktop nav — category pill groups */}
          <div className="hidden md:flex items-center gap-2 flex-1 justify-center">
            {navCategories.map((category) => {
              const s = categoryStyles[category.color];
              return (
                <div
                  key={category.label}
                  className={`flex items-center gap-0.5 rounded-xl px-2 py-1.5 ${s.group}`}
                >
                  {/* Category label with color dot */}
                  <span className={`flex items-center gap-1 pr-2 text-[10px] font-bold uppercase tracking-wider select-none ${s.label}`}>
                    <span className={`inline-block w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    {category.label}
                  </span>
                  {/* Nav links as subtle pills */}
                  {category.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`
                        px-2.5 py-1 rounded-lg text-sm font-medium whitespace-nowrap
                        transition-colors duration-150
                        ${s.pill} ${s.pillHover}
                      `}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Desktop: theme toggle */}
          <div className="hidden md:flex items-center shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              aria-label="다크모드 토글"
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="flex md:hidden items-center gap-1 shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="다크모드 토글"
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center"
                >
                  {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile slide-down menu — rendered outside header to allow full overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-14 z-40 bg-black/20 dark:bg-black/40 md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-14 left-0 right-0 z-50 md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-lg"
            >
              <div className="max-w-6xl mx-auto px-4 py-5 space-y-5">
                {navCategories.map((category, ci) => {
                  const s = mobileCategoryStyles[category.color];
                  return (
                    <motion.div
                      key={category.label}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: ci * 0.06, duration: 0.2 }}
                    >
                      {/* Section header */}
                      <div className={`flex items-center gap-2 mb-2`}>
                        <span className={`inline-block w-2 h-2 rounded-full ${s.dot}`} />
                        <span className={`text-[11px] font-bold uppercase tracking-widest ${s.header}`}>
                          {category.label}
                        </span>
                      </div>

                      {/* Links grid */}
                      <div className="grid grid-cols-2 gap-1.5">
                        {category.links.map((link, li) => (
                          <motion.div
                            key={link.href}
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: ci * 0.06 + li * 0.04, duration: 0.18 }}
                          >
                            <Link
                              href={link.href}
                              onClick={() => setMenuOpen(false)}
                              className={`
                                flex items-center gap-2.5 px-3 py-3 rounded-xl
                                text-sm font-medium text-slate-600 dark:text-slate-300
                                transition-colors duration-150
                                ${s.item}
                                min-h-[44px]
                              `}
                            >
                              <span className="text-base leading-none">{link.emoji}</span>
                              <span>{link.label}</span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>

                      {ci < navCategories.length - 1 && (
                        <div className="mt-4 h-px bg-slate-100 dark:bg-slate-800" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
